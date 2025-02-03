import { Carousel } from "flowbite-react";
import React, { forwardRef} from "react";


interface Props {
    tautan: string;
}

const gambars: Props[] = [
    {tautan: "" }
];

type Ref = HTMLImageElement;

const Kodegambar = forwardRef<Ref, Props>(({tautan}, ref)=>(gambars.map(gambar=>
<img src={tautan.valueOf()} alt="Gambar tidak ada!" loading="lazy" />)));

export function Header(): React.JSX.Element {
  return (
    <header className="
    p-[60px] content-center bg-none bg-transparent h-86 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel pauseOnHover>
        <Kodegambar tautan={""} />
      </Carousel>
    </header>
  );
}
