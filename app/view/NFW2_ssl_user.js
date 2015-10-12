
Ext.define('NFW2.view.NFW2_ssl_user', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_ssl_user',

    requires: [
        'NFW2.view.NFW2_ssl_userViewModel',
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
        type: 'nfw2_ssl_user'
    },
    cls: 'zen_body',
    id: 'NFW2_user',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender'
    },
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
                    id: 'search',
                    fieldLabel: '',
                    enableKeyEvents: true,
                    listeners: {
                        keydown: 'onSearchKeydown',
                        render: 'onSearchRender'
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
                    id: 'reset',
                    iconCls: 'ic_reset',
                    listeners: {
                        click: 'onResetClick'
                    }
                }
            ]
        }
    ],

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
                        store: 'store_sslplus_user_list',
                        columns: [
                            {
                                xtype: 'gridcolumn',
                                width: 60,
                                align: 'center',
                                dataIndex: '_num',
                                text: 'N'
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
                                dataIndex: 'user_name',
                                flex: 1,
                                bind: {
                                    text: '{name}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'title',
                                flex: 1,
                                bind: {
                                    text: '{title}'
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
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var name = (value===5)?"user_lock":"user_unlock";

                                    metaData.style = "height:29px";

                                    return '<img src="../images/'+name+'.jpg" />';
                                },
                                width: 50,
                                align: 'center',
                                dataIndex: 'login_fail_cnt',
                                bind: {
                                    text: '{locked}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var me = Ext.getCmp("NFW2_user");

                                    var val =  eval('me.d_id["'+record.data.login_id+'"]');

                                    return (val)?val.trust_ip:'';
                                },
                                dataIndex: 'trust_ip',
                                flex: 1,
                                bind: {
                                    text: '{recent_remote_ip}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var me = Ext.getCmp("NFW2_user");

                                    var val =  eval('me.d_id["'+record.data.login_id+'"]');

                                    return (val)?val.login_date:'';
                                },
                                dataIndex: 'login_date',
                                flex: 1,
                                bind: {
                                    text: '{recent_login}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var me = Ext.getCmp("NFW2_user");

                                    var val =  eval('me.d_id["'+record.data.login_id+'"]');

                                    return (val)?val.logout_date:'';
                                },
                                dataIndex: 'logout_date',
                                flex: 1,
                                bind: {
                                    text: '{recent_logout}'
                                }
                            }
                        ],
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                            selType: 'checkboxmodel'
                        }),
                        listeners: {
                            celldblclick: 'onGrid_listCellDblClick',
                            cellclick: 'onGrid_listCellClick'
                        },
                        dockedItems: [
                            {
                                xtype: 'pagingtoolbar',
                                dock: 'bottom',
                                width: 360,
                                displayInfo: true,
                                store: 'store_sslplus_user_list'
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
        var store = Ext.data.StoreManager.lookup("store_sslplus_user_list");
        store.getProxy().setExtraParam('cond',Ext.encode({}));

        var me = Ext.getCmp("NFW2_user");

        var _params = {
            filename: Ext.encode('/proc/ferret/datasheet/ssl_user')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            _params,
            function(resonse){
                me.count = resonse[0];
            }
        );

        var _params = {
            basename: Ext.encode('ssl_connected_user_config')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _params,
            function(response){

                response = response.list;

                var d_id = {};

                for(var i=0; i<response.length; i++){
                    eval('d_id.'+response[i].login_id+' = { "trust_ip":"'+response[i].trust_ip+'", "login_date":"'+response[i].login_date+'", "logout_date":"'+response[i].logout_date+'" }');
                }

                me.d_id = d_id;

                store.currentPage = 1;
                store.load(function(){
                    hideLoadMask();
                    setTimeout(function(){ me.setWidth('100%'); },100);
                });
            }
        );
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;
        var _store = Ext.data.StoreManager.lookup("store_sslplus_user_list");

        if(_store.getTotalCount() > me.count){
            Ext.MessageBox.alert(__weguardia,ValidMaxCnt(me.count));
            return false;
        }

        var win = Ext.create('NFW2.view.win_ssl_user');
        win.show();
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var grid = Ext.getCmp("grid_list");
        var grid_chk = grid.getSelectionModel().getSelection();

        if(grid_chk.length === 0){
            Ext.Msg.alert(__weguardia,get_msg("sel_del"));
            return false;
        }

        Ext.MessageBox.confirm(__weguardia,get_msg("conf_del"),function(btn){
            if(btn === "yes"){
                var del = [];
                for(var i=0; i<grid_chk.length; i++){

                    del.push(grid_chk[i].data._id);

                }

                var _params = {

                    basename : Ext.encode("ssl_user_config"),
                    ids : Ext.encode(del),
                    renum_info : Ext.encode({'fieldname':'_num'})
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'delListTypeObj',
                    _params,
                    function(reesponse){

                        Ext.data.StoreManager.lookup("store_sslplus_user_list").loadPage(1);
                    }
                );
            }
        });
    },

    onSearchKeydown: function(textfield, e, eOpts) {
        if(e.getCharCode() === 13){
            if(textfield.getValue()===""){ return false; }

            var store = Ext.data.StoreManager.lookup("store_sslplus_user_list");
            store.getProxy().setExtraParam('cond',Ext.encode({"$or":[{"user_name":textfield.getValue()},{"login_id":textfield.getValue()}]}));
            store.loadPage(1);

            Ext.getCmp('reset').show();
        }
    },

    onSearchRender: function(component, eOpts) {
        component.emptyText = __zen('name_user_id');
        component.applyEmptyText();
    },

    onButtonClick2: function(button, e, eOpts) {
        if(Ext.getCmp("search").getValue()===""){ return false; }

        var store = Ext.data.StoreManager.lookup("store_sslplus_user_list");
        store.getProxy().setExtraParam('cond',Ext.encode({"$or":[{"user_name":Ext.getCmp('search').getValue()},{"login_id":Ext.getCmp('search').getValue()}]}));
        store.loadPage(1);

        Ext.getCmp('reset').show();
    },

    onResetClick: function(button, e, eOpts) {
        var store = Ext.data.StoreManager.lookup("store_sslplus_user_list");
        store.getProxy().setExtraParam('cond',Ext.encode({}));
        store.loadPage(1);

        button.hide();
        Ext.getCmp('search').reset();
    },

    onGrid_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('NFW2.view.win_ssl_user',{
            edit: "edit",
            record: record.data,
            login_id : record.data.login_id
        });

        win.show();
    },

    onGrid_listCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex !== 6){ return false; }

        var obj = {
            _id: record.data._id,
            login_fail_cnt: (record.data.login_fail_cnt===5)?0:5
        };

        var _params = {
            basename: Ext.encode('ssl_user_config'),
            obj: Ext.encode(obj),
            update: Ext.encode(true)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setListTypeObj',
            _params,
            function(response){

                Ext.data.StoreManager.lookup("store_sslplus_user_list").load();
            }
        );
    }

});