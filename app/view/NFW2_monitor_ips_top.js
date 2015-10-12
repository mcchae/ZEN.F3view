
Ext.define('NFW2.view.NFW2_monitor_ips_top', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_ips_top',

    requires: [
        'NFW2.view.NFW2_monitor_ips_topViewModel',
        'Ext.form.Panel',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.form.Label',
        'Ext.button.Segmented',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
        'Ext.form.FieldSet',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.view.Table'
    ],

    viewModel: {
        type: 'nfw2_monitor_ips_top'
    },
    cls: 'zen_body',
    id: 'NFW2_monitor_ips_top',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onNFW2_monitor_ips_attackAfterRender',
        render: 'onNFW2_monitor_ips_attackRender',
        beforedestroy: 'onNFW2_monitor_ips_attackDestroy'
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
                                        listeners: {
                                            change: 'onChk_btnChange'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        set_data: function() {
                                            var me = Ext.getCmp('NFW2_monitor_ips_top');

                                            me.get_attack();
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
                                                        checkchange: 'onMenucheckitemCheckChange4'
                                                    }
                                                }),
                                                me.processMyCheckItem1({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    checked: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange3'
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
                                                        checkchange: 'onMenucheckitemCheckChange1'
                                                    }
                                                }),
                                                me.processMyCheckItem4({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange'
                                                    }
                                                })
                                            ]
                                        }
                                    },
                                    {
                                        xtype: 'label',
                                        cls: 'lb_m_none',
                                        hidden: true,
                                        id: 'top_data_error',
                                        bind: {
                                            text: '{nodata_monitor_ips_top}'
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
                                margin: '10 0 0 10',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'segmentedbutton',
                                        cls: 'seg_tab',
                                        items: [
                                            {
                                                id: 'ips_type1',
                                                enableToggle: true,
                                                pressed: true,
                                                bind: {
                                                    text: '{attack}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick4'
                                                }
                                            },
                                            {
                                                id: 'ips_type2',
                                                bind: {
                                                    text: '{deny}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick3'
                                                }
                                            },
                                            {
                                                id: 'ips_type3',
                                                bind: {
                                                    text: '{detect}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick2'
                                                }
                                            },
                                            {
                                                id: 'ips_type4',
                                                bind: {
                                                    text: '{attack_port}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick1'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'segmentedbutton',
                                        cls: 'seg_monitor',
                                        margin: '0 0 0 30',
                                        items: [
                                            {
                                                enableToggle: true,
                                                pressed: true,
                                                bind: {
                                                    text: '{min_5}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick10'
                                                }
                                            },
                                            {
                                                bind: {
                                                    text: '{min_10}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick9'
                                                }
                                            },
                                            {
                                                bind: {
                                                    text: '{min_30}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick8'
                                                }
                                            },
                                            {
                                                bind: {
                                                    text: '{hour_1}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick7'
                                                }
                                            },
                                            {
                                                bind: {
                                                    text: '{hour_5}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick6'
                                                }
                                            },
                                            {
                                                bind: {
                                                    text: '{hour_12}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick5'
                                                }
                                            }
                                        ]
                                    },
                                    me.processTop_chk({
                                        xtype: 'cycle',
                                        focusCls: 'btn_f',
                                        cls: 'sel_monitor',
                                        id: 'top_chk',
                                        margin: '0 0 0 10',
                                        showText: true,
                                        menu: {
                                            xtype: 'menu',
                                            width: 120,
                                            items: [
                                                {
                                                    xtype: 'menucheckitem',
                                                    text: '10',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange8'
                                                    }
                                                },
                                                {
                                                    xtype: 'menucheckitem',
                                                    text: '20',
                                                    focusable: true,
                                                    checked: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange7'
                                                    }
                                                },
                                                {
                                                    xtype: 'menucheckitem',
                                                    text: '50',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange6'
                                                    }
                                                },
                                                {
                                                    xtype: 'menucheckitem',
                                                    text: '100',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange5'
                                                    }
                                                }
                                            ]
                                        }
                                    }),
                                    {
                                        xtype: 'button',
                                        cls: 'btn_b',
                                        margin: '0 0 0 10',
                                        iconCls: 'icb_filter',
                                        bind: {
                                            text: '{filter_apply}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick12'
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
                                            click: 'onButtonClick11'
                                        }
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
                                                xtype: 'combobox',
                                                id: 'start_time',
                                                margin: '0 0 2 0',
                                                width: 200,
                                                fieldLabel: '시간',
                                                labelSeparator: ' ',
                                                editable: false,
                                                displayField: 'name',
                                                queryMode: 'local',
                                                store: {
                                                    data: [
                                                        {
                                                            name: '5분',
                                                            value: 5
                                                        },
                                                        {
                                                            name: '10분',
                                                            value: 10
                                                        },
                                                        {
                                                            name: '30분',
                                                            value: 30
                                                        },
                                                        {
                                                            name: '1시간',
                                                            value: 60
                                                        },
                                                        {
                                                            name: '5시간',
                                                            value: 300
                                                        },
                                                        {
                                                            name: '12시간',
                                                            value: 720
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
                                                    afterrender: 'onStart_timeAfterRender'
                                                }
                                            },
                                            {
                                                xtype: 'checkboxfield',
                                                id: 'update_chk',
                                                margin: '0 0 0 5',
                                                labelSeparator: ' ',
                                                boxLabel: '업데이트 주기',
                                                listeners: {
                                                    change: 'onUpdate_chkChange'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                items: [
                                                    {
                                                        xtype: 'combobox',
                                                        id: 'update_time1',
                                                        margin: '0 0 2 5',
                                                        width: 70,
                                                        labelSeparator: ' ',
                                                        editable: false,
                                                        displayField: 'time',
                                                        queryMode: 'local',
                                                        store: {
                                                            data: [
                                                                {
                                                                    time: 5
                                                                },
                                                                {
                                                                    time: 10
                                                                },
                                                                {
                                                                    time: 20
                                                                },
                                                                {
                                                                    time: 30
                                                                },
                                                                {
                                                                    time: 60
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
                                                            afterrender: 'onComboboxAfterRender',
                                                            change: 'onUpdate_timeChange'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'label',
                                                margin: '5 0 0 15',
                                                text: '(초)'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                hidden: true,
                                margin: '5 0 0 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch',
                                    pack: 'end'
                                },
                                items: [
                                    {
                                        xtype: 'combobox',
                                        id: 'ips_top_type',
                                        width: 200,
                                        fieldLabel: '항목',
                                        labelSeparator: ' ',
                                        editable: false,
                                        displayField: 'name',
                                        queryMode: 'local',
                                        store: {
                                            data: [
                                                {
                                                    name: '공격',
                                                    value: 'attack'
                                                },
                                                {
                                                    name: '차단',
                                                    value: 'block'
                                                },
                                                {
                                                    name: '탐지',
                                                    value: 'detect'
                                                },
                                                {
                                                    name: '공격 포트',
                                                    value: 'port'
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
                                            afterrender: 'onIps_top_typeAfterRender',
                                            change: 'onIps_top_typeChange',
                                            expand: 'onIps_top_typeExpand'
                                        }
                                    },
                                    {
                                        xtype: 'combobox',
                                        id: 'attack_topn',
                                        margin: '0 0 0 7',
                                        width: 200,
                                        fieldLabel: 'Top',
                                        labelSeparator: ' ',
                                        editable: false,
                                        displayField: 'value',
                                        queryMode: 'local',
                                        store: {
                                            data: [
                                                {
                                                    value: 10
                                                },
                                                {
                                                    value: 20
                                                },
                                                {
                                                    value: 50
                                                },
                                                {
                                                    value: 100
                                                },
                                                
                                            ],
                                            fields: [
                                                {
                                                    name: 'value'
                                                }
                                            ]
                                        },
                                        valueField: 'value',
                                        listeners: {
                                            afterrender: 'onAttack_topnAfterRender',
                                            select: 'onAttack_topnSelect',
                                            expand: 'onUpdate_timeExpand'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                hidden: true,
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        layout: 'auto',
                                        title: '필터링 옵션',
                                        items: [
                                            {
                                                xtype: 'container',
                                                margin: '0 0 5 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        cls: 'btn_b',
                                                        margin: '5 0 0 0',
                                                        width: 60,
                                                        text: '초기화',
                                                        listeners: {
                                                            click: 'onButtonClick'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            if(CheckNotNull(value)){
                                                                if(!ValidIPAddress(value)){ return get_msg(err_ipv4); }
                                                            }

                                                            return true;
                                                        },
                                                        id: 'ips_attack_search11',
                                                        margin: '0 0 0 5',
                                                        width: 150,
                                                        fieldLabel: '공격자',
                                                        labelAlign: 'top',
                                                        labelSeparator: ' ',
                                                        msgTarget: 'none',
                                                        enforceMaxLength: true,
                                                        maskRe: /[0-9.]/,
                                                        maxLength: 15,
                                                        listeners: {
                                                            errorchange: 'onIps_attack_search2ErrorChange1',
                                                            focus: 'onIps_attack_search2Focus1'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'combobox',
                                                        hidden: true,
                                                        id: 'ips_block_search11',
                                                        margin: '0 0 0 5',
                                                        width: 100,
                                                        fieldLabel: '위험도',
                                                        labelAlign: 'top',
                                                        labelSeparator: ' ',
                                                        msgTarget: 'none',
                                                        editable: false,
                                                        emptyText: 'All',
                                                        displayField: 'name',
                                                        queryMode: 'local',
                                                        store: {
                                                            data: [
                                                                {
                                                                    name: 'Low',
                                                                    value: '4'
                                                                },
                                                                {
                                                                    name: 'Normal',
                                                                    value: '3'
                                                                },
                                                                {
                                                                    name: 'High',
                                                                    value: '2'
                                                                },
                                                                {
                                                                    name: 'Critical',
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
                                                        listeners: {
                                                            expand: 'onIps_block_search1Expand'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        hidden: true,
                                                        id: 'ips_block_search21',
                                                        margin: '0 0 0 5',
                                                        width: 200,
                                                        fieldLabel: '시그너처 이름',
                                                        labelAlign: 'top',
                                                        labelSeparator: ' ',
                                                        msgTarget: 'none',
                                                        enforceMaxLength: true,
                                                        maxLength: 31,
                                                        listeners: {
                                                            focus: 'onIps_block_search2Focus'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'combobox',
                                                        hidden: true,
                                                        id: 'ips_port_search11',
                                                        margin: '0 0 0 5',
                                                        width: 100,
                                                        fieldLabel: '프로토콜',
                                                        labelAlign: 'top',
                                                        labelSeparator: ' ',
                                                        editable: false,
                                                        emptyText: 'All',
                                                        displayField: 'name',
                                                        queryMode: 'local',
                                                        store: {
                                                            data: [
                                                                {
                                                                    name: 'TCP',
                                                                    value: '6'
                                                                },
                                                                {
                                                                    name: 'UCP',
                                                                    value: '17'
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
                                                            expand: 'onIps_port_search1Expand'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        hidden: true,
                                                        id: 'ips_port_search21',
                                                        margin: '0 0 0 5',
                                                        width: 100,
                                                        fieldLabel: '공격 포트',
                                                        labelAlign: 'top',
                                                        labelSeparator: ' ',
                                                        msgTarget: 'none',
                                                        enforceMaxLength: true,
                                                        maskRe: /[0-9]/,
                                                        maxLength: 5,
                                                        listeners: {
                                                            focus: 'onIps_port_search2Focus'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            if(CheckNotNull(value)){
                                                                if(value <= 0 || value >= 10000){ return ValidLimit(0,10000); }
                                                            }

                                                            return true;
                                                        },
                                                        id: 'ips_attack_search21',
                                                        margin: '0 0 0 5',
                                                        width: 100,
                                                        fieldLabel: '탐지',
                                                        labelAlign: 'top',
                                                        labelSeparator: ' ',
                                                        msgTarget: 'none',
                                                        enforceMaxLength: true,
                                                        maskRe: /[0-9.]/,
                                                        maxLength: 5,
                                                        listeners: {
                                                            errorchange: 'onIps_attack_search2ErrorChange',
                                                            focus: 'onIps_attack_search2Focus'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            if(CheckNotNull(value)){
                                                                if(value <= 0 || value >= 10000){ return ValidLimit(0,10000); }
                                                            }

                                                            return true;
                                                        },
                                                        id: 'ips_attack_search31',
                                                        margin: '0 0 0 5',
                                                        width: 100,
                                                        fieldLabel: '차단',
                                                        labelAlign: 'top',
                                                        labelSeparator: ' ',
                                                        msgTarget: 'none',
                                                        enforceMaxLength: true,
                                                        maskRe: /[0-9.]/,
                                                        maxLength: 5,
                                                        listeners: {
                                                            errorchange: 'onIps_attack_search3ErrorChange',
                                                            focus: 'onIps_attack_search3Focus'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'label',
                                        cls: 'errorBox',
                                        hidden: true,
                                        id: 'ips_attack_error',
                                        margin: '50 0 0 5'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                margin: '8 0 0 0',
                                items: [
                                    {
                                        xtype: 'gridpanel',
                                        id: 'ips_attack_grid',
                                        header: false,
                                        title: 'My Grid Panel',
                                        columnLines: true,
                                        columns: [
                                            {
                                                xtype: 'rownumberer',
                                                style: 'padding-bottom:29;',
                                                width: 60,
                                                align: 'center',
                                                dataIndex: 'string',
                                                text: 'N'
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var me = Ext.getCmp('NFW2_monitor_ips_top');
                                                    // if(me.ips_type === "attack"){
                                                    var who = '<button class="dbtn who" onclick="show_whois(\''+value+'\')"></button>';
                                                    var tra = '<button class="dbtn tra" onclick="show_trace(\''+value+'\')"></button>';

                                                    return '<table align="center" style="width:150"><tr><td style="font-size:13px">' + who + tra + '<span>'+value+'</span>' + '</td></tr></table>';
                                                    // }
                                                    // else if(me.ips_type === "port"){
                                                    //     return getProtocol(value);
                                                    // }
                                                    // else{
                                                    //     if(record.data.priority === 1){ return '<table align="center" style="width:300"><tr><td style="font-size:13px"><img src="../images/level_critical.png" border="0" height="14"/>' + " " + value + '</td></tr></table>'; }
                                                    //     if(record.data.priority === 2){ return '<table align="center" style="width:300"><tr><td style="font-size:13px"><img src="../images/level_high.png" border="0" height="14"/>' + " " + value + '</td></tr></table>'; }
                                                    //     if(record.data.priority === 3){ return '<table align="center" style="width:300"><tr><td style="font-size:13px"><img src="../images/level_normal.png" border="0" height="14"/>' + " " + value + '</td></tr></table>'; }
                                                    //     else{ return '<table align="center" style="width:300"><tr><td style="font-size:13px"><img src="../images/level_low.png" border="0" height="14"/>' + " " + value + '</td></tr></table>'; }
                                                    // }

                                                },
                                                items: {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            flex: 1,
                                                            maskRe: /[0-9.]/,
                                                            validator: function(value) {
                                                        if(value !== true){
                                                        if(value !== ""){
                                                        if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
                                                        }
                                                        }
                                                        return true;
                                                        },
                                                            id: 'ips_attack_search1',
                                                            margin: '16 1 0 -9',
                                                            listeners: {
                                                                focus: function(component, event, eOpts){
                                                            var str = disp_help_ip('4s');
                                                            component.fieldInfo = str;
                                                            setTipFocus(Ext.getCmp('NFW2_monitor_ips_top'), component);
                                                            },
                                                                blur: function(component, event, eOpts){
                                                            setTipBlur(Ext.getCmp('NFW2_monitor_ips_top'), component);
                                                            component.validateValue(true);
                                                            },
                                                                errorchange: function(labelable, error, eOpts){ prt_errMsg(error, null); }
                                                            }
                                                        }
                                                    ]
                                                },
                                                id: 'grid_ips_top1',
                                                style: 'padding-top:13;',
                                                sortable: false,
                                                align: 'center',
                                                dataIndex: 'src',
                                                flex: 0.3,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{attacker}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    Ext.util.Format.thousandSeparator = ',';

                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                items: {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    maskRe: /[0-9.]/,
                                                    validator: function(value) {
                                                if(value !== true){
                                                if(value !== ""){
                                                if(!LengthCheck(value, 0, 10000)){ return ValidLimit(0,10000); }
                                                }
                                                }
                                                return true;
                                                },
                                                    id: 'ips_attack_search2',
                                                    margin: '16 1 0 -9',
                                                    maxHeight: 24,
                                                    listeners: {
                                                        focus: function(component, event, eOpts){
                                                    component.fieldInfo = { txt: msg_tip_length(0,10000,null) },
                                                    setTipFocus(Ext.getCmp('NFW2_monitor_ips_top'), component);
                                                    },
                                                        blur: function(component, event, eOpts){
                                                    setTipBlur(Ext.getCmp('NFW2_monitor_ips_top'), component);
                                                    component.validateValue(true);
                                                    },
                                                        errorchange: function(labelable, error, eOpts){ prt_errMsg(error, null); }
                                                    }
                                                },
                                                style: 'padding-top:13;',
                                                align: 'center',
                                                dataIndex: 'detect',
                                                flex: 0.1,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{detect}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    Ext.util.Format.thousandSeparator = ',';

                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                items: {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    maskRe: /[0-9.]/,
                                                    validator: function(value) {
                                                if(value !== true){
                                                if(value !== ""){
                                                if(!LengthCheck(value, 0, 10000)){ return ValidLimit(0,10000); }
                                                }
                                                }
                                                return true;
                                                },
                                                    id: 'ips_attack_search3',
                                                    margin: '16 1 0 -9',
                                                    maxHeight: 24,
                                                    listeners: {
                                                        focus: function(component, event, eOpts){
                                                    component.fieldInfo = { txt: msg_tip_length(0,10000,null) },
                                                    setTipFocus(Ext.getCmp('NFW2_monitor_ips_top'), component);
                                                    },
                                                        blur: function(component, event, eOpts){
                                                    setTipBlur(Ext.getCmp('NFW2_monitor_ips_top'), component);
                                                    component.validateValue(true);
                                                    },
                                                        errorchange: function(labelable, error, eOpts){ prt_errMsg(error, null); }
                                                    }
                                                },
                                                style: 'padding-top:13;',
                                                align: 'center',
                                                dataIndex: 'block',
                                                flex: 0.1,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{deny}'
                                                }
                                            }
                                        ],
                                        listeners: {
                                            beforedestroy: 'onIps_attack_gridBeforeDestroy'
                                        }
                                    },
                                    {
                                        xtype: 'gridpanel',
                                        hidden: true,
                                        id: 'ips_port_grid',
                                        header: false,
                                        title: 'My Grid Panel',
                                        columnLines: true,
                                        columns: [
                                            {
                                                xtype: 'rownumberer',
                                                style: 'padding-bottom:29;',
                                                width: 60,
                                                align: 'center',
                                                dataIndex: 'string',
                                                text: 'N'
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var me = Ext.getCmp('NFW2_monitor_ips_top');
                                                    // if(me.ips_type === "attack"){
                                                    //     var who = '<button class="dbtn who" onclick="show_whois(\''+value+'\')"></button>';
                                                    //     var tra = '<button class="dbtn tra" onclick="show_trace(\''+value+'\')"></button>';

                                                    //     return '<table align="center" style="width:150"><tr><td style="font-size:13px">' + who + tra + '<span>'+value+'</span>' + '</td></tr></table>';
                                                    // }
                                                    // else if(me.ips_type === "port"){
                                                    return getProtocol(value);
                                                    // }
                                                    // else{
                                                    //     if(record.data.priority === 1){ return '<table align="center" style="width:300"><tr><td style="font-size:13px"><img src="../images/level_critical.png" border="0" height="14"/>' + " " + value + '</td></tr></table>'; }
                                                    //     if(record.data.priority === 2){ return '<table align="center" style="width:300"><tr><td style="font-size:13px"><img src="../images/level_high.png" border="0" height="14"/>' + " " + value + '</td></tr></table>'; }
                                                    //     if(record.data.priority === 3){ return '<table align="center" style="width:300"><tr><td style="font-size:13px"><img src="../images/level_normal.png" border="0" height="14"/>' + " " + value + '</td></tr></table>'; }
                                                    //     else{ return '<table align="center" style="width:300"><tr><td style="font-size:13px"><img src="../images/level_low.png" border="0" height="14"/>' + " " + value + '</td></tr></table>'; }
                                                    // Ext.getCmp('ips_attack_grid').getStore().loadData(record1);

                                                },
                                                items: {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            id: 'ips_port_search1',
                                                            margin: '16 1 1 -9',
                                                            editable: false,
                                                            valueField: 'value',
                                                            displayField: 'name',
                                                            queryMode: 'local',
                                                            store: {
                                                                data: [
                                                                    {
                                                                        name: 'TCP',
                                                                        value: '6'
                                                                    },
                                                                    {
                                                                        name: 'UDP',
                                                                        value: '17'
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
                                                            emptyText: __zen('select')
                                                        }
                                                    ]
                                                },
                                                id: 'grid_ips_top4',
                                                style: 'padding-top:13;',
                                                sortable: false,
                                                align: 'center',
                                                dataIndex: 'src',
                                                flex: 0.1,
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
                                                    id: 'ips_port_search2',
                                                    margin: '16 1 0 -9',
                                                    maxHeight: 24,
                                                    fieldInfo: {
                                                        txt: msg_tip_length(1,
                                                        65535,
                                                        null)
                                                    },
                                                    enforceMaxLength: true,
                                                    maxLength: 5,
                                                    listeners: {
                                                        focus: function(component, event, eOpts){
                                                    setTipFocus(Ext.getCmp('NFW2_monitor_ips_top'), component);
                                                    },
                                                        blur: function(component, event, eOpts){
                                                    setTipBlur(Ext.getCmp('NFW2_monitor_ips_top'), component);
                                                    }
                                                    }
                                                },
                                                id: 'grid_ips_top5',
                                                style: 'padding-top:13;',
                                                sortable: false,
                                                align: 'center',
                                                dataIndex: 'port',
                                                flex: 0.1,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{attack_port}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    Ext.util.Format.thousandSeparator = ',';

                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                items: {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    maskRe: /[0-9.]/,
                                                    validator: function(value) {
                                                if(value !== true){
                                                if(value !== ""){
                                                if(!LengthCheck(value, 0, 10000)){ return ValidLimit(0,10000); }
                                                }
                                                }
                                                return true;
                                                },
                                                    id: 'ips_attack_search4',
                                                    margin: '16 1 0 -9',
                                                    maxHeight: 24,
                                                    listeners: {
                                                        focus: function(component, event, eOpts){
                                                    component.fieldInfo = { txt: msg_tip_length(0,10000,null) },
                                                    setTipFocus(Ext.getCmp('NFW2_monitor_ips_top'), component);
                                                    },
                                                        blur: function(component, event, eOpts){
                                                    setTipBlur(Ext.getCmp('NFW2_monitor_ips_top'), component);
                                                    component.validateValue(true);
                                                    },
                                                        errorchange: function(labelable, error, eOpts){ prt_errMsg(error, null); }
                                                    }
                                                },
                                                style: 'padding-top:13;',
                                                align: 'center',
                                                dataIndex: 'detect',
                                                flex: 0.1,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{detect}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    Ext.util.Format.thousandSeparator = ',';

                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                items: {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    maskRe: /[0-9.]/,
                                                    validator: function(value) {
                                                if(value !== true){
                                                if(value !== ""){
                                                if(!LengthCheck(value, 0, 10000)){ return ValidLimit(0,10000); }
                                                }
                                                }
                                                return true;
                                                },
                                                    id: 'ips_attack_search5',
                                                    margin: '16 1 0 -9',
                                                    maxHeight: 24,
                                                    listeners: {
                                                        focus: function(component, event, eOpts){
                                                    component.fieldInfo = { txt: msg_tip_length(0,10000,null) },
                                                    setTipFocus(Ext.getCmp('NFW2_monitor_ips_top'), component);
                                                    },
                                                        blur: function(component, event, eOpts){
                                                    setTipBlur(Ext.getCmp('NFW2_monitor_ips_top'), component);
                                                    component.validateValue(true);
                                                    },
                                                        errorchange: function(labelable, error, eOpts){ prt_errMsg(error, null); }
                                                    }
                                                },
                                                style: 'padding-top:13;',
                                                align: 'center',
                                                dataIndex: 'block',
                                                flex: 0.1,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{deny}'
                                                }
                                            }
                                        ],
                                        listeners: {
                                            beforedestroy: 'onIps_attack_gridBeforeDestroy2'
                                        }
                                    },
                                    {
                                        xtype: 'gridpanel',
                                        hidden: true,
                                        id: 'ips_detect_grid',
                                        header: false,
                                        title: 'My Grid Panel',
                                        columnLines: true,
                                        columns: [
                                            {
                                                xtype: 'rownumberer',
                                                style: 'padding-bottom:29;',
                                                width: 60,
                                                align: 'center',
                                                dataIndex: 'string',
                                                text: 'N'
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var me = Ext.getCmp('NFW2_monitor_ips_top');
                                                    // if(me.ips_type === "attack"){
                                                    //     var who = '<button class="dbtn who" onclick="show_whois(\''+value+'\')"></button>';
                                                    //     var tra = '<button class="dbtn tra" onclick="show_trace(\''+value+'\')"></button>';

                                                    //     return '<table align="center" style="width:150"><tr><td style="font-size:13px">' + who + tra + '<span>'+value+'</span>' + '</td></tr></table>';
                                                    // }
                                                    // else if(me.ips_type === "port"){
                                                    //     return getProtocol(value);
                                                    // }
                                                    // else{
                                                    if(record.data.priority === 1){ return '<table align="center" style="width:300"><tr><td style="font-size:13px"><img src="../images/level_critical.png" border="0" height="14"/>' + " " + value + '</td></tr></table>'; }
                                                    if(record.data.priority === 2){ return '<table align="center" style="width:300"><tr><td style="font-size:13px"><img src="../images/level_high.png" border="0" height="14"/>' + " " + value + '</td></tr></table>'; }
                                                    if(record.data.priority === 3){ return '<table align="center" style="width:300"><tr><td style="font-size:13px"><img src="../images/level_normal.png" border="0" height="14"/>' + " " + value + '</td></tr></table>'; }
                                                    else{ return '<table align="center" style="width:300"><tr><td style="font-size:13px"><img src="../images/level_low.png" border="0" height="14"/>' + " " + value + '</td></tr></table>'; }
                                                    // }

                                                },
                                                items: {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            flex: 0.5,
                                                            id: 'ips_block_search1',
                                                            margin: '16 1 1 -9',
                                                            editable: false,
                                                            valueField: 'value',
                                                            displayField: 'name',
                                                            queryMode: 'local',
                                                            store: {
                                                                data: [
                                                                    {
                                                                        name: 'Low',
                                                                        value: '4'
                                                                    },
                                                                    {
                                                                        name: 'Normal',
                                                                        value: '3'
                                                                    },
                                                                    {
                                                                        name: 'High',
                                                                        value: '2'
                                                                    },
                                                                    {
                                                                        name: 'Critical',
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
                                                            emptyText: __zen('select')
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            flex: 1,
                                                            hidden: true,
                                                            id: 'ips_block_search2',
                                                            margin: '16 1 0 -9'
                                                        }
                                                    ]
                                                },
                                                id: 'grid_ips_top3',
                                                style: 'padding-top:13;',
                                                sortable: false,
                                                align: 'center',
                                                dataIndex: 'src',
                                                flex: 0.3,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{sig_name}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    Ext.util.Format.thousandSeparator = ',';

                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                items: {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    maskRe: /[0-9.]/,
                                                    validator: function(value) {
                                                if(value !== true){
                                                if(value !== ""){
                                                if(!LengthCheck(value, 0, 10000)){ return ValidLimit(0,10000); }
                                                }
                                                }
                                                return true;
                                                },
                                                    id: 'ips_attack_search6',
                                                    margin: '16 1 0 -9',
                                                    maxHeight: 24,
                                                    listeners: {
                                                        focus: function(component, event, eOpts){
                                                    component.fieldInfo = { txt: msg_tip_length(0,10000,null) },
                                                    setTipFocus(Ext.getCmp('NFW2_monitor_ips_top'), component);
                                                    },
                                                        blur: function(component, event, eOpts){
                                                    setTipBlur(Ext.getCmp('NFW2_monitor_ips_top'), component);
                                                    component.validateValue(true);
                                                    },
                                                        errorchange: function(labelable, error, eOpts){ prt_errMsg(error, null); }
                                                    }
                                                },
                                                style: 'padding-top:13;',
                                                align: 'center',
                                                dataIndex: 'detect',
                                                flex: 0.1,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{detect}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    Ext.util.Format.thousandSeparator = ',';

                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                items: {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    maskRe: /[0-9.]/,
                                                    validator: function(value) {
                                                if(value !== true){
                                                if(value !== ""){
                                                if(!LengthCheck(value, 0, 10000)){ return ValidLimit(0,10000); }
                                                }
                                                }
                                                return true;
                                                },
                                                    id: 'ips_attack_search7',
                                                    margin: '16 1 0 -9',
                                                    maxHeight: 24,
                                                    listeners: {
                                                        focus: function(component, event, eOpts){
                                                    component.fieldInfo = { txt: msg_tip_length(0,10000,null) },
                                                    setTipFocus(Ext.getCmp('NFW2_monitor_ips_top'), component);
                                                    },
                                                        blur: function(component, event, eOpts){
                                                    setTipBlur(Ext.getCmp('NFW2_monitor_ips_top'), component);
                                                    component.validateValue(true);
                                                    },
                                                        errorchange: function(labelable, error, eOpts){ prt_errMsg(error, null); }
                                                    }
                                                },
                                                style: 'padding-top:13;',
                                                align: 'center',
                                                dataIndex: 'block',
                                                flex: 0.1,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{deny}'
                                                }
                                            }
                                        ],
                                        listeners: {
                                            beforedestroy: 'onIps_attack_gridBeforeDestroy1'
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

    processTop_chk: function(config) {
        config.prependText = __zen('top') + " ";

        return config;
    },

    onChk_btnChange: function(button) {
        var timeout = Ext.getCmp('timeout');
        var me = Ext.getCmp('NFW2_monitor_ips_top');
        var time = Ext.getCmp('update_time').text.split(' ');

        if(button.state === true){
            var _params = {
                type : Ext.encode('all'),
                criteria : Ext.encode({}),
                time_info : Ext.encode({'time_mins':5, 'update_secs':5, 'start_ts':0})
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getMonitorIPSTOP10',
                _params,

                function(response){
                    me.src_time = response.start_ts;
                }
            );
            me.get_attack();
            monitor_timeout();
        }
        else{
            clearInterval(timeout.interval);
            Ext.getCmp('timeout').setHtml(Number(time[0]));
        }
    },

    onMenucheckitemCheckChange4: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_top');
        me.update_sec = 5;

        Ext.getCmp('timeout').setHtml(5);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange3: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_top');
        me.update_sec = 10;

        Ext.getCmp('timeout').setHtml(10);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange2: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_top');
        me.update_sec = 20;

        Ext.getCmp('timeout').setHtml(20);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange1: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_top');
        me.update_sec = 30;

        Ext.getCmp('timeout').setHtml(30);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_top');
        me.update_sec = 60;

        Ext.getCmp('timeout').setHtml(60);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick4: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_top');
        me.ips_type = "attack";
        Ext.getCmp('ips_attack_grid').show();
        Ext.getCmp('ips_port_grid').hide();
        Ext.getCmp('ips_detect_grid').hide();

        Ext.getCmp('ips_port_search1').hide();
        Ext.getCmp('ips_port_search2').hide();
        Ext.getCmp('ips_block_search1').hide();
        Ext.getCmp('ips_block_search2').hide();

        Ext.getCmp('ips_attack_search1').show();
        Ext.getCmp('ips_attack_grid').getStore().removeAll();
        // Ext.getCmp('grid_ips_top2').hide();
        // Ext.getCmp('grid_ips_top1').setText('공격자');
        // Ext.getCmp('grid_ips_top1').flex = 0.3;

        Ext.getCmp('ips_attack_grid').getView().refresh();
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_ips_top').get_attack();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick3: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_top');
        me.ips_type = "block";
        Ext.getCmp('ips_attack_grid').hide();
        Ext.getCmp('ips_port_grid').hide();
        Ext.getCmp('ips_detect_grid').show();

        Ext.getCmp('ips_port_search1').hide();
        Ext.getCmp('ips_port_search2').hide();
        Ext.getCmp('ips_attack_search1').hide();

        Ext.getCmp('ips_block_search1').show();
        Ext.getCmp('ips_block_search2').show();
        Ext.getCmp('ips_attack_grid').getStore().removeAll();
        // Ext.getCmp('grid_ips_top2').hide();
        // Ext.getCmp('grid_ips_top1').setText('시그너처 이름');
        // Ext.getCmp('grid_ips_top1').flex = 0.3;

        Ext.getCmp('ips_attack_grid').getView().refresh();
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_ips_top').get_attack();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_top');
        me.ips_type = "detect";
        Ext.getCmp('ips_attack_grid').hide();
        Ext.getCmp('ips_port_grid').hide();
        Ext.getCmp('ips_detect_grid').show();

        Ext.getCmp('ips_port_search1').hide();
        Ext.getCmp('ips_port_search2').hide();
        Ext.getCmp('ips_attack_search1').hide();

        Ext.getCmp('ips_block_search1').show();
        Ext.getCmp('ips_block_search2').show();
        Ext.getCmp('ips_attack_grid').getStore().removeAll();
        // Ext.getCmp('grid_ips_top2').hide();
        // Ext.getCmp('grid_ips_top1').setText('시그너처 이름');
        // Ext.getCmp('grid_ips_top1').flex = 0.3;
        Ext.getCmp('ips_attack_grid').getView().refresh();
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_ips_top').get_attack();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_top');
        me.ips_type = "port";
        Ext.getCmp('ips_attack_grid').hide();
        Ext.getCmp('ips_port_grid').show();
        Ext.getCmp('ips_detect_grid').hide();

        Ext.getCmp('ips_block_search1').hide();
        Ext.getCmp('ips_block_search2').hide();
        Ext.getCmp('ips_attack_search1').hide();

        Ext.getCmp('ips_port_search1').show();
        Ext.getCmp('ips_port_search2').show();
        Ext.getCmp('ips_attack_grid').getStore().removeAll();
        // Ext.getCmp('grid_ips_top1').setText('프로토콜');
        // Ext.getCmp('grid_ips_top1').flex = 0.1;
        // Ext.getCmp('grid_ips_top2').show();
        Ext.getCmp('ips_attack_grid').getView().refresh();
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_ips_top').get_attack();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick10: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_top');

        me.btn_time = 5;
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_ips_top').get_attack();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick9: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_top');

        me.btn_time = 10;
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_ips_top').get_attack();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick8: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_top');

        me.btn_time = 30;
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_ips_top').get_attack();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick7: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_top');

        me.btn_time = 60;
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_ips_top').get_attack();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick6: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_top');

        me.btn_time = 300;
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_ips_top').get_attack();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick5: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_top');

        me.btn_time = 720;
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_ips_top').get_attack();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange8: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_top');

        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_ips_top').get_attack();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange7: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_top');

        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_ips_top').get_attack();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange6: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_top');

        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_ips_top').get_attack();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange5: function(menucheckitem, checked, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_top');

        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_ips_top').get_attack();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick12: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_top');

        var filter = [];

        if(Ext.getCmp('ips_type1').pressed){
            if(Ext.getCmp('ips_attack_search1').isValid() === false){ Ext.getCmp('ips_attack_search1').focus(); return false; }
            if(Ext.getCmp('ips_attack_search2').isValid() === false){ Ext.getCmp('ips_attack_search2').focus(); return false; }
            if(Ext.getCmp('ips_attack_search3').isValid() === false){ Ext.getCmp('ips_attack_search3').focus(); return false; }
            if(Ext.getCmp('ips_attack_search1').getValue() !== ""){ filter.push({ 'sip' : Ext.getCmp('ips_attack_search1').getValue()}); }
            if(Ext.getCmp('ips_attack_search1').getValue() === ""){ me.filter = {}; }
            else{ me.filter.and = filter; }
        }
        else if(Ext.getCmp('ips_type4').pressed){
            if(Ext.getCmp('ips_port_search2').isValid() === false){ Ext.getCmp('ips_port_search2').focus(); return false; }
            if(Ext.getCmp('ips_attack_search4').isValid() === false){ Ext.getCmp('ips_attack_search4').focus(); return false; }
            if(Ext.getCmp('ips_attack_search5').isValid() === false){ Ext.getCmp('ips_attack_search5').focus(); return false; }
            if(Ext.getCmp('ips_port_search1').getValue() !== null){ filter.push({ 'protocol' : Ext.getCmp('ips_port_search1').getValue()}); }
            if(Ext.getCmp('ips_port_search2').getValue() !== ""){ filter.push({ 'dport' : Ext.getCmp('ips_port_search2').getValue()}); }
            if(Ext.getCmp('ips_port_search1').getValue() === null && Ext.getCmp('ips_port_search2').getValue() === ""){ me.filter = {}; }
            else{ me.filter.and = filter; }
        }
        else{
            if(Ext.getCmp('ips_attack_search6').isValid() === false){ Ext.getCmp('ips_attack_search6').focus(); return false; }
            if(Ext.getCmp('ips_attack_search7').isValid() === false){ Ext.getCmp('ips_attack_search7').focus(); return false; }
            if(Ext.getCmp('ips_block_search1').getValue() !== null){ filter.push({ 'priority' : Ext.getCmp('ips_block_search1').getValue()}); }
            if(Ext.getCmp('ips_block_search2').getValue() !== ""){ filter.push({ 'pattern_name' : '%' + Ext.getCmp('ips_block_search2').getValue() + '%'}); }
            if(Ext.getCmp('ips_block_search1').getValue() === null && Ext.getCmp('ips_block_search2').getValue() === ""){ me.filter = {}; }
            else{ me.filter.and = filter; }
        }

        if(Ext.getCmp('chk_btn').state === true){
            me.get_attack();
        }
    },

    onButtonClick11: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_top');
        me.filter = {};

        Ext.getCmp('ips_attack_search1').reset();
        Ext.getCmp('ips_attack_search2').reset();
        Ext.getCmp('ips_attack_search3').reset();
        Ext.getCmp('ips_block_search1').reset();
        Ext.getCmp('ips_block_search2').reset();
        Ext.getCmp('ips_port_search1').reset();
        Ext.getCmp('ips_port_search2').reset();

        if(Ext.getCmp('chk_btn').state === true){
            me.get_attack();
        }
    },

    onStart_timeAfterRender: function(component, eOpts) {
        var inter = Ext.getCmp('start_time').getStore().data;

        if(inter.length > 0){
            Ext.getCmp("start_time").setValue(inter.items[0].data['value']);
        }
    },

    onUpdate_chkChange: function(field, newValue, oldValue, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_ips_top');

        var filter = [];
        if(Ext.getCmp('ips_top_type').getValue() === 'attack'){
            if(Ext.getCmp('ips_attack_search1').getValue() !== ""){ filter.push({ 'sip' : Ext.getCmp('ips_attack_search1').getValue()}); }
            if(Ext.getCmp('ips_attack_search1').getValue() === ""){ me.filter = {}; }
            else{ me.filter.and = filter; }
        }
        else if(Ext.getCmp('ips_top_type').getValue() === 'detect' || Ext.getCmp('ips_top_type').getValue() === 'block'){
            if(Ext.getCmp('ips_block_search1').getValue() !== null){ filter.push({ 'priority' : Ext.getCmp('ips_block_search1').getValue()}); }
            if(Ext.getCmp('ips_block_search2').getValue() !== ""){ filter.push({ 'pattern_name' : '%' + Ext.getCmp('ips_block_search2').getValue() + '%'}); }
            if(Ext.getCmp('ips_block_search1').getValue() === null && Ext.getCmp('ips_block_search2').getValue() === ""){ me.filter = {}; }
            else{ me.filter.and = filter; }
        }
        else{
            if(Ext.getCmp('ips_port_search1').getValue() !== null){ filter.push({ 'protocol' : Ext.getCmp('ips_port_search1').getValue()}); }
            if(Ext.getCmp('ips_port_search2').getValue() !== ""){ filter.push({ 'dport' : Ext.getCmp('ips_port_search2').getValue()}); }
            if(Ext.getCmp('ips_port_search1').getValue() === null && Ext.getCmp('ips_port_search2').getValue() === ""){ me.filter = {}; }
            else{ me.filter.and = filter; }
        }

        if(newValue){
            me.update_sec = Ext.getCmp('update_time').getValue();
            if(Ext.getCmp('ips_attack_search1').validateValue() === false){ Ext.getCmp('ips_attack_search1').focus(); return false; }
            if(Ext.getCmp('ips_attack_search2').validateValue() === false){ Ext.getCmp('ips_attack_search2').focus(); return false; }
            if(Ext.getCmp('ips_attack_search3').validateValue() === false){ Ext.getCmp('ips_attack_search3').focus(); return false; }

            var _params = {
                type : Ext.encode('all'),
                criteria : Ext.encode({}),
                time_info : Ext.encode({'time_mins':5, 'update_secs':5, 'start_ts':0})
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getMonitorIPSTOP10',
                _params,

                function(response){
                    me.src_time = response.start_ts;
                }
            );
            me.get_attack();
            if(Ext.getCmp('update_time').getValue() === 5){ me.interval = setInterval(me.get_attack, 5000); }
            if(Ext.getCmp('update_time').getValue() === 10){ me.interval = setInterval(me.get_attack, 10000); }
            if(Ext.getCmp('update_time').getValue() === 20){ me.interval = setInterval(me.get_attack, 20000); }
            if(Ext.getCmp('update_time').getValue() === 30){ me.interval = setInterval(me.get_attack, 30000); }
            if(Ext.getCmp('update_time').getValue() === 60){ me.interval = setInterval(me.get_attack, 60000); }
        }
        else{
            clearInterval(me.interval);
        }
    },

    onComboboxAfterRender: function(component, eOpts) {
        // var inter = Ext.getCmp('update_time').getStore().data;

        // if(inter.length > 0){
        //     Ext.getCmp("update_time").setValue(inter.items[1].data['time']);
        // }
    },

    onUpdate_timeChange: function(field, newValue, oldValue, eOpts) {
        // var me = Ext.getCmp('NFW2_monitor_ips_top');

        // clearInterval(me.interval);

        // if(Ext.getCmp('update_chk').getValue()){
        //     if(newValue === 5){ me.interval = setInterval(me.get_attack, 5000); }
        //     if(newValue === 10){ me.interval = setInterval(me.get_attack, 10000); }
        //     if(newValue === 20){ me.interval = setInterval(me.get_attack, 20000); }
        //     if(newValue === 30){ me.interval = setInterval(me.get_attack, 30000); }
        //     if(newValue === 60){ me.interval = setInterval(me.get_attack, 60000); }
        // }
    },

    onIps_top_typeAfterRender: function(component, eOpts) {
        var inter = Ext.getCmp('ips_top_type').getStore().data;

        if(inter.length > 0){
            Ext.getCmp("ips_top_type").setValue(inter.items[0].data['value']);
        }
    },

    onIps_top_typeChange: function(field, newValue, oldValue, eOpts) {
        // Ext.getCmp('ips_port_search1').hide();
        // Ext.getCmp('ips_port_search2').hide();
        // Ext.getCmp('ips_block_search1').hide();
        // Ext.getCmp('ips_block_search2').hide();
        // Ext.getCmp('ips_attack_search1').hide();
        // Ext.getCmp('ips_attack_grid').getStore().removeAll();
        // Ext.getCmp('grid_ips_top2').hide();
        // Ext.getCmp('grid_ips_top1').flex = 0.3;

        // if(newValue === 'port'){
        //     Ext.getCmp('ips_port_search1').show();
        //     Ext.getCmp('ips_port_search2').show();
        //     Ext.getCmp('grid_ips_top1').setText('프로토콜');
        //     Ext.getCmp('grid_ips_top1').flex = 0.1;
        //     Ext.getCmp('grid_ips_top2').show();
        // }
        // else if(newValue === 'detect' || newValue === 'block'){
        //     Ext.getCmp('ips_block_search1').show();
        //     Ext.getCmp('ips_block_search2').show();
        //     Ext.getCmp('grid_ips_top1').setText('시그너처 이름');
        // }
        // else{
        //     Ext.getCmp('ips_attack_search1').show();
        //     Ext.getCmp('grid_ips_top1').setText('공격자');
        // }
    },

    onIps_top_typeExpand: function(field, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onAttack_topnAfterRender: function(component, eOpts) {
        var inter = Ext.getCmp('attack_topn').getStore().data;

        if(inter.length > 0){
            Ext.getCmp("attack_topn").setValue(inter.items[1].data['value']);
        }
    },

    onAttack_topnSelect: function(combo, record, eOpts) {
        var me = this;

        me.get_attack();
    },

    onUpdate_timeExpand: function(field, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.getCmp('ips_attack_search1').reset();
        Ext.getCmp('ips_attack_search2').reset();
        Ext.getCmp('ips_attack_search3').reset();
        Ext.getCmp('ips_block_search1').reset();
        Ext.getCmp('ips_block_search2').reset();
        Ext.getCmp('ips_port_search1').reset();
        Ext.getCmp('ips_port_search2').reset();
        Ext.getCmp('update_chk').setValue(false);
    },

    onIps_attack_search2ErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, "ips_attack_error");
    },

    onIps_attack_search2Focus1: function(component, event, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onIps_block_search1Expand: function(field, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onIps_block_search2Focus: function(component, event, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onIps_port_search1Expand: function(field, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onIps_port_search2Focus: function(component, event, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onIps_attack_search2ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "ips_attack_error");
    },

    onIps_attack_search2Focus: function(component, event, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onIps_attack_search3ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "ips_attack_error");
    },

    onIps_attack_search3Focus: function(component, event, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onIps_attack_gridBeforeDestroy: function(component, eOpts) {
        Ext.getCmp('ips_attack_grid').getStore().removeAll();
    },

    onIps_attack_gridBeforeDestroy2: function(component, eOpts) {
        Ext.getCmp('ips_port_grid').getStore().removeAll();
    },

    onIps_attack_gridBeforeDestroy1: function(component, eOpts) {
        Ext.getCmp('ips_detect_grid').getStore().removeAll();
    },

    onNFW2_monitor_ips_attackAfterRender: function(component, eOpts) {
        var me = this;
        me.ips_type = "attack";

        me.filter = {};
        me.btn_time = 5;
        me.src_time = 0;
        me.update_sec = 10;
        this.fieldInfo = makeZenTip();
        hideLoadMask();
        // var d = new Date();
        // var year = d.getFullYear();
        // var month = d.getMonth() + 1;
        // if(String(month).length === 1){ month = String(0)+month; }
        // var day = d.getDate();
        // if(String(day).length === 1){ day = String(0)+day; }
        // var hour = d.getHours();
        // if(String(hour).length === 1){ hour = String(0)+hour; }
        // var min = d.getMinutes();
        // if(String(min).length === 1){ min = String(0)+min; }
        // var sec = d.getSeconds();
        // if(String(sec).length === 1){ sec = String(0)+sec; }

        // Ext.getCmp('date_label').setText("최종 수정 시간 : "+year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec);
    },

    onNFW2_monitor_ips_attackRender: function(component, eOpts) {
        var att_top = {
            fields:[
                {
                    name: 'src'
                },
                {
                    name: 'port'
                },
                {
                    name: 'detect',
                    type: 'float',
                    sortType: 'asInt'
                },
                {
                    name: 'block',
                    type: 'float',
                    sortType: 'asInt'
                },
                {
                    name: 'priority'
                }
            ]
        };

        Ext.getCmp('ips_attack_grid').reconfigure(att_top);
        Ext.getCmp('ips_detect_grid').reconfigure(att_top);
        Ext.getCmp('ips_port_grid').reconfigure(att_top);

    },

    onNFW2_monitor_ips_attackDestroy: function(component, eOpts) {
        var me = this;

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('ips_attack_grid').getStore().removeAll();
        Ext.getCmp('ips_detect_grid').getStore().removeAll();
        Ext.getCmp('ips_port_grid').getStore().removeAll();
    },

    get_attack: function() {
        var me = Ext.getCmp('NFW2_monitor_ips_top');
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

        Ext.getCmp('date_label').setText("최종 수정 시간 : "+year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec);

        var detect_cnt = 0;
        var block_cnt = 0;
        var top_num = Ext.getCmp('top_chk').text.split(' ');

        if(Ext.getCmp('ips_type1').pressed){
            if(Ext.getCmp('ips_attack_search2').getValue() !== ""){ detect_cnt = Ext.getCmp('ips_attack_search2').getValue(); }
            if(Ext.getCmp('ips_attack_search3').getValue() !== ""){ block_cnt = Ext.getCmp('ips_attack_search3').getValue(); }
        }
        else if(Ext.getCmp('ips_type4').pressed){
            if(Ext.getCmp('ips_attack_search6').getValue() !== ""){ detect_cnt = Ext.getCmp('ips_attack_search6').getValue(); }
            if(Ext.getCmp('ips_attack_search7').getValue() !== ""){ block_cnt = Ext.getCmp('ips_attack_search7').getValue(); }
        }
        else{
            if(Ext.getCmp('ips_attack_search4').getValue() !== ""){ detect_cnt = Ext.getCmp('ips_attack_search4').getValue(); }
            if(Ext.getCmp('ips_attack_search5').getValue() !== ""){ block_cnt = Ext.getCmp('ips_attack_search5').getValue(); }
        }


        var _params2 = {
            type : Ext.encode(me.ips_type),
            criteria : Ext.encode(me.filter),
            time_info : Ext.encode({'time_mins':me.btn_time, 'update_secs':me.update_sec, 'start_ts':me.src_time}),
            detect_cnt : Ext.encode(Number(detect_cnt)),
            block_cnt : Ext.encode(Number(block_cnt)),
            limit : Ext.encode(Number(top_num[1]))
        };

        var record1 = [];

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getMonitorIPSTOP10',
            _params2,

            function(response){
                if(response.ips_list.length === 0){ Ext.getCmp('ips_attack_error').show(); }
                else{ Ext.getCmp('ips_attack_error').hide(); }
                for(var i in response.ips_list){
                    var src;
                    if(me.ips_type === 'attack'){ src = response.ips_list[i].attacker; }
                    else if(me.ips_type === 'detect'){ src = response.ips_list[i].pattern_name; }
                    else if(me.ips_type === 'block'){ src = response.ips_list[i].pattern_name; }
                    else{ src = response.ips_list[i].protocol; }

                    record1.push({
                        'src' : src,
                        'port' : response.ips_list[i].dport,
                        'detect' : Number(response.ips_list[i].detect),
                        'block' : Number(response.ips_list[i].block),
                        'priority' : response.ips_list[i].priority
                    });
                }

                Ext.getCmp('ips_attack_grid').getStore().loadData(record1);
                Ext.getCmp('ips_detect_grid').getStore().loadData(record1);
                Ext.getCmp('ips_port_grid').getStore().loadData(record1);
            }
        );

        if(me.update_sec < Number(me.btn_time*60)){
            me.update_sec += Number(time[0]);
        }

    }

});