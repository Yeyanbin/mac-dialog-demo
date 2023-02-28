<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { Game, GameObject, resource, RESOURCE_TYPE, UpdateParams } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { Img, ImgSystem } from '@eva/plugin-renderer-img';
import { Event, EventSystem, HIT_AREA_TYPE } from '@eva/plugin-renderer-event';
import { getUrlPrefix } from '../../utils/image';
import { getDistance, rotateToPoint } from '../utils/base';
import useMonster from '../hooks/useMonster';
import useKeyRotation from '../hooks/useKeyRotation';

onMounted(() => {
  onUnmounted(() => {
    console.log('销毁')
    game.destroy();
  })
  const canvas = document.querySelector('#move') as HTMLCanvasElement;

  const game = new Game({
    systems: [
      new RendererSystem({
        canvas,
        width: 1000,
        height: 800,
        backgroundColor: 0x1099bb
      }),
      new ImgSystem(),
      new EventSystem({
      }),
    ],
  });

  const bear = new GameObject('image', {
    size: { width: 30, height: 40 },
    origin: { x: 0.5, y: 0.5 },
    position: {
      x: 500,
      y: 500,
    },
    anchor: {
      x: 0,
      y: 0,
    },
  });

  bear.addComponent(
    new Img({
      resource: 'bearImg',
    })
  );

  game.scene.addChild(bear);

  const bearMonster = useMonster(bear, game);
  
  const bearKeyRotation = useKeyRotation();
  game.ticker.add((e: UpdateParams)=>{
    if ((bearMonster.monster.moveRotation = bearKeyRotation.getKeyRotation()) !== undefined) {
      bearMonster.moveByRotation();
    } else {
      bearMonster.stopMove();
    }
  });
})

</script>

<template>
  <div>
    <canvas id="move" ></canvas>
  </div>
</template>