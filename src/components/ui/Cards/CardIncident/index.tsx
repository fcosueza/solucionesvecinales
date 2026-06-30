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
 * Formats a Date object as a Spanish date and time label (dd/mm/yyyy hh:mm).
 *
 * @param date Object of type Date to format
 * @returns String with the date in Spanish format
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
 * Converts the internal status of the incident into a readable label in Spanish.
 *
 * @param state Incident status
 * @returns Label of the state in Spanish
 */
const toStateLabel = (state: IncidentState): string => {
  if (state === "procesandose") return "procesandose";
  if (state === "resuelto") return "resuelta";
  return "reportada";
};

/**
 * Returns the action button label based on the current status of the issue.
 *
 * @param state Current incident status
 * @returns Text to show on status change button
 */
const toButtonLabel = (state: IncidentState): string => {
  if (state === "reportado") return "Procesar";
  if (state === "procesandose") return "Resolver";
  return "Resuelta";
};

/**
 * Card that shows the details of an incident in the community.
 * Shows reporter information, description and current status.
 * Administrators can change the status and delete resolved issues.
 *
 * @param communityID ID of the community to which the issue belongs
 * @param userID ID of the user who reported the incident
 * @param incidentDate Date on which the incident was reported
 * @param title Incident title
 * @param updatedAt Date of last status update
 * @param userName Name of the user who reported the incident
 * @param userEmail Email of the user who reported the incident
 * @param description Detailed description of the incident
 * @param state State of the incident, which can be "reportado", "procesandose", or "resuelto"
 * @param isAdmin Indicates if the current user is an administrator (false by default)
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
