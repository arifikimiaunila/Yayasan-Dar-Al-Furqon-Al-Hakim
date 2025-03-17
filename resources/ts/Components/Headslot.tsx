import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import favicon from '@/assets/favicon.ico'

export function Mainhead(title: string): ReactNode{
  return
  <>
  <Head>
    <title>{title}</title>
    <meta head-key="description" name="description" content="Website tentang Yayasan Dar Al Furqon Al Hakim" />
    <link rel="icon" type="image/x-icon" href={favicon} />
  </Head>
  </>
};

