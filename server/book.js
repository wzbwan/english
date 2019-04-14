module.exports = function (app, BookModel) {
    app.post('/createBook', function (req, res) {
        console.log('createBook')
        var BookEntity = new BookModel({
            name: req.body.name,
        });
        BookEntity.save();
        res.json({ status: 1, msg: '保存成功' });
    })

    app.post('/deleteBook', function (req, res) {
        var conditions = { _id: req.body.bookId };
        BookModel.remove(conditions, function (error) {
            if (error) {
                console.error(error);
                res.json({ status: -1, msg: error })
            } else {
                console.error("删除成功")
                res.json({ status: 1, msg: "ok" })
            }
        });
    })

    app.post('/getBookById', function (req, res) {
        BookModel.findById(req.body.bookId, function (err, result) {
            if (!err && result) {
                res.json({
                    status: 1,
                    data: result
                })
            } else {
                res.json({
                    status: -1,
                    msg: err
                })
            }
        })
    })

    app.post('/getBooks', function (req, res) {
        console.log('/getBooks call')
        var skip = 0;
        var limit = 30;

        if (req.body.page == 0) {
            skip = 0;
        } else {
            skip = limit * parseInt(req.body.page);
        }

        BookModel.find({}, {}, { sort: { _id: 1 } }, function (error, result) {
            if (error) {
                res.json({ status: -1, msg: "获取数据失败" });
            } else {
                res.json({ status: 1, msg: "ok", data: result });
            }
        });
    })
}