<script setup lang="ts">

import { computeHit, IHitObj } from './games/utils/hit_copy';
import Layout from './layout/index.vue';

const bullets: IHitObj[] = [
  {
    x_1: 4, 
    x_2: 7,
    y_1: 1,
    y_2: 7,
    index: 1,
  },
  {
    x_1: 12,
    x_2: 15,
    y_1: 4,
    y_2: 10,
    index: 2,
  },
  {
    x_1: 2,
    x_2: 5,
    y_1: 20,
    y_2: 25,
    index: 3,
  },
];

const monsters: IHitObj[] = [
  {
    x_1: 6, 
    x_2: 10,
    y_1: 6,
    y_2: 15,
    index: 1,
  },
  {
    x_1: 1,
    x_2: 2.5,
    y_1: 14,
    y_2: 22,
    index: 2,
  }
];

computeHit(bullets, monsters, (bullet, monster) => {
  console.log(`子弹${bullet.name} ${bullet.index} 击中了怪物${monster.name} ${monster.index}`);
})
</script>

<template>
  <div>
    <Layout></Layout>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

body {
  margin: 0;
}
</style>
