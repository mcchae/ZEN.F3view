
Ext.define('NFW2.view.NFW2_firewall_object_user', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_firewall_object_user',

    requires: [
        'NFW2.view.NFW2_firewall_object_userViewModel',
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
        type: 'nfw2_firewall_object_user'
    },
    cls: 'zen_body',
    id: 'NFW2_user',
    defaultListenerScope: true,

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
                                        cls: 'lb_arrow',
                                        id: 'dp_start',
                                        width: 220,
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
                                        cls: 'lb_arrow',
                                        id: 'dp_end',
                                        width: 220,
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
                        click: 'onButtonClick4'
                    }
                },
                {
                    xtype: 'splitbutton',
                    handler: function(button, e) {
                        var me = this;

                        var _param = {
                            'basename': Ext.encode('user_awareness_auth_server___v1'),
                            'sort_list': Ext.encode([['name',1]]),
                            'cond': Ext.encode({'$or':[{'stype':'ldap'},{'stype':'ad'}]})
                        };

                        request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'getObjects',
                        _param,
                        function(response){

                            var data = [];
                            if(response.list.length === 0){
                                Ext.MessageBox.alert(__weguardia,__zen('user_msg1'));
                                return false;
                            }
                            for(var i=0; i<response.list.length; i++){
                                data.push({ 'name':response.list[i].name, 'val':response.list[i].name });
                            }

                            var record = Ext.create('Ext.data.Store',{
                                data: data,
                                fields: ['name','val']
                            });

                            Ext.getCmp("svr_name").bindStore(record);
                            if(data[0]){
                                Ext.getCmp("svr_name").setValue(data[0].val);
                            }
                            me.showMenu();
                        }
                        );

                    },
                    componentCls: 'btn_auth',
                    id: 'btn_import',
                    bind: {
                        text: '{user_import}'
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
                                        xtype: 'combobox',
                                        cls: 'lb_arrow',
                                        id: 'svr_name',
                                        width: 220,
                                        labelSeparator: ' ',
                                        labelWidth: 90,
                                        editable: false,
                                        emptyText: 'Select',
                                        displayField: 'name',
                                        valueField: 'val',
                                        bind: {
                                            fieldLabel: '{server_select}'
                                        }
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
                                            click: 'onButtonClick6'
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    listeners: {
                        arrowclick: 'onBtn_importArrowClick'
                    }
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'combobox',
                    id: 'ser_type',
                    width: 200,
                    labelSeparator: ' ',
                    labelWidth: 70,
                    value: 'name',
                    editable: false,
                    displayField: 'name',
                    valueField: 'val',
                    bind: {
                        fieldLabel: '{search_type}'
                    },
                    listeners: {
                        change: 'onSer_typeChange'
                    }
                },
                {
                    xtype: 'textfield',
                    id: 'user_search',
                    enableKeyEvents: true,
                    listeners: {
                        keydown: 'onUser_searchKeydown'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'ic_ser',
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
                    id: 'b_tbl_reset',
                    iconCls: 'ic_reset',
                    listeners: {
                        click: 'onButtonClick3'
                    }
                }
            ]
        }
    ],
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
                    id: 'disp_user_total',
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
            cls: 'tbl_fw',
            id: 'grid_list',
            columnLines: true,
            store: 'store_user_list',
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
                    flex: 1,
                    bind: {
                        text: '{obj_name}'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'user_id',
                    flex: 1,
                    bind: {
                        text: '{user_id}'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'user_name',
                    flex: 1,
                    bind: {
                        text: '{user_name}'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'user_depart',
                    flex: 1,
                    bind: {
                        text: '{user_depart}'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'auth_srv',
                    flex: 1,
                    bind: {
                        text: '{auth_server}'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'idle_to',
                    flex: 1,
                    bind: {
                        text: '{idle_timeout}'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                    },
                    dataIndex: 'restriction',
                    flex: 1,
                    bind: {
                        text: '{limit_access}'
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
            viewConfig: {
                getRowClass: function(record, rowIndex, rowParams, store) {

                    if(record.data.restriction === "Y"){

                        Ext.Function.defer(function(){
                            this.removeRowCls(rowIndex, 'x-grid-row-alt');
                        },100, this);

                        return "stOff";
                    }
                }
            },
            selModel: {
                selType: 'checkboxmodel'
            },
            listeners: {
                celldblclick: 'onGrid_listCellDblClick'
            },
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    displayInfo: true,
                    store: 'store_user_list'
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender'
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp("NFW2_user");

        me.onButtonClick3();

        var _params = {
            filename: Ext.encode('/proc/ferret/datasheet/user_obj')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            _params,
            function(response){

                if(Ext.getCmp("grid_list").getStore().getTotalCount() >= response[0]){
                    Ext.MessageBox.alert(__weguardia,ValidMaxCnt(response[0]));
                    return false;
                }

                me.count = response[0];
                var win = Ext.create('NFW2.view.win_user');
                win.show();
            }
        );
    },

    onButtonClick1: function(button, e, eOpts) {
        var grid = Ext.getCmp("grid_list");
        var grid_chk = grid.getSelectionModel().getSelection();

        if(grid_chk.length === 0){
            Ext.MessageBox.alert(__weguardia,get_msg("sel_del"));
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
                        basename: Ext.encode("object_user"),
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
                                var in_use = ar_use.join(", ");
                                Ext.MessageBox.alert(__weguardia,get_msg('err_objdel')+in_use);
                            }
                            Ext.getCmp("NFW2_user").onButtonClick3();
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

        var _store = Ext.data.StoreManager.lookup("store_user_list");
        _store.getProxy().url = '/api/ftuctrl/getObjectList';
        _store.getProxy().setExtraParam('basename',Ext.encode('object_user'));
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'unused','value':{'start_date':Ext.Date.format(Ext.getCmp('dp_start').getValue(), 'Ymd'),'end_date':Ext.Date.format(Ext.getCmp('dp_end').getValue(), 'Ymd')}}));
        _store.currentPage = 1;
        _store.load();

        Ext.getCmp("b_tbl_reset").show();
    },

    onButtonClick4: function(button, e, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_user_list");
        _store.getProxy().url = '/api/ftuctrl/getObjects';
        _store.getProxy().setExtraParam('basename',Ext.encode('with_cid'));
        _store.getProxy().setExtraParam('cond',Ext.encode({'_kind':'object_user','_ref_cnt':0}));
        _store.currentPage = 1;
        _store.load();

        Ext.getCmp("b_tbl_reset").show();
    },

    onButtonClick6: function(button, e, eOpts) {
        var me = this;
        var svr_name = Ext.getCmp("svr_name");

        if(svr_name.getValue()){
            Ext.getCmp("btn_import").hideMenu();
            var _params = {
                func_name: Ext.encode('mod_object_user_import'),
                args: Ext.encode({'svr_name':svr_name.getValue()})
            };
            me.mask('Loading...');

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'execKctrlFunc',
                _params,
                function(response){

                    me.unmask();
                    if(response[0] === false){ Ext.Msg.alert(__weguardia,response[1]);return false; }
                    var win = Ext.create('NFW2.view.win_user_import');
                    win.show();
                }
            );
        }
    },

    onBtn_importArrowClick: function(splitbutton, e, eOpts) {
        splitbutton.hideMenu();
        splitbutton.handler();
    },

    onSer_typeChange: function(field, newValue, oldValue, eOpts) {
        Ext.getCmp("user_search").reset();
    },

    onUser_searchKeydown: function(textfield, e, eOpts) {
        if(e.getCharCode()===13){
            var type = Ext.getCmp("ser_type").getValue();
            var search = Ext.getCmp("user_search");

            if(type === null){ return false; }

            var _store = Ext.data.StoreManager.lookup("store_user_list");
            _store.getProxy().url = '/api/ftuctrl/getObjects';
            _store.getProxy().setExtraParam('basename',Ext.encode('with_cid'));
            eval("_store.getProxy().setExtraParam('cond',Ext.encode({'_kind':'object_user','"+type+"':{'$regex':'.*'+search.getValue()+'.*','$options':'imax'}}));");
            _store.currentPage = 1;
            _store.load();

            Ext.getCmp("b_tbl_reset").show();
        }
    },

    onButtonClick2: function(button, e, eOpts) {
        var type = Ext.getCmp("ser_type").getValue();
        var search = Ext.getCmp("user_search");

        if(search.getValue()===""){ return false; }

        var _store = Ext.data.StoreManager.lookup("store_user_list");
        _store.getProxy().url = '/api/ftuctrl/getObjects';
        _store.getProxy().setExtraParam('basename',Ext.encode('with_cid'));
        eval("_store.getProxy().setExtraParam('cond',Ext.encode({'_kind':'object_user','"+type+"':{'$regex':'.*'+search.getValue()+'.*','$options':'imax'}}));");
        _store.currentPage = 1;
        _store.load();

        Ext.getCmp("b_tbl_reset").show();
    },

    onButtonClick3: function(button, e, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_user_list");
        _store.getProxy().url = '/api/ftuctrl/getObjects';
        _store.getProxy().setExtraParam('basename',Ext.encode('with_cid'));
        _store.getProxy().setExtraParam('cond',Ext.encode({'_kind':'object_user'}));
        _store.currentPage = 1;
        Ext.getCmp("NFW2_user").store_load();

        Ext.getCmp("b_tbl_reset").hide();
        Ext.getCmp("ser_type").reset();
        Ext.getCmp("user_search").reset();
    },

    onGrid_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('NFW2.view.win_user',{
            'edit': 'edit',
            'cid': record.data['@cid'],
            'num': record.data['@num']
        });
        win.show();
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        var record = Ext.create('Ext.data.Store',{
            data: [
                { 'name':__zen('obj_name'),'val':'name' },
                { 'name':__zen('user_id'),'val':'user_id' },
                { 'name':__zen('user_name'),'val':'user_name' },
                { 'name':__zen('user_depart'),'val':'user_depart' },
                { 'name':__zen('auth_server'),'val':'auth_srv' },
                { 'name':__zen('desc'),'val':'desc' }
            ],
            fields: ['name','val']
        });

        Ext.getCmp("ser_type").bindStore(record);

        var store = Ext.data.StoreManager.lookup("store_user_list");
        store.getProxy().setExtraParam('cond',Ext.encode({'_kind':'object_user'}));
        store.currentPage = 1;
        me.store_load();

        var _params = {
            filename: Ext.encode('/proc/ferret/datasheet/user_obj')
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
        var store = Ext.data.StoreManager.lookup("store_user_list");
        store.load(function(records,options,success){
            var tot = options.getProxy().getReader().rawData.retval;
            Ext.getCmp("disp_user_total").setValue(tot.total+'/'+tot.max_count);

            hideLoadMask();
            setTimeout(function(){ me.setWidth('100%'); },100);
        });
    }

});