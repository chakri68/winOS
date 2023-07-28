"use client";

import { getClassNames } from "@/utils/funcs";
import DesktopIcon, { DesktopIconProps } from "../DesktopIcon/DesktopIcon";
import styleNames from "./Desktop.module.scss";
import useMouseSelection from "@/hooks/useMouseSelection";
import { useMemo, useRef } from "react";

export type DesktopProps = {
  icons?: Pick<
    DesktopIconProps,
    "label" | "icon" | "initialPosition" | "className" | "onClick"
  >[];
};

const exportStyleNames = {
  Desktop: "Desktop",
};

export default function Desktop({
  // children,
  icons,
}: DesktopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isSelecting, selectionBox, selectedElements } = useMouseSelection({
    containerRef,
    selElQuerySel: ".selectable",
    onSelectClassName: "selected",
    dataAttribute: "id",
  });

  const styles = useMemo(() => getClassNames(styleNames, exportStyleNames), []);

  return (
    <div className={styles.Desktop} ref={containerRef}>
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
  );
}
