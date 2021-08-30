'use strict';

const Worker = require('../classes/worker');
const Horse = require('../classes/horse');

class WorkerController {
  constructor() {
    this.worker = new Worker();
    this.horse = new Horse();
  }

  async fillData(req, res) {
    try {
      await this.horse.fillData();

      res.status(200).json({message: 'SUCCESS'});
    } catch(err) {
      res.status(400).json({message: err.message});
    }
  }

  async fetchActiveRaces(req, res) {
    try {
      let status = req.query.status ? req.query.status : 'COMPLETED';
      let result = await this.worker.fetchRaces(status);

      res.status(200).json(result);
    } catch(err) {
      res.status(400).json({message: err.message});
    }
  }
}

module.exports = WorkerController;
