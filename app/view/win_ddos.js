
Ext.define('NFW2.view.win_ddos', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.slider.Single',
        'Ext.form.field.ComboBox',
        'Ext.form.FieldSet',
        'Ext.button.Button'
    ],

    id: 'win_ddos',
    autoScroll: true,
    title: '프로파일 추가',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    border: false,
                    id: 'fm',
                    autoScroll: true,
                    bodyPadding: 10,
                    titleCollapse: true,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            id: 'topG',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    id: 'LeftArea',
                                    margin: '0 17 0 0',
                                    layout: 'anchor',
                                    items: [
                                        {
                                            xtype: 'container',
                                            id: 'ddos_nameG',
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
                                                    id: 'ddos_name',
                                                    margin: '0 0 10 0',
                                                    width: 350,
                                                    fieldLabel: '프로파일 이름',
                                                    labelCls: 'lb_sq',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    enforceMaxLength: true,
                                                    maxLength: 31,
                                                    minLength: 1,
                                                    listeners: {
                                                        errorchange: {
                                                            fn: me.onDdos_nameErrorChange,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    flex: 1,
                                                    cls: 'errorBox',
                                                    hidden: true,
                                                    id: 'errorBox1'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            id: 'setting_chk',
                                            margin: '0 0 10 0',
                                            fieldLabel: '자동 학습',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            boxLabel: '사용',
                                            boxLabelCls: 'lb_box',
                                            listeners: {
                                                change: {
                                                    fn: me.onSetting_chkChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            disabled: true,
                                            id: 'timesliceG',
                                            margin: '0 0 10 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: 'timeslice_str',
                                                    width: 170,
                                                    fieldLabel: '학습 단위 구간',
                                                    labelCls: 'lb_sq',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'label',
                                                    cls: 'mt_info',
                                                    id: 'unit1',
                                                    text: '분'
                                                },
                                                {
                                                    xtype: 'slider',
                                                    id: 'timeslice',
                                                    margin: '0 10',
                                                    width: 150,
                                                    hideLabel: true,
                                                    labelSeparator: ' ',
                                                    value: 10,
                                                    maxValue: 10,
                                                    minValue: 1,
                                                    listeners: {
                                                        change: {
                                                            fn: me.onTimesliceChange,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            id: 'detection_clientG',
                                            margin: '0 0 10 0',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    id: 'detection_client',
                                                    margin: '0 0 10 0',
                                                    width: 220,
                                                    fieldLabel: '1:N 탐지/차단',
                                                    labelCls: 'lb_sq',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    editable: false,
                                                    store: 'store_detection',
                                                    valueField: 'value',
                                                    listeners: {
                                                        change: {
                                                            fn: me.onDetection_clientChange,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    id: 'cli_interceptionG',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                var retValue1 = ValidNum(value);
                                                                var retValue2 = LengthCheck(value, 1, 2592000);

                                                                if(!retValue1){ return get_msg("err_form"); }
                                                                if(!retValue2){ return ValidLimit(1, 2592000); }

                                                                return true;
                                                            },
                                                            id: 'cli_interception',
                                                            margin: '0 0 0 10',
                                                            width: 130,
                                                            fieldLabel: '차단 시간',
                                                            labelCls: 'lb_noimg',
                                                            labelSeparator: ' ',
                                                            labelWidth: 60,
                                                            msgTarget: 'none',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9.]/,
                                                            maxLength: 7,
                                                            minLength: 1,
                                                            listeners: {
                                                                errorchange: {
                                                                    fn: me.onCli_interceptionErrorChange,
                                                                    scope: me
                                                                },
                                                                keydown: {
                                                                    fn: me.onCli_interceptionKeydown,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            cls: 'mt_info',
                                                            id: 'unit3',
                                                            text: '초'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'user_score_clt_use',
                                                    margin: '0 0 0 10',
                                                    fieldLabel: '임계치',
                                                    labelCls: 'lb_noimg',
                                                    labelSeparator: ' ',
                                                    labelWidth: 40,
                                                    boxLabel: '설정',
                                                    boxLabelCls: 'lb_box',
                                                    listeners: {
                                                        change: {
                                                            fn: me.onUser_score_clt_useChange,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'label',
                                            cls: 'errorBox',
                                            hidden: true,
                                            id: 'errorBox2',
                                            margin: '-10 0 0 125'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    id: 'RightArea',
                                    margin: '0 0 0 17',
                                    layout: 'anchor',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: 'profile_info',
                                            margin: '0 0 10 0',
                                            width: 470,
                                            fieldLabel: '설명',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            enforceMaxLength: true,
                                            maxLength: 63
                                        },
                                        {
                                            xtype: 'combobox',
                                            id: 'detectiondelicacy',
                                            margin: '0 0 10 0',
                                            width: 220,
                                            fieldLabel: '탐지 민감도',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            editable: false,
                                            store: 'store_detectiondelicacy',
                                            valueField: 'value'
                                        },
                                        {
                                            xtype: 'container',
                                            disabled: true,
                                            id: 'learninghourG',
                                            margin: '0 0 10 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: 'learninghour_str',
                                                    width: 170,
                                                    fieldLabel: '학습 기간',
                                                    labelCls: 'lb_sq',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'label',
                                                    cls: 'mt_info',
                                                    id: 'unit2',
                                                    text: '일'
                                                },
                                                {
                                                    xtype: 'slider',
                                                    id: 'learninghour',
                                                    margin: '0 10',
                                                    width: 150,
                                                    hideLabel: true,
                                                    labelSeparator: ' ',
                                                    value: 15,
                                                    maxValue: 30,
                                                    minValue: 1,
                                                    listeners: {
                                                        change: {
                                                            fn: me.onLearninghourChange,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            id: 'detection_serverG',
                                            margin: '0 0 10 0',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    id: 'detection_server',
                                                    margin: '0 0 10 0',
                                                    width: 220,
                                                    fieldLabel: 'N:1 탐지/차단',
                                                    labelCls: 'lb_sq',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    editable: false,
                                                    store: 'store_detection',
                                                    valueField: 'value',
                                                    listeners: {
                                                        change: {
                                                            fn: me.onDetection_serverChange,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    id: 'svr_interceptionG',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                var retValue1 = ValidNum(value);
                                                                var retValue2 = LengthCheck(value, 1, 2592000);

                                                                if(!retValue1){ return get_msg("err_form"); }
                                                                if(!retValue2){ return ValidLimit(1, 2592000); }

                                                                return true;
                                                            },
                                                            id: 'svr_interception',
                                                            margin: '0 0 0 10',
                                                            width: 130,
                                                            fieldLabel: '차단 시간',
                                                            labelCls: 'lb_noimg',
                                                            labelSeparator: ' ',
                                                            labelWidth: 60,
                                                            msgTarget: 'none',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9.]/,
                                                            maxLength: 7,
                                                            minLength: 1,
                                                            listeners: {
                                                                keydown: {
                                                                    fn: me.onSvr_interceptionKeydown,
                                                                    scope: me
                                                                },
                                                                errorchange: {
                                                                    fn: me.onSvr_interceptionErrorChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            cls: 'mt_info',
                                                            id: 'unit4',
                                                            text: '초'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'user_score_svr_use',
                                                    margin: '0 0 0 10',
                                                    fieldLabel: '임계치',
                                                    labelCls: 'lb_noimg',
                                                    labelSeparator: ' ',
                                                    labelWidth: 40,
                                                    boxLabel: '설정',
                                                    boxLabelCls: 'lb_box',
                                                    listeners: {
                                                        change: {
                                                            fn: me.onUser_score_svr_useChange,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'label',
                                            cls: 'errorBox',
                                            hidden: true,
                                            id: 'errorBox3',
                                            margin: '-10 0 0 125'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            id: 'middleG',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    hidden: true,
                                    id: 'cltGroup',
                                    padding: '7 10 10 5',
                                    title: '단일 세션 공격 임계치 설정 (0은 auto 설정입니다 : 0~200,000,000)',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            id: 'clt_useG_V',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    id: 'clt_useG',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            id: 'clt_icmpG',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        //var retValue1 = ValidNum(value);
                                                                        var retValue2 = LengthCheck(value, 0, 200000000);

                                                                        //if(!retValue1){ return get_msg("err_form"); }
                                                                        if(!retValue2){ return ValidLimit(0, 200000000); }

                                                                        return true;
                                                                    },
                                                                    id: 'clt_icmp',
                                                                    margin: '0 0 0 10',
                                                                    width: 135,
                                                                    fieldLabel: 'ICMP',
                                                                    labelCls: 'lb_arrow',
                                                                    labelSeparator: ' ',
                                                                    labelWidth: 45,
                                                                    msgTarget: 'none',
                                                                    enableKeyEvents: true,
                                                                    maskRe: /[0-9.]/,
                                                                    listeners: {
                                                                        errorchange: {
                                                                            fn: me.onClt_icmpErrorChange,
                                                                            scope: me
                                                                        },
                                                                        keydown: {
                                                                            fn: me.onClt_icmpKeydown,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    cls: 'mt_info',
                                                                    id: 'unit5',
                                                                    text: 'pps'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            id: 'clt_igmpG',
                                                            margin: '0 0 0 10',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        //var retValue1 = ValidNum(value);
                                                                        var retValue2 = LengthCheck(value, 0, 200000000);

                                                                        //if(!retValue1){ return get_msg("err_form"); }
                                                                        if(!retValue2){ return ValidLimit(0, 200000000); }

                                                                        return true;
                                                                    },
                                                                    id: 'clt_igmp',
                                                                    margin: '0 0 0 10',
                                                                    width: 135,
                                                                    fieldLabel: 'IGMP',
                                                                    labelCls: 'lb_arrow',
                                                                    labelSeparator: ' ',
                                                                    labelWidth: 45,
                                                                    msgTarget: 'none',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maskRe: /[0-9.]/,
                                                                    maxLength: 9,
                                                                    listeners: {
                                                                        errorchange: {
                                                                            fn: me.onClt_igmpErrorChange,
                                                                            scope: me
                                                                        },
                                                                        keydown: {
                                                                            fn: me.onClt_igmpKeydown,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    cls: 'mt_info',
                                                                    id: 'unit6',
                                                                    text: 'pps'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            id: 'clt_udpG',
                                                            margin: '0 0 0 10',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        //var retValue1 = ValidNum(value);
                                                                        var retValue2 = LengthCheck(value, 0, 200000000);

                                                                        //if(!retValue1){ return get_msg("err_form"); }
                                                                        if(!retValue2){ return ValidLimit(0, 200000000); }

                                                                        return true;
                                                                    },
                                                                    id: 'clt_udp',
                                                                    margin: '0 0 0 10',
                                                                    width: 135,
                                                                    fieldLabel: 'UDP',
                                                                    labelCls: 'lb_arrow',
                                                                    labelSeparator: ' ',
                                                                    labelWidth: 45,
                                                                    msgTarget: 'none',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maskRe: /[0-9.]/,
                                                                    maxLength: 9,
                                                                    listeners: {
                                                                        keydown: {
                                                                            fn: me.onClt_udpKeydown,
                                                                            scope: me
                                                                        },
                                                                        errorchange: {
                                                                            fn: me.onClt_udpErrorChange,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    cls: 'mt_info',
                                                                    id: 'unit7',
                                                                    text: 'pps'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            id: 'clt_dnsG',
                                                            margin: '0 0 0 10',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        //var retValue1 = ValidNum(value);
                                                                        var retValue2 = LengthCheck(value, 0, 200000000);

                                                                        //if(!retValue1){ return get_msg("err_form"); }
                                                                        if(!retValue2){ return ValidLimit(0, 200000000); }

                                                                        return true;
                                                                    },
                                                                    id: 'clt_dns',
                                                                    margin: '0 0 0 10',
                                                                    width: 135,
                                                                    fieldLabel: 'DNS',
                                                                    labelCls: 'lb_arrow',
                                                                    labelSeparator: ' ',
                                                                    labelWidth: 45,
                                                                    msgTarget: 'none',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maskRe: /[0-9.]/,
                                                                    maxLength: 9,
                                                                    listeners: {
                                                                        keydown: {
                                                                            fn: me.onClt_dnsKeydown,
                                                                            scope: me
                                                                        },
                                                                        errorchange: {
                                                                            fn: me.onClt_dnsErrorChange,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    cls: 'mt_info',
                                                                    id: 'unit8',
                                                                    text: 'pps'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            id: 'clt_dhcpG',
                                                            margin: '0 0 0 10',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        //var retValue1 = ValidNum(value);
                                                                        var retValue2 = LengthCheck(value, 0, 200000000);

                                                                        //if(!retValue1){ return get_msg("err_form"); }
                                                                        if(!retValue2){ return ValidLimit(0, 200000000); }

                                                                        return true;
                                                                    },
                                                                    id: 'clt_dhcp',
                                                                    margin: '0 0 0 10',
                                                                    width: 135,
                                                                    fieldLabel: 'DHCP',
                                                                    labelCls: 'lb_arrow',
                                                                    labelSeparator: ' ',
                                                                    labelWidth: 45,
                                                                    msgTarget: 'none',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maskRe: /[0-9.]/,
                                                                    maxLength: 9,
                                                                    listeners: {
                                                                        keydown: {
                                                                            fn: me.onClt_dhcpKeydown,
                                                                            scope: me
                                                                        },
                                                                        errorchange: {
                                                                            fn: me.onClt_dhcpErrorChange,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    cls: 'mt_info',
                                                                    id: 'unit9',
                                                                    text: 'pps'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: 'btn_clt_initialize',
                                                    margin: '0 0 0 15',
                                                    width: 70,
                                                    text: '초기화',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onBtn_clt_initializeClick,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            cls: 'errorBox',
                                            hidden: true,
                                            id: 'errorBox4'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    hidden: true,
                                    id: 'svrGroup',
                                    padding: '7 10 10 5',
                                    title: '다수 세션 공격 임계치 설정 (0은 auto 설정입니다 : 0~200,000,000)',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            id: 'svr_useG_V',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    id: 'svr_useG',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            id: 'svr_icmpG',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        //var retValue1 = ValidNum(value);
                                                                        var retValue2 = LengthCheck(value, 0, 200000000);

                                                                        //if(!retValue1){ return get_msg("err_form"); }
                                                                        if(!retValue2){ return ValidLimit(0, 200000000); }

                                                                        return true;
                                                                    },
                                                                    id: 'svr_icmp',
                                                                    margin: '0 0 0 10',
                                                                    width: 135,
                                                                    fieldLabel: 'ICMP',
                                                                    labelCls: 'lb_arrow',
                                                                    labelSeparator: ' ',
                                                                    labelWidth: 45,
                                                                    msgTarget: 'none',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maskRe: /[0-9.]/,
                                                                    maxLength: 9,
                                                                    listeners: {
                                                                        errorchange: {
                                                                            fn: me.onClt_icmpErrorChange1,
                                                                            scope: me
                                                                        },
                                                                        keydown: {
                                                                            fn: me.onClt_icmpKeydown1,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    cls: 'mt_info',
                                                                    id: 'unit10',
                                                                    text: 'pps'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            id: 'svr_igmpG',
                                                            margin: '0 0 0 10',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        //var retValue1 = ValidNum(value);
                                                                        var retValue2 = LengthCheck(value, 0, 200000000);

                                                                        //if(!retValue1){ return get_msg("err_form"); }
                                                                        if(!retValue2){ return ValidLimit(0, 200000000); }

                                                                        return true;
                                                                    },
                                                                    id: 'svr_igmp',
                                                                    margin: '0 0 0 10',
                                                                    width: 135,
                                                                    fieldLabel: 'IGMP',
                                                                    labelCls: 'lb_arrow',
                                                                    labelSeparator: ' ',
                                                                    labelWidth: 45,
                                                                    msgTarget: 'none',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maskRe: /[0-9.]/,
                                                                    maxLength: 9,
                                                                    listeners: {
                                                                        errorchange: {
                                                                            fn: me.onClt_igmpErrorChange1,
                                                                            scope: me
                                                                        },
                                                                        keydown: {
                                                                            fn: me.onClt_igmpKeydown1,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    cls: 'mt_info',
                                                                    id: 'unit11',
                                                                    text: 'pps'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            id: 'svr_udpG',
                                                            margin: '0 0 0 10',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        //var retValue1 = ValidNum(value);
                                                                        var retValue2 = LengthCheck(value, 0, 200000000);

                                                                        //if(!retValue1){ return get_msg("err_form"); }
                                                                        if(!retValue2){ return ValidLimit(0, 200000000); }

                                                                        return true;
                                                                    },
                                                                    id: 'svr_udp',
                                                                    margin: '0 0 0 10',
                                                                    width: 135,
                                                                    fieldLabel: 'UDP',
                                                                    labelCls: 'lb_arrow',
                                                                    labelSeparator: ' ',
                                                                    labelWidth: 45,
                                                                    msgTarget: 'none',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maskRe: /[0-9.]/,
                                                                    maxLength: 9,
                                                                    listeners: {
                                                                        keydown: {
                                                                            fn: me.onClt_udpKeydown1,
                                                                            scope: me
                                                                        },
                                                                        errorchange: {
                                                                            fn: me.onClt_udpErrorChange1,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    cls: 'mt_info',
                                                                    id: 'unit12',
                                                                    text: 'pps'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            id: 'svr_dnsG',
                                                            margin: '0 0 0 10',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        //var retValue1 = ValidNum(value);
                                                                        var retValue2 = LengthCheck(value, 0, 200000000);

                                                                        //if(!retValue1){ return get_msg("err_form"); }
                                                                        if(!retValue2){ return ValidLimit(0, 200000000); }

                                                                        return true;
                                                                    },
                                                                    id: 'svr_dns',
                                                                    margin: '0 0 0 10',
                                                                    width: 135,
                                                                    fieldLabel: 'DNS',
                                                                    labelCls: 'lb_arrow',
                                                                    labelSeparator: ' ',
                                                                    labelWidth: 45,
                                                                    msgTarget: 'none',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maskRe: /[0-9.]/,
                                                                    maxLength: 9,
                                                                    listeners: {
                                                                        keydown: {
                                                                            fn: me.onClt_dnsKeydown1,
                                                                            scope: me
                                                                        },
                                                                        errorchange: {
                                                                            fn: me.onClt_dnsErrorChange1,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    cls: 'mt_info',
                                                                    id: 'unit13',
                                                                    text: 'pps'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            id: 'svr_dhcpG',
                                                            margin: '0 0 0 10',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        //var retValue1 = ValidNum(value);
                                                                        var retValue2 = LengthCheck(value, 0, 200000000);

                                                                        //if(!retValue1){ return get_msg("err_form"); }
                                                                        if(!retValue2){ return ValidLimit(0, 200000000); }

                                                                        return true;
                                                                    },
                                                                    id: 'svr_dhcp',
                                                                    margin: '0 0 0 10',
                                                                    width: 135,
                                                                    fieldLabel: 'DHCP',
                                                                    labelCls: 'lb_arrow',
                                                                    labelSeparator: ' ',
                                                                    labelWidth: 45,
                                                                    msgTarget: 'none',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maskRe: /[0-9.]/,
                                                                    maxLength: 9,
                                                                    listeners: {
                                                                        keydown: {
                                                                            fn: me.onClt_dhcpKeydown1,
                                                                            scope: me
                                                                        },
                                                                        errorchange: {
                                                                            fn: me.onClt_dhcpErrorChange1,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    cls: 'mt_info',
                                                                    id: 'unit14',
                                                                    text: 'pps'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: 'btn_svr_initialize',
                                                    margin: '0 0 0 15',
                                                    width: 70,
                                                    text: '초기화',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onBtn_svr_initializeClick,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            cls: 'errorBox',
                                            hidden: true,
                                            id: 'errorBox5'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            id: 'btnGroup2',
                            margin: '10 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretchmax',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    hidden: true,
                                    id: 'btn_pop_prev',
                                    width: 30,
                                    text: '<',
                                    listeners: {
                                        click: {
                                            fn: me.on_btn_pop_prev,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    hidden: true,
                                    id: 'btn_pop_next',
                                    margin: '0 5 0 5',
                                    width: 30,
                                    text: '>',
                                    listeners: {
                                        click: {
                                            fn: me.on_btn_pop_next,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'btn_submit',
                                    width: 100,
                                    text: '확인',
                                    listeners: {
                                        click: {
                                            fn: me.onBtn_submitClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'btn_reset',
                                    margin: '0 0 0 5',
                                    width: 100,
                                    text: '취소',
                                    listeners: {
                                        click: {
                                            fn: me.onBtn_resetClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    listeners: {
                        afterrender: {
                            fn: me.onFrm_addAfterRender,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    onDdos_nameErrorChange: function(labelable, error, eOpts) {
        var errUI = Ext.getCmp('errorBox1');

        if (error) {
            // show error element, don't esape any HTML formatting provided
            errUI.setText(error,false);
            errUI.show();
        } else {
            // hide error element
            errUI.hide();
        }
    },

    onSetting_chkChange: function(field, newValue, oldValue, eOpts) {
        //console.log(newValue);

        if(newValue === true){

            Ext.getCmp('timesliceG').enable();
            Ext.getCmp('learninghourG').enable();

        }else{

            Ext.getCmp('timesliceG').disable();
            Ext.getCmp('learninghourG').disable();

        }
    },

    onTimesliceChange: function(slider, newValue, thumb, eOpts) {
        //console.log(newValue);

        Ext.getCmp('timeslice_str').setValue(newValue);

    },

    onDetection_clientChange: function(field, newValue, oldValue, eOpts) {
        //console.log(newValue);

        if(newValue === 2){

            Ext.getCmp('cli_interceptionG').enable();

        }else{

            Ext.getCmp('cli_interceptionG').disable();

        }
    },

    onCli_interceptionErrorChange: function(labelable, error, eOpts) {
        var errUI = Ext.getCmp('errorBox2');

        if (error) {
            // show error element, don't esape any HTML formatting provided
            errUI.setText(error, false);
            errUI.show();
        } else {
            // hide error element
            errUI.hide();
        }
    },

    onCli_interceptionKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(ValidNumKeydown(code) === false){
            e.stopEvent();
        }

    },

    onUser_score_clt_useChange: function(field, newValue, oldValue, eOpts) {
        //console.log(newValue);

        if(newValue === true){

            Ext.getCmp('cltGroup').show();

        }else{

            Ext.getCmp('cltGroup').hide();

        }
    },

    onLearninghourChange: function(slider, newValue, thumb, eOpts) {
        //console.log(newValue);

        Ext.getCmp('learninghour_str').setValue(newValue);

    },

    onDetection_serverChange: function(field, newValue, oldValue, eOpts) {
        //console.log(newValue);

        if(newValue === 2){

            Ext.getCmp('svr_interceptionG').enable();

        }else{

            Ext.getCmp('svr_interceptionG').disable();

        }
    },

    onSvr_interceptionKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(ValidNumKeydown(code) === false){
            e.stopEvent();
        }

    },

    onSvr_interceptionErrorChange: function(labelable, error, eOpts) {
        var errUI = Ext.getCmp('errorBox3');

        if (error) {
            // show error element, don't esape any HTML formatting provided
            errUI.setText(error, false);
            errUI.show();
        } else {
            // hide error element
            errUI.hide();
        }
    },

    onUser_score_svr_useChange: function(field, newValue, oldValue, eOpts) {
        //console.log(newValue);

        if(newValue === true){

            Ext.getCmp('svrGroup').show();

        }else{

            Ext.getCmp('svrGroup').hide();

        }
    },

    onClt_icmpErrorChange: function(labelable, error, eOpts) {
        var errUI = Ext.getCmp('errorBox4');

        if (error) {
            // show error element, don't esape any HTML formatting provided
            errUI.setText(error, false);
            errUI.show();
        } else {
            // hide error element
            errUI.hide();
        }
    },

    onClt_icmpKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(ValidNumKeydown(code) === false){
            e.stopEvent();
        }

    },

    onClt_igmpErrorChange: function(labelable, error, eOpts) {
        var errUI = Ext.getCmp('errorBox4');

        if (error) {
            // show error element, don't esape any HTML formatting provided
            errUI.setText(error, false);
            errUI.show();
        } else {
            // hide error element
            errUI.hide();
        }
    },

    onClt_igmpKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(ValidNumKeydown(code) === false){
            e.stopEvent();
        }

    },

    onClt_udpKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(ValidNumKeydown(code) === false){
            e.stopEvent();
        }

    },

    onClt_udpErrorChange: function(labelable, error, eOpts) {
        var errUI = Ext.getCmp('errorBox4');

        if (error) {
            // show error element, don't esape any HTML formatting provided
            errUI.setText(error, false);
            errUI.show();
        } else {
            // hide error element
            errUI.hide();
        }
    },

    onClt_dnsKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(ValidNumKeydown(code) === false){
            e.stopEvent();
        }

    },

    onClt_dnsErrorChange: function(labelable, error, eOpts) {
        var errUI = Ext.getCmp('errorBox4');

        if (error) {
            // show error element, don't esape any HTML formatting provided
            errUI.setText(error, false);
            errUI.show();
        } else {
            // hide error element
            errUI.hide();
        }
    },

    onClt_dhcpKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(ValidNumKeydown(code) === false){
            e.stopEvent();
        }

    },

    onClt_dhcpErrorChange: function(labelable, error, eOpts) {
        var errUI = Ext.getCmp('errorBox4');

        if (error) {
            // show error element, don't esape any HTML formatting provided
            errUI.setText(error, false);
            errUI.show();
        } else {
            // hide error element
            errUI.hide();
        }
    },

    onBtn_clt_initializeClick: function(button, e, eOpts) {
        Ext.getCmp('clt_icmp').setValue('auto');
        Ext.getCmp('clt_igmp').setValue('auto');
        Ext.getCmp('clt_udp').setValue('auto');
        Ext.getCmp('clt_dns').setValue('auto');
        Ext.getCmp('clt_dhcp').setValue('auto');

    },

    onClt_icmpErrorChange1: function(labelable, error, eOpts) {
        var errUI = Ext.getCmp('errorBox5');

        if (error) {
            // show error element, don't esape any HTML formatting provided
            errUI.setText(error, false);
            errUI.show();
        } else {
            // hide error element
            errUI.hide();
        }
    },

    onClt_icmpKeydown1: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(ValidNumKeydown(code) === false){
            e.stopEvent();
        }

    },

    onClt_igmpErrorChange1: function(labelable, error, eOpts) {
        var errUI = Ext.getCmp('errorBox5');

        if (error) {
            // show error element, don't esape any HTML formatting provided
            errUI.setText(error, false);
            errUI.show();
        } else {
            // hide error element
            errUI.hide();
        }
    },

    onClt_igmpKeydown1: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(ValidNumKeydown(code) === false){
            e.stopEvent();
        }

    },

    onClt_udpKeydown1: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(ValidNumKeydown(code) === false){
            e.stopEvent();
        }

    },

    onClt_udpErrorChange1: function(labelable, error, eOpts) {
        var errUI = Ext.getCmp('errorBox5');

        if (error) {
            // show error element, don't esape any HTML formatting provided
            errUI.setText(error, false);
            errUI.show();
        } else {
            // hide error element
            errUI.hide();
        }
    },

    onClt_dnsKeydown1: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(ValidNumKeydown(code) === false){
            e.stopEvent();
        }

    },

    onClt_dnsErrorChange1: function(labelable, error, eOpts) {
        var errUI = Ext.getCmp('errorBox5');

        if (error) {
            // show error element, don't esape any HTML formatting provided
            errUI.setText(error, false);
            errUI.show();
        } else {
            // hide error element
            errUI.hide();
        }
    },

    onClt_dhcpKeydown1: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(ValidNumKeydown(code) === false){
            e.stopEvent();
        }

    },

    onClt_dhcpErrorChange1: function(labelable, error, eOpts) {
        var errUI = Ext.getCmp('errorBox5');

        if (error) {
            // show error element, don't esape any HTML formatting provided
            errUI.setText(error, false);
            errUI.show();
        } else {
            // hide error element
            errUI.hide();
        }
    },

    onBtn_svr_initializeClick: function(button, e, eOpts) {
        Ext.getCmp('svr_icmp').setValue('auto');
        Ext.getCmp('svr_igmp').setValue('auto');
        Ext.getCmp('svr_udp').setValue('auto');
        Ext.getCmp('svr_dns').setValue('auto');
        Ext.getCmp('svr_dhcp').setValue('auto');
    },

    on_btn_pop_prev: function(button, e, eOpts) {
        var tbl = Ext.getCmp("ddos_profile_list");
        var store = tbl.getStore();

        var prevcid = store.getAt(this.idx - 1).data["@cid"];


    },

    on_btn_pop_next: function(button, e, eOpts) {

    },

    onBtn_submitClick: function(button, e, eOpts) {
        var me = this;

        var str = ['ddos_name','cli_interception','svr_interception',
                   'clt_icmp','clt_igmp','clt_udp','clt_dns','clt_dhcp',
                   'svr_icmp','svr_igmp','svr_udp','svr_dns','svr_dhcp'];

        var valid_id = new Array(str.length);

        for(var i=0; i<str.length; i++){

            valid_id[i] = Ext.getCmp(str[i]);

            if(valid_id[i].validateValue() === false){ return false; }
        }


        var ddos_profile = new Object();
            ddos_profile["@cid"] = me.cid;
            ddos_profile.name = Ext.getCmp("ddos_name").getValue();
            ddos_profile.profile_info = Ext.getCmp("profile_info").getValue();
            ddos_profile.setting = new Object();
            if(Ext.getCmp("setting_chk").getValue()){

                ddos_profile.setting["@chk_autolearn"] = "on";

            }else{

                ddos_profile.setting["@chk_autolearn"] = "off";

            }

            ddos_profile.timeslice = parseInt(Ext.getCmp("timeslice").getValue());
            ddos_profile.learninghour = parseInt(Ext.getCmp("learninghour").getValue());
            ddos_profile.detectiondelicacy = Ext.getCmp("detectiondelicacy").getValue();
            ddos_profile.detection_client = parseInt(Ext.getCmp("detection_client").getValue());
            ddos_profile.cli_interception = parseInt(Ext.getCmp("cli_interception").getValue());
            ddos_profile.detection_server = parseInt(Ext.getCmp("detection_server").getValue());
            ddos_profile.svr_interception = parseInt(Ext.getCmp("svr_interception").getValue());
            ddos_profile.user_score = new Object();
            if(Ext.getCmp("user_score_clt_use").getValue()){

                ddos_profile.user_score["@clt_use"] = "on";

            }else{

                ddos_profile.user_score["@clt_use"] = "off";

            }
            ddos_profile.user_score.clt_icmp = parseInt(me.get_chk_auto(Ext.getCmp("clt_icmp").getValue()));
            ddos_profile.user_score.clt_igmp = parseInt(me.get_chk_auto(Ext.getCmp("clt_igmp").getValue()));
            ddos_profile.user_score.clt_udp = parseInt(me.get_chk_auto(Ext.getCmp("clt_udp").getValue()));
            ddos_profile.user_score.clt_dns = parseInt(me.get_chk_auto(Ext.getCmp("clt_dns").getValue()));
            ddos_profile.user_score.clt_dhcp = parseInt(me.get_chk_auto(Ext.getCmp("clt_dhcp").getValue()));

            if(Ext.getCmp("user_score_svr_use").getValue()){

                ddos_profile.user_score["@svr_use"] = "on";

            }else{

                ddos_profile.user_score["@svr_use"] = "off";

            }
            ddos_profile.user_score.svr_icmp = parseInt(me.get_chk_auto(Ext.getCmp("svr_icmp").getValue()));
            ddos_profile.user_score.svr_igmp = parseInt(me.get_chk_auto(Ext.getCmp("svr_igmp").getValue()));
            ddos_profile.user_score.svr_udp = parseInt(me.get_chk_auto(Ext.getCmp("svr_udp").getValue()));
            ddos_profile.user_score.svr_dns = parseInt(me.get_chk_auto(Ext.getCmp("svr_dns").getValue()));
            ddos_profile.user_score.svr_dhcp = parseInt(me.get_chk_auto(Ext.getCmp("svr_dhcp").getValue()));

            var update = (this.edit === "edit")? true:false;

            var _params = {

                ddos_profile : Ext.encode(ddos_profile),
                update_flag : Ext.encode(update)
            };

        Ext.data.JsonP.request({

            url : "/api/ftuctrl/set_ddos_profile",

            params : _params,

            success : function(response){

                if(response.retcode === true){

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
                            fn: me.set_WinState,
                            icon: Ext.window.MessageBox.INFO
                        });

                    }

                    var _store = Ext.data.StoreManager.lookup('store_ddos_profile_list');
                        _store.load();

                }else{

                    if(response.errcode === 51102){

                        var _params2 = {

                            filename: Ext.encode('/proc/ferret/datasheet/ddos_profile')
                        };

                        request_helper.xmlrpc_call_JsonP(

                            'ftuctrl',
                            'getFileContent',
                            _params2,

                            function(response){

                                Ext.Msg.alert("",ValidMaxCnt(response[0]));
                                return false;

                            }
                        );

                    }else if(response.errcode === 51103){

                        Ext.Msg.alert("",get_msg("err_pnamedob"));
                        return false;

                    }else{

                        prt_errMsg(response.errmsg, null);
                    }

                }

            },

            failure : function(response){

                console.log("fail");

            }

        });
    },

    onBtn_resetClick: function(button, e, eOpts) {
        this.close();
    },

    onFrm_addAfterRender: function(component, eOpts) {
        if(this.edit === "edit"){

            this.init_edit_ddos(this.cid,this.num,this.name);

        }else{

            this.init_add_ddos();
        }
    },

    init_add_ddos: function() {
        var me = this;

        Ext.data.JsonP.request({

            url : "/api/ftuctrl/get_ddos_profile",
            success : function(response){

                if(response.retcode === true){

                    //console.log(response.retval);

                    if(response.retval === null || typeof response.retval === 'undefined'){

                        Ext.getCmp('ddos_name').setValue('');
                        Ext.getCmp('profile_info').setValue('');
                        Ext.getCmp('setting_chk').setValue(false);

                        Ext.getCmp('timesliceG').disable();
                        Ext.getCmp('learninghourG').disable();

                        Ext.getCmp('timeslice').setValue(10);
                        Ext.getCmp('timeslice_str').setValue(Ext.getCmp('timeslice').getValue());
                        Ext.getCmp('learninghour').setValue(15);
                        Ext.getCmp('learninghour_str').setValue(Ext.getCmp('learninghour').getValue());

                        Ext.getCmp('detectiondelicacy').setValue('middle');
                        Ext.getCmp('detection_client').setValue(1);
                        Ext.getCmp('cli_interception').setValue(600);
                        Ext.getCmp('detection_server').setValue(1);
                        Ext.getCmp('svr_interception').setValue(600);
                        Ext.getCmp('user_score_clt_use').setValue(false);
                        Ext.getCmp('user_score_svr_use').setValue(false);

                        Ext.getCmp('cltGroup').hide();
                        Ext.getCmp('svrGroup').hide();

                        Ext.getCmp('clt_icmp').setValue('auto');
                        Ext.getCmp('clt_igmp').setValue('auto');
                        Ext.getCmp('clt_udp').setValue('auto');
                        Ext.getCmp('clt_dns').setValue('auto');
                        Ext.getCmp('clt_dhcp').setValue('auto');
                        Ext.getCmp('svr_icmp').setValue('auto');
                        Ext.getCmp('svr_igmp').setValue('auto');
                        Ext.getCmp('svr_udp').setValue('auto');
                        Ext.getCmp('svr_dns').setValue('auto');
                        Ext.getCmp('svr_dhcp').setValue('auto');

                    }else{

                        console.log(response.errmsg +":"+ response.errcode);
                    }

                }

            },
            failure : function(response){

                console.log(response.errmsg +":"+ response.errcode);

            }

        });
    },

    init_edit_ddos: function(cid, num, name) {
        var me = this;

        var _params = {
            "@cid" : Ext.encode(cid),
            "@num" : Ext.encode(num),
            "name" : Ext.encode(name)
        };

        Ext.data.JsonP.request({

            url : "/api/ftuctrl/get_ddos_profile",
            params : _params,
            success : function(response){

                if(response.retcode === true){

                    //console.log(response.retval);

                    me.setTitle("프로파일 수정 - " + me.num);

                    Ext.getCmp('ddos_name').setValue(response.retval.name);
                    Ext.getCmp('profile_info').setValue(response.retval.profile_info);

                    if(response.retval.setting["@chk_autolearn"] === 'on'){

                        Ext.getCmp('setting_chk').setValue(true);
                        Ext.getCmp('timesliceG').enable();
                        Ext.getCmp('learninghourG').enable();

                    }else{

                        Ext.getCmp('setting_chk').setValue(false);
                        Ext.getCmp('timesliceG').disable();
                        Ext.getCmp('learninghourG').disable();

                    }

                    Ext.getCmp('timeslice').setValue(response.retval.timeslice);
                    Ext.getCmp('timeslice_str').setValue(response.retval.timeslice);
                    Ext.getCmp('learninghour').setValue(response.retval.learninghour);
                    Ext.getCmp('learninghour_str').setValue(response.retval.learninghour);
                    Ext.getCmp('detectiondelicacy').setValue(response.retval.detectiondelicacy);
                    Ext.getCmp('detection_client').setValue(response.retval.detection_client);
                    Ext.getCmp('cli_interception').setValue(response.retval.cli_interception);
                    Ext.getCmp('detection_server').setValue(response.retval.detection_server);
                    Ext.getCmp('svr_interception').setValue(response.retval.svr_interception);

                    if(response.retval.user_score["@clt_use"] === 'on'){

                        Ext.getCmp('user_score_clt_use').setValue(true);
                        Ext.getCmp('cltGroup').show();

                    }else{

                        Ext.getCmp('user_score_clt_use').setValue(false);
                        Ext.getCmp('cltGroup').hide();

                    }

                    if(response.retval.user_score["@svr_use"] === 'on'){

                        Ext.getCmp('user_score_svr_use').setValue(true);
                        Ext.getCmp('svrGroup').show();

                    }else{

                        Ext.getCmp('user_score_svr_use').setValue(false);
                        Ext.getCmp('svrGroup').hide();

                    }

                    Ext.getCmp('clt_icmp').setValue(me.get_chk_zero(response.retval.user_score.clt_icmp));
                    Ext.getCmp('clt_igmp').setValue(me.get_chk_zero(response.retval.user_score.clt_igmp));
                    Ext.getCmp('clt_udp').setValue(me.get_chk_zero(response.retval.user_score.clt_udp));
                    Ext.getCmp('clt_dns').setValue(me.get_chk_zero(response.retval.user_score.clt_dns));
                    Ext.getCmp('clt_dhcp').setValue(me.get_chk_zero(response.retval.user_score.clt_dhcp));
                    Ext.getCmp('svr_icmp').setValue(me.get_chk_zero(response.retval.user_score.svr_icmp));
                    Ext.getCmp('svr_igmp').setValue(me.get_chk_zero(response.retval.user_score.svr_igmp));
                    Ext.getCmp('svr_udp').setValue(me.get_chk_zero(response.retval.user_score.svr_udp));
                    Ext.getCmp('svr_dns').setValue(me.get_chk_zero(response.retval.user_score.svr_dns));
                    Ext.getCmp('svr_dhcp').setValue(me.get_chk_zero(response.retval.user_score.svr_dhcp));


                }else{

                    console.log(response.errmsg +":"+ response.errcode);

                }

            },
            failure : function(response){

                console.log(response.errmsg +":"+ response.errcode);

            }

        });
    },

    get_chk_auto: function(value) {
        if(value === "auto" || value === ''){ return 0; }
        else{ return Ext.util.Format.number(value.replace(/[,]/g,''),'0'); }
    },

    get_chk_zero: function(value) {
        if(value === 0 || value === ''){ return "auto"; }
        else{ return Ext.util.Format.number(value,'000,000,000'); }
        //else{ return value; }
    },

    set_WinState: function(btn) {
        var me = this;
        var _store = Ext.data.StoreManager.lookup('store_ddos_profile_list');
        var win = Ext.WindowManager.getActive();

        if(btn === "no"){

            if(win){ win.close(); }

        }else{

            var _params = {

                filename: Ext.encode('/proc/ferret/datasheet/ddos_profile')
            };

            request_helper.xmlrpc_call_JsonP(

                'ftuctrl',
                'getFileContent',
                _params,

                function(response){

                    var Maxcnt = (_store.getTotalCount() >= response[0])? false:true;

                    if(Maxcnt === false){

                        Ext.Msg.alert("",ValidMaxCnt(response[0]));
                        win.close();
                        return false;

                    }else{

                        Ext.getCmp("fm").getForm().reset();
                        Ext.ComponentQuery.query('label[cls="errorBox"]').forEach(function(cls){ cls.hide(); });

                        Ext.data.JsonP.request({

                            url : "/api/ftuctrl/get_ddos_profile",
                            success : function(response){

                                if(response.retcode === true){

                                    //console.log(response.retval);

                                    if(response.retval === null || typeof response.retval === 'undefined'){

                                        Ext.getCmp('ddos_name').setValue('');
                                        Ext.getCmp('profile_info').setValue('');
                                        Ext.getCmp('setting_chk').setValue(false);

                                        Ext.getCmp('timesliceG').disable();
                                        Ext.getCmp('learninghourG').disable();

                                        Ext.getCmp('timeslice').setValue(10);
                                        Ext.getCmp('timeslice_str').setValue(Ext.getCmp('timeslice').getValue());
                                        Ext.getCmp('learninghour').setValue(15);
                                        Ext.getCmp('learninghour_str').setValue(Ext.getCmp('learninghour').getValue());

                                        Ext.getCmp('detectiondelicacy').setValue('middle');
                                        Ext.getCmp('detection_client').setValue(1);
                                        Ext.getCmp('cli_interception').setValue(600);
                                        Ext.getCmp('detection_server').setValue(1);
                                        Ext.getCmp('svr_interception').setValue(600);
                                        Ext.getCmp('user_score_clt_use').setValue(false);
                                        Ext.getCmp('user_score_svr_use').setValue(false);

                                        Ext.getCmp('cltGroup').hide();
                                        Ext.getCmp('svrGroup').hide();

                                        Ext.getCmp('clt_icmp').setValue('auto');
                                        Ext.getCmp('clt_igmp').setValue('auto');
                                        Ext.getCmp('clt_udp').setValue('auto');
                                        Ext.getCmp('clt_dns').setValue('auto');
                                        Ext.getCmp('clt_dhcp').setValue('auto');
                                        Ext.getCmp('svr_icmp').setValue('auto');
                                        Ext.getCmp('svr_igmp').setValue('auto');
                                        Ext.getCmp('svr_udp').setValue('auto');
                                        Ext.getCmp('svr_dns').setValue('auto');
                                        Ext.getCmp('svr_dhcp').setValue('auto');

                                    }else{

                                        console.log(response.errmsg +":"+ response.errcode);
                                    }

                                }

                            },
                            failure : function(response){

                                console.log(response.errmsg +":"+ response.errcode);
                            }

                        });
                    }
                }
            );
        }
    }

});