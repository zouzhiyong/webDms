Vue.component('custpage', {
    render: function(_c) {
        return _c('el-input', { attrs: { placeholder: '请输入内容' } })
    }
})

Vue.component('custpages', {
    render: function(_c) {
        return _c('el-button', { attrs: { type: 'primary' } }, [this._v('测试按钮')])
    }
})