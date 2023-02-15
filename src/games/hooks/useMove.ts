
import { Game, GameObject, UpdateParams } from '@eva/eva.js';
import { getDistance, rotateToPoint } from '../utils/base';

export interface IMove {
    obj: GameObject;
    positions: {
        x: number;
        y: number;
    },
    isMove: boolean;
    moveSpeed: number;
    lastMoveTime: number;
    moveRotation?: number;
}

const useMove = (gameObj: GameObject, game: Game, moveOptions = {}, destoryCb = () => {}) => {
    
    const move: IMove = {
        obj: gameObj,
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
        move.moveRotation = rotateToPoint(x, y, move.obj.transform.position.x, move.obj.transform.position.y);
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
            const position = move.obj.transform.position;
            position.x += Math.cos(move.moveRotation) * moveDis;
            position.y += Math.sin(move.moveRotation) * moveDis;
            move.lastMoveTime = Date.now();
            // console.log('position', position);

            if (position.x > 1100 || position.x < -100) {
                stopMove();
            } else if (position.y > 1100 || position.y < -100) {
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
