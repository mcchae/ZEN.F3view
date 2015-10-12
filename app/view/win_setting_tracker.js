
Ext.define('NFW2.view.win_setting_tracker', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_setting_tracker',

    requires: [
        'NFW2.view.win_setting_trackerViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.plugin.DragDrop',
        'Ext.util.Point',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing',
        'Ext.button.Button',
        'Ext.Img',
        'Ext.form.field.Radio',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'win_setting_tracker'
    },
    cls: 'zen_win',
    id: 'win_setting_tracker',
    scrollable: true,
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onFormAfterRender',
        beforerender: 'onWin_setting_trackerBeforeRender'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'fld_msg',
                    itemId: 'fld_msg1'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    id: 'tracker_add_btn1',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onTracker_add_btnClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    id: 'tracker_del_btn1',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onTracker_del_btn1Click'
                    }
                }
            ]
        }
    ],

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        bodyPadding: 10,
                        header: false,
                        title: 'My Form',
                        items: [
                            {
                                xtype: 'container',
                                id: 'win_setting_con',
                                scrollable: true,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        margin: '0 0 5 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'label',
                                                        cls: 'lb_req',
                                                        margin: '5 0 0 10',
                                                        width: 135,
                                                        bind: {
                                                            text: '{tracker_desc}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                            return true;
                                                        },
                                                        id: 'tracker_name1',
                                                        margin: '5 0 0 0',
                                                        width: 450,
                                                        labelSeparator: ' ',
                                                        enforceMaxLength: true,
                                                        maxLength: 255,
                                                        listeners: {
                                                            errorchange: 'onTextfieldErrorChange1',
                                                            blur: 'onTextfieldBlur1'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        id: 'tracker_basic_con1',
                                        margin: '0 0 0 10',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                margin: '0 0 0 10',
                                                width: 135,
                                                items: [
                                                    {
                                                        xtype: 'label',
                                                        bind: {
                                                            text: '{basic_setting}'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                items: [
                                                    {
                                                        xtype: 'fieldset',
                                                        items: [
                                                            {
                                                                xtype: 'container',
                                                                margin: '5 0 0 0',
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'stretch'
                                                                },
                                                                items: [
                                                                    {
                                                                        xtype: 'container',
                                                                        flex: 1,
                                                                        layout: {
                                                                            type: 'hbox',
                                                                            align: 'stretch'
                                                                        },
                                                                        items: [
                                                                            {
                                                                                xtype: 'combobox',
                                                                                id: 'tracker_time_combo1',
                                                                                width: 240,
                                                                                labelCls: 'lb_arrow',
                                                                                labelSeparator: ' ',
                                                                                editable: false,
                                                                                displayField: 'hour',
                                                                                queryMode: 'local',
                                                                                valueField: 'hour',
                                                                                bind: {
                                                                                    fieldLabel: '{hours}'
                                                                                },
                                                                                listeners: {
                                                                                    afterrender: 'onComboboxAfterRender'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'label',
                                                                                flex: 1,
                                                                                margin: '3 0 0 5',
                                                                                text: '~'
                                                                            },
                                                                            {
                                                                                xtype: 'combobox',
                                                                                id: 'tracker_timeend_combo1',
                                                                                margin: '0 0 0 5',
                                                                                width: 130,
                                                                                editable: false,
                                                                                displayField: 'hour',
                                                                                queryMode: 'local',
                                                                                valueField: 'hour',
                                                                                listeners: {
                                                                                    afterrender: 'onTracker_time_combo2AfterRender'
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'container',
                                                                margin: '5 0 0 0',
                                                                items: [
                                                                    {
                                                                        xtype: 'combobox',
                                                                        id: 'tracker_output_combo1',
                                                                        width: 240,
                                                                        labelCls: 'lb_arrow',
                                                                        labelSeparator: ' ',
                                                                        editable: false,
                                                                        displayField: 'num',
                                                                        queryMode: 'local',
                                                                        store: {
                                                                            data: [
                                                                                {
                                                                                    num: '10'
                                                                                },
                                                                                {
                                                                                    num: '20'
                                                                                },
                                                                                {
                                                                                    num: '30'
                                                                                },
                                                                                {
                                                                                    num: '40'
                                                                                },
                                                                                {
                                                                                    num: '50'
                                                                                },
                                                                                {
                                                                                    num: '100'
                                                                                },
                                                                                
                                                                            ],
                                                                            fields: [
                                                                                {
                                                                                    name: 'num'
                                                                                }
                                                                            ]
                                                                        },
                                                                        valueField: 'num',
                                                                        bind: {
                                                                            fieldLabel: '{output_count}'
                                                                        },
                                                                        listeners: {
                                                                            afterrender: 'onComboboxAfterRender1'
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'container',
                                                                id: 'tracker_basic_set_con1',
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'stretch'
                                                                },
                                                                items: [
                                                                    {
                                                                        xtype: 'combobox',
                                                                        id: 'tracker_type_combo1',
                                                                        width: 240,
                                                                        labelCls: 'lb_arrow',
                                                                        labelSeparator: ' ',
                                                                        editable: false,
                                                                        displayField: 'name',
                                                                        queryMode: 'local',
                                                                        store: {
                                                                            data: [
                                                                                {
                                                                                    name: __zen('fw'),
                                                                                    value: 'fw'
                                                                                },
                                                                                {
                                                                                    name: __zen('http'),
                                                                                    value: 'http'
                                                                                },
                                                                                {
                                                                                    name: __zen('app'),
                                                                                    value: 'app'
                                                                                },
                                                                                {
                                                                                    name: __zen('ips'),
                                                                                    value: 'ips'
                                                                                },
                                                                                
                                                                            ],
                                                                            fields: [
                                                                                {
                                                                                    name: 'name'
                                                                                },
                                                                                {
                                                                                    name: 'value'
                                                                                }
                                                                            ]
                                                                        },
                                                                        valueField: 'value',
                                                                        bind: {
                                                                            fieldLabel: '{type}'
                                                                        },
                                                                        listeners: {
                                                                            afterrender: 'onTracker_type_comboAfterRender',
                                                                            change: 'onTracker_type_comboChange',
                                                                            select: 'onTracker_type_combo1Select'
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'combobox',
                                                                        id: 'tracker_action_combo1',
                                                                        margin: '0 0 0 5',
                                                                        width: 240,
                                                                        labelCls: 'lb_arrow',
                                                                        labelSeparator: ' ',
                                                                        value: '0',
                                                                        editable: false,
                                                                        displayField: 'name',
                                                                        queryMode: 'local',
                                                                        store: {
                                                                            data: [
                                                                                {
                                                                                    name: __zen('allow'),
                                                                                    value: '0'
                                                                                },
                                                                                {
                                                                                    name: __zen('deny'),
                                                                                    value: '1'
                                                                                }
                                                                            ],
                                                                            fields: [
                                                                                {
                                                                                    name: 'name'
                                                                                },
                                                                                {
                                                                                    name: 'value'
                                                                                }
                                                                            ]
                                                                        },
                                                                        valueField: 'value',
                                                                        bind: {
                                                                            fieldLabel: '{action}'
                                                                        },
                                                                        listeners: {
                                                                            afterrender: 'onTracker_action_comboAfterRender'
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'combobox',
                                                                        id: 'tracker_class_combo1',
                                                                        margin: '0 0 0 5',
                                                                        width: 250,
                                                                        labelCls: 'lb_arrow',
                                                                        labelSeparator: ' ',
                                                                        editable: false,
                                                                        displayField: 'name',
                                                                        queryMode: 'local',
                                                                        store: {
                                                                            data: [
                                                                                {
                                                                                    name: __zen('task_tasknon'),
                                                                                    value: '0'
                                                                                },
                                                                                {
                                                                                    name: __zen('task'),
                                                                                    value: '1'
                                                                                },
                                                                                {
                                                                                    name: __zen('task_non'),
                                                                                    value: '2'
                                                                                }
                                                                            ],
                                                                            fields: [
                                                                                {
                                                                                    name: 'name'
                                                                                },
                                                                                {
                                                                                    name: 'value'
                                                                                }
                                                                            ]
                                                                        },
                                                                        valueField: 'value',
                                                                        bind: {
                                                                            fieldLabel: '{task_section}'
                                                                        },
                                                                        listeners: {
                                                                            afterrender: 'onTracker_class_comboAfterRender'
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'container',
                                                                id: 'tracker_basic_set_con2',
                                                                margin: '5 0 5 0',
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'stretch'
                                                                },
                                                                items: [
                                                                    {
                                                                        xtype: 'combobox',
                                                                        id: 'tracker_sortrole_combo1',
                                                                        width: 240,
                                                                        labelCls: 'lb_arrow',
                                                                        labelSeparator: ' ',
                                                                        value: 'packet',
                                                                        editable: false,
                                                                        displayField: 'name',
                                                                        queryMode: 'local',
                                                                        store: {
                                                                            data: [
                                                                                {
                                                                                    name: __zen('cumulate_packet'),
                                                                                    value: 'packet'
                                                                                },
                                                                                {
                                                                                    name: __zen('cumulate_all_usage'),
                                                                                    value: 'bytes'
                                                                                },
                                                                                {
                                                                                    name: __zen('tx'),
                                                                                    value: 'out_bytes'
                                                                                },
                                                                                {
                                                                                    name: __zen('rx'),
                                                                                    value: 'in_bytes'
                                                                                },
                                                                                {
                                                                                    name: __zen('cumulate_session'),
                                                                                    value: 'session'
                                                                                }
                                                                            ],
                                                                            fields: [
                                                                                {
                                                                                    name: 'name'
                                                                                },
                                                                                {
                                                                                    name: 'value'
                                                                                }
                                                                            ]
                                                                        },
                                                                        valueField: 'value',
                                                                        bind: {
                                                                            fieldLabel: '{align_criteria}'
                                                                        },
                                                                        listeners: {
                                                                            afterrender: 'onTracker_sortrole_comboAfterRender'
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'combobox',
                                                                        id: 'tracker_sort_combo1',
                                                                        margin: '0 0 0 5',
                                                                        width: 240,
                                                                        labelCls: 'lb_arrow',
                                                                        labelSeparator: ' ',
                                                                        editable: false,
                                                                        displayField: 'name',
                                                                        queryMode: 'local',
                                                                        store: {
                                                                            data: [
                                                                                {
                                                                                    name: __zen('desc_ord'),
                                                                                    value: -1
                                                                                },
                                                                                {
                                                                                    name: __zen('ase'),
                                                                                    value: 1
                                                                                }
                                                                            ],
                                                                            fields: [
                                                                                {
                                                                                    name: 'name'
                                                                                },
                                                                                {
                                                                                    name: 'value'
                                                                                }
                                                                            ]
                                                                        },
                                                                        valueField: 'value',
                                                                        bind: {
                                                                            fieldLabel: '{alignment_method}'
                                                                        },
                                                                        listeners: {
                                                                            afterrender: 'onTracker_sort_comboAfterRender'
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'combobox',
                                                                        id: 'tracker_comp_combo1',
                                                                        margin: '0 0 0 5',
                                                                        width: 250,
                                                                        labelCls: 'lb_arrow',
                                                                        labelSeparator: ' ',
                                                                        editable: false,
                                                                        displayField: 'name',
                                                                        queryMode: 'local',
                                                                        store: {
                                                                            data: [
                                                                                {
                                                                                    name: __zen('all'),
                                                                                    value: 'all'
                                                                                },
                                                                                {
                                                                                    name: 'Internal',
                                                                                    value: 'internal'
                                                                                },
                                                                                {
                                                                                    name: 'External',
                                                                                    value: 'external'
                                                                                },
                                                                                {
                                                                                    name: 'DMZ',
                                                                                    value: 'dmz'
                                                                                },
                                                                                {
                                                                                    name: 'PAN',
                                                                                    value: 'pan'
                                                                                }
                                                                            ],
                                                                            fields: [
                                                                                {
                                                                                    name: 'name'
                                                                                },
                                                                                {
                                                                                    name: 'value'
                                                                                }
                                                                            ]
                                                                        },
                                                                        valueField: 'value',
                                                                        bind: {
                                                                            fieldLabel: '{zone}'
                                                                        },
                                                                        listeners: {
                                                                            afterrender: 'onTracker_comp_comboAfterRender'
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        id: 'tracker_setting_con1',
                                        margin: '0 0 0 10',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                margin: '0 0 0 10',
                                                width: 135,
                                                items: [
                                                    {
                                                        xtype: 'label',
                                                        bind: {
                                                            text: '{detail_setting}'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                id: 'tracker_detail_grid_con',
                                                items: [
                                                    {
                                                        xtype: 'fieldset',
                                                        layout: {
                                                            type: 'vbox',
                                                            align: 'stretch',
                                                            pack: 'end'
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'gridpanel',
                                                                flex: 1,
                                                                id: 'tracker_detail_grid',
                                                                margin: '5 0 0 0',
                                                                width: 740,
                                                                header: false,
                                                                title: 'My Grid Panel',
                                                                allowDeselect: true,
                                                                hideHeaders: true,
                                                                columns: [
                                                                    {
                                                                        xtype: 'gridcolumn',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var num = Number(rowIndex) + 1;

                                                                            if(num < store.data.items.length){ return '<img src="../images/bul_02.gif" border="0"/>' + num + " " + __zen('step') + " " + '<img src="../images/bul_req.png" border="0"/>'; }
                                                                            else{ return '<img src="../images/bul_02.gif" border="0"/>' + num + " " + __zen('step'); }
                                                                        },
                                                                        id: 'tracker_detail_num',
                                                                        width: 130,
                                                                        dataIndex: 'name',
                                                                        text: 'N'
                                                                    },
                                                                    {
                                                                        xtype: 'gridcolumn',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var result;
                                                                            var example = [
                                                                            {'name' : __zen('src'), 'value' : 'sip'},
                                                                            {'name' : __zen('dest'), 'value' : 'dip'},
                                                                            {'name' : __zen('service'), 'value' : 'protocol,dport'},
                                                                            {'name' : __zen('rule_id'), 'value' : 'spd_id'},
                                                                            {'name' : __zen('country'), 'value' : 'country'},
                                                                            {'name' : __zen('domain'), 'value' : 'url'},
                                                                            {'name' : __zen('category'), 'value' : 'category'},
                                                                            {'name' : __zen('application'), 'value' : 'service'},
                                                                            //     {'name' : '공격자', 'value' : 'src'},
                                                                            //     {'name' : '공격목적지', 'value' : 'dst'},
                                                                            {'name' : __zen('attack_name'), 'value' : 'fsid'}
                                                                            ];

                                                                            if(Ext.getCmp('tracker_type_combo1').getValue() === "fw"){
                                                                                for(var i in example){
                                                                                    if(value === example[i].value){ result = example[i].name; }
                                                                                }
                                                                                //     var input_store = ['src', 'dst', 'service', 'policy', 'nation'];
                                                                            }
                                                                            else if(Ext.getCmp('tracker_type_combo1').getValue() === "vpn"){
                                                                                for(var i in example){
                                                                                    if(value === example[i].value){ result = example[i].name; }
                                                                                }
                                                                                //     var input_store = ['src', 'dst', 'service', 'nation'];
                                                                            }
                                                                            else if(Ext.getCmp('tracker_type_combo1').getValue() === "app"){
                                                                                for(var i in example){
                                                                                    if(value === example[i].value){ result = example[i].name; }
                                                                                }
                                                                                //     var input_store = ['src', 'dst', 'service', 'app', 'policy', 'nation'];
                                                                            }
                                                                            else if(Ext.getCmp('tracker_type_combo1').getValue() === "http"){
                                                                                for(var i in example){
                                                                                    if(value === example[i].value){ result = example[i].name; }
                                                                                }
                                                                                //     var input_store = ['src', 'domain', 'category'];
                                                                            }
                                                                            else if(Ext.getCmp('tracker_type_combo1').getValue() === "ips"){
                                                                                for(var i in example){
                                                                                    if(value === 'sip'){ result = __zen('attacker'); }
                                                                                    else if(value === 'dip'){ result = __zen('attack_target'); }
                                                                                    else if(value === example[i].value){ result = example[i].name; }
                                                                                }
                                                                                //     var input_store = ['src', 'dst', 'service', 'name'];
                                                                            }

                                                                            metaData.tdCls = 'cell_combo_atoz';
                                                                            return result;
                                                                        },
                                                                        id: 'tracker_detail_type',
                                                                        width: 150,
                                                                        dataIndex: 'name',
                                                                        text: 'type',
                                                                        layout: {
                                                                            type: 'hbox',
                                                                            align: 'stretch'
                                                                        },
                                                                        editor: {
                                                                            xtype: 'combobox',
                                                                            flex: 1,
                                                                            alwaysOnTop: true,
                                                                            baseCls: 'cell_combo',
                                                                            editable: false,
                                                                            displayField: 'name',
                                                                            queryMode: 'local',
                                                                            store: 'store_atoz_tracker_edit',
                                                                            valueField: 'value',
                                                                            listeners: {
                                                                                focus: 'onComboboxFocus',
                                                                                change: 'onComboboxChange',
                                                                                select: 'onComboboxSelect'
                                                                            }
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'gridcolumn',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            if(record.data.name === 'service'){
                                                                                //     metaData.tdCls = 'cell_text_atoz';
                                                                                //     return 'Protocol'+value.toUpperCase();
                                                                                return 'Protocol';
                                                                            }
                                                                            else if(record.data.name === 'country'){
                                                                                return 'Code';
                                                                            }
                                                                            else if(record.data.name === 'category'){
                                                                                return '';
                                                                            }
                                                                            else if(record.data.name === 'spd_id' || record.data.name === 'service'){
                                                                                return 'ID';
                                                                            }
                                                                            else if(record.data.name === 'url'){
                                                                                return 'URL';
                                                                            }
                                                                            else if(record.data.name === 'fsid'){
                                                                                return 'FSID';
                                                                            }
                                                                            else{
                                                                                return 'IP';
                                                                            }

                                                                        },
                                                                        width: 100,
                                                                        text: 'MyColumn24'
                                                                    },
                                                                    {
                                                                        xtype: 'gridcolumn',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var country_store = Ext.data.StoreManager.lookup('store_country_item');
                                                                            var output = "";

                                                                            for(var i in country_store.data.items){
                                                                                if(value === country_store.data.items[i].data.country_code){ output = country_store.data.items[i].data.country_desc; }
                                                                            }

                                                                            if(record.data.name === 'protocol,dport'){
                                                                                metaData.tdCls = 'cell_combo';
                                                                                //     return 'Protocol'+value.toUpperCase();
                                                                                return value.toUpperCase();
                                                                            }
                                                                            else if(record.data.name === 'country'){
                                                                                metaData.tdCls = 'cell_combo';
                                                                                return output;
                                                                            }
                                                                            else if(record.data.name === 'category'){
                                                                                metaData.tdCls = '';
                                                                            }
                                                                            else{
                                                                                metaData.tdCls = 'cell_text';
                                                                                return value;
                                                                            }

                                                                            return '';
                                                                        },
                                                                        getEditor: function(record) {
                                                                            var label_name;

                                                                            if(record.data.name === 'sip' || record.data.name === 'dip'){ label_name = "IP"; }
                                                                            else if(record.data.name === 'spd_id' || record.data.name === 'service'){ label_name = "ID"; }
                                                                            else if(record.data.name === 'url'){ label_name = "URL"; }
                                                                            else if(record.data.name === 'fsid'){ label_name = "FSID"; }

                                                                            if(record.data.name === 'protocol,dport'){
                                                                                return Ext.create('Ext.grid.CellEditor', {
                                                                                    field: Ext.create( 'Ext.form.field.ComboBox', {
                                                                                        labelSeparator: ' ',
                                                                                        editable: false,
                                                                                        displayField: 'name',
                                                                                        valueField: 'value',
                                                                                        baseCls:'cell_combo',
                                                                                        margin: '0 1 0 0',
                                                                                        store : {
                                                                                            data:[
                                                                                            {
                                                                                                name : 'IP',
                                                                                                value : 'ip'
                                                                                            },
                                                                                            {
                                                                                                name : 'ICMP',
                                                                                                value : 'icmp'
                                                                                            },
                                                                                            {
                                                                                                name : 'IGMP',
                                                                                                value : 'igmp'
                                                                                            },
                                                                                            {
                                                                                                name : 'IPIP',
                                                                                                value : 'ipip'
                                                                                            },
                                                                                            {
                                                                                                name : 'TCP',
                                                                                                value : 'tcp'
                                                                                            },
                                                                                            {
                                                                                                name : 'UDP',
                                                                                                value : 'udp'
                                                                                            },
                                                                                            {
                                                                                                name : 'ESP',
                                                                                                value : 'esp'
                                                                                            },
                                                                                            {
                                                                                                name : 'AH',
                                                                                                value : 'ah'
                                                                                            },
                                                                                            {
                                                                                                name : 'ICMPV6',
                                                                                                value : 'icmpv6'
                                                                                            }
                                                                                            ],
                                                                                            fields:[
                                                                                            {
                                                                                                name : 'name'
                                                                                            },
                                                                                            {
                                                                                                name : 'value'
                                                                                            }
                                                                                            ]
                                                                                        },
                                                                                        listeners: {
                                                                                            focus: function(component){ component.expand(); }
                                                                                        }
                                                                                    })
                                                                                });
                                                                            }
                                                                            else if(record.data.name === 'country'){
                                                                                return Ext.create('Ext.grid.CellEditor', {
                                                                                    field: Ext.create( 'Ext.form.field.ComboBox', {
                                                                                        editable: false,
                                                                                        displayField: 'country_desc',
                                                                                        valueField: 'country_code',
                                                                                        queryMode: 'local',
                                                                                        baseCls:'cell_combo',
                                                                                        margin: '0 1 0 0',
                                                                                        store:'store_country_item',
                                                                                        listeners: {
                                                                                            focus: function(component){ component.expand(); },
                                                                                        }
                                                                                    })
                                                                                });
                                                                            }
                                                                            else if(record.data.name === 'category'){
                                                                                return '';
                                                                            }
                                                                            else if(record.data.name === 'sip' || record.data.name === 'dip'){
                                                                                return Ext.create('Ext.grid.CellEditor', {
                                                                                    field: Ext.create( 'Ext.form.field.Text', {
                                                                                        labelSeparator: ' ',
                                                                                        baseCls:'cell_text',
                                                                                        margin: '0 1 0 0',
                                                                                        listeners:{
                                                                                            focus: function(component, event, eOpts){
                                                                                                var str = disp_help_ip('4s');
                                                                                                component.fieldInfo = str;
                                                                                                setTipFocus(Ext.getCmp('win_setting_tracker'), component);
                                                                                            },
                                                                                            blur: function(component, event, eOpts){
                                                                                                setTipBlur(Ext.getCmp('win_setting_tracker'), component);
                                                                                            }
                                                                                        }
                                                                                    })
                                                                                });
                                                                            }
                                                                            else{
                                                                                return Ext.create('Ext.grid.CellEditor', {
                                                                                    field: Ext.create( 'Ext.form.field.Text', {
                                                                                        labelSeparator: ' ',
                                                                                        baseCls:'cell_text',
                                                                                        margin: '0 1 0 0',
                                                                                        listeners: {
                                                                                        }
                                                                                    })
                                                                                });
                                                                            }
                                                                        },
                                                                        style: 'visibility:hidden',
                                                                        width: 185,
                                                                        dataIndex: 'content',
                                                                        text: 'content',
                                                                        layout: {
                                                                            type: 'hbox',
                                                                            align: 'stretch'
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'gridcolumn',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            if(record.data.name === 'protocol,dport'){
                                                                                return 'Port';
                                                                            }
                                                                            else{ return ''; }
                                                                        },
                                                                        width: 70,
                                                                        text: 'MyColumn25'
                                                                    },
                                                                    {
                                                                        xtype: 'gridcolumn',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            // if(record.data.name === "service"){
                                                                            //     return {
                                                                            //         xtype: 'textfield',
                                                                            //         labelWidth:70,
                                                                            //         fieldLabel:"Port",
                                                                            //         id:'port'+rowIndex,
                                                                            //         labelSeparator: ' ',
                                                                            //         margin:'-3 0 -3 0',
                                                                            //         width: 150,
                                                                            //         value : value,
                                                                            //         listeners: {
                                                                            //             blur: {
                                                                            //                 fn: function(){
                                                                            //                     Ext.getCmp('tracker_detail_error').hide();
                                                                            //                     var records = [];

                                                                            //                     for(var i in store.data.items){
                                                                            //                         records.push({
                                                                            //                             'name' : store.data.items[i].data.name,
                                                                            //                             'content' : store.data.items[i].data.content,
                                                                            //                             'port' : store.data.items[i].data.port,
                                                                            //                             'num' : store.data.items[i].data.num
                                                                            //                         });
                                                                            //                     }

                                                                            //                     records[rowIndex].port = Ext.getCmp('port'+rowIndex).getValue();

                                                                            //                     store.loadData(records);
                                                                            //                 },
                                                                            //                 scope: me,
                                                                            //                 single: true
                                                                            //             }
                                                                            //         }
                                                                            //     };
                                                                            // }
                                                                            // else{
                                                                            //     return {
                                                                            //         xtype: 'label',
                                                                            //         id:'port'+rowIndex,
                                                                            //         width:5,
                                                                            //         text:''
                                                                            //     };
                                                                            // }

                                                                            if(record.data.name === 'protocol,dport'){
                                                                                metaData.tdCls = 'cell_text';
                                                                            }
                                                                            else{
                                                                                metaData.tdCls = '';
                                                                            }

                                                                            return value;
                                                                        },
                                                                        getEditor: function(record) {
                                                                            if(record.data.name === 'protocol,dport'){
                                                                                return Ext.create('Ext.grid.CellEditor', {
                                                                                    field: Ext.create( 'Ext.form.field.Text', {
                                                                                        labelWidth:70,
                                                                                        //             fieldLabel:"Port",
                                                                                        labelSeparator: ' ',
                                                                                        baseCls:'cell_text',
                                                                                        margin: '0 1 0 0',
                                                                                        fieldInfo: msg_tip_length_port(1,65535,null),
                                                                                        enforceMaxLength: true,
                                                                                        maxLength: 5,
                                                                                        listeners:{
                                                                                            focus: function(component, event, eOpts){
                                                                                                setTipFocus(Ext.getCmp('win_setting_tracker'), component);
                                                                                            },
                                                                                            blur: function(component, event, eOpts){
                                                                                                setTipBlur(Ext.getCmp('win_setting_tracker'), component);
                                                                                            }
                                                                                        }
                                                                                    })
                                                                                });
                                                                            }
                                                                        },
                                                                        width: 80,
                                                                        dataIndex: 'port',
                                                                        text: 'port'
                                                                    },
                                                                    {
                                                                        xtype: 'actioncolumn',
                                                                        id: 'tracker_detail_del_btn1',
                                                                        width: 25,
                                                                        align: 'center',
                                                                        items: [
                                                                            {
                                                                                handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                                    var me = Ext.getCmp('win_setting_tracker');
                                                                                    var store = Ext.getCmp('tracker_detail_grid').getStore();
                                                                                    Ext.getCmp('tracker_detail_add_con1').enable(true);
                                                                                    // Ext.suspendLayouts();
                                                                                    var max;

                                                                                    if(Ext.getCmp('tracker_type_combo1').getValue() === "fw"){ max = 5; }
                                                                                    else if(Ext.getCmp('tracker_type_combo1').getValue() === "http"){ max = 3; }
                                                                                    else if(Ext.getCmp('tracker_type_combo1').getValue() === "app"){ max = 6; }
                                                                                    else if(Ext.getCmp('tracker_type_combo1').getValue() === "vpn"){ max = 4; }
                                                                                    else if(Ext.getCmp('tracker_type_combo1').getValue() === "ips"){ max = 4; }

                                                                                    var record = [];

                                                                                    // store.suspendEvents();
                                                                                    store.removeAt(rowIndex, 1);
                                                                                    // store.resumeEvents();

                                                                                    me.tracker_cnt--;

                                                                                    if(me.tracker_cnt === 1 || store.getCount() === 1){
                                                                                        Ext.getCmp('tracker_detail_del_btn1').items[0].disabled = true;
                                                                                        Ext.getCmp('tracker_detail_grid').getView().refreshNode(0);
                                                                                    }
                                                                                    else{ Ext.getCmp('tracker_detail_del_btn1').items[0].disabled = false; }

                                                                                    // Ext.getCmp('tracker_detail_grid_con').doLayout();

                                                                                    // for(i = 0;i<store.getCount();i++){
                                                                                    //     Ext.getCmp('tracker_detail_grid').getView().refreshNode(i);
                                                                                    // }
                                                                                    // Ext.resumeLayouts();
                                                                                    Ext.getCmp('tracker_detail_grid').getView().refresh();

                                                                                },
                                                                                disabled: true,
                                                                                iconCls: 'icr_del'
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                viewConfig: {
                                                                    markDirty: false,
                                                                    listeners: {
                                                                        drop: 'onViewDrop',
                                                                        beforedrop: 'onViewBeforeDrop'
                                                                    },
                                                                    plugins: [
                                                                        Ext.create('Ext.grid.plugin.DragDrop', {
                                                                            ddGroup: '',
                                                                            dragGroup: 'group',
                                                                            dropGroup: 'group'
                                                                        })
                                                                    ]
                                                                },
                                                                listeners: {
                                                                    cellclick: 'onTracker_detail_gridCellClick'
                                                                },
                                                                plugins: [
                                                                    {
                                                                        ptype: 'cellediting',
                                                                        pluginId: 'tracker_detail_plug',
                                                                        clicksToEdit: 1
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'container',
                                                                flex: 1,
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'stretch'
                                                                },
                                                                items: [
                                                                    {
                                                                        xtype: 'container',
                                                                        flex: 1,
                                                                        items: [
                                                                            {
                                                                                xtype: 'label',
                                                                                cls: 'errorBox',
                                                                                hidden: true,
                                                                                id: 'tracker_detail_error',
                                                                                margin: '5 0 0 0'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        xtype: 'container',
                                                                        flex: 1,
                                                                        id: 'tracker_detail_add_con1',
                                                                        margin: '5 0 5 0',
                                                                        layout: {
                                                                            type: 'hbox',
                                                                            align: 'stretch',
                                                                            pack: 'end'
                                                                        },
                                                                        items: [
                                                                            {
                                                                                xtype: 'button',
                                                                                cls: 'btn_b',
                                                                                iconCls: 'icb_add',
                                                                                listeners: {
                                                                                    click: 'onButtonClick'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'image',
                                                                                height: 20,
                                                                                hidden: true,
                                                                                id: 'tracker_detail_add_img1',
                                                                                margin: '3 0 3 5',
                                                                                width: 24,
                                                                                src: '../images/b_insert.gif',
                                                                                listeners: {
                                                                                    render: 'onImageRender1'
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        height: 32,
                                        id: 'tracker_chart_con1',
                                        margin: '0 0 10 10',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                margin: '0 0 0 10',
                                                width: 135,
                                                items: [
                                                    {
                                                        xtype: 'label',
                                                        bind: {
                                                            text: '{graph}'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        layout: {
                                                            type: 'hbox',
                                                            align: 'stretch'
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'radiofield',
                                                                id: 'tracker_graph_chk1',
                                                                checked: true,
                                                                listeners: {
                                                                    change: 'onTracker_graph_chk1Change'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'label',
                                                                margin: '3 0 0 5',
                                                                width: 120,
                                                                bind: {
                                                                    text: '{chart_previous}'
                                                                },
                                                                listeners: {
                                                                    render: 'onLabelRender'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'radiofield',
                                                                id: 'tracker_graph_chk2',
                                                                listeners: {
                                                                    change: 'onTracker_graph_chk2Change'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'label',
                                                                margin: '3 0 0 5',
                                                                width: 120,
                                                                bind: {
                                                                    text: '{chart_today}'
                                                                },
                                                                listeners: {
                                                                    render: 'onLabelRender1'
                                                                }
                                                            },
                                                            me.processTracker_graph_chk3({
                                                                xtype: 'radiofield',
                                                                id: 'tracker_graph_chk3',
                                                                bind: {
                                                                    boxLabel: '{chart_daily}'
                                                                },
                                                                listeners: {
                                                                    change: 'onTracker_graph_chk3Change'
                                                                }
                                                            })
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processTracker_graph_chk3: function(config) {
        config.boxLabel = true;

        return config;
    },

    onTextfieldErrorChange1: function(labelable, error, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];
        if(error){
            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onTextfieldBlur1: function(component, event, eOpts) {
        Ext.getCmp('tracker_name1').validateValue(true);
    },

    onComboboxAfterRender: function(component, eOpts) {
        // var combo = Ext.getCmp('tracker_time_combo1').getStore().data;

        // if(combo.length > 0){
        //     Ext.getCmp('tracker_time_combo1').setValue(combo.items[0].data['hour']);
        // }
    },

    onTracker_time_combo2AfterRender: function(component, eOpts) {
        // var combo = Ext.getCmp('tracker_timeend_combo1').getStore().data;

        // if(combo.length > 0){
        //     Ext.getCmp('tracker_timeend_combo1').setValue(combo.items[24].data['hour']);
        // }
    },

    onComboboxAfterRender1: function(component, eOpts) {
        var combo = Ext.getCmp('tracker_output_combo1').getStore().data;

        if(combo.length > 0){
            Ext.getCmp('tracker_output_combo1').setValue(combo.items[0].data['num']);
        }
    },

    onTracker_type_comboAfterRender: function(component, eOpts) {
        var combo = Ext.getCmp('tracker_type_combo1').getStore().data;

        if(combo.length > 0){
            Ext.getCmp('tracker_type_combo1').setValue(combo.items[0].data['value']);
        }
    },

    onTracker_type_comboChange: function(field, newValue, oldValue, eOpts) {
        var me = Ext.getCmp('win_setting_tracker');

        // Ext.suspendLayouts();
        var action_store = Ext.getCmp('tracker_action_combo1').getStore();
        var sortrole_store = Ext.getCmp('tracker_sortrole_combo1').getStore();
        var action_records = [];
        var sortrole_records = [];
        var tracker_edit_records = [];

        Ext.getCmp('tracker_comp_combo1').show();
        Ext.getCmp('tracker_class_combo1').show();
        Ext.getCmp('tracker_action_combo1').setFieldLabel(__zen('action'));

        me.tracker_cnt = 1;

        if(newValue === "fw"){
            action_records.push({ 'name' : __zen('allow'), 'value' : '0' });
            action_records.push({ 'name' : __zen('deny'), 'value' : '1' });
            sortrole_records.push({ 'name' : __zen('cumulate_packet'), 'value' : 'packets_sum' });
            sortrole_records.push({ 'name' : __zen('cumulate_all_usage'), 'value' : 'bytes_sum' });
            //     sortrole_records.push({ 'name' : 'TX', 'value' : 'out_bytes' });
            //     sortrole_records.push({ 'name' : 'RX', 'value' : 'in_bytes' });
            sortrole_records.push({ 'name' : __zen('cumulate_session'), 'value' : 'sessionCnt_sum' });
            tracker_edit_records = [
                {
                    name : __zen('src'),
                    value : 'sip'
                },{
                    name : __zen('dest'),
                    value : 'dip'
                },{
                    name : __zen('service'),
                    value : 'protocol,dport'
                },{
                    name : __zen('rule_id'),
                    value : 'spd_id'
                },{
                    name : __zen('country'),
                    value : 'country'
                }
            ];

            me.detail_type = [{'value' : 'sip'},{'value' : 'dip'},{'value' : 'protocol,dport'},{'value' : 'spd_id'},{'value' : 'country'}];
            var action_store = Ext.getCmp('tracker_action_combo1').getStore();
            var sortrole_store = Ext.getCmp('tracker_sortrole_combo1').getStore();
            Ext.data.StoreManager.lookup('store_atoz_tracker_type_edit').loadData(tracker_edit_records);

            action_store.loadData(action_records);
            sortrole_store.loadData(sortrole_records);

            Ext.getCmp('tracker_action_combo1').setValue(action_store.data.items[0].data['value']);
            Ext.getCmp('tracker_sortrole_combo1').setValue(sortrole_store.data.items[0].data['value']);
        }
        if(newValue === "vpn"){
            Ext.getCmp('tracker_comp_combo1').hide();

            action_records.push({ 'name' : __zen('en_de_cryption'), 'value' : '0' });
            action_records.push({ 'name' : __zen('encryption'), 'value' : '1' });
            action_records.push({ 'name' : __zen('decryption'), 'value' : '2' });
            sortrole_records.push({ 'name' : __zen('cumulate_packet'), 'value' : 'packets_sum' });
            sortrole_records.push({ 'name' : __zen('cumulate_usage'), 'value' : 'bytes_sum' });
            sortrole_records.push({ 'name' : __zen('cumulate_session'), 'value' : 'sessionCnt_sum' });
            tracker_edit_records = [
                {
                    name : __zen('src'),
                    value : 'sip'
                },{
                    name : __zen('dest'),
                    value : 'dip'
                },{
                    name : __zen('service'),
                    value : 'protocol,dport'
                },{
                    name : __zen('country'),
                    value : 'country'
                }
            ];

            me.detail_type = [{'value' : 'sip'},{'value' : 'dip'},{'value' : 'protocol,dport'},{'value' : 'country'}];
            var action_store = Ext.getCmp('tracker_action_combo1').getStore();
            var sortrole_store = Ext.getCmp('tracker_sortrole_combo1').getStore();
            Ext.data.StoreManager.lookup('store_atoz_tracker_type_edit').loadData(tracker_edit_records);

            action_store.loadData(action_records);
            sortrole_store.loadData(sortrole_records);

            Ext.getCmp('tracker_action_combo1').setValue(action_store.data.items[0].data['value']);
            Ext.getCmp('tracker_sortrole_combo1').setValue(sortrole_store.data.items[0].data['value']);
        }
        if(newValue === "app"){
            Ext.getCmp('tracker_comp_combo1').hide();
            Ext.getCmp('tracker_class_combo1').hide();

            action_records.push({ 'name' : __zen('detect'), 'value' : '0' });
            action_records.push({ 'name' : __zen('deny'), 'value' : '1' });
            sortrole_records.push({ 'name' : __zen('cumulate_packet'), 'value' : 'packets_sum' });
            sortrole_records.push({ 'name' : __zen('cumulate_usage'), 'value' : 'bytes_sum' });
            sortrole_records.push({ 'name' : __zen('cumulate_session'), 'value' : 'sessionCnt_sum' });
            tracker_edit_records = [
                {
                    name : __zen('src'),
                    value : 'sip'
                },{
                    name : __zen('dest'),
                    value : 'dip'
                },{
                    name : __zen('service'),
                    value : 'protocol'
                },{
                    name : __zen('application'),
                    value : 'service'
                },{
                    name : __zen('rule_id'),
                    value : 'spd_id'
                },{
                    name : __zen('country'),
                    value : 'country'
                }
            ];

            me.detail_type = [{'value' : 'sip'},{'value' : 'dip'},{'value' : 'protocol'},{'value' : 'service'},{'value' : 'spd_id'},{'value' : 'country'}];
            var action_store = Ext.getCmp('tracker_action_combo1').getStore();
            var sortrole_store = Ext.getCmp('tracker_sortrole_combo1').getStore();
            Ext.data.StoreManager.lookup('store_atoz_tracker_type_edit').loadData(tracker_edit_records);

            action_store.loadData(action_records);
            sortrole_store.loadData(sortrole_records);

            Ext.getCmp('tracker_action_combo1').setValue(action_store.data.items[0].data['value']);
            Ext.getCmp('tracker_sortrole_combo1').setValue(sortrole_store.data.items[0].data['value']);
        }
        if(newValue === "http"){
            Ext.getCmp('tracker_comp_combo1').hide();
            Ext.getCmp('tracker_action_combo1').setFieldLabel('분류');

            action_records.push({ 'name' : __zen('integrated'), 'value' : '0' });
            action_records.push({ 'name' : __zen('detect'), 'value' : '1' });
            action_records.push({ 'name' : __zen('deny'), 'value' : '2' });
            action_records.push({ 'name' : __zen('approval'), 'value' : '3' });
            action_records.push({ 'name' : __zen('unclassified'), 'value' : '4' });
            sortrole_records.push({ 'name' : __zen('cumulate_usage'), 'value' : 'bytes_sum' });
            sortrole_records.push({ 'name' : __zen('access_num'), 'value' : 'accessCnt_sum' });
            tracker_edit_records = [
                {
                    name : __zen('src'),
                    value : 'sip'
                },{
                    name : __zen('domain'),
                    value : 'url'
                },{
                    name : __zen('category'),
                    value : 'category'
                }
            ];

            me.detail_type = [{'value' : 'sip'},{'value' : 'url'},{'value' : 'category'}];
            var action_store = Ext.getCmp('tracker_action_combo1').getStore();
            var sortrole_store = Ext.getCmp('tracker_sortrole_combo1').getStore();
            Ext.data.StoreManager.lookup('store_atoz_tracker_type_edit').loadData(tracker_edit_records);

            action_store.loadData(action_records);
            sortrole_store.loadData(sortrole_records);

            Ext.getCmp('tracker_action_combo1').setValue(action_store.data.items[0].data['value']);
            Ext.getCmp('tracker_sortrole_combo1').setValue(sortrole_store.data.items[0].data['value']);
        }
        if(newValue === "ips"){
            Ext.getCmp('tracker_comp_combo1').hide();
            Ext.getCmp('tracker_class_combo1').hide();

            action_records.push({ 'name' : __zen('detect'), 'value' : '0' });
            action_records.push({ 'name' : __zen('deny'), 'value' : '1' });
            sortrole_records.push({ 'name' : __zen('detect_count2'), 'value' : 'cnt' });
            sortrole_records.push({ 'name' : __zen('detect_byte'), 'value' : 'byte' });
            tracker_edit_records = [
                {
                    name : __zen('attacker'),
                    value : 'sip'
                },{
                    name : __zen('attack_target'),
                    value : 'dip'
                },{
                    name : __zen('service'),
                    value : 'protocol,dport'
                },{
                    name : __zen('attack_name'),
                    value : 'fsid'
                }
            ];

            me.detail_type = [{'value' : 'sip'},{'value' : 'dip'},{'value' : 'protocol,dport'},{'value' : 'fsid'}];
            var action_store = Ext.getCmp('tracker_action_combo1').getStore();
            var sortrole_store = Ext.getCmp('tracker_sortrole_combo1').getStore();
            Ext.data.StoreManager.lookup('store_atoz_tracker_type_edit').loadData(tracker_edit_records);

            action_store.loadData(action_records);
            sortrole_store.loadData(sortrole_records);

            Ext.getCmp('tracker_action_combo1').setValue(action_store.data.items[0].data['value']);
            Ext.getCmp('tracker_sortrole_combo1').setValue(sortrole_store.data.items[0].data['value']);
        }
        // Ext.resumeLayouts();

        if(me.change_click){
            if(me.edit === "edit"){
                var tracker_store = Ext.getCmp('tracker_detail_grid').getStore();
                var store = Ext.getCmp('tracker_grid').getStore();

                var records = [];
                for(var i in me.record.detail){
                    var port;
                    var content;
                    if(me.record.detail[i].port === undefined){ port = ""; }
                    else{ port = me.record.detail[i].port; }
                    if(me.record.detail[i].content === undefined){ content = ""; }
                    else{ content = me.record.detail[i].content; }
                    records.push({
                        'name' : me.record.detail[i].type,
                        'content' : content,
                        'port' : port
                    });
                }
                store.suspendEvents();
                store.loadData(records);
                store.resumeEvents();
                me.change_click = false;
            }
        }
        // Ext.resumeLayouts();
        // Ext.getCmp('win_setting_con').doLayout();
        me.change_chk = true;
    },

    onTracker_type_combo1Select: function(combo, record, eOpts) {
        var me = Ext.getCmp('win_setting_tracker');
        me.change_click = false;

        if(me.change_click === false){
            var record = [];
            record.push({
                'name' : 'sip'
            });

        //     Ext.getCmp('tracker_detail_grid').getStore().suspendEvents();
            Ext.getCmp('tracker_detail_grid').getStore().loadData(record);
        //     Ext.getCmp('tracker_detail_grid').getStore().resumeEvents();
            Ext.getCmp('tracker_detail_del_btn1').items[0].disabled = true;
            Ext.getCmp('tracker_detail_add_con1').enable(true);
            Ext.getCmp('tracker_detail_grid').getView().refresh();
        }
    },

    onTracker_action_comboAfterRender: function(component, eOpts) {
        // var combo = Ext.getCmp('tracker_action_combo1').getStore().data;

        // if(combo.length > 0){
        //     Ext.getCmp('tracker_action_combo1').setValue(combo.items[0].data['value']);
        // }
    },

    onTracker_class_comboAfterRender: function(component, eOpts) {
        var combo = Ext.getCmp('tracker_class_combo1').getStore().data;

        if(combo.length > 0){
            Ext.getCmp('tracker_class_combo1').setValue(combo.items[0].data['value']);
        }
    },

    onTracker_sortrole_comboAfterRender: function(component, eOpts) {
        var combo = Ext.getCmp('tracker_sortrole_combo1').getStore().data;

        if(combo.length > 0){
            Ext.getCmp('tracker_sortrole_combo1').setValue(combo.items[0].data['value']);
        }
    },

    onTracker_sort_comboAfterRender: function(component, eOpts) {
        var combo = Ext.getCmp('tracker_sort_combo1').getStore().data;

        if(combo.length > 0){
            Ext.getCmp('tracker_sort_combo1').setValue(combo.items[0].data['value']);
        }
    },

    onTracker_comp_comboAfterRender: function(component, eOpts) {
        var combo = Ext.getCmp('tracker_comp_combo1').getStore().data;

        if(combo.length > 0){
            Ext.getCmp('tracker_comp_combo1').setValue(combo.items[0].data['value']);
        }
    },

    onComboboxFocus: function(component, event, eOpts) {
        var store = Ext.data.StoreManager.lookup('store_atoz_tracker_type_edit');
        var grid_store = Ext.getCmp('tracker_detail_grid').getStore();
        var records = [];
        for(var i in store.data.items){
            var chk = false;
            for(var j in grid_store.data.items){
                if(store.data.items[i].data.value === grid_store.data.items[j].data.name){
                    if(grid_store.data.items[j].data.name !== component.getValue()){
                        chk = true;
                    }
                }
            }
            if(chk === false){
                records.push(store.data.items[i].data);
            }
        }

        component.getStore().loadData(records);
        component.setValue(component.getValue());
        component.expand();

    },

    onComboboxChange: function(field, newValue, oldValue, eOpts) {
        var store = Ext.getCmp("tracker_detail_grid").getStore();
        var data = store.getAt(Ext.getCmp("tracker_detail_grid").row_index);
        var record = [];
        record.push({
            'content' : "",
            'name' : newValue,
            'port' : ""
        });
        store.removeAt(Ext.getCmp("tracker_detail_grid").row_index);
        store.insert(Ext.getCmp("tracker_detail_grid").row_index, record);

        Ext.getCmp("tracker_detail_grid").getView().refresh();
    },

    onComboboxSelect: function(combo, record, eOpts) {
        combo.blur();
    },

    onViewDrop: function(node, data, overModel, dropPosition, eOpts) {
        console.log(new Date().getSeconds()+"/"+new Date().getMilliseconds());
        Ext.getCmp('tracker_detail_grid').getView().refresh();
        console.log(new Date().getSeconds()+"/"+new Date().getMilliseconds());

        var store = Ext.getCmp('tracker_detail_grid').getStore();
        store.resumeEvents();
    },

    onViewBeforeDrop: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
        var store = Ext.getCmp('tracker_detail_grid').getStore();
        store.suspendEvents();
    },

    onTracker_detail_gridCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Ext.getCmp("tracker_detail_grid").row_index = rowIndex;
        // if(cellIndex === 2){
        //     Ext.getCmp('content'+rowIndex).focus();
        // }
        // else if(cellIndex === 3){
        //     Ext.getCmp('port'+rowIndex).focus();
        // }
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp('win_setting_tracker');
        var store = Ext.getCmp('tracker_detail_grid').getStore();
        var num = [];
        var max;
        var content = '';
        var record = [];
        var index = '1';
        //     Ext.suspendLayouts();
        if(Ext.getCmp('tracker_type_combo1').getValue() === "fw"){ max = 5; }
        else if(Ext.getCmp('tracker_type_combo1').getValue() === "http"){ max = 3; }
        else if(Ext.getCmp('tracker_type_combo1').getValue() === "app"){ max = 6; }
        else if(Ext.getCmp('tracker_type_combo1').getValue() === "vpn"){ max = 4; }
        else if(Ext.getCmp('tracker_type_combo1').getValue() === "ips"){ max = 4; }
        var next = max;

        for(var cnt = 0;cnt < max;cnt++){
            num.push(cnt);
        }

        if(store.getCount() === 1){
            index = '2';
            for(var i in me.detail_type){
                if(store.data.items[0].data.name === me.detail_type[i].value){ num[i] = 'z'; }
            }

            for(i in num){
                if(num[i] < next){ next = i; }
            }

            record.push({
                'name' : me.detail_type[next].value,
                'content' : '',
                'port' : ''
            });
            Ext.getCmp('tracker_detail_del_btn1').items[0].disabled = false;
            //Ext.getCmp('tracker_detail_grid').getView().refreshNode(0);
        }
        else if(store.getCount() === 2){
            index = '3';
            for(var j in me.detail_type){
                if(store.data.items[0].data.name === me.detail_type[j].value){ num[j] = 'z'; }
                else if(store.data.items[1].data.name === me.detail_type[j].value){ num[j] = 'z'; }
            }

            for(j in num){
                if(num[j] < next){ next = j; }
            }

            record.push({
                'name' : me.detail_type[next].value,
                'content' : '',
                'port' : ''
            });
        }
        else if(store.getCount() === 3){
            index = '4';
            for(var k in me.detail_type){
                if(store.data.items[0].data.name === me.detail_type[k].value){ num[k] = 'z'; }
                else if(store.data.items[1].data.name === me.detail_type[k].value){ num[k] = 'z'; }
                else if(store.data.items[2].data.name === me.detail_type[k].value){ num[k] = 'z'; }
            }

            for(k in num){
                if(num[k] < next){ next = k; }
            }

            record.push({
                'name' : me.detail_type[next].value,
                'content' : '',
                'port' : ''
            });
        }
        else if(store.getCount() === 4){
            index = '5';
            for(var l in me.detail_type){
                if(store.data.items[0].data.name === me.detail_type[l].value){ num[l] = 'z'; }
                else if(store.data.items[1].data.name === me.detail_type[l].value){ num[l] = 'z'; }
                else if(store.data.items[2].data.name === me.detail_type[l].value){ num[l] = 'z'; }
                else if(store.data.items[3].data.name === me.detail_type[l].value){ num[l] = 'z'; }
            }

            for(l in num){
                if(num[l] < next){ next = l; }
            }

            record.push({
                'name' : me.detail_type[next].value,
                'content' : '',
                'port' : ''
            });
        }
        else if(store.getCount() === 5){
            index = '6';
            for(var m in me.detail_type){
                if(store.data.items[0].data.name === me.detail_type[m].value){ num[m] = 'z'; }
                else if(store.data.items[1].data.name === me.detail_type[m].value){ num[m] = 'z'; }
                else if(store.data.items[2].data.name === me.detail_type[m].value){ num[m] = 'z'; }
                else if(store.data.items[3].data.name === me.detail_type[m].value){ num[m] = 'z'; }
                else if(store.data.items[4].data.name === me.detail_type[m].value){ num[m] = 'z'; }
            }

            for(m in num){
                if(num[m] < next){ next = m; }
            }

            record.push({
                'name' : me.detail_type[next].value,
                'content' : '',
                'port' : ''
            });
        }
        me.tracker_cnt++;

        Ext.getCmp('tracker_detail_grid').getStore().suspendEvents();
        Ext.getCmp('tracker_detail_grid').getStore().add(record);
        Ext.getCmp('tracker_detail_grid').getStore().resumeEvents();

        if(me.tracker_cnt === max){ Ext.getCmp('tracker_detail_add_con1').disable(true); }
        else{ Ext.getCmp('tracker_detail_add_con1').enable(true); }

        //     Ext.resumeLayouts();
        Ext.getCmp('tracker_detail_grid').getView().refresh();
    },

    onImageRender1: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            var me = Ext.getCmp('win_setting_tracker');
            var store = Ext.getCmp('tracker_detail_grid').getStore();
            var num = [];
            var max;
            var content = '';
            var record = [];
            var index = '1';
        //     Ext.suspendLayouts();
            if(Ext.getCmp('tracker_type_combo1').getValue() === "fw"){ max = 5; }
            else if(Ext.getCmp('tracker_type_combo1').getValue() === "http"){ max = 3; }
            else if(Ext.getCmp('tracker_type_combo1').getValue() === "app"){ max = 6; }
            else if(Ext.getCmp('tracker_type_combo1').getValue() === "vpn"){ max = 4; }
            else if(Ext.getCmp('tracker_type_combo1').getValue() === "ips"){ max = 4; }
            var next = max;

            for(var cnt = 0;cnt < max;cnt++){
                num.push(cnt);
            }

            if(store.getCount() === 1){
                index = '2';
                for(var i in me.detail_type){
                    if(store.data.items[0].data.name === me.detail_type[i].value){ num[i] = 'z'; }
                }

                for(i in num){
                    if(num[i] < next){ next = i; }
                }

                record.push({
                    'name' : me.detail_type[next].value,
                    'content' : '',
                    'port' : ''
                });
                Ext.getCmp('tracker_detail_del_btn1').items[0].disabled = false;
                //Ext.getCmp('tracker_detail_grid').getView().refreshNode(0);
            }
            else if(store.getCount() === 2){
                index = '3';
                for(var j in me.detail_type){
                    if(store.data.items[0].data.name === me.detail_type[j].value){ num[j] = 'z'; }
                    else if(store.data.items[1].data.name === me.detail_type[j].value){ num[j] = 'z'; }
                }

                for(j in num){
                    if(num[j] < next){ next = j; }
                }

                record.push({
                    'name' : me.detail_type[next].value,
                    'content' : '',
                    'port' : ''
                });
            }
            else if(store.getCount() === 3){
                index = '4';
                for(var k in me.detail_type){
                    if(store.data.items[0].data.name === me.detail_type[k].value){ num[k] = 'z'; }
                    else if(store.data.items[1].data.name === me.detail_type[k].value){ num[k] = 'z'; }
                    else if(store.data.items[2].data.name === me.detail_type[k].value){ num[k] = 'z'; }
                }

                for(k in num){
                    if(num[k] < next){ next = k; }
                }

                record.push({
                    'name' : me.detail_type[next].value,
                    'content' : '',
                    'port' : ''
                });
            }
            else if(store.getCount() === 4){
                index = '5';
                for(var l in me.detail_type){
                    if(store.data.items[0].data.name === me.detail_type[l].value){ num[l] = 'z'; }
                    else if(store.data.items[1].data.name === me.detail_type[l].value){ num[l] = 'z'; }
                    else if(store.data.items[2].data.name === me.detail_type[l].value){ num[l] = 'z'; }
                    else if(store.data.items[3].data.name === me.detail_type[l].value){ num[l] = 'z'; }
                }

                for(l in num){
                    if(num[l] < next){ next = l; }
                }

                record.push({
                    'name' : me.detail_type[next].value,
                    'content' : '',
                    'port' : ''
                });
            }
            else if(store.getCount() === 5){
                index = '6';
                for(var m in me.detail_type){
                    if(store.data.items[0].data.name === me.detail_type[m].value){ num[m] = 'z'; }
                    else if(store.data.items[1].data.name === me.detail_type[m].value){ num[m] = 'z'; }
                    else if(store.data.items[2].data.name === me.detail_type[m].value){ num[m] = 'z'; }
                    else if(store.data.items[3].data.name === me.detail_type[m].value){ num[m] = 'z'; }
                    else if(store.data.items[4].data.name === me.detail_type[m].value){ num[m] = 'z'; }
                }

                for(m in num){
                    if(num[m] < next){ next = m; }
                }

                record.push({
                    'name' : me.detail_type[next].value,
                    'content' : '',
                    'port' : ''
                });
            }
            me.tracker_cnt++;

            Ext.getCmp('tracker_detail_grid').getStore().suspendEvents();
            Ext.getCmp('tracker_detail_grid').getStore().add(record);
            Ext.getCmp('tracker_detail_grid').getStore().resumeEvents();

            if(me.tracker_cnt === max){ Ext.getCmp('tracker_detail_add_con1').disable(true); }
            else{ Ext.getCmp('tracker_detail_add_con1').enable(true); }

        //     Ext.resumeLayouts();
            Ext.getCmp('tracker_detail_grid').getView().refresh();
        }, component);
    },

    onTracker_graph_chk1Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('tracker_graph_chk2').setValue(false);
            Ext.getCmp('tracker_graph_chk3').setValue(false);
        }
    },

    onLabelRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('tracker_graph_chk1').getValue()){ Ext.getCmp('tracker_graph_chk1').setValue(true); }
        }, component);
    },

    onTracker_graph_chk2Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('tracker_graph_chk1').setValue(false);
            Ext.getCmp('tracker_graph_chk3').setValue(false);
        }
    },

    onLabelRender1: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('tracker_graph_chk2').getValue()){ Ext.getCmp('tracker_graph_chk2').setValue(true); }
        }, component);
    },

    onTracker_graph_chk3Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('tracker_graph_chk2').setValue(false);
            Ext.getCmp('tracker_graph_chk1').setValue(false);
        }
    },

    onFormAfterRender: function(component, eOpts) {
        var me = Ext.getCmp('win_setting_tracker');
        me.change_chk = false;
        me.change_click = false;
        me.next_number = 0;
        me.tracker_cnt = 1;
        me.detail_type = [];
        me.detail_type.push({'value' : 'sip'},{'value' : 'dip'},{'value' : 'protocol,dport'},{'value' : 'spd_id'},{'value' : 'country'},{'value':'service'});
        this.fieldInfo = makeZenTip();
        chk_zenauth(null);
        // Ext.suspendLayouts();
        me.setTitle(__zen('tracker_set'));
        if(me.day_chk === true){
            Ext.getCmp('tracker_graph_chk3').disable(true);
        }
        else{
            Ext.getCmp('tracker_graph_chk3').enable(true);
        }

        var time_records = [];
        for(var j = 0;j<25;j++){
            var time_s = String(j);
            var hour_s;
            if(time_s.length === 1){ hour_s = "0"+time_s; }
            else{ hour_s = time_s; }

            time_records.push({
                'hour' : hour_s
            });
        }

        var time_store = {
            data: time_records,
            fields: [
                {
                    name: 'hour'
                }
            ]
        };

        Ext.getCmp('tracker_time_combo1').bindStore(time_store);
        Ext.getCmp('tracker_timeend_combo1').bindStore(time_store);

        var detail_store = {
            data : [
                {
                    'name' : 'sip',
                    'content' : '',
                    'port' : ''
                }

            ],
            fields: [
                {
                    name: 'name'
                },{
                    name: 'content'
                },{
                    name: 'port'
                }
            ]
        };

        Ext.getCmp('tracker_detail_grid').reconfigure(detail_store);

        if(me.edit === "add"){
            var combo = Ext.getCmp('tracker_time_combo1').getStore().data;

            if(combo.length > 0){
                Ext.getCmp('tracker_time_combo1').setValue(combo.items[0].data['hour']);
            }

            var combo2 = Ext.getCmp('tracker_timeend_combo1').getStore().data;

            if(combo2.length > 0){
                Ext.getCmp('tracker_timeend_combo1').setValue(combo2.items[24].data['hour']);
            }

        }
        else{
            var store = Ext.getCmp('tracker_detail_grid').getStore();

            var records = [];
            console.log(me.record.detail);
            for(var i in me.record.detail){
                var port;
                var content;
                if(me.record.detail[i].port === undefined){ port = ""; }
                else{ port = me.record.detail[i].port; }
                if(me.record.detail[i].content === undefined){ content = ""; }
                else{ content = me.record.detail[i].content; }
                records.push({
                    'name' : me.record.detail[i].type,
                    'content' : content,
                    'port' : port
                });
            }
            store.suspendEvents();
            store.loadData(records);
            store.resumeEvents();

            var max;

            if(Ext.getCmp('tracker_type_combo1').getValue() === "fw"){ max = 5; }
            else if(Ext.getCmp('tracker_type_combo1').getValue() === "http"){ max = 3; }
            else if(Ext.getCmp('tracker_type_combo1').getValue() === "app"){ max = 6; }
            else if(Ext.getCmp('tracker_type_combo1').getValue() === "vpn"){ max = 4; }
            else if(Ext.getCmp('tracker_type_combo1').getValue() === "ips"){ max = 4; }

            if(store.getCount() === max){ Ext.getCmp('tracker_detail_add_con1').disable(true); }
            else{ Ext.getCmp('tracker_detail_add_con1').enable(true); }
            if(store.getCount() === 1){ Ext.getCmp('tracker_detail_del_btn1').items[0].disabled = true; }
            else{ Ext.getCmp('tracker_detail_del_btn1').items[0].disabled = false; }

            Ext.getCmp('tracker_name1').setValue(me.record.desc);
            Ext.getCmp('tracker_time_combo1').setValue(me.record.basic[0].start);
            Ext.getCmp('tracker_timeend_combo1').setValue(me.record.basic[0].end);
            Ext.getCmp('tracker_output_combo1').setValue(me.record.basic[0].show_count);
            Ext.getCmp('tracker_type_combo1').setValue(me.record.basic[0].type);
            Ext.getCmp('tracker_action_combo1').setValue(me.record.basic[0].op_mode);
            Ext.getCmp('tracker_class_combo1').setValue(me.record.basic[0].work);
            Ext.getCmp('tracker_sortrole_combo1').setValue(me.record.basic[0].order_type);
            Ext.getCmp('tracker_sort_combo1').setValue(me.record.basic[0].sort);
            Ext.getCmp('tracker_comp_combo1').setValue(me.record.basic[0].bound);

            if(me.record.graph[0] === "on"){ Ext.getCmp('tracker_graph_chk1').setValue(true); }
            if(me.record.graph[1] === "on"){ Ext.getCmp('tracker_graph_chk2').setValue(true); }
            if(me.record.graph[2] === "on"){ Ext.getCmp('tracker_graph_chk3').setValue(true); }
        }

        // Ext.resumeLayouts();
    },

    onWin_setting_trackerBeforeRender: function(component, eOpts) {
        var record = [];

        record = [
            {
                'name' : __zen('src'),
                'value' : __zen('sip')
            }
        ];

        Ext.data.StoreManager.lookup('store_atoz_tracker_edit').loadData(record);
    },

    onTracker_add_btnClick: function(button, e, eOpts) {
        var me = this;
        var store = Ext.getCmp('tracker_grid').getStore();
        var tracker_store = Ext.getCmp('tracker_detail_grid').getStore();
        var criteria = "";

        if(Ext.getCmp('tracker_name1').isValid() === false){ Ext.getCmp('tracker_name1').focus(); return false; }
        if(Ext.getCmp('tracker_detail_grid').getStore().getCount() > 1){
            for(var j = 0;j < tracker_store.data.items.length-1;j++){
                if(me.tracker_detail_validation(tracker_store.data.items[j].data.content,j,tracker_store.data.items[j].data.name) !== true){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(me.tracker_detail_validation(tracker_store.data.items[j].data.content,j,tracker_store.data.items[j].data.name));
                    me.set_btn = true;
                    Ext.getCmp('tracker_detail_grid').getPlugin('tracker_detail_plug').startEdit(Number(j), 3);
                    return false;
                }
                if(me.tracker_detail_p_validation(tracker_store.data.items[j].data.port,j,tracker_store.data.items[j].data.name) !== true){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(me.tracker_detail_p_validation(tracker_store.data.items[j].data.port,j,tracker_store.data.items[j].data.name));
                    me.set_btn = true;
                    Ext.getCmp('tracker_detail_grid').getPlugin('tracker_detail_plug').startEdit(Number(j), 5);
                    return false;
                }
            }
        }

        var records = [];

        for(var i in store.data.items){
            records.push(store.data.items[i].data);
        }

        var detail = [];
        var detail_criteria = [];
        for(var j in tracker_store.data.items){
            detail.push({
                'type' : tracker_store.data.items[j].data.name,
                'content' : tracker_store.data.items[j].data.content,
                'port' : tracker_store.data.items[j].data.port,
                'mode' : Number(j)+1
            });

            if(tracker_store.data.items[j].data.content !== ""){
                if(tracker_store.data.items[j].data.name !== "protocol,dport"){
                    detail_criteria.push("{"+"\""+tracker_store.data.items[j].data.name+"\":\""+tracker_store.data.items[j].data.content+"\"}");
                }
                else{
                    var temp_name = tracker_store.data.items[j].data.name.split(',');
                    detail_criteria.push("{"+"\""+temp_name[0]+"\":\""+me.getProtocolNum(tracker_store.data.items[j].data.content)+"\"},{"+"\""+temp_name[1]+"\":\""+tracker_store.data.items[j].data.port+"\"}");
                }
            }
        }
        var sum_detail = detail_criteria.join(',');
        if(Ext.getCmp('tracker_type_combo1').getValue() === "fw"){
            if(Ext.getCmp('tracker_action_combo1').getValue() === '0'){
                if(Ext.getCmp('tracker_comp_combo1').getValue() === 'all'){
                    criteria = '{'+'"and":['+sum_detail+'],'+'"or":[{"action":1},{"action":2}]}';
                }
                else if(Ext.getCmp('tracker_comp_combo1').getValue() === 'internal'){
                    criteria = '{"and":[{"direction":1},'+sum_detail+'],"or":[{"action":1},{"action":2}]}';
                }
                else if(Ext.getCmp('tracker_comp_combo1').getValue() === 'external'){
                    criteria = '{"and":[{"direction":2},'+sum_detail+'],"or":[{"action":1},{"action":2}]}';
                }
                else if(Ext.getCmp('tracker_comp_combo1').getValue() === 'dmz'){
                    criteria = '{"and":[{"direction":3},'+sum_detail+'],"or":[{"action":1},{"action":2}]}';
                }
                else{
                    criteria = '{"and":[{"direction":4},'+sum_detail+'],"or":[{"action":1},{"action":2}]}';
                }
            }
            else{
                if(Ext.getCmp('tracker_comp_combo1').getValue() === 'all'){
                    criteria = '{"and":[{"action":0},'+sum_detail+']}';
                }
                else if(Ext.getCmp('tracker_comp_combo1').getValue() === 'internal'){
                    criteria = '{"and":[{"direction":1},{"action":0},'+sum_detail+']}';
                }
                else if(Ext.getCmp('tracker_comp_combo1').getValue() === 'external'){
                    criteria = '{"and":[{"direction":2},{"action":0},'+sum_detail+']}';
                }
                else if(Ext.getCmp('tracker_comp_combo1').getValue() === 'dmz'){
                    criteria = '{"and":[{"direction":3},{"action":0},'+sum_detail+']}';
                }
                else{
                    criteria = '{"and":[{"direction":4},{"action":0},'+sum_detail+']}';
                }
            }
        }
        else if(Ext.getCmp('tracker_type_combo1').getValue() === "app"){
            if(Ext.getCmp('tracker_action_combo1').getValue() === '0'){
                criteria = '{"and":[{"event":318963713}]}';
            }
            else{
                criteria = '{"and":[{"event":318963714}]}';
            }
        }
        else if(Ext.getCmp('tracker_type_combo1').getValue() === "http"){
            if(Ext.getCmp('tracker_action_combo1').getValue() === '0'){
                criteria = '';
            }
            else if(Ext.getCmp('tracker_action_combo1').getValue() === '1'){
                criteria = '{"and":[{"event":318898177}]}';
            }
            else if(Ext.getCmp('tracker_action_combo1').getValue() === '2'){
                criteria = '{"and":[{"event":318898178}]}';
            }
            else if(Ext.getCmp('tracker_action_combo1').getValue() === '3'){
                criteria = '{"and":[{"event":318898179}]}';
            }
            else{
                criteria = '{"and":[{"event":318898181}]}';
            }
        }
        else if(Ext.getCmp('tracker_type_combo1').getValue() === "ips"){
            if(Ext.getCmp('tracker_action_combo1').getValue() === '0'){
                criteria = '{"and":[{"block_type":"detect"}]}';
            }
            else if(Ext.getCmp('tracker_action_combo1').getValue() === '1'){
                criteria = '{"and":[{"block_type":"block"}]}';
            }
        }

        var desc = Ext.getCmp('tracker_name1').getValue();
        var basic = [];
        basic.push({
            'criteria' : criteria,
            'start' : Ext.getCmp('tracker_time_combo1').getValue(),
            'end' : Ext.getCmp('tracker_timeend_combo1').getValue(),
            'show_count' : Ext.getCmp('tracker_output_combo1').getValue(),
            'type' : Ext.getCmp('tracker_type_combo1').getValue(),
            'op_mode' : Ext.getCmp('tracker_action_combo1').getValue(),
            'work' : Ext.getCmp('tracker_class_combo1').getValue(),
            'order_type' : Ext.getCmp('tracker_sortrole_combo1').getValue(),
            'sort' : Ext.getCmp('tracker_sort_combo1').getValue(),
            'bound' : Ext.getCmp('tracker_comp_combo1').getValue()
        });

        var prev = "off";
        var bas = "off";
        var daily = "off";

        if(Ext.getCmp('tracker_graph_chk1').getValue()){ prev = "on"; }
        if(Ext.getCmp('tracker_graph_chk2').getValue()){ bas = "on"; }
        if(Ext.getCmp('tracker_graph_chk3').getValue()){ daily = "on"; }

        var graph = [];
        graph.push(prev);
        graph.push(bas);
        graph.push(daily);

        if(me.edit === "add"){
            records.push({
                'desc' : desc,
                'basic' : basic,
                'detail' : detail,
                'graph' : graph
            });

            store.loadData(records);
        }
        else{
            var input = [];
            input.push({
                'desc' : desc,
                'basic' : basic,
                'detail' : detail,
                'graph' : graph
            });

            store.removeAt(me.edit_cnt, 1);
            store.insert(me.edit_cnt, input);
        }

        this.close();
    },

    onTracker_del_btn1Click: function(button, e, eOpts) {
        // var me = Ext.getCmp('win_setting_tracker');
        // if(me.edit === "edit"){
        //     var store = Ext.getCmp('tracker_grid').getStore();
        //     var record = [];

        //     for(var i in me.back_up){
        //         record.push(me.back_up[i]);
        //     }

        //     store.loadData(record);
        // }

        this.close();
    },

    tracker_detail_validation: function(value, index, type) {
        var store = Ext.getCmp('tracker_detail_grid').getStore();

        if(!CheckNotNull(value)){ return get_msg('err_null'); }

        if(type === "sip" || type === "dip"){
            if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
        }
        else if(type === "url"){
            if(!ValidURL(value)){ return get_msg('err_form'); }
        }


        return true;
    },

    tracker_detail_p_validation: function(value, index, type) {
        var store = Ext.getCmp('tracker_detail_grid').getStore();

        if(type === "protocol,dport"){
            if(!CheckNotNull(value)){ return get_msg('err_null'); }
            if(Number(value) < 1 || Number(value) > 65535){ return ValidLimit(1,65535); }
        }

        return true;
    },

    getProtocolNum: function(type) {
        var temp = type.toUpperCase();
        if (temp === null) return "";
        var msg = 0;
        switch (temp) {
            case  "IP":   msg = 0; break;
            case  "ICMP":   msg = 1; break;
            case  "IGMP":   msg = 2; break;
            case  "IPIP":   msg = 4; break;
            case  "TCP":   msg = 6; break;
            case  "EGP":   msg = 8; break;
            case  "IGRP":   msg = 9; break;
            case  "PUP":   msg = 12; break;
            case  "UDP":   msg = 17; break;
            case  "IDP":   msg = 22; break;
            case  "TP":   msg = 29; break;
            case  "IPV6":   msg = 41; break;
            case  "ROUTING":   msg = 43; break;
            case  "FRAGMENT":   msg = 44; break;
            case  "RSVP":   msg = 46; break;
            case  "GRE":   msg = 47; break;
            case  "ESP":   msg = 50; break;
            case  "AH":   msg = 51; break;
            case  "SKIP":   msg = 57; break;
            case  "ICMPV6":   msg = 58; break;
            case  "NONE":   msg = 59; break;
            case  "DSTOPTS":   msg = 60; break;
            case  "EIGRP":   msg = 88; break;
            case  "OSPF":   msg = 89; break;
            case  "MTP":   msg = 92; break;
            case  "PIM":   msg = 103; break;
            case  "COMP":   msg = 108; break;
            case  "L2TP":   msg = 115; break;
            case  "ISIS":   msg = 124; break;
            case  "RIP":   msg = 520; break;

            default :   msg = "";
        }
        console.log(msg);
        return msg;
    }

});