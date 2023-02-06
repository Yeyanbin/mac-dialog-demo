<script setup lang="ts">
import { onMounted } from 'vue';
import { Game, GameObject, resource, RESOURCE_TYPE, UpdateParams } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { Img, ImgSystem } from '@eva/plugin-renderer-img';
import { Event, EventSystem, HIT_AREA_TYPE } from '@eva/plugin-renderer-event';
import { getUrlPrefix } from '../../utils/image';
import { getDistance, rotateToPoint } from '../utils/base';
import useMonster from '../hooks/useMonster';

onMounted(() => {
  const canvas = document.querySelector('#move') as HTMLCanvasElement;

  resource.addResource([
    {
      name: 'bearImg',
      type: RESOURCE_TYPE.IMAGE,
      src: {
        image: {
          type: 'png',
          url: getUrlPrefix() + '/bunny.png'
        },
      },
      preload: true,
    },
  ]);

  const game = new Game({
    systems: [
      new RendererSystem({
        canvas,
        width: 1000,
        height: 800,
        backgroundColor: 0x999999
      }),
      new ImgSystem(),
      new EventSystem({
      // moveWhenInside: true // 代表只有在元素内部才会执行move事件，默认为false
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

  canvas.addEventListener('click', (ev) => {
    ev.stopPropagation()
  });
  canvas.addEventListener('mousedown', (ev) => {
    bearMonster.move(ev.offsetX, ev.offsetY);
    ev.stopPropagation()
  });
})

</script>

<template>
  <div>
    <canvas id="move" ></canvas>
  </div>
</template>