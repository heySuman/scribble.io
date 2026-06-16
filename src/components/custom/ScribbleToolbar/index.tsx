import { useDrawing } from "@/store/useDrawing";
import { Slider } from "@/components/ui/slider";
import { Eraser, Pencil, Redo, Trash2, Undo } from "lucide-react";

type ScribbleToolbarProps = {
  clearScribble: () => void;
  undo: () => void;
  redo: () => void;
};

export default function ScribbleToolbar({
  clearScribble,
  undo,
  redo,
}: ScribbleToolbarProps) {
  const {
    color: activeColor,
    brushSize,
    eraserSize,
    mode,
    setBrushSize,
    setColor,
    setEraserSize,
    setMode,
  } = useDrawing();

  const activeSize = mode === "eraser" ? eraserSize : brushSize;
  const setActiveSize = mode === "eraser" ? setEraserSize : setBrushSize;

  return (
    <div className="flex gap-4 items-center mx-auto p-4 border w-fit rounded shadow-lg">
      <div
        className="cursor-pointer hover:scale-110 transition-all ease-in-out duration-150"
        onClick={() => setMode("pen")}
      >
        <Pencil />
      </div>

      <div
        className="cursor-pointer hover:scale-110 transition-all ease-in-out duration-150"
        onClick={() => setMode("eraser")}
      >
        <Eraser />
      </div>

      <div>
        <input
          type="color"
          value={activeColor}
          onChange={(e) => setColor(e.target.value)}
          disabled={mode === "eraser"}
          className="w-8 h-8 cursor-pointer hover:scale-110"
        />
      </div>

      <Slider
        defaultValue={[75]}
        step={1}
        min={mode === "eraser" ? 8 : 1}
        max={mode === "eraser" ? 80 : 32}
        value={activeSize}
        onValueChange={(value) => setActiveSize(Number(value))}
        className="mx-auto w-full max-w-xs"
      />

      <div onClick={undo}>
        <Undo />
      </div>

      <div onClick={redo}>
        <Redo />
      </div>

      <div onClick={clearScribble}>
        <Trash2 />
      </div>
    </div>
  );
}
