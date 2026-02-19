import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {

    // 🔥 USE YOUR REAL FIREBASE CONFIG
    const firebaseConfig = {
        apiKey: "PASTE_YOUR_REAL_API_KEY_HERE",
        authDomain: "ar-rice-system.firebaseapp.com",
        projectId: "ar-rice-system",
        storageBucket: "ar-rice-system.appspot.com",
        messagingSenderId: "315656193287",
        appId: "1:315656193287:web:8719c39e19ac7a773731a2"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // ===== ELEMENTS =====
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const showRegister = document.getElementById("showRegister");
    const showLogin = document.getElementById("showLogin");

    const loginBox = document.querySelector(".login");
    const registerBox = document.querySelector(".register");

    // Safety check
    if (!loginForm || !registerForm) {
        console.error("Forms not found in HTML.");
        return;
    }

    // ===== SWITCH FORMS =====
    showRegister?.addEventListener("click", (e) => {
        e.preventDefault();
        loginBox.classList.remove("active");
        registerBox.classList.add("active");
    });

    showLogin?.addEventListener("click", (e) => {
        e.preventDefault();
        registerBox.classList.remove("active");
        loginBox.classList.add("active");
    });

    // ===== REGISTER =====
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value.trim();

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Registration successful! Please login.");

            registerForm.reset();
            registerBox.classList.remove("active");
            loginBox.classList.add("active");

        } catch (error) {
            alert(error.message);
        }
    });

    // ===== LOGIN =====
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = "main.html";
        } catch (error) {
            alert(error.message);
        }
    });

    // ===== AUTO REDIRECT IF LOGGED IN =====
    onAuthStateChanged(auth, (user) => {
        if (user) {
            window.location.href = "main.html";
        }
    });

});
