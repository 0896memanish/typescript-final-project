import { FormEvent, useEffect, useRef } from "react";
import Modal, { ModalRefProps } from "../UI/Modal";
import { Session, useSessionContext } from "../../store/sessions-context";
import Input from "../UI/Input";
import Button from "../UI/Button";

type BookSessionProps = {
  onDone: () => void;
  session: Session;
};

export default function BookSession({ onDone, session }: BookSessionProps) {
  const modalRef = useRef<ModalRefProps>(null);
  const sessionCtx = useSessionContext();

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.open();
    }
  }, []);
  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const rawData = new FormData(event.currentTarget);
    const data = Object.fromEntries(rawData);

    console.log(data);
    sessionCtx.bookSession(session);
    onDone();
  }

  return (
    <Modal ref={modalRef} onClose={onDone}>
      <h2>Book Session</h2>
      <form onSubmit={handleFormSubmit}>
        <Input id="name" label="YOUR NAME" type="text" name="name"></Input>
        <Input id="email" label="YOUR EMAIL" type="email" name="email"></Input>
        <p className="actions">
          <Button onClick={onDone} textOnly>
            Cancel
          </Button>
          <Button>Book Session</Button>
        </p>
      </form>
    </Modal>
  );
}
