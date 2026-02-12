// ======================
// FIREBASE IMPORTS
// ======================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ======================
// FIREBASE CONFIG
// ======================
const firebaseConfig = {
  apiKey: "AIzaSyAFe7fGknE_4RLLSqIXX7RafMftdfnhf8A",
  authDomain: "ar-rice-system.firebaseapp.com",
  projectId: "ar-rice-system",
  storageBucket: "ar-rice-system.appspot.com",
  messagingSenderId: "315656193287",
  appId: "1:315656193287:web:8719c39e19ac7a773731a2",
  measurementId: "G-B87RFCV0N8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ======================
// ELEMENTS
// ======================
const wrapper = document.querySelector('.wrapper');
const btnPopup = document.querySelector('.btnlogin-popup');
const closeIcon = document.querySelector('.icon-close');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');
const centerText = document.querySelector('.center-text');
const bottomControls = document.querySelector('.bottom-controls');

// ======================
// POPUP HANDLERS
// ======================
// Open login popup
btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
    centerText.style.display = 'none';
    bottomControls.style.display = 'none';
});

// Switch to register form
registerLink.addEventListener('click', () => wrapper.classList.add('active'));

// Switch back to login form
loginLink.addEventListener('click', () => wrapper.classList.remove('active'));

// Close popup
closeIcon.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
    wrapper.classList.remove('active');
    centerText.style.display = 'block';
    bottomControls.style.display = 'flex';
});

// ======================
// LOGIN FORM SUBMIT
// ======================
document.querySelector(".login form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // Close popup and show content
        wrapper.classList.remove('active-popup');
        wrapper.classList.remove('active');
        centerText.style.display = 'block';
        bottomControls.style.display = 'flex';
        e.target.reset(); // clear login form
    } catch (error) {
        alert(error.message);
    }
});

// ======================
// REGISTER FORM SUBMIT
// ======================
document.querySelector(".register form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration Successful!");
        e.target.reset(); // clear register form
        wrapper.classList.remove('active'); // switch back to login form
    } catch (error) {
        alert(error.message);
    }
});

// ======================
// AUTH STATE CHANGE
// ======================
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in
        wrapper.classList.remove('active-popup');
        wrapper.classList.remove('active');
        centerText.style.display = 'block';
        bottomControls.style.display = 'flex';
    } else {
        // User is not logged in
        centerText.style.display = 'none';
        bottomControls.style.display = 'none';
    }
});

// ======================
// BOTTOM CONTROL POPUPS
// =====================
