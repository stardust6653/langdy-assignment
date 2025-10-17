import { MdOutlineIosShare } from "react-icons/md";
import { MdOutlineFlag } from "react-icons/md";
import styles from "../MoreModal.module.scss";

const ModalButtonGroup = () => {
  return (
    <div className={styles.buttonGroup}>
      <button>
        <MdOutlineIosShare size={18} className={styles.buttonIcon} />
        <span className={styles.content}>채널 공유</span>
      </button>
      <button>
        <MdOutlineFlag size={18} className={styles.buttonIcon} />
        <span className={styles.content}>사용자 신고</span>
      </button>
    </div>
  );
};

export default ModalButtonGroup;
