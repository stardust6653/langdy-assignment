import { useFetch } from "@/hooks/useFetch";
import { FilterType, VideoData } from "@/types/videos";
import styles from "./VideoList.module.scss";
import { useEffect, useState } from "react";
import VideoItem from "../VideoItem";
import VideoFilter from "../VideoFilter";

const VideoList = () => {
  const { data, loading, error } = useFetch<VideoData[]>("/api/videos");
  const [currentFilter, setCurrentFilter] = useState<FilterType>("최신순");
  const [filteredVideos, setFilteredVideos] = useState<VideoData[]>(data || []);

  useEffect(() => {
    if (data) {
      if (currentFilter === "최신순") {
        const sortedByLatest = [...data].sort((a, b) => {
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
        });
        setFilteredVideos(sortedByLatest);
      } else if (currentFilter === "인기순") {
        const sortedByPopularity = [...data].sort((a, b) => {
          return (
            parseInt(b.viewCount.replace(/,/g, "")) -
            parseInt(a.viewCount.replace(/,/g, ""))
          );
        });
        setFilteredVideos(sortedByPopularity);
      } else if (currentFilter === "날짜순") {
        const sortedByOldest = [...data].sort((a, b) => {
          return (
            new Date(a.publishedAt).getTime() -
            new Date(b.publishedAt).getTime()
          );
        });
        setFilteredVideos(sortedByOldest);
      }
    }
  }, [data, currentFilter]);

  return (
    <div className={styles.videoListContainer}>
      <VideoFilter
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
      />
      <div className={styles.videoList}>
        {filteredVideos?.map((video) => {
          return <VideoItem key={video.id} video={video} />;
        })}
      </div>
    </div>
  );
};

export default VideoList;
