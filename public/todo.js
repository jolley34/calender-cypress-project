function addEvent(selectedDay, eventText) {
  const year = currentYear;
  const month = currentMonth;

  // Load existing todos from localStorage
  loadEvent();

  const newEvent = {
    date: `${year}-${month + 1}-${selectedDay}`,
    text: eventText,
  };

  // Add the new event to the todos array
  todos.push(newEvent);

  // Save updated todos to localStorage
  saveEvent();

  // Update event list to reflect the added event for the selected day
  showEventsForSelectedDay(year, month, selectedDay);
}

// Function to delete an event
function deleteEvent(selectedYear, selectedMonth, selectedDay, eventText) {
  const selectedDate = `${selectedYear}-${selectedMonth + 1}-${selectedDay}`;
  todos = todos.filter(
    (event) => !(event.date === selectedDate && event.text === eventText)
  );
  saveEvent();
  showEventsForSelectedDay(selectedYear, selectedMonth, selectedDay);
}

// Function to handle the delete event click
function handleDeleteClick(selectedYear, selectedMonth, selectedDay, eventText) {
  return function() {
    deleteEvent(selectedYear, selectedMonth, selectedDay, eventText);
  };
}

// Update the showEventsForSelectedDay function to include delete buttons
function showEventsForSelectedDay(selectedYear, selectedMonth, selectedDay) {
  const selectedDate = `${selectedYear}-${selectedMonth + 1}-${selectedDay}`;
  const eventsForSelectedDay = todos.filter(
    (event) => event.date === selectedDate
  );

  elements.eventsList.innerHTML = ""; // Clear previous event list

  eventsForSelectedDay.forEach((event) => {
    const eventItem = document.createElement("li");
    eventItem.textContent = event.text;

    const deleteButton = document.createElement("i");
    deleteButton.setAttribute("data-cy", "delete-todo-button");
    deleteButton.classList.add("fa-solid", "fa-xmark", "cursor-pointer", "delete-event");
    
    deleteButton.addEventListener("click", handleDeleteClick(selectedYear, selectedMonth, selectedDay, event.text));

    eventItem.appendChild(deleteButton);
    elements.eventsList.appendChild(eventItem);
  });
}

window.addEventListener('load', () => {
  loadEvent();
  showEventsForSelectedDay()
});

