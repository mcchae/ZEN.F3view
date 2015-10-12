
Ext.define('NFW2.view.NFW2_monitor_network_trafficMonitor', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_network_trafficmonitor',

    requires: [
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table'
    ],

    cls: 'zen_body',
    id: 'trafficMonitor',
    width: 900,
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender',
        beforedestroy: 'onTrafficMonitorBeforeDestroy'
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
                                            var me = Ext.getCmp('trafficMonitor');

                                            me.get_monitor_network_traffic();
                                        },
                                        cls: 'dv_timecount',
                                        html: 2,
                                        id: 'timeout',
                                        width: 55
                                    },
                                    {
                                        xtype: 'label',
                                        margin: '0 0 0 10',
                                        listeners: {
                                            beforerender: 'onLabelBeforeRender'
                                        }
                                    },
                                    {
                                        xtype: 'label',
                                        cls: 'lb_m_none',
                                        hidden: true,
                                        id: 'traffic_data_error',
                                        listeners: {
                                            beforerender: 'onTraffic_data_errorBeforeRender'
                                        }
                                    },
                                    {
                                        xtype: 'cycle',
                                        flex: 1,
                                        hidden: true,
                                        id: 'update_time',
                                        showText: true,
                                        menu: {
                                            xtype: 'menu',
                                            width: 120,
                                            items: [
                                                me.processMyCheckItem2({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    checked: true
                                                })
                                            ]
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'gridpanel',
                                id: 'grid_system_info',
                                margin: '8 0 0 0',
                                columnLines: true,
                                enableColumnHide: false,
                                sortableColumns: false,
                                store: 'store_monitor_traffic_sinfo',
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'background:#fafafa';
                                            return value;
                                        },
                                        align: 'center',
                                        dataIndex: 'tit',
                                        text: '',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'cpu',
                                        text: 'CPU',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'memory',
                                        flex: 1,
                                        listeners: {
                                            beforerender: 'onGridcolumnBeforeRender'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'session',
                                        flex: 1,
                                        listeners: {
                                            beforerender: 'onGridcolumnBeforeRender1'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'cps',
                                        text: 'CPS',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'log',
                                        flex: 1,
                                        listeners: {
                                            beforerender: 'onGridcolumnBeforeRender2'
                                        }
                                    }
                                ],
                                listeners: {
                                    render: 'onGrid_system_infoRender'
                                }
                            },
                            {
                                xtype: 'gridpanel',
                                id: 'grid_monitor_traffic',
                                margin: '8 0 10 0',
                                columnLines: true,
                                enableColumnHide: false,
                                sortableColumns: false,
                                store: 'store_monitor_traffic_tinfo',
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        colspan: '3',
                                        align: 'center',
                                        groupable: false,
                                        flex: 3,
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(rowIndex === 3 || rowIndex === 7 || rowIndex === 11){
                                                        metaData.style = "background:#fafafa;border-bottom:1px solid #ededed;";
                                                    }else{
                                                        metaData.style = "background:#fafafa;border-bottom:1px solid #fafafa;";
                                                    }

                                                    return value;
                                                },
                                                colspan: '3',
                                                height: 0,
                                                style: 'border:none',
                                                align: 'center',
                                                dataIndex: 'tit1',
                                                text: ''
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(rowIndex === 1 || rowIndex === 3 || rowIndex === 5 || rowIndex === 7 || rowIndex === 9 || rowIndex === 11){
                                                        metaData.style = "background:#fafafa;border-bottom:1px solid #ededed;";
                                                    }else{
                                                        metaData.style = "background:#fafafa;border-bottom:1px solid #fafafa;";
                                                    }

                                                    return value;
                                                },
                                                colspan: '3',
                                                height: 0,
                                                style: 'display:none',
                                                align: 'center',
                                                dataIndex: 'tit2',
                                                groupable: false,
                                                text: ''
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#fafafa;border-bottom:1px solid #ededed;";
                                                    return value;
                                                },
                                                colspan: '3',
                                                height: 0,
                                                style: 'display:none',
                                                align: 'center',
                                                dataIndex: 'tit3',
                                                groupable: false,
                                                text: ''
                                            }
                                        ],
                                        listeners: {
                                            beforerender: 'onGridcolumnBeforeRender3'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return byteConvert(value);
                                        },
                                        hidden: true,
                                        id: 'eth0',
                                        align: 'center',
                                        dataIndex: 'eth0',
                                        text: 'eth0',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return byteConvert(value);
                                        },
                                        hidden: true,
                                        id: 'eth1',
                                        align: 'center',
                                        dataIndex: 'eth1',
                                        text: 'eth1',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return byteConvert(value);
                                        },
                                        hidden: true,
                                        id: 'eth2',
                                        align: 'center',
                                        dataIndex: 'eth2',
                                        text: 'eth2',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return byteConvert(value);
                                        },
                                        hidden: true,
                                        id: 'eth3',
                                        align: 'center',
                                        dataIndex: 'eth3',
                                        text: 'eth3',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return byteConvert(value);
                                        },
                                        hidden: true,
                                        id: 'eth4',
                                        align: 'center',
                                        dataIndex: 'eth4',
                                        text: 'eth4',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return byteConvert(value);
                                        },
                                        hidden: true,
                                        id: 'eth5',
                                        align: 'center',
                                        dataIndex: 'eth5',
                                        text: 'eth5',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return byteConvert(value);
                                        },
                                        hidden: true,
                                        id: 'eth6',
                                        align: 'center',
                                        dataIndex: 'eth6',
                                        text: 'eth6',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return byteConvert(value);
                                        },
                                        hidden: true,
                                        id: 'eth7',
                                        align: 'center',
                                        dataIndex: 'eth7',
                                        text: 'eth7',
                                        flex: 1
                                    }
                                ],
                                listeners: {
                                    afterlayout: 'onGrid_trafficAfterLayout',
                                    render: 'onGrid_monitor_trafficRender'
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

    processMyCheckItem2: function(config) {
        config.text = '2 '+__zen('sec');

        return config;
    },

    onChk_btnChange: function(button) {
        var timeout = Ext.getCmp('timeout');
        var me = Ext.getCmp('trafficMonitor');
        var a_mon = me.a_mon;

        if(button.state === true){

            var s_info = {};
            s_info.m_cpu = 0;
            s_info.m_memory = 0;
            s_info.m_session = 0;
            s_info.m_cps = 0;
            s_info.m_log = 0;

            var t_info = {};
            var t_avg = {};

            for(var i=0; i<a_mon.length; i++){
                eval("Ext.getCmp('eth"+a_mon[i]+"').show();");
                eval("t_info.eth"+a_mon[i]+" = { 'bps_rx':0, 'bps_tx':0, 'pps_rx':0, 'pps_tx':0 }");
                eval("t_avg.eth"+a_mon[i]+" = { 'bps_rx':0, 'bps_tx':0, 'pps_rx':0, 'pps_tx':0 }");
            }

            me.a_mon = a_mon;
            me.s_info = s_info;
            me.t_info = t_info;
            me.t_avg = t_avg;

            me.mo_t = 0;

            me.get_monitor_network_traffic();
            monitor_timeout();
        }
        else{
            clearInterval(timeout.interval);
            Ext.getCmp('timeout').setHtml(2);
        }
    },

    onLabelBeforeRender: function(component, eOpts) {
        component.text = '2 '+__zen('sec');
    },

    onTraffic_data_errorBeforeRender: function(component, eOpts) {
        component.text = __zen('traffic_info2');
    },

    onGridcolumnBeforeRender: function(component, eOpts) {
        component.text = __zen('memory');
    },

    onGridcolumnBeforeRender1: function(component, eOpts) {
        component.text = __zen('session');
    },

    onGridcolumnBeforeRender2: function(component, eOpts) {
        component.text = __zen('log');
    },

    onGrid_system_infoRender: function(component, eOpts) {
        component.setTitle(__zen('system_info'));
    },

    onGridcolumnBeforeRender3: function(component, eOpts) {
        component.text = __zen('section');
    },

    onGrid_trafficAfterLayout: function(container, layout, eOpts) {
        var me = this;

        var grid = Ext.getCmp("grid_traffic");

        /*if(Ext.get(grid.view.getNode(0))){

            for(var i=0; i<grid.getStore().getCount(); i++){

                var row1 = grid.getStore().data.items[i].data.rowspan1;

                if(row1){
                    if(me.sys !== '1')
                        td_row(i,row1,1);
                }
            }
            for(var i=0; i<grid.getStore().getCount(); i++){

                var row = grid.getStore().data.items[i].data.rowspan;

                if(row){
                    if(me.sys !== '1')
                        td_row(i,row,0);
                }
            }
            me.sys = '1';
        }*/

        function td_row(i,row,t){

            var grid = Ext.getCmp("grid_traffic");

            for(var l=i; l<(i+row); l++){

                var id = "tds"+l;
                eval("var "+id+" = Ext.get(grid.view.getNode("+l+")).query('td');");

                if(l===i){
                    eval("Ext.get("+id+"["+t+"]).set({rowspan:"+row+"}).setStyle('background','#fafafa');");
                    eval("Ext.get("+id+"[2]).setStyle('background','#fafafa');");
                }else{
                    console.log("s");
                    eval("Ext.get("+id+"["+t+"]).destroy();");
                }
            }

        }
    },

    onGrid_monitor_trafficRender: function(component, eOpts) {
        component.setTitle(__zen('traffic_info'));
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        var _params = {
            basename: Ext.encode('monitor_basic')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){
                var mon = (!response || response.mon.eth==="")?"0;1;2;3":response.mon.eth;
                var a_mon = mon.split(";");

                var s_info = {};
                s_info.m_cpu = 0;
                s_info.m_memory = 0;
                s_info.m_session = 0;
                s_info.m_cps = 0;
                s_info.m_log = 0;

                var t_info = {};
                var t_avg = {};

                for(var i=0; i<a_mon.length; i++){
                    eval("Ext.getCmp('eth"+a_mon[i]+"').show();");
                    eval("t_info.eth"+a_mon[i]+" = { 'bps_rx':0, 'bps_tx':0, 'pps_rx':0, 'pps_tx':0 }");
                    eval("t_avg.eth"+a_mon[i]+" = { 'bps_rx':0, 'bps_tx':0, 'pps_rx':0, 'pps_tx':0 }");
                }

                me.a_mon = a_mon;
                me.s_info = s_info;
                me.t_info = t_info;
                me.t_avg = t_avg;

                me.timer = 0;
                me.mo_t = 0;

                me.get_monitor_network_traffic();
            }
        );
    },

    onTrafficMonitorBeforeDestroy: function(component, eOpts) {
        clearInterval(Ext.getCmp('timeout').interval);
        Ext.data.StoreManager.lookup("store_monitor_traffic_sinfo").removeAll();
        Ext.data.StoreManager.lookup("store_monitor_traffic_tinfo").removeAll();
    },

    get_monitor_network_traffic: function() {
        var me = this;

        var chk_update = Ext.getCmp("chk_update");

        var s_store = Ext.data.StoreManager.lookup("store_monitor_traffic_sinfo");
        var t_store = Ext.data.StoreManager.lookup("store_monitor_traffic_tinfo");

        var _params = {
            filename: Ext.encode('/proc/ferret/monitor/network/traffic_monitor')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            _params,
            function(response){
                hideLoadMask();
                setTimeout(function(){ me.setWidth('100%'); },100);
                var s_record = [];
                var t_record = [];

                t_record.push({
                    'tit1': __zen('current'),
                    'tit2': 'BPS',
                    'tit3': 'TX',
                    'eth0': '0',
                    'eth1': '0',
                    'eth2': '0',
                    'eth3': '0',
                    'eth4': '0',
                    'eth5': '0',
                    'eth6': '0',
                    'eth7': '0'
                },{
                    'tit1': '',
                    'tit2': '',
                    'tit3': 'RX',
                    'eth0': '0',
                    'eth1': '0',
                    'eth2': '0',
                    'eth3': '0',
                    'eth4': '0',
                    'eth5': '0',
                    'eth6': '0',
                    'eth7': '0'
                },{
                    'tit1': '',
                    'tit2': 'PPS',
                    'tit3': 'TX',
                    'eth0': '0',
                    'eth1': '0',
                    'eth2': '0',
                    'eth3': '0',
                    'eth4': '0',
                    'eth5': '0',
                    'eth6': '0',
                    'eth7': '0'
                },{
                    'tit1': '',
                    'tit2': '',
                    'tit3': 'RX',
                    'eth0': '0',
                    'eth1': '0',
                    'eth2': '0',
                    'eth3': '0',
                    'eth4': '0',
                    'eth5': '0',
                    'eth6': '0',
                    'eth7': '0'
                },{
                    'tit1': __zen('max'),
                    'tit2': 'BPS',
                    'tit3': 'TX',
                    'eth0': '0',
                    'eth1': '0',
                    'eth2': '0',
                    'eth3': '0',
                    'eth4': '0',
                    'eth5': '0',
                    'eth6': '0',
                    'eth7': '0'
                },{
                    'tit1': '',
                    'tit2': '',
                    'tit3': 'RX',
                    'eth0': '0',
                    'eth1': '0',
                    'eth2': '0',
                    'eth3': '0',
                    'eth4': '0',
                    'eth5': '0',
                    'eth6': '0',
                    'eth7': '0'
                },{
                    'tit1': '',
                    'tit2': 'PPS',
                    'tit3': 'TX',
                    'eth0': '0',
                    'eth1': '0',
                    'eth2': '0',
                    'eth3': '0',
                    'eth4': '0',
                    'eth5': '0',
                    'eth6': '0',
                    'eth7': '0'
                },{
                    'tit1': '',
                    'tit2': '',
                    'tit3': 'RX',
                    'eth0': '0',
                    'eth1': '0',
                    'eth2': '0',
                    'eth3': '0',
                    'eth4': '0',
                    'eth5': '0',
                    'eth6': '0',
                    'eth7': '0'
                },{
                    'tit1': __zen('average'),
                    'tit2': 'BPS',
                    'tit3': 'TX',
                    'eth0': '0',
                    'eth1': '0',
                    'eth2': '0',
                    'eth3': '0',
                    'eth4': '0',
                    'eth5': '0',
                    'eth6': '0',
                    'eth7': '0'
                },{
                    'tit1': '',
                    'tit2': '',
                    'tit3': 'RX',
                    'eth0': '0',
                    'eth1': '0',
                    'eth2': '0',
                    'eth3': '0',
                    'eth4': '0',
                    'eth5': '0',
                    'eth6': '0',
                    'eth7': '0'
                },{
                    'tit1': '',
                    'tit2': 'PPS',
                    'tit3': 'TX',
                    'eth0': '0',
                    'eth1': '0',
                    'eth2': '0',
                    'eth3': '0',
                    'eth4': '0',
                    'eth5': '0',
                    'eth6': '0',
                    'eth7': '0'
                },{
                    'tit1': '',
                    'tit2': '',
                    'tit3': 'RX',
                    'eth0': '0',
                    'eth1': '0',
                    'eth2': '0',
                    'eth3': '0',
                    'eth4': '0',
                    'eth5': '0',
                    'eth6': '0',
                    'eth7': '0'
                });

                if(response){

                    if(me.mo_t > 1){
                        var m_time = Number(me.mo_t) * 2;
                    }

                    var s_str = response[0].split(",");
                    s_str[3] = me.get_cps(s_str[3]);
                    s_record.push({
                        'tit': __zen('current'),
                        'cpu': s_str[0],
                        'memory': s_str[1],
                        'session': s_str[2],
                        'cps': s_str[3],
                        'log': s_str[4]
                    });

                    var s_info = me.s_info;

                    var m_cpu = (s_info.m_cpu > s_str[0])?s_info.m_cpu:s_str[0];
                    var m_memory = (s_info.m_memory > s_str[1])?s_info.m_memory:s_str[1];
                    var m_session = (s_info.m_session > s_str[2])?s_info.m_session:s_str[2];
                    var m_cps = (s_info.m_cps > s_str[3])?s_info.m_cps:s_str[3];
                    var m_log = (s_info.m_log > s_str[4])?s_info.m_log:s_str[4];

                    s_record.push({
                        'tit': __zen('max'),
                        'cpu': m_cpu,
                        'memory': m_memory,
                        'session': m_session,
                        'cps': m_cps,
                        'log': m_log
                    });

                    s_info.m_cpu = m_cpu;
                    s_info.m_memory = m_memory;
                    s_info.m_session = m_session;
                    s_info.m_cps = m_cps;
                    s_info.log = m_log;

                    me.s_info = s_info;

                    var t_info = me.t_info;
                    var t_avg = me.t_avg;

                    for(var i=1; i<response.length; i++){
                        var t_str = response[i].split(",");
                        var e = t_str[0].substring(3);
                        var temp = "eth"+e;

                        t_record[0][temp] = t_str[2];
                        t_record[1][temp] = t_str[1];
                        t_record[2][temp] = t_str[4];
                        t_record[3][temp] = t_str[3];

                        if(t_info[temp] !== undefined){
                            var bps_rx = (t_info[temp].bps_rx > Number(t_str[1]))?t_info[temp].bps_rx:t_str[1];
                            var bps_tx = (t_info[temp].bps_tx > Number(t_str[2]))?t_info[temp].bps_tx:t_str[2];
                            var pps_rx = (t_info[temp].pps_rx > Number(t_str[3]))?t_info[temp].pps_rx:t_str[3];
                            var pps_tx = (t_info[temp].pps_tx > Number(t_str[4]))?t_info[temp].pps_tx:t_str[4];

                            t_record[5][temp] = Number(bps_rx);
                            t_record[4][temp] = Number(bps_tx);
                            t_record[7][temp] = Number(pps_rx);
                            t_record[6][temp] = Number(pps_tx);

                            t_info[temp].bps_rx = Number(bps_rx);
                            t_info[temp].bps_tx = Number(bps_tx);
                            t_info[temp].pps_rx = Number(pps_rx);
                            t_info[temp].pps_tx = Number(pps_tx);

                            t_avg[temp].bps_rx = Number(t_avg[temp].bps_rx)+Number(t_str[2]);
                            t_avg[temp].bps_tx = Number(t_avg[temp].bps_tx)+Number(t_str[1]);
                            t_avg[temp].pps_rx = Number(t_avg[temp].pps_rx)+Number(t_str[4]);
                            t_avg[temp].pps_tx = Number(t_avg[temp].pps_tx)+Number(t_str[3]);
                        }

                        if(me.mo_t >= 1){
                            t_record[8][temp] = me.get_traffic(t_avg[temp].bps_rx);
                            t_record[9][temp] = me.get_traffic(t_avg[temp].bps_tx);
                            t_record[10][temp] = me.get_traffic(t_avg[temp].pps_rx);
                            t_record[11][temp] = me.get_traffic(t_avg[temp].pps_tx);
                        }

                    }

                    me.t_info = t_info;
                    me.mo_t = me.mo_t+1;

                }else{
                    s_record.push({
                        'tit': __zen('current'),
                        'cpu': '0',
                        'memory': '0',
                        'session': '0',
                        'cps': '0',
                        'log': '0'
                    },{
                        'tit': __zen('max'),
                        'cpu': '0',
                        'memory': '0',
                        'session': '0',
                        'cps': '0',
                        'log': '0'
                    });
                }

                s_store.loadData(s_record);
                t_store.loadData(t_record);

            }
        );
    },

    get_cps: function(val) {
        if(val === "0"){ return val; }

        var rval = val / 2;

        var s_rval = rval.toString();
        if(s_rval.indexOf('.') == -1)
            return rval;

        var a_v = s_rval.split('.');
        if(a_v[1] == '00')
            return a_v[0];
        else
            return rval.toFixed(2);
    },

    get_traffic: function(val) {
        var m = this.mo_t*2;

        if(Number(val) === 0){ return val; }
        var rval = Number(val) / m;

        var s_rval = rval.toString();
        if(s_rval.indexOf('.') == -1)
            return rval;

        var a_v = s_rval.split('.');
        if(a_v[1] == '00')
            return a_v[0];
        else
            return rval.toFixed(2);
    }

});