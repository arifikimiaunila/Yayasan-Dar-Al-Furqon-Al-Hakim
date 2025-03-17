import Guestnav from '@/Components/GuestNavLink';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import React, { ReactNode } from 'react';

type Props = {children: ReactNode}

export default function Guest({children}: Props) {
    return (
        <>
        <Guestnav/>
        <Header/>
        <div className="w-full
        sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
        {children}
        </div>
        <Footer/>
       </>
    );
}
