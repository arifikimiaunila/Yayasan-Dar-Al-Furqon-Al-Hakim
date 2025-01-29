import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';
import React from 'react';
import { MegaMenu } from 'flowbite-react';
import { useRoute } from 'ziggy-js';
import { Ziggy } from '@/ziggy.js';

const route = useRoute(Ziggy);

export type mydropface={
  id: number;
  link: string;
  title: string;
}

export default function Dropface(himpunan: mydropface[]): ReactNode{
const route = useRoute(Ziggy);
const listItems: ReactNode=himpunan.map(list=>
<li key={list.id}>
<Link href={route(list.link.valueOf())}
className="hover:text-primary-600 dark:hover:text-primary-500">{list.title}</Link>
</li>);

return(
<>
<MegaMenu.Dropdown>
<div className="mx-auto mt-6 grid max-w-screen-xl
border-y border-gray-200 px-4 py-5 text-sm
text-gray-500 dark:text-gray-400 md:grid-cols-3 md:px-6">
<ul className="space-y-4
sm:mb-4 md:mb-0">
{listItems}
</ul>
</div>
</MegaMenu.Dropdown>
</>
);
}
