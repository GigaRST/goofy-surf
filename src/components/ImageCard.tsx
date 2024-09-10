import React from "react";
import ResponsiveImage from "./ResponsiveImage";
import Button from "./Button";
import Checkbox from "./Checkbox";
import {
  addItemToCart,
  removeItemFromCart,
} from "@/lib/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";

interface ImageCardProps {
  imageID: string;
  imageSrc: string;
  imagePrice: number;
  imageAlt: string;
  buttonText: string;
  className?: string;
  onButtonClick?: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  imageID,
  imageSrc,
  imagePrice,
  imageAlt,
  buttonText,
  className,
  onButtonClick,
}) => {
  const dispatch = useDispatch();

  // Controlla se l'elemento è presente nel carrello
  const isItemInCart = useSelector((state: RootState) =>
    state.cart.items.some((item) => item.id === imageID)
  );

  // Gestione del click sulla checkbox
  const handleCheckboxChange = (checked: boolean) => {
    if (checked) {
      // Aggiungi l'elemento al carrello
      dispatch(
        addItemToCart({
          id: imageID,
          url: imageSrc,
          price: imagePrice,
        })
      );
    } else {
      // Rimuovi l'elemento dal carrello
      dispatch(removeItemFromCart(imageID));
    }
  };

  return (
    <div
      className={`relative w-96 h-96 shadow-xl overflow-hidden rounded-lg ${className}`}
    >
      {/* Checkbox gestita dal Redux store */}
      <Checkbox
        label=""
        checked={isItemInCart} // Lo stato checked dipende se l'elemento è nel carrello
        onChange={handleCheckboxChange}
        className="absolute top-2 left-2 z-10"
      />

      <ResponsiveImage
        src={imageSrc}
        alt={imageAlt}
        maxWidth="100%"
        height="100%"
        quality={90}
      />

      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-30 p-4 text-black flex justify-end">
        <Button size={"sm"} className="w-20" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default ImageCard;
