import { MdOutlineHome } from "react-icons/md";
import { MdOutlineMovie } from "react-icons/md";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdOutlineHistory } from "react-icons/md";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdOutlineThumbUp } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";

type MenuType = "BASIC_MENU" | "USER_MENU";

export interface MenuItem {
  name: string;
  icon: React.ComponentType<{ size?: string | number }>;
  link: string;
  external: boolean;
}

const MENU_CONFIG: Record<MenuType, MenuItem[]> = {
  BASIC_MENU: [
    {
      name: "Home",
      icon: MdOutlineHome,
      link: "/",
      external: false,
    },
    {
      name: "Shorts",
      icon: MdOutlineMovie,
      link: "/shorts",
      external: false,
    },
    {
      name: "Subscriptions",
      icon: MdOutlineSubscriptions,
      link: "/subscriptions",
      external: false,
    },
  ],
  USER_MENU: [
    {
      name: "History",
      icon: MdOutlineHistory,
      link: "/history",
      external: false,
    },
    {
      name: "Playlist",
      icon: MdOutlinePlaylistPlay,
      link: "/playlist",
      external: false,
    },
    {
      name: "Your videos",
      icon: MdOutlineOndemandVideo,
      link: "/your-videos",
      external: false,
    },
    {
      name: "Watch later",
      icon: MdOutlineWatchLater,
      link: "/watch-later",
      external: false,
    },
    {
      name: "Liked videos",
      icon: MdOutlineThumbUp,
      link: "/liked-videos",
      external: false,
    },
    {
      name: "Downloads",
      icon: MdOutlineFileDownload,
      link: "/downloads",
      external: false,
    },
  ],
};

export default MENU_CONFIG;
