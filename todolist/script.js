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
    showToast("Task status updated!", "fas fa-info-circle icon-info");
  }
  inputBox.value = "";
}
// toast
function showToast(message, iconClass) {
  const toastIcon = document.getElementById("toast-icon");
  const toastMessage = document.getElementById("toast-message");

  toastIcon.className = iconClass; // Set the icon class
  toastMessage.innerHTML = message; // Set the message

  const toast = document.getElementById("toast");
  toast.className = "toast show";

  // Hide the toast after 3 seconds
  setTimeout(function () {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

// click
listcontainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      showToast("Items selected!", "fas fa-check-circle icon-info()");
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      showToast(
        "Items removed successfully!",
        "fas fa-check-circle icon-success"
      );
    }
  },
  false
);
