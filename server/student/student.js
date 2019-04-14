module.exports = function (app, StudentModel, CourseModel, RecordModel) {
    app.post('/register', function (req, res) {
        console.log('register')
        StudentModel.find({studentId:req.body.studentId},(err,result) => {
            if (!err && result && result.length) {
                res.json({status: -1, msg: '该学号已存在。'})
            }else{
                var studentEntity = new StudentModel({
                    studentId: req.body.studentId,
                    passwd: req.body.passwd ? req.body.passwd : "000000",
                    name: req.body.name ? req.body.name : "匿名",
                    gender: req.body.gender ? req.body.gender : false,
                    star: req.body.star ? req.body.star : 30,
                });

                studentEntity.save();
                res.json({ status: 1, msg: '保存成功' });
            }
        })
        
    })

    app.post('/addStudentPushToCourse', function ( req, res){

        StudentModel.find({ studentId: req.body.studentId }, (err, result) => {
            if (!err && result && result.length) {
                var condition = { _id: req.body.courseId };
                var pushData = {
                    '$addToSet': {
                        "members": result[0]._id
                    }
                }
                CourseModel.update(condition, pushData, function (updateErr, data) {
                    if (updateErr) {
                        console.error(updateErr)
                        res.json({ status: -1, msg: updateErr });
                    } else {
                        res.json({ status: 1, msg: "ok" });
                    }

                })
            } else {
                var studentEntity = new StudentModel({
                    studentId: req.body.studentId,
                    passwd: req.body.passwd ? req.body.passwd : "000000",
                    name: req.body.name ? req.body.name : "匿名",
                    gender: req.body.gender ? req.body.gender : false,
                    star: req.body.star ? req.body.star : 30,
                });

                studentEntity.save((saveErr, saveData) => {
                    if (!saveErr && saveData) {
                        var condition = { _id: req.body.courseId };
                        var pushData = {
                            '$addToSet': {
                                "members": saveData._id
                            }
                        }
                        CourseModel.update(condition, pushData, function (updateErr, data) {
                            if (updateErr) {
                                console.error(updateErr)
                                res.json({ status: -1, msg: updateErr });
                            } else {
                                res.json({ status: 1, msg: "ok" });
                            }

                        })
                    }else{
                        res.json({ status: -1, msg: saveErr });
                    }
                });
                
            }
        })
    })

    app.post('/deleteStudent', function(req, res){
        var conditions = { userId: req.body.userId };
        var updates = {
            $set: {
                delete: -1,
            }
        };
        StudentModel.update(conditions, updates, function (error) {
            if (error) {
                console.error(error);
                res.json({ status: -1, msg: error })
            } else {
                console.error("删除成功")
                res.json({ status: 1, msg: "ok" })
            }
        });
    })

    app.post('/getStudents', function (req, res) {
        console.log('/getStudents call')
        var skip = 0;
        var limit = 30;

        if (req.body.page == 0) {
            skip = 0;
        } else {
            skip = limit * parseInt(req.body.page);
        }

        StudentModel.find({}, {}, { sort: { _id: 1 } }, function (error, result) {
            setTimeout(() => {
                if (error) {
                    res.json({ status: -1, msg: "获取数据失败" });
                } else {
                    res.json({ status: 1, msg: "ok", data: result });
                }

            }, 500);

        });
    })

    

    app.post('/userLogin', function( req, res){
        console.log('userLogin call');
       
        StudentModel.findOne({ studentId: req.body.username, passwd: req.body.password }, function (error, result) {
            if (!error) {
                if (result) {
                    RecordModel.find({ student: result._id }, {}, { sort: { _id: -1 } }, function(e, records){
                            res.json({
                                status: 1,
                                data: {student:result, records:!e&&records?records:[]},
                                authMenu: [{
                                    key: '/notice', value: '/notice', show: true, title: '通知公告', color: '#ff0000', icon: 'speaker_notes',
                                },
                                {
                                    key: '/record', value: '/record', show: true, title: '行为记录', color: '#f44336', icon: 'insert_invitation',
                                },
                                {
                                    key: '/rank', value: '/rank', show: true, title: '个人排名', color: '#f44336', icon: 'assessment',
                                },
                                {
                                    key: '/team', value: '/team', show: true, title: '我的小组', color: '#f44336', icon: 'group_work',
                                },
                                {
                                    key: '/teamRank', value: '/teamRank', show: true, title: '小组排名', color: '#009688', icon: 'group',
                                },
                                {
                                    key: '/advise', value: '/advise', show: true, title: '意见反馈', color: '#ab47bc', icon: 'rate_review',
                                },
                                {
                                    key: '/person', value: '/person', show: true, title: '个人信息', color: '#ab47bc', icon: 'contacts',
                                },]
                            })
                    })
                } else {
                    res.json({
                        status: -2,
                        msg: "查无此人"
                    })
                }
            } else {
                res.json({
                    status: -1,
                    msg: error
                })
            }
        })
    })

    app.post('/userInfoUpdate', function(req, res){
        var conditions = { _id: req.body._id };
        var newData = {
            name: req.body.name,
            gender: req.body.gender,
        };
        if (req.body.password && req.body.password.length) {
            newData.passwd = req.body.password;
        }
        var updates = {
            $set: newData
        };
        StudentModel.update(conditions, updates, function (error) {
            if (error) {
                console.error(error);
                res.json({ status: -1, msg: error })
            } else {
                console.error("删除成功")
                res.json({ status: 1, msg: "ok" })
            }
        });
    })

    app.post('/updateStudent', function(req, res){
        var conditions = { _id: req.body._id };
        var newData = {
            ...req.body.data
        }
        var update = {
            $set: newData
        }
        StudentModel.update(conditions, update, function( error){
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

    app.post('/getUserInfo', function(req, res){
        StudentModel.find({ _id: req.body._id }, function (error, result) {
            if (!error) {
                if (result && result.length) {
                    res.json({
                        status: 1,
                        data: result[0],
                    })
                } else {
                    res.json({
                        status: -2,
                        msg: "查无此人"
                    })
                }

            } else {
                res.json({
                    status: -1,
                    msg: error
                })
            }
        })
    })
}

