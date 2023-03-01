<script setup lang="ts">
import iframeBrowserVue from '../components/iframeBrowser.vue';
const url = 'https://yeyanbin.github.io/yubi-form-joy/dist/#/login';
const submit = (username, password) => {
  console.log('in 主应用', username, password);
}
</script>

<template>
  <div class="com-browser">
    <iframeBrowserVue :url="url"></iframeBrowserVue>
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
