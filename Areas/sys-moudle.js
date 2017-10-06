define(['Components/component-tree.js', 'Components/component-table.js', 'Components/component-form.js'], function(tree, table, form) {
    Vue.component('sys-moudle', {
        data: function() {
            return {
                treeData: [],
                treeUrl: '',
                tableUrl: '',
                treeId: '',
                tableCondition: {}
            }
        },
        props: {
            title: { type: String },
            control: { type: Array }
        },
        created: function() {
            this.iniData();
            this.handleNodeClick(this.treeData[0]);
        },
        mounted: function() {},
        methods: {
            iniData: function() {
                var _self = this;
                this.control.map(function(item) {
                    if (item.ControlName == 'el-tree') {
                        _self.treeUrl = item.URL;
                    }

                    if (item.ControlName == 'el-table') {
                        _self.tableUrl = item.URL;
                        _self.tableColumns = item.columns;
                    }
                })

                ajaxData(_self.treeUrl, { async: false })
                    .then(function(result) {
                        if (result) {
                            _self.treeData = result.data.tree;
                            _self.treeId = result.data.id;
                        }
                    });

            },
            handleNodeClick: function(data) {
                var _self = this;
                this.tableCondition = { MenuNo: data.MenuNo };
            },
            handleRowClick: function(row) {
                var _self = this;
                layer.open({
                    type: 1,
                    title: '欢迎页',
                    maxmin: true,
                    area: ['800px', '500px'],
                    content: '',
                    success: function(layero, index) {
                        var MyComponent = Vue.extend({
                            render: function(_c) {
                                var _this = this;
                                return _c('sys-form', { attrs: { data: '欢迎光临' } })
                            }
                        })
                        var component = new MyComponent().$mount();
                        layero[0].querySelector('.layui-layer-content').appendChild(component.$el);
                    },
                    end: function() {

                    }
                });
            }
        },
        render: function(_c) {
            var _self = this;
            return _c('el-row', { staticStyle: { height: '100%' } }, [
                _c('el-row', [
                    _c('el-col', [
                        _c('div', [
                            _c('span', _self.title)
                        ])
                    ])
                ]),
                _c('el-row', { attrs: { gutter: 10 }, staticStyle: { height: 'calc(100% - 40px)' } }, [
                    _c('el-col', { staticStyle: { height: '100%', width: '200px' } }, [
                        _c('div', { staticStyle: { height: '100%' } }, [
                            _c('component-tree', { attrs: { id: _self.treeId, data: _self.treeData }, on: { 'node-click': _self.handleNodeClick } })
                        ])
                    ]),
                    _c('el-col', { staticStyle: { height: '100%', width: 'calc(100% - 200px)' } }, [
                        _c('div', { staticStyle: { height: '100%' } }, [
                            _c('component-table', { attrs: { columns: _self.tableColumns, url: _self.tableUrl, condition: _self.tableCondition }, on: { 'edit': _self.handleRowClick } })
                        ])
                    ])
                ]),
            ])
        }
    })
})