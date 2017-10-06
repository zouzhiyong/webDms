Vue.component('component-form', {
    data: function() {
        return {
            Attributes: {},
            // form: [
            //     { type: 'el-input', model: 'name', label: '活动名称', width: '' },
            //     { type: 'el-input', model: 'name1', label: '活动名称1', width: '' },
            //     { type: 'el-input', model: 'name2', label: '活动名称2', width: '' },
            //     { type: 'el-input', model: 'name3', label: '活动名称3', width: '' }
            // ],
            data: {
                name1: '1',
                name2: '2',
                name3: '3',
                name4: '4'
            }
        }
    },
    props: {
        control: { type: Object }
    },
    created: function() {
        //获取attrs        
        this.Attributes = eval('(' + this.control.Attributes + ')');
        this.Attributes.attrs.data = this.data;
    },
    methods: {

    },
    render: function(_c) {
        var _self = this;
        return _c('div', { staticStyle: { padding: '20px' } }, [
            _c('el-form', {
                attrs: JSON.parse(JSON.stringify(_self.Attributes.attrs || {})),
                ref: JSON.parse(JSON.stringify(_self.Attributes.ref || 'form'))
            }, [
                _self._l(eval('(' + _self.control.ItemAttributes + ')'), function(item) {
                    return _c('el-form-item', {
                        attrs: item.attrs || {}
                    }, [
                        _self._l(item.subControl, function(_item) {
                            return _c(_item.type, { model: { value: (_self.data[item.attrs.prop]), callback: function($$v) { _self.data[item.attrs.prop] = $$v }, expression: item.attrs.prop } })
                        })
                    ])
                })
            ])
        ])
    }
})