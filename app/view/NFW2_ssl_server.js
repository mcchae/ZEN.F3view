
Ext.define('NFW2.view.NFW2_ssl_server', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_ssl_server',

    requires: [
        'NFW2.view.NFW2_ssl_serverViewModel',
        'Ext.button.Button',
        'Ext.toolbar.Separator',
        'Ext.form.field.Text',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'nfw2_ssl_server'
    },
    cls: 'zen_body',
    defaultListenerScope: true,

    dockedItems: [
        {
            xtype: 'toolbar',
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
                        click: 'onButtonClick1'
                    }
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'textfield',
                    id: 's_name',
                    width: 150,
                    fieldLabel: '',
                    enableKeyEvents: true,
                    listeners: {
                        keydown: 'onS_nameKeydown',
                        render: 'onS_nameRender'
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
                    xtype: 'textfield',
                    id: 's_ip',
                    width: 150,
                    fieldLabel: '',
                    enableKeyEvents: true,
                    listeners: {
                        keydown: 'onS_ipKeydown',
                        render: 'onS_ipRender'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'ic_ser',
                    listeners: {
                        click: 'onButtonClick3'
                    }
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'button',
                    hidden: true,
                    id: 'reset',
                    iconCls: 'ic_reset',
                    listeners: {
                        click: 'onButtonClick4'
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
                        id: 'grid_list',
                        margin: '5 0 0 0 ',
                        title: '',
                        columnLines: true,
                        store: 'store_sslplus_server_list',
                        columns: [
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    return value;
                                },
                                width: 60,
                                align: 'center',
                                dataIndex: '_num',
                                text: 'N'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'rname',
                                flex: 1,
                                bind: {
                                    text: '{name}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    return value.join("<br>");
                                },
                                dataIndex: 'ip_list',
                                flex: 3,
                                bind: {
                                    text: '{ip_end_point}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'manager',
                                flex: 1,
                                bind: {
                                    text: '{person_charge}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'update',
                                flex: 1,
                                bind: {
                                    text: '{edit_date}'
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
                                store: 'store_sslplus_server_list'
                            }
                        ],
                        listeners: {
                            celldblclick: 'onGrid_listCellDblClick'
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
        var store = Ext.data.StoreManager.lookup("store_sslplus_server_list");

        if(store.data.length >= 256){
            Ext.MessageBox.alert("WeGuardia™ ZEN",ValidMaxCnt(256));
            return false;
        }

        var win = Ext.create('NFW2.view.win_ssl_server');
        win.show();
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var grid = Ext.getCmp("grid_list");
        var grid_chk = grid.getSelectionModel().getSelection();

        if(grid_chk.length === 0){
            Ext.Msg.alert("WeGuardia™ ZEN",get_msg("sel_del"));
            return false;
        }

        Ext.MessageBox.confirm("WeGuardia™ ZEN",get_msg("conf_del"),function(btn){
            if(btn === "yes"){
                var del = [];
                for(var i=0; i<grid_chk.length; i++){

                    del.push(grid_chk[i].data._id);

                }

                var _params = {

                    basename : Ext.encode("server_access_config"),
                    ids : Ext.encode(del),
                    renum_info : Ext.encode({'fieldname':'_num'})
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'delListTypeObj',
                    _params,
                    function(reesponse){

                        Ext.data.StoreManager.lookup("store_sslplus_server_list").loadPage(1);
                    }
                );
            }
        });
    },

    onS_nameKeydown: function(textfield, e, eOpts) {
        if(e.getCharCode() === 13){
            if(textfield.getValue()===""){ return false; }

            var _store = Ext.data.StoreManager.lookup("store_sslplus_server_list");
            _store.getProxy().setExtraParam('cond',Ext.encode({'rname':textfield.getValue()}));
            _store.getProxy().setExtraParam('sort_list',Ext.encode([['name',1]]));
            _store.loadPage(1);

            Ext.getCmp("reset").show();
        }
    },

    onS_nameRender: function(component, eOpts) {
        component.emptyText = __zen('name');
        component.applyEmptyText();
    },

    onButtonClick2: function(button, e, eOpts) {
        if(Ext.getCmp("s_name").getValue()===""){ return false; }

        var _store = Ext.data.StoreManager.lookup("store_sslplus_server_list");
        _store.getProxy().setExtraParam('cond',Ext.encode({'rname':Ext.getCmp("s_name").getValue()}));
        _store.getProxy().setExtraParam('sort_list',Ext.encode([['name',1]]));
        _store.loadPage(1);

        Ext.getCmp("reset").show();
    },

    onS_ipKeydown: function(textfield, e, eOpts) {
        if(e.getCharCode() === 13){
            if(textfield.getValue()===""){ return false; }

            var _store = Ext.data.StoreManager.lookup("store_sslplus_server_list");
            _store.getProxy().setExtraParam('cond',Ext.encode({'ip_list':{'$elemMatch':{'$regex':textfield.getValue()}}}));
            _store.getProxy().setExtraParam('sort_list',Ext.encode([['name',1]]));
            _store.loadPage(1);

            Ext.getCmp("reset").show();
        }
    },

    onS_ipRender: function(component, eOpts) {
        component.emptyText = __zen('ip_end_point');
        component.applyEmptyText();
    },

    onButtonClick3: function(button, e, eOpts) {
        if(Ext.getCmp("s_ip").getValue()===""){ return false; }

        var _store = Ext.data.StoreManager.lookup("store_sslplus_server_list");
        _store.getProxy().setExtraParam('cond',Ext.encode({'ip_list':{'$elemMatch':{'$regex':Ext.getCmp("s_ip").getValue()}}}));
        _store.getProxy().setExtraParam('sort_list',Ext.encode([['name',1]]));
        _store.loadPage(1);

        Ext.getCmp("reset").show();
    },

    onButtonClick4: function(button, e, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_sslplus_server_list");
        _store.getProxy().setExtraParam('cond',Ext.encode({}));
        _store.getProxy().setExtraParam('sort_list',Ext.encode([['_num',1]]));
        _store.loadPage(1);

        button.hide();
        Ext.getCmp("s_name").reset();
        Ext.getCmp("s_ip").reset();
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        var store = Ext.data.StoreManager.lookup("store_sslplus_server_list");
        store.getProxy().setExtraParam('cond',Ext.encode({}));
        store.currentPage = 1;
        store.load(function(){
            hideLoadMask();
            setTimeout(function(){ me.setWidth('100%'); },100);
        });
    },

    onGrid_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('NFW2.view.win_ssl_server',{
            edit: "edit",
            record: record.data,
            name: record.data.rname
        });
        win.show();
    }

});