
Ext.define('NFW2.view.NFW2_firewall_object_ip_addressGroup', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_firewall_object_ip_addressgroup',

    requires: [
        'NFW2.view.NFW2_firewall_object_ip_addressGroupViewModel',
        'Ext.toolbar.Separator',
        'Ext.button.Split',
        'Ext.menu.Menu',
        'Ext.form.field.Date',
        'Ext.form.Label',
        'Ext.form.field.Display',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'nfw2_firewall_object_ip_addressgroup'
    },
    cls: 'zen_body',
    id: 'ipv4Group',
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
                        click: 'onButtonClick2'
                    }
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'button',
                    hidden: true,
                    enableToggle: true,
                    text: '전체 펼쳐보기',
                    listeners: {
                        toggle: 'onButtonToggle'
                    }
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
                        width: 260,
                        items: [
                            {
                                xtype: 'container',
                                cls: 'dv_pop_inner',
                                padding: 15,
                                items: [
                                    {
                                        xtype: 'datefield',
                                        id: 'dp_start',
                                        width: 230,
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
                                        width: 230,
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
                        click: 'onButtonClick1'
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
                    validator: function(value) {
                        if(value === ""){ return true; }
                        if(ValidIPAddress(value)===false){ return ValidIP("IP "); }
                        return true;
                    },
                    id: 's_mip',
                    fieldLabel: '',
                    msgTarget: 'none',
                    enableKeyEvents: true,
                    listeners: {
                        errorchange: 'onS_mipErrorChange',
                        keydown: 'onS_mipKeydown',
                        render: 'onS_mipRender'
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
                    xtype: 'label',
                    cls: 'errorBox',
                    id: 'err_valid',
                    listeners: {
                        afterrender: 'onErr_validAfterRender'
                    }
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'button',
                    hidden: true,
                    id: 'btn_ip_group_reset',
                    iconCls: 'ic_reset',
                    listeners: {
                        click: 'onResetClick1'
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
                        xtype: 'container',
                        flex: 1,
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
                                id: 'disp_ip_group_total',
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
                        flex: 1,
                        id: 'grid_list',
                        title: '',
                        columnLines: true,
                        store: 'store_object_ipv4_group_list',
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
                                    var me = Ext.getCmp("ipv4Group");

                                    if(me.rowIndex){
                                        metaData.style = "white-space:pre-line";
                                    }else{
                                        metaData.style = "white-space:pre";
                                    }

                                    if(me.all){
                                        metaData.style = "white-space:pre-line";
                                    }else{
                                        metaData.style = "white-space:pre";
                                    }

                                    return value;
                                },
                                dataIndex: 'member_name',
                                flex: 1.5,
                                bind: {
                                    text: '{group_member}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: '@count',
                                bind: {
                                    text: '{count_mem}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    return (value)?unixTimeConvert(value,"YMDHM",'GMT'):"";
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
                                    return (value)?unixTimeConvert(value,"YMDHM",'GMT'):"";
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
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                            selType: 'checkboxmodel'
                        }),
                        dockedItems: [
                            {
                                xtype: 'pagingtoolbar',
                                dock: 'bottom',
                                width: 360,
                                displayInfo: true,
                                store: 'store_object_ipv4_group_list'
                            }
                        ],
                        listeners: {
                            celldblclick: 'onGrid_listCellDblClick',
                            cellclick: 'onGrid_listCellClick'
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
        var _store = Ext.data.StoreManager.lookup("store_object_ipv4_group_list");

        me.onResetClick1();

        if(_store.getTotalCount() >= me.count){
            Ext.MessageBox.alert(__weguardia,ValidMaxCnt(me.count));
            return false;
        }

        var win = Ext.create('NFW2.view.win_ipv4_group');
        win.show();
    },

    onButtonClick2: function(button, e, eOpts) {
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
                        basename: Ext.encode("object_ip_group"),
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
                            Ext.getCmp("ipv4Group").onResetClick1();
                        }
                    );
                }
            });

        }
    },

    onButtonToggle: function(button, pressed, eOpts) {
        var me = this;

        me.all = pressed;
        var _store = Ext.data.StoreManager.lookup("store_object_ipv4_group_list");
        _store.load();
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

        var _store = Ext.data.StoreManager.lookup("store_object_ipv4_group_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'unused','value':{'start_date':Ext.Date.format(Ext.getCmp('dp_start').getValue(), 'Ymd'),'end_date':Ext.Date.format(Ext.getCmp('dp_end').getValue(), 'Ymd')}}));
        _store.currentPage = 1;
        _store.load();

        Ext.getCmp("btn_ip_group_reset").show();

        this.filter = true;
    },

    onButtonClick1: function(button, e, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_object_ipv4_group_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'_ref_cnt','value':'0'}));
        _store.currentPage = 1;
        _store.load();

        Ext.getCmp("btn_ip_group_reset").show();
    },

    onS_nameKeydown: function(textfield, e, eOpts) {
        if(e.getCharCode() === 13){

            var _store = Ext.data.StoreManager.lookup("store_object_ipv4_group_list");
            _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'name','value':textfield.getValue()}));
            _store.currentPage = 1;
            _store.load();

            this.rowI = {};
            Ext.getCmp("btn_ip_group_reset").show();
        }
    },

    onS_nameRender: function(component, eOpts) {
        component.emptyText = __zen('obj_name');
        component.applyEmptyText();
    },

    onButtonClick3: function(button, e, eOpts) {
        var name = Ext.getCmp("s_name");
        if(name.getValue()===""){ return false; }

        var _store = Ext.data.StoreManager.lookup("store_object_ipv4_group_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'name','value':name.getValue()}));
        _store.currentPage = 1;
        _store.load();

        this.rowI = {};
        Ext.getCmp("btn_ip_group_reset").show();
    },

    onS_mipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg_label(error, "err_valid");
    },

    onS_mipKeydown: function(textfield, e, eOpts) {
        if(e.getCharCode() === 13){

            if(ValidIPAddress(textfield.getValue())===false){
                prt_errMsg_label(ValidIP("IP "), "err_valid");
                textfield.focus();
                return false;
            }
            Ext.getCmp("err_valid").hide();

            var _store = Ext.data.StoreManager.lookup("store_object_ipv4_group_list");
            _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'ip','value':textfield.getValue()}));
            _store.currentPage = 1;
            _store.load();

            this.rowI = {};
            Ext.getCmp("btn_ip_group_reset").show();
        }
    },

    onS_mipRender: function(component, eOpts) {
        component.emptyText = __zen('group_mem_v4');
        component.applyEmptyText();
    },

    onButtonClick4: function(button, e, eOpts) {
        var ip = Ext.getCmp("s_mip");
        if(ip.getValue()===""){ return false; }

        if(ValidIPAddress(ip.getValue())===false){
            prt_errMsg_label(ValidIP("IP "), "err_valid");
            ip.focus();
            return false;
        }

        Ext.getCmp("err_valid").hide();

        var _store = Ext.data.StoreManager.lookup("store_object_ipv4_group_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'ip','value':ip.getValue()}));
        _store.currentPage = 1;
        _store.load();

        this.rowI = {};
        Ext.getCmp("btn_ip_group_reset").show();
    },

    onErr_validAfterRender: function(component, eOpts) {
        component.hide();
    },

    onResetClick1: function(button, e, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_object_ipv4_group_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode([]));
        _store.currentPage = 1;
        Ext.getCmp("ipv4Group").store_load();

        this.rowI = {};
        Ext.getCmp("btn_ip_group_reset").hide();
        Ext.getCmp("s_name").reset();
        Ext.getCmp("s_mip").reset();
        Ext.getCmp("err_valid").hide();
    },

    onGrid_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('NFW2.view.win_ipv4_group',{
            edit : "edit",
            cid : record.data['@cid'],
            num : record.data['@num']
        });
        win.show();
    },

    onGrid_listCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 3){

            var me = this;
            var rowI = me.rowI;

            var store = Ext.data.StoreManager.lookup("store_object_ipv4_group_list");

            var _params = {
                basename: Ext.encode('object_ip_group'),
                key_info: Ext.encode({'group_cid':record.get('@cid')})
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getObjectMembers',
                _params,
                function(response){

                    var list = response.list;
                    var m_record = [];

                    for(var i=0; i<list.length; i++){

                        var detail = list[i].detail;
                        var d_record = [];

                        for(var l=0; l<detail.length; l++){

                            d_record.push(detail[l]['#text']);
                        }

                        eval("var ri = rowI._"+rowIndex+";");

                        if(!ri){
                            m_record.push(list[i].name+" : <font style='color:#999;height:15px;white-space:pre-line'>"+d_record.join(", ")+"</font>");
                        }else{
                            m_record.push(list[i].name);
                        }
                    }

                    if(!ri){
                        eval("rowI._"+rowIndex+" = true;");
                        store.data.items[rowIndex].data.member_name = m_record.join("<br>");
                    }else{
                        eval("rowI._"+rowIndex+" = false;");
                        store.data.items[rowIndex].data.member_name = m_record.join(", ");
                    }

                    var re = store.data.items[rowIndex];

                    store.removeAt(rowIndex);
                    store.insert(rowIndex,re);
                }
            );
        }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        var _store = Ext.data.StoreManager.lookup("store_object_ipv4_group_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode([]));
        _store.currentPage = 1;
        me.store_load();

        var rowI = {};
        me.rowI = rowI;

        var _params = {
            filename: Ext.encode('/proc/ferret/datasheet/ip_grp_obj')
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
        var _store = Ext.data.StoreManager.lookup("store_object_ipv4_group_list");
        _store.load(function(records,options,success){
            var tot = options.getProxy().getReader().rawData.retval;
            Ext.getCmp("disp_ip_group_total").setValue(tot.total+'/'+tot.max_count);

            hideLoadMask();
            setTimeout(function(){ me.setWidth('100%'); },100);
        });
    }

});