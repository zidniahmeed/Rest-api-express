const express = require('express')
const router = express.Router()
const db = require('../config/database/mysql')
const controller = require('../controller/index')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, './assets/')
    },filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage})

router.get('/', controller.mahasiswa.getAll)
router.get('/serach', controller.mahasiswa.getSearch)
router.get('/:nim', controller.mahasiswa.getOne)
router.post('/',upload.single('foto'), controller.mahasiswa.create)
router.put('/:nim', controller.mahasiswa.put)
router.delete('/:nim', controller.mahasiswa.delete)


// router.get('/',(req, res, next )=>{
//     const sql = "SELECT * FROM mahasiswa"
//     db.query(sql, (err, result)=>{
//         if(err) throw err;
//         res.status(200).json({
//             message:"get data suksess",
//             data: result
//         })     
//     })
// })

// router.post('/',(req, res,next )=>{
     
//     const  nim = req.body.nim
//     const  nama = req.body.nama
//     const  jurusan = req.body.jurusan
    
//     const sql = "INSERT INTO mahasiswa (nim, nama, jurusan) VALUES ('"+nim+"', '"+nama+"', '"+jurusan+"' )" 

//     db.query(sql, (err, result)=>{
//         if(err) throw err;
//         res.status(200).json({
//             message:"success add data",
            
//         })     
//     })
// })

// router.get('/:nim',(req,res,next)=>{
//     const nim = req.params.nim;
//     const sql = "SELECT * FROM mahasiswa WHERE nim="+nim
//     db.query(sql, (err, result)=>{
//         if(err) throw err;
//         res.status(200).json({
//             message:"get data suksess",
//             data: result
//         })     
//     })

    // if (nim === '123') {
    //     req.status(200).json({
    //         message: "NIM 123"
    //     })
    // } else {
    //     res.status(200).json({
    //         message:"nim lain"
    //     })
    // }
    // res.status(200).json({
    //     message:'get method mahasiswa'
    // })
// })

// router.put('/',(req, res, next )=>{
//     const  nim = req.body.nim
//     const  nama = req.body.nama
//     const  jurusan = req.body.jurusan
    
//     const sql = "UPDATE mahasiswa SET nama = '"+nama+"', jurusan = '"+jurusan+"' WHERE nim ="+nim 

//     db.query(sql, (err, result)=>{
//         if(err) throw err;
//         res.status(200).json({
//             message:"success edit data",
            
//         })     
//     })
// })

// router.delete('/:nim',(req, res, next )=>{
//     const  nim = req.params.nim
    
//     const sql = "DELETE FROM mahasiswa WHERE nim ="+nim 

//     db.query(sql, (err, result)=>{
//         if(err) throw err;
//         res.status(200).json({
//             message:"success delete data",
            
//         })     
//     })
// })

module.exports = router;