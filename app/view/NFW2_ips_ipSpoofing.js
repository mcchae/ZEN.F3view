
Ext.define('NFW2.view.NFW2_ips_ipSpoofing', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_ips_ipspoofing',

    requires: [
        'NFW2.view.NFW2_ips_ipSpoofingViewModel',
        'Ext.form.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.grid.column.Action'
    ],

    viewModel: {
        type: 'nfw2_ips_ipspoofing'
    },
    cls: 'zen_body',
    id: 'NFW2_ips_ipSpoofing',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onNFW2_network_IPspoofingAfterRender'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        flex: 1,
                        id: 'spoofing_form',
                        header: false,
                        title: 'My Form',
                        items: [
                            {
                                xtype: 'container',
                                id: 'spoofing_Btn_con',
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
                                id: 'spoofing_grid',
                                margin: '5 0 0 0',
                                header: false,
                                title: 'My Grid Panel',
                                columnLines: true,
                                store: 'store_network_ipspoofing_list',
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
                                        id: 'grid_interface',
                                        minWidth: 200,
                                        dataIndex: 'interface',
                                        flex: 0.2,
                                        bind: {
                                            text: '{inter}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var me = Ext.getCmp("NFW2_ips_ipSpoofing");
                                            var d_ip = me.d_ip;

                                            if(value[0]['@cid'] === ""){ return ""; }
                                            else{ return d_ip[value[0]['@cid']].name; }
                                        },
                                        id: 'grid_ipv4',
                                        dataIndex: 'net',
                                        flex: 0.4,
                                        bind: {
                                            text: '{ipv4_local}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var me = Ext.getCmp("NFW2_ips_ipSpoofing");
                                            var d_ipv6 = me.d_ipv6;

                                            if(value[1]['@cid'] === ""){ return ""; }
                                            else{ return d_ipv6[value[1]['@cid']].name; }
                                        },
                                        id: 'grid_ipv6',
                                        dataIndex: 'net',
                                        flex: 0.4,
                                        bind: {
                                            text: '{ipv6_local}'
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
                                                    return (r.get('chk_use') === 'on')? __zen('toggle_on'):__zen('toggle_off');
                                                },
                                                handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                    var me = this;

                                                    var chk_use = (record.data.chk_use ==="on")?"off":"on";

                                                    var obj = {
                                                        '_id': record.raw._id,
                                                        'chk_use': chk_use,
                                                        'net' : record.raw.net
                                                    };

                                                    var _params = {
                                                        basename: Ext.encode("network_spoofing"),
                                                        obj : Ext.encode(obj),
                                                        update : Ext.encode(true)
                                                    };

                                                    request_helper.xmlrpc_call_JsonP(
                                                    'ftuctrl',
                                                    'setListTypeObj',
                                                    _params,
                                                    function(response){
                                                        var _store = Ext.data.StoreManager.lookup('store_network_ipspoofing_list');
                                                        _store.load();
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
                                    celldblclick: 'onSpoofing_gridCellDblClick'
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
        var win = Ext.create('NFW2.view.win_ipSpoofing',{
            modal : true
        });

        win.show();
    },

    onBtn_del: function(button, e, eOpts) {
        var me = this;

        var tbl = Ext.getCmp("spoofing_grid");
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
                        del.push(tbl_sel[i].raw._id);
                    }

                    var _params = {
                        basename : Ext.encode('network_spoofing'),
                        ids : Ext.encode(del),
                        renum_info : Ext.encode({'fieldname':'_num'})
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'delListTypeObj',
                        _params,

                        function(response){
                            Ext.Msg.show({
                                title: __weguardia,
                                width: 300,
                                msg: get_msg('msg_ok_del'),
                                buttons: Ext.Msg.OK,
                                icon: Ext.window.MessageBox.INFO
                            });

                            var _store = Ext.data.StoreManager.lookup('store_network_ipspoofing_list');
                            _store.load();
                            me.chk_interface();
                        }
                    );
                }
            });
        }
    },

    onSpoofing_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex !== 0){
            var win = Ext.create('NFW2.view.win_ipSpoofing',{
                edit : "edit",
                num : record.data['_num'],
                cid : record.data['@cid'],
                chk_use: record.data.chk_use,
                modal : true
            });
            win.show();
        }
    },

    onNFW2_network_IPspoofingAfterRender: function(component, eOpts) {
        var me = this;
        var store = Ext.data.StoreManager.lookup('store_network_ipspoofing_list');
        //store.load();

        var records_ip = [];

        var _params = {
            basename : Ext.encode('object_ip_address'),
            limit : Ext.encode(null)
        };


        Ext.data.JsonP.request({
            url : "/api/ftuctrl/getObjectList",
            params : _params,
            success : function(response){
                records_ip.push({
                    'name' : __zen('unused'),
                    '@cid' : 'null'
                });

                records_ip.push({
                    'name' : '--IPv4---',
                    '@cid' : 'menu'
                });

                if(response.retcode){

                    var d_ip = [];

                    for(var i in response.retval.list){

                        records_ip.push({
                            'name' : response.retval.list[i].name,
                            'num' : response.retval.list[i]['@num'],
                            'ip' : response.retval.list[i].ip,
                            'desc' : response.retval.list[i].desc,
                            '@cid' : response.retval.list[i]['@cid']
                        });

                        d_ip[response.retval.list[i]['@cid']] = {
                            'name' : response.retval.list[i].name,
                            'kind' : 'ip_object'
                        };

                    }
                    me.arraynum = response.retval.list.length;
                    me.d_ip = d_ip;
                }

                records_ip.push({
                    'name' : '--IPv4 Group---',
                    '@cid' : 'menu'
                });

                var _params_group = {
                    basename : Ext.encode('object_ip_group'),
                    limit : Ext.encode(null)
                };

                Ext.data.JsonP.request({

                    url : "/api/ftuctrl/getObjectList",
                    params : _params_group,
                    success : function(response){
                        if(response.retcode){

                            for(var i in response.retval.list){

                                records_ip.push({
                                    'name': response.retval.list[i].name,
                                    'num' : response.retval.list[i]['@num'],
                                    'ip' : response.retval.list[i].ip,
                                    'desc' : response.retval.list[i].desc,
                                    '@cid' : response.retval.list[i]['@cid']
                                });

                                d_ip[response.retval.list[i]['@cid']] = {
                                    'name' : response.retval.list[i].name,
                                    'kind' : 'ip_group'
                                };
                            }
                            var _store = Ext.data.StoreManager.lookup('store_ipv4_object_list');
                            _store.loadData(records_ip);

                        }
                    }
                });
            }
        });

        var defult_records = [];

        var _params = {
            basename : Ext.encode('object_ipv6_address'),
            limit : Ext.encode(null)
        };

        Ext.data.JsonP.request({
            url : "/api/ftuctrl/getObjectList",
            params : _params,
            success : function(response){
                defult_records.push({
                    'name' : __zen('unused'),
                    '@cid' : 'null'
                });

                defult_records.push({
                    'name' : '--IPv6---',
                    '@cid' : 'menu'
                });

                if(response.retcode){

                    var d_ipv6 = [];

                    for(var i in response.retval.list){

                        defult_records.push({
                            'name' : response.retval.list[i].name,
                            'num' : response.retval.list[i]['@num'],
                            'ip' : response.retval.list[i].ip,
                            'desc' : response.retval.list[i].desc,
                            '@cid' : response.retval.list[i]['@cid']
                        });

                        d_ipv6[response.retval.list[i]['@cid']] = {
                            'name' : response.retval.list[i].name,
                            'kind' : 'ip_object'
                        };

                    }
                    me.arraynum = response.retval.list.length;
                    me.d_ipv6 = d_ipv6;
                }

                defult_records.push({
                    name : '--IPv6 group---',
                    '@cid' : 'menu'
                });

                var _params_group = {
                    basename : Ext.encode('object_ipv6_group'),
                    limit : Ext.encode(null)
                };

                Ext.data.JsonP.request({

                    url : "/api/ftuctrl/getObjectList",
                    params : _params_group,
                    success : function(response){
                        hideLoadMask();
                        setTimeout(function(){ me.setWidth('100%'); },100);
                        if(response.retcode){

                            for(var i in response.retval.list){

                                defult_records.push({
                                    'name': response.retval.list[i].name,
                                    'num' : response.retval.list[i]['@num'],
                                    'ip' : response.retval.list[i].ip,
                                    'desc' : response.retval.list[i].desc,
                                    '@cid' : response.retval.list[i]['@cid']
                                });

                                d_ipv6[response.retval.list[i]['@cid']] = {
                                    'name' : response.retval.list[i].name,
                                    'kind' : 'ip_group'
                                };
                            }
                            var store_ipv6 = Ext.data.StoreManager.lookup('store_ipv6_object_list');
                            store_ipv6.loadData(defult_records);

                            me.chk_interface();
                        }
                    }
                });
            }
        });


    },

    chk_interface: function() {
        var me = this;

        var records = [];

        var _params = {

            option : Ext.encode('all')

        };

        var use_interface = [];

        var store_use_inter = Ext.data.StoreManager.lookup('store_network_ipspoofing_list');
        store_use_inter.getProxy().setExtraParam('basename', Ext.encode('network_spoofing'));
        store_use_inter.load(function(response_inter){

            for(var i in response_inter){
                use_interface[i] = response_inter[i].data.interface;
            }

            Ext.data.JsonP.request({

                url : "/api/ftuctrl/get_pname_list",
                params : _params,
                success : function(response){
                    if(response.retcode){

                        for(var i in response.retval){
                            records.push({
                                name : response.retval[i].name
                            });
                        }

                        for(var i in use_interface)
                        {
                            for(var j in records){
                                if(use_interface[i] === records[j].name){
                                    records.splice(j,1);
                                }
                            }
                        }
                        var _store = Ext.data.StoreManager.lookup('store_interface');
                        _store.loadData(records);

                    }
                },
                failure : function(response){
                    Ext.Msg.show({
                        title : 'Error message',
                        msg : 'Error Message',
                        width : 300,
                        buttons : Ext.Msg.OK,
                        icon:Ext.window.MessageBox.INFO
                    });
                }
            });
        });
        //store_use_inter.load();
    }

});