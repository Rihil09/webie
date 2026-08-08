import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
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


/* ================= PAGE LOAD ================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= ELEMENTS ================= */

    const logoutBtn =
        document.getElementById("logoutBtn");

    const usernameElement =
        document.getElementById("username");

    const pestCountElement =
        document.getElementById("pestCount");

    const robotLocationElement =
        document.getElementById("robotLocation");

    const batteryElement =
        document.getElementById("battery");

    const temperatureElement =
        document.getElementById("temperature");


    /* ================= AUTH CHECK ================= */

    onAuthStateChanged(auth, (user) => {

        /*
         * If nobody is logged in,
         * send them back to the login page.
         */

        if (!user) {

            window.location.replace("index.html");

            return;

        }


        console.log("Logged in as:", user.email);
        console.log("Firebase username:", user.displayName);


        /* ================= DISPLAY USERNAME ================= */

        if (usernameElement) {

            /*
             * FIRST:
             * Use the username saved in Firebase.
             */

            if (user.displayName) {

                usernameElement.textContent =
                    user.displayName;

            }

            /*
             * SECOND:
             * If the account doesn't have a displayName yet,
             * use the part of the email before @.
             *
             * Example:
             * lorraine@gmail.com
             * becomes:
             * lorraine
             */

            else if (user.email) {

                const emailUsername =
                    user.email.split("@")[0];

                usernameElement.textContent =
                    emailUsername;

            }

            /*
             * FINAL FALLBACK
             */

            else {

                usernameElement.textContent =
                    "User";

            }

        }

    });


    /* ================= LOGOUT ================= */

    if (logoutBtn) {

        logoutBtn.addEventListener("click", async () => {

            try {

                await signOut(auth);

                window.location.replace("index.html");

            }

            catch (error) {

                console.error(
                    "Logout error:",
                    error
                );

                alert(error.message);

            }

        });

    }


    /* =====================================================
       DEMO DATA
       Temporary until Raspberry Pi is connected
       ===================================================== */


    /* ================= PEST COUNT ================= */

    if (pestCountElement) {

        pestCountElement.textContent = "12";

    }


    /* ================= ROBOT LOCATION ================= */

    if (robotLocationElement) {

        robotLocationElement.textContent =
            "Field Zone A3";

    }


    /* ================= BATTERY ================= */

    if (batteryElement) {

        batteryElement.textContent =
            "95%";

    }


    /* ================= TEMPERATURE ================= */

    if (temperatureElement) {

        temperatureElement.textContent =
            "32°C";

    }

});