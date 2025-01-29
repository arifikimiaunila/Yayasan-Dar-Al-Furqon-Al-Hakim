import Dropface, { mydropface } from '@/Components/SubComponents/DropFaces';
import { useRoute } from 'ziggy-js';
import { Ziggy } from './ziggy.js';
import { 
  MegaMenu,
  MegaMenuDropdownToggle,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle
} from 'flowbite-react';
import { HiChevronDown } from 'react-icons/hi';
import React from 'react';
import LogIn from '@/Components/SubComponents/LogIn';

export function Guestnav() {
const route = useRoute(Ziggy);
const yayasans: mydropface[]=[
        {id: 1, link: "'posts.show', 1", title: 'Sejarah Yayasan'},
        {id: 2, link: "'posts.show', 2", title: 'AD/ART Yayasan'},
        {id: 3, link: "'pengurus_yayasan.index'", title: 'Pengurus Yayasan'},
{id: 4, link: "'posts.show', 3", title: 'Fasilitas Yayasan'},
{id: 5, link: "'datayayasan.show', 1", title: 'Kontak Yayasan'}
];
const tk: mydropface[]= [
        {link: "'posts.show', 4", title: 'Sejarah TK'},
        {link: "'posts.show', 5", title: 'AD/ART TK'},
        {link: "'pengurus_yayasan.index'", title: 'Pengurus TK'},
{link: "'posts.show', 6", title: 'Fasilitas TK'},
{link: "'datayayasan.show', 1", title: 'Kontak TK'}
];
const info: mydropface[]=[
        {link: "'fles.index'", title: 'Pengumuman'},
        {link: "'video.index'", title: 'video' }
];

return(
<>
<MegaMenu>
  <NavbarBrand href="/">
    <img alt="" src="/favicon.svg" 
    className="mr-3 h-6 
    sm:h-9" />
    <span className="self-center whitespace-nowrap 
    text-xl font-semibold dark:text-white">Yayasan Dar Al Furqon Al Hakim</span>
  </NavbarBrand>
  <div>
    <LogIn/>
  </div>
  <NavbarToggle />
  <NavbarCollapse>
    <NavbarLink link={ route('home') }>Beranda</NavbarLink>
    <MegaMenuDropdownToggle>
      Yayasan
      <HiChevronDown className="ml-2" />
    </MegaMenuDropdownToggle>
    <MegaMenuDropdownToggle>
      TK
      <HiChevronDown className="ml-2" />
    </MegaMenuDropdownToggle>
    <NavbarLink link="https://smpafbs.sch.id">SMP</NavbarLink>
    <NavbarLink link="https://smaafbs.sch.id">SMA</NavbarLink>
    <MegaMenuDropdownToggle>
      Info
      <HiChevronDown className="ml-2" />
    </MegaMenuDropdownToggle>
    </NavbarCollapse>  
<Dropface himpunan = {yayasans} />
<Dropface himpunan = {tk} />
<Dropface himpunan = {info} />
</MegaMenu>
</>
);
};
