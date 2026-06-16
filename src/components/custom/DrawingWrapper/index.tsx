import ScribbleToolbar from "../ScribbleToolbar";
import { useDrawing } from "@/store/useDrawing";
import { useRef, useEffect, type MouseEvent } from "react";
import DrawingCanvas from "../DrawingCanvas";

type Point = { x: number; y: number };

export default function DrawingWrapper() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isDrawing = useRef(false);
  const lastPoint = useRef<Point | null>(null);

  const { color, brushSize, eraserSize, mode } = useDrawing();

  const snapshots = useRef<ImageData[]>([]);

  const getCtx = () => {
    const canvas = canvasRef.current;
    return canvas ? canvas.getContext("2d") : null;
  };

  const toCanvasPoint = (e: MouseEvent): Point => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const saveSnapshot = () => {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    snapshots.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    if (snapshots.current.length > 50) snapshots.current.shift();
  };

  const undo = () => {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas || snapshots.current.length === 0) return;
    const snap = snapshots.current.pop()!;
    ctx.putImageData(snap, 0, 0);
  };

  const applyToolSettings = (ctx: CanvasRenderingContext2D) => {
    if (mode === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = eraserSize;
      ctx.strokeStyle = "rgba(0,0,0,1)";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.lineWidth = brushSize;
      ctx.strokeStyle = color;
    }
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  const handleMouseDown = (e: MouseEvent) => {
    const ctx = getCtx();
    if (!ctx) return;

    saveSnapshot();

    const point = toCanvasPoint(e);
    isDrawing.current = true;
    lastPoint.current = point;

    applyToolSettings(ctx);

    ctx.beginPath();
    ctx.arc(
      point.x,
      point.y,
      (mode === "eraser" ? eraserSize : brushSize) / 2,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDrawing.current) return;
    const ctx = getCtx();
    if (!ctx || !lastPoint.current) return;

    const point = toCanvasPoint(e);

    applyToolSettings(ctx);

    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();

    lastPoint.current = point;
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    lastPoint.current = null;
  };

  const handleMouseLeave = () => {
    isDrawing.current = false;
    lastPoint.current = null;
  };

  const clearCanvas = () => {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    saveSnapshot();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Shortcut/Undo : ctrl + Z or cmd + Z
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        undo();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <ScribbleToolbar clearScribble={clearCanvas} undo={undo} />
      <DrawingCanvas
        ref={canvasRef}
        handleMouseDown={handleMouseDown}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
        handleMouseLeave={handleMouseLeave}
      />
    </>
  );
}
