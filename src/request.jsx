function getMessageError({ msg, code, error, status, body, method }) {
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

export default async function request(url, options) {
  let accessToken = {};
  let idToken = {};

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(options.withAuth && {
        Authorization: `Bearer ${accessToken.jwtToken}`,
        IDToken: idToken.jwtToken,
      }),
    },
  })
    .then(async (response) => {
      if (response.status === 204) {
        return {
          data: null,
          notifications: {
            message: "No hay contenido",
            backCodeError: null,
            requestCode: response.status,
          },
        };
      }
      if (response.status !== 200 && response.status !== 201) {
        const { msg, code, error } = await response.json();
        throw new Error(
          JSON.stringify({
            data: null,
            notifications: getMessageError({
              msg,
              code,
              error,
              status: response.status,
              body: options.body,
              method: options.method,
            }),
          })
        );
      }

      const status = response.status;
      const data = await response.json();

      return {
        data,
        notifications: {
          requestCode: status,
        },
      };
    })
    .catch((error) => {
      if (error && error.toString() && error.toString().includes("Error: {")) {
        return JSON.parse(error.toString().replace("Error: ", ""));
      }
      return {
        data: null,
        notifications: getMessageError({ error, method: options.method }),
      };
    });
}

request.defaultProps = {
  options: {},
};
