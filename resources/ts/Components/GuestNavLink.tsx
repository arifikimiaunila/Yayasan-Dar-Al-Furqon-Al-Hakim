import dropface from '@/ts part/SubComponents/Drop Faces.tsx;
import SingleList from '@/ts part/SubComponents/Single List.tsx;
import { useRoute } from 'ziggy-js';

export default function GuestNav(){
const route: string = useRoute();
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
const links: string = "router('home')";
return(
<nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
<Judul />
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
<div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
<SingleList link={links.valueOf()} title="Home"/>
<dropface mtitle="Yayasan" himpunan=yayasan />
<dropface mtitle="TK" himpunan=tk />
<SingleList link="https://smpafbs.sch.id" title="SMP" />
<SingleList link="https://smaafbs.sch.id" title="SMA" />
 <dropface mtitle="Info" himpunan=info />
</div> </div></nav>);
}
