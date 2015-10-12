
Ext.define('NFW2.view.NFW2_monitor_ssl_tunnel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_ssl_tunnel',

    requires: [
        'NFW2.view.NFW2_monitor_ssl_tunnelViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'nfw2_monitor_ssl_tunnel'
    },
    cls: 'zen_body',
    id: 'ssl_tunnel',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender',
        beforedestroy: 'onSsl_tunnelBeforeDestroy'
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
                                            Ext.getCmp("ssl_tunnel").get_monitor_ssl_tunnel();
                                        },
                                        cls: 'dv_timecount',
                                        html: 2,
                                        id: 'timeout',
                                        width: 55
                                    },
                                    {
                                        xtype: 'label',
                                        listeners: {
                                            beforerender: 'onLabelBeforeRender'
                                        }
                                    },
                                    {
                                        xtype: 'label',
                                        cls: 'lb_m_none',
                                        hidden: true,
                                        id: 'ssl_data_error',
                                        margin: '0 0 0 10',
                                        listeners: {
                                            beforerender: 'onLabelBeforeRender1'
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
                                                me.processMyCheckItem({
                                                    xtype: 'menucheckitem',
                                                    focusable: true,
                                                    checked: true
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
                                                xtype: 'button',
                                                cls: 'btn_b',
                                                iconCls: 'icb_ser',
                                                listeners: {
                                                    click: 'onButtonClick',
                                                    beforerender: 'onButtonBeforeRender'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'gridpanel',
                                id: 'grid_list',
                                margin: '5 0 0 0',
                                title: '',
                                columnLines: true,
                                store: 'store_monitor_ssl_tunnel_list',
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "cursor:pointer";

                                            return '<img src="../images/b_drop.png" />';
                                        },
                                        align: 'center',
                                        dataIndex: 'string',
                                        flex: 0.5,
                                        listeners: {
                                            beforerender: 'onGridcolumnBeforeRender6'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'tunnel_id',
                                        flex: 0.5,
                                        listeners: {
                                            beforerender: 'onGridcolumnBeforeRender'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'login_id',
                                        flex: 1,
                                        listeners: {
                                            beforerender: 'onGridcolumnBeforeRender1'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'user_name',
                                        flex: 1,
                                        listeners: {
                                            beforerender: 'onGridcolumnBeforeRender2'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        hidden: true,
                                        dataIndex: 'rent_ip',
                                        flex: 1,
                                        listeners: {
                                            beforerender: 'onGridcolumnBeforeRender4'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'trust_ip',
                                        flex: 1,
                                        listeners: {
                                            beforerender: 'onGridcolumnBeforeRender3'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'login_date',
                                        flex: 1.5,
                                        listeners: {
                                            beforerender: 'onGridcolumnBeforeRender5'
                                        }
                                    }
                                ],
                                viewConfig: {
                                    emptyText: 'No Records...'
                                },
                                dockedItems: [
                                    {
                                        xtype: 'pagingtoolbar',
                                        dock: 'bottom',
                                        width: 360,
                                        displayInfo: true,
                                        store: 'store_monitor_ssl_tunnel_list',
                                        listeners: {
                                            beforechange: 'onPagingtoolbarBeforeChange'
                                        }
                                    }
                                ],
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
        config.text = '2 '+__zen('sec');

        return config;
    },

    onChk_btnChange: function(button) {
        var timeout = Ext.getCmp('timeout');
        var me = Ext.getCmp('ssl_tunnel');

        if(button.state === true){
            me.get_monitor_ssl_tunnel();
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

    onLabelBeforeRender1: function(component, eOpts) {
        component.text = __zen('ssl_tunnel_msg');
    },

    onButtonClick: function(button, e, eOpts) {
        var grid = Ext.getCmp("grid_list");

        if(grid.getStore().data.length < 1){

            return false;
        }

        var _params = {
            func_name: Ext.encode('mod_ssl_auth_do_integrity')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'execKctrlFunc',
            _params,
            function(response){

                if(response){
                    Ext.Msg.alert(__weguardia,get_msg('msg_ssl_integrity'));
                }else{
                    Ext.Msg.alert(__weguardia,__zen('integrity_chk_fail'));
                }
            }
        );
    },

    onButtonBeforeRender: function(component, eOpts) {
        component.setText(__zen('integrity_chk'));
    },

    onGridcolumnBeforeRender6: function(component, eOpts) {
        component.setText(__zen('connect_cancel'));
    },

    onGridcolumnBeforeRender: function(component, eOpts) {
        component.setText(__zen('tunnel_id'));
    },

    onGridcolumnBeforeRender1: function(component, eOpts) {
        component.setText(__zen('login_id'));
    },

    onGridcolumnBeforeRender2: function(component, eOpts) {
        component.setText(__zen('user_name'));
    },

    onGridcolumnBeforeRender4: function(component, eOpts) {
        component.setText(__zen('rent_ip'));
    },

    onGridcolumnBeforeRender3: function(component, eOpts) {
        component.setText(__zen('remote_ip'));
    },

    onGridcolumnBeforeRender5: function(component, eOpts) {
        component.setText(__zen('login_time'));
    },

    onPagingtoolbarBeforeChange: function(pagingtoolbar, page, eOpts) {
        this.get_monitor_ssl_tunnel(page);

        return false;
    },

    onGrid_listCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex !== 0){ return false; }

        if(Ext.getCmp("chk_btn").state){
            Ext.getCmp("chk_btn").toggle();
        }

        var me = this;

        var _params = {
            func_name: Ext.encode('mod_ssl_auth_force_logout'),
            args: Ext.encode(record.data.login_id)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'execKctrlFunc',
            _params,
            function(response){

                if(response){
                    me.get_monitor_ssl_tunnel();
                }
            }
        );
    },

    onPanelAfterRender: function(component, eOpts) {
        Ext.data.StoreManager.lookup("store_monitor_ssl_tunnel_list").currentPage = 1;
        var me = this;

        me.get_monitor_ssl_tunnel();
    },

    onSsl_tunnelBeforeDestroy: function(component, eOpts) {
        clearInterval(Ext.getCmp('timeout').interval);
        Ext.data.StoreManager.lookup("store_monitor_ssl_tunnel_list").removeAll();
    },

    get_monitor_ssl_tunnel: function(start) {
        var me = this;

        var store = Ext.data.StoreManager.lookup("store_monitor_ssl_tunnel_list");
        var cp = (start)?start:store.currentPage;
        store.currentPage = cp;
        store.load(function(){
            hideLoadMask();
            if(store.data.items.length === 0){
                Ext.getCmp("ssl_data_error").show();
            }else{
                Ext.getCmp("ssl_data_error").hide();
            }
        });
    }

});