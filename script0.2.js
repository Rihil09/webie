import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ===== WAIT UNTIL DOM LOADS =====
document.addEventListener("DOMContentLoaded", () => {

    // ===== Firebase config =====
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "ar-rice-system.firebaseapp.com",
        projectId: "ar-rice-system",
        storageBucket: "ar-rice-system.appspot.com",
        messagingSenderId: "315656193287",
        appId: "1:315656193287:web:8719c39e19ac7a773731a2"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // ===== ELEMENTS =====
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');

    const loginBox = document.querySelector('.login');
    const registerBox = document.querySelector('.register');

    // ===== SHOW REGISTER FORM =====
    showRegister.addEventListener('click', (e) => {
        e.preventDefault(); // stop page reload
        loginBox.classList.remove('active');
        registerBox.classList.add('active');
    });

    // ===== SHOW LOGIN FORM =====
    showLogin.addEventListener('click', (e) => {
        e.preventDefault(); // stop page reload
        registerBox.classList.remove('active');
        loginBox.classList.add('active');
    });

    // ===== REGISTER =====
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Registration successful! Please login.");
            
            registerForm.reset();
            registerBox.classList.remove('active');
            loginBox.classList.add('active');

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
            window.location.href = "main.html";
        } catch (error) {
            alert(error.message);
        }
    });

    // ===== SHOW LOGIN BY DEFAULT =====
    loginBox.classList.add('active');

});