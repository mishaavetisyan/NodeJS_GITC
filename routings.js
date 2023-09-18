const express = require('express');

const User = require('./controllers/user');
const router= express.Router();

router.get('/users/:id', User.get)

router.post('/users', User.post)

router.put('/users/:id', User.put)

router.delete('/users/:id', User.user_delete)












module.exports=router