import React, { useContext } from "react";
import ShoppingCart from "../cartBadge/CartBadge.jsx";
import { SideBarContext } from "../../context/SideBarContext/SideBarContext.jsx";

function NavBar() {
  const { isOpen, setIsOpen } = useContext(SideBarContext);
  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen)}>
        <ShoppingCart className="cursor-pointer" />
      </div>
    </div>
  );
}

export default NavBar;
