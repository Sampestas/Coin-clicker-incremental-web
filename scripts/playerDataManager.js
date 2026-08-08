import { calcAmountOfDiamondsOnPrestige, defaultDiamondCost } from "./prestigeManager.js";
import { playSound } from "./soundManager.js";
import { getCoinsPerClick, getCoinsPerSecond } from "./statsManager.js";
import { formatNumber } from "./textFormattingManager.js";
import { createClickFloatingText } from "./uiEffectsManager.js";
import { renderUpgrades } from "./upgradeManager.js";

const rawPlayerData = {
    coins: 0,
    diamonds: 0,
    coinsPerSecond: 0,
    coinsPerClick: 1,
    upgrades: {},
};

/**
 * 
 * @param {string} property 
 * @param {number} value 
 */
function updateUI(property, value){
    switch (property) {
        case "coins": {
            const elCoin = document.getElementById("coinDisplay");
            if (elCoin) elCoin.textContent = `Coins: ${formatNumber(value)}`;

            const diamondAmountPrestige = document.getElementById("dmnd-amount-prestige");
            if (diamondAmountPrestige){
                diamondAmountPrestige.textContent = formatNumber(calcAmountOfDiamondsOnPrestige());
            }
            break;
        }
        case "diamonds": {
            const elDiamond = document.getElementById("diamondsDisplay");
            if (elDiamond) elDiamond.textContent = `Diamonds: ${formatNumber(value)}`;
            break;
        }
        case "coinsPerSecond": {
            const elCPS = document.getElementById("cpsDisplay");
            if (elCPS) elCPS.textContent = `Coins per second: ${formatNumber(value)}`;
            break;
        }
        case "coinsPerClick": {
            const elCPC = document.getElementById("cpcDisplay");
            if (elCPC) elCPC.textContent = `Coins per click: ${formatNumber(value)}`;
            break;
        }
    }
}


export const player = new Proxy(rawPlayerData, {
    set(target, property, value){

        if (property === "upgrades"){
            target.upgrades = value || {};
            return true;
        }

        target[property] = value;
        updateUI(property, value);
        return true;
    },

    get(target, property){
        return target[property];
    }
});

export function addCoinsPassiveIncome() {
    let passiveIncome = getCoinsPerSecond();
    if (passiveIncome > 0) {
        addCurrency("coins", passiveIncome);
        renderUpgrades();
    }
}

export function addCoinsCoinClick(event) {
    let coinsPerClick = getCoinsPerClick();
    playSound("click");
    addCurrency("coins", coinsPerClick);
    renderUpgrades();
    createClickFloatingText(event, coinsPerClick);
}

export function addCurrency(currency, amount) {
    console.log(player[currency])
    if (currency in player){
        player[currency] += amount;
    }
}

export function subtractCurrency(currency, amount) {
    if (currency in player){
        player[currency] -= amount;
    }
}