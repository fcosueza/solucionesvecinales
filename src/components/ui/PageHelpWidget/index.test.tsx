import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PageHelpWidget from ".";

describe("PageHelpWidget component test suite", () => {
  const content = {
    title: "Gestionar reservas",
    summary: "Aquí puedes consultar y crear reservas para las zonas comunes.",
    steps: ["Selecciona la fecha de la reserva.", "Elige la hora de inicio disponible.", "Confirma la reserva."],
    constraints: ["Solo una reserva activa por usuario.", "Duración máxima de 2 horas."]
  };

  it("should render only the help trigger while the modal is closed", () => {
    render(<PageHelpWidget content={content} />);

    expect(screen.getByRole("button", { name: "Abrir ayuda de la página" })).toBeInTheDocument();
    expect(screen.queryByRole("dialog", { name: "Ayuda de la página" })).not.toBeInTheDocument();
  });

  it("should open the modal and render help content when the trigger is clicked", async () => {
    const user = userEvent.setup();

    render(<PageHelpWidget content={content} />);

    await user.click(screen.getByRole("button", { name: "Abrir ayuda de la página" }));

    const dialog = screen.getByRole("dialog", { name: "Ayuda de la página" });
    expect(dialog).toBeInTheDocument();

    const modalContent = within(dialog);
    expect(modalContent.getByRole("heading", { level: 2, name: content.title })).toBeInTheDocument();
    expect(modalContent.getByText(content.summary)).toBeInTheDocument();
    expect(modalContent.getByRole("heading", { level: 3, name: "Paso a paso" })).toBeInTheDocument();
    expect(modalContent.getByRole("heading", { level: 3, name: "Restricciones" })).toBeInTheDocument();

    content.steps.forEach(step => {
      expect(modalContent.getByText(step)).toBeInTheDocument();
    });

    content.constraints.forEach(constraint => {
      expect(modalContent.getByText(constraint)).toBeInTheDocument();
    });

    expect(modalContent.getAllByRole("listitem")).toHaveLength(content.steps.length + content.constraints.length);
  });

  it("should close the modal when the close button is clicked", async () => {
    const user = userEvent.setup();

    render(<PageHelpWidget content={content} />);

    await user.click(screen.getByRole("button", { name: "Abrir ayuda de la página" }));
    expect(screen.getByRole("dialog", { name: "Ayuda de la página" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Cerrar" }));

    expect(screen.queryByRole("dialog", { name: "Ayuda de la página" })).not.toBeInTheDocument();
  });
});
