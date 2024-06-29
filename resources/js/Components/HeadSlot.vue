<script setup>
import { Head } from '@inertiajs/vue3'

defineProps({ title: String })
</script>

 <template>
 <Head>
<title><slot></slot></title>
<meta head-key="description" name="description" content="Website tentang Yayasan Dar Al Furqon Al Hakim" />
<link rel="icon" type="image/x-icon" href="favicon.ico">
</Head>
</template>