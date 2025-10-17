import styles from "./ChannelInformation.module.scss";
import { ChannelData } from "@/types/channel";
import ProfileImage from "./ProfileImage";
import { formatSubscriberCount } from "@/utils/formatSubscriberCount";
import MoreModal from "../MoreModal";
import { useState } from "react";

interface Props {
  data: ChannelData | null;
  loading: boolean;
}

const ChannelInformation = ({ data, loading }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  if (loading) {
    return (
      <div className={styles.channelInformation}>
        <ProfileImage data={null} loading={true} />
        <div className={styles.channelText}>
          <div className={`${styles.skeleton} ${styles.nameSkeleton}`} />
          <div
            className={`${styles.skeleton} ${styles.channelStatsSkeleton}`}
          />
          <div
            className={`${styles.skeleton} ${styles.channelDescriptionSkeleton}`}
          />
          <div
            className={`${styles.skeleton} ${styles.channelLinksSkeleton}`}
          />
          <div
            className={`${styles.skeleton} ${styles.subscribeButtonSkeleton}`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.channelInformation}>
      <ProfileImage data={data} loading={false} />
      <div className={styles.channelText}>
        <h1 className={styles.channelName}>{data?.name}</h1>
        <p className={styles.channelStats}>
          <span className={styles.channelHandle}>{data?.handle}</span>ㆍ
          <span>
            구독자 {formatSubscriberCount(data?.stats.subscribers ?? 0)}명
          </span>
          ㆍ<span>동영상 {data?.stats.videos}개</span>
        </p>
        <p className={styles.channelDescriptionWrapper}>
          <span className={styles.channelDescription}>
            {data?.stats.description}
          </span>
          <span className={styles.moreInfo} onClick={() => setIsOpen(true)}>
            더보기
          </span>
        </p>
        <p className={styles.channelLinks}>
          {data?.links[0] ? (
            <a className={styles.channelLinks} href={data.links[0].url}>
              {data.links[0].url}
            </a>
          ) : null}
        </p>
        <button className={styles.subscribeButton}>구독</button>
      </div>

      <MoreModal isOpen={isOpen} onClose={() => setIsOpen(false)} data={data} />
    </div>
  );
};

export default ChannelInformation;
