$(function () {

  let form = layui.form;

  // 表单密码校验
  form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 校验原密码与新密码是否相同
    // 校验新密码是否与确认密码相同
    newPwd: function (value) {
      let oldPwd = $("[name=oldPwd]").val();
      if (value === oldPwd) {
        return "新密码不能与原密码相同！";
      }
    },
    samePwd: function (value) {
      // value确认密码
      let newPwd = $("[name=newPwd]").val();
      if (value !== newPwd) {
        return "两次密码不一致！";
      }
    },
  });
  // 提交form表单，密码重置
  let $form=$('#pwdForm');
  $form.on('submit',function (e) {
    e.preventDefault();
    let data=$(this).serialize();
    // 发送ajax请求
    $.ajax({
      type:'POST',
      url:'/my/updatepwd',
      data,
      success:function (res) { 
        console.log( res );
        if(res.status!==0){
          return layer.msg("更新密码失败！"+res.message);
        }
        layer.msg("更新密码成功！");
        // 重置表单中的密码框内容DOM对象
        $form.get(0).reset();
       }
    })





    })





});
