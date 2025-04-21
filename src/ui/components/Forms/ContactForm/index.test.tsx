import { render, screen } from "@testing-library/react";
import ContactForm from ".";

describe("Test para el componente ContactForm", () => {
  it("Debe renderizar el formulario de forma correcta.", () => {
    render(<ContactForm />);
  });
});
