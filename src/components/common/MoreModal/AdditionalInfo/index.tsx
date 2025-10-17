import { IoEarthOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { MdOutlinePlayCircleOutline } from "react-icons/md";
import { MdOutlineTrendingUp } from "react-icons/md";
import { formatSubscriberCount } from "@/utils/formatSubscriberCount";
import { ChannelData } from "@/types/channel";
import styles from "../MoreModal.module.scss";

interface Props {
  data: ChannelData | null;
}

const AdditionalInfo = ({ data }: Props) => {
  const additionalInfoData = [
    {
      icon: <IoEarthOutline size={24} className={styles.icon} />,
      content: data?.country || "정보 없음",
    },
    {
      icon: <MdErrorOutline size={24} className={styles.icon} />,
      content: `가입일: ${data?.joinDate || "정보 없음"}`,
    },
    {
      icon: <MdOutlinePersonAddAlt size={24} className={styles.icon} />,
      content: `구독자 ${formatSubscriberCount(
        data?.stats.subscribers ?? 0
      )}명`,
    },
    {
      icon: <MdOutlinePlayCircleOutline size={24} className={styles.icon} />,
      content: `동영상 ${data?.stats.videos.toLocaleString() ?? 0}개`,
    },
    {
      icon: <MdOutlineTrendingUp size={24} className={styles.icon} />,
      content: `조회수 ${data?.stats.views.toLocaleString() ?? 0}회`,
    },
  ];

  return (
    <div className={styles.additionalInfoWrapper}>
      <span className={styles.sectionTitle}>추가 정보</span>
      <div className={styles.additionalInfo}>
        {additionalInfoData.map((item, index) => (
          <div className={styles.contentItem} key={index}>
            {item.icon}
            <div className={styles.linkDetails}>
              <p className={styles.content}>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdditionalInfo;
