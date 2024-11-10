import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Button from "../components/common/Button";

describe("Button Component", () => {
  it("to를 프롭스로 받으면 링크 태그 되는지", () => {
    render(
      <MemoryRouter>
        <Button to="/test">Link Button</Button>
      </MemoryRouter>
    );

    const linkElement = screen.getByRole("link", { name: /Link Button/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/test");
  });

  it("to 없으면 버튼인지", () => {
    render(<Button>Button</Button>);

    const buttonElement = screen.getByRole("button", { name: /Button/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
