
Ext.define('NFW2.view.NFW2_network_l2tp', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_l2tp',

    requires: [
        'NFW2.view.NFW2_network_l2tpViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'nfw2_network_l2tp'
    },
    cls: 'zen_body',
    id: 'NFW2_network_l2tp',
    width: 900,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'container',
                    margin: '0 0 0 10',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'label',
                            width: 170,
                            bind: {
                                text: '{l2tp_service}'
                            }
                        },
                        {
                            xtype: 'toggleslide',
                            state: false,
                            resizeHandle: false,
                            id: 'l2tp_chk',
                            labelSeparator: ' ',
                            labelWidth: 170,
                            listeners: {
                                change: 'onCheckboxfieldChange',
                                beforerender: 'onL2tp_chkBeforeRender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    disabled: true,
                    id: 'l2tp_set_con',
                    margin: '8 0 0 0 ',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    width: 170,
                                    bind: {
                                        text: '{ip_pool}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                            var temp = value.split('/');
                                            if(!ValidIPAddress(temp[0])){ return get_msg('err_ipv4'); }
                                            if(!ValidIPAddress(temp[1])){ return get_msg('err_form'); }
                                        }

                                        return true;
                                    },
                                    id: 'l2tp_ipmask',
                                    width: 250,
                                    labelSeparator: ' ',
                                    labelWidth: 150,
                                    msgTarget: 'none',
                                    value: '192.168.10.0/255.255.255.0',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9.\/]/,
                                    maxLength: 31,
                                    listeners: {
                                        errorchange: 'onTextfieldErrorChange',
                                        blur: 'onL2tp_ipmaskBlur',
                                        focus: 'onL2tp_ipmaskFocus'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'errorBox',
                                    hidden: true,
                                    id: 'l2tp_ipmask_error'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '8 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    width: 170,
                                    bind: {
                                        text: '{l2tp_secret_key}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                            if(!LengthCheck2(value,4,31)){ return ValidMinMax("비밀키",4,31,0); }
                                        }

                                        return true;
                                    },
                                    id: 'l2tp_key',
                                    width: 250,
                                    labelSeparator: ' ',
                                    labelWidth: 170,
                                    msgTarget: 'none',
                                    inputType: 'password',
                                    enforceMaxLength: true,
                                    maxLength: 31,
                                    listeners: {
                                        errorchange: 'onL2tp_keyErrorChange',
                                        blur: 'onL2tp_keyBlur'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'errorBox',
                                    hidden: true,
                                    id: 'l2tp_key_error'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '8 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    width: 170,
                                    bind: {
                                        text: '{auth_method}'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    validator: function(value) {
                                        if(value !== true){
                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        }

                                        return true;
                                    },
                                    id: 'l2tp_set_com',
                                    labelSeparator: ' ',
                                    labelWidth: 170,
                                    msgTarget: 'none',
                                    editable: false,
                                    emptyText: 'Select',
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: {
                                        data: [
                                            {
                                                name: 'Radius',
                                                value: 1
                                            }
                                        ],
                                        fields: [
                                            {
                                                name: 'name'
                                            },
                                            {
                                                name: 'value'
                                            }
                                        ]
                                    },
                                    valueField: 'value',
                                    listeners: {
                                        errorchange: 'onL2tp_set_comErrorChange',
                                        beforeselect: 'onL2tp_set_comBeforeSelect',
                                        blur: 'onL2tp_set_comBlur'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'mt_info',
                                    hidden: true,
                                    id: 'l2tp_radius'
                                },
                                {
                                    xtype: 'label',
                                    cls: 'errorBox',
                                    hidden: true,
                                    id: 'l2tp_set_error'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '8 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            if(!CheckNotNull(value)){ return true; }
                                            if(!ValidIPAddress(value)){ return get_msg('err_form'); }
                                        }

                                        return true;
                                    },
                                    id: 'l2tp_dns1',
                                    width: 350,
                                    labelSeparator: ' ',
                                    labelWidth: 165,
                                    msgTarget: 'none',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9.]/,
                                    maxLength: 15,
                                    bind: {
                                        fieldLabel: '{dns_server_fir}'
                                    },
                                    listeners: {
                                        errorchange: 'onL2tp_dns1ErrorChange',
                                        blur: 'onL2tp_dns1Blur',
                                        focus: 'onL2tp_dns1Focus'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'errorBox',
                                    hidden: true,
                                    id: 'l2tp_dns1_error'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '8 0 10 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            if(!CheckNotNull(value)){ return true; }
                                            if(!ValidIPAddress(value)){ return get_msg('err_form'); }
                                        }

                                        return true;
                                    },
                                    id: 'l2tp_dns2',
                                    width: 350,
                                    labelSeparator: ' ',
                                    labelWidth: 165,
                                    msgTarget: 'none',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9.]/,
                                    maxLength: 15,
                                    bind: {
                                        fieldLabel: '{dns_server_sec}'
                                    },
                                    listeners: {
                                        errorchange: 'onL2tp_dns2ErrorChange',
                                        blur: 'onL2tp_dns2Blur',
                                        focus: 'onL2tp_dns2Focus'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'errorBox',
                                    hidden: true,
                                    id: 'l2tp_dns2_error'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onNFW2_network_l2tpAfterRender'
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

    onCheckboxfieldChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){ Ext.getCmp('l2tp_set_con').enable(true); }
        else{
            Ext.getCmp('l2tp_set_con').disable(true);
            Ext.suspendLayouts();
            if(Ext.getCmp('l2tp_ipmask').validateValue() === false){ Ext.getCmp('l2tp_ipmask').validateValue(true); }
            if(Ext.getCmp('l2tp_key').validateValue() === false){ Ext.getCmp('l2tp_key').validateValue(true); }
            if(Ext.getCmp('l2tp_set_com').validateValue() === false){ Ext.getCmp('l2tp_set_com').validateValue(true); }
            if(Ext.getCmp('l2tp_dns1').validateValue() === false){ Ext.getCmp('l2tp_dns1').validateValue(true); }
            if(Ext.getCmp('l2tp_dns2').validateValue() === false){ Ext.getCmp('l2tp_dns2').validateValue(true); }
            Ext.resumeLayouts();
        }
    },

    onL2tp_chkBeforeRender: function(component, eOpts) {
        component.onText = __zen('use');
        component.offText = __zen('unused');
    },

    onTextfieldErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onL2tp_ipmaskBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onL2tp_ipmaskFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s2m');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onL2tp_keyErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onL2tp_keyBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onL2tp_set_comErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onL2tp_set_comBeforeSelect: function(combo, record, index, eOpts) {
        var me = Ext.getCmp('NFW2_network_l2tp');

        if(me.radius !== "on"){
            Ext.getCmp('l2tp_set_com').validateValue(true);
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
            err_fl.addCls('ic_msg_err');
            err_fl.update(get_msg('err_radius'));
        //     Ext.getCmp('l2tp_radius').setText(get_msg('err_radius'));
        //     Ext.getCmp('l2tp_radius').show();
            return (1 != record.data.value);
        }
    },

    onL2tp_set_comBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
        component.validateValue(true);
    },

    onL2tp_dns1ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onL2tp_dns1Blur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onL2tp_dns1Focus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onL2tp_dns2ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onL2tp_dns2Blur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onL2tp_dns2Focus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onNFW2_network_l2tpAfterRender: function(component, eOpts) {
        var me = this;
        this.fieldInfo = makeZenTip();

        var _params = {
            basename: Ext.encode('system_external_access')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){
                if(response.nac.radius['@chk_use'] === "on"){ me.radius = "on"; }
                else{ me.radius = "off"; }
            }
        );

        me.get_l2tp();
    },

    onButtonClick: function(button, e, eOpts) {
        var obj = {};

        if(Ext.getCmp('l2tp_chk').state === true){
            if(Ext.getCmp('l2tp_ipmask').isValid() === false){ Ext.getCmp('l2tp_ipmask').focus(); return false; }
            if(Ext.getCmp('l2tp_key').isValid() === false){ Ext.getCmp('l2tp_key').focus(); return false; }
            if(Ext.getCmp('l2tp_set_com').isValid() === false){ Ext.getCmp('l2tp_set_com').focus(); return false; }
            if(Ext.getCmp('l2tp_dns1').isValid() === false){ Ext.getCmp('l2tp_dns1').focus(); return false; }
            if(Ext.getCmp('l2tp_dns2').isValid() === false){ Ext.getCmp('l2tp_dns2').focus(); return false; }

            obj.chk_use = "on";
            obj.ip_pool = Ext.getCmp('l2tp_ipmask').getValue();
            obj.l2tp_key = Ext.getCmp('l2tp_key').getValue();
            obj.auth = Ext.getCmp('l2tp_set_com').getValue();
            obj.dns_1 = Ext.getCmp('l2tp_dns1').getValue();
            obj.dns_2 = Ext.getCmp('l2tp_dns2').getValue();
        }
        else{ obj.chk_use = "off"; }

        var _params = {
            basename: Ext.encode('network_l2tp'),
            obj : Ext.encode(obj)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params,
            function(response){
                Ext.Msg.show({
                    title: __weguardia,
                    msg: get_msg("msg_ok_add"),
                    width: 300,
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });
            }
        );
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_network_l2tp');

        Ext.getCmp('l2tp_ipmask').setValue('192.168.10.0/255.255.255.0');
        Ext.getCmp('l2tp_key').reset();
        Ext.getCmp('l2tp_set_com').reset();
        Ext.getCmp('l2tp_dns1').reset();
        Ext.getCmp('l2tp_dns2').reset();

        me.get_l2tp();
    },

    get_l2tp: function() {
        var _params = {
            basename: Ext.encode('network_l2tp')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){
                hideLoadMask();
                if(response !== null){
                    if(response.chk_use === "on"){
                        Ext.getCmp('l2tp_chk').state = true;
                        Ext.getCmp('l2tp_chk').moveHandle(true);
                        Ext.getCmp('l2tp_set_con').enable(true);
                        Ext.getCmp('l2tp_ipmask').setValue(response.ip_pool);
                        Ext.getCmp('l2tp_key').setValue(response.l2tp_key);
                        Ext.getCmp('l2tp_set_com').setValue(response.auth);
                        Ext.getCmp('l2tp_dns1').setValue(response.dns_1);
                        Ext.getCmp('l2tp_dns2').setValue(response.dns_2);
                    }
                    else{
                        Ext.getCmp('l2tp_chk').state = false;
                        Ext.getCmp('l2tp_chk').moveHandle(false);
                        Ext.getCmp('l2tp_set_con').disable(true);
                    }
                }
            }
        );
    }

});