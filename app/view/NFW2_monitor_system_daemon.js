
Ext.define('NFW2.view.NFW2_monitor_system_daemon', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_system_daemon',

    requires: [
        'NFW2.view.NFW2_monitor_system_daemonViewModel',
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
        type: 'nfw2_monitor_system_daemon'
    },
    cls: 'zen_body',
    id: 'system_daemon',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender',
        beforedestroy: 'onSystem_daemonBeforeDestroy'
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
                                            var me = Ext.getCmp('system_daemon');

                                            me.get_system_daemon();
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
                                        id: 'daemon_data_error',
                                        bind: {
                                            text: '{daemon_info1}'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'gridpanel',
                                cls: 'tbl_fw',
                                id: 'grid_list',
                                margin: '8 0 10 0',
                                title: '',
                                columnLines: true,
                                sortableColumns: false,
                                store: 'store_monitor_daemon_list',
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'pid',
                                        text: 'PID',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'name',
                                        flex: 1,
                                        bind: {
                                            text: '{name}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            if(value === "Alive"){

                                                return "<font style='color:#0000FF'>"+value+"</font>";
                                            }else{

                                                return "<font style='color:#FF0000'>"+value+"</font>";
                                            }
                                        },
                                        align: 'center',
                                        dataIndex: 'status',
                                        flex: 0.7,
                                        bind: {
                                            text: '{status}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return (record.data.status==="Die")?"-":value;
                                        },
                                        align: 'center',
                                        dataIndex: 'start_time',
                                        flex: 1,
                                        bind: {
                                            text: '{start_time}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return (record.data.status==="Die")?"-":value;
                                        },
                                        align: 'center',
                                        dataIndex: 'end_time',
                                        flex: 1,
                                        bind: {
                                            text: '{monitoring_time}'
                                        }
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
                                        dataIndex: 'mem',
                                        flex: 1,
                                        bind: {
                                            text: '{memory}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'desc',
                                        flex: 1,
                                        bind: {
                                            text: '{desc}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            if(record.data.status === 'Alive'){
                                                return '<font style="color:#ccc">[Start]</font>';
                                            }else{
                                                return '<font style="color:#2c6ed5;cursor:pointer">[Start]</font>';
                                            }
                                        },
                                        width: 70,
                                        align: 'center',
                                        bind: {
                                            text: '{start}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            if(record.data.status === 'Alive'){
                                                return '<font style="color:#2c6ed5;cursor:pointer">[Stop]</font>';
                                            }else{
                                                return '<font style="color:#ccc">[Stop]</font>';
                                            }
                                        },
                                        width: 70,
                                        align: 'center',
                                        bind: {
                                            text: '{stop}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            if(record.data.status === 'Alive'){
                                                return '<font style="color:#2c6ed5;cursor:pointer">[Restart]</font>';
                                            }else{
                                                return '<font style="color:#ccc">[Restart]</font>';
                                            }
                                        },
                                        width: 80,
                                        align: 'center',
                                        bind: {
                                            text: '{restart}'
                                        }
                                    }
                                ],
                                viewConfig: {
                                    getRowClass: function(record, rowIndex, rowParams, store) {
                                        if(Number(record.get("3rdParty")) === 1){

                                            Ext.Function.defer(function(){
                                                this.removeRowCls(rowIndex, 'x-grid-row-alt');
                                            },100, this);

                                            return "stOff";
                                        }
                                    }
                                },
                                listeners: {
                                    cellclick: 'onGrid_listCellClick'
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
        config.text = '20 '+__zen('sec');

        return config;
    },

    processMyCheckItem3: function(config) {
        config.text = '30 '+__zen('sec');

        return config;
    },

    onChk_btnChange: function(button) {
        var timeout = Ext.getCmp('timeout');
        var me = Ext.getCmp('system_daemon');
        var time = Ext.getCmp('update_time').text.split(' ');

        if(button.state === true){
            me.get_system_daemon();
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

    onGrid_listCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 8){
            if(record.data.status !== 'Alive'){
                Ext.MessageBox.confirm(__weguardia, '시작 하시겠습니까?',function(btn){
                    if(btn == 'yes'){
                        Ext.getCmp("system_daemon").exec_daemon_action(record.data.name,'start');
                    }
                });

            }
        }else if(cellIndex === 9){
            if(record.data.status !== 'Die'){
                Ext.MessageBox.confirm(__weguardia, '중지 하시겠습니까?',function(btn){
                    if(btn == 'yes'){
                        Ext.getCmp("system_daemon").exec_daemon_action(record.data.name,'stop');
                    }
                });
            }
        }else if(cellIndex === 10){
            if(record.data.status !== 'Die'){
                Ext.MessageBox.confirm(__weguardia, '재시작 하시겠습니까?',function(btn){
                    if(btn == 'yes'){
                        Ext.getCmp("system_daemon").exec_daemon_action(record.data.name,'restart');
                    }
                });
            }
        }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        me.update = 0;
        me.get_system_daemon();
    },

    onSystem_daemonBeforeDestroy: function(component, eOpts) {
        clearInterval(Ext.getCmp('timeout').interval);
        Ext.data.StoreManager.lookup("store_monitor_daemon_list").removeAll();
    },

    get_system_daemon: function() {
        var me = this;
        var g_count = 0;

        var chk_update = Ext.getCmp("chk_update");
        var update = Ext.getCmp("update");

        var _params = {
            func_name: Ext.encode('mod_daemon_status')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'execKctrlFunc',
            _params,
            function(response){
                hideLoadMask();
                setTimeout(function(){ me.setWidth('100%'); },100);
                var record = [];

                if(response){

                    for(var i in response){
                        record.push({
                            'name': i,
                            'pid': response[i][0],
                            'status': response[i][1],
                            'start_time': response[i][2],
                            'end_time': response[i][3],
                            'cpu': response[i][4],
                            'mem': response[i][5],
                            '3rdParty': response[i][6],
                            'desc': response[i][7]
                        });
                    }
                    Ext.data.StoreManager.lookup("store_monitor_daemon_list").loadData(record);
                    Ext.getCmp('daemon_data_error').hide();
                }
                if(!response || record.length === 0){
                    Ext.getCmp('daemon_data_error').show();
                }

            }
        );
    },

    exec_daemon_action: function(name, action) {
        var time = Ext.getCmp('update_time').text.split(' ');
        clearInterval(Ext.getCmp('timeout').interval);
        Ext.getCmp('timeout').setHtml(Number(time[0]));
        Ext.getCmp("chk_btn").moveHandle(false);
        Ext.getCmp("chk_btn").state = false;

        var _params = {
            func_name: Ext.encode('mod_daemon_action'),
            args: Ext.encode({'name':name, 'action':action})
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'execKctrlFunc',
            _params,
            function(response){

                if(action === "stop" && response === true){
                    Ext.MessageBox.alert(__weguardia,name+get_msg('err_daemon_stop'));
                }
            }
        );
    }

});