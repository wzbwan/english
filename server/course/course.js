module.exports = function (app, CourseModel, StudentModel, RecordModel) {
    app.post('/createCourse', function (req, res) {
        console.log('createCourse')
        var courseEntity = new CourseModel({
            teacher: req.body.teacherId,
            name: req.body.name,                       
            term: req.body.term,   
            members: [],                
            sections: [],                       
        });

        courseEntity.save();
        res.json({ status: 1, msg: '保存成功' });
    })

    app.post('/deleteCourse', function(req, res){
        var conditions = { userId: req.body.userId };
        var updates = {
            $set: {
                delete: -1,
            }
        };
        CourseModel.update(conditions, updates, function (error) {
            if (error) {
                console.error(error);
                res.json({ status: -1, msg: error })
            } else {
                console.error("删除成功")
                res.json({ status: 1, msg: "ok" })
            }
        });
    })

    app.post('/getCourseById', function(req, res){
        CourseModel.findById(req.body.courseId, function(err, result){
            if (!err && result) {
                res.json({
                    status: 1,
                    data: result
                })
            }else{
                res.json({
                    status: -1,
                    msg:err
                })
            }
        })
    })

    app.post('/getCourseByTeacher', function (req, res) {
        console.log('/getCourseByTeacher call')
        var skip = 0;
        var limit = 30;

        if (req.body.page == 0) {
            skip = 0;
        } else {
            skip = limit * parseInt(req.body.page);
        }

        CourseModel.find({teacher: req.body.teacherId}, {}, { sort: { _id: 1 } }, function (error, result) {
            setTimeout(() => {
                if (error) {
                    res.json({ status: -1, msg: "获取数据失败" });
                } else {
                    res.json({ status: 1, msg: "ok", data: result });
                }

            }, 500);

        });
    })

    app.post('/getCourseByStudentId', function( req, res){
        console.log("getCourseByStudentId");
        CourseModel.find({}, function(err, result){
            if (!err && result.length) {
                
                res.json({
                    status: 1, 
                    data: result.filter(course => course.members.indexOf(req.body.studentId) >= 0)
                })
            }else{
                res.json({status: -1, msg: err});
            }
        })
    })

    app.post('/updateCourse', function(req, res){
        var conditions = { _id: req.body._id };

        var newData = {
            ...req.body.data
        }

        var update = {
            $set: newData
        }

        CourseModel.update(conditions, update, function( error){
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

    app.post('/pushMemberToCourse', function (req, res) {
        var condition = { _id: req.body.courseId };
        var pushData = {
            '$addToSet': {
                "members": {
                    '$each': req.body.members,
                }
            }
        }
        CourseModel.update(condition, pushData, function (err, data) {
            if (err) {
                console.error(err)
                res.json({ status: -1, msg: "添加成员失败" });
            } else {
                res.json({ status: 1, msg: "ok" });
            }

        })
    })

    app.post('/getStudentsByCourse', function (req, res) {
        console.log('/getStudentsByCourse call')
        CourseModel.find({ _id: req.body.courseId }, function (err, courses) {
            if (!err && courses.length) {
                StudentModel.find({ _id: { "$in": courses[0].members } }, {}, { sort: { _id: 1 } }, function (error, result) {
                    setTimeout(() => {
                        if (error) {
                            res.json({ status: -1, msg: "获取该课程成员数据失败" });
                        } else {
                            res.json({ status: 1, msg: "ok", data: result });
                        }

                    }, 500);

                });
            } else {
                res.json({ status: -1, msg: "课程未找到？" });
            }
        })


    })

    app.post('/starRank', function(req, res){
        CourseModel.find({ _id: req.body.courseId }, function (err, courses) {
            if (!err && courses.length) {
                StudentModel.find({ _id: { "$in": courses[0].members } }, {}, { sort: { _id: 1 } }, function (error, students) {
                    if (error) {
                        res.json({ status: -1, msg: "获取该课程成员数据失败" });
                    } else {
                        RecordModel.find({student:{"$in":students.map(student=>(student._id))}}, function(e, records){
                            if (!e) {
                                let data = [];
                                
                                students.forEach(student => {
                                    let star = 30;
                                    records.forEach(record => {
                                        
                                        if (record.student.toString() === student._id.toString()) {
                                            star += record.star;
                                        }
                                    });
                                    data.push({ name:student.name, studentId:student.studentId, gender:student.gender, star: star })
                                });
                                res.json({ status: 1, data: data.sort((s1,s2)=>s2.star-s1.star) })
                            }else{
                                res.json({ status: -1, msg: "查找record失败。" });
                            }
                            
                        })
                    }
                });
            } else {
                res.json({ status: -1, msg: "课程未找到？" });
            }
        })
    })

}

