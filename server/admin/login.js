module.exports = function (app) {
    app.post('/login', function (req, res) {
        setTimeout(() => {
            if (req.body.password == '5279') {
                res.json({
                    status: 1,
                    name: '超级超级管理员',
                    msg: '登陆成功',
                    authMenu: [
                        { key: '/app/dashboard/index', value: '/app/dashboard/index', show: true, label: '首页', icon: 'laptop', },
                        {
                            key: '/app/student/list', value: '/app/student/list', show: true, label: '学生列表', icon: 'scan',
                        },
                        {
                            key: '/app/exam/list', value: '/app/exam/list', show: true, label: '考试', icon: 'scan',
                        },
                        {
                            key: '/app/train/list', value: '/app/train/list', show: true, label: '培训', icon: 'scan',
                        },
                        {
                            key: '/app/news/list', value: '/app/news/list', show: true, label: '新闻', icon: 'scan',
                        },
                        {
                            key: '/app/resouce/list', value: '/app/resouce/list', show: true, label: '学习资料', icon: 'scan',
                        },
                    ]
                })
            } else {
                res.json({
                    status: -1,
                    msg: "口令错误"
                })
            }
        }, 1000);
        
    })
}