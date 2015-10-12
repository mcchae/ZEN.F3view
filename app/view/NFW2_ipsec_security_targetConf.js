
Ext.define('NFW2.view.NFW2_ipsec_security_targetConf', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging'
    ],

    id: 'NFW2_ipsec_security_targetConf',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            obj_d: {
                data: ''
            },
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    title: '대상 설정',
                    items: [
                        {
                            xtype: 'container',
                            margin: '0 0 5 0',
                            items: [
                                {
                                    xtype: 'button',
                                    width: 100,
                                    text: '추가',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick4,
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
                                            fn: me.onButtonClick5,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            cls: 'tbl_fw',
                            id: 'grid_target',
                            title: '',
                            columnLines: true,
                            store: 'store_security_target_list',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    width: 40,
                                    align: 'center',
                                    dataIndex: '_num',
                                    text: 'N'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'name',
                                    text: '이름',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'uid',
                                    text: 'UID',
                                    flex: 2
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'target_ip',
                                    text: 'IP주소/도메인',
                                    flex: 1.5
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var mem_isakmpsa = Ext.getCmp("NFW2_ipsec_security_targetConf").mem_isakmpsa;

                                        return mem_isakmpsa[value];
                                    },
                                    dataIndex: 'isakmp_sa',
                                    text: 'ISAKMP SA',
                                    flex: 1.5
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'iface',
                                    text: '인터페이스',
                                    flex: 0.5
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'group_id',
                                    text: '그룹 ID',
                                    flex: 0.5
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 50,
                                    align: 'center',
                                    items: [
                                        {
                                            getTip: function(v, metadata, r) {
                                                return (r.get('chk_use') === 'on')? "ON":"OFF";
                                            },
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                var me = this;

                                                var chk_use = (record.data.chk_use ==="on")?"off":"on";

                                                var obj = {
                                                    '_id': record.data._id,
                                                    'chk_use': chk_use
                                                };

                                                var _params = {
                                                    basename: Ext.encode("ipsec_conf"),
                                                    obj : Ext.encode(obj),
                                                    update : Ext.encode(true)
                                                };

                                                request_helper.xmlrpc_call_JsonP(
                                                'ftuctrl',
                                                'setListTypeObj',
                                                _params,
                                                function(response){

                                                    var win = Ext.getCmp("NFW2_ipsec_security_targetConf");
                                                    win.get_targetConf();
                                                }
                                                );
                                            },
                                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                return (r.get('chk_use') === 'on')? "b_on":"b_off";
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

                            }),
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    width: 360,
                                    displayInfo: true,
                                    store: 'store_security_target_list'
                                }
                            ],
                            listeners: {
                                celldblclick: {
                                    fn: me.onGrid_targetCellDblClick,
                                    scope: me
                                }
                            }
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

    onButtonClick4: function(button, e, eOpts) {
        var grid = Ext.getCmp("grid_target");

        if(grid.getStore().data.length >= 128){
            Ext.Msg.alert("경고",Valid_max_cnt(128));
            return false;
        }

        var win = Ext.create('NFW2.view.win_target');
        win.show();
    },

    onButtonClick5: function(button, e, eOpts) {
        var me = this;

        var grid = Ext.getCmp("grid_target");
        var grid_chk = grid.getSelectionModel().getSelection();

        if(grid_chk.length === 0){
            Ext.Msg.alert("",get_msg("sel_del"));
            return false;
        }

        Ext.MessageBox.confirm("",get_msg("conf_del"),function(btn){
            if(btn === "yes"){
                var del = [];
                for(var i=0; i<grid_chk.length; i++){

                    del.push(grid_chk[i].data._id);

                }

                var _params = {

                    basename : Ext.encode("ipsec_conf"),
                    ids : Ext.encode(del),
                    renum_info : Ext.encode({'fieldname':'_num'})
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'delListTypeObj',
                    _params,
                    function(reesponse){

                        me.get_targetConf();
                    }
                );
            }
        });
    },

    onGrid_targetCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('NFW2.view.win_target',{
            edit : "edit",
            num : record.data['_num'],
            cid : record.data['_id'],
            chk_use: record.data.chk_use
        });
        win.show();
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        var records = [];

        var _params = {

            option : Ext.encode('all')

        };


        Ext.data.JsonP.request({

            url : "/api/ftuctrl/get_pname_list",
            params : _params,
            success : function(response){

                if(response.retcode){

                    for(var i in response.retval){

                        records.push({

                            name: response.retval[i].name

                        });

                    }

                    var _params = {

                        if_type : Ext.encode('bridge'),
                        data_type : Ext.encode('name'),
                        option : Ext.encode('used')


                    };

                    Ext.data.JsonP.request({

                        url : "/api/ftuctrl/get_lname_list",
                        params : _params,
                        success : function(response){

                            if(response.retcode){

                                for(var i in response.retval){

                                    records.push({

                                        name: response.retval[i].name

                                    });

                                }

                                var _params = {

                                    if_type : Ext.encode('bonding'),
                                    data_type : Ext.encode('name'),
                                    option : Ext.encode('used')


                                };

                                Ext.data.JsonP.request({

                                    url : "/api/ftuctrl/get_lname_list",
                                    params : _params,
                                    success : function(response){

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

        me.get_targetConf();



    },

    get_targetConf: function() {
        var me = this;

        var mem_isakmpsa = [];

        var _store_isa = Ext.data.StoreManager.lookup('store_isakmpsa_list');
        _store_isa.getProxy().setExtraParam('basename',Ext.encode("with_cid"));
        _store_isa.getProxy().setExtraParam('cond',Ext.encode({'_kind':'vpn_isakmpsa'}));
        _store_isa.getProxy().setExtraParam('sort_list',Ext.encode([['name',1]]));
        _store_isa.currentPage = 1;
        _store_isa.load(function(response){

            for(var i in response){

                mem_isakmpsa[response[i].data['@cid']] = response[i].data.name;
            }
            me.mem_isakmpsa = mem_isakmpsa;
        });

        var _store = Ext.data.StoreManager.lookup('store_security_target_list');
        _store.getProxy().setExtraParam('basename',Ext.encode("ipsec_conf"));
        _store.getProxy().setExtraParam('sort_list',Ext.encode([['_num',1]]));
        _store.loadPage(1);
    }

});