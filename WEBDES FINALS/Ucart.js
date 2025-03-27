document.addEventListener("DOMContentLoaded", function () {
    // Get elements from DOM
    const checkoutBtn = document.querySelector(".checkout-btn");
    const popup = document.getElementById("checkout-popup");
    const closePopupBtn = document.getElementById("close-popup");
    const paymentOptions = document.querySelectorAll(".payment-option"); // Updated selector
    const paymentInfo = document.getElementById("payment-info");
    const continueBtn = document.querySelector(".continue-btn");
    const emailInput = document.getElementById("email");

    // Payment method details
    const paymentDetails = {
        paypal: {
            title: "Payment via PayPal",
            description: "You will be redirected to PayPal to complete the payment."
        },
        visa: {
            title: "Payment via Visa",
            description: "Enter your Visa card details to proceed."
        },
        applepay: {
            title: "Payment via Apple Pay",
            description: "Use Apple Pay for a fast and secure checkout."
        }
    };

    // Show the popup
    checkoutBtn.addEventListener("click", () => {
        popup.classList.remove("hidden");
    });

    // Hide the popup
    closePopupBtn.addEventListener("click", () => {
        popup.classList.add("hidden");
    });

    // Hide popup when clicking outside of it
    window.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.classList.add("hidden");
        }
    });

    // Handle payment method switching
    paymentOptions.forEach(option => {
        option.addEventListener("click", () => {
            // Remove 'active' from all payment options
            paymentOptions.forEach(opt => opt.classList.remove("active"));

            // Add 'active' to the clicked payment option
            option.classList.add("active");

            // Update payment information
            const method = option.dataset.method;
            paymentInfo.innerHTML = `
                <h3>${paymentDetails[method].title}</h3>
                <p>${paymentDetails[method].description}</p>
            `;
        });
    });

    // Continue Button Validation
    continueBtn.addEventListener("click", () => {
        const email = emailInput.value.trim();
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        const activeMethod = document.querySelector(".payment-option.active")?.dataset.method || "paypal";
        alert(`Proceeding with payment via ${activeMethod}`);
        popup.classList.add("hidden");
    });

    // Email Validation Function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
