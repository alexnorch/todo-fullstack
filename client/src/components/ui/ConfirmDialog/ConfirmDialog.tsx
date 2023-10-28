import { FormEvent } from "types";
import Modal from "../Modal/Modal";

interface ConfirmDialogProps {
  onToggle: () => void;
  isOpen: boolean;
  text: string;
  submitter: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onToggle,
  text,
  submitter,
}) => {
  return (
    <Modal
      submitter={submitter}
      title="Confirm the action"
      onToggle={onToggle}
      isOpen={isOpen}
    >
      <p>{text}</p>
    </Modal>
  );
};

export default ConfirmDialog;
