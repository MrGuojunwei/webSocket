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

let clickCount = 0;

// 登录
$('.login-btn').on('touchend', function () {
    clickCount++;
    if (clickCount >= 6) {
        require('eruda').init();
    }
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

// 发送消息
$('.send-btn').on('touchend', function () {
    let message = $('.send-input').val();
    message = message && message.trim();
    socket.emit('message', {
        username: username,
        message: message
    })
    $('.send-input').val('');
})

// 登录成功
socket.on('loginSuccess', function (data) {
    if (data.username === username) {
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

socket.on('receiveMessage', function (data) {
    let html;
    if (data.username === username) {
        // 自己的消息
        html = `<div class="user-wrap flex-end">
        <div class="message marginRight8">
            <div class="username right0">${data.username}</div>
            <div class="message-content self">${data.message}</div>
        </div>
        <img src="http://b-ssl.duitang.com/uploads/item/201810/18/20181018165026_sovtt.jpeg" class="head-img"
            alt="">
    </div>`
        $('.chart-content').append(html);
    } else {
        // 其他人的消息
        html = `<div class="user-wrap flex-start">
        <img src="http://b-ssl.duitang.com/uploads/item/201810/18/20181018165026_sovtt.jpeg" class="head-img"
            alt="">
        <div class="message marginLeft8">
            <div class="username left0">${data.username}</div>
            <div class="message-content">${data.message}</div>
        </div>
    </div>`;
        $('.chart-content').append(html);
    }
})

// 监听离开事件
socket.on('leave', function (data) {
    let html = `<div class="add-wrap">
        <div class="chart-add">系统消息：${data}离开了群聊</div>
            </div>`
    $('.chart-content').append(html);
})


