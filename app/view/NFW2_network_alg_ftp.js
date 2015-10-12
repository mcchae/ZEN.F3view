
Ext.define('NFW2.view.NFW2_network_alg_ftp', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.NFW2_network_alg_ftp',

    requires: [
        'NFW2.view.NFW2_network_alg_ftpViewModel',
        'Ext.form.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.selection.CheckboxModel',
        'Ext.grid.column.Action'
    ],

    viewModel: {
        type: 'nfw2_network_alg_ftp'
    },
    defaultListenerScope: true,
    cls: 'zen_body',
    id: 'NFW2_network_alg_ftp',

    items: [
        {
            xtype: 'form',
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'container',
                    id: 'ftp_Btn_con',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'toolbar',
                            flex: 1,
                            cls: 'zen_toolbar',
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'btn_add',
                                    iconCls: 'ic_add',
                                    bind: {
                                        text: '{add}'
                                    },
                                    listeners: {
                                        click: 'onBtn_addClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'btn_del',
                                    iconCls: 'ic_del',
                                    bind: {
                                        text: '{del}'
                                    },
                                    listeners: {
                                        click: 'onBtn_delClick'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    cls: 'in_grid',
                    id: 'ftp_grid',
                    margin: '5 0 0 0',
                    header: false,
                    title: 'My Grid Panel',
                    columnLines: true,
                    store: 'store_alg_ftp_proxy',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            id: 'grid_num',
                            width: 60,
                            align: 'center',
                            dataIndex: '_num',
                            text: 'N'
                        },
                        {
                            xtype: 'gridcolumn',
                            id: 'grid_publicServer',
                            dataIndex: 'advertised_ftp_ip',
                            text: 'Public FTP Server IP',
                            flex: 0.3
                        },
                        {
                            xtype: 'gridcolumn',
                            id: 'grid_realServer',
                            dataIndex: 'real_ftp_ip',
                            text: 'Real FTP Server IP',
                            flex: 0.3
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'interface',
                            flex: 0.1,
                            bind: {
                                text: '{inter}'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'port',
                            flex: 0.1,
                            bind: {
                                text: '{port_num}'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'max_sess',
                            flex: 0.1,
                            bind: {
                                text: '{max_connect}'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(value==='0'){
                                    return __zen('nomal_gate');
                                }else{
                                    return __zen('blank_gate');
                                }
                            },
                            dataIndex: 'action',
                            flex: 0.2,
                            bind: {
                                text: '{operating_method}'
                            }
                        },
                        {
                            xtype: 'actioncolumn',
                            width: 50,
                            align: 'center',
                            bind: {
                                text: '{use}'
                            },
                            items: [
                                {
                                    getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                        return (r.get('enable') === 'on')? "b_sq_on":"b_sq_off";
                                    },
                                    getTip: function(v, metadatam, r) {
                                        return (r.get('enable') === 'on')? __zen("toggle_on"):__zen("toggle_off");
                                    },
                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                        var main = Ext.getCmp('NFW2_network_alg_ftp');

                                        var me = this;

                                        var use = (record.data.enable ==="on")?"off":"on";

                                        var obj = {
                                            '_id': record.data._id,
                                            'enable': use
                                        };

                                        var _params = {
                                            basename: Ext.encode("alg_ftp_proxy"),
                                            obj : Ext.encode(obj),
                                            update : Ext.encode(true)
                                        };

                                        request_helper.xmlrpc_call_JsonP(
                                        'ftuctrl',
                                        'setListTypeObj',
                                        _params,
                                        function(response){
                                            main.get_store();
                                        }
                                        );

                                    }
                                }
                            ]
                        }
                    ],
                    selModel: {
                        selType: 'checkboxmodel'
                    },
                    listeners: {
                        celldblclick: 'onFtp_gridCellDblClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onNFW2_network_alg_ftpAfterRender'
    },

    onBtn_addClick: function(button, e, eOpts) {
         var win = Ext.create('NFW2.view.win_network_alg_ftp',{
            modal : true
        });

        win.show();
    },

    onBtn_delClick: function(button, e, eOpts) {
        var me = this;

        var tbl = Ext.getCmp("ftp_grid");
        var tbl_sel = tbl.getSelectionModel().getSelection();

        if(tbl_sel.length === 0){
            Ext.Msg.alert("", get_msg("sel_del"));
            return false;
        }
        else{
            Ext.MessageBox.confirm("", get_msg("conf_del"),function(btn){

                if(btn === "yes"){

                    var del = new Array();
                    for(var i=0; i<tbl_sel.length; i++){
                        del.push(tbl_sel[i].data._id);
                    }

                    showLoadMask();

                    var _params = {
                        basename : Ext.encode('alg_ftp_proxy'),
                        ids : Ext.encode(del)
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'delListTypeObj',
                        _params,

                        function(response){
                            hideLoadMask();
                            Ext.Msg.show({
                                title: __weguardia,
                                width: 300,
                                msg: get_msg('msg_ok_del'),
                                buttons: Ext.Msg.OK,
                                icon: Ext.window.MessageBox.INFO
                            });
        //                     me.chk_interface("");
                            me.get_store();
                        }
                    );
                }
            });
        }
    },

    onFtp_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('NFW2.view.win_network_alg_ftp',{
            edit : "edit",
            modal : true,
            record : record,
            index : Number(rowIndex)+1
        });

        win.show();
    },

    onNFW2_network_alg_ftpAfterRender: function(component, eOpts) {
        var me = this;

        var records_type = [];

        records_type.push({
            'type' : 'ID',
            'type_value' : 'id'
        });

        records_type.push({
            'type' : 'IP',
            'type_value' : 'ip'
        });

        var _store = Ext.data.StoreManager.lookup('store_type_list');
        _store.loadData(records_type);

        var records_action = [];

        records_action.push({
            'action' : __zen('always_allow'),
            'action_value' : 'Allow'
        });

        records_action.push({
            'action' : __zen('deny'),
            'action_value' : 'Deny'
        });

        var __store = Ext.data.StoreManager.lookup('store_action_list');
        __store.loadData(records_action);

        me.chk_interface();
        me.get_store();
    },

    get_store: function() {
        var me = this;
        var store = Ext.data.StoreManager.lookup('store_alg_ftp_proxy');
        store.load(function(resopnse){
            hideLoadMask();
            setTimeout(function(){ me.setWidth('100%'); },100);
        });
    },

    chk_interface: function() {
        var _params = {
            basename : Ext.encode("alg_ftp_proxy")
        };
        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){

                var _params = {

                    option : Ext.encode('all')

                };

                        var store = Ext.data.StoreManager.lookup('store_interface');
                        var records = [];

                        //                 for(var i in response['interface']){
                        //                     records.push({
                        //                         name : response['interface'][i]
                        //                     });
                        //                 }


                        var records_use = [];
                        Ext.data.JsonP.request({
                            url : "/api/ftuctrl/get_pname_list",
                            params : _params,
                            success : function(response_int){
                                hideLoadMask();
                                records.push({
                                    name : 'all'
                                });

                                var checker;
                                for(var i in response_int.retval){

                                    records.push({
                                        name : response_int.retval[i].name
                                    });
                                    checker = 0;
                                }

                                store.loadData(records);
                            },
                            failure : function(response){
                                hideLoadMask();
                                setTimeout(function(){ me.setWidth('100%'); },100);
                                Ext.Msg.show({
                                    title : 'Error message',
                                    msg : 'Error Message',
                                    width : 300,
                                    buttons : Ext.Msg.OK,
                                    icon:Ext.window.MessageBox.INFO
                                });
                            }
                        });
                    }
                );
    }

});