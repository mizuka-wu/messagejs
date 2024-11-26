export const CLASS_NAME = "simple-message";

export const IN_DURECTION = 300;
export const OUT_DURECTION = 300;

export enum MessageType {
  "SUCCESS" = "success",
  "ERROR" = "error",
  "WARNING" = "warning",
  "INFO" = "info",
  "LOADING" = "loading",
}

export const MESSAGE_COLOR: Record<
  MessageType | "default",
  { color: string; background: string }
> = {
  [MessageType.SUCCESS]: {
    color: "#67C23A",
    background: "rgb(239.8, 248.9, 235.3)",
  },
  [MessageType.ERROR]: {
    color: "#F56C6C",
    background: "rgb(254, 240.3, 240.3)",
  },
  [MessageType.WARNING]: {
    color: "#E6A23C",
    background: "rgb(252.5, 245.7, 235.5)",
  },
  [MessageType.INFO]: {
    color: "#409EFF",
    background: "rgb(235.9, 245.3, 255)",
  },
  [MessageType.LOADING]: {
    color: "#409EFF",
    background: "rgb(235.9, 245.3, 255)",
  },
  default: {
    color: "#303133",
    background: "rgb(243.9, 244.2, 244.8)",
  },
};

export const ICON = {
  [MessageType.SUCCESS]: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${MESSAGE_COLOR.success.color}" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg>`,
  [MessageType.ERROR]: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${MESSAGE_COLOR.error.color}" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
</svg>`,
  [MessageType.WARNING]: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${MESSAGE_COLOR.warning.color}" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
</svg>`,
  [MessageType.INFO]: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${MESSAGE_COLOR.info.color}" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
</svg>`,
  [MessageType.LOADING]: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="none" stroke-opacity="1" stroke="${MESSAGE_COLOR.info.color}" stroke-width=".5" cx="100" cy="100" r="0"><animate attributeName="r" calcMode="spline" dur="2" values="1;80" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate><animate attributeName="stroke-width" calcMode="spline" dur="2" values="0;25" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" calcMode="spline" dur="2" values="1;0" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate></circle></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>`,
};
