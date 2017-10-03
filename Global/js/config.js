var controlTree = {
    attrs: {
        data: [],
        props: {
            children: 'children',
            label: 'label'
        },
        'expand-on-click-node': false,
        'default-expanded-keys': [0],
        'node-key': "id",
        'highlight-current': true,
        'default-checked-keys': [0]
    },
    staticStyle: { height: '100%', 'overflow-y': 'auto' },
    staticClass: '',
    on: { 'node-click': "" }
}

var controlTable = {
    attrs: {
        data: [],
        border: true,
        height: "100%"
    },
    staticStyle: { width: '100%', height: "100%" },
    staticClass: ''
}

var controlTableColumn = {
    attrs: {
        data: [],
        'header-align': 'center',
        type: '',
        prop: '',
        label: '',
        width: ''
    },
    staticStyle: { width: '100%', height: "100%" },
    staticClass: ''
}