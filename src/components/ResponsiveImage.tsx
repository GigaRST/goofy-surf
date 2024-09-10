import React from "react";
import Image from "next/image";

interface ResponsiveImageProps {
  src: string;
  alt?: string;
  height?: string;
  maxWidth?: string;
  quality?: number;
  className?: string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt = "Image",
  maxWidth = "100%",
  height = "300px",
  quality = 75,
  className,
}) => {
  return (
    <div
      className={className}
      style={{
        width: maxWidth,
        height: height,
        position: "relative",
        overflow: "hidden", // Nasconde l'eventuale eccesso
      }}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill" // Usa layout fill per riempire il contenitore
        objectFit="cover" // Assicura che l'immagine copra l'intera area mantenendo l'aspect ratio
        objectPosition="center" // Centra l'immagine
        quality={quality} // Imposta la qualità dell'immagine
        priority // Priorità di caricamento per immagini importanti
      />
    </div>
  );
};

export default ResponsiveImage;
