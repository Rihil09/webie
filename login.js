import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


/* =====================================================
   FIREBASE CONFIG
   ===================================================== */

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


/* =====================================================
   INITIALIZE FIREBASE
   ===================================================== */

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


/* =====================================================
   GET ELEMENTS
   ===================================================== */

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const loginBox = document.querySelector(".form-box.login");
const registerBox = document.querySelector(".form-box.register");


/* =====================================================
   SWITCH TO REGISTER
   ===================================================== */

if (showRegister) {

    showRegister.addEventListener("click", (event) => {

        event.preventDefault();

        loginBox.classList.remove("active");
        registerBox.classList.add("active");

    });

}


/* =====================================================
   SWITCH TO LOGIN
   ===================================================== */

if (showLogin) {

    showLogin.addEventListener("click", (event) => {

        event.preventDefault();

        registerBox.classList.remove("active");
        loginBox.classList.add("active");

    });

}


/* =====================================================
   REGISTER
   ===================================================== */

if (registerForm) {

    registerForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        /* ---------------------------------------------
           GET FORM VALUES
           --------------------------------------------- */

        const username =
            document
                .getElementById("registerUsername")
                .value
                .trim();

        const email =
            document
                .getElementById("registerEmail")
                .value
                .trim();

        const password =
            document
                .getElementById("registerPassword")
                .value;


        /* ---------------------------------------------
           CHECK USERNAME
           --------------------------------------------- */

        if (!username) {

            alert("Please enter a username.");

            return;

        }


        try {

            /* -----------------------------------------
               CREATE FIREBASE ACCOUNT
               ----------------------------------------- */

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            const user = userCredential.user;


            console.log(
                "Account created:",
                user.email
            );


            /* -----------------------------------------
               SAVE USERNAME
               ----------------------------------------- */

            await updateProfile(user, {

                displayName: username

            });


            console.log(
                "Username saved:",
                username
            );


            /* -----------------------------------------
               SEND EMAIL VERIFICATION
               ----------------------------------------- */

            await sendEmailVerification(user);


            console.log(
                "Verification email sent."
            );


            /* -----------------------------------------
               SIGN OUT
               ----------------------------------------- */

            await signOut(auth);


            /* -----------------------------------------
               RESET REGISTER FORM
               ----------------------------------------- */

            registerForm.reset();


            /* -----------------------------------------
               SWITCH BACK TO LOGIN
               ----------------------------------------- */

            registerBox.classList.remove("active");

            loginBox.classList.add("active");


            /* -----------------------------------------
               SUCCESS MESSAGE
               ----------------------------------------- */

            alert(
                "Registration successful!\n\n" +
                "A verification email has been sent to:\n" +
                email +
                "\n\n" +
                "Please open your email and click the " +
                "verification link before logging in."
            );


        } catch (error) {

            console.error(
                "Registration error:",
                error
            );


            /* -----------------------------------------
               FRIENDLY ERROR MESSAGES
               ----------------------------------------- */

            switch (error.code) {

                case "auth/email-already-in-use":

                    alert(
                        "This email is already registered."
                    );

                    break;


                case "auth/invalid-email":

                    alert(
                        "Please enter a valid email address."
                    );

                    break;


                case "auth/weak-password":

                    alert(
                        "Your password is too weak. " +
                        "Please use a stronger password."
                    );

                    break;


                default:

                    alert(error.message);

            }

        }

    });

}


/* =====================================================
   LOGIN
   ===================================================== */

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        /* ---------------------------------------------
           GET FORM VALUES
           --------------------------------------------- */

        const email =
            document
                .getElementById("loginEmail")
                .value
                .trim();

        const password =
            document
                .getElementById("loginPassword")
                .value;


        try {

            /* -----------------------------------------
               SIGN IN
               ----------------------------------------- */

            const userCredential =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            const user = userCredential.user;


            console.log(
                "Login successful:",
                user.email
            );


            /* -----------------------------------------
               REFRESH USER
               ----------------------------------------- */

            await user.reload();


            const currentUser = auth.currentUser;


            /* -----------------------------------------
               CHECK EMAIL VERIFICATION
               ----------------------------------------- */

            if (!currentUser.emailVerified) {

                await signOut(auth);


                alert(
                    "Your email has not been verified yet.\n\n" +
                    "Please check your email and click the " +
                    "verification link before logging in."
                );


                return;

            }


            /* -----------------------------------------
               VERIFIED
               ----------------------------------------- */

            console.log(
                "Email verified!"
            );


            console.log(
                "Username:",
                currentUser.displayName
            );


            /* -----------------------------------------
               GO TO DASHBOARD
               ----------------------------------------- */

            window.location.replace(
                "dashboard.html"
            );


        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            /* -----------------------------------------
               FRIENDLY ERROR MESSAGES
               ----------------------------------------- */

            switch (error.code) {

                case "auth/invalid-credential":

                    alert(
                        "Incorrect email or password."
                    );

                    break;


                case "auth/user-not-found":

                    alert(
                        "No account was found with this email."
                    );

                    break;


                case "auth/wrong-password":

                    alert(
                        "Incorrect password."
                    );

                    break;


                case "auth/invalid-email":

                    alert(
                        "Please enter a valid email address."
                    );

                    break;


                default:

                    alert(error.message);

            }

        }

    });

}