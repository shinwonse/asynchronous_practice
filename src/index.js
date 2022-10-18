import { MyPromise } from './MyPromise';

console.time('time');
const testPromiseWithLateResolve = new MyPromise((res) => {
  setTimeout(() => {
    res('Promise 1 is resolved');
  }, 1000);
});

testPromiseWithLateResolve.then((val) => {
  console.log(val);
  console.timeEnd('time');
});

const testPromiseWithLateReject = new MyPromise((res, rej) => {
  console.time('time2');
  setTimeout(() => {
    rej('Promise 2 is rejected');
  }, 2000);
});

testPromiseWithLateReject
  .then((val) => {
    console.log(val);
  })
  .catch((err) => {
    console.log(err);
    console.timeEnd('time2');
  });
//
// const testPromiseWithRejectFinally = new MyPromise((res, rej) => {
//   setTimeout(() => {
//     rej('Promise 2 is rejected');
//   }, 1000);
// });
//
// testPromiseWithRejectFinally
//   .finally(() => {
//     console.log('finally called');
//   })
//   .catch((err) => {
//     console.log('value rejected after finally', err);
//   });
//
// const testPromiseWithEarlyResolve = new MyPromise((res, rej) => {
//   res('Promise 3 is resolved early');
// });
//
// setTimeout(() => {
//   testPromiseWithEarlyResolve.then((val) => {
//     console.log(val);
//   });
// }, 3000);
