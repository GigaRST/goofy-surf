"use client";

import BackPageButton from "@/components/BackPageButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ResponsiveImage from "@/components/ResponsiveImage";
import {
  addItemToCart,
  removeItemFromCart,
} from "@/lib/features/cart/cartSlice";
import { RootState } from "@/lib/store";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";

const mediaDetails = {
  spot: "Arrifana Beach",
  day: "2024-09-10",
  prize: 5,
  url: "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp",
};

export default function MediaDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const dispatch = useDispatch();

  const isItemInCart = useSelector((state: RootState) =>
    state.cart.items.some((item) => item.id === id)
  );

  const buttonText = isItemInCart ? "REMOVE FROM CART" : "ADD TO CART";

  const buttonActions = () => {
    if (isItemInCart) {
      dispatch(removeItemFromCart(id));
    } else {
      dispatch(
        addItemToCart({ id, url: mediaDetails.url, price: mediaDetails.prize })
      );
    }
  };

  return (
    <div className="h-[calc(100vh-70px)] px-10 py-5 flex flex-col gap-y-5">
      <BackPageButton />
      <div className="grid grid-cols-3 gap-x-10 h-full">
        <div className="col-span-full col-end-3 ring ring-gray-300 rounded-lg">
          <ResponsiveImage
            src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
            height="100%"
            className="rounded-lg"
          />
        </div>

        <div className="flex flex-col justify-between">
          <h1 className="text-3xl font-bold">Image Detail</h1>
          <div className="space-y-5">
            <Detail label="ID" value={id} />
            <Detail label="Spot" value={mediaDetails.spot} />
            <Detail label="Day" value={mediaDetails.day} />
            <Detail label="Prize" value={mediaDetails.prize + "$"} />
          </div>
          <Button
            onClick={buttonActions}
            variant={isItemInCart ? "outline" : "primary"}
          >
            {buttonText} <ShoppingCartIcon width={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

const Detail = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div>
      <label className="font-semibold">{label}:</label>
      <Input readOnly value={value} className="mt-1" />
    </div>
  );
};
