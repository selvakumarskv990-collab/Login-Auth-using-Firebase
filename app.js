// ---------------------------
//  CONNECT TO FIREBASE
// ---------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAdMMsbme17cdRyQ13beAGuduGuPIuDob8",
  authDomain: "loginauth-cda86.firebaseapp.com",
  projectId: "loginauth-cda86",
  storageBucket: "loginauth-cda86.firebasestorage.app",
  messagingSenderId: "999514947059",
  appId: "1:999514947059:web:bfbca763e16769192de686"
};

//  Initialize Firebase app
const app = initializeApp(firebaseConfig);

//  Get Firebase Authentication service
const auth = getAuth(app);



function showPane(pane) {
  const loginPane = document.getElementById("login-pane");
  const registerPane = document.getElementById("register-pane");

  const loginTab = document.getElementById("login-tab");
  const registerTab = document.getElementById("register-tab");

  if (pane === "login") {
    loginPane.classList.remove("d-none");
    registerPane.classList.add("d-none");

    loginTab.classList.add("active");
    registerTab.classList.remove("active");
  } else {
    registerPane.classList.remove("d-none");
    loginPane.classList.add("d-none");

    registerTab.classList.add("active");
    loginTab.classList.remove("active");
  }
}

// 🔹 Tab switching buttons
const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");
const goRegister = document.getElementById("go-register");
const goLogin = document.getElementById("go-login");

loginTab.addEventListener("click", function() {
  showPane("login");
});
registerTab.addEventListener("click", function() {
  showPane("register");
});
goRegister.addEventListener("click", function(event) {
  event.preventDefault();
  showPane("register");
});
goLogin.addEventListener("click", function(event) {
  event.preventDefault();
  showPane("login");
});


const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const remember = document.getElementById("remember").checked;

  const persistence = remember ? browserLocalPersistence : browserSessionPersistence;

  setPersistence(auth, persistence)
    .then(function() {
      return signInWithEmailAndPassword(auth, email, password);
    })
    .then(function() {
      alert("Login successful!");
      loginForm.reset();
    })
    .catch(function(error) {
      alert(error.message);
    });
   
});



const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;
  const confirm = document.getElementById("reg-confirm").value;

  if (password !== confirm) {
    alert(" Passwords do not match!");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(function(result) {
      const user = result.user;

      if (name) {
        return updateProfile(user, { displayName: name });
      }
    })
    .then(function() {
      alert("Registered successfully! You can now log in.");
      showPane("login");
       registerForm.reset();
    })
    .catch(function(error) {
      alert(error.message);
    });
});

onAuthStateChanged(auth, function(user) {
  if (user) {
    console.log("User logged in:", user.email);
  } else {
    console.log("No user logged in.");
  }
});


function logout() {
  signOut(auth)
    .then(function() {
      alert("Logged out!");
    })
    .catch(function(error) {
      alert( error.message);
    });
}


window.logout = logout;
