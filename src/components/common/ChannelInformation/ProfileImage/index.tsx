import Image from "next/image";
import styles from "./ProfileImage.module.scss";
import { ChannelData } from "@/types/channel";

interface Props {
  data: ChannelData | null;
  loading: boolean;
}

const ProfileImage = ({ data, loading }: Props) => {
  if (loading)
    return <div className={`${styles.profileImage} ${styles.skeleton}`} />;
  if (!data || !data.avatarUrl)
    return (
      <div
        className={styles.profileImage}
        style={{ backgroundColor: "#ccc" }}
      />
    );

  return (
    <Image
      src={data.avatarUrl}
      alt="프로필 이미지"
      className={styles.profileImage}
      width={160}
      height={160}
    />
  );
};

export default ProfileImage;
