// const {back_ip} = require('./config')
var config = require('./config.js');
module.exports = function (app, request) {
    app.post('/loadExamData', function (req, res) {
        console.log('queryExam')
        var method = req.method.toUpperCase();
        var proxy_url = 'http://' + config.back_ip + '/chaxun/kaoshi';

        var options = {
            headers: { "Connection": "close" },
            url: proxy_url,
            method: method,
            json: true,
            body: req.body
        };

        function callback(error, response, data) {
            if (!error && response.statusCode == 200) {
                // console.log('------接口数据------', data);

                res.json(data)
            }
        }
        request(options, callback);
    })
}