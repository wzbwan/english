module.exports = function (app, TeamRecordModel, TeamModel) {
    app.post('/addTeamRecord', function (req, res) {
        console.log('addTeamRecord')
        console.log(req.body)
        var recordEntity = new TeamRecordModel({
            team: req.body.teamId,
            type: req.body.type,
            score: req.body.score,
            record: req.body.record,
            date: req.body.date,
        });

        recordEntity.save();

        var conditions = { _id: req.body.teamId };
        var updates = { $inc: { score: req.body.score } }
        TeamModel.update(conditions, updates, function (error) {
            if (error) {
                console.error(error);
                res.json({ status: -1, msg: error })
            } else {
                console.log("小组（扣）分成功")
                res.json({ status: 1, msg: "ok" })
            }
        });

        // res.json({ status: 1, msg: '保存成功' });
    })

    app.post('/deleteTeamRecord', function (req, res) {
        // TeamRecordModel.find({_id:req.body._id},function(error, result){
        //     if (error) {
        //         res.json({ status: -1, msg: error })
        //     }else{
        //         TeamModel.update({ _id: result[0].team }, { $inc: { star: - result[0].star }}, function (error) {
        //             if (error) {
        //                 console.error(error);
        //                 res.json({ status: -1, msg: error })
        //             } else {
                        
        //                 TeamRecordModel.remove(conditions, function (error) {
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

        TeamRecordModel.remove(conditions, function (error) {
            if (error) {
                res.json({ status: -1, msg: '发生错误' })
            } else {
                res.json({ status: 1, msg: '删除成功' })
            }
        });
    })

    app.post('/getTeamRecords', function (req, res) {
        console.log('/getRecords call')
        var skip = 0;
        var limit = 30;

        if (req.body.page == 0) {
            skip = 0;
        } else {
            skip = limit * parseInt(req.body.page);
        }

        TeamRecordModel.find({}, {}, { sort: { _id: 1 } }, function (error, result) {
            setTimeout(() => {
                if (error) {
                    res.json({ status: -1, msg: "获取数据失败" });
                } else {
                    res.json({ status: 1, msg: "ok", data: result });
                }

            }, 500);

        });
    })

    app.post('/getTeamRecordsByTeamId', function (req, res) {
        console.log('/getTeamRecordsByTeamId call')
        var skip = 0;
        var limit = 30;

        if (req.body.page == 0) {
            skip = 0;
        } else {
            skip = limit * parseInt(req.body.page);
        }

        TeamRecordModel.find({team:req.body.teamId}, {}, { sort: { _id: 1 } }, function (error, result) {
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

