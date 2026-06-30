import { render, screen } from "@testing-library/react";
import Table from ".";

describe("Table component test suite", () => {
  const headers = ["Name", "City"];

  it("Should render the provided headers", () => {
    render(<Table headers={headers} rows={[]} />);

    expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "City" })).toBeInTheDocument();
  });

  it("Should render rows with the provided data", () => {
    render(
      <Table
        headers={headers}
        rows={[
          { key: 1, cells: ["Central Community", "Madrid"] },
          { key: 2, cells: ["North Community", "Bilbao"] }
        ]}
      />
    );

    expect(screen.getByText("Central Community")).toBeInTheDocument();
    expect(screen.getByText("Madrid")).toBeInTheDocument();
    expect(screen.getByText("North Community")).toBeInTheDocument();
    expect(screen.getByText("Bilbao")).toBeInTheDocument();
  });

  it("Should render rows even when an explicit key is not provided", () => {
    render(
      <Table
        headers={headers}
        rows={[{ cells: ["South Community", "Sevilla"] }, { cells: ["East Community", "Valencia"] }]}
      />
    );

    expect(screen.getByText("South Community")).toBeInTheDocument();
    expect(screen.getByText("Sevilla")).toBeInTheDocument();
    expect(screen.getByText("East Community")).toBeInTheDocument();
    expect(screen.getByText("Valencia")).toBeInTheDocument();
  });

  it("Should render the custom empty message when there is no data", () => {
    render(<Table headers={headers} rows={[]} emptyMessage="No results found" />);

    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("Should apply the balanceRow class to rows with balance variant", () => {
    render(
      <Table
        headers={["Concept", "Amount"]}
        rows={[{ key: "balance", variant: "balance", cells: ["Final balance", "500,00 €"] }]}
      />
    );

    expect(screen.getByText("Final balance")).toBeInTheDocument();
    expect(screen.getByText("500,00 €")).toBeInTheDocument();
  });

  it("Should render special rows with colSpan for sections and totals", () => {
    render(
      <Table
        headers={["Concept", "Date", "Amount"]}
        rows={[
          {
            key: "section",
            variant: "section",
            cells: [{ content: "Payments", colSpan: 3 }]
          },
          {
            key: "total",
            variant: "summary",
            cells: [{ content: "TOTAL", colSpan: 2 }, { content: "100,00 €" }]
          }
        ]}
      />
    );

    expect(screen.getByText("Payments")).toBeInTheDocument();
    expect(screen.getByText("TOTAL")).toBeInTheDocument();
    expect(screen.getByText("100,00 €")).toBeInTheDocument();
  });
});
