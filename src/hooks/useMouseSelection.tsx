import React, { useState, useRef, useEffect, useCallback } from "react";

const useMouseSelection = () => {
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [selectionBox, setSelectionBox] = useState({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((event: MouseEvent) => {
    console.log({ event });
    setIsSelecting(true);
    setSelectionBox({
      startX: event.clientX,
      startY: event.clientY,
      endX: event.clientX,
      endY: event.clientY,
    });
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isSelecting) {
        setSelectionBox((prevSelection) => ({
          ...prevSelection,
          endX: event.clientX,
          endY: event.clientY,
        }));
      }
    },
    [isSelecting]
  );

  const handleMouseUp = useCallback(() => {
    setIsSelecting(false);
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    container?.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      container?.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  return { containerRef, isSelecting, selectionBox };
};

export default useMouseSelection;
