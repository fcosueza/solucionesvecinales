import { render, screen, waitFor } from "@testing-library/react";
import { useRouter as enrutadorMock } from "next/navigation";
import userEvent from "@testing-library/user-event";
import CTA from ".";

// Simula el módulo useRouter.
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn()
}));

// Agrega el método push al mock de useRouter.
(enrutadorMock as jest.Mock).mockReturnValue({
  push: jest.fn()
});

describe("Suite de pruebas del componente CTA", () => {
  const titulo = "Test CTA Title";
  const parrafo = "Lorem ipsum dolor site amet consecterum";
  const textoBoton = "TestButton";

  it("Debe renderizar el título del CTA correctamente", () => {
    render(<CTA title={titulo} para={parrafo} buttonText={textoBoton} />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByText(titulo)).toBeInTheDocument();
  });

  it("Debe renderizar el párrafo del CTA correctamente", () => {
    render(<CTA title={titulo} para={parrafo} buttonText={textoBoton} />);

    expect(screen.getByText(parrafo)).toBeInTheDocument();
    expect(screen.getByText(parrafo)).toBeInTheDocument();
  });

  it("Debe renderizar el botón del CTA correctamente", () => {
    render(<CTA title={titulo} para={parrafo} buttonText={textoBoton} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Debe resaltar el fragmento indicado del título cuando highlightText coincide", () => {
    const tituloConResaltado = "Tu comunidad conectada y organizada";
    const textoResaltado = "conectada";

    render(
      <CTA
        title={tituloConResaltado}
        highlightText={textoResaltado}
        para={parrafo}
        buttonText={textoBoton}
      />
    );

    const heading = screen.getByRole("heading", { level: 1 });
    const highlightedText = screen.getByText(textoResaltado);

    expect(heading).toHaveTextContent(tituloConResaltado);
    expect(highlightedText.tagName).toBe("SPAN");
  });

  it("No debe llamar al router si no se hace click en el botón", async () => {
    const enrutador = enrutadorMock();

    render(<CTA title={titulo} para={parrafo} buttonText={textoBoton} />);

    await waitFor(() => expect(enrutador.push).not.toHaveBeenCalled());
  });

  it("Debe llamar al router cuando se hace click en el botón", async () => {
    const enrutador = enrutadorMock();

    render(<CTA title={titulo} para={parrafo} buttonText={textoBoton} />);

    await userEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(enrutador.push).toHaveBeenCalled());
  });
});
