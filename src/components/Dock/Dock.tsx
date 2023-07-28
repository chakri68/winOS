import { useEffect, useMemo, useRef, useState } from "react";
import styleNames from "./Dock.module.scss";
import { getClassNames, getScalingFactor } from "@/utils/funcs";
import DockItem, { DockItemProps } from "../DockItem/DockItem";

export type DockProps = {
  dockItems: (DockItemProps & { id: string })[];
};

const exportStyleNames = {
  Dock: "Dock",
  Dock__items: "Dock__items",
  Dock__gutter: "Dock__gutter",
};

export default function Dock({ dockItems }: DockProps) {
  const styles = useMemo(() => getClassNames(styleNames, exportStyleNames), []);

  const dockRef = useRef<HTMLDivElement>(null);
  const dockItemRefs = useRef<HTMLDivElement[]>([]);

  const effectDistance = 75; // Controls the distance at which the effect starts
  const maxScaling = 1.1; // Controls the max scale reached
  const maxElevation = 1.9; // Controls the max margin reached
  const transitionDuration = "0.05s"; // Controls the transition duration

  const [entered, setEntered] = useState(false);

  function mountDockEffect(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const dockItemsRect = dockItemRefs.current.map((dockItem) =>
      dockItem.getBoundingClientRect()
    );

    const y = ev.clientY;

    for (let i = 0; i < dockItemsRect.length; i++) {
      const { top, height } = dockItemsRect[i];
      const scale = getScalingFactor(
        top + height / 2,
        y,
        effectDistance,
        maxScaling
      );
      const marginScale = getScalingFactor(
        top + height / 2,
        y,
        effectDistance,
        maxElevation
      );

      dockItemRefs.current[i].style.margin = `${100 * (scale - 1)}%`;
      dockItemRefs.current[i].style.marginRight = `${(marginScale - 1) * 100}%`;
      if (
        dockItemRefs.current[i].style.transitionDuration === transitionDuration
      )
        setTimeout(() => {
          dockItemRefs.current[i].style.transitionDuration = "0s";
        }, 200);
    }
  }

  function handleMouseLeave() {
    setEntered(false);
    for (const dockItem of dockItemRefs.current) {
      dockItem.style.margin = "0";
      dockItem.style.marginRight = "0";
      dockItem.style.transitionDuration = transitionDuration;
    }
  }

  function handleMouseEnter() {
    setEntered(true);
    for (const dockItem of dockItemRefs.current) {
      dockItem.style.transitionDuration = transitionDuration;
    }
  }

  return (
    <div className={styles.Dock}>
      <div
        className={styles.Dock__items}
        ref={dockRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={entered ? mountDockEffect : undefined}
        onMouseLeave={entered ? handleMouseLeave : undefined}
      >
        {dockItems.map((dockItem, idx) => (
          <DockItem
            key={dockItem.id}
            {...dockItem}
            ref={(ref) => {
              if (ref) dockItemRefs.current[idx] = ref;
            }}
          />
        ))}
      </div>
    </div>
  );
}
