<template>
  <div style="padding: 40px;">
    <template v-for="(value, key) in props.dialogProp">
      <n-statistic style="width: 100px;display: inline-block;" :label="key">{{ value }}</n-statistic>
    </template>
  </div>
  <!-- this is login page -->
</template>

<script setup lang="ts">

const props = defineProps({
  dialogProp: Object,
  context: Object,
  dialogItem: Object,
})

console.log('login', props);
</script>

<style scoped>

</style>
