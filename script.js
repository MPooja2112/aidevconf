document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".menu");
    const nav = document.querySelector("nav");

    menu.addEventListener("click", function () {
        nav.classList.toggle("active");
    });
});



function updateCountdown() {
    const targetDate = new Date("May 10, 2025 00:00:00").getTime();
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft < 0) {
        document.querySelector(".countdown-container").innerHTML = "<p>Event has passed!</p>";
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

// Update every second
setInterval(updateCountdown, 1000);
updateCountdown();
