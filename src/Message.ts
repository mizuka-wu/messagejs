import { IMessageOption, IMessage } from "./type.ts";

export class Message implements IMessage {
  private messageElement: HTMLElement;

  constructor(options: IMessageOption) {
    const template = `
      <div class="message">
        ${
          options.type
            ? `<span class="message__type">${options.type}</span>`
            : ""
        }
        ${
          options.icon
            ? `<img src="${options.icon}" alt="icon" class="message__icon">`
            : ""
        }
        <span class="message__text">${
          typeof options.message === "function"
            ? options.message()
            : options.message || ""
        }</span>
        ${options.showClose ? `<button class="message__close">×</button>` : ""}
      </div>
    `;

    this.messageElement = document.createElement("div");
    this.messageElement.innerHTML = template;

    if (options.customClass) {
      this.messageElement.classList.add(options.customClass);
    }

    if (options.center) {
      this.messageElement.classList.add("message--center");
    }

    const offset = options.offset || 20;
    this.messageElement.style.top = `${offset}px`;

    document.body.appendChild(this.messageElement);

    if (options.duration && options.duration > 0) {
      setTimeout(() => {
        this.close();
        if (options.onClose) {
          options.onClose(this);
        }
      }, options.duration);
    }

    const closeButton = this.messageElement.querySelector(".message__close");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        this.close();
        if (options.onClose) {
          options.onClose(this);
        }
      });
    }
  }

  public close(): void {
    this.messageElement.remove();
  }
}
