<script setup lang='ts'>
import { route } from 'ziggy-js'
import { Ziggy } from './ziggy.js'

route('home', undefined, undefined, Ziggy);

  const app = Vue.createApp({
   data() {
    return {
yayasans: [
        {name: 'Sejarah Yayasan', url:( 'posts.show', 1)},
        {name: 'AD/ART Yayasan', url: ( 'posts.show', 2)},
        {name: 'Pengurus Yayasan', url: 'pengurus_yayasan.index'},
{name: 'Fasilitas Yayasan', url: ('pengurus_yayasan.index', 3)},
{name: 'Kontak Yayasan', url: ('datayayasan.show', 1)}
],
tk: [
        {name: 'Sejarah TK', url:( 'posts.show', 1)},
        {name: 'AD/ART TK', url: ( 'posts.show', 2)},
        {name: 'Pengurus TK', url: 'pengurus_yayasan.index'},
{name: 'Fasilitas TK', url: ('pengurus_yayasan.index', 3)},
{name: 'Kontak TK', url: ('datayayasan.show', 1)}
],
sekolahmenengah: [
        {name: 'SMP', url: 'https://smpafbs.sch.id/'},
        {name: 'SMA', url: 'https://www.smaafbs.sch.id/'}
],
info: [
        {name: 'Pengumuman', url: 'fles.index'},
        {name: 'video', url: 'video.index'}
],
showDiv: true
}
}
});
app.mount('#guestnavlink');
</script>
   <template>
<nav id="guestnavlink" class="a354-bar a354-mobile a354-light-grey ">
<a :href="$route('home')" class="a354-bar-item a354-button">Home</a>
<div class="a354-dropdown-click" >
      <button class="a354-button" v-show="showDiv" v-for="x in yayasans">
    <a class="a354-bar-item w3-button" :href="$route(x.url)">{{ x.name }}</a>
 </button>
</div>
<div class="a354-dropdown-click" >
      <button class="a354-button" v-show="showDiv" v-for="x in tk">
    <a class="a354-bar-item a354-button" :href="$route(x.url)">{{ x.name }}</a>
 </button>
</div>
<div v-for="x in sekolahmenengah">
    <a class="a354-bar-item a354-button" :href="$route(x.url)">{{ x.name }}</a>
</div>
<div class="a354-dropdown-click" >
      <button class="a354-button" v-show="showDiv" v-for="x in info">
    <a class="a354-bar-item a354-button" :href="$route(x.url)">{{ x.name }}</a>
 </button>
</div>
</nav>
</template>