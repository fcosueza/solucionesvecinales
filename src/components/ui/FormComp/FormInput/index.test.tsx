import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputType, FormInputAttrs } from "@/types";
import FormInput from ".";

describe("Suite de pruebas del componente FormInput", () => {
  const textoEtiqueta: string = "Testing Label";
  const tipoInput = InputType.text;
  const atributos: FormInputAttrs = {
    id: "TestID",
    type: InputType.text
  };

  it("Debe renderizar por defecto una etiqueta y un campo", () => {
    render(<FormInput labelText={textoEtiqueta} attr={atributos} />);

    expect(screen.getByLabelText(textoEtiqueta)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
  it("Debe renderizar la etiqueta con el texto correcto", () => {
    render(<FormInput labelText={textoEtiqueta} attr={atributos} />);
    expect(screen.getByLabelText(textoEtiqueta)).toBeInTheDocument();
  });

  it("Debe renderizar el campo con los atributos correctos", () => {
    render(<FormInput labelText={textoEtiqueta} attr={atributos} />);

    const campoTexto = screen.getByRole("textbox");

    expect(campoTexto).toHaveProperty("id", atributos.id);
    expect(campoTexto).toHaveProperty("type", tipoInput);
  });

  it("Debe renderizar el campo con el nombre indicado", () => {
    const nombre = "TestName";
    atributos.name = nombre;

    render(<FormInput labelText={textoEtiqueta} attr={atributos} />);

    expect(screen.getByRole("textbox")).toHaveProperty("name", nombre);
  });

  it("Debe renderizar un textarea con un número de filas por defecto", () => {
    const filasPredeterminadas = 5;
    atributos.type = InputType.textarea;

    render(<FormInput labelText={textoEtiqueta} attr={atributos} />);
    expect(screen.getByRole("textbox")).toHaveProperty("rows", filasPredeterminadas);
  });

  it("Debe renderizar un textarea con las filas indicadas", () => {
    const filas = 10;
    atributos.type = InputType.textarea;

    render(<FormInput labelText={textoEtiqueta} attr={atributos} rows={filas} />);
    expect(screen.getByRole("textbox")).toHaveProperty("rows", filas);
  });

  it("Debe mostrar en el campo lo que escribe el usuario", async () => {
    render(<FormInput labelText={textoEtiqueta} attr={atributos} />);

    const entradaUsuario = "testname";
    const campoNombre = screen.getByRole("textbox");

    await userEvent.type(campoNombre, entradaUsuario);

    expect(campoNombre).toHaveValue(entradaUsuario);
  });

  it("Debe mostrar en el campo el valor indicado", async () => {
    const valor = "Ipp";
    atributos.defaultValue = valor;

    render(<FormInput labelText={textoEtiqueta} attr={atributos} />);

    expect(screen.getByRole("textbox")).toHaveValue(valor);
  });

  it("Debe mostrar un mensaje de error cuando se le proporciona", async () => {
    const mensajeError = "testerror";

    render(<FormInput labelText={textoEtiqueta} attr={atributos} errorMsg={mensajeError} />);

    const elementoError = screen.getByRole("alert");

    expect(elementoError).toBeInTheDocument();
    expect(elementoError).toHaveTextContent(mensajeError);
  });
});
