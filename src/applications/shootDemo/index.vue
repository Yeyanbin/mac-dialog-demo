<script setup lang="ts">
import { onMounted } from 'vue';
import { Game, GameObject, resource, RESOURCE_TYPE, UpdateParams } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { Img, ImgSystem } from '@eva/plugin-renderer-img';
import { StatsSystem } from '@eva/plugin-stats';
import { Event, EventSystem, HIT_AREA_TYPE } from '@eva/plugin-renderer-event';
import { Sprite, SpriteSystem } from '@eva/plugin-renderer-sprite';
import { Text, TextSystem } from '@eva/plugin-renderer-text';

onMounted(() => {

  const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
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
    {
      name: 'bullet',
      type: RESOURCE_TYPE.IMAGE,
      src: {
        image: {
          type: 'png',
          url: '/carrot.png'
        },
      },
      preload: true,
    },
    {
      name: 'spriteName',
      type: RESOURCE_TYPE.SPRITE,
      src: {
        image: {
          type: 'png',
          url: 'https://gw.alicdn.com/tfs/TB1ONLxOAL0gK0jSZFAXXcA9pXa-900-730.png'
        },
      },
      preload: true
    }
  ]);

  const game = new Game({
    systems: [
      new RendererSystem({
        canvas: canvas,
        width: 1000,
        height: 1000,
        backgroundColor: 0x1099bb
      }),
      new ImgSystem(),
      new EventSystem({
        // moveWhenInside: true // 代表只有在元素内部才会执行move事件，默认为false
      }),
      new SpriteSystem(),
      new TextSystem()
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

  image.addComponent(
    new Img({
      resource: 'imageName',
    })
  );

  game.scene.addChild(image);

  // canvas.addEventListener('touchstart', (ev) => {
  //   ev.stopPropagation()
  //   console.log('touchstart', ev);
  // });

  canvas.addEventListener('mousedown', (ev) => {
    ev.stopPropagation()
    console.log('mousedown', ev);
    const { offsetX, offsetY } = ev;
    // image.transform.rotation = 
    shoot(rotateToPoint(offsetX, offsetY, image.transform.position.x, image.transform.position.y), image.transform.position);
  });

  const bulletSpeed = 2;
  const bullets: GameObject[] = [];

  function shoot(rotation, startPosition) {
    const bulletsGameObj = new GameObject('gameObject1', {
      size: { width: 25, height: 12 },
      origin: { x: 0.5, y: 0.5 },
      position: startPosition,
      rotation
    })
    bulletsGameObj.addComponent(
      new Img({
        resource: 'bullet',
      })
    );
    bullets.push(bulletsGameObj);
    game.scene.addChild(bulletsGameObj);
  }


  canvas.addEventListener('mousemove', (ev) => {
    ev.stopPropagation()
    const { offsetX, offsetY } = ev;
    image.transform.rotation = rotateToPoint(image.transform.position.x, image.transform.position.y, offsetX, offsetY);
  });


  canvas.addEventListener('click', (ev) => {
    ev.stopPropagation()
  });


  const rotateToPoint = (mx, my, px, py) => {
    const dist_Y = my - py;
    const dist_X = mx - px;
    const angle = Math.atan2(dist_Y, dist_X);
    return angle;
  }

  game.ticker.add((e: UpdateParams) => {
    // console.log(text)
    text.components[1].text = `当前子弹数量为：${bullets.length}`
    for (let b = bullets.length - 1; b >= 0; b--) {
      // console.log(bullets[b], b)
      const position = bullets[b].transform.position;
      position.x += Math.cos(bullets[b].transform.rotation) * bulletSpeed;
      position.y += Math.sin(bullets[b].transform.rotation) * bulletSpeed;
      if (position.x > 1100 || position.x < -100) {
        const gameObj = bullets.splice(b, 1);
        gameObj.forEach(item => {
          game.scene.removeGameObject(item);
        })
      } else if (position.y > 1100 || position.y < -100) {
        const gameObj = bullets.splice(b, 1);
        gameObj.forEach(item => {
          game.scene.removeGameObject(item);
        })
      }
    }
    // console.log(bullets)
  });

  const text = new GameObject('text', {
    position: {
      x: 200,
      y: 200
    },
    origin: {
      x: 0.5,
      y: 0.5
    },
    anchor: {
      x: 0.5,
      y: 0.5
    }
  })

  text.addComponent(
    new Text({
      text: '欢迎使用EVA互动游戏开发体系！',
      style: {
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#b35d9e', '#84c35f', '#ebe44f'], // gradient
        fillGradientType: 1,
        fillGradientStops: [0.1, 0.4],
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 400,
        breakWords: true
      }
    })
  )

  game.scene.addChild(text);
})




</script>

<template>
  <div ref="gameContainer">
    <canvas id="canvas"></canvas>
  </div>
</template>