
Ext.define('NFW2.view.win_ipsec', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ipsec',

    requires: [
        'NFW2.view.win_ipsecViewModel',
        'Ext.form.Panel',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.button.Segmented',
        'Ext.Img',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.view.Table',
        'Ext.XTemplate',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'win_ipsec'
    },
    cls: 'zen_win',
    id: 'win_ipsec',
    scrollable: true,
    width: 900,
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
            id: 'fm_ipsec',
            scrollable: true,
            bodyPadding: 20,
            items: [
                {
                    xtype: 'tabpanel',
                    cls: 'zen_tab',
                    id: 'tab_ipsec',
                    activeTab: 0,
                    plain: true,
                    items: [
                        {
                            xtype: 'panel',
                            cls: 'zen_tab_body',
                            id: 'tab_1',
                            bind: {
                                title: '{basic_setting}'
                            },
                            tabConfig: {
                                xtype: 'tab',
                                width: 100,
                                listeners: {
                                    click: 'onTabClick1'
                                }
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    width: 670,
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value === true){ return true; }
                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                if(!ValidNotKor(value)){ return get_msg('err_name'); }

                                                return true;
                                            },
                                            cls: 'lb_req',
                                            id: 'name',
                                            width: 500,
                                            labelSeparator: ' ',
                                            labelWidth: 170,
                                            msgTarget: 'none',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 31,
                                            minLength: 1,
                                            bind: {
                                                fieldLabel: '{name}'
                                            },
                                            listeners: {
                                                errorchange: 'onTextfieldErrorChange',
                                                keydown: 'onTextfieldKeydown',
                                                blur: 'onNameBlur'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'tagfield',
                                    cls: 'lb_req',
                                    id: 'interface',
                                    width: 500,
                                    labelSeparator: ' ',
                                    labelWidth: 170,
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'store_interface',
                                    transform: 'Ext.form.field.Tag',
                                    valueField: 'name',
                                    bind: {
                                        fieldLabel: '{inter}'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'x-field x-form-item-label x-form-item-label-default',
                                            width: 185,
                                            bind: {
                                                text: '{version}'
                                            }
                                        },
                                        {
                                            xtype: 'segmentedbutton',
                                            cls: 'zen_seg',
                                            id: 'isa_ver',
                                            items: [
                                                {
                                                    enableToggle: true,
                                                    pressed: true,
                                                    text: 'IKEv1',
                                                    value: 'ikev1'
                                                },
                                                {
                                                    text: 'IKEv2',
                                                    value: 'ikev2'
                                                }
                                            ],
                                            listeners: {
                                                toggle: 'onSegmentedbuttonToggle'
                                            }
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
                                            xtype: 'label',
                                            cls: [
                                                'x-field x-form-item-label x-form-item-label-default',
                                                'lb_req'
                                            ],
                                            width: 185,
                                            bind: {
                                                text: '{authby}'
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'segmentedbutton',
                                                    cls: 'zen_seg',
                                                    id: 'isa_authby',
                                                    items: [
                                                        {
                                                            enableToggle: true,
                                                            pressed: true,
                                                            text: 'Preshared Key',
                                                            value: 'psk'
                                                        },
                                                        {
                                                            text: 'Certificate',
                                                            value: 'certificate'
                                                        }
                                                    ],
                                                    listeners: {
                                                        toggle: 'onSegmentedbuttonToggle2'
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    id: 'con_psk',
                                                    margin: '5 0 0 0',
                                                    layout: 'table',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(value === true){ return true; }
                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                if(value.length < 4 || value.length > 31){
                                                                    return ValidMinMax('Preshared key',4,31);
                                                                }

                                                                return true;
                                                            },
                                                            id: 'isa_psk',
                                                            width: 250,
                                                            labelSeparator: ' ',
                                                            msgTarget: 'none',
                                                            enforceMaxLength: true,
                                                            maxLength: 31,
                                                            minLength: 1,
                                                            listeners: {
                                                                errorchange: 'onIsa_pskErrorChange',
                                                                keydown: 'onIsa_pskKeydown',
                                                                blur: 'onIsa_pskBlur',
                                                                focus: 'onIsa_pskFocus'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            hidden: true,
                                                            id: 'con_cert',
                                                            layout: 'table',
                                                            items: [
                                                                {
                                                                    xtype: 'combobox',
                                                                    id: 'isa_cert_sel',
                                                                    width: 250,
                                                                    labelSeparator: ' ',
                                                                    editable: false,
                                                                    emptyText: 'Select',
                                                                    displayField: 'cert_name',
                                                                    store: 'store_isakmp_cert',
                                                                    valueField: 'cert_name',
                                                                    listeners: {
                                                                        change: 'onIsa_cert_selChange'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'image',
                                                                    height: 14,
                                                                    hidden: true,
                                                                    id: 'help_cert',
                                                                    margin: '0 0 0 15',
                                                                    width: 14,
                                                                    src: '../images/b_help.png',
                                                                    listeners: {
                                                                        render: 'onImageRender2'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value === true){ return true; }
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        if(value.indexOf(".")!== -1){
                                            var _val = value.split(".");
                                            var _num = Ext.isNumber(Number(_val[0]));

                                            if(_num){
                                                if(!ValidIPAddress(value)){ return __zen('ip')+get_msg('err_form');}
                                            }else{
                                                if(!ValidURL(value)){ return __zen('domain')+get_msg('err_form'); }
                                            }
                                        }else{
                                            if(value.indexOf("::") !== -1){
                                                if(!ValidIPv6(value)){ return __zen('ip')+get_msg('err_form'); }
                                            }else{
                                                if(!ValidURL(value) || !ValidIPAddress(value)){ return get_msg('err_form'); }
                                            }
                                        }

                                        return true;
                                    },
                                    cls: 'lb_req',
                                    id: 'ipdomain',
                                    width: 500,
                                    labelSeparator: ' ',
                                    labelWidth: 170,
                                    msgTarget: 'none',
                                    bind: {
                                        fieldLabel: '{ip_domain}'
                                    },
                                    listeners: {
                                        errorchange: 'onIpdomainErrorChange',
                                        blur: 'onIpdomainBlur'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_unother',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    cls: 'lb_req',
                                                    id: 'ips_sechost',
                                                    width: 400,
                                                    labelSeparator: ' ',
                                                    labelWidth: 170,
                                                    editable: false,
                                                    displayField: 'name',
                                                    queryMode: 'local',
                                                    store: 'store_ipsec_sechost',
                                                    valueField: 'cid',
                                                    bind: {
                                                        fieldLabel: '{local_sechost}'
                                                    },
                                                    listeners: {
                                                        change: 'onIps_sechostChange',
                                                        render: 'onIps_sechostRender'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!LengthCheck(value, 0, 255)){ return ValidLimit(0, 255); }
                                                        var ver = Ext.getCmp("isa_ver").getValue();
                                                        if(ver === 'ikev2'){
                                                            if(value >= Number(Ext.getCmp("sec_pro2").getValue())){
                                                                return get_msg('err_than');
                                                            }
                                                        }

                                                        return true;
                                                    },
                                                    id: 'sec_pro1',
                                                    margin: '0 0 0 5',
                                                    width: 125,
                                                    labelSeparator: ' ',
                                                    labelWidth: 70,
                                                    msgTarget: 'none',
                                                    value: '0',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 3,
                                                    bind: {
                                                        fieldLabel: '{protocol}'
                                                    },
                                                    listeners: {
                                                        focus: 'onSec_pro1Focus',
                                                        blur: 'onSec_pro1Blur',
                                                        errorchange: 'onSec_pro1ErrorChange',
                                                        keydown: 'onSec_pro1Keydown'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!LengthCheck(value, 0, 255)){ return ValidLimit(0, 255); }
                                                        var ver = Ext.getCmp("isa_ver").getValue();
                                                        if(ver === 'ikev2'){
                                                            if(Number(Ext.getCmp("sec_pro1").getValue()) >= value){
                                                                return get_msg('err_than');
                                                            }
                                                        }

                                                        return true;
                                                    },
                                                    id: 'sec_pro2',
                                                    margin: '0 0 0 5',
                                                    width: 65,
                                                    fieldLabel: '~',
                                                    labelSeparator: ' ',
                                                    labelWidth: 10,
                                                    msgTarget: 'none',
                                                    value: '255',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 3,
                                                    listeners: {
                                                        afterrender: 'onSec_pro2AfterRender',
                                                        errorchange: 'onSec_pro2ErrorChange',
                                                        focus: 'onSec_pro2Focus',
                                                        blur: 'onSec_pro2Blur',
                                                        keydown: 'onSec_pro2Keydown'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!LengthCheck(value, 0, 65535)){ return ValidLimit(0, 65535); }
                                                        var ver = Ext.getCmp("isa_ver").getValue();
                                                        if(ver === 'ikev2'){
                                                            if(value >= Number(Ext.getCmp("sec_port2").getValue())){
                                                                return get_msg('err_than');
                                                            }
                                                        }

                                                        return true;
                                                    },
                                                    id: 'sec_port1',
                                                    margin: '0 0 0 5',
                                                    width: 110,
                                                    labelSeparator: ' ',
                                                    labelWidth: 40,
                                                    msgTarget: 'none',
                                                    value: '0',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 5,
                                                    bind: {
                                                        fieldLabel: '{port}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onSec_port1ErrorChange',
                                                        keydown: 'onSec_port1Keydown',
                                                        focus: 'onSec_port1Focus',
                                                        blur: 'onSec_port1Blur'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!LengthCheck(value, 0, 65535)){ return ValidLimit(0, 65535); }
                                                        var ver = Ext.getCmp("isa_ver").getValue();
                                                        if(ver === 'ikev2'){
                                                            if(Number(Ext.getCmp("sec_port1").getValue()) >= value){
                                                                return get_msg('err_than');
                                                            }
                                                        }

                                                        return true;
                                                    },
                                                    id: 'sec_port2',
                                                    margin: '0 0 0 5',
                                                    width: 80,
                                                    fieldLabel: '~',
                                                    labelSeparator: ' ',
                                                    labelWidth: 10,
                                                    msgTarget: 'none',
                                                    value: '65535',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 5,
                                                    listeners: {
                                                        afterrender: 'onSec_port2AfterRender',
                                                        errorchange: 'onSec_port2ErrorChange',
                                                        keydown: 'onSec_port2Keydown',
                                                        focus: 'onSec_port2Focus',
                                                        blur: 'onSec_port2Blur'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            id: 'st_ipsec_con_hub_net',
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    cls: 'lb_req',
                                                    id: 'hub_net',
                                                    width: 400,
                                                    labelSeparator: ' ',
                                                    labelWidth: 170,
                                                    editable: false,
                                                    displayField: 'name',
                                                    queryMode: 'local',
                                                    store: 'store_ipsec_sechost',
                                                    valueField: 'cid',
                                                    bind: {
                                                        fieldLabel: '{remote_sechost}'
                                                    },
                                                    listeners: {
                                                        change: 'onHub_netChange',
                                                        render: 'onHub_netRender'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!LengthCheck(value, 0, 255)){ return ValidLimit(0, 255); }
                                                        var ver = Ext.getCmp("isa_ver").getValue();
                                                        if(ver === 'ikev2'){
                                                            if(value >= Number(Ext.getCmp("net_pro2").getValue())){
                                                                return get_msg('err_than');
                                                            }
                                                        }

                                                        return true;
                                                    },
                                                    id: 'net_pro1',
                                                    margin: '0 0 0 5',
                                                    width: 125,
                                                    labelSeparator: ' ',
                                                    labelWidth: 70,
                                                    msgTarget: 'none',
                                                    value: '0',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 3,
                                                    bind: {
                                                        fieldLabel: '{protocol}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onNet_pro1ErrorChange',
                                                        keydown: 'onNet_pro1Keydown',
                                                        focus: 'onNet_pro1Focus',
                                                        blur: 'onNet_pro1Blur'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!LengthCheck(value, 0, 255)){ return ValidLimit(0, 255); }
                                                        var ver = Ext.getCmp("isa_ver").getValue();
                                                        if(ver === 'ikev2'){
                                                            if(Number(Ext.getCmp("net_pro1").getValue()) >= value){
                                                                return get_msg('err_than');
                                                            }
                                                        }

                                                        return true;
                                                    },
                                                    id: 'net_pro2',
                                                    margin: '0 0 0 5',
                                                    width: 65,
                                                    fieldLabel: '~',
                                                    labelSeparator: ' ',
                                                    labelWidth: 10,
                                                    msgTarget: 'none',
                                                    value: '255',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 3,
                                                    listeners: {
                                                        afterrender: 'onNet_pro2AfterRender',
                                                        errorchange: 'onNet_pro2ErrorChange',
                                                        keydown: 'onNet_pro2Keydown',
                                                        focus: 'onNet_pro2Focus',
                                                        blur: 'onNet_pro2Blur'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!LengthCheck(value, 0, 65535)){ return ValidLimit(0, 65535); }
                                                        var ver = Ext.getCmp("isa_ver").getValue();
                                                        if(ver === 'ikev2'){
                                                            if(value >= Number(Ext.getCmp("net_port2").getValue())){
                                                                return get_msg('err_than');
                                                            }
                                                        }

                                                        return true;
                                                    },
                                                    id: 'net_port1',
                                                    margin: '0 0 0 5',
                                                    width: 110,
                                                    labelSeparator: ' ',
                                                    labelWidth: 40,
                                                    msgTarget: 'none',
                                                    value: '0',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 5,
                                                    bind: {
                                                        fieldLabel: '{port}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onNet_port1ErrorChange',
                                                        keydown: 'onNet_port1Keydown',
                                                        focus: 'onNet_port1Focus',
                                                        blur: 'onNet_port1Blur'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!LengthCheck(value, 0, 65535)){ return ValidLimit(0, 65535); }
                                                        var ver = Ext.getCmp("isa_ver").getValue();
                                                        if(ver === 'ikev2'){
                                                            if(Number(Ext.getCmp("net_port1").getValue()) >= value){
                                                                return get_msg('err_than');
                                                            }
                                                        }

                                                        return true;
                                                    },
                                                    id: 'net_port2',
                                                    margin: '0 0 0 5',
                                                    width: 80,
                                                    fieldLabel: '~',
                                                    labelSeparator: ' ',
                                                    labelWidth: 10,
                                                    msgTarget: 'none',
                                                    value: '65535',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 5,
                                                    listeners: {
                                                        afterrender: 'onNet_port2AfterRender',
                                                        focus: 'onNet_port2Focus',
                                                        blur: 'onNet_port2Blur',
                                                        errorchange: 'onNet_port2ErrorChange',
                                                        keydown: 'onNet_port2Keydown'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            cls: 'zen_tab_body',
                            id: 'tab_2',
                            bind: {
                                title: '{detail_setting}'
                            },
                            tabConfig: {
                                xtype: 'tab',
                                width: 100,
                                listeners: {
                                    click: 'onTabClick2'
                                }
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    toggleOnTitleClick: false,
                                    items: [
                                        {
                                            xtype: 'container',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    id: 'con_mode',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            cls: 'x-field x-form-item-label x-form-item-label-default',
                                                            width: 185,
                                                            bind: {
                                                                text: '{mode}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'segmentedbutton',
                                                            cls: 'zen_seg',
                                                            id: 'isa_mode',
                                                            items: [
                                                                {
                                                                    enableToggle: true,
                                                                    pressed: true,
                                                                    text: 'Main',
                                                                    value: 'main'
                                                                },
                                                                {
                                                                    text: 'Aggressive',
                                                                    value: 'agressive'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    margin: '5 0 0 0',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            cls: 'x-field x-form-item-label x-form-item-label-default',
                                                            width: 185,
                                                            bind: {
                                                                text: '{operating}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'segmentedbutton',
                                                            cls: 'zen_seg',
                                                            id: 'isa_action',
                                                            items: [
                                                                {
                                                                    enableToggle: true,
                                                                    pressed: true,
                                                                    text: 'Initiator',
                                                                    value: 'initiator'
                                                                },
                                                                {
                                                                    text: 'Responder',
                                                                    value: 'responder'
                                                                }
                                                            ],
                                                            listeners: {
                                                                toggle: 'onIsa_actionToggle'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    margin: '0 0 0 175',
                                                    layout: 'table',
                                                    items: [
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'chk_dpd',
                                                            boxLabel: 'DPD',
                                                            checked: true,
                                                            listeners: {
                                                                change: 'onCheckboxfieldChange'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            id: 'con_dpd',
                                                            margin: '5 0 0 0',
                                                            layout: 'table',
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    margin: '0 0 0 10',
                                                                    bind: {
                                                                        text: '{dpd_info1}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        if(!CheckNotNull(value) || value === true){ return true; }
                                                                        if(!ValidNum(value)){ return get_msg('err_form'); }
                                                                        if(!LengthCheck(value, 1, 255)){ return ValidLimit(1, 255); }

                                                                        return true;
                                                                    },
                                                                    fieldInfo: '입력범위 : 1 ~ 255',
                                                                    id: 'isa_dpd_sec',
                                                                    width: 50,
                                                                    labelSeparator: ' ',
                                                                    msgTarget: 'none',
                                                                    value: '3',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maskRe: /[0-9.]/,
                                                                    maxLength: 3,
                                                                    minLength: 1,
                                                                    listeners: {
                                                                        errorchange: 'onIsa_dpd_secErrorChange',
                                                                        keydown: 'onIsa_dpd_secKeydown',
                                                                        focus: 'onIsa_dpd_secFocus',
                                                                        blur: 'onIsa_dpd_secBlur'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    margin: '0 0 0 15',
                                                                    bind: {
                                                                        text: '{dpd_info2}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        if(!CheckNotNull(value) || value === true){ return true; }
                                                                        if(!ValidNum(value)){ return get_msg('err_form'); }
                                                                        if(!LengthCheck(value, 1, 255)){ return ValidLimit(1, 255); }

                                                                        return true;
                                                                    },
                                                                    fieldInfo: '입력범위 : 1 ~ 255',
                                                                    id: 'isa_dpd_cnt',
                                                                    style: 'margin-left:3px',
                                                                    width: 50,
                                                                    fieldLabel: '',
                                                                    msgTarget: 'none',
                                                                    value: '3',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maskRe: /[0-9.]/,
                                                                    maxLength: 3,
                                                                    minLength: 1,
                                                                    listeners: {
                                                                        errorchange: 'onIsa_dpd_cntErrorChange',
                                                                        keydown: 'onIsa_dpd_cntKeydown',
                                                                        focus: 'onIsa_dpd_cntFocus',
                                                                        blur: 'onIsa_dpd_cntBlur'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    margin: '0 0 0 15',
                                                                    bind: {
                                                                        text: '{dpd_info3}'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            id: 'con_enau',
                                                            layout: 'table',
                                                            items: [
                                                                {
                                                                    xtype: 'combobox',
                                                                    cls: 'lb_req',
                                                                    id: 'isa_encpt',
                                                                    width: 325,
                                                                    labelSeparator: ' ',
                                                                    labelWidth: 170,
                                                                    value: 'aes128',
                                                                    editable: false,
                                                                    displayField: 'name',
                                                                    forceSelection: true,
                                                                    queryMode: 'local',
                                                                    store: 'store_isakmp_encpt',
                                                                    valueField: 'val',
                                                                    bind: {
                                                                        fieldLabel: '{algorithm}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    margin: '3 0 0 20',
                                                                    text: '-'
                                                                },
                                                                {
                                                                    xtype: 'combobox',
                                                                    id: 'isa_auth',
                                                                    width: 145,
                                                                    value: 'sha1',
                                                                    editable: false,
                                                                    displayField: 'name',
                                                                    forceSelection: true,
                                                                    queryMode: 'local',
                                                                    store: 'store_ipsec_auth',
                                                                    valueField: 'val'
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    cls: 'btn_b',
                                                                    margin: '-2 0 0 15',
                                                                    iconCls: 'icb_add',
                                                                    listeners: {
                                                                        click: 'onButtonClick3'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            id: 'con_enau_obj',
                                                            margin: '0 0 5 185',
                                                            items: [
                                                                {
                                                                    xtype: 'gridpanel',
                                                                    id: 'grid_enau',
                                                                    width: 140,
                                                                    hideHeaders: true,
                                                                    store: 'store_isakmp_enau_obj',
                                                                    columns: [
                                                                        {
                                                                            xtype: 'gridcolumn',
                                                                            id: 'is_n1',
                                                                            dataIndex: 'name1',
                                                                            text: 'String',
                                                                            flex: 1
                                                                        },
                                                                        {
                                                                            xtype: 'actioncolumn',
                                                                            id: 'is_del1',
                                                                            width: 20,
                                                                            align: 'center',
                                                                            items: [
                                                                                {
                                                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                                        var _store = Ext.getCmp("grid_enau").getStore();
                                                                                        var _data = _store.data.items[0].data;
                                                                                        var record = [];
                                                                                        colIndex = (colIndex+1)/2;

                                                                                        for(var i=1; i<5; i++){
                                                                                            if(colIndex !== i)
                                                                                            eval('if(_data.name'+i+' !== ""){ record.push(_data.val'+i+'); }');
                                                                                        }

                                                                                        var n_record = {};
                                                                                        for(var l=0; l<4; l++){
                                                                                            if(record[l]){
                                                                                                eval('n_record.name'+(l+1)+' = record[l].toUpperCase();');
                                                                                                eval('n_record.val'+(l+1)+' = record[l];');
                                                                                                Ext.getCmp("is_n"+(l+1)).show();
                                                                                                Ext.getCmp("is_del"+(l+1)).show();
                                                                                            }else{
                                                                                                Ext.getCmp("is_n"+(l+1)).hide();
                                                                                                Ext.getCmp("is_del"+(l+1)).hide();
                                                                                            }
                                                                                        }

                                                                                        if(n_record.name4){ Ext.getCmp("grid_enau").setWidth(560); }
                                                                                        else if(n_record.name3){ Ext.getCmp("grid_enau").setWidth(420); }
                                                                                        else if(n_record.name2){ Ext.getCmp("grid_enau").setWidth(280); }
                                                                                        else if(n_record.name1){ Ext.getCmp("grid_enau").setWidth(140); }

                                                                                        _store.loadData([n_record]);

                                                                                        if(!n_record.name1){
                                                                                            Ext.getCmp("con_enau_obj").hide();
                                                                                        }
                                                                                    },
                                                                                    iconCls: 'icr_del'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn',
                                                                            hidden: true,
                                                                            id: 'is_n2',
                                                                            dataIndex: 'name2',
                                                                            text: 'String',
                                                                            flex: 1
                                                                        },
                                                                        {
                                                                            xtype: 'actioncolumn',
                                                                            hidden: true,
                                                                            id: 'is_del2',
                                                                            width: 20,
                                                                            align: 'center',
                                                                            items: [
                                                                                {
                                                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                                        var _store = Ext.getCmp("grid_enau").getStore();
                                                                                        var _data = _store.data.items[0].data;
                                                                                        var record = [];
                                                                                        colIndex = (colIndex+1)/2;

                                                                                        for(var i=1; i<5; i++){
                                                                                            if(colIndex !== i)
                                                                                            eval('if(_data.name'+i+' !== ""){ record.push(_data.val'+i+'); }');
                                                                                        }

                                                                                        var n_record = {};
                                                                                        for(var l=0; l<4; l++){
                                                                                            if(record[l]){
                                                                                                eval('n_record.name'+(l+1)+' = record[l].toUpperCase();');
                                                                                                eval('n_record.val'+(l+1)+' = record[l];');
                                                                                                Ext.getCmp("is_n"+(l+1)).show();
                                                                                                Ext.getCmp("is_del"+(l+1)).show();
                                                                                            }else{
                                                                                                Ext.getCmp("is_n"+(l+1)).hide();
                                                                                                Ext.getCmp("is_del"+(l+1)).hide();
                                                                                            }
                                                                                        }

                                                                                        if(n_record.name4){ Ext.getCmp("grid_enau").setWidth(560); }
                                                                                        else if(n_record.name3){ Ext.getCmp("grid_enau").setWidth(420); }
                                                                                        else if(n_record.name2){ Ext.getCmp("grid_enau").setWidth(280); }
                                                                                        else if(n_record.name1){ Ext.getCmp("grid_enau").setWidth(140); }

                                                                                        _store.loadData([n_record]);

                                                                                        if(!n_record.name1){
                                                                                            Ext.getCmp("con_enau_obj").hide();
                                                                                        }
                                                                                    },
                                                                                    iconCls: 'icr_del'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn',
                                                                            hidden: true,
                                                                            id: 'is_n3',
                                                                            dataIndex: 'name3',
                                                                            text: 'String',
                                                                            flex: 1
                                                                        },
                                                                        {
                                                                            xtype: 'actioncolumn',
                                                                            hidden: true,
                                                                            id: 'is_del3',
                                                                            width: 20,
                                                                            align: 'center',
                                                                            items: [
                                                                                {
                                                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                                        var _store = Ext.getCmp("grid_enau").getStore();
                                                                                        var _data = _store.data.items[0].data;
                                                                                        var record = [];
                                                                                        colIndex = (colIndex+1)/2;

                                                                                        for(var i=1; i<5; i++){
                                                                                            if(colIndex !== i)
                                                                                            eval('if(_data.name'+i+' !== ""){ record.push(_data.val'+i+'); }');
                                                                                        }

                                                                                        var n_record = {};
                                                                                        for(var l=0; l<4; l++){
                                                                                            if(record[l]){
                                                                                                eval('n_record.name'+(l+1)+' = record[l].toUpperCase();');
                                                                                                eval('n_record.val'+(l+1)+' = record[l];');
                                                                                                Ext.getCmp("is_n"+(l+1)).show();
                                                                                                Ext.getCmp("is_del"+(l+1)).show();
                                                                                            }else{
                                                                                                Ext.getCmp("is_n"+(l+1)).hide();
                                                                                                Ext.getCmp("is_del"+(l+1)).hide();
                                                                                            }
                                                                                        }

                                                                                        if(n_record.name4){ Ext.getCmp("grid_enau").setWidth(560); }
                                                                                        else if(n_record.name3){ Ext.getCmp("grid_enau").setWidth(420); }
                                                                                        else if(n_record.name2){ Ext.getCmp("grid_enau").setWidth(280); }
                                                                                        else if(n_record.name1){ Ext.getCmp("grid_enau").setWidth(140); }

                                                                                        _store.loadData([n_record]);

                                                                                        if(!n_record.name1){
                                                                                            Ext.getCmp("con_enau_obj").hide();
                                                                                        }
                                                                                    },
                                                                                    iconCls: 'icr_del'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn',
                                                                            hidden: true,
                                                                            id: 'is_n4',
                                                                            dataIndex: 'name4',
                                                                            text: 'String',
                                                                            flex: 1
                                                                        },
                                                                        {
                                                                            xtype: 'actioncolumn',
                                                                            hidden: true,
                                                                            id: 'is_del4',
                                                                            width: 20,
                                                                            align: 'center',
                                                                            items: [
                                                                                {
                                                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                                        var _store = Ext.getCmp("grid_enau").getStore();
                                                                                        var _data = _store.data.items[0].data;
                                                                                        var record = [];
                                                                                        colIndex = (colIndex+1)/2;

                                                                                        for(var i=1; i<5; i++){
                                                                                            if(colIndex !== i)
                                                                                            eval('if(_data.name'+i+' !== ""){ record.push(_data.val'+i+'); }');
                                                                                        }

                                                                                        var n_record = {};
                                                                                        for(var l=0; l<4; l++){
                                                                                            if(record[l]){
                                                                                                eval('n_record.name'+(l+1)+' = record[l].toUpperCase();');
                                                                                                eval('n_record.val'+(l+1)+' = record[l];');
                                                                                                Ext.getCmp("is_n"+(l+1)).show();
                                                                                                Ext.getCmp("is_del"+(l+1)).show();
                                                                                            }else{
                                                                                                Ext.getCmp("is_n"+(l+1)).hide();
                                                                                                Ext.getCmp("is_del"+(l+1)).hide();
                                                                                            }
                                                                                        }

                                                                                        if(n_record.name4){ Ext.getCmp("grid_enau").setWidth(560); }
                                                                                        else if(n_record.name3){ Ext.getCmp("grid_enau").setWidth(420); }
                                                                                        else if(n_record.name2){ Ext.getCmp("grid_enau").setWidth(280); }
                                                                                        else if(n_record.name1){ Ext.getCmp("grid_enau").setWidth(140); }

                                                                                        _store.loadData([n_record]);

                                                                                        if(!n_record.name1){
                                                                                            Ext.getCmp("con_enau_obj").hide();
                                                                                        }
                                                                                    },
                                                                                    iconCls: 'icr_del'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'isa_group',
                                                            labelSeparator: ' ',
                                                            labelWidth: 170,
                                                            value: 'modp1024',
                                                            editable: false,
                                                            displayField: 'name',
                                                            forceSelection: true,
                                                            queryMode: 'local',
                                                            valueField: 'val',
                                                            bind: {
                                                                fieldLabel: '{key_group}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            layout: 'table',
                                                            items: [
                                                                {
                                                                    xtype: 'combobox',
                                                                    id: 'ips_local',
                                                                    labelSeparator: ' ',
                                                                    labelWidth: 170,
                                                                    value: 'default',
                                                                    editable: false,
                                                                    displayField: 'name',
                                                                    store: 'store_ipsec_idtype',
                                                                    valueField: 'val',
                                                                    bind: {
                                                                        fieldLabel: '{local_id_type}'
                                                                    },
                                                                    listeners: {
                                                                        change: 'onIps_localChange'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        if(!CheckNotNull(value) || value === true){ return true; }
                                                                        var local = Ext.getCmp("ips_local").getValue();

                                                                        if(local === "fqdn"){
                                                                            if(!ValidDomain(value,1)){ return get_msg('err_form'); }
                                                                        }else if(local === "user"){
                                                                            if(!ValidEmail(value)){ return get_msg('err_form'); }
                                                                        }else if(local === "key"){
                                                                            if(!Validhexa16(value)){ return get_msg('err_form'); }
                                                                        }

                                                                        return true;
                                                                    },
                                                                    disabled: true,
                                                                    id: 'local_text',
                                                                    padding: '0 0 0 10',
                                                                    msgTarget: 'none',
                                                                    listeners: {
                                                                        errorchange: 'onLocal_textErrorChange',
                                                                        blur: 'onLocal_textBlur'
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
                                                            xtype: 'combobox',
                                                            id: 'ips_remote',
                                                            labelSeparator: ' ',
                                                            labelWidth: 170,
                                                            value: 'default',
                                                            editable: false,
                                                            displayField: 'name',
                                                            store: 'store_ipsec_idtype',
                                                            valueField: 'val',
                                                            bind: {
                                                                fieldLabel: '{remote_id_type}'
                                                            },
                                                            listeners: {
                                                                change: 'onIps_remoteChange'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(!CheckNotNull(value) || value === true){ return true; }
                                                                var local = Ext.getCmp("ips_remote").getValue();

                                                                if(local === "fqdn"){
                                                                    if(!ValidDomain(value,1)){ return get_msg('err_form'); }
                                                                }else if(local === "user"){
                                                                    if(!ValidEmail(value)){ return get_msg('err_form'); }
                                                                }else if(local === "key"){
                                                                    if(!Validhexa16(value)){ return get_msg('err_form'); }
                                                                }

                                                                return true;
                                                            },
                                                            disabled: true,
                                                            id: 'remote_text',
                                                            padding: '0 0 0 10',
                                                            msgTarget: 'none',
                                                            listeners: {
                                                                errorchange: 'onRemote_textErrorChange',
                                                                blur: 'onRemote_textBlur'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'table',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(value === true){ return true; }
                                                                value = removeComma(value);
                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                if(!LengthCheck(value, 1800, 86400)){ return ValidLimit(1800, '86,400'); }
                                                                var _ips = removeComma(Ext.getCmp("ips_lifetime").getValue());

                                                                if(CheckNotNull(_ips)){
                                                                    if(Number(_ips) >= Number(value)){
                                                                        return get_msg('err_than_ipsec');
                                                                    }
                                                                }

                                                                return true;
                                                            },
                                                            cls: [
                                                                'inp_unit',
                                                                'lb_req'
                                                            ],
                                                            id: 'isa_lifetime',
                                                            afterBodyEl: [
                                                                '<div class="inp_after">{[__zen("sec")]}</div>'
                                                            ],
                                                            labelSeparator: ' ',
                                                            labelWidth: 170,
                                                            msgTarget: 'none',
                                                            value: '28,800',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9]/,
                                                            maxLength: 6,
                                                            bind: {
                                                                fieldLabel: '{expiration_date}'
                                                            },
                                                            listeners: {
                                                                focus: 'onIsa_lifetimeFocus',
                                                                blur: 'onIsa_lifetimeBlur',
                                                                keydown: 'onIsa_lifetimeKeydown',
                                                                change: 'onIsa_lifetimeChange',
                                                                errorchange: 'onIsa_lifetimeErrorChange'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: 'l_isa_lifetime',
                                                            margin: '0 0 0 5',
                                                            text: '[08:00:00]'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ],
                                    listeners: {
                                        afterrender: 'onFieldsetAfterRender'
                                    }
                                },
                                {
                                    xtype: 'fieldset',
                                    toggleOnTitleClick: false,
                                    items: [
                                        {
                                            xtype: 'container',
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
                                                            cls: 'x-field x-form-item-label x-form-item-label-default',
                                                            width: 185,
                                                            bind: {
                                                                text: '{mode}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'segmentedbutton',
                                                            cls: 'zen_seg',
                                                            id: 'ips_mode',
                                                            items: [
                                                                {
                                                                    enableToggle: true,
                                                                    pressed: true,
                                                                    text: 'Tunnel',
                                                                    value: 'tunnel'
                                                                },
                                                                {
                                                                    text: 'Transport',
                                                                    value: 'transport'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    margin: '5 0 0 0',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            cls: 'x-field x-form-item-label x-form-item-label-default',
                                                            width: 185,
                                                            bind: {
                                                                text: '{pw_protocol}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'segmentedbutton',
                                                            cls: 'zen_seg',
                                                            id: 'ips_protocol',
                                                            items: [
                                                                {
                                                                    enableToggle: true,
                                                                    pressed: true,
                                                                    text: 'ESP',
                                                                    value: 'esp'
                                                                },
                                                                {
                                                                    text: 'AH',
                                                                    value: 'ah'
                                                                }
                                                            ],
                                                            listeners: {
                                                                toggle: 'onIps_protocolToggle'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    margin: '5 0 0 180',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            cls: 'btn_b',
                                                            id: 'b_enau',
                                                            margin: '0 0 0 5',
                                                            iconCls: 'icb_add',
                                                            bind: {
                                                                text: '{ipsec_info1}'
                                                            },
                                                            listeners: {
                                                                click: 'onButtonClick2'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    id: 'con_ips_enau',
                                                    margin: '5 0 0 0',
                                                    layout: 'table',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            cls: 'lb_req',
                                                            id: 'ips_encpt',
                                                            width: 325,
                                                            labelSeparator: ' ',
                                                            labelWidth: 170,
                                                            value: 'aes128',
                                                            editable: false,
                                                            displayField: 'name',
                                                            forceSelection: true,
                                                            queryMode: 'local',
                                                            store: 'store_ipsec_encpt',
                                                            valueField: 'val',
                                                            bind: {
                                                                fieldLabel: '{algorithm}'
                                                            },
                                                            listeners: {
                                                                change: 'onIps_encptChange'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: 'ips_encpt_text',
                                                            padding: '0 0 0 5',
                                                            enforceMaxLength: true,
                                                            maxLength: 7,
                                                            listeners: {
                                                                afterrender: 'onIps_encpt_textAfterRender'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: 'ips_encpt_l',
                                                            margin: '3 0 0 20',
                                                            style: 'padding:0',
                                                            text: '-'
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'ips_auth',
                                                            width: 145,
                                                            labelSeparator: ' ',
                                                            labelWidth: 170,
                                                            value: 'sha1',
                                                            editable: false,
                                                            displayField: 'name',
                                                            forceSelection: true,
                                                            queryMode: 'local',
                                                            store: 'store_ipsec_auth',
                                                            valueField: 'val'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            cls: 'btn_b',
                                                            margin: '-2 0 0 15',
                                                            iconCls: 'icb_add',
                                                            listeners: {
                                                                click: 'onButtonClick4'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    id: 'con_ips_enau_obj',
                                                    margin: '0 0 5 185',
                                                    items: [
                                                        {
                                                            xtype: 'gridpanel',
                                                            id: 'grid_ips_enau',
                                                            width: 140,
                                                            hideHeaders: true,
                                                            store: 'store_ipsec_enau_obj',
                                                            columns: [
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    id: 'ips_n1',
                                                                    dataIndex: 'name1',
                                                                    text: 'String',
                                                                    flex: 1
                                                                },
                                                                {
                                                                    xtype: 'actioncolumn',
                                                                    id: 'ips_del1',
                                                                    width: 20,
                                                                    align: 'center',
                                                                    items: [
                                                                        {
                                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                                var _store = Ext.getCmp("grid_ips_enau").getStore();
                                                                                var _data = _store.data.items[0].data;
                                                                                var record = [];
                                                                                colIndex = (colIndex+1)/2;

                                                                                for(var i=1; i<5; i++){
                                                                                    if(colIndex !== i)
                                                                                    eval('if(_data.name'+i+' !== ""){ record.push(_data.val'+i+'); }');
                                                                                }

                                                                                var n_record = {};
                                                                                for(var l=0; l<4; l++){
                                                                                    if(record[l]){
                                                                                        eval('n_record.name'+(l+1)+' = record[l].toUpperCase();');
                                                                                        eval('n_record.val'+(l+1)+' = record[l];');
                                                                                        Ext.getCmp("ips_n"+(l+1)).show();
                                                                                        Ext.getCmp("ips_del"+(l+1)).show();
                                                                                    }else{
                                                                                        Ext.getCmp("ips_n"+(l+1)).hide();
                                                                                        Ext.getCmp("ips_del"+(l+1)).hide();
                                                                                    }
                                                                                }

                                                                                if(n_record.name4){ Ext.getCmp("grid_ips_enau").setWidth(560); }
                                                                                else if(n_record.name3){ Ext.getCmp("grid_ips_enau").setWidth(420); }
                                                                                else if(n_record.name2){ Ext.getCmp("grid_ips_enau").setWidth(280); }
                                                                                else if(n_record.name1){ Ext.getCmp("grid_ips_enau").setWidth(140); }

                                                                                _store.loadData([n_record]);

                                                                                if(!n_record.name1){
                                                                                    Ext.getCmp("con_ips_enau_obj").hide();
                                                                                }
                                                                            },
                                                                            iconCls: 'icr_del'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    hidden: true,
                                                                    id: 'ips_n2',
                                                                    dataIndex: 'name2',
                                                                    text: 'String',
                                                                    flex: 1
                                                                },
                                                                {
                                                                    xtype: 'actioncolumn',
                                                                    hidden: true,
                                                                    id: 'ips_del2',
                                                                    width: 20,
                                                                    align: 'center',
                                                                    items: [
                                                                        {
                                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                                var _store = Ext.getCmp("grid_ips_enau").getStore();
                                                                                var _data = _store.data.items[0].data;
                                                                                var record = [];
                                                                                colIndex = (colIndex+1)/2;

                                                                                for(var i=1; i<5; i++){
                                                                                    if(colIndex !== i)
                                                                                    eval('if(_data.name'+i+' !== ""){ record.push(_data.val'+i+'); }');
                                                                                }

                                                                                var n_record = {};
                                                                                for(var l=0; l<4; l++){
                                                                                    if(record[l]){
                                                                                        eval('n_record.name'+(l+1)+' = record[l].toUpperCase();');
                                                                                        eval('n_record.val'+(l+1)+' = record[l];');
                                                                                        Ext.getCmp("ips_n"+(l+1)).show();
                                                                                        Ext.getCmp("ips_del"+(l+1)).show();
                                                                                    }else{
                                                                                        Ext.getCmp("ips_n"+(l+1)).hide();
                                                                                        Ext.getCmp("ips_del"+(l+1)).hide();
                                                                                    }
                                                                                }

                                                                                if(n_record.name4){ Ext.getCmp("grid_ips_enau").setWidth(560); }
                                                                                else if(n_record.name3){ Ext.getCmp("grid_ips_enau").setWidth(420); }
                                                                                else if(n_record.name2){ Ext.getCmp("grid_ips_enau").setWidth(280); }
                                                                                else if(n_record.name1){ Ext.getCmp("grid_ips_enau").setWidth(140); }

                                                                                _store.loadData([n_record]);

                                                                                if(!n_record.name1){
                                                                                    Ext.getCmp("con_ips_enau_obj").hide();
                                                                                }
                                                                            },
                                                                            iconCls: 'icr_del'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    hidden: true,
                                                                    id: 'ips_n3',
                                                                    dataIndex: 'name3',
                                                                    text: 'String',
                                                                    flex: 1
                                                                },
                                                                {
                                                                    xtype: 'actioncolumn',
                                                                    hidden: true,
                                                                    id: 'ips_del3',
                                                                    width: 20,
                                                                    align: 'center',
                                                                    items: [
                                                                        {
                                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                                var _store = Ext.getCmp("grid_ips_enau").getStore();
                                                                                var _data = _store.data.items[0].data;
                                                                                var record = [];
                                                                                colIndex = (colIndex+1)/2;

                                                                                for(var i=1; i<5; i++){
                                                                                    if(colIndex !== i)
                                                                                    eval('if(_data.name'+i+' !== ""){ record.push(_data.val'+i+'); }');
                                                                                }

                                                                                var n_record = {};
                                                                                for(var l=0; l<4; l++){
                                                                                    if(record[l]){
                                                                                        eval('n_record.name'+(l+1)+' = record[l].toUpperCase();');
                                                                                        eval('n_record.val'+(l+1)+' = record[l];');
                                                                                        Ext.getCmp("ips_n"+(l+1)).show();
                                                                                        Ext.getCmp("ips_del"+(l+1)).show();
                                                                                    }else{
                                                                                        Ext.getCmp("ips_n"+(l+1)).hide();
                                                                                        Ext.getCmp("ips_del"+(l+1)).hide();
                                                                                    }
                                                                                }

                                                                                if(n_record.name4){ Ext.getCmp("grid_ips_enau").setWidth(560); }
                                                                                else if(n_record.name3){ Ext.getCmp("grid_ips_enau").setWidth(420); }
                                                                                else if(n_record.name2){ Ext.getCmp("grid_ips_enau").setWidth(280); }
                                                                                else if(n_record.name1){ Ext.getCmp("grid_ips_enau").setWidth(140); }

                                                                                _store.loadData([n_record]);

                                                                                if(!n_record.name1){
                                                                                    Ext.getCmp("con_ips_enau_obj").hide();
                                                                                }
                                                                            },
                                                                            iconCls: 'icr_del'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    hidden: true,
                                                                    id: 'ips_n4',
                                                                    dataIndex: 'name4',
                                                                    text: 'String',
                                                                    flex: 1
                                                                },
                                                                {
                                                                    xtype: 'actioncolumn',
                                                                    hidden: true,
                                                                    id: 'ips_del4',
                                                                    width: 20,
                                                                    align: 'center',
                                                                    items: [
                                                                        {
                                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                                var _store = Ext.getCmp("grid_ips_enau").getStore();
                                                                                var _data = _store.data.items[0].data;
                                                                                var record = [];
                                                                                colIndex = (colIndex+1)/2;

                                                                                for(var i=1; i<5; i++){
                                                                                    if(colIndex !== i)
                                                                                    eval('if(_data.name'+i+' !== ""){ record.push(_data.val'+i+'); }');
                                                                                }

                                                                                var n_record = {};
                                                                                for(var l=0; l<4; l++){
                                                                                    if(record[l]){
                                                                                        eval('n_record.name'+(l+1)+' = record[l].toUpperCase();');
                                                                                        eval('n_record.val'+(l+1)+' = record[l];');
                                                                                        Ext.getCmp("ips_n"+(l+1)).show();
                                                                                        Ext.getCmp("ips_del"+(l+1)).show();
                                                                                    }else{
                                                                                        Ext.getCmp("ips_n"+(l+1)).hide();
                                                                                        Ext.getCmp("ips_del"+(l+1)).hide();
                                                                                    }
                                                                                }

                                                                                if(n_record.name4){ Ext.getCmp("grid_ips_enau").setWidth(560); }
                                                                                else if(n_record.name3){ Ext.getCmp("grid_ips_enau").setWidth(420); }
                                                                                else if(n_record.name2){ Ext.getCmp("grid_ips_enau").setWidth(280); }
                                                                                else if(n_record.name1){ Ext.getCmp("grid_ips_enau").setWidth(140); }

                                                                                _store.loadData([n_record]);

                                                                                if(!n_record.name1){
                                                                                    Ext.getCmp("con_ips_enau_obj").hide();
                                                                                }
                                                                            },
                                                                            iconCls: 'icr_del'
                                                                        }
                                                                    ]
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
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(value === true){ return true; }
                                                                value = removeComma(value);
                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                if(!LengthCheck(value, 600, 28800)){ return ValidLimit(600, '28,600'); }
                                                                var _isa = removeComma(Ext.getCmp("isa_lifetime").getValue());

                                                                if(CheckNotNull(_isa)){
                                                                    if(Number(value) >= Number(_isa)){
                                                                        return get_msg('err_than_ipsec');
                                                                    }
                                                                }

                                                                return true;
                                                            },
                                                            cls: [
                                                                'inp_unit',
                                                                'lb_req'
                                                            ],
                                                            id: 'ips_lifetime',
                                                            afterBodyEl: [
                                                                '<div class="inp_after">{[__zen("sec")]}</div>'
                                                            ],
                                                            labelSeparator: ' ',
                                                            labelWidth: 170,
                                                            msgTarget: 'none',
                                                            value: '3,600',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9]/,
                                                            maxLength: 6,
                                                            bind: {
                                                                fieldLabel: '{expiration_date}'
                                                            },
                                                            listeners: {
                                                                focus: 'onIps_lifetimeFocus',
                                                                blur: 'onIps_lifetimeBlur',
                                                                keydown: 'onIps_lifetimeKeydown',
                                                                change: 'onIps_lifetimeChange',
                                                                errorchange: 'onIps_lifetimeErrorChange'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: 'l_ips_lifetime',
                                                            margin: '0 0 0 5',
                                                            text: '[01:00:00]'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    id: 'ips_pfsgroup',
                                                    labelSeparator: ' ',
                                                    labelWidth: 170,
                                                    value: 'none',
                                                    editable: false,
                                                    displayField: 'name',
                                                    forceSelection: true,
                                                    queryMode: 'local',
                                                    store: 'store_ipsec_pfs',
                                                    valueField: 'val',
                                                    bind: {
                                                        fieldLabel: '{pfs}'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'reply_prot',
                                                    labelSeparator: ' ',
                                                    labelWidth: 170,
                                                    boxLabel: '',
                                                    bind: {
                                                        fieldLabel: '{replay_protection}'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'isa_force',
                                                    labelSeparator: ' ',
                                                    labelWidth: 170,
                                                    boxLabel: 'ipsec_info2',
                                                    bind: {
                                                        fieldLabel: '{udp_force}'
                                                    },
                                                    listeners: {
                                                        afterrender: 'onIsa_forceAfterRender'
                                                    }
                                                }
                                            ]
                                        }
                                    ],
                                    listeners: {
                                        afterrender: 'onFieldsetAfterRender1'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            flex: 1,
                                            toggleOnTitleClick: false,
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    disabled: true,
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            margin: '0 0 5 0',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    cls: 'x-field x-form-item-label x-form-item-label-default',
                                                                    width: 185,
                                                                    bind: {
                                                                        text: '{xauth_server}'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'segmentedbutton',
                                                                    cls: 'zen_seg',
                                                                    id: 'xauth_serv',
                                                                    items: [
                                                                        {
                                                                            enableToggle: true,
                                                                            pressed: true,
                                                                            text: 'Server',
                                                                            value: 'server'
                                                                        },
                                                                        {
                                                                            text: 'Client',
                                                                            value: 'client'
                                                                        }
                                                                    ],
                                                                    listeners: {
                                                                        toggle: 'onXauth_servToggle'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            id: 'con_xauth_server',
                                                            items: [
                                                                {
                                                                    xtype: 'container',
                                                                    margin: '0 0 5 0',
                                                                    layout: 'table',
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            cls: 'x-field x-form-item-label x-form-item-label-default',
                                                                            width: 185,
                                                                            bind: {
                                                                                text: '{auth_method}'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'segmentedbutton',
                                                                            cls: 'zen_seg',
                                                                            id: 'xauth_certi',
                                                                            margin: '0 5 0 0',
                                                                            items: [
                                                                                {
                                                                                    enableToggle: true,
                                                                                    pressed: true,
                                                                                    text: 'Local',
                                                                                    value: 'local'
                                                                                },
                                                                                {
                                                                                    id: 'xauth_remote',
                                                                                    text: 'Remote Radius',
                                                                                    value: 'remote'
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'image',
                                                                            height: 16,
                                                                            id: 'stat_img',
                                                                            minHeight: 16,
                                                                            width: 16
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            hidden: true,
                                                            id: 'con_xauth_client',
                                                            items: [
                                                                {
                                                                    xtype: 'container',
                                                                    margin: '0 0 5 0',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            cls: 'x-field x-form-item-label x-form-item-label-default',
                                                                            width: 185,
                                                                            bind: {
                                                                                text: '{virtual_ip}'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'segmentedbutton',
                                                                            cls: 'zen_seg',
                                                                            id: 'client_ip',
                                                                            items: [
                                                                                {
                                                                                    enableToggle: true,
                                                                                    pressed: true,
                                                                                    value: 'use',
                                                                                    bind: {
                                                                                        text: '{toggle_on}'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    value: 'unused',
                                                                                    bind: {
                                                                                        text: '{toggle_off}'
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
                                                                            xtype: 'textfield',
                                                                            validator: function(value) {
                                                                                if(!CheckNotNull(value) || value === true){ return true; }

                                                                                var v = (/^[A-Za-z0-9_]*$/).test(value)? true:false;
                                                                                if(v === false){ return get_msg('err_form'); }

                                                                                return true;
                                                                            },
                                                                            id: 'client_id',
                                                                            labelSeparator: ' ',
                                                                            labelWidth: 170,
                                                                            msgTarget: 'none',
                                                                            enforceMaxLength: true,
                                                                            maxLength: 32,
                                                                            bind: {
                                                                                fieldLabel: '{id}'
                                                                            },
                                                                            listeners: {
                                                                                errorchange: 'onTextfieldErrorChange2',
                                                                                focus: 'onClient_idFocus',
                                                                                blur: 'onClient_idBlur'
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'container',
                                                                    items: [
                                                                        {
                                                                            xtype: 'textfield',
                                                                            validator: function(value) {
                                                                                if(!CheckNotNull(value) || value === true){ return true; }
                                                                                if(value.length < 4){ return ValidMinMax(__zen('pwd'),4,16); }
                                                                                var v = (/^[A-Za-z0-9_~!@\#$%<>^&*\()\-=+_\’]*$/).test(value)? true:false;
                                                                                if(v === false){ return get_msg('err_form'); }

                                                                                return true;
                                                                            },
                                                                            id: 'client_pw',
                                                                            labelSeparator: ' ',
                                                                            labelWidth: 170,
                                                                            msgTarget: 'none',
                                                                            inputType: 'password',
                                                                            enforceMaxLength: true,
                                                                            maxLength: 16,
                                                                            bind: {
                                                                                fieldLabel: '{pwd}'
                                                                            },
                                                                            listeners: {
                                                                                errorchange: 'onTextfieldErrorChange11',
                                                                                focus: 'onClient_pwFocus',
                                                                                blur: 'onClient_pwBlur'
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                render: 'onFieldsetRender'
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            disabled: true,
                                            id: 'st_ipsec_fieldset_ip_pool',
                                            items: [
                                                {
                                                    xtype: 'fieldset',
                                                    margin: '0 0 10 10',
                                                    listeners: {
                                                        render: 'onFieldsetRender1'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            disabled: true,
                                                            id: 'st_ipsec_field_con',
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        if(value === true){ return true; }
                                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                        if(!validMask(value,'v4')){ return get_msg('err_form'); }

                                                                        return true;
                                                                    },
                                                                    cls: 'lb_req',
                                                                    id: 'st_ipsec_ip_pool',
                                                                    labelSeparator: ' ',
                                                                    labelWidth: 170,
                                                                    msgTarget: 'none',
                                                                    listeners: {
                                                                        beforerender: 'onTextfieldBeforeRender',
                                                                        errorchange: 'onTextfieldErrorChange1',
                                                                        focus: 'onTextfieldFocus',
                                                                        blur: 'onTextfieldBlur'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        if(!CheckNotNull(value) || value === true){ return true; }
                                                                        var _val = value.split(',');
                                                                        var _state = true;

                                                                        for(var i=0; i<_val.length; i++){
                                                                            if(!ValidIPAddress(_val[i])){ _state = false; break; }
                                                                        }
                                                                        if(_state === false){
                                                                            return get_msg('err_form');
                                                                        }

                                                                        return true;
                                                                    },
                                                                    id: 'st_ipsec_dns',
                                                                    labelSeparator: ' ',
                                                                    labelWidth: 170,
                                                                    listeners: {
                                                                        beforerender: 'onSt_ipsec_dnsBeforeRender',
                                                                        errorchange: 'onSt_ipsec_dnsErrorChange',
                                                                        focus: 'onSt_ipsec_dnsFocus',
                                                                        blur: 'onSt_ipsec_dnsBlur'
                                                                    }
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

    onTabClick1: function(button, e, eOpts) {
        Ext.getCmp("win_ipsec").tab = 1;
    },

    onTextfieldErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(code === 32){
            e.stopEvent();
        }
    },

    onNameBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onSegmentedbuttonToggle: function(segmentedbutton, button, isPressed, eOpts) {
        Ext.getCmp("sec_pro1").reset();
        Ext.getCmp("sec_pro2").reset();
        Ext.getCmp("sec_port1").reset();
        Ext.getCmp("sec_port2").reset();

        Ext.getCmp("net_pro1").reset();
        Ext.getCmp("net_pro2").reset();
        Ext.getCmp("net_port1").reset();
        Ext.getCmp("net_port2").reset();

        if(segmentedbutton.getValue() === 'ikev1'){
            Ext.getCmp("sec_pro2").hide();
            Ext.getCmp("sec_port2").hide();
            Ext.getCmp("net_pro2").hide();
            Ext.getCmp("net_port2").hide();
            Ext.getCmp("con_mode").enable();
        }else{
            Ext.getCmp("sec_pro2").show();
            Ext.getCmp("sec_port2").show();
            Ext.getCmp("net_pro2").show();
            Ext.getCmp("net_port2").show();
            Ext.getCmp("con_mode").disable();
        }
    },

    onSegmentedbuttonToggle2: function(segmentedbutton, button, isPressed, eOpts) {
        prt_errMsg(null,null);

        if(segmentedbutton.getValue() === "psk"){
            Ext.getCmp("con_cert").hide();
            Ext.getCmp("isa_psk").show();
        }else{
            Ext.getCmp("con_cert").show();
            Ext.getCmp("isa_psk").hide();
        }
    },

    onIsa_pskErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onIsa_pskKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(code === 32){
            e.stopEvent();
        }
    },

    onIsa_pskBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onIsa_pskFocus: function(component, event, eOpts) {
        component.fieldInfo = '4~31'+__zen('charact');
        setTipFocus(this,component);
    },

    onIsa_cert_selChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp("help_cert").show();
        }else{
            Ext.getCmp("help_cert").hide();
        }
    },

    onImageRender2: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var _val = Ext.getCmp("isa_cert_sel").getValue();

            if(_val === null){ return false; }

            var _store = Ext.data.StoreManager.lookup("store_isakmp_cert");

            var _item = _store.findRecord('cert_name',_val);

            var win = Ext.create('NFW2.view.win_isakmp_cert',{
                _data: _item.data
            });
            win.show();

        }, component);
    },

    onIpdomainErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onIpdomainBlur: function(component, event, eOpts) {
        component.validateValue(true);

        var _me = Ext.getCmp("NFW2_ipsec_security_securityConf");
        var val = component.getValue();
        var _record = '';

        if(val.indexOf("::") !== -1){//ipv6
            _record = _me.mem_v6;
        }else{
            if(ValidIPAddress(val)){//ipv4
                _record = _me.mem_v4;
            }else{//domain
                _record = _me.mem_v4.concat(_me.mem_v6);
            }
        }

        var ips_val = Ext.getCmp("ips_sechost").getValue();
        Ext.getCmp("ips_sechost").getStore().loadData(_record);
        if(Ext.getCmp("ips_sechost").getStore().data.items[0].data.cid!=='eth0'){
            Ext.getCmp("ips_sechost").getStore().insert(0,{'name':'eth0','cid':'eth0'});
        }

        if(Ext.getCmp("ips_sechost").getStore().find('cid',ips_val)===-1){
            Ext.getCmp("ips_sechost").setValue('eth0');
        }else{
            Ext.getCmp("ips_sechost").setValue(ips_val);
        }

        var hub_val = Ext.getCmp("hub_net").getValue();
        Ext.getCmp("hub_net").getStore().loadData(_record);
        if(Ext.getCmp("hub_net").getStore().data.items[0].data.cid!=='ANY'){
            Ext.getCmp("hub_net").getStore().insert(0,{'name':'ANY','cid':'ANY'});
        }

        if(Ext.getCmp("hub_net").getStore().find('cid',hub_val)===-1){
            Ext.getCmp("hub_net").setValue('ANY');
        }else{
            Ext.getCmp("hub_net").setValue(hub_val);
        }
    },

    onIps_sechostChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === ""){
            field.setValue(oldValue);
        }else if(newValue === "select"){
            field.reset();
        }
    },

    onIps_sechostRender: function(component, eOpts) {
        component.emptyText = __zen('select');
        component.applyEmptyText();
    },

    onSec_pro1Focus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'0 ~ 255';
        setTipFocus(this,component);
    },

    onSec_pro1Blur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onSec_pro1ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onSec_pro1Keydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onSec_pro2AfterRender: function(component, eOpts) {
        component.hide();
    },

    onSec_pro2ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onSec_pro2Focus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'0 ~ 255';
        setTipFocus(this,component);
    },

    onSec_pro2Blur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onSec_pro2Keydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onSec_port1ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onSec_port1Keydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onSec_port1Focus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'0 ~ 65535';
        setTipFocus(this,component);
    },

    onSec_port1Blur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onSec_port2AfterRender: function(component, eOpts) {
        component.hide();
    },

    onSec_port2ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onSec_port2Keydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onSec_port2Focus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'0 ~ 65535';
        setTipFocus(this,component);
    },

    onSec_port2Blur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onHub_netChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === ""){
            field.setValue(oldValue);
        }else if(newValue === "select"){
            field.reset();
        }
    },

    onHub_netRender: function(component, eOpts) {
        component.emptyText = __zen('select');
        component.applyEmptyText();
    },

    onNet_pro1ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onNet_pro1Keydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onNet_pro1Focus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'0 ~ 255';
        setTipFocus(this,component);
    },

    onNet_pro1Blur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onNet_pro2AfterRender: function(component, eOpts) {
        component.hide();
    },

    onNet_pro2ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onNet_pro2Keydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onNet_pro2Focus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'0 ~ 255';
        setTipFocus(this,component);
    },

    onNet_pro2Blur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onNet_port1ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onNet_port1Keydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onNet_port1Focus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'0 ~ 65535';
        setTipFocus(this,component);
    },

    onNet_port1Blur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onNet_port2AfterRender: function(component, eOpts) {
        component.hide();
    },

    onNet_port2Focus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'0 ~ 65535';
        setTipFocus(this,component);
    },

    onNet_port2Blur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onNet_port2ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onNet_port2Keydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onTabClick2: function(button, e, eOpts) {
        Ext.getCmp("win_ipsec").tab = 2;

        this.setPosition(this.x,50);
    },

    onIsa_actionToggle: function(segmentedbutton, button, isPressed, eOpts) {
        if(button.value === 'initiator'){
            Ext.getCmp("chk_dpd").setValue(true);
            Ext.getCmp("st_ipsec_fieldset_ip_pool").disable();
            Ext.getCmp("st_ipsec_chk_ip_pool").state = false;
            Ext.getCmp("st_ipsec_chk_ip_pool").moveHandle(false);
            Ext.getCmp("st_ipsec_field_con").disable();
            Ext.getCmp("st_ipsec_con_hub_net").enable();
        }else{
            Ext.getCmp("chk_dpd").setValue(false);
            Ext.getCmp("st_ipsec_fieldset_ip_pool").enable();
        }
    },

    onCheckboxfieldChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp("con_dpd").enable();
        }else{
            Ext.getCmp("con_dpd").disable();
        }
    },

    onIsa_dpd_secErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onIsa_dpd_secKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onIsa_dpd_secFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onIsa_dpd_secBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onIsa_dpd_cntErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onIsa_dpd_cntKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onIsa_dpd_cntFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onIsa_dpd_cntBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onButtonClick3: function(button, e, eOpts) {
        var encpt = Ext.getCmp("isa_encpt").getValue();
        var auth = Ext.getCmp("isa_auth").getValue();

        if(encpt === null){ Ext.Msg.alert(__weguardia,get_msg('err_null')); Ext.getCmp("isa_encpt").focus(); return false; }
        if(auth === null){ Ext.Msg.alert(__weguardia,get_msg('err_null')); Ext.getCmp("isa_auth").focus(); return false; }

        Ext.getCmp("con_enau_obj").show();

        var grid_enau = Ext.getCmp("grid_enau").getStore().data;

        if(Ext.getCmp("is_n4").hidden === false){
            Ext.Msg.alert(__weguardia,ValidMaxCnt('4'));
            return false;
        }

        var obj = grid_enau.items[0].data;

        var record = [];

        for(var i=1; i<5; i++){
            eval('if(obj.name'+i+' !== undefined){ record.push(obj.val'+i+'); }');
        }

        var n_record = {};
        var stat = '';
        for(var l=0; l<record.length; l++){

            if(record[l] === encpt+'-'+auth){ stat = 'on'; break; }

            eval('n_record.name'+(l+1)+' = record[l].toUpperCase();');
            eval('n_record.val'+(l+1)+' = record[l];');
            Ext.getCmp("is_n"+(l+1)).show();
            Ext.getCmp("is_del"+(l+1)).show();
        }

        if(stat === 'on'){
            return false;
        }

        eval('n_record.name'+(l+1)+' = "'+encpt.toUpperCase()+'-'+auth.toUpperCase()+'";');
        eval('n_record.val'+(l+1)+' = "'+encpt+'-'+auth+'";');

        var n_obj = [n_record];
        Ext.getCmp("is_n"+(l+1)).show();
        Ext.getCmp("is_del"+(l+1)).show();

        if(n_record.name4){ Ext.getCmp("grid_enau").setWidth(560); }
        else if(n_record.name3){ Ext.getCmp("grid_enau").setWidth(420); }
        else if(n_record.name2){ Ext.getCmp("grid_enau").setWidth(280); }
        else if(n_record.name1){ Ext.getCmp("grid_enau").setWidth(140); }

        Ext.getCmp("grid_enau").getStore().loadData(n_obj);
    },

    onIps_localChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === 'default' || newValue === "any"){
            Ext.getCmp("local_text").disable().reset();
        }else{
            Ext.getCmp("local_text").enable().reset();
        }
        prt_errMsg(null,null);
    },

    onLocal_textErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onLocal_textBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onIps_remoteChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === 'default' || newValue === 'any'){
            Ext.getCmp("remote_text").setDisabled(true).reset();
        }else{
            Ext.getCmp("remote_text").setDisabled(false).reset();
        }
        prt_errMsg(null,null);
    },

    onRemote_textErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onRemote_textBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onIsa_lifetimeFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1,800 ~ 86,400';
        setTipFocus(this,component);
    },

    onIsa_lifetimeBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onIsa_lifetimeKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onIsa_lifetimeChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);
        field.setValue(addComma(value));

        Ext.getCmp("l_isa_lifetime").setText('['+chg_time(value)+']');
    },

    onIsa_lifetimeErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFieldsetAfterRender: function(component, eOpts) {
        component.setTitle(__zen('isakmpsa_set'));
    },

    onIps_protocolToggle: function(segmentedbutton, button, isPressed, eOpts) {
        var b_enau = Ext.getCmp("b_enau");
        var _store = Ext.getCmp('grid_ips_enau').getStore();

        if(Ext.getCmp("ips_protocol").getValue() === "ah"){
            Ext.getCmp("ips_encpt").hide();
            Ext.getCmp("ips_encpt_text").hide();
            Ext.getCmp("ips_encpt_l").hide();
            Ext.getCmp("ips_auth").setFieldLabel(__zen('algorithm'));
            Ext.getCmp("ips_auth").addCls("lb_req").setWidth(315);
            Ext.getCmp("ips_auth").show();
            b_enau.hide();

            var record = [{'name1':'SHA1','val1':'sha1'}];
        }else{
            Ext.getCmp("ips_encpt").show();
            if(Ext.getCmp("ips_encpt").getValue()==="text"){
                Ext.getCmp("ips_encpt_text").show();
            }
            Ext.getCmp("ips_encpt_l").show();
            Ext.getCmp("ips_auth").setFieldLabel('');
            Ext.getCmp("ips_auth").removeCls("lb_req").setWidth(145);
            Ext.getCmp("ips_auth").show();
            b_enau.show();

            var record = [{'name1':'AES128-SHA1','val1':'aes128-sha1'}];
        }
        _store.loadData(record);
        for(var i=1; i<5; i++){
            if(i===1){
                Ext.getCmp("ips_n"+i).show();
                Ext.getCmp("ips_del"+i).show();
            }else{
                Ext.getCmp("ips_n"+i).hide();
                Ext.getCmp("ips_del"+i).hide();
            }
        }
        Ext.getCmp("ips_encpt").reset();
        Ext.getCmp("ips_auth").reset();
        Ext.getCmp("ips_encpt_text").reset();
        Ext.getCmp("grid_ips_enau").setWidth(140);
        Ext.getCmp("grid_ips_enau").show();
    },

    onButtonClick2: function(button, e, eOpts) {
        var isa_store = Ext.data.StoreManager.lookup("store_isakmp_enau_obj");
        var ips_store = Ext.data.StoreManager.lookup("store_ipsec_enau_obj");

        ips_store.removeAll();

        var obj = [isa_store.data.items[0].data];

        if(obj[0].name1 === ""){ return false; }
        Ext.getCmp("con_ips_enau_obj").show();

        for(var i=1; i<5; i++){
            eval('if(obj[0].name'+i+' !== undefined){ Ext.getCmp("ips_n'+i+'").show(); Ext.getCmp("ips_del'+i+'").show(); }else{ Ext.getCmp("ips_n'+i+'").hide(); Ext.getCmp("ips_del'+i+'").hide(); }');
        }
        if(obj[0].name4){ Ext.getCmp("grid_ips_enau").setWidth(560); }
        else if(obj[0].name3){ Ext.getCmp("grid_ips_enau").setWidth(420); }
        else if(obj[0].name2){ Ext.getCmp("grid_ips_enau").setWidth(280); }
        else if(obj[0].name1){ Ext.getCmp("grid_ips_enau").setWidth(140); }

        ips_store.loadData(obj);
    },

    onIps_encptChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === null){ return false; }

        var b_enau = Ext.getCmp("b_enau");
        var _store = Ext.getCmp('grid_ips_enau').getStore();

        if(Ext.getCmp("ips_protocol").getValue() === 'esp'){

            if(newValue === "text"){
                Ext.getCmp("ips_encpt_text").show();
            }else{
                Ext.getCmp("ips_encpt_text").hide();

                if(newValue === 'aes128gcm16' || newValue === 'aes192gcm16' || newValue === 'aes256gcm16'){
                    Ext.getCmp("ips_auth").disable();
                }else{
                    Ext.getCmp("ips_auth").enable();
                }

            }
        }
    },

    onIps_encpt_textAfterRender: function(component, eOpts) {
        component.hide();
    },

    onButtonClick4: function(button, e, eOpts) {
        var encpt = Ext.getCmp("ips_encpt").getValue();
        var auth = Ext.getCmp("ips_auth").getValue();

        if(encpt === null){ Ext.Msg.alert(__weguardia,get_msg('err_null')); Ext.getCmp("ips_encpt").focus(); return false; }
        if(auth === null){ Ext.Msg.alert(__weguardia,get_msg('err_null')); Ext.getCmp("ips_auth").focus(); return false; }

        var grid_enau = Ext.getCmp("grid_ips_enau").getStore().data;

        if(Ext.getCmp("ips_n4").hidden === false){
            Ext.Msg.alert(__weguardia,ValidMaxCnt('4'));
            return false;
        }
        if(Ext.getCmp("ips_protocol").getValue()==='esp'){
            Ext.getCmp("con_ips_enau_obj").show();

            if(encpt === "text"){

                var text = Ext.getCmp("ips_encpt_text");
                if(text.getValue() === ""){
                    prt_errMsg(get_msg('err_null'),null);
                    text.focus();
                    return false;
                }

                var a_text = ['neat','nes'];
                var n = 0;

                for(var l=0; l<a_text.length; l++){
                    if(a_text[l] === text.getValue().toLowerCase()){
                        n = 1;
                        break;
                    }
                }
                if(n === 0){
                    prt_errMsg(get_msg('err_algorism'),'fld_msg');
                    text.focus();
                    return false;
                }
                encpt = text.getValue();
            }
        }

        prt_errMsg(null,null);

        var record = [];
        if(grid_enau.items.length > 0){
            var obj = grid_enau.items[0].data;

            for(var i=1; i<5; i++){
                eval('if(obj.name'+i+' !== undefined){ record.push(obj.val'+i+'); }');
            }
        }

        var n_record = {};
        var stat = '';

        for(var l=0; l<record.length; l++){

            if(record[l] === 'aes128gcm16' || record[l] === 'aes192gcm16' || record[l] === 'aes256gcm16'){
                if(record[l] === encpt){ stat = 'on'; break; }
                var name = record[l].substring(0,9).toUpperCase();
            }else{
                if(Ext.getCmp("ips_protocol").getValue() === 'ah'){
                    if(record[l] === auth){ stat = 'on'; break; }
                }else{
                    if(record[l] === encpt+'-'+auth){ stat = 'on'; break; }
                }

                var name = record[l].toUpperCase();
            }

            eval('n_record.name'+(l+1)+' = name');
            eval('n_record.val'+(l+1)+' = record[l];');
            Ext.getCmp("ips_n"+(l+1)).show();
            Ext.getCmp("ips_del"+(l+1)).show();
        }

        if(stat === 'on'){
            return false;
        }

        if(encpt === 'aes128gcm16' || encpt === 'aes192gcm16' || encpt === 'aes256gcm16'){
            eval('n_record.name'+(l+1)+' = "'+Ext.getCmp("ips_encpt").getRawValue()+'";');
            eval('n_record.val'+(l+1)+' = "'+encpt+'";');
        }else{
            if(Ext.getCmp("ips_protocol").getValue()==='esp'){
                eval('n_record.name'+(l+1)+' = "'+encpt.toUpperCase()+'-'+auth.toUpperCase()+'";');
                eval('n_record.val'+(l+1)+' = "'+encpt+'-'+auth+'";');
            }else{
                eval('n_record.name'+(l+1)+' = "'+auth.toUpperCase()+'";');
                eval('n_record.val'+(l+1)+' = "'+auth+'";');
            }
        }

        var n_obj = [n_record];
        Ext.getCmp("ips_n"+(l+1)).show();
        Ext.getCmp("ips_del"+(l+1)).show();

        if(n_record.name4){ Ext.getCmp("grid_ips_enau").setWidth(560); }
        else if(n_record.name3){ Ext.getCmp("grid_ips_enau").setWidth(420); }
        else if(n_record.name2){ Ext.getCmp("grid_ips_enau").setWidth(280); }
        else if(n_record.name1){ Ext.getCmp("grid_ips_enau").setWidth(140); }

        Ext.getCmp("grid_ips_enau").getStore().loadData(n_obj);
        Ext.getCmp("grid_ips_enau").show();
        Ext.getCmp("con_ips_enau_obj").show();
    },

    onIps_lifetimeFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'600 ~ 28,800';
        setTipFocus(this,component);
    },

    onIps_lifetimeBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onIps_lifetimeKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onIps_lifetimeChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);
        field.setValue(addComma(value));

        Ext.getCmp("l_ips_lifetime").setText('['+chg_time(value)+']');
    },

    onIps_lifetimeErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onIsa_forceAfterRender: function(component, eOpts) {
        component.setBoxLabel(__zen('ipsec_info2'));
    },

    onFieldsetAfterRender1: function(component, eOpts) {
        component.setTitle(__zen('ipsecsa_set'));
    },

    onXauth_servToggle: function(segmentedbutton, button, isPressed, eOpts) {
        if(segmentedbutton.getValue() === 'server'){
            var stat_img = Ext.getCmp("stat_img");

            var _params = {
                type: Ext.encode('radius_check')
            };

            Ext.getCmp("con_xauth_server").show().enable();
            Ext.getCmp("con_xauth_client").hide();

            stat_img.removeCls("b_stat_green b_stat_red").addCls("b_stat_white");

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getExternalServerStatus',
                _params,
                function(response){

                    if(response){
                        stat_img.removeCls("b_stat_white b_stat_red").addCls("b_stat_green");
                    }else{
                        Ext.getCmp("xauth_remote").disable();
                        stat_img.removeCls("b_stat_green b_stat_red").addCls("b_stat_red");
                    }
                }
            );

        }else if(segmentedbutton.getValue() === 'client'){
            Ext.getCmp("con_xauth_server").hide();
            Ext.getCmp("con_xauth_client").show().enable();
        }
    },

    onTextfieldErrorChange2: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onClient_idFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('ipsec_info3');
        setTipFocus(this,component);
    },

    onClient_idBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onTextfieldErrorChange11: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onClient_pwFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('ipsec_info4');
        setTipFocus(this,component);
    },

    onClient_pwBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onFieldsetRender: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: {
                txt: __zen('toggle_on')
            },
            offText: {
                txt: __zen('toggle_off')
            },
            id:'chk_xauth',
            style:'margin-left:50px',
            resizeHandle: false,
            state: false,
            listeners: {
                change: function(el){
                    var _panel = el.up('fieldset');
                    var _state = (el.state===true)?false:true;

                    _panel.query('container')[1].setDisabled(_state);
                    if(el.state === true){

                        var _params = {
                            type: Ext.encode('radius_check')
                        };

                        request_helper.xmlrpc_call_JsonP(
                            'ftuctrl',
                            'getExternalServerStatus',
                            _params,
                            function(response){

                                var stat_img = Ext.getCmp("stat_img");
                                if(response){
                                    stat_img.removeCls("b_stat_white b_stat_red").addCls("b_stat_green");
                                }else{
                                    Ext.getCmp("xauth_remote").disable();
                                    stat_img.removeCls("b_stat_green b_stat_red").addCls("b_stat_red");
                                }
                            }
                        );
                    }
                }
            }
        });

        component.setTitle(__zen('xauth'));
        component.legend.add(tbutton);
    },

    onFieldsetRender1: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: {
                txt: __zen('toggle_on')
            },
            offText: {
                txt: __zen('toggle_off')
            },
            id:'st_ipsec_chk_ip_pool',
            style:'margin-left:50px',
            resizeHandle: false,
            state: false,
            listeners: {
                change: function(el){
                    var _panel = el.up('fieldset');
                    var _state = (el.state===true)?false:true;

                    _panel.query('container')[1].setDisabled(_state);
                    Ext.getCmp("st_ipsec_con_hub_net").setDisabled(el.state);
                }
            }
        });

        component.setTitle('IP Pool');
        component.legend.add(tbutton);
    },

    onTextfieldBeforeRender: function(component, eOpts) {
        component.setFieldLabel('IP Pool');
    },

    onTextfieldErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldFocus: function(component, event, eOpts) {
        component.fieldInfo = disp_help_ip('4p');
        setTipFocus(this,component);
    },

    onTextfieldBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onSt_ipsec_dnsBeforeRender: function(component, eOpts) {
        component.setFieldLabel('DNS');
    },

    onSt_ipsec_dnsErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onSt_ipsec_dnsFocus: function(component, event, eOpts) {
        component.fieldInfo = disp_help_ip('4s')+' '+__zen('division');
        setTipFocus(this,component);
    },

    onSt_ipsec_dnsBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        var _me = Ext.getCmp("NFW2_ipsec_security_securityConf");

        chk_zenauth(null);

        me.fieldInfo = makeZenTip();
        var data = me.record;
        me.tab = 1;

        var isa_pfs = Ext.create('Ext.data.Store',{
            data: [
                {
                    name: 'MODP768',
                    val: 'modp768'
                },
                {
                    name: 'MODP1024',
                    val: 'modp1024'
                },
                {
                    name: 'MODP1536',
                    val: 'modp1536'
                },
                {
                    name: 'MODP2048',
                    val: 'modp2048'
                },
                {
                    name: 'MODP3072',
                    val: 'modp3072'
                },
                {
                    name: 'MODP4096',
                    val: 'modp4096'
                }
            ],
            fields: ['name','val']
        });

        Ext.getCmp("isa_group").bindStore(isa_pfs);
        if(Ext.getCmp("ips_sechost").getStore().data.items[0].data.cid!=='eth0'){
            Ext.getCmp("ips_sechost").getStore().insert(0,{'name':'eth0','cid':'eth0'});
        }
        Ext.getCmp("ips_sechost").setValue('eth0');

        var t_store = Ext.create('Ext.data.Store',{
            data: _me.mem_v4.concat(_me.mem_v6),
            fields: ['name']
        });

        Ext.getCmp("hub_net").bindStore(t_store);
        if(Ext.getCmp("hub_net").getStore().data.items[0].data.cid!=='ANY'){
            Ext.getCmp("hub_net").getStore().insert(0,{'name':'ANY','cid':'ANY'});
        }
        Ext.getCmp("hub_net").setValue('ANY');

        var NFW2 = Ext.getCmp("NFW2_ipsec_security_securityConf");

        var _store_cert = Ext.data.StoreManager.lookup("store_isakmp_cert");
        if(_store_cert.data.length > 0){
            Ext.getCmp("isa_cert_sel").setValue(_store_cert.data.items[0].data.cert_name);
        }
        Ext.getCmp("tab_2").show();
        Ext.getCmp("tab_1").show();

        if(me.edit === "edit"){
            me.setTitle(__zen('ipsec_edit')+" - "+data['_num']);

            Ext.getCmp("name").setValue(data.name);
            Ext.getCmp("isa_ver").setValue(data.ver);
            if(data.ver === 'ikev1'){
                Ext.getCmp("isa_mode").setValue(data.isa_mode);
                Ext.getCmp("sec_pro1").setValue(data.ikev1_local_protocol);
                Ext.getCmp("sec_port1").setValue(data.ikev1_local_port);
                Ext.getCmp("net_pro1").setValue(data.ikev1_remote_protocol);
                Ext.getCmp("net_port1").setValue(data.ikev1_remote_port);
            }else{
                Ext.getCmp("con_mode").disable();
                Ext.getCmp("sec_pro1").setValue(data.ikev2_local_protocol_left);
                Ext.getCmp("sec_pro2").setValue(data.ikev2_local_protocol_right).show();
                Ext.getCmp("sec_port1").setValue(data.ikev2_local_port_left);
                Ext.getCmp("sec_port2").setValue(data.ikev2_local_port_right).show();
                Ext.getCmp("net_pro1").setValue(data.ikev2_remote_protocol_left);
                Ext.getCmp("net_pro2").setValue(data.ikev2_remote_protocol_right).show();
                Ext.getCmp("net_port1").setValue(data.ikev2_remote_port_left);
                Ext.getCmp("net_port2").setValue(data.ikev2_remote_port_right).show();
            }

            Ext.getCmp("isa_authby").setValue(data.authby);
            if(data.authby === 'psk'){
                Ext.getCmp("isa_psk").setValue(data.psk);
            }else{
                Ext.getCmp("con_cert").show();
                Ext.getCmp("isa_psk").hide();
                Ext.getCmp("isa_cert_sel").setValue(data.cert_name);
            }
            Ext.getCmp("interface").setValue(data.iface);
            Ext.getCmp("ipdomain").setValue(data.target_ip);
            me.onIpdomainBlur(Ext.getCmp("ipdomain"));
            Ext.getCmp("ips_sechost").setValue(data.sechost);
            Ext.getCmp("hub_net").setValue(data.hub_net);

            Ext.getCmp("tab_2").show();

            Ext.getCmp('chk_dpd').setValue(data.chk_dpd);
            Ext.getCmp("isa_action").setValue(data.action);
            if(data.action === 'responder'){
                Ext.getCmp("st_ipsec_fieldset_ip_pool").enable();
            }
            Ext.getCmp("isa_dpd_sec").setValue(data.dpd_sec);
            Ext.getCmp("isa_dpd_cnt").setValue(data.dpd_cnt);

            var isa_algorithm = data.isa_algorithm;
            var isa_store = Ext.data.StoreManager.lookup("store_isakmp_enau_obj");
            var isa_record = {};
            for(var i=0; i<isa_algorithm.length; i++){
                eval('isa_record.name'+(i+1)+' = isa_algorithm[i].toUpperCase();');
                eval('isa_record.val'+(i+1)+' = isa_algorithm[i];');
                Ext.getCmp("is_n"+(i+1)).show();
                Ext.getCmp("is_del"+(i+1)).show();
            }
            isa_store.loadData([isa_record]);
            if(isa_record.name4){ Ext.getCmp("grid_enau").setWidth(560); }
            else if(isa_record.name3){ Ext.getCmp("grid_enau").setWidth(420); }
            else if(isa_record.name2){ Ext.getCmp("grid_enau").setWidth(280); }
            else if(isa_record.name1){ Ext.getCmp("grid_enau").setWidth(140); }
            Ext.getCmp("isa_group").setValue(data.group);

            Ext.getCmp("ips_mode").setValue(data.ips_mode);
            Ext.getCmp("ips_protocol").setValue(data.protocol);
            if(data.protocol === 'ah'){
                Ext.getCmp("b_enau").hide();

                Ext.getCmp("ips_encpt").hide();
                Ext.getCmp("ips_encpt_text").hide();
                Ext.getCmp("ips_encpt_l").hide();
                Ext.getCmp("ips_auth").setFieldLabel(__zen('algorithm'));
                Ext.getCmp("ips_auth").addCls("lb_req").setWidth(315);
            }else{

                Ext.getCmp("ips_encpt_l").show();
                Ext.getCmp("ips_auth").setFieldLabel('');
                Ext.getCmp("ips_auth").removeCls("lb_req").setWidth(145);
            }

            var ips_algorithm = data.ips_algorithm;
            var ips_store = Ext.data.StoreManager.lookup("store_ipsec_enau_obj");
            var ips_record = {};

            for(var i=0; i<ips_algorithm.length; i++){

                var name = (ips_algorithm[i].indexOf("gcm")!==-1)?ips_algorithm[i].substring(0,9)+ips_algorithm[i].substring(11):ips_algorithm[i];
                eval('ips_record.name'+(i+1)+' = name.toUpperCase();');
                eval('ips_record.val'+(i+1)+' = ips_algorithm[i];');
                Ext.getCmp("ips_n"+(i+1)).show();
                Ext.getCmp("ips_del"+(i+1)).show();
            }
            Ext.getCmp("grid_ips_enau").show();
            ips_store.loadData([ips_record]);
            if(ips_record.name4){ Ext.getCmp("grid_ips_enau").setWidth(560); }
            else if(ips_record.name3){ Ext.getCmp("grid_ips_enau").setWidth(420); }
            else if(ips_record.name2){ Ext.getCmp("grid_ips_enau").setWidth(280); }
            else if(ips_record.name1){ Ext.getCmp("grid_ips_enau").setWidth(140); }

            Ext.getCmp("ips_lifetime").setValue(addComma(data.ips_lifetime));
            Ext.getCmp("isa_lifetime").setValue(addComma(data.isa_lifetime));
            if(data.Xauth_serv==='unused'){

            }else{
                Ext.getCmp("chk_xauth").state = true;
                Ext.getCmp("chk_xauth").up('fieldset').query('container')[1].setDisabled(false);
                var _params = {
                    type: Ext.encode('radius_check')
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'getExternalServerStatus',
                    _params,
                    function(response){

                        var stat_img = Ext.getCmp("stat_img");
                        if(response){
                            stat_img.removeCls("b_stat_white b_stat_red").addCls("b_stat_green");
                        }else{
                            Ext.getCmp("xauth_remote").disable();
                            stat_img.removeCls("b_stat_green b_stat_red").addCls("b_stat_red");
                        }
                    }
                );
                Ext.getCmp("xauth_serv").setValue(data.Xauth_serv);
            }
            if(data.Xauth_serv === 'server'){
                Ext.getCmp("con_xauth_server").enable();
                Ext.getCmp("xauth_certi").setValue(data.Xauth_certi);
            }else if(data.Xauth_serv === 'client'){
                Ext.getCmp("con_xauth_server").hide();
                Ext.getCmp("con_xauth_client").show().enable();
                Ext.getCmp("client_ip").setValue(data.client_ip);
                Ext.getCmp("client_id").setValue(data.client_id);
                Ext.getCmp("client_pw").setValue(data.client_pw);
            }
            if(data.ip_pool !== ''){
                Ext.getCmp("st_ipsec_chk_ip_pool").state = true;
                Ext.getCmp("st_ipsec_chk_ip_pool").up('fieldset').query('container')[1].setDisabled(false);
                Ext.getCmp("st_ipsec_ip_pool").setValue(data.ip_pool);
                Ext.getCmp("st_ipsec_dns").setValue(data.dns);
                Ext.getCmp("st_ipsec_con_hub_net").disable();
            }

            Ext.getCmp("ips_pfsgroup").setValue(data.pfsgroup);
            if(data.reply_prot === 'on'){
                Ext.getCmp("reply_prot").setValue(true);
            }
            if(data.force_natt === 'on'){
                Ext.getCmp("isa_force").setValue(true);
            }
            Ext.getCmp("ips_local").setValue(data.ips_local);
            if(data.ips_local !== 'default' && data.ips_local !== 'any'){
                Ext.getCmp("local_text").setValue(data.local_text).show();
            }
            Ext.getCmp("ips_remote").setValue(data.ips_remote);

            if(data.ips_remote !== 'default' && data.ips_remote !== 'any'){
                Ext.getCmp("remote_text").setValue(data.remote_text).show();
            }

            Ext.getCmp("tab_1").show();
        }else{
            me.setTitle(__zen('ipsec_add'));
            var en_record = [{ 'name1':'AES128-SHA1', 'val1':'aes128-sha1' }];

            Ext.data.StoreManager.lookup("store_ipsec_enau_obj").loadData(en_record);
            Ext.data.StoreManager.lookup("store_isakmp_enau_obj").loadData(en_record);
            Ext.getCmp("interface").setValue('eth1');
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;
        var mem_cid = Ext.getCmp("NFW2_ipsec_security_securityConf").mem_cid;

        var name = Ext.getCmp("name");
        var interface = Ext.getCmp("interface");
        var isa_ver = Ext.getCmp("isa_ver").getValue();
        var isa_authby = Ext.getCmp("isa_authby").getValue();
        var isa_psk = Ext.getCmp("isa_psk");
        var isa_cert = Ext.getCmp("isa_cert_sel");
        var target_ip = Ext.getCmp("ipdomain");
        var ips_sechost = Ext.getCmp("ips_sechost");
        var sec_pro1 = Ext.getCmp("sec_pro1");
        var sec_pro2 = Ext.getCmp("sec_pro2");
        var sec_port1 = Ext.getCmp("sec_port1");
        var sec_port2 = Ext.getCmp("sec_port2");
        var ips_hub_net = Ext.getCmp("hub_net");
        var net_pro1 = Ext.getCmp('net_pro1');
        var net_pro2 = Ext.getCmp('net_pro2');
        var net_port1 = Ext.getCmp("net_port1");
        var net_port2 = Ext.getCmp("net_port2");

        var isa_mode = Ext.getCmp("isa_mode").getValue();
        var isa_action = Ext.getCmp("isa_action").getValue();
        var chk_dpd = Ext.getCmp("chk_dpd").getValue();
        var isa_dpd_sec = Ext.getCmp("isa_dpd_sec");
        var isa_dpd_cnt = Ext.getCmp("isa_dpd_cnt");
        var isa_group = Ext.getCmp("isa_group");
        var ips_local = Ext.getCmp("ips_local");
        var local_text = Ext.getCmp("local_text");
        var ips_remote = Ext.getCmp("ips_remote");
        var remote_text = Ext.getCmp("remote_text");
        var isa_lifetime = Ext.getCmp("isa_lifetime");

        var ips_mode = Ext.getCmp("ips_mode").getValue();
        var ips_protocol = Ext.getCmp("ips_protocol").getValue();
        var ips_lifetime = Ext.getCmp("ips_lifetime");
        var ips_pfsgroup = Ext.getCmp("ips_pfsgroup");
        var reply_prot = Ext.getCmp("reply_prot");
        var isa_force = Ext.getCmp("isa_force");

        var chk_xauth = Ext.getCmp("chk_xauth").state;
        var xauth_serv = Ext.getCmp("xauth_serv").getValue();
        var xauth_certi = Ext.getCmp("xauth_certi").getValue();
        var client_ip = Ext.getCmp("client_ip").getValue();
        var client_id = Ext.getCmp("client_id");
        var client_pw = Ext.getCmp("client_pw");
        var ip_pool = Ext.getCmp("st_ipsec_ip_pool");
        var dns = Ext.getCmp("st_ipsec_dns");

        var obj = {};

        Ext.getCmp("tab_1").show();

        if(name.isValid()===false){ name.focus(); me.tab = 1; return false; }
        obj.name = name.getValue();
        if(interface.getValue().length === 0){
            prt_errMsg(get_msg('err_null'), null);
            interface.focus();
            me.tab = 1;
            return false;
        }
        obj.iface = interface.getValue();
        obj.ver = isa_ver;
        obj.authby = isa_authby;
        if(isa_authby === 'psk'){
            if(isa_psk.isValid()===false){ isa_psk.focus(); me.tab = 1; return false; }
            obj.psk = isa_psk.getValue();
            obj.cert_name = '';
        }else{
            if(isa_cert.getValue()===null){
                prt_errMsg(get_msg('err_null'), null);
                isa_cert.focus(); me.tab = 1; return false;
            }
            obj.cert_name = isa_cert.getValue();
            obj.psk = '';
        }
        if(target_ip.isValid()===false){ target_ip.focus(); me.tab = 1; return false; }
        obj.target_ip = target_ip.getValue();

        var sec_cid = ips_sechost.getValue();
        if(sec_cid === null || sec_cid === ""){
            prt_errMsg(get_msg('err_null'), null); ips_sechost.focus(); me.tab = 1; return false;
        }
        var hub_cid = ips_hub_net.getValue();
        if(hub_cid === null || hub_cid === ""){
            prt_errMsg(get_msg('err_null'), null); ips_hub_net.focus(); me.tab = 1; return false;
        }

        obj.sechost = ips_sechost.getValue();
        obj.sechost_kind = (mem_cid[ips_sechost.getValue()])?mem_cid[ips_sechost.getValue()].kind:'eth0';
        obj.hub_net = ips_hub_net.getValue();
        obj.hub_net_kind = (mem_cid[ips_hub_net.getValue()])?mem_cid[ips_hub_net.getValue()].kind:'ANY';

        if(sec_pro1.isValid()===false){ sec_pro1.focus(); me.tab = 1; return false;}
        if(sec_pro2.isValid()===false){ sec_pro2.focus(); me.tab = 1; return false;}
        if(sec_port1.isValid()===false){ sec_port1.focus(); me.tab = 1; return false;}
        if(sec_port2.isValid()===false){ sec_port2.focus(); me.tab = 1; return false;}

        if(net_pro1.isValid()===false){ net_pro1.focus(); me.tab = 1; return false;}
        if(net_pro2.isValid()===false){ net_pro2.focus(); me.tab = 1; return false;}
        if(net_port1.isValid()===false){ net_port1.focus(); me.tab = 1; return false;}
        if(net_port2.isValid()===false){ net_port2.focus(); me.tab = 1; return false;}

        if(isa_ver==='ikev1'){
            obj.ikev1_local_protocol = sec_pro1.getValue();
            obj.ikev1_remote_protocol = net_pro1.getValue();
            obj.ikev1_local_port = sec_port1.getValue();
            obj.ikev1_remote_port = net_port1.getValue();
        }else{
            obj.ikev2_local_protocol_left = sec_pro1.getValue();
            obj.ikev2_local_protocol_right = sec_pro2.getValue();
            obj.ikev2_remote_protocol_left = net_pro1.getValue();
            obj.ikev2_remote_protocol_right = net_pro2.getValue();
            obj.ikev2_local_port_left = sec_port1.getValue();
            obj.ikev2_local_port_right = sec_port2.getValue();
            obj.ikev2_remote_port_left = net_port1.getValue();
            obj.ikev2_remote_port_right = net_port2.getValue();
        }

        Ext.getCmp("tab_2").show();

        obj.isa_mode = (isa_ver==='ikev1')?isa_mode:'';
        obj.action = isa_action;
        obj.chk_dpd = Ext.getCmp("chk_dpd").getValue();
        if(Ext.getCmp("chk_dpd").getValue()){
            if(isa_dpd_sec.isValid()===false){ isa_dpd_sec.focus(); me.tab = 2; return false; }
            if(isa_dpd_cnt.isValid()===false){ isa_dpd_cnt.focus(); me.tab = 2; return false; }

            obj.dpd_sec = isa_dpd_sec.getValue();
            obj.dpd_cnt = isa_dpd_cnt.getValue();
        }else{
            obj.dpd_sec = '3';
            obj.dpd_cnt = '3';
        }
        obj.group = isa_group.getValue();
        obj.ips_local = ips_local.getValue();
        if(ips_local.getValue() === 'any'){
            obj.local_text = ips_local.getValue();
        }else if(ips_local.getValue() !== 'default'){
            if(local_text.isValid()===false){ local_text.focus(); me.tab = 2; return false; }
            obj.local_text = local_text.getValue();
        }
        obj.ips_remote = ips_remote.getValue();
        if(ips_remote.getValue() === 'any'){
            obj.remote_text = ips_remote.getValue();
        }else if(ips_remote.getValue() !== 'default'){
            if(remote_text.isValid()===false){ remote_text.focus(); me.tab = 2; return false; }
            obj.remote_text = remote_text.getValue();
        }
        if(isa_lifetime.isValid()===false){ isa_lifetime.focus(); me.tab = 2; return false; }
        obj.isa_lifetime = removeComma(isa_lifetime.getValue());

        var isa_store = Ext.data.StoreManager.lookup("store_isakmp_enau_obj").data;

        if(isa_store.length === 0 || !isa_store.items[0].data.val1){
            prt_errMsg(get_msg('err_null'), null);
            me.tab = 1;
            return false;
        }else{
            var ar_enau = [];
            if(isa_store.items[0].data.val1!==undefined){ ar_enau.push(isa_store.items[0].data.val1); }
            if(isa_store.items[0].data.val2!==undefined){ ar_enau.push(isa_store.items[0].data.val2); }
            if(isa_store.items[0].data.val3!==undefined){ ar_enau.push(isa_store.items[0].data.val3); }
            if(isa_store.items[0].data.val4!==undefined){ ar_enau.push(isa_store.items[0].data.val4); }
            obj.isa_algorithm = ar_enau;
        }

        obj.ips_mode = ips_mode;
        obj.protocol = ips_protocol;

        var ips_store = Ext.data.StoreManager.lookup("store_ipsec_enau_obj").data;

        if(ips_store.length === 0 || !ips_store.items[0].data.val1){
            prt_errMsg(get_msg('err_null'), null);
            me.tab = 1;
            return false;
        }else{
            var ar_enau = [];
            if(ips_store.items[0].data.val1!==undefined){ ar_enau.push(ips_store.items[0].data.val1); }
            if(ips_store.items[0].data.val2!==undefined){ ar_enau.push(ips_store.items[0].data.val2); }
            if(ips_store.items[0].data.val3!==undefined){ ar_enau.push(ips_store.items[0].data.val3); }
            if(ips_store.items[0].data.val4!==undefined){ ar_enau.push(ips_store.items[0].data.val4); }
            obj.ips_algorithm = ar_enau;
        }
        if(ips_lifetime.isValid()===false){ ips_lifetime.focus(); me.tab = 2; return false;}
        obj.ips_lifetime = removeComma(ips_lifetime.getValue());
        obj.pfsgroup = ips_pfsgroup.getValue();
        obj.reply_prot = (reply_prot.getValue())?"on":"off";
        obj.force_natt = (isa_force.getValue())?"on":"off";

        if(chk_xauth === true){
            if(xauth_serv === 'server'){
                obj.Xauth_certi = xauth_certi;

                obj.client_ip = '';
                obj.client_id = '';
                obj.client_pw = '';
            }else if(xauth_serv === 'client'){
                if(client_id.isValid()===false){ client_id.focus(); me.tab = 2; return false; }
                if(client_pw.isValid()===false){ client_pw.focus(); me.tab = 2; return false; }

                obj.client_ip = client_ip;
                obj.client_id = client_id.getValue();
                obj.client_pw = client_pw.getValue();
                obj.Xauth_certi = '';
            }
        }else{
            obj.Xauth_certi = '';
            obj.client_ip = '';
            obj.client_id = '';
            obj.client_pw = '';
        }
        obj.Xauth_serv = (chk_xauth===true)?xauth_serv:'unused';

        if(isa_action === 'responder'){
            if(Ext.getCmp("st_ipsec_chk_ip_pool").state){
                if(!ip_pool.isValid()){ ip_pool.focus(); me.tab = 2; return false; }
                obj.ip_pool = ip_pool.getValue();
                obj.dns = dns.getValue();

                obj.hub_net = 'ANY';
                obj.hub_net_kind = 'ANY';
                if(isa_ver==='ikev1'){
                    obj.ikev1_remote_protocol = '0';
                    obj.ikev1_remote_port = '0';
                }else{
                    obj.ikev2_remote_protocol_left = '0';
                    obj.ikev2_remote_protocol_right = '255';
                    obj.ikev2_remote_port_left = '0';
                    obj.ikev2_remote_port_right = '65535';
                }
            }else{
                obj.ip_pool = '';
                obj.dns = '';
            }
        }else{
            obj.ip_pool = '';
            obj.dns = '';
        }

        prt_errMsg(null,null);
        Ext.getCmp("tab_"+me.tab).show();

        if(me.edit === "edit"){
            obj['_id'] = me.record['_id'];
        }

        var update = (me.edit==="edit")?true:false;

        var _params = {
            basename : Ext.encode("vpn_ipsecsa"),
            obj : Ext.encode(obj),
            renum_info : Ext.encode({'fieldname':'_num'}),
            update : Ext.encode(update)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setListTypeObj',
            _params,
            function(response){

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

                var win = Ext.getCmp("NFW2_ipsec_security_securityConf");
                win.get_securityConf();
            }
        );

        function setWinState(btn){
            if(btn==="no"){
                var win = Ext.WindowManager.getActive();
                if (win) {
                    win.close();
                }
            }else{
                Ext.getCmp("fm_ipsec").getForm().reset();
                me.onWindowAfterRender();
                prt_errMsg(null,null);
                Ext.getCmp("is_n2").hide();
                Ext.getCmp("is_del2").hide();
                Ext.getCmp("is_n3").hide();
                Ext.getCmp("is_del3").hide();
                Ext.getCmp("is_n4").hide();
                Ext.getCmp("is_del4").hide();
                Ext.getCmp("ips_n2").hide();
                Ext.getCmp("ips_del2").hide();
                Ext.getCmp("ips_n3").hide();
                Ext.getCmp("ips_del3").hide();
                Ext.getCmp("ips_n4").hide();
                Ext.getCmp("ips_del4").hide();
            }
        }
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    }

});