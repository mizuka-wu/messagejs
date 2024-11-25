export enum IMessageType {
  info = "info",
  success = "success",
  error = "error",
  warning = "warning",
}
export interface IMessageOption {
  /** 消息文字 */
  message: string | (() => string);
  /** 类型，默认为info */
  type?: IMessageType;
  /** 内置的svg图标 */
  icon?: string;
  /** 是否将 message 属性作为 HTML 片段处理	 */
  dangerouslyUseHTMLString?: boolean;
  /** 自定义类名 */
  customClass?: string;
  /** 显示时间，单位为毫秒。 设为 0 则不会自动关闭 默认3000 */
  duration?: number;
  /** 显示关闭按钮 默认为false */
  showClose?: boolean;
  /** 文字是否居中显示，默认为false */
  center?: boolean;
  /** 关闭时的回调函数, 参数为被关闭的 message 实例	*/
  onClose?: (instance: IMessage) => void;
  /** 距离顶部的偏移量 */
  offset?: number;
  /** 默认插入的位置，默认为document.body */
  appendTo?: HTMLElement;
}
export interface IMessage {
  close: () => void;
}
