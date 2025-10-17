import { FilterType } from "@/types/videos";
import styles from "./VideoList.module.scss";
import { useEffect, useState } from "react";
import VideoItem from "../VideoItem";
import VideoFilter from "../VideoFilter";
import { useVideoFetch } from "./hooks/useVideoFetch";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import VideoSkeletonList from "../VideoSkeletonList";

const VideoList = () => {
  const [currentFilter, setCurrentFilter] = useState<FilterType>("recent");
  const [page, setPage] = useState(1);

  const { allVideos, loading, hasNextPage, fetchVideos } = useVideoFetch();

  const onLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchVideos(currentFilter, nextPage);
  };

  const { loaderRef } = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore,
  });

  useEffect(() => {
    setPage(1);
    fetchVideos(currentFilter, 1);
  }, [currentFilter]);

  if (loading && allVideos.length === 0) {
    return (
      <>
        <VideoFilter
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        />
        <VideoSkeletonList />
      </>
    );
  }

  return (
    <div className={styles.videoListContainer}>
      <VideoFilter
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
      />
      <div className={styles.videoList}>
        {allVideos.map((video) => (
          <VideoItem key={video.id} video={video} />
        ))}
      </div>

      {loading && allVideos.length > 0 && (
        <VideoSkeletonList length={4} style={{ marginTop: "16px" }} />
      )}
      {hasNextPage && <div ref={loaderRef} style={{ height: "50px" }} />}
    </div>
  );
};

export default VideoList;
