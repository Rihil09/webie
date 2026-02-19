import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ===== Firebase config =====
const firebaseConfig = {
  apiKey: "AIzaSyAFe7fGknE_4RLLSqIXX7RafMftdfnhf8A",
  authDomain: "ar-rice-system.firebaseapp.com",
  projectId: "ar-rice-system",
  storageBucket: "ar-rice-system.appspot.com",
  messagingSenderId: "315656193287",
  appId: "1:315656193287:web:8719c39e19ac7a773731a2",
  measurementId: "G-B87RFCV0N8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ===== ELEMENTS =====
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const wrapper = document.querySelector('.wrapper');
const closeIcon = document.querySelector('.icon-close');

// Show Register Form
showRegister.addEventListener('click', () => {
    document.querySelector('.login').classList.remove('active');
    document.querySelector('.register').classList.add('active');
});

// Show Login Form
showLogin.addEventListener('click', () => {
    document.querySelector('.register').classList.remove('active');
    document.querySelector('.login').classList.add('active');
});


// ===== REGISTER =====
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration successful! Please login.");
        showLogin.click(); // switch to login
        registerForm.reset();
    } catch (error) {
        alert(error.message);
    }
});

// ===== LOGIN =====
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // redirect to main.html
        window.location.href = "main.html";
    } catch (error) {
        alert(error.message);
    }
});

// Show login form by default
document.querySelector('.login').classList.add('active');