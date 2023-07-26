"use client";

import DesktopIcon from "../DesktopIcon/DesktopIcon";
import styles from "./Desktop.module.scss";
import useMouseSelection from "@/hooks/useMouseSelection";

export default function Desktop({
  // children,
  icons,
  appbar,
}: {
  // children: React.ReactNode;
  icons?: { label: string; icon?: React.ReactNode; onClick?: () => void }[];
  appbar?: React.ReactNode;
}) {
  const { containerRef, isSelecting, selectionBox } = useMouseSelection();

  return (
    <div className={styles.desktop}>
      <div className={styles.wallpaper} />
      {appbar}
      <div className={styles.main} ref={containerRef}>
        {isSelecting && (
          <div
            className="selection-box"
            style={{
              left: Math.min(selectionBox.startX, selectionBox.endX),
              top: Math.min(selectionBox.startY, selectionBox.endY),
              width: Math.abs(selectionBox.endX - selectionBox.startX),
              height: Math.abs(selectionBox.endY - selectionBox.startY),
            }}
          />
        )}
        {icons?.map((props) => (
          <DesktopIcon key={props.label} {...props} parentRef={containerRef} />
        ))}
      </div>
    </div>
  );
}
