define("moe/seedit.user/0.0.1/seedit.user",["moe/API/0.0.3/API","gallery/store/1.3.14/store","arale/events/1.1.0/events"],function(a,b,c){var d={},e=a("moe/API/0.0.3/API"),f=a("gallery/store/1.3.14/store"),g=a("arale/events/1.1.0/events");g.mixTo(d),d.isLogin=function(){return-1!==document.cookie.indexOf("_auth")},d.setLastLoginInfo=function(a,b){f.set("username",a),f.set("uid",b)},d.getLastLoginInfo=function(){return{username:f.get("username"),uid:f.get("uid")}},d.on("get_user_info_success",function(a){d.setLastLoginInfo(a.username,a.uid)}),d.getUserInfo=function(a,b){e.get("bbs/common_member",function(b){d.trigger("get_user_info_success",b),a(b)},function(a){b&&b(a)})},d.logout=function(){e.del("bbs/auth_login",function(){d.trigger("user_logout_success")},function(){d.trigger("user_logout_fail")})},d.login=function(a,b,c,f){e.post("ucenter/login",{username:a,password:b},function(a){d.trigger("user_login_success"),c&&c(a)},function(a){f&&f(a),d.trigger("user_login_fail")})},d.config={defaultAvatar:{small:"http://scdn.bozhong.com/source/resource/img/noavatar_small.gif",middle:"http://scdn.bozhong.com/source/resource/img/noavatar_middle.gif",big:"http://scdn.bozhong.com/source/resource/img/noavatar_big.gif"}},d.buildAvatar=function(a){var b,c=a+"";b=c.length<9?Array(9-c.length+1).join("0")+c:c,b=b.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/,"$1/$2/$3/$4");var d="http://uc.seedit.com/data/avatar/"+b+"_avatar_";return{small:d+"small.jpg",middle:d+"middle.jpg",big:d+"big.jpg"}},c.exports=d});
