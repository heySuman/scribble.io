import { useDrawing } from "@/store/useDrawing";

type ColorPickerProps = {
  color: string;
  setColor: (color: string) => void;
};

export default function ColorPicker({ color, setColor }: ColorPickerProps) {
  const { color: activeColor } = useDrawing();
  return (
    <div
      className="relative flex items-center rounded-full"
      style={{
        border: color === activeColor ? `2px solid ${color}` : "1px solid transparent",
      }}
    >
      <button
        className="w-8 h-8 rounded-full border hover:scale-105 transition-all ease-in duration-10"
        style={{
          background: color,
        }}
        onClick={() => setColor(color)}
      />
    </div>
  );
}
