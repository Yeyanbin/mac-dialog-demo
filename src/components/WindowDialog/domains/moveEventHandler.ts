import useDebounce from "./rAFDebounce";

const MOUSE_MOVE_STATE_MAP = {
  READY: 1,
  MOVING: 2,
};

type TMouseEventItem = (ev: MouseEvent) => void;

// move
const moveEventList: TMouseEventItem[] = [];

const moveEventDebounce = useDebounce<MouseEvent>((ev: MouseEvent) => {
  moveEventList.forEach((itemFunc) => {
    itemFunc && itemFunc(ev);
  });
});

const moveEventFunc = (ev: MouseEvent) => {
  moveEventDebounce.run(ev);
};

document.body.addEventListener("mousemove", moveEventFunc);

const addMoveEventListener = (mouseEventItem: TMouseEventItem) => {
  const key = moveEventList.length;
  moveEventList.push(mouseEventItem);
  return key;
};

const removeMoveEventListener = (key) => {
  moveEventList[key] = undefined;
};

// up
const upEvent = [];

document.body.addEventListener("mouseup", (ev: MouseEvent) => {
  while (upEvent.length > 0) {
    const event = upEvent.pop();
    event(ev);
  }
});

const addMouseUpEventLister = (mouseEventItem: TMouseEventItem) => {
  upEvent.push(mouseEventItem);
};

export {
  MOUSE_MOVE_STATE_MAP,
  TMouseEventItem,
  addMoveEventListener,
  removeMoveEventListener,
  addMouseUpEventLister,
};
