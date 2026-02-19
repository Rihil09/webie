// ======================
// FIREBASE IMPORTS
// ======================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ======================
// FIREBASE CONFIG
// ======================
const firebaseConfig = {
  apiKey: "AIzaSyAFe7fGknE_4RLLSqIXX7RafMftdfnhf8A",
  authDomain: "ar-rice-system.firebaseapp.com",
  projectId: "ar-rice-system",
  storageBucket: "ar-rice-system.appspot.com",
  messagingSenderId: "315656193287",
  appId: "1:315656193287:web:8719c39e19ac7a773731a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Wait until page loads
document.addEventListener("DOMContentLoaded", () => {

  const logoutBtn = document.getElementById("logoutBtn");
  const controlButtons = document.querySelectorAll('.control-btn');
  const popups = document.querySelectorAll('.popup-box');
  const popupCloses = document.querySelectorAll('.popup-close');

  // ======================
  // CHECK AUTH STATE
  // ======================
  onAuthStateChanged(auth, (user) => {
      if (!user) {
          // If not logged in → go back to login page
          window.location.href = "index.html";
      }
  });

  // ======================
  // LOGOUT FUNCTION
  // ======================
  logoutBtn.addEventListener("click", async () => {
      try {
          await signOut(auth);
          window.location.href = "index.html";
      } catch (error) {
          alert(error.message);
      }
  });

  // ======================
  // BOTTOM POPUP BUTTONS
  // ======================
  controlButtons.forEach(button => {
      button.addEventListener('click', () => {
          const target = button.dataset.popup;

          popups.forEach(popup => popup.classList.remove('active'));
          document.getElementById(target).classList.add('active');
      });
  });

  popupCloses.forEach(close => {
      close.addEventListener('click', () => {
          popups.forEach(popup => popup.classList.remove('active'));
      });
  });

});
