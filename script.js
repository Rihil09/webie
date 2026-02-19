import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {

  const logoutBtn = document.getElementById("logoutBtn");
  const controlButtons = document.querySelectorAll('.control-btn');
  const popups = document.querySelectorAll('.popup-box');
  const popupCloses = document.querySelectorAll('.popup-close');
  const centerText = document.querySelector('.center-text');

  /* AUTH CHECK */
  onAuthStateChanged(auth, (user) => {
      if (!user) {
          window.location.href = "index.html";
      }
  });

  /* LOGOUT */
  if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
          await signOut(auth);
          window.location.href = "index.html";
      });
  }

  /* CHECK POPUPS */
  function checkPopups() {
      const anyOpen = document.querySelectorAll('.popup-box.active').length > 0;
      centerText.style.display = anyOpen ? "none" : "block";
  }

  /* OPEN POPUPS */
  controlButtons.forEach(button => {
      button.addEventListener('click', () => {
          const target = button.dataset.popup;
          const popup = document.getElementById(target);
          if (popup) {
              popup.classList.add('active');
              checkPopups();
          }
      });
  });

  /* CLOSE POPUPS */
  popupCloses.forEach(close => {
      close.addEventListener('click', (e) => {
          const box = e.target.closest('.popup-box');
          if (box) {
              box.classList.remove('active');
              checkPopups();
          }
      });
  });

  /* DRAGGABLE */
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
