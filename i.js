var koa = require('koa'),
    router = require('koa-router')();
var fs = require('fs');

var index = fs.readFileSync('./s.html').toString();

var app = new koa();

router.get('/', ctx => {
    ctx.body = index;
});

router.all('/test', function (ctx) {
    ctx.body = true;
    io.emit('test-request-received', ctx.request);
});

app.use(router.routes());

var server = require('http').Server(app.callback()),
    io = require('socket.io')(server);

server.listen(80);
console.info('Started on 80 port');
