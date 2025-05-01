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

/**
 * Tipo formaActionState
 *
 * Tipo que representa el estado de procesamiento de un formulario, con  un mensaje, un conjunto de
 * errores, pertenecientes a cada campo del formulario, y un payload, con los datos actuales del formulario.
 */
export interface FormActionState {
  message: string;
  errors?: Record<string, string | string[]>;
  payload?: FormData;
}

/**
 * Enum userRoles
 *
 * Enumerado que define los diferentes roles que puede tener un usuario
 */
export enum UserRoles {
  inquilino = "inquilino",
  administrador = "administrador",
  webAdmin = "webAdmin"
}
