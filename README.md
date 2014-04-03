# seedit.user

---
网站通用用户模块
---

## 使用说明


## API

### isLogin `isLogin()`
检查是否登录

### getUserInfo `getUserInfo(successCallback,failCallback)`
获取用户信息

参数说明：

+ `successCallback` 成功回调
+ `failCallback` 失败回调，一般是因为没有登录，或者服务端其他错误

### config.defaultAvatar   `config.defaultAvatar`
获取默认头像
```
 {
    small: 'http://uc.seedit.com/images/noavatar_small.gif',
    middle: 'http://uc.seedit.com/images/noavatar_middle.gif',
    big: 'http://uc.seedit.com/images/noavatar_big.gif'
}
```
### buildAvatar `buildAvatar(uid)`
根据uid生成头像图片
```
 {
  small: "http://uc.seedit.com/data/avatar/001/15/89/77_avatar_small.jpg",
  middle: "http://uc.seedit.com/data/avatar/001/15/89/77_avatar_middle.jpg",
  big: "http://uc.seedit.com/data/avatar/001/15/89/77_avatar_big.jpg"
  }
```