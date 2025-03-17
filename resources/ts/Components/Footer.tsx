import getCookie from '@/ts-js part/getCookie';
import {
    Footer,
    FooterCopyright,
    FooterIcon,
  } from "flowbite-react";
import { BsFacebook, BsYoutube } from "react-icons/bs";

export default function Footer(){
const facebookurl: string = getCookie(facebook);
const youtubeurl: string = getCookie(youtube);
const myElement =
<Footer container>
<div className="w-full
sm:flex sm:items-center sm:justify-between">
    <FooterCopyright href="https://www.daralfurqonalhakim.or.id" by="Yayasan Dar Al Furqon Al Hakim™" year={2024} />
    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
        <FooterIcon href={facebookurl} icon={BsFacebook} />
        <FooterIcon href={youtubeurl} icon={BsYoutube} />
    </div>
</div>
</Footer>;
return myElement;
}
