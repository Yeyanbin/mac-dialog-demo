<script setup lang="ts">
// import WujieVue from "wujie-vue3";
// const { bus, setupApp, preloadApp, destroyApp } = WujieVue;
const url = 'https://yeyanbin.github.io/yubi-form-joy/dist/#/login';
const submit = (username, password) => {
  console.log('in 主应用', username, password);
}
</script>

<template>
  <div class="com-browser">
    <WujieVue
      width="100%"
      height="100%"
      name="login"
      :url="url"
      :sync="true"
      :props="{
        data: {},
        methods: {
          submit
        }
      }"
    ></WujieVue>
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
