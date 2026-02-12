// Import Firebase modules
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Firebase auth instance
const auth = getAuth();

// Elements
const wrapper = document.querySelector('.wrapper');          // login/register popup
const btnPopup = document.querySelector('.btnlogin-popup');   // top login button
const closeIcon = document.querySelector('.icon-close');      // popup close button
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');
const centerText = document.querySelector('.center-text');   // main text
const bottomControls = document.querySelector('.bottom-controls'); // bottom buttons

// Hide main content by default
centerText.style.display = 'none';
bottomControls.style.display = 'none';

// ===== LOGIN POPUP BUTTON =====
btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

// ===== SWITCH FORMS =====
registerLink.addEventListener('click', () => {
    wrapper.classList.add('active'); // show register form
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active'); // switch back to login form
});

// ===== CLOSE POPUP =====
closeIcon.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
    wrapper.classList.remove('active');
});

// ===== LOGIN FORM SUBMIT =====
document.querySelector(".login form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // Close popup and show main content
        wrapper.classList.remove('active-popup');
        wrapper.classList.remove('active');
        centerText.style.display = 'block';
        bottomControls.style.display = 'flex';
    } catch (error) {
        alert(error.message);
    }
});

// ===== REGISTER FORM SUBMIT =====
document.querySelector(".register form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration successful! Please login.");
        wrapper.classList.remove('active'); // switch back to login form
        e.target.reset();
    } catch (error) {
        alert(error.message);
    }
});

// ===== DETECT IF USER IS ALREADY LOGGED IN =====
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Already logged in
        wrapper.classList.remove('active-popup');
        centerText.style.display = 'block';
        bottomControls.style.display = 'flex';
    } else {
        // Not logged in
        wrapper.classList.add('active-popup');
        centerText.style.display = 'none';
        bottomControls.style.display = 'none';
    }
});

// ===== BOTTOM BUTTONS POPUPS =====
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
