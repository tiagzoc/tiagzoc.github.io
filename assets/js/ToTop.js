const btn = document.getElementById("scrollTopBtn");

btn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

window.addEventListener("scroll", () => {
    const btn = document.getElementById("scrollTopBtn");

    if (window.scrollY > 300) {
        btn.style.opacity = "1";
        btn.style.pointerEvents = "auto";
    } else {
        btn.style.opacity = "0";
        btn.style.pointerEvents = "none";
    }
});