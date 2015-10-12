
Ext.define('NFW2.view.NFW2_antivirus_profile', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_antivirus_profile',

    requires: [
        'NFW2.view.NFW2_antivirus_profileViewModel',
        'Ext.form.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel'
    ],

    viewModel: {
        type: 'nfw2_antivirus_profile'
    },
    cls: 'zen_body',
    id: 'NFW2_antivirus_profile',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onNFW2_antivirus_profileAfterRender'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        header: false,
                        title: 'My Form',
                        items: [
                            {
                                xtype: 'container',
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
                                                    click: 'onBtn_addClick'
                                                }
                                            },
                                            {
                                                xtype: 'button',
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
                                xtype: 'container',
                                margin: '5 0 0 0',
                                items: [
                                    {
                                        xtype: 'gridpanel',
                                        cls: 'in_grid',
                                        id: 'grid_antivirus',
                                        scrollable: {
                                            x: false,
                                            y: true
                                        },
                                        header: false,
                                        title: 'My Grid Panel',
                                        columnLines: true,
                                        store: 'store_antivirus_list',
                                        columns: [
                                            {
                                                xtype: 'rownumberer',
                                                width: 60,
                                                align: 'center',
                                                dataIndex: '@num',
                                                text: 'N'
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'name',
                                                flex: 0.2,
                                                bind: {
                                                    text: '{profile_name}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(value.scantype === "0"){ return __zen('inactive'); }
                                                    else if(value.scantype === "1"){
                                                        if(value.action === "0"){ return __zen('stream')+"/"+__zen('deny'); }
                                                        else if(value.action === "1"){ return __zen('stream')+"/"+__zen('detect'); }
                                                    }
                                                    else{
                                                        if(value.action === "0"){ return __zen('file')+"/"+__zen('deny'); }
                                                        else if(value.action === "1"){ return __zen('file')+"/"+__zen('detect'); }
                                                    }
                                                },
                                                dataIndex: 'mail',
                                                flex: 0.2,
                                                bind: {
                                                    text: '{smtp_monitor}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'mailfiter',
                                                flex: 0.2,
                                                bind: {
                                                    text: '{smtp_filter}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(value.scantype === "0"){ return __zen('inactive'); }
                                                    else if(value.scantype === "1"){
                                                        if(value.action === "0"){ return __zen('stream')+"/"+__zen('deny'); }
                                                        else if(value.action === "1"){ return __zen('stream')+"/"+__zen('detect'); }
                                                    }
                                                    else{
                                                        if(value.action === "0"){ return __zen('file')+"/"+__zen('deny'); }
                                                        else if(value.action === "1"){ return __zen('file')+"/"+__zen('detect'); }
                                                    }
                                                },
                                                dataIndex: 'http',
                                                flex: 0.2,
                                                bind: {
                                                    text: '{http_monitor}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(value.scantype === "0"){ return __zen('inactive'); }
                                                    else if(value.scantype === "1"){
                                                        if(value.action === "0"){ return __zen('stream')+"/"+__zen('deny'); }
                                                        else if(value.action === "1"){ return __zen('stream')+"/"+__zen('detect'); }
                                                    }
                                                    else{
                                                        if(value.action === "0"){ return __zen('file')+"/"+__zen('deny'); }
                                                        else if(value.action === "1"){ return __zen('file')+"/"+__zen('detect'); }
                                                    }
                                                },
                                                dataIndex: 'ftp',
                                                flex: 0.2,
                                                bind: {
                                                    text: '{ftp_monitor}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'ftpfilter',
                                                flex: 0.2,
                                                bind: {
                                                    text: '{ftp_filter}'
                                                }
                                            }
                                        ],
                                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                                            selType: 'checkboxmodel',
                                            mode: 'SIMPLE'
                                        }),
                                        listeners: {
                                            celldblclick: 'onGrid_antivirusCellDblClick'
                                        }
                                    }
                                ]
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

    onBtn_addClick: function(button, e, eOpts) {
        var me = this;

        var store = Ext.data.StoreManager.lookup('store_antivirus_list');

        if(store.getCount() > me.max-1){
            Ext.Msg.show({
                title: __weguardia,
                msg: ValidMaxCnt(me.max),
                width: 300,
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO
            });

            return false;
        }
        else{
            //     Ext.data.StoreManager.lookup('store_antivirus_filter').load();

            var win = Ext.create('NFW2.view.win_antivirus_profile',{
                modal : true
            });

            win.show();
        }
    },

    onBtn_delClick: function(button, e, eOpts) {
        var me = this;

        var tbl = Ext.getCmp("grid_antivirus");
        var tbl_sel = tbl.getSelectionModel().getSelection();

        if(tbl_sel.length === 0){
            Ext.Msg.alert("", get_msg("sel_del"));
            return false;
        }
        else{
            Ext.MessageBox.confirm("", get_msg("conf_del"),function(btn){

                if(btn === "yes"){

                    var del_val = [];
                    for(var i=0; i<tbl_sel.length; i++){
                        del_val[i] = tbl_sel[i].data['@cid'];
                    }

                    showLoadMask();

                    var _params = {
                        basename : Ext.encode('anti_virus'),
                        id_info : Ext.encode({'fieldname':'@cid', 'values':del_val})
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'delObjectWithCid',
                        _params,
                        function(response){
                            hideLoadMask();
                            if(response.fail_total > 0){
                                var ar_use = [];
                                for(var i in response.fail_list){
                                    if(response.fail_list[i].reason === "in_use")
                                        ar_use.push(response.fail_list[i].name);
                                }
                                var in_use = ar_use.join(" </br> ");
                                Ext.Msg.alert("",get_msg('err_prodel')+in_use);
                            }
                            else{
                                Ext.Msg.show({
                                    title: __weguardia,
                                    width: 300,
                                    msg: get_msg('msg_ok_del'),
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.window.MessageBox.INFO
                                });
                            }
                            me.get_antivirus();
                        }
                    );
                }
            });
        }
    },

    onGrid_antivirusCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0){ return false; }

        var win = Ext.create('NFW2.view.win_antivirus_profile',{
            edit : "edit",
            cid : record.data['@cid'],
            edit_index : rowIndex,
            record : record,
            modal : true
        });

        win.show();
    },

    onNFW2_antivirus_profileAfterRender: function(component, eOpts) {
        var me = this;

        var _params = {

            filename: Ext.encode('/proc/ferret/datasheet/av_profile')
        };

        request_helper.xmlrpc_call_JsonP(

            'ftuctrl',
            'getFileContent',
            _params,

            function(response){

                me.max = response[0];
            }
        );

        me.get_antivirus();
    },

    get_antivirus: function() {
        var me = this;
        var store = Ext.data.StoreManager.lookup('store_antivirus_list');
        store.load(function(response){
            hideLoadMask();
            setTimeout(function(){ me.setWidth('100%'); },100);
        });
    }

});