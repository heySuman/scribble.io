import { create } from "zustand";

type DrawingStoreProps = {
  mode: "pen" | "eraser";
  brushSize: number;
  eraserSize: number;
  color: string;
};

type DrawingActionProps = {
  setMode: (mode: "pen" | "eraser") => void;
  setBrushSize: (size: number) => void;
  setEraserSize: (size: number) => void;
  setColor: (color: string) => void;
};

export const useDrawing = create<DrawingStoreProps & DrawingActionProps>()(
  (set) => ({
    color: "#000",
    eraserSize: 4,
    mode: "pen",
    brushSize: 4,

    setMode: (mode: "pen" | "eraser") => set({ mode }),
    setBrushSize: (size: number) => set({ brushSize: size }),
    setColor: (color: string) => set({ color }),
    setEraserSize: (size: number) => set({ eraserSize: size }),
  }),
);
