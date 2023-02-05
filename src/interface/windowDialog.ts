import { Component } from "vue";

export interface IDialogProp {
  x?: number;
  y?: number;
  width?: string;
  height?: string;
}

export interface IContext {
  title: string;
  name: string;
  dialogProp: IDialogProp;
}

export interface IWindowDialog {
  key?: string;
  appName: string;
  title?: string;
  name?: string;
  state: number;
  defaultDialogProp?: IDialogProp;
  func?: IDialogHook;
  component?: Component;
  isEasy?: boolean;
}

export interface IDialogHook {
  onCloseDialog?: (ev: MouseEvent, context: IContext) => void;
  onClickDialog?: (ev: any, context: IContext) => void;
  onMinimize?: (ev, context: IContext) => void;
  onChangeDisplay?: (oldDialogProp: IDialogProp, context: IContext) => void;
}

export interface IDialogEvent {
  closeDialog?: (ev: MouseEvent, context: IContext) => void;
  clickDialog?: (ev: any, context: IContext) => void;
  minimize?: (context: IContext) => void;
  changeDisplay?: (context: IContext) => void;
}
