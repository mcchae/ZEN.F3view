
Ext.define('NFW2.view.NFW2_firewall_object_domain', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_firewall_object_domain',

    requires: [
        'NFW2.view.NFW2_firewall_object_domainViewModel',
        'Ext.toolbar.Separator',
        'Ext.button.Split',
        'Ext.menu.Menu',
        'Ext.form.field.Date',
        'Ext.form.Label',
        'Ext.form.field.Display',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.toolbar.Paging',
        'Ext.selection.CheckboxModel'
    ],

    viewModel: {
        type: 'nfw2_firewall_object_domain'
    },
    cls: 'zen_body',
    id: 'NFW2_domain',
    defaultListenerScope: true,

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
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'splitbutton',
                            handler: function(button, e) {
                                this.showMenu();
                            },
                            bind: {
                                text: '{obj_unrefer}'
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
                            bind: {
                                text: '{obj_unused}'
                            },
                            listeners: {
                                click: 'onButtonClick2'
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'textfield',
                            id: 's_name',
                            fieldLabel: '',
                            enableKeyEvents: true,
                            listeners: {
                                keydown: 'onS_nameKeydown',
                                render: 'onS_nameRender'
                            }
                        },
                        {
                            xtype: 'button',
                            iconCls: 'ic_ser',
                            listeners: {
                                click: 'onButtonClick3'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: 's_domain',
                            fieldLabel: '',
                            enableKeyEvents: true,
                            listeners: {
                                keydown: 'onS_domainKeydown',
                                render: 'onS_domainRender'
                            }
                        },
                        {
                            xtype: 'button',
                            iconCls: 'ic_ser',
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
                            id: 'btn_domain_reset',
                            iconCls: 'ic_reset',
                            listeners: {
                                click: 'onBtn_resetClick'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch',
                padding: '0 20 0 0'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1
                },
                {
                    xtype: 'displayfield',
                    id: 'disp_domain_total',
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
            xtype: 'gridpanel',
            id: 'grid_list',
            columnLines: true,
            store: 'store_domain_list',
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
                        text: '{obj_name}'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return '<font style="height:15px;white-space:pre-line">'+value.join(', ')+'</font>';
                    },
                    dataIndex: 'domain',
                    flex: 1.5,
                    bind: {
                        text: '{domain}'
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
                    flex: 1,
                    bind: {
                        text: '{desc}'
                    }
                }
            ],
            listeners: {
                celldblclick: 'onGrid_listCellDblClick'
            },
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    displayInfo: true,
                    store: 'store_domain_list'
                }
            ],
            selModel: {
                selType: 'checkboxmodel'
            }
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender'
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;
        var _store = Ext.data.StoreManager.lookup("store_domain_list");

        me.onBtn_resetClick();

        if(_store.getTotalCount() >= me.count){
            Ext.Msg.alert(__weguardia,ValidMaxCnt(me.count));
            return false;
        }

        var win = Ext.create('NFW2.view.win_ipv4_domain');
        win.show();
    },

    onButtonClick1: function(button, e, eOpts) {
        var grid = Ext.getCmp("grid_list");
        var grid_chk = grid.getSelectionModel().getSelection();

        if(grid_chk.length === 0){
            Ext.Msg.alert(__weguardia,get_msg("sel_del"));
            return false;
        }else{
            Ext.MessageBox.confirm(__weguardia,get_msg("conf_del"),function(btn){
                if(btn === "yes"){
                    var del = [];
                    for(var i=0; i<grid_chk.length; i++){
                        del[i] = grid_chk[i].data['@cid'];
                    }

                    var key_list = del;

                    var _param = {
                        basename: Ext.encode("object_domain"),
                        id_info: Ext.encode({'fieldname':'@cid', 'values':key_list}),
                        renum_info: Ext.encode({'fieldname':'@num'})
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'delObjectWithCid',
                        _param,
                        function(response){

                            if(response.fail_total > 0){

                                var ar_use = [];
                                for(var i in response.fail_list){
                                    if(response.fail_list[i].reason === "in_use")
                                        ar_use.push(response.fail_list[i].name);
                                }
                                var in_use = ar_use.join(" , ");
                                Ext.Msg.alert(__weguardia,get_msg('err_objdel')+in_use);
                            }
                            Ext.getCmp("NFW2_domain").onBtn_resetClick();
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

    onButtonClick5: function(button, e, eOpts) {
        var start = Ext.getCmp('dp_start').getValue();
        var end = Ext.getCmp('dp_end').getValue();

        if(start > end){prt_errMsg(get_msg("err_datevalid"), "err_unused");	return false;}else{Ext.getCmp("err_unused").hide();}

        var _store = Ext.data.StoreManager.lookup("store_domain_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'unused','value':{'start_date':Ext.Date.format(Ext.getCmp('dp_start').getValue(), 'Ymd'),'end_date':Ext.Date.format(Ext.getCmp('dp_end').getValue(), 'Ymd')}}));
        _store.currentPage = 1;
        _store.load();

        Ext.getCmp("btn_domain_reset").show();
    },

    onButtonClick2: function(button, e, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_domain_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'_ref_cnt','value':'0'}));
        _store.currentPage = 1;
        _store.load();

        Ext.getCmp("btn_domain_reset").show();
    },

    onS_nameKeydown: function(textfield, e, eOpts) {
        if(e.getCharCode()===13){
            var _store = Ext.data.StoreManager.lookup("store_domain_list");
            _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'name','value':textfield.getValue()}));
            _store.currentPage = 1;
            _store.load();

            Ext.getCmp("btn_domain_reset").show();
        }
    },

    onS_nameRender: function(component, eOpts) {
        component.emptyText = __zen('obj_name');
        component.applyEmptyText();
    },

    onButtonClick3: function(button, e, eOpts) {
        var name = Ext.getCmp("s_name").getValue();

        if(name===""){ return false; }

        var _store = Ext.data.StoreManager.lookup("store_domain_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'name','value':name}));
        _store.currentPage = 1;
        _store.load();

        Ext.getCmp("btn_domain_reset").show();
    },

    onS_domainKeydown: function(textfield, e, eOpts) {
        if(e.getCharCode()===13){
            var _store = Ext.data.StoreManager.lookup("store_domain_list");
            _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'domain','value':textfield.getValue()}));
            _store.currentPage = 1;
            _store.load();

            Ext.getCmp("btn_domain_reset").show();
        }
    },

    onS_domainRender: function(component, eOpts) {
        component.emptyText = __zen('domain');
        component.applyEmptyText();
    },

    onButtonClick4: function(button, e, eOpts) {
        var domain = Ext.getCmp("s_domain");

        if(domain.getValue()===""){ return false; }

        var _store = Ext.data.StoreManager.lookup("store_domain_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'domain','value':domain.getValue()}));
        _store.currentPage = 1;
        _store.load();

        Ext.getCmp("btn_domain_reset").show();
    },

    onBtn_resetClick: function(button, e, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_domain_list");
        _store.getProxy().url = '/api/ftuctrl/getObjectList';
        _store.getProxy().setExtraParam('basename',Ext.encode('object_domain'));
        _store.getProxy().setExtraParam('search_info',Ext.encode([]));
        _store.currentPage = 1;
        Ext.getCmp("NFW2_domain").store_load();

        Ext.getCmp("btn_domain_reset").hide();
        Ext.getCmp("s_name").reset();
        Ext.getCmp("s_domain").reset();
    },

    onGrid_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('NFW2.view.win_ipv4_domain',{
            'edit': 'edit',
            'cid': record.data['@cid'],
            'num': record.data['@num']
        });
        win.show();
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        var _store = Ext.data.StoreManager.lookup("store_domain_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode([]));
        _store.currentPage = 1;
        me.store_load();

        var _params = {
            filename: Ext.encode('/proc/ferret/datasheet/domain_obj')
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

    store_load: function() {
        var me = this;

        var _store = Ext.data.StoreManager.lookup("store_domain_list");
        _store.load(function(records,options,success){
            var tot = options.getProxy().getReader().rawData.retval;
            Ext.getCmp("disp_domain_total").setValue(tot.total+'/'+tot.max_count);

            hideLoadMask();
            setTimeout(function(){ me.setWidth('100%'); },100);
        });
    }

});