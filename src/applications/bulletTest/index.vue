<script setup lang="ts">
import { onMounted } from 'vue';
import { Game, GameObject, resource, RESOURCE_TYPE, UpdateParams } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { Img, ImgSystem } from '@eva/plugin-renderer-img';
import {StatsSystem} from '@eva/plugin-stats';
import { Event, EventSystem, HIT_AREA_TYPE } from '@eva/plugin-renderer-event';

onMounted(() => {
  resource.addResource([
    {
      name: 'imageName',
      type: RESOURCE_TYPE.IMAGE,
      src: {
        image: {
          type: 'png',
          url: '/bunny.png'
            // 'https://gw.alicdn.com/tfs/TB1DNzoOvb2gK0jSZK9XXaEgFXa-658-1152.webp',
        },
      },
      preload: true,
    },
  ]);

  const game = new Game({
    systems: [
      new RendererSystem({
        canvas: document.querySelector('#canvas'),
        width: 1000,
        height: 1000,
        backgroundColor: 0x999999
      }),
      new ImgSystem(),
      new EventSystem({
      // moveWhenInside: true // 代表只有在元素内部才会执行move事件，默认为false
      }),
    ],
  });

  game.addSystem(new StatsSystem({
    show: true, // 这里设置是否显示，设为 false 不会运行。
    style: { // 这里到数值全部都是宽度到百分比 vw 单位
      x: 0,
      y: 8,
      width: 8,
      height: 5
    }
  }));

  const image = new GameObject('image', {
    size: { width: 30, height: 40 },
    origin: { x: 0, y: 0 },
    position: {
      x: 500,
      y: 500,
    },
    anchor: {
      x: 0,
      y: 0,
    },
  });

  image.addComponent(
    new Img({
      resource: 'imageName',
    })
  );

  game.scene.addChild(image);

  const evt = image.addComponent(
    new Event({
      // 使用这个属性设置交互事件可以触发的区域，骨骼动画有所变差，可以临时在当前游戏对象下添加一个同类型同属性的Graphic查看具体点击位置。
      hitArea: {
        type: HIT_AREA_TYPE.Rect,
        style: {
          x: 0,
          y: 0,
          width: 30,
          height: 40
        },
      },
    }),
  );

  let run: () => void = undefined

  evt.on('touchmove', e => {
    // console.log('touchmove', e)
    run = () => {
      // console.log('run', e)
      const transform = e.gameObject.transform;
      transform.position = e.data.position;
    }
  });

  game.ticker.add((e: UpdateParams)=>{
    // console.log(e)
    run && run();
    run = undefined;
  })
})

</script>

<template>
  <div ref="gameContainer">
    <canvas id="canvas" ></canvas>
  </div>
</template>