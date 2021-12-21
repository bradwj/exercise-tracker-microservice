const UserModel = require('../models/user');
const ExerciseModel = require('../models/exercise');
const LogModel = require('../models/log');


const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
}


const getUserLogs = async (req, res) => {
  try {
    const userLog = await LogModel.findById(req.params._id)

    if (req.query.from && req.query.to) {
      const fromDate = new Date(req.query.from);
      const toDate = new Date(req.query.to);


      if (fromDate == 'Invalid Date') 
        fromDate = new Date();
      if (toDate == 'Invalid Date')
        toDate = new Date();

      userLog.log = userLog.log.filter(log => {
        const logDate = new Date(log.date);
        return logDate >= fromDate && logDate <= toDate;
      });
    }

    if (req.query.limit && req.query.limit > 0) {
      userLog.log = userLog.log.slice(0, Number(req.query.limit));
    }

    console.log(userLog);
    res.json(userLog);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
}


const createUser = async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    const userLog = await LogModel.create({
      _id: user._id,
      username: req.body.username,
      log: []
    });

    console.log(user);
    res.json(user);
  }
  catch (err) {
    res.status(400).json({ error: err.message });
  }
}


const addExercise = async (req, res) => {
  try {
    const userLog = await LogModel.findById(req.params._id);

    let formattedDate = 'Invalid Date'; 
    if (req.body.date) {
      formattedDate = new Date(req.body.date).toDateString();
    }
    if (formattedDate == 'Invalid Date') 
      formattedDate = new Date().toDateString();
    
    const newLog = {
      description: req.body.description,
      duration: Number(req.body.duration),
      date: String(formattedDate)
    }

    userLog.log = [...userLog.log, newLog];
    userLog.count = userLog.log.length;

    const updatedLog = await userLog.save();

    const returnObj = {
      _id: userLog._id,
      username: userLog.username,
      ...newLog
    };

    res.json(returnObj);
  }
  catch (err) {
    res.status(400).json({ error: err.message });
  }
}


module.exports = {
  getUsers,
  getUserLogs,
  createUser,
  addExercise
}