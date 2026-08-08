import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


/* ================= FIREBASE CONFIG ================= */

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


/* ================= INITIALIZE FIREBASE ================= */

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


/* ================= ELEMENTS ================= */

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const loginBox = document.querySelector(".login");
const registerBox = document.querySelector(".register");


/* ================= SWITCH TO REGISTER ================= */

if (showRegister) {

    showRegister.addEventListener("click", (e) => {

        e.preventDefault();

        loginBox.classList.remove("active");
        registerBox.classList.add("active");

    });

}


/* ================= SWITCH TO LOGIN ================= */

if (showLogin) {

    showLogin.addEventListener("click", (e) => {

        e.preventDefault();

        registerBox.classList.remove("active");
        loginBox.classList.add("active");

    });

}


/* ================= REGISTER ================= */

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();


        const username =
            document.getElementById("registerUsername").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const password =
            document.getElementById("registerPassword").value;


        /* Make sure username isn't empty */

        if (!username) {

            alert("Please enter a username.");

            return;

        }


        try {

            /* Create Firebase account */

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            /* Get the newly created user */

            const user = userCredential.user;


            /* Save username as Firebase displayName */

            await updateProfile(user, {

                displayName: username

            });


            alert(
                "Registration successful! You can now login."
            );


            /* Reset form */

            registerForm.reset();


            /* Switch back to login */

            registerBox.classList.remove("active");

            loginBox.classList.add("active");


        } catch (error) {

            console.error("Registration error:", error);

            alert(error.message);

        }

    });

}


/* ================= LOGIN ================= */

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();


        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;


        try {

            /* Login */

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


            /* Go to dashboard */

            window.location.replace("dashboard.html");


        } catch (error) {

            console.error("Login error:", error);

            alert(error.message);

        }

    });

}