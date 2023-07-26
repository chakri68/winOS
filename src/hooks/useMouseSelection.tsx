import React, { useState, useRef, useEffect, useCallback } from "react";

/**
 * useMouseSelection
 * @description
 * This hook allows you to select elements by clicking and dragging a box around them. Requires a container element and a selector for the elements you want to select.
 */

type UseMouseSelectionProps = {
  containerRef: React.RefObject<HTMLDivElement>;
  selElQuerySel: string;
  onSelectClassName: string; // TODO: Take a callback instead
  dataAttribute: string;
  percentWidth?: number;
  percentHeight?: number;
};

function handleSelectableElements(
  {
    containerRef,
    selElQuerySel,
    percentWidth,
    onSelectClassName,
    dataAttribute,
    percentHeight,
    selectionBoxRef,
  }: UseMouseSelectionProps & {
    selectionBoxRef: React.MutableRefObject<{
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    }>;
    percentHeight: number;
    percentWidth: number;
  },
  setSelectedElements: React.Dispatch<React.SetStateAction<string[]>>
) {
  // Get the container and its child elements
  const container = containerRef.current;
  const selectableElements = container?.querySelectorAll(selElQuerySel);

  if (container && selectableElements) {
    const selectedIds: string[] = [];

    selectableElements.forEach((element) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const elementCenterX = left + width / 2;
      const elementCenterY = top + height / 2;

      const centeredAreaWidth = (width * percentWidth) / 100;
      const centeredAreaHeight = (height * percentHeight) / 100;

      const isCenterWithinSelection =
        elementCenterX >=
          Math.min(
            selectionBoxRef.current.startX,
            selectionBoxRef.current.endX
          ) -
            centeredAreaWidth / 2 &&
        elementCenterX <=
          Math.max(
            selectionBoxRef.current.startX,
            selectionBoxRef.current.endX
          ) +
            centeredAreaWidth / 2 &&
        elementCenterY >=
          Math.min(
            selectionBoxRef.current.startY,
            selectionBoxRef.current.endY
          ) -
            centeredAreaHeight / 2 &&
        elementCenterY <=
          Math.max(
            selectionBoxRef.current.startY,
            selectionBoxRef.current.endY
          ) +
            centeredAreaHeight / 2;

      if (isCenterWithinSelection) {
        // Assuming the element has a unique "id" attribute
        const id = (element as HTMLDivElement).dataset[dataAttribute];
        if (id) {
          selectedIds.push(id);
          element.classList.add(onSelectClassName);
        } else {
          element.classList.remove(onSelectClassName);
        }
      } else {
        element.classList.remove(onSelectClassName);
      }
    });
    setSelectedElements(selectedIds);
  }
}

const useMouseSelection = ({
  containerRef,
  selElQuerySel,
  onSelectClassName,
  dataAttribute,
  percentHeight = 100,
  percentWidth = 100,
}: UseMouseSelectionProps) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionBox, setSelectionBox] = useState({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  });
  const selectionBoxRef = useRef(selectionBox);
  const [selectedElements, setSelectedElements] = useState<string[]>([]);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      setSelectionBox((prevSelection) => {
        selectionBoxRef.current = {
          ...prevSelection,
          endX: event.clientX,
          endY: event.clientY,
        };
        return {
          ...prevSelection,
          endX: event.clientX,
          endY: event.clientY,
        };
      });

      handleSelectableElements(
        {
          containerRef,
          selElQuerySel,
          percentWidth,
          onSelectClassName,
          dataAttribute,
          percentHeight,
          selectionBoxRef,
        },
        setSelectedElements
      );
    },
    [
      containerRef,
      dataAttribute,
      onSelectClassName,
      percentHeight,
      percentWidth,
      selElQuerySel,
    ]
  );

  const handleMouseUp = useCallback(() => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    setIsSelecting(false);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      setIsSelecting(true);
      setSelectionBox({
        startX: event.clientX,
        startY: event.clientY,
        endX: event.clientX,
        endY: event.clientY,
      });
      selectionBoxRef.current = {
        startX: event.clientX,
        startY: event.clientY,
        endX: event.clientX,
        endY: event.clientY,
      };
      handleSelectableElements(
        {
          containerRef,
          selElQuerySel,
          percentWidth,
          onSelectClassName,
          dataAttribute,
          percentHeight,
          selectionBoxRef,
        },
        setSelectedElements
      );
    },
    [
      containerRef,
      dataAttribute,
      handleMouseMove,
      handleMouseUp,
      onSelectClassName,
      percentHeight,
      percentWidth,
      selElQuerySel,
    ]
  );

  useEffect(() => {
    const container = containerRef.current;

    container?.addEventListener("mousedown", handleMouseDown);

    return () => {
      container?.removeEventListener("mousedown", handleMouseDown);
    };
  }, [containerRef, handleMouseDown, handleMouseMove, handleMouseUp]);

  return { containerRef, isSelecting, selectionBox, selectedElements };
};

export default useMouseSelection;
