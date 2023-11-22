window.addEventListener("DOMContentLoaded", main);

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const date = new Date();
const monthNow = date.getMonth();
console.log(monthNames[monthNow]);

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

  const monthContainer = document.querySelector(".month");
  const monthElement = document.createElement("h1");
  monthElement.classList.add("month");
  monthElement.textContent = `${monthNames[monthNow]}`;
  monthContainer.append(monthElement);
}