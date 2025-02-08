import { ReactNode, useEffect, useRef } from "react";
import { useSessionContext } from "../../store/sessions-context";
import Button from "../UI/Button";
import Modal, { ModalRefProps } from "../UI/Modal";
import UpcomingSession from "./UpcomingSession";

type UpcomingSessionsProps = {
  onClose: () => void;
};
export default function UpcomingSessions({ onClose }: UpcomingSessionsProps) {
  const ctxValue = useSessionContext();
  const modalRef = useRef<ModalRefProps>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.open();
    }
  }, []);
  let component: ReactNode;

  if (ctxValue.upcomingSessions.length === 0) {
    component = (
      <article className="upcoming-session">
        <div>
          <p>You haven't booked any sessions yet!</p>
        </div>
        <p style={{ margin: "-0rem 0" }}>
          <Button onClick={() => onClose()}>Cancel</Button>
        </p>
      </article>
    );
  } else {
    component = (
      <>
        <ul>
          {ctxValue.upcomingSessions.map((session) => (
            <li key={session.id}>
              <UpcomingSession session={session}></UpcomingSession>
            </li>
          ))}
        </ul>
        <p className="actions">
          <Button onClick={onClose}>Close</Button>
        </p>
      </>
    );
  }
  return (
    <Modal ref={modalRef} onClose={onClose}>
      {component}
    </Modal>
  );
}
