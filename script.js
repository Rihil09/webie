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

/* ================= INITIALIZE ================= */

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ================= PAGE LOAD ================= */

document.addEventListener("DOMContentLoaded", () => {

    const logoutBtn = document.getElementById("logoutBtn");

    /* ================= AUTH ================= */

    onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.replace("index.html");
        return;

    }

    console.log("Logged in as:", user.email);

    // ==========================
    // DISPLAY USERNAME
    // ==========================

    const usernameElement = document.getElementById("username");

    if (usernameElement) {

        usernameElement.textContent =
            user.displayName || "User";

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

                alert(error.message);

            }

        });

    }

});


/* =====================================================
    DEMO DATA
    (Temporary until Raspberry Pi is connected)
===================================================== */

document.getElementById("pestCount").textContent = "12";

document.getElementById("robotLocation").textContent =
"Field Zone A3";

document.getElementById("battery").textContent =
"95%";

document.getElementById("temperature").textContent =
"32°C";