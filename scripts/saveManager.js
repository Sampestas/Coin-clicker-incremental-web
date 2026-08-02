import { player } from "./playerDataManager.js";
import { getCoinsPerClick, getCoinsPerSecond } from "./statsManager.js";
import { showOfflineModal } from "./uiEffectsManager.js";

const SAVE_KEY = "coin_clicker_save_V1";

export function saveGame() {
    const saveData = {
        coins: player.coins,
        upgrades: player.upgrades,
        lastTime: Date.now()
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
        
        if (saveData.lastTime && player.coinsPerSecond > 0) {
            const timePassed = Date.now() - saveData.lastTime;
            const secondsPassed = Math.floor(timePassed / 1000);

            if (secondsPassed > 10) {
                const coinsEarned = secondsPassed * player.coinsPerSecond;
                player.coins += coinsEarned;
                showOfflineModal(coinsEarned, secondsPassed);
            }
        }

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
