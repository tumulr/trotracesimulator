'use strict';

const raceModel = require('../models/race.model');

const Utility = require('../helpers/utility');
const Horse = require('./horse');

class Race {
  constructor() {
    this.horse = new Horse();
    this.horseList = new Array();
  }

  async init(name) {
    let raceDoc = await this._create(name);

    await Utility.asycTimeout(this._stop.bind(this), 1000, raceDoc._id);
  }

  async _create(name) {
    try {
      let raceDoc = new raceModel({name: name});

      return await raceDoc.save();
    } catch(err) {
      throw new Error(err);
    }
  }

  async _stop(id) {
    try {
      await this._getHorseList();

      let horseListLength = this.horseList.length;
      let winner = Math.floor(Math.random() * horseListLength) + 1;

      let horseObj = this.horseList.find(el => el.id === winner.toString());

      await raceModel.findByIdAndUpdate(id, {
        $set: {
          horse: {
            id: winner,
            name: horseObj.name
          },
          status: 'COMPLETED'
        }
      });

      return true;
    } catch(err) {
      throw new Error(err);
    }
  }

  async _getHorseList() {
    try {
      if (this.horseList.length === 0) {
        this.horseList = await this.horse.getList();
      }
      return true;
    } catch(err) {
      throw new Error(err);
    }
  }

  async list(mongoQuery) {
    try {
      return await raceModel.find(mongoQuery).exec();
    } catch(err) {
      throw new Error(err);
    }
  }
}

module.exports = Race;

// ( async () => {
//   let test = new Race();
//   console.log(await test._getHorseList())

// })()
