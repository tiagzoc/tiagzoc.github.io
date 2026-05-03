window.addEventListener("DOMContentLoaded", () => {

const btn = document.getElementById("scrollTopBtn");

if(!btn) return;

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        btn.style.opacity = "1";
        btn.style.pointerEvents = "auto";
        btn.style.transform = "translateY(0)";
    } else {
        btn.style.opacity = "0";
        btn.style.pointerEvents = "none";
        btn.style.transform = "translateY(10px)";
    }

});

btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

});