import useYear  from '@/ts part/presentYear.ts';
import getCookie from '@/ts part/getCookie.ts';
import LogosFacebook from '@/Components/Assets/Logo Facebook.tsx';
import LogosYoutubeIcon from '@/Components/Assets/Logo YouTube.tsx';

export default function footer(){
let facebook: String = getCookie(facebook);
let youtube: String = getCookie(youtube);
let x: number = useYear();
const myElement = <footer className="bg-white-400 rounded-lg shadow sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8 dark:bg-gray-800 antialiased"> 
<p className="mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0"> 
Hak Cipta &copy;{(x) != 2024 ? "2024-".concate(String(x)): "2024"}dimiliki oleh Yayasan Dar Al Furqon Al Hakim.
</p> 
<div className="flex justify-center items-center space-x-1">
 <a href={facebook} data-tooltip-target="tooltip-facebook" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600">
<Icon icon="logos:facebook" ssr={true} /> 
<span className="sr-only">
Facebook
</span> 
</a> 
<div id="tooltip-facebook" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"> Like us on Facebook <div className="tooltip-arrow" data-popper-arrow>
</div>
</div> 
<a href={youtube} data-tooltip-target="tooltip-twitter" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"><Icon icon="logos:youtube-icon" ssr={true} />
 <span class="sr-only">
YouTube
</span>
</a><div id="tooltip-youtube" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"> 
Follow us on YouTube
<div class="tooltip-arrow" data-popper-arrow>
</div>
</div></div> </footer>;
return myElement;
}
