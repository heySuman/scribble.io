import { useRef } from "react";

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleMouseDown = () => {};
  const handleMouseMove = () => {};
  const handleMouseUp = () => {};

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    ></canvas>
  );
}
