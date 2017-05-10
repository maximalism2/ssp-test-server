var koa = require('koa'),
    router = require('koa-router')(),
    fs = require('fs'),
    bodyParser = require('koa-bodyparser');


var index = fs.readFileSync('./s.html').toString();

var app = new koa();

router.get('/', ctx => {
    ctx.body = index;
});

router.all('/test', async ctx => {
    ctx.body = true;
    io.emit('test-request-received', {
        request: ctx.request,
        body: ctx.request.body,
    });
});

app.use(bodyParser({
    enableTypes: ['text', 'json', 'form'],
}));
app.use(router.routes());


var server = require('http').Server(app.callback()),
    io = require('socket.io')(server);


var port = process.env.PORT || 8080;
server.listen(port);
console.info('Started on ' + port + ' port');
