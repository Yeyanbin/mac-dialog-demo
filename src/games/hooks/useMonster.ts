import { Game, GameObject } from "@eva/eva.js";
import { Img } from '@eva/plugin-renderer-img';

export const takeDamage = (monster, damage) => {
  monster.HP -= damage;
  return monster.HP > 0;
}

const useMonster = (game: Game, name: string, options = {}) => {

  const defaultOptions = {
    HP: 100,
    width: 40,
    height: 40,
    ...options
  };

  const monsterList = [];
  let size = 0;
  
  const addMonster = (gameObj: GameObject) => {
    monsterList.push({
      obj: gameObj,
      ...defaultOptions,
    });
  }

  const create = (position) => {
    const gameObj = new GameObject(`${name}-${size}`, {
      size: { width: 40, height: 40 },
      origin: { x: 0.5, y: 0.5 },
      position,
    });
    ++size;

    gameObj.addComponent(
      new Img({
        resource: name,
      })
    );
    addMonster(gameObj);
    game.scene.addChild(gameObj);
  }

  const destory = (i) => {
    const [monster] = monsterList.splice(i, 1);
    game.scene.removeGameObject(monster.obj);
    monster.obj.destroy();
  }

  return {
    monsterList,
    create,
    destory,
  };
};

export default useMonster;