
Ext.define('NFW2.view.NFW2_firewall_object_service_servicePort', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_firewall_object_service_serviceport',

    requires: [
        'NFW2.view.NFW2_firewall_object_service_servicePortViewModel',
        'Ext.toolbar.Separator',
        'Ext.button.Split',
        'Ext.menu.Menu',
        'Ext.form.field.Date',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Display',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'nfw2_firewall_object_service_serviceport'
    },
    cls: 'zen_body',
    id: 'servicePort',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onPanelAfterRender'
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
                                margin: ' ',
                                padding: 15,
                                items: [
                                    {
                                        xtype: 'datefield',
                                        id: 'dp_start',
                                        labelCls: 'lb_arrow',
                                        labelSeparator: ' ',
                                        labelWidth: 60,
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
                                        labelCls: 'lb_arrow',
                                        labelSeparator: ' ',
                                        labelWidth: 60,
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
                    xtype: 'combobox',
                    hidden: true,
                    id: 'search_type',
                    width: 130,
                    value: 'name',
                    editable: false,
                    displayField: 'name',
                    valueField: 'val',
                    listeners: {
                        change: 'onSearch_typeChange'
                    }
                },
                {
                    xtype: 'textfield',
                    validator: function(value) {
                        if(!CheckNotNull(value)){ return true; }
                        if(Ext.getCmp("search_type").getValue() === "port"){
                            if(!ValidNum(value)){ return get_msg('err_form'); }
                            if(!LengthCheck(value, 0, 65535)){ return ValidLimit(0, 65535); }
                        }

                        return true;
                    },
                    hidden: true,
                    id: 'search_val',
                    msgTarget: 'none',
                    enableKeyEvents: true,
                    listeners: {
                        errorchange: 'onSearch_portErrorChange',
                        keydown: 'onSearch_portKeydown'
                    }
                },
                {
                    xtype: 'textfield',
                    id: 'search_name',
                    msgTarget: 'none',
                    enableKeyEvents: true,
                    listeners: {
                        keydown: 'onSearch_nameKeydown',
                        render: 'onSearch_nameRender'
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
                    xtype: 'combobox',
                    id: 'search_protocol',
                    value: 'all',
                    editable: false,
                    displayField: 'name',
                    queryMode: 'local',
                    valueField: 'val'
                },
                {
                    xtype: 'button',
                    iconCls: 'ic_ser',
                    listeners: {
                        click: 'onButtonClick51'
                    }
                },
                {
                    xtype: 'textfield',
                    validator: function(value) {
                        if(!CheckNotNull(value)){ return true; }
                        if(!ValidNum(value)){ return get_msg('err_form'); }
                        if(!LengthCheck(value, 0, 65535)){ return ValidLimit(0, 65535); }

                        return true;
                    },
                    id: 'search_port',
                    msgTarget: 'none',
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maskRe: /[0-9]/,
                    maxLength: 5,
                    listeners: {
                        errorchange: 'onSearch_portErrorChange1',
                        keydown: 'onSearch_portKeydown1',
                        render: 'onSearch_portRender'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'ic_ser',
                    listeners: {
                        click: 'onButtonClick511'
                    }
                },
                {
                    xtype: 'label',
                    cls: 'errorBox',
                    hidden: true,
                    id: 'err_valid',
                    text: 'My Label'
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
                                id: 'disp_service_total',
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
                        id: 'tbl_list',
                        title: '',
                        columnLines: true,
                        store: 'store_object_service_port_list',
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
                                    var arr_v = [];
                                    var _store = Ext.getCmp("tbl_list").getStore();

                                    for(var i=0; i<value.length; i++){
                                        if(_store.getProxy().url === "/api/ftuctrl/getObjects"){
                                            var type = value[i]['@type'];
                                            var tp = (type==='icmpv6')?"ICMPv6":type.toUpperCase();
                                            var list = [tp];

                                            if(type === 'tcp' || type === 'udp'){
                                                list.push(__zen('src')+':'+value[i].source.start+'~'+value[i].source.end);
                                                list.push(__zen('dest')+':'+value[i].dest.start+'~'+value[i].dest.end);
                                            }else if(type === 'icmp' || type === 'icmpv6'){
                                                list.push(__zen('type')+':'+value[i].kind);
                                            }

                                            if(value[i].timeout !== false){
                                                list.push(__zen('timeout')+':'+value[i].timeout);
                                            }
                                            arr_v.push(list.join(','));
                                        }else{
                                            if(value[i].indexOf("타임아웃")!==-1){
                                                var str = value[i].split(",");
                                                var as = [];
                                                for(var l=0; l<str.length-1; l++){
                                                    as.push(str[l]);
                                                }
                                                var time = str[str.length-1].split(":");
                                                as.push(__zen('timeout')+":"+addComma(time[1]));
                                                value[i] = as.join(",");
                                            }
                                            arr_v.push(value[i]);
                                        }
                                    }

                                    return arr_v.join("<br>");
                                },
                                dataIndex: 'protocol',
                                flex: 1.5,
                                bind: {
                                    text: '{protocol}'
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
                                store: 'store_object_service_port_list'
                            }
                        ],
                        listeners: {
                            celldblclick: 'onTbl_listCellDblClick'
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

        var _store = Ext.data.StoreManager.lookup("store_object_service_port_list");
        _store.getProxy().url = '/api/ftuctrl/getObjects';
        _store.getProxy().setExtraParam('basename',Ext.encode('with_cid'));
        _store.getProxy().setExtraParam('cond',Ext.encode({'_kind':'object_service_port'}));
        _store.currentPage = 1;
        me.store_load();

        var _params = {
            filename: Ext.encode('/proc/ferret/datasheet/service_obj')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            _params,
            function(response){

                me.count = response[0];
            }
        );

        var p_store = {
            data : [
                { "name":__zen('all'), "val":"all" },
                { "name":"TCP", "val":"tcp" },
                { "name":"UDP", "val":"udp" },
                { "name":"ICMP", "val":"icmp" },
                { "name":"IGMP", "val":"igmp" },
                { "name":"AH", "val":"ah" },
                { "name":"ESP", "val":"esp" },
                { "name":"GRE", "val":"gre" },
                { "name":"ICMPv6", "val":"icmpv6" },
                { "name":"EIGRP", "val":"eigrp" },
                { "name":"OSPF", "val":"ospf" },
                { "name":"RIP", "val":"rip" },
                { "name":"ISIS", "val":"isis" },
                { "name":"PIM", "val":"pim" },
                { "name":"IGRP", "val":"igrp" },
                { "name":"RSVP", "val":"rsvp" },
                { "name":"RTP", "val":"rtp" }
            ],
            fields: [
                { name: 'name' },
                { name: 'val' }
            ]
        };

        Ext.getCmp("search_protocol").bindStore(p_store);

        var record = {
            data: [{'name':__zen('obj_name'),'val':'name'},
                   {'name':__zen('protocol'),'val':'protocol'},
                   {'name':__zen('port'),'val':'port'}],
            fields: ['name','val']
        };
        Ext.getCmp("search_type").bindStore(record);
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var _store = Ext.StoreManager.lookup("store_object_service_port_list");

        me.onBtn_resetClick();

        if(_store.getTotalCount() >= me.count){

            Ext.Msg.alert(__weguardia,ValidMaxCnt(me.count));
            return false;
        }

        var win = Ext.create('NFW2.view.win_service_port');
        win.show();
    },

    onButtonClick2: function(button, e, eOpts) {
        var tbl = Ext.getCmp("tbl_list");
        var grid_chk = tbl.getSelectionModel().getSelection();

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
                        basename: Ext.encode("object_service_port"),
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
                            Ext.getCmp("servicePort").onBtn_resetClick();
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

    onButtonClick3: function(button, e, eOpts) {
        var start = Ext.getCmp('dp_start').getValue();
        var end = Ext.getCmp('dp_end').getValue();

        if(start > end){prt_errMsg(get_msg("err_datevalid"), "err_unused");	return false;}else{Ext.getCmp("err_unused").hide();}

        var _store = Ext.data.StoreManager.lookup("store_object_service_port_list");
        _store.getProxy().url = '/api/ftuctrl/getObjectList';
        _store.getProxy().setExtraParam('basename',Ext.encode('object_service_port'));
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'unused','value':{'start_date':Ext.Date.format(Ext.getCmp('dp_start').getValue(), 'Ymd'),'end_date':Ext.Date.format(Ext.getCmp('dp_end').getValue(), 'Ymd')}}));
        _store.currentPage = 1;
        _store.load();

        Ext.getCmp("btn_reset").show();
    },

    onButtonClick1: function(button, e, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_object_service_port_list");
        _store.getProxy().url = '/api/ftuctrl/getObjects';
        _store.getProxy().setExtraParam('basename',Ext.encode('with_cid'));
        _store.getProxy().setExtraParam('cond',Ext.encode({'_kind':'object_service_port','_ref_cnt':0}));
        _store.currentPage = 1;
        _store.load();

        Ext.getCmp("btn_reset").show();
    },

    onSearch_typeChange: function(field, newValue, oldValue, eOpts) {
        Ext.getCmp("search_protocol").reset();
        Ext.getCmp("search_val").reset();

        if(newValue === 'protocol'){
            Ext.getCmp("search_protocol").show();
            Ext.getCmp("search_val").hide();
        }else{
            Ext.getCmp("search_protocol").hide();
            Ext.getCmp("search_val").show();
        }
    },

    onSearch_portErrorChange: function(labelable, error, eOpts) {
        prt_errMsg_label(error,'err_valid');
    },

    onSearch_portKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false && Ext.getCmp("search_type").getValue() === "port"){
            e.stopEvent();
        }
    },

    onSearch_nameKeydown: function(textfield, e, eOpts) {
        if(e.getCharCode() === 13){
            var _store = Ext.data.StoreManager.lookup("store_object_service_port_list");
            _store.getProxy().url = '/api/ftuctrl/getObjects';
            _store.getProxy().setExtraParam('basename',Ext.encode('with_cid'));
            _store.getProxy().setExtraParam('cond',Ext.encode({'_kind':'object_service_port','name':{'$regex':'.*'+textfield.getValue()+'.*','$options':'imax'}}));

            _store.currentPage = 1;
            _store.load();

            Ext.getCmp("btn_reset").show();
        }
    },

    onSearch_nameRender: function(component, eOpts) {
        component.emptyText = __zen('obj_name');
        component.applyEmptyText();
    },

    onButtonClick5: function(button, e, eOpts) {
        /*var type = Ext.getCmp("search_type").getValue();
        var val = Ext.getCmp("search_val").getValue();
        var protocol = Ext.getCmp("search_protocol").getValue();

        if((type === 'name' || type === 'port') && val === ''){ return true; }
        if(type === 'protocol'){ val = protocol; }

        var _store = Ext.data.StoreManager.lookup("store_object_service_port_list");
        _store.getProxy().url = '/api/ftuctrl/getObjects';
        _store.getProxy().setExtraParam('basename',Ext.encode('with_cid'));
        if(type === 'name'){
            _store.getProxy().setExtraParam('cond',Ext.encode({'_kind':'object_service_port','name':{'$regex':'.*'+val+'.*','$options':'imax'}}));
        }else if(type == 'protocol'){
            _store.getProxy().setExtraParam('cond',Ext.encode({'_kind':'object_service_port','protocol':{'$elemMatch':{'@type':val}}}));
        }else{
            val = Number(val);
            _store.getProxy().setExtraParam('cond',Ext.encode({'_kind':'object_service_port','protocol':{'$elemMatch':{'$or':[{'dest.start':{'$lte':val},'dest.end':{'$gte':val}},
                                                                                                               {'source.start':{'$lte':val},'source.end':{'$gte':val}}]}}}));
        }*/
        var name = Ext.getCmp("search_name").getValue();

        if(name===""){ return false; }

        var _store = Ext.data.StoreManager.lookup("store_object_service_port_list");
        _store.getProxy().url = '/api/ftuctrl/getObjects';
        _store.getProxy().setExtraParam('basename',Ext.encode('with_cid'));
        _store.getProxy().setExtraParam('cond',Ext.encode({'_kind':'object_service_port','name':{'$regex':'.*'+name+'.*','$options':'imax'}}));

        _store.currentPage = 1;
        _store.load();

        Ext.getCmp("btn_reset").show();
    },

    onButtonClick51: function(button, e, eOpts) {
        var protocol = Ext.getCmp("search_protocol").getValue();

        if(protocol==="" || protocol===null){ return false; }

        var _store = Ext.data.StoreManager.lookup("store_object_service_port_list");
        _store.getProxy().url = '/api/ftuctrl/getObjects';
        _store.getProxy().setExtraParam('basename',Ext.encode('with_cid'));
        _store.getProxy().setExtraParam('cond',Ext.encode({'_kind':'object_service_port','protocol':{'$elemMatch':{'@type':protocol}}}));

        _store.currentPage = 1;
        _store.load();

        Ext.getCmp("btn_reset").show();
    },

    onSearch_portErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg_label(error,'err_valid');
    },

    onSearch_portKeydown1: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
            if(e.getCharCode() === 13){
                var port = textfield;

                if(port.getValue()===""){ return false; }
                if(port.isValid()===false){ port.focus(); return false; }

                var _store = Ext.data.StoreManager.lookup("store_object_service_port_list");
                _store.getProxy().url = '/api/ftuctrl/getObjects';
                _store.getProxy().setExtraParam('basename',Ext.encode('with_cid'));

                val = Number(port.getValue());
                _store.getProxy().setExtraParam('cond',Ext.encode({'_kind':'object_service_port','protocol':{'$elemMatch':{'$or':[{'dest.start':{'$lte':val},'dest.end':{'$gte':val}},
                                                                                                                                  {'source.start':{'$lte':val},'source.end':{'$gte':val}}]}}}));
                _store.currentPage = 1;
                _store.load();

                Ext.getCmp("btn_reset").show();
            }
        }
    },

    onSearch_portRender: function(component, eOpts) {
        component.emptyText = __zen('port');
        component.applyEmptyText();
    },

    onButtonClick511: function(button, e, eOpts) {
        var port = Ext.getCmp("search_port");

        if(port.getValue()===""){ return false; }
        if(port.isValid()===false){ port.focus(); return false; }

        var _store = Ext.data.StoreManager.lookup("store_object_service_port_list");
        _store.getProxy().url = '/api/ftuctrl/getObjects';
        _store.getProxy().setExtraParam('basename',Ext.encode('with_cid'));

        val = Number(port.getValue());
        _store.getProxy().setExtraParam('cond',Ext.encode({'_kind':'object_service_port','protocol':{'$elemMatch':{'$or':[{'dest.start':{'$lte':val},'dest.end':{'$gte':val}},
                                                                                                                 {'source.start':{'$lte':val},'source.end':{'$gte':val}}]}}}));
        _store.currentPage = 1;
        _store.load();

        Ext.getCmp("btn_reset").show();
    },

    onBtn_resetClick: function(button, e, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_object_service_port_list");
        _store.getProxy().url = '/api/ftuctrl/getObjects';
        _store.getProxy().setExtraParam('basename',Ext.encode('with_cid'));
        _store.getProxy().setExtraParam('cond',Ext.encode({'_kind':'object_service_port'}));
        _store.currentPage = 1;
        Ext.getCmp("servicePort").store_load();

        Ext.getCmp("search_val").reset();
        Ext.getCmp("search_protocol").reset();
        Ext.getCmp("btn_reset").hide();
    },

    onTbl_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('NFW2.view.win_service_port',{
            edit : "edit",
            cid : record.data['@cid'],
            num : record.data['@num']
        });
        win.show();
    },

    store_load: function() {
        var me = this;
        var _store = Ext.data.StoreManager.lookup("store_object_service_port_list");
        _store.load(function(records,options,success){
            var tot = options.getProxy().getReader().rawData.retval;
            Ext.getCmp("disp_service_total").setValue(tot.total+'/'+tot.max_count);

            hideLoadMask();
            setTimeout(function(){ me.setWidth('100%'); },100);
        });
    }

});