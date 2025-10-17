import { useEffect, useRef } from "react";

interface Props {
  loading: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
}

export function useInfiniteScroll({ loading, hasNextPage, onLoadMore }: Props) {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !loading && hasNextPage) onLoadMore();
      },
      { threshold: 0.1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);
    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [loading, hasNextPage, onLoadMore]);

  return { loaderRef };
}
