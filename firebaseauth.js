import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9KI-Wcvmn8iARWZ9hujZ-JFz_QHEHFWE",
    authDomain: "login-form-d5dab.firebaseapp.com",
    projectId: "login-form-d5dab",
    storageBucket: "login-form-d5dab.appspot.com",
    messagingSenderId: "255088583795",
    appId: "1:255088583795:web:e89d21e42ec0e446887606"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to Show Messages
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Sign Up Functionality
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    // Validate Inputs
    if (!email || !password || !firstName || !lastName) {
        showMessage('All fields are required!', 'signUpMessage');
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName
            };

            // Store User Data in Firestore
            setDoc(doc(db, "users", user.uid), userData)
                .then(() => {
                    showMessage('Account Created Successfully!', 'signUpMessage');
                    window.location.href = 'index.html';  // Redirect if needed
                })
                .catch((error) => {
                    console.error("Error writing document", error);
                    showMessage('Error saving user data.', 'signUpMessage');
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists!', 'signUpMessage');
            } else {
                showMessage('Unable to create user', 'signUpMessage');
            }
        });
});
