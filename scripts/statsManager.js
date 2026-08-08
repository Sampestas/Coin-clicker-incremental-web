import { player } from "./playerDataManager.js";
import { upgradesData } from "./upgradeManager.js";

export function getCoinsPerSecond() {
    let passiveIncome = 0;
    let passiveIncomeMultiplier = 1;

    for (const key of Object.keys(upgradesData)) {
        let data = upgradesData[key];
        const count = player.upgrades[key] || 0;

        console.log(data.coinsIncomeMultiplier)

        if (data.coinsPerSecond){
            passiveIncome += count * data.coinsPerSecond;
        }
        if (data.coinsIncomeMultiplier){
            passiveIncomeMultiplier += count * data.coinsIncomeMultiplier;
            console.log(data.name ,count * data.coinsIncomeMultiplier)
        }
    }
    console.log(passiveIncome, passiveIncomeMultiplier)

    return passiveIncome * passiveIncomeMultiplier;
}   

export function getCoinsPerClick() {
    let clickPower = 1;
    let coinsClickMultiplier = 1;

    for (const key of Object.keys(upgradesData)) {
        let data = upgradesData[key];
        const count = player.upgrades[key] || 0;

        if (data.coinsPerClick){
            clickPower += count * data.coinsPerClick;
        }
        if (data.coinsClickMultiplier){
            coinsClickMultiplier += count * data.coinsClickMultiplier;
        }
    }

    return clickPower * coinsClickMultiplier; 
}
