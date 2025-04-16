const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
const MIN_LENGTH_PATTERN = /^.{8,}$/;
const NUMBER_PATTERN = /\d/;
const UPPERCASE_PATTERN = /[A-Z]/;

const ERROR_MESSAGES = {
  USERNAME_REQUIRED: "Please enter your username!",
  USERNAME_TOO_SHORT: "Username must be at least 3 characters!",
  EMAIL_REQUIRED: "Please enter your email address!",
  EMAIL_INVALID: "Please enter a valid email address!",
  PASSWORD_REQUIRED: "Please enter your password!",
  PASSWORD_INVALID: "Password does not meet requirements!",
  CONFIRM_PASSWORD_REQUIRED: "Please confirm your password!",
  CONFIRM_PASSWORD_MISMATCH: "Passwords do not match!",
};

export const getPasswordValidations = (password: string) => ({
  isCharValid: MIN_LENGTH_PATTERN.test(password),
  isNumValid: NUMBER_PATTERN.test(password),
  isCapitalValid: UPPERCASE_PATTERN.test(password),
});

export const validateSignUp = (data: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const { username, email, password, confirmPassword } = data;
  const errors: { [key: string]: string } = {};
  let isValid = true;

  if (!username) {
    errors.username = ERROR_MESSAGES.USERNAME_REQUIRED;
    isValid = false;
  } else if (username.length < 3) {
    errors.username = ERROR_MESSAGES.USERNAME_TOO_SHORT;
    isValid = false;
  }

  if (!email) {
    errors.email = ERROR_MESSAGES.EMAIL_REQUIRED;
    isValid = false;
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = ERROR_MESSAGES.EMAIL_INVALID;
    isValid = false;
  }

  if (!password) {
    errors.password = ERROR_MESSAGES.PASSWORD_REQUIRED;
    isValid = false;
  } else if (!PASSWORD_PATTERN.test(password)) {
    errors.password = ERROR_MESSAGES.PASSWORD_INVALID;
    isValid = false;
  }

  if (!confirmPassword) {
    errors.confirmPassword = ERROR_MESSAGES.CONFIRM_PASSWORD_REQUIRED;
    isValid = false;
  } else if (confirmPassword !== password) {
    errors.confirmPassword = ERROR_MESSAGES.CONFIRM_PASSWORD_MISMATCH;
    isValid = false;
  }

  return { isValid, errors };
};

export const validateSignIn = (data: {
  username: string;
  password: string;
}) => {
  const { username, password } = data;
  const errors: { [key: string]: string } = {};
  let isValid = true;

  if (!username) {
    errors.username = ERROR_MESSAGES.USERNAME_REQUIRED;
    isValid = false;
  }

  if (!password) {
    errors.password = ERROR_MESSAGES.PASSWORD_REQUIRED;
    isValid = false;
  }

  return { isValid, errors };
};
