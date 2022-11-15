require('dotenv').config();
const express = require('express');
const app =express();
require('./Database/dbConnection')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const Cors = require('cors');
app.use(Cors());



app.use('/api', require('./api'))



app.listen(process.env.PORT, ()=>{
    console.log("server started on port", process.env.PORT)
})