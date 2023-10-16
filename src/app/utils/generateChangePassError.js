export function generateChangePassError(message) {
  switch (message) {
    case "INVALID_ID_TOKEN":
    case "CREDENTIAL_TOO_OLD_LOGIN_AGAIN":
      return "Вы давно в системе, зайдите заново для смены пароля.";
    default:
      return "Что-то пошло не так. Попробуйте позднее.";
  }
}
