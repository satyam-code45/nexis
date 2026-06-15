"use client";

import { useEffect, useRef, useState } from "react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

const RightPanel = ({ children }: { children: React.ReactNode }) => {
  const [chatWidth, setChatWidth] = useState(580);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newWidth = window.innerWidth - e.clientX;

      if (newWidth >= 380 && newWidth <= 700) {
        setChatWidth(newWidth);
      }
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);
  const isChatOpen = true;

  return (
  <aside
  className={cn(
    "relative flex flex-col bg-[#f5f7fb] dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-500 ease-in-out",
    isChatOpen
      ? "max-w-[700px] opacity-100" // fully open
      : "max-w-0 opacity-0"          // fully closed
  )}
  style={{
    flexBasis: isChatOpen ? chatWidth : 0,
  }}
>
  {/* Resize handle */}
  {isChatOpen && (
    <div
      ref={dragRef}
      onMouseDown={() => setIsDragging(true)}
      className={cn(
        "absolute left-0 top-0 h-full w-2 cursor-col-resize group transition-colors duration-200",
        isDragging
          ? "bg-blue-400/30 dark:bg-blue-400/20"
          : "hover:bg-blue-300/20 dark:hover:bg-blue-300/10"
      )}
    >
      <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-400 group-hover:text-blue-500 transition-colors duration-200">
        <GripVertical size={16} />
      </div>
    </div>
  )}

  {children}
</aside>
  );
};

export default RightPanel;
