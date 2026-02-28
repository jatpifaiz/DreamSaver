import { formatTanggalSingkat } from "../components/formatDate.js";

const addGoalHandler = document.getElementById("add-goal-handler");
addGoalHandler.addEventListener("click", () => {
  window.location.href = "frontend/pages/input.html";
});

const goalsContainer = document.getElementById("goals-container");

let datas = JSON.parse(localStorage.getItem("dreamSaverDB")) || [];

if (datas.length === 0) {
  goalsContainer.innerHTML = "<p>Belum ada goal. Tambah satu dulu.</p>";
}

datas.forEach((data) => {
  const itemCard = document.createElement("div");
  itemCard.classList.add("goal-container");
  console.log(data);

  const dateStart = formatTanggalSingkat(data.startSavingDate);

  const imageHTML = data.image
    ? `<img src="${data.image}" alt="goal image" width="80" height="80" style="background-size:cover">`
    : `<div style="width:80px;height:80px;background:#ddd;"></div>`;

  itemCard.innerHTML = `
    <div class="goal-main">
      <div class="goal-image">
        ${imageHTML}
      </div>

      <div class="goal-information">
        <h2>${data.name}</h2>
        <span>Progress 0%</span>
        <p>Rp ${data.goal}</p>
      </div>
    </div>

    <div class="goal-footer">
      <p class="savFreq">Frequency: <span>${data.savingFrequency}</span></p>
      <p class="total-days"><span>${data.totalDays}</span></p>
      <p><span>${dateStart}</span> - <span>${data.estimasi}</span></p>
    </div>
  `;

  goalsContainer.appendChild(itemCard);
});
