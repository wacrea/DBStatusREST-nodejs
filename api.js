var http = require('http');

var server = http.createServer(function(req, res) {
	res.writeHead(200);
	res.end('HAY!');
});
server.listen(1312);