import * as DropDownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";
import { Link } from "react-router-dom";
import { SiDell, SiHp, SiLenovo } from "react-icons/si";

function Menu() {
  return (
    <DropDownMenu.Root>
      <DropDownMenu.Trigger className="text-[22px] hover:scale-110 transition-transform duration-300">
        Categories
      </DropDownMenu.Trigger>
      <DropDownMenu.Portal>
        <DropDownMenu.Content
          sideOffset={5}
          className="bg-white rounded-lg min-w-32 text-xl shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade py-4 px-2  "
        >
          <DropDownMenu.Group className="space-y-2">
            <DropDownMenu.Item asChild>
              <Link
                to={""}
                className="flex items-center gap-2 hover:bg-primaryLight py-1 rounded"
              >
                <SiHp />
                HP
              </Link>
            </DropDownMenu.Item>

            <DropDownMenu.Item asChild>
              <Link className="flex items-center gap-2 rounded hover:bg-primaryLight cursor-pointer py-1">
                <SiLenovo />
                Lenovo
              </Link>
            </DropDownMenu.Item>

            <DropDownMenu.Item asChild>
              <Link
                to={""}
                className="flex items-center gap-2 rounded hover:bg-primaryLight cursor-pointer py-1"
              >
                <SiDell />
                Dell
              </Link>
            </DropDownMenu.Item>
          </DropDownMenu.Group>
          <DropDownMenu.Arrow className="fill-white" />
        </DropDownMenu.Content>
      </DropDownMenu.Portal>
    </DropDownMenu.Root>
  );
}

export default Menu;
