module.exports = function (app, TeamModel) {
    app.post('/createTeam', function (req, res) {
        console.log('createTeam')
        
        var teamEntity = new TeamModel({
            course: req.body.courseId,
            sortName: req.body.sortName,
            name:"",
            slogan:"",
            score: req.body.score?req.body.score:0,                        
        });

        teamEntity.save();
        res.json({ status: 1, msg: '保存成功' });
    })

    app.post('/deleteTeam', function(req, res){
        var conditions = { teamId: req.body.teamId };
        var updates = {
            $set: {
                delete: -1,
            }
        };
        TeamModel.update(conditions, updates, function (error) {
            if (error) {
                console.error(error);
                res.json({ status: -1, msg: error })
            } else {
                console.error("删除成功")
                res.json({ status: 1, msg: "ok" })
            }
        });
    })

    app.post('/getTeamsByCourseId', function (req, res) {
        console.log('/getTeamsByCourseId call')
        var skip = 0;
        var limit = 30;

        if (req.body.page == 0) {
            skip = 0;
        } else {
            skip = limit * parseInt(req.body.page);
        }

        TeamModel.find({course:req.body.courseId}, {}, { sort: { _id: 1 } }, function (error, result) {
            setTimeout(() => {
                if (error) {
                    res.json({ status: -1, msg: "获取数据失败" });
                } else {
                    res.json({ status: 1, msg: "ok", data: result });
                }

            }, 500);

        });
    })

    app.post('/pushMemberToTeam', function(req, res){
        var condition = {_id: req.body.teamId};
        var pushData = {
            '$addToSet':{
                "members":{
                    '$each':req.body.members,
                }
            }
        }
        TeamModel.update(condition,pushData,function(err,data){
            if (err) {
                console.error(err)
                res.json({ status: -1, msg: "添加成员失败" });
            }else{
                res.json({ status: 1, msg: "ok" });
            }

        })
    })

    app.post('/removeMemberFromTeam', function(req, res){
        var condition = { _id: req.body.teamId };
        // var pullData = {
        //     '$pull': {
        //         members: req.body.userId,
        //     }
        // }
        var pullData = {
            '$pull': {
                "members": req.body.member,
            }
        }
        TeamModel.update(condition, pullData, function (err, data) {
            if (err) {
                console.error(err)
                res.json({ status: -1, msg: "删除成员失败" });
            } else {
                res.json({ status: 1, msg: "ok" });
            }

        })
    })

    app.post('/updateTeam', function(req, res){
        var conditions = { _id: req.body._id };
        var newData = {
            ...req.body.data
        }
        var update = {
            $set: newData
        }
        TeamModel.update(conditions, update, function( error){
            if (error) {
                res.json({status: -1, msg: error});
            }else{
                res.json({
                    status: 1,
                    msg: "ok"
                })
            }
        })
    })

}

