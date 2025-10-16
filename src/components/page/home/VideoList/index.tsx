import { useFetch } from "@/hooks/useFetch";
import { VideoData } from "@/types/videos";
import styles from "./VideoList.module.scss";
import Image from "next/image";
import { useState } from "react";
import VideoItem from "../VideoItem";

const VideoList = () => {
  const { data, loading, error } = useFetch<VideoData[]>("/api/videos");
  const [filteredVideos, setFilteredVideos] = useState<VideoData[]>(data || []);

  return (
    <div className={styles.videoListContainer}>
      <div>필터자리</div>
      <div className={styles.videoList}>
        {data?.map((video) => {
          return <VideoItem key={video.id} video={video} />;
        })}
      </div>
    </div>
  );
};

export default VideoList;
