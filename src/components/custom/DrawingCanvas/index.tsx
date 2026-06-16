import { type ForwardedRef, type MouseEvent } from "react";

type DrawingCanvasProps = {
  width?: number;
  height?: number;
  ref: ForwardedRef<HTMLCanvasElement>;
  handleMouseDown: (e: MouseEvent) => void;
  handleMouseMove: (e: MouseEvent) => void;
  handleMouseUp: () => void;
  handleMouseLeave: () => void;
};

export default function DrawingCanvas({
  ref,
  width = 800,
  height = 500,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleMouseLeave,
}: DrawingCanvasProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-gray-50 min-h-screen">
      <div className="rounded-xl shadow-lg overflow-hidden">
        <canvas
          ref={ref}
          width={width}
          height={height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        />
      </div>
    </div>
  );
}
