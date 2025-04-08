
document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("JFbODXAoTre8wkrKW"); // Replace with your actual Public Key
    document.querySelector(".btn-send-otp").addEventListener("click", SendOTP);
});

function SendOTP() {
    const email = document.getElementById("email");
    const otpVerify = document.querySelector(".verify");

    if (!email.value) {
        alert("Please enter a valid email address.");
        return;
    }
    let otpCode = Math.floor(1000 + Math.random() * 9000); 
    let emailBody = `<h2>Your OTP is: <strong>${otpCode}</strong></h2>`;

    const emailTemplateParams = {
        email: email.value, 
        passcode: otpCode
    };

    emailjs.send("service_uk6w9rk", "template_xgsdpzq", emailTemplateParams)
    .then((response) => {
        console.log('Success:', response);
        alert("OTP sent to " + email.value);
        otpVerify.style.display = "flex";
        setupOTPVerification(otpCode);
    }, (error) => {
        console.log('Error:', error);
        alert("Failed to send OTP.");
    });
}

function setupOTPVerification(otpCode) {
    const otpButton = document.getElementById("btn-verify-otp");
    const otpInput = document.getElementById("otp-input");

    otpButton.addEventListener("click", function () {
        const otpEntered = otpInput.value;
        const email = document.getElementById("email").value;

        if (otpEntered == otpCode) {
            alert("Email verified successfully!");

            // Store email in localStorage
            localStorage.setItem("userEmail", email);

            // Redirect to next-page.html
            window.location.href = "next-page.html";
        } else {
            alert("Invalid OTP. Please try again.");
        }
    });
}



