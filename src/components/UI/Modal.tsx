import {
  ComponentPropsWithoutRef,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
} from "react";
import { createPortal } from "react-dom";

export type ModalRefProps = {
  open: () => void;
};

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
} & ComponentPropsWithoutRef<"dialog">;

const Modal = forwardRef<ModalRefProps, ModalProps>(function Modal(
  { children, onClose }: ModalProps,
  ref
) {
  const modalRef = useRef<HTMLDialogElement>(null);
  useImperativeHandle(ref, () => {
    return {
      open() {
        if (modalRef.current) {
          modalRef.current.showModal();
        }
      },
    };
  });

  return createPortal(
    <dialog className="modal" ref={modalRef} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal-root")!
  );
});

export default Modal;
