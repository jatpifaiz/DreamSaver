import { backButton } from "../components/backButton.js";
// import { formatIDR } from "../components/formatIDR.js";

const submitButton = document.getElementById("submit-button");

const nameGoal = document.getElementById("name");
const savingsGoal = document.getElementById("goal-saving");
const goalCategory = document.getElementById("category");
const goalPriority = document.getElementById("priority");
const savingsCurrency = document.getElementById("currency");
const savingFrequency = document.getElementById("saving-frequency");
const startDate = document.getElementById("start-date");
const recSavingAmount = document.getElementById("saving-amount");
// const finishDay = document.getElementById("finish_day");
const recEstimatedCompletion = document.getElementById("estimated");
// const recFreqEl = document.getElementById("recFreq");
const imageItem = document.getElementById("image");
const preview = document.getElementById("preview");
const totalDays = document.getElementById("total-days");

const backBtn = document.getElementById("back");
backButton(backBtn, "../index.html");

let imageData = null;

imageItem.addEventListener("change", () => {
  const file = imageItem.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");

      const MAX_WIDTH = 300;
      const scale = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      imageData = canvas.toDataURL("image/jpeg", 0.7);

      preview.src = imageData;
      preview.style.display = "block";
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});

async function analyzeWithPython() {
  const goal = savingsGoal.value;
  const frequency = savingFrequency.value;
  const startDay = startDate.value;

  if (!goal || !frequency || !startDay) return;

  const res = await fetch("http://127.0.0.1:5000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      goal: goal,
      frequency: frequency,
      start_day: startDay,
    }),
  });

  const result = await res.json();

  recSavingAmount.textContent = result.saving_amount;
  // recFreqEl.textContent = result.frequency;
  recEstimatedCompletion.textContent = result.estimated_finish;
  // finishDay.textContent = result.finish_date;
  totalDays.textContent = `${result.total_days} hari`;
}

let timer;
function debounceAnalyze() {
  clearTimeout(timer);
  timer = setTimeout(analyzeWithPython, 400);
}

savingsGoal.addEventListener("input", debounceAnalyze);
savingFrequency.addEventListener("change", debounceAnalyze);
startDate.addEventListener("change", debounceAnalyze);

const validateForm = () => {
  if (!nameGoal.value.trim()) {
    alert("Nama goal wajib diisi");
    return false;
  }

  if (
    !savingsGoal.value ||
    Number(savingsGoal.value) <= 0 ||
    Number(savingsGoal.value) > 1000000000
  ) {
    alert("Target tabungan harus angka lebih dari 0 dan jangan terlalu besar");
    return false;
  }

  if (!savingFrequency.value) {
    alert("Pilih frekuensi menabung");
    return false;
  }

  if (!startDate.value) {
    alert("Pilih tanggal mulai");
    return false;
  }

  return true;
};

const resetForm = () => {
  nameGoal.value = "";
  savingsGoal.value = "";
  goalCategory.value = "";
  goalPriority.value = "";
  savingsCurrency.value = "";
  savingFrequency.value = "";
  startDate.value = "";

  recSavingAmount.textContent = "-";
  // recFreqEl.textContent = "-";
  totalDays.textContent = "-";
  recEstimatedCompletion.textContent = "-";

  preview.src = "";
  preview.style.display = "none";
  imageData = null;
};

submitButton.addEventListener("click", () => {
  if (!validateForm()) return;

  let db = JSON.parse(localStorage.getItem("dreamSaverDB")) || [];

  let newData = {
    id: Date.now(),
    name: nameGoal.value,
    goal: Number(savingsGoal.value),
    image: imageData,
    category: goalCategory.value,
    priority: goalPriority.value,
    currency: savingsCurrency.value,
    startSavingDate: startDate.value,
    savingFrequency: savingFrequency.value,
    estimasi: recEstimatedCompletion.textContent,
    totalDays: totalDays.textContent,
  };
  db.push(newData);

  localStorage.setItem("dreamSaverDB", JSON.stringify(db));

  alert("Goal berhasil ditambahkan");
  resetForm();
});
