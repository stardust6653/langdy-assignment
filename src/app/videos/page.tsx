"use client";

import Banner from "@/components/common/Banner";
import ChannelInformation from "@/components/common/ChannelInformation";
import { useFetch } from "@/hooks/useFetch";
import { ChannelData } from "@/types/channel";
import TabMenus from "@/components/common/TabMenus";
import VideoList from "@/components/page/home/VideoList";

const VideosPage = () => {
  const { data, loading, error } = useFetch<ChannelData>("/api/channel");

  return (
    <div>
      <Banner data={data} loading={loading} />
      <ChannelInformation data={data} loading={loading} />
      <TabMenus />
      <VideoList />
    </div>
  );
};

export default VideosPage;
