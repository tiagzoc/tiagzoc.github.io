window.addEventListener("load", () => {

if ('ontouchstart' in window || window.innerWidth < 768) {
    console.log("cursor disabled on mobile");
    return;
}

const glow = document.createElement("div");
glow.className = "cursor-glow";

document.body.appendChild(glow);

document.addEventListener("mousemove", e => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});

});