
Ext.define('NFW2.view.NFW2_firewall_object_service_serviceGroup', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_firewall_object_service_servicegroup',

    requires: [
        'NFW2.view.NFW2_firewall_object_service_serviceGroupViewModel',
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
        type: 'nfw2_firewall_object_service_servicegroup'
    },
    cls: 'zen_body',
    id: 'serviceGroup',
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
                    xtype: 'button',
                    hidden: true,
                    toFrontOnShow: false,
                    enableToggle: true,
                    text: '전체 펼쳐보기',
                    listeners: {
                        toggle: 'onButtonToggle'
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
                                margin: ' ',
                                padding: 15,
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
                                            click: 'onButtonClick3'
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
                        click: 'onButtonClick4'
                    }
                },
                {
                    xtype: 'textfield',
                    id: 's_port',
                    enableKeyEvents: true,
                    listeners: {
                        keydown: 'onS_portKeydown',
                        render: 'onS_portRender'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'ic_ser',
                    listeners: {
                        click: 'onButtonClick5'
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
                                id: 'disp_ser_group_total',
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
                        title: '',
                        columnLines: true,
                        store: 'store_object_service_group_list',
                        columns: [
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    if(store.currentPage === 1){
                                        store.data.items[rowIndex].data['@num'] = rowIndex+1;
                                        return rowIndex + 1;
                                    }else{
                                        store.data.items[rowIndex].data['@num'] = rowIndex + ((store.currentPage-1) *store.pageSize) + 1;
                                        return rowIndex + ((store.currentPage-1) *store.pageSize) + 1;
                                    }
                                },
                                width: 60,
                                align: 'center',
                                dataIndex: '@num',
                                text: 'N'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'name',
                                flex: 0.5,
                                bind: {
                                    text: '{obj_name}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    if(me.rowIndex){
                                        metaData.style = "white-space:pre-line";
                                    }else{
                                        metaData.style = "white-space:nowrap";
                                    }

                                    if(me.all){
                                        metaData.style = "white-space:pre-line";
                                    }else{
                                        metaData.style = "white-space:nowrap";
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
                                store: 'store_object_service_group_list'
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

        var _store = Ext.data.StoreManager.lookup("store_object_service_group_list");

        me.onBtn_resetClick();

        if(_store.getTotalCount() >= me.count){

            Ext.Msg.alert(__weguardia,ValidMaxCnt(me.count));
            return false;
        }

        var win = Ext.create('NFW2.view.win_portgroup');
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
                        basename: Ext.encode("object_service_group"),
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
                            Ext.getCmp("serviceGroup").onBtn_resetClick();
                        }
                    );
                }
            });

        }
    },

    onButtonToggle: function(button, pressed, eOpts) {
        var me = this;

        me.all = pressed;
        var _store = Ext.data.StoreManager.lookup("store_object_service_group_list");
        _store.load();
    },

    onDp_startRender: function(component, eOpts) {
        var before = Ext.Date.add(new Date(),Ext.Date.DAY,-7);
        Ext.getCmp("dp_start").setValue(before);
    },

    onDp_endRender: function(component, eOpts) {
        Ext.getCmp("dp_end").setValue(new Date());
    },

    onButtonClick3: function(button, e, eOpts) {
        var start = Ext.getCmp('dp_start').getValue();
        var end = Ext.getCmp('dp_end').getValue();

        if(start > end){prt_errMsg(get_msg("err_datevalid"), "err_unused");	return false;}else{Ext.getCmp("err_unused").hide();}

        var _store = Ext.data.StoreManager.lookup("store_object_service_group_list");
        _store.getProxy().setExtraParam('basename',Ext.encode('object_service_group'));
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'unused','value':{'start_date':Ext.Date.format(Ext.getCmp('dp_start').getValue(), 'Ymd'),'end_date':Ext.Date.format(Ext.getCmp('dp_end').getValue(), 'Ymd')}}));
        _store.currentPage = 1;
        _store.load();

        Ext.getCmp("btn_reset").show();
    },

    onButtonClick1: function(button, e, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_object_service_group_list");
        _store.getProxy().setExtraParam('basename',Ext.encode('object_service_group'));
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'_ref_cnt','value':'0'}));
        _store.currentPage = 1;
        _store.load();

        Ext.getCmp("btn_reset").show();
    },

    onS_nameKeydown: function(textfield, e, eOpts) {
        if(e.getCharCode() === 13){
            var _store = Ext.data.StoreManager.lookup("store_object_service_group_list");
            _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'name','value':textfield.getValue()}));
            _store.currentPage = 1;
            _store.load();

            this.rowI = {};
            Ext.getCmp("btn_reset").show();
        }
    },

    onS_nameRender: function(component, eOpts) {
        component.emptyText = __zen('obj_name');
        component.applyEmptyText();
    },

    onButtonClick4: function(button, e, eOpts) {
        var name = Ext.getCmp("s_name");
        if(name.getValue()===""){ return false; }

        var _store = Ext.data.StoreManager.lookup("store_object_service_group_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'name','value':name.getValue()}));
        _store.currentPage = 1;
        _store.load();

        this.rowI = {};
        Ext.getCmp("btn_reset").show();
    },

    onS_portKeydown: function(textfield, e, eOpts) {
        if(e.getCharCode() === 13){

            if(textfield.getValue()===""){ return false; }

            port = Number(textfield.getValue());
            var _store = Ext.data.StoreManager.lookup("store_object_service_group_list");
            _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'protocol','value':{'$elemMatch':{'$or':[{'dest.start':{'$lte':port},'dest.end':{'$gte':port}}, {'source.start':{'$lte':port},'source.end':{'$gte':port}}]}}}));
            _store.currentPage = 1;
            _store.load();

            this.rowI = {};
            Ext.getCmp("btn_reset").show();
        }
    },

    onS_portRender: function(component, eOpts) {
        component.emptyText = __zen('group_mem_port');
        component.applyEmptyText();
    },

    onButtonClick5: function(button, e, eOpts) {
        var port = Ext.getCmp("s_port");
        if(port.getValue()===""){ return false; }

        port = Number(port.getValue());
        var _store = Ext.data.StoreManager.lookup("store_object_service_group_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'protocol','value':{'$elemMatch':{'$or':[{'dest.start':{'$lte':port},'dest.end':{'$gte':port}}, {'source.start':{'$lte':port},'source.end':{'$gte':port}}]}}}));
        _store.currentPage = 1;
        _store.load();

        this.rowI = {};
        Ext.getCmp("btn_reset").show();
    },

    onBtn_resetClick: function(button, e, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_object_service_group_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode([]));
        _store.currentPage = 1;
        Ext.getCmp("serviceGroup").store_load();

        Ext.getCmp("btn_reset").hide();
        Ext.getCmp("s_name").reset();
        Ext.getCmp("s_port").reset();
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        var _store = Ext.data.StoreManager.lookup("store_object_service_group_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode([]));
        _store.currentPage = 1;
        me.store_load();

        var rowI = {};
        me.rowI = rowI;

        var _params = {
            filename: Ext.encode('/proc/ferret/datasheet/service_grp_obj')
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
        var win = Ext.create('NFW2.view.win_portgroup',{
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

            var store = Ext.data.StoreManager.lookup("store_object_service_group_list");

            var _params = {
                basename: Ext.encode('object_service_group'),
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

                            var d_detail = [];
                            var type = detail[l]['@type'];
                            var br = (l===0)?"<br>":"";

                            d_detail.push(type.toUpperCase());

                            if(type === "tcp" || type === "udp"){

                                d_detail.push("출발:"+detail[l].source.start+"~"+detail[l].source.end);
                                d_detail.push("목적:"+detail[l].dest.start+"~"+detail[l].dest.end);
                            }else if(type === "icmp" || type === "icmpv6"){

                                d_detail.push("종류:"+detail[l].kind);
                            }

                            var time = (detail[l].timeout===false)?"0":detail[l].timeout;
                            d_detail.push("타임아웃:"+time);

                            d_record.push(br+"<font style='margin-left:20px'>"+d_detail.join(", ")+"</font>");
                        }

                        eval("var ri = rowI._"+rowIndex+";");

                        if(!ri){
                            m_record.push(list[i].name+" : <font style='color:#999;height:15px;white-space:pre-line'>"+d_record.join("<br>")+"</font>");
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

    store_load: function() {
        var me = this;
        var _store = Ext.data.StoreManager.lookup("store_object_service_group_list");
        _store.load(function(records,options,success){
            var tot = options.getProxy().getReader().rawData.retval;
            Ext.getCmp("disp_ser_group_total").setValue(tot.total+'/'+tot.max_count);

            hideLoadMask();
            setTimeout(function(){ me.setWidth('100%'); },100);
        });
    }

});