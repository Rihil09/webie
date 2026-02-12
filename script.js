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
btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
    centerText.style.display = 'none';
    bottomControls.style.display = 'none';
});

registerLink.addEventListener('click', () => wrapper.classList.add('active'));
loginLink.addEventListener('click', () => wrapper.classList.remove('active'));

closeIcon.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
    wrapper.classList.remove('active');
    centerText.style.display = 'block';
    bottomControls.style.display = 'flex';
});

// ======================
// LOGIN / REGISTER SUBMIT
// ======================
document.querySelector(".login form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    try {
        await signInWithEmailAndPassword(auth, email, password);
        wrapper.classList.remove('active-popup');
        wrapper.classList.remove('active');
        centerText.style.display = 'block';
        bottomControls.style.display = 'flex';
        e.target.reset();
    } catch (error) {
        alert(error.message);
    }
});

document.querySelector(".register form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration Successful!");
        e.target.reset();
        wrapper.classList.remove('active');
    } catch (error) {
        alert(error.message);
    }
});

// ======================
// AUTH STATE
// ======================
onAuthStateChanged(auth, (user) => {
    if (user) {
        wrapper.classList.remove('active-popup');
        wrapper.classList.remove('active');
        centerText.style.display = 'block';
        bottomControls.style.display = 'flex';
    } else {
        wrapper.classList.add('active-popup');
        centerText.style.display = 'none';
        bottomControls.style.display = 'none';
    }
});

// ======================
// BOTTOM CONTROL POPUPS
// ======================
const controlButtons = document.querySelectorAll('.control-btn');
const popups = document.querySelectorAll('.popup-box');
const popupCloses = document.querySelectorAll('.popup-close');

controlButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.dataset.popup;
        popups.forEach(popup => popup.classList.remove('active'));
        document.getElementById(target).classList.add('active');
    });
});

popupCloses.forEach(close => {
    close.addEventListener('click', () => {
        popups.forEach(popup => popup.classList.remove('active'));
    });
});
