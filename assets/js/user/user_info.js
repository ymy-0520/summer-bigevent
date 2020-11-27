$(function () {
  let layer = layui.layer;
  let form = layui.form;

  // 发送ajax请求获取用户基本信息
  getInfo();
  function getInfo() {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("获取用户基本信息失败！");
        }

        // 获取信息成功，把响应回来的数据添加到form表单中，
        // 使用语法：form.val('filter',object)
        // userform 即class='layui-form,所在元素属性 layui-filter=''对应的值
        form.val("userForm", res.data);
      },
    });
  }
  //   重置功能
  $("#resetBtn").click(function (e) {
    e.preventDefault();
    // 再次发送ajax数据，填充到form中
    getInfo();
  });
  // 提交表单修改数据-修改用户信息
  $("#userForm").submit(function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("res.message");
        }
        layer.msg("修改用户信息成功！");
        // 实时更新父页面的数据，，(index.html)
        window.parent.getAvatarAndName();
      },
    });
  });
  // 添加表单校验功能
  form.verify({
    nickname: function (value, item) {
      if (value.length > 6) {
        return "昵称的长度必须在1~6之间";
        // return layer.msg('昵称的长度必须在1~6之间', {icon: 6}); 
      }
    },
  });
});
