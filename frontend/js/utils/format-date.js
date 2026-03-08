export function formatTanggalSingkat(dateStr) {
  const date = new Date(dateStr);

  const hari = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  const bulan = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const h = hari[date.getDay()]; // nama hari
  const d = date.getDate(); // tanggal
  const m = bulan[date.getMonth()]; // nama bulan

  return `${h.toLowerCase()}, ${d} ${m}`;
}
