'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  id: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: true
  }
}, {
  collection: 'horse',
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Horse', schema);
