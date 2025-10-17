import { MdLanguage } from "react-icons/md";
import styles from "../MoreModal.module.scss";
import { ChannelData } from "@/types/channel";

interface Props {
  data: ChannelData | null;
}

const LinkInfo = ({ data }: Props) => {
  return (
    <>
      <span className={styles.sectionTitle}>링크</span>
      <div className={styles.contentItem}>
        <MdLanguage size={24} className={styles.icon} />
        <div className={styles.linkDetails}>
          <p className={styles.content}>{data?.links[0].name}</p>
          <a
            className={styles.content}
            href={data?.links[0].url ?? ""}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data?.links[0].url}
          </a>
        </div>
      </div>
    </>
  );
};

export default LinkInfo;
