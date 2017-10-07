Vue.component('component-form', {
    data: function() {
        return {
            Attributes: {},
            ItemAttributes: [],
            data: {}
        }
    },
    props: {
        condition: { type: Object },
        control: { type: Object }
    },
    created: function() {
        //获取attrs        
        this.Attributes = eval('(' + this.control.Attributes + ')');
        this.ItemAttributes = eval('(' + this.control.ItemAttributes + ')');
        this.Attributes.attrs.model = this.data;
        this.GetData();
    },
    methods: {
        GetData: function() {
            var _self = this;
            ajaxData(_self.control.FormUrl, {
                    async: false,
                    data: _self.condition
                })
                .then(function(result) {
                    if (result) {
                        _self.data = result.data[0];
                    }
                });
        },
    },
    watch: {
        condition: function(newVal, oldVal) {
            this.GetData();
        }
    },
    render: function(_c) {
        var _self = this;
        return _c('div', { staticStyle: { padding: '20px' } }, [
            _c('el-form', {
                attrs: JSON.parse(JSON.stringify(_self.Attributes.attrs)),
                ref: JSON.parse(JSON.stringify(_self.Attributes.ref || 'form'))
            }, [
                _self._l(JSON.parse(JSON.stringify(_self.ItemAttributes)), function(item) {
                    var filed = item.attrs.prop;
                    return _c('el-form-item', { attrs: item.attrs || {} }, [
                        _self._l(item.subControl, function(_item) {
                            if (_item.type == 'el-select') {
                                return _c(_item.type, { attrs: (_item.attrs || {}), model: { value: (_self.data[filed]), callback: function($$v) { _self.data[filed] = $$v }, expression: filed } },
                                    _self._l(_self.data[filed + 'List'], function(_item_) {
                                        return _c('el-option', { attrs: { key: _item_.value, "label": _item_.label, "value": _item_.value } })
                                    }))
                            } else {
                                return _c(_item.type, { model: { value: (_self.data[filed]), callback: function($$v) { _self.data[filed] = $$v }, expression: filed } })
                            }
                        })
                    ])
                })
            ])
        ])
    }
})