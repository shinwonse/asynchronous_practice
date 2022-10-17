const wait = (ms) => {
  const start = Date.now();
  let now = start;
  while (now - start < ms) {
    now = Date.now();
  }
}

function getDivisors(n, ms) {
  return new Promise((resolve, reject) => {
    const divisorsList = [];
    for (let i = 1; i < n ** (1 / 2) + 1; i ++) {
      if (n % i === 0) {
        divisorsList.push(i)
        if ((i ** 2) !== n) {
          divisorsList.push(n / i)
        }
      }
    }
    // wait(1000);

    const answerList = new Set(divisorsList);
    setTimeout(() => resolve([...answerList].length), ms);
  })
}

console.time('Performance')
getDivisors(1000000000, 3000)
  .then((res) => console.log(res))
  .then(() => console.timeEnd('Performance'))
