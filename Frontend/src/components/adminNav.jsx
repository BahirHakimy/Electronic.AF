import React from "react";
import {
  AiOutlinePieChart,
  AiOutlineShopping,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiCommentEdit, BiUser, BiUserPin } from "react-icons/bi";
import { FaBoxes } from "react-icons/fa";

import { useLocation } from "react-router-dom";
import NavItem from "./navItem";

const navs = [
  { link: "/admin", title: "Dashboard", Icon: AiOutlinePieChart },
  { link: "/admin/staff", title: "Staff", Icon: BiUser },
  { link: "/admin/products", title: "Products", Icon: AiOutlineShopping },
  { link: "/admin/customers", title: "Customers", Icon: BiUserPin },
  { link: "/admin/orders", title: "Orders", Icon: AiOutlineShoppingCart },
  { link: "/admin/reviews", title: "Reviews", Icon: BiCommentEdit },
  { link: "/admin/stock", title: "Stock", Icon: FaBoxes },
];

function Nav() {
  const { pathname } = useLocation();

  return (
    <ul className="bg-cyan-600 w-10 md:w-52 h-screen">
      <li className="w-full text-center mt-5">
        <div className="w-20 h-20 p-2 m-auto bg-slate-50 rounded-xl">
          <img src="/logo120.png" width={120} height={120} alt="logo" />
        </div>
      </li>
      {navs.map((nav) => (
        <NavItem
          key={nav.title}
          link={nav.link}
          title={nav.title}
          active={nav.link === pathname}
          Icon={nav.Icon}
        />
      ))}
    </ul>
  );
}

export default Nav;
