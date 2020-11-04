Page({
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
  data: {
    src: '',
    danmuList: [{
      text: '学到了学到了',
      color: '#ff0000',
      time: 1
    },{
      text: '有趣',
      color: '#ff00ff',
      time: 3
    }],
    commentsList: [{
      username: '兔子',
      commentDate: '3月15日',
      commentInfo: '这个老师讲的真好，通俗易懂，必须五星好评',
      head: 'cloud://yun-74jba.7975-yun-74jba-1259601148/shequ/head.jpg'
    },{
      username: '鹰酱',
      commentDate: '1月17日',
      commentInfo: '刚开始时听起来有点吃力，入门了就好了',
      head: '/img/user.jpg'
    },{
      username: '毛熊',
      commentDate: '5月2日',
      commentInfo: '老师讲的确实非常好，公道一点说，讲的很细很透侧',
      head: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1250855250,1048234089&fm=26&gp=0.jpg'
    },{
      username: '汉斯猫',
      commentDate: '3月14日',
      commentInfo: '起初还当心听课时会想睡觉，但听课时发现老师讲的非常生动，我听得很认真',
      head: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3264046559,3834061862&fm=26&gp=0.jpg'
    },{
      username: '大毛',
      commentDate: '6月18日',
      commentInfo: '这个老师的课是我见过的性价比最高的，谢谢老师',
      head: 'https://bkimg.cdn.bcebos.com/pic/bf096b63f6246b600a05bf34e1f81a4c510fa262?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg'
    },]
  },
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },
  bindButtonTap: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function (res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor(),
    })
  },
  handleSuccess() {
    $Message({
      content: '这是一条成功提醒',
      type: 'success'
    });
  },

})