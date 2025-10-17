import ProfileImage from "../ProfileImage";
import styles from "./ChannelInformationSkeleton.module.scss";

const ChannelInformationSkeleton = () => {
  return (
    <div className={styles.channelInformationSkeleton}>
      <ProfileImage data={null} loading={true} />
      <div className={styles.channelText}>
        <div className={`${styles.skeleton} ${styles.nameSkeleton}`} />
        <div className={`${styles.skeleton} ${styles.channelStatsSkeleton}`} />
        <div
          className={`${styles.skeleton} ${styles.channelDescriptionSkeleton}`}
        />
        <div className={`${styles.skeleton} ${styles.channelLinksSkeleton}`} />
        <div
          className={`${styles.skeleton} ${styles.subscribeButtonSkeleton}`}
        />
      </div>
    </div>
  );
};

export default ChannelInformationSkeleton;
