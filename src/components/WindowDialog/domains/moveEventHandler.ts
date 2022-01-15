
import { Ref } from 'vue';
import useDebounce from './rAFDebounce';

const MOUSE_MOVE_STATE_MAP = {
  READY: 1,
  MOVING: 2,
};

type TMouseEventItem = (ev: MouseEvent) => void;

const moveEventList: TMouseEventItem[] = [];

const moveEventDebounce = useDebounce<MouseEvent>((ev: MouseEvent) => {
  moveEventList.forEach((itemFunc) => {
    itemFunc && itemFunc(ev);
  });
}); 

const moveEventFunc = (ev: MouseEvent) => {
  moveEventDebounce.run(ev);
};

document.body.addEventListener('mousemove', moveEventFunc);

const addMoveEventListenr = (mouseEventItem: TMouseEventItem) => {
  const key = moveEventList.length;
  moveEventList.push(mouseEventItem);
  return key;
};

const removeMoveEventListenr = (key) => {
  moveEventList[key] = undefined;
}

// up

let upEvent = undefined;

document.body.addEventListener('mouseup', (ev: MouseEvent) => {
  upEvent && upEvent(ev);
  upEvent = undefined;
});

const addMouseUpEventLister = (mouseEventItem: TMouseEventItem) => {
  upEvent = mouseEventItem;
};

export {
  MOUSE_MOVE_STATE_MAP,
  TMouseEventItem,
  addMoveEventListenr,
  removeMoveEventListenr,
  addMouseUpEventLister
};