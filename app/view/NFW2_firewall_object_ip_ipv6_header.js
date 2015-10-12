
Ext.define('NFW2.view.NFW2_firewall_object_ip_ipv6_header', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_firewall_object_ip_ipv6_header',

    requires: [
        'NFW2.view.NFW2_firewall_object_ip_ipv6_headerViewModel',
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
        type: 'nfw2_firewall_object_ip_ipv6_header'
    },
    cls: 'zen_body',
    id: 'NFW2_firewall_object_ip_ipv6_header',
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
                                                id: 'ipv6_header_search',
                                                emptyText: '객체 이름',
                                                listeners: {
                                                    render: 'onIpv6_header_searchRender'
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
                                                id: 'btn_res',
                                                iconCls: 'ic_reset',
                                                listeners: {
                                                    click: 'onBtn_resClick'
                                                }
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
                                        id: 'st_fw_ipv6_header_obj_cnt',
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
                                        id: 'grid_ipv6header',
                                        header: false,
                                        title: 'My Grid Panel',
                                        columnLines: true,
                                        store: 'store_object_ipv6header_list',
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
                                                flex: 0.25,
                                                bind: {
                                                    text: '{obj_name}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var header = [];

                                                    for(var i in value){
                                                        if(value[i]['@type'] === "hopbyhop"){ header.push(__zen("header_o_hop")); }
                                                        else if(value[i]['@type'] === "dest"){ header.push(__zen("header_o_dest")); }
                                                        else if(value[i]['@type'] === "fragment"){ header.push(__zen("header_o_frag")); }
                                                        else if(value[i]['@type'] === "auth"){ header.push(__zen("header_o_auth")); }
                                                        else if(value[i]['@type'] === "esp"){ header.push(__zen("header_o_esp")); }
                                                        else if(value[i]['@type'] === "route"){ header.push(__zen("header_o_route")); }
                                                    }

                                                    var result = "";

                                                    for(var i in header){
                                                        if(i === "0"){ result = result + header[i]; }
                                                        else{ result = result + "/" + header[i]; }
                                                    }

                                                    return result;
                                                },
                                                dataIndex: 'header',
                                                flex: 0.4,
                                                bind: {
                                                    text: '{header}'
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
                                            celldblclick: 'onGrid_ipv6headerCellDblClick'
                                        },
                                        dockedItems: [
                                            {
                                                xtype: 'pagingtoolbar',
                                                dock: 'bottom',
                                                id: 'toolbar',
                                                width: 360,
                                                displayInfo: true,
                                                store: 'store_object_ipv6header_list'
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

        var store = Ext.data.StoreManager.lookup('store_object_ipv6header_list');

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
            var win = Ext.create('NFW2.view.win_object_ipAddress_ipv6Header',{
                max : me.max,
                modal : true
            });

            win.show();
        }
    },

    onBtn_delClick: function(button, e, eOpts) {
        var me = this;

        var tbl = Ext.getCmp("grid_ipv6header");
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
                        basename : Ext.encode('object_ipv6_header'),
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
                            var store = Ext.data.StoreManager.lookup('store_object_ipv6header_list');
                            store.getProxy().setExtraParam('search_info',Ext.encode({}));
                            Ext.getCmp('ipv6_header_search').reset();
                            Ext.getCmp('btn_res').hide();
                            me.get_ipv6_header();
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

        if(start > end){prt_errMsg_label(get_msg("err_datevalid"), "err_unused");  return false;}else{Ext.getCmp("err_unused").hide();}

        var _store = Ext.data.StoreManager.lookup("store_object_ipv6header_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'unused','value':{'start_date':Ext.Date.format(Ext.getCmp('dp_start').getValue(), 'Ymd'),'end_date':Ext.Date.format(Ext.getCmp('dp_end').getValue(), 'Ymd')}}));
        _store.loadPage(1);
        Ext.getCmp('btn_res').show();
        Ext.getCmp('btn_find').hideMenu();

        this.filter = true;
    },

    onBtn_unuseClick: function(button, e, eOpts) {
        var me = this;

        var _store = Ext.data.StoreManager.lookup("store_object_ipv6header_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'_ref_cnt','value':'0'}));
        Ext.getCmp('btn_res').show();
        _store.load();
        // me.get_ipv6_header();
    },

    onIpv6_header_searchRender: function(component, eOpts) {
        component.emptyText = __zen('obj_name');
        component.applyEmptyText();
    },

    onBtn_searchClick: function(button, e, eOpts) {
        var me = this;

        if(Ext.getCmp('ipv6_header_search').getValue() === ""){ return false; }
        else{
            var _store = Ext.data.StoreManager.lookup("store_object_ipv6header_list");
            _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'name','value':Ext.getCmp('ipv6_header_search').getValue()}));
            Ext.getCmp('btn_res').show();
            _store.load();
        //     me.get_ipv6_header();
        }
    },

    onBtn_resClick: function(button, e, eOpts) {
        var me = this;

        var _store = Ext.data.StoreManager.lookup("store_object_ipv6header_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode({}));
        Ext.getCmp('ipv6_header_search').reset();
        Ext.getCmp('btn_res').hide();

        me.get_ipv6_header();
    },

    onGrid_ipv6headerCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = Ext.getCmp('NFW2_firewall_object_ip_ipv6_header');
        if(cellIndex === 0){ return false; }

        var win = Ext.create('NFW2.view.win_object_ipAddress_ipv6Header',{
            edit : "edit",
            cid : record.data['@cid'],
            edit_index : rowIndex,
            max : me.max,
            modal : true
        });

        win.show();
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        var store_ipv6 = Ext.data.StoreManager.lookup('store_ipv6_object_list');
        var store = Ext.data.StoreManager.lookup('store_object_ipv6header_list');
        store.getProxy().setExtraParam('search_info',Ext.encode({}));
        var _params = {
            basename: Ext.encode('object_ipv6_header'),
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

        var defult_records = [];

        var _params = {
            basename : Ext.encode('object_ipv6_address')
        };

        var _params_group = {
            basename : Ext.encode('object_ipv6_group')
        };

        Ext.data.JsonP.request({
            url : "/api/ftuctrl/getObjectList",
            params : _params,
            success : function(response){

                //         defult_records.push({
                //             'name' : 'select',
                //             '@cid' : 'null'
                //         });
                defult_records.push({
                    'name' : '--IPv6---',
                    '@cid' : 'menu'
                });

                if(response.retcode){
                    for(var i in response.retval.list){
                        defult_records.push({
                            'name' : response.retval.list[i].name,
                            'num' : response.retval.list[i]['@num'],
                            'ip' : response.retval.list[i].ip,
                            'desc' : response.retval.list[i].desc,
                            '@cid' : response.retval.list[i]['@cid']
                        });
                    }
                }
                defult_records.push({
                    'name' : '--IPv6 group---',
                    '@cid' : 'menu'
                });

                Ext.data.JsonP.request({

                    url : "/api/ftuctrl/getObjectList",
                    params : _params_group,
                    success : function(response){
                        hideLoadMask();
                        setTimeout(function(){ me.setWidth('100%'); },100);
                        if(response.retcode){
                            for(var i in response.retval.list){

                                defult_records.push({
                                    'name' : response.retval.list[i].name,
                                    'num' : response.retval.list[i]['@num'],
                                    'ip' : response.retval.list[i].ip,
                                    'desc' : response.retval.list[i].desc,
                                    '@cid' : response.retval.list[i]['@cid']
                                });
                            }
                        }
                        store_ipv6.loadData(defult_records);

                        me.get_ipv6_header();
                    }
                });
            }
        });


    },

    get_ipv6_header: function() {
        var me = this;
        var store = Ext.data.StoreManager.lookup('store_object_ipv6header_list');

        store.load(function(response){
            Ext.getCmp('st_fw_ipv6_header_obj_cnt').setValue(store.totalCount +"/" + me.max);
        });
    }

});