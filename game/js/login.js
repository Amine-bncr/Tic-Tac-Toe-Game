// Get references
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

// Handle form submit
loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username] && users[username].password === password) {
        loginMessage.style.color = "green";
        loginMessage.textContent = "Welcome back, " + username + "!";

        // save logges un user
        localStorage.setItem("loggedInUser", username);

        // redirect to home page if you want
        // window.location.href = "index.html";
    } else {
        loginMessage.style.color = "red";
        loginMessage.textContent = "Invalid username or password.";
    }
});