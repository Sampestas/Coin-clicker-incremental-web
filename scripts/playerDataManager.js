import { formatNumber } from "./textFormattingManager.js";

const rawPlayerData = {
    coins: 0,
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
    if (property === "coins"){
        const el = document.getElementById("coinDisplay");
        if (el) el.textContent = `Coins: ${formatNumber(value)}`;
    }
    else if (property === "coinsPerSecond"){
        const el = document.getElementById("cpsDisplay");
        if (el) el.textContent = `Coins per second: ${formatNumber(value)}`;
    }
    else if (property === "coinsPerClick"){
        const el = document.getElementById("cpcDisplay");
        if (el) el.textContent = `Coins per click: ${formatNumber(value)}`;
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

export function addCoins(amount) {
    player.coins += amount;
}

export function subtractCoins(amount) {
    player.coins -= amount;
}