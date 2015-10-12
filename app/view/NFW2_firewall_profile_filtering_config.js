
Ext.define('NFW2.view.NFW2_firewall_profile_filtering_config', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_firewall_profile_filtering_config',

    requires: [
        'NFW2.view.NFW2_firewall_profile_filtering_configViewModel',
        'Ext.toolbar.Separator',
        'Ext.button.Split',
        'Ext.menu.Menu',
        'Ext.form.field.Date',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'nfw2_firewall_profile_filtering_config'
    },
    cls: 'zen_body',
    id: 'httpFiltering',
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
                    xtype: 'button',
                    componentCls: 'btn_auth',
                    bind: {
                        text: '{copy}'
                    },
                    listeners: {
                        click: 'onButtonClick2'
                    }
                },
                {
                    xtype: 'tbseparator',
                    hidden: true
                },
                {
                    xtype: 'splitbutton',
                    handler: function(button, e) {
                        this.showMenu();
                    },
                    hidden: true,
                    bind: {
                        text: '{pro_unrefer}'
                    },
                    menu: {
                        xtype: 'menu',
                        shadow: false,
                        width: 250,
                        items: [
                            {
                                xtype: 'container',
                                cls: 'dv_pop_inner',
                                padding: '10 15',
                                items: [
                                    {
                                        xtype: 'datefield',
                                        id: 'dp_start',
                                        width: 220,
                                        labelCls: 'lb_arrow',
                                        labelSeparator: ' ',
                                        labelWidth: 70,
                                        editable: false,
                                        format: 'Ymd',
                                        submitFormat: 'Ymd',
                                        bind: {
                                            fieldLabel: '{start_date}'
                                        },
                                        listeners: {
                                            render: 'onDp_startRender'
                                        }
                                    },
                                    {
                                        xtype: 'datefield',
                                        id: 'dp_end',
                                        width: 220,
                                        labelCls: 'lb_arrow',
                                        labelSeparator: ' ',
                                        labelWidth: 70,
                                        editable: false,
                                        format: 'Ymd',
                                        submitFormat: 'Ymd',
                                        bind: {
                                            fieldLabel: '{end_date}'
                                        },
                                        listeners: {
                                            render: 'onDp_endRender'
                                        }
                                    },
                                    {
                                        xtype: 'label',
                                        cls: 'errorBox',
                                        hidden: true,
                                        id: 'err_unused',
                                        margin: '10 0'
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'ft_confirm_s',
                                        margin: '0 0 0 60',
                                        iconCls: 'ft_confirm_icl',
                                        bind: {
                                            text: '{confirm}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick4'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    xtype: 'button',
                    hidden: true,
                    bind: {
                        text: '{pro_unused}'
                    },
                    listeners: {
                        click: 'onButtonClick3'
                    }
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'button',
                    hidden: true,
                    id: 'btn_reset',
                    iconCls: 'ic_reset',
                    listeners: {
                        click: 'onBtn_resetClick'
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
                        id: 'grid_list',
                        margin: '5 0 0 0',
                        bodyBorder: true,
                        title: '',
                        columnLines: true,
                        store: 'store_fw_profile_web_list',
                        columns: [
                            {
                                xtype: 'gridcolumn',
                                width: 60,
                                align: 'center',
                                dataIndex: '@num',
                                text: 'N'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'name',
                                flex: 1,
                                bind: {
                                    text: '{profile_name}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'description',
                                flex: 1,
                                bind: {
                                    text: '{desc}'
                                }
                            }
                        ],
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                            selType: 'checkboxmodel'
                        }),
                        dockedItems: [
                            {
                                xtype: 'pagingtoolbar',
                                dock: 'bottom',
                                width: 360,
                                displayInfo: true,
                                store: 'store_fw_profile_web_list'
                            }
                        ],
                        listeners: {
                            celldblclick: 'onGrid_listCellDblClick'
                        }
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;
        var _store = Ext.data.StoreManager.lookup("store_fw_profile_web_list");

        if(_store.getTotalCount() >= me.count){
            Ext.MessageBox.alert(__weguardia,ValidMaxCnt(me.count));
            return false;
        }

        var win = Ext.create('NFW2.view.win_profile_http');
        win.show();
    },

    onButtonClick1: function(button, e, eOpts) {
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
                    del.push(grid_chk[i].data['@cid']);
                }

                var key_list = del;

                var _param = {
                    basename : Ext.encode("fw_profile_web"),
                    id_info : Ext.encode({'fieldname':'@cid', 'values':del}),
                    renum_info : Ext.encode({'fieldname':'@num'})
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'delObjectWithCid',
                    _param,
                    function(response){

                        if(response){
                            if(response.fail_total > 0){

                                var ar_use = [];
                                for(var i in response.fail_list){
                                    if(response.fail_list[i].reason === "in_use")
                                        ar_use.push(response.fail_list[i].name);
                                }
                                var in_use = ar_use.join(" , ");
                                Ext.Msg.alert(__weguardia,get_msg('err_prodel')+in_use);
                            }
                        }

                        Ext.data.StoreManager.lookup('store_fw_profile_web_list').loadPage(1);
                    }
                );
            }
        });
    },

    onButtonClick2: function(button, e, eOpts) {
        var grid = Ext.getCmp("grid_list");
        var grid_chk = grid.getSelectionModel().getSelection();

        if(grid_chk.length === 0){
            Ext.Msg.alert(__weguardia,get_msg("sel_copy"));
            return false;
        }

        Ext.MessageBox.confirm(__weguardia,get_msg("conf_copy"),function(btn){
            if(btn === "yes"){
                var copy = [];
                for(var i=0; i<grid_chk.length; i++){
                    copy.push(grid_chk[i].data['@cid']);
                }

                var cid_list = copy;

                var _param = {
                    basename: Ext.encode('fw_profile_web'),
                    id_info : Ext.encode({'fieldname':'@cid', 'values':copy}),
                    num_info : Ext.encode({'fieldname':'@num'})
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'copyObject',
                    _param,
                    function(response){

                        var _store = Ext.data.StoreManager.lookup('store_fw_profile_web_list');
                        _store.load();
                    }
                );
            }
        });
    },

    onDp_startRender: function(component, eOpts) {
        var before = Ext.Date.add(new Date(),Ext.Date.DAY,-7);
        Ext.getCmp("dp_start").setValue(before);
    },

    onDp_endRender: function(component, eOpts) {
        Ext.getCmp("dp_end").setValue(new Date());
    },

    onButtonClick4: function(button, e, eOpts) {
        var start = Ext.getCmp('dp_start').getValue();
        var end = Ext.getCmp('dp_end').getValue();

        if(start > end){prt_errMsg(get_msg("err_datevalid"), "err_unused");	return false;}else{Ext.getCmp("err_unused").hide();}

        var _store = Ext.data.StoreManager.lookup("store_fw_profile_web_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'unused','value':{'start_date':Ext.Date.format(Ext.getCmp('dp_start').getValue(), 'Ymd'),'end_date':Ext.Date.format(Ext.getCmp('dp_end').getValue(), 'Ymd')}}));
        _store.loadPage(1);

        Ext.getCmp("btn_reset").show();
    },

    onButtonClick3: function(button, e, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_fw_profile_web_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'_ref_cnt','value':'0'}));
        _store.loadPage(1);

        Ext.getCmp("btn_reset").show();
    },

    onBtn_resetClick: function(button, e, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_fw_profile_web_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode([]));
        _store.loadPage(1);

        Ext.getCmp("btn_reset").hide();
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        var _store = Ext.data.StoreManager.lookup("store_fw_profile_web_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode([]));
        _store.currentPage = 1;
        _store.load(function(){
            hideLoadMask();
            setTimeout(function(){ me.setWidth('100%'); },100);
        });

        var _params = {
            filename: Ext.encode('/proc/ferret/datasheet/http_profile')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            _params,
            function(response){

                me.count = response[0];
            }
        );
    },

    onGrid_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('NFW2.view.win_profile_http',{
            edit : "edit",
            cid : record.data['@cid'],
            num : record.data['@num'],
            name: record.data['name'],
            record: record.data
        });
        win.show();
    }

});