var expect = require('expect');
var User = require('index');

describe('seedit.user', function () {

    it('获取用户信息', function (done) {
        var isLogin = User.isLogin();
        var data;
        if (isLogin) {
            User.getUserInfo(function (res) {
                data = res;
                expect(data.uid).to.be.a('number');
                expect(data.username).to.be.a('string');
                done();
            });
        } else {
            done();
        }
    });

    it('获取默认头像', function () {
        expect(User.config.defaultAvatar.small).to.be('http://scdn.bozhong.com/source/resource/img/noavatar_small.gif');
        expect(User.config.defaultAvatar.middle).to.be('http://scdn.bozhong.com/source/resource/img/noavatar_middle.gif');
        expect(User.config.defaultAvatar.big).to.be('http://scdn.bozhong.com/source/resource/img/noavatar_big.gif');
        expect(User.config.defaultAvatar.big).to.be('http://scdn.bozhong.com/source/resource/img/noavatar_big.gif');
    });

    if (/seedit.com/.test(document.location.href)) {
        it('登录成功::被禁言的测试用户', function (done) {
            User.login('bz001', '2472252', function (data) {
                console.log(data);
                expect(data.error_code).to.be(0);
                expect(data.data.seedit_auth).to.be.a('string');
                expect(data.data.uid).to.be.a('number');
                expect(User.isLogin()).to.be(true);
                done();
            }, function (error) {
                console.log(error);
                done();
            });
        });

        it('登录失败::被禁言的测试用户', function (done) {
            User.login('bz001', '123456', function (data) {
                done();
            }, function (error) {
                expect(error.error_code).to.be(1001);
                done();
            });
        });

    }

    it('根据uid生成头像地址', function () {
        expect(User.buildAvatar('1344771')['small']).to.be('http://uc.seedit.com/data/avatar/001/34/47/71_avatar_small.jpg');
    });
});