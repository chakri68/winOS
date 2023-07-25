import styles from "./Appbar.module.scss";
import { IconPeace, IconChevronDown, IconWifi } from "@tabler/icons-react";

type AppbarProps = {};

export default function Appbar(props: AppbarProps) {
  return (
    <div className={styles.AppbarWrapper}>
      <div className={styles.Appbar} id="appbar">
        <div className={styles.logo}>
          <IconPeace className={styles.icon} />
        </div>
        <div className={styles.currentApp}>Code</div>
        <div className={styles.left}>
          <div>Apps</div>
          <div>Games</div>
          <div>
            <IconPeace className={styles.icon} />
          </div>
          <div>4</div>
          <div>5</div>
        </div>
        <div className={styles.emptySpace}></div>
        <div className={styles.right}>
          <div>
            <IconChevronDown />
          </div>
          <div>
            <IconWifi />
          </div>
          <div>
            <IconPeace className={styles.icon} />
          </div>
          <div>4</div>
          <div>5</div>
        </div>
      </div>
    </div>
  );
}
