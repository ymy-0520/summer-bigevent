$(function () {
  let layer = layui.layer;
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");

  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  $.ajax({
    url: "/my/userinfo",
    success: function (res) {
      let  ressrc = res.data.user_pic;
      $image
        .cropper("destroy") // 销毁旧的裁剪区域
        .attr("src", ressrc) // 重新设置图片路径
        .cropper(options);// 重新初始化裁剪区域
       $('#avatar-card').fadeIn(200); //发送数据之后让面板显示
    },
  });

  // 点击上传按钮,触发上传按钮
  $("#uploadBtn").click(function () {
    $("#file").click();
  });
  //  监听文件域发生变化
  $("#file").on("change", function () {
    let file = this.files[0];
    let newImgURL = URL.createObjectURL(file);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  $("#sureBtn").click(function () {
    let dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    console.log(dataURL);
    // 发送请求
    $.ajax({
      type: "POST",
      url: "/my/update/avatar",
      data: {
        avatar: dataURL,
      },
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("请求头像失败" + res.message);
        }
        layer.msg(res.message);
        // 请求成功之后，同步修改父页面的头像信息
        window.parent.getAvatarAndName();
      },
    });
  });
});
