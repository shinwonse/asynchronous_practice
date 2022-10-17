const wait = (ms) => {
  const start = Date.now();
  let now = start;
  while (now - start < ms) {
    now = Date.now();
  }
}

const getDivisors = async (n) => {
  const divisorsList = [];
  for (let i = 1; i < n ** (1 / 2) + 1; i ++) {
    if (n % i === 0) {
      divisorsList.push(i)
      if ((i ** 2) !== n) {
        divisorsList.push(n / i)
      }
    }
  }
  wait(2000);
  const answerList = new Set(divisorsList);
  return [...answerList].length;
}

const wrapAsync = (fn) => setTimeout(() => fn(), 0);

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

console.time('Performance');
(async () => {
  const b = delay(3000);
  const a = wrapAsync(() => getDivisors(3));
  await b;
  console.log(a);
  console.timeEnd('Performance');
})();

