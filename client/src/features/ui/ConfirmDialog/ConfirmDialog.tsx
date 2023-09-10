import Modal from "../Modal/Modal";

interface ConfirmDialogProps {
  onOpen: () => void;
  onToggle: () => void;
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  onOpen,
  isOpen,
  onToggle,
  title,
  children,
}) => {
  return (
    <Modal title={title} onToggle={onToggle} isOpen={isOpen}>
      {children}
    </Modal>
  );
};

export default ConfirmDialog;
