<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { Text, TextSystem } from '@eva/plugin-renderer-text';
import { Game, GameObject, resource, RESOURCE_TYPE, UpdateParams } from '@eva/eva.js';
import { Img, ImgSystem } from '@eva/plugin-renderer-img';
import { RendererSystem } from '@eva/plugin-renderer';
import useMove from '../hooks/useMove';
import useKeyRotation from '../hooks/useKeyRotation';
import { useBullets } from '../hooks/useBullet';
import { getRandomRotate, getShootStartPosition, isRectangleOverlap } from '../utils/base';
import { StatsSystem } from '@eva/plugin-stats';
import { flowerBulletEmojiNameList, monsterEmojiNameList } from '../emoji.config';
import useMonster from '../hooks/useMonster';

onMounted(() => {
  onUnmounted(() => {
    // 销毁游戏
    game.destroy();
  })

  // 加载画板
  const canvas = document.querySelector('#catMove') as HTMLCanvasElement;

  // 创建游戏，并加载画板，引入系统。
  const game = new Game({
    systems: [
      // 渲染系统
      new RendererSystem({
        canvas,
        width: 1000,
        height: 800,
        backgroundColor: 0x1099bb
      }),
      // 图片系统
      new ImgSystem(),
      // 文本系统
      new TextSystem(),
      new StatsSystem({
        show: true, // 这里设置是否显示，设为 false 不会运行。
        style: { // 这里到数值全部都是宽度到百分比 vw 单位
          x: 90,
          y: 0,
          width: 8,
          height: 5
        }
      })
    ],
  });

  // 创建游戏对象
  const cat = new GameObject('cat', {
    size: { width: 40, height: 40 },
    origin: { x: 0.5, y: 0.5 },
    scale: { x: -1, y: 1 },
    position: {
      x: 500,
      y: 400,
    },
    anchor: {
      x: 0,
      y: 0,
    },
  });

  // 为游戏对象添加cat图片
  cat.addComponent(new Img({ resource: 'cat' }));

  // 猫咪名称
  const catName = new GameObject('catName', {
    position: {
      x: 0,
      y: 30
    },
    origin: {
      x: 0.5,
      y: 0.5
    },
    scale: { x: -1, y: 1 },
    anchor: {
      x: 0.5,
      y: 0.5
    }
  });

  catName.addComponent(    
    new Text({
      text: '发射鲜花的猫咪',
      style: {
        fontSize: 16,
        fontStyle: 'italic',
        fontWeight: 'bold',
        padding: 5,
      }
    }));
  
  // 把猫咪名称加到猫咪的游戏对象里
  cat.addChild(catName);

  // 将该游戏对象加载到游戏里
  game.scene.addChild(cat);

  // 游戏对象逻辑处理
  const catMove = useMove(cat, game, {
    width: 40,
    height: 40,
  });

  const catKeyRotation = useKeyRotation();

  // 帧动画
  game.ticker.add((e: UpdateParams)=>{
    // 获取现在按键移动的方位
    if ((catMove.move.moveRotation = catKeyRotation.getKeyRotation()) !== undefined) {
      if (catKeyRotation.isRight()) {
        cat.transform.scale.x = -1;
        catName.transform.scale.x = -1;
      } else {
        cat.transform.scale.x = 1;
        catName.transform.scale.x = 1;
      }
      catMove.moveByRotation();
    } else {
      catMove.stopMove();
    }
  });

  // 子弹数量和击中次数
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
  game.scene.addChild(text);

  // 处理子弹发射
  const flowerBullets = flowerBulletEmojiNameList.map((name) => useBullets(game, name, {}))

  const firingRate = 100;
  let lastShootTime = Date.now();
  const hitObject = [];
  let hitTime = 0;

  game.ticker.add((e: UpdateParams) => {
    // 射击
    if (Date.now() - lastShootTime > firingRate) {
      // console.log('射击');
      let shootRandom = Math.floor(Math.random() * 64);
      flowerBullets.forEach((flowerBullet) => {
        const randomRotation = getRandomRotate();
        if (shootRandom % 2 === 1) {
          flowerBullet.shoot(randomRotation, getShootStartPosition(cat.transform.position, randomRotation, 40));
        } 
        shootRandom = Math.floor(shootRandom / 2);
      })

      lastShootTime = Date.now();
    }

    // 简单碰撞检测
    const bullets = [];

    flowerBullets.forEach((flowerBullet) => {
      flowerBullet.bullets.list.forEach(({content, move}) => {
        bullets.push({
          content,
          destory: move.stopMove,
          damage: flowerBullet.bullets.damage,
          bulletWidth: flowerBullet.bullets.bulletWidth,
          bulletHeight: flowerBullet.bullets.bulletHeight,
        })
      })
    });

    // 更新文本
    (text.components[1] as any).text = `当前子弹数量为：${bullets.length}, 击中次数为：${hitTime}`;

    for (let b = bullets.length - 1; b >= 0; b--) {
      if (!bullets[b].content || !bullets[b].content.transform) {
        console.log(bullets[b], b, '被销毁了')
        break;
      }
      console.log(bullets[b], b)
      const { bulletWidth, bulletHeight } = bullets[b];
      const position = (bullets[b].content as GameObject).transform.position;
      monsters.forEach((monsterData) => monsterData.monsterList.forEach((monster) => {
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
          gameObj.forEach(({content, destory}) => {
            game.scene.removeGameObject(content);
            content.destroy();
            destory();
          });
        }
      }));
    }
  });

  // 生成怪物
  const monsters = monsterEmojiNameList.map((name) => useMonster(game, name, {}))

  const monsterCreateRate = 1000;
  let lastCreateTime = Date.now();

  // monsters.forEach((monster) => {
  //   monster.create({
  //     x: Math.random() * 1000,
  //     y: Math.random() * 800,
  //   });
  // })

  // // 随机生成怪物
  game.ticker.add((e: UpdateParams) => {
    if (Date.now() - lastCreateTime > monsterCreateRate) {
      let createRandom = Math.floor(Math.random() * 512);
      monsters.forEach((monster) => {
        if (createRandom % 8 === 7) {
          monster.create({
            x: Math.random() * 1000,
            y: Math.random() * 800,
          });
        } 
        createRandom = Math.floor(createRandom / 2);
      })

      lastCreateTime = Date.now();
    }
  })

});


</script>

<template>
  <div>
    <canvas id="catMove"></canvas>
  </div>
</template>