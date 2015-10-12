
Ext.define('NFW2.view.win_ipv4_domain', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ipv4_domain',

    requires: [
        'NFW2.view.win_ipv4_domainViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.Label',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_ipv4_domain'
    },
    cls: 'zen_win',
    height: 320,
    scrollable: true,
    width: 800,
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            flex: 1,
            id: 'fm_domain',
            itemId: 'fm',
            scrollable: true,
            bodyPadding: 20,
            title: '',
            items: [
                {
                    xtype: 'container',
                    minWidth: 750,
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 'name',
                            width: 500,
                            labelSeparator: ' ',
                            msgTarget: 'none',
                            enforceMaxLength: true,
                            maxLength: 31,
                            bind: {
                                fieldLabel: '{obj_name}'
                            },
                            listeners: {
                                errorchange: 'onNameErrorChange',
                                blur: 'onNameBlur'
                            }
                        },
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
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 'domain',
                            margin: '0 0 10 0',
                            width: 750,
                            labelSeparator: ' ',
                            msgTarget: 'none',
                            enforceMaxLength: true,
                            maxLength: 255,
                            bind: {
                                fieldLabel: '{domain}'
                            },
                            listeners: {
                                errorchange: 'onDomainErrorChange',
                                blur: 'onDomainBlur'
                            }
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
                                        text: '{domain_info1}'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'lb_info',
                                    bind: {
                                        text: '{domain_info2}'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'lb_info',
                                    bind: {
                                        text: '{domain_info3}'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'lb_info',
                                    bind: {
                                        text: '{domain_info4}'
                                    }
                                }
                            ]
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
                                click: 'onButtonClick1'
                            }
                        },
                        {
                            xtype: 'button',
                            cls: 'ft_cancel',
                            bind: {
                                text: '{cancel}'
                            },
                            listeners: {
                                click: 'onButtonClick'
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

    onNameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onNameBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onDomainErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onDomainBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;
        var m_count = me.m_count;
        var count = (me.loadmode===undefined)?Ext.getCmp("NFW2_domain").count:null;

        var name = Ext.getCmp("name");
        var desc = Ext.getCmp("desc");
        var domain = Ext.getCmp("domain");

        if(name.isValid()===false){ name.focus(); return false; }
        if(domain.isValid()===false){ domain.focus(); return false; }

        var arr_domain = domain.getValue().split(",");

        if(arr_domain.length > m_count){
            prt_errMsg(ValidMaxCnt(m_count),null);
            domain.focus();
            return false;
        }

        for(var i=0; i<arr_domain.length; i++){

            var fir = (/^[a-z]/).test(arr_domain[i]);

            if(fir===true){

                var d_sp = arr_domain[i].split("..");
                if(d_sp.length > 1){ prt_errMsg(ValidIP(__zen('domain')),null); domain.focus(); return false; }
                if(ValidDomain(arr_domain[i],2)===false){ prt_errMsg(ValidIP(__zen('domain')),null); domain.focus(); return false; }

            }else{

                if(arr_domain[i].substring(0,2) !== "*."){ prt_errMsg(ValidIP(__zen('domain')),null); domain.focus(); return false; }

                if(arr_domain[i].substring(0,5) === "*.com" || arr_domain[i].substring(0,7) === "*.co.kr"){
                    prt_errMsg(ValidIP(__zen('domain')),null); domain.focus();
                    return false;
                }
            }

        }

        prt_errMsg(null,null);

        var obj = {
            'name': name.getValue(),
            'desc': desc.getValue(),
            'domain': arr_domain
        };

        var update = (me.edit==="edit")?true:false;
        var return_cid = (me.edit==="edit")?false:true;

        var key = {
            name: name.getValue(),
            _kind: 'object_domain'
        };

        if(update){
            key['@cid'] = { '$ne': me.cid };
            obj['@cid'] = me.cid;
        }

        var _params = {
            basename: Ext.encode('object_domain'),
            obj: Ext.encode(obj),
            id_info: Ext.encode({'fieldname':'@cid'}),
            num_info: Ext.encode({'fieldname':'@num'}),
            update: Ext.encode(update),
            return_cid: Ext.encode(return_cid)
        };

        var _param = {
            basename: Ext.encode("with_cid"),
            key: Ext.encode(key)
        };

        if(me.name !== name.getValue()){

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getObject',
                _param,
                function(response){

                    if(response !== null){
                        prt_errMsg(get_msg('err_objname'),null); name.focus(); return false;
                    }else{
                        fn_set();
                    }
                }
            );
        }else{
            fn_set();
        }

        function fn_set(){

            Ext.data.JsonP.request({
                url: "/api/ftuctrl/setObjectWithCid",
                params: _params,
                success: function(response){

                    if(response.retcode === true){

                        if(me.loadmode === undefined){
                            var _store = Ext.data.StoreManager.lookup("store_domain_list");
                        }else{
                            if(me.target !== undefined){
                                var __cid = (update)?me.cid:response.retval;
                                addFWItem(me.target, update, name.getValue(), "domain", __cid, arr_domain.length);
                            }
                            var _store = Ext.data.StoreManager.lookup(me.loadmode);
                        }

                        _store.load(function(records, options, success) {
                            if(me.loadmode === undefined && !me.edit){
                                var tot = options.getProxy().getReader().rawData.retval;
                                Ext.getCmp("disp_domain_total").setValue(tot.total+'/'+tot.max_count);
                            }

                        });

                        if(me.loadmode===undefined && _store.getTotalCount()+1 >= count){
                            me.close();
                            return false;
                        }

                        if(update === true){

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
                                fn: setWinState,
                                icon: Ext.window.MessageBox.INFO
                            });
                        }
                    }else{
                        console.log(response.errcode);
                    }
                },
                failrue: function(response){
                    console.log("fail");
                }
            });
        }
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;

        chk_zenauth(null);

        var _params = {
            filename: Ext.encode('/proc/ferret/datasheet/domain_obj_member')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            _params,
            function(response){
                me.m_count = response[0];
            }
        );

        if(me.edit === "edit"){

            me.setTitle(__zen('domain_edit')+" - "+me.num);

            var _params = {
                'basename': Ext.encode('object_domain'),
                'search_info': Ext.encode({'type':'cid','value':me.cid})
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getObjectList',
                _params,
                function(response){
                    Ext.getCmp("name").setValue(response.list[0].name);
                    Ext.getCmp("desc").setValue(response.list[0].desc);
                    Ext.getCmp("domain").setValue(response.list[0].domain);
                }
            );

        }else{
            me.setTitle(__zen('domain_add'));
        }
    }

});