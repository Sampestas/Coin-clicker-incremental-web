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
