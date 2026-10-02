// uname-section
export const validateUsername = (username) => {
  if (!username) return "Username is required";
  if (username.length < 3) return "Username must be at least 3 characters";
  if (username.length > 20) return "Username cannot exceed 20 characters";
  return "";
};

// E-check
export const validateEmail = (email) => {
  if (!email) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Invalid email format";
  return "";
};

// Pass-check
export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return "";
};

// Fulln-check
export const validateFullName = (fullName) => {
  if (!fullName) return "Full Name is required";
  if (fullName.trim().length < 2) return "Full Name must be at least 2 characters";
  return "";
};