// errorCodes.js
export const ErrorCodes = {
  // Ogólne błędy walidacji
  ValidationError: "VALIDATION_ERROR",

  // Rejestracja
  PasswordsMisMatch: "PASSWORDS_MISMATCH",
  UserAlreadyExists: "USER_ALREADY_EXISTS",

  // Logowanie
  InvalidCredentials: "INVALID_CREDENTIALS",
  AccountNotActivated: "ACCOUNT_NOT_ACTIVATED",
  UserNotFound: "USER_NOT_FOUND",

  // Błąd serwera
  InternalServerError: "INTERNAL_SERVER_ERROR",

  // Aktywacja konta tokenem:
  MissingToken: "MISSING_TOKEN",
  InvalidToken: "INVALID_TOKEN",
  UserAlreadyActive: "USER_ALREADY_ACTIVE",
  

  // Dodaj więcej kodów błędów w miarę potrzeb

};

export default ErrorCodes;
