'use strict';

const Worker = require('../classes/worker');

class WorkerController {
  constructor() {
    this.worker = new Worker();
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
