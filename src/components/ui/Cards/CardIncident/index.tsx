import updateIncidentStatus from "@/actions/community/communityIncident";
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

const toDateLabel = (date: Date): string => {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
};

const toStateLabel = (state: IncidentState): string => {
  if (state === "procesandose") return "procesandose";
  if (state === "resuelto") return "resuelta";
  return "reportada";
};

const toButtonLabel = (state: IncidentState): string => {
  if (state === "reportado") return "Procesar";
  if (state === "procesandose") return "Resolver";
  return "Resuelta";
};

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
