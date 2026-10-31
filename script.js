
// ===================================
// CYBERSAFE JAVASCRIPT
// ===================================

// PASSWORD STRENGTH CHECKER

function checkPassword() {

    let password =
    document.getElementById("password").value;

    let result =
    document.getElementById("passwordResult");

    if (password.length === 0) {
        result.innerHTML = "Please enter a password.";
        return;
    }

    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
        result.innerHTML = "Weak Password ❌";
        result.style.color = "red";
    }
    else if (score <= 4) {
        result.innerHTML = "Medium Password ⚠️";
        result.style.color = "orange";
    }
    else {
        result.innerHTML = "Strong Password ✅";
        result.style.color = "green";
    }
}


// PHISHING URL CHECKER

function checkURL() {

    let url =
    document.getElementById("url").value.trim();

    let result =
    document.getElementById("urlResult");

    if (url === "") {
        result.innerHTML = "Please enter a URL.";
        return;
    }

    let parsedURL;

    try {
        parsedURL = new URL(
            url.includes("://") ? url : "https://" + url
        );
    } catch {
        result.innerHTML = "Invalid URL ❌";
        result.style.color = "red";
        return;
    }

    let warnings = [];

    if (parsedURL.protocol !== "https:") {
        warnings.push("Website does not use HTTPS.");
    }

    if (parsedURL.hostname.includes("xn--")) {
        warnings.push("Domain uses encoded characters.");
    }

    if (parsedURL.hostname.split(".").length > 4) {
        warnings.push("Unusual subdomain structure.");
    }

    if (/@/.test(url)) {
        warnings.push("URL contains @ symbol.");
    }

    if (/(login|verify|account|password)/i.test(
        parsedURL.pathname + parsedURL.search
    )) {
        warnings.push("Contains sensitive-looking keywords.");
    }

    if (url.length > 100) {
        warnings.push("Unusually long URL.");
    }

    if (warnings.length > 0) {
        result.innerHTML =
        "Potential Warning Signs ⚠️\n" +
        warnings.join("\n");

        result.style.color = "orange";
    }
    else {
        result.innerHTML =
        "No obvious warning signs found. " +
        "This does not guarantee the website is safe.";

        result.style.color = "green";
    }
}


// ===================================
// CYBERSAFE CHATBOT
// ===================================

function sendMessage() {

    let input =
    document.getElementById("userInput");

    let message = input.value.trim();

    if (message === "") {
        return;
    }

    addMessage(message, "user");

    let response = getBotResponse(message);

    addMessage(response, "bot");

    input.value = "";
}


function addMessage(message, type) {

    let chatMessages =
    document.getElementById("chatMessages");

    let div = document.createElement("div");

    div.className = type;

    div.textContent = message;

    chatMessages.appendChild(div);

    chatMessages.scrollTop =
    chatMessages.scrollHeight;
}


// CHATBOT KNOWLEDGE BASE

function getBotResponse(message) {

    let text = message.toLowerCase();

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {
        return "Hello! Welcome to CyberSafe. How can I help you?";
    }

    else if (text.includes("phishing")) {
        return "Phishing is a cyber attack in which attackers use fake emails, messages or websites to steal personal information. Never click suspicious links.";
    }

    else if (
        text.includes("password") ||
        text.includes("strong")
    ) {
        return "Use a long and unique password with uppercase, lowercase, numbers and special characters. Avoid using your name or birthday.";
    }

    else if (text.includes("malware") ||
             text.includes("virus")) {
        return "Malware is harmful software that can damage your device or steal information. Install software only from trusted sources and keep your device updated.";
    }

    else if (text.includes("otp")) {
        return "Never share your OTP with anyone. Banks and legitimate support staff should not ask you to disclose your OTP.";
    }

    else if (
        text.includes("fraud") ||
        text.includes("scam") ||
        text.includes("cyber crime")
    ) {
        return "Do not share personal or banking details with unknown people. In India, report cyber financial fraud by calling 1930 or visit cybercrime.gov.in.";
    }

    else if (
        text.includes("safe") ||
        text.includes("security tips")
    ) {
        return "Use strong passwords, enable two-factor authentication, avoid unknown links and keep your software updated.";
    }

    else if (text.includes("https")) {
        return "HTTPS encrypts the connection between your browser and a website. However, HTTPS alone does not guarantee that a website is genuine.";
    }

    else if (text.includes("privacy")) {
        return "Protect your privacy by sharing minimum personal information, checking app permissions and never publishing sensitive details.";
    }

    else if (
        text.includes("2fa") ||
        text.includes("two factor")
    ) {
        return "Two-Factor Authentication adds an extra security step to your login. Enable it on your important accounts.";
    }

    else {
        return "Sorry, I don't have that answer yet. You can ask me about Phishing, Password Security, Malware, OTP, Online Fraud or Privacy.";
    }
}


// SEND MESSAGE USING ENTER KEY

document.getElementById("userInput")
.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});