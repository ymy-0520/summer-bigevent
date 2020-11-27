$(function () {
  let layer = layui.layer;
  getAvatarAndName();
  //  退出功能，
  // 删除token   跳转页面到login.html
  $("#logoutBtn").click(function () {
    layer.confirm("确认退出?", { icon: 3, title: "提示" }, function (index) {
      //do something
      // 1.清除token
      localStorage.removeItem("token");
      location.href = "login.html";
      layer.close(index);
    });
  });
});


// 封装获取名称与头像的请求函数
function getAvatarAndName() {
  $.ajax({
    url: "/my/userinfo",
    //    请求头设置
    // headers: {
    //   Authorization: localStorage.getItem("token"),
    // },
    success: function (res) {
      //    console.log( res );

      // 发送函数之后进行判断，是否成功
      // if(status !==0){
      //   return layer.msg('获取用户信息失败！')
      // }


      // if (res.status !== 0) {
      //   layer.msg("获取用户信息失败！");
      // }
      //处理名称(有限展示昵称，其次用户名)
      // let name = res.data.nickname || res.data.username;

      // 短路运算符，||运算，寻找真值，找到真值，即返回，找不到就返回最后一个假值
      let name=res.data.nickname || res.data.username;

      console.log(res.data.username);
      //    转换大小写，首字母
      // let first=name[0].toUpperCase();


      let first = name[0].toUpperCase();
      console.log(name[0]);

      $("#welcome").text("欢迎" + name);

      //   处理用户头像，根据res.data.user_pic
      // 有用户头像展示用户头像，隐藏文字
      // 没有用户头像，展示文字，隐藏用户头像===文字头像来源于name的第一个字母大写
      if (res.data.user_pic) {
        $(".layui-nav-img").show().attr("src", res.data.user_pic);
        // console.log( res.data.user_pic );
        $(".text-avatar").hide();
      } else {
        //   没有用户头像，展示文字
        $(".layui-nav-img").hide();
        $(".text-avatar").text(first).show();



      }
    },
    // complete:function (xhr) {
    //     console.log( xhr );
    //     if(xhr.responseJSON.status===1 && xhr.responseJSON.message==='身份认证失败！'){
    //         // 返回登录页面，重新登录，同时把token清除
    //         localStorage.removeItem('token');
    //         location.href='login.html';
    //     }
    //  }
  });
}
