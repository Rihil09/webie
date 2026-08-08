import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
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


        if (!username) {

            alert("Please enter a username.");

            return;

        }


        try {

            /* CREATE ACCOUNT */

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            const user = userCredential.user;


            /* SAVE USERNAME */

            await updateProfile(user, {
                displayName: username
            });


            /* SEND VERIFICATION EMAIL */

            await sendEmailVerification(user);


            /* SIGN OUT AFTER REGISTRATION */

            await auth.signOut();


            /* RESET FORM */

            registerForm.reset();


            /* SWITCH TO LOGIN */

            registerBox.classList.remove("active");
            loginBox.classList.add("active");


            alert(
                "Registration successful!\n\n" +
                "A verification email has been sent to " +
                email +
                ".\n\n" +
                "Please open your email and click the verification link before logging in."
            );


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

            /* LOGIN */

            const userCredential =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            const user = userCredential.user;


            /* REFRESH USER INFORMATION */

            await user.reload();


            /* CHECK EMAIL VERIFICATION */

            if (!user.emailVerified) {

                await auth.signOut();

                alert(
                    "Your email has not been verified yet.\n\n" +
                    "Please check your email and click the verification link before logging in."
                );

                return;

            }


            /* VERIFIED → DASHBOARD */

            window.location.replace("dashboard.html");


        } catch (error) {

            console.error("Login error:", error);

            alert(error.message);

        }

    });

}