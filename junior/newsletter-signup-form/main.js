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
  signupForm.style.display = showSuccess ? "none" : "block";
  successMessage.style.display = showSuccess ? "flex" : "none";
};

// Submit the form
const handleSubmit = (e) => {
  e.preventDefault();
  const isValid = validateEmail(email.value.trim());

  emailError.textContent = isValid ? "" : "Valid email required";

  email.classList.toggle("input-error", !isValid);
  email.classList.toggle("input", isValid);

  if (!isValid) return;

  document.getElementById("user-email").textContent = email.value;
  toggleViews(true);
};

// Attach the submit event to the form
document.getElementById("form").addEventListener("submit", handleSubmit);

// Close the message
document.getElementById("dismiss-button").addEventListener("click", (e) => {
  e.preventDefault();
  email.value = "";
  toggleViews(false);
});
