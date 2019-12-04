/*
 * @Description: 服务端代码
 * @Author: 郭军伟
 * @Date: 2019-12-04 16:34:12
 * @lastEditTime: Do not edit
 */
const http = require('http');
const socketIo = require('socket.io');

const app = http.createServer();
const io = socketIo(app);

app.listen(3001, () =>{
    console.log('监听端口：3001');
});

io.on('connection', function (socket) {
    socket.emit('login', function (data) {
        console.log(data);
    })
})