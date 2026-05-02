import { render, screen } from "@testing-library/react";
import CardCommunity from ".";

describe("Suite de pruebas del componente CardCommunity", () => {
  const urlImagen = "/assets/images/community.jpg";
  const textoAlternativo = "Imagen de la comunidad";
  const nombreComunidad = "Comunidad Las Flores";
  const direccionComunidad = "Calle Mayor, 10, Madrid";

  it("Debe renderizar la tarjeta de comunidad correctamente", () => {
    render(
      <CardCommunity
        imageURL={urlImagen}
        imageAltText={textoAlternativo}
        communityName={nombreComunidad}
        communityAddress={direccionComunidad}
      />
    );

    expect(screen.getByRole("card")).toBeInTheDocument();
  });

  it("Debe renderizar la imagen con el texto alternativo indicado", () => {
    render(
      <CardCommunity
        imageURL={urlImagen}
        imageAltText={textoAlternativo}
        communityName={nombreComunidad}
        communityAddress={direccionComunidad}
      />
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt", textoAlternativo);
  });

  it("Debe renderizar el nombre de la comunidad", () => {
    render(
      <CardCommunity
        imageURL={urlImagen}
        imageAltText={textoAlternativo}
        communityName={nombreComunidad}
        communityAddress={direccionComunidad}
      />
    );

    expect(screen.getByRole("heading")).toHaveTextContent(nombreComunidad);
  });

  it("Debe renderizar la dirección de la comunidad", () => {
    render(
      <CardCommunity
        imageURL={urlImagen}
        imageAltText={textoAlternativo}
        communityName={nombreComunidad}
        communityAddress={direccionComunidad}
      />
    );

    expect(screen.getByText(direccionComunidad)).toBeInTheDocument();
  });

  it("Debe renderizar el texto del botón CTA por defecto", () => {
    render(
      <CardCommunity
        imageURL={urlImagen}
        imageAltText={textoAlternativo}
        communityName={nombreComunidad}
        communityAddress={direccionComunidad}
      />
    );

    expect(screen.getByRole("button")).toHaveTextContent("Ver Comunidad");
  });

  it("Debe renderizar el texto del botón CTA personalizado", () => {
    const textoCTA = "Unirse a la Comunidad";

    render(
      <CardCommunity
        imageURL={urlImagen}
        imageAltText={textoAlternativo}
        communityName={nombreComunidad}
        communityAddress={direccionComunidad}
        ctaText={textoCTA}
      />
    );

    expect(screen.getByRole("button")).toHaveTextContent(textoCTA);
  });

  it("Debe renderizar el botón CTA habilitado por defecto", () => {
    render(
      <CardCommunity
        imageURL={urlImagen}
        imageAltText={textoAlternativo}
        communityName={nombreComunidad}
        communityAddress={direccionComunidad}
      />
    );

    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("Debe renderizar el botón CTA deshabilitado si se indica", () => {
    render(
      <CardCommunity
        imageURL={urlImagen}
        imageAltText={textoAlternativo}
        communityName={nombreComunidad}
        communityAddress={direccionComunidad}
        ctaDisabled={true}
      />
    );

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("Debe renderizar el botón CTA con tipo 'button' por defecto", () => {
    render(
      <CardCommunity
        imageURL={urlImagen}
        imageAltText={textoAlternativo}
        communityName={nombreComunidad}
        communityAddress={direccionComunidad}
      />
    );

    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("Debe renderizar el botón CTA con tipo 'submit' si se indica", () => {
    render(
      <CardCommunity
        imageURL={urlImagen}
        imageAltText={textoAlternativo}
        communityName={nombreComunidad}
        communityAddress={direccionComunidad}
        ctaButtonType="submit"
      />
    );

    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("Debe asociar el botón CTA al formulario indicado", () => {
    const idFormulario = "formulario-comunidad";

    render(
      <CardCommunity
        imageURL={urlImagen}
        imageAltText={textoAlternativo}
        communityName={nombreComunidad}
        communityAddress={direccionComunidad}
        ctaFormID={idFormulario}
      />
    );

    expect(screen.getByRole("button")).toHaveAttribute("form", idFormulario);
  });

  it("Debe aplicar la clase CSS adicional indicada", () => {
    const claseAdicional = "clase-personalizada";

    render(
      <CardCommunity
        imageURL={urlImagen}
        imageAltText={textoAlternativo}
        communityName={nombreComunidad}
        communityAddress={direccionComunidad}
        className={claseAdicional}
      />
    );

    expect(screen.getByRole("card")).toHaveClass(claseAdicional);
  });
});
