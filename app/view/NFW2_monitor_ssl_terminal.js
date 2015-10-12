
Ext.define('NFW2.view.NFW2_monitor_ssl_terminal', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.form.Panel',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.field.Text',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging'
    ],

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    title: '단말 관리',
                    items: [
                        {
                            xtype: 'tabpanel',
                            plain: true,
                            items: [
                                {
                                    xtype: 'panel',
                                    id: 'tab_allow',
                                    title: '인가단말',
                                    tabConfig: {
                                        xtype: 'tab',
                                        width: 100
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '5 0 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            width: 100,
                                                            text: '삭제',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onButtonClick3,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
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
                                                            xtype: 'textfield',
                                                            id: 's_active',
                                                            fieldLabel: '',
                                                            emptyText: '이름/계정'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            margin: '0 0 0 5',
                                                            text: '검색',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onButtonClick4,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            hidden: true,
                                                            id: 'a_reset',
                                                            margin: '0 0 0 5',
                                                            text: 'Reset',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onReset1Click,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
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
                                                    text: '이름',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'login_id',
                                                    text: '계정',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'depart',
                                                    text: '부서',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'hardware_serial',
                                                    text: '하드웨어 시리얼',
                                                    flex: 1.5
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'rent_ip',
                                                    text: '원격지 IP',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'trust_ip',
                                                    text: '원격 클라이언트 IP',
                                                    flex: 1.5
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
                                                    text: '활성화'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        return '<img src="../images/arrow_curve.png" />';
                                                    },
                                                    width: 80,
                                                    align: 'center',
                                                    dataIndex: 'device_change_state',
                                                    text: '단말 교체'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'expire_time',
                                                    text: '만료 시간',
                                                    flex: 1.5
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'device_key',
                                                    text: '디바이스 고유값',
                                                    flex: 1.5
                                                }
                                            ],
                                            selModel: Ext.create('Ext.selection.CheckboxModel', {

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
                                                cellclick: {
                                                    fn: me.onGrid_allowCellClick,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ],
                                    listeners: {
                                        activate: {
                                            fn: me.onTab_activeActivate,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: 'tab_unallow',
                                    title: '비인가단말',
                                    tabConfig: {
                                        xtype: 'tab',
                                        width: 100
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '5 0 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            width: 100,
                                                            text: '허용',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onButtonClick1,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            margin: '0 0 0 5',
                                                            width: 100,
                                                            text: '삭제',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onButtonClick,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
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
                                                            xtype: 'textfield',
                                                            id: 's_unactive',
                                                            fieldLabel: '',
                                                            emptyText: '이름/계정'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            margin: '0 0 0 5',
                                                            text: '검색',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onButtonClick2,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            hidden: true,
                                                            id: 'ua_reset',
                                                            margin: '0 0 0 5',
                                                            text: 'Reset',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onResetClick,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
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
                                                    text: '이름',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'login_id',
                                                    text: '계정',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'depart',
                                                    text: '부서',
                                                    flex: 1
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
                                                    text: '하드웨어 시리얼',
                                                    flex: 1.5
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'rent_ip',
                                                    text: '원격지 IP',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'trust_ip',
                                                    text: '원격 클라이언트 IP',
                                                    flex: 1.5
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        return '<img src="../images/b_on.gif" />';
                                                    },
                                                    width: 60,
                                                    align: 'center',
                                                    dataIndex: 'allow_state',
                                                    text: '허용'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'device_key',
                                                    text: '디바이스 고유값',
                                                    flex: 1
                                                }
                                            ],
                                            selModel: Ext.create('Ext.selection.CheckboxModel', {

                                            }),
                                            listeners: {
                                                cellclick: {
                                                    fn: me.onGrid_listCellClick,
                                                    scope: me
                                                }
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
                                        activate: {
                                            fn: me.onTab_unactiveActivate,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPanelAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick3: function(button, e, eOpts) {
        var grid = Ext.getCmp("grid_allow");
        var grid_chk = grid.getSelectionModel().getSelection();

        if(grid_chk.length === 0){

            Ext.Msg.alert("",get_msg('sel_del'));
            return false;
        }else{

            Ext.MessageBox.confirm("",get_msg("conf_del"),function(btn){
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


        if(cellIndex === 7){

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

        }else if(cellIndex === 8){

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
                    Ext.Msg.alert("",get_msg('msg_ssl_terminal'));
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

            Ext.Msg.alert("",get_msg('sel_active'));
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

            Ext.Msg.alert("",get_msg('sel_del'));
            return false;
        }else{

            Ext.MessageBox.confirm("",get_msg("conf_del"),function(btn){
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
        if(cellIndex !== 8){ return false; }

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
    },

    onPanelAfterRender: function(component, eOpts) {
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
                _store.loadPage(1);
            }
        );
    }

});