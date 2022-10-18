const STATE = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
};

// MyPromise 의 인스턴스인지 확인
function isThenable(val) {
  return val instanceof MyPromise;
}

export class MyPromise {
  // state 는 pending, fulfilled, reject 중 하나
  // handlers 는 then, catch, finally 의 콜백을 저장
  // value 는 resolve 됐거나 rejected 된 value
  constructor(callback) {
    this.state = STATE.PENDING;
    this.value = undefined;
    this.handlers = [];
    try {
      callback(this._resolve, this._reject);
    } catch (err) {
      this._reject(err);
    }
  }

  // _resolve() 와 _reject() 메소드는 프로미스 객체의 상태를 조정
  _resolve = (value) => {
    this.updateResult(value, STATE.FULFILLED);
  };

  _reject = (error) => {
    this.updateResult(error, STATE.REJECTED);
  };

  updateResult(value, state) {
    // This is to make the processing async
    setTimeout(() => {
      // 이미 상태가 있는 (pending 상태가 아닌) 프로미스 객체는 _resolve() 나 _reject() 메소드를 호출하여도
      // 아무 일도 일어나지 않음
      if (this.state !== STATE.PENDING) {
        return;
      }

      // check is value is also a promise
      // then 체이닝이 가능한 이유 -> then 이 프로미스를 반환하기 때문
      if (isThenable(value)) {
        return value.then(this._resolve, this._reject);
      }

      this.value = value;
      this.state = state;

      // execute handlers if already attached
      this.executeHandlers();
    }, 0);
  }

  addHandlers(handlers) {
    this.handlers.push(handlers);
    this.executeHandlers();
  }

  executeHandlers() {
    // Don't execute handlers if promise is not yet fulfilled or rejected
    if (this.state === STATE.PENDING) {
      return null;
    }

    // We have multiple handlers because add them for .finally block too
    this.handlers.forEach((handler) => {
      if (this.state === STATE.FULFILLED) {
        return handler.onSuccess(this.value);
      }
      return handler.onFail(this.value);
    });
    // After processing all handlers, we reset it to empty.
    this.handlers = [];
  }

  // fulfilled 면 onSuccess 콜백 함수가, rejected 면 onFail 콜백 함수가 호출됨
  then(onSuccess, onFail) {
    return new MyPromise((res, rej) => {
      // fulfilled 시 실행할 콜백 함수를 담는다
      this.addHandlers({
        onSuccess: function (value) {
          // if no onSuccess provided, resolve the value for the next promise chain
          if (!onSuccess) {
            return res(value);
          }
          try {
            return res(onSuccess(value));
          } catch (err) {
            return rej(err);
          }
        },
        onFail: function (value) {
          // if no onFail provided, reject the value for the next promise chain
          if (!onFail) {
            return rej(value);
          }
          try {
            return res(onFail(value));
          } catch (err) {
            return rej(err);
          }
        },
      });
    });
  }

  // Since then method take the second function as onFail, we can leverage it while implementing catch
  catch(onFail) {
    return this.then(null, onFail);
  }

  // 항상 프로미스 객체를 리턴
  // fulfilled 되거나 rejected 결과로 나온 value 와 함께 프로미스 객체를 리턴
  finally(callback) {
    return new MyPromise((res, rej) => {
      let val;
      let wasRejected;
      this.then(
        (value) => {
          wasRejected = false;
          val = value;
          return callback();
        },
        (err) => {
          wasRejected = true;
          val = err;
          return callback();
        }
      ).then(() => {
        // If the callback didn't have any error we resolve/reject the promise based on promise state
        if (!wasRejected) {
          return res(val);
        }
        return rej(val);
      });
    });
  }
}
