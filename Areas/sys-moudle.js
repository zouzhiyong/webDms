define(['Components/component-tree.js', 'Components/component-table.js', 'Components/component-form.js'], function(tree, table, form) {
    Vue.component('sys-moudle', {
        data: function() {
            return {
                tableCondition: {},
                tree: {},
                table: {},
                form: {}
            }
        },
        props: {
            title: { type: String },
            control: { type: Array }
        },
        created: function() {
            this.iniData();
        },
        mounted: function() {},
        methods: {
            iniData: function() {
                var _self = this;
                this.control.map(function(item) {
                    if (item.ControlName == 'component-tree') {
                        _self.tree = item;
                    }

                    if (item.ControlName == 'component-table') {
                        _self.table = item;
                    }

                    if (item.ControlName == 'component-form') {
                        _self.form = item;
                    }
                })

                // ajaxData(_self.treeUrl, { async: false })
                //     .then(function(result) {
                //         if (result) {
                //             _self.treeData = result.data.tree;
                //             _self.treeId = result.data.id;
                //         }
                //     });

            },
            handleNodeClick: function(data) {
                var _self = this;
                this.tableCondition = data;
            },
            handleRowClick: function(row) {
                var _self = this;
                layer.open({
                    type: 1,
                    title: _self.title,
                    maxmin: true,
                    area: ['578px', '500px'],
                    content: '',
                    success: function(layero, index) {

                        var MyComponent = Vue.extend({
                            render: function(_c) {
                                var _this = this;
                                return _c('component-form', { attrs: { control: _self.form } })
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
                            _c('component-tree', { attrs: { control: _self.tree }, on: { 'node-click': _self.handleNodeClick } })
                        ])
                    ]),
                    _c('el-col', { staticStyle: { height: '100%', width: 'calc(100% - 200px)' } }, [
                        _c('div', { staticStyle: { height: '100%' } }, [
                            _c('component-table', { attrs: { columns: _self.tableColumns, control: _self.table, condition: _self.tableCondition }, on: { 'edit': _self.handleRowClick } })
                        ])
                    ])
                ]),
            ])
        }
    })
})