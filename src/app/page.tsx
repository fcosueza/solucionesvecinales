"use client";

import Header from "@/ui/layout/Header";
import { NavItemData } from "@/types/types";

export default function Home() {
  const links: NavItemData[] = [
    { text: "Inicio", url: "/home" },
    { text: "Características", url: "/about" },
    { text: "Contacto", url: "/contact" }
  ];

  return (
    <>
      <Header menuLinks={links} buttonText="Log In" buttonFunc={() => console.log("Hallo")} />
    </>
  );
}
