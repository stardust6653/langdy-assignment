import styles from "../MoreModal.module.scss";
import { ChannelData } from "@/types/channel";

interface Props {
  data: ChannelData | null;
}

const Description = ({ data }: Props) => {
  const description =
    data?.stats?.description.replaceAll("\n", "<br/>") ?? "설명 없음";
  return (
    <>
      <span className={styles.sectionTitle}>설명</span>
      <p
        dangerouslySetInnerHTML={{ __html: description }}
        className={styles.content}
      />
    </>
  );
};

export default Description;
