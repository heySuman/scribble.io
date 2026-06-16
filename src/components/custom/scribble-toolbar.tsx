import { useState } from "react";
import ColorPicker from "./ColorPicker";
import { Circle } from "@uiw/react-color";
import { colors } from "@/constant/colors";
import { Eraser, Pencil } from "lucide-react";

export default function ScribbleToolbar() {
  const [activeColor, setActiveColor] = useState<string>("#000");

  return (
    <div className="flex gap-6 items-center mx-auto p-4 border w-fit rounded bg-muted shadow-lg">
      <div>
        <Pencil />
      </div>
      <div>
        <Eraser />
      </div>
      {/* color picker */}
      <div>
        <div>
          <Circle
            colors={colors}
            onChange={(color) => setActiveColor(color.hex)}
          />
        </div>
      </div>
      {/* color picker wheel */}
      <div>
        <ColorPicker color={activeColor} setColor={setActiveColor} />
      </div>
    </div>
  );
}
