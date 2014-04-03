define("moe/seedit.user/0.0.1/seedit.user-debug", [ "moe/API/0.0.3/API-debug", "gallery/store/1.3.14/store-debug", "arale/events/1.1.0/events-debug" ], function(require, exports, module) {
    var User = {};
    var API = require("moe/API/0.0.3/API-debug");
    // 本地存储
    var store = require("gallery/store/1.3.14/store-debug");
    // 事件机制
    var Events = require("arale/events/1.1.0/events-debug");
    // 混入
    Events.mixTo(User);
    // 检查是否登录
    User.isLogin = function() {
        return document.cookie.indexOf("_auth") !== -1;
    };
    // 保存最后登录用户信息
    User.setLastLoginInfo = function(username, uid) {
        store.set("username", username);
        store.set("uid", uid);
    };
    // 获取最后登录用户信息
    User.getLastLoginInfo = function() {
        return {
            username: store.get("username"),
            uid: store.get("uid")
        };
    };
    // 获取信息成功后保存用户信息
    User.on("get_user_info_success", function(data) {
        User.setLastLoginInfo(data.username, data.uid);
    });
    // 获取用户信息
    User.getUserInfo = function(sCallback, fCallback) {
        API.get("bbs/common_member", function(data) {
            // 触发事件:成功获取用户信息
            User.trigger("get_user_info_success", data);
            sCallback(data);
        }, function(error) {
            fCallback && fCallback(error);
        });
    };
    // 退出登录
    User.logout = function() {
        API.del("bbs/auth_login", function() {
            // 触发事件:成功退出登录
            User.trigger("user_logout_success");
        }, function() {
            // 触发事件:退出登录失败
            User.trigger("user_logout_fail");
        });
    };
    // 登录
    User.login = function(username, password, sCallback, fCallback) {
        API.post("ucenter/login", {
            username: username,
            password: password
        }, function(data) {
            // 触发事件:登录成功
            User.trigger("user_login_success");
            sCallback && sCallback(data);
        }, function(error) {
            // 触发事件:登录失败
            fCallback && fCallback(error);
            User.trigger("user_login_fail");
        });
    };
    // 常用配置
    User.config = {
        defaultAvatar: {
            small: "http://scdn.bozhong.com/source/resource/img/noavatar_small.gif",
            middle: "http://scdn.bozhong.com/source/resource/img/noavatar_middle.gif",
            big: "http://scdn.bozhong.com/source/resource/img/noavatar_big.gif"
        }
    };
    // 生成头像
    User.buildAvatar = function(uid) {
        var temp = uid + "";
        var u;
        temp.length < 9 ? u = Array(9 - temp.length + 1).join("0") + temp : u = temp;
        u = u.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, "$1/$2/$3/$4");
        var url = "http://uc.seedit.com/data/avatar/" + u + "_avatar_";
        return {
            small: url + "small.jpg",
            middle: url + "middle.jpg",
            big: url + "big.jpg"
        };
    };
    module.exports = User;
});
