module.exports = function (app, SentenceModel) {
    app.post('/createSentence', function (req, res) {
        console.log('createSentence')
        var sentenceEntity = new SentenceModel({
            title: req.body.title,
            en: req.body.en,
            ch: req.body.ch,
            chapterId: req.body.chapterId,
            count: 0,
        });
        sentenceEntity.save();
        res.json({ status: 1, msg: '保存成功' });
    })

    app.post('/deleteSentence', function (req, res) {
        var conditions = { _id: req.body.sentenceId };
        SentenceModel.remove(conditions, function (error) {
            if (error) {
                console.error(error);
                res.json({ status: -1, msg: error })
            } else {
                console.error("删除成功")
                res.json({ status: 1, msg: "ok" })
            }
        });
    })

    app.post('/getSentenceById', function (req, res) {
        SentenceModel.findById(req.body.SentenceId, function (err, result) {
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

    app.post('/getSentenceByChapterId', function (req, res) {
        console.log('/getSentenceByChapterId call')
        var skip = 0;
        var limit = 30;

        if (req.body.page == 0) {
            skip = 0;
        } else {
            skip = limit * parseInt(req.body.page);
        }

        SentenceModel.find({ chapterId: req.body.chapterId }, {}, { sort: { _id: 1 } }, function (error, result) {
            if (error) {
                res.json({ status: -1, msg: "获取数据失败" });
            } else {
                res.json({ status: 1, msg: "ok", data: result });
            }
        });
    })
}