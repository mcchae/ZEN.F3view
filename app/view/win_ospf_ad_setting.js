
Ext.define('NFW2.view.win_ospf_ad_setting', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ospf_ad_setting',

    requires: [
        'NFW2.view.win_ospf_ad_settingViewModel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.column.Action',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'win_ospf_ad_setting'
    },
    id: 'win_ospf_ad_setting',
    title: 'My Window',
    defaultListenerScope: true,

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            padding: 0,
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
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onButtonClick1'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWin_ospf_ad_settingAfterRender',
        render: 'onWin_ospf_ad_settingRender'
    },

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
                                margin: '8 0 0 0',
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            me.processOspf_ad_chk11({
                                                xtype: 'checkboxfield',
                                                hidden: true,
                                                id: 'ospf_ad_chk11',
                                                fieldLabel: '&nbsp;',
                                                hideEmptyLabel: false,
                                                labelCls: 'lb_req',
                                                labelSeparator: ' ',
                                                labelWidth: 0,
                                                checked: true,
                                                bind: {
                                                    boxLabel: '{distance}'
                                                },
                                                listeners: {
                                                    change: 'onOspf_ad_chk1Change'
                                                }
                                            }),
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value !== true){
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(Number(value) < 1 || Number(value) > 255){ return ValidLimit(1,255); }
                                                    }

                                                    return true;
                                                },
                                                fieldInfo: {
                                                    txt: msg_tip_length(1,
                                                    255,
                                                    null)
                                                },
                                                id: 'ospf_ad_distance',
                                                margin: '8 0 10 0',
                                                labelCls: 'lb_req',
                                                labelSeparator: ' ',
                                                labelWidth: 150,
                                                msgTarget: 'none',
                                                value: 110,
                                                enforceMaxLength: true,
                                                maskRe: /[0-9]/,
                                                maxLength: 3,
                                                bind: {
                                                    fieldLabel: '{distance}'
                                                },
                                                listeners: {
                                                    focus: 'onOspf_ad_distanceFocus',
                                                    blur: 'onOspf_ad_distanceBlur',
                                                    errorchange: 'onOspf_ad_distanceErrorChange'
                                                }
                                            }
                                        ],
                                        listeners: {
                                            render: 'onFieldsetRender'
                                        }
                                    },
                                    {
                                        xtype: 'fieldset',
                                        margin: '8 0 0 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'checkboxfield',
                                                hidden: true,
                                                id: 'ospf_ad_chk21',
                                                fieldLabel: '&nbsp;',
                                                hideEmptyLabel: false,
                                                labelCls: 'lb_req',
                                                labelSeparator: ' ',
                                                labelWidth: 0,
                                                boxLabel: 'Default Information',
                                                checked: true,
                                                listeners: {
                                                    change: 'onOspf_ad_chk2Change'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                id: 'ospf_ad_info',
                                                margin: '8 0 10 0',
                                                maxHeight: 26,
                                                fieldLabel: 'Defulat Infomation',
                                                labelCls: 'lb_req',
                                                labelSeparator: ' ',
                                                labelWidth: 150,
                                                editable: false,
                                                displayField: 'name',
                                                queryMode: 'local',
                                                store: {
                                                    data: [
                                                        {
                                                            name: 'None',
                                                            value: 'none'
                                                        },
                                                        {
                                                            name: 'Originate',
                                                            value: 'originate'
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
                                                listeners: {
                                                    afterrender: 'onOspf_ad_infoAfterRender'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                id: 'ospf_ad_info_con',
                                                margin: '8 0 10 10',
                                                items: [
                                                    {
                                                        xtype: 'checkboxfield',
                                                        id: 'ospf_ad_info_chk1',
                                                        boxLabel: 'Always'
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        layout: {
                                                            type: 'hbox',
                                                            align: 'stretch'
                                                        },
                                                        items: [
                                                            me.processOspf_ad_info_chk2({
                                                                xtype: 'checkboxfield',
                                                                id: 'ospf_ad_info_chk2',
                                                                bind: {
                                                                    boxLabel: '{metric}'
                                                                },
                                                                listeners: {
                                                                    change: 'onCheckboxfieldChange'
                                                                }
                                                            }),
                                                            {
                                                                xtype: 'textfield',
                                                                validator: function(value) {
                                                                    if(value !== true){
                                                                        var _value = removeComma(value);
                                                                        if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                                        if(Number(_value) < 0 || Number(_value) > 16777214){ return ValidLimit(0,16777214); }
                                                                    }

                                                                    return true;
                                                                },
                                                                fieldInfo: {
                                                                    txt: msg_tip_length(0,
                                                                    16777214,
                                                                    null)
                                                                },
                                                                flex: 1,
                                                                disabled: true,
                                                                id: 'ospf_ad_info_metric',
                                                                margin: '0 0 0 20',
                                                                width: 120,
                                                                msgTarget: 'none',
                                                                value: 10,
                                                                enforceMaxLength: true,
                                                                maxLength: 10,
                                                                listeners: {
                                                                    focus: 'onTextfieldFocus',
                                                                    blur: 'onTextfieldBlur',
                                                                    errorchange: 'onTextfieldErrorChange',
                                                                    change: 'onTextfieldChange'
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ],
                                        listeners: {
                                            render: 'onFieldsetRender1'
                                        }
                                    },
                                    {
                                        xtype: 'fieldset',
                                        margin: '8 0 0 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'checkboxfield',
                                                hidden: true,
                                                id: 'ospf_ad_chk31',
                                                fieldLabel: '&nbsp;',
                                                labelCls: 'lb_req',
                                                labelSeparator: ' ',
                                                labelWidth: 0,
                                                boxLabel: 'Redistribute',
                                                checked: true,
                                                listeners: {
                                                    change: 'onOspf_ad_chk3Change'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                id: 'ospf_ad_redis_con',
                                                margin: '8 0 10 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'checkboxfield',
                                                        id: 'ospf_ad_redis_chk1',
                                                        fieldLabel: 'Redistribute',
                                                        labelCls: 'lb_req',
                                                        labelSeparator: ' ',
                                                        labelWidth: 155,
                                                        boxLabel: 'Static',
                                                        checked: true,
                                                        listeners: {
                                                            change: 'onOspf_ad_redis_chk1Change',
                                                            blur: 'onOspf_ad_redis_chk1Blur'
                                                        }
                                                    },
                                                    me.processOspf_ad_redis_chk2({
                                                        xtype: 'checkboxfield',
                                                        id: 'ospf_ad_redis_chk2',
                                                        margin: '0 0 0 50',
                                                        width: 85,
                                                        bind: {
                                                            boxLabel: '{rip}'
                                                        },
                                                        listeners: {
                                                            change: 'onOspf_ad_redis_chk2Change',
                                                            blur: 'onOspf_ad_redis_chk2Blur'
                                                        }
                                                    }),
                                                    me.processOspf_ad_redis_chk3({
                                                        xtype: 'checkboxfield',
                                                        id: 'ospf_ad_redis_chk3',
                                                        width: 100,
                                                        bind: {
                                                            boxLabel: '{bgp}'
                                                        },
                                                        listeners: {
                                                            change: 'onOspf_ad_redis_chk3Change',
                                                            blur: 'onOspf_ad_redis_chk3Blur'
                                                        }
                                                    })
                                                ]
                                            }
                                        ],
                                        listeners: {
                                            render: 'onFieldsetRender2'
                                        }
                                    },
                                    {
                                        xtype: 'fieldset',
                                        margin: '8 0 10 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'checkboxfield',
                                                hidden: true,
                                                id: 'ospf_ad_chk41',
                                                fieldLabel: '&nbsp;',
                                                labelCls: 'lb_req',
                                                labelSeparator: ' ',
                                                labelWidth: 0,
                                                boxLabel: 'ABR Type',
                                                checked: true,
                                                listeners: {
                                                    change: 'onOspf_ad_chk4Change'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                id: 'ospf_ad_type',
                                                margin: '8 0 10 0',
                                                fieldLabel: 'ABR Type',
                                                labelCls: 'lb_req',
                                                labelSeparator: ' ',
                                                labelWidth: 150,
                                                editable: false,
                                                displayField: 'name',
                                                queryMode: 'local',
                                                store: {
                                                    data: [
                                                        {
                                                            name: 'Standard',
                                                            value: 'standard'
                                                        },
                                                        {
                                                            name: 'Cisco',
                                                            value: 'cisco'
                                                        },
                                                        {
                                                            name: 'IBM',
                                                            value: 'ibm'
                                                        },
                                                        {
                                                            name: 'Shortcut',
                                                            value: 'shortcut'
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
                                                listeners: {
                                                    afterrender: 'onOspf_ad_typeAfterRender'
                                                }
                                            }
                                        ],
                                        listeners: {
                                            render: 'onFieldsetRender3'
                                        }
                                    },
                                    {
                                        xtype: 'fieldset',
                                        items: [
                                            {
                                                xtype: 'container',
                                                disabled: true,
                                                id: 'ospf_ad_static_con',
                                                margin: '8 0 10 0',
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        width: 540,
                                                        layout: {
                                                            type: 'hbox',
                                                            align: 'stretch',
                                                            pack: 'end'
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'container',
                                                                flex: 1
                                                            },
                                                            {
                                                                xtype: 'button',
                                                                cls: 'btn_b',
                                                                iconCls: 'icb_add',
                                                                bind: {
                                                                    text: '{add}'
                                                                },
                                                                listeners: {
                                                                    click: 'onButtonClick2'
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'gridpanel',
                                                        id: 'ospf_ad_static_grid',
                                                        margin: '8 0 0 0',
                                                        maxHeight: 100,
                                                        scrollable: {
                                                            x: false,
                                                            y: true
                                                        },
                                                        width: 540,
                                                        header: false,
                                                        title: 'My Grid Panel',
                                                        allowDeselect: true,
                                                        disableSelection: true,
                                                        columns: [
                                                            {
                                                                xtype: 'gridcolumn',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdCls = 'cell_text';
                                                                    return value;
                                                                },
                                                                sortable: false,
                                                                dataIndex: 'ipaddr',
                                                                menuDisabled: true,
                                                                flex: 1.5,
                                                                bind: {
                                                                    text: '{ip_mask}'
                                                                },
                                                                editor: {
                                                                    xtype: 'textfield',
                                                                    baseCls: 'cell_text',
                                                                    maskRe: /[0-9.\/]/,
                                                                    listeners: {
                                                                        focus: 'onTextfieldFocus1',
                                                                        blur: 'onTextfieldBlur1'
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                sortable: false,
                                                                menuDisabled: true,
                                                                bind: {
                                                                    text: '{option}'
                                                                },
                                                                columns: [
                                                                    {
                                                                        xtype: 'gridcolumn',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = 'cell_combo';

                                                                            if(value === "A.B.C.D" || value === "null0"){
                                                                                return value;
                                                                            }
                                                                            else{
                                                                                return value.charAt(0).toUpperCase() + value.slice(1);
                                                                            }
                                                                        },
                                                                        height: 0,
                                                                        dataIndex: 'type',
                                                                        text: 'Number',
                                                                        editor: {
                                                                            xtype: 'combobox',
                                                                            baseCls: 'cell_combo',
                                                                            editable: false,
                                                                            displayField: 'name',
                                                                            queryMode: 'local',
                                                                            store: {
                                                                                data: [
                                                                                    {
                                                                                        name: 'null0',
                                                                                        value: 'null0'
                                                                                    },
                                                                                    {
                                                                                        name: 'Blackhole',
                                                                                        value: 'blackhole'
                                                                                    },
                                                                                    {
                                                                                        name: 'Reject',
                                                                                        value: 'reject'
                                                                                    },
                                                                                    {
                                                                                        name: 'A.B.C.D',
                                                                                        value: 'A.B.C.D'
                                                                                    },
                                                                                    {
                                                                                        name: 'Interface',
                                                                                        value: 'interface'
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
                                                                            listeners: {
                                                                                focus: 'onComboboxFocus',
                                                                                collapse: 'onComboboxCollapse'
                                                                            }
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'gridcolumn',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            if(record.data.type === "A.B.C.D"){
                                                                                metaData.tdCls = 'cell_text';
                                                                                return value;
                                                                            }else if(record.data.type === "interface"){
                                                                                metaData.tdCls = 'cell_combo';
                                                                                return value;
                                                                            }
                                                                            else if(record.data.type === "null0"){
                                                                                return record.data.type;
                                                                            }
                                                                            else{
                                                                                return record.data.type.charAt(0).toUpperCase() + record.data.type.slice(1);
                                                                            }
                                                                        },
                                                                        getEditor: function(record) {
                                                                            if(record.data.type === 'A.B.C.D'){
                                                                                return Ext.create('Ext.grid.CellEditor', {
                                                                                    field: Ext.create( 'Ext.form.field.Text', {
                                                                                        baseCls:'cell_text',
                                                                                        maskRe:/[0-9.]/,
                                                                                        listeners:{
                                                                                            focus: function(component, event, eOpts){
                                                                                                var str = disp_help_ip('4s');
                                                                                                component.fieldInfo = str;

                                                                                                setTipFocus(Ext.getCmp('win_ospf_ad_setting'), component);
                                                                                            },
                                                                                            blur: function(component, event, eOpts){
                                                                                                setTipBlur(Ext.getCmp('win_ospf_ad_setting'), component);
                                                                                                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                                                                                                err_fl.removeCls('ic_msg_err');
                                                                                                err_fl.update('');
                                                                                            }
                                                                                        }
                                                                                    })
                                                                                });
                                                                            }
                                                                            else if(record.data.type === 'interface'){
                                                                                return Ext.create('Ext.grid.CellEditor', {
                                                                                    field: Ext.create( 'Ext.form.field.ComboBox', {
                                                                                        editable: false,
                                                                                        displayField: 'name',
                                                                                        valueField: 'name',
                                                                                        queryMode: 'local',
                                                                                        baseCls:'cell_combo',
                                                                                        store:'store_nw_protocol_inter',
                                                                                        listeners: {
                                                                                            focus: function(component){ component.expand(); }
                                                                                        }
                                                                                    })
                                                                                });
                                                                            }

                                                                            return "";
                                                                        },
                                                                        height: 0,
                                                                        dataIndex: 'opt',
                                                                        text: 'Date'
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdCls = 'cell_text';
                                                                    return value;
                                                                },
                                                                sortable: false,
                                                                dataIndex: 'sub_opt',
                                                                menuDisabled: true,
                                                                text: '보조 옵션',
                                                                flex: 1,
                                                                editor: {
                                                                    xtype: 'textfield',
                                                                    baseCls: 'cell_text'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'actioncolumn',
                                                                width: 45,
                                                                align: 'center',
                                                                menuDisabled: true,
                                                                items: [
                                                                    {
                                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                            var store = Ext.getCmp('ospf_ad_static_grid').getStore();

                                                                            store.removeAt(rowIndex,1);
                                                                        },
                                                                        iconCls: 'icr_del'
                                                                    }
                                                                ]
                                                            }
                                                        ],
                                                        viewConfig: {
                                                            markDirty: false
                                                        },
                                                        plugins: [
                                                            {
                                                                ptype: 'cellediting',
                                                                pluginId: 'ospf_ad_static_plug',
                                                                clicksToEdit: 1
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ],
                                        listeners: {
                                            render: 'onFieldsetRender4'
                                        }
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

    processOspf_ad_chk11: function(config) {
        config.boxLabel = true;

        return config;
    },

    processOspf_ad_info_chk2: function(config) {
        config.boxLabel = true;

        return config;
    },

    processOspf_ad_redis_chk2: function(config) {
        config.boxLabel = true;

        return config;
    },

    processOspf_ad_redis_chk3: function(config) {
        config.boxLabel = true;

        return config;
    },

    onOspf_ad_chk1Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('ospf_ad_distance').enable(true);
        }
        else{
            Ext.getCmp('ospf_ad_distance').disable(true);
        }
    },

    onOspf_ad_distanceFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onOspf_ad_distanceBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onOspf_ad_distanceErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onFieldsetRender: function(component, eOpts) {
        component.setTitle(__zen('distance'));

        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'ospf_ad_chk1',
            style:'margin-left:165px',
            resizeHandle: false,
            state: true,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    if(newValue){
                        Ext.getCmp('ospf_ad_distance').enable(true);
                    }
                    else{
                        Ext.getCmp('ospf_ad_distance').disable(true);
                    }
                }
            }
        });

        component.legend.add(tbutton);
    },

    onOspf_ad_chk2Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('ospf_ad_info').enable(true);
            Ext.getCmp('ospf_ad_info_con').enable(true);
        }
        else{
            Ext.getCmp('ospf_ad_info').disable(true);
            Ext.getCmp('ospf_ad_info_con').disable(true);
        }
    },

    onOspf_ad_infoAfterRender: function(component, eOpts) {
        component.setValue(component.getStore().data.items[1].data.value);
    },

    onCheckboxfieldChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('ospf_ad_info_metric').enable(true);
        }
        else{
            Ext.getCmp('ospf_ad_info_metric').disable(true);
        }
    },

    onTextfieldFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onTextfieldBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onTextfieldErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onTextfieldChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFieldsetRender1: function(component, eOpts) {
        component.setTitle('Default Infomation');

        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'ospf_ad_chk2',
            style:'margin-left:165px',
            resizeHandle: false,
            state: true,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    if(newValue){
                        Ext.getCmp('ospf_ad_info').enable(true);
                        Ext.getCmp('ospf_ad_info_con').enable(true);
                    }
                    else{
                        Ext.getCmp('ospf_ad_info').disable(true);
                        Ext.getCmp('ospf_ad_info_con').disable(true);
                    }
                }
            }
        });

        component.legend.add(tbutton);
    },

    onOspf_ad_chk3Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('ospf_ad_redis_con').enable(true);
        }
        else{
            Ext.getCmp('ospf_ad_redis_con').disable(true);
        }
    },

    onOspf_ad_redis_chk1Change: function(field, newValue, oldValue, eOpts) {
        var chk = false;
        if(Ext.getCmp('ospf_ad_redis_chk1').getValue()){ chk = true; }
        if(Ext.getCmp('ospf_ad_redis_chk2').getValue()){ chk = true; }
        if(Ext.getCmp('ospf_ad_redis_chk3').getValue()){ chk = true; }

        if(chk === false){
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].update(get_msg('err_select'));
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].addCls('ic_msg_err');
        }
        else{
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].update('');
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].removeCls('ic_msg_err');
        }
    },

    onOspf_ad_redis_chk1Blur: function(component, event, eOpts) {
        Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].update('');
        Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].removeCls('ic_msg_err');
    },

    onOspf_ad_redis_chk2Change: function(field, newValue, oldValue, eOpts) {
        var chk = false;
        if(Ext.getCmp('ospf_ad_redis_chk1').getValue()){ chk = true; }
        if(Ext.getCmp('ospf_ad_redis_chk2').getValue()){ chk = true; }
        if(Ext.getCmp('ospf_ad_redis_chk3').getValue()){ chk = true; }

        if(chk === false){
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].update(get_msg('err_select'));
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].addCls('ic_msg_err');
        }
        else{
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].update('');
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].removeCls('ic_msg_err');
        }
    },

    onOspf_ad_redis_chk2Blur: function(component, event, eOpts) {
        Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].update('');
        Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].removeCls('ic_msg_err');
    },

    onOspf_ad_redis_chk3Change: function(field, newValue, oldValue, eOpts) {
        var chk = false;
        if(Ext.getCmp('ospf_ad_redis_chk1').getValue()){ chk = true; }
        if(Ext.getCmp('ospf_ad_redis_chk2').getValue()){ chk = true; }
        if(Ext.getCmp('ospf_ad_redis_chk3').getValue()){ chk = true; }

        if(chk === false){
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].update(get_msg('err_select'));
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].addCls('ic_msg_err');
        }
        else{
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].update('');
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].removeCls('ic_msg_err');
        }
    },

    onOspf_ad_redis_chk3Blur: function(component, event, eOpts) {
        Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].update('');
        Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].removeCls('ic_msg_err');
    },

    onFieldsetRender2: function(component, eOpts) {
        component.setTitle('Redistribute');

        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'ospf_ad_chk3',
            style:'margin-left:165px',
            resizeHandle: false,
            state: true,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    if(newValue){
                        Ext.getCmp('ospf_ad_redis_con').enable(true);
                    }
                    else{
                        Ext.getCmp('ospf_ad_redis_con').disable(true);
                    }
                }
            }
        });

        component.legend.add(tbutton);
    },

    onOspf_ad_chk4Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('ospf_ad_type').enable(true);
        }
        else{
            Ext.getCmp('ospf_ad_type').disable(true);
        }
    },

    onOspf_ad_typeAfterRender: function(component, eOpts) {
        component.setValue(component.getStore().data.items[0].data.value);
    },

    onFieldsetRender3: function(component, eOpts) {
        component.setTitle('ABR Type');

        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'ospf_ad_chk4',
            style:'margin-left:165px',
            resizeHandle: false,
            state: true,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    if(newValue){
                        Ext.getCmp('ospf_ad_type').enable(true);
                    }
                    else{
                        Ext.getCmp('ospf_ad_type').disable(true);
                    }
                }
            }
        });

        component.legend.add(tbutton);
    },

    onButtonClick2: function(button, e, eOpts) {
        var record = [];

        record.push({
            'ipaddr':'',
            'type':'null0',
            'opt':'',
            'sub-opt':''
        });

        Ext.getCmp('ospf_ad_static_grid').getStore().add(record);
    },

    onTextfieldFocus1: function(component, event, eOpts) {
        var str = disp_help_ip('4s2m');
        component.fieldInfo = str;

        setTipFocus(Ext.getCmp('win_ospf_ad_setting'),component);
    },

    onTextfieldBlur1: function(component, event, eOpts) {
        setTipBlur(Ext.getCmp('win_ospf_ad_setting'),component);

        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onComboboxFocus: function(component, event, eOpts) {
        component.expand();
    },

    onComboboxCollapse: function(field, eOpts) {
        field.blur();
    },

    onFieldsetRender4: function(component, eOpts) {
        component.setTitle('Static Routes');

        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'ospf_ad_chk5',
            style:'margin-left:165px',
            resizeHandle: false,
            state: false,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    if(newValue){
                        Ext.getCmp('ospf_ad_static_con').enable(true);
                    }
                    else{
                        Ext.getCmp('ospf_ad_static_con').disable(true);
                    }
                }
            }
        });

        component.legend.add(tbutton);
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        if(Ext.getCmp('ospf_ad_chk1').state === true){
            if(Ext.getCmp('ospf_ad_distance').isValid() === false){ Ext.getCmp('ospf_ad_distance').focus(); return false; }
        }
        if(Ext.getCmp('ospf_ad_chk2').state === true){
            if(Ext.getCmp('ospf_ad_info_metric').isValid() === false){ Ext.getCmp('ospf_ad_info_metric').focus(); return false; }
        }

        if(Ext.getCmp('ospf_ad_chk3').state === true){
            var chk = false;
            if(Ext.getCmp('ospf_ad_redis_chk1').getValue()){ chk = true; }
            if(Ext.getCmp('ospf_ad_redis_chk2').getValue()){ chk = true; }
            if(Ext.getCmp('ospf_ad_redis_chk2').getValue()){ chk = true; }

            if(chk === false){
                Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].update(get_msg('err_select'));
                Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].addCls('ic_msg_err');
                Ext.getCmp('ospf_ad_redis_chk1').focus();
                return false;
            }
        }

        var store = Ext.getCmp('ospf_ad_static_grid').getStore();
        var routes = [];

        if(Ext.getCmp('ospf_ad_chk5').state === true){
            for(var j = 0;j < store.data.items.length;j++){
                if(me.ip_validation(store.data.items[j].data.ipaddr) !== true){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(me.ip_validation(store.data.items[j].data.ipaddr));

                    Ext.getCmp('ospf_ad_static_grid').getPlugin('ospf_ad_static_plug').startEdit(Number(j), 0);
                    return false;
                }
                if(store.data.items[j].data.type === "A.B.C.D"){
                    if(me.opt_validation(store.data.items[j].data.opt) !== true){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(me.opt_validation(store.data.items[j].data.opt));

                        Ext.getCmp('ospf_ad_static_grid').getPlugin('ospf_ad_static_plug').startEdit(Number(j), 2);
                        return false;
                    }
                }
                if(store.data.items[j].data.type === "interface"){
                    if(store.data.items[j].data.opt === ""){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_null'));

                        Ext.getCmp('ospf_ad_static_grid').getPlugin('ospf_ad_static_plug').startEdit(Number(j), 2);
                        return false;
                    }
                }

                if(store.data.items[j].data.type !== "A.B.C.D" && store.data.items[j].data.type !== "interface"){
                    store.data.items[j].data.opt = store.data.items[j].data.type;
                }

                var temp = store.data.items[j].data.ipaddr.split('/');

                var sub_opt = "";

                if(store.data.items[j].data.sub_opt !== undefined){
                    sub_opt = store.data.items[j].data.sub_opt;
                }

                routes.push({
                    'ipaddr': temp[0],
                    'net': temp[1],
                    'opt': store.data.items[j].data.opt,
                    'type': store.data.items[j].data.type,
                    'sub_opt': sub_opt
                });
            }
        }

        var ospf_ad_info = Ext.getCmp('NFW2_network_protocol').ospf_info;

        if(Ext.getCmp('ospf_ad_chk1').state === true){
            ospf_ad_info.distance.state = "yes";
            ospf_ad_info.distance.value = Ext.getCmp('ospf_ad_distance').getValue();
        }
        else{
            ospf_ad_info.distance.state = "no";
            ospf_ad_info.distance.value = "";
        }

        if(Ext.getCmp('ospf_ad_chk2').state === true){
            ospf_ad_info.default_originate.state = "yes";
            ospf_ad_info.default_originate.type.status = Ext.getCmp('ospf_ad_info').getValue();
            if(Ext.getCmp('ospf_ad_info_chk1').getValue()){
                ospf_ad_info.default_originate.type.always = "yes";
            }
            if(Ext.getCmp('ospf_ad_info_chk2').getValue()){
                ospf_ad_info.default_originate.type.metric = "yes";
                ospf_ad_info.default_originate.type.value = Ext.getCmp('ospf_ad_info_metric').getValue();
            }

            if(Ext.getCmp('ospf_ad_info_chk1').getValue() === false && Ext.getCmp('ospf_ad_info_chk2').getValue() === false){
                ospf_ad_info.default_originate.type.always = "";
                ospf_ad_info.default_originate.type.metric = "";
                ospf_ad_info.default_originate.type.value = "";
            }
        }
        else{
            ospf_ad_info.default_originate.state = "no";
            ospf_ad_info.default_originate.type.status = "";
            ospf_ad_info.default_originate.type.value = "";
            ospf_ad_info.default_originate.type.metric = "";
            ospf_ad_info.default_originate.type.always = "";
        }

        if(Ext.getCmp('ospf_ad_chk3').state === true){
            ospf_ad_info.redistribute.state = "yes";
            if(Ext.getCmp('ospf_ad_redis_chk1').getValue()){ ospf_ad_info.redistribute.static = "yes"; }
            else{ ospf_ad_info.redistribute.static = "no"; }
            if(Ext.getCmp('ospf_ad_redis_chk2').getValue()){ ospf_ad_info.redistribute.rip = "yes"; }
            else{ ospf_ad_info.redistribute.rip = "no"; }
            if(Ext.getCmp('ospf_ad_redis_chk3').getValue()){ ospf_ad_info.redistribute.bgp = "yes"; }
            else{ ospf_ad_info.redistribute.bgp = "no"; }
        }
        else{
            ospf_ad_info.redistribute.state = "no";
            ospf_ad_info.redistribute.static = "no";
            ospf_ad_info.redistribute.rip = "no";
            ospf_ad_info.redistribute.bgp = "no";
        }

        if(Ext.getCmp('ospf_ad_chk4').state === true){
            ospf_ad_info.abrtype.state = "yes";
            ospf_ad_info.abrtype.type = Ext.getCmp('ospf_ad_type').getValue();
        }
        else{
            ospf_ad_info.abrtype.state = "no";
            ospf_ad_info.abrtype.type = "";
        }

        if(Ext.getCmp('ospf_ad_chk5').state === true){
            ospf_ad_info.static_route.state = "yes";
            ospf_ad_info.static_route.routes = routes;
        }
        else{
            ospf_ad_info.static_route.state = "no";
            ospf_ad_info.static_route.routes = [];
        }

        Ext.getCmp('NFW2_network_protocol').ospf_info = ospf_ad_info;

        this.close();
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    onWin_ospf_ad_settingAfterRender: function(component, eOpts) {
        var me = this;
        this.fieldInfo = makeZenTip();

        var eth = [];

        request_helper.xmlrpc_call_JsonP('ftuctrl','get_pname_list',{option : Ext.encode('all')},function(response){
            request_helper.xmlrpc_call_JsonP('ftuctrl','get_lname_list',{if_type : Ext.encode('bonding'),data_type : Ext.encode('name'),option : Ext.encode('used')},function(response_bond){
                request_helper.xmlrpc_call_JsonP('ftuctrl','get_lname_list',{if_type : Ext.encode('bridge'),data_type : Ext.encode('name'),option : Ext.encode('used')},function(response_bridge){
                    request_helper.xmlrpc_call_JsonP('ftuctrl','get_lname_list',{if_type : Ext.encode('vlan'),data_type : Ext.encode('name'),option : Ext.encode('used')},function(response_vlan){
                        for(var i in response){
                            eth.push({
                                name: response[i].name
                            });
                        }
                        for(var j in response_bond){
                            eth.push({
                                name: response_bond[j].name
                            });
                        }
                        for(var j in response_bridge){
                            eth.push({
                                name: response_bridge[j].name
                            });
                        }
                        for(var j in response_vlan){
                            eth.push({
                                name: response_vlan[j].name
                            });
                        }

                        var _store = Ext.data.StoreManager.lookup('store_nw_protocol_inter');
                        _store.loadData(eth);
                    });
                });
            });
        });

        if(me.ospf_info.redistribute.static === "yes"){ Ext.getCmp('ospf_ad_redis_chk1').setValue(true); }
        else{ Ext.getCmp('ospf_ad_redis_chk1').setValue(false); }
        if(me.ospf_info.redistribute.rip === "yes"){ Ext.getCmp('ospf_ad_redis_chk2').setValue(true); }
        else{ Ext.getCmp('ospf_ad_redis_chk2').setValue(false); }
        if(me.ospf_info.redistribute.bgp === "yes"){ Ext.getCmp('ospf_ad_redis_chk3').setValue(true); }
        else{ Ext.getCmp('ospf_ad_redis_chk3').setValue(false); }

        if(me.ospf_info.distance.state === "yes"){ Ext.getCmp('ospf_ad_chk1').state = true; }
        else{
            Ext.getCmp('ospf_ad_chk1').state = false;
            Ext.getCmp('ospf_ad_distance').disable(true);
        }
        if(me.ospf_info.default_originate.state === "yes"){ Ext.getCmp('ospf_ad_chk2').state = true; }
        else{
            Ext.getCmp('ospf_ad_chk2').state = false;
            Ext.getCmp('ospf_ad_info').disable(true);
            Ext.getCmp('ospf_ad_info_con').disable(true);
        }
        if(me.ospf_info.redistribute.state === "yes"){ Ext.getCmp('ospf_ad_chk3').state = true; }
        else{
            Ext.getCmp('ospf_ad_chk3').state = false;
            Ext.getCmp('ospf_ad_redis_con').disable(true);
            Ext.getCmp('ospf_ad_redis_chk1').setValue(true);
        }
        if(me.ospf_info.abrtype.state === "yes"){ Ext.getCmp('ospf_ad_chk4').state = true; }
        else{
            Ext.getCmp('ospf_ad_chk4').state = false;
            Ext.getCmp('ospf_ad_type').disable(true);
        }

        if(me.ospf_info.distance.value !== ""){
            Ext.getCmp('ospf_ad_distance').setValue(me.ospf_info.distance.value);
        }
        if(me.ospf_info.default_originate.type.status !== ""){
            Ext.getCmp('ospf_ad_info').setValue(me.ospf_info.default_originate.type.status);
        }
        if(me.ospf_info.default_originate.type.always === "yes"){ Ext.getCmp('ospf_ad_info_chk1').setValue(true); }
        else{ Ext.getCmp('ospf_ad_info_chk1').setValue(false); }
        if(me.ospf_info.default_originate.type.metric === "yes"){ Ext.getCmp('ospf_ad_info_chk2').setValue(true); }
        else{ Ext.getCmp('ospf_ad_info_chk2').setValue(false); }

        if(me.ospf_info.default_originate.type.value !== ""){
            Ext.getCmp('ospf_ad_info_metric').setValue(me.ospf_info.default_originate.type.value);
        }

        if(me.ospf_info.abrtype.type !== ""){ Ext.getCmp('ospf_ad_type').setValue(me.ospf_info.abrtype.type); }

        if(me.ospf_info.static_route.state === "yes"){
            Ext.getCmp('ospf_ad_chk5').state = true;
            if(me.ospf_info.static_route.routes.length !== 0){
                Ext.getCmp('ospf_ad_static_con').enable();

                for(var i in me.ospf_info.static_route.routes){
                    var temp = me.ospf_info.static_route.routes[i].ipaddr + "/" + me.ospf_info.static_route.routes[i].net;
                    me.ospf_info.static_route.routes[i].ipaddr = temp;
                }

                Ext.getCmp('ospf_ad_static_grid').getStore().loadData(me.ospf_info.static_route.routes);
            }
        }
        else{
            Ext.getCmp('ospf_ad_chk5').state = false;
        }

        component.setTitle(__zen('ospf')+" "+__zen('advance_setting'));
    },

    onWin_ospf_ad_settingRender: function(component, eOpts) {
        var store = {
            fields:[
                {name:'ipaddr'},
                {name:'type'},
                {name:'opt'},
                {name:'sub_opt'},
            ]
        };

        Ext.getCmp('ospf_ad_static_grid').reconfigure(store);
    },

    ip_validation: function(value) {
        if(value !== true){
            if(!CheckNotNull(value)){ return get_msg('err_null'); }

            var chk_ip = value.split('/');
            if(!ValidIPAddress(chk_ip[0])){ return get_msg('err_ip'); }
            if(chk_ip[1] === undefined){ return get_msg('err_form'); }
            else{
                var chk_ip2 = chk_ip[1].split('.');
                if(chk_ip2[1] !== undefined){ return get_msg('err_form'); }
                if(!ValidIPAddress(chk_ip[0])){ return get_msg('err_ip'); }
                if(chk_ip[0] !== "0.0.0.0" && chk_ip[1] === 0){ return ValidLimit(1,32); }
                else if(chk_ip[1] === ""){ return get_msg('err_form'); }
                else if(chk_ip[1] < 1 || chk_ip[1] > 32){ return ValidLimit(1,32); }
            }
        }

        return true;
    },

    opt_validation: function(value) {
        if(value !== true){
            if(!CheckNotNull(value)){ return get_msg('err_null'); }
            if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
        }

        return true;
    }

});