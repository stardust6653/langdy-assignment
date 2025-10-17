import styles from "../MoreModal.module.scss";
import Description from "../Description";
import LinkInfo from "../LinkInfo";
import AdditionalInfo from "../AdditionalInfo";
import ModalButtonGroup from "../ModalButtonGroup";
import { ChannelData } from "@/types/channel";

interface Props {
  data: ChannelData | null;
}

const ModalContents = ({ data }: Props) => {
  return (
    <div className={styles.modalContent}>
      <Description data={data} />
      <LinkInfo data={data} />
      <AdditionalInfo data={data} />
      <ModalButtonGroup />
    </div>
  );
};

export default ModalContents;
