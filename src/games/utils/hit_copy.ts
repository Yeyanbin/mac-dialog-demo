
export interface IHitObj {
  x_1: number;
  y_1: number;
  x_2: number;
  y_2: number;
  name?: number;
  index: number;
  isDestory?: boolean;
}

const isRectangleOverlap = (rec1: IHitObj, rec2: IHitObj) => {
  const x_overlap = !(rec1.x_2 <= rec2.x_1 || rec2.x_2 <= rec1.x_1);
  const y_overlap = !(rec1.y_2 <= rec2.y_1 || rec2.y_2 <= rec1.y_1);
  return x_overlap && y_overlap;
}


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
  const list = [];
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

  console.log('构建好的待扫描队列', list);

  // 判断碰撞的队列
  let bulletList = [];
  const monsterList = [];
  let temp_index;
  // 开始扫描，分两种情况考虑
  list.forEach((item, index) => {
    console.log(`------------开始第${index}轮 y=${item.y} ${item.type === TYPE_MAP.BULLET ? '扫描到了子弹' : '扫描到了怪物'}------------`)
    
    
    // 扫到子弹，且子弹退出了
    if (item.type === TYPE_MAP.BULLET && item.y === item.item.y_2) {
      console.log(`标记子弹${item.item.index}消除`)
      // 标记子弹已销毁
      item.item.isDestory = true;
    }
    // 扫到子弹，且子弹是刚进入的
    if (item.type === TYPE_MAP.BULLET && item.y === item.item.y_1) {
      // 判断碰撞 迭代一下怪物是否和新子弹重叠
      for (temp_index = monsterList.length-1; temp_index >= 0 ; temp_index--) {
        // 跳过被销毁的怪物
        if (monsterList[temp_index].item.isDestory ) {
          break;
        }
        const monster = monsterList[temp_index];

        // 判断是否重叠
        if (isRectangleOverlap(monster.item, item.item)) {
          hitCallback(item.item, monster.item);
          break;
        }
      }

      // 没有重叠的，新子弹进去子弹队列
      if (temp_index === -1) {
        bulletList.push(item);
      }
    }

    // 扫到怪物 且怪物退出
    if (item.type === TYPE_MAP.MONSTER && item.y === item.item.y_2) {
      item.item.isDestory = true;
    } 
    // 扫到怪物
    else if (item.type === TYPE_MAP.MONSTER) {
      const temp = bulletList;
      bulletList = [];
      // 迭代一下子弹队列，是否重叠
      for (temp_index = temp.length-1; temp_index >= 0 ; temp_index--) {
        // 判断一下子弹是否已销毁
        if (temp[temp_index].item.isDestory ) {
          break;
        }
        const bullet = temp[temp_index];

        // 判断是否重叠
        if (isRectangleOverlap(bullet.item, item.item)) {
          hitCallback(item.item, bullet.item);
        } else {
          bulletList.push(bullet);
        }
      }
      monsterList.push(item);
    }



    console.log(`y=${item.y}；
    bulletList: [${bulletList.map((item) => [item.item.x_1, item.item.x_2].join(', ')).join('|| ')}]；
    monsterList: [${monsterList.map((item) => [item.item.x_1, item.item.x_2].join(', ')).join('|| ')}]`)
  })
}