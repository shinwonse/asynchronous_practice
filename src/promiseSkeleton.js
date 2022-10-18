const promise = new Promise((resolve, reject) => {
  /*
    Your code logic goes here and you call  resolve(value)
    or reject(error) to resolve or reject the promise
  */
});

promise
  .then((value) => {
    // Code logic on success of an operation
  })
  .catch((error) => {
    // Code logic on failure of an operation
  })
  .finally(() => {
    // Code logic to be executed after completion of operation
  });
