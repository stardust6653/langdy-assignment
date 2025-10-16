import Logo from "@/components/svg/Logo";
import { MdMenu } from "react-icons/md";
import { MdNotificationsNone } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdMic } from "react-icons/md";
import { MdOutlineKeyboard } from "react-icons/md";
import { VscAdd } from "react-icons/vsc";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <MdMenu size={24} className={styles.menuIcon} />
        <Logo />
      </div>

      <div className={styles.headerInner}>
        <div className={styles.searchBox}>
          <div className={styles.searchInputBox}>
            <input type="text" placeholder="Search" />
            <button aria-label="가상 키보드 입력">
              <MdOutlineKeyboard size={31} />
            </button>
          </div>
          <button aria-label="검색" className={styles.searchButton}>
            <MdSearch size={24} />
          </button>
        </div>
        <button aria-label="음성 검색" className={styles.micButton}>
          <MdMic size={24} />
        </button>
      </div>

      <div className={styles.headerInner}>
        <button className={styles.createButton}>
          <VscAdd size={22} />
          Create
        </button>
        <button aria-label="알림" className={styles.notificationButton}>
          <MdNotificationsNone size={24} />
        </button>
        <button className={styles.userProfileIcon}>Y</button>
      </div>
    </header>
  );
};

export default Header;
