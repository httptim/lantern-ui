"use client";

import * as React from "react";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/registry/lantern/ui/menubar";

export default function MenubarDemo() {
  const [lineNumbers, setLineNumbers] = React.useState(true);
  const [wordWrap, setWordWrap] = React.useState(false);
  const [theme, setTheme] = React.useState("lantern");
  const [turtle, setTurtle] = React.useState("turtle-07");

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New program <MenubarShortcut>Ctrl N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Open... <MenubarShortcut>Ctrl O</MenubarShortcut>
          </MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Open recent</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>excavate.lua</MenubarItem>
              <MenubarItem>startup.lua</MenubarItem>
              <MenubarItem>guestbook.lua</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Save <MenubarShortcut>Ctrl S</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Save to disk... <MenubarShortcut>Shift Ctrl S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem variant="destructive">Close editor</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>Ctrl Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>Ctrl Y</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Cut <MenubarShortcut>Ctrl X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Copy <MenubarShortcut>Ctrl C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Paste <MenubarShortcut>Ctrl V</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Find <MenubarShortcut>Ctrl F</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked={lineNumbers} onCheckedChange={setLineNumbers}>
            Line numbers
          </MenubarCheckboxItem>
          <MenubarCheckboxItem checked={wordWrap} onCheckedChange={setWordWrap}>
            Word wrap
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarLabel inset>Theme</MenubarLabel>
          <MenubarRadioGroup value={theme} onValueChange={setTheme}>
            <MenubarRadioItem value="lantern">Lantern</MenubarRadioItem>
            <MenubarRadioItem value="amber">Amber monitor</MenubarRadioItem>
            <MenubarRadioItem value="green">Green monitor</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Turtle</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Run program <MenubarShortcut>F5</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Stop <MenubarShortcut>Ctrl T</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarLabel inset>Upload to</MenubarLabel>
          <MenubarRadioGroup value={turtle} onValueChange={setTurtle}>
            <MenubarRadioItem value="turtle-07">turtle-07</MenubarRadioItem>
            <MenubarRadioItem value="turtle-12">turtle-12</MenubarRadioItem>
            <MenubarRadioItem value="miner-01">miner-01</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem disabled>Refuel (no coal)</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
