const express = require('express');

const User = require('./controllers/user');
const Task = require('./controllers/tasks');

const router= express.Router();

router.get('/users-view',User.auth, User.getView)

router.get('/login', (req,res)=>{

    res.render('pages/login')
})

router.get('/users', User.auth, User.get)

router.post('/users', User.post)

router.post('/users-login', User.postLogin)

router.post('/users-register', User.postRegister)

router.put('/users/:id', User.put)

router.delete('/users/:id', User.user_delete)


router.post('/tasks', Task.post)

router.get('/tasks/:id', Task.get)

router.put('/tasks/:id', Task.put)









module.exports=router