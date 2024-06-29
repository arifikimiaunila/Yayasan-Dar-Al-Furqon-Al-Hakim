<script setup lang='ts'>
import { createApp } from 'vue'
import { Link } from '@inertiajs/vue3'

 interface Props {
  yayasans: any,
pengurusyayasans: any,
tk: any,
sekolahmenengah: any
info: any
}

const props = withDefaults(defineProps<Props>(), {
yayasans: ()=>[
        {name: 'Sejarah Yayasan', url:( 'posts.show', 1)},
        {name: 'AD/ART Yayasan', url: ( 'posts.show', 2)}],
pengurusyayasans: ()=>[
        {name: 'Pengurus Yayasan', url: ('pengurus_yayasan.index')},
{name: 'Fasilitas Yayasan', url: ('posts.show', 3)},
{name: 'Kontak Yayasan', url: ('datayayasan.show', 1)}
],
tk: ()=> [
        {name: 'Sejarah TK', url:( 'posts.show', 4)},
        {name: 'AD/ART TK', url: ( 'posts.show', 5)},
        {name: 'Pengurus TK', url: 'pengurus_yayasan.index'},
{name: 'Fasilitas TK', url: ('posts.show', 6)},
{name: 'Kontak TK', url: ('datayayasan.show', 1)}
],
sekolahmenengah: ()=> [
        {name: 'SMP', url: 'https://smpafbs.sch.id/'},
        {name: 'SMA', url: 'https://www.smaafbs.sch.id/'}
],
info: ()=> [
        {name: 'Pengumuman', url: 'fles.index'},
        {name: 'video', url: 'video.index'}
]
}
)
</script>
   <template>
<nav id="guestnavlink" class="a354-bar a354-mobile a354-light-grey ">
<Link :href="route('home')" class="a354-bar-item a354-button">Home</Link>
<div class="a354-dropdown-click" >
      <button class="a354-button" v-show="showDiv" v-for="x in yayasans">
    <Link class="a354-bar-item w3-button" :href="route(x.url)">{{ x.name }}</Link>
 </button>
</div>
<div class="a354-dropdown-click" >
      <button class="a354-button" v-show="showDiv" v-for="x in tk">
    <Link class="a354-bar-item a354-button" :href="route(x.url)">{{ x.name }}</Link>
 </button>
</div>
<div v-for="x in sekolahmenengah">
    <Link class="a354-bar-item a354-button" :href="route(x.url)">{{ x.name }}</Link>
</div>
<div class="a354-dropdown-click" >
      <button class="a354-button" v-show="showDiv" v-for="x in info">
    <Link class="a354-bar-item a354-button" :href="route(x.url)">{{ x.name }}</Link>
 </button>
</div>
</nav>
</template>