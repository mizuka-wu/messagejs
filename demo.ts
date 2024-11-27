import { Message } from "./src";

function isShowClose(): boolean {
  return (document.getElementById("closeable") as HTMLInputElement).checked;
}

function getMessage(): string {
  return (document.getElementById("message") as HTMLInputElement).value;
}

function showMessage(
  type: "success" | "error" | "info" | "warning" | "loading"
): Message {
  const result = Message[type](getMessage(), {
    showClose: isShowClose(),
  });
  console.log(result);
  return result;
}

document.getElementById("success")?.addEventListener("click", () => {
  showMessage("success");
});

document.getElementById("error")?.addEventListener("click", () => {
  showMessage("error");
});

document.getElementById("info")?.addEventListener("click", () => {
  showMessage("info");
});

document.getElementById("warning")?.addEventListener("click", () => {
  showMessage("warning");
});

document.getElementById("loading")?.addEventListener("click", () => {
  showMessage("loading");
});
