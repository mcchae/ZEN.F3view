
Ext.define('NFW2.view.NFW2_monitor_ipsec_tunnel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_ipsec_tunnel',

    requires: [
        'NFW2.view.NFW2_monitor_ipsec_tunnelViewModel',
        'Ext.form.Panel',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'nfw2_monitor_ipsec_tunnel'
    },
    cls: 'zen_body',
    id: 'NFW2_ipsec',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender',
        beforedestroy: 'onNFW2_ipsecBeforeDestroy'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        id: 'fm_ipsec',
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
                                            Ext.getCmp('NFW2_ipsec').get_monitor_ipsec();
                                        },
                                        cls: 'dv_timecount',
                                        html: '5',
                                        id: 'timeout'
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
                                                        checkchange: 'onMenucheckitemCheckChange'
                                                    }
                                                }),
                                                me.processMyCheckItem4({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange2'
                                                    }
                                                }),
                                                me.processMyCheckItem1({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange1'
                                                    }
                                                }),
                                                me.processMyCheckItem2({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange11'
                                                    }
                                                }),
                                                me.processMyCheckItem3({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    listeners: {
                                                        checkchange: 'onMenucheckitemCheckChange111'
                                                    }
                                                })
                                            ]
                                        }
                                    },
                                    {
                                        xtype: 'label',
                                        cls: 'lb_m_none',
                                        hidden: true,
                                        id: 'tunnel_data_error',
                                        bind: {
                                            text: '{tunnel_msg1}'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                margin: '10 0 0 10',
                                items: [
                                    {
                                        xtype: 'button',
                                        cls: 'btn_b',
                                        iconCls: 'icb_filter',
                                        bind: {
                                            text: '{filter_apply}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick2'
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
                                            click: 'onButtonClick3'
                                        }
                                    },
                                    {
                                        xtype: 'label',
                                        cls: 'x-field x-form-item-label x-form-item-label-default',
                                        id: 'vpn_info',
                                        style: 'float:right'
                                    }
                                ]
                            },
                            {
                                xtype: 'gridpanel',
                                cls: 'tbl_fw',
                                margin: '5 0 0 0',
                                columnLines: true,
                                enableColumnHide: false,
                                store: 'store_monitor_ipsec_tunnel',
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        items: [
                                            {
                                                xtype: 'container',
                                                layout: 'hbox',
                                                flex: 1,
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        id: 's_name',
                                                        flex: 1,
                                                        margin: '0 0 0 -9'
                                                    }
                                                ]
                                            }
                                        ],
                                        dataIndex: 'your_ip',
                                        flex: 1,
                                        bind: {
                                            text: '{target_device}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'subnet',
                                        flex: 1.5,
                                        bind: {
                                            text: '{sechost}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        items: [
                                            {
                                                xtype: 'container',
                                                layout: 'hbox',
                                                flex: 1,
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        id: 's_inter',
                                                        flex: 1,
                                                        margin: '0 0 0 -9'
                                                    }
                                                ]
                                            }
                                        ],
                                        width: 110,
                                        dataIndex: 'my_interface',
                                        bind: {
                                            text: '{inter}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        text: 'EN',
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return commify(value);
                                                },
                                                height: 25,
                                                width: 100,
                                                sortable: true,
                                                align: 'center',
                                                dataIndex: 'en_byte',
                                                text: 'Bytes'
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return commify(value);
                                                },
                                                height: 25,
                                                width: 100,
                                                sortable: true,
                                                align: 'center',
                                                dataIndex: 'en_bps',
                                                text: 'BPS'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        text: 'DE',
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return commify(value);
                                                },
                                                height: 25,
                                                width: 100,
                                                sortable: true,
                                                align: 'center',
                                                dataIndex: 'de_byte',
                                                text: 'Bytes'
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return commify(value);
                                                },
                                                height: 25,
                                                width: 100,
                                                sortable: true,
                                                align: 'center',
                                                dataIndex: 'de_bps',
                                                text: 'BPS'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var time = value.split(":");
                                            if(Number(time[0]) < 1){
                                                metaData.style = "color:red";
                                            }
                                            var _time = '';
                                            for(var i=0; i<time.length; i++){
                                                _time += (i===0)?'':':';
                                                _time += (time[i].length === 1)?'0'+time[i]:time[i];
                                            }
                                            return _time;
                                        },
                                        align: 'center',
                                        dataIndex: 'time',
                                        flex: 1,
                                        bind: {
                                            text: '{expiration_dates}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return (value===1)?__zen('normals'):__zen('unnormal');
                                        },
                                        width: 100,
                                        align: 'center',
                                        dataIndex: 'status',
                                        bind: {
                                            text: '{tunnel_state}'
                                        }
                                    }
                                ],
                                viewConfig: {
                                    getRowClass: function(record, rowIndex, rowParams, store) {
                                        if(record.get("status") === 0){

                                            Ext.Function.defer(function(){
                                                this.removeRowCls(rowIndex, 'x-grid-row-alt');
                                            },100, this);

                                            return "stOff";
                                        }
                                    },
                                    loadMask: false
                                },
                                dockedItems: [
                                    {
                                        xtype: 'pagingtoolbar',
                                        dock: 'bottom',
                                        width: 360,
                                        displayInfo: true,
                                        store: 'store_monitor_ipsec_tunnel',
                                        listeners: {
                                            beforechange: 'onPagingtoolbarBeforeChange'
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
        config.text = '5 '+__zen('sec');

        return config;
    },

    processMyCheckItem4: function(config) {
        config.text = '10 '+__zen('sec');

        return config;
    },

    processMyCheckItem1: function(config) {
        config.text = '20 '+__zen('sec');

        return config;
    },

    processMyCheckItem2: function(config) {
        config.text = '30 '+__zen('sec');

        return config;
    },

    processMyCheckItem3: function(config) {
        config.text = '60 '+__zen('sec');

        return config;
    },

    onChk_btnChange: function(button) {
        var timeout = Ext.getCmp('timeout');
        var me = Ext.getCmp('NFW2_ipsec');
        var time = Ext.getCmp('update_time').text.split(' ');

        if(button.state === true){
            Ext.data.StoreManager.lookup("store_monitor_ipsec_tunnel").currentPage = 1;
            me.get_monitor_ipsec();
            monitor_timeout();
        }else{
            clearInterval(timeout.interval);
            Ext.getCmp('timeout').setHtml(Number(time[0]));
        }
    },

    onMenucheckitemCheckChange: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        Ext.getCmp('timeout').setHtml(5);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange2: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        Ext.getCmp('timeout').setHtml(10);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange1: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        Ext.getCmp('timeout').setHtml(20);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange11: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        Ext.getCmp('timeout').setHtml(30);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onMenucheckitemCheckChange111: function(menucheckitem, checked, eOpts) {
        if(!checked){ return false; }
        Ext.getCmp('timeout').setHtml(60);

        clearInterval(Ext.getCmp('timeout').interval);

        if(Ext.getCmp('chk_btn').state === true){ monitor_timeout(); }
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = Ext.getCmp("NFW2_ipsec");

        me.btn_filter = true;
    },

    onButtonClick3: function(button, e, eOpts) {
        Ext.getCmp("fm_ipsec").getForm().reset();
        var me = Ext.getCmp("NFW2_ipsec");

        me.btn_filter = false;
    },

    onPagingtoolbarBeforeChange: function(pagingtoolbar, page, eOpts) {
        this.get_monitor_ipsec(page);

        return false;
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        hideLoadMask();
        me.get_monitor_ipsec();
    },

    onNFW2_ipsecBeforeDestroy: function(component, eOpts) {
        clearInterval(Ext.getCmp('timeout').interval);
        Ext.data.StoreManager.lookup("store_monitor_ipsec_tunnel").removeAll();
    },

    get_monitor_ipsec: function(start) {
        var me = this;
        var g_count = 0;

        var name = '0', inter = '0';
        if(me.btn_filter === true){
            name = (Ext.getCmp("s_name").getValue()==='')?'0':Ext.getCmp("s_name").getValue();
            inter = (Ext.getCmp("s_inter").getValue()==='')?'0':Ext.getCmp("s_inter").getValue();
        }

        var _store = Ext.data.StoreManager.lookup("store_monitor_ipsec_tunnel");
        var cp = (start)?start:_store.currentPage;
        _store.getProxy().setExtraParam('args',Ext.encode({'ip':name,'interface':inter}));

        _store.currentPage = cp;
        _store.load({callback : function(records, options, success) {
            if (success) {
                if(records.length === 0){
                    Ext.getCmp("tunnel_data_error").show();
                }else{
                    Ext.getCmp("tunnel_data_error").hide();
                }

                setTimeout(function(){ me.setWidth('100%'); },100);

                var opt = options._response.retval;

                Ext.getCmp("vpn_info").setText(__zen('normals')+' : '+opt.active+' / '+__zen('unnormal')+' : '+opt.inactive+' / '+__zen('max_tunnel')+' : '+opt.max_tunnel);
            }
        }});
    }

});