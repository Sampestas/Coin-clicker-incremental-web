import { player, subtractCoins } from './playerDataManager.js';
import { getCoinsPerClick, getCoinsPerSecond } from './statsManager.js';
import { playSound } from './soundManager.js';

export const upgradesData = {
    minerGnome: {
        name: "Gnome-miner",
        baseCost: 10,
        coinsPerSecond: 1,
        coinsPerClick: 0,
    },
    clickMultiplier: {
        name: "Refined pickaxe",
        baseCost: 50,
        coinsPerSecond: 0,
        coinsPerClick: 2
    }
};

export function getUpgradeCost(upgradeId) {
    const upgrade = upgradesData[upgradeId];
    const currentCount = player.upgrades[upgradeId] || 0;
    return Math.floor(upgrade.baseCost * Math.pow(1.15, currentCount));
}

export function renderUpgrades() {
    const container = document.getElementById("upgradeContainer");
    const template = document.getElementById("upgradeTemplate");
    if (!container || !template) return;
    container.innerHTML = "";

    Object.keys(upgradesData).forEach(key => {
        const data = upgradesData[key];
        const count = player.upgrades[key] || 0;
        const currentCost = getUpgradeCost(key);

        const clone = template.content.cloneNode(true);
        clone.querySelector(".js-name").textContent = data.name;
        clone.querySelector(".js-count").textContent = count;
        clone.querySelector(".js-cost").textContent = currentCost;

        const button = clone.querySelector(".js-button");
        if (player.coins < currentCost){
            button.disabled = true;
            button.classList.add("disabled");
        }

        button.addEventListener("click", () => buyUpgrade(key));
        container.appendChild(clone);
    });
}

function buyUpgrade(upgradeId) {
    const cost = getUpgradeCost(upgradeId);

    if (player.coins >= cost) {
        subtractCoins(cost);
        player.upgrades[upgradeId] = (player.upgrades[upgradeId] || 0) + 1;
        player.coinsPerSecond = getCoinsPerSecond();
        player.coinsPerClick = getCoinsPerClick();
        playSound("buy");
        renderUpgrades();
    }
}