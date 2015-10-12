
Ext.define('NFW2.view.NFW2_firewall_policy_ipv6_NAT64', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_firewall_policy_ipv6_nat64',

    requires: [
        'NFW2.view.NFW2_firewall_policy_ipv6_NAT64ViewModel',
        'Ext.toolbar.Separator',
        'Ext.button.Split',
        'Ext.menu.Menu',
        'Ext.form.field.Date',
        'Ext.form.Label',
        'Ext.form.Panel',
        'Ext.form.field.File',
        'Ext.form.field.FileButton',
        'Ext.form.field.ComboBox',
        'Ext.form.trigger.Trigger',
        'Ext.form.FieldContainer',
        'Ext.form.field.Display',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging',
        'Ext.grid.plugin.RowExpander',
        'Ext.XTemplate'
    ],

    viewModel: {
        type: 'nfw2_firewall_policy_ipv6_nat64'
    },
    cls: 'zen_body',
    id: 'NFW2_firewall_policy_ipv6_NAT64',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onNFW2_firewall_filtering_ipv4FilteringAfterRender'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'container',
                        items: [
                            {
                                xtype: 'toolbar',
                                cls: 'zen_toolbar',
                                items: [
                                    {
                                        xtype: 'button',
                                        iconCls: 'ic_add',
                                        bind: {
                                            text: '{add}'
                                        },
                                        listeners: {
                                            click: 'on_btn_add'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'ic_del',
                                        bind: {
                                            text: '{del}'
                                        },
                                        listeners: {
                                            click: 'on_btn_del'
                                        }
                                    },
                                    {
                                        xtype: 'tbseparator'
                                    },
                                    {
                                        xtype: 'button',
                                        toggleHandler: function(button, state) {
                                            if(state===false){Ext.getCmp("cont_vf_nat").hide();}else{Ext.getCmp("cont_vf_nat").show();}
                                        },
                                        enableToggle: true,
                                        pressed: true,
                                        bind: {
                                            text: '{fw_verify}'
                                        }
                                    },
                                    {
                                        xtype: 'splitbutton',
                                        handler: function(button, e) {
                                            this.showMenu();
                                        },
                                        bind: {
                                            text: '{fw_dob}'
                                        },
                                        menu: {
                                            xtype: 'menu',
                                            shadow: false,
                                            width: 200,
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    cls: 'dv_pop_inner',
                                                    margin: '',
                                                    padding: 15,
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: 'dp_uid',
                                                            width: 160,
                                                            labelCls: 'lb_arrow',
                                                            labelSeparator: ' ',
                                                            labelWidth: 60,
                                                            maskRe: /[0-9]/,
                                                            bind: {
                                                                fieldLabel: '{rule_id}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            cls: 'ft_confirm_s',
                                                            margin: '0 0 0 35',
                                                            iconCls: 'ft_confirm_icl',
                                                            bind: {
                                                                text: '{confirm}'
                                                            },
                                                            listeners: {
                                                                click: 'onButtonClick1'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        xtype: 'splitbutton',
                                        handler: function(button, e) {
                                            this.showMenu();
                                        },
                                        bind: {
                                            text: '{fw_unrefer}'
                                        },
                                        menu: {
                                            xtype: 'menu',
                                            shadow: false,
                                            width: 260,
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    cls: 'dv_pop_inner',
                                                    margin: '',
                                                    padding: 15,
                                                    items: [
                                                        {
                                                            xtype: 'datefield',
                                                            id: 'dp_start',
                                                            width: 230,
                                                            labelCls: 'lb_arrow',
                                                            labelSeparator: ' ',
                                                            labelWidth: 60,
                                                            editable: false,
                                                            format: 'Ymd',
                                                            submitFormat: 'Ymd',
                                                            bind: {
                                                                fieldLabel: '{start_date}'
                                                            },
                                                            listeners: {
                                                                render: 'onDp_startRender'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            id: 'dp_end',
                                                            width: 230,
                                                            labelCls: 'lb_arrow',
                                                            labelSeparator: ' ',
                                                            labelWidth: 60,
                                                            editable: false,
                                                            enforceMaxLength: true,
                                                            format: 'Ymd',
                                                            submitFormat: 'Ymd',
                                                            bind: {
                                                                fieldLabel: '{end_date}'
                                                            },
                                                            listeners: {
                                                                render: 'onDp_endRender'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            cls: 'errorBox',
                                                            hidden: true,
                                                            id: 'err_unused',
                                                            margin: '10 0'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            cls: 'ft_confirm_s',
                                                            margin: '0 0 0 60',
                                                            iconCls: 'ft_confirm_icl',
                                                            bind: {
                                                                text: '{confirm}'
                                                            },
                                                            listeners: {
                                                                click: 'onButtonClick11'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        xtype: 'tbseparator'
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'ic_export',
                                        tooltipType: 'title',
                                        bind: {
                                            tooltip: '{fw_export}'
                                        },
                                        listeners: {
                                            click: 'on_btn_export'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        toggleHandler: function(button, state) {
                                            if(state===false){Ext.getCmp("ct_import").hide();}else{Ext.getCmp("ct_import").show();}
                                        },
                                        id: 'b_upfile',
                                        enableToggle: true,
                                        iconCls: 'ic_import',
                                        tooltipType: 'title',
                                        bind: {
                                            tooltip: '{fw_import}'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        hidden: true,
                                        id: 'ct_import',
                                        items: [
                                            {
                                                xtype: 'form',
                                                id: 'upform',
                                                bodyStyle: 'background-color:#eaeef6;',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'filefield',
                                                        id: 'upfile',
                                                        width: 200,
                                                        name: 'uploadFile',
                                                        buttonConfig: {
                                                            xtype: 'filebutton',
                                                            cls: 'btn_b',
                                                            bind: {
                                                                text: '{file_find}'
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        cls: 'btn_b',
                                                        margin: '0 0 0 10',
                                                        iconCls: 'ft_confirm_icl',
                                                        bind: {
                                                            text: '{confirm}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick211'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'tbseparator'
                                    },
                                    {
                                        xtype: 'button',
                                        hidden: true,
                                        id: 'b_tbl_reset',
                                        iconCls: 'ic_reset',
                                        listeners: {
                                            click: 'on_btn_reset'
                                        }
                                    },
                                    {
                                        xtype: 'label',
                                        hidden: true,
                                        id: 'fld_total'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                cls: 'fld_sear',
                                id: 'cont_vf_nat',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldInfo: 'IPv6',
                                        id: 'vf_src',
                                        labelCls: 'lb_arrow',
                                        labelSeparator: ' ',
                                        labelWidth: 50,
                                        msgTarget: 'none',
                                        bind: {
                                            fieldLabel: '{src}'
                                        },
                                        listeners: {
                                            blur: 'onVf_srcBlur',
                                            focus: 'onVf_srcFocus'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldInfo: 'IPv4',
                                        id: 'vf_xsrc',
                                        labelCls: 'lb_arrow',
                                        labelSeparator: ' ',
                                        labelWidth: 80,
                                        bind: {
                                            fieldLabel: '{xsrc}'
                                        },
                                        listeners: {
                                            blur: 'onVf_xsrcBlur',
                                            focus: 'onVf_xsrcFocus'
                                        }
                                    },
                                    {
                                        xtype: 'combobox',
                                        id: 'vf_svc',
                                        width: 220,
                                        labelCls: 'lb_arrow',
                                        labelSeparator: ' ',
                                        labelWidth: 60,
                                        value: '',
                                        editable: false,
                                        displayField: 'name',
                                        queryMode: 'local',
                                        store: 'store_protocol',
                                        valueField: 'val',
                                        bind: {
                                            fieldLabel: '{svc}'
                                        },
                                        listeners: {
                                            change: 'onVf_svcChange'
                                        },
                                        triggers: {
                                            clear: {
                                                handler: function(field, trigger, e) {
                                                    field.setValue("");
                                                },
                                                cls: 'x-form-clear-trigger'
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        hidden: true,
                                        id: 'ct_port',
                                        margin: '0 10',
                                        items: [
                                            {
                                                xtype: 'fieldcontainer',
                                                id: 'fld_sport',
                                                labelCls: 'lb_arrow',
                                                labelSeparator: ' ',
                                                labelWidth: 90,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    fieldLabel: '{src_port}'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        id: 'vf_sport_start',
                                                        width: 50,
                                                        enforceMaxLength: true,
                                                        maskRe: /[0-9]/,
                                                        maxLength: 5,
                                                        minLength: 1
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        margin: '0 0 0 5',
                                                        text: '~'
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        id: 'vf_sport_end',
                                                        width: 50,
                                                        enforceMaxLength: true,
                                                        maskRe: /[0-9]/,
                                                        maxLength: 5,
                                                        minLength: 1
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'fieldcontainer',
                                                id: 'fld_dport',
                                                labelCls: 'lb_arrow',
                                                labelSeparator: ' ',
                                                labelWidth: 90,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    fieldLabel: '{dest_port}'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        id: 'vf_dport_start',
                                                        width: 50,
                                                        enforceMaxLength: true,
                                                        maskRe: /[0-9]/,
                                                        maxLength: 5,
                                                        minLength: 1
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        margin: '0 0 0 5',
                                                        text: '~'
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        id: 'vf_dport_end',
                                                        width: 50,
                                                        enforceMaxLength: true,
                                                        maskRe: /[0-9]/,
                                                        maxLength: 5,
                                                        minLength: 1
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'label',
                                        cls: 'errorBox',
                                        hidden: true,
                                        id: 'err_vf'
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'btn_b',
                                        margin: '0 0 0 10',
                                        iconCls: 'ft_confirm_icl',
                                        bind: {
                                            text: '{confirm}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick'
                                        }
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
                                        flex: 1,
                                        margin: '7 0 0 5',
                                        layout: {
                                            type: 'hbox',
                                            align: 'middle'
                                        },
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                fieldInfo: 'IPv6 96bit',
                                                id: 'nat64_prefix',
                                                fieldLabel: 'Prefix',
                                                labelCls: 'lb_req',
                                                labelSeparator: ' ',
                                                labelWidth: 50,
                                                listeners: {
                                                    focus: 'onNat64_prefixFocus',
                                                    blur: 'onNat64_prefixBlur'
                                                }
                                            },
                                            {
                                                xtype: 'label',
                                                margin: '0 0 0 5',
                                                text: '/96'
                                            },
                                            {
                                                xtype: 'button',
                                                cls: 'ft_confirm',
                                                height: 30,
                                                margin: '0 0 0 10',
                                                width: 60,
                                                iconCls: 'ft_confirm_icl',
                                                bind: {
                                                    text: '{confirm}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick2'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                focusCls: 'btn_f',
                                                cls: 'btn_t',
                                                iconCls: 'icg_help',
                                                listeners: {
                                                    render: 'onButtonRender'
                                                }
                                            },
                                            {
                                                xtype: 'label',
                                                cls: 'errorBox',
                                                hidden: true,
                                                id: 'err_prefix'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch',
                                            padding: '0 20 0 0'
                                        },
                                        items: [
                                            {
                                                xtype: 'displayfield',
                                                id: 'disp_fw_total',
                                                labelAlign: 'right',
                                                labelSeparator: ' ',
                                                labelWidth: 90,
                                                fieldCls: 'tot_info_bg',
                                                bind: {
                                                    fieldLabel: '{fw_count}'
                                                }
                                            },
                                            {
                                                xtype: 'displayfield',
                                                id: 'disp_fw_onoff',
                                                fieldLabel: 'On/Off',
                                                labelSeparator: ' ',
                                                labelWidth: 45,
                                                fieldCls: 'tot_info_bg'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'gridpanel',
                                cls: 'tbl_fw',
                                id: 'tbl_nat64',
                                margin: '5 0 0 0',
                                bodyBorder: true,
                                header: false,
                                title: '',
                                columnLines: true,
                                store: 'store_nat64_list',
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        width: 60,
                                        align: 'center',
                                        dataIndex: '@num',
                                        bind: {
                                            text: '{rank}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 65,
                                        align: 'center',
                                        dataIndex: '@uid',
                                        bind: {
                                            text: '{rule_id}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'src',
                                        flex: 1,
                                        bind: {
                                            text: '{src}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'xsrc',
                                        flex: 1,
                                        bind: {
                                            text: '{xsrc}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'service',
                                        flex: 1,
                                        bind: {
                                            text: '{svc}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return (value)?unixTimeConvert(value,"YMDHM","GMT"):"";
                                        },
                                        width: 130,
                                        dataIndex: 'lasthit',
                                        bind: {
                                            text: '{last_hit}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'desc',
                                        flex: 0.5,
                                        bind: {
                                            text: '{desc}'
                                        }
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        sortable: true,
                                        align: 'center',
                                        dataIndex: '@use',
                                        menuText: '사용',
                                        bind: {
                                            text: '{use}'
                                        },
                                        items: [
                                            {
                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                    return (r.get('@use') === 'on')? "b_sq_on":"b_sq_off";
                                                },
                                                handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                    if(get_zenauth()===true){return false;}

                                                    var rec = view.getStore().getAt(rowIndex);
                                                    use = rec.get("@use");
                                                    use = (use === "on")? "off":"on";


                                                    var rule = {};

                                                    rule["@use"] = use;
                                                    rule["@uid"] = record.raw["@uid"];

                                                    var _params = {
                                                        basename : Ext.encode('firewall_nat64'),
                                                        obj : Ext.encode(rule),
                                                        id_info : Ext.encode({'fieldname':'@uid'}),
                                                        num_info : Ext.encode({'fieldname':'@num'}),
                                                        update : Ext.encode(true)

                                                    };



                                                    request_helper.xmlrpc_call_JsonP('ftuctrl','setPolicy',_params,

                                                    function(response){

                                                        var _store = Ext.data.StoreManager.lookup('store_nat64_list');
                                                        _store.load({
                                                            callback : function(records, options, success) {

                                                                var tot = options.getProxy().getReader().rawData.retval.total_config;

                                                                if(tot !== undefined){
                                                                    Ext.getCmp('disp_fw_onoff').setValue(tot.on + "/" + tot.off);
                                                                }

                                                            }
                                                        });


                                                    });
                                                }
                                            }
                                        ]
                                    }
                                ],
                                viewConfig: {
                                    getRowClass: function(record, rowIndex, rowParams, store) {
                                        if(record.get("@use") === "off"){

                                            Ext.Function.defer(function(){
                                                this.removeRowCls(rowIndex, 'x-grid-row-alt');
                                            },100, this);

                                            return "stOff";
                                        }
                                    },
                                    listeners: {
                                        expandbody: 'onViewExpandbody'
                                    }
                                },
                                selModel: Ext.create('Ext.selection.CheckboxModel', {
                                    selType: 'checkboxmodel',
                                    checkOnly: true,
                                    listeners: {
                                        selectionchange: 'onCheckboxModelSelectionChange'
                                    }
                                }),
                                dockedItems: [
                                    {
                                        xtype: 'pagingtoolbar',
                                        dock: 'bottom',
                                        id: 'tbar',
                                        width: 360,
                                        displayInfo: true,
                                        store: 'store_nat64_list'
                                    }
                                ],
                                listeners: {
                                    cellclick: 'onTbl_spd_ipv4CellClick',
                                    celldblclick: 'onTbl_spd_ipv4CellDblClick',
                                    sortchange: 'onTbl_spd_ipv4SortChange'
                                },
                                plugins: [
                                    Ext.create('Ext.grid.plugin.RowExpander', {
                                        expandOnDblClick: false,
                                        expandOnEnter: false,
                                        rowBodyTpl: [
                                            '<div class="lhbox"><table><tr><td style="border:none;vertical-align:top;"><table id="lhinfo" cellspacing="0"><tr><td id=c>{[__zen("rank")]}</td><td>{num}</td></tr><tr><td id=c>{[__zen("rule_id")]}</td><td>{uid}</td></tr><tr><td id=c>{[__zen("create_date")]}</td><td>{create}</td></tr><tr><td id=c>{[__zen("last_hit")]}</td><td>{lasthit}</td></tr><tr><td id=c>Hit Count</td><td>{hitcount}</td></tr></table></td></tr></table></div>'
                                        ]
                                    })
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

    on_btn_add: function(button, e, eOpts) {
        var me = this;

        var total = (me.filter===true)?me.get_list():Ext.data.StoreManager.lookup('store_nat64_list').getTotalCount();

        if(total >= me.max){Ext.Msg.alert(__weguardia,ValidMaxCnt(me.max)); return false;}

        var win = Ext.create('NFW2.view.win_nat64',{
           modal : true,
           total : total
        });

        if(me.filter === true){Ext.getCmp("b_tbl_reset").hide();}

        win.show();

    },

    on_btn_del: function(button, e, eOpts) {


        var me = this;

        var tbl_sel = Ext.getCmp("tbl_nat64").getSelectionModel().getSelection();

        if(tbl_sel.length === 0){
            Ext.Msg.alert(__weguardia,get_msg("sel_del"));
            return false;
        }

        Ext.MessageBox.confirm(__weguardia,get_msg("conf_del"),function(btn){
            if(btn === "no"){	return false;	}

        var uid = new Array();
            for(var i=0; i<tbl_sel.length; i++){
                        uid[i] = tbl_sel[i].data["@uid"];
            }

        var _params = {
            basename : Ext.encode('firewall_nat64'),
            id_info : Ext.encode({'fieldname':'@uid', 'values': uid}),
            renum_info : Ext.encode({'fieldname':'@num'})
        };


        request_helper.xmlrpc_call_JsonP('ftuctrl','delPolicy',  _params,
            function(response){
               var _store = Ext.data.StoreManager.lookup('store_nat64_list');
                _store.load();


            }
        );


        });
    },

    onButtonClick1: function(button, e, eOpts) {
        if(Ext.getCmp('dp_uid').getValue()===""){return false;}

        var _store = Ext.data.StoreManager.lookup('store_nat64_list');
        _store.getProxy().url = "/api/ftuctrl/getPolicyList";
        _store.getProxy().setExtraParam("basename",  Ext.encode("firewall_nat64"));
        _store.getProxy().setExtraParam("filter_info",  Ext.encode({'type':'duplicate', 'option':'complete', 'value':parseInt(Ext.getCmp('dp_uid').getValue())}));
        _store.currentPage = 1;
        _store.load({callback : function(records, options, success) {

                    if (success) {
                        Ext.getCmp("b_tbl_reset").show();
                    }
        }
        });

        this.filter = true;
    },

    onDp_startRender: function(component, eOpts) {
        var before = Ext.Date.add(new Date(),Ext.Date.DAY,-7);
        Ext.getCmp("dp_start").setValue(before);
    },

    onDp_endRender: function(component, eOpts) {
        Ext.getCmp("dp_end").setValue(new Date());

    },

    onButtonClick11: function(button, e, eOpts) {
        var start = Ext.getCmp('dp_start').getValue();
        var end = Ext.getCmp('dp_end').getValue();


        if(start > end){prt_errMsg_label(get_msg("err_datevalid"), "err_unused");	return false;}else{Ext.getCmp("err_unused").hide();}

        var _store = Ext.data.StoreManager.lookup('store_nat64_list');
        _store.getProxy().url = "/api/ftuctrl/getPolicyList";
        _store.getProxy().setExtraParam("basename",  Ext.encode("firewall_nat64"));
        _store.getProxy().setExtraParam("filter_info",  Ext.encode({'type':'unused', 'value':{'start_date':Ext.Date.format(start, 'Ymd'),'end_date':Ext.Date.format(end, 'Ymd')}}));
        _store.currentPage = 1;
        _store.load({callback : function(records, options, success) {

            if (success) {
                Ext.getCmp("b_tbl_reset").show();
            }
        }
                    });

        this.filter = true;
    },

    on_btn_export: function(button, e, eOpts) {
         var me = this;

                        request_helper.xmlrpc_call_JsonP('ftuctrl','get_system_info',{},function(response){
                                   me.export_rule('xlsx',response.name);
                              }
                        );
    },

    onButtonClick211: function(button, e, eOpts) {
        var me = this;
        var form = Ext.getCmp('upform').getForm();

        if(Ext.getCmp('upfile').getValue() === '') return false;
        var path = '/mnt/ramdisk/do/F3view/nodeapps/deploy/public/javascripts/attachments/';



        if(form.isValid()){

            showLoadMask();

            form.submit({
                url: '/fileUploadCommon',
                params: {
                    filePath: Ext.encode(path),
                    delFlag: Ext.encode('true')
                },
                waitMsg: 'Uploading...',
                success: function(fp, o) {

                    var _data = Ext.decode(o.response.responseText);

                    console.log(_data.data[0]);

                    var _params = {
                        basename : Ext.encode('firewall_nat64'),
                        filename : Ext.encode(path+_data.data[0])
                    };



                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'importPolicyList',
                        _params,
                        function(response){

                            hideLoadMask();

                            Ext.getCmp("b_upfile").toggle(false);

                            if(response.fail_cnt > 0){

                                var arr = [];
                                for(var i in response.fail_list){

                                    arr.push(response.fail_list[i].num + " : " +response.fail_list[i].reason );
                                }
                                var errmsg = arr.join(" </br> ");
                                Ext.Msg.alert(__weguardia,get_msg('err_upobj')+errmsg);
                            }

                            console.log(response);
                            me.get_list();


                        }

                    );

                },
                failure : function(fb, o) {
                    hideLoadMask();
                    Ext.Msg.alert(__weguardia, get_msg('msg_file_fail'));
                }
            });
        }




    },

    on_btn_reset: function(button, e, eOpts) {
        var me = this;

        me.get_list();

        me.filter = false;


        Ext.getCmp("vf_src").setValue("");
        Ext.getCmp("vf_xsrc").setValue("");
        Ext.getCmp("vf_svc").setValue("");
        Ext.getCmp("vf_sport_start").setValue("");
                Ext.getCmp("vf_sport_end").setValue("");
                Ext.getCmp("vf_dport_start").setValue("");
                Ext.getCmp("vf_dport_end").setValue("");

        Ext.getCmp("b_tbl_reset").hide();

    },

    onVf_srcBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
    },

    onVf_srcFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onVf_xsrcBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
    },

    onVf_xsrcFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onVf_svcChange: function(field, newValue, oldValue, eOpts) {
        if(newValue==="tcp" || newValue==="udp"){
            Ext.getCmp("ct_port").show();
        }else{
            Ext.getCmp("ct_port").hide();
        }
    },

    onButtonClick: function(button, e, eOpts) {

         var _store = Ext.data.StoreManager.lookup('store_nat64_list');
                _store.getProxy().url = "/api/ftuctrl/getPolicyList";
                _store.getProxy().setExtraParam("basename",  Ext.encode("firewall_nat64"));
                _store.getProxy().setExtraParam("filter_info",  Ext.encode({'type':'verify', 'value':{'ip':{'src':Ext.getCmp('vf_src').getValue(), 'xsrc':Ext.getCmp('vf_xsrc').getValue()},
                                                                                                      'protocol':{'type':Ext.getCmp('vf_svc').getValue(),
                                                                                                                  'src':{'start':parseInt(Ext.getCmp('vf_sport_start').getValue()),'end':parseInt(Ext.getCmp('vf_sport_end').getValue())},
                                                                                                                  'dest':{'start':parseInt(Ext.getCmp('vf_dport_start').getValue()),'end':parseInt(Ext.getCmp('vf_dport_end').getValue())}},
                                                                                                      'action':'all'}}));
        _store.currentPage = 1;
        _store.load({callback : function(records, options, success) {
                            if (success) {
                                Ext.getCmp("b_tbl_reset").show();
                            }
                        }
                });

                this.filter = true;
    },

    onNat64_prefixFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onNat64_prefixBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
    },

    onButtonClick2: function(button, e, eOpts) {
        var prefix = Ext.getCmp('nat64_prefix').getValue();


        if(prefix === ""){prefix = "64:ff9b::";  Ext.getCmp('nat64_prefix').setValue(prefix);}


        if(ValidIPv6(prefix)===false){prt_errMsg_label(ValidIP("IPv6"),"err_prefix");return false;}
        else{
         Ext.getCmp("err_prefix").setText("");
        }

        if(prefix === ""){prefix = "64:ff9b::";  Ext.getCmp('nat64_prefix').setValue(prefix);}

        var _params = {
            basename : Ext.encode('firewall_nat64_conf'),
            obj: Ext.encode({"@nat64_prefix":prefix})
        };


        request_helper.xmlrpc_call_JsonP('ftuctrl','setObject',_params,
                                             function(response){
                                                 if(response === true){
                                                    Ext.getCmp("err_prefix").show();
                                                    Ext.getCmp("err_prefix").setText("저장되었습니다.");


                                                    //setTimeout(function(){Ext.get("err_prefix").fadeOut();},1000);
                                                     setTimeout(function(){Ext.getCmp("err_prefix").hide();},1000);
                                                 }
                                             });
    },

    onButtonRender: function(component, eOpts) {
        component.tooltip = Ext.create('Ext.tip.ToolTip', {
            target: component.getEl(),
            autoHide: true,
            anchor : 'left',
            cls : 'tip_box',
            shadow: false,
            border : 0,
            html:__zen('nat64_info1')

        });

    },

    onViewExpandbody: function(rowNode, record, expandRow, eOpts) {
        var theTd = Ext.fly(expandRow).down('td');
        theTd.mask('Loading...');

        var _params = {
                    basename : Ext.encode('firewall_nat64'),
                    uid : Ext.encode(record.data['@uid'])
        };



        request_helper.xmlrpc_call_JsonP('ftuctrl','getMgtPolicyLastHitData', _params,
             function(response){
             theTd.unmask();

                 var history = "";

                 for(var i=0; i<response.hit_history.length; i++){
                        history += '<tr><td id=c>'+response.hit_history[i].date+'</td><td>'+addComma(response.hit_history[i].hit_count)+'</td></tr>';
                    }


             theTd.update(lasthit_tpl.apply({
                 num: record.data['@num'],
                 uid: record.data['@uid'],
                 create:response.create_ts,
                 lasthit:response.lasthit_ts,
                 hitcount:response.hit_total,
                 history:history


             }));

             }
        );

    },

    onCheckboxModelSelectionChange: function(model, selected, eOpts) {

    },

    onTbl_spd_ipv4CellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {

        if(cellIndex === 1){	return false;	}


        if(cellIndex !== 0){


            var grid = Ext.getCmp("tbl_nat64");
            var store = grid.getStore();
            var expander = grid.findPlugin('rowexpander');
            var dataIndex = grid.headerCt.getGridColumns()[cellIndex].dataIndex;

            if(dataIndex === "@use" || dataIndex === "@uid" || dataIndex === "desc"){return false;}

            if(dataIndex === "@num"){

                var _total = store.getTotalCount();

                var win = Ext.create('NFW2.view.win_nat64_move',{
                    num : record.data['@num'],
                    uid : record.data['@uid'],
                    total : _total,
                    modal : true
                });
                win.show();
                return false;
            }


            if(dataIndex === "lasthit"){
                if(record.data.lasthit===""){return false;}
                expander.toggleRow(rowIndex, store.getAt(rowIndex));
                return false;
            }



            var smode = dataIndex;
            /*switch (cellIndex){
                case 4 : smode = 'src'; break;
                case 5 : smode = 'xsrc'; break;
                case 6 : smode = 'service'; break;
            }*/


            if(record.raw[smode]==='<ul class="disp_obj"><li class="Any">Any</li></ul>'){return false;}


            var tmptd = Ext.get(td).query("ul")[0];

            if(Ext.get(tmptd).query(".inlist_s").length > 0){

                var disp = '<ul class="disp_obj">';
                var len = Ext.get(tmptd).query(".inG").length;
                var tmp_len = (len > 5)?5:len;

                for(var k=0; k<tmp_len; k++){
                    disp += Ext.get(tmptd).query(".inG")[k].outerHTML;
                }

                if(len > 5){ disp += '<li class="more"></li>';}

                store.data.items[rowIndex].data[smode] = disp + '</ul>';
                var tmpx = store.data.items[rowIndex];

                store.removeAt(rowIndex);
                store.insert(rowIndex,tmpx);

                var tmprecord = store.getAt(rowIndex);
                if(expander.recordsExpanded[tmprecord.internalId]){
                    expander.toggleRow(rowIndex,tmprecord);
                }


                return false;

            }


            var _params = {
                basename : Ext.encode('firewall_nat64'),
                key_info : Ext.encode({'@uid':record.raw["@uid"], 'item':smode})
            };

            var disp = '<ul class="disp_obj">';


            request_helper.xmlrpc_call_JsonP('ftuctrl','getPolicyItems',_params,
                                             function(response){

                                                 for(var i in response.list){

                                                     var otype = response.list[i]["@otype"];


                                                     disp += '<li class="inG '+otype+'">'+ response.list[i]["#text"] + '</li>';

                                                     if(otype === "v6" || otype === "v4"){

                                                         for(var j in response.list[i].detail){
                                                             disp += '<li class="inlist_s">'+response.list[i].detail[j]["#text"] + '</li>';
                                                         }
                                                     }else if(otype === "port"){


                                                         for(var j in response.list[i].detail){
                                                             disp += '<li class="inlist_s">'+response.list[i].detail[j]["@type"] + '</li>';
                                                             if(response.list[i].detail[j]["@type"] === "tcp" || response.list[i].detail[j]["@type"]==="udp"){
                                                                 disp += '<li class="inlist_s">'+response.list[i].detail[j].source.start +'~'+ response.list[i].detail[j].source.end+'</li>';
                                                                 disp += '<li class="inlist_s">'+response.list[i].detail[j].dest.start +'~'+ response.list[i].detail[j].dest.end+'</li>';
                                                             }else{
                                                                 disp += '<li class="inlist_s">'+response.list[i].detail[j].kind + '</li>';
                                                             }
                                                         }


                                                     }else if(otype == "v6_group"){

                                                         for(var j in response.list[i].detail){
                                                             disp += '<li class="inlist">'+response.list[i].detail[j].name + '</li>';
                                                             for(var k in response.list[i].detail[j].ip){
                                                                 disp += '<li class="inlist_s">'+response.list[i].detail[j].ip[k]["#text"] + '</li>';
                                                             }
                                                         }

                                                     }else if(otype == "group"){


                                                         for(var j in response.list[i].detail){
                                                             disp += '<li class="inlist">'+response.list[i].detail[j].name + '</li>';
                                                             for(var k in response.list[i].detail[j].protocol){
                                                                 disp += '<li class="inlist_s">'+response.list[i].detail[j].protocol[k]["@type"] + '</li>';
                                                                 if(response.list[i].detail[j].protocol[k]["@type"] === "tcp" || response.list[i].detail[j].protocol[k]["@type"]==="udp"){
                                                                     disp += '<li class="inlist_s">'+response.list[i].detail[j].protocol[k].source.start +'~'+ response.list[i].detail[j].protocol[k].source.end+'</li>';
                                                                     disp += '<li class="inlist_s">'+response.list[i].detail[j].protocol[k].dest.start +'~'+ response.list[i].detail[j].protocol[k].dest.end+'</li>';
                                                                 }else{
                                                                     disp += '<li class="inlist_s">'+response.list[i].detail[j].protocol[k].kind + '</li>';
                                                                 }

                                                             }
                                                         }

                                                     }

                                                 }

                                                 store.data.items[rowIndex].data[smode] = disp + '</ul>';
                                                 var tmpx = store.data.items[rowIndex];


                                                 store.removeAt(rowIndex);
                                                 store.insert(rowIndex,tmpx);

                                                 var tmprecord = store.getAt(rowIndex);
                                                 if(expander.recordsExpanded[tmprecord.internalId]){
                                                     expander.toggleRow(rowIndex,tmprecord);
                                                 }
                                             }



                                            );

        }
    },

    onTbl_spd_ipv4CellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0 ||cellIndex === 1 ||cellIndex === 2){	return false;	}

                var win = Ext.create('NFW2.view.win_nat64',{
                          edit : "edit",
                          uid  : record.raw["@uid"],
                          num  : record.raw["@num"],
                          modal : true
                });
                win.show();
    },

    onTbl_spd_ipv4SortChange: function(ct, column, direction, eOpts) {
        var grid = Ext.getCmp("tbl_nat64"),
            store = grid.getStore(),
            expander = grid.plugins[0];

        for ( i=0; i < store.getCount(); i++ ) {

            var record = store.getAt(i);
            if(expander.recordsExpanded[record.internalId]){
                expander.toggleRow(i,record);
            }

        }
    },

    onNFW2_firewall_filtering_ipv4FilteringAfterRender: function(component, eOpts) {
        var me = this;
        /*request_helper.xmlrpc_call_JsonP('ftuctrl','getFileContent', { filename : Ext.encode('/proc/ferret/datasheet/nat64_rule_line')},
                                         function(response){
                                             me.max = response[0];
                                         }
                                        );*/

        me.filter = false;
        me.get_list();

        var _params = {
            basename : Ext.encode('firewall_nat64_conf')
        };


        request_helper.xmlrpc_call_JsonP('ftuctrl','getObject',_params,
                                         function(response){
                                             //console.log(response);
                                             if(response === null){Ext.getCmp('nat64_prefix').setValue("64:ff9b::");}
                                             else{
                                                 Ext.getCmp('nat64_prefix').setValue(response["@nat64_prefix"]);
                                             }

                                         });

        this.fieldInfo = makeZenTip();

    },

    get_list: function() {
        var me = this;

        var _store = Ext.data.StoreManager.lookup('store_nat64_list');

        _store.getProxy().url = "/api/ftuctrl/getObjects";
        _store.currentPage = 1;
        _store.load({
            params:{
                'basename': Ext.encode("firewall_nat64"),
                'filter_info':Ext.encode([])
            },
            callback : function(records, options, success) {
                var tot = options.getProxy().getReader().rawData.retval.total_config;

                if(tot !== undefined){

                    Ext.getCmp('disp_fw_total').setValue(tot.total_count + "/" + tot.max_count);
                    Ext.getCmp('disp_fw_onoff').setValue(tot.on + "/" + tot.off);
                    me.max = tot.max_count;
                }
            }
        });


        hideLoadMask();
        setTimeout(function(){ me.setWidth('100%'); },100);


        return _store.getTotalCount();


    },

    export_rule: function(id, name) {
        var currentDate = new Date();

        var fileName = Ext.Date.format(currentDate, 'Ymd')+"_"+zeropad(currentDate.getHours())+zeropad(currentDate.getMinutes())+zeropad(currentDate.getSeconds())+"_"+name+"_NAT64."+id;
        var path = '/mnt/ramdisk/do/F3view/nodeapps/deploy/public/javascripts/attachments/';


        var _params = {
            basename : Ext.encode('firewall_nat64'),
            filename : Ext.encode(path+fileName)
        };

        showLoadMask();

        request_helper.xmlrpc_call_JsonP('ftuctrl','exportPolicyList', _params,
             function(response){
                hideLoadMask();
                 console.log(response);
                document.location.href = '/fileDownloadCommon?filePath='+ Ext.encode(path)+"&fileName="+Ext.encode(fileName)+"&filePathFlag="+Ext.encode('true');
             }
        );
    }

});