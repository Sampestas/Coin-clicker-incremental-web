import { player } from "./playerDataManager.js";
import { getCoinsPerClick, getCoinsPerSecond } from "./statsManager.js";

const SAVE_KEY = "coin_clicker_save_V1";

export function saveGame() {
    const saveData = {
        coins: player.coins,
        upgrades: player.upgrades
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    console.log("Game saved!");
}

export function loadGame() {
    const rawData = localStorage.getItem(SAVE_KEY);
    if (!rawData) return false;

    try {
        const saveData = JSON.parse(rawData);
        player.coins = saveData.coins || 0;

        if (saveData.upgrades) {
            player.upgrades = saveData.upgrades;
        }

        player.coinsPerSecond = getCoinsPerSecond();
        player.coinsPerClick = getCoinsPerClick();

        console.log("Loaded game!")
        return true;
    } catch (error) {
        console.error("Error loading the game data!", error);
        return false;
    }
}

export function resetGame() {
    localStorage.removeItem(SAVE_KEY);
    location.reload();
}
