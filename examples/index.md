# 演示文档

---

````javascript
seajs.use('seedit.user', function(user){
      console.log(user.isLogin());
      user.getUserInfo(function(data){
        console.log(data);
      },function(error){
        console.log('fail',error);
      });
      console.log(user.buildAvatar('1158977'));
      console.log(user.config.defaultAvatar);
});
````
