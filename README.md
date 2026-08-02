<h1><p align="center">🪙 Coin Clicker Incremental 🪙</p></h1>

## My first ever project in web development using HTML, CSS, JavaScript
- This project was made in about 12 hours total time in a span of 2 days in learning purposes

## 🚀 Key Features

* **Scalable Architecture**: Adding a new upgrade takes less than 5 seconds. All game content is dynamically generated from a single static source of truth.
* **Modern Proxy State Management**: Built-in JavaScript `Proxy` powers the data engine. The user interface updates automatically whenever player data or statistics change.
* **Persistent Auto-Save System**: Player progress (coins and upgrades) is secured locally, protecting data on page refreshes or tab closures.
* **UI & Visual Effects**: Features custom click popups that display real-time click power dynamic stats, a dedicated stats dashboard, and an integrated scrolling upgrade list.

## 🛠️ Modular System Design

The project strictly follows the **Separation of Concerns (SoC)** principle, isolating the codebase into distinct, specialized JavaScript modules:

1. **`main.js`** — The control center. It initializes the game loop (setInterval), manages event listeners, and coordinates the startup sequence.
2. **`playerDataManager.js`** — The core state machine. Houses the `player` state wrapped in a `Proxy` wrapper to automatically bind data modifications directly to DOM rendering.
3. **`upgradeManager.js`** — The inventory and retail logic. Contains the full data dictionary of all available purchases, runs progressive cost algorithms, and handles custom HTML `<template>` cloning.
4. **`statsManager.js`** — The mathematical layer. Calculates advanced metrics such as total Coins Per Second (CPS) and Coins Per Click (CPC) using optimized object iteration.
5. **`saveManager.js`** — The persistence engine. Automates local browser data operations using JSON compilation to smoothly write and read player history.
6. **`uiEffectsManager.js`** — The graphics and effects module. Creates independent absolute floating point text nodes dynamically tracked to coordinates for immersion.

## 🔧 Installation & Local Setup

Since this project utilizes native ES6 Modules (`type="module"`), running it directly via double-clicking the `index.html` file will trigger CORS security blockages. It must be executed over a local HTTP environment.

1. Ensure you have **Node.js** installed on your system.
2. Open your terminal in the project directory.
3. Boot up a lightweight file distribution server using `npx`:
   ```bash
   npx http-server .
   ```
4. Copy the generated network address (typically `http://localhost:8080`) and open it inside Google Chrome or any modern web browser.

## 🎨 Technologies Used

* **HTML5** (Structure & Canvas templating)
* **CSS3** (Flexbox, CSS Grid layout, Custom Webkit scrollbars)
* **JavaScript ES6+** (Modules, Proxies, LocalStorage APIs)
