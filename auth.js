
// ==========================================
// 1. SELECT HTML ELEMENTS
// ==========================================

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const openSignup = document.getElementById("openSignup");
const openLogin = document.getElementById("openLogin");

const loginMessage = document.getElementById("loginMessage");
const signupMessage = document.getElementById("signupMessage");


// ==========================================
// 2. TEMPORARY DEMO ACCOUNT
// ==========================================

// This variable stores the account only while
// the authentication page remains open.

let demoAccount = null;


// ==========================================
// 3. SWITCH BETWEEN LOGIN AND SIGNUP
// ==========================================

function showLogin() {

    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");

    loginTab.classList.add("active");
    signupTab.classList.remove("active");

    loginMessage.textContent = "";
    signupMessage.textContent = "";
}


function showSignup() {

    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");

    signupTab.classList.add("active");
    loginTab.classList.remove("active");

    loginMessage.textContent = "";
    signupMessage.textContent = "";
}


// Click events for switching forms

loginTab.addEventListener("click", showLogin);
signupTab.addEventListener("click", showSignup);

openSignup.addEventListener("click", showSignup);
openLogin.addEventListener("click", showLogin);


// ==========================================
// 4. SHOW OR HIDE PASSWORD
// ==========================================

const showLoginPassword =
    document.getElementById("showLoginPassword");

const showSignupPassword =
    document.getElementById("showSignupPassword");

const loginPassword =
    document.getElementById("loginPassword");

const signupPassword =
    document.getElementById("signupPassword");

const confirmPassword =
    document.getElementById("confirmPassword");


// Show or hide login password

showLoginPassword.addEventListener("change", function () {

    if (showLoginPassword.checked) {
        loginPassword.type = "text";
    } else {
        loginPassword.type = "password";
    }

});


// Show or hide signup passwords

showSignupPassword.addEventListener("change", function () {

    if (showSignupPassword.checked) {
        signupPassword.type = "text";
        confirmPassword.type = "text";
    } else {
        signupPassword.type = "password";
        confirmPassword.type = "password";
    }

});


// ==========================================
// 5. SIGNUP FORM
// ==========================================

signupForm.addEventListener("submit", function (event) {

    // Prevent page from refreshing
    event.preventDefault();

    // Get values from input fields
    const name =
        document.getElementById("signupName").value.trim();

    const email =
        document.getElementById("signupEmail").value.trim().toLowerCase();

    const password = signupPassword.value;

    const confirm =
        confirmPassword.value;


    // Check whether passwords match
    if (password !== confirm) {

        signupMessage.textContent = "Passwords do not match!";
        signupMessage.style.color = "#ff6b6b";

        return;
    }


    // Check minimum password length
    if (password.length < 8) {

        signupMessage.textContent =
            "Password must contain at least 8 characters.";

        signupMessage.style.color = "#ff6b6b";

        return;
    }


    // Check whether an account already exists
    if (demoAccount && demoAccount.email === email) {

        signupMessage.textContent =
            "An account with this email already exists.";

        signupMessage.style.color = "#ff6b6b";

        return;
    }


    // Create temporary demo account
    demoAccount = {
        name: name,
        email: email,
        password: password
    };


    // Display success message
    signupMessage.textContent =
        "Account created successfully! Please login.";

    signupMessage.style.color = "#4ade80";


    // Clear signup form
    signupForm.reset();

    // Switch to login after a short delay
    setTimeout(function () {

        showLogin();

        document.getElementById("loginEmail").value = email;

    }, 1000);

});


// ==========================================
// 6. LOGIN FORM
// ==========================================

loginForm.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();

    // Get login details
    const email =
        document.getElementById("loginEmail").value.trim().toLowerCase();

    const password =
        loginPassword.value;


    // Check whether an account has been created
    if (!demoAccount) {

        loginMessage.textContent =
            "Please create an account first.";

        loginMessage.style.color = "#ff6b6b";

        return;
    }


    // Verify email and password
    if (
        email === demoAccount.email &&
        password === demoAccount.password
    ) {

        loginMessage.textContent =
            "Login successful! Welcome to AI StudyMate.";

        loginMessage.style.color = "#4ade80";


        // Redirect to dashboard
        setTimeout(function () {

            window.location.href = "index.html";

        }, 1000);

    } else {

        loginMessage.textContent =
            "Incorrect email or password.";

        loginMessage.style.color = "#ff6b6b";

    }

});


// ==========================================
// 7. INITIAL PAGE SETUP
// ==========================================

// Show login form when page first opens

showLogin();
