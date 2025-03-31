const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

// Function to generate a random number between min and max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate and format Player ID
function generatePlayerId() {
    let id = '';
    for (let i = 0; i < 12; i++) {
        id += getRandomNumber(0, 9);
    }
    // Format the ID as #### #### ####
    return id.replace(/(\d{4})(?=\d)/g, '$1 ');
}

// Set the Player ID when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const playerIdInput = document.getElementById('playerId');
    if (playerIdInput) {
        playerIdInput.value = generatePlayerId();
    }
});

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Handle sign in form submission
function handleSignIn(event) {
    event.preventDefault();
    alert('Successfully logged in!');
    window.location.href = 'home.html';
    return false;
}

// Handle sign up form submission
function handleSignUp(event) {
    event.preventDefault();
    alert('Successfully logged in!');
    window.location.href = 'home.html';
    return false;
}
