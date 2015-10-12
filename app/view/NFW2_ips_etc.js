
Ext.define('NFW2.view.NFW2_ips_etc', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_ips_etc',

    requires: [
        'NFW2.view.NFW2_ips_etcViewModel',
        'Ext.form.Panel',
        'Ext.tab.Panel',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.tab.Tab',
        'Ext.button.Segmented',
        'Ext.XTemplate',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_ips_etc'
    },
    cls: 'zen_body',
    id: 'NFW2_ips_etc',
    width: 900,
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender',
        render: 'onPanelRender'
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
                    id: 'btn_ok',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onBtn_okClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    id: 'btn_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onBtn_cancelClick'
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
                                xtype: 'tabpanel',
                                cls: 'zen_tab',
                                id: 'ips_etc_tab',
                                activeTab: 1,
                                items: [
                                    {
                                        xtype: 'panel',
                                        bind: {
                                            title: '{operate_setting}'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                cls: 'zen_tab_body',
                                                margin: '0 0 0 0',
                                                layout: {
                                                    type: 'vbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'fieldset',
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
                                                                        xtype: 'checkboxfield',
                                                                        hidden: true,
                                                                        id: 'ids_chk1',
                                                                        fieldLabel: 'IDS 모드로 동작',
                                                                        labelSeparator: ' ',
                                                                        labelWidth: 120,
                                                                        listeners: {
                                                                            change: 'onIds_chkChange'
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        cls: 'mt_info',
                                                                        hidden: true,
                                                                        margin: '5 0 0 5',
                                                                        text: '(Bridge 모드에서만 동작)'
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'container',
                                                                disabled: true,
                                                                id: 'ips_etc_con1',
                                                                margin: '5 0 0 0',
                                                                items: [
                                                                    {
                                                                        xtype: 'combobox',
                                                                        validator: function(value) {
                                                                            var me = Ext.getCmp('NFW2_ips_etc');
                                                                            if(Ext.getCmp('ips_etc_inter').getStore().getCount() === 0){ return get_msg('err_interzero'); }
                                                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                            for(var i in me.policy_inter){
                                                                                for(var j in me.policy_inter[i].inter){
                                                                                    if(value === me.policy_inter[i].inter[j].inter){
                                                                                        return msg_ips_etc(me.policy_inter[i].uid);
                                                                                    }
                                                                                }
                                                                            }

                                                                            return true;
                                                                        },
                                                                        id: 'ips_etc_inter',
                                                                        width: 320,
                                                                        labelCls: 'lb_req',
                                                                        labelSeparator: ' ',
                                                                        labelWidth: 120,
                                                                        msgTarget: 'none',
                                                                        editable: false,
                                                                        emptyText: 'Select',
                                                                        displayField: 'name',
                                                                        queryMode: 'local',
                                                                        store: 'store_interface',
                                                                        valueField: 'name',
                                                                        bind: {
                                                                            fieldLabel: '{inter}'
                                                                        },
                                                                        listeners: {
                                                                            errorchange: 'onIps_etc_interErrorChange',
                                                                            blur: 'onIps_etc_interBlur',
                                                                            focus: 'onIps_etc_interFocus'
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'container',
                                                                disabled: true,
                                                                id: 'ips_etc_con2',
                                                                margin: '5 0 0 0',
                                                                items: [
                                                                    {
                                                                        xtype: 'combobox',
                                                                        validator: function(value) {
                                                                            if(value !== true){
                                                                                if(Ext.getCmp('ips_etc_profile').getStore().getCount() === 0){ return get_msg('err_ipsetcprof'); }
                                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                            }

                                                                            return true;
                                                                        },
                                                                        id: 'ips_etc_profile',
                                                                        width: 320,
                                                                        labelCls: 'lb_req',
                                                                        labelSeparator: ' ',
                                                                        labelWidth: 120,
                                                                        msgTarget: 'none',
                                                                        editable: false,
                                                                        emptyText: 'Select',
                                                                        displayField: 'name',
                                                                        queryMode: 'local',
                                                                        store: 'store_ips_etc_profile_list',
                                                                        valueField: '@num',
                                                                        bind: {
                                                                            fieldLabel: '{profile_name}'
                                                                        },
                                                                        listeners: {
                                                                            errorchange: 'onIps_etc_profileErrorChange',
                                                                            blur: 'onIps_etc_profileBlur',
                                                                            focus: 'onIps_etc_profileFocus'
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
                                                        xtype: 'fieldset',
                                                        flex: 1,
                                                        id: 'ips_etc_static_bridge_field',
                                                        margin: '0 0 10 0',
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
                                                                        xtype: 'button',
                                                                        cls: 'btn_b',
                                                                        iconCls: 'icb_add',
                                                                        bind: {
                                                                            text: '{add}'
                                                                        },
                                                                        listeners: {
                                                                            click: 'onButtonClick2'
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'button',
                                                                        cls: 'btn_b',
                                                                        margin: '0 0 0 5',
                                                                        iconCls: 'icb_del',
                                                                        bind: {
                                                                            text: '{del}'
                                                                        },
                                                                        listeners: {
                                                                            click: 'onButtonClick11'
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'container',
                                                                margin: '5 0 5 0',
                                                                items: [
                                                                    {
                                                                        xtype: 'gridpanel',
                                                                        cls: 'in_grid',
                                                                        id: 'ips_etc_static_bridge_grid',
                                                                        header: false,
                                                                        title: 'My Grid Panel',
                                                                        columnLines: true,
                                                                        columns: [
                                                                            {
                                                                                xtype: 'rownumberer',
                                                                                width: 60,
                                                                                align: 'center',
                                                                                dataIndex: 'string',
                                                                                text: 'N'
                                                                            },
                                                                            {
                                                                                xtype: 'gridcolumn',
                                                                                align: 'center',
                                                                                dataIndex: 'inter1',
                                                                                flex: 0.2,
                                                                                bind: {
                                                                                    text: '{inter1}'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'gridcolumn',
                                                                                align: 'center',
                                                                                dataIndex: 'inter2',
                                                                                flex: 0.2,
                                                                                bind: {
                                                                                    text: '{inter2}'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'gridcolumn',
                                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    var store = Ext.data.StoreManager.lookup('store_ips_etc_profile_list');

                                                                                    for(var i in store.data.items){
                                                                                        if(store.data.items[i].data['@num'] === value){ return store.data.items[i].data.name; }
                                                                                    }

                                                                                    return "";
                                                                                },
                                                                                align: 'center',
                                                                                dataIndex: 'profile',
                                                                                flex: 0.4,
                                                                                bind: {
                                                                                    text: '{profile_name}'
                                                                                }
                                                                            }
                                                                        ],
                                                                        listeners: {
                                                                            celldblclick: 'onIps_etc_static_bridge_gridCellDblClick'
                                                                        },
                                                                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                                                                            selType: 'checkboxmodel'
                                                                        })
                                                                    }
                                                                ]
                                                            }
                                                        ],
                                                        listeners: {
                                                            afterrender: 'onIps_etc_static_bridge_fieldAfterRender'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        bind: {
                                            title: '{advance_setting}'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                cls: 'zen_tab_body',
                                                hidden: true,
                                                id: 'ips_detail_set_con',
                                                margin: '0 0 10 0',
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        layout: {
                                                            type: 'hbox',
                                                            align: 'stretch'
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'label',
                                                                margin: '0 0 0 10',
                                                                width: 160,
                                                                bind: {
                                                                    text: '{sec_strength}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'segmentedbutton',
                                                                cls: 'zen_seg',
                                                                items: [
                                                                    {
                                                                        id: 'ips_etc_seg1',
                                                                        enableToggle: true,
                                                                        pressed: true,
                                                                        bind: {
                                                                            text: '{normal}'
                                                                        }
                                                                    },
                                                                    {
                                                                        id: 'ips_etc_seg2',
                                                                        bind: {
                                                                            text: '{high}'
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'fieldset',
                                                        id: 'stream_set_field',
                                                        listeners: {
                                                            afterrender: 'onFieldsetRender1'
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'container',
                                                                id: 'stream_set_con',
                                                                margin: '0 0 10 0',
                                                                items: [
                                                                    {
                                                                        xtype: 'container',
                                                                        margin: '8 0 0 0',
                                                                        layout: {
                                                                            type: 'hbox',
                                                                            align: 'stretch'
                                                                        },
                                                                        items: [
                                                                            {
                                                                                xtype: 'label',
                                                                                margin: '0 0 0 10',
                                                                                width: 160,
                                                                                bind: {
                                                                                    text: '{http_inspect}'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'container',
                                                                                html: '<div id="inspect_chk"/>',
                                                                                id: 'http_inspect_con',
                                                                                listeners: {
                                                                                    render: 'onContainerRender'
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
                                                                                xtype: 'label',
                                                                                margin: '0 0 0 10',
                                                                                width: 160,
                                                                                bind: {
                                                                                    text: '{rpc_decode}'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'container',
                                                                                html: '<div id="rpc_decode_chk"/>',
                                                                                id: 'rpc_decode_con',
                                                                                listeners: {
                                                                                    render: 'onContainerRender11'
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
                                                                                xtype: 'label',
                                                                                margin: '0 0 0 10',
                                                                                width: 160,
                                                                                bind: {
                                                                                    text: '{stream_insert}'
                                                                                }
                                                                            },
                                                                            {
                                                                                xtype: 'container',
                                                                                html: '<div id="stream_insert_chk"/>',
                                                                                id: 'stream_insert_con',
                                                                                listeners: {
                                                                                    render: 'onContainerRender11111'
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        xtype: 'container',
                                                                        margin: '8 0 0 0',
                                                                        items: [
                                                                            {
                                                                                xtype: 'textfield',
                                                                                validator: function(value) {
                                                                                    if(value !== true){
                                                                                        var _value = removeComma(value);

                                                                                        if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                                                        if(!LengthCheck(_value, 1024, 104857600)){ return ValidLimit(addComma(1024), addComma(104857600)); }
                                                                                    }

                                                                                    return true;
                                                                                },
                                                                                fieldInfo: {
                                                                                    txt: msg_tip_length(1024,
                                                                                    104857600,
                                                                                    null)
                                                                                },
                                                                                cls: 'inp_unit',
                                                                                id: 'ips_max_queue',
                                                                                margin: '0 0 0 -10',
                                                                                width: 350,
                                                                                afterBodyEl: [
                                                                                    '<div class="inp_after">{[__zen(\'bytes\')]}</div>'
                                                                                ],
                                                                                labelCls: 'lb_req',
                                                                                labelSeparator: ' ',
                                                                                labelWidth: 150,
                                                                                msgTarget: 'none',
                                                                                value: '1,513',
                                                                                enableKeyEvents: true,
                                                                                enforceMaxLength: true,
                                                                                maskRe: /[0-9]/,
                                                                                maxLength: 11,
                                                                                maxLengthText: ' ',
                                                                                bind: {
                                                                                    fieldLabel: '{reorder_packet}'
                                                                                },
                                                                                listeners: {
                                                                                    focus: 'onTextfieldFocus',
                                                                                    blur: 'onTextfieldBlur',
                                                                                    change: 'onTextfieldChange',
                                                                                    errorchange: 'onIps_max_queueErrorChange',
                                                                                    keydown: 'onIps_max_queueKeydown'
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container'
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
                                                                xtype: 'label',
                                                                margin: '0 0 0 10',
                                                                width: 160,
                                                                bind: {
                                                                    text: '{back_orifice}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'container',
                                                                html: '<div id="orifice_chk"/>',
                                                                id: 'back_orifice_con',
                                                                listeners: {
                                                                    render: 'onContainerRender1'
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
                                                                xtype: 'label',
                                                                margin: '0 0 0 10',
                                                                width: 160,
                                                                bind: {
                                                                    text: '{normalize}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'container',
                                                                html: '<div id="normalize_chk"/>',
                                                                id: 'normalize_con',
                                                                listeners: {
                                                                    render: 'onContainerRender111'
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
                                                                xtype: 'label',
                                                                margin: '0 0 0 10',
                                                                width: 160,
                                                                bind: {
                                                                    text: '{check_sum}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'container',
                                                                html: '<div id="checksum_chk"/>',
                                                                id: 'checksum_con',
                                                                listeners: {
                                                                    render: 'onContainerRender1111'
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ],
                                        tabConfig: {
                                            xtype: 'tab',
                                            listeners: {
                                                click: 'onTabClick'
                                            }
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

    onIds_chkChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('ips_etc_con1').setDisabled(false);
            Ext.getCmp('ips_etc_con2').setDisabled(false);
        }
        else{
            Ext.getCmp('ips_etc_con1').setDisabled(true);
            Ext.getCmp('ips_etc_con2').setDisabled(true);
            Ext.getCmp("ips_etc_inter").reset();
            Ext.getCmp('ips_etc_profile').reset();
            Ext.getCmp('ips_etc_error').hide();
        }
    },

    onIps_etc_interErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onIps_etc_interBlur: function(component, event, eOpts) {
        Ext.getCmp('ips_etc_inter').validateValue(true);
    },

    onIps_etc_interFocus: function(component, event, eOpts) {
        if(component.getStore().getCount() === 0){
            component.isValid();
        }
    },

    onIps_etc_profileErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onIps_etc_profileBlur: function(component, event, eOpts) {
        Ext.getCmp('ips_etc_profile').validateValue(true);
    },

    onIps_etc_profileFocus: function(component, event, eOpts) {
        if(component.getStore().getCount() === 0){
            component.isValid();
        }
    },

    onFieldsetRender: function(component, eOpts) {
        component.setTitle(__zen('operate_ids'));

        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'ids_chk',
            style:'margin-left:765px',
            resizeHandle: false,
            state: false,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    if(newValue){
                        Ext.getCmp('ips_etc_con1').setDisabled(false);
                        Ext.getCmp('ips_etc_con2').setDisabled(false);
                    }
                    else{
                        Ext.getCmp('ips_etc_con1').setDisabled(true);
                        Ext.getCmp('ips_etc_con2').setDisabled(true);
                        Ext.getCmp("ips_etc_inter").reset();
                        Ext.getCmp('ips_etc_profile').reset();
                        Ext.getCmp('ips_etc_error').hide();
                    }
                }
            }
        });

        component.legend.add(tbutton);

    },

    onButtonClick2: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_ips_etc_static',{
            inter_set : Ext.getCmp('NFW2_ips_etc').inter_set,
            modal : true
        });
        win.show();

    },

    onButtonClick11: function(button, e, eOpts) {
        var tbl = Ext.getCmp("ips_etc_static_bridge_grid");
        var tbl_sel = tbl.getSelectionModel().getSelection();
        var store = Ext.getCmp('ips_etc_static_bridge_grid').getStore();

        if(tbl_sel.length === 0){
            Ext.Msg.alert("",get_msg("sel_del"));
            return false;
        }

        var record = [];

        for(var i in store.data.items){
            var chk = false;
            for(var j in tbl_sel){
                if(store.data.items[i].data.inter1 === tbl_sel[j].data.inter1){ chk = true; }
            }

            if(!chk){
                record.push({
                    'inter1' : store.data.items[i].data.inter1,
                    'inter2' : store.data.items[i].data.inter2,
                    'profile' : store.data.items[i].data.profile
                });
            }
        }

        store.loadData(record);

        var _params = {

            option : Ext.encode('all')

        };

        Ext.data.JsonP.request({

            url : "/api/ftuctrl/get_pname_list",
            params : _params,
            success : function(response2){
                var inter_record = [];
                for(var i in response2.retval){
                    var chk = false;
                    for(var j in Ext.getCmp('ips_etc_static_bridge_grid').getStore().data.items){
                        if(response2.retval[i].name === Ext.getCmp('ips_etc_static_bridge_grid').getStore().data.items[j].data.inter1){ chk = true; }
                        if(response2.retval[i].name === Ext.getCmp('ips_etc_static_bridge_grid').getStore().data.items[j].data.inter2){ chk = true; }
                    }
                    if(chk === false){
                        inter_record.push({
                            'name' : response2.retval[i].name
                        });
                    }
                }

                Ext.getCmp('ips_etc_inter').getStore().loadData(inter_record);
            },
            failure : function(response2){
                hideLoadMask();
                Ext.Msg.show({
                    title : 'Error message',
                    msg : 'Error Message',
                    width : 300,
                    buttons : Ext.Msg.OK,
                    icon:Ext.window.MessageBox.INFO
                });
            }
        });


    },

    onIps_etc_static_bridge_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex !== 0){
            var win = Ext.create('NFW2.view.win_ips_etc_static',{
                inter_set : Ext.getCmp('NFW2_ips_etc').inter_set,
                edit : "edit",
                record : record,
                index : rowIndex,
                modal : true
            });
            win.show();
        }
    },

    onIps_etc_static_bridge_fieldAfterRender: function(component, eOpts) {
        component.setTitle(__zen('operate_bridge'));
    },

    onFieldsetRender1: function(component, eOpts) {
        component.setTitle('Stream 설정');

        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'stream_set_chk',
            style:'margin-left:765px',
            resizeHandle: false,
            state: true,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    if(newValue){
                        Ext.getCmp('stream_set_con').enable();
                        Ext.getCmp("chk_inspect").state = false;
                        Ext.getCmp("chk_inspect").moveHandle(false);
                        Ext.getCmp("chk_rpc_decode").state = true;
                        Ext.getCmp("chk_rpc_decode").moveHandle(true);
                        Ext.getCmp("chk_stream_insert").state = true;
                        Ext.getCmp("chk_stream_insert").moveHandle(true);
                        Ext.getCmp('ips_max_queue').setValue(1513);
                    }
                    else{
                        Ext.getCmp('stream_set_con').disable();
                        Ext.getCmp("chk_inspect").state = false;
                        Ext.getCmp("chk_inspect").moveHandle(false);
                        Ext.getCmp("chk_rpc_decode").state = false;
                        Ext.getCmp("chk_rpc_decode").moveHandle(false);
                        Ext.getCmp("chk_stream_insert").state = false;
                        Ext.getCmp("chk_stream_insert").moveHandle(false);
                        Ext.getCmp('ips_max_queue').setValue(1513);
                    }
                }
            }
        });

        component.legend.add(tbutton);
    },

    onContainerRender: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'chk_inspect',
            renderTo: 'inspect_chk',
            style:'margin-left:0px',
            resizeHandle: false,
            state: false,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){

                }
            }
        });
    },

    onContainerRender11: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'chk_rpc_decode',
            renderTo: 'rpc_decode_chk',
            style:'margin-left:0px',
            resizeHandle: false,
            state: true,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){

                }
            }
        });
    },

    onContainerRender11111: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'chk_stream_insert',
            renderTo: 'stream_insert_chk',
            style:'margin-left:0px',
            resizeHandle: false,
            state: true,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){

                }
            }
        });
    },

    onTextfieldFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onTextfieldBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onTextfieldChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onIps_max_queueErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onIps_max_queueKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onContainerRender1: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'chk_orifice',
            renderTo: 'orifice_chk',
            style:'margin-left:0px',
            resizeHandle: false,
            state: true,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){

                }
            }
        });
    },

    onContainerRender111: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'chk_normalize',
            renderTo: 'normalize_chk',
            style:'margin-left:0px',
            resizeHandle: false,
            state: true,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){

                }
            }
        });
    },

    onContainerRender1111: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'chk_checksum',
            renderTo: 'checksum_chk',
            style:'margin-left:0px',
            resizeHandle: false,
            state: true,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){

                }
            }
        });
    },

    onTabClick: function(button, e, eOpts) {
        Ext.getCmp('ips_detail_set_con').show();
    },

    onPanelAfterRender: function(component, eOpts) {
        Ext.data.StoreManager.lookup('store_ips_etc_profile_list').load();

        var me = this;
        this.fieldInfo = makeZenTip();
        me.policy_inter = [];

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'isCC',
            {},
            function(response){
                if(response === true){
                    me.isCC = true;
                    Ext.getCmp('ips_etc_static_bridge_field').hide();
                }
                else{
                    me.isCC = false;
                    Ext.getCmp('ips_etc_static_bridge_field').show();
                }
            }
        );

        var _params = {
            basename : Ext.encode('network_interface')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){
                hideLoadMask();

                var record2 = [];
                for(var j in response.network.bridge){
                    for(var k in response.network.bridge[j]['default'].member){
                        record2.push(response.network.bridge[j]['default'].member[k]);
                    }
                }

                var _params = {

                    option : Ext.encode('all')

                };

                Ext.data.JsonP.request({

                    url : "/api/ftuctrl/get_pname_list",
                    params : _params,
                    success : function(response2){

                        var _params = {
                            basename : Ext.encode('ips_default')
                        };

                        request_helper.xmlrpc_call_JsonP(
                            'ftuctrl',
                            'getObject',
                            _params,
                            function(response){
                                if(response !== null){
                                    if(response.ids_modechk_use === "on"){
                                        Ext.getCmp("ids_chk").state = true;
                                        Ext.getCmp("ids_chk").moveHandle(true);
                                        Ext.getCmp('ips_etc_con1').setDisabled(false);
                                        Ext.getCmp('ips_etc_con2').setDisabled(false);
                                        Ext.getCmp('NFW2_ips_etc').inter_set = response['interface'];
                                        Ext.getCmp('ips_etc_profile').setValue(response.profile_id);
                                    }
                                    else{
                                        Ext.getCmp("ids_chk").state = false;
                                        Ext.getCmp("ids_chk").moveHandle(false);
                                        Ext.getCmp('ips_etc_con1').setDisabled(true);
                                        Ext.getCmp('ips_etc_con2').setDisabled(true);
                                    }

                                    if(response.stream_set === "on"){
                                        Ext.getCmp('stream_set_chk').state = true;
                                        //                                 Ext.getCmp('stream_set_chk').moveHandle(true);
                                        Ext.getCmp('stream_set_con').enable();
                                        Ext.getCmp("chk_inspect").state = false;
                                        Ext.getCmp("chk_inspect").moveHandle(false);
                                        Ext.getCmp("chk_rpc_decode").state = true;
                                        Ext.getCmp("chk_rpc_decode").moveHandle(true);
                                        Ext.getCmp("chk_stream_insert").state = true;
                                        Ext.getCmp("chk_stream_insert").moveHandle(true);
                                        Ext.getCmp('ips_max_queue').setValue(1513);
                                    }
                                    else{
                                        Ext.getCmp('stream_set_chk').state = false;
                                        //                                 Ext.getCmp('stream_set_chk').moveHandle(false);
                                        Ext.getCmp('stream_set_con').disable();
                                        Ext.getCmp("chk_inspect").state = false;
                                        Ext.getCmp("chk_inspect").moveHandle(false);
                                        Ext.getCmp("chk_rpc_decode").state = false;
                                        Ext.getCmp("chk_rpc_decode").moveHandle(false);
                                        Ext.getCmp("chk_stream_insert").state = false;
                                        Ext.getCmp("chk_stream_insert").moveHandle(false);
                                        Ext.getCmp('ips_max_queue').setValue(1513);
                                    }

                                    if(response.http_inspect_use === "on"){
                                        Ext.getCmp("chk_inspect").state = true;
                                        Ext.getCmp("chk_inspect").moveHandle(true);
                                    }
                                    else{
                                        Ext.getCmp("chk_inspect").state = false;
                                        Ext.getCmp("chk_inspect").moveHandle(false);
                                    }

                                    if(response.back_orifice_use === "on"){
                                        Ext.getCmp("chk_orifice").state = true;
                                        Ext.getCmp("chk_orifice").moveHandle(true);
                                    }
                                    else{
                                        Ext.getCmp("chk_orifice").state = false;
                                        Ext.getCmp("chk_orifice").moveHandle(false);
                                    }

                                    if(response.rpc_decode_use === "on"){
                                        Ext.getCmp("chk_rpc_decode").state = true;
                                        Ext.getCmp("chk_rpc_decode").moveHandle(true);
                                    }
                                    else{
                                        Ext.getCmp("chk_rpc_decode").state = false;
                                        Ext.getCmp("chk_rpc_decode").moveHandle(false);
                                    }

                                    if(response.normalize_use === "on"){
                                        Ext.getCmp("chk_normalize").state = true;
                                        Ext.getCmp("chk_normalize").moveHandle(true);
                                    }
                                    else{
                                        Ext.getCmp("chk_normalize").state = false;
                                        Ext.getCmp("chk_normalize").moveHandle(false);
                                    }

                                    if(response.checksum_mode_use === "on"){
                                        Ext.getCmp("chk_checksum").state = true;
                                        Ext.getCmp("chk_checksum").moveHandle(true);
                                    }
                                    else{
                                        Ext.getCmp("chk_checksum").state = false;
                                        Ext.getCmp("chk_checksum").moveHandle(false);
                                    }

                                    if(response.stream_insert_use === "on"){
                                        Ext.getCmp("chk_stream_insert").state = true;
                                        Ext.getCmp("chk_stream_insert").moveHandle(true);
                                    }
                                    else{
                                        Ext.getCmp("chk_stream_insert").state = false;
                                        Ext.getCmp("chk_stream_insert").moveHandle(false);
                                    }

                                    if(response.max_queue_byte === ""){
                                        Ext.getCmp('ips_max_queue').setValue(1513);
                                    }
                                    else if(response.max_queue_byte === "0"){
                                        Ext.getCmp('ips_max_queue').setValue(1513);
                                    }
                                    else{
                                        Ext.getCmp('ips_max_queue').setValue(response.max_queue_byte);
                                    }

                                    if(response.security_level === "high"){ Ext.getCmp('ips_etc_seg2').toggle(true); }
                                    else{ Ext.getCmp('ips_etc_seg1').toggle(true); }
                                    //                     var record = [];

                                    //                     for(var i in response.bridge_mode){
                                    //                         record.push({
                                    //                             'inter' : response.bridge_mode[i]['interface'],
                                    //                             'profile' : response.bridge_mode[i].profile_id
                                    //                         });
                                    //                     }

                                    //                     Ext.getCmp('ips_etc_bridge_grid').getStore().loadData(record);

                                    var static_record = [];

                                    for(var j in response.static_bridge_mode){
                                        static_record.push({
                                            'inter1' : response.static_bridge_mode[j]['interface'][0],
                                            'inter2' : response.static_bridge_mode[j]['interface'][1],
                                            'profile' : response.static_bridge_mode[j].profile_id
                                        });
                                    }

                                    Ext.getCmp('ips_etc_static_bridge_grid').getStore().loadData(static_record);

                                }

                                var records = [];
                                if(response2.retcode){
                                    for(var n in response2.retval){
                                        var chk = false;
                                        for(var l in record2){
                                            if(record2[l] === response2.retval[n].name){ chk = true; }
                                        }
                                        for(var m in Ext.getCmp('ips_etc_static_bridge_grid').getStore().data.items){
                                            if(response2.retval[n].name === Ext.getCmp('ips_etc_static_bridge_grid').getStore().data.items[m].data.inter1){ chk = true; }
                                            if(response2.retval[n].name === Ext.getCmp('ips_etc_static_bridge_grid').getStore().data.items[m].data.inter2){ chk = true; }
                                        }

                                        if(chk === false){
                                            records.push({
                                                name : response2.retval[n].name
                                            });
                                        }
                                    }

                                    var _store = Ext.data.StoreManager.lookup('store_interface');
                                    _store.loadData(records);
                                    if(response !== null){
                                        if(response.ids_modechk_use === "on"){
                                            Ext.getCmp('ips_etc_inter').setValue(response['interface']);
                                        }
                                    }
                                }
                            }
                        );
                    },
                    failure : function(response2){
                        hideLoadMask();
                        Ext.Msg.show({
                            title : 'Error message',
                            msg : 'Error Message',
                            width : 300,
                            buttons : Ext.Msg.OK,
                            icon:Ext.window.MessageBox.INFO
                        });
                    }
                });


            }
        );

        var _params = {
            basename : Ext.encode('firewall_filter_ipv4')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _params,
            function(response){
                if(response.list !== null){
                    for(var i in response.list){
                        console.log(response.list[i]);
                        var policy_uid = response.list[i]['@uid'];
                        var inter_array = [];
                        for(var j in response.list[i].dest){
                            if(response.list[i].dest[j]['#text'] !== "Any"){
                                var inter_temp = response.list[i].dest[j]['@cid'].split('$');

                                inter_array.push({
                                    "inter" : inter_temp[1]
                                });
                            }
                        }

                        for(var k in response.list[i].src){
                            if(response.list[i].src[k]['#text'] !== "Any"){
                                var inter_temp2 = response.list[i].src[k]['@cid'].split('$');

                                inter_array.push({
                                    "inter" : inter_temp2[1]
                                });
                            }
                        }

                        if(inter_array.length !== 0){
                            me.policy_inter.push({
                                'uid' : policy_uid,
                                'inter' : inter_array
                            });
                        }
                    }
                }
            }
        );
    },

    onPanelRender: function(component, eOpts) {

        Ext.getCmp('ips_etc_tab').setActiveTab(0);

        var store_static = {
            fields:[
                {
                    name : 'inter1'
                },
                {
                    name : 'inter2'
                },
                {
                    name : 'profile'
                }
            ]
        };

        Ext.getCmp('ips_etc_static_bridge_grid').reconfigure(store_static);
    },

    onBtn_okClick: function(button, e, eOpts) {
        var use;
        var me = Ext.getCmp('NFW2_ips_etc');

        if(Ext.getCmp('ids_chk').getValue()){
            use = "on";
            if(Ext.getCmp('ips_etc_inter').isValid() === false){ Ext.getCmp('ips_etc_inter').focus(); return false; }
            if(Ext.getCmp('ips_etc_profile').isValid() === false){ Ext.getCmp('ips_etc_profile').focus(); return false; }

        }
        else{ use = "off"; }

        var obj = {};

        if(use === "off"){
            obj ={
                "ids_modechk_use" : use
            };
        }
        else{
            Ext.getCmp('NFW2_ips_etc').inter_set = Ext.getCmp('ips_etc_inter').getValue();
            obj ={
                "ids_modechk_use" : use,
                "interface" : Ext.getCmp('ips_etc_inter').getValue(),
                "profile_id" : Ext.getCmp('ips_etc_profile').getValue()
            };
        }

        if(Ext.getCmp('ips_max_queue').isValid() === false){ Ext.getCmp('ips_etc_tab').setActiveTab(1); Ext.getCmp('ips_max_queue').focus(); return false; }

        var static_bridge = [];
        var static_store = Ext.getCmp('ips_etc_static_bridge_grid').getStore();

        for(var i in static_store.data.items){
            var static_inter = [];
            static_inter.push(static_store.data.items[i].data.inter1);
            static_inter.push(static_store.data.items[i].data.inter2);

            static_bridge.push({
                'interface' : static_inter,
                'profile_id' : static_store.data.items[i].data.profile
            });
        }

        obj.static_bridge_mode = static_bridge;

        if(Ext.getCmp('ips_etc_seg1').pressed){ obj.security_level = "mid"; }
        else{ obj.security_level = "high"; }

        if(Ext.getCmp('stream_set_chk').getValue() === true){
            obj.stream_set  = "on";
            obj.max_queue_byte = removeComma(Ext.getCmp('ips_max_queue').getValue());
        }
        else{
            obj.stream_set  = "off";
            obj.max_queue_byte = removeComma("0");
        }
        if(Ext.getCmp('chk_inspect').getValue() === true){ obj.http_inspect_use = "on"; }
        else{ obj.http_inspect_use = "off"; }
        if(Ext.getCmp('chk_orifice').getValue() === true){ obj.back_orifice_use = "on"; }
        else{ obj.back_orifice_use = "off"; }
        if(Ext.getCmp('chk_rpc_decode').getValue() === true){ obj.rpc_decode_use = "on"; }
        else{ obj.rpc_decode_use = "off"; }
        if(Ext.getCmp('chk_normalize').getValue() === true){ obj.normalize_use = "on"; }
        else{ obj.normalize_use = "off"; }
        if(Ext.getCmp('chk_checksum').getValue() === true){ obj.checksum_mode_use = "on"; }
        else{ obj.checksum_mode_use = "off"; }
        if(Ext.getCmp('chk_stream_insert').getValue() === true){ obj.stream_insert_use = "on"; }
        else{ obj.stream_insert_use = "off"; }

        obj.pcre_to_content = "off";

        showLoadMask();
        var _params = {
            basename : Ext.encode('ips_default'),
            obj : Ext.encode(obj)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params,
            function(response){
                hideLoadMask();
                Ext.Msg.show({
                    title: __weguardia,
                    msg: get_msg('msg_ok_add'),
                    width: 300,
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });
            }
        );

    },

    onBtn_cancelClick: function(button, e, eOpts) {
        showLoadMask();

        var _params = {
            basename : Ext.encode('ips_default')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){
                hideLoadMask();
                if(response !== null){
                    if(response.ids_modechk_use === "on"){
                        Ext.getCmp("ids_chk").state = true;
                        Ext.getCmp("ids_chk").moveHandle(true);
                        Ext.getCmp('ips_etc_con1').setDisabled(false);
                        Ext.getCmp('ips_etc_con2').setDisabled(false);
                        Ext.getCmp('ips_etc_inter').setValue(response['interface']);
                        Ext.getCmp('ips_etc_profile').setValue(response.profile_id);
                    }
                    else{
                        Ext.getCmp("ids_chk").state = false;
                        Ext.getCmp("ids_chk").moveHandle(false);
                        Ext.getCmp('ips_etc_con1').setDisabled(true);
                        Ext.getCmp('ips_etc_con2').setDisabled(true);
                    }

                    if(response.http_inspect_use === "on"){
                        Ext.getCmp("chk_inspect").state = true;
                        Ext.getCmp("chk_inspect").moveHandle(true);
                    }
                    else{
                        Ext.getCmp("chk_inspect").state = false;
                        Ext.getCmp("chk_inspect").moveHandle(false);
                    }

                    if(response.back_orifice_use === "on"){
                        Ext.getCmp("chk_orifice").state = true;
                        Ext.getCmp("chk_orifice").moveHandle(true);
                    }
                    else{
                        Ext.getCmp("chk_orifice").state = false;
                        Ext.getCmp("chk_orifice").moveHandle(false);
                    }

                    if(response.rpc_decode_use === "on"){
                        Ext.getCmp("chk_rpc_decode").state = true;
                        Ext.getCmp("chk_rpc_decode").moveHandle(true);
                    }
                    else{
                        Ext.getCmp("chk_rpc_decode").state = false;
                        Ext.getCmp("chk_rpc_decode").moveHandle(false);
                    }

                    if(response.normalize_use === "on"){
                        Ext.getCmp("chk_normalize").state = true;
                        Ext.getCmp("chk_normalize").moveHandle(true);
                    }
                    else{
                        Ext.getCmp("chk_normalize").state = false;
                        Ext.getCmp("chk_normalize").moveHandle(false);
                    }

                    if(response.checksum_mode_use === "on"){
                        Ext.getCmp("chk_checksum").state = true;
                        Ext.getCmp("chk_checksum").moveHandle(true);
                    }
                    else{
                        Ext.getCmp("chk_checksum").state = false;
                        Ext.getCmp("chk_checksum").moveHandle(false);
                    }

                    if(response.stream_insert_use === "on"){
                        Ext.getCmp("chk_stream_insert").state = true;
                        Ext.getCmp("chk_stream_insert").moveHandle(true);
                    }
                    else{
                        Ext.getCmp("chk_stream_insert").state = false;
                        Ext.getCmp("chk_stream_insert").moveHandle(false);
                    }

                    Ext.getCmp('ips_max_queue').setValue(response.max_queue_byte);

                    if(response.security_level === "mid"){ Ext.getCmp('ips_etc_seg1').toggle(true); }
                    else{ Ext.getCmp('ips_etc_seg2').toggle(true); }
                    Ext.getCmp('ips_etc_tab').setActiveTab(0);
                    //             var record = [];

                    //             for(var i in response.bridge_mode){
                    //                 record.push({
                    //                     'inter' : response.bridge_mode[i]['interface'],
                    //                     'profile' : response.bridge_mode[i].profile_id
                    //                 });
                    //             }

                    //             Ext.getCmp('ips_etc_bridge_grid').getStore().loadData(record);

                    var static_record = [];

                    for(var k in response.static_bridge_mode){
                        static_record.push({
                            'inter1' : response.static_bridge_mode[k]['interface'][0],
                            'inter2' : response.static_bridge_mode[k]['interface'][1],
                            'profile' : response.static_bridge_mode[k].profile_id
                        });
                    }

                    Ext.getCmp('ips_etc_static_bridge_grid').getStore().loadData(static_record);
                }
                else{
                    Ext.getCmp('ids_chk').setValue(false);
                    Ext.getCmp("ips_etc_inter").setValue(Ext.getCmp('ips_etc_inter').getStore().data.items[0].data.name);
                    Ext.getCmp('ips_etc_profile').reset();
                    Ext.getCmp('ips_etc_bridge_grid').getStore().removeAll();
                }
            }
        );

    }

});