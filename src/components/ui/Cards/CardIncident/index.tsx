import updateIncidentStatus, { deleteIncident } from "@/actions/community/communityIncident";
import style from "./style.module.css";

type IncidentState = "reportado" | "procesandose" | "resuelto";

interface Props {
  communityID: number;
  userID: string;
  incidentDate: Date;
  title: string;
  updatedAt: Date;
  userName: string;
  userEmail: string;
  description: string;
  state: IncidentState;
  isAdmin?: boolean;
}

/**
 * Formatea un objeto Date como etiqueta de fecha y hora en español (dd/mm/yyyy hh:mm).
 *
 * @param date El objeto Date a formatear
 * @returns String con la fecha en formato español
 */
const toDateLabel = (date: Date): string => {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
};

/**
 * Convierte el estado interno de la incidencia en una etiqueta legible en español.
 *
 * @param state El estado de la incidencia
 * @returns Etiqueta del estado en español
 */
const toStateLabel = (state: IncidentState): string => {
  if (state === "procesandose") return "procesandose";
  if (state === "resuelto") return "resuelta";
  return "reportada";
};

/**
 * Devuelve la etiqueta del botón de acción según el estado actual de la incidencia.
 *
 * @param state El estado actual de la incidencia
 * @returns Texto a mostrar en el botón de cambio de estado
 */
const toButtonLabel = (state: IncidentState): string => {
  if (state === "reportado") return "Procesar";
  if (state === "procesandose") return "Resolver";
  return "Resuelta";
};

/**
 * Tarjeta que muestra los detalles de una incidencia en la comunidad.
 * Muestra información del reportero, descripción y estado actual.
 * Los administradores pueden cambiar el estado y eliminar incidencias resueltas.
 *
 * @param communityID ID de la comunidad a la que pertenece la incidencia
 * @param userID ID del usuario que reportó la incidencia
 * @param incidentDate Fecha en la que se reportó la incidencia
 * @param title Título de la incidencia
 * @param updatedAt Fecha de la última actualización del estado
 * @param userName Nombre del usuario que reportó la incidencia
 * @param userEmail Email del usuario que reportó la incidencia
 * @param description Descripción detallada de la incidencia
 * @param state Estado actual de la incidencia (reportado, procesandose, resuelto)
 * @param isAdmin Indica si el usuario actual es administrador (por defecto false)
 */
const CardIncident = ({
  communityID,
  userID,
  incidentDate,
  title,
  updatedAt,
  userName,
  userEmail,
  description,
  state,
  isAdmin = false
}: Props): React.ReactNode => {
  const stateClassName =
    state === "reportado"
      ? style.stateReported
      : state === "procesandose"
        ? style.stateProcessing
        : style.stateResolved;

  const isResolved = state === "resuelto";

  return (
    <li className={style.card}>
      {isAdmin && isResolved && (
        <form action={deleteIncident} className={style.deleteForm}>
          <input type="hidden" name="communityID" value={communityID} />
          <input type="hidden" name="userID" value={userID} />
          <input type="hidden" name="incidentDate" value={incidentDate.toISOString()} />
          <button type="submit" className={style.deleteBtn} aria-label="Eliminar incidencia">
            ✕
          </button>
        </form>
      )}

      <div className={style.userSection}>
        <p className={style.userName}>{userName}</p>
        <p className={style.userEmail}>{userEmail}</p>
        <p className={style.createdDate}>{toDateLabel(incidentDate)}</p>
      </div>

      <div className={style.contentSection}>
        <div className={style.incidentContent}>
          <p className={style.incidentTitle}>{title}</p>
          <p className={style.incidentDescription}>{description}</p>
        </div>

        <div className={style.statusBlock}>
          <p className={style.statusTitle}>Estado</p>
          <span className={`${style.statePill} ${stateClassName}`}>{toStateLabel(state)}</span>
        </div>
      </div>

      <div className={style.metaSection}>
        <div className={style.updatedBlock}>
          <p className={style.updatedTitle}>Actualizada</p>
          <p className={style.updatedDate}>{toDateLabel(updatedAt)}</p>
        </div>

        <form action={updateIncidentStatus} className={style.actionForm}>
          <input type="hidden" name="communityID" value={communityID} />
          <input type="hidden" name="userID" value={userID} />
          <input type="hidden" name="incidentDate" value={incidentDate.toISOString()} />
          {isAdmin && (
            <button type="submit" className={style.actionButton} disabled={isResolved}>
              {toButtonLabel(state)}
            </button>
          )}
        </form>
      </div>
    </li>
  );
};

export default CardIncident;
