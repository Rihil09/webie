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

    const pestPageCountElement =
        document.getElementById("pestPageCount");

    const robotLocationElement =
        document.getElementById("robotLocation");

    const overviewLocationElement =
        document.getElementById("overviewLocation");

    const locationPageValue =
        document.getElementById("locationPageValue");

    const batteryElement =
        document.getElementById("battery");

    const temperatureElement =
        document.getElementById("temperature");

    const connectionElement =
        document.getElementById("connectionStatus");

    const batteryStatus =
        document.getElementById("batteryStatus");

    const temperatureStatus =
        document.getElementById("temperatureStatus");

    const batteryProgress =
        document.getElementById("batteryProgress");


    /* =====================================================
       PAGE SECTIONS
    ===================================================== */

    const pageHeader =
        document.querySelector(".page-header");

    const dashboardGrid =
        document.querySelector(".dashboard-grid");

    const aboutSection =
        document.getElementById("aboutSection");

    const cameraSection =
        document.getElementById("cameraSection");

    const pestSection =
        document.getElementById("pestSection");

    const locationSection =
        document.getElementById("locationSection");

    const dashboardFooter =
        document.querySelector(".dashboard-footer");



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
       PAGE SWITCHING
    ===================================================== */

    function showPage(page) {

        console.log(
            "Switching to page:",
            page
        );


        /* =================================================
           HIDE ALL PAGE CONTENT FIRST
        ================================================= */

        if (pageHeader) {
            pageHeader.style.display = "none";
        }

        if (dashboardGrid) {
            dashboardGrid.style.display = "none";
        }

        if (aboutSection) {
            aboutSection.classList.remove("active");
            aboutSection.style.display = "none";
        }

        if (cameraSection) {
            cameraSection.classList.remove("active");
            cameraSection.style.display = "none";
        }

        if (pestSection) {
            pestSection.classList.remove("active");
            pestSection.style.display = "none";
        }

        if (locationSection) {
            locationSection.classList.remove("active");
            locationSection.style.display = "none";
        }


        /* =================================================
           DASHBOARD
        ================================================= */

        if (page === "dashboard") {

            if (pageHeader) {
                pageHeader.style.display = "flex";
            }

            if (dashboardGrid) {
                dashboardGrid.style.display = "grid";
            }

            if (dashboardFooter) {
                dashboardFooter.style.display = "block";
            }

        }


        /* =================================================
           ABOUT US
        ================================================= */

        else if (page === "about") {

            if (aboutSection) {

                aboutSection.style.display = "grid";

                aboutSection.classList.add("active");

            }

            if (dashboardFooter) {
                dashboardFooter.style.display = "block";
            }

        }


        /* =================================================
           LIVE CAMERA
        ================================================= */

        else if (page === "camera") {

            if (cameraSection) {

                cameraSection.style.display = "block";

                cameraSection.classList.add("active");

            }

            if (dashboardFooter) {
                dashboardFooter.style.display = "block";
            }

        }


        /* =================================================
           PEST DETECTION
        ================================================= */

        else if (page === "pest") {

            if (pestSection) {

                pestSection.style.display = "block";

                pestSection.classList.add("active");

            }

            if (dashboardFooter) {
                dashboardFooter.style.display = "block";
            }

        }


        /* =================================================
           ROVER LOCATION
        ================================================= */

        else if (page === "location") {

            if (locationSection) {

                locationSection.style.display = "block";

                locationSection.classList.add("active");

            }

            if (dashboardFooter) {
                dashboardFooter.style.display = "block";
            }

        }


        /* =================================================
           UNKNOWN PAGE
        ================================================= */

        else {

            console.warn(
                "Unknown page:",
                page
            );

        }

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


                    /* =====================================
                       REMOVE ACTIVE FROM ALL BUTTONS
                    ===================================== */

                    menuButtons.forEach(
                        (btn) => {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    /* =====================================
                       ADD ACTIVE TO CLICKED BUTTON
                    ===================================== */

                    button.classList.add(
                        "active"
                    );


                    /* =====================================
                       GET PAGE
                    ===================================== */

                    const page =
                        button.dataset.page;


                    console.log(
                        "Selected page:",
                        page
                    );


                    /* =====================================
                       SHOW PAGE
                    ===================================== */

                    showPage(page);

                }
            );

        }
    );



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
               USER LOGGED IN
            ============================================= */

            console.log(
                "Logged in:",
                user.email
            );


            /* =============================================
               REFRESH USER
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


            /* =============================================
               DETERMINE USERNAME
            ============================================= */

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
                "Username:",
                username
            );


            /* =============================================
               DISPLAY USERNAME
            ============================================= */

            if (usernameElement) {

                usernameElement.textContent =
                    username;

            }


            if (topbarUsernameElement) {

                topbarUsernameElement.textContent =
                    username;

            }



            /* =================================================
               FIREBASE ROVER DATA
            ================================================= */

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


                    /* =========================================
                       NO DATA
                    ========================================= */

                    if (!data) {

                        console.log(
                            "No rover data available."
                        );

                        if (connectionElement) {

                            connectionElement.textContent =
                                "Waiting...";

                        }

                        return;
                    }



                    /* =========================================
                       TEMPERATURE
                    ========================================= */

                    if (
                        data.temperature !== undefined
                    ) {

                        if (temperatureElement) {

                            temperatureElement.textContent =
                                data.temperature + "°C";

                        }


                        if (temperatureStatus) {

                            temperatureStatus.textContent =
                                data.temperature + "°C";

                        }

                    }



                    /* =========================================
                       PEST COUNT
                    ========================================= */

                    if (
                        data.pestsDetected !== undefined
                    ) {

                        if (pestCountElement) {

                            pestCountElement.textContent =
                                data.pestsDetected;

                        }


                        if (pestPageCountElement) {

                            pestPageCountElement.textContent =
                                data.pestsDetected;

                        }

                    }



                    /* =========================================
                       BATTERY
                    ========================================= */

                    if (
                        data.battery !== undefined
                    ) {

                        if (batteryElement) {

                            batteryElement.textContent =
                                data.battery + "%";

                        }


                        if (batteryStatus) {

                            batteryStatus.textContent =
                                data.battery + "%";

                        }


                        if (batteryProgress) {

                            batteryProgress.style.width =
                                data.battery + "%";

                        }

                    }



                    /* =========================================
                       LOCATION
                    ========================================= */

                    if (
                        data.location !== undefined
                    ) {

                        if (robotLocationElement) {

                            robotLocationElement.textContent =
                                data.location;

                        }


                        if (overviewLocationElement) {

                            overviewLocationElement.textContent =
                                data.location;

                        }


                        if (locationPageValue) {

                            locationPageValue.textContent =
                                data.location;

                        }

                    }



                    /* =========================================
                       CONNECTION
                    ========================================= */

                    if (connectionElement) {

                        connectionElement.textContent =
                            "Online";

                    }

                },


                /* =============================================
                   DATABASE ERROR
                ============================================= */

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


            /* =================================================
               START ON DASHBOARD
            ================================================= */

            showPage("dashboard");

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

});