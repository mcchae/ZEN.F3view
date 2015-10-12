
Ext.define('NFW2.view.NFW2_network_dns_cache', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_dns_cache',

    requires: [
        'NFW2.view.NFW2_network_dns_cacheViewModel',
        'Ext.form.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel'
    ],

    viewModel: {
        type: 'nfw2_network_dns_cache'
    },
    cls: 'zen_body',
    id: 'NFW2_network_dns_cache',
    width: 900,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onCacheAfterRender'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        flex: 1,
                        border: false,
                        id: 'form_group',
                        titleCollapse: true,
                        items: [
                            {
                                xtype: 'container',
                                items: [
                                    {
                                        xtype: 'toolbar',
                                        cls: 'zen_toolbar',
                                        items: [
                                            {
                                                xtype: 'button',
                                                id: 'addBtn',
                                                iconCls: 'ic_add',
                                                bind: {
                                                    text: '{add}'
                                                },
                                                listeners: {
                                                    click: 'onBtn_add'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                id: 'delBtn',
                                                iconCls: 'ic_del',
                                                bind: {
                                                    text: '{del}'
                                                },
                                                listeners: {
                                                    click: 'onBtn_del'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'gridpanel',
                                cls: 'in_grid',
                                id: 'cache_list',
                                margin: '5 0 0 0',
                                scrollable: true,
                                header: false,
                                title: 'My Grid Panel',
                                columnLines: true,
                                store: 'store_network_dnscache_list',
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'Num',
                                        width: 60,
                                        align: 'center',
                                        dataIndex: '_num',
                                        text: 'N'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'list_interface',
                                        dataIndex: 'interface',
                                        flex: 1,
                                        bind: {
                                            text: '{inter}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return record.data.ip + "/" + record.data.netmask;
                                        },
                                        id: 'list_ip',
                                        dataIndex: 'ip',
                                        flex: 1,
                                        bind: {
                                            text: '{ip_mask}'
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
                                                    return (r.get('chk_use') === 'on')? "ON":"OFF";
                                                },
                                                handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                    var dns_cache = Ext.getCmp('NFW2_network_dns_cache');
                                                    var me = this;

                                                    var chk_use = (record.data.chk_use ==="on")?"off":"on";

                                                    var obj = {
                                                        '_id': record.data._id,
                                                        'chk_use': chk_use
                                                    };

                                                    var _params = {
                                                        basename: Ext.encode("dns_cache"),
                                                        obj : Ext.encode(obj),
                                                        update : Ext.encode(true)
                                                    };

                                                    request_helper.xmlrpc_call_JsonP(
                                                    'ftuctrl',
                                                    'setListTypeObj',
                                                    _params,
                                                    function(response){
                                                        dns_cache.get_dnscache();
                                                    }
                                                    );
                                                },
                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                    return (r.get('chk_use') === 'on')? "b_sq_on":"b_sq_off";
                                                }
                                            }
                                        ]
                                    }
                                ],
                                viewConfig: {
                                    getRowClass: function(record, rowIndex, rowParams, store) {
                                        if(record.get("chk_use") === "off"){

                                            Ext.Function.defer(function(){
                                                this.removeRowCls(rowIndex, 'x-grid-row-alt');
                                            },100, this);

                                            return "stOff";
                                        }
                                    }
                                },
                                selModel: Ext.create('Ext.selection.CheckboxModel', {
                                    selType: 'checkboxmodel',
                                    mode: 'SIMPLE'
                                }),
                                listeners: {
                                    celldblclick: 'onCache_listCellDblClick'
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

    onBtn_add: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_cache',{
            modal : true
        });

        win.show();
    },

    onBtn_del: function(button, e, eOpts) {
        var me = this;

        var tbl = Ext.getCmp("cache_list");
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
                        basename : Ext.encode('dns_cache'),
                        ids : Ext.encode(del),
                        renum_info : Ext.encode({'fieldname':'_num'})
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
                            me.get_dnscache();
                        }
                    );
                }
            });
        }


    },

    onCache_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;

        if(cellIndex === 0){ return false; }

        var win = Ext.create('NFW2.view.win_cache',{
            cid : record.data._id,
            edit : "edit",
            modal : true,
            index : rowIndex
        });

        win.show();
    },

    onCacheAfterRender: function(component, eOpts) {
        var me = this;

        var records = [];

        var _params = {

            option : Ext.encode('all')

        };

        Ext.data.JsonP.request({

            url : "/api/ftuctrl/get_pname_list",
            params : _params,
            success : function(response){
                hideLoadMask();
                setTimeout(function(){ me.setWidth('100%'); },100);
                if(response.retcode){

                    for(var i in response.retval){

                        records.push({

                            name: response.retval[i].name

                        });

                    }

                    var _store = Ext.data.StoreManager.lookup('store_interface');
                    _store.loadData(records);

                }

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

        me.get_dnscache();
    },

    get_dnscache: function() {
        var me = this;

        showLoadMask();

        var _params = {
            basename : Ext.encode('dns_cache')
        };

        var records = [];

        Ext.data.JsonP.request({
            url : "/api/ftuctrl/getObjects",
            params : _params,
            success : function(response){
                hideLoadMask();
                if(response.retcode){
                    for(var i in response.retval.list)
                        records.push({
                            '_num' : response.retval.list[i]._num,
                            '_id' : response.retval.list[i]._id,
                            'interface' : response.retval.list[i].interface,
                            'ip' : response.retval.list[i].ip,
                            'netmask' : response.retval.list[i].netmask,
                            'chk_use' : response.retval.list[i].chk_use
                        });
                }
                var _store = Ext.data.StoreManager.lookup('store_network_dnscache_list');
                _store.loadData(records);
            },
            failure : function(response){
                hideLoadMask();
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

});