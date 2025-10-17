import { useState, useEffect, useRef, useCallback } from "react";

const ITEMS_PER_PAGE = 16;

export const useInfiniteScroll = <T>(items: T[]) => {
  const [itemsToDisplay, setItemsToDisplay] = useState<T[]>([]);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setItemsToDisplay(items.slice(0, ITEMS_PER_PAGE));
  }, [items]);

  const loadMoreItems = useCallback(() => {
    const currentLength = itemsToDisplay.length;
    const nextItems = items.slice(
      currentLength,
      currentLength + ITEMS_PER_PAGE
    );
    setItemsToDisplay((prevItems) => [...prevItems, ...nextItems]);
  }, [items, itemsToDisplay.length]);

  useEffect(() => {
    if (itemsToDisplay.length >= items.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreItems();
        }
      },
      { threshold: 0.5 }
    );

    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [loadMoreItems, items.length, itemsToDisplay.length]);

  return { itemsToDisplay, loaderRef };
};
