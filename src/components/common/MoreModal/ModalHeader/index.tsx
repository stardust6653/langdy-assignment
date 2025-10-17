import { MdClose } from "react-icons/md";
import styles from "../MoreModal.module.scss";

interface Props {
  onClose: () => void;
  data: {
    name: string;
  } | null;
}

const ModalHeader = ({ onClose, data }: Props) => {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{data?.name}</h2>
      <button className={styles.closeButton} onClick={onClose}>
        <MdClose size={28} />
      </button>
    </div>
  );
};

export default ModalHeader;
