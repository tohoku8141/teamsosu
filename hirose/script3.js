let correctAnswers = 0;
let attempts = 0;
let consecutiveCorrectAnswers = 0;
let gameCompleted = false;
let previousNumber = 0;
let upperLimit = 300;
let startScreen = document.getElementById('startScreen');
let gameArea = document.getElementById('gameArea');


function updateSelectedLimit(value) {
  upperLimit = parseInt(value);
  document.getElementById('selectedLimit').innerText = `乱数の上限: ${upperLimit}`;
}

function startGame() {
  gameCompleted = false;
  startTime = Date.now();
  startScreen.style.display = 'none';
  gameArea.style.display = 'block';
  document.getElementById('startButton').style.display = 'none';
  document.getElementById('elapsedTime').style.display = 'block';
  document.getElementById('progress').style.width = '0%';
  document.getElementById('progressText').innerText = '0/20';
  displayRandomNumber(upperLimit);
  startElapsedTime();
}

function displayRandomNumber(upperLimit) {
  let randomNumber = generateRandomNumber(1, upperLimit);

  while (![1, 3, 7, 9].includes(randomNumber % 10) || randomNumber === previousNumber) {
    randomNumber = generateRandomNumber(1, upperLimit);
  }

  previousNumber = randomNumber;
  document.getElementById('randomNumber').innerText = randomNumber;
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkIfPrime(isPrimeButtonClicked) {
  attempts++;
  const number = parseInt(document.getElementById('randomNumber').innerText);
  const isPrime = isNumberPrime(number);

  if ((isPrime && isPrimeButtonClicked) || (!isPrime && !isPrimeButtonClicked)) {
    correctAnswers++;
    consecutiveCorrectAnswers++;

    if (consecutiveCorrectAnswers === 20) {
      endGame('Congratulations!\nあなたは20問すべて正解しました。', true);
      return;
    }

    displayRandomNumber(upperLimit);
    updateProgressBar();
  } else {
    consecutiveCorrectAnswers = 0;
    endGame(`Game Over!\nあなたは${correctAnswers}問正解しました。`, false);
  }
}

function isNumberPrime(num) {
  if (num <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

function startElapsedTime() {
  setInterval(() => {
    if (!gameCompleted) {
      const currentTime = Date.now();
      const elapsedTime = formatTime(currentTime - startTime);
      document.getElementById('time').innerText = elapsedTime;
    }
  }, 10);
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);

  const formattedHours = padTime(hours);
  const formattedMinutes = padTime(minutes);
  const formattedSeconds = padTime(seconds);
  const formattedMilliseconds = padTime(milliseconds);

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}

function padTime(time) {
  return time.toString().padStart(2, '0');
}

function updateProgressBar() {
  const progress = (correctAnswers / 30) * 100;
  document.getElementById('progress').style.width = `${progress}%`;
  document.getElementById('progressText').innerText = `${correctAnswers}/30`;
}

function endGame(message, isGameCompleted) {
  document.getElementById('gameArea').style.display = 'none';
  document.getElementById('endGameMessage').style.display = 'block';
  document.getElementById('endGameText').innerText = message;
  const elapsedTime = document.getElementById('elapsedTime');
  gameCompleted = true;
  if (isGameCompleted) {
    elapsedTime.style.color = 'green';
  } else {
    elapsedTime.style.display = 'none';
  }
}

function resetGame() {
  correctAnswers = 0;
  attempts = 0;
  consecutiveCorrectAnswers = 0;
  document.getElementById('endGameMessage').style.display = 'none';
  gameArea.style.display = 'none';
  startScreen.style.display = 'block';
  document.getElementById('startButton').style.display = 'block';
  document.getElementById('elapsedTime').style.display = 'none';
  document.getElementById('time').innerText = '';
  document.getElementById('progress').style.width = '0%';
  document.getElementById('progressText').innerText = '0/30';
}
document.getElementById('startButton').addEventListener('click', startGame);

document.getElementById('resetButton').addEventListener('click', resetGame);


