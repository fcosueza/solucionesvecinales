import { fireEvent, render, screen } from "@testing-library/react";
import CommunitySearchForm from ".";

describe("Suite de pruebas del componente CommunitySearchForm", () => {
  it("Debe renderizar el formulario de busqueda y el valor inicial", () => {
    render(<CommunitySearchForm defaultValue="granada" />);

    expect(screen.getByRole("search", { name: "community-search-form" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "community-search-input" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "community-search-input" })).toHaveValue("granada");
  });

  it("Debe permitir escribir en el campo de busqueda", () => {
    render(<CommunitySearchForm />);

    fireEvent.change(screen.getByRole("textbox", { name: "community-search-input" }), {
      target: { value: "arraya" }
    });

    expect(screen.getByRole("textbox", { name: "community-search-input" })).toHaveValue("arraya");
  });
});
