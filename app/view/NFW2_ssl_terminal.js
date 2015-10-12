
Ext.define('NFW2.view.NFW2_ssl_terminal', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_ssl_terminal',

    requires: [
        'NFW2.view.NFW2_ssl_terminalViewModel',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.toolbar.Separator',
        'Ext.form.field.Text',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'nfw2_ssl_terminal'
    },
    cls: 'zen_body',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'tabpanel',
                        cls: 'zen_tab',
                        plain: true,
                        items: [
                            {
                                xtype: 'panel',
                                id: 'tab_allow',
                                padding: 10,
                                bind: {
                                    title: '{auth_device}'
                                },
                                dockedItems: [
                                    {
                                        xtype: 'toolbar',
                                        dock: 'top',
                                        cls: 'zen_toolbar',
                                        items: [
                                            {
                                                xtype: 'button',
                                                iconCls: 'ic_del',
                                                bind: {
                                                    text: '{del}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick3'
                                                }
                                            },
                                            {
                                                xtype: 'tbseparator'
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 's_active',
                                                fieldLabel: '',
                                                enableKeyEvents: true,
                                                listeners: {
                                                    keydown: 'onS_activeKeydown',
                                                    render: 'onS_activeRender'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                iconCls: 'ic_ser',
                                                listeners: {
                                                    click: 'onButtonClick4'
                                                }
                                            },
                                            {
                                                xtype: 'tbseparator'
                                            },
                                            {
                                                xtype: 'button',
                                                hidden: true,
                                                id: 'a_reset',
                                                iconCls: 'ic_reset',
                                                listeners: {
                                                    click: 'onReset1Click'
                                                }
                                            }
                                        ]
                                    }
                                ],
                                items: [
                                    {
                                        xtype: 'gridpanel',
                                        id: 'grid_allow',
                                        margin: '5 0 0 0',
                                        title: '',
                                        columnLines: true,
                                        store: 'store_monitor_ssl_terminal_list',
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'user_name',
                                                flex: 1,
                                                bind: {
                                                    text: '{name}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'login_id',
                                                flex: 1,
                                                bind: {
                                                    text: '{user_id}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'depart',
                                                flex: 1,
                                                bind: {
                                                    text: '{depart}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'hardware_serial',
                                                flex: 1.5,
                                                bind: {
                                                    text: '{hardware_serial}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'trust_ip',
                                                flex: 1.5,
                                                bind: {
                                                    text: '{remote_address}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(value === 0){
                                                        return '<img src="../images/b_off.png" />';
                                                    }else{
                                                        return '<img src="../images/b_on.png" />';
                                                    }
                                                },
                                                width: 70,
                                                align: 'center',
                                                dataIndex: 'active_state',
                                                bind: {
                                                    text: '{active}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return '<img src="../images/arrow_curve.png" />';
                                                },
                                                width: 80,
                                                align: 'center',
                                                dataIndex: 'device_change_state',
                                                bind: {
                                                    text: '{terminal_replace}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'device_key',
                                                flex: 1.5,
                                                bind: {
                                                    text: '{device_indent}'
                                                }
                                            }
                                        ],
                                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                                            selType: 'checkboxmodel'
                                        }),
                                        dockedItems: [
                                            {
                                                xtype: 'pagingtoolbar',
                                                dock: 'bottom',
                                                width: 360,
                                                displayInfo: true,
                                                store: 'store_monitor_ssl_terminal_list'
                                            }
                                        ],
                                        listeners: {
                                            cellclick: 'onGrid_allowCellClick'
                                        }
                                    }
                                ],
                                listeners: {
                                    activate: 'onTab_activeActivate'
                                }
                            },
                            {
                                xtype: 'panel',
                                id: 'tab_unallow',
                                padding: 10,
                                bind: {
                                    title: '{no_auth_device}'
                                },
                                dockedItems: [
                                    {
                                        xtype: 'toolbar',
                                        dock: 'top',
                                        cls: 'zen_toolbar',
                                        items: [
                                            {
                                                xtype: 'button',
                                                componentCls: 'btn_auth',
                                                bind: {
                                                    text: '{allow}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick1'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                iconCls: 'ic_del',
                                                bind: {
                                                    text: '{del}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick'
                                                }
                                            },
                                            {
                                                xtype: 'tbseparator'
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 's_unactive',
                                                fieldLabel: '',
                                                enableKeyEvents: true,
                                                listeners: {
                                                    keydown: 'onS_unactiveKeydown',
                                                    render: 'onS_unactiveRender'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                iconCls: 'ic_ser',
                                                listeners: {
                                                    click: 'onButtonClick2'
                                                }
                                            },
                                            {
                                                xtype: 'tbseparator'
                                            },
                                            {
                                                xtype: 'button',
                                                hidden: true,
                                                id: 'ua_reset',
                                                iconCls: 'ic_reset',
                                                listeners: {
                                                    click: 'onResetClick'
                                                }
                                            }
                                        ]
                                    }
                                ],
                                items: [
                                    {
                                        xtype: 'gridpanel',
                                        id: 'grid_unallow',
                                        margin: '5 0 0 0',
                                        title: '',
                                        columnLines: true,
                                        store: 'store_monitor_ssl_terminal_list',
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'user_name',
                                                flex: 1,
                                                bind: {
                                                    text: '{name}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'login_id',
                                                flex: 1,
                                                bind: {
                                                    text: '{user_id}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'depart',
                                                flex: 1,
                                                bind: {
                                                    text: '{depart}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'mac',
                                                text: 'MAC',
                                                flex: 1
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'hardware_serial',
                                                flex: 1.5,
                                                bind: {
                                                    text: '{hardware_seriel}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'trust_ip',
                                                flex: 1.5,
                                                bind: {
                                                    text: '{remote_address}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return '<img src="../images/b_on.gif" />';
                                                },
                                                width: 60,
                                                align: 'center',
                                                dataIndex: 'allow_state',
                                                bind: {
                                                    text: '{allow}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'device_key',
                                                flex: 1,
                                                bind: {
                                                    text: '{device_indent}'
                                                }
                                            }
                                        ],
                                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                                            selType: 'checkboxmodel'
                                        }),
                                        listeners: {
                                            cellclick: 'onGrid_listCellClick'
                                        },
                                        dockedItems: [
                                            {
                                                xtype: 'pagingtoolbar',
                                                dock: 'bottom',
                                                width: 360,
                                                displayInfo: true,
                                                store: 'store_monitor_ssl_terminal_list'
                                            }
                                        ]
                                    }
                                ],
                                listeners: {
                                    activate: 'onTab_unactiveActivate'
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

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        var _params = {
            basename: Ext.encode('client_mgt_config'),
            cond: Ext.encode({'allow_state':1})
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _params,
            function(response){

                var _store = Ext.data.StoreManager.lookup("store_monitor_ssl_terminal_list");

                if(response.total > 0){
                    Ext.getCmp("tab_allow").show();
                    _store.getProxy().setExtraParam('cond',Ext.encode({'allow_state':1}));
                }else{
                    Ext.getCmp("tab_unallow").show();
                    _store.getProxy().setExtraParam('cond',Ext.encode({'allow_state':0}));
                }
                _store.currentPage = 1;
                _store.load(function(){
                    hideLoadMask();
                    setTimeout(function(){ me.setWidth('100%'); },100);
                });
            }
        );
    },

    onButtonClick3: function(button, e, eOpts) {
        var grid = Ext.getCmp("grid_allow");
        var grid_chk = grid.getSelectionModel().getSelection();

        if(grid_chk.length === 0){

            Ext.Msg.alert(__weguardia,get_msg('sel_del'));
            return false;
        }else{

            Ext.MessageBox.confirm(__weguardia,get_msg("conf_del"),function(btn){
                if(btn === "yes"){

                    var obj = [];

                    for(var i=0; i<grid_chk.length; i++){

                        obj.push(grid_chk[i].data._id);
                    }

                    var _params = {
                        basename: Ext.encode('client_mgt_config'),
                        ids: Ext.encode(obj)
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'delListTypeObj',
                        _params,
                        function(response){

                            Ext.data.StoreManager.lookup("store_monitor_ssl_terminal_list").load();
                        }
                    );
                }
            });
        }
    },

    onS_activeKeydown: function(textfield, e, eOpts) {
        if(e.getCharCode() === 13){
            var search = textfield.getValue();

            if(search === ""){ return false; }

            var store = Ext.data.StoreManager.lookup("store_monitor_ssl_terminal_list");
            store.getProxy().setExtraParam('cond',Ext.encode({"$or":[{"user_name":search},{"login_id":search}]}));
            store.loadPage(1);

            Ext.getCmp("a_reset").show();
        }
    },

    onS_activeRender: function(component, eOpts) {
        component.emptyText = __zen('name_user_id');
        component.applyEmptyText();
    },

    onButtonClick4: function(button, e, eOpts) {
        var search = Ext.getCmp("s_active").getValue();

        if(search === ""){ return false; }

        var store = Ext.data.StoreManager.lookup("store_monitor_ssl_terminal_list");
        store.getProxy().setExtraParam('cond',Ext.encode({"$or":[{"user_name":search},{"login_id":search}]}));
        store.loadPage(1);

        Ext.getCmp("a_reset").show();
    },

    onReset1Click: function(button, e, eOpts) {
        var store = Ext.data.StoreManager.lookup("store_monitor_ssl_terminal_list");
        store.getProxy().setExtraParam('cond',Ext.encode({'active_state':1}));
        store.loadPage(1);
    },

    onGrid_allowCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 6){

            var active = (record.data.active_state===0)?1:0;

            var _params = {
                basename: Ext.encode('client_mgt_config'),
                obj: Ext.encode({'_id':record.data._id, 'active_state':active}),
                update: Ext.encode(true)
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'setListTypeObj',
                _params,
                function(response){

                    Ext.data.StoreManager.lookup("store_monitor_ssl_terminal_list").load();
                }
            );

        }else if(cellIndex === 7){

            var _params = {
                basename: Ext.encode('client_mgt_config'),
                obj: Ext.encode({'_id':record.data._id, 'allow_state':0, 'device_key':'', 'device_change_state':1}),
                update: Ext.encode(true)
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'setListTypeObj',
                _params,
                function(response){
                    Ext.Msg.alert("WeGuardia™ ZEN",get_msg('msg_ssl_terminal'));
                    Ext.data.StoreManager.lookup("store_monitor_ssl_terminal_list").load();
                }
            );
        }
    },

    onTab_activeActivate: function(component, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_monitor_ssl_terminal_list");
        _store.getProxy().setExtraParam('cond',Ext.encode({'allow_state':1}));
        _store.loadPage(1);
    },

    onButtonClick1: function(button, e, eOpts) {
        var grid = Ext.getCmp("grid_unallow");
        var grid_chk = grid.getSelectionModel().getSelection();

        if(grid_chk.length === 0){

            Ext.Msg.alert(__weguardia,get_msg('sel_active'));
            return false;
        }else{

            var obj = [];

            for(var i=0; i<grid_chk.length; i++){

                obj.push(grid_chk[i].data._id);
            }

            var _params = {
                basename: Ext.encode('client_mgt_config'),
                id_info: Ext.encode({
                    'ids': obj
                }),
                setting_obj: Ext.encode({
                    'allow_state': 1,
                    'active_state': 1
                })
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'setListTypeObjs',
                _params,
                function(response){

                    Ext.data.StoreManager.lookup("store_monitor_ssl_terminal_list").load();
                }
            );
        }
    },

    onButtonClick: function(button, e, eOpts) {
        var grid = Ext.getCmp("grid_unallow");
        var grid_chk = grid.getSelectionModel().getSelection();

        if(grid_chk.length === 0){

            Ext.Msg.alert(__weguardia,get_msg('sel_del'));
            return false;
        }else{

            Ext.MessageBox.confirm(__weguardia,get_msg("conf_del"),function(btn){
                if(btn === "yes"){

                    var obj = [];

                    for(var i=0; i<grid_chk.length; i++){

                        obj.push(grid_chk[i].data._id);
                    }

                    var _params = {
                        basename: Ext.encode('client_mgt_config'),
                        ids: Ext.encode(obj)
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'delListTypeObj',
                        _params,
                        function(response){

                            Ext.data.StoreManager.lookup("store_monitor_ssl_terminal_list").load();
                        }
                    );
                }
            });
        }
    },

    onS_unactiveKeydown: function(textfield, e, eOpts) {
        if(e.getCharCode() === 13){
            var search = textfield.getValue();

            if(search === ""){ return false; }

            var store = Ext.data.StoreManager.lookup("store_monitor_ssl_terminal_list");
            store.getProxy().setExtraParam('cond',Ext.encode({"$or":[{"user_name":search},{"login_id":search}]}));
            store.loadPage(1);

            Ext.getCmp("ua_reset").show();
        }
    },

    onS_unactiveRender: function(component, eOpts) {
        component.emptyText = __zen('name_user_id');
        component.applyEmptyText();
    },

    onButtonClick2: function(button, e, eOpts) {
        var search = Ext.getCmp("s_unallow").getValue();

        if(search === ""){ return false; }

        var store = Ext.data.StoreManager.lookup("store_monitor_ssl_terminal_list");
        store.getProxy().setExtraParam('cond',Ext.encode({"$or":[{"user_name":search},{"login_id":search}]}));
        store.loadPage(1);

        Ext.getCmp("ua_reset").show();
    },

    onResetClick: function(button, e, eOpts) {
        var store = Ext.data.StoreManager.lookup("store_monitor_ssl_terminal_list");
        store.getProxy().setExtraParam('cond',Ext.encode({'active_state':0}));
        store.loadPage(1);

        Ext.getCmp("ua_reset").hide();
    },

    onGrid_listCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex !== 7){ return false; }

        var _params = {
            basename: Ext.encode('client_mgt_config'),
            obj: Ext.encode({'_id':record.data._id, 'allow_state':1, 'active_state':1}),
            update: Ext.encode(true)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setListTypeObj',
            _params,
            function(response){
                Ext.data.StoreManager.lookup("store_monitor_ssl_terminal_list").load();
            }
        );
    },

    onTab_unactiveActivate: function(component, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_monitor_ssl_terminal_list");
        _store.getProxy().setExtraParam('cond',Ext.encode({'allow_state':0}));
        _store.loadPage(1);
    }

});