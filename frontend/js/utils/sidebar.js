document.addEventListener("DOMContentLoaded", () => {
  const sidebarContainer = document.getElementById("sidebar-container");

  if (!sidebarContainer) return;

  fetch("/frontend/components/sidebar.html")
    .then((response) => response.text())
    .then((data) => {
      sidebarContainer.innerHTML = data;
    })
    .catch((error) => {
      console.error("sidebar gagal dimuat: ", error);
    });
});
