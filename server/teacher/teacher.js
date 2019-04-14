module.exports = function (app, TeacherModel) {
    app.post('/adminRegister', function (req, res) {
        console.log('adminRegister')
        TeacherModel.find({phone: req.body.phone}, function(err, teachers){
            if (err) {
                res.json({status: -1, msg:err})
            }else{
                if (teachers && teachers.length > 0) {
                    res.json({status: -2, msg:"用户已存在。"})
                }else{
                    var studentEntity = new TeacherModel({
                        phone: req.body.phone,
                        passwd: req.body.passwd ? req.body.passwd : "000000",
                        name: req.body.name ? req.body.name : "匿名",
                        gender: req.body.gender ? req.body.gender : false,
                        delete: 1,
                    });

                    studentEntity.save();
                    res.json({ status: 1, msg: '保存成功' });
                }
            }
        })
    })

    app.post('/deleteTeacher', function(req, res){
        var conditions = { userId: req.body.userId };
        var updates = {
            $set: {
                delete: -1,
            }
        };
        TeacherModel.update(conditions, updates, function (error) {
            if (error) {
                console.error(error);
                res.json({ status: -1, msg: error })
            } else {
                console.error("删除成功")
                res.json({ status: 1, msg: "ok" })
            }
        });
    })

    app.post('/getTeachers', function (req, res) {
        console.log('/getTeachers call')
        var skip = 0;
        var limit = 30;

        if (req.body.page == 0) {
            skip = 0;
        } else {
            skip = limit * parseInt(req.body.page);
        }

        TeacherModel.find({}, {}, { sort: { _id: 1 } }, function (error, result) {
            setTimeout(() => {
                if (error) {
                    res.json({ status: -1, msg: "获取数据失败" });
                } else {
                    res.json({ status: 1, msg: "ok", data: result });
                }

            }, 500);

        });
    })

    app.post('/adminUserLogin', function( req, res){
        console.log('adminUserLogin call');
       
        TeacherModel.find({ phone: req.body.phone, passwd: req.body.passwd }, function (error, result) {
            if (!error) {
                if (result && result.length) {
                    res.json({
                        status: 1,
                        data: result[0],
                    })
                } else {
                    res.json({
                        status: -2,
                        msg: "用户名或密码错误。"
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

    app.post('/teacherInfoUpdate', function(req, res){
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
        TeacherModel.update(conditions, updates, function (error) {
            if (error) {
                console.error(error);
                res.json({ status: -1, msg: error })
            } else {
                console.error("删除成功")
                res.json({ status: 1, msg: "ok" })
            }
        });
    })

    app.post('/updateTeacher', function(req, res){
        var conditions = { _id: req.body._id };
        var newData = {
            ...req.body.data
        }
        var update = {
            $set: newData
        }
        console.log(update);
        TeacherModel.update(conditions, update, function( error){
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

