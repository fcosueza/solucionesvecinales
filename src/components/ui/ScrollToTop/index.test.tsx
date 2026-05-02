import { render } from "@testing-library/react";
import ScrollToTopOnMount from ".";

describe("Suite de pruebas del componente ScrollToTopOnMount", () => {
  let scrollToSpy: jest.SpyInstance;

  beforeEach(() => {
    scrollToSpy = jest.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  afterEach(() => {
    scrollToSpy.mockRestore();
  });

  it("Debe retornar null y no renderizar ningún elemento en el DOM", () => {
    const { container } = render(<ScrollToTopOnMount />);

    expect(container).toBeEmptyDOMElement();
  });

  it("Debe llamar a window.scrollTo al montarse", () => {
    render(<ScrollToTopOnMount />);

    expect(scrollToSpy).toHaveBeenCalledTimes(1);
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
  });

  it("No debe llamar a window.scrollTo más de una vez al montarse", () => {
    const { rerender } = render(<ScrollToTopOnMount />);

    expect(scrollToSpy).toHaveBeenCalledTimes(1);

    rerender(<ScrollToTopOnMount />);

    expect(scrollToSpy).toHaveBeenCalledTimes(1);
  });
});
