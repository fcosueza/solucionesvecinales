import { render, screen } from "@testing-library/react";
import CardCommonArea from ".";

describe("Suite de pruebas del componente CardCommonArea", () => {
  const nombre = "Piscina Comunitaria";
  const descripcion = "Zona de piscina disponible para todos los vecinos";
  const horaInicio = new Date("2024-01-01T09:00:00");
  const horaFin = new Date("2024-01-01T21:00:00");
  const imageUrl = "/assets/images/pool.jpg";

  it("Debe renderizar el componente correctamente", () => {
    render(
      <CardCommonArea
        nombre={nombre}
        descripcion={descripcion}
        horaInicio={horaInicio}
        horaFin={horaFin}
        imageUrl={imageUrl}
      />
    );

    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("Debe renderizar la imagen con el texto alternativo correcto", () => {
    render(
      <CardCommonArea
        nombre={nombre}
        descripcion={descripcion}
        horaInicio={horaInicio}
        horaFin={horaFin}
        imageUrl={imageUrl}
      />
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt", `Imagen de la zona ${nombre}`);
  });

  it("Debe renderizar el nombre de la zona común", () => {
    render(
      <CardCommonArea
        nombre={nombre}
        descripcion={descripcion}
        horaInicio={horaInicio}
        horaFin={horaFin}
        imageUrl={imageUrl}
      />
    );

    expect(screen.getByRole("heading")).toHaveTextContent(nombre);
  });

  it("Debe renderizar la descripción de la zona común", () => {
    render(
      <CardCommonArea
        nombre={nombre}
        descripcion={descripcion}
        horaInicio={horaInicio}
        horaFin={horaFin}
        imageUrl={imageUrl}
      />
    );

    expect(screen.getByText(descripcion)).toBeInTheDocument();
  });

  it("Debe renderizar el horario con las horas de inicio y fin formateadas", () => {
    render(
      <CardCommonArea
        nombre={nombre}
        descripcion={descripcion}
        horaInicio={horaInicio}
        horaFin={horaFin}
        imageUrl={imageUrl}
      />
    );

    const horaInicioFormateada = new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(horaInicio);

    const horaFinFormateada = new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(horaFin);

    expect(screen.getByText(`Horario: ${horaInicioFormateada} - ${horaFinFormateada}`)).toBeInTheDocument();
  });

  it("Debe formatear correctamente horas con minutos distintos de cero", () => {
    const horaInicioConMinutos = new Date("2024-01-01T08:30:00");
    const horaFinConMinutos = new Date("2024-01-01T22:45:00");

    render(
      <CardCommonArea
        nombre={nombre}
        descripcion={descripcion}
        horaInicio={horaInicioConMinutos}
        horaFin={horaFinConMinutos}
        imageUrl={imageUrl}
      />
    );

    const horaInicioFormateada = new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(horaInicioConMinutos);

    const horaFinFormateada = new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(horaFinConMinutos);

    expect(screen.getByText(`Horario: ${horaInicioFormateada} - ${horaFinFormateada}`)).toBeInTheDocument();
  });
});
