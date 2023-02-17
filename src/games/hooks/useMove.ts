
import { Game, GameObject, UpdateParams } from '@eva/eva.js';
import { getDistance, rotateToPoint } from '../utils/base';
import { gameConfig } from '../config';

export interface IMove {
    positions: {
        x: number;
        y: number;
    },
    isMove: boolean;
    moveSpeed: number;
    lastMoveTime: number;
    moveRotation?: number;
}

// 超过边界销毁的距离
const BASE_DIS = 100;

const useMove = (gameObj: GameObject, game: Game, moveOptions = {}, destoryCb = () => {}) => {
    
    const move: IMove = {
        isMove: false,
        moveSpeed: 200, // 200pix/s
        positions: undefined,
        moveRotation: 0,
        lastMoveTime: Date.now(),
        ...moveOptions,
    };


    const moveToPosition = (x, y) => {
        move.isMove = true;
        move.lastMoveTime = Date.now();
        move.positions = {x,y};
        move.moveRotation = rotateToPoint(x, y, gameObj.transform.position.x, gameObj.transform.position.y);
    };

    const moveByRotation = () => {
        move.lastMoveTime = Date.now();
        move.isMove = true;
    }

    const stopMove = () => {
        move.isMove = false;
        destoryCb()
    }

    game.ticker.add((e: UpdateParams)=>{
        if (move.isMove) {
            const moveDis = move.moveSpeed * (Date.now() - move.lastMoveTime)/1000;
            const position = gameObj.transform.position;
            position.x += Math.cos(move.moveRotation) * moveDis;
            position.y += Math.sin(move.moveRotation) * moveDis;
            move.lastMoveTime = Date.now();
            // console.log('position', position);

            if (position.x > gameConfig.width + BASE_DIS || position.x < - BASE_DIS) {
                stopMove();
            } else if (position.y > gameConfig.height + BASE_DIS || position.y < - BASE_DIS ) {
                stopMove();
            }

            if (
                move.positions &&
              getDistance(position.x + Math.cos(move.moveRotation) * moveDis, position.y 
                + Math.sin(move.moveRotation) * moveDis, move.positions.x, move.positions.y)
            > getDistance(position.x, position.y, move.positions.x, move.positions.y)) {
                stopMove();
                move.positions = undefined;
            }
        }
    });

    return {
        move,
        stopMove,
        moveToPosition,
        moveByRotation,
    };
};

export default useMove;
