
Ext.define('NFW2.view.NFW2_log_realtime', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_log_realtime',

    requires: [
        'NFW2.view.NFW2_log_realtimeViewModel',
        'Ext.button.Button',
        'Ext.button.Segmented',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table'
    ],

    viewModel: {
        type: 'nfw2_log_realtime'
    },
    cls: 'zen_body',
    id: 'NFW2_log',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            cls: 'dv_monitor',
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
                            id: 'tab_sys',
                            enableToggle: true,
                            pressed: true,
                            value: 'system',
                            bind: {
                                text: '{system}'
                            }
                        },
                        {
                            id: 'tab_net',
                            value: 'network',
                            bind: {
                                text: '{network}'
                            }
                        },
                        {
                            id: 'tab_fw',
                            value: 'fw',
                            bind: {
                                text: '{fw}'
                            }
                        },
                        {
                            id: 'tab_vpn',
                            value: 'vpn',
                            bind: {
                                text: '{ipsec_vpn}'
                            }
                        },
                        {
                            id: 'tab_ssl',
                            value: 'ssl',
                            bind: {
                                text: '{ssl_vpn}'
                            }
                        },
                        {
                            id: 'tab_ips',
                            value: 'ips',
                            bind: {
                                text: '{ips}'
                            }
                        },
                        {
                            id: 'tab_ddos',
                            value: 'ddos',
                            bind: {
                                text: '{ddos}'
                            }
                        },
                        {
                            id: 'tab_av',
                            value: 'av',
                            bind: {
                                text: '{av}'
                            }
                        },
                        {
                            id: 'tab_as',
                            value: 'as',
                            bind: {
                                text: '{as}'
                            }
                        }
                    ],
                    listeners: {
                        toggle: 'onSegmentedbuttonToggle'
                    }
                }
            ]
        },
        {
            xtype: 'gridpanel',
            id: 'grid_list',
            margin: '10 0 0 0',
            columnLines: true,
            store: 'store_monitor_log_realtime',
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'timestamp',
                    flex: 1,
                    bind: {
                        text: '{generate_time}'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var sport = (record.data.sport !== 0)?"("+record.data.sport+")":'';

                        return value+sport;
                    },
                    dataIndex: 'src',
                    flex: 1,
                    bind: {
                        text: '{src_ports}'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var dport = (record.data.dport !== 0)?"("+record.data.dport+")":'';

                        return value+dport;
                    },
                    dataIndex: 'dest',
                    flex: 1,
                    bind: {
                        text: '{dest_ports}'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'desc',
                    flex: 2,
                    bind: {
                        text: '{desc}'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender',
        beforedestroy: 'onNFW2_logBeforeDestroy'
    },

    onChk_btnChange: function(button) {
        var me = Ext.getCmp('NFW2_log');
        me.state = (button.state===true)?'on':'off';
        me._menu = null;

        if(button.state === true){

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'startUDPServer',
                {},
                function(response){

                }
            );
            me.get_log_realtime();
        }else{
            clearTimeout(me.timeout);

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'stopUDPServer',
                {},
                function(response){

                }
            );
        }
    },

    onSegmentedbuttonToggle: function(segmentedbutton, button, isPressed, eOpts) {
        var me = Ext.getCmp('NFW2_log');
        me.state = 'off';
        clearTimeout(me.timeout);

        if(Ext.getCmp("chk_btn").state === true){
            me.state = 'on';
            me.get_log_realtime();
        }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        me.state = 'off';
        //라이선스에 따라 화면에 노출 여부 결정
        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_license_info',
            {},
            function(response){

                hideLoadMask();
                //상태가 정식 || 만료 일 경우에만 화면에 표시
                if(response.flag === '1' || response.flag === '4'){

                    if(response.system_module.fw !== 'on'){
                        Ext.getCmp('tab_fw').hide();
                    }

                    if(response.system_module.ipsec !== 'on'){
                        Ext.getCmp('tab_vpn').hide();
                    }

                    if(response.system_module.ssl !== 'on'){
                        Ext.getCmp('tab_ssl').hide();
                    }

                    if(response.system_module.ddos !== 'on'){
                        Ext.getCmp('tab_ddos').hide();
                    }

                    if(response.system_module.ips !== 'on'){
                        Ext.getCmp('tab_ips').hide();
                    }

                    if(response.system_module.as !== 'on'){
                        Ext.getCmp('tab_as').hide();
                    }

                    if(response.system_module.av !== 'on'){
                        Ext.getCmp('tab_av').hide();
                    }
                }
            }
        );
    },

    onNFW2_logBeforeDestroy: function(component, eOpts) {
        var me = Ext.getCmp('NFW2_log');
        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'stopUDPServer',
            {},
            function(response){

            }
        );

        me.state = 'off';
        clearTimeout(me.timeout);
        Ext.data.StoreManager.lookup("store_monitor_log_realtime").removeAll();
    },

    get_log_realtime: function() {
        var me = Ext.getCmp("NFW2_log");
        var _end_ts = me.end_ts;
        var _menu = me._menu;

        if(me.state === 'off'){ return false; }

        var menu = ['sys','net','fw','vpn','ssl','ips','ddos','av','as'];
        for(var i=0; i<menu.length; i++){
            if(Ext.getCmp('tab_'+menu[i]).pressed){ var name = Ext.getCmp('tab_'+menu[i]).value; break; }
        }
        me._menu = name;

        if(_menu !== name){
            Ext.data.StoreManager.lookup("store_monitor_log_realtime").removeAll();

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'startRealTimeLog',
                {
                    'schname': Ext.encode(name)
                },
                function(response){
                    setTimeout(function(){ getLog(); },1000);
                }
            );
        }else{
            getLog();
        }

        function getLog(){

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getRealTimeLog',
                {},
                function(response){
                    console.log(response);

                    var _store = Ext.data.StoreManager.lookup("store_monitor_log_realtime");

                    if(response !== undefined){
                        var record = [];
                        for(var i=0; i<response.length; i++){
                            record.push({
                                'timestamp':Ext.Date.format(new Date(response[i].timestamp.datetime*1000),'Y-m-d H:i:s')+'.'+response[i].timestamp.microtime,
                                'src':response[i].sip,
                                'dest':response[i].dip,
                                'desc':response[i].description,
                                'sport':response[i].sport,
                                'dport':response[i].dport
                            });
                        }

                        record.reverse();
                        var len = _store.data.items.length+record.length;

                        if(len >= 500){
                            _store.removeAt(499,len);
                        }

                        _store.insert(0,record);

                        if(len > 0){
                            Ext.getCmp("grid_list").getView().focusRow(_store.data.items[0]);
                            me.setWidth('100%');
                        }
                    }
                    if(me.state === 'off'){ return false; }
                    me.timeout = setTimeout(function(){
                        me.get_log_realtime();
                    },2000);
                }
            );
        }
    }

});