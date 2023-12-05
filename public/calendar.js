// Get the elements
const daysElement = document.querySelector(".calendar-days");
const monthListElement = document.querySelector(".calendar-month");
const weekElement = document.querySelector(".calendar-week");
const currentYearElement = document.querySelector(".calendar-current-year");
const leftSideDayElement = document.querySelector(".calendar-left-side-day");
const leftSideDayOfWeekElement = document.querySelector(
  ".calendar-left-side-day-of-week"
);
const addEventField = document.querySelector(".add-event-day-field");
const addEventButton = document.querySelector(".add-event-day-field-btn");
const eventsList = document.querySelector(".current-day-events-list");

// Function to update calendar based on current month and year
function updateCalendar(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  daysElement.innerHTML = "";
  monthListElement.innerHTML = "";
  weekElement.innerHTML = "";

  updateCurrentYearElement(year);
  updateLeftSideWithCurrentDate(year, month);
  createMonthList(month);
  createWeekdayList();
  addPreviousMonthDays(year, month, firstDayOfMonth);
  addCurrentMonthDays(year, month, daysInMonth);
  addNextMonthDays(year, month, daysInMonth, firstDayOfMonth);
  highlightDaysWithEvents(year, month);
}

function updateCurrentYearElement(year) {
  currentYearElement.textContent = year;
}

function updateLeftSideWithCurrentDate(year, month) {
  const currentDate = new Date();
  if (currentDate.getFullYear() === year && currentDate.getMonth() === month) {
    leftSideDayElement.textContent = currentDate.getDate();
    leftSideDayOfWeekElement.textContent = currentDate.toLocaleString(
      "default",
      { weekday: "long" }
    );
  } else {
    leftSideDayElement.textContent = "";
    leftSideDayOfWeekElement.textContent = "";
  }
}

function createMonthList(month) {
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
  monthNames.forEach((monthName, index) => {
    const li = document.createElement("li");
    li.textContent = monthName.substring(0, 3);
    if (index === month) {
      li.classList.add("active");
    }
    monthListElement.appendChild(li);
  });
}

function createWeekdayList() {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  weekdays.forEach((weekday) => {
    const li = document.createElement("li");
    li.textContent = weekday.substring(0, 3);
    weekElement.appendChild(li);
  });
}

function addPreviousMonthDays(year, month, firstDayOfMonth) {
  for (let i = 0; i < firstDayOfMonth; i++) {
    const li = document.createElement("li");
    li.classList.add("inactive");
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    li.textContent = prevMonthLastDay - (firstDayOfMonth - i) + 1;
    daysElement.appendChild(li);
  }
}

function addCurrentMonthDays(year, month, daysInMonth) {
  for (let i = 1; i <= daysInMonth; i++) {
    const li = document.createElement("li");
    li.textContent = i;
    daysElement.appendChild(li);

    // Add event listener to each day element
    li.addEventListener("click", () => {
      const selectedDay = new Date(year, month, i);

      // Remove existing selected class from all days
      const dayElements = daysElement.querySelectorAll("li");
      dayElements.forEach((dayElement) => {
        dayElement.classList.remove("selected-day");
      });

      // Add selected class to the clicked day
      li.classList.add("selected-day");

      // Display the selected day in the left side elements
      leftSideDayElement.textContent = selectedDay.getDate();
      leftSideDayOfWeekElement.textContent = selectedDay.toLocaleString(
        "default",
        { weekday: "long" }
      );

      // Show events for the selected day
      showEventsForSelectedDay(`${year}-${month + 1}`, i);
    });

    // Highlight the current day with box shadow
    highlightCurrentDay(li, year, month, i);

    // Highlight only the current month's days
    const currentDate = new Date();
    if (
      month === currentDate.getMonth() &&
      year === currentDate.getFullYear()
    ) {
      li.classList.remove("inactive");
    }
  }
}

function addNextMonthDays(year, month, daysInMonth, firstDayOfMonth) {
  const totalCells = daysElement.children.length;
  const remainingCells = 42 - totalCells; // 6 rows x 7 columns (42 cells)
  for (let i = 1; i <= remainingCells; i++) {
    const li = document.createElement("li");
    li.classList.add("inactive");
    li.textContent = i;
    daysElement.appendChild(li);
  }
}

function highlightDaysWithEvents(year, month) {
  const storedKey = `${year}-${month + 1}`;
  const storedEvents = JSON.parse(localStorage.getItem(storedKey)) || {};

  const dayElements = daysElement.querySelectorAll("li");
  dayElements.forEach((dayElement) => {
    const dayNumber = parseInt(dayElement.textContent);
    if (storedEvents[dayNumber] && !dayElement.classList.contains("inactive")) {
      dayElement.classList.add("has-event");
    } else {
      dayElement.classList.remove("has-event");
    }
  });
}

// Function to show events for the selected day
function showEventsForSelectedDay(storageKey, day) {
  const storedEvents = JSON.parse(localStorage.getItem(storageKey)) || {};
  const eventsForDay = storedEvents[day];

  eventsList.innerHTML = ""; // Clear existing events
  if (eventsForDay) {
    eventsForDay.forEach((event) => {
      const eventItem = document.createElement("li");
      eventItem.textContent = event;
      eventsList.appendChild(eventItem);
    });
  }
}

// Function to highlight the current day with box shadow
function highlightCurrentDay(element, year, month, day) {
  const currentDate = new Date();
  if (
    currentDate.getFullYear() === year &&
    currentDate.getMonth() === month &&
    currentDate.getDate() === day
  ) {
    element.style.boxShadow = "0 0 5px 3px #f2f2f2"; // Change the box shadow style as needed
  }
}

// Get the current date
const currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

// Initial calendar update
updateCalendar(currentYear, currentMonth);

// Event listeners for changing months and years
monthListElement.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    const monthIndex = Array.from(event.target.parentNode.children).indexOf(
      event.target
    );
    currentMonth = monthIndex;
    updateCalendar(currentYear, currentMonth);
  }
});

document
  .querySelector(".calendar-change-year-slider-prev")
  .addEventListener("click", () => {
    currentYear -= 1;
    updateCalendar(currentYear, currentMonth);
  });

document
  .querySelector(".calendar-change-year-slider-next")
  .addEventListener("click", () => {
    currentYear += 1;
    updateCalendar(currentYear, currentMonth);
  });

addEventButton.addEventListener("click", () => {
  const selectedDay = parseInt(leftSideDayElement.textContent);
  const storedKey = `${currentYear}-${currentMonth + 1}`;
  const storedEvents = JSON.parse(localStorage.getItem(storedKey)) || {};

  const eventText = addEventField.value;
  if (eventText.trim() !== "") {
    if (!storedEvents[selectedDay]) {
      storedEvents[selectedDay] = [];
    }
    storedEvents[selectedDay].push(eventText);
    localStorage.setItem(storedKey, JSON.stringify(storedEvents));

    // Update the UI to show the event for the selected day
    showEventsForSelectedDay(storedKey, selectedDay);

    // Highlight the day with an event only if it's not an inactive day
    const dayElements = daysElement.querySelectorAll("li");
    dayElements.forEach((dayElement) => {
      const dayNumber = parseInt(dayElement.textContent);
      if (
        dayNumber === selectedDay &&
        !dayElement.classList.contains("inactive") // Exclude inactive days
      ) {
        dayElement.classList.add("has-event");
      }
    });

    addEventField.value = ""; // Clear input field after adding the event
  }
});
