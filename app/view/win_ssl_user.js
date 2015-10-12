
Ext.define('NFW2.view.win_ssl_user', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ssl_user',

    requires: [
        'NFW2.view.win_ssl_userViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_ssl_user'
    },
    cls: 'zen_win',
    id: 'win',
    scrollable: true,
    width: 600,
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
            itemId: 'fm',
            scrollable: true,
            bodyPadding: 20,
            title: '',
            items: [
                {
                    xtype: 'container',
                    minWidth: 420,
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(!idCheck(value)){ return get_msg('err_id'); }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 'id',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            enforceMaxLength: true,
                            maxLength: 31,
                            bind: {
                                fieldLabel: '{user_id}'
                            },
                            listeners: {
                                errorchange: 'onIdErrorChange',
                                blur: 'onIdBlur',
                                focus: 'onIdFocus'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(value.length < 2){ return ValidMinMax("이름",2,32,1); }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 'name',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            enforceMaxLength: true,
                            maxLength: 32,
                            bind: {
                                fieldLabel: '{name}'
                            },
                            listeners: {
                                errorchange: 'onNameErrorChange',
                                blur: 'onNameBlur',
                                focus: 'onNameFocus'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: 'post',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 120,
                            bind: {
                                fieldLabel: '{depart}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: 'title',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            enforceMaxLength: true,
                            maxLength: 64,
                            bind: {
                                fieldLabel: '{title}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var me = Ext.getCmp("win");

                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(me.edit === "edit"){
                                    if(me.pwd !== value){
                                        if(!passwordCheck(value)){ return get_msg('err_pw'); }
                                    }
                                }else{
                                    if(!passwordCheck(value)){ return get_msg('err_pw'); }
                                    if(!idCheck(value) || value.length < 9){ return get_msg('err_pw'); }
                                    if(value.length > 31){ return get_msg('err_pw'); }
                                }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 'pw',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            inputType: 'password',
                            enforceMaxLength: false,
                            bind: {
                                fieldLabel: '{pwd}'
                            },
                            listeners: {
                                errorchange: 'onPwErrorChange',
                                blur: 'onPwBlur',
                                focus: 'onPwFocus'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var me = Ext.getCmp("win");

                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(me.edit === "edit"){
                                    if(me.pwd !== value){
                                        if(!passwordCheck(value)){ return get_msg('err_pw'); }
                                    }
                                }

                                if(value !== Ext.getCmp("pw").getValue()){ return get_msg('err_pwCompare'); }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 'r_pw',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            inputType: 'password',
                            bind: {
                                fieldLabel: '{pwd_confirm}'
                            },
                            listeners: {
                                errorchange: 'onR_pwErrorChange',
                                blur: 'onR_pwBlur',
                                focus: 'onR_pwFocus'
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
    ],

    onIdErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onIdBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onIdFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('character_tip_id');
        setTipFocus(this,component);
    },

    onNameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onNameBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onNameFocus: function(component, event, eOpts) {
        component.fieldInfo = '2~32'+__zen('charact');
        setTipFocus(this,component);
    },

    onPwErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onPwBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onPwFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('character_tip_pwds');
        setTipFocus(this,component);
    },

    onR_pwErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onR_pwBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onR_pwFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('character_tip_pwds');
        setTipFocus(this,component);
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        me.fieldInfo = makeZenTip();

        chk_zenauth(null);

        if(me.edit === "edit"){

            var record = me.record;

            me.pwd = record.password;

            me.setTitle(__zen('user_edit')+" - "+record._num);
            Ext.getCmp("id").setValue(record.login_id);
            Ext.getCmp("name").setValue(record.user_name);
            Ext.getCmp("post").setValue(record.depart);
            Ext.getCmp("title").setValue(record.title);
            Ext.getCmp("pw").setValue(record.password);
            Ext.getCmp("r_pw").setValue(record.password);
        }else{
            me.setTitle(__zen('user_add'));
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var id = Ext.getCmp("id");
        var name = Ext.getCmp("name");
        var post = Ext.getCmp("post");
        var title = Ext.getCmp("title");
        var pw = Ext.getCmp("pw");
        var r_pw = Ext.getCmp("r_pw");

        if(id.isValid()===false){ id.focus(); return false; }
        if(name.isValid()===false){ name.focus(); return false; }
        if(title.isValid()===false){ title.focus(); return false; }
        if(pw.isValid()===false){ pw.focus(); return false; }
        if(r_pw.isValid()===false){ r_pw.focus(); return false; }

        prt_errMsg(null,null);

        var obj = {};

        obj.login_id = id.getValue();
        obj.user_name = name.getValue();
        obj.depart = post.getValue();
        obj.title = title.getValue();
        obj.password = pw.getValue();
        obj.login_fail_cnt = (me.edit==="edit")?Number(me.record.login_fail_cnt):0;

        var update = (me.edit==="edit")?true:false;

        if(update){
            obj._id = me.record._id;
        }

        var key = {
            login_id: id.getValue()
        };

        var _params = {
            basename: Ext.encode('ssl_user_config'),
            obj: Ext.encode(obj),
            update: Ext.encode(update)
        };

        var _param = {
            basename: Ext.encode("ssl_user_config"),
            key: Ext.encode(key)
        };

        if(me.login_id !== id.getValue()){

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getObject',
                _param,
                function(response){

                    if(response !== null){
                        prt_errMsg(get_msg('err_ssl_userdob'),null); id.focus(); return false;
                    }else{
                        fn_set();
                    }
                }
            );
        }else{
            fn_set();
        }

        function fn_set(){

            request_helper.xmlrpc_call_Ajax_Post(
                'ftuctrl',
                'setListTypeObj',
                _params,
                function(response){
                    var store = Ext.data.StoreManager.lookup("store_sslplus_user_list");
                    store.load();

                    if(store.getTotalCount()+1 > Ext.getCmp("NFW2_user").count){
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
                }
            );
        }
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    }

});