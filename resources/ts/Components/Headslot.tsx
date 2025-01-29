import { Head } from '@inertiajs/react';
import React, { JSXElementConstructor } from 'react';
import { ReactNode } from 'react';

export function mainhead(title: string): ReactNode{
  return 
  <>
  <Head>
    <title>{title}</title>
    <meta head-key="description" name="description" content="Website tentang Yayasan Dar Al Furqon Al Hakim" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
  </Head>
  </>
};

