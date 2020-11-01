Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    steps: [{
      text: '步骤一',
      desc: '记单词，记单词！！！扩充词汇量'
    },{
      text: '步骤二',
      desc: '经常阅读英语文章，提升阅读水平'
    },{
      text: '步骤三',
      desc: '可以听佩奇怎么说英语的，听力很重要哦'
    },{
      text: '步骤四',
      desc: '多和佩奇沟通，说一口流利的英语'
    }]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    add() {
      this.setData({
        active: this.data.active+1
      })
    }
  }
})
