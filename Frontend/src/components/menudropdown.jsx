import * as DropDownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";

function Menu() {
  return (
    <DropDownMenu.Root>
      <DropDownMenu.Trigger className="text-xl">
        Categories
      </DropDownMenu.Trigger>
      <DropDownMenu.Portal className="bg-white">
        <DropDownMenu.Content>
          <DropDownMenu.Item className="px-4 py-2 hover:bg-cyan-400">
            HP
          </DropDownMenu.Item>
          <DropDownMenu.Item>Lenovo</DropDownMenu.Item>
          <DropDownMenu.Item>Dell</DropDownMenu.Item>
        </DropDownMenu.Content>
      </DropDownMenu.Portal>
    </DropDownMenu.Root>
  );
}

export default Menu;
