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
  let firstDayOfMonth = new Date(year, month, 1).getDay() - 1;
  if (firstDayOfMonth === -1) {
    firstDayOfMonth = 6;
  }

  // Update the current month span element
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
  const currentMonthElement = document.querySelector(".calendar-current-month");
  currentMonthElement.textContent = monthNames[month];

  daysElement.innerHTML = "";
  weekElement.innerHTML = "";

  updateCurrentYearElement(year);
  updateLeftSideWithCurrentDate(year, month);
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

function createWeekdayList() {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  weekdays.forEach((weekday) => {
    const li = document.createElement("li");
    li.textContent = weekday.substring(0, 3);
    weekElement.appendChild(li);
    
  
  });
}
//Previous months days showing in "empty" cells
function addPreviousMonthDays(year, month, firstDayOfMonth) {
  for (let i = 0; i < firstDayOfMonth; i++) {
    const li = document.createElement("li");
    li.classList.add("inactive");
    li.setAttribute("data-cy", "calendar-cell");
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    li.textContent = prevMonthLastDay - (firstDayOfMonth - i) + 1;
    daysElement.appendChild(li);


  }
}

function addCurrentMonthDays(year, month, daysInMonth) {
  for (let i = 1; i <= daysInMonth; i++) {
    const li = document.createElement("li");
    li.setAttribute("data-cy", "calendar-cell");
    daysElement.appendChild(li);
    
    const dateSpan = document.createElement("span");
    dateSpan.setAttribute("data-cy", "calendar-cell-date")
    dateSpan.className = "date-in-calendar-cells"
    dateSpan.textContent = i;
    li.append(dateSpan)

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
    li.setAttribute("data-cy", "calendar-cell");
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
      dayElement.classList.remove("has-event"); // Ta bort highlight-klassen om det inte finns några händelser längre
    }
  });
}

// Function to show events for the selected day
function showEventsForSelectedDay(storageKey, day) {
  const storedEvents = JSON.parse(localStorage.getItem(storageKey)) || {};
  const eventsForDay = storedEvents[day];

  eventsList.innerHTML = ""; // Clear existing events
  if (eventsForDay) {
    eventsForDay.forEach((eventText) => {
      const eventItem = document.createElement("li");
      const eventSpan = document.createElement("span");
      eventSpan.textContent = eventText;
      eventItem.appendChild(eventSpan);

      
      // Delete Event Icon
      const deleteIcon = document.createElement("i");
      deleteIcon.setAttribute("data-cy", "delete-todo-button");
      deleteIcon.classList.add(
        "fa-solid",
        "fa-xmark",
        "cursor-pointer",
        "delete-event"
        
        );
        deleteIcon.addEventListener("click", () => {
          deleteEvent(storageKey, day, eventText);
          showEventsForSelectedDay(storageKey, day);
          
          
          
        });
        eventItem.appendChild(deleteIcon);
        
      // Edit Event Icon
      const editIcon = document.createElement("i");
      editIcon.classList.add(
        "fa-solid",
        "fa-pencil",
        "cursor-pointer",
        "edit-event"
      );
      editIcon.addEventListener("click", () => {
        editEvent(storageKey, day, eventText);
      });
      eventItem.appendChild(editIcon);

      eventsList.appendChild(eventItem);
    });
  }
}

// DeleteEvent-funktion för att ta bort ett event
function deleteEvent(storageKey, day, eventText) {
  const storedEvents = JSON.parse(localStorage.getItem(storageKey)) || {};
 
          
  
  if (storedEvents[day]) {
    const updatedEventsForDay = storedEvents[day].filter(
      (event) => event !== eventText
    );

    storedEvents[day] = updatedEventsForDay;

    if (storedEvents[day].length === 0) {
      delete storedEvents[day]; // Ta bort dagen helt om inga events återstår
    }

    localStorage.setItem(storageKey, JSON.stringify(storedEvents));

    const dayElements = daysElement.querySelectorAll("li");
    dayElements.forEach((dayElement) => {
      const dayNumber = parseInt(dayElement.textContent);
      if (dayNumber === day) {
        dayElement.classList.remove("has-event");
      }
    });

    //deleteTodo.setAttribute('data-cy', 'delete-todo-button'); // Adding data-cy

    showEventsForSelectedDay(storageKey, day);
  }
}

// Function to edit an event
function editEvent(storageKey, day, eventText) {
  const storedEvents = JSON.parse(localStorage.getItem(storageKey)) || {};
  const eventsForDay = storedEvents[day];

  const index = eventsForDay.indexOf(eventText);
  if (index !== -1) {
    const newEventText = prompt("Edit Event:", eventText);
    if (newEventText !== null && newEventText.trim() !== "") {
      eventsForDay[index] = newEventText;
      localStorage.setItem(storageKey, JSON.stringify(storedEvents));
      showEventsForSelectedDay(storageKey, day);
    }
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



document
  .querySelector(".calendar-change-year-slider-prev")
  .addEventListener("click", () => {
    currentMonth -= 1;
    if (currentMonth < 0) {
      currentMonth = 11; // Wrap around to December when going to previous of January
      currentYear -= 1; // Decrement year when going to previous month of January
    }
    updateCalendar(currentYear, currentMonth);
  });

document
  .querySelector(".calendar-change-year-slider-next")
  .addEventListener("click", () => {
    currentMonth += 1;
    if (currentMonth > 11) {
      currentMonth = 0; // Wrap around to January when going to next of December
      currentYear += 1; // Increment year when going to next month of December
    }
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
  updateTodoCountForDays();
});

// Function to set today's date and highlight events for today
function showToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  // Update calendar to show today's date and events
  updateCalendar(year, month);

  // Find the day element for today
  const dayElements = daysElement.querySelectorAll("li");
  dayElements.forEach((dayElement) => {
    if (
      parseInt(dayElement.textContent) === day &&
      !dayElement.classList.contains("inactive")
    ) {
      dayElement.classList.add("selected-day");
      leftSideDayElement.textContent = day;
      leftSideDayOfWeekElement.textContent = today.toLocaleString("default", {
        weekday: "long",
      });
      showEventsForSelectedDay(`${year}-${month + 1}`, day);
    }
  });
}

// Get the 'Today' navbar item and add click event listener
const todayNavItem = document.querySelector(".nav-item:nth-child(1)");
todayNavItem.addEventListener("click", showToday);

// Initialize calendar with today's date on page load
showToday();

function showEventsForCurrentWeek() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const startOfWeek = new Date(
    currentYear,
    currentMonth,
    currentDay - currentDate.getDay() + 1 // Justera för att börja från måndag
  );
  const endOfWeek = new Date(
    currentYear,
    currentMonth,
    currentDay + (7 - currentDate.getDay()) // Justera för att inkludera söndagen
  );

  const storedKey = `${currentYear}-${currentMonth + 1}`;
  const storedEvents = JSON.parse(localStorage.getItem(storedKey)) || {};

  eventsList.innerHTML = ""; // Clear existing events

  for (let day = startOfWeek.getDate(); day <= endOfWeek.getDate(); day++) {
    if (storedEvents[day]) {
      storedEvents[day].forEach((eventText) => {
        const eventItem = document.createElement("li");
        const eventSpan = document.createElement("span");
        eventSpan.textContent = eventText;
        eventItem.appendChild(eventSpan);

        // Delete Event Icon
        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add(
          "fa-solid",
          "fa-xmark",
          "cursor-pointer",
          "delete-event"
          );
          
        deleteIcon.addEventListener("click", () => {
          deleteEvent(storedKey, day, eventText);
          showEventsForCurrentWeek();
        });
        
        eventItem.appendChild(deleteIcon);

        // Edit Event Icon
        const editIcon = document.createElement("i");
        editIcon.classList.add(
          "fa-solid",
          "fa-pencil",
          "cursor-pointer",
          "edit-event"
        );
        editIcon.addEventListener("click", () => {
          editEvent(storedKey, day, eventText);
        });
        eventItem.appendChild(editIcon);

        eventsList.appendChild(eventItem);
      });
    }
  }
}

// Function to show events for the current month
function showEventsForCurrentMonth() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
  
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const storedKey = `${currentYear}-${currentMonth + 1}`;
    const storedEvents = JSON.parse(localStorage.getItem(storedKey)) || {};
  
    eventsList.innerHTML = ""; // Clear existing events
  
    for (let day = 1; day <= daysInMonth; day++) {
      if (storedEvents[day]) {
        storedEvents[day].forEach((eventText) => {
          const eventItem = document.createElement("li");
          const eventSpan = document.createElement("span");
          eventSpan.textContent = eventText;
          eventItem.appendChild(eventSpan);
  
          // Delete Event Icon
          const deleteIcon = document.createElement("i");
          deleteIcon.classList.add(
            "fa-solid",
            "fa-xmark",
            "cursor-pointer",
            "delete-event"
          );
          deleteIcon.addEventListener("click", () => {
            deleteEvent(storedKey, day, eventText);
            showEventsForCurrentMonth(); // Uppdatera händelser för den aktuella månaden efter borttagning av händelse
            highlightCurrentMonth(); // Markera dagarna för den aktuella månaden igen
          });
          eventItem.appendChild(deleteIcon);
  
          // Edit Event Icon
          const editIcon = document.createElement("i");
          editIcon.classList.add(
            "fa-solid",
            "fa-pencil",
            "cursor-pointer",
            "edit-event"
          );
          editIcon.addEventListener("click", () => {
            editEvent(storedKey, day, eventText);
          });
          eventItem.appendChild(editIcon);
  
          eventsList.appendChild(eventItem);
        });
      }
    }
    highlightCurrentMonth(); // Markera dagarna för den aktuella månaden vid sidans laddning
  }
  

function highlightCurrentWeek() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const startOfWeek = new Date(
    currentYear,
    currentMonth,
    currentDay - currentDate.getDay() + 1 // Justera för att börja från måndag
  );
  const endOfWeek = new Date(
    currentYear,
    currentMonth,
    currentDay + (7 - currentDate.getDay()) // Justera för att inkludera söndagen
  );

  const dayElements = daysElement.querySelectorAll("li");
  dayElements.forEach((dayElement) => {
    const day = parseInt(dayElement.textContent);
    const date = new Date(currentYear, currentMonth, day);

    // Kontrollera att det är en giltig dag (inte inaktiv)
    if (!dayElement.classList.contains("inactive")) {
      if (date >= startOfWeek && date <= endOfWeek) {
        dayElement.style.background = "#404040"; // Markera hela veckan
        if (!dayElement.classList.contains("has-event")) {
          dayElement.style.backgroundColor = ""; // Återställ endast bakgrundsfärg om det inte finns några händelser
        }
      } else {
        dayElement.style.backgroundColor = ""; // Återställ till standard bakgrundsfärg för dagar utanför veckan
      }
    }
  });
}

function highlightCurrentMonth() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const dayElements = daysElement.querySelectorAll("li");
  dayElements.forEach((dayElement) => {
    const day = parseInt(dayElement.textContent);
    const date = new Date(currentYear, currentMonth, day);

    if (!dayElement.classList.contains("inactive")) {
      if (date.getMonth() === currentMonth) {
        dayElement.style.background = "#404040"; // Markera hela månaden
        if (!dayElement.classList.contains("has-event")) {
          dayElement.style.backgroundColor = ""; // Återställ endast bakgrundsfärg om det inte finns några händelser
        }
      } else {
        dayElement.style.backgroundColor = ""; // Återställ till standard bakgrundsfärg för dagar utanför månaden
      }
    }
  });
}

const thisWeekNavItem = document.querySelector(".nav-item:nth-child(2)");
thisWeekNavItem.addEventListener("click", () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  updateCalendar(currentYear, currentMonth); // Uppdatera kalendern till aktuell månad
  showEventsForCurrentWeek(); // Visa händelser för aktuell vecka
  highlightCurrentWeek(); // Markera dagarna i veckan
});

const thisMonthNavItem = document.querySelector(".nav-item:nth-child(3)");
thisMonthNavItem.addEventListener("click", () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  updateCalendar(currentYear, currentMonth); // Uppdatera kalendern till aktuell månad
  showEventsForCurrentMonth(); // Visa händelser för aktuell månad
  highlightCurrentMonth(); // Markera dagarna i månaden
});


// function for counting the todos in the day cells
function updateTodoCountForDays() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const storedKey = `${currentYear}-${currentMonth + 1}`;
  const storedEvents = JSON.parse(localStorage.getItem(storedKey)) || {};

  const dayElements = daysElement.querySelectorAll("li");
  dayElements.forEach((dayElement) => {
    const day = parseInt(dayElement.textContent);
    
    
    if (!dayElement.classList.contains("inactive")) {
      const todoCount = storedEvents[day] ? storedEvents[day].length : 0;
      
      // Check if there are todos for the day
      if (todoCount > 0) {
        const todoCountSpan = document.createElement("span");
        todoCountSpan.classList.add("todo-count");
        todoCountSpan.textContent = todoCount;
        todoCountSpan.className = "todo-count";
        todoCountSpan.setAttribute("data-cy", "calendar-cell-todos");
        dayElement.appendChild(todoCountSpan);
      }
    }
  });
}

// Call the function to update todo count on page load
updateTodoCountForDays();
