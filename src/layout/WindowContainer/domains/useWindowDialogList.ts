import { ref } from "vue";
import { IWindowDialog, IDialogHook, IDialogEvent, IDialogProp } from "../../../interface/windowDialog";

export const WINDOW_DIALOG_STATE = {
  NORMAL: 1,
  MINIMIZE: 2,
  FULL_SCREEN: 3,
}


const dialogCount = ref<number>(0);

const useWindowDialogList = (defaultWindowDialogList: IWindowDialog[], defaultDialogProp?: IDialogProp) => {
  
  defaultWindowDialogList.forEach((_, index) => {
    if (!defaultWindowDialogList[index].key)
      defaultWindowDialogList[index].key = `___default_key_${dialogCount.value}`;

    dialogCount.value = dialogCount.value + 1;
  });
  const windowDialogList = ref<Array<IWindowDialog>>(defaultWindowDialogList);

  const addWindowDialog = (appName: string, options = {}) => {
    const size = windowDialogList.value.length + 1;

    windowDialogList.value.push({
      key: `___default_key_${dialogCount.value}`,
      appName,
      state: WINDOW_DIALOG_STATE.NORMAL,
      comProps: undefined,
      ...options,

      defaultDialogProp: {
        ...defaultDialogProp,
        x: defaultDialogProp.x + 10 * size + dialogCount.value * 10,
        y: defaultDialogProp.y + 50 * ((size - 1) % 8),
        ...(options as any).defaultDialogProp,
      },
    });
    dialogCount.value = dialogCount.value + 1;
  };

  const handleDialogFunc = (dialogFunc: IDialogHook, index: number) => {
  
    const dialogEvent: IDialogEvent = {
      clickDialog: (ev, context) => {
        // log?
        console.log('clickDialog', context);
        dialogFunc?.onClickDialog?.(ev, context);
      },
      closeDialog: (ev, context) => {
        // 关闭
        windowDialogList.value.splice(index, 1);
        console.log('close, ',index, windowDialogList.value)
        ev.preventDefault();
        dialogFunc?.onCloseDialog?.(ev, context);
      },
      minimize: (context) => {
        // 最小化
      },
      changeDisplay: (context) => {
        // 改变
      }
    };
  
    return dialogEvent
  };

  return {
    windowDialogList,
    addWindowDialog,
    handleDialogFunc
  }
}

export default useWindowDialogList;
