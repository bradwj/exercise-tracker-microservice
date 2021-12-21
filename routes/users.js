const express = require('express');
const router = express.Router();
const { getUsers, getUserLogs, createUser, addExercise } = require('../controllers/users');

router.route('/').get(getUsers);
router.route('/').post(createUser);
router.route('/:_id/logs').get(getUserLogs);
router.route('/:_id/exercises').post(addExercise);

module.exports = router;