define(['Components/component-tree.js', 'Components/component-table.js', 'Components/component-form.js'], function(tree, table, form) {
    Vue.component('sys-moudle', {
        data: function() {
            return {
                tableCondition: {},
                tree: {},
                table: {},
                form: {},
                dialogFormVisible: false,
                formCondition: {}
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
            },
            handleNodeClick: function(data) {
                var _self = this;
                this.tableCondition = data;
            },
            handleRowClick: function(row) {
                this.formCondition = row;
                this.dialogFormVisible = true;
            },
            handleCloseForm: function() {

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
                _c('el-dialog', { attrs: { "title": _self.title, "visible": _self.dialogFormVisible, 'close-on-click-modal': false, 'close-on-press-escape': false }, on: { close: _self.handleCloseForm, "update:visible": function($event) { _self.dialogFormVisible = $event } } }, [
                    _c('component-form', { attrs: { control: _self.form, condition: _self.formCondition } }),
                    _c('div', { staticClass: "dialog-footer", attrs: { "slot": "footer" }, slot: "footer" }, [
                        _c('el-button', { on: { "click": function($event) { _self.dialogFormVisible = false } } }, [_self._v("取 消")]),
                        _c('el-button', { attrs: { "type": "primary" }, on: { "click": function($event) { _self.dialogFormVisible = false } } }, [_self._v("确 定")])
                    ])
                ])
            ])
        }
    })
})