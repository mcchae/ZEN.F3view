
Ext.define('NFW2.view.NFW2_network_router_checker', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_router_checker',

    requires: [
        'NFW2.view.NFW2_network_router_checkerViewModel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel'
    ],

    viewModel: {
        type: 'nfw2_network_router_checker'
    },
    cls: 'zen_body',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'top',
            cls: 'zen_toolbar',
            items: [
                {
                    xtype: 'button',
                    iconCls: 'ic_add',
                    bind: {
                        text: '{add}'
                    },
                    listeners: {
                        click: 'onButtonClick'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'ic_del',
                    bind: {
                        text: '{del}'
                    },
                    listeners: {
                        click: 'onButtonClick2'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onViewportAfterRender'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'gridpanel',
                        id: 'tbl_checker',
                        margin: '5 0 0 0',
                        bodyBorder: true,
                        header: false,
                        title: 'My Grid Panel',
                        columnLines: true,
                        store: 'store_network_router_checker_list',
                        columns: [
                            {
                                xtype: 'gridcolumn',
                                width: 60,
                                align: 'center',
                                dataIndex: 'num',
                                text: 'N'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'name',
                                flex: 1.5,
                                bind: {
                                    text: '{tag_name}'
                                }
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
                                    text: '{target_ip}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'period',
                                flex: 1,
                                bind: {
                                    text: '{trans_cycle}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    if(value.type === "non"){
                                        return msg_checker(1,record.data.pool,record.data.fail);
                                    }else{
                                        return msg_checker(2,record.data.fail);
                                    }
                                },
                                dataIndex: 'setting',
                                flex: 3,
                                bind: {
                                    text: '{decision_method}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var val = "";
                                    if(value.action == "Proxy" || value.action == "Proxy2"){
                                        val = value.action;
                                        if(record.data.mac){
                                            val = val + " (Mac : "+record.data.mac+")";
                                        }
                                    }else{
                                        val = value.action;
                                    }
                                    return val;
                                },
                                dataIndex: 'setting',
                                flex: 2,
                                bind: {
                                    text: '{operate_mode}'
                                }
                            }
                        ],
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                            selType: 'checkboxmodel'
                        }),
                        listeners: {
                            celldblclick: 'onTbl_checkerCellDblClick'
                        }
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    onButtonClick: function(button, e, eOpts) {
        var win = Ext.create("NFW2.view.win_router_checker");
        win.show();
    },

    onButtonClick2: function(button, e, eOpts) {
        var tbl = Ext.getCmp("tbl_checker");
        var grid_chk = tbl.getSelectionModel().getSelection();

        var me = this;

        if(grid_chk.length === 0){
            Ext.Msg.alert("WeGuardia™ ZEN",get_msg("sel_del"));
            return false;
        }

        Ext.MessageBox.confirm("WeGuardia™ ZEN",get_msg('conf_del'), function(btn){
            if(btn === "yes"){
                var del = new Array();
                for(var i=0; i<grid_chk.length; i++){
                    del[i] = grid_chk[i].data.name;
                }

                var tagname_list = del;

                var _param = {
                    tagname_list : Ext.encode(tagname_list)
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'del_network_router_checker',
                    _param,
                    function(response){

                        Ext.data.StoreManager.lookup('store_network_router_checker_list').load();
                    }
                );
            }
        });




    },

    onViewportAfterRender: function(component, eOpts) {
        var me = this;

        Ext.data.StoreManager.lookup("store_network_router_checker_list").load(function(){
            hideLoadMask();
            setTimeout(function(){ me.setWidth('100%'); },100);
        });

        var records = [];

        var _params = {
            option : Ext.encode('all')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_pname_list',
            _params,
            function(response){

                if(response){
                    for(var i in response){
                        records.push({
                            name: response[i].name
                        });
                    }
                }

                var _params = {
                    if_type : Ext.encode('bridge'),
                    data_type : Ext.encode('name'),
                    option : Ext.encode('used')
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'get_lname_list',
                    _params,
                    function(response){

                        if(response){
                            for(var i in response){
                                records.push({
                                    name: response[i].name
                                });
                            }
                        }

                        var _params = {
                            if_type : Ext.encode('bonding'),
                            data_type : Ext.encode('name'),
                            option : Ext.encode('used')
                        };

                        request_helper.xmlrpc_call_JsonP(
                            'ftuctrl',
                            'get_lname_list',
                            _params,
                            function(response){

                                if(response){
                                    for(var i in response){
                                        records.push({
                                            name: response[i].name
                                        });
                                    }
                                }

                                Ext.data.StoreManager.lookup('store_interface').loadData(records);
                            }
                        );
                    }
                );
            }
        );
    },

    onTbl_checkerCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create("NFW2.view.win_router_checker",{
            edit: "edit",
            record: record
        });
        win.show();
    }

});