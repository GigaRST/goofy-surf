import { ReactNode } from "react";

interface DrawerProps {
  trigger: ReactNode;
  children: ReactNode;
  title: string;
}

const Drawer: React.FC<DrawerProps> = ({ trigger, children, title }) => {
  return (
    <div className="drawer drawer-end">
      <input id="cart-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="cart-drawer" className="drawer-button btn btn-ghost">
          {trigger}
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="cart-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <h1 className="text-3xl font-bold mb-10">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
