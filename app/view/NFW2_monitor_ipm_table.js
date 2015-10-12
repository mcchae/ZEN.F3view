
Ext.define('NFW2.view.NFW2_monitor_ipm_table', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_ipm_table',

    requires: [
        'NFW2.view.NFW2_monitor_ipm_tableViewModel',
        'Ext.form.Panel',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.view.Table',
        'Ext.grid.column.Action'
    ],

    viewModel: {
        type: 'nfw2_monitor_ipm_table'
    },
    cls: 'zen_body',
    id: 'NFW2_monitor_ipm_table',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender',
        beforedestroy: 'onNFW2_monitor_ipm_tableBeforeDestroy'
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
                                flex: 1,
                                cls: 'dv_monitor',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'toggleslide',
                                        resizeHandle: false,
                                        state: false,
                                        cls: 'custom-color-monitor',
                                        id: 'chk_btn',
                                        listeners: {
                                            change: 'onChk_btnChange',
                                            afterrender: 'onChk_btnAfterRender'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        set_data: function() {
                                            var me = Ext.getCmp('NFW2_monitor_ipm_table');

                                            me.get_ipm_table();
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
                                                        checkchange: 'onMenucheckitemCheckChange'
                                                    }
                                                }),
                                                me.processMyCheckItem3({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange1'
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
                                                        checkchange: 'onMenucheckitemCheckChange3'
                                                    }
                                                })
                                            ]
                                        }
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
                                                xtype: 'label',
                                                flex: 1,
                                                id: 'ipm_chk_lb',
                                                margin: '5 0 0 10'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                flex: 1,
                                margin: '5 0 0 0',
                                items: [
                                    {
                                        xtype: 'gridpanel',
                                        id: 'monitor_ipm_table_list',
                                        header: false,
                                        title: 'My Grid Panel',
                                        store: 'store_monitor_ipm_table_list',
                                        columns: [
                                            {
                                                xtype: 'rownumberer',
                                                width: 65,
                                                align: 'center',
                                                dataIndex: 'string',
                                                text: 'N'
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'interface',
                                                flex: 1,
                                                bind: {
                                                    text: '{inter}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'ip',
                                                flex: 1,
                                                bind: {
                                                    text: '{ip}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'mac',
                                                flex: 1,
                                                bind: {
                                                    text: '{mac}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(value === "detect"){ return "탐지"; }
                                                    else if(value === "deny"){ return "차단"; }
                                                    else{ return "허용"; }
                                                },
                                                dataIndex: 'action',
                                                flex: 0.5,
                                                bind: {
                                                    text: '{status}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var temp = value.split(':');

                                                    return temp[0] + ":" + temp[1];
                                                },
                                                width: 130,
                                                dataIndex: 'lasthit',
                                                bind: {
                                                    text: '{last_hit}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'desc',
                                                flex: 2,
                                                bind: {
                                                    text: '{desc}'
                                                }
                                            },
                                            {
                                                xtype: 'actioncolumn',
                                                width: 45,
                                                align: 'center',
                                                dataIndex: 'action',
                                                bind: {
                                                    text: '{set}'
                                                },
                                                items: [
                                                    {
                                                        getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                            if(v === "detect"){ return "ic_add"; }
                                                            else if(v === "deny"){ return "ic_add"; }
                                                            else{ return "ic_del"; }
                                                        },
                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                            var me = Ext.getCmp('NFW2_monitor_ipm_table');

                                                            if(record.data.action === "detect" || record.data.action === "deny"){
                                                                var win = Ext.create('NFW2.view.win_ipm_allowHost',{
                                                                    modal : true,
                                                                    mode : "monitor",
                                                                    record : record
                                                                });

                                                                win.show();
                                                            }
                                                            else{
                                                                Ext.MessageBox.confirm("", get_msg("conf_del"),function(btn){
                                                                    if(btn === "yes"){
                                                                        var _params = {
                                                                            basename : Ext.encode("network_ipm_host")
                                                                        };

                                                                        request_helper.xmlrpc_call_JsonP(
                                                                        'ftuctrl',
                                                                        'getObjects',
                                                                        _params,

                                                                        function(data){
                                                                            var del = new Array();
                                                                            for(var i in data.list){
                                                                                var ip_list = [];
                                                                                var obj = [];

                                                                                for(var j in data.list[i]){
                                                                                    if(j.match('ip')){
                                                                                        if(data.list[i][j] !== null){
                                                                                            ip_list.push(data.list[i][j]);
                                                                                        }
                                                                                    }
                                                                                }

                                                                                for(var k in ip_list){
                                                                                    if(record.data.ip === ip_list[k]){
                                                                                        obj = data.list[i];
                                                                                    }
                                                                                }

                                                                                if(ip_list.length !== 0 && obj.length !== 0){
                                                                                    if(ip_list.length === 1){
                                                                                        del.push(obj._id);
                                                                                    }
                                                                                    else{
                                                                                        var _params = {
                                                                                            basename : Ext.encode('network_ipm_host'),
                                                                                            obj : Ext.encode(obj),
                                                                                            update : Ext.encode(true)
                                                                                        };

                                                                                        request_helper.xmlrpc_call_JsonP(
                                                                                        'ftuctrl',
                                                                                        'setListTypeObj',
                                                                                        _params,

                                                                                        function(response){
                                                                                            var _params2 = {
                                                                                                func_name : Ext.encode('mod_network_ipmac_apply'),
                                                                                                args : Ext.encode('null')
                                                                                            };

                                                                                            request_helper.xmlrpc_call_JsonP(
                                                                                            'ftuctrl',
                                                                                            'execKctrlFunc',
                                                                                            _params2,

                                                                                            function(response){
                                                                                                me.get_ipm_table();
                                                                                                Ext.Msg.show({
                                                                                                    title: __weguardia,
                                                                                                    width: 300,
                                                                                                    msg: get_msg('msg_ok_del'),
                                                                                                    buttons: Ext.Msg.OK,
                                                                                                    icon: Ext.window.MessageBox.INFO
                                                                                                });
                                                                                            }
                                                                                            );
                                                                                        }
                                                                                        );
                                                                                    }
                                                                                }
                                                                            }

                                                                            if(del.length > 0){
                                                                                var _params3 = {
                                                                                    basename : Ext.encode('network_ipm_host'),
                                                                                    ids : Ext.encode(del)
                                                                                };

                                                                                request_helper.xmlrpc_call_JsonP(
                                                                                'ftuctrl',
                                                                                'delListTypeObj',
                                                                                _params3,

                                                                                function(response){
                                                                                    var _params = {
                                                                                        func_name : Ext.encode('mod_network_ipmac_apply'),
                                                                                        args : Ext.encode('null')
                                                                                    };

                                                                                    request_helper.xmlrpc_call_JsonP(
                                                                                    'ftuctrl',
                                                                                    'execKctrlFunc',
                                                                                    _params,

                                                                                    function(response){
                                                                                        me.get_ipm_table();
                                                                                        Ext.Msg.show({
                                                                                            title: __weguardia,
                                                                                            width: 300,
                                                                                            msg: get_msg('msg_ok_del'),
                                                                                            buttons: Ext.Msg.OK,
                                                                                            icon: Ext.window.MessageBox.INFO
                                                                                        });
                                                                                    }
                                                                                    );
                                                                                }
                                                                                );
                                                                            }
                                                                        }
                                                                        );
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        ],
                                        viewConfig: {
                                            getRowClass: function(record, rowIndex, rowParams, store) {
                                                console.log(record.get('action'));
                                                if(record.get("action") === "deny"){

                                                    Ext.Function.defer(function(){
                                                        this.removeRowCls(rowIndex, 'x-grid-row-alt');
                                                    },100, this);

                                                    return "ipm_grid_row_r";
                                                }
                                                else if(record.get("action") === "accept"){

                                                    Ext.Function.defer(function(){
                                                        this.removeRowCls(rowIndex, 'x-grid-row-alt');
                                                    },100, this);

                                                    return "ipm_grid_row_g";
                                                }
                                                else if(record.get("action") === "detect"){

                                                    Ext.Function.defer(function(){
                                                        this.removeRowCls(rowIndex, 'x-grid-row-alt');
                                                    },100, this);

                                                    return "ipm_grid_row_b";
                                                }
                                            }
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

    processMyCheckItem3: function(config) {
        config.text = __zen('sec_10');

        return config;
    },

    processMyCheckItem1: function(config) {
        config.text = __zen('sec_20');

        return config;
    },

    processMyCheckItem2: function(config) {
        config.text = __zen('sec_30');

        return config;
    },

    onChk_btnChange: function(button) {
        var timeout = Ext.getCmp('timeout');
        var me = Ext.getCmp('NFW2_monitor_ipm_table');
        var time = Ext.getCmp('update_time').text.split(' ');

        if(button.state === true){
            me.get_ipm_table();
            monitor_timeout();
        }
        else{
            clearInterval(timeout.interval);
            Ext.getCmp('timeout').setHtml(Number(time[0]));
        }
    },

    onChk_btnAfterRender: function(component, eOpts) {
        component.onText = __zen('toggle_on');
        component.offText = __zen('toggle_off');
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

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        me.get_ipm_table();
    },

    onNFW2_monitor_ipm_tableBeforeDestroy: function(component, eOpts) {
        var me = this;
        clearInterval(Ext.getCmp('timeout').interval);
    },

    get_ipm_table: function() {
        var _params = {
            func_name : Ext.encode('get_ipm_monitor_table')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'execKctrlFunc',
            _params,

            function(response){
                var _params = {
                    basename : Ext.encode("network_ipm_manager")
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'getObjects',
                    _params,

                    function(data){
                        hideLoadMask();
                        if(response !== null){
                            var record = [];

                            for(var i in response){
                                record.push({
                                    'interface' : response[i].iface,
                                    'ip' : response[i].ip,
                                    'mac' : response[i].mac,
                                    'lasthit' : response[i].lastht,
                                    'action' : response[i].status,
                                    'desc' : response[i].desc
                                });
                            }
                            var chk_ip = [0,""];


                            for(var k in record){
                                for(var j in data.list){
                                    var r_ip = data.list[j].ip.split('-');
                                    var m_ip = data.list[j].ip.split('/');

                                    if(r_ip[1] !== undefined){
                                        if(ipSizeCalc(r_ip[0],record[k].ip) === 2 && ipSizeCalc(r_ip[1],record[k].ip) === 1){ record[k].name = data.list[j].name; }
                                    }
                                    else if(m_ip[1] !== undefined){
                                        var add1 = m_ip[0].split('.');
                                        var add2 = record[k].ip.split('.');

                                        if(add1[0] === add2[0] && add1[1] === add2[1] && add1[2] === add2[2] && add1[3] === add2[3]){
                                            chk_ip = [1,data.list[j].name];
                                        }
                                        else if(add1[0] === add2[0] && add1[1] === add2[1] && add1[2] === add2[2]){
                                            if(chk_ip[0] !== 1){
                                                chk_ip = [2,data.list[j].name];
                                            }
                                        }
                                        else if(add1[0] === add2[0] && add1[1] === add2[1]){
                                            if(chk_ip[0] !== 1 && chk_ip[0] !== 2){
                                                chk_ip = [3,data.list[j].name];
                                            }
                                        }
                                        else if(add1[0] === add2[0]){
                                            if(chk_ip[0] !== 1 && chk_ip[0] !== 2 && chk_ip[0] !== 3){
                                                chk_ip = [4,data.list[j].name];
                                            }
                                        }
                                    }
                                }
                                if(chk_ip[1] !== ""){ record[k].name = chk_ip[1]; }
                            }

                            Ext.data.StoreManager.lookup('store_monitor_ipm_table_list').loadData(record);

                            var accept_num = 0;
                            var detect_num = 0;
                            var deny_num = 0;
                            var total_num = 0;

                            for(var j in record){
                                if(record[j].action === "accept"){ accept_num++; }
                                else if(record[j].action === "detect"){ detect_num++; }
                                else if(record[j].action === "deny"){ deny_num++; }
                            }

                            total_num = accept_num + detect_num + deny_num;

                            Ext.getCmp('ipm_chk_lb').setText(__zen('allow')+" : "+accept_num +" / "+__zen('detect')+" : "+detect_num+" / "+__zen('deny')+" : "+deny_num+" / 합계 : "+total_num);
                        }
                    }
                );
            }
        );
    }

});