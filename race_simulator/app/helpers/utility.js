'use strict';

class Utility {
  constructor() {}

  static async asyncInterval(fn, ms, data, triesLeft = 2) {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        // console.log(triesLeft)
        if (triesLeft === 1) {
          reject("Set Timeout interval is over");
          clearInterval(interval);
        }
        if (await fn(data)) {
          resolve();
        }
        // Used by me for debugging purpose
        // triesLeft--;
      }, ms);
    });
  }

  static async asycTimeout(fn, ms, data) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        if (await fn(data)) {
          resolve();
        }
        reject();
      }, ms);
    });
  }
}

module.exports = Utility;
