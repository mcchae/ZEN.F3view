
Ext.define('NFW2.view.win_isakmp', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.Panel',
        'Ext.XTemplate',
        'Ext.form.Label',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.ComboBox',
        'Ext.Img',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.button.Button'
    ],

    id: 'win_isakmp',
    maxHeight: 700,
    minHeight: 300,
    width: 650,
    autoScroll: true,
    title: 'ISAKMP SA 추가',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    id: 'fm_isakmp',
                    autoScroll: true,
                    layout: 'auto',
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'container',
                            width: 600,
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        if(!ValidNotKor(value)){ return get_msg('err_name'); }

                                        return true;
                                    },
                                    id: 'isa_name',
                                    width: 400,
                                    afterLabelTextTpl: [
                                        '{[required()]}'
                                    ],
                                    fieldLabel: '이름',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    labelWidth: 150,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 31,
                                    minLength: 1,
                                    listeners: {
                                        errorchange: {
                                            fn: me.onIsa_nameErrorChange,
                                            scope: me
                                        },
                                        keydown: {
                                            fn: me.onIsa_nameKeydown,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'errorBox',
                                    hidden: true,
                                    id: 'isa_err_name'
                                }
                            ]
                        },
                        {
                            xtype: 'radiogroup',
                            id: 'isa_ver',
                            width: 400,
                            fieldLabel: '버전',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 150,
                            items: [
                                {
                                    xtype: 'radiofield',
                                    id: 'isa_ikev1',
                                    name: 'isa_ver',
                                    boxLabel: 'IKEv1',
                                    boxLabelCls: 'lb_box',
                                    checked: true,
                                    inputValue: 'ikev1'
                                },
                                {
                                    xtype: 'radiofield',
                                    id: 'isa_ikev2',
                                    name: 'isa_ver',
                                    boxLabel: 'IKEv2',
                                    boxLabelCls: 'lb_box',
                                    inputValue: 'ikev2'
                                }
                            ]
                        },
                        {
                            xtype: 'radiogroup',
                            id: 'isa_action',
                            width: 400,
                            fieldLabel: '동작',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 150,
                            items: [
                                {
                                    xtype: 'radiofield',
                                    id: 'isa_initiator',
                                    name: 'isa_action',
                                    boxLabel: 'Initiator',
                                    boxLabelCls: 'lb_box',
                                    checked: true,
                                    inputValue: 'initiator'
                                },
                                {
                                    xtype: 'radiofield',
                                    id: 'isa_responder',
                                    name: 'isa_action',
                                    boxLabel: 'Responder',
                                    boxLabelCls: 'lb_box',
                                    inputValue: 'responder'
                                }
                            ]
                        },
                        {
                            xtype: 'radiogroup',
                            id: 'isa_authby',
                            width: 400,
                            fieldLabel: '인증 방식',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 150,
                            items: [
                                {
                                    xtype: 'radiofield',
                                    id: 'isa_preshared',
                                    name: 'isa_authby',
                                    boxLabel: 'Preshared Key',
                                    boxLabelCls: 'lb_box',
                                    checked: true,
                                    inputValue: 'psk'
                                },
                                {
                                    xtype: 'radiofield',
                                    id: 'isa_cert',
                                    name: 'isa_authby',
                                    boxLabel: 'Certificate',
                                    boxLabelCls: 'lb_box',
                                    inputValue: 'certificate'
                                }
                            ],
                            listeners: {
                                change: {
                                    fn: me.onIsa_authbyChange,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            width: 600,
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        if(value.length < 4 || value.length > 31){
                                            return ValidMinMax('Preshared key',4,31);
                                        }

                                        return true;
                                    },
                                    id: 'isa_psk',
                                    width: 400,
                                    afterLabelTextTpl: [
                                        '{[required()]}'
                                    ],
                                    fieldLabel: 'Preshared Key',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    labelWidth: 150,
                                    msgTarget: 'none',
                                    enforceMaxLength: true,
                                    maxLength: 31,
                                    minLength: 1,
                                    listeners: {
                                        errorchange: {
                                            fn: me.onIsa_pskErrorChange,
                                            scope: me
                                        },
                                        keydown: {
                                            fn: me.onIsa_pskKeydown,
                                            scope: me
                                        }
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
                                            width: 400,
                                            afterLabelTextTpl: [
                                                '{[required()]}'
                                            ],
                                            fieldLabel: '인증서 선택',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            labelWidth: 150,
                                            emptyText: 'Select',
                                            editable: false,
                                            displayField: 'cert_name',
                                            store: 'store_isakmp_cert',
                                            valueField: 'cert_name',
                                            listeners: {
                                                change: {
                                                    fn: me.onIsa_cert_selChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'image',
                                            height: 14,
                                            margin: '0 0 0 5',
                                            width: 14,
                                            src: '../images/b_help.png',
                                            listeners: {
                                                render: {
                                                    fn: me.onImageRender2,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '0 0 0 155',
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'errorBox',
                                    hidden: true,
                                    id: 'isa_err_psk'
                                }
                            ]
                        },
                        {
                            xtype: 'radiogroup',
                            id: 'isa_mode',
                            width: 400,
                            fieldLabel: '모드',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 150,
                            items: [
                                {
                                    xtype: 'radiofield',
                                    id: 'isa_main',
                                    name: 'isa_mode',
                                    boxLabel: 'Main',
                                    boxLabelCls: 'lb_box',
                                    checked: true,
                                    inputValue: 'main'
                                },
                                {
                                    xtype: 'radiofield',
                                    id: 'isa_agg',
                                    name: 'isa_mode',
                                    boxLabel: 'Aggressive',
                                    boxLabelCls: 'lb_box',
                                    inputValue: 'aggressive'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            width: 600,
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){ return true; }
                                        if(!ValidNum(value)){ return get_msg('err_form'); }
                                        if(!LengthCheck(value, 1, 255)){ return ValidLimit(1, 255); }

                                        return true;
                                    },
                                    id: 'isa_dpd_sec',
                                    width: 200,
                                    fieldLabel: 'DPD',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    labelWidth: 150,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9.]/,
                                    maxLength: 3,
                                    minLength: 1,
                                    listeners: {
                                        errorchange: {
                                            fn: me.onIsa_dpd_secErrorChange,
                                            scope: me
                                        },
                                        keydown: {
                                            fn: me.onIsa_dpd_secKeydown,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'lb_box',
                                    text: '초 간격으로 체크, 연속'
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){ return true; }
                                        if(!ValidNum(value)){ return get_msg('err_form'); }
                                        if(!LengthCheck(value, 1, 255)){ return ValidLimit(1, 255); }

                                        return true;
                                    },
                                    id: 'isa_dpd_cnt',
                                    style: 'margin-left:5px',
                                    width: 50,
                                    fieldLabel: '',
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9.]/,
                                    maxLength: 3,
                                    minLength: 1,
                                    listeners: {
                                        errorchange: {
                                            fn: me.onIsa_dpd_cntErrorChange,
                                            scope: me
                                        },
                                        keydown: {
                                            fn: me.onIsa_dpd_cntKeydown,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'lb_box',
                                    text: '회 실패 시 타임아웃'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '0 0 0 155',
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'errorBox',
                                    hidden: true,
                                    id: 'isa_err_dpd',
                                    margin: 0
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'con_enau',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'isa_encpt',
                                    width: 305,
                                    afterLabelTextTpl: [
                                        '{[required()]}'
                                    ],
                                    fieldLabel: '알고리즘',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    labelWidth: 150,
                                    value: 'aes128',
                                    editable: false,
                                    displayField: 'name',
                                    forceSelection: true,
                                    queryMode: 'local',
                                    store: 'store_isakmp_encpt',
                                    valueField: 'val'
                                },
                                {
                                    xtype: 'label',
                                    margin: '3 5 0 5',
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
                                    store: 'store_isakmp_auth',
                                    valueField: 'val'
                                },
                                {
                                    xtype: 'image',
                                    margin: '-4 0 0 0',
                                    src: '../images/b_insert.gif',
                                    listeners: {
                                        render: {
                                            fn: me.onImageRender3,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            hidden: true,
                            id: 'con_enau_obj',
                            margin: '0 0 5 155',
                            width: 400,
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_enau',
                                    width: 310,
                                    hideHeaders: true,
                                    store: 'store_enau_obj',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'name',
                                            text: 'String',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            width: 50,
                                            align: 'center',
                                            items: [
                                                {
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                        Ext.getCmp("grid_enau").getStore().removeAt(rowIndex);

                                                        if(Ext.getCmp("grid_enau").getStore().data.length === 0){
                                                            Ext.getCmp("con_enau_obj").hide();
                                                        }
                                                    },
                                                    icon: '../images/b_close.gif'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'combobox',
                            hidden: true,
                            id: 'isa_encpt_cc',
                            fieldLabel: '암호 알고리즘',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 150,
                            value: '3des',
                            editable: false,
                            displayField: 'name',
                            forceSelection: true,
                            queryMode: 'local',
                            store: 'store_isakmp_encpt',
                            valueField: 'val'
                        },
                        {
                            xtype: 'combobox',
                            hidden: true,
                            id: 'isa_auth_cc',
                            fieldLabel: '해쉬 알고리즘',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 150,
                            value: 'sha1',
                            editable: false,
                            displayField: 'name',
                            forceSelection: true,
                            queryMode: 'local',
                            store: 'store_isakmp_auth',
                            valueField: 'val'
                        },
                        {
                            xtype: 'combobox',
                            id: 'isa_group',
                            fieldLabel: '키 교환 그룹',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 150,
                            value: 'modp1024',
                            editable: false,
                            displayField: 'name',
                            forceSelection: true,
                            queryMode: 'local',
                            store: 'store_ipsec_pfs',
                            valueField: 'val'
                        },
                        {
                            xtype: 'combobox',
                            id: 'isa_lifetime',
                            fieldLabel: '유효시간',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 150,
                            value: '8',
                            editable: false,
                            displayField: 'val',
                            store: 'store_isakmp_lifetime',
                            valueField: 'val'
                        },
                        {
                            xtype: 'container',
                            width: 600,
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'isa_ipsecsa',
                                    afterLabelTextTpl: [
                                        '{[required()]}'
                                    ],
                                    fieldLabel: 'IPSec SA',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    labelWidth: 150,
                                    emptyText: 'Select',
                                    editable: false,
                                    displayField: 'name',
                                    forceSelection: true,
                                    queryMode: 'local',
                                    store: 'store_security_ipsecsa_list',
                                    valueField: '@cid',
                                    listeners: {
                                        afterrender: {
                                            fn: me.onIsa_ipsecsaAfterRender,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'image',
                                    margin: '-4 0 0 0',
                                    src: '../images/b_insert.gif',
                                    listeners: {
                                        render: {
                                            fn: me.onImageRender,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            hidden: true,
                            id: 'con_ipsecsa_obj',
                            margin: '0 0 5 155',
                            width: 400,
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_ipsecsa',
                                    width: 300,
                                    hideHeaders: true,
                                    store: 'store_ipsecsa_obj',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'name',
                                            text: 'String',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            width: 50,
                                            align: 'center',
                                            items: [
                                                {
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                        Ext.getCmp("grid_ipsecsa").getStore().removeAt(rowIndex);

                                                        if(Ext.getCmp("grid_ipsecsa").getStore().data.length === 0){
                                                            Ext.getCmp("con_ipsecsa_obj").hide();
                                                        }
                                                    },
                                                    icon: '../images/b_close.gif'
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
                                        if(!CheckNotNull(value)){ return true; }

                                        if(!ValidNum(value)){ return get_msg('err_form'); }
                                        if(!LengthCheck(value, 1, 3600)){ return ValidLimit(1, 3600); }

                                        return true;
                                    },
                                    id: 'timeout',
                                    fieldLabel: '터널 타임아웃',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    labelWidth: 150,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    maskRe: /[0-9.]/,
                                    listeners: {
                                        errorchange: {
                                            fn: me.onTimeoutErrorChange,
                                            scope: me
                                        },
                                        keydown: {
                                            fn: me.onTimeoutKeydown,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'mt_info',
                                    text: '초'
                                }
                            ]
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'xauth_serv',
                            fieldLabel: 'XAuth 서버',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 150,
                            boxLabel: '',
                            listeners: {
                                change: {
                                    fn: me.onCheckboxfieldChange1,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            disabled: true,
                            id: 'con_xauth',
                            margin: '0 0 0 20',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            id: 'xauth_certi',
                                            width: 365,
                                            fieldLabel: '인증 방식',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            labelWidth: 150,
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'xauth_local',
                                                    name: 'xauth_certi',
                                                    boxLabel: 'Local',
                                                    checked: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    disabled: true,
                                                    id: 'xauth_remote',
                                                    name: 'xauth_certi',
                                                    boxLabel: 'Remote Radius'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'image',
                                            id: 'stat_img',
                                            width: 16,
                                            imgCls: 'stat_white'
                                        },
                                        {
                                            xtype: 'image',
                                            margin: '-3 0 0 0',
                                            src: '../images/icon_option.png',
                                            listeners: {
                                                render: {
                                                    fn: me.onImageRender1,
                                                    scope: me
                                                }
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
                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                var ip = value.split("/");

                                                if(ip.length < 2){
                                                    return get_msg('err_form');
                                                }else{
                                                    if(!ip[1]){ return get_msg('err_form'); }
                                                    if(!ValidIPAddress(ip[0])){ return get_msg('err_form'); }
                                                    if((ip[1] < 0) || (ip[1] > 65)){ return get_msg('err_form'); }
                                                }

                                                return true;
                                            },
                                            id: 'ip_pool',
                                            afterLabelTextTpl: [
                                                '{[required()]}'
                                            ],
                                            fieldLabel: 'IP Pool',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            labelWidth: 150,
                                            listeners: {
                                                errorchange: {
                                                    fn: me.onTextfieldErrorChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            cls: 'mt_info',
                                            text: '(IP/Prefix)'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                if(!ValidIPAddress(value)){ return get_msg('err_ip'); }

                                                return true;
                                            },
                                            id: 'dns',
                                            afterLabelTextTpl: [
                                                '{[required()]}'
                                            ],
                                            fieldLabel: 'DNS',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            labelWidth: 150,
                                            listeners: {
                                                errorchange: {
                                                    fn: me.onTextfieldErrorChange1,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'isa_force',
                            fieldLabel: 'UDP 캡슐화',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 150,
                            boxLabel: 'ESP를 UDP 4500으로 캡슐화',
                            boxLabelCls: 'lb_box'
                        },
                        {
                            xtype: 'container',
                            height: 20,
                            width: 600,
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'errorBox',
                                    hidden: true,
                                    id: 'isa_err_null'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            width: 600,
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    width: 100,
                                    text: '확인',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick1,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    margin: '0 0 0 5',
                                    width: 100,
                                    text: '취소',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWindowAfterRender,
                    scope: me
                },
                close: {
                    fn: me.onWindowClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onIsa_nameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "isa_err_name");
    },

    onIsa_nameKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(code === 32){
            e.stopEvent();
        }
    },

    onIsa_authbyChange: function(field, newValue, oldValue, eOpts) {
        Ext.getCmp("isa_err_psk").hide();

        if(newValue.isa_authby === "psk"){
            Ext.getCmp("isa_psk").show();
            Ext.getCmp("con_cert").hide();
        }else{
            Ext.getCmp("isa_psk").hide();
            Ext.getCmp("con_cert").show();
        }
    },

    onIsa_pskErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "isa_err_psk");
    },

    onIsa_pskKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(code === 32){
            e.stopEvent();
        }
    },

    onIsa_cert_selChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp("isa_err_psk").hide();
        }
    },

    onImageRender2: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var _val = Ext.getCmp("isa_cert_sel").getValue();

            if(_val === null){ return false; }

            var _store = Ext.data.StoreManager.lookup("store_isakmp_cert");

            var _item = _store.findRecord('cert_name',_val);

            var win = Ext.create('NFW2.view.win_isakmp_cert',{
                data: _item.data
            });
            win.show();

        }, component);
    },

    onIsa_dpd_secErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "isa_err_dpd");
    },

    onIsa_dpd_secKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onIsa_dpd_cntErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "isa_err_dpd");
    },

    onIsa_dpd_cntKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onImageRender3: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var encpt = Ext.getCmp("isa_encpt").getValue();
            var auth = Ext.getCmp("isa_auth").getValue();

            Ext.getCmp("con_enau_obj").show();

            var grid_enau = Ext.getCmp("grid_enau").getStore().data;

            if(grid_enau.length >= 4){
                Ext.Msg.alert("",ValidMaxCnt('4'));
                return false;
            }

            for(var i=0; i<grid_enau.length; i++){

                var val = grid_enau.items[i].data.val.split("-");
                if(val[0] === encpt && val[1] === auth){
                    return false;
                }
            }

            var obj = {
                'name': encpt.toUpperCase()+'-'+auth.toUpperCase(),
                'val': encpt+'-'+auth
            };

            var _store = Ext.data.StoreManager.lookup("store_enau_obj");
            _store.add(obj);

        }, component);
    },

    onIsa_ipsecsaAfterRender: function(component, eOpts) {
        var grid = Ext.getCmp("grid_ipsec");

        if(grid.getStore().getCount() > 0){

            var first = grid.getStore().data.items[0].data['@cid'];

            Ext.getCmp("isa_ipsecsa").setValue(first);
        }
    },

    onImageRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var ipsecsa = Ext.getCmp("isa_ipsecsa");

            var cid = ipsecsa.getValue();

            if(cid === null){
                return false;
            }

            Ext.getCmp("con_ipsecsa_obj").show();

            var grid_ipsecsa = Ext.getCmp("grid_ipsecsa").getStore().data;

            if(grid_ipsecsa.length >= 16){
                Ext.Msg.alert("",ValidMaxCnt('16'));
                return false;
            }

            for(var i=0; i<grid_ipsecsa.length; i++){

                if(grid_ipsecsa.items[i].data.cid === cid){
                    return false;
                }
            }

            var obj = {
                'name': ipsecsa.getRawValue(),
                'cid': ipsecsa.getValue()
            };

            var _store = Ext.data.StoreManager.lookup("store_ipsecsa_obj");
            _store.add(obj);

        }, component);
    },

    onTimeoutErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "isa_err_null");
    },

    onTimeoutKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onCheckboxfieldChange1: function(field, newValue, oldValue, eOpts) {
        var stat_img = Ext.getCmp("stat_img");

        if(newValue){

            var _params = {
                type: Ext.encode('radius_check')
            };

            Ext.getCmp("con_xauth").enable();

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getExternalServerStatus',
                _params,
                function(response){

                    if(response){
                        stat_img.removeCls("stat_white stat_red").addCls("stat_green");
                    }else{
                        Ext.getCmp("xauth_remote").disable();

                        stat_img.removeCls("stat_white stat_green").addCls("stat_red");
                    }
                }
            );
        }else{

            Ext.getCmp("con_xauth").disable();
            stat_img.removeCls("stat_red stat_green").addCls("stat_white");
        }
    },

    onImageRender1: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            Ext.getCmp("win_isakmp").close();

            var me = Ext.getCmp('NFW2_client');
            Ext.getCmp('pnl_exec').removeAll();
            var _store = Ext.data.StoreManager.lookup('store_getMenuChildrenJson');
            _store.getProxy().setExtraParam('name',Ext.encode('NFW2_system'));
            _store.load(function(records, operation, success){
                Ext.getCmp('pnl_menuTree').removeAll();
                var treeData = {
                    xtype: 'treepanel',
                    useArrows:'true',
                    id: 'pnl_treeMenu',
                    animate:true,
                    autoScroll: true,
                    border: false,
                    rootVisible: true,
                    header: false,
                    root: records[0].raw,
                    listeners: {
                        itemclick: {
                            fn: me.pnlTreeMenuItemClick,
                            scope: me
                        }
                    }
                };
                Ext.getCmp('pnl_menuTree').add(treeData);
                Ext.getCmp('pnl_treeMenu').expandAll();
                /* 트리 연동 */
                var treePanel = Ext.getCmp('pnl_treeMenu');
                var findNode = treePanel.getStore().getNodeById('NFW2_system_extServerAuth');
                treePanel.getSelectionModel().select(findNode,true);
                //네이게이션 초기화
                me.navigationMenuController('true');
                me.selectedMenuInfo.selected = true;
                me.selectedMenuInfo.selectedMenuId = 'NFW2_system_extServerAuth';
                me.selectedMenuInfo.selectedMenuIsLeaf = true;
                me.init_menuConfigView(me.selectedMenuInfo);
            });

        }, component);
    },

    onTextfieldErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "isa_err_null");
    },

    onTextfieldErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, "isa_err_null");
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var name = Ext.getCmp("isa_name");
        var ver = Ext.getCmp("isa_ver");
        var action = Ext.getCmp("isa_action");
        var authby = Ext.getCmp("isa_authby");
        var psk = Ext.getCmp("isa_psk");
        var cert = Ext.getCmp("isa_cert_sel");
        var mode = Ext.getCmp("isa_mode");
        var dpd_sec = Ext.getCmp("isa_dpd_sec");
        var dpd_cnt = Ext.getCmp("isa_dpd_cnt");

        var encpt = (me.cc===true)?Ext.getCmp("isa_encpt_cc"):Ext.getCmp("isa_encpt");
        var auth = (me.cc===true)?Ext.getCmp("isa_auth_cc"):Ext.getCmp("isa_auth");
        var group = Ext.getCmp("isa_group");
        var lifetime = Ext.getCmp("isa_lifetime");
        var ipsecsa = Ext.getCmp("isa_ipsecsa");
        var force = Ext.getCmp("isa_force");

        var timeout = Ext.getCmp("timeout");
        var xauth_serv = Ext.getCmp("xauth_serv");
        var xauth_certi = Ext.getCmp("xauth_certi");
        var xauth_local = Ext.getCmp("xauth_local");
        var xauth_remote = Ext.getCmp("xauth_remote");
        var ip_pool = Ext.getCmp("ip_pool");
        var dns = Ext.getCmp("dns");

        if(name.validateValue()===false){ name.focus(); return false; }
        if(authby.getValue().isa_authby === "psk"){
            if(psk.validateValue()===false){ psk.focus(); return false; }
        }else{
            if(cert.getValue() === null){ prt_errMsg(get_msg('err_null'),"isa_err_psk"); cert.focus(); return false; }
        }
        if(dpd_sec.validateValue()===false){ dpd_sec.focus(); return false; }
        if(dpd_cnt.validateValue()===false){ dpd_cnt.focus(); return false; }
        if(timeout.validateValue()===false){ timeout.focus(); return false; }
        if(xauth_serv.getValue()){
            if(ip_pool.validateValue()===false){ ip_pool.focus(); return false; }
            if(dns.validateValue()===false){ dns.focus(); return false; }
        }

        var obj = {};

        obj.name = name.getValue();
        obj.ver = ver.getValue().isa_ver;
        obj.action = action.getValue().isa_action;
        obj.authby = authby.getValue().isa_authby;
        if(authby.getValue().isa_authby === "psk"){
            obj.psk = psk.getValue();
        }else{
            obj.cert_name = cert.getValue();
        }
        obj.mode = mode.getValue().isa_mode;
        obj.force_natt = (force.getValue())?"on":"off";
        obj.group = group.getValue();
        obj.lifetime = lifetime.getValue();

        obj.tunnel_timeout = timeout.getValue();
        obj.Xauth_serv = (xauth_serv.getValue())?"on":"off";
        if(xauth_serv.getValue()){
            obj.Xauth_certi = (xauth_local.getValue())?"local":"remote";
            obj.ip_pool = ip_pool.getValue();
            obj.dns = dns.getValue();
        }

        obj.dpd_sec = dpd_sec.getValue();
        obj.dpd_cnt = dpd_cnt.getValue();
        if(me.cc === true){
            obj.encpt = encpt.getValue();
            obj.auth = auth.getValue();
        }else{

            var grid_enau = Ext.getCmp("grid_enau").getStore().data;

            if(grid_enau.length === 0){
                prt_errMsg(get_msg('err_null'),'isa_err_null');
                encpt.focus();
                return false;
            }else{
                var ar_enau = [];

                for(var i=0; i<grid_enau.length; i++){
                    ar_enau.push(grid_enau.items[i].data.val);
                }
                obj.algorithm = ar_enau;
            }
        }

        var grid_ipsecsa = Ext.getCmp("grid_ipsecsa").getStore().data;

        if(grid_ipsecsa.length === 0){
            prt_errMsg(get_msg('err_null'), "isa_err_null");
            ipsecsa.focus();
            return false;
        }else{
            var ar_ipsecsa = [];

            for(var i=0; i<grid_ipsecsa.length; i++){

                ar_ipsecsa.push(grid_ipsecsa.items[i].data.cid);
            }

            var ipsecsa = ar_ipsecsa.join(",");

            obj.ipsecsa_obj = ipsecsa;
        }
        Ext.getCmp("isa_err_null").hide();

        if(me.edit === "edit"){
            obj['@cid'] = me.cid;
        }

        me.obj = obj;

        me.set_isakmp_security();
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;

        var NFW2 = Ext.getCmp("NFW2_ipsec_security_securityConf");
        me.cc = NFW2.cc;
        var _store = Ext.data.StoreManager.lookup("store_isakmp_auth");

        _store.loadData(NFW2.auth);

        if(me.cc === true){
            me.setHeight(500);

            var _store = Ext.data.StoreManager.lookup("store_isakmp_auth");
            _store.removeAt(0,2);

            Ext.getCmp("xauth_serv").hide();
            Ext.getCmp("con_xauth").hide();
            Ext.getCmp("con_enau").hide();

            Ext.getCmp("isa_encpt_cc").show();
            Ext.getCmp("isa_auth_cc").show();

            Ext.getCmp("isa_encpt_cc").setValue('seed');
            Ext.getCmp("isa_auth_cc").setValue('sha256');
            Ext.getCmp("isa_group").setValue('modp2048');
        }else{
            Ext.getCmp("isa_auth").setValue('sha1');
        }

        var _store_cert = Ext.data.StoreManager.lookup("store_isakmp_cert");
        if(_store_cert.data.length > 0){
            Ext.getCmp("isa_cert_sel").setValue(_store_cert.data.items[0].data.cert_name);
        }

        if(me.edit === "edit"){
            me.init_isakmp_security();
        }
    },

    onWindowClose: function(panel, eOpts) {
        Ext.data.StoreManager.lookup("store_ipsecsa_obj").removeAll();
        Ext.data.StoreManager.lookup("store_enau_obj").removeAll();

        Ext.getCmp("stat_img").removeCls("stat_green stat_red").addCls("stat_white");

        var _store = Ext.data.StoreManager.lookup("store_isakmp_auth");
        _store.removeAll();

    },

    set_isakmp_security: function() {
        var me = this;

        var obj_d = Ext.getCmp("NFW2_ipsec_security_securityConf").obj_d.data;

        var obj = me.obj;

        var update = (me.edit==="edit")?true:false;

        var _params = {
            basename : Ext.encode("vpn_isakmpsa"),
            obj : Ext.encode(obj),
            id_info : Ext.encode({'fieldname':'@cid'}),
            num_info : Ext.encode({'fieldname':'@num'}),
            update : Ext.encode(update)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObjectWithCid',
            _params,
            function(response){

                if(update === true){

                    Ext.Msg.show({
                        title: 'System Message - SUCCESS',
                        msg: get_msg("msg_ok_edit"),
                        width: 300,
                        buttons: Ext.Msg.OK,
                        fn: setWinClose,
                        icon: Ext.window.MessageBox.INFO
                    });
                }else{

                    Ext.Msg.show({
                        title: 'System Message - SUCCESS',
                        msg: get_msg("msg_ok_add"),
                        width: 300,
                        buttons: Ext.Msg.YESNO,
                        buttonText:{
                            yes: "계속 추가",
                            no: "닫기"
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
                Ext.getCmp("fm_isakmp").getForm().reset();
                if(me.cc === true){
                    Ext.getCmp("isa_encpt_cc").setValue('seed');
                    Ext.getCmp("isa_auth_cc").setValue('sha256');
                    Ext.getCmp("isa_group").setValue('modp2048');
                }
                Ext.ComponentQuery.query('label[cls="errorBox"]').forEach(function(cls){ cls.hide(); });
                Ext.data.StoreManager.lookup("store_ipsecsa_obj").removeAll();
                Ext.getCmp("con_ipsecsa_obj").hide();
                Ext.data.StoreManager.lookup("store_enau_obj").removeAll();
                Ext.getCmp("con_enau_obj").hide();
            }
        }
    },

    edit_isakmp_security: function() {
        var me = this;

        var obj_d = Ext.getCmp("NFW2_ipsec_security_securityConf").obj_d.data;

        var obj = me.obj;
        var name = Ext.getCmp("isa_name").getValue();
        var _params = {};


        obj.cid = me.cid;

        delete obj_d.vpn.isakmpsa[me.name];
        obj_d.vpn.isakmpsa[name] = obj;

        var _params = {

            basename : Ext.encode("ipsec_conf"),
            obj : Ext.encode(obj_d)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params,
            function(reesponse){

                Ext.Msg.show({
                    title: 'System Message - SUCCESS',
                    msg: get_msg("msg_ok_edit"),
                    width: 300,
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });

                var win = Ext.getCmp("NFW2_ipsec_security_securityConf");
                win.get_securityConf();

                me.close();
            }
        );
    },

    init_isakmp_security: function() {
        var me = this;

        me.setTitle("ISAKMP SA 수정 - "+me.num);

        var mem_ipsecsa = Ext.getCmp("NFW2_ipsec_security_securityConf").mem_ipsecsa;

        var _params = {
            basename : Ext.encode("with_cid"),
            key : Ext.encode({'@cid':me.cid})
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(data){

                Ext.getCmp("isa_name").setValue(data.name);

                if(data.ver === "ikev1"){
                    Ext.getCmp("isa_ikev1").setValue(true);
                }else{
                    Ext.getCmp("isa_ikev2").setValue(true);
                }

                if(data.action === "initiator"){
                    Ext.getCmp("isa_initiator").setValue(true);
                }else{
                    Ext.getCmp("isa_responder").setValue(true);
                }

                if(data.authby === "psk"){
                    Ext.getCmp("isa_preshared").setValue(true);
                    Ext.getCmp("isa_psk").setValue(data.psk);
                }else{
                    Ext.getCmp("isa_cert").setValue(true);
                    Ext.getCmp("isa_cert_sel").setValue(data.cert_name);
                }

                if(data.mode === "main"){
                    Ext.getCmp("isa_main").setValue(true);
                }else{
                    Ext.getCmp("isa_agg").setValue(true);
                }

                Ext.getCmp("isa_dpd_sec").setValue(data.dpd_sec);
                Ext.getCmp("isa_dpd_cnt").setValue(data.dpd_cnt);

                if(me.cc === true){
                    Ext.getCmp("isa_encpt_cc").setValue(data.encpt);
                    Ext.getCmp("isa_auth_cc").setValue(data.auth);
                }else{
                    var _store_enau = Ext.data.StoreManager.lookup("store_enau_obj");
                    Ext.getCmp("con_enau_obj").show();

                    for(var i=0; i<data.algorithm.length; i++){
                        var obj = {
                            'name': data.algorithm[i].toUpperCase(),
                            'val': data.algorithm[i]
                        };
                        _store_enau.add(obj);
                    }
                }
                Ext.getCmp("isa_group").setValue(data.group);
                Ext.getCmp("isa_lifetime").setValue(data.lifetime);

                if(data.force_natt === "on"){
                    Ext.getCmp("isa_force").setValue(true);
                }

                var ipsecsa_obj = data.ipsecsa_obj.split(",");
                var _store = Ext.data.StoreManager.lookup("store_ipsecsa_obj");

                Ext.getCmp("con_ipsecsa_obj").show();

                for(var i=0; i<ipsecsa_obj.length; i++){

                    var obj = {
                        'name': mem_ipsecsa[ipsecsa_obj[i]],
                        'cid': ipsecsa_obj[i]
                    };
                    _store.add(obj);
                }

                Ext.getCmp("timeout").setValue(data.tunnel_timeout);
                if(data.Xauth_serv === "on"){
                    Ext.getCmp("xauth_serv").setValue(true);
                    if(data.Xauth_certi === "local"){
                        Ext.getCmp("xauth_local").setValue(true);
                    }else{
                        Ext.getCmp("xauth_remote").setValue(true);
                    }
                    Ext.getCmp("ip_pool").setValue(data.ip_pool);
                    Ext.getCmp("dns").setValue(data.dns);
                }

            }
        );


    }

});