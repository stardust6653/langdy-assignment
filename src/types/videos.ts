export interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  viewCount: string;
  publishedAt: string;
  duration: string;
}

export type FilterType = "recent" | "popular" | "oldest";

export interface VideoApiResponse {
  data: VideoData[];
  meta: {
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}
