import { IconFile } from "@tabler/icons-react";
import styles from "./DesktopIcon.module.scss";
import { useState, memo } from "react";
import useDraggable from "@/hooks/useDraggable";
import clsx from "clsx";

export type DesktopIconProps = {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  parentRef: React.RefObject<HTMLDivElement>;
};

function DesktopIcon({ icon, label, onClick, parentRef }: DesktopIconProps) {
  const { ref, style } = useDraggable(parentRef);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  if (parentRef === undefined) {
    console.warn(
      "parentRef is undefined, this will cause issues with dragging"
    );
  }

  return (
    <div
      className={clsx(styles.DesktopIcon, isFocused && styles.selected)}
      ref={ref}
      style={{ ...style }}
      tabIndex={1}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <div className={styles.DesktopIcon__icon}>{icon ?? <IconFile />}</div>
      <div className={styles.DesktopIcon__name}>{label}</div>
    </div>
  );
}

export default memo(DesktopIcon);
