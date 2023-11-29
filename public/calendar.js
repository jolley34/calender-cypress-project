document.addEventListener("DOMContentLoaded", function () {
    generateCalendar();

    const prevMonthBtn = document.getElementById("prev-month");
    const nextMonthBtn = document.getElementById("next-month");

    prevMonthBtn.addEventListener("click", function () {
        generateCalendar(-1);
    });

    nextMonthBtn.addEventListener("click", function () {
        generateCalendar(1);
    });
});

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

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
    html += `<th style="color: ${day === "Sun" ? 'red' : 'black'}">${day}</th>`;
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

    // Lägg till eventlyssnare för varje dag (td-element)
    // Det är i denna functionen som kopplingen görs så att datumet visas i asiden!!!!!!
    const dayCells = document.querySelectorAll("#calendar-table td");
    dayCells.forEach(cell => {
        cell.addEventListener("click", function () {
            const selectedDate = new Date(currentYear, currentMonth, parseInt(this.innerHTML));
            const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(selectedDate);
            const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(selectedDate);
    
            const asideContent = `${dayOfWeek}, ${monthName} ${selectedDate.getDate()}`;
            document.getElementById("dayAndDate").innerHTML = asideContent;
        });
    });
}