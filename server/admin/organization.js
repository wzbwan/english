var config = require('./config.js');
module.exports = function (app, request) {
    app.post('/loadOrgData', function (req, res) {

        console.log('loadOrgData')
        // setTimeout(() => {
        //     res.json({
        //         status: 1,
        //         data: [
        //             {
        //                 code: '01',
        //                 name: '厅机关',
        //                 children: [
        //                     {
        //                         code: '0101',
        //                         name: '厅领导'
        //                     },
        //                     {
        //                         code: '0102',
        //                         name: '政治部'
        //                     },
        //                     {
        //                         code: '0103',
        //                         name: '办公室'
        //                     }
        //                 ]
        //             },
        //             {
        //                 code: '02',
        //                 name: '盟市',
        //                 children: [
        //                     {
        //                         code: '0201',
        //                         name: '呼和浩特市'
        //                     },
        //                     {
        //                         code: '0202',
        //                         name: '包头市'
        //                     },
        //                     {
        //                         code: '0203',
        //                         name: '乌海市'
        //                     },
        //                     {
        //                         code: '0204',
        //                         name: '赤峰市'
        //                     }
        //                 ]
        //             }
        //         ]
        //     })
        // }, 1000);
        //'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        var method = req.method.toUpperCase();
        var proxy_url = 'http://' + config.back_ip + '/chaxun/jglb';

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