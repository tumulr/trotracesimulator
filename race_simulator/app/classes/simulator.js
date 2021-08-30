'use strict';

const Utility = require('../helpers/utility');
const Race = require('../classes/race');

class Simulator {
  constructor(env) {
    this.env = env;
  }

  async run() {
    try {
      let currDate = new Date();
      let raceName = `RACE-${currDate.getHours()}-${currDate.getMinutes()}-${currDate.getSeconds()}`;
      console.log(raceName, currDate);
      // return true;
      let race = new Race();
      return await race.init(raceName);
    } catch(err) {
      console.log(err);
    }
  }

  async runEvery1min() {
    try {
      await Utility.asyncInterval(this.run, 1000);
    } catch(err) {
      throw err;
    }
  }
}

module.exports = Simulator;
