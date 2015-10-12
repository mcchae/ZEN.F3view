
Ext.define('NFW2.view.NFW2_monitor_network_interface', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_network_interface',

    requires: [
        'NFW2.view.NFW2_monitor_network_interfaceViewModel',
        'Ext.form.Panel',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.form.Label',
        'Ext.button.Segmented',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table'
    ],

    viewModel: {
        type: 'nfw2_monitor_network_interface'
    },
    cls: 'zen_body',
    id: 'NFW2_monitor_network_interface',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender',
        beforedestroy: 'onNFW2_monitor_network_interfaceBeforeDestroy'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        layout: 'auto',
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
                                            var me = Ext.getCmp('NFW2_monitor_network_interface');

                                            me.get_monitor_network_interface();
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
                                        id: 'inter_data_error',
                                        bind: {
                                            text: '{interface_msg1}'
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
                                                    text: '{link_up}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick'
                                                }
                                            },
                                            {
                                                bind: {
                                                    text: '{all}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick1'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                items: [
                                    {
                                        xtype: 'gridpanel',
                                        id: 'grid_list',
                                        margin: '8 0 0 0',
                                        title: '',
                                        columnLines: true,
                                        sortableColumns: false,
                                        store: 'store_monitor_interface_list',
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return value['interface'];
                                                },
                                                width: 100,
                                                align: 'center',
                                                dataIndex: 'if_info',
                                                flex: 0.5,
                                                bind: {
                                                    text: '{inter}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var zone = value.zone;

                                                    if(zone.length === 3){
                                                        return zone.toUpperCase();
                                                    }else{
                                                        return zone.substring(0,1).toUpperCase()+zone.substring(1);
                                                    }
                                                },
                                                width: 80,
                                                align: 'center',
                                                dataIndex: 'if_info',
                                                flex: 0.5,
                                                bind: {
                                                    text: '{zone}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var ip = value.ip.split("/");

                                                    return ip[0];
                                                },
                                                align: 'center',
                                                dataIndex: 'if_info',
                                                flex: 0.5,
                                                bind: {
                                                    text: '{ip}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return value.link;
                                                },
                                                width: 80,
                                                align: 'center',
                                                dataIndex: 'if_info',
                                                flex: 0.5,
                                                bind: {
                                                    text: '{link}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var port = value.port;

                                                    if(value.link==="Up"){
                                                        return port.substring(0,1).toUpperCase()+port.substring(1)+'<br>('+value.speed+'/'+value.duplex+')';
                                                    }else{
                                                        return port.substring(0,1).toUpperCase()+port.substring(1)+'<br>(---/---)';
                                                    }
                                                },
                                                width: 130,
                                                align: 'center',
                                                dataIndex: 'if_info',
                                                flex: 0.5,
                                                bind: {
                                                    text: '{status}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                width: 400,
                                                align: 'center',
                                                text: 'TX',
                                                flex: 5,
                                                columns: [
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.tdAttr = 'data-qtip="'+commify(value.tx_packets)+'"';
                                                            return commify(value.tx_packets);
                                                        },
                                                        width: 80,
                                                        align: 'center',
                                                        dataIndex: 'if_stat',
                                                        text: 'packets'
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.tdAttr = 'data-qtip="'+commify(value.tx_errs)+'"';
                                                            return commify(value.tx_errs);
                                                        },
                                                        width: 80,
                                                        align: 'center',
                                                        dataIndex: 'if_stat',
                                                        text: 'errors'
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.tdAttr = 'data-qtip="'+commify(value.tx_drop)+'"';
                                                            return commify(value.tx_drop);
                                                        },
                                                        width: 80,
                                                        align: 'center',
                                                        dataIndex: 'if_stat',
                                                        text: 'dropped'
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.tdAttr = 'data-qtip="'+commify(value.tx_bytes)+'"';
                                                            return commify(value.tx_bytes);
                                                        },
                                                        minWidth: 120,
                                                        align: 'center',
                                                        dataIndex: 'if_stat',
                                                        text: 'bytes'
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.tdAttr = 'data-qtip="'+commify(value.tx_colls)+'"';
                                                            return commify(value.tx_colls);
                                                        },
                                                        width: 80,
                                                        align: 'center',
                                                        dataIndex: 'if_stat',
                                                        text: 'collisions'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                text: 'RX',
                                                columns: [
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.tdAttr = 'data-qtip="'+commify(value.rx_packets)+'"';
                                                            return commify(value.rx_packets);
                                                        },
                                                        width: 80,
                                                        align: 'center',
                                                        dataIndex: 'if_stat',
                                                        text: 'packets'
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.tdAttr = 'data-qtip="'+commify(value.rx_errs)+'"';
                                                            return commify(value.rx_errs);
                                                        },
                                                        width: 80,
                                                        align: 'center',
                                                        dataIndex: 'if_stat',
                                                        text: 'errors'
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.tdAttr = 'data-qtip="'+commify(value.rx_drop)+'"';
                                                            return commify(value.rx_drop);
                                                        },
                                                        width: 80,
                                                        align: 'center',
                                                        dataIndex: 'if_stat',
                                                        text: 'dropped',
                                                        flex: 0.7
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.tdAttr = 'data-qtip="'+commify(value.rx_bytes)+'"';
                                                            return commify(value.rx_bytes);
                                                        },
                                                        minWidth: 120,
                                                        align: 'center',
                                                        dataIndex: 'if_stat',
                                                        text: 'bytes',
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
        var me = Ext.getCmp('NFW2_monitor_network_interface');
        var time = Ext.getCmp('update_time').text.split(' ');

        if(button.state === true){
            me.get_monitor_network_interface();
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

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_interface');
        me.btn_name = "link";
        me.get_monitor_network_interface();
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_monitor_network_interface');
        me.btn_name = "all";
        me.get_monitor_network_interface();
        var time = Ext.getCmp('update_time').text.split(' ');
        Ext.getCmp('timeout').setHtml(Number(time[0]));

        clearInterval(Ext.getCmp('timeout').interval);
        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        me.timer = 0;
        me.btn_name = "link";
        me.get_monitor_network_interface();
    },

    onNFW2_monitor_network_interfaceBeforeDestroy: function(component, eOpts) {
        clearInterval(Ext.getCmp('timeout').interval);
        Ext.data.StoreManager.lookup("store_monitor_interface_list").removeAll();
    },

    get_monitor_network_interface: function() {
        var me = this;

        var menu = (me.btn_name === "link")?"up":"all";
        var chk_update = Ext.getCmp("chk_update");
        var update = Ext.getCmp("update");

        var _store = Ext.data.StoreManager.lookup("store_monitor_interface_list");

        var _params = {
            type_info: Ext.encode({'name':'interface','show_type':menu})
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getNetworkUsage',
            _params,
            function(response){
                hideLoadMask();
                setTimeout(function(){ me.setWidth('100%'); },100);
                var info = response.if_info;
                var stat = response.if_stat;

                var records = [];
                var records_info = [];
                var records_stat = [];

                for(var i in info){
                    records_info.push({
                        'interface': i,
                        'duplex': info[i].duplex,
                        'errs': info[i]['errs/colls'],
                        'ip': info[i].ip,
                        'link': (info[i].link==="yes")?"Up":"Down",
                        'mac': info[i].mac,
                        'port': info[i].port,
                        'speed': info[i].speed,
                        'zone': info[i].zone
                    });
                }

                for(var l in stat){

                    records_stat[l] = {
                        'interface': l,
                        'rx_bytes': stat[l].rx.bytes,
                        'rx_drop': stat[l].rx.drop,
                        'rx_errs': stat[l].rx.errs,
                        'rx_packets': stat[l].rx.packets,
                        'tx_bytes': stat[l].tx.bytes,
                        'tx_colls': stat[l].tx.colls,
                        'tx_drop': stat[l].tx.drop,
                        'tx_errs': stat[l].tx.errs,
                        'tx_packets': stat[l].tx.packets
                    };
                }

                for(var j=0; j<records_info.length; j++){

                    var inter = records_info[j]['interface'];

                    records.push({
                        'if_info': records_info[j],
                        'if_stat': records_stat[inter]
                    });
                }
                records.reverse();

                _store.loadData(records);
            }
        );
    }

});