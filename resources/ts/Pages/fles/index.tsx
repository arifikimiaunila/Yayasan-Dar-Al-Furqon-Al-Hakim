<script lang='ts'>
import Headslot from '@/Components/HeadSlot.vue'
import GuestLayout from '@/Layout/GuestLayout.vue'
import tableslot from '@/Components/tableslot.vue'
import Footer from '@/Components/Footer.vue'
import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { Link} from '@inertiajs/vue3'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    fields: string,
    fles: any
  },
  setup(props) {
    props.fields,
    props.fles
  },
data() { 
return { 
fields: ['No. Urut', 'Nama File']
 }
},
layout: (h, page) => h(GuestLayout, [page])
})

const page: object = usePage() 
const files: [] = computed(() => page.props.fles)

</script>
<style>
.css-serial{
counter-set: serial-number 1;
}
.css-serial td:first-child:before{
counter-increment: serial-number;
content: counter(serial-number);
}
</style>
<template>
  
<Headslot>File-file</Headslot>

<GuestLayout>
<main class="a354-container ">
<h2 class="a354-sans-serif a354-wide a354-xxxlarge">Daftar Unduhan</h2>

<tableslot>
<tr v-for="file in files" class="a354-small a354-text-orange">
<td></td>
<td><Link :href="route('file.show', 'file.file_id')">{{file.nama_file}}</Link></td>
</tr>
</tableslot>
</main>
</GuestLayout>

</template>
