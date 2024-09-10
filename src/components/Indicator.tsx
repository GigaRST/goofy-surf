import React from "react";

interface IndicatorProps {
  itemsNumber: number;
}

const Indicator: React.FC<IndicatorProps> = ({ itemsNumber }) => {
  if (itemsNumber < 1) return;

  return (
    <span className="indicator-item badge badge-secondary animate-pulse w-7 h-7">
      {itemsNumber}+
    </span>
  );
};

export default Indicator;
