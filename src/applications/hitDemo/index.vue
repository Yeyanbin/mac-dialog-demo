<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { Game, GameObject, resource, RESOURCE_TYPE, UpdateParams } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { Img, ImgSystem } from '@eva/plugin-renderer-img';
import { StatsSystem } from '@eva/plugin-stats';
import { Sprite, SpriteSystem } from '@eva/plugin-renderer-sprite';
import { Text, TextSystem } from '@eva/plugin-renderer-text';
import { getUrlPrefix } from '../../utils/image';
import { getRandomRotate, getShootStartPosition, isRectangleOverlap } from '../utils/base';
import useKeyRotation from '../hooks/useKeyRotation';
import useMonster, { IMonster } from '../hooks/useMonster';

onMounted(() => {
  onUnmounted(() => {
    console.log('销毁')
    game.destroy();
    game.destroySystems();
    console.log('resource', resource)
    // resource.destroy('bearImg');
    // resource.destroy('bullet').then(() => {
    //   console.log('resource', resource)
    // })
  })
  const canvas = document.querySelector('#hitDemo') as HTMLCanvasElement;
  // resource.addResource([
  // {
  //     name: 'bearImg',
  //     type: RESOURCE_TYPE.IMAGE,
  //     src: {
  //       image: {
  //         type: 'png',
  //         url: getUrlPrefix() + '/bunny.png'
  //       },
  //     },
  //     preload: true,
  //   },
  //   {
  //     name: 'bullet',
  //     type: RESOURCE_TYPE.IMAGE,
  //     src: {
  //       image: {
  //         type: 'png',
  //         url: getUrlPrefix() + '/carrot.png'
  //       },
  //     },
  //     preload: true,
  //   },
  // ]);

  const game = new Game({
    systems: [
      new RendererSystem({
        canvas,
        width: 1000,
        height: 800,
        backgroundColor: 0x1099bb
      }),
      new ImgSystem(),
      new SpriteSystem(),
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
  const firingRate = 1;
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

  canvas.addEventListener('mousemove', (ev) => {
    ev.stopPropagation()
    // const { offsetX, offsetY } = ev;
  });


  canvas.addEventListener('click', (ev) => {
    ev.stopPropagation()
  });

  const hitObject = [];
  const bulletWidth = 10;
  const bulletHeight = 10;
  let hitTime = 0;

  game.ticker.add((e: UpdateParams) => {
    (text.components[1] as any).text = `当前子弹数量为：${bullets.length}, 被击中次数为：${hitTime}`
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
      hitObject.forEach((monster: IMonster) => {
        if (isRectangleOverlap({
          x: position.x - bulletWidth * 0.5,
          y: position.y - bulletHeight * 0.5,
          width: bulletWidth,
          height: bulletHeight
        }, {
          x: monster.obj.transform.position.x - monster.width * 0.5,
          y: monster.obj.transform.position.y - monster.height * 0.5,
          width: monster.width,
          height: monster.height,
        })) {
          console.log('被击中了喔');
          ++hitTime;
          const gameObj = bullets.splice(b, 1);
          gameObj.forEach(item => {
            game.scene.removeGameObject(item);
            item.destroy();
          });
        }
      });
    }

    if (Date.now() - lastShootTime > firingRate) {
      const randomRotation = getRandomRotate()
      shoot(randomRotation, getShootStartPosition(bear.transform.position, randomRotation, 40));
      lastShootTime = Date.now();
    }
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
  hitObject.push(p2Monster.monster);
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
    <canvas id="hitDemo"></canvas>
  </div>
</template>