Vue.component('component-table', {
    data: function() {
        return {
            height: 0,
        }
    },
    computed: {
        pagination: function() {
            var obj = {};
            obj.total = this.tableData.length;
            obj.pageSize = Math.ceil(this.height / 40);
            return obj;
        },
        tableData: function() {
            var _self = this;
            var objData = {};
            ajaxData(_self.url, {
                    async: false,
                    data: _self.condition
                })
                .then(function(result) {
                    if (result) {
                        objData = result.data;
                    }
                });

            return objData;
        }
    },
    props: {
        columns: { type: Array },
        url: { type: String },
        condition: { type: Object }
    },
    created: function() {
        this.total = this.tableData.length;
    },
    mounted: function() {
        var _self = this;
        this.$nextTick(function() {
            var hpx = _self.$refs.table.fixedBodyHeight.height;
            _self.height = Number(hpx.replace('px', ''));
        })
    },
    methods: {
        handleRowClick: function(row) {
            this.$emit('edit', row);
        },
        handleSizeChange: function(size) {
            console.log(size)
        },
        handleCurrentChange: function(currentPage) {
            //重新赋值条件，以驱动计算中数据重新查询
            var obj = JSON.parse(JSON.stringify(this.condition));
            obj.currentPage = currentPage;
            this.condition = obj;
        }
    },
    render: function(_c) {
        var _self = this;

        return _c('div', { staticStyle: { height: "100%" } }, [
            _c('el-table', {
                ref: "table",
                attrs: { data: _self.tableData, border: true, height: "100%" },
                staticStyle: { width: '100%', height: "calc(100% - 35px)" },
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
            ]),
            _c('el-pagination', {
                attrs: {
                    'page-size': _self.pagination.pageSize,
                    layout: " prev, pager, next,total",
                    total: _self.pagination.total,
                    "current-page": 1
                },
                staticStyle: { padding: '7px 0px' },
                on: { 'pageNumber': _self.handleSizeChange, 'current-change': _self.handleCurrentChange }
            })
        ])

    }
})