
Ext.define('NFW2.view.win_user_server', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_user_server',

    requires: [
        'NFW2.view.win_user_serverViewModel',
        'Ext.form.Panel',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.field.ComboBox',
        'Ext.form.FieldSet',
        'Ext.form.field.TextArea',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'win_user_server'
    },
    cls: 'zen_win',
    scrollable: true,
    width: 500,
    title: '사용자 인증 서버 추가',
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
            bodyPadding: 10,
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'tabpanel',
                            cls: 'zen_tab',
                            bodyPadding: 10,
                            activeTab: 0,
                            items: [
                                {
                                    xtype: 'panel',
                                    id: 'tab_ser',
                                    bind: {
                                        title: '{basic_setting}'
                                    },
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
                                            labelWidth: 120,
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
                                            labelWidth: 120,
                                            enforceMaxLength: true,
                                            maxLength: 127,
                                            bind: {
                                                fieldLabel: '{desc}'
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            cls: 'lb_req',
                                            id: 'stype',
                                            width: 400,
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            value: 'ldap',
                                            editable: false,
                                            displayField: 'name',
                                            valueField: 'val',
                                            bind: {
                                                fieldLabel: '{server_type}'
                                            },
                                            listeners: {
                                                change: 'onStypeChange'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value === true){ return true;}
                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                return true;
                                            },
                                            cls: 'lb_req',
                                            id: 'addr',
                                            width: 400,
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            enforceMaxLength: true,
                                            maxLength: 255,
                                            bind: {
                                                fieldLabel: '{server_address}'
                                            },
                                            listeners: {
                                                errorchange: 'onAddrErrorChange',
                                                blur: 'onAddrBlur'
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
                                            cls: 'lb_req',
                                            id: 'port',
                                            width: 400,
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            value: '389',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 5,
                                            bind: {
                                                fieldLabel: '{connection_port}'
                                            },
                                            listeners: {
                                                errorchange: 'onPortErrorChange',
                                                focus: 'onPortFocus',
                                                blur: 'onPortBlur',
                                                keydown: 'onPortKeydown'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value === true){ return true;}
                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                return true;
                                            },
                                            cls: 'lb_req',
                                            disabled: true,
                                            id: 'secret',
                                            width: 400,
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            inputType: 'password',
                                            enforceMaxLength: true,
                                            maxLength: 31,
                                            bind: {
                                                fieldLabel: '{shared_pwd}'
                                            },
                                            listeners: {
                                                errorchange: 'onSecretErrorChange',
                                                blur: 'onSecretBlur'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value === true){ return true;}
                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                return true;
                                            },
                                            cls: 'lb_req',
                                            id: 'basedn',
                                            width: 400,
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            enforceMaxLength: true,
                                            maxLength: 255,
                                            bind: {
                                                fieldLabel: '{base_dn}'
                                            },
                                            listeners: {
                                                errorchange: 'onBasednErrorChange',
                                                blur: 'onBasednBlur'
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            id: 'user_import1',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true;}
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                        return true;
                                                    },
                                                    cls: 'lb_req',
                                                    id: 'im_dn1',
                                                    width: 400,
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    enforceMaxLength: true,
                                                    bind: {
                                                        fieldLabel: '{bind_dn}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onIm_dn1ErrorChange',
                                                        blur: 'onIm_dn1Blur'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true;}
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                        return true;
                                                    },
                                                    cls: 'lb_req',
                                                    id: 'im_pw1',
                                                    width: 400,
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    inputType: 'password',
                                                    enforceMaxLength: true,
                                                    maxLength: 31,
                                                    bind: {
                                                        fieldLabel: '{bind_pwd}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onIm_pw1ErrorChange',
                                                        blur: 'onIm_pw1Blur'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            bind: {
                                                title: '{auth_test}'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: 'test_id',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    enableKeyEvents: true,
                                                    bind: {
                                                        fieldLabel: '{user_id}'
                                                    },
                                                    listeners: {
                                                        keyup: 'onTest_idKeyup'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'test_pw',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    inputType: 'password',
                                                    enableKeyEvents: true,
                                                    bind: {
                                                        fieldLabel: '{pwd}'
                                                    },
                                                    listeners: {
                                                        keyup: 'onTest_pwKeyup'
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch',
                                                        pack: 'end'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            cls: 'btn_b',
                                                            disabled: true,
                                                            id: 'b_test',
                                                            bind: {
                                                                text: '{test}'
                                                            },
                                                            listeners: {
                                                                click: 'onButtonClick2'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textareafield',
                                                    id: 'test_result',
                                                    labelAlign: 'top',
                                                    labelSeparator: ' ',
                                                    bind: {
                                                        fieldLabel: '{test_result}'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: 'tab_at',
                                    bind: {
                                        title: '{detail_setting}'
                                    },
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            bind: {
                                                title: '{properties_name}'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true;}
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                        return true;
                                                    },
                                                    cls: 'lb_req',
                                                    id: 'at_id',
                                                    width: 400,
                                                    labelSeparator: ' ',
                                                    labelWidth: 140,
                                                    msgTarget: 'none',
                                                    value: 'uid',
                                                    enforceMaxLength: true,
                                                    maxLength: 31,
                                                    bind: {
                                                        fieldLabel: '{user_id}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onAt_idErrorChange',
                                                        blur: 'onAt_idBlur'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true;}
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                        return true;
                                                    },
                                                    cls: 'lb_req',
                                                    id: 'at_name',
                                                    width: 400,
                                                    labelSeparator: ' ',
                                                    labelWidth: 140,
                                                    msgTarget: 'none',
                                                    value: 'displayName',
                                                    enforceMaxLength: true,
                                                    maxLength: 31,
                                                    bind: {
                                                        fieldLabel: '{user_name}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onAt_nameErrorChange',
                                                        blur: 'onAt_nameBlur'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true;}
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                        return true;
                                                    },
                                                    cls: 'lb_req',
                                                    id: 'at_dep',
                                                    width: 400,
                                                    labelSeparator: ' ',
                                                    labelWidth: 140,
                                                    msgTarget: 'none',
                                                    value: 'organizationName',
                                                    enforceMaxLength: true,
                                                    maxLength: 31,
                                                    bind: {
                                                        fieldLabel: '{user_depart}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onAt_depErrorChange',
                                                        blur: 'onAt_depBlur'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true;}
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                        return true;
                                                    },
                                                    cls: 'lb_req',
                                                    id: 'at_grp',
                                                    width: 400,
                                                    labelSeparator: ' ',
                                                    labelWidth: 140,
                                                    msgTarget: 'none',
                                                    value: 'cn',
                                                    enforceMaxLength: true,
                                                    maxLength: 31,
                                                    bind: {
                                                        fieldLabel: '{user_group}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onAt_grpErrorChange',
                                                        blur: 'onAt_grpBlur'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true;}
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                        return true;
                                                    },
                                                    cls: 'lb_req',
                                                    id: 'at_mmbr',
                                                    width: 400,
                                                    labelSeparator: ' ',
                                                    labelWidth: 140,
                                                    msgTarget: 'none',
                                                    value: 'memberUid',
                                                    enforceMaxLength: true,
                                                    maxLength: 31,
                                                    bind: {
                                                        fieldLabel: '{user_group_mem}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onAt_mmbrErrorChange',
                                                        blur: 'onAt_mmbrBlur'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            disabled: true,
                                            hidden: true,
                                            id: 'user_import',
                                            items: [
                                                {
                                                    xtype: 'fieldset',
                                                    title: '사용자 Import',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: 'im_dn',
                                                            width: 400,
                                                            fieldLabel: 'Bind DN',
                                                            labelSeparator: ' ',
                                                            labelWidth: 120,
                                                            enforceMaxLength: true
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: 'im_pw',
                                                            width: 400,
                                                            fieldLabel: 'Bind 비밀번호',
                                                            labelSeparator: ' ',
                                                            labelWidth: 120,
                                                            inputType: 'password',
                                                            enforceMaxLength: true,
                                                            maxLength: 31
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

    onStypeChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === "ldap"){
            Ext.getCmp("port").setValue('389');
            Ext.getCmp("at_id").setValue("uid");
            Ext.getCmp("at_name").setValue("displayName");
            Ext.getCmp("at_dep").setValue("organizationName");
            Ext.getCmp("at_grp").setValue("cn");
            Ext.getCmp("at_mmbr").setValue("memberUid");
            Ext.getCmp("basedn").enable();
            Ext.getCmp("secret").disable();
            Ext.getCmp("tab_at").enable();
            Ext.getCmp("user_import1").enable();
        }else if(newValue === "ad"){
            Ext.getCmp("port").setValue('389');
            Ext.getCmp("at_id").setValue("cn");
            Ext.getCmp("at_name").setValue("displayName");
            Ext.getCmp("at_dep").setValue("department");
            Ext.getCmp("at_grp").setValue("cn");
            Ext.getCmp("at_mmbr").setValue("member");
            Ext.getCmp("basedn").enable();
            Ext.getCmp("secret").disable();
            Ext.getCmp("tab_at").enable();
            Ext.getCmp("user_import1").enable();
        }else if(newValue === "radius"){
            Ext.getCmp("port").setValue("1812");
            Ext.getCmp("basedn").disable();
            Ext.getCmp("secret").enable();
            Ext.getCmp("tab_at").disable();
            Ext.getCmp("user_import1").disable();
        }else if(newValue === "tacacs+"){
            Ext.getCmp("port").setValue("49");
            Ext.getCmp("basedn").disable();
            Ext.getCmp("secret").enable();
            Ext.getCmp("tab_at").disable();
            Ext.getCmp("user_import1").disable();
        }
    },

    onAddrErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onAddrBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onPortErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onPortFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'0 ~ 65535';
        setTipFocus(this,component);
    },

    onPortBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onPortKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onSecretErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onSecretBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onBasednErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onBasednBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onIm_dn1ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onIm_dn1Blur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onIm_pw1ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onIm_pw1Blur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onTest_idKeyup: function(textfield, e, eOpts) {
        var test_id = Ext.getCmp("test_id");
        var test_pw = Ext.getCmp("test_pw");

        if(test_id.getValue() !== "" && test_pw.getValue() !== ""){
            Ext.getCmp("b_test").enable();
        }else{
            Ext.getCmp('b_test').disable();
        }
    },

    onTest_pwKeyup: function(textfield, e, eOpts) {
        var test_id = Ext.getCmp("test_id");
        var test_pw = Ext.getCmp("test_pw");

        if(test_id.getValue() !== "" && test_pw.getValue() !== ""){
            Ext.getCmp("b_test").enable();
        }else{
            Ext.getCmp('b_test').disable();
        }
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;
        var stype = Ext.getCmp("stype");
        var addr = Ext.getCmp("addr");
        var port = Ext.getCmp("port");
        var secret = Ext.getCmp("secret");
        var basedn = Ext.getCmp("basedn");
        var bind_dn = Ext.getCmp("im_dn1");
        var bind_pw = Ext.getCmp("im_pw1");

        var at_id = Ext.getCmp("at_id");
        var test_id = Ext.getCmp("test_id");
        var test_pw = Ext.getCmp("test_pw");

        if(addr.isValid()===false){ addr.focus(); return false; }
        if(port.isValid()===false){ port.focus(); return false; }
        if(stype.getValue() === "radius" || stype.getValue() === 'tacacs+'){
            if(secret.isValid()===false){ secret.focus(); return false; }
        }else{
            if(basedn.isValid()===false){ basedn.focus(); return false; }
            if(bind_dn.isValid()===false){ bind_dn.focus(); return false; }
            if(bind_pw.isValid()===false){ bind_pw.focus(); return false; }
        }
        if(at_id.isValid()===false){ at_id.focus(); return false; }

        button.disable();

        var _params = {
            func_name: Ext.encode('mod_fw_ua_auth_server_test'),
            args: Ext.encode({
                'stype': stype.getValue(),
                'addr': addr.getValue(),
                'port': Number(port.getValue()),
                'basedn': (stype.getValue()==='ldap'||stype.getValue()==='ad')?basedn.getValue():null,
                'bind_dn': (stype.getValue()==='ldap'||stype.getValue()==='ad')?bind_dn.getValue():null,
                'bind_pw': (stype.getValue()==='ldap'||stype.getValue()==='ad')?bind_pw.getValue():null,
                'secret': (stype.getValue()==='radius'||stype.getValue()==='tacacs+')?secret.getValue():null,
                'at_id': (stype.getValue()==='ldap'||stype.getValue()==='ad')?at_id.getValue():null,
                'test_id': test_id.getValue(),
                'test_pw': test_pw.getValue()
            })
        };
        me.mask('Loading...');

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'execKctrlFunc',
            _params,
            function(response){

                me.unmask();

                var msg = '';
                if(response[0] === true){
                    msg = 'msg_auth_suc';
                }else{
                    if(response[1] === 'Fail (Invalid ID/PW)\n'){
                        msg = 'err_auth_idpw';
                    }else if(response[1] === 'Fail (Invalid Shared Secret)\n'){
                        msg = 'err_auth_secret';
                    }else if(response[1] === 'Fail (Server Error)\n'){
                        msg = 'err_auth_server';
                    }else{
                        msg = 'err_auth_unknow';
                    }
                }
                button.enable();

                Ext.getCmp("test_result").setValue(get_msg(msg));
            }
        );
    },

    onAt_idErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onAt_idBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onAt_nameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onAt_nameBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onAt_depErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onAt_depBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onAt_grpErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onAt_grpBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onAt_mmbrErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onAt_mmbrBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;
        var count = (me.loadmode===undefined)?Ext.getCmp("NFW2_user").count:null;

        var name = Ext.getCmp("name");
        var desc = Ext.getCmp("desc");
        var stype = Ext.getCmp("stype");
        var addr = Ext.getCmp("addr");
        var port = Ext.getCmp("port");
        var secret = Ext.getCmp("secret");
        var basedn = Ext.getCmp("basedn");
        var at_id = Ext.getCmp("at_id");
        var at_name = Ext.getCmp("at_name");
        var at_dep = Ext.getCmp("at_dep");
        var at_grp = Ext.getCmp("at_grp");
        var at_mmbr = Ext.getCmp("at_mmbr");
        var im_dn = Ext.getCmp("im_dn1");
        var im_pw = Ext.getCmp("im_pw1");

        if(name.isValid()===false){ Ext.getCmp("tab_ser").show(); name.focus(); return false; }
        if(addr.isValid()===false){ Ext.getCmp("tab_ser").show(); addr.focus(); return false; }
        if(port.isValid()===false){ Ext.getCmp("tab_ser").show(); port.focus(); return false; }
        if(stype.getValue() === 'radius' || stype.getValue() === 'tacacs+'){
            if(secret.isValid()===false){ Ext.getCmp("tab_ser").show(); secret.focus(); return false; }
        }else{
            if(basedn.isValid()===false){ basedn.focus(); return false; }
            if(at_id.isValid()===false){ Ext.getCmp("tab_at").show(); at_id.focus(); return false; }
            if(at_name.isValid()===false){ Ext.getCmp("tab_at").show(); at_name.focus(); return false; }
            if(at_dep.isValid()===false){ Ext.getCmp("tab_at").show(); at_dep.focus(); return false; }
            if(at_grp.isValid()===false){ Ext.getCmp("tab_at").show(); at_grp.focus(); return false; }
            if(at_mmbr.isValid()===false){ Ext.getCmp("tab_at").show(); at_mmbr.focus(); return false; }
            if(im_dn.isValid()===false){ Ext.getCmp("tab_ser").show(); im_dn.focus(); return false; }
            if(im_pw.isValid()===false){ Ext.getCmp("tab_ser").show(); im_pw.focus(); return false; }
        }

        prt_errMsg(null,null);

        var obj = {
            'name': name.getValue(),
            'desc': desc.getValue(),
            'stype': stype.getValue(),
            'addr': addr.getValue(),
            'port': port.getValue(),
            'secret': (stype.getValue()==='radius'|| stype.getValue()==='tacacs+')?secret.getValue():'',
            'basedn': (stype.getValue()==='ldap'|| stype.getValue()==='ad')?basedn.getValue():'',
            'at_id': (stype.getValue()==='ldap'|| stype.getValue()==='ad')?at_id.getValue():'',
            'at_name': (stype.getValue()==='ldap'|| stype.getValue()==='ad')?at_name.getValue():'',
            'at_dep': (stype.getValue()==='ldap'|| stype.getValue()==='ad')?at_dep.getValue():'',
            'at_grp': (stype.getValue()==='ldap'|| stype.getValue()==='ad')?at_grp.getValue():'',
            'at_mmbr': (stype.getValue()==='ldap'|| stype.getValue()==='ad')?at_mmbr.getValue():'',
            'im_dn': (stype.getValue()==='ldap'|| stype.getValue()==='ad')?im_dn.getValue():'',
            'im_pw': (stype.getValue()==='ldap'|| stype.getValue()==='ad')?im_pw.getValue():''
        };

        var update = (me.edit==="edit")?true:false;

        var key = {
            name: name.getValue()
        };

        if(update){
            key['@cid'] = { '$ne': me.cid };
            obj['_id'] = me.record._id;
        }

        var _param = {
            basename: Ext.encode('user_awareness_auth_server'),
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

            var _params = {
                basename: Ext.encode('user_awareness_auth_server'),
                obj: Ext.encode(obj),
                update: Ext.encode(update)
            };

            Ext.data.JsonP.request({
                url: "/api/ftuctrl/setListTypeObj",
                params: _params,
                success: function(response){

                    if(response.retcode === true){

                        var _store = Ext.data.StoreManager.lookup("store_user_auth_server_list");

                        _store.load(function(records,options,success){
                            if(me.loadmode === undefined && !me.edit){
                                var tot = options.getProxy().getReader().rawData.retval;
                                Ext.getCmp("disp_user_server_total").setValue(tot.total+'/'+tot.max_count);
                            }
                        });

                        if(_store.getTotalCount()+1 >= count){
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
        var me = this;
        me.fieldInfo = makeZenTip();

        chk_zenauth(null);

        var record = Ext.create('Ext.data.Store',{
            data: [
                { 'name':'LDAP','val':'ldap' },
                { 'name':'AD','val':'ad' },
                { 'name':'RADIUS','val':'radius' },
                { 'name':'TACACS+','val':'tacacs+' }
            ],
            fields: ['name','val']
        });

        Ext.getCmp("stype").bindStore(record);

        if(me.edit === "edit"){
            me.setTitle(__zen('user_auth_server_edit')+" - "+me.num);
            var record = me.record;

            Ext.getCmp("name").setValue(record.name);
            Ext.getCmp("desc").setValue(record.desc);
            Ext.getCmp("stype").setValue(record.stype);
            Ext.getCmp("addr").setValue(record.addr);
            Ext.getCmp("port").setValue(record.port);
            Ext.getCmp("secret").setValue(record.secret);
            Ext.getCmp("basedn").setValue(record.basedn);
            Ext.getCmp("at_id").setValue(record.at_id);
            Ext.getCmp("at_name").setValue(record.at_name);
            Ext.getCmp("at_dep").setValue(record.at_dep);
            Ext.getCmp("at_grp").setValue(record.at_grp);
            Ext.getCmp("at_mmbr").setValue(record.at_mmbr);
            Ext.getCmp("im_dn1").setValue(record.im_dn);
            Ext.getCmp("im_pw1").setValue(record.im_pw);
        }else{
            me.setTitle(__zen('user_auth_server_add'));
        }
    }

});