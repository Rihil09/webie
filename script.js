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
          window.location.href = "index.html";
      }
  });

  // ======================
  // LOGOUT FUNCTION
  // ======================
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        try {
            await signOut(auth);
            window.location.href = "index.html";
        } catch (error) {
            alert(error.message);
        }
    });
  }

  // ======================
  // OPEN POPUPS (Multiple Allowed)
  // ======================
  controlButtons.forEach(button => {
      button.addEventListener('click', () => {
          const target = button.dataset.popup;
          const popup = document.getElementById(target);
          if (popup) popup.classList.add('active');
      });
  });

  // ======================
  // CLOSE INDIVIDUAL POPUP
  // ======================
  popupCloses.forEach(close => {
      close.addEventListener('click', (e) => {
          const box = e.target.closest('.popup-box');
          if (box) box.classList.remove('active');
      });
  });

  // ======================
  // DRAGGABLE POPUPS
  // ======================
  popups.forEach(popup => {

      let isDragging = false;
      let offsetX = 0;
      let offsetY = 0;

      popup.addEventListener('mousedown', (e) => {
          isDragging = true;
          offsetX = e.clientX - popup.offsetLeft;
          offsetY = e.clientY - popup.offsetTop;
          popup.style.cursor = "grabbing";
      });

      document.addEventListener('mousemove', (e) => {
          if (isDragging) {
              popup.style.left = (e.clientX - offsetX) + "px";
              popup.style.top = (e.clientY - offsetY) + "px";
          }
      });

      document.addEventListener('mouseup', () => {
          isDragging = false;
          popup.style.cursor = "grab";
      });

  });

});
