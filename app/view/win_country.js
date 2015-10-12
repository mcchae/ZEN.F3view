
Ext.define('NFW2.view.win_country', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_country',

    requires: [
        'NFW2.view.win_countryViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.grid.plugin.DragDrop',
        'Ext.util.Point',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_country'
    },
    cls: 'zen_win',
    height: 550,
    width: 800,
    defaultListenerScope: true,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            flex: 1,
            id: 'fm_country',
            itemId: 'fm',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    padding: 20,
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){ return get_msg("err_null"); }
                                        return true;



                                    },
                                    cls: 'lb_req',
                                    id: 'name',
                                    width: 500,
                                    labelSeparator: ' ',
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 31,
                                    minLength: 1,
                                    bind: {
                                        fieldLabel: '{obj_name}'
                                    },
                                    listeners: {
                                        errorchange: 'onNameErrorChange',
                                        blur: 'onNameBlur'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '5 0 0 0',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'desc',
                                    width: 500,
                                    labelSeparator: ' ',
                                    enforceMaxLength: true,
                                    maxLength: 127,
                                    bind: {
                                        fieldLabel: '{desc}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            cls: 'infw_grid',
                            height: 350,
                            id: 'grid_country',
                            itemId: 'grid_country',
                            store: 'store_tmp_country',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return "<img src='../images/flag/"+(record.data.country_code).toLowerCase()+".png'> ["+record.data.country_code + "] "+record.data.country_desc;
                                    },
                                    dataIndex: 'string',
                                    flex: 1,
                                    bind: {
                                        text: '{country_code}'
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    items: [
                                        {
                                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                return "icr_del";
                                            },
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {

                                                Ext.getCmp("grid_country").getStore().removeAt(rowIndex);
                                            }
                                        }
                                    ]
                                }
                            ],
                            viewConfig: {
                                plugins: [
                                    {
                                        ptype: 'gridviewdragdrop',
                                        dragGroup: 'grid_country',
                                        dropGroup: 'grid_setcountry'
                                    }
                                ],
                                listeners: {
                                    beforedrop: 'onViewBeforeDrop'
                                }
                            }
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            cls: 'fld_msg',
                            itemId: 'fld_msg',
                            style: 'padding-right:10px'
                        },
                        {
                            xtype: 'button',
                            cls: 'ft_confirm',
                            iconCls: 'ft_confirm_icl',
                            bind: {
                                text: '{confirm}'
                            },
                            listeners: {
                                click: 'on_btn_confirm'
                            }
                        },
                        {
                            xtype: 'button',
                            cls: 'ft_cancel',
                            bind: {
                                text: '{cancel}'
                            },
                            listeners: {
                                click: 'on_btn_cancel'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'panel',
            dock: 'right',
            margin: '5 0 0 0',
            width: 240,
            bodyCls: 'pnl_sub',
            items: [
                {
                    xtype: 'textfield',
                    cls: 's_input',
                    margin: '5 0',
                    width: 220,
                    enableKeyEvents: true,
                    listeners: {
                        keydown: 'onTextfieldKeydown'
                    }
                },
                {
                    xtype: 'gridpanel',
                    cls: 'sub_grid',
                    height: 450,
                    id: 'grid_setcountry',
                    itemId: 'grid_setcountry',
                    store: 'store_country_item',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                //return "<ul class='disp_obj'><li>"+record.data.country_desc+"</li></ul>";
                                return "<img src='../images/flag/"+(record.data.country_code).toLowerCase()+".png'> ["+record.data.country_code + "] "+record.data.country_desc;
                            },
                            dataIndex: 'country_desc',
                            flex: 1,
                            bind: {
                                text: '{country_code}'
                            }
                        }
                    ],
                    viewConfig: {
                        copy: true,
                        plugins: [
                            {
                                ptype: 'gridviewdragdrop',
                                dragGroup: 'grid_setcountry',
                                dropGroup: 'grid_country',
                                enableDrop: false
                            }
                        ]
                    },
                    listeners: {
                        celldblclick: 'onGrid_setobjCellDblClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender'
    },

    onNameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onNameBlur: function(component, event, eOpts) {
        Ext.getCmp('name').validateValue(true);
    },

    onViewBeforeDrop: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
        var tmp = Ext.data.StoreManager.lookup("store_tmp_country");

        var chk_dob = tmp.find('country_code', data.records[0].data.country_code);

        if(chk_dob !== -1){	return false;	}
    },

    on_btn_confirm: function(button, e, eOpts) {
        this.set_country();


    },

    on_btn_cancel: function(button, e, eOpts) {
        this.close();
    },

    onTextfieldKeydown: function(textfield, e, eOpts) {

        var _store = Ext.getStore('store_country_item');
        if(e.keyCode === 13){
            _store.clearFilter();
        if(textfield.value!==""){


            var val = textfield.value;

            if (val) {
                var matcher = new RegExp(Ext.String.escapeRegex(val), "i");
               _store.filter({
                    filterFn: function(record) {
                        return matcher.test(record.get('country_desc')) ||
                            matcher.test(record.get('country_code'));

                    }
                });
            }

        }
        }
    },

    onGrid_setobjCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var _tmpstore = "store_tmp_country";


        var tmp = Ext.data.StoreManager.lookup(_tmpstore);

        var chk_dob = tmp.find('country_code', record.data.country_code);

        if(chk_dob !== -1){	return false;	}

         tmp.add({
                'country_desc' : record.data.country_desc,
                'country_code' : record.data.country_code
            });
    },

    onWindowAfterRender: function(component, eOpts) {
        this.init_country();
        chk_zenauth(null);
    },

    init_country: function(edit, cid) {
        var me = this;

        if(me.edit === "edit"){
                                me.setTitle(__zen('country')+ " " +__zen('edit') + "  "+me.num);

                                var _params = {

                                    basename : Ext.encode('with_cid'),
                                    cond : Ext.encode({'_kind':'object_country','@cid':me.cid})
                                };


                                request_helper.xmlrpc_call_JsonP('ftuctrl','getObjects', _params,
                                                                 function(response){
                                                                     Ext.getCmp("name").setValue(response.list[0].name);
                                                                     Ext.getCmp("desc").setValue(response.list[0].desc);
                                                                  //   Ext.getCmp("country").setValue(response.list[0].codes_desc);


                                                                     var in_obj = [];

                                                                     for(var i=0; i<response.list[0].codes.length; i++){

                                                                         in_obj.push({
                                                                             'country_code' : response.list[0].codes[i],
                                                                             'country_desc' : (!(response.list[0].codes_desc[i]==="" ||response.list[0].codes_desc[i]===undefined))?response.list[0].codes_desc[i].substr(5):""
                                                                         });
                                                                     }



                                                                     Ext.data.StoreManager.lookup("store_tmp_country").loadData(in_obj);

                                                                 }
                                                                );



                            }else{
                                me.setTitle(__zen('country')+ " " +__zen('add'));
                                 Ext.data.StoreManager.lookup("store_tmp_country").removeAll();
                            }



        var _store = Ext.data.StoreManager.lookup('store_country_item');
        _store.clearFilter();
        _store.load();


    },

    setWinState_country: function(btn) {
        var me = this;
        if(btn==="no"){
                var win = Ext.WindowManager.getActive();
                if (win) {
                    win.close();
             }
             }else{
                Ext.getCmp("fm_country").getForm().reset();
        		Ext.ComponentQuery.query('label[cls="errorBox"]').forEach(function(cls){ cls.hide(); });
                Ext.data.StoreManager.lookup("store_tmp_country").removeAll();
             }
    },

    set_country: function(edit) {
        var me = this;


        var update	=(me.edit === "edit")?true:false;
        var return_cid=(me.edit === "edit")?false:true;

        var cid = me.cid;

        var name = Ext.getCmp('name');
        var desc = Ext.getCmp('desc');

        if(name.isValid()===false){ name.focus(); return false; }


        //var codes = Ext.getCmp('country').getValue();
        //var codes_desc = Ext.getCmp('country').getRawValue().split(',');

        //var codes = Ext.getCmp('country').getValue();
        //var codes_desc = Ext.getCmp('country').getValue();

        var arr = Ext.getCmp("grid_country").getStore().data.items;
        var cnt = arr.length;


        if(cnt === 0){ return prt_errMsg(__zen('country_code')+" "+get_msg("err_null"), null); return false;}
        if(cnt > 15){ prt_errMsg(ValidMaxCnt(15),null);return false;}

        var codes = [];
        var codes_desc = [];

         for (i = 0; i < cnt; i++) {
            codes.push(arr[i].data.country_code);
            codes_desc.push("["+arr[i].data.country_code+"] "+arr[i].data.country_desc);
        }



        var obj = new Object();

        obj = {

            '@cid' : cid,
            name : name.getValue(),
            desc : desc.getValue(),
            codes : codes,
            codes_desc:codes_desc

        };

        var _params = {
            basename : Ext.encode('object_country'),
            obj : Ext.encode(obj),
            id_info : Ext.encode({'fieldname':'@cid'}),
            num_info : Ext.encode({'fieldname':'@num'}),
            update : Ext.encode(update),
            return_cid:return_cid

        };

        if(me.name !== name.getValue()){

            var _dobparam = {
                basename: Ext.encode("with_cid"),
                key: Ext.encode({
                    'name'	: name.getValue(),
                    '_kind'	: 'object_country',
                    '@cid'	:{'$ne':(update===true)?me.cid:null }
                })
            };

            request_helper.xmlrpc_call_JsonP('ftuctrl','getObject',_dobparam,
                                             function(response){

                                                 if(response !== null){
                                                     prt_errMsg(get_msg('err_objname'), null); name.focus(); return false;
                                                 }else{
                                                     fn_set();
                                                 }
                                             }
                                            );

        }else{
            fn_set();
        }


        function fn_set(){
            request_helper.xmlrpc_call_JsonP('ftuctrl','setObjectWithCid',_params,
                                             function(response){

                                                 if(update===true){

                                                     Ext.Msg.show({
                                                         title: __weguardia,
                                                         msg: get_msg("msg_ok_edit"),
                                                         width: 300,
                                                         buttons: Ext.Msg.OK,
                                                         fn: setWinClose,
                                                         icon: Ext.window.MessageBox.INFO
                                                     });



                                                 }else{
                                                     Ext.Msg.show({
                                                         title: __weguardia,
                                                         msg: get_msg("msg_ok_add"),
                                                         width: 300,
                                                         buttons: Ext.Msg.YESNO,
                                                         buttonText:{
                                                            yes: __zen('add_plus'),
                                                            no: __zen('close')
                                                         },
                                                         fn: me.setWinState_country,
                                                         icon: Ext.window.MessageBox.INFO
                                                     });

                                                 }

                                                 if(me.loadmode === undefined){

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
                                                 }else{

                                                     var __cid = (update)?me.cid:response;

                                                     addFWItem(me.target, update, name.getValue(), "country", __cid, null);

                                                     var _store = Ext.data.StoreManager.lookup(me.loadmode);
                                                     _store.load();
                                                 }




                                             }
                                            );

        }
    }

});