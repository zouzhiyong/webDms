Vue.component('component-dialog', {
    data: function() {
        return {
            size: 'small'
        }
    },
    props: {
        title: { type: String },
        dialogFormVisible: { type: Boolean }
    },
    methods: {

    },
    render: function(_c) {
        var _self = this;
        return _c('el-dialog', { attrs: { "title": _self.title, size: _self.size, "visible": _self.dialogFormVisible, 'close-on-click-modal': false, 'close-on-press-escape': false, 'show-close': false }, on: { close: _self.handleCloseForm, "update:visible": function($event) { _self.dialogFormVisible = $event } } }, [
            _c('el-row', { slot: "title", staticStyle: { margin: '10px' } }, [
                _c('el-col', { attrs: { span: '12' }, staticStyle: { 'text-align': 'left' } }, [_self._v(_self.title)]),
                _c('el-col', { attrs: { span: '12' }, staticStyle: { 'text-align': 'right' } }, [
                    _c('button', { attrs: { type: 'button' }, staticClass: 'el-dialog__headerbtn', staticStyle: { margin: 'auto 10px' }, on: { "click": function($event) { _self.dialogFormVisible = false } } }, [
                        _c('i', { staticClass: 'el-dialog__close el-icon-close' })
                    ]),
                    _c('button', { attrs: { type: 'button' }, staticClass: 'el-dialog__headerbtn', staticStyle: { margin: 'auto 10px' }, on: { "click": function($event) { if (_self.size != 'full') { _self.size = 'full' } else { _self.size = 'small' } } } }, [
                        _c('i', { staticClass: 'el-dialog__close fa fa-window-restore' })
                    ])
                ])
            ]),
            _self._t("form"),
            _c('div', { staticClass: "dialog-footer", attrs: { "slot": "footer" }, slot: "footer" }, [
                _c('el-button', { on: { "click": function($event) { _self.dialogFormVisible = false } } }, [_self._v("取 消")]),
                _c('el-button', { attrs: { "type": "primary" }, on: { "click": function($event) { _self.dialogFormVisible = false } } }, [_self._v("确 定")])
            ])
        ])
    }
})