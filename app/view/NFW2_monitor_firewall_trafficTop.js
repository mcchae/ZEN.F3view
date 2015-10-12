
Ext.define('NFW2.view.NFW2_monitor_firewall_trafficTop', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_firewall_traffictop',

    requires: [
        'NFW2.view.NFW2_monitor_firewall_trafficTopViewModel',
        'Ext.form.Panel',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.form.Label',
        'Ext.button.Segmented',
        'Ext.form.field.Radio',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.view.Table'
    ],

    viewModel: {
        type: 'nfw2_monitor_firewall_traffictop'
    },
    cls: 'zen_body',
    id: 'NFW2_monitor_firewall_trafficTop',
    width: 900,
    defaultListenerScope: true,

    listeners: {
        beforedestroy: 'onNFW2_monitor_firewall_policy10Destroy',
        afterrender: 'onNFW2_monitor_firewall_policy10AfterRender',
        render: 'onNFW2_monitor_firewall_policy10Render'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        id: 'fm',
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
                                            var me = Ext.getCmp('NFW2_monitor_firewall_trafficTop');

                                            me.get_policy();
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
                                        id: 'traffic_data_error',
                                        bind: {
                                            text: '{nodata_monitor_traffictop}'
                                        }
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
                                                enableToggle: true,
                                                pressed: true,
                                                bind: {
                                                    text: '{policy}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick'
                                                }
                                            },
                                            {
                                                bind: {
                                                    text: '{follow}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick1'
                                                }
                                            },
                                            {
                                                bind: {
                                                    text: '{service}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick2'
                                                }
                                            },
                                            {
                                                bind: {
                                                    text: '{src}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick3'
                                                }
                                            },
                                            {
                                                bind: {
                                                    text: '{dest}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick4'
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
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange8'
                                                    }
                                                },
                                                {
                                                    xtype: 'menucheckitem',
                                                    text: '20',
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange7'
                                                    }
                                                },
                                                {
                                                    xtype: 'menucheckitem',
                                                    text: '50',
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange6'
                                                    }
                                                },
                                                {
                                                    xtype: 'menucheckitem',
                                                    text: '100',
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange5'
                                                    }
                                                }
                                            ]
                                        }
                                    })
                                ]
                            },
                            {
                                xtype: 'container',
                                hidden: true,
                                margin: '8 0 0 0 ',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        flex: 0.7,
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
                                        flex: 0.3,
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch',
                                            pack: 'end'
                                        },
                                        items: [
                                            {
                                                xtype: 'radiofield',
                                                hidden: true,
                                                id: 't_ipv4',
                                                boxLabel: 'IPv4',
                                                checked: true,
                                                listeners: {
                                                    focus: 'onT_ipv4Focus'
                                                }
                                            },
                                            {
                                                xtype: 'radiofield',
                                                hidden: true,
                                                id: 't_ipv6',
                                                boxLabel: 'IPv6',
                                                listeners: {
                                                    focus: 'onT_ipv6Focus'
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
                                hidden: true,
                                margin: '8 0 0 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch',
                                    pack: 'end'
                                },
                                items: [
                                    {
                                        xtype: 'combobox',
                                        id: 'monitor_firewall_topn_type',
                                        width: 200,
                                        fieldLabel: '항목',
                                        labelSeparator: ' ',
                                        labelWidth: 80,
                                        editable: false,
                                        displayField: 'name',
                                        queryMode: 'local',
                                        store: {
                                            data: [
                                                {
                                                    name: '정책',
                                                    value: 'policy'
                                                },
                                                {
                                                    name: '플로우',
                                                    value: 'flow'
                                                },
                                                {
                                                    name: '서비스',
                                                    value: 'service'
                                                },
                                                {
                                                    name: '출발지',
                                                    value: 'source'
                                                },
                                                {
                                                    name: '목적지',
                                                    value: 'destination'
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
                                            afterrender: 'onMonitor_firewall_topn_typeAfterRender',
                                            change: 'onMonitor_firewall_topn_typeChange'
                                        }
                                    },
                                    {
                                        xtype: 'combobox',
                                        id: 'policy_topn',
                                        margin: '0 0 0 5',
                                        width: 195,
                                        fieldLabel: 'Top',
                                        labelSeparator: ' ',
                                        labelWidth: 80,
                                        editable: false,
                                        displayField: 'name',
                                        queryMode: 'local',
                                        store: 'store_monitor_policy_topn',
                                        valueField: 'value',
                                        listeners: {
                                            afterrender: 'onPolicy_topnAfterRender',
                                            expand: 'onPolicy_topnExpand'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                margin: '8 0 10 0',
                                items: [
                                    {
                                        xtype: 'gridpanel',
                                        id: 'grid_policy',
                                        header: false,
                                        title: 'My Grid Panel',
                                        columns: [
                                            {
                                                xtype: 'rownumberer',
                                                width: 70,
                                                align: 'center',
                                                dataIndex: '@num',
                                                text: 'N'
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                id: 'grid_policy_col1',
                                                sortable: false,
                                                align: 'center',
                                                dataIndex: 'id',
                                                menuDisabled: true,
                                                flex: 1,
                                                bind: {
                                                    text: '{rule_id}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                hidden: true,
                                                id: 'grid_policy_col2',
                                                sortable: false,
                                                align: 'center',
                                                dataIndex: 'content',
                                                menuDisabled: true,
                                                flex: 1,
                                                bind: {
                                                    text: '{dest}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return byteConvert(value);
                                                },
                                                align: 'center',
                                                dataIndex: 'bps',
                                                menuDisabled: true,
                                                flex: 0.7,
                                                bind: {
                                                    text: '{bps}'
                                                },
                                                listeners: {
                                                    headerclick: 'onGridcolumnHeaderClick'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return byteConvert(value);
                                                },
                                                align: 'center',
                                                dataIndex: 'pps',
                                                menuDisabled: true,
                                                flex: 0.7,
                                                bind: {
                                                    text: '{pps}'
                                                }
                                            }
                                        ],
                                        listeners: {
                                            beforedestroy: 'onGrid_policyBeforeDestroy'
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
        var me = Ext.getCmp('NFW2_monitor_firewall_trafficTop');
        var time = Ext.getCmp('update_time').text.split(' ');

        if(button.state === true){
            me.get_policy();
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

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_trafficTop');
        me.btn_type = "policy";
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_firewall_trafficTop').get_policy();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
        Ext.getCmp('grid_policy').getStore().removeAll();
        Ext.getCmp('grid_policy_col2').hide();
        Ext.getCmp('grid_policy_col1').setText(__zen('rule_id'));
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_trafficTop');
        me.btn_type = "flow";
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_firewall_trafficTop').get_policy();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
        Ext.getCmp('grid_policy').getStore().removeAll();
        Ext.getCmp('grid_policy_col1').setText(__zen('src'));
        Ext.getCmp('grid_policy_col2').show();

    },

    onButtonClick2: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_trafficTop');
        me.btn_type = "service";
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_firewall_trafficTop').get_policy();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
        Ext.getCmp('grid_policy').getStore().removeAll();
        Ext.getCmp('grid_policy_col2').hide();
        Ext.getCmp('grid_policy_col1').setText(__zen('service'));
    },

    onButtonClick3: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_trafficTop');
        me.btn_type = "source";
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_firewall_trafficTop').get_policy();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
        Ext.getCmp('grid_policy').getStore().removeAll();
        Ext.getCmp('grid_policy_col2').hide();
        Ext.getCmp('grid_policy_col1').setText(__zen('src'));
    },

    onButtonClick4: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_trafficTop');
        me.btn_type = "destination";
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_firewall_trafficTop').get_policy();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
        Ext.getCmp('grid_policy').getStore().removeAll();
        Ext.getCmp('grid_policy_col2').hide();
        Ext.getCmp('grid_policy_col1').setText(__zen('dest'));
    },

    onMenucheckitemCheckChange8: function(menucheckitem, checked, eOpts) {
        var me = this;

        // var time = Ext.getCmp('update_time').text.split(' ');
        // Ext.getCmp('timeout').setHtml(Number(time[0]));

        me.btn_top = 10;
        // clearInterval(Ext.getCmp('timeout').interval);
        // me.get_policy();
        // if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange7: function(menucheckitem, checked, eOpts) {
        var me = this;

        // var time = Ext.getCmp('update_time').text.split(' ');
        // Ext.getCmp('timeout').setHtml(Number(time[0]));

        me.btn_top = 20;
        // clearInterval(Ext.getCmp('timeout').interval);
        // me.get_policy();
        // if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange6: function(menucheckitem, checked, eOpts) {
        var me = this;

        // var time = Ext.getCmp('update_time').text.split(' ');
        // Ext.getCmp('timeout').setHtml(Number(time[0]));

        me.btn_top = 50;
        // clearInterval(Ext.getCmp('timeout').interval);
        // me.get_policy();
        // if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange5: function(menucheckitem, checked, eOpts) {
        var me = this;

        // var time = Ext.getCmp('update_time').text.split(' ');
        // Ext.getCmp('timeout').setHtml(Number(time[0]));

        me.btn_top = 100;
        // clearInterval(Ext.getCmp('timeout').interval);
        // me.get_policy();
        // if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onT_ipv4Focus: function(component, event, eOpts) {
        var me = this;

        me.get_destination();
    },

    onT_ipv6Focus: function(component, event, eOpts) {
        var me = this;

        me.get_destination();
    },

    onUpdate_chkChange: function(field, newValue, oldValue, eOpts) {
        /*var me = Ext.getCmp('NFW2_monitor_firewall_policy10');

        if(newValue){
            Ext.getCmp('update_time').enable();
            if(Ext.getCmp('update_time').getValue() === "1"){ me.interval = setInterval(me.get_policy, 1000); }
            if(Ext.getCmp('update_time').getValue() === "2"){ me.interval = setInterval(me.get_policy, 2000); }
            if(Ext.getCmp('update_time').getValue() === "5"){ me.interval = setInterval(me.get_policy, 5000); }
            if(Ext.getCmp('update_time').getValue() === "10"){ me.interval = setInterval(me.get_policy, 10000); }
        }
        else{
            Ext.getCmp('update_time').disable();
            clearInterval(me.interval);
        }*/


        var me = Ext.getCmp('NFW2_monitor_firewall_trafficTop');

        if(newValue){
            me.get_policy();

        //     var _params = {
        //         filename: Ext.encode('/proc/ferret/monitor/fw/top_policy_flag'),
        //         content: Ext.encode({'on':1})
        //     };

        //     request_helper.xmlrpc_call_JsonP(
        //         'ftuctrl',
        //         'setFileContent',
        //         _params,
        //         function(response){

                    if(Ext.getCmp('update_time').getValue() === "5"){ me.interval = setInterval(me.get_policy, 5000); }
                    if(Ext.getCmp('update_time').getValue() === "10"){ me.interval = setInterval(me.get_policy, 10000); }
                    if(Ext.getCmp('update_time').getValue() === "20"){ me.interval = setInterval(me.get_policy, 20000); }
                    if(Ext.getCmp('update_time').getValue() === "30"){ me.interval = setInterval(me.get_policy, 30000); }
                    if(Ext.getCmp('update_time').getValue() === "60"){ me.interval = setInterval(me.get_policy, 60000); }

        //         }
        //     );
        }
        else{
            clearInterval(me.interval);

        //     var _params = {
        //         filename: Ext.encode('/proc/ferret/monitor/fw/top_policy_flag'),
        //         content: Ext.encode({'on':0})
        //     };

        //     request_helper.xmlrpc_call_JsonP(
        //         'ftuctrl',
        //         'setFileContent',
        //         _params,
        //         function(response){

        //         }
        //     );
        }
    },

    onUpdate_timeAfterRender: function(component, eOpts) {
        // var inter = Ext.getCmp('update_time').getStore().data;

        // if(inter.length > 0){
        //     Ext.getCmp("update_time").setValue(inter.items[1].data['time']);
        // }
    },

    onUpdate_timeChange: function(field, newValue, oldValue, eOpts) {
        // var me = Ext.getCmp('NFW2_monitor_firewall_trafficTop');

        // clearInterval(me.interval);

        // if(Ext.getCmp('update_chk').getValue()){
        //     if(newValue === "5"){ me.interval = setInterval(me.get_policy, 5000); }
        //     if(newValue === "10"){ me.interval = setInterval(me.get_policy, 10000); }
        //     if(newValue === "20"){ me.interval = setInterval(me.get_policy, 20000); }
        //     if(newValue === "30"){ me.interval = setInterval(me.get_policy, 30000); }
        //     if(newValue === "60"){ me.interval = setInterval(me.get_policy, 60000); }
        // }
    },

    onMonitor_firewall_topn_typeAfterRender: function(component, eOpts) {
        var inter = Ext.getCmp('monitor_firewall_topn_type').getStore().data;

        if(inter.length > 0){
            Ext.getCmp("monitor_firewall_topn_type").setValue(inter.items[0].data['value']);
        }
    },

    onMonitor_firewall_topn_typeChange: function(field, newValue, oldValue, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
        Ext.getCmp('grid_policy').getStore().removeAll();
        Ext.getCmp('grid_policy_col2').hide();

        if(Ext.getCmp('monitor_firewall_topn_type').getValue() === "policy"){
            Ext.getCmp('grid_policy_col1').setText('정책 ID');
        }
        else if(Ext.getCmp('monitor_firewall_topn_type').getValue() === "flow"){
            Ext.getCmp('grid_policy_col1').setText('출발지');
            Ext.getCmp('grid_policy_col2').show();
        }
        else if(Ext.getCmp('monitor_firewall_topn_type').getValue() === "service"){
            Ext.getCmp('grid_policy_col1').setText('서비스');
        }
        else if(Ext.getCmp('monitor_firewall_topn_type').getValue() === "source"){
            Ext.getCmp('grid_policy_col1').setText('출발지');
        }
        else{
            Ext.getCmp('grid_policy_col1').setText('목적지');
        }
    },

    onPolicy_topnAfterRender: function(component, eOpts) {
        var inter = Ext.getCmp('policy_topn').getStore().data;

        if(inter.length > 0){
            Ext.getCmp("policy_topn").setValue(inter.items[0].data['name']);
        }
    },

    onPolicy_topnExpand: function(field, eOpts) {
        Ext.getCmp('update_chk').setValue(false);
    },

    onGridcolumnHeaderClick: function(ct, column, e, t, eOpts) {
        console.log(Ext.getCmp("grid_policy").getStore().data.items);
    },

    onGrid_policyBeforeDestroy: function(component, eOpts) {
        Ext.getCmp('grid_policy').getStore().removeAll();
    },

    onNFW2_monitor_firewall_policy10Destroy: function(component, eOpts) {
        var me = this;
        Ext.getCmp('grid_policy').getStore().removeAll();
        clearInterval(Ext.getCmp('timeout').interval);

        // var _params = {
        //     filename: Ext.encode('/proc/ferret/monitor/fw/top_policy_flag'),
        //     content: Ext.encode({'on':0})
        // };

        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'setFileContent',
        //     _params,
        //     function(response){

        //     }
        // );
    },

    onNFW2_monitor_firewall_policy10AfterRender: function(component, eOpts) {
        var me = this;
        me.ver = 4;
        me.count = 10;
        me.btn_type = "policy";
        me.btn_top = 10;

        // var _params = {
        //     basename : Ext.encode('monitor_basic')
        // };

        // request_helper.xmlrpc_call_JsonP(

        //     'ftuctrl',
        //     'getObject',
        //     _params,

        //     function(response){
        //         if(response.mon.setting.chk_pnum === "off"){
        //             Ext.getCmp('monitor_img').show();
        //             Ext.getCmp('fm').hide();
        //         }
        //         else{
        //             me.get_policy();
        //         }
        //     }
        // );
        hideLoadMask();
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

        // Ext.getCmp('date_label').setText("최종 수정 시간 : "+year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec);
    },

    onNFW2_monitor_firewall_policy10Render: function(component, eOpts) {
        var att_top = {
            fields:[
                {
                    name: '@num'
                },
                {
                    name: 'id'
                },
                {
                    name: 'content'
                },
                {
                    name: 'bps'
                },
                {
                    name: 'pps'
                }
            ]
        };

        Ext.getCmp('grid_policy').reconfigure(att_top);

    },

    get_policy: function() {
        var me = this;
        // if(Ext.getCmp('t_ipv4').getValue() === true){ me.ver = 4; }
        // else if(Ext.getCmp('t_ipv6').getValue() === true){ me.ver = 6; }
        var top_type = me.btn_type;

        var top_num = me.btn_top;
        // if(Ext.getCmp('policy_topn').getValue() === "10"){ me.count = 10; }
        // else if(Ext.getCmp('policy_topn').getValue() === "20"){ me.count = 20; }
        // else if(Ext.getCmp('policy_topn').getValue() === "50"){ me.count = 50; }
        // else if(Ext.getCmp('policy_topn').getValue() === "100"){ me.count = 100; }
        if(top_type === undefined){ top_type = "policy"; }

        var _params = {
            func_name : Ext.encode('mod_monitor_fw_top_info'),
            args : Ext.encode({'ver':4, 'top_type':[top_type], 'count':Number(top_num)})
        };

        request_helper.xmlrpc_call_JsonP(

            'ftuctrl',
            'execKctrlFunc',
            _params,

            function(response){                
                if(response !== undefined){
                hideLoadMask();
                var records = [];                
                    //var data = response[1].split('\n');
                    if(top_type === "flow"){
                        if(response.length === 0){ Ext.getCmp('traffic_data_error').show(); }
                        else{ Ext.getCmp('traffic_data_error').hide(); }
                        for(var k in response){
                            records.push({
                                "@num" : k,
                                "id" : response[k].v1,
                                "content" : response[k].v2,
                                "bps" : response[k].bps,
                                "pps" : response[k].pps
                            });
                        }
                    }
                    else{
                        if(response.length === 0){ Ext.getCmp('traffic_data_error').show(); }
                        else{ Ext.getCmp('traffic_data_error').hide(); }
                        for(var i in response){
                            records.push({
                                "@num" : i,
                                "id" : response[i].v1,
                                "bps" : response[i].bps,
                                "pps" : response[i].pps
                            });
                        }
                    }

                    var store = Ext.getCmp('grid_policy').getStore();
                    store.loadData(records);
                }
            }
        );
    }

});