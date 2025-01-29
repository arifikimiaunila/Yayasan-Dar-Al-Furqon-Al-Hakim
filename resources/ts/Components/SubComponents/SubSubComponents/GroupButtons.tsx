import { Button } from "flowbite-react";
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
                    <input type="color" id="color" value="#e66465" className="col-span-3 h-8 w-full rounded-md border border-gray-200 bg-gray-50 p-px px-1 hover:bg-gray-50 group-hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:group-hover:bg-gray-700" aria-label="Pilih salah satu warna!" />
                    <label htmlFor="color" className="col-span-3 text-sm font-medium text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">Pilih warna</label>
                </div>
                <Button.Group outline className="mb-3 grid grid-cols-6 gap-1">
                    {typeof children === 'function' ? children() : children}
                </Button.Group>
            </div>
        </>
    );
}
