Vue.component('sys-moudle', {
    data: function() {
        return {
            data: {},
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    created: function() {
        var _self = this;
        ajaxData('api/Menu/GetAllSysMoudle')
            .then(function(result) {
                if (result.result == true) {
                    _self.data = result.data.tree;
                }
            });
    },
    render: function(_c) {
        var _self = this;
        return _c('el-row', { staticStyle: { height: '100%' } }, [
            _c('el-row', [
                _c('el-col', [
                    _c('div', [
                        _c('span', '模块设置')
                    ])
                ])
            ]),
            _c('el-row', { attrs: { gutter: 10 }, staticStyle: { height: 'calc(100% - 40px)' } }, [
                _c('el-col', { staticStyle: { height: '100%', width: '200px' } }, [
                    _c('div', { staticStyle: { background: '#f2f2f2', height: '100%' } }, [
                        _c('el-tree', { attrs: { data: _self.data, props: _self.defaultProps, accordion: true }, staticStyle: { height: '100%', 'overflow-y': 'auto', } })
                    ])
                ]),
                _c('el-col', { staticStyle: { height: '100%', width: 'calc(100% - 200px)' } }, [
                    _c('div', { staticStyle: { background: '#f2f2f2', height: '100%' } })
                ])
            ]),
        ])
    }
})