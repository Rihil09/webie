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

    apiKey:
        "AIzaSyAFe7fGknE_4RLLSqIXX7RafMftdfnhf8A",

    authDomain:
        "ar-rice-system.firebaseapp.com",

    databaseURL:
        "https://ar-rice-system-default-rtdb.firebaseio.com",

    projectId:
        "ar-rice-system",

    storageBucket:
        "ar-rice-system.firebasestorage.app",

    messagingSenderId:
        "315656193287",

    appId:
        "1:315656193287:web:8719c39e19ac7a773731a2",

    measurementId:
        "G-B87RFCV0N8"
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

    const sidebar =
        document.querySelector(".sidebar");

    const sidebarToggle =
        document.getElementById("sidebarToggle");

    const logoutBtn =
        document.getElementById("logoutBtn");


    /* =================================================
       USERNAME ELEMENTS
       ================================================= */

    const usernameElement =
        document.getElementById("username");

    const topbarUsernameElement =
        document.getElementById("topbarUsername");


    /* =================================================
       DASHBOARD DATA ELEMENTS
       ================================================= */

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


    /* =====================================================
       SIDEBAR COLLAPSE / EXPAND
       ===================================================== */

    if (sidebar && sidebarToggle) {

        sidebarToggle.addEventListener(
            "click",
            () => {

                sidebar.classList.toggle("collapsed");

                document.body.classList.toggle(
                    "sidebar-collapsed"
                );


                const isCollapsed =
                    sidebar.classList.contains("collapsed");


                /* -----------------------------------------
                   ACCESSIBILITY
                   ----------------------------------------- */

                sidebarToggle.setAttribute(
                    "aria-expanded",
                    String(!isCollapsed)
                );


                /* -----------------------------------------
                   TOOLTIP
                   ----------------------------------------- */

                sidebarToggle.title =
                    isCollapsed
                        ? "Expand Menu"
                        : "Collapse Menu";


                sidebarToggle.setAttribute(
                    "aria-label",
                    isCollapsed
                        ? "Expand Menu"
                        : "Collapse Menu"
                );


                console.log(
                    isCollapsed
                        ? "Sidebar collapsed"
                        : "Sidebar expanded"
                );

            }
        );

    }


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


            /* ---------------------------------------------
               FIRST CHOICE — DISPLAY NAME
               --------------------------------------------- */

            if (
                currentUser &&
                currentUser.displayName &&
                currentUser.displayName.trim() !== ""
            ) {

                username =
                    currentUser.displayName.trim();

            }


            /* ---------------------------------------------
               BACKUP — EMAIL
               --------------------------------------------- */

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

            if (usernameElement) {

                usernameElement.textContent =
                    username;

            }


            if (topbarUsernameElement) {

                topbarUsernameElement.textContent =
                    username;

            }


            /* =================================================
               DEMO ROVER DATA
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
                    "67%";

            }


            if (temperatureElement) {

                temperatureElement.textContent =
                    "32°C";

            }


            if (connectionElement) {

                connectionElement.textContent =
                    "Online";

            }


            /* ---------------------------------------------
               OTHER BATTERY / TEMPERATURE ELEMENTS
               --------------------------------------------- */

            const batteryStatus =
                document.getElementById("batteryStatus");

            const temperatureStatus =
                document.getElementById("temperatureStatus");

            const batteryProgress =
                document.getElementById("batteryProgress");


            if (batteryStatus) {

                batteryStatus.textContent =
                    "67%";

            }


            if (temperatureStatus) {

                temperatureStatus.textContent =
                    "32°C";

            }


            if (batteryProgress) {

                batteryProgress.style.width =
                    "67%";

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


                    await signOut(auth);


                    console.log(
                        "Logout successful."
                    );


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


                    /* -------------------------------------
                       REMOVE ACTIVE FROM ALL BUTTONS
                       ------------------------------------- */

                    menuButtons.forEach(
                        (btn) => {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    /* -------------------------------------
                       ADD ACTIVE TO CLICKED BUTTON
                       ------------------------------------- */

                    button.classList.add(
                        "active"
                    );


                    /* -------------------------------------
                       GET PAGE
                       ------------------------------------- */

                    const page =
                        button.dataset.page;


                    console.log(
                        "Selected page:",
                        page
                    );


                    /* -------------------------------------
                       FUTURE PAGE NAVIGATION
                       -------------------------------------

                       We are NOT redirecting yet.

                       This keeps the dashboard working
                       while you build the other pages.
                    */

                }
            );

        }
    );

});