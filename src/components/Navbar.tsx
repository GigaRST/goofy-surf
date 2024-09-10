"use client";

import Link from "next/link";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/features/user/userSlice";
import { toast } from "react-toastify";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Drawer from "./Drawer";
import { clearCart, removeItemFromCart } from "@/lib/features/cart/cartSlice";
import Indicator from "./Indicator";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const isLogged = useSelector((state: RootState) => state.user.isLogged);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  const logOut = () => {
    dispatch(logout());
    toast.info("You Logged Out");
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="navbar bg-base-100 px-8">
      <Link href={"/"} className="flex-1">
        <p className="btn btn-ghost text-xl">Goofy Surfer</p>
      </Link>
      <div className="flex-none gap-5">
        {isLogged ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <Avatar
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="navbar-avatar-image"
                width="w-10"
              />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={logOut}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <Button
            onClick={() => router.push("/login")}
            className="w-20"
            variant={"outline"}
          >
            Login
          </Button>
        )}
        <div className="cursor-pointer">
          <Drawer
            title="Your Cart"
            trigger={
              <div className="relative w-full h-full flex items-center">
                <ShoppingCartIcon width={35} />
                <div className="absolute -bottom-4 -right-4">
                  <Indicator itemsNumber={cartItems.length} />
                </div>
              </div>
            }
          >
            <>
              {cartItems.length < 1 ? (
                <h1 className="text-2xl font-bold">There is No Articles</h1>
              ) : (
                <>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <CartCard
                        key={item.id}
                        id={item.id}
                        url={item.url}
                        price={item.price}
                        onClick={() => handleRemoveItem(item.id)}
                      />
                    ))}
                  </div>
                  <p className="text-2xl font-semibold mt-10">
                    Total: {totalPrice}$
                  </p>

                  <Button className="my-3">Buy</Button>
                  <Button onClick={handleClearCart} variant={"outline"}>
                    Remove All
                  </Button>
                </>
              )}
            </>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

interface CartCardProps {
  id: string;
  url: string;
  price: number;
  onClick: () => void;
}

const CartCard: React.FC<CartCardProps> = ({ id, url, price, onClick }) => {
  return (
    <li key={id} className="space-y-2">
      <div className="flex flex-col">
        <div className="w-full border h-40 rounded-lg relative">
          <Image src={url} alt={id} fill className="rounded-lg" />
        </div>
        <p>Price: {price}€ - Quantity:1</p>
      </div>
      <Button onClick={onClick} variant={"accent"} size={"sm"}>
        Remove
      </Button>
    </li>
  );
};
