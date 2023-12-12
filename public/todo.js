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

// Function to display events for the selected day
function showEventsForSelectedDay(selectedYear, selectedMonth, selectedDay) {
  const selectedDate = `${selectedYear}-${selectedMonth + 1}-${selectedDay}`;
  const eventsForSelectedDay = todos.filter(
    (event) => event.date === selectedDate
  );

  // Clear previous event list
  elements.eventsList.innerHTML = "";

  // Display events for the selected day in the events list
  eventsForSelectedDay.forEach((event) => {
    const eventItem = document.createElement("li");
    eventItem.textContent = event.text;
    elements.eventsList.appendChild(eventItem);
  });
}


window.addEventListener('load', () => {
  loadEvent();
  showEventsForSelectedDay();
});

