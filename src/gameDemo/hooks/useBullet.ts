import { Game, GameObject } from "@eva/eva.js";

// 基础伤害
export interface IBullets {
  list: GameObject[]; // 一类型的子弹统一维护
  bulletSpeed: number;
  lastMoveTime: number;
  damage: number;
  // moveRotation?: number;
}

export const useBullets = (game: Game, options = {}) => {
  const bullets = {
    list: [],
    bulletSpeed: 5,
    lastMoveTime: Date.now(),
    damage: 5,
    ...options,
  };

  const destory = (i) => {
    const [destoryBullet] = bullets.list.splice(i, 1);
    game.scene.removeGameObject(destoryBullet);
    destoryBullet.destroy()
  }

  const addBullet = (bullet: GameObject) => {
    bullets.list.push(bullet);
  }

  return {
    bullets,
    addBullet,
    destory,
  }
}