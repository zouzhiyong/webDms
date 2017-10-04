Vue.component('component-tree', {
    props: {
        id: { type: String },
        data: { type: Array }
    },
    created: function() {

    },
    methods: {
        handleNodeClick: function(data) {
            this.$emit('node-click', data);
        }
    },
    render: function(_c) {
        var _self = this;

        return _c('el-tree', {
            attrs: {
                data: _self.data,
                props: {
                    children: 'children',
                    label: 'label'
                },
                'expand-on-click-node': false,
                'default-expanded-keys': [0],
                'node-key': _self.id,
                'highlight-current': true,
                'default-checked-keys': [0]
            },
            staticStyle: { height: '100%', 'overflow-y': 'auto' },
            staticClass: '',
            on: { 'node-click': _self.handleNodeClick }
        })
    }
})