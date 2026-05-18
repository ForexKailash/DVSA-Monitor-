const londonCentres = [
  "Loughton",
  "Goodmayes",
  "Enfield",
  "Wanstead",
  "Barking",
  "Chingford",
  "Tottenham"
];

let monitoring = false;
let slotFound = false;

const statusBox = document.getElementById("status");
const logsBox = document.getElementById("logs");
const startBtn = document.getElementById("startBtn");

function log(message) {

  const div = document.createElement("div");

  div.className = "log";

  div.innerText = `${new Date().toLocaleTimeString()} - ${message}`;

  logsBox.prepend(div);
}

function playSound() {

  const audio = new Audio(
    "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
  );

  audio.volume = 1;

  audio.play().catch(() => {});
}

function vibratePhone() {

  if (navigator.vibrate) {

    navigator.vibrate([500, 300, 500, 300, 500]);
  }
}

function notify(message) {

  statusBox.innerText = message;

  alert(message);

  playSound();

  vibratePhone();

  document.title = "✅ SLOT FOUND";

  log(message);
}

async function checkSlots() {

  try {

    const response = await fetch("/slots");

    const data = await response.json();

    data.centres.forEach((centre) => {

      if (
        londonCentres.includes(centre.name) &&
        !slotFound
      ) {

        slotFound = true;

        notify(`✅ SLOT FOUND AT ${centre.name}`);
      }
    });

    log("Scan complete");

  } catch (err) {

    log("Scan failed");
  }
}

function randomDelay() {

  return Math.floor(Math.random() * 15000) + 25000;
}

function startMonitoring() {

  if (monitoring) return;

  monitoring = true;

  log("Monitoring started");

  checkSlots();

  setInterval(() => {

    checkSlots();

  }, randomDelay());
}

startBtn.addEventListener("click", startMonitoring);
