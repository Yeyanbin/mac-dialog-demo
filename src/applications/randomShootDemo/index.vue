<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { Game, GameObject, UpdateParams } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { Img, ImgSystem } from '@eva/plugin-renderer-img';
import { StatsSystem } from '@eva/plugin-stats';
import { Text, TextSystem } from '@eva/plugin-renderer-text';
import { getUrlPrefix } from '../../utils/image';
import { destory, getRandomRotate, getShootStartPosition } from '../utils/base';
import useKeyRotation from '../hooks/useKeyRotation';
import useMonster from '../hooks/useMonster';

import { appMap } from '../config';

onMounted(() => {
  onUnmounted(() => {
    console.log('销毁')
    game.destroy();
  })

  document.querySelector('#dialogContent').addEventListener('message', (event) => {
      console.log('dialogContent addEventListener message', event);
      const data: any = event.detail;
      // Do something with the data
      if (data.name === appMap.randomShootVue.name) {
        if (data.type === 'closeDialog') {
          // destory(game, [bear])
          console.log('关闭')
        }
      }
  });
  console.log('onMounted')
  const canvas = document.querySelector('#autoShoot') as HTMLCanvasElement;
  // canvas.willReadFrequently = true;
  const game = new Game({
    systems: [
      new RendererSystem({
        canvas,
        width: 1000,
        height: 800,
        backgroundColor: 0x1099bb,
      }),
      // new Event
      new ImgSystem(),
      new TextSystem()
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

  game.addSystem(new StatsSystem({
    show: true, // 这里设置是否显示，设为 false 不会运行。
    style: { // 这里到数值全部都是宽度到百分比 vw 单位
      x: 90,
      y: 0,
      width: 8,
      height: 5
    }
  }));

  game.scene.addChild(bear);

  const bulletSpeed = 2;
  const bullets: GameObject[] = [];
  const firingRate = 50;
  let lastShootTime = Date.now();

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

  game.ticker.add((e: UpdateParams) => {
    (text.components[1] as any).text = `当前子弹数量为：${bullets.length}`
    for (let b = bullets.length - 1; b >= 0; b--) {
      // console.log(bullets[b], b)
      const position = bullets[b].transform.position;
      position.x += Math.cos(bullets[b].transform.rotation) * bulletSpeed;
      position.y += Math.sin(bullets[b].transform.rotation) * bulletSpeed;
      if (position.x > 1100 || position.x < -100) {
        const gameObj = bullets.splice(b, 1);
        gameObj.forEach(item => {
          game.scene.removeGameObject(item);
          item.destroy();
        })
      } else if (position.y > 1100 || position.y < -100) {
        const gameObj = bullets.splice(b, 1);
        gameObj.forEach(item => {
          game.scene.removeGameObject(item);
          item.destroy();
        })
      }
    }

    if (Date.now() - lastShootTime > firingRate) {
      const randomRotation = getRandomRotate()
      shoot(randomRotation, getShootStartPosition(bear.transform.position, randomRotation, 40));
      lastShootTime = Date.now();
    }
    // console.log(bullets)
  });

  const text = new GameObject('text', {
    position: {
      x: 200,
      y: 50
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

  const p2 = new GameObject('image', {
    size: { width: 30, height: 40 },
    origin: { x: 0.5, y: 0.5 },
    position: {
      x: 300,
      y: 500,
    },
    anchor: {
      x: 0,
      y: 0,
    },
  });
  p2.addComponent(
    new Img({
      resource: 'bearImg',
    })
  );
  const p2Monster = useMonster(p2, game);
  const p2KeyRotation = useKeyRotation();

  const p2Name = new GameObject('text', {
    position: {
      x: 0,
      y: 30
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
  p2Name.addComponent(
    new Text({
      text: '瑟瑟发抖的你',
      style: {
        fontSize: 16,
        fontStyle: 'italic',
        fontWeight: 'bold',
        padding: 5,
      }
    })
  );
  p2.addChild(p2Name);

  game.scene.addChild(text);
  game.scene.addChild(p2);

  const bearMonster = useMonster(bear, game);
  
  const bearKeyRotation = useKeyRotation({
    up: 'w',
    down: 's',
    left: 'a',
    right: 'd'
  });
  
  game.ticker.add((e: UpdateParams)=>{
    if ((bearMonster.monster.moveRotation = bearKeyRotation.getKeyRotation()) !== undefined) {
      bearMonster.moveByRotation();
    } else {
      bearMonster.stopMove();
    }
    if ((p2Monster.monster.moveRotation  = p2KeyRotation.getKeyRotation()) !== undefined) {
      p2Monster.moveByRotation();
    } else {
      p2Monster.stopMove();
    }
  });
  
})




</script>

<template>
  <div>
    <canvas id="autoShoot" willReadFrequently="true"></canvas>
  </div>
</template>