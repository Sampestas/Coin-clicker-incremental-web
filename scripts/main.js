import { addCurrency, addCoinsCoinClick, addCoinsPassiveIncome, player } from "./playerDataManager.js";
import { renderUpgrades, upgradesData } from "./upgradeManager.js";
import { createClickFloatingText } from "./uiEffectsManager.js";
import { getCoinsPerClick, getCoinsPerSecond } from "./statsManager.js";
import { loadGame, resetGame, saveGame } from "./saveManager.js";
import { playSound } from "./soundManager.js";
import { isMobileDevice } from "./deviceManager.js";
import { resetUpgrade } from "./developmentManager.js";
import { calcAmountOfDiamondsOnPrestige, defaultDiamondCost, prestige } from "./prestigeManager.js";

function init() {
    const hasSave = loadGame();

    if (!hasSave){
        player.coins = 0;
        player.coinsPerSecond = getCoinsPerSecond();
        player.coinsPerClick = getCoinsPerClick();
    }

    const clickButton = document.getElementById("clickButton");
    const isMobile = isMobileDevice();

    if (isMobile){
        clickButton.addEventListener("touchstart", handleMultipleCoinClicks, {passive: false});
    } else {
        clickButton.addEventListener("click", addCoinsCoinClick);
    }

    const prestigeButton = document.getElementById("prestige-btn");
    prestigeButton.addEventListener("click", (event) => {
        if (player.coins >= defaultDiamondCost){
            createClickFloatingText(event, calcAmountOfDiamondsOnPrestige(), "diamonds");
            prestige();
        }
    });

    setInterval(() => {
        addCoinsPassiveIncome();
    }, 1000);

    setInterval(() => {
        saveGame();
    }, 10000);

    window.addEventListener("beforeunload", () => {
        saveGame();
    })

    renderUpgrades();
    window.playerDataForTest = player;
}   

document.addEventListener("DOMContentLoaded", init);

function handleMultipleCoinClicks(event) {
    event.preventDefault();
    const touches = event.changedTouches;
    for (let i = 0; i < touches.length; i++){
        const touch = touches[i];
        const syntheticEvent = {
            touches: [touch],
            clientX: touch.clientX,
            clientY: touch.clientY,
            pageX: touch.pageX,
            pageY: touch.pageY
        };

        addCoinsCoinClick(syntheticEvent);
    }
}