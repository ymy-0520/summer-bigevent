$(function () {
  let layer = layui.layer;
  let form = layui.form;

  function getData() {
    $.ajax({
      url: "/my/article/cates",
      success: function (res) {
        // console.log(res);
        let htmlStr = template("artTpl", res);
        $("tbody").html(htmlStr);
      },
    });
  }
  getData();

  // 添加数据
  let index;
  $("#addType").click(function () {
    index = layer.open({
      type: 1,
      title: "添加文章类别",
      area: "500px",
      content: $("#addTpl").html(),
    });
  });

  //   注册事件委托
  $("body").on("submit", "#addForm", function (e) {
    e.preventDefault();
    // 发送ajax请求提交数据
    // console.log( e );
    let data = $(this).serialize();
    $.ajax({
      url: "/my/article/addcates",
      type: "POST",
      data,
      success: function (res) {
        // console.log( res );
        if (res.status !== 0) {
          return layer.msg("新增文章分类失败！");
        }
        layer.msg("新增文章分类成功");
        // 关闭弹框
        layer.close(index);
        getData();
      },
    });
  });

  //  编辑文章类别
  let editIndex;
  $("tbody").on("click", ".editBtn", function () {
    // 获取修改的数据
    let id = $(this).attr("data-id");
    // 弹出层
    editIndex = layer.open({
      type: 1,
      title: "编辑文章类别",
      area: "500px",
      content: $("#editTpl").html(),
    });
    //   发送ajax获取数据
    $.ajax({
      url: "/my/article/cates/" + id,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("获取文章分类数据失败!");
        }
        // layer.msg("获取文章分类数据成功!");
        // 把数据填充到form表单中
        form.val("editForm", res.data);
      },
    });
  });
  // 确认修改数据，发送ajax请求，最终并渲染数据重新添加到页面中

  // 给修改按钮注册点击事件
  // 发送ajax数据，提交到服务器上
  $("body").on("submit", "#editForm", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    //   console.log( data );
    $.ajax({
      url: "/my/article/updatecate",
      type: "POST",
      data,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("更新分类信息失败！");
        }
        layer.msg("更新分类信息成功！");
        layer.close(editIndex);
        getData();
      },
    });
  });

  // 删除文章分类
  // 发送ajax请求，让后台删除数据
  $("tbody").on("click", ".delBtn", function () {
    let id = $(this).attr("data-id");
    $.ajax({
      url: "/my/article/deletecate/" + id,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }

        layer.confirm("是否确认删除?", { icon: 3, title: "提示" }, function () {
          layer.msg("删除文章分类成功!");
          getData();
        });
      },
    });
  });
});
