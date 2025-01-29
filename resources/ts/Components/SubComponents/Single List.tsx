import { Link } from '@inertiajs/react';
import React from 'react';

interface SingleListProps {
 link: string;
  title: string;
}

export default function SingleList({link, title }: SingleListProps) {
  return (
<>
   <li> <Link href={link} className="block py-2 px-3 text-white bg-blue-700 rounded 
   md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">{title}</Link> </li>
</>
  );
}