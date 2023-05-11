const model = require('../config/model/index')
const controller = {};
const {Op} = require('sequelize')


// controller.getAll = async function(req,res){
//     try {
//         let = mahasiswa = await model.mahasiswa.findAll({
//             attributes:['nim','nama']
//         })
//         if (mahasiswa.length > 0) {
//             res.status(200).json({
//                 message:"success get data",
//                 data: mahasiswa
//             })
//         } else {
//             res.status(200).json({
//                 message:"failed get data",
//                 data: []
//             })
//         }
//     } catch (error) {
//         res.status(404).json({
//             message: error.message
//         })
//     }
// }

controller.getAll = async function(req,res){
    try {
        let = mahasiswa = await model.mahasiswa.findAll({
            attributes: [['nim','nimMahasiswa'],['nama','namaMahasiswa'],['kd_jurusan','kodeJurusan'],['alamat','alamatMahasiswa'],['angkatan','angkatanMahasiswa']],
            include:[
                {model:model.jurusan}
            ],
            // where: {
            //     [Op.and]:[
            //         {nama:'hehe'},
            //         {kd_jurusan:"inforr"}
            //     ]
            // },
            // order:[['angkatan','asd']],
            // limit: 2,
        })
        if (mahasiswa.length > 0) {
            res.status(200).json({
                message:"success get data",
                data: mahasiswa
            })
        } else {
            res.status(200).json({
                message:"failed get data",
                data: []
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}
controller.getSearch = async function (req, res){
    const search = req.query.keyword
    try {
        let  mahasiswa = await model.mahasiswa.findAll({
            attributes: [['nim','nimMahasiswa'],['nama','namaMahasiswa'],['kd_jurusan','kodeJurusan'],['alamat','alamatMahasiswa']],
            where:{
                [Op.or]:[{
                    nim: {
                        [Op.like]: '%' +search+ '%',
                    }
                },{
                    nama: {
                        [Op.like]: '%' +search+ '%',
                    }
                }]
            }
        })
        if (mahasiswa.length > 0) {
            res.status(200).json({
                message:"success get data",
                data: mahasiswa
            })
        } else {
            res.status(200).json({
                message:"failed get data",
                data: []
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}


controller.getOne = async function (req, res){
    try {
        let  mahasiswa = await model.mahasiswa.findAll({
            where:{
                nim: req.params.nim
            }
        })
        if (mahasiswa.length > 0) {
            res.status(200).json({
                message:"success get data",
                data: mahasiswa
            })
        } else {
            res.status(200).json({
                message:"failed get data",
                data: []
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}
controller.create = async function (req,res){
//   console.log(req.file)
    try {
        let mahasiswa = await model.mahasiswa.create({
            nim: req.body.nim,
            nama: req.body.nama,
            kd_jurusan: req.body.kd_jurusan,
            alamat: req.body.alamat,
            angkatan: req.body.angkatan,
            foto: req.file.path
        })
        res.status(201).json({
            message: "data berhasil di tambahkan",
            data: mahasiswa
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}
controller.put = async function(req, res){
    try {
        let mahasiswa = await model.mahasiswa.update({
            nama: req.body.nama,
            jurusan: req.body.jurusan
        },{
            where: {
                nim: req.params.nim
            }
        })
        res.status(200).json({
            message: "data behasil dirubah",
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}
controller.delete = async function (req, res){
    try {
        let mahasiswa = await model.mahasiswa.destroy({
            where:{
                nim: req.params.nim
            }
        })
        res.status(200).json({
            message: "data berhasil terhapus"
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}
module.exports = controller