import { Button } from "flowbite-react";

type ButtonProps = {
  children: string | JSX.Element | JSX.Element[] | (()=>JSX.Element);
}


export default function GroupButtons({children}: ButtonProps) {
    return (
        <>
            <div id="textColorDropdown" className="z-10 hidden w-48 rounded bg-white p-2 shadow dark:bg-gray-700">
                <div className="grid grid-cols-6 gap-2 group mb-3 items-center p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input type="color" id="color" value="#e66465" className="border-gray-200 border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-md p-px px-1 hover:bg-gray-50 group-hover:bg-gray-50 dark:group-hover:bg-gray-700 w-full h-8 col-span-3" aria-label="Pilih salah satu warna!" />
                    <label htmlFor="color" className="text-gray-500 dark:text-gray-400 text-sm font-medium col-span-3 group-hover:text-gray-900 dark:group-hover:text-white">Pick a color</label>
                </div>
                <Button.Group outline className="grid grid-cols-6 gap-1 mb-3">
                    {typeof children === 'function' ? children() : children}
                </Button.Group>
            </div>
        </>
    );
}
