/*
 * @Description: 客户端脚本
 * @Author: 郭军伟
 * @Date: 2019-12-04 15:12:29
 * @lastEditTime: Do not edit
 */
require('./chart.css');

const $ = require('jquery');
const io = require('socket.io-client');

const socket = io('ws://localhost:3001');
let username = null, password = null;

$('.login-btn').click(function () {
    username = $('.login-username').val().trim();
    password = $('.login-password').val().trim();
    if (username && password) {
        socket.emit('login', {
            username: username,
            password: password
        })
    } else {
        alert('用户名或密码未填写！');
    }
})

// 登录成功
socket.on('loginSuccess', function (data) {
    if (data.username === username) {
        alert('登录成功');
        $('.login').hide();
        $('.chartRoom').show();
    } else {
        alert('用户名不匹配');
    }
})

socket.on('loginFail', function (data) {
    alert(data);
})

socket.on('add', function (data) {
    let html = `<div class="add-wrap">
        <div class="chart-add">系统消息：${data.username}已加入群聊</div>
            </div>`
    $('.chart-content').append(html);
})


