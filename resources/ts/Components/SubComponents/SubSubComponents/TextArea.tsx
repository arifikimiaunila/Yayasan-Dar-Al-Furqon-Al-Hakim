import React from "react";

type  TextProps = {
  tujuan: string,
  judul: string,
  tambahan: string
}

export default function TextArea({tujuan, judul, tambahan}:TextProps){
let x: number= tambahan.length;
let d: String= tambahan.substring(0, x);
return (
 <>
 <label htmlFor={tujuan} className="sr-only" {...d}>{judul}</label>
 <textarea
   id="editor"
   rows={8}
   className="block w-full px-0 text-sm text-gray-800 bg-white border-0 
     dark:bg-gray-800 dark:focus:ring-0 dark:text-white dark:placeholder-gray-400"
   placeholder="Write an article..."
   required
   {...d}
 ></textarea>
  </>
);}
