
<template>
  <div class="container">
    <WindowContainer/>
  </div>
</template>


<script setup lang="ts">
import WindowContainer from '@/layout/WindowContainer/index.vue';

</script>

<style lang="scss" scoped>
.container {
  background-color: #000;
  background: url(https://pic2.zhimg.com/v2-2762684d8dfc5c0e8e561f0c362eccc0_r.jpg?source=1940ef5c);
  background-size: cover;
  // padding: 10px;
  display: flex;
  height: 100vh;
  width: 100vw;

  > div {
    margin: 20px;
  }
}
</style>
