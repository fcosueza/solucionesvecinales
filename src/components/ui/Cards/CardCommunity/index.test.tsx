import { render, screen } from "@testing-library/react";
import CardCommunity from ".";

describe("CardCommunity component test suite", () => {
  const imageURL = "/assets/images/community.jpg";
  const altText = "Imagen de la comunidad";
  const communityName = "Comunidad Las Flores";
  const communityAddress = "Calle Mayor, 10, Madrid";

  it("should render the community card correctly", () => {
    render(
      <CardCommunity
        imageURL={imageURL}
        imageAltText={altText}
        communityName={communityName}
        communityAddress={communityAddress}
      />
    );

    expect(screen.getByRole("card")).toBeInTheDocument();
  });

  it("should render the image with the provided alt text", () => {
    render(
      <CardCommunity
        imageURL={imageURL}
        imageAltText={altText}
        communityName={communityName}
        communityAddress={communityAddress}
      />
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt", altText);
  });

  it("should render the community name", () => {
    render(
      <CardCommunity
        imageURL={imageURL}
        imageAltText={altText}
        communityName={communityName}
        communityAddress={communityAddress}
      />
    );

    expect(screen.getByRole("heading")).toHaveTextContent(communityName);
  });

  it("should render the community address", () => {
    render(
      <CardCommunity
        imageURL={imageURL}
        imageAltText={altText}
        communityName={communityName}
        communityAddress={communityAddress}
      />
    );

    expect(screen.getByText(communityAddress)).toBeInTheDocument();
  });

  it("should render the default CTA button text", () => {
    render(
      <CardCommunity
        imageURL={imageURL}
        imageAltText={altText}
        communityName={communityName}
        communityAddress={communityAddress}
      />
    );

    expect(screen.getByRole("button")).toHaveTextContent("Ver Comunidad");
  });

  it("should render a custom CTA button text", () => {
    const textoCTA = "Unirse a la Comunidad";

    render(
      <CardCommunity
        imageURL={imageURL}
        imageAltText={altText}
        communityName={communityName}
        communityAddress={communityAddress}
        ctaText={textoCTA}
      />
    );

    expect(screen.getByRole("button")).toHaveTextContent(textoCTA);
  });

  it("should render the CTA button enabled by default", () => {
    render(
      <CardCommunity
        imageURL={imageURL}
        imageAltText={altText}
        communityName={communityName}
        communityAddress={communityAddress}
      />
    );

    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("should render the CTA button as disabled when requested", () => {
    render(
      <CardCommunity
        imageURL={imageURL}
        imageAltText={altText}
        communityName={communityName}
        communityAddress={communityAddress}
        ctaDisabled={true}
      />
    );

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should render the CTA button with type 'button' by default", () => {
    render(
      <CardCommunity
        imageURL={imageURL}
        imageAltText={altText}
        communityName={communityName}
        communityAddress={communityAddress}
      />
    );

    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("should render the CTA button with type 'submit' when requested", () => {
    render(
      <CardCommunity
        imageURL={imageURL}
        imageAltText={altText}
        communityName={communityName}
        communityAddress={communityAddress}
        ctaButtonType="submit"
      />
    );

    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("should associate the CTA button to the provided form", () => {
    const idFormulario = "formulario-comunidad";

    render(
      <CardCommunity
        imageURL={imageURL}
        imageAltText={altText}
        communityName={communityName}
        communityAddress={communityAddress}
        ctaFormID={idFormulario}
      />
    );

    expect(screen.getByRole("button")).toHaveAttribute("form", idFormulario);
  });

  it("should apply the provided additional CSS class", () => {
    const claseAdicional = "clase-personalizada";

    render(
      <CardCommunity
        imageURL={imageURL}
        imageAltText={altText}
        communityName={communityName}
        communityAddress={communityAddress}
        className={claseAdicional}
      />
    );

    expect(screen.getByRole("card")).toHaveClass(claseAdicional);
  });
});
