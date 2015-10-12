
Ext.define('NFW2.view.NFW2_monitor_ipm_map', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_ipm_map',

    requires: [
        'NFW2.view.NFW2_monitor_ipm_mapViewModel',
        'Ext.form.Panel',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.form.Label',
        'Ext.Img'
    ],

    viewModel: {
        type: 'nfw2_monitor_ipm_map'
    },
    cls: 'zen_body',
    id: 'NFW2_monitor_ipm_map',
    header: false,
    title: 'My Panel',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onNFW2_monitor_ipm_mapAfterRender',
        beforedestroy: 'onNFW2_monitor_ipm_mapBeforeDestroy'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        header: false,
                        title: 'My Form',
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
                                            var me = Ext.getCmp('NFW2_monitor_ipm_map');

                                            me.get_ipm_map();
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
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                flex: 1,
                                margin: '5 0 0 0',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'container',
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
                                                        xtype: 'gridpanel',
                                                        flex: 1,
                                                        id: 'monitor_ipm_network_grid',
                                                        header: false,
                                                        title: 'My Grid Panel',
                                                        enableColumnMove: false,
                                                        store: 'store_ipm_monitor_map_list',
                                                        columns: [
                                                            {
                                                                xtype: 'gridcolumn',
                                                                dataIndex: 'obj_name',
                                                                flex: 1.5,
                                                                bind: {
                                                                    text: '{obj_name}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                dataIndex: 'iface',
                                                                menuDisabled: true,
                                                                flex: 2,
                                                                bind: {
                                                                    text: '{inter}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                dataIndex: 'network',
                                                                menuDisabled: true,
                                                                flex: 3,
                                                                bind: {
                                                                    text: '{network}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if(value === "accept"){ return __zen("detect"); }
                                                                    else{ return __zen('deny'); }
                                                                },
                                                                dataIndex: 'action',
                                                                flex: 1,
                                                                bind: {
                                                                    text: '{action}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                dataIndex: 'scan_time',
                                                                flex: 1.2,
                                                                bind: {
                                                                    text: '{ip_scan_period}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                dataIndex: 'scan_cnt',
                                                                flex: 1.2,
                                                                bind: {
                                                                    text: '{ip_scan_per_sec}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                dataIndex: 'accept',
                                                                menuDisabled: true,
                                                                flex: 0.7,
                                                                bind: {
                                                                    text: '{allow}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                dataIndex: 'detect',
                                                                menuDisabled: true,
                                                                flex: 0.7,
                                                                bind: {
                                                                    text: '{detect}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                dataIndex: 'deny',
                                                                menuDisabled: true,
                                                                flex: 0.7,
                                                                bind: {
                                                                    text: '{deny}'
                                                                }
                                                            }
                                                        ],
                                                        viewConfig: {
                                                            getRowClass: function(record, rowIndex, rowParams, store) {
                                                                if(record.data.show === false){
                                                                    return "ipm_monitor_deny";
                                                                }
                                                            },
                                                            scrollable: {
                                                                x: false,
                                                                y: true
                                                            }
                                                        },
                                                        listeners: {
                                                            cellclick: 'onMonitor_ipm_network_gridCellClick'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                hidden: true,
                                                id: 'monitor_ipm_map_host',
                                                width: 650,
                                                listeners: {
                                                    afterrender: 'onMonitor_ipm_map_hostAfterRender'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        cls: 'd_frame',
                                        margin: '8 0 0 0',
                                        style: 'border-top:2px solid lightgray',
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                id: 'monitor_ipm_map_lb_con',
                                                margin: '8 15 0 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch',
                                                    pack: 'end'
                                                },
                                                items: [
                                                    me.processMyLabel({
                                                        xtype: 'label'
                                                    }),
                                                    {
                                                        xtype: 'image',
                                                        margin: '0 0 0 5',
                                                        imgCls: 'ipm_map_green'
                                                    },
                                                    me.processMyLabel1({
                                                        xtype: 'label',
                                                        margin: '0 0 0 10'
                                                    }),
                                                    {
                                                        xtype: 'image',
                                                        margin: '0 0 0 5',
                                                        imgCls: 'ipm_map_white'
                                                    },
                                                    me.processMyLabel2({
                                                        xtype: 'label',
                                                        margin: '0 0 0 10'
                                                    }),
                                                    {
                                                        xtype: 'image',
                                                        margin: '0 0 0 5',
                                                        imgCls: 'ipm_map_blue'
                                                    },
                                                    me.processMyLabel3({
                                                        xtype: 'label',
                                                        margin: '0 0 0 10'
                                                    }),
                                                    {
                                                        xtype: 'image',
                                                        margin: '0 0 0 5',
                                                        imgCls: 'ipm_map_red'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                id: 'monitor_ipm_map_con',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch',
                                                    pack: 'center'
                                                },
                                                listeners: {
                                                    render: 'onContainerAfterRender'
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

    processMyLabel: function(config) {
        config.text = __zen('allow') + "(Online) : ";

        return config;
    },

    processMyLabel1: function(config) {
        config.text = __zen('allow') + "(Offline) : ";

        return config;
    },

    processMyLabel2: function(config) {
        config.text = __zen('detect') + " : ";

        return config;
    },

    processMyLabel3: function(config) {
        config.text = __zen('deny') + " : ";

        return config;
    },

    onChk_btnChange: function(button) {
        var timeout = Ext.getCmp('timeout');
        var me = Ext.getCmp('NFW2_monitor_ipm_map');
        var time = Ext.getCmp('update_time').text.split(' ');

        if(button.state === true){
            me.get_ipm_map();
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

    onMonitor_ipm_network_gridCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        for(var i = 0;i<255;i++){
            Ext.getCmp('map_col_con'+i).setStyle('background','#fff');
        }

        if(record.data.show === true){
            Ext.getCmp('NFW2_monitor_ipm_map').sel_network = record.data.network;

            var _params = {
                func_name : Ext.encode('get_ipm_monitor_map'),
                args : Ext.encode(record.data.network)
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'execKctrlFunc',
                _params,

                function(response){
                    hideLoadMask();
                    if(response !== null){
                        var record2 = [];
                        for(var i in response){
                            for(var j in response[i]){
                                if(Array.isArray(response[i][j])){
                                    record2.push({
                                        'ip' : response[i][j][0],
                                        'mac' : response[i][j][1],
                                        'action' : i
                                    });
                                }
                                else if(typeof response[i][j] === 'string'){
                                    record2.push({
                                        'ip' : response[i][j],
                                        'mac' : "",
                                        'action' : i
                                    });
                                }
                            }
                        }

                        Ext.data.StoreManager.lookup('store_ipm_monitor_map_ip_list').loadData(record);

                        for(var k in record2){
                            var temp =  record2[k].ip.split('.');
                            if(record2[k].action === "off_accept"){
                                Ext.getCmp('map_col_con'+temp[3]).setStyle('background','url(../images/sign_bar_gray.png) repeat-x');
                                Ext.getCmp('map_col_con_set'+temp[3]).set_value = record2[k];
                                Ext.getCmp('map_col_con_set'+temp[3]).chk_network = record;
                            }
                            else if(record2[k].action === "on_accept"){
                                Ext.getCmp('map_col_con'+temp[3]).setStyle('background','url(../images/sign_bar_g.png) repeat-x');
                                Ext.getCmp('map_col_con_set'+temp[3]).set_value = record2[k];
                                Ext.getCmp('map_col_con_set'+temp[3]).chk_network = record;
                            }
                            else if(record2[k].action === "deny"){
                                Ext.getCmp('map_col_con'+temp[3]).setStyle('background','url(../images/sign_bar_r.png) repeat-x');
                                Ext.getCmp('map_col_con_set'+temp[3]).set_value = record2[k];
                                Ext.getCmp('map_col_con_set'+temp[3]).chk_network = record;
                            }
                            else if(record2[k].action === "detect"){
                                Ext.getCmp('map_col_con'+temp[3]).setStyle('background','url(../images/sign_bar_b.png) repeat-x');
                                Ext.getCmp('map_col_con_set'+temp[3]).set_value = record2[k];
                                Ext.getCmp('map_col_con_set'+temp[3]).chk_network = record;
                            }
                        }
                        Ext.getCmp('map_table_con').chk_network = record;
                    }
                }
            );
        }
    },

    onMonitor_ipm_map_hostAfterRender: function(component, eOpts) {
        // var win = Ext.create('NFW2.view.monitor_ipm_allowhost_con',{

        // });
        // component.add(win);
    },

    onContainerAfterRender: function(component, eOpts) {
        var table_con = Ext.create('Ext.container.Container', {
            id : 'map_table_con',
            flex: 1,
            padding : 10
        });

        Ext.suspendLayouts();
        var wid = 0;
        var margin = 0;

        if(Ext.getCmp('NFW2_monitor_ipm_map').getWidth() > 1100){
            wid = (1100-190)/15;
            margin = ((Ext.getCmp('NFW2_monitor_ipm_map').getWidth()-985)/14)/2;
        }
        else{
            wid = (Ext.getCmp('NFW2_monitor_ipm_map').getWidth()-190)/15;
            margin = 5;
        }


        for(var i=0;i<17;i++){
            var row_con = Ext.create('Ext.container.Container', {
                id : 'map_row_con'+i,
                layout: {
                    type: 'hbox',
                    align: 'stretch',
                    pack: 'center'
                },
                flex:1
            });
            for(var j=0;j<15;j++){
                var num = (15*i)+j;
                var lb_text;
                if(num === 0){ lb_text = "-"; }
                else{ lb_text = String(num); }
                var col_con = Ext.create('Ext.container.Container', {
                    items:[
                        {
                            xtype:'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'center'
                            },
                            height: 15,
                            items: [
                                {
                                    xtype:'label',
                                    text: lb_text
                                }
                            ]
                        },
                        {
                            xtype:'container',
                            id : 'map_col_con'+num,
                            width: wid-2,
                            height: 14,
                            style: 'border-width:1px;border-style:solid;border-color:#aaa;'
                        }
                    ],
                    style: 'border-width:1px;border-style:solid;border-color:#e1e1e1;margin-left:'+margin+';margin-right:'+margin+';margin-top:2;background-color:white;',
                    width: wid,
                    id : 'map_col_con_set'+num,
                    box_num : num,
                    height: 31,
                    listeners: {
                        render : function(component, eOpts){
                            component.getEl().on('click', function(eOpts) {
                                if(Ext.getCmp('NFW2_monitor_ipm_map').sel_network !== ""){
                                    var win = Ext.create('NFW2.view.monitor_ipm_allowhost_con',{
                                        modal : true,
                                        set_value : this.set_value,
                                        chk_network : this.chk_network,
                                        box_num : this.box_num
                                    });

                                    win.show();
                                }
                            }, component);
                        }
                    }
                });
                row_con.add(col_con);
            }

            table_con.add(row_con);
        }
        Ext.resumeLayouts();

        component.add(table_con);
    },

    onNFW2_monitor_ipm_mapAfterRender: function(component, eOpts) {
        var me = this;
        me.sel_network = "";

        me.get_ipm_map();
    },

    onNFW2_monitor_ipm_mapBeforeDestroy: function(component, eOpts) {
        var me = this;
        clearInterval(Ext.getCmp('timeout').interval);
    },

    get_ipm_map: function() {
        var _params = {
            func_name : Ext.encode('get_ipm_monitor_status')
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
                        if(response !== null && data.list.length !== 0){
                            var record = [];
                            var data_cnt = 0;
                            for(var i in response){
                                record.push({
                                    'show' : response[i].show,
                                    'iface' : data.list[data_cnt].interface,
                                    'network' : response[i].ip,
                                    'accept' : response[i].accept,
                                    'detect' : response[i].detect,
                                    'deny' : response[i].deny,
                                    'action' : data.list[data_cnt].action,
                                    'scan_time' : data.list[data_cnt].cycle,
                                    'scan_cnt' : data.list[data_cnt].count,
                                    'desc' : data.list[data_cnt].desc,
                                    'obj_name' : data.list[data_cnt].name
                                });
                                data_cnt++;
                            }

                            Ext.data.StoreManager.lookup('store_ipm_monitor_map_list').loadData(record);

                            if(Ext.getCmp('NFW2_monitor_ipm_map').sel_network !== ""){
                                var _params = {
                                    func_name : Ext.encode('get_ipm_monitor_map'),
                                    args : Ext.encode(Ext.getCmp('NFW2_monitor_ipm_map').sel_network)
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
                    }
                );
            }
        );
    }

});