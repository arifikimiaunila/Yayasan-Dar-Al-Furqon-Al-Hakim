import { Button} from "flowbite-react";
import React from "react";
import { ReactNode, forwardRef} from "react";

interface Props {
  tipe: "button";
  dhcolor: string, 
  namacolor?: ReactNode,
  }

type Ref = HTMLButtonElement;

const warnas: Props[] = [
    { dhcolor: "#1A56DB", namacolor: "Biru", tipe: "button" },
    { dhcolor: "#0E9F6E", namacolor: "Hijau", tipe: "button" },
    { dhcolor: "#FACA15", namacolor: "Kuning", tipe: "button" },
    { dhcolor: "#F05252", namacolor: "Merah", tipe: "button" },
    { dhcolor: "#FF8A4C", namacolor: "Oranye", tipe: "button" },
    { dhcolor: "#0694A2", namacolor: "Teal", tipe: "button" },
    { dhcolor: "#8DA2FB", namacolor: "Indigo", tipe: "button" },
    { dhcolor: "#5145CD", namacolor: "Ungu", tipe: "button" },
    { dhcolor: "#771D1D", namacolor: "Coklat", tipe: "button" },
    { dhcolor: "#FCD9BD", namacolor: "Oranye Terang", tipe: "button" },
    { dhcolor: "#99154B", namacolor: "Bordo", tipe: "button" },
    { dhcolor: "#7E3AF2", namacolor: "Ungu Gelap", tipe: "button" },
    { dhcolor: "#CABFFD", namacolor: "Light", tipe: "button" },
    { dhcolor: "#D61F69", namacolor: "Pink Gelap", tipe: "button" },
    { dhcolor: "#F8B4D9", namacolor: "Pink", tipe: "button" },
    { dhcolor: "#F6C196", namacolor: "Krim", tipe: "button" },
    { dhcolor: "#A4CAFE", namacolor: "Biru Terang", tipe: "button" },
    { dhcolor: "#5145CD", namacolor: "Biru Gelap", tipe: "button" },
    { dhcolor: "#B43403", namacolor: "Oranye Coklat", tipe: "button" },
    { dhcolor: "#FCE96A", namacolor: "Kuning Terang", tipe: "button" },
    { dhcolor: "#1E429F", namacolor: "Biru Laut", tipe: "button" },
    { dhcolor: "#768FFD", namacolor: "Ungu Terang", tipe: "button" },
    { dhcolor: "#BCF0DA", namacolor: "Hijau Terang", tipe: "button" },
    { dhcolor: "#EBF5FF", namacolor: "Biru Langit", tipe: "button" },
    { dhcolor: "#16BDCA", namacolor: "Cyan", tipe: "button" },
    { dhcolor: "#E74694", namacolor: "Pink", tipe: "button" },
    { dhcolor: "#83B0ED", namacolor: "Biru Langit Gelap", tipe: "button" },
    { dhcolor: "#03543F", namacolor: "Hijau Hutan", tipe: "button" },
    { dhcolor: "#111928", namacolor: "Hitam", tipe: "button" },
    { dhcolor: "#4B5563", namacolor: "Batu", tipe: "button" },
    { dhcolor: "#6B7280", namacolor: "Abu-abu", tipe: "button" },
    { dhcolor: "#D1D5DB", namacolor: "Abu-abu Terang", tipe: "button" },
    { dhcolor: "#F3F4F6", namacolor: "Abu-abu Awan", tipe: "button" },
    { dhcolor: "#F9FAFB", namacolor: "Abu-abu Langit", tipe: "button" },
];
   
export const ColorLists = forwardRef<Ref, Props>((_Props, ref)=>(warnas.map(warna=>
<Button outline gradientDuoTone="purpleToBlue"
  data-hex-color={warna.dhcolor} ref={ref} style={{ backgroundColor: warna.dhcolor }} type={warna.tipe}>
  {warna.namacolor}
  </Button>)));
