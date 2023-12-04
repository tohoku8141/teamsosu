function isPrime(num) {
  if (num <= 1 || !Number.isInteger(num)) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

function findPreviousPrime(num) {
  for (let i = num - 1; i > 1; i--) {
    if (isPrime(i)) {
      return i;
    }
  }
  return null;
}

function findNextPrime(num) {
  let next = num + 1;
  while (true) {
    if (isPrime(next)) {
      return next;
    }
    next++;
  }
}

function checkPrime() {
  const userInput = document.getElementById('userInput').value;
  const number = parseFloat(userInput);

  if (isNaN(number) || number <= 1 || !Number.isInteger(number)) {
    document.getElementById('result').innerText = '2以上の整数を入力してください。';
    return;
  }

  const numberString = String(number);
  if (numberString.length >= 16) {
    document.getElementById('result').innerText = '15桁以下の整数を入力してください。';
    return;
  }

  if (isPrime(number)) {
    const prevPrime = findPreviousPrime(number);
    const nextPrime = findNextPrime(number);
    document.getElementById('result').innerText = `${number}は素数です。\n前の素数は${prevPrime}、次の素数は${nextPrime}です。`;
  } else {
    const prevPrime = findPreviousPrime(number);
    const nextPrime = findNextPrime(number);
    document.getElementById('result').innerText =  `${number}は合成数です。\n前の素数は${prevPrime}、次の素数は${nextPrime}です。`;
  }
}
