
Ext.define('NFW2.view.NFW2_firewall_object_ip_country', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_firewall_object_ip_country',

    requires: [
        'NFW2.view.NFW2_firewall_object_ip_countryViewModel',
        'Ext.toolbar.Separator',
        'Ext.button.Split',
        'Ext.menu.Menu',
        'Ext.form.field.Date',
        'Ext.form.Label',
        'Ext.form.field.Display',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging'
    ],

    config: {
        obj_d: {
            data: ''
        }
    },

    viewModel: {
        type: 'nfw2_firewall_object_ip_country'
    },
    cls: 'zen_body',
    id: 'NFW2_firewall_object_ipAddress_ipv4Country',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onNFW2_firewall_object_ipAddress_ipv4CountryAfterRender'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'container',
                        items: [
                            {
                                xtype: 'toolbar',
                                cls: 'zen_toolbar',
                                items: [
                                    {
                                        xtype: 'button',
                                        iconCls: 'ic_add',
                                        bind: {
                                            text: '{add}'
                                        },
                                        listeners: {
                                            click: 'on_btn_add'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'ic_del',
                                        bind: {
                                            text: '{del}'
                                        },
                                        listeners: {
                                            click: 'on_btn_del'
                                        }
                                    },
                                    {
                                        xtype: 'tbseparator'
                                    },
                                    {
                                        xtype: 'button',
                                        bind: {
                                            text: '{ctcode_search}'
                                        },
                                        listeners: {
                                            click: 'on_btn_search'
                                        }
                                    },
                                    {
                                        xtype: 'splitbutton',
                                        handler: function(button, e) {
                                            this.showMenu();
                                        },
                                        bind: {
                                            text: '{unrefer}'
                                        },
                                        menu: {
                                            xtype: 'menu',
                                            shadow: false,
                                            width: 250,
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    cls: 'dv_pop_inner',
                                                    margin: '',
                                                    padding: 15,
                                                    items: [
                                                        {
                                                            xtype: 'datefield',
                                                            id: 'dp_start',
                                                            width: 220,
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
                                                            width: 220,
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
                                                                render: 'onDp_startRender1'
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
                                            text: '{unused}'
                                        },
                                        listeners: {
                                            click: 'on_btn_unused'
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
                                            click: 'on_btn_reset'
                                        }
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
                                        id: 'disp_obj_total',
                                        labelAlign: 'right',
                                        labelSeparator: ' ',
                                        labelWidth: 90,
                                        fieldCls: 'tot_info_bg',
                                        bind: {
                                            fieldLabel: '{obj_count}'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'gridpanel',
                                id: 'tbl_country',
                                margin: '5 0 0 0',
                                bodyBorder: true,
                                header: false,
                                columnLines: true,
                                store: 'store_country_list',
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
                                            var str = "";
                                            for (i = 0; i < value.length; i++) {
                                                str += "<img src='../images/flag/"+value[i].toLowerCase()+".png'> ["+value[i]+"] "+((!(record.data.codes_desc[i]==="" ||record.data.codes_desc[i]===undefined))?record.data.codes_desc[i].substr(5):"" )+ " ";
                                            }
                                            return str;
                                        },
                                        dataIndex: 'codes',
                                        flex: 1.5,
                                        bind: {
                                            text: '{country_code}'
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
                                selModel: Ext.create('Ext.selection.CheckboxModel', {
                                    selType: 'checkboxmodel',
                                    checkOnly: true,
                                    listeners: {
                                        selectionchange: 'onCheckboxModelSelectionChange'
                                    }
                                }),
                                dockedItems: [
                                    {
                                        xtype: 'pagingtoolbar',
                                        dock: 'bottom',
                                        id: 'tbar',
                                        width: 360,
                                        displayInfo: true,
                                        store: 'store_country_list'
                                    }
                                ],
                                listeners: {
                                    celldblclick: 'onTbl_countryCellDblClick'
                                }
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

    on_btn_add: function(button, e, eOpts) {
        var total = Ext.data.StoreManager.lookup('store_country_list').getTotalCount();
        if(total >= 100){Ext.Msg.alert(__weguardia,ValidMaxCnt(100)); return false;}

        var win = Ext.create('NFW2.view.win_country',{
           modal : true
        });
        win.show();

    },

    on_btn_del: function(button, e, eOpts) {

        var me = this;

        var tbl_sel = Ext.getCmp("tbl_country").getSelectionModel().getSelection();

        if(tbl_sel.length === 0){
            Ext.Msg.alert(__weguardia,get_msg("sel_del"));
            return false;
        }

        Ext.MessageBox.confirm(__weguardia,get_msg("conf_del"),function(btn){
            if(btn === "no"){	return false;	}

        var _delList = new Array();
        for(var i=0; i<tbl_sel.length; i++){
                        _delList[i] = tbl_sel[i].data["@cid"];
        }



        var _params = {
             basename : Ext.encode('object_country'),
             id_info : Ext.encode({'fieldname' : '@cid','values' : _delList}),
             renum_info : Ext.encode({'fieldname':'@num'})
        };


        request_helper.xmlrpc_call_JsonP('ftuctrl','delObjectWithCid',  _params,
            function(response){

                 if(response.fail_total > 0){

                                    var ar_use = [];
                                    for(var i in response.fail_list){
                                        if(response.fail_list[i].reason === "in_use")
                                            ar_use.push(response.fail_list[i].name);
                                    }
                                    var in_use = ar_use.join(" </br> ");
                                    Ext.Msg.alert(__weguardia,get_msg('err_objdel')+in_use);
                }

              var _store = Ext.data.StoreManager.lookup('store_country_list');
        	_store.getProxy().setExtraParam('search_info',Ext.encode([]));
        	 _store.load({

                        callback : function(records, options, success) {

                            var tot = options.getProxy().getReader().rawData.retval;

                            if(tot !== undefined){

                                Ext.getCmp('disp_obj_total').setValue(tot.total + "/" + tot.max_count);
                                Ext.getCmp('b_tbl_reset').hide();
                            }

                        }
                        });



            }
        );


        });
    },

    on_btn_search: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_country_search',{
           modal : true
        });
        win.show();

    },

    onDp_startRender: function(component, eOpts) {
        var before = Ext.Date.add(new Date(),Ext.Date.DAY,-7);
        Ext.getCmp("dp_start").setValue(before);
    },

    onDp_startRender1: function(component, eOpts) {
        Ext.getCmp("dp_end").setValue(new Date());

    },

    onButtonClick: function(button, e, eOpts) {
        var start = Ext.getCmp('dp_start').getValue();
        var end = Ext.getCmp('dp_end').getValue();


        if(start > end){prt_errMsg(get_msg("err_datevalid"), "err_unused");	return false;}else{Ext.getCmp("err_unused").hide();}

        var _store = Ext.data.StoreManager.lookup('store_country_list');
        _store.getProxy().setExtraParam("search_info",  Ext.encode({'type':'unused', 'value':{'start_date':Ext.Date.format(start, 'Ymd'),'end_date':Ext.Date.format(end, 'Ymd')}}));
        _store.load({callback : function(records, options, success) {

                    if (success) {
                        Ext.getCmp("b_tbl_reset").show();
                    }
                }
        });

    },

    on_btn_unused: function(button, e, eOpts) {
        var _store = Ext.data.StoreManager.lookup('store_country_list');
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'_ref_cnt','value':'0'}));
        Ext.getCmp('tbar').moveFirst();



        Ext.getCmp("b_tbl_reset").show();


    },

    on_btn_reset: function(button, e, eOpts) {
        this.get_list();
        Ext.getCmp("b_tbl_reset").hide();
    },

    onCheckboxModelSelectionChange: function(model, selected, eOpts) {

    },

    onTbl_countryCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0){	return false;	}


        var win = Ext.create('NFW2.view.win_country',{
            edit : "edit",
            cid : record.data['@cid'],
            num : record.data['@num'],
            name : record.data.name,
            modal : true
        });

        win.show();


    },

    onNFW2_firewall_object_ipAddress_ipv4CountryAfterRender: function(component, eOpts) {
        var me = this;
        /*request_helper.xmlrpc_call_JsonP('ftuctrl','getFileContent', { filename : Ext.encode('/proc/ferret/datasheet/ipv4_country')},
             function(response){
                 me.max = response[0];
             }
        );*/

        me.get_list();
    },

    get_list: function() {
        var me = this;

        var _store = Ext.data.StoreManager.lookup('store_country_list');
        _store.getProxy().setExtraParam('search_info',Ext.encode([]));
        _store.currentPage = 1;



        _store.load({

            callback : function(records, options, success) {

                var tot = options.getProxy().getReader().rawData.retval;

                if(tot !== undefined){

                    Ext.getCmp('disp_obj_total').setValue(tot.total + "/" + tot.max_count);


                    me.max = tot.max_count;
                }

            }
        });


        //Ext.getCmp('tbar').moveFirst();

        hideLoadMask();
        setTimeout(function(){ me.setWidth('100%'); },100);

    }

});