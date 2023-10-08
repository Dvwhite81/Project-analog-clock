const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let radius = canvas.height / 2;
context.translate(radius, radius);
radius = radius * 0.9;
setInterval(createClock, 1000);

function createClock() {
  console.log("create clock");
  createFace(context, radius);
  createNumbers(context, radius);
  createHands(context, radius);
  createTime(context, radius);
};

const createFace = (context, radius) => {
  const grad = context.createRadialGradient(
    0,
    0,
    radius * 0.95,
    0,
    0,
    radius * 1.05
  );
  grad.addColorStop(0, "#333");
  grad.addColorStop(0.5, "white");
  grad.addColorStop(1, "#333");

  context.beginPath();
  context.arc(0, 0, radius, 0, 2 * Math.PI);
  context.fillStyle = "aqua";
  context.fill();

  context.strokeStyle = grad;
  context.lineWidth = radius * 0.1;
  context.stroke();

  context.beginPath();
  context.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  context.fillStyle = "#333";
  context.fill();
};

const createNumbers = (context, radius) => {
  context.font = radius * 0.15 + "px arial";
  context.textBaseline = "middle";
  context.textAlign = "center";
  for (let num = 1; num < 13; num++) {
    let ang = (num * Math.PI) / 6;
    context.rotate(ang);
    context.translate(0, -radius * 0.85);
    context.rotate(-ang);
    context.fillText(num.toString(), 0, 0);
    context.rotate(ang);
    context.translate(0, radius * 0.85);
    context.rotate(-ang);
  }
};

const createTime = (context, radius) => {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  hour = hour % 12;
  hour =
    (hour * Math.PI) / 6 +
    (minute * Math.PI) / (6 * 60) +
    (second * Math.PI) / (360 * 60);
  createHands(context, hour, radius * 0.5, radius * 0.07);

  minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
  createHands(context, minute, radius * 0.8, radius * 0.07);

  second = (second * Math.PI) / 30;
  createHands(context, second, radius * 0.9, radius * 0.02);
};

const createHands = (context, hand, length, width) => {
  context.beginPath();
  context.lineWidth = width;
  context.lineCap = "round";
  context.moveTo(0, 0);
  context.rotate(hand);
  context.lineTo(0, -length);
  context.stroke();
  context.rotate(-hand);
};
