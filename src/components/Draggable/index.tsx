import { DragEndEvent, useDraggable } from "@dnd-kit/core";
import { LegacyRef, ReactNode, forwardRef, useState } from "react";
import { Button } from "../ui/button";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";

/**
 * A wrapper that can make any element draggable. Be aware of the most recent ancestor that is relative position. As well, be sure to utilize the `usePosition()` hook
 * @returns A draggable div that has no bounds
 */
export const Draggable = forwardRef(
  (
    {
      id,
      children,
      position,
      className,
    }: {
      id: string | number;
      children: ReactNode;
      position: { x: number; y: number };
      className?: string;
    },
    ref,
  ) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id,
    });

    const style = transform
      ? {
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
      : {};

    return (
      <div
        ref={setNodeRef}
        style={{
          ...style,
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        className={className}
      >
        <div ref={ref as LegacyRef<HTMLDivElement> | undefined}>
          {children}
          <Button
            className="absolute right-2 top-2"
            variant={"ghost"}
            {...listeners}
            {...attributes}
          >
            <DragHandleDots2Icon />
          </Button>
        </div>
      </div>
    );
  },
);

export const usePosition = (defaultPosition?: { x: number; y: number }) => {
  const [position, setPosition] = useState(defaultPosition || { x: 0, y: 0 });
  const handleDragEnd = (e: DragEndEvent) => {
    setPosition((prev) => ({
      x: prev.x + e.delta.x,
      y: prev.y + e.delta.y,
    }));
  };

  return { position, setPosition, handleDragEnd };
};
