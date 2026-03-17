export function backButton(element, to = "/") {
  element.addEventListener("click", () => {
    if (history.length > 1) {
      history.back();
    } else {
      window.location.href = to;
    }
  });
}
