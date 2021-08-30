'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'ACTIVE',
    enum: ['ACTIVE', 'COMPLETED']
  },
  horse: {
    id: {
      type: String
    },
    name: {
      type: String
    }
  }
}, {
  collection: 'race',
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Race', schema);
