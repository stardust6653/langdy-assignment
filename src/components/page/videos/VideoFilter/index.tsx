import { Dispatch, SetStateAction } from "react";
import styles from "./VideoFilter.module.scss";
import { FilterType } from "@/types/videos";

interface Props {
  currentFilter: FilterType;
  setCurrentFilter: Dispatch<SetStateAction<FilterType>>;
}

const VideoFilter = ({ currentFilter, setCurrentFilter }: Props) => {
  const filterList = ["recent", "popular", "oldest"];
  const filterNames: { [key in FilterType]: string } = {
    recent: "최신순",
    popular: "인기순",
    oldest: "날짜순",
  };

  const handleFilterClick = (filter: FilterType) => {
    setCurrentFilter(filter);
  };

  const activeButtonClass = (filter: FilterType) => {
    return filter === currentFilter
      ? `${styles.filterButton} ${styles.active}`
      : styles.filterButton;
  };

  return (
    <div className={styles.filterContainer}>
      {filterList.map((filter) => (
        <button
          key={filter}
          className={activeButtonClass(filter as FilterType)}
          onClick={() => handleFilterClick(filter as FilterType)}
        >
          {filterNames[filter as FilterType]}
        </button>
      ))}
    </div>
  );
};

export default VideoFilter;
