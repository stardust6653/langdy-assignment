"use client";

import Banner from "@/components/page/home/Banner";
import styles from "./home.module.scss";
import ChannelInformation from "@/components/page/home/ChannelInformation";
import { useFetch } from "@/hooks/useFetch";
import { ChannelData } from "@/types/channel";

export default function Home() {
  const { data, loading, error } = useFetch<ChannelData>("/api/channel");

  return (
    <div className={styles.home}>
      <Banner data={data} loading={loading} />
      <ChannelInformation data={data} loading={loading} />
    </div>
  );
}
