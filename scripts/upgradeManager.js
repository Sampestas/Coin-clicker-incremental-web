import { player, subtractCurrency } from './playerDataManager.js';
import { getCoinsPerClick, getCoinsPerSecond } from './statsManager.js';
import { playSound } from './soundManager.js';
import { formatNumber } from './textFormattingManager.js';

export const upgradesData = {
    minerGnome: {
        name: "Gnome-miner",
        description: "+1 coin per second for each gnome-miner",
        buyCurrency: "coins",
        baseCost: 10,
        coinsPerSecond: 1,
    },
    refinedPickaxe: {
        name: "Refined pickaxe",
        description: "+2 coins per click for each refined pickaxe level",
        buyCurrency: "coins",
        baseCost: 50,
        coinsPerClick: 2
    },
    managerGnome: {
        name: "Gnome-manager",
        description: "Increases your coins per second multiplier by +1",
        buyCurrency: "coins",
        baseCost: 120,
        coinsIncomeMultiplier: 1
    },
    coinDuplication: {
        name: "Coin Duplication",
        description: "Increase your coins per click multiplier by +1",
        buyCurrency: "coins",
        baseCost: 125,
        coinsClickMultiplier: 1
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

    Object.keys(upgradesData).forEach(key => {
        const data = upgradesData[key];
        const count = player.upgrades[key] || 0;
        const currentCost = getUpgradeCost(key);
        const description = data.description;

        let upgradeRow = container.querySelector(`[data-upgrade-key="${key}"]`);
        if (!upgradeRow){
            const clone = template.content.cloneNode(true);
            const wrapper = clone.querySelector('.upgrade-item');
            if (wrapper) {
                wrapper.setAttribute('data-upgrade-key', key);
            }

            clone.querySelector(".js-name").textContent = data.name;
            clone.querySelector(".upgrade-description").textContent = description;

            const button = clone.querySelector(".js-button");
            button.addEventListener("click", () => buyUpgrade(key));

            container.appendChild(clone);
            
            upgradeRow = container.querySelector(`[data-upgrade-key="${key}"]`);
        }

        if (upgradeRow) {
            upgradeRow.querySelector(".js-count").textContent = "Lvl: " + count;
            upgradeRow.querySelector(".js-cost").textContent = formatNumber(currentCost) + " " + data.buyCurrency;

            const button = upgradeRow.querySelector(".js-button");
            const shouldBeDisabled = player.coins < currentCost;

            if (button.disabled !== shouldBeDisabled) {
                button.disabled = shouldBeDisabled;
                if (shouldBeDisabled) button.classList.add("disabled");
                else button.classList.remove("disabled");
            }
        }
    });
}

function buyUpgrade(upgradeId) {
    const cost = getUpgradeCost(upgradeId);

    if (player.coins >= cost) {
        subtractCurrency(upgradesData[upgradeId].buyCurrency, cost);
        player.upgrades[upgradeId] = (player.upgrades[upgradeId] || 0) + 1;
        player.coinsPerSecond = getCoinsPerSecond();
        player.coinsPerClick = getCoinsPerClick();
        playSound("buy");
        renderUpgrades();
    }
}