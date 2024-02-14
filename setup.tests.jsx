import "@testing-library/jest-dom";
import { afterEach, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { cleanup } from "@testing-library/react";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

afterEach(() => {
  cleanup();
});
