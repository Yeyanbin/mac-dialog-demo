
export interface IHitObj {
  x_1: number;
  y_1: number;
  x_2: number;
  y_2: number;
  data: any;
  isDestory?: boolean;
}

const isRectangleOverlap = (rec1: IHitObj, rec2: IHitObj) => {
  return !(rec1.x_2 <= rec2.x_1 || rec2.x_2 <= rec1.x_1);
}

const MAX = 20;
const MIN = -10;

const TYPE_MAP = {
  BULLET: 1,
  MONSTER: 2,
};

// 保证x_2 > x_1, y_2 > y_1
const fixHitObjIdx = (obj: IHitObj) => {
  if (obj.x_1 > obj.x_2) {
    obj.x_1 += obj.x_2;
    obj.x_2 = obj.x_1 - obj.x_2;
    obj.x_1 -= obj.x_2;
  }

  if (obj.y_1 > obj.y_2) {
    obj.y_1 += obj.y_2;
    obj.y_2 = obj.y_1 - obj.y_2;
    obj.y_1 -= obj.y_2;
  }
}

export const computeHit = (bullets: IHitObj[], monsters: IHitObj[], hitCallback: (bullet: IHitObj, monster: IHitObj) => void) => {

  // 构建待扫描队列
  const list: {
    y: number,
    item: IHitObj,
    type: number,
  }[] = [];
  bullets.forEach((item) => {
    fixHitObjIdx(item);

    list.push({
      y: item.y_1,
      item,
      type: TYPE_MAP.BULLET
    });
    list.push({
      y: item.y_2,
      item,
      type: TYPE_MAP.BULLET
    });
  });

  monsters.forEach((item) => {
    fixHitObjIdx(item);

    list.push({
      y: item.y_1,
      item,
      type: TYPE_MAP.MONSTER
    });
    list.push({
      y: item.y_2,
      item,
      type: TYPE_MAP.MONSTER
    });
  });

  // 排序
  list.sort((a, b) => a.y - b.y);


  // 判断碰撞的队列
  let bulletList = {};
  const monsterList = {};
  let temp_array = [];
  for (let index = MIN; index <= MAX; index++) {
    bulletList[index] = [];
    monsterList[index] = [];
  }
  let temp_index;

  // 开始扫描，分两种情况考虑
  list.forEach((item) => {    
    
    // 扫到子弹，且子弹退出了
    if (item.type === TYPE_MAP.BULLET && item.y === item.item.y_2) {
      // 标记子弹已销毁
      item.item.isDestory = true;
    }
    // 扫到子弹，且子弹是刚进入的
    if (item.type === TYPE_MAP.BULLET && item.y === item.item.y_1) {

      const { x_1, x_2 } = item.item;
      const x_1_index = Math.floor(x_1/100);
      const x_2_index = Math.floor(x_2/100);
      temp_array = []

      for (temp_index = monsterList[x_1_index].length-1; temp_index >= 0 ; temp_index--) {

        const monster = monsterList[x_1_index][temp_index];
        // 跳过被销毁的怪物
        if (monster.item.isDestory ) {
          break;
        }
        temp_array.push(monster);

        // 判断是否重叠
        if (isRectangleOverlap(monster.item, item.item)) {
          hitCallback(item.item, monster.item);
          break;
        }
      }
      monsterList[x_1_index] = temp_array;


      // 没有重叠，且跨越了两个区间
      if (temp_index === -1 && x_1_index !== x_2_index) {
        temp_array = []

        for (temp_index = monsterList[x_2_index].length-1; temp_index >= 0 ; temp_index--) {

          const monster = monsterList[x_2_index][temp_index];
          // 跳过被销毁的怪物
          if (monster.item.isDestory ) {
            break;
          }
          // 没有销毁的
          temp_array.push(monster);


          // 判断是否重叠
          if (isRectangleOverlap(monster.item, item.item)) {
            hitCallback(item.item, monster.item);
            break;
          }
        }
        
        // 把没有销毁的怪物加回去
        monsterList[x_2_index] = temp_array;

        // 没有重叠的，新子弹进去子弹队列
        if (temp_index === -1) {
          bulletList[x_2_index].push(item);
        }
      }
      // 没有重叠的，新子弹进去子弹队列
      if (temp_index === -1) {
        bulletList[x_1_index].push(item);
      }
    }

    // 扫到怪物 且怪物退出
    if (item.type === TYPE_MAP.MONSTER && item.y === item.item.y_2) {
      item.item.isDestory = true;
    } 

    // 扫到怪物
    if (item.type === TYPE_MAP.MONSTER && item.y === item.item.y_1) {
      const { x_1, x_2 } = item.item;
      const x_1_index = Math.floor(x_1/100);
      const x_2_index = Math.floor(x_2/100);
      temp_array = [];

      for (temp_index = bulletList[x_1_index].length-1; temp_index >= 0 ; temp_index--) {

        const bullet = bulletList[x_1_index][temp_index];
        // 跳过被销毁的子弹
        if (bullet.item.isDestory ) {
          break;
        }
        // 判断是否重叠
        if (isRectangleOverlap(bullet.item, item.item)) {
          hitCallback(bullet.item, item.item);
          break;
        }
        // 没有重叠且没有销毁的
        temp_array.push(bullet);
      }
      bulletList[x_1_index] = temp_array;


      // 没有重叠，且跨越了两个区间
      if (temp_index === -1 && x_1_index !== x_2_index) {

        temp_array = [];
        for (temp_index = bulletList[x_2_index].length-1; temp_index >= 0 ; temp_index--) {

          const bullet = bulletList[x_2_index][temp_index];
          // 跳过被销毁的子弹
          if (bullet.item.isDestory ) {
            break;
          }
          // 判断是否重叠
          if (isRectangleOverlap(bullet.item, item.item)) {
            hitCallback(bullet.item, item.item);
            break;
          }
          // 没有重叠且没有销毁的
          temp_array.push(bullet);
        }
        bulletList[x_2_index] = temp_array;
        // 没有重叠的，新怪物进去怪兽队列
        if (temp_index === -1) {
          monsterList[x_2_index].push(item);
        }
      }
      // 没有重叠的，新怪物进去怪兽队列
      if (temp_index === -1) {
        monsterList[x_1_index].push(item);
      }
    }
  })
}