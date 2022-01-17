import { Ref } from "@vue/runtime-core";
import { IDialogProp } from "../../../interface/windowDialog";

export interface ISpot {
  state: number;
  x: number;
  y: number;
  style: {
    width: string;
    height: string;
    zIndex: number;
    cursor: string;
  };
};

export const SPOT_STATE = {
  LEFT_TOP: 1,
  RIGHT_TOP: 2,
  LEFT_DOWN: 3,
  RIGHT_DOWN: 4,
};

const BORDER_PROP = {
  SPOT_SIZE: 10,
  SPOT_Z_INDEX: 30000,
}

const updateWindowBorder = (dialogProp: Ref<IDialogProp>, ZIndex: Ref<number>) => {
  //  dialogProp.value
  const [offsetX] = dialogProp.value.width.match(/[0-9]+/)
  const [offsetY] = dialogProp.value.height.match(/[0-9]+/)


  const spots: ISpot[] = [
    // 左上
    {
      state: SPOT_STATE.LEFT_TOP,
      x: dialogProp.value.x - BORDER_PROP.SPOT_SIZE / 2,
      y: dialogProp.value.y - BORDER_PROP.SPOT_SIZE / 2,
      style: {
        width: `${BORDER_PROP.SPOT_SIZE }px`,
        height: `${BORDER_PROP.SPOT_SIZE }px`,
        zIndex: ZIndex.value + 1,
        cursor: 'nw-resize',
      },
    },
    // 右上
    {
      state: SPOT_STATE.RIGHT_TOP,
      x: dialogProp.value.x - BORDER_PROP.SPOT_SIZE / 2 + +offsetX,
      y: dialogProp.value.y - BORDER_PROP.SPOT_SIZE / 2,
      style: {
        width: `${BORDER_PROP.SPOT_SIZE }px`,
        height: `${BORDER_PROP.SPOT_SIZE }px`,
        zIndex: ZIndex.value + 1,
        cursor: 'ne-resize',
      },
    },
    {
      state: SPOT_STATE.LEFT_DOWN,
      x: dialogProp.value.x - BORDER_PROP.SPOT_SIZE / 2,
      y: dialogProp.value.y - BORDER_PROP.SPOT_SIZE / 2 + +offsetY,
      style: {
        width: `${BORDER_PROP.SPOT_SIZE }px`,
        height: `${BORDER_PROP.SPOT_SIZE }px`,
        zIndex: ZIndex.value + 1,
        cursor: 'sw-resize',
      },
    },
    {
      state: SPOT_STATE.RIGHT_DOWN,
      x: dialogProp.value.x - BORDER_PROP.SPOT_SIZE / 2 + +offsetX,
      y: dialogProp.value.y - BORDER_PROP.SPOT_SIZE / 2 + +offsetY,
      style: {
        width: `${BORDER_PROP.SPOT_SIZE }px`,
        height: `${BORDER_PROP.SPOT_SIZE }px`,
        zIndex: ZIndex.value + 1,
        cursor: 'se-resize',
      },
    },
  ];
  
  return {
    spots
  };
};

export default updateWindowBorder;