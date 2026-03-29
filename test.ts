import { Chess } from 'chess.js';
const fen = 'r1bq1rk1/pppp1ppp/2n5/4p1NQ/2B1P3/8/PPPP1PPP/R1B1K2R w KQ - 0 1';
const c = new Chess(fen);
try {
  c.move('Qxh7#');
  console.log('Correct move FEN:', c.fen());
} catch (e) {
  console.log('Error correct:', e.message);
}
const c2 = new Chess(fen);
try {
  c2.move('Nxf7');
  console.log('Incorrect move FEN:', c2.fen());
} catch (e) {
  console.log('Error incorrect:', e.message);
}
