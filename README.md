# FindTheMove

FindTheMove is an interactive chess puzzle application designed to help players improve their tactical vision and decision-making skills. Users are presented with a chess position and must choose the best next move from two given options.

## 🌟 Features

### 1. Multiple Difficulty Levels
* **Easy**: Fundamental tactics like mate-in-1, simple forks, and hanging pieces (~1000 rating).
* **Medium**: Intermediate tactics including discovered attacks, pins, and mate-in-2 sequences (~1500 rating).
* **Hard**: Complex calculations, positional sacrifices, and mate-in-3+ sequences (~2000 rating).
* **Dynamic**: Fetches real-time, random puzzles directly from the [Lichess Puzzle API](https://lichess.org/api), offering an infinite variety of challenges at various rating levels.

### 2. Dynamic Rating System
* **Elo-Style Progression**: Users start with a baseline rating of 1500.
* **Risk vs. Reward**: Solving a difficult puzzle yields a higher rating increase than solving an easy one. Conversely, failing an easy puzzle results in a larger rating drop than failing a hard one.
* **Real-time Feedback**: The exact rating change (e.g., `+15 Rating` or `-12 Rating`) is displayed immediately after a move is selected.
* **Review Protection**: Users can replay or review previously attempted puzzles without risking further rating changes.

### 3. Interactive Gameplay
* **Visual Board**: Utilizes `react-chessboard` for a clean, responsive, and interactive chess board. Includes a subtle board-flip option to view the position from the opponent's perspective.
* **Move Validation**: Powered by `chess.js` to ensure all moves are strictly legal and to generate plausible incorrect options for the user to choose from.
* **Scannable Explanations**: After making a choice, users receive a structured breakdown of why the correct move works (✅), why the alternative fails (❌), and the specific tactic involved (💡).
* **On-Board Animations**: The correct move is visually animated on the main board using arrows once the answer is revealed, reinforcing the learning experience.

## 🎨 Design Methods & UX Philosophy

### 1. Aesthetic & Theming
* **Dark Mode Default**: Built using Tailwind CSS's `stone` color palette to reduce eye strain during long puzzle-solving sessions. The deep gray/brown tones provide a premium, focused environment.
* **High Contrast Elements**: Interactive elements (buttons, dropdowns) use distinct background colors (like `blue-600` for primary actions) to stand out against the dark background.
* **Clear Indicators**: A subtle "⬛ Black to move" / "⬜ White to move" indicator above the board removes ambiguity for beginners.

### 2. Immediate Visual Feedback
* **Color Coding**: Success is immediately communicated via green borders and glowing shadows (`shadow-green-500/30`), while failures use red (`shadow-red-500/30`).
* **Micro-interactions**: Buttons scale down slightly on click, and the board highlights the selected move to provide a tactile feel.

### 3. Smooth Animations
* **Framer Motion Integration**: The application uses `motion/react` to animate the appearance of the feedback panel and the transition between puzzles. This prevents jarring layout shifts and makes the experience feel polished.
* **Valence-Matched Feedback**: Success triggers a satisfying, bouncy entrance animation for the feedback panel, while failure is met with a faster, more subdued reveal to match the emotional tone.
* **Loading States**: Spinners (`Loader2` from Lucide) and disabled button states prevent users from interacting with the app while a dynamic puzzle is being fetched.

### 4. Resilient Architecture
* **Graceful Error Handling**: If the Lichess API fails to load a puzzle (due to network issues or rate limiting), the app displays an inline error state directly where the board would be, complete with a "Retry" button, rather than crashing or showing a blank screen.

## 🛠️ Tech Stack

* **Frontend Framework**: React 18 + Vite
* **Styling**: Tailwind CSS
* **Chess Logic**: `chess.js`
* **Chess UI**: `react-chessboard`
* **Animations**: `motion/react` (Framer Motion)
* **Icons**: `lucide-react`
* **External API**: Lichess API (`https://lichess.org/api/puzzle/next`)
