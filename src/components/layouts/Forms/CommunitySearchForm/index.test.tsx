import { fireEvent, render, screen } from "@testing-library/react";
import CommunitySearchForm from ".";

describe("CommunitySearchForm component test suite", () => {
  it("Should render the search form with the default value", () => {
    render(<CommunitySearchForm defaultValue="granada" />);

    expect(screen.getByRole("search", { name: "community-search-form" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "community-search-input" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "community-search-input" })).toHaveValue("granada");
  });

  it("Should allow typing in the search input", () => {
    render(<CommunitySearchForm />);

    fireEvent.change(screen.getByRole("textbox", { name: "community-search-input" }), {
      target: { value: "arraya" }
    });

    expect(screen.getByRole("textbox", { name: "community-search-input" })).toHaveValue("arraya");
  });
});
