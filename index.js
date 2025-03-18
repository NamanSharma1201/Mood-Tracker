const calendar = Object.freeze({
  January: {
    index: 0,
    days: 31,
  },
  February: {
    index: 1,
    days: 28,
  },
  March: {
    index: 2,
    days: 31,
  },
  April: {
    index: 3,
    days: 30,
  },
  May: {
    index: 4,
    days: 31,
  },
  June: {
    index: 5,
    days: 30,
  },
  July: {
    index: 6,
    days: 31,
  },
  August: {
    index: 7,
    days: 31,
  },
  September: {
    index: 8,
    days: 30,
  },
  October: {
    index: 9,
    days: 31,
  },
  November: {
    index: 10,
    days: 30,
  },
  December: {
    index: 11,
    days: 31,
  },
});

const emotions = Object.freeze({
  happy: 0,
  neutral: 1,
  sad: 2,
  angry: 3,
  undefined: 4,
});

const month = new Date().toLocaleString(undefined, { month: "long" });
const calenderContainer = document.querySelector(".calendar");
const buttons = document.querySelectorAll(".emotion-btn");
const happyCounter = document.querySelector("#happy-count");
const neutralCounter = document.querySelector("#neutral-count");
const sadCounter = document.querySelector("#sad-count");
const angryCounter = document.querySelector("#angry-count");
const day = parseInt(
  new Date().toLocaleString(undefined, { day: "numeric" }),
  10
);
let days;
let happyCnt = 0,
  neutralCnt = 0,
  angryCnt = 0,
  sadCnt = 0;
const lastMonth = localStorage.getItem("month");
if (lastMonth != month) {
  days = new Array(31).fill("undefined");
} else {
  days = JSON.parse(localStorage.getItem("days"));
}

render();
buttons.forEach((button) => {
  button.addEventListener("click", setEmotion);
});

function setEmotion(event) {
  event.preventDefault();
  const emotionId = event.target.id;
  days[day - 1] = emotionId;
  render();
}

function render() {
  calenderContainer.innerHTML = "";
  happyCnt = neutralCnt = sadCnt = angryCnt = 0;
  let html = "";
  for (let i = 0; i < calendar[month].days; i++) {
    console.log(days[i]);
    if (days[i] === "happy") {
      happyCnt += 1;
    } else if (days[i] === "sad") {
      sadCnt += 1;
    } else if (days[i] === "neutral") {
      neutralCnt += 1;
    } else if (days[i] === "angry") {
      angryCnt += 1;
    }
    html += `
      <div class="days ${days[i]} ${i + 1 === day ? "current-day" : ""}"> ${
      i + 1
    }</div>
    `;
  }
  calenderContainer.innerHTML = html;
  happyCounter.textContent = happyCnt;
  neutralCounter.textContent = neutralCnt;
  sadCounter.textContent = sadCnt;
  angryCounter.textContent = angryCnt;
  localStorage.setItem("month", month);
  localStorage.setItem("days", JSON.stringify(days));
}
