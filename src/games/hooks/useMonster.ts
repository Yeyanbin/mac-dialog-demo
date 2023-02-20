import { Game, GameObject } from "@eva/eva.js";
import { Img } from '@eva/plugin-renderer-img';

export const takeDamage = (monster, damage) => {
  monster.HP -= damage;
  return monster.HP > 0;
}

const useMonster = (game: Game, name: string, options = {}) => {

  const defaultOptions = {
    HP: 100,
    width: 20,
    height: 20,
    ...options
  };

  const monsterList = [];
  let size = 0;
  
  const addMonster = (gameObj: GameObject) => {
    monsterList.push({
      obj: gameObj,
      destory: () => {
        if (gameObj.destroyed) {
            return;
        }
        gameObj.destroy();
        game.scene.removeGameObject(gameObj);
      },
      ...defaultOptions,
    });
  }

  const clearDestory = () => {
    return monsterList.filter((monster) => !monster.obj.destroyed);
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
    if (monster && monster.destroyed) {
        return;
    }
    game.scene.removeGameObject(monster.obj);
    monster.obj.destroy();
  }

  return {
    monsterList,
    create,
    destory,
    clearDestory,
  };
};

export default useMonster;