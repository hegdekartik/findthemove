export type Puzzle = {
  id: string;
  fen: string;
  turn: 'w' | 'b';
  correctMove: string;
  incorrectMove: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'any';
  rating: number;
};

export const STATIC_PUZZLES: Puzzle[] = [
  // Easy Puzzles (Mate in 1 or simple material win)
  {
    id: 'easy-1',
    fen: 'r1bq1rk1/pppp1ppp/2n5/4p1NQ/2B1P3/8/PPPP1PPP/R1B1K2R w KQ - 0 1',
    turn: 'w',
    correctMove: 'Qxh7#',
    incorrectMove: 'Nxf7',
    explanation: 'Qxh7# is a forced checkmate! The Knight on g5 protects the Queen. Nxf7 wins material but misses the immediate win.',
    difficulty: 'easy',
    rating: 1000
  },
  {
    id: 'easy-2',
    fen: '6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1',
    turn: 'w',
    correctMove: 'Re8#',
    incorrectMove: 'Kf1',
    explanation: 'Re8# delivers a classic back-rank checkmate. The Black King is trapped by its own pawns.',
    difficulty: 'easy',
    rating: 1050
  },
  {
    id: 'easy-3',
    fen: '4k3/4q3/8/8/8/8/8/4R1K1 w - - 0 1',
    turn: 'w',
    correctMove: 'Rxe7+',
    incorrectMove: 'Kf1',
    explanation: 'Rxe7+ wins the Queen! The Black Queen was pinned to the King by the Rook.',
    difficulty: 'easy',
    rating: 950
  },
  {
    id: 'easy-4',
    fen: '8/2r1k3/8/8/8/2N5/8/4K3 w - - 0 1',
    turn: 'w',
    correctMove: 'Nd5+',
    incorrectMove: 'Ne2',
    explanation: 'Nd5+ is a Royal Fork! The Knight attacks both the Black King and the Rook at the same time, winning the exchange.',
    difficulty: 'easy',
    rating: 1100
  },
  {
    id: 'easy-5',
    fen: '8/P7/8/8/8/8/6k1/4K3 w - - 0 1',
    turn: 'w',
    correctMove: 'a8=Q',
    incorrectMove: 'Kd2',
    explanation: 'a8=Q promotes the pawn to a Queen, securing a massive material advantage in the endgame.',
    difficulty: 'easy',
    rating: 900
  },

  // Medium Puzzles (Mate in 2 or discovered attacks)
  {
    id: 'medium-1',
    fen: 'r1b2rk1/pp3ppp/2n1p3/q7/1b1P4/3B1N2/PP1B1PPP/R2Q1RK1 w - - 0 12',
    turn: 'w',
    correctMove: 'Bxh7+',
    incorrectMove: 'a3',
    explanation: 'Bxh7+ is the classic Greek Gift sacrifice! It exposes the Black King, leading to a strong attack.',
    difficulty: 'medium',
    rating: 1500
  },
  {
    id: 'medium-2',
    fen: 'r4rk1/1pp2ppp/p1np4/4p3/1PB1P1n1/P1NP1N1q/2P1QP2/R4RK1 b - - 1 14',
    turn: 'b',
    correctMove: 'Nd4',
    incorrectMove: 'Nf6',
    explanation: 'Nd4! attacks the Queen and the f3 Knight, which is the only defender of h2. White cannot save both.',
    difficulty: 'medium',
    rating: 1600
  },
  {
    id: 'medium-3',
    fen: 'r2q1rk1/1b2bppp/p1n1pn2/1p6/3P4/2NB1N2/PP2QPPP/R1BR2K1 w - - 4 14',
    turn: 'w',
    correctMove: 'd5',
    incorrectMove: 'a3',
    explanation: 'd5! is a strong central break that opens lines for the White pieces and challenges Black\'s setup.',
    difficulty: 'medium',
    rating: 1550
  },
  {
    id: 'medium-4',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 5',
    turn: 'w',
    correctMove: 'Nxe5',
    incorrectMove: 'd3',
    explanation: 'Nxe5! is a temporary sacrifice. If Nxe5, then d4 forks the Knight and Bishop, regaining the piece with a strong center.',
    difficulty: 'medium',
    rating: 1450
  },
  {
    id: 'medium-5',
    fen: 'rnbqk2r/pppp1ppp/8/4P3/2B1n3/8/PPPP1bPP/RNBQK1NR w KQkq - 0 5',
    turn: 'w',
    correctMove: 'Kf1',
    incorrectMove: 'Ke2',
    explanation: 'Kf1 is the only safe square. Ke2 walks into a deadly attack after Qh4+.',
    difficulty: 'medium',
    rating: 1500
  },

  // Hard Puzzles (Mate in 3 or complex tactics)
  {
    id: 'hard-1',
    fen: 'r1b1k2r/pp1p1ppp/2n1pn2/q7/1b1P4/2N2N2/PPPB1PPP/R2QKB1R w KQkq - 5 8',
    turn: 'w',
    correctMove: 'a3',
    incorrectMove: 'Bd3',
    explanation: 'a3 forces the Bishop to make a decision. If it retreats, White gains space. If it exchanges, White gets the Bishop pair.',
    difficulty: 'hard',
    rating: 2000
  },
  {
    id: 'hard-2',
    fen: 'r3k2r/pppq1ppp/2np1n2/2b1p3/2B1P1b1/2NP1N2/PPP1QPPP/R1B2RK1 b kq - 4 8',
    turn: 'b',
    correctMove: 'Nd4',
    incorrectMove: 'O-O',
    explanation: 'Nd4! is a powerful outpost. It attacks the Queen and puts immense pressure on f3, exploiting the pin on the Knight.',
    difficulty: 'hard',
    rating: 2100
  },
  {
    id: 'hard-3',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2NB1N2/PP3PPP/R1BQR1K1 w - - 4 11',
    turn: 'w',
    correctMove: 'Ne5',
    incorrectMove: 'a3',
    explanation: 'Ne5! establishes a strong Knight in the center, preparing for a potential kingside attack or queenside expansion.',
    difficulty: 'hard',
    rating: 1950
  },
  {
    id: 'hard-4',
    fen: 'r2q1rk1/1pp1bppp/p1n1pn2/3p4/3P4/2N1PN2/PPP1QPPP/R1BR2K1 w - - 4 11',
    turn: 'w',
    correctMove: 'e4',
    incorrectMove: 'a3',
    explanation: 'e4! challenges the center immediately. It opens lines for the Bishop and Rook, creating dynamic play.',
    difficulty: 'hard',
    rating: 2050
  },
  {
    id: 'hard-5',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2NB1N2/PP3PPP/R1BQR1K1 b - - 4 11',
    turn: 'b',
    correctMove: 'Nb4',
    incorrectMove: 'a6',
    explanation: 'Nb4! attacks the strong Bishop on d3. Exchanging it reduces White\'s attacking potential on the kingside.',
    difficulty: 'hard',
    rating: 1900
  }
];
