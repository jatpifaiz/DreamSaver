import { backButton } from "./back-button.js";

document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById("header-container");

  if (!headerContainer) return;

  const pageTitle = headerContainer.dataset.pageTitle || "";

  fetch("/frontend/components/page-header.html")
    .then((response) => response.text())
    .then((data) => {
      headerContainer.innerHTML = data;

      const headerTitle = headerContainer.querySelector(".header-title");
      if (headerTitle) headerTitle.textContent = pageTitle;

      initHeaderEvents(headerContainer);
    })
    .catch((error) => {
      console.error("header gagal dimuat: ", error);
    });
});

function initHeaderEvents(container) {
  const backBtn = container.querySelector("#back");
  const backUrl = container.dataset.backUrl;

  if (backBtn) {
    backButton(backBtn, backUrl);
  }
}
