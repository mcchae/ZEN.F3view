
Ext.define('NFW2.view.NFW2_firewall_object_schedule', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_firewall_object_schedule',

    requires: [
        'NFW2.view.NFW2_firewall_object_scheduleViewModel',
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
        type: 'nfw2_firewall_object_schedule'
    },
    cls: 'zen_body',
    id: 'NFW2_object_schedule',
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
                                        margin: '10 0',
                                        text: ''
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
                                            click: 'onButtonClick1'
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
                        click: 'onBtn_objuseClick'
                    }
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'button',
                    hidden: true,
                    id: 'btn_sch_reset',
                    iconCls: 'ic_reset',
                    listeners: {
                        click: 'onButtonClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onNFW2_object_scheduleAfterRender'
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
                                id: 'disp_sch_total',
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
                        id: 'object_schedule_list',
                        scrollable: true,
                        titleCollapse: true,
                        columnLines: true,
                        store: 'store_object_schedule_list',
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
                                    var sched = [];

                                    for(var i=0; i<value.length; i++){
                                        sched.push(value[i]);
                                    }

                                    return (sched.length < 1)?"":sched.join("<br/>");
                                },
                                dataIndex: 'period',
                                flex: 1,
                                bind: {
                                    text: '{period}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var sched = [];

                                    if(record.data['month'].length !== 0){ sched.push(__zen('months')+': ' + record.data['month'].join(", ")); }

                                    return (sched.length < 1)?"":sched.join("<br/>");
                                },
                                dataIndex: 'month',
                                flex: 1,
                                bind: {
                                    text: '{per_year}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var sched = [];

                                    if(record.data['day'].length !== 0){ sched.push('<font style="white-space:pre-line">'+__zen('day')+': ' + record.data['day'].join(", ")+"</font>"); }

                                    return (sched.length < 1)?"":sched.join("<br/>");
                                },
                                dataIndex: 'month',
                                flex: 1,
                                bind: {
                                    text: '{per_month}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var str1 = ['chk_sun','chk_mon','chk_tue','chk_wed','chk_thu','chk_fri','chk_sat'];
                                    var str2 = [getWeek(0),getWeek(1),getWeek(2),getWeek(3),getWeek(4),getWeek(5),getWeek(6)];

                                    var week_str = [];

                                    for(var i=0; i<str1.length; i++){

                                        if(record.data['week_list'][0][str1[i]] === "on"){ week_str.push(str2[i]); }
                                    }
                                    var sched = [];

                                    if(week_str.length !== 0){ sched.push(__zen('days')+': ' + week_str.join(", ")); }

                                    return (sched.length < 1)?"":sched.join("<br/>");
                                },
                                dataIndex: 'month',
                                flex: 1,
                                bind: {
                                    text: '{per_week}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "white-space:pre-line";

                                    return record.data['time'].join("<br>");
                                },
                                dataIndex: 'time',
                                flex: 1,
                                bind: {
                                    text: '{per_day}'
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
                                store: 'store_object_schedule_list'
                            }
                        ],
                        listeners: {
                            celldblclick: 'onObject_schedule_listCellDblClick'
                        }
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

        var _store = Ext.data.StoreManager.lookup('store_object_schedule_list');

        me.onButtonClick();

        if(_store.getTotalCount() >= me.count){
            Ext.Msg.alert(__weguardia,ValidMaxCnt(me.count));
            return false;
        }

        var win = Ext.create('NFW2.view.win_schedule',{
            loadmode: 'schedule'
        });
        win.show();
    },

    onBtn_delClick: function(button, e, eOpts) {
        var tbl = Ext.getCmp("object_schedule_list");
        var tbl_sel = tbl.getSelectionModel().getSelection();

        if(tbl_sel.length === 0){

            Ext.Msg.alert(__weguardia,get_msg("sel_del"));
            return false;

        }else{

            Ext.MessageBox.confirm(__weguardia,get_msg("conf_del"),function(btn){

                if(btn === "yes"){

                    var _delList = [];

                    for(var i=0; i<tbl_sel.length; i++){

                        _delList.push(tbl_sel[i].data['@cid']);
                    }

                    var _params = {

                        basename : Ext.encode('object_schedule'),
                        id_info : Ext.encode({'fieldname' : '@cid','values' : _delList}),
                        renum_info : Ext.encode({'fieldname':'@num'})
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
                                var in_use = ar_use.join(" , ");
                                Ext.MessageBox.alert(__weguardia,get_msg('err_objdel')+in_use);
                            }
                            Ext.getCmp("NFW2_object_schedule").onButtonClick();
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

    onButtonClick1: function(button, e, eOpts) {
        var start = Ext.getCmp('dp_start').getValue();
        var end = Ext.getCmp('dp_end').getValue();

        if(start > end){prt_errMsg(get_msg("err_datevalid"), "err_unused");	return false;}else{Ext.getCmp("err_unused").hide();}

        var _store = Ext.data.StoreManager.lookup('store_object_schedule_list');
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'unused','value':{'start_date':Ext.Date.format(Ext.getCmp('dp_start').getValue(), 'Ymd'),'end_date':Ext.Date.format(Ext.getCmp('dp_end').getValue(), 'Ymd')}}));
        _store.currentPage = 1;
        _store.load();

        Ext.getCmp('btn_sch_reset').show();
    },

    onBtn_objuseClick: function(button, e, eOpts) {
        var _store = Ext.data.StoreManager.lookup('store_object_schedule_list');
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'_ref_cnt','value':'0'}));
        _store.currentPage = 1;
        _store.load();

        Ext.getCmp('btn_sch_reset').show();
    },

    onButtonClick: function(button, e, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_object_schedule_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode([]));
        _store.currentPage = 1;
        Ext.getCmp("NFW2_object_schedule").store_load();

        Ext.getCmp('btn_sch_reset').hide();
    },

    onObject_schedule_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var rec = tableview.getStore().getAt(rowIndex);

        var win = Ext.create('NFW2.view.win_schedule',{
            edit : "edit",
            cid : rec.get("@cid"),
            num : rec.get("@num"),
            loadmode : 'schedule'
        });

        win.show();
    },

    onNFW2_object_scheduleAfterRender: function(component, eOpts) {
        var me = this;

        var _store = Ext.data.StoreManager.lookup("store_object_schedule_list");
        _store.getProxy().setExtraParam('search_info',Ext.encode([]));
        _store.currentPage = 1;
        me.store_load();

        var _params = {
            filename: Ext.encode('/proc/ferret/datasheet/time_obj')
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
        var _store = Ext.data.StoreManager.lookup("store_object_schedule_list");
        _store.load(function(records,options,success){
            var tot = options.getProxy().getReader().rawData.retval;
            Ext.getCmp("disp_sch_total").setValue(tot.total+'/'+tot.max_count);

            hideLoadMask();
            setTimeout(function(){ me.setWidth('100%'); },100);
        });
    }

});