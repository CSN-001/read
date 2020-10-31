// pages/record/record.js
Page({
  //页面的初始数据
  data: {
    show: false,
    imsrc: 'cloud://yun-74jba.7975-yun-74jba-1259601148/pig2.jpg',
    recorderManager: null,
    asrRes: null,
    icon: "music-o",
    i: true,
    inputing: "",
    audio: null,
    value: "",
    items: [{
      name: '翻译',
      checked: true
    },{
      name: '对话'
    },{
      name: '诗词'
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
  //智能推荐评价
  showPopup() {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
    this.setData({show: true});
  },
  onclose() {
    this.setData({show: false})
  },
  //播放后台传输来的音频
  adplay(url) {
    this.data.audio.src = url
    this.data.audio.play()
    this.data.audio.onPlay(() => {
      this.setData({
        imsrc: 'cloud://yun-74jba.7975-yun-74jba-1259601148/pig.gif'
      })
    })
    this.data.audio.onEnded(() => {
      this.setData({
        imsrc: 'cloud://yun-74jba.7975-yun-74jba-1259601148/pig2.jpg'
      })
      this.data.audio.src = null
    })
  },
  //翻译对话诗词部分
  poem(set) {
    const db = wx.cloud.database()
    db.collection(set).where({
      name: this.data.inputing
    }).get().then(res => {
      this.setData({value: res.data[0].value})
      this.adplay(res.data[0].music)
    }).catch(err => {
      console.log(err)
    })
  },
  //监听单选框变化
  radioChange(e) {
    const it = this.data.items
    for (let i = 0; i < it.length; ++i) {
      it[i].checked = it[i].name === e.detail.value
    }
    this.setData({
      items: it
    })
  },
  //文本发送获取结果
  send() {
    if (this.data.items[0].checked) {
      this.poem("translate")
    } else if(this.data.items[1].checked) {
      this.poem("dialog")
    } else if (this.data.items[2].checked) {
      this.poem("poem")
    }
  },
  //长按录音事件
  longpress() {
    wx.showToast({
      title: '开始录音',
      icon: 'success',
      duration: 2000
    })
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