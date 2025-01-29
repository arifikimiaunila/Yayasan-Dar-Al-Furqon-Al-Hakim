import React from "react";
import { Textarea } from "flowbite-react";

type TextField = {
    nama_form: string,
    isi: string,
    d: String
};

export default function TextArea({nama_form, isi, d}: TextField){
  const properti: String = d.valueOf();
  return (
 <>
 <Textarea
   form={nama_form} wrap="hard" value={isi}
   rows={8} autoFocus={true}
   className="overflow-scroll"
   placeholder="Ketikkan sesuatu..."
   required
   {...properti}
 />
 </>
);}
