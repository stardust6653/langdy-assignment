import styles from "./TabMenus.module.scss";
import { MdOutlineSearch } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabMenu {
  id: number;
  name: string;
  route: string;
}

const TabMenus = () => {
  const currentPath = usePathname();

  const tabMenus: TabMenu[] = [
    { id: 1, name: "홈", route: "/featured" },
    { id: 2, name: "동영상", route: "/videos" },
    { id: 3, name: "Shorts", route: "/shorts" },
    { id: 4, name: "재생목록", route: "/playlists" },
    { id: 5, name: "게시물", route: "/posts" },
  ];

  const isActive = (menu: TabMenu) => {
    return currentPath.endsWith(menu.route);
  };

  const activeClass = (menu: TabMenu) =>
    `${styles.tabMenu} ${isActive(menu) ? styles.active : ""}`;

  return (
    <div className={styles.tabMenuList}>
      {tabMenus.map((menu) => (
        <Link href={menu.route} key={menu.id} className={activeClass(menu)}>
          {menu.name}
        </Link>
      ))}
      <button className={styles.searchButton}>
        <MdOutlineSearch size={20} />
      </button>
    </div>
  );
};

export default TabMenus;
