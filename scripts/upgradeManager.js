import { player, subtractCoins } from './playerDataManager.js';
import { getCoinsPerClick, getCoinsPerSecond } from './statsManager.js';
import { playSound } from './soundManager.js';
import { formatNumber } from './textFormattingManager.js';

export const upgradesData = {
    minerGnome: {
        name: "Gnome-miner",
        description: "+1 coin per second for each gnome-miner",
        baseCost: 10,
        coinsPerSecond: 1,
        coinsPerClick: 0,
    },
    clickMultiplier: {
        name: "Refined pickaxe",
        description: "+2 coins per click for each refined pickaxe level",
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
            upgradeRow.querySelector(".js-cost").textContent = formatNumber(currentCost);

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
        subtractCoins(cost);
        player.upgrades[upgradeId] = (player.upgrades[upgradeId] || 0) + 1;
        player.coinsPerSecond = getCoinsPerSecond();
        player.coinsPerClick = getCoinsPerClick();
        playSound("buy");
        renderUpgrades();
    }
}