<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { Game, GameObject, resource, RESOURCE_TYPE, UpdateParams } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { Img, ImgSystem } from '@eva/plugin-renderer-img';
import { getUrlPrefix } from '../../utils/image';
import useMonster from '../hooks/useMonster';
import useKeyRotation from '../hooks/useKeyRotation';
import { Text, TextSystem } from '@eva/plugin-renderer-text';

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
      new TextSystem(),
    ],
  });
  const bearTextStyle = {
    // fontFamily: 'Arial',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold',
  };
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

  const p1Name = new GameObject('text', {
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
  p1Name.addComponent(
    new Text({
      text: 'P1',
      style: bearTextStyle
    })
  );

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
      text: 'P2',
      style: bearTextStyle
    })
  );

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

  bear.addComponent(
    new Img({
      resource: 'bearImg',
    })
  );

  p2.addComponent(
    new Img({
      resource: 'bearImg',
    })
  );
  bear.addChild(p1Name);
  p2.addChild(p2Name);

  game.scene.addChild(bear);
  game.scene.addChild(p2);


  const bearMonster = useMonster(bear, game);
  const p2Monster = useMonster(p2, game);

  const bearKeyRotation = useKeyRotation();
  const p2KeyRotation = useKeyRotation({
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
    <canvas id="move" ></canvas>
  </div>
</template>