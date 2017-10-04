define(['Components/tree.js', 'Components/table.js'], function(tree, table) {
    Vue.component('sys-moudle', {
        data: function() {
            return {
                treeData: [],
                tableData: [],
                treeUrl: '',
                tableUrl: '',
                treeId: '',
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
                ajaxData(_self.tableUrl + data.MenuNo, { async: false })
                    .then(function(result) {
                        if (result) {
                            _self.tableData = result.data;
                        }
                    });
            },
            handleRowClick: function(row) {
                console.log(row)
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
                        _c('div', { staticStyle: { background: '#f2f2f2', height: '100%' } }, [
                            _c('component-table', { attrs: { columns: _self.tableColumns, data: _self.tableData }, on: { 'edit': _self.handleRowClick } })
                        ])
                    ])
                ]),
            ])
        }
    })
})