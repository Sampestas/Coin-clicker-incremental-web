import { player } from "./playerDataManager.js";
import { upgradesData } from "./upgradeManager.js";

export function getCoinsPerSecond() {
    let passiveIncome = 0;

    for (const key of Object.keys(upgradesData)) {
        const count = player.upgrades[key] || 0;
        passiveIncome += count * upgradesData[key].coinsPerSecond;
    }

    return passiveIncome;
}   

export function getCoinsPerClick() {
    let clickPower = 1;

    for (const key of Object.keys(upgradesData)) {
        const count = player.upgrades[key] || 0;
        clickPower += count * upgradesData[key].coinsPerClick;
    }

    return clickPower; 
}
