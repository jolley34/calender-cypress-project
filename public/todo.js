document.addEventListener("DOMContentLoaded", function () {
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let todoEvents = JSON.parse(localStorage.getItem('todoEvents')) || {}; // Store todo events associated with dates

    generateCalendar();

    const prevMonthBtn = document.getElementById("prev-month");
    const nextMonthBtn = document.getElementById("next-month");

    prevMonthBtn.addEventListener("click", function () {
        generateCalendar(-1);
    });

    nextMonthBtn.addEventListener("click", function () {
        generateCalendar(1);
    });

    const dayCells = document.querySelectorAll("#calendar-table td");
    dayCells.forEach(cell => {
        cell.addEventListener("click", function () {
            const selectedDate = new Date(currentYear, currentMonth, parseInt(this.innerHTML));
            const containerId = `events-${selectedDate.toDateString()}`; // Unique ID for each date's events

            const asideContent = `${selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}, ${selectedDate.toLocaleDateString('en-US', { month: 'long' })} ${selectedDate.getDate()}`;
            document.getElementById("dayAndDate").innerHTML = asideContent;

            const addTodoBtn = document.getElementById("add-todo-btn");
            addTodoBtn.addEventListener("click", function () {
                const todoDescription = document.getElementById("todo-description").value;
                // Add todo event to the selected date
                if (!todoEvents[selectedDate.toDateString()]) {
                    todoEvents[selectedDate.toDateString()] = [];
                }
                todoEvents[selectedDate.toDateString()].push(todoDescription);
                console.log(`Adding todo: ${todoDescription} on ${selectedDate.toDateString()}`);
                updateTodoDisplay(selectedDate, containerId);
                document.getElementById("todo-description").value = ""; // Clear the input field after adding todo
                localStorage.setItem('todoEvents', JSON.stringify(todoEvents)); // Save todo events to localStorage
            });
            updateTodoDisplay(selectedDate, containerId);
        });
    });
    

    function updateTodoDisplay(selectedDate, containerId) {
        const todosForDate = todoEvents[selectedDate.toDateString()];
        let todoContainer = document.getElementById(containerId);

        if (todoContainer) {
            todoContainer.innerHTML = ''; // Clear previous content
        } else {
            todoContainer = document.createElement('div');
            todoContainer.id = containerId;
            document.getElementById("dayAndDate").appendChild(todoContainer); // Create a new container for the date
        }

        const todoList = document.createElement('ul');
        if (todosForDate) {
            todosForDate.forEach(todo => {
                const todoItem = document.createElement('li');
                todoItem.textContent = todo;
                todoList.appendChild(todoItem);
            });
        }
        todoContainer.appendChild(todoList); // Append the todo list to the specific date's container
    }

    function generateCalendar(monthOffset = 0) {
        const monthYearContainer = document.getElementById("month-year");
        const calendarTable = document.getElementById("calendar-table");

        currentMonth += monthOffset;

        while (currentMonth < 0) {
            currentMonth += 12;
            currentYear--;
        }

        while (currentMonth > 11) {
            currentMonth -= 12;
            currentYear++;
        }

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        monthYearContainer.innerHTML = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(currentYear, currentMonth, 1));

        let html = "<tr>";
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        weekdays.forEach(day => {
            html += `<th style="color: ${day === "Sun" ? 'rgb(214, 214, 214)' : '#3f3f3f'}">${day}</th>`;
        });

        html += "</tr><tr>";

        for (let i = 0; i < firstDay; i++) {
            html += `<td class="prev-month">${new Date(currentYear, currentMonth, -i).getDate()}</td>`;
        }

        for (let day = 1; day <= daysInMonth; day++) {
            html += `<td>${day}</td>`;

            if ((firstDay + day) % 7 === 0) {
                html += "</tr><tr>";
            }
        }

        const lastDay = new Date(currentYear, currentMonth, daysInMonth).getDay();

        for (let i = 1; i <= 6 - lastDay; i++) {
            html += `<td class="next-month">${i}</td>`;
        }

        html += "</tr>";

        calendarTable.innerHTML = html;
    }
});