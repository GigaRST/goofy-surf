import React from "react";
import ResponsiveImage from "./ResponsiveImage";
import Button from "./Button";

interface CollectionCardProps {
  imageSrc: string;
  imageAlt: string;
  spot: string;
  day: string;
  creator: string;
  picture: number;
  buttonText: string;
  className?: string;
  onButtonClick?: () => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  imageSrc,
  imageAlt,
  spot,
  day,
  creator,
  picture,
  buttonText,
  className,
  onButtonClick,
}) => {
  return (
    <div
      className={`relative w-96 h-96 shadow-xl overflow-hidden rounded-lg ${className}`}
    >
      <ResponsiveImage
        src={imageSrc}
        alt={imageAlt}
        maxWidth="100%"
        height="100%"
        quality={90}
      />

      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-50 p-4 text-black font-semibold">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">{spot}</h2>
          <p>
            <span className="font-normal">Creator</span>: {creator}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p>{day}</p>
          <p>
            <span className="font-normal">Pictures</span>: {picture}
          </p>
        </div>
        <div className="card-actions justify-end mt-2">
          <Button className="w-30" onClick={onButtonClick}>
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
