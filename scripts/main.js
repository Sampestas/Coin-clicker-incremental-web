import { addCoins, player } from "./playerDataManager.js";
import { renderUpgrades, upgradesData } from "./upgradeManager.js";
import { createClickFloatingText } from "./uiEffectsManager.js";
import { getCoinsPerClick, getCoinsPerSecond } from "./statsManager.js";
import { loadGame, saveGame } from "./saveManager.js";
import { playSound } from "./soundManager.js";
import { isMobileDevice } from "./deviceManager.js";

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
        clickButton.addEventListener("click", onCoinClick);
    }

    console.log(isMobile);

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
    window.playerDataForTest = player;
}   

document.addEventListener("DOMContentLoaded", init);

function onCoinClick(event) {
    let clickPower = getCoinsPerClick();
    playSound("click");
    addCoins(clickPower);
    renderUpgrades();
    createClickFloatingText(event, clickPower);
}

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

        onCoinClick(syntheticEvent);
    }
}