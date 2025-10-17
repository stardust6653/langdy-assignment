import { useFetch } from "@/hooks/useFetch";
import { FilterType, VideoData } from "@/types/videos";
import styles from "./VideoList.module.scss";
import { useEffect, useState } from "react";
import VideoItem from "../VideoItem";
import VideoFilter from "../VideoFilter";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import VideoSkeleton from "./VideoSkeleton";

const VideoList = () => {
  const { data, loading, error } = useFetch<VideoData[]>("/api/videos");
  const [currentFilter, setCurrentFilter] = useState<FilterType>("최신순");
  const [filteredVideos, setFilteredVideos] = useState<VideoData[]>(data || []);

  useEffect(() => {
    if (!data) return;

    const newFilteredVideos = [...data];

    if (currentFilter === "최신순") {
      newFilteredVideos.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    } else if (currentFilter === "인기순") {
      newFilteredVideos.sort(
        (a, b) =>
          parseInt(b.viewCount.replace(/,/g, "")) -
          parseInt(a.viewCount.replace(/,/g, ""))
      );
    } else if (currentFilter === "날짜순") {
      newFilteredVideos.sort(
        (a, b) =>
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      );
    }

    setFilteredVideos(newFilteredVideos);
  }, [data, currentFilter]);

  const { itemsToDisplay: videosToDisplay, loaderRef } =
    useInfiniteScroll(filteredVideos);

  if (loading) {
    return (
      <div className={styles.videoListContainer}>
        <VideoFilter
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        />
        <div className={styles.videoList}>
          {Array.from({ length: 12 }).map((_, index) => (
            <VideoSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.videoListContainer}>
      <VideoFilter
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
      />
      <div className={styles.videoList}>
        {videosToDisplay.map((video) => (
          <VideoItem key={video.id} video={video} />
        ))}
      </div>

      <div ref={loaderRef} style={{ height: "50px" }} />
    </div>
  );
};

export default VideoList;
