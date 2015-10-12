
Ext.define('NFW2.view.NFW2_ipm_network', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_ipm_network',

    requires: [
        'NFW2.view.NFW2_ipm_networkViewModel',
        'Ext.form.Panel',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'nfw2_ipm_network'
    },
    id: 'NFW2_ipm_network',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'ipm_network_grid',
                            header: false,
                            title: 'My Grid Panel',
                            columnLines: true,
                            store: 'store_ipm_network_list',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    width: 60,
                                    align: 'center',
                                    dataIndex: 'string',
                                    text: 'N'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'name',
                                    flex: 2,
                                    bind: {
                                        text: '{obj_name}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'interface',
                                    flex: 1,
                                    bind: {
                                        text: '{inter}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'ip',
                                    flex: 2,
                                    bind: {
                                        text: '{network}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if(value === "accept"){ return "탐지"; }
                                        else{ return "차단"; }
                                    },
                                    align: 'center',
                                    dataIndex: 'action',
                                    flex: 0.8,
                                    bind: {
                                        text: '{default_action}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if(value === null){ return ""; }

                                        return value + "분";
                                    },
                                    dataIndex: 'cycle',
                                    flex: 1,
                                    bind: {
                                        text: '{ip_scan_period}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value + "개";
                                    },
                                    dataIndex: 'count',
                                    flex: 1.5,
                                    bind: {
                                        text: '{ip_scan_per_sec}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'desc',
                                    flex: 3,
                                    bind: {
                                        text: '{desc}'
                                    }
                                }
                            ],
                            selModel: {
                                selType: 'checkboxmodel',
                                mode: 'SIMPLE'
                            },
                            listeners: {
                                celldblclick: 'onIpm_network_gridCellDblClick'
                            }
                        }
                    ]
                }
            ]
        }
    ],
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
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender'
    },

    onIpm_network_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0){ return false; }
        var win_ip = "";
        var temp = record.data.ip.split('/');
        if(temp[1] !== undefined){ win_ip = temp[0]; }

        var win = Ext.create('NFW2.view.win_ipm_network',{
            edit : "edit",
            modal : true,
            chk_ip : win_ip,
            record : record
        });

        win.show();
    },

    onButtonClick: function(button, e, eOpts) {
        var store = Ext.data.StoreManager.lookup('store_ipm_network_list');
        var me = Ext.getCmp('NFW2_ipm_network');

        if(store.getCount() >= me.network_cnt){
            Ext.MessageBox.alert(__weguardia,ValidMaxCnt(me.network_cnt));
            return false;
        }

        var win = Ext.create('NFW2.view.win_ipm_network',{
            modal : true
        });

        win.show();
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var tbl = Ext.getCmp("ipm_network_grid");
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
                        del.push(tbl_sel[i].data.id);
                    }

                    var _params = {
                        basename : Ext.encode('network_ipm_manager'),
                        ids : Ext.encode(del)
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'delListTypeObj',
                        _params,

                        function(response){
                            if(response.fail_total > 0){
                                var ar_use = [];
                                for(var i in response.fail_list){
                                    if(response.fail_list[i].reason === "in_use")
                                        ar_use.push(response.fail_list[i].name);
                                }
                                var in_use = ar_use.join(" </br> ");
                                Ext.Msg.alert("",get_msg('err_ipmdel')+in_use);
                            }
                            else{
                                me.get_ipm_network();
                                Ext.Msg.show({
                                    title: __weguardia,
                                    width: 300,
                                    msg: get_msg('msg_ok_del'),
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.window.MessageBox.INFO
                                });
                            }
                        }
                    );
                }
            });
        }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        me.network_cnt = 0;

        var _params = {

            filename: Ext.encode('/proc/ferret/datasheet/ipm_manage_network')
        };

        request_helper.xmlrpc_call_JsonP(

            'ftuctrl',
            'getFileContent',
            _params,

            function(response){
                me.network_cnt = Number(response[0]);
            }
        );

        me.get_ipm_network();
    },

    get_ipm_network: function() {
        var _params = {
            basename : Ext.encode("network_ipm_manager")
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _params,

            function(data){
                //         var _params = {
                //             basename : Ext.encode("network_ipm_scan")
                //         };

                //         request_helper.xmlrpc_call_JsonP(
                //             'ftuctrl',
                //             'getObjects',
                //             _params,

                //             function(data2){
                //                 console.log(data);
                //                 console.log(data2);
                hideLoadMask();
                var record = [];
                if(data.list !== null){
                    for(var i in data.list){
                        record.push({
                            'name' : data.list[i].name,
                            'interface' : data.list[i].interface,
                            'ip' : data.list[i].ip,
                            'action' : data.list[i].action,
                            'desc' : data.list[i].desc,
                            'id' : data.list[i]._id,
                            //                             'scan_id' : data2.list[i]._id,
                            'cycle' : data.list[i].cycle,
                            'count' : data.list[i].count,
                            'cycle_chk' : data.list[i].cycle_chk
                        });
                    }

                    var store = Ext.data.StoreManager.lookup('store_ipm_network_list');
                    store.loadData(record);
                }
        //     }
        // );
        }
        );
    }

});