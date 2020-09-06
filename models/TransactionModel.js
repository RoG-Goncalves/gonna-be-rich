const mongoose = require('mongoose');

let schema = mongoose.Schema({
  description: {
    type: String,
    require: true,
  },
  value: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    requeire: true,
  },
  year: {
    type: Number,
    requeire: true,
  },
  month: {
    type: Number,
    require: true,
  },
  day: {
    type: Number,
    require: true,
  },
  yearMonth: {
    type: String,
    require: true,
  },
  yearMonthDay: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
});

schema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;

  return object;
});
const TransactionModel = mongoose.model('transaction', schema);

module.exports = TransactionModel;
