<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { Text, TextSystem } from '@eva/plugin-renderer-text';
import { Game, GameObject, resource, RESOURCE_TYPE, UpdateParams } from '@eva/eva.js';
import { Img, ImgSystem } from '@eva/plugin-renderer-img';
import { RendererSystem } from '@eva/plugin-renderer';
import useMonster from '../hooks/useMonster';
import useKeyRotation from '../hooks/useKeyRotation';

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
      new TextSystem()
    ],
  });

  // 创建游戏对象
  const cat = new GameObject('cat', {
    size: { width: 40, height: 40 },
    origin: { x: 0.5, y: 0.5 },
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
  // game.scene.addChild(catName);

  // 游戏对象逻辑处理
  const catMonster = useMonster(cat, game, {
    width: 40,
    height: 40,
  });

  const catKeyRotation = useKeyRotation();

  // 帧动画
  game.ticker.add((e: UpdateParams)=>{
    // 获取现在按键移动的方位
    if ((catMonster.monster.moveRotation = catKeyRotation.getKeyRotation()) !== undefined) {
      catMonster.moveByRotation();
    } else {
      catMonster.stopMove();
    }
  });
});


</script>

<template>
  <div>
    <canvas id="catMove"></canvas>
  </div>
</template>