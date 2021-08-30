'use strict';

const horseModel = require('../models/horse.model');

class Horse {
  constructor() {
    this.nameList = ["Tom", "Jerry", "Brutus", "Olive", "Popeye", "Spike"];
  }

  async fillData() {
    for (let iter = 0;iter < this.nameList.length;iter++) {
      let horseObj = new horseModel({
        id: (iter + 1).toString(),
        name: this.nameList[iter]
      });

      await horseObj.save();
    }

    return true;
  }

  async getList() {
    try {
      return await horseModel.find({}).exec();
    } catch(err) {
      throw new Error(err);
    }
  }
}

module.exports = Horse;
