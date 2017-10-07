Vue.component('component-table', {
    data: function() {
        return {
            height: 0,
            tableData: {},
            Attributes: {}
        }
    },
    props: {
        columns: { type: Array },
        condition: { type: Object },
        control: { type: Object }
    },
    created: function() {
        //获取attrs
        this.Attributes = eval('(' + this.control.Attributes + ')');
    },
    mounted: function() {
        var height = $(this.$el).height() - 60;
        this.height = height;
        this.condition.currentPage = 1;
        this.condition.pageSize = Math.floor(this.height / 40);

    },
    methods: {
        GetData: function(condition) {
            var _self = this;
            ajaxData(_self.control.FindUrl, {
                    async: false,
                    data: condition
                })
                .then(function(result) {
                    if (result) {
                        _self.tableData = result;
                        _self.Attributes.attrs.data = result.rows;
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
            this.GetData(this.condition);
        }
    },
    watch: {
        condition: {
            handler: function(newVal, oldVal) {
                if (newVal.currentPage && newVal.pageSize) {
                    this.GetData(newVal);
                } else {
                    this.condition.currentPage = 1;
                    this.condition.pageSize = Math.floor(this.height / 40);
                    this.GetData(this.condition);
                }
            },
            deep: true
        }
    },
    render: function(_c) {
        var _self = this;

        return _c('div', { staticStyle: { height: "100%" } }, [
            _c('el-table', {
                ref: JSON.parse(JSON.stringify(_self.Attributes.ref || 'table')),
                attrs: JSON.parse(JSON.stringify(_self.Attributes.attrs || {})),
                staticStyle: JSON.parse(JSON.stringify(_self.Attributes.staticStyle || {})),
                staticClass: JSON.parse(JSON.stringify(_self.Attributes.staticClass || '')),
            }, [
                _self._l(eval('(' + _self.control.ItemAttributes + ')'), function(item) {
                    return _c('el-table-column', {
                        attrs: JSON.parse(JSON.stringify(item.attrs || {})),
                        staticStyle: JSON.parse(JSON.stringify(item.staticStyle || {})),
                        staticClass: JSON.parse(JSON.stringify(item.staticClass || '')),
                        //作用域插槽的模板，重点**************
                        scopedSlots: (item.attrs.type == 'isTemplate' || item.attrs.type == "index") ? {
                            default: function(scope) {
                                if (item.attrs.type == "index") {
                                    return _self._v((scope.$index + 1 + (_self.tableData.pageSize * (_self.tableData.currentPage - 1))))
                                } else {
                                    return _c('div', [
                                        _self._l(item.subControl, function(_item) {
                                            return _c(_item.type, {
                                                attrs: JSON.parse(JSON.stringify(_item.attrs || {})),
                                                nativeOn: {
                                                    click: function($event) {
                                                        $event.preventDefault();
                                                        var event = '_self.' + _item.event;
                                                        eval('(' + event + ')');
                                                    }
                                                },
                                                staticStyle: JSON.parse(JSON.stringify(_item.staticStyle || {})),
                                            }, [
                                                _c('i', { staticClass: _item.icon })
                                            ])
                                        })
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