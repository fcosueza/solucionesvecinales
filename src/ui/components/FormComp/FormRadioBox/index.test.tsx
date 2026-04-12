import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioBoxType } from "@/types";
import FormRadioBox from ".";

describe("Pruebas del componente FormRadioBox", () => {
  const textoLeyenda: string = "Testing Label";
  const nombre: string = "test";
  const tipoRadio = RadioBoxType.radio;
  const elementos = [
    {
      labelText: "Test1",
      radioAttr: {
        id: "test1",
        value: "test1",
        defaultChecked: true
      }
    },
    {
      labelText: "Test2",
      radioAttr: {
        id: "test2",
        value: "test2"
      }
    }
  ];

  it("Debe renderizar el control de formulario", () => {
    render(<FormRadioBox legend={textoLeyenda} name={nombre} elementList={elementos} type={tipoRadio} />);

    expect(screen.getByRole("form-control")).toBeInTheDocument();
  });

  it("Debe crear un fieldset para agrupar opciones", () => {
    render(<FormRadioBox legend={textoLeyenda} name={nombre} elementList={elementos} type={tipoRadio} />);

    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("Debe renderizar la leyenda con el texto correcto", () => {
    render(<FormRadioBox legend={textoLeyenda} name={nombre} elementList={elementos} type={tipoRadio} />);

    expect(screen.getByText(textoLeyenda)).toBeInTheDocument();
  });

  it("Debe renderizar campos del tipo indicado", () => {
    render(<FormRadioBox legend={textoLeyenda} name={nombre} elementList={elementos} type={tipoRadio} />);

    expect(screen.getAllByRole(tipoRadio)).toHaveLength(elementos.length);
  });

  it("Debe renderizar opciones con las etiquetas indicadas", () => {
    render(<FormRadioBox legend={textoLeyenda} name={nombre} elementList={elementos} type={tipoRadio} />);

    elementos.forEach(elemento => {
      expect(screen.getByLabelText(elemento.labelText)).toBeInTheDocument();
    });
  });

  it("Debe marcar por defecto la opcion indicada", () => {
    const elementoMarcado = "Test1";

    render(<FormRadioBox legend={textoLeyenda} name={nombre} elementList={elementos} type={tipoRadio} />);
    expect(screen.getByLabelText(elementoMarcado)).toBeChecked();
  });

  it("Debe marcar el elemento que selecciona el usuario", async () => {
    render(<FormRadioBox legend={textoLeyenda} name={nombre} elementList={elementos} type={tipoRadio} />);

    const elemento = screen.getByLabelText("Test2");

    await userEvent.click(elemento);

    expect(elemento).toBeChecked();
    expect(screen.getByLabelText("Test1")).not.toBeChecked();
  });

  it("Debe renderizar un mensaje de error si se envia uno", () => {
    render(
      <FormRadioBox legend={textoLeyenda} name={nombre} elementList={elementos} type={tipoRadio} errorMsg={"Error"} />
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
