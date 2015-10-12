
Ext.define('NFW2.view.NFW2_monitor_ddos_traffic', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_ddos_traffic',

    requires: [
        'NFW2.view.NFW2_monitor_ddos_trafficViewModel',
        'Ext.form.Panel',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.form.FieldSet',
        'Ext.Img',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table'
    ],

    viewModel: {
        type: 'nfw2_monitor_ddos_traffic'
    },
    cls: 'zen_body',
    id: 'NFW2_monitor_ddos_traffic',
    defaultListenerScope: true,

    listeners: {
        beforedestroy: 'onPanelDestroy',
        afterrender: 'onPanelAfterRender'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        header: false,
                        title: 'My Form',
                        items: [
                            {
                                xtype: 'container',
                                cls: 'dv_monitor',
                                layout: {
                                    type: 'hbox',
                                    align: 'middle'
                                },
                                items: [
                                    {
                                        xtype: 'toggleslide',
                                        resizeHandle: false,
                                        state: false,
                                        cls: 'custom-color-monitor',
                                        id: 'chk_btn',
                                        text: 'MyButton',
                                        listeners: {
                                            change: 'onChk_btnChange'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        set_data: function() {
                                            var me = Ext.getCmp('NFW2_monitor_ddos_traffic');

                                            me.get_ddos();
                                        },
                                        cls: 'dv_timecount',
                                        html: 10,
                                        id: 'timeout',
                                        width: 55
                                    },
                                    {
                                        xtype: 'cycle',
                                        focusCls: 'btn_f',
                                        cls: 'sel_monitor',
                                        id: 'update_time',
                                        showText: true,
                                        menu: {
                                            xtype: 'menu',
                                            width: 120,
                                            items: [
                                                me.processMyCheckItem({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange'
                                                    }
                                                }),
                                                me.processMyCheckItem1({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    checked: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange1'
                                                    }
                                                }),
                                                me.processMyCheckItem2({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange2'
                                                    }
                                                }),
                                                me.processMyCheckItem3({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange3'
                                                    }
                                                }),
                                                me.processMyCheckItem4({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange4'
                                                    }
                                                })
                                            ]
                                        }
                                    },
                                    {
                                        xtype: 'label',
                                        cls: 'lb_m_none',
                                        hidden: true,
                                        id: 'ddos_data_error',
                                        bind: {
                                            text: '{nodata_monitor_ddos}'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        cls: 'fld_msg',
                                        itemId: 'fld_msg'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                hidden: true,
                                margin: '8 0 0 0',
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
                                                id: 'date_label',
                                                text: '최종 수정 시간 :'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch',
                                            pack: 'end'
                                        },
                                        items: [
                                            {
                                                xtype: 'checkboxfield',
                                                id: 'update_chk',
                                                boxLabel: '업데이트 주기',
                                                listeners: {
                                                    change: 'onUpdate_chkChange'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                id: 'update_time1',
                                                margin: '0 0 2 5',
                                                width: 70,
                                                labelSeparator: ' ',
                                                labelWidth: 120,
                                                editable: false,
                                                displayField: 'time',
                                                queryMode: 'local',
                                                store: {
                                                    data: [
                                                        {
                                                            time: '5'
                                                        },
                                                        {
                                                            time: '10'
                                                        },
                                                        {
                                                            time: '20'
                                                        },
                                                        {
                                                            time: '30'
                                                        },
                                                        {
                                                            time: '60'
                                                        }
                                                    ],
                                                    fields: [
                                                        {
                                                            name: 'time'
                                                        }
                                                    ]
                                                },
                                                valueField: 'time',
                                                listeners: {
                                                    afterrender: 'onUpdate_timeAfterRender',
                                                    change: 'onUpdate_timeChange'
                                                }
                                            },
                                            {
                                                xtype: 'label',
                                                margin: '5 0 0 5',
                                                text: '(초)'
                                            }
                                        ]
                                    }
                                ]
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
                                        xtype: 'button',
                                        cls: 'btn_b',
                                        iconCls: 'icb_filter',
                                        bind: {
                                            text: '{filter_apply}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick1'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'btn_b',
                                        margin: '0 0 0 10',
                                        iconCls: 'icb_filter_x',
                                        bind: {
                                            text: '{filter_reset}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                hidden: true,
                                margin: '5 0 0 0',
                                title: '필터링 옵션',
                                items: [
                                    {
                                        xtype: 'container',
                                        margin: '0 0 5 0 ',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'combobox',
                                                flex: 0.17,
                                                hidden: true,
                                                id: 'ddos_traf_search_name',
                                                margin: '0 0 0 5',
                                                fieldLabel: '프로파일 이름',
                                                labelAlign: 'top',
                                                labelSeparator: ' ',
                                                editable: false,
                                                listeners: {
                                                    expand: 'onDdos_traf_search_nameExpand'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                flex: 0.08,
                                                id: 'ddos_traf_search_protocol',
                                                margin: '0 0 0 5',
                                                minWidth: 70,
                                                fieldLabel: '프로토콜',
                                                labelAlign: 'top',
                                                labelSeparator: ' ',
                                                editable: false,
                                                emptyText: 'select',
                                                queryMode: 'local',
                                                store: {
                                                    data: [
                                                        {
                                                            text: 'TCP',
                                                            value: 'tcp'
                                                        },
                                                        {
                                                            text: 'UDP',
                                                            value: 'udp'
                                                        },
                                                        {
                                                            text: 'ICMP',
                                                            value: 'icmp'
                                                        }
                                                    ],
                                                    fields: [
                                                        {
                                                            name: 'text'
                                                        },
                                                        {
                                                            name: 'value'
                                                        }
                                                    ]
                                                },
                                                valueField: 'value',
                                                listeners: {
                                                    expand: 'onDdos_traf_search_protocolExpand'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                flex: 0.2,
                                                id: 'ddos_traf_search_stip',
                                                margin: '0 0 0 5',
                                                minWidth: 100,
                                                fieldLabel: '출발지',
                                                labelAlign: 'top',
                                                labelSeparator: ' ',
                                                listeners: {
                                                    focus: 'onDdos_traf_search_stipFocus'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                flex: 0.1,
                                                id: 'ddos_traf_search_stport',
                                                margin: '0 0 0 5',
                                                minWidth: 85,
                                                fieldLabel: '출발지 포트',
                                                labelAlign: 'top',
                                                labelSeparator: ' ',
                                                enforceMaxLength: true,
                                                maxLength: 5,
                                                listeners: {
                                                    focus: 'onDdos_traf_search_stportFocus'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                flex: 0.2,
                                                id: 'ddos_traf_search_dsip',
                                                margin: '0 0 0 5',
                                                minWidth: 100,
                                                fieldLabel: '목적지',
                                                labelAlign: 'top',
                                                labelSeparator: ' ',
                                                listeners: {
                                                    focus: 'onDdos_traf_search_dsipFocus'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                flex: 0.1,
                                                id: 'ddos_traf_search_dsport',
                                                margin: '0 0 0 5',
                                                minWidth: 85,
                                                fieldLabel: '목적지 포트',
                                                labelAlign: 'top',
                                                labelSeparator: ' ',
                                                listeners: {
                                                    focus: 'onDdos_traf_search_dsportFocus'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                flex: 0.12,
                                                id: 'ddos_traf_search_action',
                                                margin: '0 5 0 5',
                                                minWidth: 70,
                                                fieldLabel: '행위',
                                                labelAlign: 'top',
                                                labelSeparator: ' ',
                                                editable: false,
                                                emptyText: 'select',
                                                queryMode: 'local',
                                                store: {
                                                    data: [
                                                        {
                                                            text: '탐지',
                                                            value: '0'
                                                        },
                                                        {
                                                            text: '1:N 차단',
                                                            value: '1'
                                                        },
                                                        {
                                                            text: 'N:1 차단',
                                                            value: '2'
                                                        },
                                                        {
                                                            text: '1:1 차단',
                                                            value: '3'
                                                        }
                                                    ],
                                                    fields: [
                                                        {
                                                            name: 'text'
                                                        },
                                                        {
                                                            name: 'value'
                                                        }
                                                    ]
                                                },
                                                valueField: 'value',
                                                listeners: {
                                                    expand: 'onDdos_traf_search_actionExpand'
                                                }
                                            },
                                            {
                                                xtype: 'image',
                                                hidden: true,
                                                id: 'btn_ddos_traf_search',
                                                margin: '27 0 0 10',
                                                width: 19,
                                                src: '../images/b_signature_search.png'
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
                                        xtype: 'gridpanel',
                                        get_block: function(record, index) {
                                            var _params = {
                                                func_name : Ext.encode('mod_monitor_ddos_session_control'),
                                                args : Ext.encode([{'ip_type':2,'protocol':record.data.protocol,'type':record.data.block_type,'src_ip':record.data.sip,'src_port':record.data.sport,'dst_ip':record.data.dip,'dst_port':record.data.dport,'block_time':30}])
                                            };

                                            request_helper.xmlrpc_call_JsonP(

                                            'ftuctrl',
                                            'execKctrlFunc',
                                            _params,

                                            function(response){
                                            }
                                            );
                                        },
                                        id: 'monitor_ddos_grid',
                                        header: false,
                                        title: 'My Grid Panel',
                                        columnLines: true,
                                        store: 'store_monitor_ddos_list',
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var d = new Date(value*1000);

                                                    var year = d.getFullYear();
                                                    var month = d.getMonth() + 1;
                                                    if(String(month).length === 1){ month = String(0)+month; }
                                                    var day = d.getDate();
                                                    if(String(day).length === 1){ day = String(0)+day; }
                                                    var hour = d.getHours();
                                                    if(String(hour).length === 1){ hour = String(0)+hour; }
                                                    var min = d.getMinutes();
                                                    if(String(min).length === 1){ min = String(0)+min; }
                                                    var sec = d.getSeconds();
                                                    if(String(sec).length === 1){ sec = String(0)+sec; }

                                                    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
                                                },
                                                style: 'padding-bottom:29;',
                                                align: 'center',
                                                dataIndex: 'time',
                                                flex: 0.1,
                                                bind: {
                                                    text: '{hours}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                style: 'padding-bottom:29;',
                                                align: 'center',
                                                dataIndex: 'attack_name',
                                                flex: 0.12,
                                                bind: {
                                                    text: '{attack_type}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return getProtocol(value);
                                                },
                                                items: {
                                                    xtype: 'combobox',
                                                    flex: 1,
                                                    id: 'search_protocol',
                                                    editable: false,
                                                    margin: '16 1 0 -9',
                                                    displayField: 'text',
                                                    valueField: 'value',
                                                    queryMode: 'local',
                                                    store: {
                                                        data: [
                                                            {
                                                                text: 'TCP',
                                                                value: 'tcp'
                                                            },
                                                            {
                                                                text: 'UDP',
                                                                value: 'udp'
                                                            },
                                                            {
                                                                text: 'ICMP',
                                                                value: 'icmp'
                                                            }
                                                        ],
                                                        fields: [
                                                            {
                                                                name: 'text'
                                                            },
                                                            {
                                                                name: 'value'
                                                            }
                                                        ]
                                                    },
                                                    emptyText: __zen('select')
                                                },
                                                style: 'padding-top:13;',
                                                align: 'center',
                                                dataIndex: 'protocol',
                                                flex: 0.08,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{protocol}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                items: {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    maskRe: /[0-9.]/,
                                                    id: 'search_src',
                                                    validator: function(value) {
                                                if(value !== true){
                                                if(value !== ""){
                                                if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
                                                }
                                                }
                                                return true;
                                                },
                                                    margin: '16 1 0 -9',
                                                    listeners: {
                                                        focus: function(component, event, eOpts){
                                                    var str = disp_help_ip('4s');
                                                    component.fieldInfo = str;
                                                    setTipFocus(Ext.getCmp('NFW2_monitor_ddos_traffic'), component);
                                                    },
                                                        blur: function(component, event, eOpts){
                                                    setTipBlur(Ext.getCmp('NFW2_monitor_ddos_traffic'), component);
                                                    component.validateValue(true);
                                                    },
                                                        errorchange: function(labelable, error, eOpts){prt_errMsg(error, null);}
                                                    }
                                                },
                                                style: 'padding-top:13;',
                                                align: 'center',
                                                dataIndex: 'sip',
                                                flex: 0.1,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{src}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                items: {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    maskRe: /[0-9.]/,
                                                    id: 'search_srcport',
                                                    fieldInfo: {
                                                        txt: msg_tip_length(1,
                                                        65535,
                                                        null)
                                                    },
                                                    margin: '16 1 0 -9',
                                                    validator: function(value) {
                                                if(value !== true){
                                                if(value !== ""){
                                                if(!LengthCheck(value, 0, 65535)){ return ValidLimit(0,65535); }
                                                }
                                                }
                                                return true;
                                                },
                                                    enforceMaxLength: true,
                                                    maxLength: 5,
                                                    listeners: {
                                                        focus: function(component, event, eOpts){
                                                    setTipFocus(Ext.getCmp('NFW2_monitor_ddos_traffic'), component);
                                                    },
                                                        blur: function(component, event, eOpts){
                                                    setTipBlur(Ext.getCmp('NFW2_monitor_ddos_traffic'), component);
                                                    component.validateValue(true);
                                                    },
                                                        errorchange: function(labelable, error, eOpts){prt_errMsg(error, null);}
                                                    }
                                                },
                                                style: 'padding-top:13;',
                                                align: 'center',
                                                dataIndex: 'sport',
                                                flex: 0.1,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{src_port}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                items: {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    maskRe: /[0-9.]/,
                                                    id: 'search_dst',
                                                    validator: function(value) {
                                                if(value !== true){
                                                if(value !== ""){
                                                if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
                                                }
                                                }
                                                return true;
                                                },
                                                    margin: '16 1 0 -9',
                                                    listeners: {
                                                        focus: function(component, event, eOpts){
                                                    var str = disp_help_ip('4s');
                                                    component.fieldInfo = str;
                                                    setTipFocus(Ext.getCmp('NFW2_monitor_ddos_traffic'), component);
                                                    },
                                                        blur: function(component, event, eOpts){
                                                    setTipBlur(Ext.getCmp('NFW2_monitor_ddos_traffic'), component);
                                                    component.validateValue(true);
                                                    },
                                                        errorchange: function(labelable, error, eOpts){prt_errMsg(error, null);}
                                                    }
                                                },
                                                style: 'padding-top:13;',
                                                align: 'center',
                                                dataIndex: 'dip',
                                                flex: 0.1,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{dest}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                items: {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    maskRe: /[0-9.]/,
                                                    id: 'search_dstport',
                                                    fieldInfo: {
                                                        txt: msg_tip_length(1,
                                                        65535,
                                                        null)
                                                    },
                                                    margin: '16 1 0 -9',
                                                    validator: function(value) {
                                                if(value !== true){
                                                if(value !== ""){
                                                if(!LengthCheck(value, 0, 65535)){ return ValidLimit(0,65535); }
                                                }
                                                }
                                                return true;
                                                },
                                                    enforceMaxLength: true,
                                                    maxLength: 5,
                                                    listeners: {
                                                        focus: function(component, event, eOpts){
                                                    setTipFocus(Ext.getCmp('NFW2_monitor_ddos_traffic'), component);
                                                    },
                                                        blur: function(component, event, eOpts){
                                                    setTipBlur(Ext.getCmp('NFW2_monitor_ddos_traffic'), component);
                                                    },
                                                        errorchange: function(labelable, error, eOpts){prt_errMsg(error, null);}
                                                    }
                                                },
                                                style: 'padding-top:13;',
                                                align: 'center',
                                                dataIndex: 'dport',
                                                flex: 0.1,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{dest_port}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(value === 1){ return "1:N 차단"; }
                                                    if(value === 2){ return "N:1 차단"; }
                                                    if(value === 3){ return "1:1 차단"; }
                                                    else{ return "탐지"; }
                                                },
                                                items: {
                                                    xtype: 'combobox',
                                                    flex: 1,
                                                    id: 'search_action',
                                                    editable: false,
                                                    margin: '16 1 0 -9',
                                                    displayField: 'text',
                                                    valueField: 'value',
                                                    queryMode: 'local',
                                                    store: {
                                                        data: [
                                                            {
                                                                text: '탐지',
                                                                value: '0'
                                                            },
                                                            {
                                                                text: '1:N 차단',
                                                                value: '1'
                                                            },
                                                            {
                                                                text: 'N:1 차단',
                                                                value: '2'
                                                            },
                                                            {
                                                                text: '1:1 차단',
                                                                value: '3'
                                                            }
                                                        ],
                                                        fields: [
                                                            {
                                                                name: 'text'
                                                            },
                                                            {
                                                                name: 'value'
                                                            }
                                                        ]
                                                    },
                                                    emptyText: __zen('select')
                                                },
                                                style: 'padding-top:13;',
                                                align: 'center',
                                                dataIndex: 'action',
                                                flex: 0.08,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{action}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return value + "(" + record.data.bytes + ")";
                                                },
                                                style: 'padding-bottom:29;',
                                                align: 'center',
                                                dataIndex: 'block_count',
                                                flex: 0.08,
                                                bind: {
                                                    text: '{count_byte}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(record.data.action === 1 || record.data.action === 2 || record.data.action === 3){
                                                        var me = Ext.getCmp('monitor_ddos_grid');
                                                        me['get_record'+rowIndex] = record;
                                                        me['get_index'+rowIndex] = rowIndex;

                                                        return '<input type="button" id="buttonid" value="해제" style="margin-left:5;width:50" onclick="Ext.getCmp(\'monitor_ddos_grid\').get_block(Ext.getCmp(\'monitor_ddos_grid\').get_record'+rowIndex+', Ext.getCmp(\'monitor_ddos_grid\').get_index'+rowIndex+')">';
                                                    }
                                                    else{ return ""; }
                                                },
                                                items: {
                                                    xtype: 'button',
                                                    cls: 'btn_b',
                                                    disabled: true,
                                                    id: 'monitor_ddos_btn',
                                                    margin: '16 0 0 5',
                                                    text: __zen('cancel_all_deny'),
                                                    listeners: {
                                                        click: function(){
                                                    var store = Ext.data.StoreManager.lookup('store_monitor_ddos_list');
                                                    var block = [];
                                                    
                                                    for(var i in store.data.items){
                                                    block.push({
                                                    'ip_type' : 2,
                                                    'protocol' : store.data.items[i].data.protocol,
                                                    'type' : store.data.items[i].data.action,
                                                    'src_ip' : store.data.items[i].data.sip,
                                                    'src_port' : store.data.items[i].data.sport,
                                                    'dst_ip' : store.data.items[i].data.dip,
                                                    'dst_port' : store.data.items[i].data.dport,
                                                    'block_time' : 30
                                                    });
                                                    }
                                                    
                                                    var _params = {
                                                    func_name : Ext.encode('mod_monitor_ddos_session_control'),
                                                    args : Ext.encode(block)
                                                    };
                                                    
                                                    request_helper.xmlrpc_call_JsonP(
                                                    
                                                    'ftuctrl',
                                                    'execKctrlFunc',
                                                    _params,
                                                    
                                                    function(response){
                                                    }
                                                    );
                                                    }
                                                    }
                                                },
                                                minWidth: 60,
                                                style: 'padding-top:13;',
                                                align: 'center',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{cancel_deny}'
                                                }
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

    processMyCheckItem: function(config) {
        config.text = __zen('sec_5');

        return config;
    },

    processMyCheckItem1: function(config) {
        config.text = __zen('sec_10');

        return config;
    },

    processMyCheckItem2: function(config) {
        config.text = __zen('sec_20');

        return config;
    },

    processMyCheckItem3: function(config) {
        config.text = __zen('sec_30');

        return config;
    },

    processMyCheckItem4: function(config) {
        config.text = __zen('sec_60');

        return config;
    },

    onPanelDestroy: function(component, eOpts) {
        var me = this;

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.data.StoreManager.lookup('store_monitor_ddos_list').removeAll();
    },

    onChk_btnChange: function(button) {
        var timeout = Ext.getCmp('timeout');
        var me = Ext.getCmp('NFW2_monitor_ddos_traffic');
        var time = Ext.getCmp('update_time').text.split(' ');

        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        if(String(month).length === 1){ month = String(0)+month; }
        var day = d.getDate();
        if(String(day).length === 1){ day = String(0)+day; }
        var hour = d.getHours();
        if(String(hour).length === 1){ hour = String(0)+hour; }
        var min = d.getMinutes();
        if(String(min).length === 1){ min = String(0)+min; }
        var sec = d.getSeconds();
        if(String(sec).length === 1){ sec = String(0)+sec; }

        if(button.state === true){
            me.src_time = year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
            me.year = year;
            me.month = month;
            me.day = day;
            me.hour = hour;
            me.min = min;
            me.sec = sec;

            me.get_ddos();
            monitor_timeout();
        }
        else{
            clearInterval(timeout.interval);
            Ext.getCmp('timeout').setHtml(Number(time[0]));
        }
    },

    onMenucheckitemCheckChange: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(5);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange1: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(10);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange2: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(20);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange3: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(30);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange4: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(60);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onUpdate_chkChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        if(String(month).length === 1){ month = String(0)+month; }
        var day = d.getDate();
        if(String(day).length === 1){ day = String(0)+day; }
        var hour = d.getHours();
        if(String(hour).length === 1){ hour = String(0)+hour; }
        var min = d.getMinutes();
        if(String(min).length === 1){ min = String(0)+min; }
        var sec = d.getSeconds();
        if(String(sec).length === 1){ sec = String(0)+sec; }

        if(newValue){
            me.src_time = year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
            me.year = year;
            me.month = month;
            me.day = day;
            me.hour = hour;
            me.min = min;
            me.sec = sec;
            me.filter = [];
            me.filter.push(Ext.getCmp('ddos_traf_search_protocol').getValue());
            me.filter.push(Ext.getCmp('ddos_traf_search_stip').getValue());
            me.filter.push(Ext.getCmp('ddos_traf_search_stport').getValue());
            me.filter.push(Ext.getCmp('ddos_traf_search_dsip').getValue());
            me.filter.push(Ext.getCmp('ddos_traf_search_dsport').getValue());
            me.filter.push(Ext.getCmp('ddos_traf_search_action').getValue());
            me.get_ddos();
            if(Ext.getCmp('update_time').getValue() === "2"){ me.interval = setInterval(me.get_ddos, 2000); }
            if(Ext.getCmp('update_time').getValue() === "5"){ me.interval = setInterval(me.get_ddos, 5000); }
            if(Ext.getCmp('update_time').getValue() === "10"){ me.interval = setInterval(me.get_ddos, 10000); }
            if(Ext.getCmp('update_time').getValue() === "30"){ me.interval = setInterval(me.get_ddos, 30000); }
            if(Ext.getCmp('update_time').getValue() === "60"){ me.interval = setInterval(me.get_ddos, 60000); }
        }
        else{
            clearInterval(me.interval);
        }
    },

    onUpdate_timeAfterRender: function(component, eOpts) {
        // var inter = Ext.getCmp('update_time').getStore().data;

        // if(inter.length > 0){
        //     Ext.getCmp("update_time").setValue(inter.items[1].data['time']);
        // }
    },

    onUpdate_timeChange: function(field, newValue, oldValue, eOpts) {
        // var me = this;

        // clearInterval(me.interval);

        // if(Ext.getCmp('update_chk').getValue()){
        //     if(newValue === "2"){ me.interval = setInterval(me.get_ddos, 2000); }
        //     if(newValue === "5"){ me.interval = setInterval(me.get_ddos, 5000); }
        //     if(newValue === "10"){ me.interval = setInterval(me.get_ddos, 10000); }
        //     if(newValue === "30"){ me.interval = setInterval(me.get_ddos, 30000); }
        //     if(newValue === "60"){ me.interval = setInterval(me.get_ddos, 60000); }
        // }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ddos_traffic');

        if(Ext.getCmp('search_src').isValid() === false){ Ext.getCmp('search_src').focus(); return false; }
        if(Ext.getCmp('search_srcport').isValid() === false){ Ext.getCmp('search_srcport').focus(); return false; }
        if(Ext.getCmp('search_dst').isValid() === false){ Ext.getCmp('search_dst').focus(); return false; }
        if(Ext.getCmp('search_dstport').isValid() === false){ Ext.getCmp('search_dstport').focus(); return false; }

        me.filter = [];
        me.filter.push(Ext.getCmp('search_protocol').getValue());
        me.filter.push(Ext.getCmp('search_src').getValue());
        me.filter.push(Ext.getCmp('search_srcport').getValue());
        me.filter.push(Ext.getCmp('search_dst').getValue());
        me.filter.push(Ext.getCmp('search_dstport').getValue());
        me.filter.push(Ext.getCmp('search_action').getValue());

        if(Ext.getCmp('chk_btn').state === true){
            me.get_ddos();
        }
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ddos_traffic');

        me.filter = [];
        Ext.getCmp('search_protocol').reset();
        Ext.getCmp('search_src').reset();
        Ext.getCmp('search_srcport').reset();
        Ext.getCmp('search_dst').reset();
        Ext.getCmp('search_dstport').reset();
        Ext.getCmp('search_action').reset();

        if(Ext.getCmp('chk_btn').state === true){
            me.get_ddos();
        }
    },

    onDdos_traf_search_nameExpand: function(field, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onDdos_traf_search_protocolExpand: function(field, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onDdos_traf_search_stipFocus: function(component, event, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onDdos_traf_search_stportFocus: function(component, event, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onDdos_traf_search_dsipFocus: function(component, event, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onDdos_traf_search_dsportFocus: function(component, event, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onDdos_traf_search_actionExpand: function(field, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        me.src_time = 0;
        me.filter = [];
        this.fieldInfo = makeZenTip();

        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        if(String(month).length === 1){ month = String(0)+month; }
        var day = d.getDate();
        if(String(day).length === 1){ day = String(0)+day; }
        var hour = d.getHours();
        if(String(hour).length === 1){ hour = String(0)+hour; }
        var min = d.getMinutes();
        if(String(min).length === 1){ min = String(0)+min; }
        var sec = d.getSeconds();
        if(String(sec).length === 1){ sec = String(0)+sec; }
        hideLoadMask();
        setTimeout(function(){ me.setWidth('100%'); },100);
        // Ext.getCmp('date_label').setText("최종 수정 시간 : "+year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec);
    },

    get_ddos: function() {
        var me = Ext.getCmp('NFW2_monitor_ddos_traffic');

        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        if(String(month).length === 1){ month = String(0)+month; }
        var day = d.getDate();
        if(String(day).length === 1){ day = String(0)+day; }
        var hour = d.getHours();
        if(String(hour).length === 1){ hour = String(0)+hour; }
        var min = d.getMinutes();
        if(String(min).length === 1){ min = String(0)+min; }
        var sec = d.getSeconds();
        if(String(sec).length === 1){ sec = String(0)+sec; }

        Ext.getCmp('date_label').setText("최종 수정 시간 : "+year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec);

        var now_time = year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec;

        var temp = new Date(year, month, day, hour, min, sec)-new Date(me.year, me.month, me.day, me.hour, me.min, me.sec);

        var update_time = (temp/1000)+10;
        console.log(me.filter);
        for(var i in me.filter){
            if(me.filter[i] === ""){ me.filter[i] = null; }
        }

        var _params = {
            current_datetime : Ext.encode(''),
            update_secs : Ext.encode(Number(update_time)),
            filter_info : Ext.encode({'protocol':me.filter[0], 'sip':me.filter[1], 'sport':me.filter[2], 'dip':me.filter[3], 'dport':me.filter[4], 'block_type':me.filter[5]}),
            limit : Ext.encode(10000)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getDDoSLogMon',
            _params,

            function(response){
                //         hideLoadMask();
                var record = [];
                var chk_action = false;
                if(response.list.length === 0){ Ext.getCmp('ddos_data_error').show(); }
                else{ Ext.getCmp('ddos_data_error').hide(); }
                for(var i in response.list){
                    if(response.list !== null){
                        if(response.list[i].block_type !== 0){ chk_action = true; }
                        record.push({
                            'time' : response.list[i].timestamp,
                            'attack_name' : response.list[i].description,
                            'protocol' : response.list[i].protocol,
                            'sip' : response.list[i].sip,
                            'sport' : response.list[i].sport,
                            'dip' : response.list[i].dip,
                            'dport' : response.list[i].dport,
                            'action' : response.list[i].block_type,
                            'block_count' : response.list[i].count,
                            'bytes' : response.list[i].bytes
                        });
                    }
                }

                if(!chk_action){ Ext.getCmp('monitor_ddos_btn').disable(); }
                else{ Ext.getCmp('monitor_ddos_btn').enable(); }

                var store = Ext.data.StoreManager.lookup('store_monitor_ddos_list');
                //         store.clearFilter();
                store.loadData(record);

                //         if(Ext.getCmp('search_src').getValue() !== ""){ store.filter('sip', Ext.getCmp('search_src').getValue()); }
                //         if(Ext.getCmp('search_srcport').getValue() !== ""){ store.filter('sport', Ext.getCmp('search_srcport').getValue()); }
                //         if(Ext.getCmp('search_dst').getValue() !== ""){ store.filter('dip', Ext.getCmp('search_dst').getValue()); }
                //         if(Ext.getCmp('search_dstport').getValue() !== ""){ store.filter('dport', Ext.getCmp('search_dstport').getValue()); }
                //         if(Ext.getCmp('search_protocol').getValue() !== null){ store.filter('protocol', Ext.getCmp('search_protocol').getValue()); }
                //         if(Ext.getCmp('search_action').getValue() !== null){ store.filter('action', Ext.getCmp('search_action').getValue()); }
            }
        );

    }

});