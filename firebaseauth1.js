import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase Configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB-7Dk6Xsmboq5Ebe9i4jI6wOuV-aAcdXY",
    authDomain: "sponsoredform.firebaseapp.com",
    projectId: "sponsoredform",
    storageBucket: "sponsoredform.firebasestorage.app",
    messagingSenderId: "177969086611",
    appId: "1:177969086611:web:3e550634e843c099c38d66",
    measurementId: "G-3LKXKGJTNK"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to Show Messages
function showMessage(message, divId, color = "red") {
    const messageDiv = document.getElementById(divId);
    if (!messageDiv) return;
    messageDiv.style.display = "block";
    messageDiv.style.color = color;
    messageDiv.innerHTML = message;
    
    clearTimeout(showMessage.timeoutId);
    showMessage.timeoutId = setTimeout(() => {
        messageDiv.style.display = "none";
    }, 5000);
}

// Function to handle form submission
document.addEventListener("DOMContentLoaded", () => {
    const signUpButton = document.getElementById('submitSignUp');
    const emailInput = document.getElementById("rEmail");

    // Auto-fill email from localStorage or URL parameter
    const userEmail = localStorage.getItem("userEmail") || new URLSearchParams(window.location.search).get("email");

    if (userEmail) {
        emailInput.value = userEmail;
    } else {
        emailInput.removeAttribute("readonly"); // Allow manual input if no preset email
    }

    if (!signUpButton) return;

    signUpButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const email = emailInput?.value.trim();
        const password = document.getElementById('rPassword')?.value.trim();
        const firstName = document.getElementById('fName')?.value.trim();
        const lastName = document.getElementById('lName')?.value.trim();
        const phoneNumber = document.getElementById('phoneNumber')?.value.trim();
        const sponsorCategory = document.getElementById('sponsorCategory')?.value;
        const otherSponsorInput = document.getElementById('otherSponsor');
        const city = document.getElementById('city')?.value.trim();
        const state = document.getElementById('state')?.value.trim();
        const country = document.getElementById('country')?.value.trim();

        // Validate Email Format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Enter a valid email address!', 'signUpMessage');
            return;
        }

        // Validate Password
        if (password.length < 6) {
            showMessage('Password must be at least 6 characters!', 'signUpMessage');
            return;
        }

        // Ensure all fields are filled
        if (!email || !password || !firstName || !lastName || !phoneNumber || !sponsorCategory || !city || !state || !country) {
            showMessage('All fields are required!', 'signUpMessage');
            return;
        }

        // Ensure 'Other' sponsor category has input
        let selectedSponsor = sponsorCategory;
        if (sponsorCategory === "Other") {
            if (!otherSponsorInput || !otherSponsorInput.value.trim()) {
                showMessage('Please specify the sponsor category!', 'signUpMessage');
                return;
            }
            selectedSponsor = otherSponsorInput.value.trim();
        }

        try {
            // Create User in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store User Data in Firestore
            await setDoc(doc(db, "sponsored", user.uid), {
                email,
                firstName,
                lastName,
                phoneNumber,
                sponsorCategory: selectedSponsor,
                city,
                state,
                country
            });

            showMessage('Account Created Successfully!', 'signUpMessage', 'green');
            setTimeout(() => {
                window.location.href = 'index.html';  // Redirect after success
            }, 2000);

        } catch (error) {
            console.error("Firebase Error Code:", error.code);
            console.error("Firebase Error Message:", error.message);
            showMessage(`Error: ${error.message}`, 'signUpMessage');
        }
    });

    // Handle 'Other' sponsor category visibility
    const sponsorCategoryDropdown = document.getElementById('sponsorCategory');
    if (sponsorCategoryDropdown) {
        sponsorCategoryDropdown.addEventListener('change', function () {
            const otherSponsorInput = document.getElementById('otherSponsor');
            if (this.value === "Other") {
                otherSponsorInput.style.display = "block";
                otherSponsorInput.setAttribute("required", "true");
            } else {
                otherSponsorInput.style.display = "none";
                otherSponsorInput.removeAttribute("required");
            }
        });
    }
});
