// 채널의 통계 정보를 위한 타입
export interface ChannelStats {
  subscribers: number;
  videos: number;
  views: number;
  description: string;
}

// 외부 링크 정보를 위한 타입
export interface ChannelLink {
  name: string;
  url: string;
}

// 채널 전체 데이터를 위한 메인 타입
export interface ChannelData {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  bannerUrl: string;
  stats: ChannelStats;
  joinDate: string;
  country: string;
  links: ChannelLink[];
}
