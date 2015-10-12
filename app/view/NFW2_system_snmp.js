
Ext.define('NFW2.view.NFW2_system_snmp', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_system_snmp',

    requires: [
        'NFW2.view.NFW2_system_snmpViewModel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.toolbar.Separator',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.column.Action',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel'
    ],

    viewModel: {
        type: 'nfw2_system_snmp'
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
                    id: 'btn_add',
                    iconCls: 'ic_add',
                    text: '추가',
                    listeners: {
                        click: 'onBtn_addClick'
                    }
                },
                {
                    xtype: 'button',
                    id: 'btn_del',
                    iconCls: 'ic_del',
                    text: '삭제',
                    listeners: {
                        click: 'onBtn_delClick'
                    }
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'button',
                    id: 'btn_mib',
                    text: 'MIB(OID) List',
                    listeners: {
                        click: 'onBtn_mibClick'
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
                        cls: 'tbl_fw',
                        id: 'system_snmp_list',
                        margin: '5 0 0 0',
                        scrollable: true,
                        titleCollapse: true,
                        columnLines: true,
                        store: 'store_system_snmp_list',
                        columns: [
                            {
                                xtype: 'numbercolumn',
                                width: 60,
                                align: 'center',
                                dataIndex: 'num',
                                text: 'N',
                                format: '0'
                            },
                            {
                                xtype: 'gridcolumn',
                                minWidth: 100,
                                dataIndex: 'ip_type',
                                text: 'IP 타입',
                                flex: 0.1
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var rec = view.getStore().getAt(rowIndex);

                                    if(rec.get('snmp_type') === 'snmpv3'){

                                        return rec.get('user_name');

                                    }else{

                                        return rec.get('community');
                                    }
                                },
                                minWidth: 150,
                                defaultWidth: 150,
                                dataIndex: 'community',
                                text: '사용자 이름 / 커뮤니티',
                                flex: 0.2
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var rec = view.getStore().getAt(rowIndex);

                                    return (rec.get('trap_ip') === '')? "-":rec.get('trap_ip');

                                },
                                minWidth: 150,
                                defaultWidth: 150,
                                dataIndex: 'trap_ip',
                                emptyCellText: '-',
                                text: 'Trap 주소',
                                flex: 0.2
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var rec = view.getStore().getAt(rowIndex);

                                    return (rec.get('snmp_type') === 'snmpv2')? "-":rec.get('auth_algo');
                                },
                                minWidth: 150,
                                defaultWidth: 150,
                                dataIndex: 'auth_algo',
                                text: '인증 알고리즘',
                                flex: 0.2
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var rec = view.getStore().getAt(rowIndex);

                                    return (rec.get('snmp_type') === 'snmpv2')? "-":rec.get('privacy_algo');
                                },
                                minWidth: 150,
                                defaultWidth: 150,
                                dataIndex: 'privacy_algo',
                                text: '비밀 알고리즘',
                                flex: 0.2
                            },
                            {
                                xtype: 'actioncolumn',
                                id: 'action',
                                width: 100,
                                align: 'center',
                                items: [
                                    {
                                        getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                            return (r.get('snmp_type') === 'snmpv3')? "b_v3":"b_v3_off";
                                        },
                                        getTip: function(v, metadata, r) {
                                            return (r.get('snmp_type') === 'snmpv3')? "SNMPv3 ON":"SNMPv2 ON";
                                        }
                                    },
                                    {
                                        getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                            return (r.get('snmp_use') === 'on')? "b_on":"b_off";
                                        },
                                        getTip: function(v, metadata, r) {
                                            return (r.get('snmp_use') === 'on')? "ON":"OFF";
                                        },
                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                            var rec = view.getStore().getAt(rowIndex);
                                            snmp_use = rec.get("snmp_use");

                                            snmp_use = (snmp_use === "on")? "off":"on";

                                            var _param = {

                                                sid : Ext.encode(rec.get("sid")),
                                                value : Ext.encode(snmp_use)
                                            };

                                            console.log(_param);

                                            Ext.data.JsonP.request({

                                                url : "/api/ftuctrl/set_system_snmp_use",

                                                params : _param,

                                                success : function(response){

                                                    if(response.retcode === true){

                                                        var _store = Ext.data.StoreManager.lookup('store_system_snmp_list');
                                                        _store.load();

                                                    }else{

                                                        prt_errMsg(response.errmsg, null);
                                                    }
                                                },
                                                failure : function(response){

                                                    console.log("fail");
                                                }
                                            });

                                        }
                                    }
                                ]
                            }
                        ],
                        viewConfig: {
                            getRowClass: function(record, rowIndex, rowParams, store) {
                                if(record.get("snmp_use") === "off"){

                                    Ext.Function.defer(function(){
                                        this.removeRowCls(rowIndex, 'x-grid-row-alt');
                                    },100, this);

                                    return "stOff";
                                }
                            }
                        },
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                            selType: 'checkboxmodel'
                        }),
                        listeners: {
                            celldblclick: 'onSystem_snmp_listCellDblClick'
                        }
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    onBtn_addClick: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_snmp',{
            modal : true
        });

        var store = Ext.getCmp('system_snmp_list').getStore();
        var totalv2 = 0;
        var totalv3 = 0;

        store.each(function(r){
            if(r.data.snmp_type === 'snmpv2') {
                totalv2++;
            }

            if(r.data.snmp_type === 'snmpv3') {
                totalv3++;
            }
        });

        if(totalv2 >= 5 && totalv3 >= 1){

            Ext.Msg.show({
                title: 'WeGuardia™ ZEN',
                msg: get_msg("err_snmpcnt"),
                width: 300,
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO
            });

        }else{
            win.show();
        }
    },

    onBtn_delClick: function(button, e, eOpts) {
        var tbl = Ext.getCmp("system_snmp_list");
        var tbl_sel = tbl.getSelectionModel().getSelection();

        if(tbl_sel.length === 0){

            Ext.Msg.alert("WeGuardia™ ZEN",get_msg("sel_del"));
            return false;

        }else{

            Ext.MessageBox.confirm("WeGuardia™ ZEN",get_msg("conf_del"),function(btn){

                if(btn === "yes"){

                    var del = [];

                    for(var i=0; i<tbl_sel.length; i++){
                        del.push(tbl_sel[i].data.sid);
                    }

                    var sid_list = del;

                    var _param = {
                        sid_list : Ext.encode(sid_list)
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'del_system_snmp',
                        _param,
                        function(response){
                            Ext.data.StoreManager.lookup('store_system_snmp_list').load();
                        }
                    );
                }
            });

        }

    },

    onBtn_mibClick: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_oid',{
            modal : true
        });
        win.show();
    },

    onPanelAfterRender: function(component, eOpts) {
        Ext.data.StoreManager.lookup('store_system_snmp_list').load();
    },

    onSystem_snmp_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var rec = tableview.getStore().getAt(rowIndex);

        var win = Ext.create('NFW2.view.win_snmp',{
            edit : "edit",
            record: record.data,
            modal : true
        });

        win.show();

    }

});