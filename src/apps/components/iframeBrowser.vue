<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'

const props = defineProps({
    url: String
});

const browserRef = ref<HTMLDivElement>();

onMounted(() => {
  console.log(browserRef);
  browserRef.value.onload = (ev) => {
    console.log('browser onloading', ev);
  }
});

const log = (...arg) => {
  console.log('log', ...arg);
  const [ev] = arg;
  ev.path.forEach(item => {
    console.dir(item);
  });
}

</script>

<template>
  <div class="com-browser">
    <iframe ref="browserRef" @haschange="log" @load="log" :src="props.url"></iframe>
  </div>
</template>

<style scoped lang="scss">
.com-browser {
  height: 100%;

  iframe {
    height: 100%;
    width: 100%;
  }
}
</style>
