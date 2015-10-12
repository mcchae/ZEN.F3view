
Ext.define('NFW2.view.NFW2_network_router_vrrp', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_router_vrrp',

    requires: [
        'NFW2.view.NFW2_network_router_vrrpViewModel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel'
    ],

    viewModel: {
        type: 'nfw2_network_router_vrrp'
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
                    cls: '',
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
                    cls: '',
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
        afterrender: 'onPanelAfterRender'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'gridpanel',
                        id: 'tbl_list',
                        margin: '5 0 0 0',
                        title: '',
                        columnLines: true,
                        store: 'store_network_router_vrrp_list',
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
                                dataIndex: 'vid',
                                flex: 1,
                                bind: {
                                    text: '{group_id}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    return value.interface;
                                },
                                dataIndex: 'setting',
                                flex: 1,
                                bind: {
                                    text: '{inter}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'priority',
                                flex: 1,
                                bind: {
                                    text: '{priority_level}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'period',
                                flex: 1,
                                bind: {
                                    text: '{period}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'vip',
                                flex: 1,
                                bind: {
                                    text: '{group_ip}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    if(value.mode === "backup"){
                                        return value.mode.substring(0,1).toUpperCase()+value.mode.substring(1)+" - Boost up : "+record.data.boostup;
                                    }else{
                                        return value.mode.substring(0,1).toUpperCase()+value.mode.substring(1);
                                    }
                                },
                                dataIndex: 'setting',
                                flex: 1,
                                bind: {
                                    text: '{operate_mode}'
                                }
                            }
                        ],
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                            selType: 'checkboxmodel'
                        }),
                        listeners: {
                            celldblclick: 'onTbl_listCellDblClick'
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
        var win = Ext.create("NFW2.view.win_router_vrrp");
        win.show();
    },

    onButtonClick2: function(button, e, eOpts) {
        var tbl = Ext.getCmp("tbl_list");
        var grid_chk = tbl.getSelectionModel().getSelection();

        var me = this;

        if(grid_chk.length === 0){
            Ext.Msg.alert(__weguardia,get_msg("sel_del"));
            return false;
        }else{
            Ext.MessageBox.confirm(__weguardia,get_msg("conf_del"),function(btn){
                if(btn === "yes"){
                    var del = new Array();
                    for(var i=0; i<grid_chk.length; i++){
                        del[i] = grid_chk[i].data.vid;
                    }

                    var vid_list = del;

                    var _param = {
                        vid_list : Ext.encode(vid_list)
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'del_network_router_vrrp',
                        _param,
                        function(response){

                            Ext.data.StoreManager.lookup('store_network_router_vrrp_list').load();
                        }
                    );
                }
            });

        }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        Ext.data.StoreManager.lookup("store_network_router_vrrp_list").load(function(){
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

    onTbl_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create("NFW2.view.win_router_vrrp",{
            edit: "edit",
            record: record
        });
        win.show();
    }

});