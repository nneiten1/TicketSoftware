console.log("js was loaded")

const ticketBtn = document.getElementById("button1");
const backBtn = document.getElementById("backBtn");

if (ticketBtn) {
    ticketBtn.addEventListener("click", () => {
        console.log("Button was clicked");
        window.location.href = "ticketOverview.html";
    });
}

if (backBtn) {
    backBtn.addEventListener("click", () => {
        console.log("back btn was clicked")
        window.history.back();
    })
}


// dropdown for nav bar
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}


// collapse side nav
const collapseBtn = document.getElementById("collapseSideBtn");
const sideNav = document.getElementById("mySideNav");

collapseBtn.addEventListener("click", () => {
    sideNav.classList.toggle("collapsed");

    const dropDownContents = document.querySelectorAll(".dropdown-content");
    dropDownContents.forEach(content => {
      content.style.display = "none"
    });

    const dropDownBtn = document.querySelectorAll(".dropdown-btn");
    dropDownBtn.forEach(btn => {
      btn.classList.remove("active");
    });
});