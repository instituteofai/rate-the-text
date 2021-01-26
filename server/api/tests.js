const Test = require('../models/test.model');
const Task = require('../models/task.model');

exports.get = async (req, res, next) => {
  const tests = await Test.find();
  res.status(200).json({ tests });
  return next();
};

exports.post = async (req, res, next) => {
  const { name } = req.body;
  const test = new Test({
    name,
  });
  const savedTest = await test.save();
  res.status(201).json(savedTest);
  return next();
};

exports.put = async (req, res, next) => {
  const test = await Test.findById(req.params.testId);
  Object.assign(test, req.body);
  const updatedTest = await test.save();
  res.status(200).json(updatedTest);
  return next();
};

exports.delete = async (req, res, next) => {
  await Test.findByIdAndDelete(req.params.testId);
  await Task.deleteMany({ test: req.params.testId });
  res.status(204).end();
  return next();
};
