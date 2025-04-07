document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const userEmail = urlParams.get("email");
    
    if (userEmail) {
        document.getElementById("email").value = userEmail;
    }

    document.getElementById("user-form").addEventListener("submit", function (event) {
        event.preventDefault();
        submitToGoogleSheets();
    });
});

function submitToGoogleSheets() {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value; // Read-only field

    fetch("YOUR_GOOGLE_APPS_SCRIPT_URL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, address })
    })
    .then(response => response.text())
    .then(data => {
        alert("Data submitted successfully!");
        window.location.href = "success.html"; // Redirect to a success page
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to submit data.");
    });
}
