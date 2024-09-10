import { CheckIcon } from "@heroicons/react/16/solid";
import React from "react";

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  onChange,
  className = "",
}) => {
  return (
    <label className={`flex items-center space-x-3 ${className}`}>
      <input
        type="checkbox"
        className={`appearance-none relative h-5 w-5 border-2 rounded-md cursor-pointer 
          ${
            checked ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"
          } 
          transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {checked && (
        <CheckIcon width={20} className="absolute -left-3 cursor-pointer" />
      )}
    </label>
  );
};

export default Checkbox;
