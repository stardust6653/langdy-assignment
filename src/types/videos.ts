export interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  viewCount: string;
  publishedAt: string;
  duration: string;
}

export type FilterType = "최신순" | "인기순" | "날짜순";
