module.exports = function (app, RecordModel) {
    app.post('/addRecord', function (req, res) {
        console.log('addRecord')
        console.log(req.body)
        var recordEntity = new RecordModel({
            student: req.body.studentId,
            course: req.body.courseId,
            type: req.body.type,
            star: req.body.star,
            record: req.body.record,
            date: req.body.date,
        });

        recordEntity.save();
        res.json({
            status: 1, msg:'ok'
        })
        // var conditions = { _id: req.body.userId };
        // var updates = { $inc: { star: req.body.star } }
        // StudentModel.update(conditions, updates, function (error) {
        //     if (error) {
        //         console.error(error);
        //         res.json({ status: -1, msg: error })
        //     } else {
        //         console.log("（扣）分成功")
        //         res.json({ status: 1, msg: "ok" })
        //     }
        // });

        // res.json({ status: 1, msg: '保存成功' });
    })

    app.post('/deleteRecord', function (req, res) {
        // RecordModel.find({_id:req.body._id},function(error, result){
        //     if (error) {
        //         res.json({ status: -1, msg: error })
        //     }else{
        //         StudentModel.update({ _id: result[0].student }, { $inc: { star: - result[0].star }}, function (error) {
        //             if (error) {
        //                 console.error(error);
        //                 res.json({ status: -1, msg: error })
        //             } else {
                        
        //                 RecordModel.remove(conditions, function (error) {
        //                     if (error) {
        //                         res.json({ status: -1, msg: '发生错误' })
        //                     } else {
        //                         res.json({ status: 1, msg: '删除成功' })
        //                     }
        //                 });

        //             }
        //         });
        //     }
        // })

        var conditions = { _id: { $in: req.body._id } };

        RecordModel.remove(conditions, function (error) {
            if (error) {
                res.json({ status: -1, msg: '发生错误' })
            } else {
                res.json({ status: 1, msg: '删除成功' })
            }
        });
    })

    app.post('/getRecordsByCourseId', function (req, res) {
        console.log('/getRecordsByCourseId call')
        var skip = 0;
        var limit = 30;

        if (req.body.page == 0) {
            skip = 0;
        } else {
            skip = limit * parseInt(req.body.page);
        }

        RecordModel.find({course: req.body.courseId}, {}, { sort: { _id: -1 } }, function (error, result) {
            setTimeout(() => {
                if (error) {
                    res.json({ status: -1, msg: "获取数据失败" });
                } else {
                    res.json({ status: 1, msg: "ok", data: result });
                }

            }, 500);

        });
    })

    app.post('/getRecordsByUserIdAndCourseId', function (req, res) {
        console.log('/getRecordsByUserId call')
        var skip = 0;
        var limit = 30;

        if (req.body.page == 0) {
            skip = 0;
        } else {
            skip = limit * parseInt(req.body.page);
        }

        RecordModel.find({student:req.body.userId, course: req.body.courseId}, {}, { sort: { _id: -1 } }, function (error, result) {
            setTimeout(() => {
                if (error) {
                    res.json({ status: -1, msg: "获取数据失败" });
                } else {
                    res.json({ status: 1, msg: "ok", data: result });
                }

            }, 500);

        });
    })
}

