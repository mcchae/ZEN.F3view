
Ext.define('NFW2.view.win_ipv6', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ipv6',

    requires: [
        'NFW2.view.win_ipv6ViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.Label',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_ipv6'
    },
    cls: 'zen_win',
    height: 300,
    width: 800,
    bodyPadding: 20,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'fm_ipv6_add',
            itemId: 'fm',
            items: [
                {
                    xtype: 'container',
                    layout: 'table',
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
                        },
                        {
                            xtype: 'label',
                            cls: 'errorBox',
                            hidden: true,
                            id: 'err_name',
                            text: ''
                        }
                    ]
                },
                {
                    xtype: 'container',
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
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'textfield',
                            cls: 'lb_req',
                            id: 'ip',
                            width: 750,
                            fieldLabel: 'IPv6',
                            labelSeparator: ' '
                        }
                    ]
                },
                {
                    xtype: 'container',
                    cls: 'fld_info',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'lb_info',
                            bind: {
                                text: '{info1}'
                            }
                        },
                        {
                            xtype: 'label',
                            cls: 'lb_info',
                            bind: {
                                text: '{info2}'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender'
    },
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
                    itemId: 'fld_msg'
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
    ],

    onNameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onNameBlur: function(component, event, eOpts) {
        Ext.getCmp('name').validateValue(true);
    },

    onWindowAfterRender: function(component, eOpts) {
        this.init_object_ipv6_address();
        chk_zenauth(null);
    },

    on_btn_confirm: function(button, e, eOpts) {
        this.set_object_ipv6_address();


    },

    on_btn_cancel: function(button, e, eOpts) {
        this.close();
    },

    init_object_ipv6_address: function(edit, cid) {
        var me = this;

        var _params = {

            basename : Ext.encode('with_cid'),
            cond : Ext.encode({'_kind':'object_ipv6_address','@cid':me.cid})
        };




        if(me.edit === "edit"){
            this.setTitle(__zen('addr_edit')+" - "+me.num);

            request_helper.xmlrpc_call_JsonP('ftuctrl','getObjects', _params,
                                             function(response){

                                                 Ext.getCmp("name").setValue(response.list[0].name);
                                                 Ext.getCmp("desc").setValue(response.list[0].desc);


                                                 var ar_ip = [];
                                                 for(var i in response.list[0].ip){

                                                     ar_ip.push(response.list[0].ip[i]["#text"]);
                                                 }
                                                 var ip = ar_ip.join(",");

                                                 Ext.getCmp("ip").setValue(ip);

                                             }
                                            );



        }else{
            this.setTitle(__zen('addr_add'));
        }
    },

    set_object_ipv6_address: function(edit) {
        var me = this;


        var name = Ext.getCmp('name');
        var ip = Ext.getCmp('ip');
        var desc = Ext.getCmp('desc');


        var update=(this.edit === "edit")?true:false;
        var return_cid=(this.edit === "edit")?false:true;

        var obj = {};
        var ip_mem = [];
        var arr_ip = (ip.getValue()).split(",");


        if(name.isValid()===false){ name.focus(); return false; }
        //if(arr_ip.length>this.max_mem){ prt_errMsg(ValidMaxCnt(this.max_mem), null); ip.focus(); return false; }
        if(validIPv6Form(ip.getValue(),'v6')===false){ prt_errMsg(ValidIP("IPv6"), null); ip.focus(); return false; }



        for(var i=0; i<arr_ip.length; i++){
            ip_mem.push({
                '@type' : getIPType(arr_ip[i]),
                '#text' : arr_ip[i]
            });
        }

        obj = {
            '@cid' : me.cid,
            name : name.getValue(),
            desc : desc.getValue(),
            '@count' : arr_ip.length,
            ip 	 : ip_mem
        };


        var _params = {
            basename : Ext.encode('object_ipv6_address'),
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
                    '_kind'	: 'object_ipv6_address',
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


            Ext.Ajax.request({
                url : '/api/ftuctrl/setObjectWithCid',
                method : 'POST',
                params:_params,
                success : function(response){
                    response = Ext.decode(response.responseText);

                    console.log(response);


                    if(response.retcode === true){

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
                                    no:  __zen('close')
                                },
                                fn: setWinState,
                                icon: Ext.window.MessageBox.INFO
                            });
                        }



                        if(me.loadmode === undefined){

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

                        }else{

                            var __cid = (update)?me.cid:response.retval;
                            addFWItem(me.target, update, name.getValue(), "v6", __cid, arr_ip.length);


                            var _store = Ext.data.StoreManager.lookup(me.loadmode);
                            _store.load();
                        }



                    }else{

                        if(response.errcode === 922746900){
                            prt_errMsg(get_msg("err_spoofing"),null);
                            return false;
                        }else if(response.errcode === 922746898){
                            prt_errMsg(get_msg("err_portscan"),null);
                            return false;
                        }else if(response.errcode === 922746896){
                            prt_errMsg(get_msg("msg_max_over"),null);
                            return false;
                        }else{
                            prt_errMsg(response.errmsg,null);
                            return false;
                        }
                    }
                },
                failure : function(req,err){

                }
            });


        }
    }

});