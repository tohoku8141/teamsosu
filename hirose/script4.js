// 素数を判定する関数
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// ゲームのロジック
let currentNumber = 2; // 最初の素数
let previousNumber = 2; // 前の素数
let correctCount = 0; // 正解した素数の数
let startTime = null; // 開始時間
let timerInterval = null; // タイマー間隔
let elapsedTime50 = null; // 5回目の経過時間
let elapsedTime100 = null; // 10回目の経過時間
let elapsedTime200 = null; // 5回目の経過時間
let elapsedTime300 = null; // 10回目の経過時間
let elapsedTime500 = null; // 5回目の経過時間
let elapsedTime1000 = null; // 10回目の経過時間
const startSection = document.getElementById('startSection');
const gameForm = document.getElementById('gameForm');
const resultDiv = document.getElementById('result');
const numberInput = document.getElementById('numberInput');
const restartButton = document.getElementById('restartButton');
const instructionLabel = document.getElementById('instructionLabel');
const timerDiv = document.getElementById('timer');
const elapsedTimeDiv50 = document.getElementById('elapsedTime50');
const elapsedTimeDiv100 = document.getElementById('elapsedTime100');
const elapsedTimeDiv200 = document.getElementById('elapsedTime200');
const elapsedTimeDiv300 = document.getElementById('elapsedTime300');
const elapsedTimeDiv500 = document.getElementById('elapsedTime500');
const elapsedTimeDiv1000 = document.getElementById('elapsedTime1000');

// Enterキーが押されたときの処理
document.addEventListener('keydown', function(event) {
  if (event.key === 's' && startSection.style.display !== 'none') {
    startSection.style.display = 'none'; // スタートセクションを非表示にする
    gameForm.style.display = 'block'; // 入力フォームを表示する
    numberInput.focus(); // 入力フォームにフォーカスを当てる
    numberInput.value = ''; // 入力フォームを空にする
    instructionLabel.textContent = 'First Prime is:';
    startTimer(); // タイマーを開始
  }
});

gameForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const userInput = parseInt(numberInput.value);

  if (userInput === currentNumber && isPrime(userInput)) {
    resultDiv.textContent = `Previous Prime: ${userInput}`;
    previousNumber = currentNumber; // 前の素数を更新
    currentNumber = getNextPrime(userInput); // 次の素数を取得
    numberInput.value = '';
    correctCount++;
    instructionLabel.textContent = 'Next Prime is:';

    if (correctCount === 50) {
      elapsedTime50 = formatTime(Date.now() - startTime); // 5回目の経過時間を取得
      elapsedTimeDiv50.style.display = 'block'; // 5回目の経過時間を表示する
      elapsedTimeDiv50.textContent = `No.50 ニンニク: ${elapsedTime50}`;
    }
    if (correctCount === 100) {
      elapsedTime100 = formatTime(Date.now() - startTime); // 10回目の経過時間を取得
      elapsedTimeDiv100.style.display = 'block'; // 10回目の経過時間を表示する
      elapsedTimeDiv100.textContent = `No.100 今宵: ${elapsedTime100}`;
    }
    if (correctCount === 200) {
      elapsedTime200 = formatTime(Date.now() - startTime); // 10回目の経過時間を取得
      elapsedTimeDiv200.style.display = 'block'; // 10回目の経過時間を表示する
      elapsedTimeDiv200.textContent = `No.200 胃痛兄さん: ${elapsedTime200}`;
    }
    if (correctCount === 300) {
      elapsedTime300 = formatTime(Date.now() - startTime); // 10回目の経過時間を取得
      elapsedTimeDiv300.style.display = 'block'; // 10回目の経過時間を表示する
      elapsedTimeDiv300.textContent = `No.300 一休バナナ: ${elapsedTime300}`;
    }
    if (correctCount === 500) {
      elapsedTime500 = formatTime(Date.now() - startTime); // 10回目の経過時間を取得
      elapsedTimeDiv500.style.display = 'block'; // 10回目の経過時間を表示する
      elapsedTimeDiv500.textContent = `No.500 スリ来ない: ${elapsedTime500}`;
    }
    if (correctCount === 1000) {
      elapsedTime1000 = formatTime(Date.now() - startTime); // 10回目の経過時間を取得
      elapsedTimeDiv1000.style.display = 'block'; // 10回目の経過時間を表示する
      elapsedTimeDiv1000.textContent = `No.1000 泣く一休: ${elapsedTime1000}`;
    }

    else {
    if (correctCount === 2) {
      resultDiv.textContent = `Game Over!最初の素数は ${currentNumber} です。正解数: ${correctCount}`;
    }
    else {
      resultDiv.textContent = `Game Over!\n${previousNumber} の次の素数は ${currentNumber} です。正解数: ${correctCount}`;
    }
    resultDiv.textContent = `Game Over!\n${previousNumber} の次の素数は ${currentNumber} です。正解数: ${correctCount}`;
    stopTimer(); // タイマーを停止
    gameForm.style.display = 'none'; // 入力フォームを非表示にする
    }
  }
});

restartButton.addEventListener('click', function() {
  restart(); // ゲームをリスタートする関数を呼び出す
});

// スペースキーが押されたときの処理（ゲームオーバー時のみ有効）
document.addEventListener('keydown', function(event) {
  if (event.key === ' ' && restartButton.style.display !== 'none') {
    restart(); // ゲームをリスタートする関数を呼び出す
  }
});

// ドキュメント全体でのクリックを検知してフォーカスを戻す
document.addEventListener('click', function(event) {
  if (event.target !== numberInput) {
    numberInput.focus();
  }
});

// 次の素数を見つける関数
function getNextPrime(num) {
  let next = num + 1;
  while (true) {
    if (isPrime(next)) return next;
    next++;
  }
}

// タイマーを開始する関数
function startTimer() {
  let elapsedTime = 0;
  startTime = Date.now() - elapsedTime;

  timerInterval = setInterval(function() {
    elapsedTime = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTime);
    timerDiv.textContent = formattedTime;
  }, 10);
}

// タイマーを停止する関数
function stopTimer() {
  clearInterval(timerInterval);
  timerDiv.textContent = '';
}

// 経過時間をフォーマットする関数
function formatTime(time) {
  const hours = Math.floor(time / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  const milliseconds = Math.floor(time % 1000 / 10);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}

// ゲームをリスタートする関数
function restart() {
  restartButton.style.display = 'none'; // 最初の画面に戻るボタンを非表示にする
  startSection.style.display = 'block'; // スタートセクションを表示する
  resultDiv.textContent = ''; // 結果表示をクリアする
  currentNumber = 2; // 最初の素数にリセット
  previousNumber = 2; // 前の素数もリセット
  correctCount = 0; // 正解した素数の数をリセット
  numberInput.value = ''; // 入力フォームを空にする
  instructionLabel.textContent = 'First Prime is:';
  elapsedTimeDiv50.style.display = 'none'; // 5回目の経過時間を非表示にする
  elapsedTimeDiv100.style.display = 'none';
  elapsedTimeDiv200.style.display = 'none';
  elapsedTimeDiv300.style.display = 'none';
  elapsedTimeDiv500.style.display = 'none';
  elapsedTimeDiv1000.style.display = 'none';
  timerDiv.textContent = ''; // タイマーを空にする
  clearInterval(timerInterval); // インターバルをクリア
}
