import { render } from "@testing-library/react";
import ScrollToTopOnMount from ".";

describe("ScrollToTopOnMount component test suite", () => {
  let scrollToSpy: jest.SpyInstance;

  beforeEach(() => {
    scrollToSpy = jest.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  afterEach(() => {
    scrollToSpy.mockRestore();
  });

  it("Should return null and not render any element in the DOM", () => {
    const { container } = render(<ScrollToTopOnMount />);

    expect(container).toBeEmptyDOMElement();
  });

  it("Should call window.scrollTo on mount", () => {
    render(<ScrollToTopOnMount />);

    expect(scrollToSpy).toHaveBeenCalledTimes(1);
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
  });

  it("Should not call window.scrollTo more than once on mount", () => {
    const { rerender } = render(<ScrollToTopOnMount />);

    expect(scrollToSpy).toHaveBeenCalledTimes(1);

    rerender(<ScrollToTopOnMount />);

    expect(scrollToSpy).toHaveBeenCalledTimes(1);
  });
});
