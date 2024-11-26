import { Message } from "./src";

function isShowClose(): boolean {
  return (document.getElementById("closeable") as HTMLInputElement).checked;
}

function getMessage(): string {
  return (document.getElementById("message") as HTMLInputElement).value;
}

function showSuccess(
  type: "success" | "error" | "info" | "warning" | "loading"
): Message {
  const result = Message[type](getMessage(), {
    showClose: isShowClose(),
  });
  console.log(result);
  return result;
}

document.getElementById("success")?.addEventListener("click", () => {
  showSuccess("success");
});

document.getElementById("error")?.addEventListener("click", () => {
  showSuccess("error");
});

document.getElementById("info")?.addEventListener("click", () => {
  showSuccess("info");
});

document.getElementById("warning")?.addEventListener("click", () => {
  showSuccess("warning");
});

document.getElementById("loading")?.addEventListener("click", () => {
  showSuccess("loading");
});
