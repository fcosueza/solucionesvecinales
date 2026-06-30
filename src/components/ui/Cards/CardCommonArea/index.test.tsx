import { fireEvent, render, screen } from "@testing-library/react";
import { formatTimeLabel } from "@/lib/dateFormatting";
import CardCommonArea from ".";

describe("CardCommonArea component test suite", () => {
  const name = "Piscina Comunitaria";
  const description = "Zona de piscina disponible para todos los vecinos";
  const startTime = new Date("2024-01-01T09:00:00");
  const endTime = new Date("2024-01-01T21:00:00");
  const imageUrl = "/assets/images/pool.jpg";

  it("should render the component correctly", () => {
    render(
      <CardCommonArea
        name={name}
        description={description}
        startTime={startTime}
        endTime={endTime}
        imageUrl={imageUrl}
      />
    );

    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("should render the image with the correct alt text", () => {
    render(
      <CardCommonArea
        name={name}
        description={description}
        startTime={startTime}
        endTime={endTime}
        imageUrl={imageUrl}
      />
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt", `Imagen de la zona ${name}`);
  });

  it("should render the common area name", () => {
    render(
      <CardCommonArea
        name={name}
        description={description}
        startTime={startTime}
        endTime={endTime}
        imageUrl={imageUrl}
      />
    );

    expect(screen.getByRole("heading")).toHaveTextContent(name);
  });

  it("should render the common area description", () => {
    render(
      <CardCommonArea
        name={name}
        description={description}
        startTime={startTime}
        endTime={endTime}
        imageUrl={imageUrl}
      />
    );

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("should render the schedule with formatted start and end times", () => {
    render(
      <CardCommonArea
        name={name}
        description={description}
        startTime={startTime}
        endTime={endTime}
        imageUrl={imageUrl}
      />
    );

    const horaInicioFormateada = formatTimeLabel(startTime);

    const horaFinFormateada = formatTimeLabel(endTime);

    expect(screen.getByText(`Horario: ${horaInicioFormateada} - ${horaFinFormateada}`)).toBeInTheDocument();
  });

  it("should format times correctly when minutes are not zero", () => {
    const horaInicioConMinutos = new Date("2024-01-01T08:30:00");
    const horaFinConMinutos = new Date("2024-01-01T22:45:00");

    render(
      <CardCommonArea
        name={name}
        description={description}
        startTime={horaInicioConMinutos}
        endTime={horaFinConMinutos}
        imageUrl={imageUrl}
      />
    );

    const horaInicioFormateada = formatTimeLabel(horaInicioConMinutos);

    const horaFinFormateada = formatTimeLabel(horaFinConMinutos);

    expect(screen.getByText(`Horario: ${horaInicioFormateada} - ${horaFinFormateada}`)).toBeInTheDocument();
  });

  it("should render a reservation summary when provided", () => {
    render(
      <CardCommonArea
        name={name}
        description={description}
        startTime={startTime}
        endTime={endTime}
        imageUrl={imageUrl}
        reservationSummary="Sin reservas previstas en la próxima semana."
      />
    );

    expect(screen.getByText("Sin reservas previstas en la próxima semana.")).toBeInTheDocument();
  });

  it("should render the optional action when provided", () => {
    render(
      <CardCommonArea
        name={name}
        description={description}
        startTime={startTime}
        endTime={endTime}
        imageUrl={imageUrl}
        action={<button type="button">Reservar ahora</button>}
      />
    );

    expect(screen.getByRole("button", { name: "Reservar ahora" })).toBeInTheDocument();
  });

  it("should show and trigger delete when user is admin and callback exists", () => {
    const onDeleteRequest = jest.fn();

    render(
      <CardCommonArea
        name={name}
        description={description}
        startTime={startTime}
        endTime={endTime}
        imageUrl={imageUrl}
        isAdmin
        onDeleteRequest={onDeleteRequest}
      />
    );

    const deleteButton = screen.getByRole("button", { name: "Eliminar" });

    fireEvent.click(deleteButton);

    expect(onDeleteRequest).toHaveBeenCalledTimes(1);
  });

  it("should not show delete if callback is not provided", () => {
    render(
      <CardCommonArea
        name={name}
        description={description}
        startTime={startTime}
        endTime={endTime}
        imageUrl={imageUrl}
        isAdmin
      />
    );

    expect(screen.queryByRole("button", { name: "Eliminar" })).not.toBeInTheDocument();
  });
});
