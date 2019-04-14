module.exports = function (app, StarRecordModel) {
    app.post('/addStarRecord', function (req, res) {
        console.log('addStarRecord')
        var starRecordEntity = new StarRecordModel({
            userId: req.body.userId,
            type: req.body.type,
            score: req.body.score,
            record: req.body.record,
            date: req.body.date,
        });

        starRecordEntity.save();
        res.json({ status: 1, msg: '保存成功' });
    })

    app.post('/deleteStarRecord', function (req, res) {
        var conditions = { _id: { $in: req.body._id } };
        StarRecordModel.remove(conditions, function (error) {
            if (error) {
                res.json({ status: -1, msg: '发生错误' })
            } else {
                res.json({ status: 1, msg: '删除成功' })
            }
        });
    })

    app.post('/getStarRecords', function (req, res) {
        console.log('/getStarRecords call')
        var skip = 0;
        var limit = 30;

        if (req.body.page == 0) {
            skip = 0;
        } else {
            skip = limit * parseInt(req.body.page);
        }

        StarRecordModel.find({}, {}, { sort: { _id: 1 } }, function (error, result) {
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

