
Ext.define('NFW2.view.NFW2_firewall_profile_config', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_firewall_profile_config',

    requires: [
        'NFW2.view.NFW2_firewall_profile_configViewModel',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Separator',
        'Ext.button.Split',
        'Ext.menu.Menu',
        'Ext.form.field.Date',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel'
    ],

    viewModel: {
        type: 'nfw2_firewall_profile_config'
    },
    cls: 'zen_body',
    id: 'NFW2_awareness',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender'
    },
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
                                margin: ' ',
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
                                            afterrender: 'onDp_startAfterRender'
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
                                            afterrender: 'onDp_endAfterRender'
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
                                        width: 100,
                                        iconCls: 'ft_confirm_icl',
                                        bind: {
                                            text: '{confirm}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick5'
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
                        click: 'onButtonClick4'
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

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'gridpanel',
                        id: 'grid_list',
                        margin: '5 0 0 0',
                        title: '',
                        columnLines: true,
                        store: 'store_profile_application_list',
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
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var _detect = [], _block = [], _qos = [];
                                    for(var i=0; i<value.length; i++){
                                        if(value[i].action.type === 'detect'){
                                            _detect.push(value[i].applications[0].name);
                                        }else if(value[i].action.type === 'block'){
                                            _block.push(value[i].applications[0].name);
                                        }else if(value[i].action.type === 'qos'){
                                            _qos.push(value[i].applications[0].name);
                                        }
                                    }

                                    var list = [];
                                    if(_detect.length > 0){
                                        var d_list = (_detect.length > 3)?_detect[0]+', '+_detect[1]+', '+_detect[2]+' ...':_detect.join(', ');
                                        list.push('탐지 : '+d_list);
                                    }
                                    if(_block.length > 0){
                                        var b_list = (_block.length > 3)?_block[0]+', '+_block[1]+', '+_block[2]+' ...':_block.join(', ');
                                        list.push('차단 : '+b_list);
                                    }
                                    if(_qos.length > 0){
                                        var q_list = (_qos.length > 3)?_qos[0]+', '+_qos[1]+', '+_qos[2]+' ...':_qos.join(', ');
                                        list.push('QoS : '+q_list);
                                    }

                                    return list.join('<br>');
                                },
                                dataIndex: 'elements',
                                flex: 1,
                                bind: {
                                    text: '{application}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'desc',
                                flex: 1,
                                bind: {
                                    text: '{desc}'
                                }
                            }
                        ],
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                            selType: 'checkboxmodel'
                        }),
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

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        var _store = Ext.data.StoreManager.lookup("store_profile_application_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode([]));
        _store.currentPage = 1;
        _store.load(function(){

            hideLoadMask();
            setTimeout(function(){ me.setWidth('100%'); },100);
        });

        var _param = {
            'filename': Ext.encode('/proc/ferret/datasheet/app_profile')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            _param,
            function(response){
                me.prof = response[0];
            }
        );
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var _store = Ext.data.StoreManager.lookup("store_profile_application_list");

        if(_store.getTotalCount() >= me.prof){
            Ext.MessageBox.alert(__weguardia,ValidMaxCnt(me.prof));
            return false;
        }

        var win = Ext.create('NFW2.view.win_awareness');
        win.show();
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

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

                me.mask('Loading...');

                var _params = {

                    basename : Ext.encode("fw_profile_application"),
                    id_info : Ext.encode({'fieldname':'@cid', 'values':del}),
                    renum_info : Ext.encode({'fieldname':'@num'})
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'delObjectWithCid',
                    _params,
                    function(response){

                        me.unmask();

                        if(response.fail_total > 0){

                            var ar_use = [];
                            for(var i in response.fail_list){
                                if(response.fail_list[i].reason === "in_use")
                                    ar_use.push(response.fail_list[i].name);
                            }
                            var in_use = ar_use.join(" , ");
                            Ext.MessageBox.alert(__weguardia,get_msg('err_prodel')+in_use);
                        }

                        Ext.data.StoreManager.lookup("store_profile_application_list").loadPage(1);
                    }
                );
            }
        });
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;

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

                var _params = {

                    basename : Ext.encode("fw_profile_application"),
                    id_info : Ext.encode({'fieldname':'@cid', 'values':copy}),
                    num_info : Ext.encode({'fieldname':'@num'})
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'copyObject',
                    _params,
                    function(response){

                        Ext.data.StoreManager.lookup("store_profile_application_list").load();
                    }
                );
            }
        });
    },

    onDp_startAfterRender: function(component, eOpts) {
        var before = Ext.Date.add(new Date(),Ext.Date.DAY,-7);
        Ext.getCmp("dp_start").setValue(before);
    },

    onDp_endAfterRender: function(component, eOpts) {
        Ext.getCmp("dp_end").setValue(new Date());
    },

    onButtonClick5: function(button, e, eOpts) {
        var start = Ext.getCmp('dp_start').getValue();
        var end = Ext.getCmp('dp_end').getValue();

        if(start > end){prt_errMsg(get_msg("err_datevalid"), "err_unused");	return false;}else{Ext.getCmp("err_unused").hide();}

        var _store = Ext.data.StoreManager.lookup("store_profile_application_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'unused','value':{'start_date':Ext.Date.format(Ext.getCmp('dp_start').getValue(), 'Ymd'),'end_date':Ext.Date.format(Ext.getCmp('dp_end').getValue(), 'Ymd')}}));
        _store.loadPage(1);

        Ext.getCmp("btn_reset").show();
    },

    onButtonClick4: function(button, e, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_profile_application_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'_ref_cnt','value':'0'}));
        _store.loadPage(1);

        Ext.getCmp("btn_reset").show();
    },

    onBtn_resetClick: function(button, e, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_profile_application_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode([]));
        _store.loadPage(1);

        Ext.getCmp("btn_reset").hide();
    },

    onGrid_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var grid = Ext.getCmp("grid_list");
        var grid_chk = grid.getSelectionModel().getSelection();

        var win = Ext.create('NFW2.view.win_awareness',{
            edit : "edit",
            num : grid_chk[0].data['@num'],
            cid : grid_chk[0].data['@cid'],
            name: grid_chk[0].data.name,
            desc: grid_chk[0].data.desc,
            elements : grid_chk[0].data.elements
        });
        win.show();
    }

});