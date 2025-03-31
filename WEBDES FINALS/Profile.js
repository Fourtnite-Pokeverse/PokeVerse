document.addEventListener("DOMContentLoaded", function () {
    // Retrieve username from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    let username = urlParams.get("username") || localStorage.getItem("username") || "Trainer 02";

    // Display the username
    const usernameDisplay = document.getElementById('username');
    if (usernameDisplay) {
        usernameDisplay.textContent = username;
    }

    // Store username when navigating from another page
    const startProfileBtn = document.getElementById('startProfile');
    if (startProfileBtn) {
        startProfileBtn.addEventListener("click", function () {
            localStorage.setItem('username', 'Trainer 02');
            window.location.href = 'Profile.html';
        });
    }
});
