import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SiApple, SiAsus, SiDell, SiHp, SiLenovo } from "react-icons/si";
import { BsChevronDown } from "react-icons/bs";

const MyDropdown = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => setOpen(!open);

  return (
    <div onClick={handleClick} className="hidden  lg:inline-block relative ">
      <div className="flex items-center gap-2">
        <h1 className="text-xl cursor-pointer">Categories</h1>
        <BsChevronDown size={24} />
      </div>
      <div
        hidden={open}
        className="absolute bg-white shadow-xl w-48 rounded-md border-2  py-2"
      >
        <Link to={"category/APPLE"}>
          <div className="flex  items-center gap-4 hover:bg-primary hover:text-white py-3 rounded-md pl-2 ">
            <SiApple size={24} />
            <span>Apple</span>
          </div>
        </Link>
        <Link to={"category/HP"}>
          <div className="flex  items-center gap-4 hover:bg-primary hover:text-white py-3 rounded-md pl-2 ">
            <SiHp size={24} />
            <span className="text-xl">HP</span>
          </div>
        </Link>

        <Link to={"category/DELL"}>
          <div className="flex  items-center gap-4 hover:bg-primary hover:text-white py-3 rounded-md pl-2  ">
            <SiDell size={24} />
            <span>Dell</span>
          </div>
        </Link>

        <Link to={"category/LENOVO"}>
          <div className="flex  items-center gap-4 hover:bg-primary hover:text-white py-3 rounded-md pl-2 ">
            <SiLenovo size={24} />
            <span>Lenovo</span>
          </div>
        </Link>

        <Link to={"category/ASUS"}>
          <div className="flex  items-center gap-4 hover:bg-primary hover:text-white py-3 rounded-md pl-2">
            <SiAsus size={24} />
            <span>Asus</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MyDropdown;
