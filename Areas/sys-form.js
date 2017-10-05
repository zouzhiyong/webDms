Vue.component('sys-form', {
    data: function() {
        var v = {};
        this.form.item.map(function(item) {
            if (item.control.model) {
                v[item.control.model] = item.control.value || ''
            }
        })

        return {
            value: v
        }
    },
    props: {
        form: {
            type: Object
        }
    },
    methods: {
        handleClick: function() {
            console.log(this.value)
        }
    },
    render: function(_c) {
        var _self = this;
        return _c('el-form', {
            attrs: _self.form.attrs ? JSON.parse(JSON.stringify(_self.form.attrs)) : {},
            staticClass: _self.form.class,
            ref: _self.ref
        }, [
            _self._l(_self.form.item, function(item) {
                //获取事件                    
                var control = {};
                var _$on = {};
                for (var key in item.control.on) {
                    _$on[key] = _self[item.control.on[key]]

                }

                //只获取默认值
                if (item.control.name == '') return;

                //文本控件
                if (item.control.name == 'el-input') {
                    control = _c(item.control.name, {
                        attrs: JSON.parse(JSON.stringify(item.control.attrs)),
                        model: {
                            value: (_self.value[item.control.model]),
                            callback: function($$v) {
                                _self.value[item.control.model] = $$v
                            }
                        },
                        staticClass: item.control.class,
                        staticStyle: item.control.style,
                        ref: item.control.ref,
                        on: _$on
                    })
                }
                //下拉选择控件
                if (item.control.name == 'el-select') {
                    control = _c(item.control.name, {
                        attrs: JSON.parse(JSON.stringify(item.control.attrs)),
                        model: {
                            value: (_self.value[item.control.model]),
                            callback: function($$v) {
                                _self.value[item.control.model] = $$v
                            }
                        },
                        staticClass: item.control.class,
                        staticStyle: item.control.style,
                        ref: item.control.ref,
                        on: _$on
                    }, [
                        _self._l(item.control.option, function(_item) {
                            return _c('el-option', {
                                attrs: {
                                    label: _item.label,
                                    value: _item.value
                                }
                            })
                        })
                    ])
                }

                //按钮控件
                if (item.control.name == 'el-button') {
                    control = _c(item.control.name, {
                        attrs: JSON.parse(JSON.stringify(item.control.attrs)),
                        staticClass: item.control.class,
                        staticStyle: item.control.style,
                        ref: item.control.ref,
                        on: _$on
                    }, [
                        _self._v(item.control.label)
                    ])
                }

                return _c('el-form-item', {
                    attrs: item.attrs ? JSON.parse(JSON.stringify(item.attrs)) : {},
                    staticClass: item.class,
                    ref: item.ref
                }, [control])
            })
        ])
    }
})