
Ext.define('NFW2.view.win_report_generate', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_report_generate',

    requires: [
        'NFW2.view.win_report_generateViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.Img',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'win_report_generate'
    },
    cls: 'zen_win',
    id: 'win_report_generate',
    scrollable: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'fm',
            bodyPadding: 10,
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'container',
                    id: 'atoz_report_con',
                    margin: '5 0 0 0',
                    scrollable: true,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var me = Ext.getCmp('win_report_generate');

                                        if(value !== true){
                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                            var chk_num = 0;

                                            var store_name_day = Ext.data.StoreManager.lookup('store_atoz_report_day_list');
                                            for(var i in store_name_day.data.items){
                                                if(value === store_name_day.data.items[i].data.name){
                                                    chk_num++;
                                                }
                                            }
                                            var store_name_week = Ext.data.StoreManager.lookup('store_atoz_report_week_list');
                                            for(var i in store_name_week.data.items){
                                                if(value === store_name_week.data.items[i].data.name){
                                                    chk_num++;
                                                }
                                            }

                                            var store_name_month = Ext.data.StoreManager.lookup('store_atoz_report_month_list');
                                            for(var i in store_name_month.data.items){
                                                if(value === store_name_month.data.items[i].data.name){
                                                    chk_num++;
                                                }
                                            }

                                            var store_name_spe = Ext.data.StoreManager.lookup('store_atoz_report_userset_list');
                                            for(var i in store_name_spe.data.items){
                                                if(value === store_name_spe.data.items[i].data.name){
                                                    chk_num++;
                                                }
                                            }

                                            if(me.edit === "edit"){
                                                if(chk_num > 1){ return get_msg('err_configdob'); }
                                            }
                                            else{
                                                if(chk_num > 0){ return get_msg('err_configdob'); }
                                            }
                                        }
                                        return true;
                                    },
                                    id: 'atoz_report_name',
                                    labelCls: 'lb_req',
                                    labelSeparator: ' ',
                                    enforceMaxLength: true,
                                    maxLength: 63,
                                    bind: {
                                        fieldLabel: '{report_name}'
                                    },
                                    listeners: {
                                        errorchange: 'onTextfieldErrorChange',
                                        blur: 'onTextfieldBlur'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '8 0 0 10',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'atoz_report_desc',
                                    labelSeparator: ' ',
                                    enforceMaxLength: true,
                                    maxLength: 255,
                                    bind: {
                                        fieldLabel: '{desc}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '0 0 0 10',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    margin: '0 0 0 10',
                                    width: 100,
                                    text: 'E-Mail'
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!ValidEmail(value) && value !== true){ return get_msg('err_form'); }
                                        var _store = Ext.data.StoreManager.lookup('store_atoz_report_email');
                                        if(_store.getCount() > 4 && value !== true){ return get_msg('err_ipCount'); }

                                        return true;
                                    },
                                    hidden: true,
                                    id: 'atoz_email',
                                    labelSeparator: ' ',
                                    msgTarget: 'none',
                                    enforceMaxLength: false,
                                    bind: {
                                        fieldLabel: '{e_mail}'
                                    },
                                    listeners: {
                                        errorchange: 'onAtoz_emailErrorChange',
                                        blur: 'onAtoz_emailBlur'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'btn_b',
                                    margin: '0 0 0 5',
                                    iconCls: 'icb_add',
                                    bind: {
                                        text: '{add_email}'
                                    },
                                    listeners: {
                                        click: 'onButtonClick3',
                                        blur: 'onButtonBlur'
                                    }
                                },
                                {
                                    xtype: 'image',
                                    height: 18,
                                    hidden: true,
                                    margin: '3 0 3 5',
                                    width: 24,
                                    src: '../images/b_insert.gif',
                                    listeners: {
                                        render: 'onImageRender'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            hidden: true,
                            id: 'mail_grid_con',
                            margin: '0 0 0 10',
                            width: 385,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    width: 115
                                },
                                {
                                    xtype: 'gridpanel',
                                    id: 'report_grid_mail',
                                    margin: '5 0 0 0',
                                    maxHeight: 83,
                                    scrollable: {
                                        x: false,
                                        y: true
                                    },
                                    width: 275,
                                    header: false,
                                    title: 'My Grid Panel',
                                    disableSelection: true,
                                    hideHeaders: true,
                                    store: 'store_atoz_report_email',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.tdCls = "cell_text";
                                                return value;
                                            },
                                            width: 225,
                                            dataIndex: 'mail',
                                            text: 'mail',
                                            editor: {
                                                xtype: 'textfield',
                                                baseCls: 'cell_text'
                                            }
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            width: 35,
                                            items: [
                                                {
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                        Ext.suspendLayouts();
                                                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                                                        err_fl.removeCls('ic_msg_err');
                                                        err_fl.update('');

                                                        Ext.getCmp("report_grid_mail").getStore().removeAt(rowIndex);

                                                        if(Ext.data.StoreManager.lookup('store_atoz_report_email').getCount() === 0){
                                                            Ext.getCmp('mail_grid_con').hide();
                                                        }
                                                        Ext.resumeLayouts();
                                                        Ext.getCmp('atoz_report_con').doLayout();
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
                                            pluginId: 'report_mail_plug',
                                            clicksToEdit: 1
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '8 0 0 10',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 10',
                                    width: 105,
                                    items: [
                                        {
                                            xtype: 'label',
                                            bind: {
                                                text: '{set}'
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
                                                    id: 'report_date_con',
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
                                                                    id: 'report_date_set_combo',
                                                                    width: 220,
                                                                    labelCls: 'lb_arrow',
                                                                    labelSeparator: ' ',
                                                                    editable: false,
                                                                    displayField: 'name',
                                                                    queryMode: 'local',
                                                                    store: {
                                                                        data: [
                                                                            {
                                                                                name: __zen('daily'),
                                                                                value: 'day'
                                                                            },
                                                                            {
                                                                                name: __zen('weekly'),
                                                                                value: 'week'
                                                                            },
                                                                            {
                                                                                name: __zen('monthly'),
                                                                                value: 'month'
                                                                            },
                                                                            {
                                                                                name: __zen('specification'),
                                                                                value: 'spe'
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
                                                                        fieldLabel: '{type3}'
                                                                    },
                                                                    listeners: {
                                                                        afterrender: 'onReport_date_set_comboAfterRender',
                                                                        change: 'onReport_date_set_comboChange'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combobox',
                                                                    id: 'report_date_set_combo2',
                                                                    margin: '0 0 0 5',
                                                                    width: 115,
                                                                    value: 'bef',
                                                                    editable: false,
                                                                    displayField: 'name',
                                                                    queryMode: 'local',
                                                                    store: {
                                                                        data: [
                                                                            {
                                                                                name: __zen('yesterday'),
                                                                                value: 'bef'
                                                                            },
                                                                            {
                                                                                name: __zen('today'),
                                                                                value: 'aft'
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
                                                                        afterrender: 'onReport_data_set_combo2AfterRender',
                                                                        change: 'onReport_date_set_combo2Change'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            id: 'report_date_set_con1',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    cls: 'mt_info',
                                                                    id: 'report_date_set_label',
                                                                    margin: '3 3 0 5'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    id: 'report_date_set_label2',
                                                                    margin: '3 0 0 0'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            hidden: true,
                                                            id: 'report_spe_set_con1',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'datefield',
                                                                    id: 'date_st',
                                                                    width: 115,
                                                                    editable: false,
                                                                    format: 'Y-m-d',
                                                                    submitFormat: 'Y-m-d',
                                                                    listeners: {
                                                                        render: 'onDatefieldRender'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    flex: 1,
                                                                    margin: '3 0 0 5',
                                                                    text: '~'
                                                                },
                                                                {
                                                                    xtype: 'datefield',
                                                                    id: 'date_dt',
                                                                    width: 115,
                                                                    editable: false,
                                                                    format: 'Y-m-d',
                                                                    submitFormat: 'Y-m-d',
                                                                    listeners: {
                                                                        render: 'onDatefieldRender1'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    margin: '8 0 0 0',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'report_set_savedelay',
                                                            width: 220,
                                                            labelCls: 'lb_arrow',
                                                            labelSeparator: ' ',
                                                            labelWidth: 120,
                                                            editable: false,
                                                            displayField: 'day',
                                                            queryMode: 'local',
                                                            valueField: 'day',
                                                            bind: {
                                                                fieldLabel: '{storage_period}'
                                                            },
                                                            listeners: {
                                                                afterrender: 'onReport_set_savedelayAfterRender'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'report_set_maketime',
                                                            width: 220,
                                                            labelCls: 'lb_arrow',
                                                            labelSeparator: ' ',
                                                            labelWidth: 120,
                                                            editable: false,
                                                            displayField: 'hour',
                                                            queryMode: 'local',
                                                            valueField: 'hour',
                                                            bind: {
                                                                fieldLabel: '{generate_time}'
                                                            },
                                                            listeners: {
                                                                afterrender: 'onReport_set_maketimeAfterRender'
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
                            flex: 1,
                            height: 1,
                            style: 'background-color: black;'
                        },
                        {
                            xtype: 'container',
                            margin: '10 0 0 10',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 10',
                                    width: 105,
                                    items: [
                                        {
                                            xtype: 'label',
                                            bind: {
                                                text: '{system}'
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
                                                            xtype: 'checkboxfield',
                                                            id: 'report_system_chk1'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '3 0 0 5',
                                                            width: 200,
                                                            bind: {
                                                                text: '{system_set}'
                                                            },
                                                            listeners: {
                                                                render: 'onLabelRender'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'report_system_chk2'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '3 0 0 5',
                                                            width: 200,
                                                            bind: {
                                                                text: '{system_policy}'
                                                            },
                                                            listeners: {
                                                                render: 'onLabelRender1'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'report_system_chk3'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '3 0 0 5',
                                                            width: 200,
                                                            bind: {
                                                                text: '{system_usage}'
                                                            },
                                                            listeners: {
                                                                render: 'onLabelRender2'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    margin: '5 0 5 0',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'report_system_chk4'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '3 0 0 5',
                                                            width: 200,
                                                            bind: {
                                                                text: '{system_packet}'
                                                            },
                                                            listeners: {
                                                                render: 'onLabelRender3'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'report_system_chk5'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '3 0 0 5',
                                                            width: 200,
                                                            bind: {
                                                                text: '{system_critical}'
                                                            },
                                                            listeners: {
                                                                render: 'onLabelRender4'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'report_system_chk6'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '3 0 0 5',
                                                            width: 200,
                                                            bind: {
                                                                text: '{system_expire}'
                                                            },
                                                            listeners: {
                                                                render: 'onLabelRender5'
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
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 10',
                                    width: 115,
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            id: 'tracker_chk1',
                                            labelSeparator: ' ',
                                            labelWidth: 75,
                                            bind: {
                                                fieldLabel: '{tracker}'
                                            },
                                            listeners: {
                                                change: 'onCheckboxfieldChange'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            flex: 1,
                                            hidden: true,
                                            id: 'tracker_field1',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    hidden: true,
                                                    margin: '5 0 0 5',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch',
                                                        pack: 'end'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'image',
                                                            height: 16,
                                                            hidden: true,
                                                            id: 'tracker_open_btn1',
                                                            margin: '8 0 3 5',
                                                            width: 16,
                                                            src: '../images/dpi_down.png'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            margin: '0 0 0 5',
                                                            width: 100,
                                                            text: '설정',
                                                            listeners: {
                                                                click: 'onButtonClick2'
                                                            }
                                                        }
                                                    ],
                                                    listeners: {
                                                        render: 'onImageRender2'
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'gridpanel',
                                                            flex: 1,
                                                            id: 'tracker_grid',
                                                            margin: '5 0 5 0',
                                                            maxHeight: 80,
                                                            scrollable: {
                                                                x: false,
                                                                y: true
                                                            },
                                                            width: 300,
                                                            header: false,
                                                            title: 'My Grid Panel',
                                                            hideHeaders: true,
                                                            columns: [
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        return '<img src="../images/bul_02.gif" border="0"/>' + __zen('tracker_desc') + " : " + value;
                                                                    },
                                                                    dataIndex: 'desc',
                                                                    text: 'Number',
                                                                    flex: 1
                                                                },
                                                                {
                                                                    xtype: 'actioncolumn',
                                                                    width: 45,
                                                                    align: 'center',
                                                                    items: [
                                                                        {
                                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                                var me = Ext.getCmp('win_report_generate');
                                                                                var cnt = Ext.getCmp('tracker_grid').getStore().getCount()+1;
                                                                                var data = Ext.getCmp('tracker_grid').getStore().data.items[rowIndex].data;
                                                                                var back_up = [];

                                                                                for(var i in Ext.getCmp('tracker_grid').getStore().data.items){
                                                                                    back_up.push(Ext.getCmp('tracker_grid').getStore().data.items[i].data);
                                                                                }

                                                                                var win = Ext.create('NFW2.view.win_setting_tracker',{
                                                                                    modal : true,
                                                                                    day_chk : me.day_chk,
                                                                                    No_cnt : cnt,
                                                                                    edit_cnt : rowIndex,
                                                                                    edit : "edit",
                                                                                    record : data,
                                                                                    back_up : back_up
                                                                                });

                                                                                win.show();
                                                                            },
                                                                            iconCls: 'icr_edit'
                                                                        },
                                                                        {
                                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                                var store = Ext.getCmp('tracker_grid').getStore();

                                                                                store.removeAt(rowIndex, 1);
                                                                            },
                                                                            iconCls: 'icr_del'
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            listeners: {
                                                                celldblclick: 'onTracker_gridCellDblClick'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    margin: '0 0 5 0',
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
                                                                click: 'onButtonClick4'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'image',
                                                            height: 18,
                                                            hidden: true,
                                                            margin: '0 0 0 5',
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
                }
            ]
        }
    ],
    listeners: {
        render: 'onNFW2_report_generateRender',
        afterrender: 'onWin_report_generateAfterRender',
        close: 'onWin_report_generateClose'
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
                    itemId: 'fld_msg'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onButtonClick',
                        blur: 'onButtonBlur1'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick1'
                    }
                }
            ]
        }
    ],

    onTextfieldErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldBlur: function(component, event, eOpts) {
        Ext.getCmp('atoz_report_name').validateValue(true);
    },

    onAtoz_emailErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onAtoz_emailBlur: function(component, event, eOpts) {
        Ext.getCmp('atoz_email').validateValue(true);
    },

    onButtonClick3: function(button, e, eOpts) {
        var _store = Ext.data.StoreManager.lookup('store_atoz_report_email');
        var mail = Ext.getCmp('atoz_email').getValue();

        // if(ValidEmail(Ext.getCmp('atoz_email').getValue()) === false){ Ext.getCmp('atoz_email').validateValue(false); }
        // if(Ext.getCmp('atoz_email').isValid() === false){ Ext.getCmp('atoz_email').focus(); return false; }

        if(_store.getCount() < 5){
            var obj = {
                'mail' : ''
            };

            _store.add(obj);

            if(_store.getCount() > 0){
                Ext.getCmp('mail_grid_con').show();
            }
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(5));
        //     Ext.getCmp('atoz_email_error').setText(get_msg('err_ipCount'));
        //     Ext.getCmp('atoz_email_error').show();
        }

        Ext.getCmp('atoz_email').reset();
    },

    onButtonBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onImageRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            var _store = Ext.data.StoreManager.lookup('store_atoz_report_email');
            var mail = Ext.getCmp('atoz_email').getValue();

            if(ValidEmail(Ext.getCmp('atoz_email').getValue()) === false){ Ext.getCmp('atoz_email').validateValue(false); }
            if(Ext.getCmp('atoz_email').isValid() === false){ Ext.getCmp('atoz_email').focus(); return false; }

            if(_store.getCount() < 5){
                var obj = {
                    'mail' : mail
                };

                _store.add(obj);

                if(_store.getCount() > 0){
                    Ext.getCmp('mail_grid_con').show();
                }
            }
            else{
                Ext.getCmp('atoz_email_error').setText(get_msg('err_ipCount'));
                Ext.getCmp('atoz_email_error').show();
            }

            Ext.getCmp('atoz_email').reset();
        }, component);
    },

    onReport_date_set_comboAfterRender: function(component, eOpts) {
        var combo = Ext.getCmp('report_date_set_combo').getStore().data;

        if(combo.length > 0){
            Ext.getCmp('report_date_set_combo').setValue(combo.items[0].data['value']);
        }
    },

    onReport_date_set_comboChange: function(field, newValue, oldValue, eOpts) {
        var me = Ext.getCmp('win_report_generate');
        me.day_chk = false;

        Ext.getCmp('report_date_set_con1').hide();
        Ext.getCmp('report_spe_set_con1').hide();
        Ext.getCmp('report_date_set_combo2').show();
        var day_store = {
            data: [
                {
                    name: __zen('yesterday'),
                    value: 'bef'
                },
                {
                    name: __zen('today'),
                    value: 'aft'
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
        };
        var week_store = {
            data: [
                {
                    value: 'mon',
                    name: __zen('day_mon')
                },
                {
                    value: 'tue',
                    name: __zen('day_tue')
                },
                {
                    value: 'wed',
                    name: __zen('day_wed')
                },
                {
                    value: 'thu',
                    name: __zen('day_thu')
                },
                {
                    value: 'fri',
                    name: __zen('day_fri')
                },
                {
                    value: 'sat',
                    name: __zen('day_sat')
                },
                {
                    value: 'sun',
                    name: __zen('day_sun')
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
        };

        var mon_data = [];
        for(var z = 1;z<32;z++){
            mon_data.push({
                'name' : z,
                'value' : z
            });
        }

        var mon_store = {
            data: mon_data,
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'value'
                }
            ]
        };

        Ext.suspendLayouts();

        if(newValue === 'day'){
            Ext.getCmp('report_date_set_combo2').bindStore(day_store);
            me.day_chk = true;
        }
        if(newValue === 'week'){
            Ext.getCmp('report_date_set_combo2').bindStore(week_store);
            Ext.getCmp('report_date_set_con1').show();

        }
        if(newValue === 'month'){
            Ext.getCmp('report_date_set_con1').show();
            //     Ext.getCmp('report_date_set_label').setText("");
            Ext.getCmp('report_date_set_label2').setText("");
            Ext.getCmp('report_date_set_combo2').bindStore(mon_store);
        }
        if(newValue === 'spe'){
            Ext.getCmp('report_spe_set_con1').show();
            Ext.getCmp('report_date_set_combo2').hide();
        }

        var combo = Ext.getCmp('report_date_set_combo2').getStore().data;

        if(combo.length > 0){
            Ext.getCmp('report_date_set_combo2').setValue(combo.items[0].data['value']);
        }

        Ext.resumeLayouts();
        Ext.getCmp('report_date_con').doLayout();
    },

    onReport_data_set_combo2AfterRender: function(component, eOpts) {
        // var combo = Ext.getCmp('report_date_set_combo2').getStore().data;

        // if(combo.items.length > 0){
        //     Ext.getCmp('report_date_set_combo2').setValue(combo.items[0].data.value);
        // }
    },

    onReport_date_set_combo2Change: function(field, newValue, oldValue, eOpts) {
        // Ext.suspendLayouts();

        if(Ext.getCmp('report_date_set_combo').getValue() === 'week'){
            var store = Ext.getCmp('report_date_set_combo2').getStore();
            var days = [];
            var days_temp = [];
            var days_result;
            var count = 0;

            for(var i in store.data.items){
                days.push(store.data.items[i].data.name + ", ");
                if(store.data.items[i].data.value === newValue){
                    Ext.getCmp('report_date_set_label2').setText(store.data.items[i].data.name);
                    count = i;
                }
            }

            for(var j = count;j < days.length; j++){
                days_temp.push(days[j]);
            }
            for(var k = 0;k < count;k++){
                days_temp.push(days[k]);
            }

            days_result = days_temp.join('');
            Ext.getCmp('report_date_set_label').setText(days_result);
        }
        else if(Ext.getCmp('report_date_set_combo').getValue() === 'month'){
            Ext.getCmp('report_date_set_label').setText(msg_atoz_report(newValue));
        }

        // Ext.resumeLayouts();
        // Ext.getCmp('report_date_con').doLayout();
    },

    onDatefieldRender: function(component, eOpts) {
        Ext.getCmp("date_st").setValue(new Date());
    },

    onDatefieldRender1: function(component, eOpts) {
        Ext.getCmp("date_dt").setValue(new Date());
    },

    onReport_set_savedelayAfterRender: function(component, eOpts) {
        var combo = Ext.getCmp('report_set_savedelay').getStore().data;

        if(combo.length > 0){
            Ext.getCmp('report_set_savedelay').setValue(combo.items[6].data['day']);
        }
    },

    onReport_set_maketimeAfterRender: function(component, eOpts) {
        var combo = Ext.getCmp('report_set_maketime').getStore().data;

        if(combo.length > 0){
            Ext.getCmp('report_set_maketime').setValue(combo.items[0].data['hour']);
        }
    },

    onLabelRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('report_system_chk1').getValue()){ Ext.getCmp('report_system_chk1').setValue(false); }
            else{ Ext.getCmp('report_system_chk1').setValue(true); }
        }, component);
    },

    onLabelRender1: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('report_system_chk2').getValue()){ Ext.getCmp('report_system_chk2').setValue(false); }
            else{ Ext.getCmp('report_system_chk2').setValue(true); }
        }, component);
    },

    onLabelRender2: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('report_system_chk3').getValue()){ Ext.getCmp('report_system_chk3').setValue(false); }
            else{ Ext.getCmp('report_system_chk3').setValue(true); }
        }, component);
    },

    onLabelRender3: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('report_system_chk4').getValue()){ Ext.getCmp('report_system_chk4').setValue(false); }
            else{ Ext.getCmp('report_system_chk4').setValue(true); }
        }, component);
    },

    onLabelRender4: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('report_system_chk5').getValue()){ Ext.getCmp('report_system_chk5').setValue(false); }
            else{ Ext.getCmp('report_system_chk5').setValue(true); }
        }, component);
    },

    onLabelRender5: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('report_system_chk6').getValue()){ Ext.getCmp('report_system_chk6').setValue(false); }
            else{ Ext.getCmp('report_system_chk6').setValue(true); }
        }, component);
    },

    onCheckboxfieldChange: function(field, newValue, oldValue, eOpts) {
        Ext.suspendLayouts();
        if(newValue){
            Ext.getCmp('tracker_field1').show();
        }
        else{
            Ext.getCmp('tracker_field1').hide();
            Ext.getCmp('tracker_grid').getStore().removeAll();
        }
        Ext.resumeLayouts();
        Ext.getCmp('atoz_report_con').doLayout();
    },

    onImageRender2: function(component, eOpts) {
        // component.getEl().on('click', function(eOpts) {
        //     Ext.suspendLayouts();
        //     var me = Ext.getCmp('win_report_generate');
        //     if(me.tracker_open[0] === true){
        //         Ext.getCmp('tracker_basic_con1').hide();
        //         Ext.getCmp('tracker_setting_con1').hide();
        //         Ext.getCmp('tracker_chart_con1').hide();
        //         Ext.getCmp('tracker_open_btn1').setSrc('../images/dpi_up.png');
        //         me.tracker_open[0] = false;
        //     }
        //     else{
        //         Ext.getCmp('tracker_basic_con1').show();
        //         Ext.getCmp('tracker_setting_con1').show();
        //         Ext.getCmp('tracker_chart_con1').show();
        //         Ext.getCmp('tracker_open_btn1').setSrc('../images/dpi_down.png');
        //         me.tracker_open[0] = true;
        //     }
        //     Ext.resumeLayouts();
        //     Ext.getCmp('tracker_con1').doLayout();
        // }, component);
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = Ext.getCmp('win_report_generate');

        var win = Ext.create('NFW2.view.win_setting_tracker',{
            modal : true,
            day_chk : me.day_chk
        });

        win.show();
    },

    onTracker_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = Ext.getCmp('win_report_generate');
        var cnt = Ext.getCmp('tracker_grid').getStore().getCount()+1;
        var record = Ext.getCmp('tracker_grid').getStore().data.items[rowIndex].data;

        var win = Ext.create('NFW2.view.win_setting_tracker',{
            modal : true,
            day_chk : me.day_chk,
            No_cnt : cnt,
            edit_cnt : rowIndex,
            edit : "edit",
            record : record,
            back_up : Ext.getCmp('tracker_grid').getStore().data.items
        });

        win.show();
    },

    onButtonClick4: function(button, e, eOpts) {
        if(Ext.getCmp('tracker_grid').getStore().getCount() === 10){
            Ext.Msg.show({
                title: __weguardia,
                width: 300,
                msg: ValidMaxCnt(10),
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO
            });
        }
        else{
            var me = Ext.getCmp('win_report_generate');
            var cnt = Ext.getCmp('tracker_grid').getStore().getCount()+1;

            var win = Ext.create('NFW2.view.win_setting_tracker',{
                modal : true,
                day_chk : me.day_chk,
                No_cnt : cnt,
                edit : 'add'
            });

            Ext.suspendLayouts();
            win.show();
            Ext.resumeLayouts(true);
        }
    },

    onImageRender1: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('tracker_grid').getStore().getCount() === 10){
                Ext.Msg.show({
                    title: __weguardia,
                    width: 300,
                    msg: ValidMaxCnt(10),
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });
            }
            else{
                var me = Ext.getCmp('win_report_generate');
                var cnt = Ext.getCmp('tracker_grid').getStore().getCount()+1;

                var win = Ext.create('NFW2.view.win_setting_tracker',{
                    modal : true,
                    day_chk : me.day_chk,
                    No_cnt : cnt,
                    edit : 'add'
                });

                Ext.suspendLayouts();
                win.show();
                Ext.resumeLayouts(true);
            }
        }, component);
    },

    onNFW2_report_generateRender: function(component, eOpts) {
        var me = Ext.getCmp('win_report_generate');
        me.fir = true;
        me.day_chk = true;

        me.tracker_cnt = [];
        me.last_type = [];
        me.tracker_open = [];
        for(var i = 0;i < 10;i++){
            me.tracker_open[i] = true;
            me.tracker_cnt[i] = 1;
            me.last_type[i] = "src";
        }

        var day_records = [];
        for(var j = 1;j<91;j++){
            day_records.push({
                'day' : j
            });
        }

        var day_store = {
            data: day_records,
            fields: [
                {
                    name: 'day'
                }
            ]
        };

        Ext.getCmp('report_set_savedelay').bindStore(day_store);

        var time_records = [];
        for(var j = 1;j<25;j++){
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

        Ext.getCmp('report_set_maketime').bindStore(time_store);

        var tracker_store = {
            fields: [
                {
                    name: 'desc'
                },
                {
                    name: 'basic'
                },
                {
                    name: 'detail'
                },
                {
                    name: 'graph'
                }
            ]
        };

        Ext.getCmp('tracker_grid').reconfigure(tracker_store);
    },

    onWin_report_generateAfterRender: function(component, eOpts) {
        var me = Ext.getCmp('win_report_generate');
        me.set_btn = false;
        chk_zenauth(null);
        if(me.edit === "edit"){
            Ext.getCmp('win_report_generate').setTitle(__zen('edit_atoz'));

            Ext.getCmp('atoz_report_name').setValue(me.record.name);
            Ext.getCmp('atoz_report_desc').setValue(me.record.desc);
            var mail_store = Ext.data.StoreManager.lookup('store_atoz_report_email');
            var mail_record = [];
            var week_list = ['','mon','tue','wed','thu','fri','sat','sun'];
            for(var i in me.record.email){
                mail_record.push({
                    'mail' : me.record.email[i].receiver
                });
            }
            mail_store.loadData(mail_record);
            if(mail_store.getCount() > 0){ Ext.getCmp('mail_grid_con').show(); }
            Ext.getCmp('report_date_set_combo2').setValue(me.record.setting[0].form.type);
            if(me.record.setting[0].form.cycle === "daily"){ Ext.getCmp('report_date_set_combo').setValue('day'); }
            if(me.record.setting[0].form.cycle === "weekly"){
                Ext.getCmp('report_date_set_combo').setValue('week');
                Ext.getCmp('report_date_set_combo2').setValue(week_list[Number(me.record.setting[0].form.type)]);
            }
            if(me.record.setting[0].form.cycle === "monthly"){
                Ext.getCmp('report_date_set_combo').setValue('month');
                Ext.getCmp('report_date_set_combo2').setValue(Number(me.record.setting[0].form.type));
            }
            if(me.record.setting[0].form.cycle === "specially"){
                Ext.getCmp('report_date_set_combo').setValue('spe');
                var st_date = me.record.setting[0].form.start.substr(0,4) + "-" + me.record.setting[0].form.start.substr(4,2) + "-" + me.record.setting[0].form.start.substr(6,2);
                var dt_date = me.record.setting[0].form.end.substr(0,4) + "-" + me.record.setting[0].form.end.substr(4,2) + "-" + me.record.setting[0].form.end.substr(6,2);
                Ext.getCmp('date_st').setValue(st_date);
                Ext.getCmp('date_dt').setValue(dt_date);
            }
            Ext.getCmp('report_set_savedelay').setValue(me.record.setting[0].storage);
            Ext.getCmp('report_set_maketime').setValue(me.record.setting[0].time);
            if(me.record.system[0].chk_basic === "on"){ Ext.getCmp('report_system_chk1').setValue(true); }
            if(me.record.system[0].chk_critical === "on"){ Ext.getCmp('report_system_chk2').setValue(true); }
            if(me.record.system[0].chk_lasthit === "on"){ Ext.getCmp('report_system_chk3').setValue(true); }
            if(me.record.system[0].chk_packet === "on"){ Ext.getCmp('report_system_chk4').setValue(true); }
            if(me.record.system[0].chk_term === "on"){ Ext.getCmp('report_system_chk5').setValue(true); }
            if(me.record.system[0].chk_usage === "on"){ Ext.getCmp('report_system_chk6').setValue(true); }

            var tracker_store = Ext.getCmp('tracker_grid').getStore();
            var tracker_record = [];
            if(me.record.tracker !== ""){
                for(var j in me.record.tracker){
                    var detail = [];
                    var content;

                    for(var k in me.record.tracker[j].setting){
                        if(me.record.tracker[j].setting[k].type === "sip" || me.record.tracker[j].setting[k].type === "dip"){ content = me.record.tracker[j].setting[k].ip; }
                        if(me.record.tracker[j].setting[k].type === "protocol,dport"){ content = me.record.tracker[j].setting[k].protocol; }
                        if(me.record.tracker[j].setting[k].type === "spd_id" || me.record.tracker[j].setting[k].type === "service"){ content = me.record.tracker[j].setting[k].id; }
                        if(me.record.tracker[j].setting[k].type === "country"){ content = me.record.tracker[j].setting[k].nation; }
                        if(me.record.tracker[j].setting[k].type === "domain"){ content = me.record.tracker[j].setting[k].url; }
                        if(me.record.tracker[j].setting[k].type === "category"){ content = ''; }
                        if(me.record.tracker[j].setting[k].type === "name"){ content = me.record.tracker[j].setting[k].name; }
        console.log(content);
                        if(me.record.tracker[j].setting[k].type === "service"){
                            detail.push({
                                'type' : me.record.tracker[j].setting[k].type,
                                'content' : content,
                                'port' : me.record.tracker[j].setting[k].port,
                                'mode' : me.record.tracker[j].setting[k].mode
                            });
                        }
                        else{
                            detail.push({
                                'type' : me.record.tracker[j].setting[k].type,
                                'content' : content,
                                'mode' : me.record.tracker[j].setting[k].mode
                            });
                        }
                    }

                    tracker_record.push({
                        'desc' : me.record.tracker[j].desc,
                        'basic' : me.record.tracker[j].basic,
                        'detail' : detail,
                        'graph' : [me.record.tracker[j].time_chart[0].chk_prev,me.record.tracker[j].time_chart[0].chk_basic,me.record.tracker[j].time_chart[0].chk_daily]
                    });
                }

                tracker_store.loadData(tracker_record);

                if(tracker_record.length > 0){
                    Ext.getCmp('tracker_chk1').setValue(true);
                    //                 Ext.getCmp('tracker_field1').show();
                    //                 Ext.getCmp('tracker_grid').show();
                }

            }
        }
        else{ Ext.getCmp('win_report_generate').setTitle(__zen('add_atoz')); }
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;
        var obj = {};

        if(Ext.getCmp('atoz_report_name').isValid() === false){ Ext.getCmp('atoz_report_name').focus(); return false; }

        var email = [];
        var email_store = Ext.getCmp('report_grid_mail').getStore();

        for(var i in email_store.data.items){
            if(me.validation_email(email_store.data.items[i].data.mail) !== true){
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                err_fl.addCls('ic_msg_err');
                err_fl.update(me.validation_email(email_store.data.items[i].data.mail));

                Ext.getCmp('report_grid_mail').getPlugin('report_mail_plug').startEdit(Number(i), 0);
                return false;
            }

            email.push({
                'receiver' : email_store.data.items[i].data.mail,
                'sender' : __weguardia,
                'title' : Ext.getCmp('atoz_report_name').getValue(),
                'content' : ''
            });
        }

        if(Ext.getCmp('tracker_chk1').getValue()){
            if(Ext.getCmp('tracker_grid').getStore().data.items.length === 0){
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                err_fl.addCls('ic_msg_err');
                err_fl.update(get_msg('err_tracker_add'));
                me.set_btn = true;

                return false;
            }
        }

        var setting = [];
        var set_type = "";
        var set_cycle;
        var set_storage;
        var set_time;
        var set_src = "";
        var set_dst = "";

        if(Ext.getCmp('report_date_set_combo').getValue() === "day"){
            set_cycle = "daily";
            if(Ext.getCmp('report_date_set_combo2').getValue() === "bef"){ set_type = "bef"; }
            else if(Ext.getCmp('report_date_set_combo2').getValue() === "aft"){ set_type = "aft"; }
        }
        else if(Ext.getCmp('report_date_set_combo').getValue() === "week"){
            set_cycle = "weekly";
            if(Ext.getCmp('report_date_set_combo2').getValue() === "mon"){ set_type = "1"; }
            else if(Ext.getCmp('report_date_set_combo2').getValue() === "tue"){ set_type = "2"; }
            else if(Ext.getCmp('report_date_set_combo2').getValue() === "wed"){ set_type = "3"; }
            else if(Ext.getCmp('report_date_set_combo2').getValue() === "thu"){ set_type = "4"; }
            else if(Ext.getCmp('report_date_set_combo2').getValue() === "fri"){ set_type = "5"; }
            else if(Ext.getCmp('report_date_set_combo2').getValue() === "sat"){ set_type = "6"; }
            else if(Ext.getCmp('report_date_set_combo2').getValue() === "sun"){ set_type = "7"; }
        }
        else if(Ext.getCmp('report_date_set_combo').getValue() === "month"){
            set_cycle = "monthly";
            for(var j = 1;j < 32;j++){
                if(Ext.getCmp('report_date_set_combo2').getValue() === j){
                    if(String(j).length === 1){ set_type = "0"+String(j); }
                    else{ set_type = String(j); }
                }
            }
        }
        else if(Ext.getCmp('report_date_set_combo').getValue() === "spe"){
            set_cycle = "specially";
            set_src = Ext.Date.format(Ext.getCmp('date_st').getValue(), 'Ymd');
            set_dst = Ext.Date.format(Ext.getCmp('date_dt').getValue(), 'Ymd');
        }

        set_storage = Ext.getCmp('report_set_savedelay').getValue();
        set_time = Ext.getCmp('report_set_maketime').getValue();

        setting.push({
            'form' : {
                'cycle' : set_cycle,
                'type' : set_type,
                'start' : set_src,
                'end' : set_dst
            },
            'storage' : set_storage,
            'time' : set_time
        });

        var system = [];
        var sys_chk = [];

        for(var k = 1;k < 7;k++){
            if(Ext.getCmp('report_system_chk'+k).getValue()){ sys_chk[k-1] = "on"; }
            else{ sys_chk[k-1] = "off"; }
        }

        system.push({
            'chk_basic' : sys_chk[0],
            'chk_lasthit' : sys_chk[4],
            'chk_usage' : sys_chk[1],
            'chk_packet' : sys_chk[2],
            'chk_critical' : sys_chk[3],
            'chk_term' : sys_chk[5]
        });

        if(Ext.getCmp('tracker_chk1').getValue()){
            var tracker = [];
            var tracker_num = 1;
            var store = Ext.getCmp('tracker_grid').getStore();

            for(var i in store.data.items){
                var tracker_desc = store.data.items[i].data.desc;
                var basic = [];

                basic.push({
                    'criteria' : store.data.items[i].data.basic[0].criteria,
                    'start' : store.data.items[i].data.basic[0].start,
                    'end' : store.data.items[i].data.basic[0].end,
                    'show_count' : store.data.items[i].data.basic[0].show_count,
                    'type' : store.data.items[i].data.basic[0].type,
                    'op_mode' : store.data.items[i].data.basic[0].op_mode,
                    'work' : store.data.items[i].data.basic[0].work,
                    'order_type' : store.data.items[i].data.basic[0].order_type,
                    'sort' : store.data.items[i].data.basic[0].sort,
                    'bound' : store.data.items[i].data.basic[0].bound
                });

                var tracker_set = [];

                for(var j in store.data.items[i].data.detail){
                    var mode_cnt = Number(j)+1;

                    if(store.data.items[i].data.detail[j].type === "sip" || store.data.items[i].data.detail[j].type === "dip"){
                        tracker_set.push({
                            'type' : store.data.items[i].data.detail[j].type,
                            'ip' : store.data.items[i].data.detail[j].content,
                            'mode' : mode_cnt
                        });
                    }
                    else if(store.data.items[i].data.detail[j].type === "protocol,dport"){
                        tracker_set.push({
                            'type' : store.data.items[i].data.detail[j].type,
                            'protocol' : store.data.items[i].data.detail[j].content,
                            'port' : store.data.items[i].data.detail[j].port,
                            'mode' : mode_cnt
                        });
                    }
                    else if(store.data.items[i].data.detail[j].type === "service" || store.data.items[i].data.detail[j].type === "spd_id"){
                        tracker_set.push({
                            'type' : store.data.items[i].data.detail[j].type,
                            'id' : store.data.items[i].data.detail[j].content,
                            'mode' : mode_cnt
                        });
                    }
                    else if(store.data.items[i].data.detail[j].type === "country"){
                        tracker_set.push({
                            'type' : store.data.items[i].data.detail[j].type,
                            'nation' : store.data.items[i].data.detail[j].content,
                            'mode' : mode_cnt
                        });
                    }
                    else if(store.data.items[i].data.detail[j].type === "fsid"){
                        tracker_set.push({
                            'type' : store.data.items[i].data.detail[j].type,
                            'fsid' : store.data.items[i].data.detail[j].content,
                            'mode' : mode_cnt
                        });
                    }
                    else if(store.data.items[i].data.detail[j].type === "url"){
                        tracker_set.push({
                            'type' : store.data.items[i].data.detail[j].type,
                            'url' : store.data.items[i].data.detail[j].content,
                            'mode' : mode_cnt
                        });
                    }
                    else if(store.data.items[i].data.detail[j].type === "category"){
                        tracker_set.push({
                            'type' : store.data.items[i].data.detail[j].type,
                            'mode' : mode_cnt
                        });
                    }
                }

                var tracker_chart = [];
                //         console.log(store.data.items[i].data);
                //         if(me.edit === "edit"){
                //             tracker_chart.push({
                //                 'chk_prev' : store.data.items[i].data.graph[0].chk_prev,
                //                 'chk_basic' : store.data.items[i].data.graph[1].chk_basic,
                //                 'chk_daily' : store.data.items[i].data.graph[2].chk_daily
                //             });
                //         }
                //         else{
                tracker_chart.push({
                    'chk_prev' : store.data.items[i].data.graph[0],
                    'chk_basic' : store.data.items[i].data.graph[1],
                    'chk_daily' : store.data.items[i].data.graph[2]
                });
                //         }

                tracker.push({
                    'desc' : tracker_desc,
                    'basic' : basic,
                    'setting' : tracker_set,
                    'time_chart' : tracker_chart,
                    'mode' : tracker_num
                });
                tracker_num++;
            }
            var rp_cnt = 0;
            if(me.edit === "edit"){ rp_cnt = me.record.report.length; }

            obj = {
                'name' : Ext.getCmp('atoz_report_name').getValue(),
                'desc' : Ext.getCmp('atoz_report_desc').getValue(),
                'email' : email,
                'setting' : setting,
                'system' : system,
                'tracker' : tracker,
                'use' : "on",
                'report_cnt' : rp_cnt,
                'type' : "report"
            };
        }
        else{
            var rp_cnt = 0;
            if(me.edit === "edit"){ rp_cnt = me.record.report.length; }

            obj = {
                'name' : Ext.getCmp('atoz_report_name').getValue(),
                'desc' : Ext.getCmp('atoz_report_desc').getValue(),
                'email' : email,
                'setting' : setting,
                'system' : system,
                'use' : "on",
                'report_cnt' : rp_cnt,
                'type' : "report"
            };
        }
        var update = false;

        if(me.edit === "edit"){
            update = true;
            obj['_id'] = me.record.id;
        }
        else{
            obj.report = [];
        }

        var _params = {
            basename : Ext.encode('atoz_report'),
            obj : Ext.encode(obj),
            update : Ext.encode(update)
        };
        showLoadMask();
        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setListTypeObj',
            _params,
            function(response){
                Ext.getCmp('NFW2_report_generate').get_report();

                hideLoadMask();
                if(me.edit === "edit"){
                    Ext.Msg.show({
                        title: __weguardia,
                        width: 300,
                        msg: get_msg('msg_ok_edit'),
                        buttons: Ext.Msg.OK,
                        fn: setWinClose,
                        icon: Ext.window.MessageBox.INFO
                    });
                }
                else{
                    Ext.Msg.show({
                        title: __weguardia,
                        msg: get_msg("msg_ok_add"),
                        width: 300,
                        buttons: Ext.Msg.YESNO,
                        buttonText:{
                            yes: __zen('add_plus'),
                            no: __zen('close')
                        },
                        fn: me.set_api,
                        icon: Ext.window.MessageBox.INFO
                    });
                }
            }
        );
    },

    onButtonBlur1: function(component, event, eOpts) {
        var me = Ext.getCmp('win_report_generate');

        if(me.set_btn === true){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
            err_fl.removeCls('ic_msg_err');
            err_fl.update('');

            me.set_btn = false;
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        this.close();
    },

    onWin_report_generateClose: function(panel, eOpts) {
        Ext.data.StoreManager.lookup('store_atoz_report_email').removeAll();
    },

    tracker_cancel: function() {
        var me = Ext.getCmp('NFW2_report_generate');

        Ext.suspendLayouts();
        Ext.getCmp('tracker_chk1').setValue(false);

        for(var i = 1;i<11;i++){
            Ext.getCmp('tracker_con'+i).hide();
            Ext.getCmp('tracker_comp_combo'+i).show();
            Ext.getCmp('tracker_class_combo'+i).show();
            Ext.getCmp('tracker_action_combo'+i).setFieldLabel('행위');

            Ext.getCmp('tracker_detail_add_con'+i).enable(true);
            me.tracker_cnt = 1;
            var record = [];
            record.push({
                'value' : 'src'
            });

            Ext.getCmp('tracker_grid'+i).getStore().removeAll();
            Ext.getCmp('tracker_grid'+i).getStore().add(record);

            Ext.getCmp('tracker_name'+i).reset();
            Ext.getCmp('tracker_output_combo'+i).setValue("10");
            Ext.getCmp('tracker_type_combo'+i).setValue("fw");
            Ext.getCmp('tracker_action_combo'+i).setValue("0");
            Ext.getCmp('tracker_class_combo'+i).setValue("0");
            Ext.getCmp('tracker_sortrole_combo'+i).setValue("packet");
            Ext.getCmp('tracker_sort_combo'+i).setValue("0");
            Ext.getCmp('tracker_comp_combo'+i).setValue("all");
            Ext.getCmp('tracker_time_combo'+i).setValue("0");
            Ext.getCmp('tracker_timeend_combo'+i).setValue("24");
        }

        for(var k = 1;k < 31;k++){
            Ext.getCmp('tracker_graph_chk'+k).setValue(false);
        }

        Ext.resumeLayouts();
        Ext.getCmp('atoz_report_con').doLayout();
    },

    set_api: function(btn) {
        if(btn==="no"){
            var win = Ext.WindowManager.getActive();
            if (win) {
                win.close();
            }
        }else{
            Ext.getCmp('atoz_report_name').reset();
            Ext.getCmp('atoz_report_desc').reset();
            Ext.getCmp('atoz_email').reset();
            Ext.getCmp('report_date_set_combo').setValue('day');
            Ext.getCmp('report_date_set_combo2').setValue('bef');
            Ext.getCmp("date_st").setValue(new Date());
            Ext.getCmp("date_dt").setValue(new Date());
            Ext.getCmp('report_set_savedelay').setValue('7');
            Ext.getCmp('report_set_maketime').setValue('1');
            for(var i=1;i<7;i++){
                Ext.getCmp('report_system_chk'+i).setValue(false);
            }
            Ext.getCmp('tracker_chk1').setValue(false);
            Ext.data.StoreManager.lookup('store_atoz_report_email').removeAll();

            Ext.ComponentQuery.query('label[cls="errorBox"]').forEach(function(cls){ cls.hide(); });
        }

    },

    validation_email: function(mail) {
        if(!CheckNotNull(mail)){ return get_msg('err_null'); }
        if(!ValidEmail(mail)){ return get_msg('err_form'); }

        return true;
    }

});