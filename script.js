const wrapper = document.querySelector('.wrapper');
const btnPopup = document.querySelector('.btnlogin-popup');
const closeIcon = document.querySelector('.icon-close');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');
const centerText = document.querySelector('.center-text');

// Open login popup
btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
    centerText.style.display = 'none';
});

// Switch to register form
registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

// Switch back to login form
loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

// Close popup
closeIcon.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
    wrapper.classList.remove('active');
    centerText.style.display = 'block';
});

const controlButtons = document.querySelectorAll('.control-btn');
const popups = document.querySelectorAll('.popup-box');
const popupCloses = document.querySelectorAll('.popup-close');

// Open popup
controlButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.dataset.popup;

        popups.forEach(popup => popup.classList.remove('active'));
        document.getElementById(target).classList.add('active');
    });
});

// Close popup
popupCloses.forEach(close => {
    close.addEventListener('click', () => {
        popups.forEach(popup => popup.classList.remove('active'));
    });
});

import { getAuth, onAuthstateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const auth = getAuth(); 

// Elements 
const centerText = document.getElementById("center-text");
const bottomButtons = document.getElementById("bottom-buttons");
const wrapper = document.querySelector(".wrapper"); // login popup

// Check if user is already logged in 
onAuthstateChanged(auth, (user) => {
    if (user) {
        // User is signed in 
        wrapper.classList.remove("active-popup"); // close login popup
        centerText.style.display = "block"; 
        bottomButtons.style.display = "flex"; // show buttons 
    } else {
        // No user logged in 
        wrapper.classList.add("active-popup"); // show login popup 
        centerText.style.display = "none";
        bottomButtons.style.display = "none";
    }
});