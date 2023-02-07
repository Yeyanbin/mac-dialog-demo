
import { Game, GameObject, resource, RESOURCE_TYPE, UpdateParams } from '@eva/eva.js';
import { getDistance, rotateToPoint } from '../utils/base';

export interface IMonster {
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
    moveRotation?: number;
    skills: any[]
}

const useMonster = (gameObj: GameObject, game: Game, monsterOptions = {}) => {
    
    const monster: IMonster = {
        obj: gameObj,
        isMove: false,
        moveSpeed: 200, // 200pix/s
        HP: 100,
        skills: [],
        positions: {
            x: 0,
            y: 0
        },
        moveRotation: 0,
        resource: '',
        lastMoveTime: Date.now(),
        ...monsterOptions,
    };


    const moveToPosition = (x, y) => {
        monster.isMove = true;
        monster.lastMoveTime = Date.now();
        monster.positions = {x,y};
        monster.moveRotation = rotateToPoint(x, y, monster.obj.transform.position.x, monster.obj.transform.position.y);
    };

    const moveByRotation = () => {
        monster.lastMoveTime = Date.now();
        monster.isMove = true;
    }

    const stopMove = () => {
        monster.isMove = false;
    }

    game.ticker.add((e: UpdateParams)=>{
        if (monster.isMove) {
            const moveDis = monster.moveSpeed * (Date.now() - monster.lastMoveTime)/1000;
            const position = monster.obj.transform.position;
            position.x += Math.cos(monster.moveRotation) * moveDis;
            position.y += Math.sin(monster.moveRotation) * moveDis;
            monster.lastMoveTime = Date.now();

            if (
              getDistance(position.x + Math.cos(monster.moveRotation) * moveDis, position.y 
                + Math.sin(monster.moveRotation) * moveDis, monster.positions.x, monster.positions.y)
            > getDistance(position.x, position.y, monster.positions.x, monster.positions.y)) {
                monster.isMove = false;
            }
        }
    });

    return {
        monster,
        stopMove,
        moveToPosition,
        moveByRotation,
    };
};

export default useMonster;
