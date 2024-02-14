import { getMessageError } from "./utils";

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
