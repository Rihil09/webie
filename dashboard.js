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

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       ELEMENTS
       ================================================= */

    const logoutBtn =
        document.getElementById("logoutBtn");


    /* ---------------------------------------------
       USERNAME ELEMENTS
       --------------------------------------------- */

    const usernameElement =
        document.getElementById("username");

    const topbarUsernameElement =
        document.getElementById("topbarUsername");


    /* ---------------------------------------------
       DASHBOARD DATA ELEMENTS
       --------------------------------------------- */

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


            /* =========================================
               NO USER
               ========================================= */

            if (!user) {

                console.log(
                    "No logged-in user."
                );

                /*
                 * User is not logged in.
                 * Send them back to the login page.
                 */

                window.location.replace(
                    "login.html"
                );

                return;
            }


            /* =========================================
               USER IS LOGGED IN
               ========================================= */

            console.log(
                "Logged in:",
                user.email
            );


            /* =========================================
               REFRESH USER INFORMATION
               ========================================= */

            try {

                await user.reload();

            }

            catch (error) {

                console.error(
                    "Could not reload user:",
                    error
                );

            }


            /*
             * Get the newest version of the
             * currently logged-in user.
             */

            const currentUser =
                auth.currentUser;


            console.log(
                "Current user:",
                currentUser
            );

            console.log(
                "Display name:",
                currentUser?.displayName
            );

            console.log(
                "Email:",
                currentUser?.email
            );


            /* =================================================
               DETERMINE USERNAME
               ================================================= */

            let username = "User";


            /*
             * First choice:
             * Firebase displayName
             */

            if (
                currentUser &&
                currentUser.displayName &&
                currentUser.displayName.trim() !== ""
            ) {

                username =
                    currentUser.displayName.trim();

            }


            /*
             * Backup:
             * Use the part before @
             */

            else if (
                currentUser &&
                currentUser.email
            ) {

                username =
                    currentUser.email
                        .split("@")[0];

            }


            console.log(
                "Username to display:",
                username
            );


            /* =================================================
               DISPLAY USERNAME
               ================================================= */


            /*
             * MAIN WELCOME MESSAGE
             *
             * Welcome, Username!
             */

            if (usernameElement) {

                usernameElement.textContent =
                    username;

            }


            /*
             * TOPBAR USERNAME
             *
             * Logged in as
             * Username
             */

            if (topbarUsernameElement) {

                topbarUsernameElement.textContent =
                    username;

            }


            /* =================================================
               DEMO ROVER DATA
               ================================================= */

            /*
             * These are temporary values.
             *
             * Later, we can replace these with
             * real Raspberry Pi / Firebase data.
             */


            /* ---------------------------------------------
               PEST COUNT
               --------------------------------------------- */

            if (pestCountElement) {

                pestCountElement.textContent =
                    "12";

            }


            /* ---------------------------------------------
               ROVER LOCATION
               --------------------------------------------- */

            if (robotLocationElement) {

                robotLocationElement.textContent =
                    "Field Zone A3";

            }


            /* ---------------------------------------------
               BATTERY
               --------------------------------------------- */

            if (batteryElement) {

                batteryElement.textContent =
                    "67%";

            }


            /* ---------------------------------------------
               TEMPERATURE
               --------------------------------------------- */

            if (temperatureElement) {

                temperatureElement.textContent =
                    "32°C";

            }


            /* ---------------------------------------------
               CONNECTION
               --------------------------------------------- */

            if (connectionElement) {

                connectionElement.textContent =
                    "Online";

            }

        }
    );


    /* =====================================================
       LOGOUT
       ===================================================== */

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            async () => {

                try {

                    console.log(
                        "Logging out..."
                    );


                    /*
                     * Sign out from Firebase.
                     */

                    await signOut(auth);


                    console.log(
                        "Logout successful."
                    );


                    /*
                     * Return to login page.
                     */

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
                        "Logout failed: " +
                        error.message
                    );

                }

            }
        );

    }


    /* =====================================================
       SIDEBAR MENU
       ===================================================== */

    const menuButtons =
        document.querySelectorAll(".menu-btn");


    menuButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    /*
                     * Remove active state
                     * from every menu button.
                     */

                    menuButtons.forEach(
                        (btn) => {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    /*
                     * Add active state
                     * to the clicked button.
                     */

                    button.classList.add(
                        "active"
                    );


                    /*
                     * For now, we only change
                     * the visual active state.
                     *
                     * Later we can connect:
                     *
                     * Dashboard
                     * Live Camera
                     * Pest Detection
                     * Rover Location
                     */

                    console.log(
                        "Selected page:",
                        button.dataset.page
                    );

                }
            );

        }
    );

});