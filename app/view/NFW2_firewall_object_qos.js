
Ext.define('NFW2.view.NFW2_firewall_object_qos', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_firewall_object_qos',

    requires: [
        'NFW2.view.NFW2_firewall_object_qosViewModel',
        'Ext.form.Panel',
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
        type: 'nfw2_firewall_object_qos'
    },
    cls: 'zen_body',
    id: 'NFW2_firewall_object_qos',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onNFW2_firewall_object_qosAfterRender'
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
                                    type: 'vbox',
                                    align: 'stretch'
                                },
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
                                                        id: 'qos_btn_add',
                                                        iconCls: 'ic_add',
                                                        bind: {
                                                            text: '{add}'
                                                        },
                                                        listeners: {
                                                            click: 'onQos_btn_addClick'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        id: 'qos_btn_del',
                                                        iconCls: 'ic_del',
                                                        bind: {
                                                            text: '{del}'
                                                        },
                                                        listeners: {
                                                            click: 'onQos_btn_delClick'
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
                                                                            margin: '10 0',
                                                                            text: 'My Label'
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
                                                        id: 'qos_btn_unuse',
                                                        bind: {
                                                            text: '{obj_unused}'
                                                        },
                                                        listeners: {
                                                            click: 'onQos_btn_unuseClick'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'tbseparator'
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        id: 'qos_search_text',
                                                        emptyText: '객체 이름',
                                                        listeners: {
                                                            render: 'onQos_search_textRender'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        id: 'qos_btn_search',
                                                        iconCls: 'ic_ser',
                                                        listeners: {
                                                            click: 'onQos_btn_searchClick'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'tbseparator'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        hidden: true,
                                                        id: 'qos_btn_res',
                                                        iconCls: 'ic_reset',
                                                        listeners: {
                                                            click: 'onQos_btn_resClick'
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
                                                id: 'st_fw_qos_obj_cnt',
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
                                                id: 'grid_qos',
                                                header: false,
                                                title: 'My Grid Panel',
                                                columnLines: true,
                                                store: 'store_firewall_object_qos',
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
                                                        flex: 0.25,
                                                        bind: {
                                                            text: '{obj_name}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return addComma(record.data.bandwidth.min) + "Mbps";
                                                        },
                                                        dataIndex: 'bandmin',
                                                        flex: 0.25,
                                                        bind: {
                                                            text: '{quarant_band}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return addComma(record.data.bandwidth.max) + "Mbps";
                                                        },
                                                        dataIndex: 'bandmax',
                                                        flex: 0.25,
                                                        bind: {
                                                            text: '{limit_band}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if(value.type === "prio"){ return "PRIO"; }
                                                            else if(value.type === "fifo"){ return "FIFO"; }
                                                            else if(value.type === "sfq"){ return "SFQ"; }
                                                            else if(value.type === "tbf"){ return "TBF"; }
                                                        },
                                                        dataIndex: 'option',
                                                        flex: 0.15,
                                                        bind: {
                                                            text: '{queue_method}'
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
                                                        flex: 0.4,
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
                                                    celldblclick: 'onGrid_qosCellDblClick'
                                                },
                                                dockedItems: [
                                                    {
                                                        xtype: 'pagingtoolbar',
                                                        dock: 'bottom',
                                                        id: 'qos_toolbar',
                                                        width: 360,
                                                        displayInfo: true,
                                                        store: 'store_firewall_object_qos'
                                                    }
                                                ]
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

    onQos_btn_addClick: function(button, e, eOpts) {
        showLoadMask();

        var _params = {

            filename: Ext.encode('/proc/ferret/datasheet/qos_obj')
        };

        request_helper.xmlrpc_call_JsonP(

            'ftuctrl',
            'getFileContent',
            _params,

            function(response){
                hideLoadMask();
                var _store2 = Ext.data.StoreManager.lookup('store_firewall_object_qos');

                var Maxcnt = (_store2.data.length >= response[0])? false:true;

                if(Maxcnt === false){

                    Ext.Msg.alert("",ValidMaxCnt(response[0]));
                    return false;

                }
                else{
                    var me = Ext.getCmp('NFW2_firewall_object_qos');
                    var win = Ext.create('NFW2.view.win_object_qos',{
                        max : me.max,
                        modal : true
                    });

                    win.show();
                }
            }
        );


    },

    onQos_btn_delClick: function(button, e, eOpts) {
        var me = this;

        var tbl = Ext.getCmp("grid_qos");
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

                    //             showLoadMask();

                    var _params = {
                        basename : Ext.encode('object_qos'),
                        id_info : Ext.encode({'fieldname':'@cid', 'values':del_val})
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'delObjectWithCid',
                        _params,
                        function(response){
                            //                     hideLoadMask();
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
                            var _store = Ext.data.StoreManager.lookup('store_firewall_object_qos');
                            _store.getProxy().setExtraParam('search_info',Ext.encode({}));
                            Ext.getCmp('qos_search_text').reset();
                            Ext.getCmp('qos_btn_res').hide();
                            me.get_qos();
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

        var _store = Ext.data.StoreManager.lookup("store_firewall_object_qos");
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'unused','value':{'start_date':Ext.Date.format(Ext.getCmp('dp_start').getValue(), 'Ymd'),'end_date':Ext.Date.format(Ext.getCmp('dp_end').getValue(), 'Ymd')}}));
        _store.loadPage(1);

        Ext.getCmp("qos_btn_res").show();
        Ext.getCmp("btn_find").hideMenu();

        this.filter = true;
    },

    onQos_btn_unuseClick: function(button, e, eOpts) {
        var me = this;

        var _store = Ext.data.StoreManager.lookup('store_firewall_object_qos');
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'_ref_cnt','value':'0'}));
        Ext.getCmp('qos_btn_res').show();
        _store.load();
        // me.get_qos();
    },

    onQos_search_textRender: function(component, eOpts) {
        component.emptyText = __zen('obj_name');
        component.applyEmptyText();
    },

    onQos_btn_searchClick: function(button, e, eOpts) {
        var me = this;
        if(Ext.getCmp('qos_search_text').getValue() === ""){ return false; }
        else{
            var _store = Ext.data.StoreManager.lookup('store_firewall_object_qos');
            _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'name','value':Ext.getCmp('qos_search_text').getValue()}));
            Ext.getCmp('qos_btn_res').show();
            _store.load();
        //     me.get_qos();
        }
    },

    onQos_btn_resClick: function(button, e, eOpts) {
        var me = this;

        var _store = Ext.data.StoreManager.lookup('store_firewall_object_qos');
        _store.getProxy().setExtraParam('search_info',Ext.encode({}));
        Ext.getCmp('qos_search_text').reset();
        Ext.getCmp('qos_btn_res').hide();
        me.get_qos();
    },

    onGrid_qosCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = Ext.getCmp('NFW2_firewall_object_qos');

        if(cellIndex === 0){ return false; }

        var win = Ext.create('NFW2.view.win_object_qos',{
            edit : "edit",
            edit_index : rowIndex,
            max : me.max,
            modal : true,
            record : record
        });

        win.show();
    },

    onNFW2_firewall_object_qosAfterRender: function(component, eOpts) {
        var me = this;
        var _store = Ext.data.StoreManager.lookup('store_firewall_object_qos');
        _store.getProxy().setExtraParam('search_info',Ext.encode({}));

        var _params = {
            basename: Ext.encode('object_qos'),
            search_info: Ext.encode({}),
            sort_list: Ext.encode([['name',1]])
        };

        request_helper.xmlrpc_call_JsonP(

            'ftuctrl',
            'getObjectList',
            _params,

            function(response){
                me.max = response.max_count;
                me.get_qos();
            }
        );
    },

    get_qos: function() {
        var me = this;
        var store = Ext.data.StoreManager.lookup('store_firewall_object_qos');
        store.load(function(response){
            hideLoadMask();
            setTimeout(function(){ me.setWidth('100%'); },100);
            Ext.getCmp('st_fw_qos_obj_cnt').setValue(store.totalCount +"/" + me.max);
        });
    }

});