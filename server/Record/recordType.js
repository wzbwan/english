module.exports = function (app, RecordTypeModel) {
    app.post('/addRecordType', function (req, res) {
        console.log('addRecordType')
        var recordTypeEntity = new RecordTypeModel({
            title:req.body.title,
            course: req.body.courseId,
            star:req.body.star,
        });

        recordTypeEntity.save();
        res.json({ status: 1, msg: '保存成功' });
    })

    app.post('/deleteRecordType', function (req, res) {
        var conditions = { _id: { $in: req.body._id } };
        RecordTypeModel.remove(conditions, function (error) {
            if (error) {
                res.json({ status: -1, msg: '发生错误' })
            } else {
                res.json({ status: 1, msg: '删除成功' })
            }
        });
    })

    app.post('/getRecordTypesByCourseId', function (req, res) {
        console.log('/getRecordTypes call')
        var skip = 0;
        var limit = 30;

        if (req.body.page == 0) {
            skip = 0;
        } else {
            skip = limit * parseInt(req.body.page);
        }

        RecordTypeModel.find({ course: req.body.courseId }, {}, { sort: { _id: 1 } }, function (error, result) {
            setTimeout(() => {
                if (error) {
                    res.json({ status: -1, msg: error });
                } else {
                    res.json({ status: 1, msg: "ok", data: result });
                }

            }, 500);

        });
    })
}

