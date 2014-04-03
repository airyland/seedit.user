define("moe/seedit.user/0.0.1/seedit.user-debug", [ "moe/API/0.0.3/API-debug" ], function(require, exports, module) {
    var API = require("moe/API/0.0.3/API-debug");
    // 检查是否登录
    var isLogin = function() {
        return document.cookie.indexOf("_auth") !== -1;
    };
    // 获取用户信息
    var getUserInfo = function(sCallback, fCallback) {
        API.get("bbs/common_member", function(data) {
            sCallback(data);
        }, function(error) {
            fCallback && fCallback(error);
        });
    };
    var config = {
        defaultAvatar: {
            small: "http://uc.seedit.com/images/noavatar_small.gif",
            middle: "http://uc.seedit.com/images/noavatar_middle.gif",
            big: "http://uc.seedit.com/images/noavatar_big.gif"
        }
    };
    var buildAvatar = function(uid) {
        var temp = uid + "";
        var u;
        temp.length < 9 ? u = Array(9 - temp.length + 1).join("0") + temp : u = temp;
        u = u.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, "$1/$2/$3/$4");
        var url = "http://uc.seedit.com/data/avatar/" + u + "_avatar_";
        return {
            small: url + ".small.jpg",
            middle: url + ".middle.jpg",
            big: url + ".big.jpg"
        };
    };
    module.exports = {
        config: config,
        isLogin: isLogin,
        getUserInfo: getUserInfo,
        buildAvatar: buildAvatar
    };
});
