import { useState, useRef, useCallback } from "react";
import { FilterType, VideoApiResponse, VideoData } from "@/types/videos";

export function useVideoFetch() {
  const [allVideos, setAllVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchVideos = useCallback(
    async (filterType: FilterType, page: number) => {
      const INITIAL_URL = `/api/videos?page=${page}&limit=16&sort=${filterType}`;

      if (abortControllerRef.current) abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();

      try {
        setLoading(true);
        const res = await fetch(INITIAL_URL, {
          signal: abortControllerRef.current.signal,
        });

        if (!res.ok) throw new Error("Failed to fetch videos");
        const result: VideoApiResponse = await res.json();

        setAllVideos((prev) => {
          if (page === 1) return result.data;
          const existingIds = new Set(prev.map((video) => video.id));
          const newVideos = result.data.filter(
            (video) => !existingIds.has(video.id)
          );
          return [...prev, ...newVideos];
        });

        setHasNextPage(result.meta.hasNextPage);
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError")
          setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setAllVideos([]);
    if (abortControllerRef.current) abortControllerRef.current.abort();
  }, []);

  return {
    allVideos,
    loading,
    hasNextPage,
    error,
    fetchVideos,
    reset,
  };
}
