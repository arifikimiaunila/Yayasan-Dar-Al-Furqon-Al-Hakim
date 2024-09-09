import { Head } from '@inertiajs/react';

export default function mainhead(props): HTMLHeadElement {
  let mainhead:HTMLHeadElement =<Head>
<title>
{ props.title }<title>
<meta head-key="description" name="description" content="Website tentang Yayasan Dar Al Furqon Al Hakim" />
<link rel="icon" type="image/x-icon" href="favicon.ico">
</Head>;
return mainhead;
}
