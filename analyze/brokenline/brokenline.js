//线性图
var dimen = require("../../../utils/dimen.js");
var data = require('../../../data/daily.js');

//创建 canvas 绘图
const context_line = wx.createCanvasContext('line-canvas');

var canvasWidth_line = 0;
var canvasHeight_line = 0;

// x轴放大倍数
var ratioX = 12.4;
// y轴放大倍数
var ratioY = 4;

// 紫色
var purple = '#7E8FDD';
// 浅紫
var lightPurple = '#D6DBF4';
// 灰色
var gray = '#cccccc';
// 浅灰
var lightGray = '#c7cce5';
// 橙色
var orange = '#ffaa00';
// 浅橙色
var lightOrange = '#DAD7DC';
// 板岩暗蓝灰色
var SlateBlue = '#6A5ACD';

// 最大访问人数
var maxUV = 0;

var count = 0;

var Timing = {
  //由慢至快
  easeIn: function easeIn(pos) {
    //x的y次幂
    return Math.pow(pos, 3);
  },

//由快至慢
  easeOut: function easeOut(pos) {
    return Math.pow(pos - 1, 3) + 1;
  },
  
//由快至慢再由慢至快
  easeInOut: function easeInOut(pos) {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 3);
    } else {
      return 0.5 * (Math.pow(pos - 2, 3) + 2);
    }
  },

  linear: function linear(pos) {
    return pos;
  }
};

Page({
  data: {
    visitTrendList: [],   //调用数据
  },

  onLoad: function () {   //登陆
    var that = this;
    //获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        dimen.init(res.windowWidth);      //初始化屏幕自适应
        canvasWidth_line = dimen.rpx2px(710);    // 折线图的画布宽度
        canvasHeight_line = dimen.rpx2px(400);   // 折线图的画布高度
      }
    });

    this.loadForVisitTrend();
  },

  loadForVisitTrend: function () {
    var that = this;
    this.data.visitTrendList = data.visitTrend; //存储数据
    var list = this.data.visitTrendList;

    this.drawVisitBackground();   // 画横向参照线 
    this.drawDate(this.data.visitTrendList);  //画底部日期
    this.draw();    //画

//动画
    this.Animation({
      timing: 'easeIn',
      duration: 1000,
      onProcess: function onProcess(process) {
        that.drawVisitUvLine(list, count);  //画访问人数折线
        that.draw();
        count++;
      },
      onAnimationFinish: function onAnimationFinish() {
        count = 0;
      }
    });
  },

  /* 画访问人数的折线 */
  drawVisitUvLine: function (list, count) {
    list.forEach(function (data, i, array) {
      if (data.visit_uv > maxUV) {
        maxUV = data.visit_uv;
      }
    });
//x,y轴放大倍数
    ratioX = (canvasWidth_line - dimen.rpx2px(30)) / list.length;
    ratioY = (canvasHeight_line - dimen.rpx2px(80)) / maxUV;

    if (count < list.length - 1) {
      // 当前点坐标
      var currentPoint = {
        x: count * ratioX + dimen.rpx2px(40),
        y: (canvasHeight_line - list[count].visit_uv * ratioY) - dimen.rpx2px(40)
      };
      // 下一个点坐标
      var nextPoint = {
        x: (count + dimen.rpx2px(2)) * ratioX + dimen.rpx2px(40),
        y: (canvasHeight_line - list[count + 1].visit_uv * ratioY) - dimen.rpx2px(40)
      }

      // 开始路径
      context_line.beginPath();

      // 画线：移动到当前点
      context_line.moveTo(currentPoint.x, currentPoint.y);
      // 画线：画线到下个点
      context_line.lineTo(nextPoint.x, nextPoint.y);
      // 设置线宽度
      context_line.setLineWidth(dimen.rpx2px(2));
      // 设置线颜色
      context_line.setStrokeStyle('white');
      // 描线
      context_line.stroke();

      // 填充内容：竖直往下，至x轴
      context_line.lineTo(nextPoint.x, canvasHeight_line - dimen.rpx2px(40));
      // 填充内容：水平往左，至上一个点的在x轴的垂点
      context_line.lineTo(currentPoint.x, canvasHeight_line - dimen.rpx2px(40));
      // 设置填充颜色
      context_line.setFillStyle('#D6DBF4');

      // 实现闭合与x轴之前的区域
      context_line.fill();
    }
  },


  /* 画横向参照线 */
  drawVisitBackground: function () {      
    var lineCount = 9;    //5条
    var estimateRatio = 2;
    var ratio = (canvasHeight_line + dimen.rpx2px(30)) / lineCount;
    var maxPeople = 5;
    // var maxPeople = ((Math.floor(Math.floor(148 / 10) / 4) + 1) * 4) * 10;
    for (var i = 0; i < lineCount; i++) {
      context_line.beginPath();   //创建一个新路径
      //设置当前坐标点
      var currentPoint = {
        x: dimen.rpx2px(40),
        y: (canvasHeight_line - i * ratio) - dimen.rpx2px(40)
      };
      // 移动到当前坐标点
      context_line.moveTo(currentPoint.x, currentPoint.y);
      // 向Y正轴方向画线
      context_line.lineTo(canvasWidth_line - dimen.rpx2px(10), (canvasHeight_line - i * ratio) - dimen.rpx2px(40));
      // 设置属性
      context_line.setLineWidth(dimen.rpx2px(2));
      // 设置颜色
      context_line.setStrokeStyle(lightGray);
      context_line.stroke();
      // 标注数值
      context_line.setFillStyle(gray);
      // 底部人数文字
      context_line.fillText(i * maxPeople / (lineCount - 1), currentPoint.x - dimen.rpx2px(40), currentPoint.y);
    }
  },
  /* 画底部日期 */
  drawDate: function (list) {
    var ref_date = "";
    var temp_ref_date1 = "";
    var temp_ref_date2 = "";

    list.forEach(function (data, i, array) {
      if (i < array.length - 1) {
        context_line.setFillStyle(gray);    //灰色

        ref_date = data.ref_date.toString();
        temp_ref_date1 = ref_date.substring(4, 6) + ".";//截取第4个到第6个字符
        temp_ref_date2 = ref_date.substring(6, ref_date.length);
        ref_date = temp_ref_date1 + temp_ref_date2;

//每4个标记一次
        if (i % 4 == 0) {
          context_line.fillText(ref_date, i * ratioX + dimen.rpx2px(10), canvasHeight_line - dimen.rpx2px(10));
        }
      }
    });
  },

  // 画
  draw: function () {
    context_line.draw(true);
  },

//动画效果
  Animation: function (opts) {

    this.isStop = false;
    //动画持续时间
    opts.duration = typeof opts.duration === 'undefined' ? 1000 : opts.duration;
    //动画效果，均匀
    opts.timing = opts.timing || 'linear';

    var delay = 17;

    var createAnimationFrame = function createAnimationFrame() {
      if (typeof requestAnimationFrame !== 'undefined') {
        return requestAnimationFrame;
      } else if (typeof setTimeout !== 'undefined') {
        return function (step, delay) {
          setTimeout(function () {
            var timeStamp = +new Date();
            step(timeStamp);
          }, delay);
        };
      } else {
        return function (step) {
          step(null);
        };
      }
    };
    var animationFrame = createAnimationFrame();
    var startTimeStamp = null;
    var _step = function step(timestamp) {
      if (timestamp === null || this.isStop === true) {
        opts.onProcess && opts.onProcess(1);
        opts.onAnimationFinish && opts.onAnimationFinish();
        return;
      }
      if (startTimeStamp === null) {
        startTimeStamp = timestamp;
      }
      if (timestamp - startTimeStamp < opts.duration) {
        //计算动画的进度
        var process = (timestamp - startTimeStamp) / opts.duration;
        var timingFunction = Timing[opts.timing];
        process = timingFunction(process);
        // 触发动画每一步的回调，传入进度process
        opts.onProcess && opts.onProcess(process);
        animationFrame(_step, delay);
      } else {
        // 动画结束
        opts.onProcess && opts.onProcess(1);
         // 触发动画结束回调
        opts.onAnimationFinish && opts.onAnimationFinish();
      }
    };
    _step = _step.bind(this);

    animationFrame(_step, delay);
  }
})
