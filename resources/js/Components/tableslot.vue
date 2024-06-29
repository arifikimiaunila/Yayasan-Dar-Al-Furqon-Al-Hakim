<script setup lang='ts'>
interface Props {
  fields: string[]
}

</script>
<template>
  </div>
<table class="a354-table-all a354-striped a354-hoverable a354-bordered css-serial">
  <thead>
    <tr class="a354-center a354-large a354-text-blue">
      <!-- loop through each value of the fields to get the table header -->
      <th  v-for="field in fields" :key='field' > 
    <b>  
  {{field}}
</b>
       </th>
    </tr>
  </thead>
  <tbody>
      <slot></slot>
  </tbody>
</table> 
</template>