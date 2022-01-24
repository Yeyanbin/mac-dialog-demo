
const STATE_MAP = {
  READY: 1,
  WAIT: 2,
};

const useRAFDebounce = <IFuncParams>(func) => {

  if (!func) {
    return;
  }

  let state = STATE_MAP.READY;


  const run = (params: IFuncParams) => {
    if (state === STATE_MAP.READY) {
      state = STATE_MAP.WAIT;
      func(params);

      requestAnimationFrame(() => {
        state = STATE_MAP.READY;
      });
    }
  }

  return { run };
}

export default useRAFDebounce;

export {
  STATE_MAP
};