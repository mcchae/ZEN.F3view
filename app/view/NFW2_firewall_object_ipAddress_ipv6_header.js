
Ext.define('NFW2.view.NFW2_firewall_object_ipAddress_ipv6_header', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.form.Panel',
        'Ext.button.Split',
        'Ext.menu.Menu',
        'Ext.form.field.Date',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.selection.CheckboxModel',
        'Ext.grid.View',
        'Ext.toolbar.Paging'
    ],

    id: 'NFW2_firewall_object_ipAddress_ipv6_header',
    title: '헤더',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
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
                                    xtype: 'button',
                                    id: 'btn_add',
                                    width: 100,
                                    text: '추가',
                                    listeners: {
                                        click: {
                                            fn: me.onBtn_addClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'btn_del',
                                    margin: '0 0 0 5',
                                    width: 100,
                                    text: '삭제',
                                    listeners: {
                                        click: {
                                            fn: me.onBtn_delClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'splitbutton',
                                    handler: function(button, e) {
                                        this.showMenu();
                                    },
                                    id: 'btn_find',
                                    margin: '0 0 0 5',
                                    width: 140,
                                    text: '미 참조 객체 검사',
                                    menu: {
                                        xtype: 'menu',
                                        width: 240,
                                        shadow: false,
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
                                                        fieldLabel: '시작일',
                                                        labelCls: 'lb_arrow',
                                                        labelSeparator: ' ',
                                                        labelWidth: 50,
                                                        editable: false,
                                                        format: 'Ymd',
                                                        submitFormat: 'Ymd',
                                                        listeners: {
                                                            render: {
                                                                fn: me.onDp_startRender,
                                                                scope: me
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype: 'datefield',
                                                        id: 'dp_end',
                                                        fieldLabel: '종료일',
                                                        labelCls: 'lb_arrow',
                                                        labelSeparator: ' ',
                                                        labelWidth: 50,
                                                        editable: false,
                                                        format: 'Ymd',
                                                        submitFormat: 'Ymd',
                                                        listeners: {
                                                            render: {
                                                                fn: me.onDp_endRender,
                                                                scope: me
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        cls: 'errorBox',
                                                        hidden: true,
                                                        id: 'err_unused',
                                                        margin: '10 0',
                                                        text: 'My Label'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        margin: '0 0 0 60',
                                                        width: 100,
                                                        text: '확인',
                                                        listeners: {
                                                            click: {
                                                                fn: me.onButtonClick,
                                                                scope: me
                                                            }
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
                                    margin: '0 0 0 5',
                                    width: 130,
                                    text: '미 사용 객체 검사',
                                    listeners: {
                                        click: {
                                            fn: me.onBtn_unuseClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    hidden: true,
                                    id: 'btn_res',
                                    margin: '0 0 0 5',
                                    width: 100,
                                    text: 'Reset',
                                    listeners: {
                                        click: {
                                            fn: me.onBtn_resClick,
                                            scope: me
                                        }
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
                                    id: 'grid_ipv6header',
                                    header: false,
                                    title: 'My Grid Panel',
                                    columnLines: true,
                                    store: 'store_object_ipv6header_list',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            width: 40,
                                            align: 'center',
                                            dataIndex: '@num',
                                            text: 'N'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            align: 'center',
                                            dataIndex: 'name',
                                            text: '객체 이름',
                                            flex: 0.25
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var header = [];

                                                for(var i in value){
                                                    if(value[i]['@type'] === "hopbyhop"){ header.push("Hop-by-Hop"); }
                                                    else if(value[i]['@type'] === "dest"){ header.push("목적지"); }
                                                    else if(value[i]['@type'] === "fragment"){ header.push("프래그먼트"); }
                                                    else if(value[i]['@type'] === "auth"){ header.push("인증"); }
                                                    else if(value[i]['@type'] === "esp"){ header.push("ESP"); }
                                                    else if(value[i]['@type'] === "route"){ header.push("라우팅"); }
                                                }

                                                var result = "";

                                                for(var i in header){
                                                    if(i === "0"){ result = result + header[i]; }
                                                    else{ result = result + "/" + header[i]; }
                                                }

                                                return result;
                                            },
                                            align: 'center',
                                            dataIndex: 'header',
                                            text: '헤더',
                                            flex: 0.5
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            align: 'center',
                                            dataIndex: 'lasthit',
                                            text: '참조일',
                                            flex: 0.2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            align: 'center',
                                            dataIndex: 'desc',
                                            text: '설명',
                                            flex: 0.2
                                        }
                                    ],
                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                    }),
                                    listeners: {
                                        celldblclick: {
                                            fn: me.onGrid_ipv6headerCellDblClick,
                                            scope: me
                                        }
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
            ],
            listeners: {
                afterrender: {
                    fn: me.onPanelAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBtn_addClick: function(button, e, eOpts) {
        var me = this;

        var store = Ext.data.StoreManager.lookup('store_object_ipv6header_list');

        if(store.getCount() > me.max-1){
            Ext.Msg.show({
                title: 'WeGuardia™ DMC',
                msg: ValidMaxCnt(me.max),
                width: 300,
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO
            });
            return false;
        }
        else{
            var win = Ext.create('NFW2.view.win_object_ipAddress_ipv6Header',{
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
                                    title: 'WeGuardia™ DMC',
                                    width: 300,
                                    msg: get_msg('msg_ok_del'),
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.window.MessageBox.INFO
                                });
                            }
                        }
                    );
                }
                me.get_ipv6_header();
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

        if(start > end){prt_errMsg(get_msg("err_datevalid"), "err_unused");     return false;}else{Ext.getCmp("err_unused").hide();}

        var _store = Ext.data.StoreManager.lookup("store_object_ipv6header_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'unused','value':{'start_date':Ext.Date.format(Ext.getCmp('dp_start').getValue(), 'Ymd'),'end_date':Ext.Date.format(Ext.getCmp('dp_end').getValue(), 'Ymd')}}));
        _store.loadPage(1);

        Ext.getCmp("btn_res").show();
        Ext.getCmp('btn_find').hideMenu();

        this.filter = true;
    },

    onBtn_unuseClick: function(button, e, eOpts) {
        var me = this;

        Ext.getCmp('btn_res').show();
        me.search = "search";

        me.get_ipv6_header();
    },

    onBtn_resClick: function(button, e, eOpts) {
        var me = this;

        Ext.getCmp('btn_res').hide();
        me.search = "none";

        me.get_ipv6_header();
    },

    onGrid_ipv6headerCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0){ return false; }

        var win = Ext.create('NFW2.view.win_object_ipAddress_ipv6Header',{
            edit : "edit",
            cid : record.data['@cid'],
            edit_index : rowIndex,
            modal : true
        });

        win.show();
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        var store_ipv6 = Ext.data.StoreManager.lookup('store_ipv6_object_list');

        showLoadMask();
        var _params = {
            filename: Ext.encode('/proc/ferret/datasheet/ipv6_header')
        };

        request_helper.xmlrpc_call_JsonP(

            'ftuctrl',
            'getFileContent',
            _params,

            function(response){
                me.max = response[0];
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

                defult_records.push({
                    'name' : 'select',
                    '@cid' : 'null'
                });
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

        if(me.search === "search"){
            store.getProxy().setExtraParam('basename',Ext.encode("object_ipv6_header"));
            store.getProxy().setExtraParam('search_info',Ext.encode({'type':'_ref_cnt','value':'0'}));
            store.getProxy().setExtraParam('sort_list',Ext.encode([['@num',1]]));
        }
        else{
            store.getProxy().setExtraParam('basename',Ext.encode("object_ipv6_header"));
            store.getProxy().setExtraParam('search_info',Ext.encode({}));
            store.getProxy().setExtraParam('sort_list',Ext.encode([['@num',1]]));
        }

        store.load();

    }

});