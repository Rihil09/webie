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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ================= MAIN ================= */
document.addEventListener("DOMContentLoaded", () => {

  const logoutBtn = document.getElementById("logoutBtn");
  const controlButtons = document.querySelectorAll(".control-btn");
  const popups = document.querySelectorAll(".popup-box");
  const popupCloses = document.querySelectorAll(".popup-close");
  const centerText = document.querySelector(".center-text");

  /* ================= AUTH CHECK ================= */
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.replace("index.html");
    }
  });

  /* ================= LOGOUT ================= */
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await signOut(auth);
        window.location.replace("index.html");
      } catch (error) {
        alert(error.message);
      }
    });
  }

  /* ================= CHECK IF ANY POPUP OPEN ================= */
  function checkPopups() {
    const anyOpen = document.querySelectorAll(".popup-box.active").length > 0;
    centerText.style.opacity = anyOpen ? "0" : "1";
    centerText.style.pointerEvents = anyOpen ? "none" : "auto";
  }

  /* ================= OPEN POPUPS ================= */
  controlButtons.forEach(button => {
    button.addEventListener("click", () => {
      const target = button.dataset.popup;
      const popup = document.getElementById(target);
      if (!popup) return;

      popup.classList.add("active");

      // bring clicked popup to front
      popup.style.zIndex = Date.now();

      checkPopups();
    });
  });

  /* ================= CLOSE POPUPS ================= */
  document.addEventListener("click", (e) => {
  const closeBtn = e.target.closest(".popup-close");
  if (!closeBtn) return;

  const popup = closeBtn.closest(".popup-box");
  if (!popup) return;

  popup.classList.remove("active");
  checkPopups();
});


  /* ================= DRAGGABLE POPUPS ================= */
  popups.forEach(popup => {

    const header = popup.querySelector(".popup-header");
    if (!header) return;

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    header.addEventListener("pointerdown", (e) => {
      isDragging = true;

      offsetX = e.clientX - popup.offsetLeft;
      offsetY = e.clientY - popup.offsetTop;

      popup.style.transition = "none";
      document.body.style.userSelect = "none";
      header.style.cursor = "grabbing";

      popup.setPointerCapture(e.pointerId);
    });

    popup.addEventListener("pointermove", (e) => {
      if (!isDragging) return;

      popup.style.left = `${e.clientX - offsetX}px`;
      popup.style.top = `${e.clientY - offsetY}px`;
    });

    popup.addEventListener("pointerup", (e) => {
      isDragging = false;

      document.body.style.userSelect = "auto";
      header.style.cursor = "grab";
      popup.style.transition = "all 0.3s ease";

      popup.releasePointerCapture(e.pointerId);
    });

  });

});
