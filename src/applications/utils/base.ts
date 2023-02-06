
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