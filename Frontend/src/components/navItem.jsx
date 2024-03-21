import React from "react";
import clsx from "clsx";

function NavItem({ title = "", active = false, link, Icon = null }) {
  const containerClasses = clsx(
    "flex flex-col relative",
    active &&
      "before:content-[''] before:self-end before:w-6 before:h-4 before:bg-slate-50 after:content-[''] after:self-end after:w-6 after:h-4 after:bg-slate-50"
  );
  const linkClasses = clsx(
    "p-3 flex md:space-x-4 items-center font-medium antialiased transition",
    active && "rounded-l-full text-cyan-900",
    active
      ? "bg-slate-50 text-cyan-900"
      : "bg-cyan-600  text-slate-50 hover:bg-cyan-500 "
  );
  return (
    <li className={containerClasses}>
      {active && (
        <div className="w-6 h-4 bg-cyan-600 self-end absolute rounded-br-xl " />
      )}
      <a href="/admin" className={linkClasses}>
        <Icon size="25" />
        <p className="hidden md:block">{title}</p>
      </a>
      {active && (
        <div className="w-6 h-4 bg-cyan-600 self-end absolute bottom-0 rounded-tr-xl " />
      )}
    </li>
  );
}

export default NavItem;
