import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Toast from "../components/common/Toast";
import { ToastType } from "../types/toast.type";

describe("Toast Component", () => {
  it("처음에 잘 보이는지 테스트", () => {
    const toast: ToastType = { label: "Initial Visibility Test" };

    render(<Toast toast={toast} />);

    const toastElement = screen.getByText("Initial Visibility Test");
    expect(toastElement).toHaveClass("opacity-100");
  });
  it("800ms 후 opacity-0 클래스를 가지는지 테스트", async () => {
    const toast: ToastType = { label: "Disappear Test" };
    render(<Toast toast={toast} />);

    await waitFor(
      () => {
        const toastElement = screen.getByText("Disappear Test");
        expect(toastElement).toHaveClass("opacity-0");
      },
      { timeout: 1300 }
    );
  });
});
