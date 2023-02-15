import { Game, GameObject } from "@eva/eva.js";
import { Img } from '@eva/plugin-renderer-img';
import useMove from "./useMove";

// 基础伤害
export interface IBullets {
  list: {
    content: GameObject,
    move: any
  }[]; // 一类型的子弹统一维护
  bulletSpeed: number;
  damage: number;
  bulletWidth: number;
  bulletHeight: number;
  // moveRotation?: number;
}

export const useBullets = (game: Game, bulletName: string, options = {}) => {
  const bullets: IBullets = {
    list: [],
    bulletSpeed: 200,
    damage: 5,
    bulletWidth: 10,
    bulletHeight: 10,
    ...options,
  };
  let size = 0;

  // 手动销毁
  const destory = (i) => {
    const [destoryBullet] = bullets.list.splice(i, 1);
    destoryBullet.move.stopMove();
  }

  const addBullet = (bullet: GameObject, moveRotation: number) => {
    const move = useMove(bullet, game, {
      moveSpeed: bullets.bulletSpeed,
      moveRotation,
    },      
    // 自动出界销毁
    () => {
      bullets.list = bullets.list.filter((item) => item.content !== bullet);
      bullet.destroy();
      game.scene.removeGameObject(bullet);
    });

    move.moveByRotation();

    bullets.list.push({
      content: bullet,
      move,
    });
  };

  const shoot = (rotation, startPosition) => {
    // console.log('shoot', rotation, startPosition);
    const bulletsGameObj = new GameObject(`${bulletName}-${size}`, {
      size: { width: 40, height: 40 },
      origin: { x: 0.5, y: 0.5 },
      position: startPosition,
      rotation
    });
    ++size;

    bulletsGameObj.addComponent(
      new Img({
        resource: bulletName,
      })
    );
    addBullet(bulletsGameObj, rotation);
    game.scene.addChild(bulletsGameObj);
  };

  return {
    bullets,
    addBullet,
    destory,
    shoot,
  };
}