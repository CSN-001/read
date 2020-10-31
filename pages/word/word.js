// pages/word/word.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      meaning: "v.暂停播放；暂停，中止；n.中止，暂停"
    },{
      meaning: "v.把……切成片；大幅度削减；切开；n.…"
    },{
      meaning: "adj.酸的"
    },{
      meaning: "v.宣传；宣传方法"
    }]
  },
  check_ans: function (e) {
    console.log(e.currentTarget.dataset.value)
    var ans = e.currentTarget.dataset.value
    if (ans == 1) {
      wx.showToast({
        title: '答案正确',
        icon: 'success',
        duration: 1500
      })
    } else {
      wx.showToast({
        title: '答案错误',
        icon: "none",
        duration: 1500
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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