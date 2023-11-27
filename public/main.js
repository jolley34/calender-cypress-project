window.addEventListener("DOMContentLoaded", main);

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const dayNames = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

let currentMonthIndex = new Date().getMonth();

function main() {
  updateCalendarDays();

  const monthElement = document.querySelector(".month");
  monthElement.textContent = `${monthNames[currentMonthIndex]}`;

  const prevMonthIcon = document.querySelector(".prev-month");
  const nextMonthIcon = document.querySelector(".next-month");

  prevMonthIcon.addEventListener("click", showPreviousMonth);
  nextMonthIcon.addEventListener("click", showNextMonth);
}

function updateCalendarDays() {
  const calendar = document.querySelector(".app-calendar");
  calendar.innerHTML = "";

  const daysInMonth = new Date(
    new Date().getFullYear(),
    currentMonthIndex + 1,
    0
  ).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(new Date().getFullYear(), currentMonthIndex, day);
    const dayCard = document.createElement("div");
    dayCard.classList.add("day-card");

    const dayNumber = document.createElement("h1");
    dayNumber.textContent = `${day}`;
    dayCard.appendChild(dayNumber);

    const dayOfWeek = document.createElement("h1");
    dayOfWeek.textContent = `${dayNames[currentDate.getDay()]}`;
    dayCard.appendChild(dayOfWeek);

    calendar.append(dayCard);
  }
}

function showPreviousMonth() {
  currentMonthIndex = (currentMonthIndex - 1 + 12) % 12;
  updateDisplayedMonth();
  updateCalendarDays();
}

function showNextMonth() {
  currentMonthIndex = (currentMonthIndex + 1) % 12;
  updateDisplayedMonth();
  updateCalendarDays();
}

function updateDisplayedMonth() {
  const monthElement = document.querySelector(".month");
  monthElement.textContent = `${monthNames[currentMonthIndex]}`;
}
