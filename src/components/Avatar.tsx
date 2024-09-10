import Image from "next/image";
import React from "react";

interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
  width?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, className, width }) => {
  return (
    <div className={`avatar ${className}`}>
      <div className={width}>
        <Image src={src} alt={alt} className="rounded-full" fill />
      </div>
    </div>
  );
};

export default Avatar;
