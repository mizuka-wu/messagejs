import { MessageType, MESSAGE_COLOR, ICON } from "./const";

/**
 * 更新定位容器
 * @param el
 */
export function updateContainerStyle(el: HTMLElement) {
  el.style.position = "absolute";
  el.style.top = "0";
  el.style.left = "0";
  el.style.right = "0";
  el.style.margin = "auto";

  el.style.display = "flex";
  el.style.justifyContent = "center";

  // 动画部分
  el.style.transitionProperty = "all";
  el.style.opacity = "0";
  el.style.transform = "translateY(0)";
  el.style.transitionDuration = "0ms";
  el.style.transitionTimingFunction = "ease-in-out";
}

/**
 * 更新内容容器
 * @param el
 * @param type
 */
export function updateContentContainerStyle(
  el: HTMLElement,
  type: MessageType,
  showClose: boolean
) {
  el.style.display = "flex";
  el.style.justifyContent = "start";
  el.style.alignItems = "start";
  el.style.padding = "7px 9px";
  el.style.borderRadius = "6px";
  el.style.boxShadow = "1px 2px 20px rgba(100, 100, 100, 0.2)";
  el.style.borderWidth = "1px";
  el.style.borderStyle = "solid";
  el.style.borderColor = MESSAGE_COLOR.default.color;

  // 文字样式
  el.style.fontSize = "14px";
  el.style.lineHeight = "20px";
  el.style.fontWeight = "400";

  el.style.maxWidth = "min(80vw, 600px)"; // 最大宽度

  // 默认样式
  el.style.color = MESSAGE_COLOR.default.color;
  el.style.backgroundColor = MESSAGE_COLOR.default.background;

  // 改变背景颜色 + 边框颜色
  if (type === MessageType.LOADING || !showClose) {
    const { background, color } = MESSAGE_COLOR[type];
    el.style.borderColor = color;
    el.style.backgroundColor = background;
    el.style.color = color;
  }
}

/**
 * 更新内容的样式
 * @param el
 */
export function updateContentStyle(el: HTMLElement) {
  el.style.overflow = "hidde";
  el.style.textOverflow = "ellipsis";
  el.style.wordBreak = "break-all";
  el.style.display = "-webkit-box";
  el.style.webkitBoxOrient = "vertical";
  el.style.webkitLineClamp = "2";
  el.style.flex = "1";
}

/**
 * 更新icon
 * @param el
 */
export function updateIconStyle(
  el: HTMLElement,
  type: MessageType,
  customIcon: string
) {
  el.style.width = "14px";
  el.style.height = "14px";
  el.style.margin = "3px 8px 3px 0";

  el.style.backgroundSize = "14px 14px";
  el.style.backgroundRepeat = "no-repeat";
  el.style.backgroundPosition = "center center";

  const icon = customIcon.startsWith("<svg") ? customIcon : ICON[type];
  el.style.backgroundImage = `url(data:image/svg+xml;base64,${btoa(icon)})`;
}

/**
 * 更新close
 * @param el
 */
export function updateCloseContainerStyle(el: HTMLElement) {
  el.style.width = "20px";
  el.style.height = "20px";
  el.style.boxSizing = "content-box";
  el.style.padding = "2px";
  el.style.margin = `-2px -2px -2px ${-2 + 8}px`;
  el.style.cursor = "pointer";
  el.style.borderRadius = "6px";
  el.style.transition = "all 0.3s ease-in-out";
  el.style.background = "transparent";

  el.style.display = "flex";
  el.style.justifyContent = "center";
  el.style.alignItems = "center";

  el.onmouseover = () => (el.style.background = "#EBEDF0");
  el.onmouseout = () => (el.style.background = "transparent");
}

/**
 * 更新close
 * @param el
 */
export function updateCloseIconStyle(el: HTMLElement) {
  el.style.width = "14px";
  el.style.height = "14px";
  el.style.backgroundSize = "14px 14px";
  el.style.backgroundRepeat = "no-repeat";
  el.style.backgroundPosition = "center center";
  el.style.backgroundImage = `url(data:image/svg+xml;base64,${btoa(
    ICON.close
  )})`;
}
