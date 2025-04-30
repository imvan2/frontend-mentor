// Cache DOM elements
const cardContainer = document.getElementById("card-container");
const weeklyBtn = document.getElementById("weekly-btn");

// Set "Weekly" as default
document.addEventListener("DOMContentLoaded", function (e) {
  weeklyBtn.classList.add("active");
});

let timeframe = "weekly";
let dataObj;

// Get data
const fetchData = () => {
  fetch(
    "https://imvan2.github.io/frontend-mentor/junior/time-tracking-dashboard/data.json"
  )
    .then((response) => {
      if (!response.ok) return console.log("Unable to fetch data.");

      return response.json();
    })
    .then((data) => {
      dataObj = data;
      dataObj.forEach((item) => {
        populateDOM(item, timeframe);
      });
    });
};

fetchData();

const backgroundColorMap = {
  work: "#ff8b64",
  play: "#55c2e6",
  study: "#ff5e7d",
  exercise: "#4bcf82",
  social: "#7335d2",
  "self-care": "#f1c75b",
};

// Get background color depending on the title
const matchBackgroundColor = (title) => {
  return `linear-gradient(${backgroundColorMap[title]} 0%, ${backgroundColorMap[title]} 50%, transparent 50%, transparent 100%)`;
};

const timePeriods = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month",
};

// Variables to keep track of the hour for specific text
let currrentHours;
let currrentHourText;

let previousHours;
let previousHourText;

let currentTime;
let previousTime;

// Configure what text to include with hour
const getHourText = (hour) => {
  return hour <= 1 ? hour + "hr" : hour + "hrs";
};

// Add items to the DOM
const populateDOM = (item, timeline) => {
  // Change the title to include '-' if there's a space
  const titleLowercase =
    item["title"].toLowerCase().indexOf(" ") >= 0
      ? item["title"].toLowerCase().replace(" ", "-")
      : item["title"].toLowerCase();

  currrentHours = item["timeframes"][timeline]["current"];
  previousHours = item["timeframes"][timeline]["previous"];

  currentTime = `${getHourText(currrentHours)}`;
  previousTime = `${timePeriods[timeline]} - ${getHourText(previousHours)}`;

  // Create a new card
  const newCard = document.createElement("article");

  newCard.innerHTML = `
  <div id="svg-icon-${titleLowercase}" class="svg-icon" style="background-image: url(../time-tracking-dashboard/images/icon-${titleLowercase}.svg)"></div>
          <div class="main-section">
            <button class="btn-other">
              <p id="${titleLowercase}">${item["title"]}</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"
                />
              </svg>
            </button>
            <div>
              <h2 class="current-time">${currentTime}</h2>
              <p class="previous-time">${previousTime}</p>
            </div>
          </div>
  `;

  newCard.className = "card";
  newCard.style.backgroundImage = matchBackgroundColor(titleLowercase);

  cardContainer.appendChild(newCard);
};

// Change the hours based on the timeframe clicked
const changeTimeframe = (time, data) => {
  const current = document.getElementsByClassName("current-time");
  const previous = document.getElementsByClassName("previous-time");

  if (data) {
    for (let i = 0; i < data.length; i++) {
      currrentHours = data[i]["timeframes"][time]["current"];

      previousHours = data[i]["timeframes"][time]["previous"];

      currentTime = `${getHourText(currrentHours)}`;
      previousTime = `${timePeriods[time]} - ${getHourText(previousHours)}`;

      current[i].innerHTML = currentTime;
      previous[i].innerHTML = previousTime;
    }
  }
};

const handleTimeframe = (e) => {
  e.preventDefault();
  timeframe = e.target.value;

  document.getElementById(`weekly-btn`).classList.remove("active");

  changeTimeframe(timeframe, dataObj);
};

document.getElementById("daily-btn").addEventListener("click", handleTimeframe);
document
  .getElementById("weekly-btn")
  .addEventListener("click", handleTimeframe);
document
  .getElementById("monthly-btn")
  .addEventListener("click", handleTimeframe);
