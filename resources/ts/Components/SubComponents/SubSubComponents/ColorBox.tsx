import { Button } from "flowbite-react";
import React from "react";
import { forwardRef} from "react";
import { ColorProps } from './ColorProps';

type Ref = HTMLButtonElement;
export function ColorBox({dhcolor, namacolor}: ColorProps){
// eslint-disable-next-line @typescript-eslint/no-array-constructor

const warnas: ColorProps[] = [
    { dhcolor: "#1A56DB", namacolor: "Blue", tipe: "button" },
    { dhcolor: "#0E9F6E", namacolor: "Green", tipe: "button" },
    { dhcolor: "#FACA15", namacolor: "Yellow", tipe: "button" },
    { dhcolor: "#F05252", namacolor: "Red", tipe: "button" },
    { dhcolor: "#FF8A4C", namacolor: "Orange", tipe: "button" },
    { dhcolor: "#0694A2", namacolor: "Teal", tipe: "button" },
    { dhcolor: "#8DA2FB", namacolor: "Indigo", tipe: "button" },
    { dhcolor: "#5145CD", namacolor: "Purple", tipe: "button" },
    { dhcolor: "#771D1D", namacolor: "Brown", tipe: "button" },
    { dhcolor: "#FCD9BD", namacolor: "Light Orange", tipe: "button" },
    { dhcolor: "#99154B", namacolor: "Bordo", tipe: "button" },
    { dhcolor: "#7E3AF2", namacolor: "Dark Purple", tipe: "button" },
    { dhcolor: "#CABFFD", namacolor: "Light", tipe: "button" },
    { dhcolor: "#D61F69", namacolor: "Dark Pink", tipe: "button" },
    { dhcolor: "#F8B4D9", namacolor: "Pink", tipe: "button" },
    { dhcolor: "#F6C196", namacolor: "Cream", tipe: "button" },
    { dhcolor: "#A4CAFE", namacolor: "Light Blue", tipe: "button" },
    { dhcolor: "#5145CD", namacolor: "Dark Blue", tipe: "button" },
    { dhcolor: "#B43403", namacolor: "Orange Brown", tipe: "button" },
    { dhcolor: "#FCE96A", namacolor: "Light Yellow", tipe: "button" },
    { dhcolor: "#1E429F", namacolor: "Navy Blue", tipe: "button" },
    { dhcolor: "#768FFD", namacolor: "Light Purple", tipe: "button" },
    { dhcolor: "#BCF0DA", namacolor: "Light Green", tipe: "button" },
    { dhcolor: "#EBF5FF", namacolor: "Sky Blue", tipe: "button" },
    { dhcolor: "#16BDCA", namacolor: "Cyan", tipe: "button" },
    { dhcolor: "#E74694", namacolor: "Pink", tipe: "button" },
    { dhcolor: "#83B0ED", namacolor: "Darker Sky Blue", tipe: "button" },
    { dhcolor: "#03543F", namacolor: "Forest Green", tipe: "button" },
    { dhcolor: "#111928", namacolor: "Black", tipe: "button" },
    { dhcolor: "#4B5563", namacolor: "Stone", tipe: "button" },
    { dhcolor: "#6B7280", namacolor: "Gray", tipe: "button" },
    { dhcolor: "#D1D5DB", namacolor: "Light Gray", tipe: "button" },
    { dhcolor: "#F3F4F6", namacolor: "Cloud Gray", tipe: "button" },
    { dhcolor: "#F9FAFB", namacolor: "Heaven Gray", tipe: "button" },
];
   
const ColorLists= forwardRef<Ref, ColorProps>((ColorProps, ref)=>(warnas.map(warna=><Button outline gradientDuoTone="purpleToBlue"
  data-hex-color={warna.dhcolor} ref={ref} style={{ backgroundColor: warna.dhcolor }} type={warna.tipe}>
  {warna.namacolor}
  </Button>)));

const ColorButton: React.JSX.Element = 
<div id="textColorDropdown" class="z-10 hidden w-48 rounded bg-white p-2 shadow dark:bg-gray-700"> <div class="grid grid-cols-6 gap-2 group mb-3 items-center p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"> <input type="color" id="color" value="#e66465" class="border-gray-200 border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-md p-px px-1 hover:bg-gray-50 group-hover:bg-gray-50 dark:group-hover:bg-gray-700 w-full h-8 col-span-3" /> <label for="color" class="text-gray-500 dark:text-gray-400 text-sm font-medium col-span-3 group-hover:text-gray-900 dark:group-hover:text-white">Pick a color</label> </div> 
<Button.Group>
{ColorLists}
</Button.Group>
</div>
;

return ColorButton;