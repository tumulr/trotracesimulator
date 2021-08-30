'use strict';

const Race = require('../classes/race');

class Worker {
  constructor() {
    this.race = new Race();
  }

  async fetchRaces(status = 'ACTIVE') {
    try {
      return await this.race.list({status: status});
    } catch(err) {
      throw new Error(err);
    }
  }
}

module.exports = Worker;
