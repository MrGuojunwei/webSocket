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

let users = []; // 用户数组


app.listen(3001, () => {
    console.log('监听端口：3001');
});

io.on('connection', function (socket) {

    let username = null; // 当前连接的用户名

    socket.on('login', function (data) {
        let isNew;
        let index = users.findIndex(item => item.username === data.username);
        isNew = index < 0 ? true : false;

        if (isNew) {
        /*登录成功*/
            username = data.username;
            users.push(data);
            socket.emit('loginSuccess', data);
        } else {
            socket.emit('loginFail', '用户名已存在')
        }

        // 向所有连接的客户广播add事件
        io.sockets.emit('add', data)
    })


    socket.on('message', function (data) {
        // 接收到消息后，将消息广播出去
        io.sockets.emit('receiveMessage', data)
    })

    socket.on('disconnect', function () {
        // 广播退出
        io.sockets.emit('leave', username);
        users = users.filter(item => item.username !== username);
    })
})