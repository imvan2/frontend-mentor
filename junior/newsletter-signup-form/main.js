// Cache DOM elements
const signupForm = document.getElementById("signup-form");
const successMessage = document.getElementById("success-message");
const emailError = document.getElementById("email-error");
const email = document.getElementById("email");

// Validate the email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validateEmail = (email) => emailRegex.test(email);

// Toggle visibility
const toggleViews = (showSuccess) => {
  signupForm.style.display = showSuccess ? "none" : "flex";
  successMessage.style.display = showSuccess ? "flex" : "none";
};

// Submit the form
const handleSubmit = (e) => {
  e.preventDefault();
  const isValid = validateEmail(email.value.trim());

  emailError.style.display = isValid ? "none" : "block";

  email.classList.toggle("input-error", !isValid);
  email.classList.toggle("input", isValid);

  if (!isValid) return;

  document.getElementById("user-email").textContent = email.value;
  toggleViews(true);
};

// Attach the submit event to the form
document.getElementById("form").addEventListener("submit", handleSubmit);

// Remove error state when a user begins typing again
email.addEventListener("keydown", (e) => {
  emailError.style.display = "none";
  email.classList.toggle("input-error", false);
  email.classList.toggle("input", true);
});

// Close the message
document.getElementById("dismiss-button").addEventListener("click", (e) => {
  e.preventDefault();
  email.value = "";
  toggleViews(false);
});
