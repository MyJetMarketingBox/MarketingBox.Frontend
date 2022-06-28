const ValidationText = {
  invalidInput: 'Invalid input',
  email: "Invalid email format",
  required: "This field is required",
  minLength1: "Min 1 symbols",
  minLength3: "Min 3 symbols",
  minLength8: "Min 8 symbols",
  maxLength5: "Max 5 symbols",
  maxLength50: "Max 50 symbols",
  maxLength75: "Max 75 symbols",
  maxLength255: "Max 255 symbols",
  matchPassword: "Must matching with new password",
  shortPassword: "The password is too short",
  longPassword: "The password is too long",
  passwordMask: "Please use min 1 letter, 1 number, 1 special symbol, 1 upper case letter",
};

Object.freeze(ValidationText);
export default ValidationText;
