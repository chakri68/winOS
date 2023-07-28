import { getClassNames } from "@/utils/funcs";
import styleNames from "./DockItem.module.scss";
import React, { useMemo } from "react";
import { IconFile } from "@tabler/icons-react";

export type DockItemProps = {
  icon?: React.ReactNode;
  label: string;
};

const exportStyleNames = {
  DockItem: "DockItem",
  DockItem__icon: "DockItem__icon",
  DockItem__label: "DockItem__label",
  DockItem__gutter: "DockItem__gutter",
};

const DockItem = React.forwardRef<HTMLDivElement, DockItemProps>(
  ({ icon, label }, ref) => {
    const styles = useMemo(
      () => getClassNames(styleNames, exportStyleNames),
      []
    );
    return (
      <div ref={ref} className={styles.DockItem}>
        <div className={styles.DockItem__icon}>{icon ?? <IconFile />}</div>
        <div className={styles.DockItem__gutter}></div>
        {/* TODO: Do something with the label  */}
      </div>
    );
  }
);

DockItem.displayName = "DockItem";

export default DockItem;
