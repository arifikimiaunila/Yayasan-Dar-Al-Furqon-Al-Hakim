import { Button, Label, TextInput } from "flowbite-react";
import React, { JSX } from "react";

type ButtonProps = {
  children: string | JSX.Element | JSX.Element[] | (()=>JSX.Element);
}


export default function GroupButtons({children}: ButtonProps) {
    return (
        <>
            <div id="textColorDropdown" className="z-10 hidden w-48 rounded bg-white p-2 shadow 
            dark:bg-gray-700">
                <div className="group mb-3 grid grid-cols-6 items-center gap-2 rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-600">
                    <TextInput type="color" id="color" placeholder="#e66465"  aria-label="Pilih salah satu warna!" />
                    <Label htmlFor="color" value="Pilih warna"/>
                </div>
                <Button.Group outline className="mb-3 grid grid-cols-6 gap-1">
                    {typeof children === 'function' ? children() : children}
                </Button.Group>
            </div>
        </>
    );
}