
Ext.define('NFW2.view.NFW2_firewall_policy_filtering', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_firewall_policy_filtering',

    requires: [
        'NFW2.view.NFW2_firewall_policy_filteringViewModel',
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
        type: 'nfw2_firewall_policy_filtering'
    },
    cls: 'zen_body',
    id: 'NFW2_firewall_filtering_ipv4Filtering',
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
                                            if(state===false){Ext.getCmp("cont_vf_spd").hide();}else{Ext.getCmp("cont_vf_spd").show();}
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
                                        xtype: 'button',
                                        bind: {
                                            text: '{fw_audit}'
                                        },
                                        listeners: {
                                            click: 'on_btn_audit'
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
                                        xtype: 'textfield',
                                        id: 'fw_find_uid',
                                        width: 150,
                                        fieldLabel: '정책 ID',
                                        labelCls: 'lb_arrow',
                                        labelSeparator: ' ',
                                        labelWidth: 50,
                                        enableKeyEvents: true,
                                        maskRe: /[0-9]/,
                                        listeners: {
                                            keydown: 'onTextfieldKeydown'
                                        }
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
                                id: 'cont_vf_spd',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        id: 'vf_src',
                                        labelCls: 'lb_arrow',
                                        labelSeparator: ' ',
                                        labelWidth: 50,
                                        msgTarget: 'none',
                                        bind: {
                                            fieldLabel: '{src}'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'vf_dest',
                                        labelCls: 'lb_arrow',
                                        labelSeparator: ' ',
                                        labelWidth: 70,
                                        bind: {
                                            fieldLabel: '{dest}'
                                        }
                                    },
                                    {
                                        xtype: 'combobox',
                                        id: 'vf_svc',
                                        width: 220,
                                        labelCls: 'lb_arrow',
                                        labelSeparator: ' ',
                                        labelWidth: 50,
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
                                        xtype: 'combobox',
                                        id: 'vf_action',
                                        width: 160,
                                        labelCls: 'lb_arrow',
                                        labelSeparator: ' ',
                                        labelWidth: 40,
                                        value: 'all',
                                        editable: false,
                                        store: {
                                            data: [
                                                {
                                                    val: 'all',
                                                    text: 'All'
                                                },
                                                {
                                                    val: 'accept',
                                                    text: 'Accept'
                                                },
                                                {
                                                    val: 'deny',
                                                    text: 'Deny'
                                                },
                                                {
                                                    val: 'ipsec',
                                                    text: 'IPSec'
                                                }
                                            ],
                                            fields: [
                                                {
                                                    name: 'text'
                                                },
                                                {
                                                    name: 'val'
                                                }
                                            ]
                                        },
                                        valueField: 'val',
                                        bind: {
                                            fieldLabel: '{action}'
                                        }
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
                                padding: '0 20 0 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        flex: 1
                                    },
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
                                    },
                                    {
                                        xtype: 'displayfield',
                                        id: 'disp_fw_action',
                                        fieldLabel: 'Accept/Deny/IPSec',
                                        labelSeparator: ' ',
                                        labelWidth: 110,
                                        fieldCls: 'tot_info_bg'
                                    }
                                ]
                            },
                            {
                                xtype: 'gridpanel',
                                cls: 'tbl_fw',
                                id: 'tbl_spd_ipv4',
                                bodyBorder: true,
                                header: false,
                                title: '',
                                columnLines: true,
                                store: 'store_spd_ipv4_list',
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
                                        xtype: 'actioncolumn',
                                        getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                            return (v==="on")?"icf_cross":"";
                                        },
                                        width: 47,
                                        sortable: true,
                                        align: 'center',
                                        dataIndex: 'cross_spd',
                                        menuText: '양방향',
                                        bind: {
                                            text: '{two_way}'
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
                                        dataIndex: 'dest',
                                        flex: 1,
                                        bind: {
                                            text: '{dest}'
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
                                        xtype: 'actioncolumn',
                                        getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                            return "icf_"+v;
                                        },
                                        width: 50,
                                        sortable: true,
                                        align: 'center',
                                        dataIndex: 'action',
                                        menuText: '행위',
                                        bind: {
                                            text: '{action}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 80,
                                        align: 'right',
                                        dataIndex: 'timeout',
                                        bind: {
                                            text: '{timeout}'
                                        }
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        width: 40,
                                        align: 'center',
                                        dataIndex: 'loglevel',
                                        menuText: '로그',
                                        bind: {
                                            text: '{log}'
                                        },
                                        items: [
                                            {
                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                    return (v==="on")?"lv_on":"lv_off";
                                                },
                                                handler: function(view, rowIndex, colIndex, item, e, record, row) {

                                                    return false;

                                                    var rec = view.getStore().getAt(rowIndex);
                                                    var log = rec.get("@loglevel");
                                                    log = (log === "on")? "off":"on";


                                                    var rule = {};

                                                    rule["@loglevel"] = log;
                                                    rule["@uid"] = record.raw["@uid"];

                                                    var _params = {
                                                        basename : Ext.encode('firewall_filter_ipv4'),
                                                        obj : Ext.encode(rule),
                                                        id_info : Ext.encode({'fieldname':'@uid'}),
                                                        num_info : Ext.encode({'fieldname':'@num'}),
                                                        update : Ext.encode(true)

                                                    };



                                                    request_helper.xmlrpc_call_JsonP('ftuctrl','setPolicy',_params,

                                                    function(response){

                                                        var _store = Ext.data.StoreManager.lookup('store_spd_ipv4_list');
                                                        _store.load();


                                                    });
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        sortable: true,
                                        dataIndex: 'profile',
                                        menuText: '프로파일',
                                        flex: 0.5,
                                        bind: {
                                            text: '{profile}'
                                        },
                                        items: [
                                            {
                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                    return (v.http_filter["@cid"] !== null)?"pf http":"pf_off";
                                                },
                                                getTip: function(v) {
                                                    return v.http_filter["#text"];
                                                }
                                            },
                                            {
                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                    return (v.application["@cid"] !== null)?"pf app":"pf_off";
                                                },
                                                getTip: function(v) {
                                                    return v.application["#text"];
                                                }
                                            },
                                            {
                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                    return (v.ips["@cid"] !== null)?"pf ips":"pf_off";
                                                },
                                                getTip: function(v) {
                                                    return v.ips["#text"];
                                                }
                                            },
                                            {
                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                    return (v.anti_virus["@cid"] !== null)?"pf av":"pf_off";
                                                },
                                                getTip: function(v) {
                                                    return v.anti_virus["#text"];
                                                }
                                            },
                                            {
                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                    return (v.anti_spam["@cid"] !== null)?"pf as":"pf_off";
                                                },
                                                getTip: function(v) {
                                                    return v.anti_spam["#text"];
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        dataIndex: 'resource',
                                        menuText: '상세 설정',
                                        flex: 0.5,
                                        bind: {
                                            text: '{detail_set}'
                                        },
                                        items: [
                                            {
                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                    return (r.raw.schedule !== "")?"pf sche":"pf_off";
                                                },
                                                getTip: function(v, r) {
                                                    return r.record.data.schedule;
                                                }
                                            },
                                            {
                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                    return (v.qos["@cid"] !== null)?"pf qos":"pf_off";
                                                },
                                                getTip: function(v) {
                                                    return v.qos["#text"];
                                                }
                                            },
                                            {
                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                    return (v.session["@cid"] !== null)?"pf ses":"pf_off";
                                                },
                                                getTip: function(v) {
                                                    return v.session["#text"];
                                                }
                                            },
                                            {
                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                    return (r.raw["@ssl"] === "on")?"pf ssli":"pf_off";
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return (value)?unixTimeConvert(value,"YMDHM","GMT"):"";
                                        },
                                        maxWidth: 130,
                                        minWidth: 40,
                                        dataIndex: 'lasthit',
                                        bind: {
                                            text: '{last_hit}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        maxWidth: 130,
                                        minWidth: 40,
                                        dataIndex: 'expire',
                                        bind: {
                                            text: '{valid_period}'
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
                                                    /*if(r.get("@use") === 'on'){
                                                    return (r.raw.etc["@cross_spd"] === 'on')? "b_policy_on_cross":"b_policy_on";
                                                    }else{
                                                    return (r.raw.etc["@cross_spd"] === 'on')? "b_policy_off_cross":"b_policy_off";
                                                    }*/
                                                    if(r.get("@use") === 'on'){
                                                        return "b_sq_on";
                                                    }else{
                                                        return "b_sq_off";
                                                    }
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
                                                        basename : Ext.encode('firewall_filter_ipv4'),
                                                        obj : Ext.encode(rule),
                                                        id_info : Ext.encode({'fieldname':'@uid'}),
                                                        num_info : Ext.encode({'fieldname':'@num'}),
                                                        update : Ext.encode(true)

                                                    };



                                                    request_helper.xmlrpc_call_JsonP('ftuctrl','setPolicy',_params,

                                                    function(response){

                                                        var _store = Ext.data.StoreManager.lookup('store_spd_ipv4_list');
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
                                        var rowcls = "";

                                        if(record.get("@use") === "off"){
                                            rowcls = "stOff";
                                        }else if(record.raw.etc["@action"]==="Deny"){
                                            rowcls = "stDeny";
                                        }else if(record.raw.etc["@action"]==="IPSec"){
                                            rowcls = "stIPSec";
                                        }

                                        /*

                                        var license = Ext.getCmp("NFW2_firewall_filtering_ipv4Filtering").license;

                                        if(license.fw === "off"){
                                        if(record.raw.etc["@action"]==="Deny"){rowcls = "stOff";}
                                        else if(record.raw.profile.http_filter["@cid"] !== null){rowcls = "stOff";}
                                        else if(record.raw.etc["@action"]==="Accept" && (record.raw.profile.ips["@cid"] === null && record.raw.profile.application["@cid"] === null)){rowcls = "stOff";}
                                        }
                                        if(license.ipsec === "off"){
                                        if(record.raw.etc["@action"]==="IPSec"){rowcls = "stOff";}
                                        }
                                        if(license.ips === "off"){
                                        if(record.raw.profile.ips["@cid"] !== null ||record.raw.profile.application["@cid"] !== null){rowcls = "stOff";}
                                        }

                                        *//*is_cc*/

                                        Ext.Function.defer(function(){
                                            this.removeRowCls(rowIndex, 'x-grid-row-alt');
                                        },100, this);

                                        return rowcls;
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
                                        store: 'store_spd_ipv4_list'
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

        var total = (me.filter===true)?me.get_list():Ext.data.StoreManager.lookup('store_spd_ipv4_list').getTotalCount();

        if(total >= me.max){Ext.Msg.alert(__weguardia,ValidMaxCnt(me.max)); return false;}

        var win = Ext.create('NFW2.view.win_ipv4SPD',{
            modal : true,
            total : total,
            license : me.license
        });

        if(me.filter === true){Ext.getCmp("b_tbl_reset").hide();}

        win.show();

    },

    on_btn_del: function(button, e, eOpts) {


        var me = this;

        var tbl_sel = Ext.getCmp("tbl_spd_ipv4").getSelectionModel().getSelection();

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
                basename : Ext.encode('firewall_filter_ipv4'),
                id_info : Ext.encode({'fieldname':'@uid', 'values': uid}),
                renum_info : Ext.encode({'fieldname':'@num'})
            };


            request_helper.xmlrpc_call_JsonP('ftuctrl','delPolicy',  _params,
                                             function(response){
                                                 var _store = Ext.data.StoreManager.lookup('store_spd_ipv4_list');
                                                _store.getProxy().url = "/api/ftuctrl/getObjects";

                                                _store.load({
                                                    params:{
                                                        'basename': Ext.encode("firewall_filter_ipv4"),
                                                        'filter_info':Ext.encode([])
                                                    },
                                                    callback : function(records, options, success) {
                                                        var tot = options.getProxy().getReader().rawData.retval.total_config;

                                                        if(tot !== undefined){

                                                            Ext.getCmp('disp_fw_total').setValue(tot.total_count + "/" + tot.max_count);
                                                            Ext.getCmp('disp_fw_onoff').setValue(tot.on + "/" + tot.off);
                                                            Ext.getCmp('disp_fw_action').setValue(tot.accept + "/" + tot.deny + "/" + tot.ipsec);

                                                             Ext.getCmp('b_tbl_reset').hide();
                                                        }
                                                    }
                                                });


                                             }
                                            );


        });
    },

    onButtonClick1: function(button, e, eOpts) {
        if(Ext.getCmp('dp_uid').getValue()===""){return false;}

        var _store = Ext.data.StoreManager.lookup('store_spd_ipv4_list');
        _store.getProxy().url = "/api/ftuctrl/getPolicyList";
        _store.getProxy().setExtraParam("basename",  Ext.encode("firewall_filter_ipv4"));
        _store.getProxy().setExtraParam("filter_info",  Ext.encode({'type':'duplicate', 'option':'complete', 'value':parseInt(Ext.getCmp('dp_uid').getValue())}));
         _store.currentPage = 1;
        _store.load({callback : function(records, options, success) {

            if (success) {

               //  Ext.getCmp('tbar').moveFirst();
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


        var _store = Ext.data.StoreManager.lookup('store_spd_ipv4_list');
        _store.getProxy().url = "/api/ftuctrl/getPolicyList";
        _store.getProxy().setExtraParam("basename",  Ext.encode("firewall_filter_ipv4"));
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

    on_btn_audit: function(button, e, eOpts) {
        var me = this;

        var tbl_sel = Ext.getCmp("tbl_spd_ipv4").getSelectionModel().getSelection();

        if(tbl_sel.length === 0){
            Ext.Msg.alert(__weguardia,sel_over_count(1));
            return false;
        }


        if(tbl_sel.length > 5){
            Ext.Msg.alert(__weguardia,sel_max_count(5));
            return false;
        }

        var uid = new Array();
        var uid_key = new Array();

        for(var i=0; i<tbl_sel.length; i++){
            uid[i] = tbl_sel[i].data["@uid"];
            uid_key[tbl_sel[i].data["@uid"]] = tbl_sel[i].data["@num"];
        }


        var win = Ext.create('NFW2.view.win_audit',{
            modal : true,
            uid:uid,
            uid_key:uid_key,
            license : me.license
        });

        win.show();

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
                        basename : Ext.encode('firewall_filter_ipv4'),
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

    onTextfieldKeydown: function(textfield, e, eOpts) {

        if(textfield.value===""){return false;}
        var _store = Ext.data.StoreManager.lookup('store_spd_ipv4_list');




        if(e.keyCode === 13){

            _store.getProxy().url = "/api/ftuctrl/getPolicyList";
        _store.getProxy().setExtraParam("basename",  Ext.encode("firewall_filter_ipv4"));
        _store.getProxy().setExtraParam("filter_info",  Ext.encode({'type':'find', 'value':{'@uid':parseInt(textfield.value)}}));
         _store.currentPage = 1;


        _store.load({callback : function(records, options, success) {

                    if (success) {

                        Ext.getCmp("b_tbl_reset").show();
                    }
                }
        });

        this.filter = true;

        }




    },

    on_btn_reset: function(button, e, eOpts) {
        var me = this;

        me.get_list();

        me.filter = false;

        Ext.getCmp("vf_src").setValue("");
        Ext.getCmp("vf_dest").setValue("");
        Ext.getCmp("vf_svc").setValue("");
        Ext.getCmp("vf_action").setValue("all");
        Ext.getCmp("vf_sport_start").setValue("");
        Ext.getCmp("vf_sport_end").setValue("");
        Ext.getCmp("vf_dport_start").setValue("");
        Ext.getCmp("vf_dport_end").setValue("");
        Ext.getCmp("fw_find_uid").setValue("");

        Ext.getCmp("b_tbl_reset").hide();

    },

    onVf_svcChange: function(field, newValue, oldValue, eOpts) {
        if(newValue==="tcp" || newValue==="udp"){
            Ext.getCmp("ct_port").show();
        }else{
            Ext.getCmp("ct_port").hide();
        }
    },

    onButtonClick: function(button, e, eOpts) {

        var _store = Ext.data.StoreManager.lookup('store_spd_ipv4_list');
        _store.getProxy().url = "/api/ftuctrl/getPolicyList";
        _store.getProxy().setExtraParam("basename",  Ext.encode("firewall_filter_ipv4"));
        _store.getProxy().setExtraParam("filter_info",  Ext.encode({'type':'verify', 'value':{'ip':{'src':Ext.getCmp('vf_src').getValue(), 'dest':Ext.getCmp('vf_dest').getValue()},
                                                                                              'protocol':{'type':Ext.getCmp('vf_svc').getValue(),
                                                                                                          'src':{'start':parseInt(Ext.getCmp('vf_sport_start').getValue()),'end':parseInt(Ext.getCmp('vf_sport_end').getValue())},
                                                                                                          'dest':{'start':parseInt(Ext.getCmp('vf_dport_start').getValue()),'end':parseInt(Ext.getCmp('vf_dport_end').getValue())}},
                                                                                              'action':Ext.getCmp('vf_action').getValue()}}));
         _store.currentPage = 1;


        _store.load({callback : function(records, options, success) {
            if (success) {
                // Ext.getCmp('tbar').moveFirst();
                Ext.getCmp("b_tbl_reset").show();
            }
        }
                    });

        this.filter = true;
    },

    onViewExpandbody: function(rowNode, record, expandRow, eOpts) {
        var theTd = Ext.fly(expandRow).down('td');
        theTd.mask('Loading...');

        var _params = {
                    basename : Ext.encode('firewall_filter_ipv4'),
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

            //cellIndex = cellIndex-1;

            if(cellIndex === 2){

                var _total = Ext.data.StoreManager.lookup('store_spd_ipv4_list').getTotalCount();

                var win = Ext.create('NFW2.view.win_spd_move',{
                    num : record.data['@num'],
                    uid : record.data['@uid'],
                    total : _total,
                    modal : true
                });
                win.show();
                return false;
            }


            if(!(cellIndex === 5 ||cellIndex === 6 || cellIndex === 7 || cellIndex === 13)){	return false;	}

            var grid = Ext.getCmp("tbl_spd_ipv4");
            var store = grid.getStore();
            var expander = grid.findPlugin('rowexpander');

            if(cellIndex === 13){ //lasthit
                if(record.data.lasthit===""){return false;}

                expander.toggleRow(rowIndex, store.getAt(rowIndex));

                return false;
            }

            var smode = "";
            switch (cellIndex){
                case 5 : smode = 'src'; break;
                case 6 : smode = 'dest'; break;
                case 7 : smode = 'service'; break;
            }


            if(record.raw[smode]==='<ul class="disp_obj"><li class="Any">Any</li></ul>'){return false;}


            //var store = Ext.data.StoreManager.lookup("store_spd_ipv4_list");

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
                basename : Ext.encode('firewall_filter_ipv4'),
                key_info : Ext.encode({'@uid':record.raw["@uid"], 'item':smode})
            };

            var disp = '<ul class="disp_obj">';


            console.log(_params);


            request_helper.xmlrpc_call_JsonP('ftuctrl','getPolicyItems',_params,
                                             function(response){

                                                 console.log(response);

                                                 for(var i in response.list){

                                                     var otype = response.list[i]["@otype"];


                                                     disp += '<li class="inG '+otype+'">'+ response.list[i]["#text"] + '</li>';

                                                     if(otype === "v4"){

                                                         for(var j in response.list[i].detail){
                                                             disp += '<li class="inlist_s">'+response.list[i].detail[j]["#text"] + '</li>';
                                                         }
                                                     }else if(otype === "country" || otype === "domain" || otype === "user"){

                                                         for(var j in response.list[i].detail){
                                                             disp += '<li class="inlist_s">'+response.list[i].detail[j] + '</li>';
                                                         }

                                                     }else if(otype === "port"){


                                                         for(var j in response.list[i].detail){
                                                             disp += '<li class="inlist_s">'+response.list[i].detail[j]["@type"] + '</li>';
                                                             if(response.list[i].detail[j]["@type"] === "tcp" || response.list[i].detail[j]["@type"]==="udp"){
                                                                 disp += '<li class="inlist_s">'+response.list[i].detail[j].source.start +'~'+ response.list[i].detail[j].source.end+'</li>';
                                                                 disp += '<li class="inlist_s">'+response.list[i].detail[j].dest.start +'~'+ response.list[i].detail[j].dest.end+'</li>';
                                                             }else{
                                                                 if(response.list[i].detail[j].kind===undefined){continue;}
                                                                 disp += '<li class="inlist_s">'+response.list[i].detail[j].kind + '</li>';
                                                             }
                                                         }


                                                     }else if(otype == "v4_group"){

                                                         for(var j in response.list[i].detail){
                                                             disp += '<li class="inlist">'+response.list[i].detail[j].name + '</li>';
                                                             for(var k in response.list[i].detail[j].ip){
                                                                 disp += '<li class="inlist_s">'+response.list[i].detail[j].ip[k]["#text"] + '</li>';
                                                             }
                                                         }

                                                     }else if(otype == "user_group"){

                                                         for(var j in response.list[i].detail){
                                                             disp += '<li class="inlist">'+response.list[i].detail[j].name + '</li>';
                                                             disp += '<li class="inlist_s">'+response.list[i].detail[j].user_id + '</li>';

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

        if(cellIndex === 0 || cellIndex === 1 || cellIndex === 2){	return false;	}
        var me = this;

        var win = Ext.create('NFW2.view.win_ipv4SPD',{
                  edit : "edit",
                  uid  : record.raw["@uid"],
                  num  : record.raw["@num"],
                  license:me.license,
                  modal : true

        });
        win.show();

    },

    onTbl_spd_ipv4SortChange: function(ct, column, direction, eOpts) {
        var grid = Ext.getCmp("tbl_spd_ipv4"),
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
        /*request_helper.xmlrpc_call_JsonP('ftuctrl','getFileContent', { filename : Ext.encode('/proc/ferret/datasheet/spd_rule_line')},
             function(response){

                 me.max = response[0];
             }
        );*/

        request_helper.xmlrpc_call_JsonP('ftuctrl','get_license_info', {},
                                         function(response){
                                             me.license = response.system_module;
                                         }
                                        );


        me.filter = false;
        me.get_list();

        console.log("dom size",document.getElementsByTagName("*").length);

    },

    get_list: function() {
        var me = this;


        var _store = Ext.data.StoreManager.lookup('store_spd_ipv4_list');
        _store.getProxy().url = "/api/ftuctrl/getObjects";
         _store.currentPage = 1;

        _store.load({
            params:{
                'basename': Ext.encode("firewall_filter_ipv4"),
                'filter_info':Ext.encode([])
            },
            callback : function(records, options, success) {
                var tot = options.getProxy().getReader().rawData.retval.total_config;

                if(tot !== undefined){

                    Ext.getCmp('disp_fw_total').setValue(tot.total_count + "/" + tot.max_count);
                    Ext.getCmp('disp_fw_onoff').setValue(tot.on + "/" + tot.off);
                    Ext.getCmp('disp_fw_action').setValue(tot.accept + "/" + tot.deny + "/" + tot.ipsec);
                    me.max = tot.max_count;
                }
            }
        });

        //Ext.getCmp('tbar').moveFirst();
        hideLoadMask();
        setTimeout(function(){ me.setWidth('100%'); },100);

        return _store.getTotalCount();

    },

    export_rule: function(id, name) {
        var currentDate = new Date();

        var fileName = Ext.Date.format(currentDate, 'Ymd')+"_"+zeropad(currentDate.getHours())+zeropad(currentDate.getMinutes())+zeropad(currentDate.getSeconds())+"_"+name+"_IPv4Filtering."+id;
        var path = '/mnt/ramdisk/do/F3view/nodeapps/deploy/public/javascripts/attachments/';


        var _params = {
            basename : Ext.encode('firewall_filter_ipv4'),
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