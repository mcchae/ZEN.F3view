
Ext.define('NFW2.view.NFW2_firewall_object_session', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_firewall_object_session',

    requires: [
        'NFW2.view.NFW2_firewall_object_sessionViewModel',
        'Ext.form.Panel',
        'Ext.toolbar.Separator',
        'Ext.button.Split',
        'Ext.menu.Menu',
        'Ext.form.field.Date',
        'Ext.form.Label',
        'Ext.form.field.Display',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.selection.CheckboxModel',
        'Ext.view.Table',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'nfw2_firewall_object_session'
    },
    cls: 'zen_body',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender'
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
                                        xtype: 'container',
                                        flex: 1,
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
                                                    },
                                                    {
                                                        xtype: 'tbseparator'
                                                    },
                                                    {
                                                        xtype: 'splitbutton',
                                                        handler: function(button, e) {
                                                            this.showMenu();
                                                        },
                                                        id: 'btn_find',
                                                        bind: {
                                                            text: '{obj_unrefer}'
                                                        },
                                                        menu: {
                                                            xtype: 'menu',
                                                            shadow: false,
                                                            width: 260,
                                                            items: [
                                                                {
                                                                    xtype: 'container',
                                                                    cls: 'dv_pop_inner',
                                                                    margin: ' ',
                                                                    padding: 15,
                                                                    items: [
                                                                        {
                                                                            xtype: 'datefield',
                                                                            id: 'dp_start',
                                                                            width: 230,
                                                                            labelCls: 'lb_arrow',
                                                                            labelSeparator: ' ',
                                                                            labelWidth: 50,
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
                                                                            width: 230,
                                                                            labelCls: 'lb_arrow',
                                                                            labelSeparator: ' ',
                                                                            labelWidth: 50,
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
                                                                            width: 100,
                                                                            iconCls: 'ft_confirm_icl',
                                                                            bind: {
                                                                                text: '{confirm}'
                                                                            },
                                                                            listeners: {
                                                                                click: 'onButtonClick'
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        id: 'btn_unuse',
                                                        bind: {
                                                            text: '{obj_unused}'
                                                        },
                                                        listeners: {
                                                            click: 'onBtn_unuseClick'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'tbseparator'
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        id: 'session_search_text',
                                                        labelSeparator: ' ',
                                                        emptyText: '객체 이름',
                                                        listeners: {
                                                            render: 'onSession_search_textRender'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        id: 'btn_search',
                                                        iconCls: 'ic_ser',
                                                        listeners: {
                                                            click: 'onBtn_searchClick'
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
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                padding: '0 20 0 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'displayfield',
                                        id: 'st_fw_session_obj_cnt',
                                        labelAlign: 'right',
                                        labelSeparator: ' ',
                                        fieldCls: 'tot_info_bg',
                                        bind: {
                                            fieldLabel: '{obj_count}'
                                        }
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
                                        id: 'grid_session',
                                        header: false,
                                        title: 'My Grid Panel',
                                        columnLines: true,
                                        store: 'store_object_session_list',
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
                                                flex: 0.15,
                                                bind: {
                                                    text: '{obj_name}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(value === "create_per_second"){
                                                        return __zen('session_sec');
                                                    }
                                                    else if(value === "concurrent_per_user"){
                                                        return __zen('session_user');
                                                    }
                                                    else if(value === "usage_per_session"){
                                                        return __zen('session_limit');
                                                    }
                                                },
                                                dataIndex: 'limit_type',
                                                flex: 0.2,
                                                bind: {
                                                    text: '{operate_mode}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if(record.data.limit_type !== "usage_per_session"){
                                                        return __zen('session_access')+ " : " + addComma(record.data.threshold);
                                                    }
                                                    else{
                                                        return __zen('limit_size')+ " : TX " + addComma(record.data.tx) + " Kbyte / RX " + addComma(record.data.rx) + " Kbyte";
                                                    }

                                                },
                                                dataIndex: 'threshold',
                                                flex: 0.4,
                                                bind: {
                                                    text: '{option}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return (value)?unixTimeConvert(value,"YMDHM","GMT"):"";
                                                },
                                                width: 130,
                                                dataIndex: 'lasthit',
                                                bind: {
                                                    text: '{last_hit}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return (value)?unixTimeConvert(value,"YMDHM","GMT"):"";
                                                },
                                                width: 130,
                                                dataIndex: 'lastupdate',
                                                bind: {
                                                    text: '{last_edit}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: 'desc',
                                                flex: 0.25,
                                                bind: {
                                                    text: '{desc}'
                                                }
                                            }
                                        ],
                                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                                            selType: 'checkboxmodel',
                                            mode: 'SIMPLE'
                                        }),
                                        listeners: {
                                            celldblclick: 'onGridpanelCellDblClick'
                                        },
                                        dockedItems: [
                                            {
                                                xtype: 'pagingtoolbar',
                                                dock: 'bottom',
                                                id: 'session_toolbar',
                                                width: 360,
                                                displayInfo: true,
                                                store: 'store_object_session_list'
                                            }
                                        ]
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

        var store = Ext.data.StoreManager.lookup('store_object_session_list');

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
            var win = Ext.create('NFW2.view.win_object_session',{
                max : me.max,
                modal : true
            });

            win.show();
        }
    },

    onBtn_delClick: function(button, e, eOpts) {
        var me = this;

        var tbl = Ext.getCmp("grid_session");
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

                    var _params = {
                        basename : Ext.encode('object_session'),
                        id_info : Ext.encode({'fieldname':'@cid', 'values':del_val})
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'delObjectWithCid',
                        _params,
                        function(response){
                            if(response.fail_total > 0){
                                var ar_use = [];
                                for(var i in response.fail_list){
                                    if(response.fail_list[i].reason === "in_use")
                                        ar_use.push(response.fail_list[i].name);
                                }
                                var in_use = ar_use.join(" </br> ");
                                Ext.Msg.alert("",get_msg('err_objdel')+in_use);
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
                            var store = Ext.data.StoreManager.lookup('store_object_session_list');
                            store.getProxy().setExtraParam('search_info',Ext.encode({}));
                            Ext.getCmp('session_search_text').reset();
                            Ext.getCmp('btn_reset').hide();
                            me.get_object_session();
                        }
                    );
                }
            });
        }
    },

    onDp_startRender: function(component, eOpts) {
        var before = Ext.Date.add(new Date(),Ext.Date.DAY,-7);
        Ext.getCmp("dp_start").setValue(before);
    },

    onDp_endRender: function(component, eOpts) {
        Ext.getCmp("dp_end").setValue(new Date());
    },

    onButtonClick: function(button, e, eOpts) {
        var start = Ext.getCmp('dp_start').getValue();
        var end = Ext.getCmp('dp_end').getValue();

        if(start > end){prt_errMsg_label(get_msg("err_datevalid"), "err_unused");     return false;}else{Ext.getCmp("err_unused").hide();}

        var _store = Ext.data.StoreManager.lookup("store_object_session_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'unused','value':{'start_date':Ext.Date.format(Ext.getCmp('dp_start').getValue(), 'Ymd'),'end_date':Ext.Date.format(Ext.getCmp('dp_end').getValue(), 'Ymd')}}));
        _store.loadPage(1);

        Ext.getCmp("btn_reset").show();
        Ext.getCmp("btn_find").hideMenu();

        this.filter = true;
    },

    onBtn_unuseClick: function(button, e, eOpts) {
        var me = this;
        var store = Ext.data.StoreManager.lookup('store_object_session_list');
        store.getProxy().setExtraParam('search_info',Ext.encode({'type':'_ref_cnt','value':'0'}));
        Ext.getCmp('btn_reset').show();
        store.load();
        // me.get_object_session();
    },

    onSession_search_textRender: function(component, eOpts) {
        component.emptyText = __zen('obj_name');
        component.applyEmptyText();
    },

    onBtn_searchClick: function(button, e, eOpts) {
        var me = this;
        if(Ext.getCmp('session_search_text').getValue() === ""){ return false; }
        else{
            var store = Ext.data.StoreManager.lookup('store_object_session_list');
            store.getProxy().setExtraParam('search_info',Ext.encode({'type':'name','value':Ext.getCmp('session_search_text').getValue()}));
            Ext.getCmp('btn_reset').show();
            store.load();
        //     me.get_object_session();
        }
    },

    onBtn_resetClick: function(button, e, eOpts) {
        var me = this;
        var store = Ext.data.StoreManager.lookup('store_object_session_list');
        store.getProxy().setExtraParam('search_info',Ext.encode({}));
        Ext.getCmp('session_search_text').reset();
        Ext.getCmp('btn_reset').hide();
        me.get_object_session();
    },

    onGridpanelCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;

        if(cellIndex !== 0){
            var win = Ext.create('NFW2.view.win_object_session',{
                edit : "edit",
                cid : record.data['@cid'],
                edit_index : rowIndex,
                max : me.max,
                modal : true
            });

            win.show();
        }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        var store = Ext.data.StoreManager.lookup('store_object_session_list');
        store.getProxy().setExtraParam('search_info',Ext.encode({}));

        var _params = {
            basename: Ext.encode('object_session'),
            search_info: Ext.encode({}),
            sort_list: Ext.encode([['name',1]])
        };

        request_helper.xmlrpc_call_JsonP(

            'ftuctrl',
            'getObjectList',
            _params,

            function(response){
                me.max = response.max_count;
            }
        );

        me.get_object_session();
    },

    get_object_session: function() {
        var me = this;
        var store = Ext.data.StoreManager.lookup('store_object_session_list');
        store.load(function(response){
            hideLoadMask();
            setTimeout(function(){ me.setWidth('100%'); },100);
            Ext.getCmp('st_fw_session_obj_cnt').setValue(store.totalCount + "/" + me.max);
        });
    }

});