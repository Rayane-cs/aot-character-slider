// Open popup
document.querySelectorAll(".open_popup").forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-target");
        const popup = document.getElementById(target);
        popup.style.display = "flex"; // show popup (flex for centering)

        // Lazy-load video inside this popup
        const video = popup.querySelector("video");
        if (video && !video.src) {
            const src = video.getAttribute("data-src"); // store actual src in data-src
            video.src = src;
            video.load();
            video.play();
        }
    });
});

// Close popup
document.querySelectorAll(".close").forEach(span => {
    span.addEventListener("click", () => {
        const popupId = span.getAttribute("data-close");
        const popup = document.getElementById(popupId);
        popup.style.display = "none";

        // Pause video and remove src to free resources
        const video = popup.querySelector("video");
        if (video) {
            video.pause();
            video.src = "";
        }
    });
});

// Close when clicking outside
window.addEventListener("click", e => {
    if (e.target.classList.contains("popup")) {
        const video = e.target.querySelector("video");
        if (video) {
            video.pause();
            video.src = "";
        }
        e.target.style.display = "none";
    }
});
