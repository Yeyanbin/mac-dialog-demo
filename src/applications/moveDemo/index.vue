<script setup lang="ts">
import { onMounted } from 'vue';
import { Game, GameObject, resource, RESOURCE_TYPE, UpdateParams } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { Img, ImgSystem } from '@eva/plugin-renderer-img';
import { Event, EventSystem, HIT_AREA_TYPE } from '@eva/plugin-renderer-event';
import { getUrlPrefix } from '../../utils/image';
import { getDistance, rotateToPoint } from '../utils/base';

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


  let bearPosition = {
    offsetX: 0,
    offsetY: 0,
  };
  const bulletSpeed = 5;
  let isMove = false;

  canvas.addEventListener('click', (ev) => {
    ev.stopPropagation()
  });
  canvas.addEventListener('mousedown', (ev) => {
    ev.stopPropagation()
    isMove = true;
    const { offsetX, offsetY } = ev;
    bearPosition = { offsetX, offsetY };
    bear.transform.rotation = rotateToPoint(offsetX, offsetY, bear.transform.position.x, bear.transform.position.y);
  });



  game.ticker.add((e: UpdateParams)=>{
    if (isMove) {
      const position = bear.transform.position;
      position.x += Math.cos(bear.transform.rotation) * bulletSpeed;
      position.y += Math.sin(bear.transform.rotation) * bulletSpeed;

      if (
        getDistance(position.x + Math.cos(bear.transform.rotation) * bulletSpeed, position.y + Math.sin(bear.transform.rotation) * bulletSpeed, bearPosition.offsetX, bearPosition.offsetY)
      > getDistance(position.x, position.y, bearPosition.offsetX, bearPosition.offsetY)) {
        isMove = false;
      }
    }
  })
})

</script>

<template>
  <div>
    <canvas id="move" ></canvas>
  </div>
</template>