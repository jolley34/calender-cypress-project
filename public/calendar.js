// Get elements
const getElement = (selector) => document.querySelector(selector);

const elements = {
  daysElement: getElement(".calendar-days"),
  monthListElement: getElement(".calendar-month"),
  weekElement: getElement(".calendar-week"),
  currentYearElement: getElement(".calendar-current-year"),
  leftSideDayElement: getElement(".calendar-left-side-day"),
  leftSideDayOfWeekElement: getElement(".calendar-left-side-day-of-week"),
  addEventField: getElement(".add-event-day-field"),
  addEventButton: getElement(".add-event-day-field-btn"),
  eventsList: getElement(".current-day-events-list"),
};

// Function to get the number of days in a month
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// Function to get the first day of the month
function getFirstDayOfMonth(year, month) {
  let firstDayOfMonth = new Date(year, month, 1).getDay();
  firstDayOfMonth = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;
  firstDayOfMonth -= 1;
  if (firstDayOfMonth === -1) {
    firstDayOfMonth = 6;
  }
  return firstDayOfMonth;
}

// Function to update calendar based on current month and year
function updateCalendar(year, month) {
  clearElements();
  updateCurrentYearAndMonthElement(year, month);
  updateLeftSideWithCurrentDate(year, month);
  createWeekdayList();
  
  let daysInMonth = getDaysInMonth(year, month);
  let firstDayOfMonth = getFirstDayOfMonth(year, month);

  addPreviousMonthDays(year, month, firstDayOfMonth);
  addCurrentMonthDays(year, month, daysInMonth);
  addNextMonthDays(year, month, daysInMonth, firstDayOfMonth);
  highlightDaysWithEvents(year, month);
}

// Clear elements
function clearElements() {
  elements.daysElement.innerHTML = "";
  elements.weekElement.innerHTML = "";
}

function updateCurrentYearAndMonthElement(year, month) {
  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
  elements.currentYearElement.textContent = `${months[month]} ${year}`;
}

// Update left side with current date
function updateLeftSideWithCurrentDate(year, month) {
  const currentDate = new Date();
  if (currentDate.getFullYear() === year && currentDate.getMonth() === month) {
    elements.leftSideDayElement.textContent = currentDate.getDate();
    elements.leftSideDayOfWeekElement.textContent = currentDate.toLocaleString("default", { weekday: "long" });
  } else {
    elements.leftSideDayElement.textContent = "";
    elements.leftSideDayOfWeekElement.textContent = "";
  }
}

// Create weekday list
function createWeekdayList() {
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  weekdays.forEach((weekday) => {
    const li = document.createElement("li");
    li.textContent = weekday.substring(0, 3);
    elements.weekElement.appendChild(li);
  });
}

// Add previous month days
function addPreviousMonthDays(year, month, firstDayOfMonth) {
  const daysElement = elements.daysElement;
  for (let i = 0; i < firstDayOfMonth; i++) {
    const li = document.createElement("li");
    li.classList.add("inactive");
    li.setAttribute("data-cy", "calendar-cell");
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    li.textContent = prevMonthLastDay - (firstDayOfMonth - i) + 1;
    daysElement.appendChild(li);
  }
}

// Add current month days
function addCurrentMonthDays(year, month, daysInMonth) {
  const daysElement = elements.daysElement;
  for (let i = 1; i <= daysInMonth; i++) {
    const li = document.createElement("li");
    li.setAttribute("data-cy", "calendar-cell");
    daysElement.appendChild(li);

    const dateSpan = document.createElement("span");
    dateSpan.setAttribute("data-cy", "calendar-cell-date");
    dateSpan.textContent = i;
    li.append(dateSpan);

    li.addEventListener("click", () => {
      handleDayClick(year, month, i, li);
    });

    highlightCurrentDay(li, year, month, i);
  }
}

// Add next month days
function addNextMonthDays() {
  const daysElement = elements.daysElement;
  const totalCells = daysElement.children.length;
  const remainingCells = 42 - totalCells;

  for (let i = 1; i <= remainingCells; i++) {
    const li = document.createElement("li");
    li.setAttribute("data-cy", "calendar-cell");
    li.classList.add("inactive");
    li.textContent = i;
    daysElement.appendChild(li);
  }
}

// Highlight days with events
function highlightDaysWithEvents() {
  const dayElements = elements.daysElement.querySelectorAll("li");
  dayElements.forEach((dayElement) => {
    // Logic to highlight days with events (if required)
    // Example:
    // const dayNumber = parseInt(dayElement.textContent);
    // if (eventsForDayContainsEvent(year, month, dayNumber)) {
    //   dayElement.classList.add("has-event");
    // } else {
    //   dayElement.classList.remove("has-event");
    // }
  });
}

// Handle day click
function handleDayClick(year, month, day, li) {
  const selectedDay = new Date(year, month, day);
  const dayElements = elements.daysElement.querySelectorAll("li");

  dayElements.forEach((dayElement) => {
    dayElement.classList.remove("selected-day");
  });

  li.classList.add("selected-day");

  updateLeftSideWithSelectedDate(selectedDay);
  // Show events for selected day
  // showEventsForSelectedDay(`${year}-${month + 1}`, day);
}

// Update left side with selected date
function updateLeftSideWithSelectedDate(selectedDay) {
  elements.leftSideDayElement.textContent = selectedDay.getDate();
  elements.leftSideDayOfWeekElement.textContent = selectedDay.toLocaleString("default", { weekday: "long" });
}


// Highlight current day
function highlightCurrentDay(element, year, month, day) {
  const currentDate = new Date();
  if (
    currentDate.getFullYear() === year &&
    currentDate.getMonth() === month &&
    currentDate.getDate() === day
  ) {
    element.style.boxShadow = "0 0 5px 3px #f2f2f2";
  }
}

// event listeners

// Previous month click event
getElement(".calendar-change-year-slider-prev").addEventListener("click", () => {
  currentMonth -= 1;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear -= 1;
  }
  updateCalendar(currentYear, currentMonth);
});

// Next month click event
getElement(".calendar-change-year-slider-next").addEventListener("click", () => {
  currentMonth += 1;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear += 1;
  }
  updateCalendar(currentYear, currentMonth);
});

// Add event button click event
elements.addEventButton.addEventListener("click", () => {
  const selectedDay = parseInt(elements.leftSideDayElement.textContent);
  const eventText = elements.addEventField.value.trim();
  if (eventText !== "") {
    // Logic to add event for selected day
    // Example:
    // addEvent(selectedDay, eventText);
  }
});

// Other event listeners and functions can be similarly modularized for cleaner code structure.

// Initialize calendar
const currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

updateCalendar(currentYear, currentMonth); // Initial calendar update
