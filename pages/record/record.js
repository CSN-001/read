// pages/record/record.js
Page({
  //页面的初始数据
  data: {
    recorderManager: null,
    asrRes: null,
    icon: "music-o",
    i: true,
    inputing: "",
    imshow: true,
    audio: null,
    value: "",
    items: [{
      name: '翻译',
      checked: true
    },{
      name: '对话'
    },{
      name: '诗词'
    },{
      name: '音乐'
    }]
  },
  //变换语音文字图标
  vary() {
    if (this.data.i) {
      this.setData({i: false, icon: "comment-circle-o"})
    } else {
      this.setData({i:true, icon: "music-o"})
    }
  },
  //播放后台传输来的音频
  adplay(url) {
    this.data.audio.src = url
    this.data.audio.play()
    this.data.audio.onPlay(() => {
      this.setData({imshow: false})
    })
    this.data.audio.onEnded(() => {
      this.setData({imshow: true})
    })
  },
  poem() {
    const db = wx.cloud.database()
    db.collection("poem").where({
      name: this.data.inputing
    }).get().then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  },
  //文本发送到后端
  send() {
    this.poem()
  },
  //长按录音事件
  longpress() {
    var recorderManager = wx.getRecorderManager()
    this.setData({
      recorderManager: recorderManager
    })
    console.log("长按开始,开始录音");
    //百度API支持:原始 PCM 的录音参数必须符合 8k/16k 采样率、16bit 位深、单声道，支持的格式有：pcm（不压缩）、wav（不压缩，pcm编码）、amr（压缩格式）。 60S 长度  
    recorderManager.start({
      numberOfChannels: 1, //录音通道数
      format: 'pcm',
      sampleRate: 16000,
      encodeBitRate: 64000
    })
  },
  //离开按钮
  leave() {
    console.log("结束录音");
    var that = this;
    this.data.recorderManager.stop()
    this.data.recorderManager.onStop(function (e) {
      console.log("输出录音信息:" + e)
      //将临时文件路径发送给后台进行处理
      wx.uploadFile({
        url: 'http://172.18.81.177:5000/recorder1',
        filePath: e.tempFilePath,
        name: 'file', //通过name后端获取文件的二进制内容
        success: res => {
          console.log(res)
          that.setData({
            asrRes: res.data
          })
        },
        fail: err => {
          console.log(err)
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Audio = wx.createInnerAudioContext();
    this.setData({audio: Audio})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})