import VideoFilter from "../VideoFilter";
import VideoSkeleton from "../VideoSkeleton";
import styles from "../VideoList/VideoList.module.scss";

interface Props {
  length?: number;
  style?: React.CSSProperties;
}

const VideoSkeletonList = ({ length = 16, style }: Props) => {
  return (
    <div className={styles.videoListContainer} style={style}>
      <div className={styles.videoList}>
        {Array.from({ length }).map((_, index) => (
          <VideoSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default VideoSkeletonList;
