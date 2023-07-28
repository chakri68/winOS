"use client";

import styles from "./Window.module.scss";
import useMouseSelection from "@/hooks/useMouseSelection";
import { useRef } from "react";
import Desktop, { DesktopProps } from "../Desktop/Desktop";
import Appbar, { AppbarProps } from "../Appbar/Appbar";
import Dock, { DockProps } from "../Dock/Dock";

export type WindowProps = {
  // children: React.ReactNode;
  appbarProps: AppbarProps;
  desktopProps: DesktopProps;
  dockProps: DockProps;
};

export default function Window({
  // children,
  appbarProps,
  desktopProps,
  dockProps,
}: WindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isSelecting, selectionBox, selectedElements } = useMouseSelection({
    containerRef,
    selElQuerySel: ".selectable",
    onSelectClassName: "selected",
    dataAttribute: "id",
  });

  return (
    <div className={styles.Window} id="window">
      <div className={styles.wallpaper} />
      <Appbar {...appbarProps} />
      <Desktop {...desktopProps} /> {/* Make it a stage */}
      <Dock {...dockProps} />
    </div>
  );
}
