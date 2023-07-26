"use client";

import DesktopIcon, { DesktopIconProps } from "../DesktopIcon/DesktopIcon";
import styles from "./Desktop.module.scss";
import useMouseSelection from "@/hooks/useMouseSelection";
import { useRef } from "react";

export default function Desktop({
  // children,
  icons,
  appbar,
}: {
  // children: React.ReactNode;
  icons?: Pick<
    DesktopIconProps,
    "label" | "icon" | "initialPosition" | "className" | "onClick"
  >[];
  appbar?: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isSelecting, selectionBox, selectedElements } = useMouseSelection({
    containerRef,
    selElQuerySel: ".selectable",
    onSelectClassName: "selected",
    dataAttribute: "id",
  });

  console.log(selectedElements);

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
          <DesktopIcon
            data-id={props.label}
            className={"selectable"}
            key={props.label}
            {...props}
            parentRef={containerRef}
          />
        ))}
      </div>
    </div>
  );
}
