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
      desc: '努力学习努力学习努力学习努力学习努力学习努力学习'
    },{
      text: '步骤二',
      desc: '努力学习努力学习努力学习努力学习努力学习努力学习'
    },{
      text: '步骤三',
      desc: '努力学习努力学习努力学习努力学习努力学习努力学习'
    },{
      text: '步骤四',
      desc: '努力学习努力学习努力学习努力学习努力学习努力学习'
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
