var fs = require('fs');
// var writeLineStream = require('lei-stream').writeLine;
var multer = require('multer');
// var upload = multer({ dest: 'build/imgs/' });
var uploadFolder = 'build/cmds/';
var path = require('path');
var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};

createFolder(uploadFolder);
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        var extName = ''; //后缀名

        cb(null, 'file' + '.xlsx');
    }
});
var upload = multer({ storage: storage });//
var Excel = require('exceljs');
var workbook = new Excel.Workbook();
//
module.exports = function (app, StudentModel, RecordModel) {

    app.post('/uploadRecordsFile', upload.single('excel'), function (req, res) {
        console.log('uploadFile');
        // console.log(req)

        workbook.xlsx.readFile(req.file.path).then(function () {
            var worksheet = workbook.getWorksheet(1);
            let records = []
            worksheet.eachRow(function (row, rowNumber) {
                if (rowNumber != 1) {
                    // const date = row.values[5].split("/");
                    records.push({
                        name: row.values[1],
                        course: req.body.courseId,
                        type: row.values[3],
                        star: row.values[2],
                        record: row.values[5],
                        date: row.values[4],
                        // date: date && date.length == 3?new Date(date[1]+" "+date[2]+","+date[0]):new Date(),
                    })
                }
            });

            getStudents(records.map(record => record.name)).then(
                students => {
                    students.forEach(s=>{
                        records.map(record=>{
                            if (record.name === s.name) {
                                record.student = s._id;
                            }
                        })
                    })
                    
                    RecordModel.insertMany(records.filter(record => record.student)).then(
                        docs => {
                            res.json({status:1,data:docs});
                        }
                    ).catch(
                        err => {
                            res.json({status:-1, msg:err});
                        }
                    )
                }
            ).catch(
                err => {
                    res.json({status:-1, msg:err})
                }
            )
            
            // res.json({status:1,msg:"ok"})

        });
    })

    function getStudents(names) {
        return new Promise(function (resolve, reject) {
            StudentModel.find({ name: { "$in": names} }, function (err, students) {
                if (!err) {
                    resolve(students);
                }else{
                    reject(err);
                }
            })
        });
    }
}