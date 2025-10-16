import { getDeterministicColor } from "@/utils/bannerColorUtils";
import styles from "./Banner.module.scss";
import Image from "next/image";
import { ChannelData } from "@/types/channel";

interface Props {
  data: ChannelData | null;
  loading: boolean;
}

const Banner = ({ data, loading }: Props) => {
  const bannerColor = getDeterministicColor(data ? data.name : "default");

  if (loading) return <div className={`${styles.banner} ${styles.skeleton}`} />;
  if (!data || !data.bannerUrl)
    return (
      <div className={styles.banner} style={{ backgroundColor: bannerColor }} />
    );

  return (
    <Image
      src={data.bannerUrl}
      alt="배너"
      priority
      className={styles.banner}
      width={1920}
      height={206}
    />
  );
};

export default Banner;
