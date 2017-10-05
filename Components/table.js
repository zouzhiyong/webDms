Vue.component('component-table', {
    data: function() {
        return {
            height: 0,
            tableData: {}
        }
    },
    props: {
        columns: { type: Array },
        url: { type: String },
        condition: { type: Object }
    },
    created: function() {

    },
    mounted: function() {
        var _self = this;
        this.$nextTick(function() {
            var hpx = _self.$refs.table.fixedBodyHeight.height;
            _self.height = Number(hpx.replace('px', ''));
            _self.condition.currentPage = 1;
            _self.condition.pageSize = Math.floor(this.height / 40);
            _self.getTableData(this.condition);
        })

    },
    methods: {
        getTableData: function(condition) {
            var _self = this;
            var objData = {};
            ajaxData(_self.url, {
                    async: false,
                    data: condition
                })
                .then(function(result) {
                    if (result) {
                        _self.tableData = result;
                    }
                });
        },
        handleRowClick: function(row) {
            this.$emit('edit', row);
        },
        handleSizeChange: function(size) {

        },
        handleCurrentChange: function(currentPage) {
            this.condition.currentPage = currentPage;
            this.getTableData(this.condition);
        }
    },
    watch: {
        condition: {
            handler: function(newVal, oldVal) {
                if (newVal.currentPage && newVal.pageSize) {
                    this.getTableData(newVal);
                } else {
                    this.condition.currentPage = 1;
                    this.condition.pageSize = Math.floor(this.height / 40);
                    this.getTableData(this.condition);
                }
            },
            deep: true
        }
    },
    render: function(_c) {
        var _self = this;

        return _c('div', { staticStyle: { height: "100%" } }, [
            _c('el-table', {
                ref: "table",
                attrs: { data: _self.tableData.rows, border: true, height: "100%" },
                staticStyle: { width: '100%', height: "calc(100% - 35px)" },
                staticClass: ''
            }, [
                _self._l(_self.columns, function(item) {
                    return _c('el-table-column', {
                        attrs: {
                            'header-align': 'center',
                            align: item.align,
                            type: item.type,
                            prop: item.prop,
                            label: item.label,
                            width: item.width
                        },
                        staticStyle: { width: '100%', height: "100%" },
                        staticClass: '',
                        //作用域插槽的模板，重点**************
                        scopedSlots: (item.isTemplate == 1 || item.type == "index") ? {
                            default: function(scope) {
                                if (item.type == "index") {
                                    return _self._v((scope.$index + 1 + (_self.tableData.pageSize * (_self.tableData.currentPage - 1))))
                                } else {
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
                            }
                        } : _self._e()
                    })
                })
            ]),
            _c('el-pagination', {
                attrs: {
                    'page-size': _self.tableData.pageSize,
                    layout: " prev, pager, next,total",
                    total: _self.tableData.total,
                    "current-page": _self.tableData.currentPage
                },
                staticStyle: { padding: '7px 0px' },
                on: { 'pageNumber': _self.handleSizeChange, 'current-change': _self.handleCurrentChange }
            })
        ])

    }
})