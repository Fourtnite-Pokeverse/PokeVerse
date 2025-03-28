document.addEventListener("DOMContentLoaded", function () {
    const closePopupBtn = document.getElementById("close-popup");
    const backLink = document.querySelector(".back-link"); // Select back to store link
    const paymentOptions = document.querySelectorAll(".payment-option");
    const emailInput = document.getElementById("email");
    const paymentInfo = document.getElementById("payment-info");

    // Payment method descriptions
    const paymentDetails = {
        paypal: {
            title: "Payment via PayPal",
            description: "You will be redirected to PayPal to complete the payment."
        },
        visa: {
            title: "Payment via Visa",
            description: "Enter your Visa card details to proceed with the payment."
        },
        applepay: {
            title: "Payment via Apple Pay",
            description: "Use Apple Pay for a quick and secure checkout."
        }
    };

    // Redirect "X" button to homepage instead of closing popup
    closePopupBtn.addEventListener("click", () => {
        window.location.href = backLink.getAttribute("href"); // Redirect to the same path as "Back to Store"
    });

    // Payment Selection & Update Info
    paymentOptions.forEach(option => {
        option.addEventListener("click", () => {
            // Remove 'active' class from all and add to selected one
            paymentOptions.forEach(opt => opt.classList.remove("active"));
            option.classList.add("active");

            // Get selected payment method
            const selectedMethod = option.getAttribute("data-method");
            
            // Update payment info dynamically
            paymentInfo.innerHTML = `
                <h3>${paymentDetails[selectedMethod].title}</h3>
                <p>${paymentDetails[selectedMethod].description}</p>
            `;
        });
    });

    // Continue Button - Validate Email & Proceed
    document.querySelector(".continue-btn").addEventListener("click", () => {
        const email = emailInput.value.trim();
        if (!email.includes("@")) {
            alert("Please enter a valid email.");
            return;
        }
        alert("Proceeding to payment...");
    });
});
