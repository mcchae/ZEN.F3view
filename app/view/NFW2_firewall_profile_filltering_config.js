
Ext.define('NFW2.view.NFW2_firewall_profile_filltering_config', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_firewall_profile_filltering_config',

    requires: [
        'NFW2.view.NFW2_firewall_profile_filltering_configViewModel',
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
        type: 'nfw2_firewall_profile_filltering_config'
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
                    text: '추가',
                    listeners: {
                        click: 'onButtonClick'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'ic_del',
                    text: '삭제',
                    listeners: {
                        click: 'onButtonClick1'
                    }
                },
                {
                    xtype: 'button',
                    text: '복사',
                    listeners: {
                        click: 'onButtonClick2'
                    }
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'splitbutton',
                    handler: function(button, e) {
                        this.showMenu();
                    },
                    text: '미 참조 프로파일 검사',
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
                                        fieldLabel: '시작일',
                                        labelCls: 'lb_arrow',
                                        labelSeparator: ' ',
                                        labelWidth: 60,
                                        editable: false,
                                        format: 'Ymd',
                                        submitFormat: 'Ymd',
                                        listeners: {
                                            render: 'onDp_startRender'
                                        }
                                    },
                                    {
                                        xtype: 'datefield',
                                        id: 'dp_end',
                                        width: 220,
                                        fieldLabel: '종료일',
                                        labelCls: 'lb_arrow',
                                        labelSeparator: ' ',
                                        labelWidth: 60,
                                        editable: false,
                                        format: 'Ymd',
                                        submitFormat: 'Ymd',
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
                                        text: '확인',
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
                    text: '미사용 프로파일 확인',
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
                                text: '프로파일 이름',
                                flex: 1
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    return (value)?unixTimeConvert(value,"",'GMT'):"";
                                },
                                width: 130,
                                dataIndex: 'lasthit',
                                text: '참조일'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'description',
                                text: '설명',
                                flex: 1
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
        var win = Ext.create('NFW2.view.win_profile_http');
        win.show();
    },

    onButtonClick1: function(button, e, eOpts) {
        var grid = Ext.getCmp("grid_list");
        var grid_chk = grid.getSelectionModel().getSelection();

        if(grid_chk.length === 0){
            Ext.Msg.alert("",get_msg("sel_del"));
            return false;
        }

        Ext.MessageBox.confirm("",get_msg("conf_del"),function(btn){
            if(btn === "yes"){
                var del = [];
                for(var i=0; i<grid_chk.length; i++){
                    del.push(grid_chk[i].data['@cid']);
                }

                var key_list = del;

                var _param = {
                    key_list : Ext.encode(key_list)
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'del_fw_profile_web',
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
                                Ext.Msg.alert("",get_msg('err_objdel')+in_use);
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
            Ext.Msg.alert("",get_msg("sel_copy"));
            return false;
        }

        Ext.MessageBox.confirm("",get_msg("conf_copy"),function(btn){
            if(btn === "yes"){
                var copy = new Array();
                for(var i=0; i<grid_chk.length; i++){
                    copy.push(grid_chk[i].data['@cid']);
                }

                var cid_list = copy;

                var _param = {
                    cid_list : Ext.encode(cid_list)
                };

                console.log(_param);

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'copy_fw_profile_web',
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
        var _store = Ext.data.StoreManager.lookup("store_fw_profile_web_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode([]));
        _store.loadPage(1);
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