Tic Tac Toe Web Game
Project description, skills demonstrated and improvement suggestions
Project Description
A multi-page Tic Tac Toe web application where players can create an account, log in, choose a difficulty level, and play against a computer opponent. Wins are tracked per player and displayed on a public leaderboard, so users can compete to reach the top of the rankings.
The project is built with plain HTML, CSS, and JavaScript (no frameworks), and is organized into six pages:
• Home (index.html): Landing page with a welcome message and a "Play Now" button.
• Mode selection (mode.html): Lets the player choose Easy or Hard difficulty.
• Game (gamepage.html): The 3×3 board, showing the current player's name and win count, with Restart, Home, and Change Mode buttons.
• Sign Up (signup.html): Registration form (username, email, password, date of birth).
• Login (loginpage.html): Authentication form for returning players.
• Ranking (rankingpage.html): A table of players sorted by number of wins.
The difficulty is passed through the URL (gamepage.html?mode=easy or ?mode=hard), and the game page loads the matching bot script (botEasy.js or botHard.js).
Skills Demonstrated
Front-end development
• Semantic HTML5 structure (nav, section, footer, forms, tables)
• Consistent layout and navigation across multiple pages with a shared stylesheet (css/styles.css)
• Responsive setup using the viewport meta tag
• Form building with labels and built-in validation (required, email, date, password input types)
JavaScript
• DOM manipulation to update the board, status text, player info, and ranking table
• Event handling for cell clicks, buttons, and form submissions
• Reading URL query parameters with URLSearchParams
• Dynamic script loading based on game mode
• Modular code split into separate files (index.js, login.js, signup.js, ranking.js, botEasy.js, botHard.js)
Game logic and AI
• Win/draw detection and turn management
• Two computer opponents of different strength: a simpler Easy bot and a stronger Hard bot (likely using an optimal strategy such as minimax)
Application features
• User registration and login flow
• Per-player score tracking and a sorted leaderboard
• Clear user flow: Home → Mode → Game → Ranking
General practices
• Separation of concerns (HTML structure, CSS styling, JS behavior)
• Active-link highlighting in the navigation
• Reusable UI components such as buttons and the wrapper container
Suggestions to Improve It
1. Duplicate script loading: gamepage.html loads the bot script dynamically, and then also loads both botEasy.js and botHard.js with static tags. This defeats the purpose of choosing by mode and may cause conflicts if both define the same function names. Keep only one approach.
2. Footer: Only the home page has a footer; adding it to the other pages would make the design consistent.
3. Navigation: The "Game" link goes to the home page, which could be confusing. Renaming it "Home" might be clearer.
4. Security note: If accounts and passwords are stored in localStorage (which seems likely, since there's no backend), passwords are visible to anyone using that browser. That's fine for a learning project, but worth mentioning in the README.
