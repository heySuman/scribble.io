import { Colorful } from "@uiw/react-color";
import ColorWheelImg from "@/assets/icons/color-wheel.svg";
import { useState, type Dispatch, type SetStateAction } from "react";

type ColorPickerProps = {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
};

export default function ColorPicker({ color, setColor }: ColorPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center">
      <button
        className="hover:scale-120 transition-all ease-in duration-10"
        onClick={() => setOpen((prev) => !prev)}
      >
        <img src={ColorWheelImg} alt="color wheel img" className="w-6.5" />
      </button>

      {open && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2">
          <Colorful color={color} onChange={(color) => setColor(color.hex)} />
        </div>
      )}
    </div>
  );
}
