var config = require('./config.js');
module.exports = function (app, request) {
    app.post('/loadResourceData', function (req, res) {
        console.log('queryResource')
        var method = req.method.toUpperCase();
        var proxy_url = 'http://' + config.back_ip + '/chaxun/ziliao';

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