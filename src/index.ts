import { MessageType, CLASS_NAME, IN_DURECTION, OUT_DURECTION } from "./const";
import {
  updateCloseContainerStyle,
  updateCloseIconStyle,
  updateContainerStyle,
  updateContentContainerStyle,
  updateContentStyle,
  updateIconStyle,
} from "./style";

export type IMessage = string | (() => string);
export interface IMessageOption {
  /** 消息文字 */
  message: string | (() => string);
  /** 类型，默认为info */
  type: MessageType;
  /** svg图标 */
  icon: string;
  /** 是否将 message 属性作为 HTML 片段处理	 */
  dangerouslyUseHTMLString: boolean;
  /** 自定义类名 */
  customClass: string;
  /** 显示时间，单位为毫秒。 设为 0 则不会自动关闭 默认3000 */
  duration: number;
  /** 显示关闭按钮 默认为false */
  showClose: boolean;
  /** 文字是否居中显示，默认为false */
  center: boolean;
  /** 关闭时的回调函数, 参数为被关闭的 message 实例	*/
  onClose: (instance: Message) => void;
  /** 距离顶部的偏移量 */
  offset: number;
  /** 默认插入的位置，默认为document.body */
  appendTo: HTMLElement;
}

class MessageManager {
  list: Message[] = [];
  max = 3;
  margin = 16;
  add(message: Message) {
    if (this.list.includes(message)) return;
    this.list.push(message);
    message.onCloseCallbackList.push((instance) => {
      this.remove(instance);
    });
    this.doLayoutAndShow();
  }

  remove(message: Message) {
    const index = this.list.indexOf(message);
    if (index > -1) {
      this.list.splice(index, 1);
      message.hide();
    }
    this.doLayoutAndShow();
  }

  closeAll() {
    this.list.forEach((message) => message.hide());
    this.list.splice(0);
  }

  doLayoutAndShow() {
    const list = this.list
      .filter((message) => message.isAutoClose)
      .slice(-this.max);
    const needCloseList = this.list.filter(
      (message) => message.isAutoClose && !list.includes(message)
    );

    this.list = this.list.filter((message) => !needCloseList.includes(message));
    needCloseList.forEach((message) => message.hide());

    if (this.list.length) {
      let offset = list[0]?.options.offset || 40;
      this.list.forEach((message) => {
        message.show(offset);
        offset += message.height + this.margin;
      });
    }
  }
}
const messageManager = new MessageManager();

export class Message {
  el: HTMLElement;
  options: Omit<IMessageOption, "onClose">;
  timeout: number | null = null;
  state: {
    isMounted: boolean;
    isShow: boolean;
    isShown: boolean;
    isHide: boolean;
    isHidden: boolean;
  } = {
    isHidden: false,
    isHide: false,
    isMounted: false,
    isShow: false,
    isShown: false,
  };
  onCloseCallbackList: ((instance: Message) => void)[] = [];
  static manager: MessageManager;

  constructor(options: Partial<IMessageOption> & { message: IMessage }) {
    this.options = {
      type: MessageType.INFO,
      icon: "",
      dangerouslyUseHTMLString: false,
      customClass: "",
      duration: 3000,
      showClose: false,
      center: false,
      offset: 40,
      appendTo: document.body,
      ...options,
    };
    this.onCloseCallbackList = [];
    if (options.onClose) this.onCloseCallbackList.push(options.onClose);

    this.el = document.createElement("div");
    this.updateContent();

    this.manager.add(this);
  }

  /** 生成内容 */
  updateContent() {
    // 清除内容
    this.el.childNodes.forEach((node) => this.el.removeChild(node));
    const messageContent =
      typeof this.options.message === "function"
        ? this.options.message()
        : this.options.message;
    if (!messageContent) throw new Error("Message is empty!");

    // 设置容器样式，为了做定位
    this.el.style.textAlign = this.options.center ? "center" : "left";
    this.el.classList.add(`${CLASS_NAME}__container`);
    updateContainerStyle(this.el);

    const contentContainerEl = document.createElement("div");
    updateContentContainerStyle(
      contentContainerEl,
      this.options.type,
      !this.isAutoClose
    );
    contentContainerEl.classList.add(
      CLASS_NAME,
      `${CLASS_NAME}--${this.options.type}`
    );
    if (this.options.customClass)
      contentContainerEl.classList.add(this.options.customClass);
    this.el.appendChild(contentContainerEl);

    // 添加图标
    const iconEl = document.createElement("div");
    iconEl.classList.add(`${CLASS_NAME}-icon`);
    updateIconStyle(iconEl, this.options.type, this.options.icon);
    contentContainerEl.appendChild(iconEl);

    // 添加内容
    const contentEl = document.createElement("div");
    contentContainerEl.classList.add(`${CLASS_NAME}-content`);
    if (this.options.dangerouslyUseHTMLString) {
      contentEl.innerHTML = messageContent;
    } else {
      contentEl.innerText = messageContent;
    }
    updateContentStyle(contentEl);
    contentContainerEl.appendChild(contentEl);

    if (!this.isAutoClose) {
      const closeContainerEl = document.createElement("div");
      closeContainerEl.classList.add(`${CLASS_NAME}-close`);
      updateCloseContainerStyle(closeContainerEl);
      closeContainerEl.onclick = () => {
        closeContainerEl.style.background = "#E6E8EB";
        setTimeout(() => {
          this.hide();
        }, 100);
      };

      const closeIconEl = document.createElement("div");
      closeIconEl.classList.add(`${CLASS_NAME}-close-icon`);
      updateCloseIconStyle(closeIconEl);
      closeContainerEl.appendChild(closeIconEl);
      contentContainerEl.appendChild(closeContainerEl);
    }
  }

  show(offset: number) {
    if (!this.state.isMounted) {
      this.el.style.opacity = "0";
      this.el.style.transform = `translateY(${offset - this.manager.margin}px)`;
      this.options.appendTo.appendChild(this.el);
      this.state.isMounted = true;
    }

    if (this.state.isShown) {
      this.el.style.transform = `translateY(${offset}px)`;
      return;
    }

    this.state.isShow = true;
    this.el.style.transitionDuration = `${IN_DURECTION}ms`;
    requestAnimationFrame(() => {
      this.el.style.opacity = "1";
      this.el.style.transform = `translateY(${offset}px)`;

      setTimeout(() => {
        this.state.isShow = false;
        this.state.isShown = true;

        if (this.isAutoClose) {
          if (this.timeout) clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.hide();
          }, this.options.duration);
        }
      }, IN_DURECTION);
    });
  }

  hide() {
    if (this.state.isHidden) return this.destroy();
    this.state.isShown = false;
    this.state.isHide = true;
    this.el.style.transitionDuration = `${OUT_DURECTION}ms`;
    requestAnimationFrame(() => {
      this.el.style.opacity = "0";
      this.el.style.transform = `translateY(${
        this.currentOffset - this.manager.margin
      }px)`;
      this.onCloseCallbackList.forEach((callback) => {
        callback(this);
      });

      setTimeout(() => {
        this.state.isHide = false;
        this.state.isHidden = true;
        this.destroy();
      }, OUT_DURECTION);
    });
  }

  destroy() {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = null;
    this.onCloseCallbackList.splice(0);
    this.el.parentElement?.removeChild(this.el);
    this.state.isMounted = false;
  }

  get height() {
    const firstChild = this.el.firstChild;
    if (firstChild) return (firstChild as HTMLElement).offsetHeight;
    return 40;
  }

  get currentOffset(): number {
    return +(
      this.el.style.transform.match(/translateY\((\d+)px\)/)?.[1] || "0"
    );
  }

  get isAutoClose() {
    return (
      this.options.duration > 0 && this.options.type !== MessageType.LOADING
    );
  }

  get manager() {
    return messageManager;
  }

  static success(
    message: IMessage,
    options?: Partial<Omit<IMessageOption, "message" | "type">>
  ) {
    return new Message({
      ...options,
      message,
      type: MessageType.SUCCESS,
    });
  }

  static warning(
    message: IMessage,
    options?: Partial<Omit<IMessageOption, "message" | "type">>
  ) {
    return new Message({
      ...options,
      message,
      type: MessageType.WARNING,
    });
  }

  static error(
    message: IMessage,
    options?: Partial<Omit<IMessageOption, "message" | "type">>
  ) {
    return new Message({
      ...options,
      message,
      type: MessageType.ERROR,
    });
  }

  static info(
    message: IMessage,
    options?: Partial<Omit<IMessageOption, "message" | "type">>
  ) {
    return new Message({
      ...options,
      message,
      type: MessageType.INFO,
    });
  }

  static show(
    message: IMessage,
    options?: Partial<Omit<IMessageOption, "message">>
  ) {
    return new Message({
      ...options,
      message,
    });
  }

  static loading(
    message: IMessage,
    options?: Partial<Omit<IMessageOption, "message" | "type">>
  ) {
    return new Message({
      ...options,
      message,
      type: MessageType.LOADING,
    });
  }
}

Message.manager = messageManager;

export default Message;
