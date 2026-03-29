export type Puzzle = {
  id: string;
  fen: string;
  turn: 'w' | 'b';
  correctMove: string;
  incorrectMove: string;
  explanation: {
    correct: string;
    incorrect: string;
    tactic?: string;
  };
  difficulty: 'easy' | 'medium' | 'hard' | 'any';
  rating: number;
};

export const STATIC_PUZZLES: Puzzle[] = [
  {
    id: 'easy-1',
    fen: 'r1bq1rk1/pppp1ppp/2n5/4p1NQ/2B1P3/8/PPPP1PPP/R1B1K2R w KQ - 0 1',
    turn: 'w',
    correctMove: 'Qxh7#',
    incorrectMove: 'Nxf7',
    explanation: {
      correct: 'Qxh7# is a forced checkmate, protected by the Knight on g5.',
      incorrect: 'Nxf7 wins material but misses the immediate win.',
      tactic: 'Mate in 1'
    },
    difficulty: 'easy',
    rating: 1000
  },
  {
    id: 'easy-2',
    fen: '6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1',
    turn: 'w',
    correctMove: 'Re8#',
    incorrectMove: 'Kf1',
    explanation: {
      correct: 'Re8# delivers a classic back-rank checkmate.',
      incorrect: 'Kf1 allows Black to escape or prolong the game.',
      tactic: 'Back-rank Mate'
    },
    difficulty: 'easy',
    rating: 1050
  },
  {
    id: 'easy-3',
    fen: '4k3/4q3/8/8/8/8/8/4R1K1 w - - 0 1',
    turn: 'w',
    correctMove: 'Rxe7+',
    incorrectMove: 'Kf1',
    explanation: {
      correct: 'Rxe7+ wins the Queen, which was pinned to the King.',
      incorrect: 'Kf1 misses the opportunity to win the pinned Queen.',
      tactic: 'Pin / Material Win'
    },
    difficulty: 'easy',
    rating: 950
  },
  {
    id: 'easy-4',
    fen: '8/2r1k3/8/8/8/2N5/8/4K3 w - - 0 1',
    turn: 'w',
    correctMove: 'Nd5+',
    incorrectMove: 'Ne2',
    explanation: {
      correct: 'Nd5+ is a Royal Fork, attacking both the King and the Rook.',
      incorrect: 'Ne2 is a passive move that misses the winning fork.',
      tactic: 'Knight Fork'
    },
    difficulty: 'easy',
    rating: 1100
  },
  {
    id: 'easy-5',
    fen: '8/P7/8/8/8/8/6k1/4K3 w - - 0 1',
    turn: 'w',
    correctMove: 'a8=Q',
    incorrectMove: 'Kd2',
    explanation: {
      correct: 'a8=Q promotes the pawn to a Queen, securing a massive endgame advantage.',
      incorrect: 'Kd2 is too slow and allows Black to potentially draw.',
      tactic: 'Pawn Promotion'
    },
    difficulty: 'easy',
    rating: 900
  },
  {
    id: 'medium-1',
    fen: 'r1b2rk1/pp3ppp/2n1p3/q7/1b1P4/3B1N2/PP1B1PPP/R2Q1RK1 w - - 0 12',
    turn: 'w',
    correctMove: 'Bxh7+',
    incorrectMove: 'a3',
    explanation: {
      correct: 'Bxh7+ is the classic Greek Gift sacrifice, exposing the Black King.',
      incorrect: 'a3 is too slow and misses the attacking opportunity.',
      tactic: 'Greek Gift Sacrifice'
    },
    difficulty: 'medium',
    rating: 1500
  },
  {
    id: 'medium-2',
    fen: 'r4rk1/1pp2ppp/p1np4/4p3/1PB1P1n1/P1NP1N1q/2P1QP2/R4RK1 b - - 1 14',
    turn: 'b',
    correctMove: 'Nd4',
    incorrectMove: 'Nf6',
    explanation: {
      correct: 'Nd4! attacks the Queen and the f3 Knight, removing the defender of h2.',
      incorrect: 'Nf6 retreats and loses the initiative.',
      tactic: 'Removing the Defender'
    },
    difficulty: 'medium',
    rating: 1600
  },
  {
    id: 'medium-3',
    fen: 'r2q1rk1/1b2bppp/p1n1pn2/1p6/3P4/2NB1N2/PP2QPPP/R1BR2K1 w - - 4 14',
    turn: 'w',
    correctMove: 'd5',
    incorrectMove: 'a3',
    explanation: {
      correct: 'd5! is a strong central break that opens lines for the White pieces.',
      incorrect: 'a3 is a prophylactic move that ignores the central tension.',
      tactic: 'Central Break'
    },
    difficulty: 'medium',
    rating: 1550
  },
  {
    id: 'medium-4',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 5',
    turn: 'w',
    correctMove: 'Nxe5',
    incorrectMove: 'd3',
    explanation: {
      correct: 'Nxe5! is a temporary sacrifice, setting up a d4 fork to regain the piece.',
      incorrect: 'd3 is solid but misses the tactical sequence to gain the center.',
      tactic: 'Center Fork Trick'
    },
    difficulty: 'medium',
    rating: 1450
  },
  {
    id: 'medium-5',
    fen: 'rnbqk2r/pppp1ppp/8/4P3/2B1n3/8/PPPP1bPP/RNBQK1NR w KQkq - 0 5',
    turn: 'w',
    correctMove: 'Kf1',
    incorrectMove: 'Ke2',
    explanation: {
      correct: 'Kf1 is the only safe square, avoiding further checks.',
      incorrect: 'Ke2 walks into a deadly attack after Qh4+.',
      tactic: 'King Safety'
    },
    difficulty: 'medium',
    rating: 1500
  },
  {
    id: 'hard-1',
    fen: 'r1b1k2r/pp1p1ppp/2n1pn2/q7/1b1P4/2N2N2/PPPB1PPP/R2QKB1R w KQkq - 5 8',
    turn: 'w',
    correctMove: 'a3',
    incorrectMove: 'Bd3',
    explanation: {
      correct: 'a3 forces the Bishop to make a decision, gaining space or the Bishop pair.',
      incorrect: 'Bd3 allows Black to maintain the pin and tension.',
      tactic: 'Prophylaxis / Space'
    },
    difficulty: 'hard',
    rating: 2000
  },
  {
    id: 'hard-2',
    fen: 'r3k2r/pppq1ppp/2np1n2/2b1p3/2B1P1b1/2NP1N2/PPP1QPPP/R1B2RK1 b kq - 4 8',
    turn: 'b',
    correctMove: 'Nd4',
    incorrectMove: 'O-O',
    explanation: {
      correct: 'Nd4! is a powerful outpost, exploiting the pin on the f3 Knight.',
      incorrect: 'O-O is safe but misses the immediate tactical pressure.',
      tactic: 'Outpost / Pin'
    },
    difficulty: 'hard',
    rating: 2100
  },
  {
    id: 'hard-3',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2NB1N2/PP3PPP/R1BQR1K1 w - - 4 11',
    turn: 'w',
    correctMove: 'Ne5',
    incorrectMove: 'a3',
    explanation: {
      correct: 'Ne5! establishes a strong Knight in the center, preparing for an attack.',
      incorrect: 'a3 is too slow and allows Black to equalize easily.',
      tactic: 'Central Outpost'
    },
    difficulty: 'hard',
    rating: 1950
  },
  {
    id: 'hard-4',
    fen: 'r2q1rk1/1pp1bppp/p1n1pn2/3p4/3P4/2N1PN2/PPP1QPPP/R1BR2K1 w - - 4 11',
    turn: 'w',
    correctMove: 'e4',
    incorrectMove: 'a3',
    explanation: {
      correct: 'e4! challenges the center immediately, opening lines for the Bishop and Rook.',
      incorrect: 'a3 is passive and lets Black solidify their position.',
      tactic: 'Pawn Break'
    },
    difficulty: 'hard',
    rating: 2050
  },
  {
    id: 'hard-5',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2NB1N2/PP3PPP/R1BQR1K1 b - - 4 11',
    turn: 'b',
    correctMove: 'Nb4',
    incorrectMove: 'a6',
    explanation: {
      correct: 'Nb4! attacks the strong Bishop on d3, reducing White\'s attacking potential.',
      incorrect: 'a6 is a waiting move that allows White to continue their plan.',
      tactic: 'Piece Exchange'
    },
    difficulty: 'hard',
    rating: 1900
  }
];
