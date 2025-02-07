import { Session, useSessionContext } from "../../store/sessions-context";
import Button from "../UI/Button";

type UpcomingSessionProps = { session: Session };
export default function UpcomingSession({ session }: UpcomingSessionProps) {
  const ctxValue = useSessionContext();
  function handleCancel(id: string) {
    ctxValue.cancelSession(id);
  }

  return (
    <article className="upcoming-session">
      <div>
        <h3>{session.title}</h3>
        <p>{session.summary}</p>
        <time dateTime={new Date(session.date).toISOString()}>
          {new Date(session.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </time>
      </div>
      <p className="actions">
        <Button onClick={() => handleCancel(session.id)} textOnly>
          Cancel
        </Button>
      </p>
    </article>
  );
}
