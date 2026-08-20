// FIREBASE SDK IMPORTS
import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

/* =========================================
   FIREBASE CONFIG
========================================= */

const firebaseConfig = {

  apiKey: "YOUR_API_KEY",

  authDomain: "togo-login.firebaseapp.com",

  projectId: "togo-login",

  storageBucket: "togo-login.firebasestorage.app",

  messagingSenderId: "1074241514688",

  appId: "1:1074241514688:web:8f213b1d2bb32ad2fed125"
};

/* =========================================
   INITIALIZE FIREBASE
========================================= */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

/* =========================================
   BUTTON
========================================= */

const submitBtn =
  document.getElementById("submit-btn");

/* =========================================
   LOGIN EVENT
========================================= */

submitBtn.addEventListener(
  "click",

  async (event) => {

    event.preventDefault();

    // INPUT VALUES

    const email =
      document.getElementById("email").value.trim();

    const password =
      document.getElementById("password").value.trim();

    /* =====================================
       VALIDATION
    ===================================== */

    if (!email || !password) {

      alert("Please fill in all fields");

      return;
    }

    try {

      /* =====================================
         FIREBASE LOGIN
      ===================================== */

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      // CURRENT USER

      const user = userCredential.user;

      console.log("Logged in user:", user);

      /* =====================================
         SAVE USER TOKEN
      ===================================== */

      const token =
        await user.getIdToken();

      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          email: user.email
        })
      );

      alert("Login successful!");

      /* =====================================
         REDIRECT
      ===================================== */

      window.location.href = "shop.html";

    }

    catch (error) {

      console.error("Login Error:", error);

      // BETTER ERROR MESSAGES

      switch (error.code) {

        case "auth/invalid-email":
          alert("Invalid email address");
          break;

        case "auth/user-not-found":
          alert("User not found");
          break;

        case "auth/wrong-password":
          alert("Incorrect password");
          break;

        default:
          alert(error.message);
      }

    }

  }
);
