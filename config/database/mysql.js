// const mysql = require('mysql')

// const con = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"",
//     database:"kuliah"
// })

// con.connect(function(err){
//     if(err) throw err;
//     console.log("koneksi berhasil !")
// })

// module.exports = con;
const Sequelize = require('sequelize')
const db = new Sequelize('kuliah','root', '',  {
    dialect: 'mysql',
    host:'localhost'
})

module.exports = db;
