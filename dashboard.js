import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
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
   PAGE LOAD
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =================================================
           ELEMENTS
           ================================================= */

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

        const connectionElement =
            document.getElementById("connectionStatus");


        /* =================================================
           AUTHENTICATION
           ================================================= */

        onAuthStateChanged(
            auth,
            async (user) => {


                console.log(
                    "Firebase auth state:",
                    user
                );


                /* -----------------------------------------
                   NO USER
                   ----------------------------------------- */

                if (!user) {

                    console.log(
                        "No logged-in user."
                    );

                    window.location.replace(
                        "index.html"
                    );

                    return;

                }


                /* -----------------------------------------
                   REFRESH USER
                   ----------------------------------------- */

                try {

                    await user.reload();

                }

                catch (error) {

                    console.error(
                        "Could not reload user:",
                        error
                    );

                }


                const currentUser =
                    auth.currentUser;


                console.log(
                    "Logged in:",
                    currentUser.email
                );

                console.log(
                    "Username:",
                    currentUser.displayName
                );


                /* =================================================
                   DISPLAY USERNAME
                   ================================================= */

                if (usernameElement) {


                    if (
                        currentUser.displayName &&
                        currentUser.displayName.trim() !== ""
                    ) {

                        usernameElement.textContent =
                            currentUser.displayName;

                    }


                    else if (
                        currentUser.email
                    ) {

                        usernameElement.textContent =
                            currentUser.email.split("@")[0];

                    }


                    else {

                        usernameElement.textContent =
                            "User";

                    }

                }


                /* =================================================
                   DEMO ROBOT DATA
                   ================================================= */

                if (pestCountElement) {

                    pestCountElement.textContent =
                        "12";

                }


                if (robotLocationElement) {

                    robotLocationElement.textContent =
                        "Field Zone A3";

                }


                if (batteryElement) {

                    batteryElement.textContent =
                        "95%";

                }


                if (temperatureElement) {

                    temperatureElement.textContent =
                        "32°C";

                }


                if (connectionElement) {

                    connectionElement.textContent =
                        "Online";

                }

            }
        );


        /* =================================================
           LOGOUT
           ================================================= */

        if (logoutBtn) {

            logoutBtn.addEventListener(
                "click",
                async () => {

                    try {

                        await signOut(auth);

                        window.location.replace(
                            "index.html"
                        );

                    }

                    catch (error) {

                        console.error(
                            "Logout error:",
                            error
                        );

                        alert(
                            error.message
                        );

                    }

                }
            );

        }

    }
);