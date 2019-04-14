module.exports = function (app, ChapterModel) {
    app.post('/createChapter', function (req, res) {
        console.log('createChapter')
        var chapterEntity = new ChapterModel({
            bookId: req.body.bookId,
            name: req.body.name,
        });
        chapterEntity.save();
        res.json({ status: 1, msg: '保存成功' });
    })

    app.post('/deleteChapter', function (req, res) {
        var conditions = { _id: req.body.chapterId };
        ChapterModel.remove(conditions, function (error) {
            if (error) {
                console.error(error);
                res.json({ status: -1, msg: error })
            } else {
                console.error("删除成功")
                res.json({ status: 1, msg: "ok" })
            }
        });
    })

    app.post('/getChapterById', function (req, res) {
        ChapterModel.findById(req.body.chapterId, function (err, result) {
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

    app.post('/getChaptersByBookId', function (req, res) {
        console.log('/getBooks call')
        var skip = 0;
        var limit = 30;

        if (req.body.page == 0) {
            skip = 0;
        } else {
            skip = limit * parseInt(req.body.page);
        }

        ChapterModel.find({bookId:req.body.bookId}, {}, { sort: { _id: 1 } }, function (error, result) {
            if (error) {
                res.json({ status: -1, msg: "获取数据失败" });
            } else {
                res.json({ status: 1, msg: "ok", data: result });
            }
        });
    })
}