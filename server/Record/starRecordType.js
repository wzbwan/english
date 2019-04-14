module.exports = function (app, StarRecordTypeModel) {
    app.post('/addStarRecordType', function (req, res) {
        console.log('addStarRecordType')
        var StarrecordTypeEntity = new StarRecordTypeModel({
            title: req.body.title,
            score: req.body.score,
        });

        StarrecordTypeEntity.save();
        res.json({ status: 1, msg: '保存成功' });
    })

    app.post('/deleteStarRecordType', function (req, res) {
        var conditions = { _id: { $in: req.body._id } };
        StarRecordTypeModel.remove(conditions, function (error) {
            if (error) {
                res.json({ status: -1, msg: '发生错误' })
            } else {
                res.json({ status: 1, msg: '删除成功' })
            }
        });
    })

    app.post('/getStarRecordTypes', function (req, res) {
        console.log('/getStarRecordTypes call')
        var skip = 0;
        var limit = 30;

        if (req.body.page == 0) {
            skip = 0;
        } else {
            skip = limit * parseInt(req.body.page);
        }

        StarRecordTypeModel.find({}, {}, { sort: { _id: 1 } }, function (error, result) {
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

