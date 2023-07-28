import clsx from "clsx";
import styles from "./Appbar.module.scss";
import { IconPeace, IconChevronDown, IconWifi } from "@tabler/icons-react";
import { getClassNames } from "@/utils/funcs";

const exportClassNames = {
  AppbarWrapper: "AppbarWrapper",
  Appbar: "Appbar",
};

export type AppbarProps = {};

export default function Appbar(props: AppbarProps) {
  const classNames = getClassNames(styles, exportClassNames);

  return (
    <div className={classNames.AppbarWrapper}>
      <div className={classNames.Appbar} id="appbar">
        <div className={classNames.logo}>
          <IconPeace className={classNames.icon} />
        </div>
        <div className={classNames.currentApp}>Code</div>
        <div className={classNames.left}>
          <div>Apps</div>
          <div>Games</div>
          <div>
            <IconPeace className={classNames.icon} />
          </div>
          <div>4</div>
          <div>5</div>
        </div>
        <div className={classNames.emptySpace}></div>
        <div className={classNames.right}>
          <div>
            <IconChevronDown />
          </div>
          <div>
            <IconWifi />
          </div>
          <div>
            <IconPeace className={classNames.icon} />
          </div>
          <div>4</div>
          <div>5</div>
        </div>
      </div>
    </div>
  );
}
