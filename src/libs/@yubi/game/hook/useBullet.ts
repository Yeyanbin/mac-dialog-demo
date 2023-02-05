
import { IVector } from './useVector';
export type TBulletType = 'direct' | 'range';
export type TDemageType = 'ad' | 'ap';

// 基础伤害
export interface IBullet {
  // 子弹名称
  name: String;
  // 伤害值
  value: number;
  bulletType: TBulletType
  // 伤害类型 
  demageType: TDemageType;
  // 发射的时间戳
  startTime: number;
  // 子弹贴图
  img: any;
  // 子弹向量
  vector: IVector;
}

export interface IDirectBullet extends IBullet {
  // 延迟伤害
  delay: number;
}


// 范围伤害
export interface IRangeBullet extends IBullet{
  // 攻击次数 即可穿透
  attackTime: number;
  // 射程
  field: number;
  width: number;
  height: number;
  // 实际体积，先搁置 多边形的各个点的位置与基点的偏移量
  nodeList?: Array<{
    offsetX: number;
    offsetY: number;
  }>;
}

export const useBullet = () => {

}