<script setup lang="ts">
import { ref, onMounted } from 'vue'

const browserRef = ref<HTMLDivElement>();
// const url = ref("https://www.naiveui.com/zh-CN/os-theme/components/icon");
const url = ref("https://yeyanbin.github.io/yubi-blog/");

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
    <iframe ref="browserRef" @haschange="log" @load="log" :src="url"></iframe>
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
