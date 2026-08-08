import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ===== FIREBASE CONFIG =====
const firebaseConfig = {
  apiKey: "AIzaSyAFe7fGknE_4RLLSqIXX7RafMftdfnhf8A",
  authDomain: "ar-rice-system.firebaseapp.com",
  databaseURL: "https://ar-rice-system-default-rtdb.firebaseio.com",
  projectId: "ar-rice-system",
  storageBucket: "ar-rice-system.firebasestorage.app",
  messagingSenderId: "315656193287",
  appId: "1:315656193287:web:8719c39e19ac7a773731a2",
  measurementId: "G-B87RFCV0N8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ===== ELEMENTS =====
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');

const loginBox = document.querySelector('.login');
const registerBox = document.querySelector('.register');

// ===== SWITCH TO REGISTER =====
showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginBox.classList.remove('active');
    registerBox.classList.add('active');
});

// ===== SWITCH TO LOGIN =====
showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerBox.classList.remove('active');
    loginBox.classList.add('active');
});

// ===== REGISTER =====
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('registerUsername').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;

    try {

        // Create Firebase account
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        // Get the newly created user
        const user = userCredential.user;

        // Save username to Firebase Authentication profile
        await updateProfile(user, {
            displayName: username
        });

        alert("Registration successful! Please login.");

        // Reset form
        registerForm.reset();

        // Switch back to login
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
        
        // Redirect to main page
        window.location.href = "dashboard.html";

    } catch (error) {
        alert(error.message);
    }
});
