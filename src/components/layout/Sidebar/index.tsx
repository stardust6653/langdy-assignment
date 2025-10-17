import MENU_CONFIG from "@/config/menu";
import SidebarItem from "./SidebarItem";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      {MENU_CONFIG.BASIC_MENU.map((menu) => (
        <SidebarItem key={menu.name} menu={menu} />
      ))}
      <hr className={styles.separator} />
      {MENU_CONFIG.USER_MENU.map((menu) => (
        <SidebarItem key={menu.name} menu={menu} />
      ))}
    </aside>
  );
};

export default Sidebar;
