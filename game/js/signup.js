const form = document.getElementById("signupForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const message = document.getElementById("message");

// Handle form submission
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const user = username.value.trim();
    const mail = email.value.trim();
    const pass = password.value.trim();
    const dob = document.getElementById("dob").value;

    // Basic validation
    if (user.length < 3) {
        message.style.color = "red";
        message.textContent = "Username must be at least 3 characters long.";
        return;
    }
    if (!/\S+@\S+\.\S+/.test(mail)) {
        message.style.color = "red";
        message.textContent = "Please enter a valid email address.";
        return;
    }
    if (pass.length < 6) {
        message.style.color = "red";
        message.textContent = "Password must be at least 6 characters long.";
        return;
    }

    // Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[user]) {
        message.style.color = "red";
        message.textContent = "Username already exists.";
        return;
    } 




    // Save new user
    users[user] = { 
    email: mail, 
    password: pass, 
    dob: dob
};
    localStorage.setItem("users", JSON.stringify(users));

    // Initialize ranking for the new user

    if (window.Ranking && typeof window.Ranking.addWinForUser === 'function') {

    // Initialize with 0 wins by checking if they exist

    const rankings = JSON.parse(localStorage.getItem('rankings')) || {};
    if (!rankings[user]) {
        rankings[user] = 0;
        localStorage.setItem('rankings', JSON.stringify(rankings));
    }
}

    message.style.color = "green";
    message.textContent = "Registration successful! You can now log in.";

    // Optional: redirect to login page
    // window.location.href = "loginpage.html";
    

    form.reset();
});