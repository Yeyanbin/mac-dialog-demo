
import { Game, GameObject, resource, RESOURCE_TYPE, UpdateParams } from '@eva/eva.js';
import { getDistance, rotateToPoint } from '../utils/base';

interface IMonster {
    obj: GameObject;
    resource: string;
    positions: {
        x: number;
        y: number;
    },
    isMove: boolean;
    moveSpeed: number,
    HP: number,
    lastMoveTime: number;
    skills: any[]
}

const useMonster = (gameObj: GameObject, game: Game, monsterOptions = {}) => {
    
    const monster: IMonster = {
        obj: gameObj,
        isMove: false,
        moveSpeed: 100,
        HP: 100,
        skills: [],
        positions: {
            x: 0,
            y: 0
        },
        resource: '',
        lastMoveTime: Date.now(),
        ...monsterOptions,
    };

    const move = (x, y) => {
        monster.isMove = true;
        monster.lastMoveTime = Date.now();
        monster.positions = {x,y};
        monster.obj.transform.rotation = 
            rotateToPoint(x, y, monster.obj.transform.position.x, monster.obj.transform.position.y);
    };

    game.ticker.add((e: UpdateParams)=>{
        if (monster.isMove) {
            const moveDis = monster.moveSpeed * (Date.now() - monster.lastMoveTime)/1000;
            const position = monster.obj.transform.position;
            position.x += Math.cos(monster.obj.transform.rotation) * moveDis;
            position.y += Math.sin(monster.obj.transform.rotation) * moveDis;
            monster.lastMoveTime = Date.now();

            if (
              getDistance(position.x + Math.cos(monster.obj.transform.rotation) * moveDis, position.y 
                + Math.sin(monster.obj.transform.rotation) * moveDis, monster.positions.x, monster.positions.y)
            > getDistance(position.x, position.y, monster.positions.x, monster.positions.y)) {
                monster.isMove = false;
            }
        }
    });

    return {
        monster,
        move,
    };
};

export default useMonster;
