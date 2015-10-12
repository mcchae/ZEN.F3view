
Ext.define('NFW2.view.NFW2_network_alg_telnet', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.NFW2_network_alg_telnet',

    requires: [
        'NFW2.view.NFW2_network_alg_telnetViewModel',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.selection.CheckboxModel',
        'Ext.grid.column.Action',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'nfw2_network_alg_telnet'
    },
    defaultListenerScope: true,
    cls: 'zen_body',
    id: 'NFW2_network_alg_telnet',

    items: [
        {
            xtype: 'form',
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'container',
                    id: 'telnet_Btn_con',
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
                    id: 'telnet_grid',
                    margin: '5 0 0 0',
                    header: false,
                    title: 'My Grid Panel',
                    columnLines: true,
                    store: 'store_alg_telnet_proxy',
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
                            dataIndex: 'public_server_ip',
                            text: 'Public Telnet Server IP',
                            flex: 0.2
                        },
                        {
                            xtype: 'gridcolumn',
                            id: 'grid_realServer',
                            dataIndex: 'real_server_ip',
                            text: 'Real Telnet Server IP',
                            flex: 0.2
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'port_num',
                            flex: 0.1,
                            bind: {
                                text: '{port_num}'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'time_out',
                            flex: 0.1,
                            bind: {
                                text: '{time_over}'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'max_sessions',
                            flex: 0.1,
                            bind: {
                                text: '{max_connect}'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(value==='accept'){
                                    return __zen('allow');
                                }else{
                                    return __zen('deny');
                                }
                            },
                            dataIndex: 'upload',
                            flex: 0.05,
                            bind: {
                                text: '{upload}'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(value==='accept'){
                                    return __zen('allow');
                                }else{
                                    return __zen('deny');
                                }
                            },
                            dataIndex: 'download',
                            flex: 0.05,
                            bind: {
                                text: '{download}'
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
                                    getTip: function(v, metadatam, r) {
                                        return (r.get('enable') === 'on')? __zen("toggle_on"):__zen("toggle_off");
                                    },
                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                        var main = Ext.getCmp('NFW2_network_alg_telnet');

                                        var me = this;

                                        var use = (record.data.enable ==="on")?"off":"on";

                                        var obj = {
                                            '_id': record.data._id,
                                            'enable': use
                                        };

                                        var _params = {
                                            basename: Ext.encode("alg_telnet_proxy"),
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

                                    },
                                    getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                        return (r.get('enable') === 'on')? "b_sq_on":"b_sq_off";
                                    }
                                }
                            ]
                        }
                    ],
                    selModel: {
                        selType: 'checkboxmodel'
                    },
                    listeners: {
                        celldblclick: 'onStatic_gridCellDblClick'
                    },
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            doRefresh: function() {
                                var me = this,
                                    current = me.store.currentPage;

                                if (me.fireEvent('beforechange', me, current) !== false) {
                                    //me.store.load(current, me.tbl());
                                    me.store.currentPage = current;
                                    var main = Ext.getCmp('NFW2_network_alg_telnet');

                                    main.get_store();
                                }

                            },
                            moveNext: function() {
                                var me = this,
                                    store = me.store,
                                    total = me.getPageData().pageCount,
                                    next = store.currentPage + 1;

                                if (next <= total) {
                                    if (me.fireEvent('beforechange', me, next) !== false) {

                                        //store.nextPage();
                                        store.getProxy().setExtraParam('start',Ext.encode((next-1)*100));
                                        store.currentPage = next;
                                        var main = Ext.getCmp('NFW2_network_alg_telnet');

                                        main.get_store();

                                        return true;
                                    }
                                }
                                return false;
                            },
                            movePrevious: function() {
                                var me = this,
                                    store = me.store,
                                    prev = store.currentPage - 1;

                                if (prev > 0) {
                                    if (me.fireEvent('beforechange', me, prev) !== false) {

                                        //store.previousPage();
                                        store.getProxy().setExtraParam('start',Ext.encode((prev-1)*100));
                                        store.currentPage = prev;
                                        var main = Ext.getCmp('NFW2_network_alg_telnet');

                                        main.get_store();

                                        return true;
                                    }
                                }
                                return false;
                            },
                            moveFirst: function() {
                                if (this.fireEvent('beforechange', this, 1) !== false){
                                    //this.store.loadPage(1, me.tbl());
                                    this.store.getProxy().setExtraParam('start',Ext.encode(0));
                                    this.store.currentPage = 1;

                                    var main = Ext.getCmp('NFW2_network_alg_telnet');

                                    main.get_store();
                                    return true;
                                }
                                return false;
                            },
                            moveLast: function() {
                                var me = this,
                                    last = me.getPageData().pageCount;

                                if (me.fireEvent('beforechange', me, last) !== false) {
                                    me.store.getProxy().setExtraParam('start',Ext.encode((last-1)*100));
                                    me.store.currentPage = last;
                                    var main = Ext.getCmp('NFW2_network_alg_telnet');

                                    main.get_store();


                                    return true;
                                }
                                return false;
                            },
                            dock: 'bottom',
                            id: 'toolbar2',
                            width: 360,
                            displayInfo: true,
                            store: 'store_alg_telnet_proxy'
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onNFW2_network_alg_ttelnetAfterRender'
    },

    onBtn_addClick: function(button, e, eOpts) {
         var win = Ext.create('NFW2.view.win_network_alg_telnet',{
            modal : true
        });

        win.show();
    },

    onBtn_delClick: function(button, e, eOpts) {
        var me = this;

        var tbl = Ext.getCmp("telnet_grid");
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
                        basename : Ext.encode('alg_telnet_proxy'),
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

    onStatic_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0 || cellIndex === 7){ return false; }

        var win = Ext.create('NFW2.view.win_network_alg_telnet',{
            edit : "edit",
            modal : true,
            record : record,
            index : Number(rowIndex)+1
        });

        win.show();
    },

    onNFW2_network_alg_ttelnetAfterRender: function(component, eOpts) {
        var me = this;
        me.get_store();
    },

    get_store: function() {
        var me = this;
        var store = Ext.data.StoreManager.lookup('store_alg_telnet_proxy');
        store.load(function(resopnse){
            hideLoadMask();
            setTimeout(function(){ me.setWidth('100%'); },100);
        });
    }

});