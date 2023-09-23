const express = require('express');

const User = require('./controllers/user');
const Task = require('./controllers/tasks');

const router= express.Router();

router.get('/users/:id', User.get)

router.post('/users', User.post)

router.put('/users/:id', User.put)

router.delete('/users/:id', User.user_delete)


router.post('/tasks', Task.post)

router.get('/tasks/:id', Task.get)

router.put('/tasks/:id', Task.put)









module.exports=router