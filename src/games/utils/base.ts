import { Game, GameObject } from "@eva/eva.js";

/**
 * abs(x1 - x2) ^ 2 +  
 */
export const getDistance = (x1:number, y1:number, x2:number, y2:number) => {
    const disX = Math.abs(x1 - x2);
    const disY = Math.abs(y1 - y2);
    return Math.sqrt(disX * disX + disY * disY);
}

export const rotateToPoint = (mx, my, px, py) => {
    const dist_Y = my - py;
    const dist_X = mx - px;
    const angle = Math.atan2(dist_Y, dist_X);
    return angle;
}

const max = 3.141592653589793 + 3.141592653589793;

export const getRandomRotate = () => {
    const random = Math.random();
    return random * max - 3.141592653589793;
}


export const getShootStartPosition = ({ x, y }, rotation: number, dis: number) => {
    return {
        x: Math.cos(rotation) * dis + x,
        y: Math.sin(rotation) * dis + y
    }
}

/**
 * 矩形重叠检测，即碰撞检测
 */
interface IRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
export const isRectangleOverlap = (rec1: IRect, rec2: IRect) => {
    const x_overlap = !(rec1.x + rec1.width <= rec2.x || rec2.x + rec2.width <= rec1.x);
    const y_overlap = !(rec1.height + rec1.y <= rec2.y || rec2.y + rec2.height <= rec1.y);
    return x_overlap && y_overlap;
}


export const destory = (game: Game, gameObjList: GameObject[]) => {
    game.destroy();
    gameObjList.forEach((gameObj) => {
        gameObj.destroy();
    })
}
