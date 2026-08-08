import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

/* ================= FIREBASE CONFIG ================= */

const firebaseConfig = {
    apiKey: "AIzaSyAFe7fGknE_4RLLSqIXX7RafMftnhf8A",
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

    const logoutBtn = document.getElementById("logoutBtn");
    const usernameElement = document.getElementById("username");

    const pestCountElement = document.getElementById("pestCount");
    const robotLocationElement = document.getElementById("robotLocation");
    const batteryElement = document.getElementById("battery");
    const temperatureElement = document.getElementById("temperature");


    /* ================= AUTH CHECK ================= */

    onAuthStateChanged(auth, (user) => {

        if (!user) {

            // User is not logged in
            window.location.replace("index.html");
            return;

        }

        console.log("Logged in as:", user.email);


        /* ================= DISPLAY USERNAME ================= */

        if (usernameElement) {

            // First try Firebase displayName
            if (user.displayName) {

                usernameElement.textContent = user.displayName;

            }

            // If there is no displayName, use the part before @
            else if (user.email) {

                const emailUsername = user.email.split("@")[0];

                usernameElement.textContent = emailUsername;

            }

            // Final fallback
            else {

                usernameElement.textContent = "User";

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

                console.error("Logout error:", error);

                alert(error.message);

            }

        });

    }


    /* =====================================================
       DEMO DATA
       Temporary until Raspberry Pi is connected
       ===================================================== */

    if (pestCountElement) {

        pestCountElement.textContent = "12";

    }


    if (robotLocationElement) {

        robotLocationElement.textContent = "Field Zone A3";

    }


    if (batteryElement) {

        batteryElement.textContent = "95%";

    }


    if (temperatureElement) {

        temperatureElement.textContent = "32°C";

    }

});