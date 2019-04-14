var config = require('./config.js');
module.exports = function (app, request) {
    app.post('/loadTrainData', function (req, res) {
        console.log('queryTrain')
        var method = req.method.toUpperCase();
        var proxy_url = 'http://' + config.back_ip + '/chaxun/pxbsj';

        var options = {
            headers: { "Connection": "close" },
            url: proxy_url,
            method: method,
            json: true,
            body: req.body
        };

        function callback(error, response, data) {
            if (!error && response.statusCode == 200) {
                console.log('------接口数据------', data);

                res.json(data)
            }
        }
        request(options, callback);
    })
}