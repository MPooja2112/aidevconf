document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".menu");
    const nav = document.querySelector("nav");

    menu.addEventListener("click", function () {
        nav.classList.toggle("active");
    });
});

