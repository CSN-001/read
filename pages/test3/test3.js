// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    list: [{
        meaning: "v.苹果"
      },
      {
        meaning: "v.摘"
      },
      {
        meaning: "adj.红的"
      },
      {
        meaning: "n.苹果"
      },
    ]
  },
  onClose(){
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  check_ans: function (e) {
    console.log(e.currentTarget.dataset.value)
    var ans = e.currentTarget.dataset.value
    if (ans == 3) {
      this.setData({show: true})
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