import { useEffect, useRef } from "react";
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
  return (
    <Modal ref={modalRef} onClose={onClose}>
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
    </Modal>
  );
}
