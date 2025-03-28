document.addEventListener("DOMContentLoaded", function () {
    // Retrieve username from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    let username = urlParams.get("username") || localStorage.getItem("username") || "Guest";

    // Display the username
    const usernameDisplay = document.getElementById('username');
    if (usernameDisplay) {
        usernameDisplay.textContent = username;
    }

    // Store username when navigating from another page
    const startProfileBtn = document.getElementById('startProfile');
    if (startProfileBtn) {
        startProfileBtn.addEventListener("click", function () {
            localStorage.setItem('username', 'PaulMarie');
            window.location.href = 'profile.html';
        });
    }
});
