import { useState, useMemo, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Loader2, Settings2, ChevronDown, Eye, Trophy } from 'lucide-react';
import { STATIC_PUZZLES, type Puzzle } from './puzzles';

type Difficulty = 'easy' | 'medium' | 'hard' | 'any';

type Attempt = {
  isCorrect: boolean;
  ratingChange: number;
};

export default function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [selectedMove, setSelectedMove] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [userRating, setUserRating] = useState(1500);
  const [attempts, setAttempts] = useState<Record<string, Attempt>>({});

  // Initialize puzzles based on difficulty
  useEffect(() => {
    setCurrentPuzzleIndex(0);
    setSelectedMove(null);
    if (difficulty === 'any') {
      setPuzzles([]); // Will trigger fetch
    } else {
      setPuzzles(STATIC_PUZZLES.filter(p => p.difficulty === difficulty));
    }
  }, [difficulty]);

  const fetchMorePuzzles = async () => {
    if (isLoading || difficulty !== 'any') return;
    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await fetch('https://lichess.org/api/puzzle/next');
      if (!response.ok) throw new Error('Failed to fetch puzzle');
      const data = await response.json();
      
      const chess = new Chess();
      chess.loadPgn(data.game.pgn);
      
      const fen = chess.fen();
      const turn = chess.turn();
      
      const correctUci = data.puzzle.solution[0];
      const from = correctUci.substring(0, 2);
      const to = correctUci.substring(2, 4);
      const promotion = correctUci.length === 5 ? correctUci[4] : undefined;
      
      const correctMoveObj = chess.move({ from, to, promotion });
      const correctMove = correctMoveObj.san;
      
      chess.undo();
      
      const legalMoves = chess.moves({ verbose: true });
      const incorrectMoves = legalMoves.filter(m => m.san !== correctMove);
      
      let incorrectMove = '';
      if (incorrectMoves.length > 0) {
        const captures = incorrectMoves.filter(m => m.flags.includes('c') || m.flags.includes('e'));
        const checks = incorrectMoves.filter(m => m.san.includes('+'));
        const samePiece = incorrectMoves.filter(m => m.piece === correctMoveObj.piece);
        
        const plausibleSan = Array.from(new Set([...captures, ...checks, ...samePiece].map(m => m.san)));
        if (plausibleSan.length > 0) {
          incorrectMove = plausibleSan[Math.floor(Math.random() * plausibleSan.length)];
        } else {
          incorrectMove = incorrectMoves[Math.floor(Math.random() * incorrectMoves.length)].san;
        }
      } else {
        incorrectMove = 'Resign';
      }
      
      const newPuzzle: Puzzle = {
        id: data.puzzle.id,
        fen,
        turn,
        correctMove,
        incorrectMove,
        explanation: `The correct move is ${correctMove}. This puzzle has a Lichess rating of ${data.puzzle.rating}.`,
        difficulty: 'any',
        rating: data.puzzle.rating
      };
      
      setPuzzles(prev => [...prev, newPuzzle]);
    } catch (error) {
      console.error('Error fetching puzzle:', error);
      setFetchError('Failed to load puzzle. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (difficulty === 'any' && (puzzles.length === 0 || currentPuzzleIndex >= puzzles.length - 2) && !isLoading) {
      fetchMorePuzzles();
    }
  }, [currentPuzzleIndex, puzzles.length, difficulty]);

  const puzzle = puzzles[currentPuzzleIndex];

  const { options, isWhiteTurn } = useMemo(() => {
    if (!puzzle) return { options: [], isWhiteTurn: true };
    
    const gameCorrect = new Chess(puzzle.fen);
    let correctFrom = '', correctTo = '';
    try { 
      const m = gameCorrect.move(puzzle.correctMove); 
      correctFrom = m.from;
      correctTo = m.to;
    } catch(e) {}
    
    const gameIncorrect = new Chess(puzzle.fen);
    let incorrectFrom = '', incorrectTo = '';
    try { 
      const m = gameIncorrect.move(puzzle.incorrectMove); 
      incorrectFrom = m.from;
      incorrectTo = m.to;
    } catch(e) {}

    const opts = [
      { move: puzzle.correctMove, fen: gameCorrect.fen(), isCorrect: true, from: correctFrom, to: correctTo },
      { move: puzzle.incorrectMove, fen: gameIncorrect.fen(), isCorrect: false, from: incorrectFrom, to: incorrectTo }
    ].sort(() => Math.random() - 0.5);

    return {
      options: opts,
      isWhiteTurn: puzzle.turn === 'w'
    };
  }, [puzzle]);

  const calculateRatingChange = (currentRating: number, puzzleRating: number, isCorrect: boolean) => {
    const expectedScore = 1 / (1 + Math.pow(10, (puzzleRating - currentRating) / 400));
    const actualScore = isCorrect ? 1 : 0;
    const kFactor = 32;
    return Math.round(kFactor * (actualScore - expectedScore));
  };

  const handleOptionClick = (opt: { move: string; isCorrect: boolean }) => {
    if (selectedMove) return;
    setSelectedMove(opt.move);

    if (puzzle && !attempts[puzzle.id]) {
      const change = calculateRatingChange(userRating, puzzle.rating, opt.isCorrect);
      setUserRating(prev => Math.max(100, prev + change));
      setAttempts(prev => ({
        ...prev,
        [puzzle.id]: { isCorrect: opt.isCorrect, ratingChange: change }
      }));
    }
  };

  const handleNext = () => {
    if (currentPuzzleIndex < puzzles.length - 1) {
      setCurrentPuzzleIndex(prev => prev + 1);
      setSelectedMove(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (difficulty === 'any') {
        fetchMorePuzzles();
      } else {
        // If we are at the end and no more puzzles, just start over for now
        setCurrentPuzzleIndex(0);
        setSelectedMove(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const getBorderStyle = (opt: { move: string; fen: string; isCorrect: boolean; from: string; to: string }) => {
    if (!selectedMove) return 'border-stone-700 hover:border-blue-500 hover:scale-[1.01] cursor-pointer';
    if (opt.isCorrect) return 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)] scale-[1.01]';
    if (selectedMove === opt.move) return 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)] scale-[1.01]';
    return 'border-stone-800 opacity-30 grayscale-[0.8]';
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 font-sans p-4 md:p-8 pb-48">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
        
        {/* Header & Current Position */}
        <div className="w-full flex flex-col items-center gap-6 relative">
          <div className="absolute top-0 right-0 md:right-4 bg-stone-900 px-4 py-2 rounded-xl border border-stone-800 shadow-lg flex items-center gap-3">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <div className="flex flex-col">
              <span className="text-stone-400 text-[10px] uppercase font-bold tracking-wider leading-none">Rating</span>
              <span className="text-xl font-bold text-stone-100 leading-none">{userRating}</span>
            </div>
          </div>

          <header className="text-center w-full relative flex flex-col items-center mt-12 md:mt-0">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-100 mb-4">
              Find The Move
            </h1>
            <p className="text-stone-400 text-lg mb-6">Analyze the game position below and find the best next move!</p>
            
            <div className="flex items-center gap-2 bg-stone-900 p-2 rounded-xl border border-stone-800 shadow-lg relative">
              <Settings2 className="w-5 h-5 text-stone-400 ml-2 pointer-events-none" />
              <select 
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                className="bg-transparent text-stone-200 font-medium pl-2 pr-8 py-2 outline-none cursor-pointer appearance-none"
              >
                <option value="any">Dynamic</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <ChevronDown className="w-4 h-4 text-stone-400 absolute right-4 pointer-events-none" />
            </div>
          </header>

          <div className="w-full max-w-[400px] bg-stone-900 p-4 rounded-2xl shadow-2xl border border-stone-800 mt-4">
            <div className="flex justify-between items-center mb-4 px-2">
              <h2 className="text-xl font-semibold text-stone-100">Current Position</h2>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-stone-200 text-stone-900">
                {isWhiteTurn ? 'White to move' : 'Black to move'}
              </span>
            </div>
            <div className="w-full rounded-md overflow-hidden border-4 border-stone-800 bg-[#ebecd0]" key={`main-${puzzle?.id}`}>
              {puzzle ? (
                <Chessboard 
                  options={{
                    id: "main-board",
                    position: puzzle.fen,
                    boardOrientation: isWhiteTurn ? 'white' : 'black',
                    allowDragging: false,
                    darkSquareStyle: { backgroundColor: '#739552' },
                    lightSquareStyle: { backgroundColor: '#ebecd0' },
                    animationDurationInMs: 200
                  }}
                />
              ) : (
                <div className="w-full aspect-square flex flex-col items-center justify-center gap-4">
                  {fetchError ? (
                    <>
                      <XCircle className="w-12 h-12 text-red-500" />
                      <p className="text-red-400 text-lg font-medium">{fetchError}</p>
                      <button 
                        onClick={fetchMorePuzzles}
                        className="mt-4 px-6 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl transition-colors"
                      >
                        Retry
                      </button>
                    </>
                  ) : (
                    <Loader2 className="w-12 h-12 animate-spin text-stone-500" />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Options (Side by side on desktop) */}
        <div className="w-full flex flex-col items-center gap-12">
          <h2 className="text-3xl font-bold text-stone-100 text-center">
            Select the best next position:
          </h2>
          
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {options.map((opt, i) => (
              <button 
                key={i}
                onClick={() => handleOptionClick(opt)}
                disabled={!!selectedMove}
                className={`relative w-full rounded-3xl overflow-hidden border-4 transition-all duration-300 bg-stone-900 flex flex-col items-center shadow-2xl ${getBorderStyle(opt)}`}
              >
                <div className="w-full bg-stone-800 py-4 text-center border-b border-stone-700">
                  <span className="font-mono text-2xl font-bold text-stone-200">
                    Option {i + 1}: {opt.move}
                  </span>
                </div>

                <div className="w-full pointer-events-none bg-[#ebecd0]" key={`opt-${puzzle?.id}-${opt.move}`}>
                  <Chessboard 
                    options={{
                      id: `option-board-${opt.move.replace(/[^a-zA-Z0-9]/g, '')}`,
                      position: opt.fen,
                      boardOrientation: isWhiteTurn ? 'white' : 'black',
                      allowDragging: false,
                      darkSquareStyle: { backgroundColor: '#739552' },
                      lightSquareStyle: { backgroundColor: '#ebecd0' },
                      animationDurationInMs: 200,
                      arrows: opt.from && opt.to ? [{ startSquare: opt.from, endSquare: opt.to, color: 'rgba(255, 170, 0, 0.8)' }] : []
                    }}
                  />
                </div>

                {selectedMove && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10">
                    {opt.isCorrect ? (
                      <div className="flex flex-col items-center gap-4">
                        <CheckCircle2 className="w-32 h-32 text-green-500 bg-white rounded-full shadow-2xl" />
                        <span className="text-4xl font-bold text-green-400 drop-shadow-lg">Correct!</span>
                      </div>
                    ) : selectedMove === opt.move ? (
                      <div className="flex flex-col items-center gap-4">
                        <XCircle className="w-32 h-32 text-red-500 bg-white rounded-full shadow-2xl" />
                        <span className="text-4xl font-bold text-red-400 drop-shadow-lg">Incorrect</span>
                      </div>
                    ) : null}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback & Next Button */}
        <AnimatePresence>
          {selectedMove && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-0 left-0 right-0 bg-stone-900 border-t border-stone-700 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50"
            >
              <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className={`text-2xl font-bold ${
                      options.find(o => o.move === selectedMove)?.isCorrect ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {options.find(o => o.move === selectedMove)?.isCorrect ? 'Brilliant Move!' : 'That was a Blunder.'}
                    </h3>
                    {puzzle && attempts[puzzle.id] && (
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        attempts[puzzle.id].ratingChange >= 0 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {attempts[puzzle.id].ratingChange >= 0 ? '+' : ''}{attempts[puzzle.id].ratingChange} Rating
                      </span>
                    )}
                  </div>
                  <p className="text-stone-300 text-lg">
                    {puzzle?.explanation}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                  <button
                    onClick={() => setSelectedMove(null)}
                    className="w-full sm:w-auto px-6 py-4 bg-stone-700 hover:bg-stone-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors text-lg whitespace-nowrap"
                  >
                    <Eye className="w-5 h-5" /> Review
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={isLoading && currentPuzzleIndex >= puzzles.length - 1}
                    className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-stone-700 disabled:cursor-not-allowed text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-colors text-xl shadow-lg shadow-blue-900/20 whitespace-nowrap"
                  >
                    {isLoading && currentPuzzleIndex >= puzzles.length - 1 ? (
                      <>Loading... <Loader2 className="w-6 h-6 animate-spin" /></>
                    ) : currentPuzzleIndex < puzzles.length - 1 || difficulty === 'any' ? (
                      <>Next Puzzle <ArrowRight className="w-6 h-6" /></>
                    ) : (
                      <>Start Over <RotateCcw className="w-6 h-6" /></>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
