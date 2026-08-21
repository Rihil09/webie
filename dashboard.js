/* =====================================================
   FIREBASE IMPORTS
   ===================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
    getDatabase,
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";


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

const database = getDatabase(app);


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


    /* =================================================
       OTHER DATA ELEMENTS
       ================================================= */

    const batteryStatus =
        document.getElementById("batteryStatus");

    const temperatureStatus =
        document.getElementById("temperatureStatus");

    const batteryProgress =
        document.getElementById("batteryProgress");


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


                sidebarToggle.setAttribute(
                    "aria-expanded",
                    String(!isCollapsed)
                );


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


    /* =====================================================
       AUTHENTICATION
       ===================================================== */

    onAuthStateChanged(
        auth,
        async (user) => {

            console.log(
                "Firebase auth state:",
                user
            );


            /* =============================================
               NO USER
               ============================================= */

            if (!user) {

                console.log(
                    "No logged-in user."
                );

                window.location.replace(
                    "login.html"
                );

                return;
            }


            /* =============================================
               USER IS LOGGED IN
               ============================================= */

            console.log(
                "Logged in:",
                user.email
            );


            /* =============================================
               REFRESH USER INFORMATION
               ============================================= */

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


            /* =================================================
               DETERMINE USERNAME
               ================================================= */

            let username = "User";


            if (
                currentUser &&
                currentUser.displayName &&
                currentUser.displayName.trim() !== ""
            ) {

                username =
                    currentUser.displayName.trim();

            }

            else if (
                currentUser &&
                currentUser.email
            ) {

                username =
                    currentUser.email.split("@")[0];

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


            /* =====================================================
               RASPBERRY PI → FIREBASE → WEBSITE
               ===================================================== */

            console.log(
                "Connecting to Raspberry Pi Firebase data..."
            );


            /*
             * Firebase path:
             *
             * robot
             *
             * Example:
             *
             * robot
             * ├── temperature
             * ├── pestsDetected
             * └── battery
             */

            const robotRef =
                ref(database, "robot");


            onValue(
                robotRef,

                (snapshot) => {

                    const data =
                        snapshot.val();


                    console.log(
                        "Raspberry Pi data:",
                        data
                    );


                    /* =====================================
                       NO DATA
                       ===================================== */

                    if (!data) {

                        console.log(
                            "No rover data available yet."
                        );

                        if (connectionElement) {

                            connectionElement.textContent =
                                "Offline";

                        }

                        return;
                    }


                    /* =====================================
                       TEMPERATURE
                       ===================================== */

                    if (
                        data.temperature !== undefined &&
                        data.temperature !== null
                    ) {

                        const temperature =
                            data.temperature;


                        if (temperatureElement) {

                            temperatureElement.textContent =
                                temperature + "°C";

                        }


                        if (temperatureStatus) {

                            temperatureStatus.textContent =
                                temperature + "°C";

                        }

                    }


                    /* =====================================
                       PESTS DETECTED
                       ===================================== */

                    if (
                        data.pestsDetected !== undefined &&
                        data.pestsDetected !== null
                    ) {

                        if (pestCountElement) {

                            pestCountElement.textContent =
                                data.pestsDetected;

                        }

                    }


                    /* =====================================
                       BATTERY
                       ===================================== */

                    if (
                        data.battery !== undefined &&
                        data.battery !== null
                    ) {

                        const battery =
                            data.battery;


                        if (batteryElement) {

                            batteryElement.textContent =
                                battery + "%";

                        }


                        if (batteryStatus) {

                            batteryStatus.textContent =
                                battery + "%";

                        }


                        if (batteryProgress) {

                            batteryProgress.style.width =
                                battery + "%";

                        }

                    }


                    /* =====================================
                       ROBOT LOCATION
                       ===================================== */

                    if (
                        data.location !== undefined &&
                        data.location !== null
                    ) {

                        if (robotLocationElement) {

                            robotLocationElement.textContent =
                                data.location;

                        }

                    }


                    /* =====================================
                       CONNECTION STATUS
                       ===================================== */

                    if (connectionElement) {

                        connectionElement.textContent =
                            "Online";

                    }


                    console.log(
                        "Dashboard updated successfully."
                    );

                },


                /* =========================================
                   FIREBASE ERROR
                   ========================================= */

                (error) => {

                    console.error(
                        "Firebase rover data error:",
                        error
                    );


                    if (connectionElement) {

                        connectionElement.textContent =
                            "Offline";

                    }

                }

            );

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
       SIDEBAR MENU / PAGE NAVIGATION
       ===================================================== */

    const menuButtons =
        document.querySelectorAll(".menu-btn");

    const dashboardGrid =
        document.querySelector(".dashboard-grid");

    const pageHeader =
        document.querySelector(".page-header");

    const aboutSection =
        document.getElementById("aboutSection");

    const dashboardFooter =
        document.querySelector(".dashboard-footer");


    /* =====================================================
       PAGE SWITCHING
       ===================================================== */

    function showPage(page) {


        /* ================================================
           DASHBOARD
           ================================================ */

        if (page === "dashboard") {

            if (pageHeader) {

                pageHeader.style.display =
                    "flex";

            }


            if (dashboardGrid) {

                dashboardGrid.style.display =
                    "grid";

            }


            if (aboutSection) {

                aboutSection.classList.remove(
                    "active"
                );

            }


            if (dashboardFooter) {

                dashboardFooter.style.display =
                    "block";

            }

        }


        /* ================================================
           ABOUT US
           ================================================ */

        else if (page === "about") {

            if (pageHeader) {

                pageHeader.style.display =
                    "none";

            }


            if (dashboardGrid) {

                dashboardGrid.style.display =
                    "none";

            }


            if (aboutSection) {

                aboutSection.classList.add(
                    "active"
                );

            }


            if (dashboardFooter) {

                dashboardFooter.style.display =
                    "block";

            }

        }


        /* ================================================
           OTHER PAGES
           ================================================ */

        else {

            console.log(
                "Page not implemented yet:",
                page
            );

        }

    }


    /* =====================================================
       MENU BUTTON EVENTS
       ===================================================== */

    menuButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {


                    /* Remove active state */

                    menuButtons.forEach(
                        (btn) => {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    /* Add active state */

                    button.classList.add(
                        "active"
                    );


                    /* Get selected page */

                    const page =
                        button.dataset.page;


                    console.log(
                        "Selected page:",
                        page
                    );


                    /* Show selected page */

                    showPage(page);

                }
            );

        }
    );

});