import { formatNumber } from "./textFormattingManager.js";

export function createClickFloatingText(event, clickPower, currency) {
    const floatingDiv = document.createElement("div");
    floatingDiv.textContent = "+" + formatNumber(clickPower);
    floatingDiv.classList.add("floating-text");

    if (currency === "diamonds"){
        floatingDiv.classList.add("blue-text");
    }

    let x,y;

    if (event.touches && event.touches.length > 0) {
        x = event.touches[0].pageX || event.touches[0].clientX;
        y = event.touches[0].pageY || event.touches[0].clientY;
    } else if (event.changedTouches && event.changedTouches.length > 0) {
        x = event.changedTouches[0].pageX || event.changedTouches[0].clientX;
        y = event.changedTouches[0].pageY || event.changedTouches[0].clientY;
    } else if (event.clientX !== undefined) {
        x = event.pageX || event.clientX + window.pageXOffset;
        y = event.pageY || event.clientY + window.pageYOffset;
    } else {
        x = window.innerWidth / 2;
        y = window.innerHeight / 2;
    }

    floatingDiv.style.left = (x - 15) + "px";
    floatingDiv.style.top = (y - 20) + "px";
    document.body.appendChild(floatingDiv);

    setTimeout(() => {
        floatingDiv.remove();
    }, 800);
}

export function showOfflineModal(coins, seconds) {
    const modal = document.getElementById("offlineModal");
    const timeSpan = document.getElementById("offlineTime");
    const coinsSpan = document.getElementById("offlineCoins");
    const closeBtn = document.getElementById("closeModalBtn");

    if (!modal || !timeSpan || !coinsSpan || !closeBtn) return;

    timeSpan.textContent = seconds;
    coinsSpan.textContent = formatNumber(coins);

    modal.classList.add("show");

    const closeModal = () => {
        modal.classList.remove("show");
        modal.classList.add("slide-out");
        
        setTimeout(() => {
            modal.classList.remove("slide-out");
        }, 400);
        
        closeBtn.removeEventListener("click", closeModal);
    };

    closeBtn.addEventListener("click", closeModal);
}