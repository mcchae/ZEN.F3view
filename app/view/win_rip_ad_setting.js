
Ext.define('NFW2.view.win_rip_ad_setting', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_rip_ad_setting',

    requires: [
        'NFW2.view.win_rip_ad_settingViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Checkbox',
        'Ext.Img',
        'Ext.form.FieldSet',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.plugin.CellEditing',
        'Ext.button.Button',
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Action',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'win_rip_ad_setting'
    },
    id: 'win_rip_ad_setting',
    title: 'My Window',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onWin_rip_ad_settingAfterRender',
        render: 'onWin_rip_ad_settingRender'
    },
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
                        click: 'onButtonClick1',
                        blur: 'onButtonBlur'
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
                                items: [
                                    {
                                        xtype: 'container',
                                        margin: '8 0 0 10',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'checkboxfield',
                                                id: 'rip_ad_default_chk',
                                                labelSeparator: ' ',
                                                labelWidth: 110,
                                                bind: {
                                                    fieldLabel: '{default_originate}'
                                                },
                                                listeners: {
                                                    change: 'onCheckboxfieldChange2'
                                                }
                                            },
                                            {
                                                xtype: 'image',
                                                margin: '6 0 0 5',
                                                maxHeight: 14,
                                                maxWidth: 15,
                                                src: '../images/b_help.png',
                                                listeners: {
                                                    render: 'onImageRender'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        margin: '8 0 0 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'fieldset',
                                                flex: 1,
                                                width: 320,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    me.processRip_ad_chk11({
                                                        xtype: 'checkboxfield',
                                                        hidden: true,
                                                        id: 'rip_ad_chk11',
                                                        fieldLabel: '&nbsp;',
                                                        labelCls: 'lb_req',
                                                        labelSeparator: ' ',
                                                        labelWidth: 0,
                                                        checked: true,
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
                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                if(!isNumber(value)){ return get_msg('err_form'); }
                                                                if(Number(value) < 1 || Number(value) > 16){ return ValidLimit(1,16); }
                                                            }

                                                            return true;
                                                        },
                                                        fieldInfo: {
                                                            txt: msg_tip_length(1,
                                                            16,
                                                            null)
                                                        },
                                                        id: 'rip_ad_metric',
                                                        margin: '8 0 10 0',
                                                        width: 210,
                                                        labelCls: 'lb_req',
                                                        labelSeparator: ' ',
                                                        labelWidth: 110,
                                                        msgTarget: 'none',
                                                        value: 1,
                                                        enforceMaxLength: true,
                                                        maskRe: /[0-9]/,
                                                        maxLength: 2,
                                                        bind: {
                                                            fieldLabel: '{metric}'
                                                        },
                                                        listeners: {
                                                            focus: 'onTextfieldFocus1',
                                                            blur: 'onTextfieldBlur1',
                                                            errorchange: 'onTextfieldErrorChange'
                                                        }
                                                    }
                                                ],
                                                listeners: {
                                                    render: 'onFieldsetRender2'
                                                }
                                            },
                                            {
                                                xtype: 'fieldset',
                                                flex: 1,
                                                margin: '0 0 0 10',
                                                maxHeight: 69,
                                                width: 320,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    me.processRip_ad_chk21({
                                                        xtype: 'checkboxfield',
                                                        hidden: true,
                                                        id: 'rip_ad_chk21',
                                                        fieldLabel: '&nbsp;',
                                                        labelCls: 'lb_req',
                                                        labelSeparator: ' ',
                                                        labelWidth: 0,
                                                        checked: true,
                                                        bind: {
                                                            boxLabel: '{distance}'
                                                        },
                                                        listeners: {
                                                            change: 'onCheckboxfieldChange1'
                                                        }
                                                    }),
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            if(value !== true){
                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                if(!isNumber(value)){ return get_msg('err_form'); }
                                                                if(Number(value) < 1 || Number(value) > 255){ return ValidLimit(1,255); }
                                                            }

                                                            return true;
                                                        },
                                                        fieldInfo: {
                                                            txt: msg_tip_length(1,
                                                            255,
                                                            null)
                                                        },
                                                        id: 'rip_ad_distance',
                                                        margin: '8 0 10 0',
                                                        maxHeight: 26,
                                                        width: 210,
                                                        labelCls: 'lb_req',
                                                        labelSeparator: ' ',
                                                        labelWidth: 110,
                                                        msgTarget: 'none',
                                                        value: 120,
                                                        enforceMaxLength: true,
                                                        maskRe: /[0-9]/,
                                                        maxLength: 3,
                                                        bind: {
                                                            fieldLabel: '{distance}'
                                                        },
                                                        listeners: {
                                                            focus: 'onRip_ad_distanceFocus',
                                                            blur: 'onRip_ad_distanceBlur',
                                                            errorchange: 'onRip_ad_distanceErrorChange'
                                                        }
                                                    }
                                                ],
                                                listeners: {
                                                    render: 'onFieldsetRender3'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        title: 'Timer',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                id: 'rip_ad_timer_con',
                                                margin: '8 0 10 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            if(value !== true){
                                                                var _value = removeComma(value);
                                                                if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                                if(!isNumber(_value)){ return get_msg('err_form'); }
                                                                if(Number(_value) < 5 || Number(_value) > 2147483647){ return ValidLimit(5,2147483647); }
                                                            }

                                                            return true;
                                                        },
                                                        fieldInfo: {
                                                            txt: msg_tip_length(5,
                                                            2147483647,
                                                            null)
                                                        },
                                                        id: 'rip_ad_update',
                                                        width: 210,
                                                        labelCls: 'lb_req',
                                                        labelSeparator: ' ',
                                                        labelWidth: 110,
                                                        msgTarget: 'none',
                                                        value: 30,
                                                        enforceMaxLength: true,
                                                        maskRe: /[0-9]/,
                                                        maxLength: 13,
                                                        bind: {
                                                            fieldLabel: '{update}'
                                                        },
                                                        listeners: {
                                                            focus: 'onRip_ad_updateFocus',
                                                            blur: 'onRip_ad_updateBlur',
                                                            errorchange: 'onRip_ad_updateErrorChange',
                                                            change: 'onRip_ad_updateChange'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            if(value !== true){
                                                                var _value = removeComma(value);
                                                                if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                                if(!isNumber(_value)){ return get_msg('err_form'); }
                                                                if(Number(_value) < 5 || Number(_value) > 2147483647){ return ValidLimit(5,2147483647); }
                                                            }

                                                            return true;
                                                        },
                                                        fieldInfo: {
                                                            txt: msg_tip_length(5,
                                                            2147483647,
                                                            null)
                                                        },
                                                        id: 'rip_ad_timeout',
                                                        margin: '0 0 0 10',
                                                        width: 200,
                                                        labelCls: 'lb_req',
                                                        labelSeparator: ' ',
                                                        msgTarget: 'none',
                                                        value: 180,
                                                        enforceMaxLength: true,
                                                        maskRe: /[0-9]/,
                                                        maxLength: 13,
                                                        bind: {
                                                            fieldLabel: '{timeout}'
                                                        },
                                                        listeners: {
                                                            focus: 'onRip_ad_timeoutFocus',
                                                            blur: 'onRip_ad_timeoutBlur',
                                                            errorchange: 'onRip_ad_timeoutErrorChange',
                                                            change: 'onRip_ad_timeoutChange'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            if(value !== true){
                                                                var _value = removeComma(value);
                                                                if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                                if(!isNumber(_value)){ return get_msg('err_form'); }
                                                                if(Number(_value) < 5 || Number(_value) > 2147483647){ return ValidLimit(5,2147483647); }
                                                            }

                                                            return true;
                                                        },
                                                        fieldInfo: {
                                                            txt: msg_tip_length(5,
                                                            2147483647,
                                                            null)
                                                        },
                                                        id: 'rip_ad_garbage',
                                                        margin: '0 0 0 10',
                                                        width: 200,
                                                        fieldLabel: 'Garbage',
                                                        labelCls: 'lb_req',
                                                        labelSeparator: ' ',
                                                        msgTarget: 'none',
                                                        value: 120,
                                                        enforceMaxLength: true,
                                                        maskRe: /[0-9]/,
                                                        maxLength: 13,
                                                        listeners: {
                                                            focus: 'onRip_ad_garbageFocus',
                                                            blur: 'onRip_ad_garbageBlur',
                                                            errorchange: 'onRip_ad_garbageErrorChange',
                                                            change: 'onRip_ad_garbageChange'
                                                        }
                                                    }
                                                ]
                                            }
                                        ],
                                        listeners: {
                                            render: 'onFieldsetRender'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        id: 'rip_ad_redis_con',
                                        items: [
                                            {
                                                xtype: 'fieldset',
                                                title: 'Redistribute',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'gridpanel',
                                                        id: 'rip_ad_set_grid',
                                                        margin: '8 0 10 0',
                                                        width: 630,
                                                        header: false,
                                                        title: 'My Grid Panel',
                                                        columns: [
                                                            {
                                                                xtype: 'gridcolumn',
                                                                dataIndex: 'type',
                                                                flex: 2
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if(value !== true){
                                                                        metaData.tdCls = 'cell_check_false';
                                                                    }
                                                                    else{
                                                                        metaData.tdCls = 'cell_check_true';
                                                                    }
                                                                },
                                                                dataIndex: 'use',
                                                                flex: 1,
                                                                bind: {
                                                                    text: '{use}'
                                                                },
                                                                editor: {
                                                                    xtype: 'checkboxfield',
                                                                    baseCls: 'cell_check_false',
                                                                    margin: '0 0 -2 0',
                                                                    listeners: {
                                                                        render: 'onCheckboxfieldRender',
                                                                        blur: 'onCheckboxfieldBlur'
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdCls = 'cell_text';

                                                                    return value;
                                                                },
                                                                dataIndex: 'metric',
                                                                flex: 1,
                                                                bind: {
                                                                    text: '{metric}'
                                                                },
                                                                editor: {
                                                                    xtype: 'textfield',
                                                                    fieldInfo: {
                                                                        txt: msg_tip_length_rip(1,
                                                                        16,
                                                                        1)
                                                                    },
                                                                    baseCls: 'cell_text',
                                                                    enforceMaxLength: true,
                                                                    maskRe: /[0-9]/,
                                                                    maxLength: 2,
                                                                    listeners: {
                                                                        focus: 'onTextfieldFocus',
                                                                        blur: 'onTextfieldBlur'
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        viewConfig: {
                                                            markDirty: false
                                                        },
                                                        plugins: [
                                                            {
                                                                ptype: 'cellediting',
                                                                pluginId: 'rip_ad_set_plug',
                                                                clicksToEdit: 1
                                                            }
                                                        ]
                                                    }
                                                ],
                                                listeners: {
                                                    render: 'onFieldsetRender1'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        items: [
                                            {
                                                xtype: 'container',
                                                disabled: true,
                                                id: 'rip_ad_static_con',
                                                margin: '8 0 10 0',
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        width: 630,
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
                                                                    click: 'onButtonClick21'
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'gridpanel',
                                                        id: 'rip_ad_static_grid',
                                                        margin: '8 0 0 0',
                                                        maxHeight: 100,
                                                        scrollable: {
                                                            x: false,
                                                            y: true
                                                        },
                                                        width: 630,
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
                                                                        focus: 'onTextfieldFocus11',
                                                                        blur: 'onTextfieldBlur11'
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
                                                                                focus: 'onComboboxFocus1',
                                                                                collapse: 'onComboboxCollapse1'
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

                                                                                                setTipFocus(Ext.getCmp('win_rip_ad_setting'), component);
                                                                                            },
                                                                                            blur: function(component, event, eOpts){
                                                                                                setTipBlur(Ext.getCmp('win_rip_ad_setting'), component);
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
                                                                            var store = Ext.getCmp('rip_ad_static_grid').getStore();

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
                                            render: 'onFieldsetRender41'
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

    processRip_ad_chk11: function(config) {
        config.boxLabel = true;

        return config;
    },

    processRip_ad_chk21: function(config) {
        config.boxLabel = true;

        return config;
    },

    onCheckboxfieldChange2: function(field, newValue, oldValue, eOpts) {
        var me = Ext.getCmp('win_rip_ad_setting');
        if(me.fir){
            if(newValue){
                Ext.getCmp('rip_ad_redis_con').disable(true);
                Ext.getCmp('rip_ad_chk4').state = false;
            }
            else{
                Ext.getCmp('rip_ad_redis_con').enable(true);
                Ext.getCmp('rip_ad_set_grid').enable(true);
                Ext.getCmp('rip_ad_chk4').state = true;
            }
            me.fir = false;
        }
        else{
            if(newValue){
                Ext.getCmp('rip_ad_redis_con').disable(true);
                Ext.getCmp('rip_ad_chk4').state = false;
                Ext.getCmp('rip_ad_chk4').moveHandle(false);
            }
            else{
                Ext.getCmp('rip_ad_redis_con').enable(true);
                Ext.getCmp('rip_ad_set_grid').enable(true);
                Ext.getCmp('rip_ad_chk4').state = true;
                Ext.getCmp('rip_ad_chk4').moveHandle(true);
            }
        }
    },

    onImageRender: function(component, eOpts) {
        component.tooltip = Ext.create('Ext.tip.ToolTip', {
            target: component.getEl(),
            autoHide: false,
            anchor:'left',
            cls : 'left_light_box',
            minWidth : 400,
            shadow: false,
            border : 0,
            items : [
                {
                    xtype : 'container',
                    width : 400,
                    height : 100,
                    cls:'tip_box',
                    html : '<div class="title">RIP를 특별히 Static route에 사용하기 원한다면 이 옵션을 사용하십시오.<br>대부분의 경우 Static route 생성을 Redistribute 메뉴에서 "Static" 옵션을 사용하는 것이 좋습니다.</div>'//+__zen('rule_session_mode')+'</div><div class="list">'+__zen('l2')+' : '+__zen('perform_sync')+'<br>('+__zen('perform_sync_desc')+')</div><div class="list">'+__zen('l3')+' : '+__zen('routing_sync')+'<br>('+__zen('routing_sync_desc')+')</div>'
                }
            ]
        });
    },

    onCheckboxfieldChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('rip_ad_metric').enable(true);
        }
        else{
            Ext.getCmp('rip_ad_metric').disable(true);
        }
    },

    onTextfieldFocus1: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onTextfieldBlur1: function(component, event, eOpts) {
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

    onFieldsetRender2: function(component, eOpts) {
        component.setTitle(__zen('metric'));

        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'rip_ad_chk1',
            style:'margin-left:105px',
            resizeHandle: false,
            state: true,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    if(newValue){
                        Ext.getCmp('rip_ad_metric').enable(true);
                    }
                    else{
                        Ext.getCmp('rip_ad_metric').disable(true);
                    }
                }
            }
        });

        component.legend.add(tbutton);
    },

    onCheckboxfieldChange1: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('rip_ad_distance').enable(true);
        }
        else{
            Ext.getCmp('rip_ad_distance').disable(true);
        }
    },

    onRip_ad_distanceFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onRip_ad_distanceBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onRip_ad_distanceErrorChange: function(labelable, error, eOpts) {
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

    onFieldsetRender3: function(component, eOpts) {
        component.setTitle(__zen('distance'));

        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'rip_ad_chk2',
            style:'margin-left:105px',
            resizeHandle: false,
            state: true,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    if(newValue){
                        Ext.getCmp('rip_ad_distance').enable(true);
                    }
                    else{
                        Ext.getCmp('rip_ad_distance').disable(true);
                    }
                }
            }
        });

        component.legend.add(tbutton);
    },

    onRip_ad_updateFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onRip_ad_updateBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onRip_ad_updateErrorChange: function(labelable, error, eOpts) {
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

    onRip_ad_updateChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onRip_ad_timeoutFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onRip_ad_timeoutBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onRip_ad_timeoutErrorChange: function(labelable, error, eOpts) {
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

    onRip_ad_timeoutChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onRip_ad_garbageFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onRip_ad_garbageBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onRip_ad_garbageErrorChange: function(labelable, error, eOpts) {
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

    onRip_ad_garbageChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFieldsetRender: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'rip_ad_chk3',
            style:'margin-left:105px',
            resizeHandle: false,
            state: true,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    if(newValue){
                        Ext.getCmp('rip_ad_timer_con').enable(true);
                    }
                    else{
                        Ext.getCmp('rip_ad_timer_con').disable(true);
                    }
                }
            }
        });

        component.legend.add(tbutton);
    },

    onCheckboxfieldRender: function(component, eOpts) {
        var me = Ext.getCmp('win_rip_ad_setting');
        console.log(me.set_redis);
        if(me.set_redis === false){
            console.log(component);
            if(component.value === true){
                component.setValue(false);
            }
            else{
                component.setValue(true);
            }
        }
        else{
            me.set_redis = false;
        }
    },

    onCheckboxfieldBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onTextfieldBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');

        setTipBlur(this,component);
    },

    onFieldsetRender1: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'rip_ad_chk4',
            style:'margin-left:105px',
            resizeHandle: false,
            state: true,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    if(newValue){
                        Ext.getCmp('rip_ad_set_grid').enable(true);
                    }
                    else{
                        Ext.getCmp('rip_ad_set_grid').disable(true);
                    }
                }
            }
        });

        component.legend.add(tbutton);
    },

    onButtonClick21: function(button, e, eOpts) {
        var record = [];

        record.push({
            'ipaddr':'',
            'type':'null0',
            'opt':'',
            'sub-opt':''
        });

        Ext.getCmp('rip_ad_static_grid').getStore().add(record);
    },

    onTextfieldFocus11: function(component, event, eOpts) {
        var str = disp_help_ip('4s2m');
        component.fieldInfo = str;

        setTipFocus(Ext.getCmp('win_rip_ad_setting'),component);
    },

    onTextfieldBlur11: function(component, event, eOpts) {
        setTipBlur(Ext.getCmp('win_rip_ad_setting'),component);

        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onComboboxFocus1: function(component, event, eOpts) {
        component.expand();
    },

    onComboboxCollapse1: function(field, eOpts) {
        field.blur();
    },

    onFieldsetRender41: function(component, eOpts) {
        component.setTitle('Static Routes');

        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'rip_ad_chk5',
            style:'margin-left:105px',
            resizeHandle: false,
            state: false,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    if(newValue){
                        Ext.getCmp('rip_ad_static_con').enable(true);
                    }
                    else{
                        Ext.getCmp('rip_ad_static_con').disable(true);
                    }
                }
            }
        });

        component.legend.add(tbutton);
    },

    onWin_rip_ad_settingAfterRender: function(component, eOpts) {
        var me = this;
        me.set_btn = false;
        me.set_redis = false;
        me.fir = true;
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

        component.setTitle(__zen('rip') + " " +__zen('advance_setting'));

        if(me.rip_info.default_originate === "yes"){ Ext.getCmp('rip_ad_default_chk').setValue(true); }
        else{ Ext.getCmp('rip_ad_default_chk').setValue(false); }

        if(me.rip_info.metric.state === "yes"){ Ext.getCmp('rip_ad_chk1').state = true; }
        else{
            Ext.getCmp('rip_ad_chk1').state = false;
            Ext.getCmp('rip_ad_metric').disable(true);
        }

        if(me.rip_info.metric.value !== ""){ Ext.getCmp('rip_ad_metric').setValue(me.rip_info.metric.value); }

        if(me.rip_info.distance.state === "yes"){ Ext.getCmp('rip_ad_chk2').state = true; }
        else{
            Ext.getCmp('rip_ad_chk2').state = false;
            Ext.getCmp('rip_ad_distance').disable(true);
        }

        if(me.rip_info.distance.value !== ""){ Ext.getCmp('rip_ad_distance').setValue(me.rip_info.distance.value); }

        if(me.rip_info.timer.state === "yes"){
            Ext.getCmp('rip_ad_chk3').state = true;
            //     Ext.getCmp('rip_ad_chk3').moveHandle(true);
            Ext.getCmp('rip_ad_timer_con').enable(true);
        }
        else{
            Ext.getCmp('rip_ad_chk3').state = false;
            //     Ext.getCmp('rip_ad_chk3').moveHandle(false);
            Ext.getCmp('rip_ad_timer_con').disable(true);
        }

        if(me.rip_info.timer.update !== ""){ Ext.getCmp('rip_ad_update').setValue(me.rip_info.timer.update); }
        if(me.rip_info.timer.timeout !== ""){ Ext.getCmp('rip_ad_timeout').setValue(me.rip_info.timer.timeout); }
        if(me.rip_info.timer.garbage !== ""){ Ext.getCmp('rip_ad_garbage').setValue(me.rip_info.timer.garbage); }

        if(me.rip_info.redistribute.state === "yes"){
            Ext.getCmp('rip_ad_chk4').state = true;
            //     Ext.getCmp('rip_ad_chk4').moveHandle(true);
            Ext.getCmp('rip_ad_set_grid').enable(true);
        }
        else{
            Ext.getCmp('rip_ad_chk4').state = false;
            //     Ext.getCmp('rip_ad_chk4').moveHandle(false);
            Ext.getCmp('rip_ad_set_grid').disable(true);
        }

        var record = [];
        var use = true;
        var metric = 1;

        if(me.rip_info.redistribute.static.state === "no"){ use = false; }
        else if(me.rip_info.redistribute.static.state === undefined){ use = true; }
        if(me.rip_info.redistribute.static.metric !== undefined){ metric = me.rip_info.redistribute.static.metric; }
        record.push({'type':'Static','use':use,'metric':metric});

        use = true;
        metric = 1;

        if(me.rip_info.redistribute.ospf.state === "no"){ use = false; }
        else if(me.rip_info.redistribute.ospf.state === undefined){ use = false; }
        if(me.rip_info.redistribute.ospf.metric !== undefined){ metric = me.rip_info.redistribute.ospf.metric; }
        record.push({'type':'OSPF','use':use,'metric':metric});

        use = true;
        metric = 1;

        if(me.rip_info.redistribute.bgp.state === "no"){ use = false; }
        else if(me.rip_info.redistribute.bgp.state === undefined){ use = false; }
        if(me.rip_info.redistribute.bgp.metric !== undefined){ metric = me.rip_info.redistribute.bgp.metric; }
        record.push({'type':'BGP','use':use,'metric':metric});
        console.log(me.rip_info.static_route);
        if(me.rip_info.static_route.state === "yes"){
            Ext.getCmp('rip_ad_chk5').state = true;
            if(me.rip_info.static_route.routes.length !== 0){
                Ext.getCmp('rip_ad_static_con').enable();

                for(var i in me.rip_info.static_route.routes){
                    var temp = me.rip_info.static_route.routes[i].ipaddr + "/" + me.rip_info.static_route.routes[i].net;
                    me.rip_info.static_route.routes[i].ipaddr = temp;
                }

                Ext.getCmp('rip_ad_static_grid').getStore().loadData(me.rip_info.static_route.routes);
            }
        }
        else{
            Ext.getCmp('rip_ad_chk5').state = false;
        }

        me.fir = false;
        Ext.getCmp('rip_ad_set_grid').getStore().loadData(record);
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = Ext.getCmp('win_rip_ad_setting');

        if(Ext.getCmp('rip_ad_chk1').state === true){
            if(Ext.getCmp('rip_ad_metric').isValid() === false){ Ext.getCmp('rip_ad_metric').focus(); return false; }
        }
        if(Ext.getCmp('rip_ad_chk2').state === true){
            if(Ext.getCmp('rip_ad_distance').isValid() === false){ Ext.getCmp('rip_ad_distance').focus(); return false; }
        }
        if(Ext.getCmp('rip_ad_chk3').state === true){
            if(Ext.getCmp('rip_ad_update').isValid() === false){ Ext.getCmp('rip_ad_update').focus(); return false; }
            if(Ext.getCmp('rip_ad_timeout').isValid() === false){ Ext.getCmp('rip_ad_timeout').focus(); return false; }
            if(Ext.getCmp('rip_ad_garbage').isValid() === false){ Ext.getCmp('rip_ad_garbage').focus(); return false; }
        }
        if(Ext.getCmp('rip_ad_chk4').state === true){
            var store = Ext.getCmp('rip_ad_set_grid').getStore();
            var chk_redis = false;

            for(var i in store.data.items){
                if(this.validator_redis(store.data.items[i].data.metric) !== true){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(this.validator_redis(store.data.items[i].data.metric));
                    me.set_btn = true;

                    Ext.getCmp('rip_ad_set_grid').getPlugin('rip_ad_set_plug').startEdit(Number(i), 2);
                    return false;
                }

                if(store.data.items[i].data.use === true){ chk_redis = true; }
            }

            if(chk_redis === false){
                Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].update(get_msg('err_select'));
                Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].addCls('ic_msg_err');
                me.set_redis = true;

                Ext.getCmp('rip_ad_set_grid').getPlugin('rip_ad_set_plug').startEdit(0, 1);
                return false;
            }
        }

        var store = Ext.getCmp('rip_ad_static_grid').getStore();
        var routes = [];

        if(Ext.getCmp('rip_ad_chk5').state === true){
            for(var j = 0;j < store.data.items.length;j++){
                if(me.ip_validation(store.data.items[j].data.ipaddr) !== true){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(me.ip_validation(store.data.items[j].data.ipaddr));

                    Ext.getCmp('rip_ad_static_grid').getPlugin('rip_ad_static_plug').startEdit(Number(j), 0);
                    return false;
                }
                if(store.data.items[j].data.type === "A.B.C.D"){
                    if(me.opt_validation(store.data.items[j].data.opt) !== true){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(me.opt_validation(store.data.items[j].data.opt));

                        Ext.getCmp('rip_ad_static_grid').getPlugin('rip_ad_static_plug').startEdit(Number(j), 2);
                        return false;
                    }
                }
                if(store.data.items[j].data.type === "interface"){
                    if(store.data.items[j].data.opt === ""){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_null'));

                        Ext.getCmp('rip_ad_static_grid').getPlugin('rip_ad_static_plug').startEdit(Number(j), 2);
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

        var rip_ad_info = Ext.getCmp('NFW2_network_protocol').rip_info;

        if(Ext.getCmp('rip_ad_default_chk').getValue()){ rip_ad_info.default_originate = "yes"; }
        else{ rip_ad_info.default_originate = "no"; }

        if(Ext.getCmp('rip_ad_chk1').state === true){
            rip_ad_info.metric.state = "yes";
            rip_ad_info.metric.value = Ext.getCmp('rip_ad_metric').getValue();
        }
        else{
            rip_ad_info.metric.state = "no";
            rip_ad_info.metric.value = "";
        }

        if(Ext.getCmp('rip_ad_chk2').state === true){
            rip_ad_info.distance.state = "yes";
            rip_ad_info.distance.value = Ext.getCmp('rip_ad_distance').getValue();
        }
        else{
            rip_ad_info.distance.state = "no";
            rip_ad_info.distance.value = "";
        }

        if(Ext.getCmp('rip_ad_chk3').state === true){
            rip_ad_info.timer.state = "yes";
            rip_ad_info.timer.update = Ext.getCmp('rip_ad_update').getValue();
            rip_ad_info.timer.timeout = Ext.getCmp('rip_ad_timeout').getValue();
            rip_ad_info.timer.garbage = Ext.getCmp('rip_ad_garbage').getValue();
        }
        else{
            rip_ad_info.timer.state = "no";
            rip_ad_info.timer.update = "";
            rip_ad_info.timer.timeout = "";
            rip_ad_info.timer.garbage = "";
        }

        if(Ext.getCmp('rip_ad_chk4').state === true){
            var store = Ext.getCmp('rip_ad_set_grid').getStore();
            rip_ad_info.redistribute.state = "yes";
            if(store.data.items[0].data.use){ rip_ad_info.redistribute.static.state = "yes"; }
            else{ rip_ad_info.redistribute.static.state = "no"; }
            if(store.data.items[0].data.metric === ""){
                rip_ad_info.redistribute.static.metric = String(store.data.items[0].data.metric);
                rip_ad_info.redistribute.static.metric_state = "no";
            }
            else{
                rip_ad_info.redistribute.static.metric = String(store.data.items[0].data.metric);
                rip_ad_info.redistribute.static.metric_state = "yes";
            }
            if(store.data.items[1].data.use){ rip_ad_info.redistribute.ospf.state = "yes"; }
            else{ rip_ad_info.redistribute.ospf.state = "no"; }
            if(store.data.items[1].data.metric === ""){
                rip_ad_info.redistribute.ospf.metric = String(store.data.items[1].data.metric);
                rip_ad_info.redistribute.ospf.metric_state = "no";
            }
            else{
                rip_ad_info.redistribute.ospf.metric = String(store.data.items[1].data.metric);
                rip_ad_info.redistribute.ospf.metric_state = "yes";
            }
            if(store.data.items[2].data.use){ rip_ad_info.redistribute.bgp.state = "yes"; }
            else{ rip_ad_info.redistribute.bgp.state = "no"; }
            if(store.data.items[2].data.metric === ""){
                rip_ad_info.redistribute.bgp.metric = String(store.data.items[2].data.metric);
                rip_ad_info.redistribute.bgp.metric_state = "no";
            }
            else{
                rip_ad_info.redistribute.bgp.metric = String(store.data.items[2].data.metric);
                rip_ad_info.redistribute.bgp.metric_state = "yes";
            }
        }
        else{
            rip_ad_info.redistribute.state = "no";
            rip_ad_info.redistribute.static = {};
            rip_ad_info.redistribute.ospf = {};
            rip_ad_info.redistribute.bgp = {};
        }

        if(Ext.getCmp('rip_ad_chk5').state === true){
            rip_ad_info.static_route.state = "yes";
            rip_ad_info.static_route.routes = routes;
        }
        else{
            rip_ad_info.static_route.state = "no";
            rip_ad_info.static_route.routes = [];
        }

        Ext.getCmp('NFW2_network_protocol').rip_info = rip_ad_info;

        this.close();
    },

    onButtonBlur: function(component, event, eOpts) {
        var me = Ext.getCmp('win_rip_ad_setting');

        if(me.set_btn){
            me.set_btn = false;
        }
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    onWin_rip_ad_settingRender: function(component, eOpts) {
        var store = {
            data:[
                {
                    'type':'Static',
                    'use':true,
                    'metric':1
                },
                {
                    'type':'OSPF',
                    'use':false,
                    'metric':1
                },
                {
                    'type':'BGP',
                    'use':false,
                    'metric':1
                },
            ],
            fields : [
                {name : 'type'},
                {name : 'use'},
                {name : 'metric'}
            ]
        };

        Ext.getCmp('rip_ad_set_grid').reconfigure(store);

        var store = {
            fields:[
                {name:'ipaddr'},
                {name:'type'},
                {name:'opt'},
                {name:'sub_opt'},
            ]
        };

        Ext.getCmp('rip_ad_static_grid').reconfigure(store);
    },

    validator_redis: function(metric) {
        if(metric !== true){
            if(!CheckNotNull(metric)){ return true; }
            if(!isNumber(metric)){ return get_msg('err_form'); }
            if(Number(metric) < 1 || Number(metric) > 16){ return ValidLimit(1,16); }
        }

        return true;
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