# Contributing to FindTheMove

Thank you for your interest in contributing to FindTheMove! This document provides an overview of the project structure and how you can add new features or puzzles.

## 🛠️ Local Development Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## 📂 Project Structure

* `src/App.tsx`: The main application component. Contains the UI, state management, Lichess API integration, and the Elo rating calculation logic.
* `src/puzzles.ts`: Contains the TypeScript definitions for the `Puzzle` type and the hardcoded `STATIC_PUZZLES` array.
* `src/main.tsx`: The React entry point.
* `src/index.css`: Global Tailwind CSS styles.

## 🧩 Adding New Static Puzzles

If you want to add new curated puzzles to the "Easy", "Medium", or "Hard" difficulties, you can edit the `STATIC_PUZZLES` array in `src/puzzles.ts`.

### Puzzle Object Structure

```typescript
{
  id: 'unique-id-here',
  fen: 'r1bq1rk1/pppp1ppp/2n5/4p1NQ/2B1P3/8/PPPP1PPP/R1B1K2R w KQ - 0 1', // The starting position
  turn: 'w', // 'w' for white to move, 'b' for black
  correctMove: 'Qxh7#', // Standard Algebraic Notation (SAN)
  incorrectMove: 'Nxf7', // A plausible but incorrect move in SAN
  explanation: 'Explain why the correct move wins and the incorrect move fails.',
  difficulty: 'easy', // 'easy', 'medium', or 'hard'
  rating: 1000 // Estimated Elo rating of the puzzle
}
```

**Guidelines for new puzzles:**
1. **Verify the FEN**: Ensure the FEN string is completely accurate.
2. **Plausible Incorrect Move**: The `incorrectMove` should be a legal move that a player might actually consider (e.g., a tempting capture that falls into a trap).
3. **Clear Explanation**: Keep the explanation concise but educational.

## 📈 Understanding the Rating System

The app uses a simplified Elo rating system to adjust the user's score dynamically. The logic is located in `src/App.tsx` within the `calculateRatingChange` function:

```typescript
const calculateRatingChange = (currentRating: number, puzzleRating: number, isCorrect: boolean) => {
  const expectedScore = 1 / (1 + Math.pow(10, (puzzleRating - currentRating) / 400));
  const actualScore = isCorrect ? 1 : 0;
  const kFactor = 32; // Determines the maximum rating change per puzzle
  return Math.round(kFactor * (actualScore - expectedScore));
};
```
*   **kFactor**: Currently set to 32. This means the maximum rating change for a single puzzle is ±32 points.
*   **Dynamic Puzzles**: The Lichess API provides a `rating` for each puzzle, which is fed directly into this formula.
