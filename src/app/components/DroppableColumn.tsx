"use client";
import React from "react";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

const DroppableColumn = ({ id, children, className }: Props) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  const style = {
    backgroundColor: isOver ? "rgba(131, 56, 236, 0.05)" : undefined,
    borderRadius: "10px",
    minHeight: "200px",
    transition: "background-color 0.2s ease",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={
        isOver && className ? `${className} dnd-over` : className || undefined
      }
    >
      {children}
    </div>
  );
};

export default DroppableColumn;
