// Dynamic Password Toggle Function with Icons
export default function togglePassword(inputId, hiddenIconId, shownIconId) {
  const passwordInput = document.getElementById(inputId);
  const hiddenIcon = document.getElementById(hiddenIconId);
  const shownIcon = document.getElementById(shownIconId);

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    hiddenIcon.classList.add("hidden");
    shownIcon.classList.remove("hidden");
  } else {
    passwordInput.type = "password";
    hiddenIcon.classList.remove("hidden");
    shownIcon.classList.add("hidden");
  }
}
