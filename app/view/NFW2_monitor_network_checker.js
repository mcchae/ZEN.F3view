
Ext.define('NFW2.view.NFW2_monitor_network_checker', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_network_checker',

    requires: [
        'NFW2.view.NFW2_monitor_network_checkerViewModel',
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
        type: 'nfw2_monitor_network_checker'
    },
    cls: 'zen_body',
    id: 'NFW2_monitor_network_checker',
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
                                            var me = Ext.getCmp('NFW2_monitor_network_checker');

                                            me.get_monitor_network_checker();
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
                                        id: 'chk_data_error',
                                        bind: {
                                            text: '{checker_msg1}'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                flex: 1,
                                items: [
                                    {
                                        xtype: 'gridpanel',
                                        id: 'grid_list',
                                        margin: '8 0 10 0',
                                        title: '',
                                        columnLines: true,
                                        enableColumnMove: false,
                                        sortableColumns: false,
                                        store: 'store_monitor_checker_list',
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'interface',
                                                flex: 0.5,
                                                bind: {
                                                    text: '{inter}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'link',
                                                flex: 0.5,
                                                bind: {
                                                    text: '{link}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(value === "on"){
                                                        return '<img src="../images/b_dpi_accOpen.png" />';
                                                    }else{
                                                        return '';
                                                    }
                                                },
                                                align: 'center',
                                                dataIndex: 'mpr',
                                                text: 'MPR',
                                                flex: 0.5
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                flex: 1,
                                                bind: {
                                                    text: '{checker_info}'
                                                },
                                                columns: [
                                                    {
                                                        xtype: 'gridcolumn',
                                                        minWidth: 120,
                                                        align: 'center',
                                                        dataIndex: 'status',
                                                        flex: 2,
                                                        bind: {
                                                            text: '{status}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        minWidth: 120,
                                                        align: 'center',
                                                        dataIndex: 'name',
                                                        flex: 2,
                                                        bind: {
                                                            text: '{name}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        minWidth: 120,
                                                        align: 'center',
                                                        dataIndex: 'dest',
                                                        flex: 2,
                                                        bind: {
                                                            text: '{dest}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        minWidth: 120,
                                                        align: 'center',
                                                        dataIndex: 'mode',
                                                        flex: 2,
                                                        bind: {
                                                            text: '{mode}'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                bind: {
                                                    text: '{bandwidth}'
                                                },
                                                columns: [
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return byteConvert(value);
                                                        },
                                                        minWidth: 120,
                                                        align: 'center',
                                                        dataIndex: 'upload',
                                                        text: 'TX',
                                                        flex: 2
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return byteConvert(value);
                                                        },
                                                        minWidth: 120,
                                                        align: 'center',
                                                        dataIndex: 'download',
                                                        text: 'RX',
                                                        flex: 2
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
        var me = Ext.getCmp('NFW2_monitor_network_checker');
        var time = Ext.getCmp('update_time').text.split(' ');

        if(button.state === true){
            me.get_monitor_network_checker();
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
        me.get_monitor_network_checker();
    },

    onPanelDestroy: function(component, eOpts) {
        clearInterval(Ext.getCmp('timeout').interval);
        Ext.data.StoreManager.lookup("store_monitor_checker_list").removeAll();
    },

    get_monitor_network_checker: function() {
        var me = this;

        var chk_update = Ext.getCmp("chk_update");
        var update = Ext.getCmp("update");

        var store = Ext.data.StoreManager.lookup("store_monitor_checker_list");

        var _params = {
            filename: Ext.encode('/proc/ferret/monitor/network/checker')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            _params,
            function(response){
                hideLoadMask();
                setTimeout(function(){ me.setWidth('100%'); },100);

                if(!response){
                    Ext.getCmp('chk_data_error').show();
                    return false;
                }

                Ext.getCmp("chk_data_error").hide();

                var record = [];

                if(response.length === 0){ Ext.getCmp('chk_data_error').show(); }
                else{ Ext.getCmp('chk_data_error').hide(); }

                for(var i in response){

                    var str = response[i].split(";");

                    record.push({
                        'interface': str[0],
                        'link': str[1],
                        'mpr': str[2],
                        'status': str[3].toUpperCase(),
                        'name': str[4],
                        'mode': str[5],
                        'upload': str[6],
                        'download': str[7],
                        'dest': (str[5]==="CHECKER_TYPE_PROXY_BACKUP")?str[8]+"<br>"+str[9]:str[8]
                    });
                }

                store.loadData(record);
            }
        );
    }

});