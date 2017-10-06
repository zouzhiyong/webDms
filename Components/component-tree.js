Vue.component('component-tree', {
    props: {
        control: { type: Object }
    },
    created: function() {
        var _self = this;
        //获取attrs
        this.control.Attributes = eval('(' + this.control.Attributes + ')');
        //this.control.Attrs = eval('(' + this.control.Attrs + ')');
        //this.control.Style = eval('(' + this.control.Style + ')');
        ajaxData(_self.control.FindUrl, { async: false })
            .then(function(result) {
                if (result) {
                    _self.control.Attributes.attrs.data = result.data.tree;
                    _self.handleNodeClick(_self.control.Attributes.attrs.data[0]);
                }
            });
    },
    methods: {
        handleNodeClick: function(data) {
            this.$emit('node-click', data);
        }
    },
    render: function(_c) {
        var _self = this;
        return _c('el-tree', {
            attrs: JSON.parse(JSON.stringify(this.control.Attributes.attrs || {})),
            ref: JSON.parse(JSON.stringify(this.control.Attributes.ref || '')),
            staticStyle: JSON.parse(JSON.stringify(this.control.Attributes.staticStyle || {})),
            staticClass: JSON.parse(JSON.stringify(this.control.Attributes.staticClass || '')),
            on: this.control.Attributes.on
        });
        // return _c('el-tree', {
        //     ref: this.control.Ref,
        //     attrs: JSON.parse(JSON.stringify(this.control.Attributes.Attrs)),
        //     staticStyle: JSON.parse(JSON.stringify(this.control.Attributes.Style)),
        //     staticClass: this.control.Attributes.Class,
        //     on: { 'node-click': _self.handleNodeClick }
        // })
    }
})