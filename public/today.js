window.addEventListener("DOMContentLoaded", main)

function main(){
   // toDaysDay();
    //toDaysDate();
   // toDaysMonth();
   updateDate();

}

function updateDate(){
    const daysOfWeek = ['Sundays', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const today = new Date();
    const dayOfWeek = daysOfWeek[today.getDay()];
    const date = today.getDate();
    const month = months[today.getMonth()];

    document.getElementById('asideDay').textContent = dayOfWeek;
    document.getElementById('asideDate').textContent = date;
    document.getElementById('asideMonth').textContent = month;

}