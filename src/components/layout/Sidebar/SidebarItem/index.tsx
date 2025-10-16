import { MenuItem } from "@/config/menu";
import styles from "./SidebarItem.module.scss";

interface Props {
  menu: MenuItem;
}

const SidebarItem = ({ menu }: Props) => {
  return (
    <button key={menu.name} className={styles.sidebarItem}>
      <div className={styles.icon}>
        <menu.icon />
      </div>
      <span>{menu.name}</span>
    </button>
  );
};

export default SidebarItem;
