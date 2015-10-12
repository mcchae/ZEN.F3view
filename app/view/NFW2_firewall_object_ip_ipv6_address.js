
Ext.define('NFW2.view.NFW2_firewall_object_ip_ipv6_address', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_firewall_object_ip_ipv6_address',

    requires: [
        'NFW2.view.NFW2_firewall_object_ip_ipv6_addressViewModel',
        'Ext.toolbar.Separator',
        'Ext.button.Split',
        'Ext.menu.Menu',
        'Ext.form.field.Date',
        'Ext.form.Label',
        'Ext.form.Panel',
        'Ext.form.field.File',
        'Ext.form.field.FileButton',
        'Ext.form.field.Display',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'nfw2_firewall_object_ip_ipv6_address'
    },
    cls: 'zen_body',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
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
                                                            itemId: 'dp_start',
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
                                                            itemId: 'dp_end',
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
                                                            id: 'zen_fw_obj_ipv6_err_unused',
                                                            margin: '10 0'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            cls: 'ft_confirm_s',
                                                            margin: '0 0 0 60',
                                                            iconCls: 'ft_confirm_icl',
                                                            bind: {
                                                                text: '{confirm}'
                                                            },
                                                            listeners: {
                                                                click: 'onButtonClick2'
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
                                        iconCls: 'ic_export',
                                        tooltipType: 'title',
                                        bind: {
                                            tooltip: '{obj_export}'
                                        },
                                        listeners: {
                                            click: 'on_btn_export'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        toggleHandler: function(button, state) {
                                            if(state===false){button.up().down('#ct_import').hide();}else{button.up().down('#ct_import').show();}
                                        },
                                        itemId: 'b_upfile',
                                        enableToggle: true,
                                        iconCls: 'ic_import',
                                        tooltipType: 'title',
                                        bind: {
                                            tooltip: '{obj_import}'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        hidden: true,
                                        itemId: 'ct_import',
                                        items: [
                                            {
                                                xtype: 'form',
                                                itemId: 'upform',
                                                bodyStyle: 'background-color:#eaeef6;',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'filefield',
                                                        itemId: 'upfile',
                                                        width: 200,
                                                        name: 'uploadFile',
                                                        buttonConfig: {
                                                            xtype: 'filebutton',
                                                            cls: 'btn_b',
                                                            bind: {
                                                                text: '{file_find}'
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        cls: 'btn_b',
                                                        margin: '0 0 0 10',
                                                        iconCls: 'ft_confirm_icl',
                                                        bind: {
                                                            text: '{confirm}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick11'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'tbseparator'
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'search_name',
                                        listeners: {
                                            render: 'onSearch_nameRender'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'ic_ser',
                                        listeners: {
                                            click: 'on_btn_searchName'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'search_ip',
                                        emptyText: 'IPv6'
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'ic_ser',
                                        listeners: {
                                            click: 'on_btn_searchName1'
                                        }
                                    },
                                    {
                                        xtype: 'label',
                                        cls: 'errorBox',
                                        hidden: true,
                                        id: 'zen_fw_obj_ipv6_err_valid',
                                        itemId: 'err_valid',
                                        text: ''
                                    },
                                    {
                                        xtype: 'tbseparator'
                                    },
                                    {
                                        xtype: 'button',
                                        hidden: true,
                                        id: 'zen_obj_ipv6_reset',
                                        itemId: 'b_tbl_reset',
                                        iconCls: 'ic_reset',
                                        listeners: {
                                            click: 'on_btn_reset'
                                        }
                                    }
                                ]
                            }
                        ]
                    },
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
                                id: 'zen_obj_ipv6_disp_obj_total',
                                itemId: 'disp_obj_total',
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
                        itemId: 'tbl_ipv6',
                        margin: '5 0 0 0',
                        bodyBorder: true,
                        header: false,
                        columnLines: true,
                        store: 'store_ipv6_list',
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
                                dataIndex: 'ip',
                                text: 'IPv6',
                                flex: 1.5
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: '@count',
                                bind: {
                                    text: '{count}'
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
                                itemId: 'tbar',
                                width: 360,
                                displayInfo: true,
                                store: 'store_ipv6_list'
                            }
                        ],
                        listeners: {
                            celldblclick: 'onTbl_ipv6CellDblClick'
                        }
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    on_btn_add: function(button, e, eOpts) {

        var total = Ext.data.StoreManager.lookup('store_ipv6_list').getTotalCount();
        if(total >= this.max){Ext.Msg.alert(__weguardia,ValidMaxCnt(this.max)); return false;}

        var win = Ext.create('NFW2.view.win_ipv6',{
           modal : true
        });
        win.show();

    },

    on_btn_del: function(button, e, eOpts) {

        var me = this;

        //var tbl_sel = Ext.getCmp("tbl_ipv6").getSelectionModel().getSelection();
        var tbl_sel = button.up('panel').down('#tbl_ipv6').getSelectionModel().getSelection();


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
             basename : Ext.encode('object_ipv6_address'),
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

              var _store = Ext.data.StoreManager.lookup('store_ipv6_list');
               _store.getProxy().setExtraParam('search_info',Ext.encode([]));
        	 _store.load({

                        callback : function(records, options, success) {

                            var tot = options.getProxy().getReader().rawData.retval;

                            if(tot !== undefined){

                                Ext.getCmp('zen_obj_ipv6_disp_obj_total').setValue(tot.total + "/" + tot.max_count);
                                Ext.getCmp('zen_obj_ipv6_reset').hide();
                            }

                        }
                        });


            }
        );


        });
    },

    onDp_startRender: function(component, eOpts) {
        var before = Ext.Date.add(new Date(),Ext.Date.DAY,-7);
        //Ext.getCmp("dp_start").setValue(before);
        component.setValue(before);
    },

    onDp_startRender1: function(component, eOpts) {
        //Ext.getCmp("dp_end").setValue(new Date());
        component.setValue(new Date());

    },

    onButtonClick2: function(button, e, eOpts) {
        //var start = Ext.getCmp('dp_start').getValue();
        //var end = Ext.getCmp('dp_end').getValue();

        var start = button.up().down('#dp_start').getValue();
        var end = button.up().down('#dp_end').getValue();



        if(start > end){prt_errMsg_label(get_msg("err_datevalid"), "zen_fw_obj_ipv6_err_unused");	return false;}else{Ext.getCmp("zen_fw_obj_ipv6_err_unused").hide();}

        var _store = Ext.data.StoreManager.lookup('store_ipv6_list');
        _store.getProxy().setExtraParam("search_info",  Ext.encode({'type':'unused', 'value':{'start_date':Ext.Date.format(start, 'Ymd'),'end_date':Ext.Date.format(end, 'Ymd')}}));
        _store.load({callback : function(records, options, success) {

                    if (success) {
                        button.up('toolbar').down('#b_tbl_reset').show();
                    }
                }
        });

    },

    on_btn_unused: function(button, e, eOpts) {
        var me = this;
        var _store = Ext.data.StoreManager.lookup('store_ipv6_list');
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'_ref_cnt','value':'0'}));
        me.down('#tbar').moveFirst();


        button.up().down('#b_tbl_reset').show();
    },

    on_btn_export: function(button, e, eOpts) {
        this.export_rule('xlsx');
    },

    onButtonClick11: function(button, e, eOpts) {
        var me = this;
        //var form = Ext.getCmp('upform').getForm();
        var form = button.up('#upform').getForm();


        if(button.up().down('#upfile').getValue() === '') return false;
        var path = '/mnt/ramdisk/do/F3view/nodeapps/deploy/public/javascripts/attachments/';

        if(form.isValid()){

            Ext.getBody().mask("Uploading ..");

            form.submit({
                url: '/fileUploadCommon',
                params: {
                    filePath: Ext.encode(path),
                    delFlag: Ext.encode('true')
                },
                waitMsg: 'Uploading...',
                success: function(fp, o) {

                    var _data = Ext.decode(o.response.responseText);

                    console.log(_data.data[0]);

                    var _params = {
                        basename : Ext.encode('object_ipv6_address'),
                        args : Ext.encode(path+_data.data[0])
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'importObjectList',
                        _params,
                        function(response){

                            Ext.getBody().unmask();

                            //Ext.getCmp("b_upfile").toggle(false);
                           button.up('toolbar').down('#b_upfile').toggle(false);


                            if(response.fail_cnt > 0){

                                var arr = [];
                                for(var i in response.fail_list){

                                    arr.push(response.fail_list[i].name + " : " +response.fail_list[i].reason );
                                }
                                var errmsg = arr.join(" </br> ");
                                Ext.Msg.alert(__weguardia,get_msg('err_upobj')+errmsg);
                            }

                            console.log(response);
                            me.get_list();

                        }

                    );

                },
                failure : function(fb, o) {
                    Ext.getBody().unmask();
                    Ext.Msg.alert(__weguardia,  get_msg('msg_file_fail'));
                }
            });
        }




    },

    onSearch_nameRender: function(component, eOpts) {
        component.emptyText = __zen('obj_name');
        component.applyEmptyText();

    },

    on_btn_searchName: function(button, e, eOpts) {
        var me = this;
        var name = button.up('toolbar').down('#search_name').getValue();
        if(name===""){return false;}

        var _store = Ext.data.StoreManager.lookup('store_ipv6_list');
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'name','value':name}));

        me.down('#tbar').moveFirst();

        button.up().down('#b_tbl_reset').show();
    },

    on_btn_searchName1: function(button, e, eOpts) {
        var me = this;
        var ip = button.up('toolbar').down('#search_ip').getValue();
        if(ip===""){return false;}

        if(validIPv6Form(ip)===false){
            prt_errMsg_label(ValidIP("IP"), "zen_fw_obj_ipv6_err_valid");
            button.up('toolbar').down('#search_ip').focus();
            return false;
        }else{
            Ext.getCmp("zen_fw_obj_ipv6_err_valid").hide();
        }

        var _store = Ext.data.StoreManager.lookup('store_ipv6_list');
        _store.getProxy().setExtraParam('search_info',Ext.encode({'type':'ip','value':ip}));

        me.down('#tbar').moveFirst();

        button.up().down('#b_tbl_reset').show();
    },

    on_btn_reset: function(button, e, eOpts) {
        this.get_list();
        var toolbar = button.up('toolbar');
        toolbar.down('#search_name').setValue('');
        toolbar.down('#search_ip').setValue('');
        toolbar.down('#b_tbl_reset').hide();
        toolbar.down('#err_valid').hide();

    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        /*request_helper.xmlrpc_call_JsonP('ftuctrl','getFileContent', { filename : Ext.encode('/proc/ferret/datasheet/ip_obj')},
             function(response){
                 me.max = response[0];
             }
        );
        */
        me.get_list();
    },

    onCheckboxModelSelectionChange: function(model, selected, eOpts) {

    },

    onTbl_ipv6CellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0){	return false;	}


        var win = Ext.create('NFW2.view.win_ipv6',{
            edit : "edit",
            cid : record.data['@cid'],
            num : record.data['@num'],
            name : record.data.name,
            modal : true
        });

        win.show();

    },

    get_list: function() {
        var me = this;

        var _store = Ext.data.StoreManager.lookup('store_ipv6_list');
        _store.getProxy().setExtraParam('search_info',Ext.encode([]));
        _store.currentPage = 1;



        _store.load({

            callback : function(records, options, success) {

                var tot = options.getProxy().getReader().rawData.retval;

                if(tot !== undefined){

                    me.down('#disp_obj_total').setValue(tot.total + "/" + tot.max_count);

                    me.max = tot.max_count;
                }

            }
        });

        //Ext.getCmp('tbar').moveFirst();
        //me.down('#tbar').moveFirst();

        hideLoadMask();
        setTimeout(function(){ me.setWidth('100%'); },100);



    },

    export_rule: function(id) {

        var fileName = "WeGuardia_IPv6Object_import."+id;
        var path = '/mnt/ramdisk/do/F3view/nodeapps/deploy/public/javascripts/attachments/';


        var _params = {
            basename : Ext.encode('object_ipv6_address'),
            filename : Ext.encode(path+fileName)
        };

        showLoadMask();


        request_helper.xmlrpc_call_JsonP('ftuctrl','exportObjectList', _params,
             function(response){
                 hideLoadMask();
                 console.log(response);
                document.location.href = '/fileDownloadCommon?filePath='+ Ext.encode(path)+"&fileName="+Ext.encode(fileName)+"&filePathFlag="+Ext.encode('true');
             }
        );
    }

});