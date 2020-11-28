$(function () {
  let layer = layui.layer;
  let query = {
    pagenum: 1,
    pagesize: 5,
    cate_id: "",
    state: "",
  };
  // 发送ajax请求获取对应文章列表
  getlist();
  function getlist() {
    $.ajax({
      url: "/my/article/list",
      data: query,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("获取文章列表失败！");
        }
        let htmlStr = template("listTpl", res);
        $("tbody").html(htmlStr);
      },
    });
  }

  //   补零操作，三元运算符
  //模板中过滤函数
  let addZero = function (n) {
    if (n < 10) {
      // console.log( );
      return "0" + n;
    } else {
      // console.log( n );
      return n;
    }
  };
  addZero(3);
  template.defaults.imports.formatTime = function (time) {
    //time为传进来的时间
    // 必须要有return返回处理好的数据

    let d = new Date(time);
    let y = d.getFullYear();
    let m = addZero(d.getMonth() + 1);
    let day = d.getDate();
    let h = d.getHours();
    let mm = d.getMinutes();
    let s = d.getSeconds();
    return `${y}-${m}-${day} ${h}:${mm}:${s}`;
  };
});
