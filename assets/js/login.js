$(function () {
  //  去注册账号
  $("#gotoReg").click(function () {
    //  登录区域隐藏
    $(".loginBox").hide();
    //  注册区域显示
    $(".regBox").show();
  });
  // 去登录
  $("#gotoLogin").click(function () {
    // 注册区域隐藏
    $(".regBox").hide();
    // 登录区域显示
    $(".loginBox").show();
  });

  //   表单校验

  // layui获取form表单功能
  let form = layui.form;
  let layer = layui.layer;
  form.verify({
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repass: function (value, item) {
      // console.log(value, item);
      let pwd = $(".regBox input[name=password]").val();
      // console.log( pwd );
      if (value !== pwd) {
        return "两次输入的密码不一致!";
      }
    },
  });

  // 使用layer实现注册弹出层效果

  // 发送ajax请求，校验完成注册功能
  $("#regForm").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    console.log(data);
    $.ajax({
      type: "POST",
      url: "/api/reguser",
      data,
      success: function (res) {
        // console.log( res );
        if (res.status !== 0) {
          return layer.msg("注册失败" + res.message);
        }
        layer.msg("注册成功！");
        // 注册成功，显示去登录框
        $("#gotoLogin").click();
        console.log("1");
      },
    });
  });
  // 发送ajax请求实现登录功能进行跳转、
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/api/login",
      data,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("登录失败");
        }
        // 登录成功
        // 1.提示框==》layer.msg
        // layer.msg('登录成功，即将去后台主页)
        // 2.需要将token存储到本地中(localstorage)
        // res.token 本身就是字符串，可以直接存储
        // localStorage.setItem('token',res.token);
        // 跳转页面操作
        // location.href='index.html';

        // 延时跳转
        localStorage.setItem("token", res.token);
        layer.msg(
          "登录成功，即将去后台主页",
          {
            time: 2000, //2秒关闭（如果不配置，默认是3秒）
          },
          function () {
            // 关闭后做的事情 ==> 跳转页面
            location.href = "index.html";
          }
        );
      },
    });
  });
});
