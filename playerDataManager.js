const rawPlayerData = {
    coins: 0,
    coinsPerSecond: 0,
    coinsPerClick: 1,
    upgrades: {},
};

function updateUI(property, value){
    if (property === "coins"){
        const el = document.getElementById("coinDisplay");
        if (el) el.textContent = `Coins: ${value}`;
    }
    else if (property === "coinsPerSecond"){
        const el = document.getElementById("cpsDisplay");
        if (el) el.textContent = `Coins per second: ${value}`;
    }
    else if (property === "coinsPerClick"){
        const el = document.getElementById("cpcDisplay");
        if (el) el.textContent = `Coins per click: ${value}`;
    }
}

export const player = new Proxy(rawPlayerData, {
    set(target, property, value){
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