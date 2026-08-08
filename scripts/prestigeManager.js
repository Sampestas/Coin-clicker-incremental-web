import { player } from "./playerDataManager.js";

export const defaultDiamondCost = 10000;

export function prestige(){
    if (player.coins >= defaultDiamondCost){
        let diamondsToAdd = calcAmountOfDiamondsOnPrestige();
        player.coins = 0;
        player.diamonds += diamondsToAdd;
    }
}

export function calcAmountOfDiamondsOnPrestige(){
    return player.coins / defaultDiamondCost;  
}