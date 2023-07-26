import { useState, useRef, useEffect, useCallback } from "react";

const useDraggable = (parentRef: React.RefObject<HTMLDivElement>) => {
  const ref = useRef<HTMLDivElement>(null);
  const offset = useRef({ x: 0, y: 0 });
  const { left: parentLeftOffset, top: parentTopOffset } =
    parentRef.current?.getBoundingClientRect() ?? { left: 0, top: 0 };
  const [position, setPosition] = useState({
    x: parentLeftOffset,
    y: parentTopOffset,
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    if (e.movementX === 0 && e.movementY === 0) return; // Prevents unnecessary re-renders
    console.log("MOVE");
    const x = e.clientX - offset.current.x;
    const y = e.clientY - offset.current.y;
    setPosition({ x, y });
  }, []);

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();

      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    },
    [handleMouseMove]
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mousemove", handleMouseMove);
      if (!ref.current) {
        console.warn("ref.current is null");
        return;
      }
      const { left, top } = ref.current.getBoundingClientRect();
      offset.current = {
        x: e.clientX - left,
        y: e.clientY - top,
      };
    },
    [handleMouseMove, handleMouseUp]
  );

  useEffect(() => {
    const containerRef = ref.current;

    containerRef?.addEventListener("mousedown", handleMouseDown);

    return () => {
      containerRef?.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleMouseDown]);

  useEffect(() => {
    const { left: parentLeftOffset, top: parentTopOffset } =
      parentRef.current?.getBoundingClientRect() ?? { left: 0, top: 0 };
    setPosition({
      x: parentLeftOffset,
      y: parentTopOffset,
    });
  }, [parentRef]);

  return {
    ref,
    style: {
      position: "absolute",
      left: position.x - parentLeftOffset,
      top: position.y - parentTopOffset,
    } as React.CSSProperties,
  };
};

export default useDraggable;
