import { describe, it, expect, beforeEach } from "vitest";

import request from "./request";

describe("request", () => {
  const urlTest = "https://jsonplaceholder.typicode.com/todos/1";

  beforeEach(() => {
    fetch.resetMocks();
  });

  it("Should be return a correct status 200", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ data: null, code: 200, msg: null }),
      {
        status: 200,
      }
    );

    const response = await request(urlTest, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const responseExpected = {
      data: {
        code: 200,
        data: null,
        msg: null,
      },
      notifications: {
        requestCode: 200,
      },
    };
    expect(response).toEqual(responseExpected);
  });

  it("Should be return a status 204", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ data: null, code: 204, msg: null }),
      {
        status: 204,
      }
    );

    const response = await request(urlTest, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const responseExpected = {
      data: null,
      notifications: {
        backCodeError: null,
        requestCode: 204,
        message: "No hay contenido",
      },
    };
    expect(response).toEqual(responseExpected);
  });

  it("Should be return a status 404", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ data: null, code: 404, msg: null }),
      {
        status: 404,
      }
    );

    const response = await request(urlTest, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const responseExpected = {
      data: null,
      notifications: {
        backCodeError: 404,
        requestCode: 404,
        message: "null, código 404",
      },
    };
    expect(response).toEqual(responseExpected);
  });

  it("Should be return a status 500", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ data: null, code: 500, msg: null }),
      {
        status: 500,
      }
    );

    const response = await request(urlTest, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const responseExpected = {
      data: null,
      notifications: {
        backCodeError: 500,
        requestCode: 500,
        requestMessage: "No especificado",
        message: "Error de servicio GET, código 500",
      },
    };
    expect(response).toEqual(responseExpected);
  });
});
