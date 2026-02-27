console.log("js was loaded")

const ticketBtn = document.getElementById("button1");
const backBtn = document.getElementById("backBtn");

if (ticketBtn) {
    ticketBtn.addEventListener("click", () => {
        console.log("Button was clicked");
        window.location.href = "submitTicket.html";
    });
}

if (backBtn) {
    backBtn.addEventListener("click", () => {
        console.log("back btn was clicked")
        window.history.back();
    })
}

