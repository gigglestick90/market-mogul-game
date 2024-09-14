# Project Overview
Market Mogul is an educational board game that simulates an investing career. Players progress through life stages, making investment decisions using a unique dice-based risk system. The game combines elements of chance, strategy, and financial education to create an engaging experience that teaches fundamental investing concepts.

# Feature Requirements
- Game Board
* Circular "Life Track" divided into decades
* Each space represents a year in the player's life

- Risk Dice System
* Three types of dice: Blue (low risk), Green (moderate risk), Red (high risk)
* Each die has different probabilities for success, failure, and normal outcomes
* Outcomes affect investment returns and overall market conditions

- Investment Options
* Stocks, Bonds, Real Estate, Mutual Funds, ETFs
* Each option associated with a specific risk level and dice type

- Life Events
* Career advancements, family changes, major purchases, unexpected events
* Affect financial goals and decision-making

- Market Dynamics
* Dynamic market conditions influenced by dice rolls and game events
* Bull and bear markets, recessions, and booms

# Game Flow
1. Roll dice / advance year
2. Resolve any life events
3. Make investment decisions
4. Roll appropriate risk dice for investments
5. Calculate returns and update net worth
6. Adjust market conditions based on outcomes
7. Check for win/lose conditions
8. Next player's turn

Players compete to achieve the highest financial success. The game ends when one of these conditions is met:

* A player reaches a predefined net worth (e.g., $10 million)
* All players complete a full circuit of the Life Track (retirement)
* A set number of rounds/years have passed

The winner is determined by:

* Highest net worth
* Most diverse and stable investment portfolio
* Achievement of personal financial goals set at the beginning of the game

While players don't get eliminated, they can face significant setbacks:

* Net worth drops below zero (player must take on "debt" and faces penalties)
* Failure to meet important financial milestones (e.g., unable to pay for necessary life events)

# Game Rules
1. Turn Order: Determined randomly at the start of the game
2. Movement: Players move one space (year) per turn
3. Investing:
* Players can invest any amount from their available cash each turn
* Must use the appropriate risk dice for the chosen investment type
* Can diversify by making multiple investments in one turn
4. Risk Dice:
* Blue Dice (d6): 100% Normal (6 Normal)
* Green Dice (d6): 16.67% Skull (1 Skull), 16.67% Star (1 Star), 66.67% Normal (4 Normal)
* Red Dice (d8): 37.5% Skull (3 Skulls), 25% Star (2 Stars), 37.5% Normal (3 Normal)
5. Life Events:
* Must be resolved when landed on or triggered
* May require financial decisions or payments
6. Market Conditions:
* Updated each round based on overall dice outcomes
* Affect returns on investments
7. Education:
* Players earn "Knowledge Points" for making informed decisions
* Can be spent on "Financial Advisor" tips or to mitigate bad luck

# Technical Requirements
* We will use NextJS and Shadcn for the frontend
* Digital game board with animated player movements
* 3D dice rolling simulation with clear outcome displays
* Player dashboard showing current finances, investments, and goals
* Market condition tracker and visualizer
* Life event card system with decision-making interface
* Investment interface for buying, selling, and portfolio management
* Multiplayer support (local or online)
* Save/Load game functionality
* Tutorial mode for new players

# Current File Structure
.
├── app
│   ├── fonts
│   │   ├── GeistVF.woff
│   │   └── GeistMonoVF.woff
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   └── ui
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input-otp.tsx
│       ├── input.tsx
│       ├── progress.tsx
│       ├── slider.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       └── tooltip.tsx
├── hooks
│   └── use-toast.ts
├── lib
│   └── utils.ts
├── requirements
│   └── frontend_instructions.md
├── .eslintrc.json
├── .gitignore
├── components.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json

