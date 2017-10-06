Vue.component('component-form', {
    data: function() {
        return {
            form: [
                { type: 'el-input', model: 'name', label: '活动名称', width: '' },
                { type: 'el-input', model: 'name1', label: '活动名称1', width: '' },
                { type: 'el-input', model: 'name2', label: '活动名称2', width: '' },
                { type: 'el-input', model: 'name3', label: '活动名称3', width: '' }
            ],
            data: {
                name: '1',
                name1: '2',
                name: '3',
                name: '4'
            }
        }
    },
    props: {
        value: { type: Object }
    },
    methods: {

    },
    render: function(_c) {
        var _self = this;
        return _c('div', { staticStyle: { padding: '20px' } }, [
            _c('el-form', { attrs: { model: _self.value, 'label-width': '80px', inline: true }, ref: 'form' }, [
                _self._l(_self.form, function(item) {
                    return _c('el-form-item', { attrs: { label: item.label, prop: item.model } }, [
                        _c(item.type, { model: { value: (_self.value[item.model]), callback: function($$v) { _self.value[item.model] = $$v }, expression: item.model } })
                    ])
                })
            ])
        ])
    }
})