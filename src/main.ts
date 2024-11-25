import { Message } from "./Message";

const message = new Message({
  message: "这是一个消息",
  type: "success",
  icon: "/path/to/icon.png",
  showClose: true,
  duration: 3000,
  appendTo: document.body,
});
