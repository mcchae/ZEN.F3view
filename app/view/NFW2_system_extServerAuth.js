
Ext.define('NFW2.view.NFW2_system_extServerAuth', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_system_extserverauth',

    requires: [
        'NFW2.view.NFW2_system_extServerAuthViewModel',
        'Ext.form.field.ComboBox',
        'Ext.form.Panel',
        'Ext.panel.Tool',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_system_extserverauth'
    },
    cls: 'zen_body',
    id: 'NFW2_auth',
    width: 900,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            cls: 'fld_info_box',
            items: [
                {
                    xtype: 'combobox',
                    id: 'access',
                    labelSeparator: ' ',
                    labelWidth: 160,
                    value: 'local',
                    editable: false,
                    emptyText: 'Select',
                    displayField: 'name',
                    store: 'store_serverauth',
                    valueField: 'val',
                    bind: {
                        fieldLabel: '{auth_method}'
                    }
                }
            ]
        },
        {
            xtype: 'panel',
            items: [
                {
                    xtype: 'form',
                    id: 'form_sys_radius',
                    bodyPadding: 10,
                    title: 'RADIUS',
                    tools: [
                        {
                            xtype: 'toggleslide',
                            onText: {
                                txt: __zen('toggle_on')
                            },
                            offText: {
                                txt: __zen('toggle_off')
                            },
                            resizeHandle: false,
                            state: false,
                            id: 'chk_radius',
                            listeners: {
                                change: 'onToolChange'
                            }
                        }
                    ],
                    items: [
                        {
                            xtype: 'container',
                            disabled: true,
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!ValidIPAddress(value)){ return get_msg('err_ip'); }

                                                        return true;
                                                    },
                                                    cls: 'lb_req',
                                                    id: 'r_ip',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    bind: {
                                                        fieldLabel: '{server_address}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onR_ipErrorChange',
                                                        focus: 'onR_ipFocus',
                                                        blur: 'onR_ipBlur'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                        return true;
                                                    },
                                                    cls: 'lb_req',
                                                    id: 'r_pw',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    inputType: 'password',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 31,
                                                    bind: {
                                                        fieldLabel: '{shared_pwd}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onR_pwErrorChange',
                                                        keydown: 'onR_pwKeydown',
                                                        blur: 'onR_pwBlur'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!LengthCheck(value, 1025, 65536)){ return ValidLimit(1025, 65536); }

                                                        return true;
                                                    },
                                                    fieldInfo: '',
                                                    cls: 'lb_req',
                                                    id: 'r_auth',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    value: '1812',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9.]/,
                                                    maxLength: 5,
                                                    bind: {
                                                        fieldLabel: '{auth_port}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onR_authErrorChange',
                                                        keydown: 'onR_authKeydown',
                                                        focus: 'onR_authFocus',
                                                        blur: 'onR_authBlur'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!LengthCheck(value, 1025, 65536)){ return ValidLimit(1025, 65536); }

                                                        return true;
                                                    },
                                                    fieldInfo: '',
                                                    cls: 'lb_req',
                                                    id: 'r_account',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    value: '1813',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9.]/,
                                                    maxLength: 5,
                                                    bind: {
                                                        fieldLabel: '{account_port}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onR_accountErrorChange',
                                                        keydown: 'onR_accountKeydown',
                                                        focus: 'onR_accountFocus',
                                                        blur: 'onR_accountBlur'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'x-field x-form-item-label x-form-item-label-default',
                                            width: 125,
                                            bind: {
                                                text: '{state_chk}'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            id: 'r_btn',
                                            margin: '0 0 0 10',
                                            iconCls: 'ft_confirm_icl',
                                            bind: {
                                                text: '{current_state_chk}'
                                            },
                                            listeners: {
                                                click: 'onR_btnClick'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            cls: 'errorBox',
                                            hidden: true,
                                            id: 'err_r_radius'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'form',
                    id: 'form_sys_tacacs',
                    bodyPadding: 10,
                    title: 'TACACS+',
                    tools: [
                        {
                            xtype: 'toggleslide',
                            onText: {
                                txt: __zen('toggle_on')
                            },
                            offText: {
                                txt: __zen('toggle_off')
                            },
                            resizeHandle: false,
                            state: false,
                            id: 'chk_tacacs',
                            listeners: {
                                change: 'onToolChange1'
                            }
                        }
                    ],
                    items: [
                        {
                            xtype: 'container',
                            disabled: true,
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!ValidIPAddress(value)){ return get_msg('err_ip'); }

                                                        return true;
                                                    },
                                                    cls: 'lb_req',
                                                    id: 't_ip',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    bind: {
                                                        fieldLabel: '{server_address}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onT_ipErrorChange',
                                                        focus: 'onT_ipFocus',
                                                        blur: 'onT_ipBlur'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                        return true;
                                                    },
                                                    cls: 'lb_req',
                                                    id: 't_pw',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    inputType: 'password',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 31,
                                                    bind: {
                                                        fieldLabel: '{shared_pwd}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onT_pwErrorChange',
                                                        keydown: 'onT_pwKeydown',
                                                        blur: 'onT_pwBlur'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'x-field x-form-item-label x-form-item-label-default',
                                            width: 125,
                                            bind: {
                                                text: '{state_chk}'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            id: 't_btn',
                                            margin: '0 0 0 10',
                                            iconCls: 'ft_confirm_icl',
                                            bind: {
                                                text: '{current_state_chk}'
                                            },
                                            listeners: {
                                                click: 'onT_btnClick'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            cls: 'errorBox',
                                            hidden: true,
                                            id: 'err_t_radius'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'form',
                    id: 'form_sys_ldap',
                    bodyPadding: 10,
                    title: 'LDAP',
                    tools: [
                        {
                            xtype: 'toggleslide',
                            onText: {
                                txt: __zen('toggle_on')
                            },
                            offText: {
                                txt: __zen('toggle_off')
                            },
                            resizeHandle: false,
                            state: false,
                            id: 'chk_ldap',
                            listeners: {
                                change: 'onToolChange2'
                            }
                        }
                    ],
                    items: [
                        {
                            xtype: 'container',
                            disabled: true,
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!ValidIPAddress(value)){ return get_msg('err_ip'); }

                                                        return true;
                                                    },
                                                    cls: 'lb_req',
                                                    id: 'l_ip',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    bind: {
                                                        fieldLabel: '{server_address}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onL_ipErrorChange',
                                                        focus: 'onL_ipFocus',
                                                        blur: 'onL_ipBlur'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                        return true;
                                                    },
                                                    cls: 'lb_req',
                                                    id: 'l_base_dn',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 63,
                                                    bind: {
                                                        fieldLabel: '{base_dn}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onL_basic_dnErrorChange',
                                                        keydown: 'onL_basic_dnKeydown',
                                                        blur: 'onL_base_dnBlur'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: 'l_bind_dn',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 63,
                                                    bind: {
                                                        fieldLabel: '{bind_dn}'
                                                    },
                                                    listeners: {
                                                        keydown: 'onL_bind_dnKeydown'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: 'l_pw',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    inputType: 'password',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 31,
                                                    bind: {
                                                        fieldLabel: '{bind_pwd}'
                                                    },
                                                    listeners: {
                                                        keydown: 'onL_pwKeydown'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'x-field x-form-item-label x-form-item-label-default',
                                            width: 125,
                                            bind: {
                                                text: '{state_chk}'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            id: 'l_btn',
                                            margin: '0 0 0 10',
                                            iconCls: 'ft_confirm_icl',
                                            bind: {
                                                text: '{current_state_chk}'
                                            },
                                            listeners: {
                                                click: 'onL_btnClick'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            cls: 'errorBox',
                                            hidden: true,
                                            id: 'err_l_radius'
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
    listeners: {
        afterrender: 'onPanelAfterRender'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'bottom',
            margin: '10 0 0 0',
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

    onToolChange: function(tool, state) {
        var _panel = tool.up('panel');
        var _state = (state===true)?false:true;

        if(_state === true){
            var _param = {
                basename : Ext.encode('with_cid'),
                cond: Ext.encode({'_kind':'vpn_isakmpsa','Xauth_serv':'on','Xauth_certi':'remote'})
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getObjects',
                _param,
                function(response){

                    if(response.total > 0){
                        Ext.getCmp("chk_radius").toggle();
                        Ext.MessageBox.alert(__weguardia,__zen('extauth_msg1'));
                    }else{
                        _panel.query('container:not(header)').forEach(function(c){ c.setDisabled(_state);});
                    }
                }
            );
        }else{
            _panel.query('container:not(header)').forEach(function(c){ c.setDisabled(_state);});
        }
    },

    onR_ipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onR_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onR_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onR_pwErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onR_pwKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(code === 32){
            e.stopEvent();
        }
    },

    onR_pwBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onR_authErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onR_authKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onR_authFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1025 ~ 65536';
        setTipFocus(this,component);
    },

    onR_authBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onR_accountErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onR_accountKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onR_accountFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1025 ~ 65536';
        setTipFocus(this,component);
    },

    onR_accountBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onR_btnClick: function(button, e, eOpts) {
        this.getExternal('radius_check');
    },

    onToolChange1: function(tool, state) {
        var _panel = tool.up('panel');
        var _state = (state===true)?false:true;

        _panel.query('container:not(header)').forEach(function(c){ c.setDisabled(_state);});
    },

    onT_ipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onT_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onT_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onT_pwErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onT_pwKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(code === 32){
            e.stopEvent();
        }
    },

    onT_pwBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onT_btnClick: function(button, e, eOpts) {
        this.getExternal('tacacs_check');
    },

    onToolChange2: function(tool, state) {
        var _panel = tool.up('panel');
        var _state = (state===true)?false:true;

        _panel.query('container:not(header)').forEach(function(c){ c.setDisabled(_state);});
    },

    onL_ipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onL_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onL_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onL_basic_dnErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onL_basic_dnKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(code === 32){
            e.stopEvent();
        }
    },

    onL_base_dnBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onL_bind_dnKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(code === 32){
            e.stopEvent();
        }
    },

    onL_pwKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(code === 32){
            e.stopEvent();
        }
    },

    onL_btnClick: function(button, e, eOpts) {
        this.getExternal('ldap_check');
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        me.fieldInfo = makeZenTip();

        me.init_extserverauth();

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'isCC',
            {},
            function(response){
                me.cc = response;
            }
        );
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var chk_radius = Ext.getCmp("chk_radius");
        var r_ip = Ext.getCmp("r_ip");
        var r_pw = Ext.getCmp("r_pw");
        var r_auth = Ext.getCmp("r_auth");
        var r_account = Ext.getCmp("r_account");

        var chk_tacacs = Ext.getCmp("chk_tacacs");
        var t_ip = Ext.getCmp("t_ip");
        var t_pw = Ext.getCmp("t_pw");

        var chk_ldap = Ext.getCmp("chk_ldap");
        var l_ip = Ext.getCmp("l_ip");
        var l_base_dn = Ext.getCmp("l_base_dn");
        var l_bind_dn = Ext.getCmp("l_bind_dn");
        var l_pw = Ext.getCmp("l_pw");

        if(chk_radius.getValue()){

            if(r_ip.isValid()===false){ r_ip.focus(); return false; }
            if(r_pw.isValid()===false){ r_pw.focus(); return false; }
            if(r_auth.isValid()===false){ r_auth.focus(); return false; }
            if(r_account.isValid()===false){ r_account.focus(); return false; }
        }

        if(chk_tacacs.getValue()){

            if(t_ip.isValid()===false){ t_ip.focus(); return false; }
            if(t_pw.isValid()===false){ t_pw.focus(); return false; }
        }

        if(chk_ldap.getValue()){

            if(l_ip.isValid()===false){ l_ip.focus(); return false; }
            if(l_base_dn.isValid()===false){ l_base_dn.focus(); return false; }
        }

        var obj = {
            'nac': {
                'access': Ext.getCmp("access").getValue().toLowerCase(),
                'radius': {
                    "@chk_use": (chk_radius.getValue())?"on":"off",
                    "ip": (chk_radius.getValue())?r_ip.getValue():"",
                    "password": (chk_radius.getValue())?r_pw.getValue():"",
                    "auth_port": (chk_radius.getValue())?r_auth.getValue():"",
                    "account_port": (chk_radius.getValue())?r_account.getValue():""
                },
                'tacacs': {
                    "@chk_use": (chk_tacacs.getValue())?"on":"off",
                    "ip": (chk_tacacs.getValue())?t_ip.getValue():"",
                    "password": (chk_tacacs.getValue())?t_pw.getValue():""
                },
                'ldap': {
                    "@chk_use": (chk_ldap.getValue())?"on":"off",
                    "ip": (chk_ldap.getValue())?l_ip.getValue():"",
                    "base": (l_base_dn.getValue())?l_base_dn.getValue():"",
                    "binddn": (l_bind_dn.getValue())?l_bind_dn.getValue():"",
                    "bindpw": (chk_ldap.getValue())?l_pw.getValue():""
                }
            }
        };

        var _params = {
            basename: Ext.encode('system_external_access'),
            obj: Ext.encode(obj)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params,
            function(response){

                Ext.Msg.alert(__weguardia,get_msg("msg_ok_add"));
                me.init_extserverauth();

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'setExternAuthCongig',
                    _params,
                    function(response){}
                );
            }
        );
    },

    onButtonClick1: function(button, e, eOpts) {
        this.init_extserverauth();
    },

    init_extserverauth: function() {
        var _params = {
            basename: Ext.encode('system_external_access')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){

                hideLoadMask();

                if(response){

                    var nac = response.nac;

                    var radius = nac.radius;
                    var tacacs = nac.tacacs;
                    var ldap = nac.ldap;

                    if(nac.access){
                        Ext.getCmp("access").setValue(nac.access);
                    }

                    if(radius["@chk_use"] === "on"){

                        Ext.getCmp("chk_radius").state = true;
                        Ext.getCmp("chk_radius").moveHandle(true);
                        Ext.getCmp("chk_radius").up('panel').query('container:not(header)').forEach(function(c){ c.setDisabled(false);});
                        Ext.getCmp("r_ip").setValue(radius.ip);
                        Ext.getCmp("r_pw").setValue(radius.password);
                        Ext.getCmp("r_auth").setValue(radius.auth_port);
                        Ext.getCmp("r_account").setValue(radius.account_port);
                    }else{
                        Ext.getCmp("chk_radius").state = false;
                        Ext.getCmp("chk_radius").moveHandle(false);
                        Ext.getCmp("chk_radius").up('panel').query('container:not(header)').forEach(function(c){ c.setDisabled(true);});
                        Ext.getCmp("r_ip").reset();
                        Ext.getCmp("r_pw").reset();
                        Ext.getCmp("r_auth").reset();
                        Ext.getCmp("r_account").reset();
                    }

                    if(tacacs["@chk_use"] === "on"){

                        Ext.getCmp("chk_tacacs").state = true;
                        Ext.getCmp("chk_tacacs").moveHandle(true);
                        Ext.getCmp("chk_tacacs").up('panel').query('container:not(header)').forEach(function(c){ c.setDisabled(false);});
                        Ext.getCmp("t_ip").setValue(tacacs.ip);
                        Ext.getCmp("t_pw").setValue(tacacs.password);
                    }else{
                        Ext.getCmp("chk_tacacs").state = false;
                        Ext.getCmp("chk_tacacs").moveHandle(false);
                        Ext.getCmp("chk_tacacs").up('panel').query('container:not(header)').forEach(function(c){ c.setDisabled(true);});
                        Ext.getCmp("t_ip").reset();
                        Ext.getCmp("t_pw").reset();
                    }

                    if(ldap["@chk_use"] === "on"){

                        Ext.getCmp("chk_ldap").state = true;
                        Ext.getCmp("chk_ldap").moveHandle(true);
                        Ext.getCmp("chk_ldap").up('panel').query('container:not(header)').forEach(function(c){ c.setDisabled(false);});
                        Ext.getCmp("l_ip").setValue(ldap.ip);
                        Ext.getCmp("l_base_dn").setValue(ldap.base);
                        Ext.getCmp("l_bind_dn").setValue(ldap.binddn);
                        Ext.getCmp("l_pw").setValue(ldap.bindpw);
                    }else{
                        Ext.getCmp("chk_ldap").state = false;
                        Ext.getCmp("chk_ldap").moveHandle(false);
                        Ext.getCmp("chk_ldap").up('panel').query('container:not(header)').forEach(function(c){ c.setDisabled(true);});
                        Ext.getCmp("l_ip").reset();
                        Ext.getCmp("l_base_dn").reset();
                        Ext.getCmp("l_bind_dn").reset();
                        Ext.getCmp("l_pw").reset();
                    }
                }else{
                    Ext.getCmp("fm").getForm().reset();
                }
            }
        );
    },

    getExternal: function(type) {
        var _params = {
            type: Ext.encode(type)
        };

        showLoadMask();

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getExternalServerStatus',
            _params,
            function(response){

                hideLoadMask();

                if(response){
                    Ext.Msg.alert(__weguardia,__zen('extauth_msg2'));
                }else{
                    Ext.Msg.alert(__weguardia,__zen('extauth_msg3'));
                }
            }
        );
    }

});