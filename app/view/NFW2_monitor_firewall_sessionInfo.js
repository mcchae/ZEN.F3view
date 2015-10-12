
Ext.define('NFW2.view.NFW2_monitor_firewall_sessionInfo', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_firewall_sessioninfo',

    requires: [
        'NFW2.view.NFW2_monitor_firewall_sessionInfoViewModel',
        'Ext.form.Panel',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.form.Label',
        'Ext.button.Segmented',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'nfw2_monitor_firewall_sessioninfo'
    },
    cls: 'zen_body',
    id: 'NFW2_monitor_firewall_sessionInfo',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender',
        beforedestroy: 'onPanelDestroy'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
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
                                            var me = Ext.getCmp('NFW2_monitor_firewall_sessionInfo');

                                            me.get_monitor_sessioninfo();
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
                                        width: 80,
                                        showText: true,
                                        menu: {
                                            xtype: 'menu',
                                            width: 120,
                                            items: [
                                                me.processMyCheckItem({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange3'
                                                    }
                                                }),
                                                me.processMyCheckItem1({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    checked: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange2'
                                                    }
                                                }),
                                                me.processMyCheckItem2({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange1'
                                                    }
                                                }),
                                                me.processMyCheckItem3({
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
                                        id: 'session_data_error',
                                        bind: {
                                            text: '{session_msg1}'
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
                                                text: 'IPv4',
                                                listeners: {
                                                    click: 'onButtonClick4'
                                                }
                                            },
                                            {
                                                text: 'IPv6',
                                                listeners: {
                                                    click: 'onButtonClick3'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'btn_b',
                                        margin: '0 0 0 10',
                                        iconCls: 'icb_del',
                                        bind: {
                                            text: '{del}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick1'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'btn_b',
                                        margin: '0 0 0 10',
                                        iconCls: 'icb_del',
                                        bind: {
                                            text: '{all_del}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick2'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'btn_b',
                                        margin: '0 0 0 10',
                                        iconCls: 'icb_filter',
                                        bind: {
                                            text: '{filter_apply}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick5'
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
                                xtype: 'container',
                                margin: '8 0 0 0'
                            },
                            {
                                xtype: 'gridpanel',
                                id: 'grid_list',
                                margin: '8 0 10 0',
                                columnLines: true,
                                enableColumnHide: false,
                                sortableColumns: false,
                                store: 'store_monitor_sessionInfo',
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:left';

                                            return Ext.Date.format(new Date(value*1000), 'Y-m-d H:i:s');
                                        },
                                        style: 'padding-bottom:29;',
                                        align: 'center',
                                        dataIndex: 'init',
                                        tdCls: 'td_mid',
                                        flex: 1,
                                        bind: {
                                            text: '{generate_time}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right';

                                            var val = value['@uid'];

                                            val += (record.data.nat['@uid'])?'/'+record.data.nat['@uid']:'';

                                            return val;
                                        },
                                        style: 'padding-bottom:29;',
                                        width: 120,
                                        align: 'center',
                                        dataIndex: 'fw',
                                        bind: {
                                            text: '{policy_nat_id}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var val = value.split(" ");

                                            return val.join("<br>");
                                        },
                                        align: 'center',
                                        tdCls: 'td_mid',
                                        flex: 1,
                                        bind: {
                                            text: '{src}'
                                        },
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left';

                                                    var val = value.split("<br>");
                                                    var result = [];
                                                    for(var i in val){
                                                        var temp = val[i].split("(");
                                                        result.push(temp[0]);
                                                    }

                                                    if(val[1] === undefined){ return result; }
                                                    else{ return result.join("<br>"); }
                                                },
                                                items: {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            emptyText: __zen('src'),
                                                            flex: 1,
                                                            maskRe: /[0-9.]/,
                                                            id: 'sip',
                                                            margin: '0 1 0 -9',
                                                            listeners: {
                                                                focus: function(component, event, eOpts){
                                                            var str = disp_help_ip('4s');
                                                            component.fieldInfo = str;
                                                            setTipFocus(Ext.getCmp('NFW2_monitor_firewall_sessionInfo'), component);
                                                            },
                                                                blur: function(component, event, eOpts){
                                                            setTipBlur(Ext.getCmp('NFW2_monitor_firewall_sessionInfo'), component);
                                                            }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            emptyText: __zen('xsrc'),
                                                            flex: 1,
                                                            maskRe: /[0-9.]/,
                                                            id: 'xsip',
                                                            margin: '0 1 0 -9',
                                                            listeners: {
                                                                focus: function(component, event, eOpts){
                                                            var str = disp_help_ip('4s');
                                                            component.fieldInfo = str;
                                                            setTipFocus(Ext.getCmp('NFW2_monitor_firewall_sessionInfo'), component);
                                                            },
                                                                blur: function(component, event, eOpts){
                                                            setTipBlur(Ext.getCmp('NFW2_monitor_firewall_sessionInfo'), component);
                                                            }
                                                            }
                                                        }
                                                    ]
                                                },
                                                width: 225,
                                                align: 'center',
                                                dataIndex: 'src',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{src_ip}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left';

                                                    var val = value.split("<br>");
                                                    var result = [];
                                                    for(var i in val){
                                                        var temp = val[i].split("(");
                                                        if(temp[1]){
                                                            var temp2 = temp[1].split(")");
                                                            result.push(temp2[0]);
                                                        }
                                                    }

                                                    if(val[1] === undefined){ return result; }
                                                    else{
                                                        if(result[0] === result[1]){
                                                            return result[0];
                                                        }
                                                        return result.join("<br>");
                                                    }
                                                },
                                                items: {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            emptyText: __zen('port'),
                                                            flex: 0.8,
                                                            id: 'sport',
                                                            maskRe: /[0-9]/,
                                                            enforceMaxLength: true,
                                                            maxLength: 5,
                                                            fieldInfo: __zen('input_range')+'1 ~ 65535',
                                                            margin: '0 1 0 -9',
                                                            listeners: {
                                                                focus: function(component, event, eOpts){
                                                            setTipFocus(Ext.getCmp('NFW2_monitor_firewall_sessionInfo'), component);
                                                            },
                                                                blur: function(component, event, eOpts){
                                                            setTipBlur(Ext.getCmp('NFW2_monitor_firewall_sessionInfo'), component);
                                                            }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            emptyText: __zen('xport'),
                                                            flex: 1,
                                                            id: 'xsport',
                                                            maskRe: /[0-9]/,
                                                            enforceMaxLength: true,
                                                            maxLength: 5,
                                                            fieldInfo: __zen('input_range')+'1 ~ 65535',
                                                            margin: '0 1 0 -9',
                                                            listeners: {
                                                                focus: function(component, event, eOpts){
                                                            setTipFocus(Ext.getCmp('NFW2_monitor_firewall_sessionInfo'), component);
                                                            },
                                                                blur: function(component, event, eOpts){
                                                            setTipBlur(Ext.getCmp('NFW2_monitor_firewall_sessionInfo'), component);
                                                            }
                                                            }
                                                        }
                                                    ]
                                                },
                                                width: 130,
                                                align: 'center',
                                                dataIndex: 'src',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{src_port}'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        tdCls: 'td_mid',
                                        flex: 1,
                                        bind: {
                                            text: '{dest}'
                                        },
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left';

                                                    var val = value.split("<br>");
                                                    var result = [];

                                                    for(var i in val){
                                                        var temp = val[i].split("(");
                                                        result.push(temp[0]);
                                                    }

                                                    if(val[1] === undefined){ return result; }
                                                    else{ return result.join("<br>"); }
                                                },
                                                items: {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            emptyText: __zen('dest'),
                                                            flex: 1,
                                                            id: 'dip',
                                                            maskRe: /[0-9.]/,
                                                            margin: '0 1 0 -9',
                                                            listeners: {
                                                                focus: function(component, event, eOpts){
                                                            var str = disp_help_ip('4s');
                                                            component.fieldInfo = str;
                                                            setTipFocus(Ext.getCmp('NFW2_monitor_firewall_sessionInfo'), component);
                                                            },
                                                                blur: function(component, event, eOpts){
                                                            setTipBlur(Ext.getCmp('NFW2_monitor_firewall_sessionInfo'), component);
                                                            }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            emptyText: __zen('xdest'),
                                                            flex: 1,
                                                            id: 'xdip',
                                                            maskRe: /[0-9.]/,
                                                            margin: '0 1 0 -9',
                                                            listeners: {
                                                                focus: function(component, event, eOpts){
                                                            var str = disp_help_ip('4s');
                                                            component.fieldInfo = str;
                                                            setTipFocus(Ext.getCmp('NFW2_monitor_firewall_sessionInfo'), component);
                                                            },
                                                                blur: function(component, event, eOpts){
                                                            setTipBlur(Ext.getCmp('NFW2_monitor_firewall_sessionInfo'), component);
                                                            }
                                                            }
                                                        }
                                                    ]
                                                },
                                                width: 225,
                                                align: 'center',
                                                dataIndex: 'dest',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{dest_ip}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left';

                                                    var val = value.split("<br>");
                                                    var result = [];
                                                    for(var i in val){
                                                        var temp = val[i].split("(");
                                                        if(temp[1]){
                                                            var temp2 = temp[1].split(")");
                                                            result.push(temp2[0]);
                                                        }
                                                    }

                                                    if(val[1] === undefined){ return result; }
                                                    else{
                                                        if(result[0] === result[1]){
                                                            return result[0];
                                                        }
                                                        return result.join("<br>");
                                                    }
                                                },
                                                items: {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            emptyText: __zen('port'),
                                                            flex: 0.8,
                                                            id: 'dport',
                                                            maskRe: /[0-9]/,
                                                            enforceMaxLength: true,
                                                            maxLength: 5,
                                                            fieldInfo: __zen('input_range')+'1 ~ 65535',
                                                            margin: '0 1 0 -9',
                                                            listeners: {
                                                                focus: function(component, event, eOpts){
                                                            setTipFocus(Ext.getCmp('NFW2_monitor_firewall_sessionInfo'), component);
                                                            },
                                                                blur: function(component, event, eOpts){
                                                            setTipBlur(Ext.getCmp('NFW2_monitor_firewall_sessionInfo'), component);
                                                            }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            emptyText: __zen('xport'),
                                                            flex: 1,
                                                            id: 'xdport',
                                                            maskRe: /[0-9]/,
                                                            enforceMaxLength: true,
                                                            maxLength: 5,
                                                            fieldInfo: __zen('input_range')+'1 ~ 65535',
                                                            margin: '0 1 0 -9',
                                                            listeners: {
                                                                focus: function(component, event, eOpts){
                                                            setTipFocus(Ext.getCmp('NFW2_monitor_firewall_sessionInfo'), component);
                                                            },
                                                                blur: function(component, event, eOpts){
                                                            setTipBlur(Ext.getCmp('NFW2_monitor_firewall_sessionInfo'), component);
                                                            }
                                                            }
                                                        }
                                                    ]
                                                },
                                                width: 130,
                                                align: 'center',
                                                dataIndex: 'dest',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                bind: {
                                                    text: '{dest_port}'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:left';

                                            return value;
                                        },
                                        items: {
                                            xtype: 'combobox',
                                            flex: 1,
                                            id: 'service',
                                            editable: false,
                                            margin: '16 1 0 -9',
                                            displayField: 'name',
                                            valueField: 'name',
                                            queryMode: 'local',
                                            store: 'store_monitor_sinfo_service',
                                            value: 'ALL'
                                        },
                                        minHeight: 80,
                                        style: 'padding-top:13;',
                                        width: 85,
                                        align: 'center',
                                        dataIndex: 'protocol',
                                        tdCls: 'td_mid',
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
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:left';

                                            return time_render(value);
                                        },
                                        style: 'padding-bottom:29;',
                                        align: 'center',
                                        dataIndex: 'timeout',
                                        tdCls: 'td_mid',
                                        flex: 1,
                                        bind: {
                                            text: '{timeout}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:left';

                                            return commify(value.tx)+'/'+commify(value.rx);
                                        },
                                        style: 'padding-bottom:29;',
                                        align: 'center',
                                        dataIndex: 'packets',
                                        tdCls: 'td_mid',
                                        flex: 1,
                                        bind: {
                                            text: '{packet_count}(TX/RX)'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:left';

                                            return byteConvert(value.tx)+'/'+byteConvert(value.rx);
                                        },
                                        style: 'padding-bottom:29;',
                                        align: 'center',
                                        dataIndex: 'bytes',
                                        tdCls: 'td_mid',
                                        flex: 1,
                                        bind: {
                                            text: '{usage}(TX/RX)'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:left';

                                            return value;
                                        },
                                        style: 'padding-bottom:29;',
                                        align: 'center',
                                        dataIndex: 'status',
                                        tdCls: 'td_mid',
                                        flex: 1,
                                        bind: {
                                            text: '{status}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:left';

                                            return value;
                                        },
                                        style: 'padding-bottom:29;',
                                        align: 'center',
                                        dataIndex: 'info',
                                        tdCls: 'td_mid',
                                        flex: 1,
                                        bind: {
                                            text: '{info}'
                                        }
                                    }
                                ],
                                selModel: Ext.create('Ext.selection.CheckboxModel', {
                                    selType: 'checkboxmodel'
                                }),
                                dockedItems: [
                                    {
                                        xtype: 'pagingtoolbar',
                                        doRefresh: function() {
                                            var me = this,
                                                current = 1;

                                            if (me.fireEvent('beforechange', me, current) !== false) {
                                                me.store.currentPage = current;
                                                me.store.load(function(response){
                                                    console.log(response);
                                                });
                                            }
                                        },
                                        dock: 'bottom',
                                        width: 360,
                                        displayInfo: true,
                                        store: 'store_monitor_sessionInfo',
                                        listeners: {
                                            beforechange: 'onPagingtoolbarBeforeChange'
                                        }
                                    }
                                ],
                                listeners: {
                                    cellclick: 'onGrid_listCellClick',
                                    headerclick: 'onGrid_listHeaderClick'
                                }
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
        config.text = '5 '+__zen('sec');

        return config;
    },

    processMyCheckItem1: function(config) {
        config.text = '10 '+__zen('sec');

        return config;
    },

    processMyCheckItem2: function(config) {
        config.text = '30 '+__zen('sec');

        return config;
    },

    processMyCheckItem3: function(config) {
        return config;
    },

    onChk_btnChange: function(button) {
        var timeout = Ext.getCmp('timeout');
        var me = Ext.getCmp('NFW2_monitor_firewall_sessionInfo');
        var time = Ext.getCmp('update_time').text.split(' ');

        if(button.state === true){
            me.get_monitor_sessioninfo();
            monitor_timeout();
        }
        else{
            clearInterval(timeout.interval);
            Ext.getCmp('timeout').setHtml(Number(time[0]));
        }
    },

    onMenucheckitemCheckChange3: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(5);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange2: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(10);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange1: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(30);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(60);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick4: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_sessionInfo');
        me.btn_type = "ipv4";
        // me.get_monitor_sessioninfo();
        Ext.data.StoreManager.lookup("store_monitor_sessionInfo").removeAll();
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_firewall_sessionInfo').get_monitor_sessioninfo();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick3: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_sessionInfo');
        me.btn_type = "ipv6";

        // me.get_monitor_sessioninfo();
        Ext.data.StoreManager.lookup("store_monitor_sessionInfo").removeAll();
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('NFW2_monitor_firewall_sessionInfo').get_monitor_sessioninfo();
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var grid = Ext.getCmp("grid_list");
        var grid_chk = grid.getSelectionModel().getSelection();

        var list = [];

        if(grid_chk.length === 0){
            Ext.Msg.alert(__weguardia,get_msg('sel_del'));
            return false;
        }else{

            Ext.MessageBox.confirm(__weguardia,get_msg("conf_del"),function(btn){
                if(btn === "yes"){

                    clearTimeout(me.timer);
                    me.timer = 0;

                    for(var i=0; i<grid_chk.length; i++){

                        var protocol_num = grid_chk[i].data.protocol.split("(");
                        protocol_num = protocol_num[1].split(")");
                        protocol_num = protocol_num[0];

                        var a_src = grid_chk[i].data.src.split("(");
                        var src = a_src[0];
                        var sport = a_src[1].split(")");
                        sport = sport[0];

                        var a_dest = grid_chk[i].data.dest.split("(");
                        var dest = a_dest[0];
                        var dport = a_dest[1].split(")");
                        dport = dport[0];

                        list.push({
                            'protocol_num':protocol_num,
                            'src':src,
                            'dst':dest,
                            'sport':sport,
                            'dport':dport
                        });
                    }

                    var obj = {
                        'family_proto': me.btn_type,
                        'del_sesslist': list
                    };

                    var _params = {
                        func_name: Ext.encode('drop_session_list'),
                        args: Ext.encode(obj)
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'execKctrlFunc',
                        _params,
                        function(response){
                            me.get_monitor_sessioninfo();
                        }
                    );

                }
            });
        }

    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;

        var store = Ext.data.StoreManager.lookup("store_monitor_sessionInfo");
        if(store.data.length === 0){ return false; }

        clearTimeout(me.timer);
        me.timer = 0;

        Ext.MessageBox.confirm(__weguardia,get_msg("conf_del_all"),function(btn){
            if(btn === "yes"){

                var obj = {
                    'family_proto': me.btn_type,
                    'del_sesslist': []
                };

                var _params = {
                    func_name: Ext.encode('drop_session_list'),
                    args: Ext.encode(obj)
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'execKctrlFunc',
                    _params,
                    function(response){

                        me.get_monitor_sessioninfo();
                    }
                );
            }
        });
    },

    onButtonClick5: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_sessionInfo');

        me.btn_filter = true;
        if(Ext.getCmp('chk_btn').state === true){
            me.get_monitor_sessioninfo();
        }
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_firewall_sessionInfo');

        me.btn_filter = false;

        Ext.getCmp('sip').reset();
        Ext.getCmp('dip').reset();
        Ext.getCmp('sport').reset();
        Ext.getCmp('dport').reset();
        Ext.getCmp('xsip').reset();
        Ext.getCmp('xsport').reset();
        Ext.getCmp('xdip').reset();
        Ext.getCmp('xdport').reset();
        Ext.getCmp('service').reset();

        if(Ext.getCmp('chk_btn').state === true){
            me.get_monitor_sessioninfo();
        }
    },

    onPagingtoolbarBeforeChange: function(pagingtoolbar, page, eOpts) {
        this.get_monitor_sessioninfo(page);

        return false;
    },

    onGrid_listCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0){
            if(Ext.getCmp('chk_btn').state === true){
                Ext.getCmp("chk_btn").toggle();
            }
        }
    },

    onGrid_listHeaderClick: function(ct, column, e, t, eOpts) {
        if(column.text === "&#160;"){
            if(Ext.getCmp('chk_btn').state === true){
                Ext.getCmp("chk_btn").toggle();
            }
        }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        this.timer = 0;

        me.btn_type = "ipv4";
        this.fieldInfo = makeZenTip();
        Ext.data.StoreManager.lookup("store_monitor_sessionInfo").removeAll();
        hideLoadMask();
        setTimeout(function(){ me.setWidth('100%'); },100);
    },

    onPanelDestroy: function(component, eOpts) {
        clearInterval(Ext.getCmp('timeout').interval);
        Ext.data.StoreManager.lookup("store_monitor_sessionInfo").removeAll();
    },

    get_monitor_sessioninfo: function(start) {
        var me = this;

        var chk_update = Ext.getCmp("chk_update");
        var update = Ext.getCmp("update");

        var store = Ext.data.StoreManager.lookup("store_monitor_sessionInfo");
        var type = me.btn_type;
        if(me.btn_filter === true){
            var sip = Ext.getCmp("sip");
            var dip = Ext.getCmp("dip");
            var service = Ext.getCmp("service");
            var sport = Ext.getCmp("sport");
            var dport = Ext.getCmp("dport");
            var xsip = Ext.getCmp("xsip");
            var xdip = Ext.getCmp("xdip");
            var xsport = Ext.getCmp("xsport");
            var xdport = Ext.getCmp("xdport");

            var filter_info = {
                'src': sip.getValue(),
                'dest': dip.getValue(),
                'service': service.getValue().toLowerCase(),
                'sport': sport.getValue(),
                'dport': dport.getValue(),
                'xsrc': xsip.getValue(),
                'xdest': xdip.getValue(),
                'xsport': xsport.getValue(),
                'xdport': xdport.getValue()
            };
        }
        else{
            var filter_info = {
                'src': "",
                'dest': "",
                'service': "all",
                'sport': "",
                'dport': "",
                'xsrc': "",
                'xdest': "",
                'xsport': "",
                'xdport': ""
            };
        }

        var cp = (start)?start:store.currentPage;

        store.getProxy().setExtraParam('filter_info',Ext.encode(filter_info));
        store.getProxy().setExtraParam('family_proto',Ext.encode(type));
        store.currentPage = cp;
        store.load(function(response){
            if(response.length === 0){
                store.currentPage = 1;
                store.load(function(response){
                    if(response.length === 0){
                        Ext.getCmp('session_data_error').show();
                    }
                });
            }
            else{ Ext.getCmp('session_data_error').hide(); }
        });

    }

});