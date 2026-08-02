import { addCoins, player } from "./playerDataManager.js";
import { renderUpgrades, upgradesData } from "./upgradeManager.js";
import { createClickFloatingText } from "./uiEffectsManager.js";
import { getCoinsPerClick, getCoinsPerSecond } from "./statsManager.js";
import { loadGame, saveGame } from "./saveManager.js";
import { playSound } from "./soundManager.js";

function init() {
    const hasSave = loadGame();

    if (!hasSave){
        player.coins = 0;
        player.coinsPerSecond = getCoinsPerSecond();
        player.coinsPerClick = getCoinsPerClick();
    }

    const clickButton = document.getElementById("clickButton");
    clickButton.addEventListener("click", () => {
        let clickPower = getCoinsPerClick();
        playSound("click");
        addCoins(clickPower);
        renderUpgrades();
        createClickFloatingText(event, clickPower);
    });

    setInterval(() => {
        let passiveIncome = getCoinsPerSecond();

        if (passiveIncome > 0){
            addCoins(passiveIncome);
            renderUpgrades();
        }
    }, 1000);

    setInterval(() => {
        saveGame();
    }, 10000);

    window.addEventListener("beforeunload", () => {
        saveGame();
    })

    renderUpgrades();
}   

document.addEventListener("DOMContentLoaded", init);