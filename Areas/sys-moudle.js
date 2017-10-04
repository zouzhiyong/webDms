Vue.component('sys-moudle', {
    data: function() {
        return {
            treeData: {},
            tableData: {},
            tableColumns: [],
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
        var treeObj = JSON.parse(JSON.stringify(controlTree));
        treeObj.attrs.data = _self.treeData;
        treeObj.attrs['node-key'] = _self.treeId;
        treeObj.on['node-click'] = _self.handleNodeClick;

        var tableObj = JSON.parse(JSON.stringify(controlTable));
        tableObj.attrs.data = _self.tableData;

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
                        _c('el-tree', treeObj)
                    ])
                ]),
                _c('el-col', { staticStyle: { height: '100%', width: 'calc(100% - 200px)' } }, [
                    _c('div', { staticStyle: { background: '#f2f2f2', height: '100%' } }, [
                        _c('el-table', tableObj, [
                            _self._l(_self.tableColumns, function(item) {
                                var objTemp = JSON.parse(JSON.stringify(controlTableColumn));
                                objTemp.attrs = $.extend({}, objTemp.attrs, item);
                                if (item.prop == null || item.prop == "") {
                                    delete objTemp.attrs.prop
                                }

                                return _c('el-table-column', {
                                    //作用域插槽的模板，重点**************
                                    attrs: objTemp.attrs,
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
                    ])
                ])
            ]),
        ])
    }
})