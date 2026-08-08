import { player } from "./playerDataManager.js";

export function clearCoins(){
    player.coins = 0;
}

export function resetUpgrade(upgradeName){
    player.upgrades[upgradeName] = 0;
}