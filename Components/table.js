Vue.component('component-table', {
    props: {
        columns: { type: Array },
        data: { type: Array }
    },
    created: function() {

    },
    methods: {
        handleRowClick: function(row) {
            this.$emit('edit', row);
        }
    },
    render: function(_c) {
        var _self = this;

        return _c('el-table', {
            attrs: { data: _self.data, border: true, height: "100%" },
            staticStyle: { width: '100%', height: "100%" },
            staticClass: ''
        }, [
            _self._l(_self.columns, function(item) {
                return _c('el-table-column', {
                    attrs: {
                        'header-align': 'center',
                        type: item.type,
                        prop: item.prop,
                        label: item.label,
                        width: item.width
                    },
                    staticStyle: { width: '100%', height: "100%" },
                    staticClass: '',
                    //作用域插槽的模板，重点**************
                    scopedSlots: item.isTemplate == 1 ? {
                        default: function(scope) {
                            return _c('el-button', {
                                attrs: { type: "text" },
                                nativeOn: {
                                    'click': function($event) {
                                        $event.preventDefault();
                                        _self.handleRowClick(scope.row);
                                    }
                                },
                                staticStyle: { width: '30px' }
                            }, [
                                _c('i', { staticClass: item.templateIcon })
                            ])
                        }
                    } : _self._e()
                })
            })
        ])

    }
})