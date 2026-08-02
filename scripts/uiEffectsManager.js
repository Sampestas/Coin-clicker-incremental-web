export function createClickFloatingText(event, clickPower) {
    const floatingDiv = document.createElement("div");
    floatingDiv.textContent = "+" + clickPower;
    floatingDiv.classList.add("floating-text");

    const x = event.pageX;
    const y = event.pageY;

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
    coinsSpan.textContent = coins;

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