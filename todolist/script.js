const inputBox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");
// Function to display the pop-up
function showPopup() {
  const overlay = document.getElementById("popup-overlay");
  overlay.style.display = "flex"; // Show the pop-up
}

// Function to close the pop-up
function closePopup() {
  const overlay = document.getElementById("popup-overlay");
  overlay.style.display = "none"; // Hide the pop-up
}

// Event listener for the "Show Pop-up" button
document.getElementById("show-popup-btn").addEventListener("click", showPopup);

// Event listener for the "Close" button
document.getElementById("close-btn").addEventListener("click", closePopup);

function addTask() {
  if (inputBox.value === "") {
    showPopup();
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listcontainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
}

listcontainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
    }
  },
  false
);
