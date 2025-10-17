import styles from "./VideoSkeleton.module.scss";

const VideoSkeleton = () => {
  return (
    <div className={styles.videoSkeleton}>
      <div className={styles.thumbnailSkeleton} />
      <div className={styles.textSkeleton}>
        <p className={styles.titleSkeleton} />
        <p className={styles.descriptionSkeleton} />
      </div>
    </div>
  );
};

export default VideoSkeleton;
