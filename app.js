const express = require('express');
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')


const mahasiswaRoutes = require('./routes/mahasiswa')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/assets',express.static('assets'))

app.use('/mahasiswa', mahasiswaRoutes);
app.use((req,res,next)=>{
    const error = new Error('route undefined');
    error .status = 404;
    next(error)
})

app.use((error, req,res, next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    })
})





// app.use((req, res, next )=>{
//     res.status(200).json({
//         message:"RestFull nodejs dan express"
//     })
// })

module.exports = app;