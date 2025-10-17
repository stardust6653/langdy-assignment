import { VideoData } from "@/types/videos";
import Image from "next/image";
import styles from "./VideoItem.module.scss";
import { MdMoreVert } from "react-icons/md";
import { formatRelativeTime } from "@/utils/timeUtils";

interface Props {
  video: VideoData;
}

const VideoItem = ({ video }: Props) => {
  return (
    <div key={video.id} className={styles.videoItem}>
      <div className={styles.thumbnailContainer}>
        <Image
          src={video.thumbnail}
          alt={video.title}
          className={styles.thumbnail}
          width={305}
          height={171}
        />
        <span className={styles.duration}>{video.duration}</span>
      </div>

      <div className={styles.videoDetails}>
        <div className={styles.videoInfo}>
          <h3 className={styles.title}>{video.title}</h3>
          <div className={styles.metaInfo}>
            <span>조회수 {video.viewCount}</span> ·
            <span> {formatRelativeTime(video.publishedAt)}</span>
          </div>
        </div>

        <button aria-label="옵션보기" className={styles.optionsButton}>
          <MdMoreVert size={24} />
        </button>
      </div>
    </div>
  );
};

export default VideoItem;
