window.addEventListener("DOMContentLoaded", main);

const MONTH_NAMES = Array.from({ length: 12 }, (_, i) => {
  return new Date(0, i).toLocaleString("en-US", { month: "long" });
});
console.log(MONTH_NAMES);

function main() {
  console.log("Hi students!");
  // Init today view
  // Init todos list
  // Init calendar
  const calendar = document.querySelector(".app-calendar");

  // Hämta dagarna
  for (let day = 1; day <= 31; day++) {
    // Skapar grid-card elementet
    const dayCard = document.createElement("div");
    // Skapar klassnamnet på grid-card elementet
    dayCard.classList.add("day-card");
    // appendar in dag funktioner in i dayCard Diven
    dayCard.textContent = `${day}`;
    calendar.append(dayCard);
  }

  const month = document.querySelector(".month");
  const monthElement = document.createElement("h1");
  monthElement.classList.add("month");
  
}
