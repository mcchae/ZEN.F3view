
Ext.define('NFW2.view.win_user', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_user',

    requires: [
        'NFW2.view.win_userViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.XTemplate',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_user'
    },
    cls: 'zen_win',
    id: 'win_user',
    scrollable: true,
    width: 500,
    title: '사용자 추가',
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
            id: 'fm_user',
            itemId: 'fm',
            scrollable: true,
            bodyPadding: 20,
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true;}
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 'name',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 160,
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
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 160,
                            enforceMaxLength: true,
                            maxLength: 127,
                            bind: {
                                fieldLabel: '{desc}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true;}
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(!ValidNotKor(value)){ return get_msg('err_notkor'); }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 'user_id',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 160,
                            msgTarget: 'none',
                            enforceMaxLength: true,
                            maxLength: 31,
                            bind: {
                                fieldLabel: '{user_id}'
                            },
                            listeners: {
                                errorchange: 'onUser_idErrorChange',
                                blur: 'onUser_idBlur'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true;}
                                var me = Ext.getCmp("win_user");
                                if(Ext.getCmp("auth_srv").getValue()==='Local' && !CheckNotNull(value)){ return get_msg('err_null'); }
                                if(me.edit === "edit" && me.list.user_pw === value){ return true; }
                                if(value.length > 31){ return ValidMinMax(__zen('pwd'),1,31,2); }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 'user_pw',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 160,
                            msgTarget: 'none',
                            inputType: 'password',
                            bind: {
                                fieldLabel: '{pwd}'
                            },
                            listeners: {
                                errorchange: 'onUser_pwErrorChange',
                                blur: 'onUser_pwBlur'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true;}
                                var me = Ext.getCmp("win_user");
                                if(Ext.getCmp("auth_srv").getValue()==='Local' && !CheckNotNull(value)){ return get_msg('err_null'); }
                                if(Ext.getCmp("user_pw").getValue() !== value){ return get_msg('err_pwCompare'); }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 'chk_user_pw',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 160,
                            msgTarget: 'none',
                            inputType: 'password',
                            bind: {
                                fieldLabel: '{pwd_confirm}'
                            },
                            listeners: {
                                errorchange: 'onChk_user_pwErrorChange',
                                blur: 'onChk_user_pwBlur'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: 'user_name',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 160,
                            enforceMaxLength: true,
                            maxLength: 31,
                            bind: {
                                fieldLabel: '{user_name}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: 'user_depart',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 160,
                            enforceMaxLength: true,
                            maxLength: 31,
                            bind: {
                                fieldLabel: '{user_depart}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            id: 'auth_srv',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 160,
                            value: 'Local',
                            editable: false,
                            displayField: 'name',
                            valueField: 'val',
                            bind: {
                                fieldLabel: '{auth_server}'
                            },
                            listeners: {
                                change: 'onAuth_srvChange'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true;}
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(!ValidNum(value)){ return get_msg('err_form'); }
                                if(!LengthCheck(value, 0, 65535)){ return ValidLimit(0, 65535); }

                                return true;
                            },
                            fieldInfo: '',
                            cls: [
                                'lb_req',
                                'inp_unit'
                            ],
                            id: 'idle_to',
                            afterBodyEl: [
                                '<div class="inp_after">{[__zen(\'min\')]}</div>'
                            ],
                            labelSeparator: ' ',
                            labelWidth: 160,
                            msgTarget: 'none',
                            value: '60',
                            enableKeyEvents: true,
                            maskRe: /[0-9.]/,
                            bind: {
                                fieldLabel: '{idle_timeout}'
                            },
                            listeners: {
                                errorchange: 'onIdle_toErrorChange',
                                blur: 'onIdle_toBlur',
                                keydown: 'onIdle_toKeydown',
                                focus: 'onIdle_toFocus'
                            }
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'restriction',
                            labelSeparator: ' ',
                            labelWidth: 160,
                            bind: {
                                fieldLabel: '{limit_access}'
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
            flex: 1,
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
                        click: 'onButtonClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick1'
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
        component.validateValue(true);
    },

    onUser_idErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onUser_idBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onUser_pwErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onUser_pwBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onChk_user_pwErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onChk_user_pwBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onAuth_srvChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === "Local"){
            Ext.getCmp("user_pw").enable();
            Ext.getCmp("chk_user_pw").enable();
        }else{
            Ext.getCmp("user_pw").disable();
            Ext.getCmp("chk_user_pw").disable();
        }
    },

    onIdle_toErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onIdle_toBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onIdle_toKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onIdle_toFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'0 ~ 65,535';
        setTipFocus(this,component);
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;
        var count = me.count;

        var name = Ext.getCmp("name");
        var desc = Ext.getCmp("desc");
        var user_id = Ext.getCmp("user_id");
        var user_pw = Ext.getCmp("user_pw");
        var chk_user_pw = Ext.getCmp("chk_user_pw");
        var user_name = Ext.getCmp("user_name");
        var user_depart = Ext.getCmp("user_depart");
        var auth_srv = Ext.getCmp("auth_srv");
        var idle_to = Ext.getCmp("idle_to");
        var restriction = Ext.getCmp("restriction");

        if(name.isValid()===false){ name.focus(); return false; }
        if(user_id.isValid()===false){ user_id.focus(); return false; }
        if(auth_srv.getValue() === "Local"){
            if(user_pw.isValid()===false){ user_pw.focus(); return false; }
            if(chk_user_pw.isValid()===false){ chk_user_pw.focus(); return false; }
        }else{
            user_pw.reset();
            chk_user_pw.reset();
        }
        if(idle_to.isValid()===false){ idle_to.focus(); return false; }

        prt_errMsg(null,null);

        var obj = {
            'name': name.getValue(),
            'desc': desc.getValue(),
            'user_id': user_id.getValue(),
            'user_pw': user_pw.getValue(),
            'user_name': user_name.getValue(),
            'user_depart': user_depart.getValue(),
            'auth_srv': auth_srv.getValue(),
            'idle_to': Number(idle_to.getValue()),
            'restriction': (restriction.getValue())?"Y":"N"
        };

        var update = (me.edit==="edit")?true:false;
        var return_cid = (me.edit==="edit")?false:true;

        var key = {
            name: name.getValue(),
            _kind: 'object_user'
        };

        if(update){
            key['@cid'] = { '$ne': me.cid };
            obj['@cid'] = me.cid;
        }

        var _params = {
            basename: Ext.encode('object_user'),
            obj: Ext.encode(obj),
            id_info: Ext.encode({'fieldname':'@cid'}),
            num_info: Ext.encode({'fieldname':'@num'}),
            update: Ext.encode(update),
            return_cid: Ext.encode(return_cid)
        };

        var _param = {
            basename: Ext.encode('with_cid'),
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

                        var key = {
                            'user_id': user_id.getValue(),
                            '_kind': 'object_user'
                        };
                        if(update){
                            key['@cid'] = { '$ne': me.cid };
                        }

                        var _param = {
                            basename: Ext.encode('with_cid'),
                            key: Ext.encode(key)
                        };

                        request_helper.xmlrpc_call_JsonP(
                            'ftuctrl',
                            'getObject',
                            _param,
                            function(response){

                                if(response !== null){
                                    prt_errMsg(get_msg('err_userid'),null); user_id.focus(); return false;
                                }else{
                                    fn_set();
                                }
                            }
                        );
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
                            var _store = Ext.data.StoreManager.lookup("store_user_list");
                        }else{
                            if(me.target !== undefined){
                                var __cid = (update)?me.cid:response.retval;
                                addFWItem(me.target, update, name.getValue(), "user", __cid, null);
                            }
                            var _store = Ext.data.StoreManager.lookup(me.loadmode);
                        }

                        _store.load(function(records,options,success){
                            if(me.loadmode === undefined && !me.edit){
                                var tot = options.getProxy().getReader().rawData.retval;
                                Ext.getCmp("disp_user_total").setValue(tot.total+'/'+tot.max_count);
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

    onButtonClick1: function(button, e, eOpts) {
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = Ext.getCmp("win_user");
        me.fieldInfo = makeZenTip();

        chk_zenauth(null);

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

        var _param = {
            'basename': Ext.encode('user_awareness_auth_server'),
            'sort_list': Ext.encode([['name',1]])
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _param,
            function(response){

                var data = [{ 'name':'Local','val':'Local' }];

                for(var i=0; i<response.list.length; i++){
                    data.push({ 'name':response.list[i].name, 'val':response.list[i].name });
                }

                var record = Ext.create('Ext.data.Store',{
                    data: data,
                    fields: ['name','val']
                });

                Ext.getCmp("auth_srv").bindStore(record);
            }
        );

        if(me.edit === "edit"){
            me.setTitle(__zen('user_edit')+" - "+me.num);

            var _params = {
                'basename': Ext.encode('object_user'),
                'search_info': Ext.encode({'type':'cid','value':me.cid})
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getObjectList',
                _params,
                function(response){

                    var list = response.list[0];
                    me.list = list;
                    Ext.getCmp("name").setValue(list.name);
                    Ext.getCmp("desc").setValue(list.desc);
                    Ext.getCmp("user_id").setValue(list.user_id);
                    Ext.getCmp("user_pw").setValue(list.user_pw);
                    Ext.getCmp("chk_user_pw").setValue(list.user_pw);
                    Ext.getCmp("user_name").setValue(list.user_name);
                    Ext.getCmp("user_depart").setValue(list.user_depart);
                    Ext.getCmp("auth_srv").setValue(list.auth_srv);
                    Ext.getCmp("idle_to").setValue(list.idle_to);

                    if(list.restriction === "Y"){
                        Ext.getCmp("restriction").setValue(true);
                    }
                }
            );
        }else{
            me.setTitle(__zen('user_add'));
        }
    }

});