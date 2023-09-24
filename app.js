const express = require('express')
const bodyParser = require('body-parser')
// set the view engine to ejs
const routes = require('./routings')



const app = express()
app.set('view engine', 'ejs');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/',routes)



app.listen('8000',()=>{
    console.log('node listen 8000 port')
})