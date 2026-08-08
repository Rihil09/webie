import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


/* =====================================================
   FIREBASE CONFIG
   ===================================================== */

const firebaseConfig = {

    apiKey: "AIzaSyAFe7fGknE_4RLLSqIXX7RafMftdfnhf8A",

    authDomain: "ar-rice-system.firebaseapp.com",

    databaseURL:
        "https://ar-rice-system-default-rtdb.firebaseio.com",

    projectId: "ar-rice-system",

    storageBucket:
        "ar-rice-system.firebasestorage.app",

    messagingSenderId: "315656193287",

    appId:
        "1:315656193287:web:8719c39e19ac7a773731a2",

    measurementId: "G-B87RFCV0N8"

};


/* =====================================================
   INITIALIZE FIREBASE
   ===================================================== */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


/* =====================================================
   ELEMENTS
   ===================================================== */

const loginForm =
    document.getElementById("loginForm");

const registerForm =
    document.getElementById("registerForm");

const showRegister =
    document.getElementById("showRegister");

const showLogin =
    document.getElementById("showLogin");

const loginBox =
    document.querySelector(".form-box.login");

const registerBox =
    document.querySelector(".form-box.register");


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

    registerForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


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


            /* CHECK USERNAME */

            if (!username) {

                alert("Please enter a username.");

                return;

            }


            try {

                /* CREATE FIREBASE ACCOUNT */

                const userCredential =
                    await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                const user =
                    userCredential.user;


                console.log(
                    "Account created:",
                    user.email
                );


                /* SAVE USERNAME TO FIREBASE AUTH */

                await updateProfile(user, {

                    displayName: username

                });


                console.log(
                    "Username saved:",
                    username
                );


                /* SEND EMAIL VERIFICATION */

                await sendEmailVerification(user);


                /* SIGN OUT */

                await auth.signOut();


                /* RESET FORM */

                registerForm.reset();


                /* SWITCH BACK TO LOGIN */

                registerBox.classList.remove("active");

                loginBox.classList.add("active");


                alert(
                    "Registration successful!\n\n" +
                    "A verification email has been sent to " +
                    email +
                    ".\n\n" +
                    "Please verify your email before logging in."
                );


            }

            catch (error) {

                console.error(
                    "Registration error:",
                    error
                );

                alert(error.message);

            }

        }
    );

}


/* =====================================================
   LOGIN
   ===================================================== */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


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

                /* SIGN IN */

                const userCredential =
                    await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                const user =
                    userCredential.user;


                console.log(
                    "Logged in:",
                    user.email
                );


                /* REFRESH USER */

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


                /* SUCCESS */

                console.log(
                    "Verified user:",
                    user.email
                );

                console.log(
                    "Username:",
                    user.displayName
                );


                /* GO TO DASHBOARD */

                window.location.replace(
                    "dashboard.html"
                );

            }

            catch (error) {

                console.error(
                    "Login error:",
                    error
                );

                alert(error.message);

            }

        }
    );

}