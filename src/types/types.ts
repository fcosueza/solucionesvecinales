/**
 * Tipo NavItemData
 *
 * Tipo que representa los datos de un enlace.
 */
export interface NavItem {
  text: string;
  href: string;
}

/**
 * Tipo MediaItem
 *
 * Tipo que representa los datos de una icono empleado para las redes sociales.
 */
export interface SocialIcon {
  src: string;
  url: string;
  altText: string;
  title: string;
  width: number;
  height: number;
}
