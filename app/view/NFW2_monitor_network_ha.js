
Ext.define('NFW2.view.NFW2_monitor_network_ha', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_network_ha',

    requires: [
        'NFW2.view.NFW2_monitor_network_haViewModel',
        'Ext.form.Panel',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table'
    ],

    viewModel: {
        type: 'nfw2_monitor_network_ha'
    },
    cls: 'zen_body',
    id: 'NFW2_monitor_network_ha',
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
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
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
                                            var me = Ext.getCmp('NFW2_monitor_network_ha');

                                            me.get_monitor_network_ha();
                                        },
                                        cls: 'dv_timecount',
                                        html: 5,
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
                                                    checked: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange3'
                                                    }
                                                }),
                                                me.processMyCheckItem1({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
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
                                        id: 'ha_data_error',
                                        bind: {
                                            text: '{ha_msg1}'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                flex: 1,
                                id: 'con_status',
                                margin: '8 0 0 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'label',
                                        baseCls: 'lb_bg',
                                        cls: 'x-title-text',
                                        bind: {
                                            text: '{ha_status}'
                                        }
                                    },
                                    {
                                        xtype: 'label',
                                        cls: 'cell_text',
                                        id: 'ha_status',
                                        padding: 5,
                                        width: 200
                                    },
                                    {
                                        xtype: 'label',
                                        baseCls: 'lb_bg',
                                        cls: 'x-title-text',
                                        bind: {
                                            text: '{ha_config}'
                                        }
                                    },
                                    {
                                        xtype: 'label',
                                        flex: 1,
                                        cls: 'cell_text',
                                        id: 'ha_setting',
                                        padding: 5
                                    }
                                ]
                            },
                            {
                                xtype: 'gridpanel',
                                flex: 1,
                                id: 'grid_ha',
                                margin: '8 0 10 0',
                                columnLines: true,
                                enableColumnHide: false,
                                sortableColumns: false,
                                store: 'store_monitor_ha_info',
                                bind: {
                                    title: '{ha_info}'
                                },
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'interface',
                                        flex: 1,
                                        bind: {
                                            text: '{inter}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'link',
                                        flex: 1,
                                        bind: {
                                            text: '{link}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'ip',
                                        flex: 1,
                                        bind: {
                                            text: '{ip}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var str = value.split(",");

                                            return str.join("<br>");
                                        },
                                        align: 'center',
                                        dataIndex: 'virtual_ip',
                                        flex: 1,
                                        bind: {
                                            text: '{virtual_ip}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var str = value.split(",");

                                            return str.join("<br>");
                                        },
                                        align: 'center',
                                        dataIndex: 'virtual_mac',
                                        flex: 1,
                                        bind: {
                                            text: '{virtual_mac}'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'gridpanel',
                                flex: 1,
                                id: 'grid_checker',
                                margin: '5 0 0 0',
                                columnLines: true,
                                enableColumnHide: false,
                                sortableColumns: false,
                                store: 'store_monitor_ha_checker',
                                bind: {
                                    title: '{checker_status}'
                                },
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'interface',
                                        flex: 1,
                                        bind: {
                                            text: '{inter}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'status',
                                        flex: 1,
                                        bind: {
                                            text: '{status}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'target_ip',
                                        flex: 1,
                                        bind: {
                                            text: '{target_ip}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'group_num',
                                        flex: 1,
                                        bind: {
                                            text: '{group_num}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'mode',
                                        flex: 1,
                                        bind: {
                                            text: '{operate_mode}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'info',
                                        flex: 1,
                                        bind: {
                                            text: '{info}'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'gridpanel',
                                flex: 1,
                                id: 'grid_vrrp',
                                margin: '5 0 0 0',
                                columnLines: true,
                                enableColumnHide: false,
                                sortableColumns: false,
                                store: 'store_monitor_ha_vrrp',
                                bind: {
                                    title: '{vrrp_status}'
                                },
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'interface',
                                        flex: 1,
                                        bind: {
                                            text: '{inter}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'status',
                                        flex: 1,
                                        bind: {
                                            text: '{status}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'group_ip',
                                        flex: 1,
                                        bind: {
                                            text: '{group_ip}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'priority',
                                        flex: 1,
                                        bind: {
                                            text: '{priority_level}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'group_num',
                                        flex: 1,
                                        bind: {
                                            text: '{group_num}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'mode',
                                        flex: 1,
                                        bind: {
                                            text: '{mode}'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'gridpanel',
                                flex: 1,
                                id: 'grid_sync',
                                margin: '5 0 0 0',
                                columnLines: true,
                                enableColumnHide: false,
                                sortableColumns: false,
                                store: 'store_monitor_ha_session',
                                bind: {
                                    title: '{sync_session_info}'
                                },
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'interface',
                                        flex: 1,
                                        bind: {
                                            text: '{inter}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'link',
                                        flex: 1,
                                        bind: {
                                            text: '{link}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'ip',
                                        text: 'IP',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'new',
                                        text: 'New',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'update',
                                        text: 'Update',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'delete',
                                        text: 'Delete',
                                        flex: 1
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
        config.text = '5 '+__zen('sec');

        return config;
    },

    processMyCheckItem1: function(config) {
        config.text = '10 '+__zen('sec');

        return config;
    },

    processMyCheckItem2: function(config) {
        config.text = '20 '+__zen('sec');

        return config;
    },

    processMyCheckItem3: function(config) {
        config.text = '30 '+__zen('sec');

        return config;
    },

    onChk_btnChange: function(button) {
        var timeout = Ext.getCmp('timeout');
        var me = Ext.getCmp('NFW2_monitor_network_ha');
        var time = Ext.getCmp('update_time').text.split(' ');

        if(button.state === true){
            me.get_monitor_network_ha();
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
        Ext.getCmp('timeout').setHtml(20);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange: function(menucheckitem, checked, eOpts) {
        Ext.getCmp('timeout').setHtml(30);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        me.timer = 0;
        me.get_monitor_network_ha();
    },

    onPanelDestroy: function(component, eOpts) {
        clearInterval(Ext.getCmp('timeout').interval);

        Ext.data.StoreManager.lookup("store_monitor_ha_info").removeAll();
        Ext.data.StoreManager.lookup("store_monitor_ha_checker").removeAll();
        Ext.data.StoreManager.lookup("store_monitor_ha_vrrp").removeAll();
        Ext.data.StoreManager.lookup("store_monitor_ha_session").removeAll();
    },

    get_monitor_network_ha: function() {
        var me = this;
        var g_count = 0;

        var chk_update = Ext.getCmp("chk_update");
        var update = Ext.getCmp("update");

        var _params = {
            filename: Ext.encode('/proc/ferret/monitor/network/ha_status')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            _params,
            function(response){
                hideLoadMask();
                setTimeout(function(){ me.setWidth('100%'); },100);
                if(!response || response[0] === ";"){
                    Ext.getCmp('ha_data_error').show();
                    return false;
                }
                Ext.getCmp('ha_data_error').hide();
                Ext.getCmp("con_status").show();

                var str = response[0].split(";");
                Ext.getCmp('ha_status').setText(str[0]);
                Ext.getCmp('ha_setting').setText(str[1]);
                set_update();

                var _params = {
                    filename: Ext.encode('/proc/ferret/monitor/network/ha_info')
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'getFileContent',
                    _params,
                    function(response){


                        var store = Ext.data.StoreManager.lookup("store_monitor_ha_info");
                        var record = [];

                        for(var i in response){
                            var str = response[i].split(";");

                            record.push({
                                'interface': str[0],
                                'link': str[1],
                                'ip': str[2],
                                'virtual_ip': str[3],
                                'virtual_mac': str[4]
                            });
                        }

                        store.loadData(record);
                        set_update();

                    }
                );

                var _params = {
                    filename: Ext.encode('/proc/ferret/monitor/network/checker')
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'getFileContent',
                    _params,
                    function(response){


                        var store = Ext.data.StoreManager.lookup("store_monitor_ha_checker");
                        var record = [];

                        for(var i in response){
                            var str = response[i].split(";");

                            record.push({
                                'interface': str[0],
                                'status': str[3],
                                'target_ip': str[8],
                                'group_num': str[4],
                                'mode': str[5],
                                'info': str[9]
                            });
                        }

                        store.loadData(record);
                        set_update();

                    }
                );

                var _params = {
                    filename: Ext.encode('/proc/ferret/monitor/network/ha_vrrp')
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'getFileContent',
                    _params,
                    function(response){


                        var store = Ext.data.StoreManager.lookup("store_monitor_ha_vrrp");
                        var record = [];

                        for(var i in response){
                            var str = response[i].split(";");

                            record.push({
                                'interface': str[0],
                                'status': str[1],
                                'group_ip': str[2],
                                'priority': str[3],
                                'group_num': str[4],
                                'mode': str[5]
                            });
                        }

                        store.loadData(record);
                        set_update();

                    }
                );

                var _params = {
                    filename: Ext.encode('/proc/ferret/monitor/network/session_sync_info')
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'getFileContent',
                    _params,
                    function(response){


                        var store = Ext.data.StoreManager.lookup("store_monitor_ha_session");
                        var record = [];

                        for(var i in response){
                            var str = response[i].split(";");

                            record.push({
                                'interface': str[0],
                                'link': str[1],
                                'ip': str[2],
                                'new': str[3],
                                'update': str[4],
                                'delete': str[5]
                            });
                        }

                        store.loadData(record);

                    }
                );
            }
        );
    }

});