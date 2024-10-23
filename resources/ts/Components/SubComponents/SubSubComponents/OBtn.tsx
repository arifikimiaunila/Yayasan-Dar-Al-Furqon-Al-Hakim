import { Button } from "flowbite-react";

interface MyButtonProps {
  /** The text to display inside the button */
children?: string|React.ReactNode;
form_id: string;
type: string;
URL: string;
ftype: string;
methods: string;
target: string;
ID-element: string;
aksi: string;
nama: string;
nilai: number|string;
tambahan: string;
}

export default function OBtn({children, form_id, type, URL, ftype, methods, target, ID-element, aksi, nama, nilai, tambahan}: MyButtonProps) {
let x: number= tambahan.length;
if(typeof children == "string){
  return (
<Button autofocus form={form_id} type={type} {type="submit" && formaction={URL}} {type = "submit" && formenctype={ftype}} {type="submit" && formmethod={methods}} { type="submit" && formtarget={target}}  popovertarget={ID-element} popovertargetaction={aksi} name={nama} value={nilai} {tambahan.substr(0, x)}>
      {children}
</Button>
  );}
else {
return (
<Button autofocus form={form_id} type={type} {type="submit" && formaction={URL}} {type = "submit" && formenctype={ftype}} {type="submit" && formmethod={methods}} { type="submit" && formtarget={target}}  popovertarget={ID-element} popovertargetaction={aksi} name={nama} value={nilai} {tambahan.substr(0, x)} outline>
      {children}
</Button>
  );}
}














