export function getMessageError({ msg, code, error, status, body, method }) {
  if (error && error.toString() === "TypeError: Failed to fetch") {
    return {
      message: `Error. Servicio no encontrado ${method}, código 404`,
      requestCode: 404,
      requestMessage: "Not found",
    };
  }

  if (status === 404) {
    return {
      message: `${msg}, código ${code}`,
      backCodeError: code,
      requestCode: status,
    };
  }

  if (status === 500) {
    return {
      message: `Error de servicio ${method}, código ${code}`,
      backCodeError: code,
      requestCode: status,
      requestMessage: msg || "No especificado",
      requestBody: body,
    };
  }

  return {
    message: error?.msg_fail?.split("}: ")[1] || error,
    messageComplete: error?.msg_fail || error,
    backCodeError: code,
    requestCode: status,
    requestMessage: msg || "No especificado",
    requestBody: body,
  };
}
