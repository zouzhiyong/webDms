Vue.component('component-tree', {
    data: function() {
        return {
            Attributes: {}
        }
    },
    props: {
        control: { type: Object }
    },
    created: function() {
        var _self = this;
        //获取attrs
        this.Attributes = eval('(' + this.control.Attributes + ')');
        this.GetData();
    },
    methods: {
        GetData: function() {
            var _self = this;
            ajaxData(_self.control.FindUrl, { async: false })
                .then(function(result) {
                    if (result) {
                        _self.Attributes.attrs.data = result.data.tree;
                        _self.handleNodeClick(_self.Attributes.attrs.data[0]);
                    }
                });
        },
        handleNodeClick: function(data) {
            this.$emit('node-click', data);
        }
    },
    render: function(_c) {
        var _self = this;
        return _c('el-tree', {
            attrs: JSON.parse(JSON.stringify(this.Attributes.attrs || {})),
            ref: JSON.parse(JSON.stringify(this.Attributes.ref || 'tree')),
            staticStyle: JSON.parse(JSON.stringify(this.Attributes.staticStyle || {})),
            staticClass: JSON.parse(JSON.stringify(this.Attributes.staticClass || '')),
            on: this.Attributes.on
        });
    }
})