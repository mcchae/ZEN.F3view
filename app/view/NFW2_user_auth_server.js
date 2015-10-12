
Ext.define('NFW2.view.NFW2_user_auth_server', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_user_auth_server',

    requires: [
        'NFW2.view.NFW2_user_auth_serverViewModel',
        'Ext.button.Button',
        'Ext.toolbar.Separator',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Display',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'nfw2_user_auth_server'
    },
    cls: 'zen_body',
    id: 'NFW2_user',
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
                    xtype: 'combobox',
                    id: 'ser_type',
                    width: 200,
                    labelSeparator: ' ',
                    labelWidth: 70,
                    value: 'name',
                    editable: false,
                    displayField: 'name',
                    valueField: 'val',
                    bind: {
                        fieldLabel: '{search_type}'
                    }
                },
                {
                    xtype: 'textfield',
                    id: 'user_search',
                    enableKeyEvents: true,
                    listeners: {
                        keydown: 'onUser_searchKeydown'
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
                    id: 'b_tbl_reset',
                    iconCls: 'ic_reset',
                    listeners: {
                        click: 'onButtonClick3'
                    }
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'container',
            padding: '0 20 0 0',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1
                },
                {
                    xtype: 'displayfield',
                    id: 'disp_user_server_total',
                    labelAlign: 'right',
                    labelSeparator: ' ',
                    fieldCls: 'tot_info_bg',
                    bind: {
                        fieldLabel: '{obj_count}'
                    }
                }
            ]
        },
        {
            xtype: 'gridpanel',
            id: 'grid_list',
            columnLines: true,
            store: 'store_user_auth_server_list',
            columns: [
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(store.currentPage === 1){
                            store.data.items[rowIndex].data['_num'] = rowIndex+1;
                            return rowIndex + 1;
                        }else{
                            store.data.items[rowIndex].data['_num'] = rowIndex + ((store.currentPage-1) *store.pageSize) + 1;
                            return rowIndex + ((store.currentPage-1) *store.pageSize) + 1;
                        }
                    },
                    width: 60,
                    align: 'center',
                    dataIndex: '_num',
                    text: 'N'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'name',
                    flex: 1,
                    bind: {
                        text: '{obj_name}'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value.toUpperCase();
                    },
                    dataIndex: 'stype',
                    flex: 1,
                    bind: {
                        text: '{server_type}'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'addr',
                    flex: 1,
                    bind: {
                        text: '{server_address}'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'port',
                    flex: 1,
                    bind: {
                        text: '{connection_port}'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'desc',
                    flex: 1,
                    bind: {
                        text: '{desc}'
                    }
                }
            ],
            selModel: {
                selType: 'checkboxmodel'
            },
            listeners: {
                celldblclick: 'onGrid_listCellDblClick'
            },
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    displayInfo: true,
                    store: 'store_user_auth_server_list'
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender'
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        me.onButtonClick3();

        if(Ext.getCmp("grid_list").getStore().getTotalCount() >= me.count){
            Ext.MessageBox.alert(__weguardia,ValidMaxCnt(me.count));
            return false;
        }

        var win = Ext.create('NFW2.view.win_user_server');
        win.show();
    },

    onButtonClick1: function(button, e, eOpts) {
        var grid = Ext.getCmp("grid_list");
        var grid_chk = grid.getSelectionModel().getSelection();

        if(grid_chk.length === 0){
            Ext.Msg.alert(__weguardia,get_msg("sel_del"));
            return false;
        }else{
            Ext.MessageBox.confirm(__weguardia,get_msg("conf_del"),function(btn){
                if(btn === "yes"){
                    var del = [];
                    for(var i=0; i<grid_chk.length; i++){
                        del[i] = grid_chk[i].data._id;
                    }

                    var key_list = del;

                    var _param = {
                        basename: Ext.encode("user_awareness_auth_server"),
                        ids: Ext.encode(key_list)
                    };
                    console.log(_param);
                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'delListTypeObj',
                        _param,
                        function(response){

                            if(response.fail_total > 0){

                                var ar_use = [];
                                for(var i in response.fail_list){
                                    if(response.fail_list[i].reason === "in_use")
                                        ar_use.push(response.fail_list[i].name);
                                }
                                var in_use = ar_use.join(" , ");
                                Ext.Msg.alert(__weguardia,get_msg('err_objdel')+in_use);
                            }
                            Ext.getCmp("NFW2_user").onButtonClick3();
                        }
                    );
                }
            });

        }
    },

    onUser_searchKeydown: function(textfield, e, eOpts) {
        if(e.getCharCode()===13){
            var type = Ext.getCmp("ser_type").getValue();
            var search = Ext.getCmp("user_search");

            var _store = Ext.data.StoreManager.lookup("store_user_auth_server_list");
            eval("_store.getProxy().setExtraParam('cond',Ext.encode({'"+type+"':{'$regex':'.*'+search.getValue()+'.*','$options':'imax'}}));");
            _store.currentPage = 1;
            _store.load();

            Ext.getCmp("b_tbl_reset").show();
        }
    },

    onButtonClick2: function(button, e, eOpts) {
        var type = Ext.getCmp("ser_type").getValue();
        var search = Ext.getCmp("user_search");

        if(search.getValue()===""){ return false; }

        var _store = Ext.data.StoreManager.lookup("store_user_auth_server_list");
        eval("_store.getProxy().setExtraParam('cond',Ext.encode({'"+type+"':{'$regex':'.*'+search.getValue()+'.*','$options':'imax'}}));");
        _store.currentPage = 1;
        _store.load();

        Ext.getCmp("b_tbl_reset").show();
    },

    onButtonClick3: function(button, e, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_user_auth_server_list");
        _store.getProxy().setExtraParam('cond',Ext.encode({}));
        _store.currentPage = 1;
        Ext.getCmp("NFW2_user").store_load();

        Ext.getCmp("b_tbl_reset").hide();
        Ext.getCmp("ser_type").reset();
        Ext.getCmp("user_search").reset();
    },

    onGrid_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('NFW2.view.win_user_server',{
            'edit': 'edit',
            'num': record.data['_num'],
            'record': record.data
        });
        win.show();
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        var _params = {
            filename: Ext.encode('/proc/ferret/datasheet/ua_server')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            _params,
            function(response){
                me.count = response[0];
            }
        );

        var record = Ext.create('Ext.data.Store',{
            data: [
                { 'name':__zen('obj_name'),'val':'name' },
                { 'name':__zen('server_type'),'val':'stype' },
                { 'name':__zen('server_address'),'val':'addr' },
                { 'name':__zen('connection_port'),'val':'port' },
                { 'name':__zen('desc'),'val':'desc' }
            ],
            fields: ['name','val']
        });

        Ext.getCmp("ser_type").bindStore(record);

        var store = Ext.data.StoreManager.lookup("store_user_auth_server_list");
        store.getProxy().setExtraParam('cond',Ext.encode({}));
        store.currentPage = 1;
        me.store_load();
    },

    store_load: function() {
        var me = this;
        var store = Ext.data.StoreManager.lookup("store_user_auth_server_list");
        store.load(function(records,options,success){
            var tot = options.getProxy().getReader().rawData.retval;
            Ext.getCmp("disp_user_server_total").setValue(tot.total+'/'+tot.max_count);

            hideLoadMask();
            setTimeout(function(){ me.setWidth('100%'); },100);
        });
    }

});