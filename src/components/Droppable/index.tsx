import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

export const Droppable = ({
  id,
  children,
}: {
  id: number | string;
  children?: ReactNode;
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};
