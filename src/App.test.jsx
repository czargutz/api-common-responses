import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  it("renders headline", () => {
    render(<App />);
    expect(screen.getByTestId("app_test_id")).toBeTruthy();
  });

  it("renders headline", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("request_action_test_id"));
  });
});
