window.addEventListener("DOMContentLoaded", () => {

const btn = document.getElementById("scrollTopBtn");

if(!btn) return;

btn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

});