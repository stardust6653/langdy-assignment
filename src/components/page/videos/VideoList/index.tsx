import { useFetch } from "@/hooks/useFetch";
import { FilterType, VideoData } from "@/types/videos";
import styles from "./VideoList.module.scss";
import Image from "next/image";
import { useState } from "react";
import VideoItem from "../VideoItem";
import VideoFilter from "../VideoFilter";

const VideoList = () => {
  const { data, loading, error } = useFetch<VideoData[]>("/api/videos");
  const [currentFilter, setCurrentFilter] = useState<FilterType>("최신순");
  const [filteredVideos, setFilteredVideos] = useState<VideoData[]>(data || []);

  return (
    <div className={styles.videoListContainer}>
      <VideoFilter
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
      />
      <div className={styles.videoList}>
        {data?.map((video) => {
          return <VideoItem key={video.id} video={video} />;
        })}
      </div>
    </div>
  );
};

export default VideoList;
