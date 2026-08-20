 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBGm2Gz7wUrMSpKppTlXj9OMy9hphe-kRA",
    authDomain: "togo-login.firebaseapp.com",
    projectId: "togo-login",
    storageBucket: "togo-login.firebasestorage.app",
    messagingSenderId: "1074241514688",
    appId: "1:1074241514688:web:8f213b1d2bb32ad2fed125"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);



  //Submit Button
  const submit = document.getElementById("submit-btn");
  submit.addEventListener("click", function (event) {
    event.preventDefault()
    alert(Submitted)


      //inputs
  const username  = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up
    const user = userCredential.user;
    alert("Creating Account...")
    window.location.href ="/home";
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });
  })
