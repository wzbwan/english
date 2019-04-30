// var urlConfig = require('../src/utils/config.js');

module.exports = function(app,dir,){
	app.get('*', function (req, res) {
		console.log('/ call')
	  res.sendFile( dir + '/build/index.html');
	});

	app.get('/manager', function (req, res) {
		console.log(dir)
		res.sendFile(dir + '/build/manager.html');
	});
	// webApp 上边一行用于开发模式，下边一行用于生产模式
	// app.get('/app.js', function (req, res) {
	// 	console.log('/app.js call')
	//   res.redirect('//'+urlConfig.ip+':'+urlConfig.wport+'/build/app.js');
	//   // res.sendFile(dir + '/build/app.js');
	// });

	// app.get('/admin', function (req, res) {
	// 	console.log('/admin call')
	//   res.sendFile( dir+'/build/admin.html');
	// });
	// // webApp 上边一行用于开发模式，下边一行用于生产模式
	// app.get('/admin.js', function (req, res) {
	// 	console.log('/admin.js call')
	// 	res.redirect('//'+urlConfig.ip+':'+urlConfig.wport+'/build/admin.js');
	//   // res.sendFile(dir + '/build/admin.js');
	// });

	// app.get('/game', function(req,res){
	// 	res.sendFile(dir+"/build/game.html")
	// })

}