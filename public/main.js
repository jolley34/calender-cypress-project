window.addEventListener('DOMContentLoaded', main);

function main() {
  console.log('Hi students!');
  // Init today view
  // Init todos list
  // Init calendar
  const calendar = document.querySelector(".app-calendar")

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
}
