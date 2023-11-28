window.addEventListener("DOMContentLoaded", main);

const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  daysContainer = document.querySelector(".days");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
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
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

