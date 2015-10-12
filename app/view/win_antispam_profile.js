
Ext.define('NFW2.view.win_antispam_profile', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_antispam_profile',

    requires: [
        'NFW2.view.win_antispam_profileViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.FieldSet',
        'Ext.form.Label',
        'Ext.Img',
        'Ext.form.field.Radio',
        'Ext.XTemplate',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'win_antispam_profile'
    },
    cls: 'zen_win',
    id: 'win_antispam_profile',
    maxHeight: 680,
    scrollable: {
        x: false,
        y: true
    },
    width: 830,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'fm_antispam',
            layout: 'auto',
            bodyPadding: 10,
            header: false,
            title: 'My Form',
            items: [
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
                                var me = Ext.getCmp('win_antispam_profile');
                                var store = Ext.data.StoreManager.lookup('store_antispam_list');
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(me.set_btn === true){
                                    if(me.edit === "edit"){
                                        var chk_num = 0;
                                        for(var i in store.data.items){
                                            if(store.data.items[i].data.name === Ext.getCmp('win_profile_name').getValue()){

                                                if(Number(i) !== Number(me.edit_index)){ chk_num++; }
                                            }
                                        }
                                        if(chk_num > 0){ return get_msg('err_objname'); }
                                    }
                                    else{
                                        for(var i in store.data.items){
                                            if(store.data.items[i].data.name === Ext.getCmp('win_profile_name').getValue()){ return get_msg('err_objname'); }
                                        }
                                    }
                                    me.set_btn = false;
                                }

                                return true;
                            },
                            fieldInfo: {
                                txt: __zen('character_tip')
                            },
                            id: 'win_profile_name',
                            width: 300,
                            labelCls: 'lb_req',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9a-zA-Z-_!@\#$%^&*()<>\/`~+,.:;\'\"?\[\]\{\}\\\|=]/,
                            maxLength: 20,
                            bind: {
                                fieldLabel: '{profile_name}'
                            },
                            listeners: {
                                errorchange: 'onWin_profile_nameErrorChange',
                                blur: 'onWin_profile_nameBlur',
                                keydown: 'onWin_profile_nameKeydown',
                                focus: 'onWin_profile_nameFocus'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
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
                                                        text: '{search_method}'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'profile_chk_1',
                                                    checked: true
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    width: 70,
                                                    bind: {
                                                        text: '{rbl}'
                                                    },
                                                    listeners: {
                                                        render: 'onLabelRender'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'profile_chk_2',
                                                    checked: true,
                                                    listeners: {
                                                        change: 'onProfile_chk_2Change'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    width: 120,
                                                    bind: {
                                                        text: '{baeyesian}'
                                                    },
                                                    listeners: {
                                                        render: 'onLabelRender1'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            id: 'antispam_point_con',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'image',
                                                    margin: '0 2 0 10',
                                                    maxHeight: 6,
                                                    width: 8,
                                                    src: '../images/bul_req.png'
                                                },
                                                {
                                                    xtype: 'label',
                                                    width: 145,
                                                    bind: {
                                                        text: '{spam_point}'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(Ext.getCmp('profile_chk_2').getValue()){
                                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                            if(!LengthCheck(value, 1, 100)){ return ValidLimit(1, 100); }
                                                        }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(1,
                                                        100,
                                                        null)
                                                    },
                                                    id: 'win_spam_point',
                                                    margin: '0 0 0 -8',
                                                    width: 80,
                                                    labelSeparator: ' ',
                                                    labelWidth: 122,
                                                    msgTarget: 'none',
                                                    value: '10',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 3,
                                                    listeners: {
                                                        errorchange: 'onTextfieldErrorChange',
                                                        keydown: 'onTextfieldKeydown',
                                                        blur: 'onWin_spam_pointBlur',
                                                        focus: 'onWin_spam_pointFocus'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '8 0 0 10',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            width: 170,
                                            bind: {
                                                text: '{handling_method}'
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'radiofield',
                                                            id: 'profile_radio_2',
                                                            checked: true,
                                                            listeners: {
                                                                change: 'onProfile_radio_2Change'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '3 0 0 5',
                                                            width: 150,
                                                            bind: {
                                                                text: '{detect_head}'
                                                            },
                                                            listeners: {
                                                                render: 'onLabelRender2'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(Ext.getCmp('profile_radio_2').getValue()){
                                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                }

                                                                return true;
                                                            },
                                                            fieldInfo: {
                                                                txt: __zen('character_tip')
                                                            },
                                                            id: 'antispam_find',
                                                            width: 200,
                                                            labelSeparator: ' ',
                                                            labelWidth: 120,
                                                            msgTarget: 'none',
                                                            value: '[SPAM]',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9a-zA-Z-_!@\#$%^&*()<>\/`~+,.:;\'\"?\[\]\{\}\\\|=]/,
                                                            maxLength: 20,
                                                            listeners: {
                                                                errorchange: 'onAntispam_findErrorChange',
                                                                blur: 'onAntispam_findBlur',
                                                                keydown: 'onAntispam_findKeydown',
                                                                focus: 'onAntispam_findFocus'
                                                            }
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
                                                            xtype: 'radiofield',
                                                            id: 'profile_radio_1',
                                                            listeners: {
                                                                change: 'onProfile_radio_1Change'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '3 0 0 5',
                                                            width: 150,
                                                            bind: {
                                                                text: '{deny_receive}'
                                                            },
                                                            listeners: {
                                                                render: 'onLabelRender3'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            disabled: true,
                                                            id: 'antispam_rec_mail',
                                                            width: 200,
                                                            enableKeyEvents: true,
                                                            listeners: {
                                                                keydown: 'onAntispam_rec_mailKeydown'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    margin: '8 0 0 10',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            width: 119,
                                            text: '알람 메일'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            id: 'smtp_al_radio1',
                                            width: 80,
                                            boxLabel: '차단',
                                            checked: true,
                                            listeners: {
                                                change: 'onSmtp_al_radio1Change'
                                            }
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            id: 'smtp_al_radio2',
                                            width: 70,
                                            boxLabel: '탐지',
                                            listeners: {
                                                change: 'onSmtp_al_radio2Change'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value !== true){
                                                    if(value !== ""){
                                                        if(!ValidEmail(value)){ return get_msg('err_email'); }
                                                    }
                                                }
                                                return true;
                                            },
                                            id: 'antispam_al_mail',
                                            width: 200,
                                            enableKeyEvents: true,
                                            listeners: {
                                                errorchange: 'onAntispam_al_mailErrorChange',
                                                blur: 'onAntispam_al_mailBlur',
                                                keydown: 'onAntispam_al_mailKeydown'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '8 0 0 -10',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'image',
                                            margin: '0 2 0 10',
                                            maxHeight: 6,
                                            width: 8,
                                            src: '../images/bul_req.png'
                                        },
                                        {
                                            xtype: 'label',
                                            width: 170,
                                            bind: {
                                                text: '{limit_mail}'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                if(!LengthCheck(value, 0, 10)){ return ValidLimit(0, 10); }

                                                return true;
                                            },
                                            fieldInfo: {
                                                txt: msg_tip_length(0,
                                                10,
                                                null)
                                            },
                                            cls: 'inp_unit',
                                            id: 'win_mail_size',
                                            margin: '0 0 0 -8',
                                            width: 120,
                                            afterBodyEl: [
                                                '<div class="inp_after">{[__zen("mbyte")]}</div>'
                                            ],
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            value: '5',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 2,
                                            listeners: {
                                                errorchange: 'onTextfieldErrorChange1',
                                                keydown: 'onTextfieldKeydown1',
                                                blur: 'onWin_mail_sizeBlur',
                                                focus: 'onWin_mail_sizeFocus'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '8 0 5 -10',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'image',
                                            margin: '0 2 0 10',
                                            maxHeight: 6,
                                            width: 8,
                                            src: '../images/bul_req.png'
                                        },
                                        {
                                            xtype: 'label',
                                            width: 170,
                                            bind: {
                                                text: '{limit_concur_user}'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(!LengthCheck(value, 0, 100)){ return ValidLimit(0, 100); }

                                                return true;
                                            },
                                            fieldInfo: {
                                                txt: msg_tip_length(0,
                                                100,
                                                null)
                                            },
                                            id: 'win_user_num',
                                            margin: '0 0 0 -8',
                                            width: 80,
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            value: '0',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            listeners: {
                                                errorchange: 'onTextfieldErrorChange2',
                                                keydown: 'onTextfieldKeydown2',
                                                blur: 'onWin_user_numBlur',
                                                focus: 'onWin_user_numFocus'
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
                                            cls: 'lb_req',
                                            width: 180,
                                            bind: {
                                                text: '{cum_send_limit}'
                                            }
                                        },
                                        {
                                            xtype: 'fieldset',
                                            padding: 5,
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value !== true){
                                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                            if(Number(value) < 0 || Number(value) > 100){ return ValidLimit(0,100); }
                                                        }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        100,
                                                        null)
                                                    },
                                                    id: 'antispam_send_cnt',
                                                    width: 160,
                                                    labelSeparator: ' ',
                                                    labelWidth: 70,
                                                    value: 0,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 3,
                                                    maxLengthText: ' ',
                                                    bind: {
                                                        fieldLabel: '{limit_count}'
                                                    },
                                                    listeners: {
                                                        focus: 'onTextfieldFocus2',
                                                        blur: 'onTextfieldBlur3',
                                                        errorchange: 'onTextfieldErrorChange3'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value !== true){
                                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                            if(Number(value) < 0 || Number(value) > 20){ return ValidLimit(0,20); }
                                                        }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        20,
                                                        null)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'antispam_send_pro',
                                                    margin: '0 0 0 5',
                                                    width: 210,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">{[__zen("min")]}</div>'
                                                    ],
                                                    labelSeparator: ' ',
                                                    value: 5,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 2,
                                                    maxLengthText: ' ',
                                                    bind: {
                                                        fieldLabel: '{cum_time}'
                                                    },
                                                    listeners: {
                                                        focus: 'onTextfieldFocus',
                                                        blur: 'onTextfieldBlur1',
                                                        errorchange: 'onTextfieldErrorChange4'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value !== true){
                                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                            if(Number(value) < 0 || Number(value) > 30){ return ValidLimit(0,30); }
                                                        }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        30,
                                                        null)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'antispam_send_int',
                                                    margin: '0 0 0 5',
                                                    width: 210,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">{[__zen("min")]}</div>'
                                                    ],
                                                    labelSeparator: ' ',
                                                    value: 5,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 2,
                                                    maxLengthText: ' ',
                                                    bind: {
                                                        fieldLabel: '{prohibit_time}'
                                                    },
                                                    listeners: {
                                                        focus: 'onTextfieldFocus1',
                                                        blur: 'onTextfieldBlur2',
                                                        errorchange: 'onTextfieldErrorChange5'
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
                                            xtype: 'label',
                                            cls: 'lb_req',
                                            width: 180,
                                            bind: {
                                                text: '{cum_receive_limit}'
                                            }
                                        },
                                        {
                                            xtype: 'fieldset',
                                            padding: 5,
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value !== true){
                                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                            if(Number(value) < 0 || Number(value) > 100){ return ValidLimit(0,100); }
                                                        }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        100,
                                                        null)
                                                    },
                                                    id: 'antispam_rec_cnt',
                                                    width: 160,
                                                    labelSeparator: ' ',
                                                    labelWidth: 70,
                                                    value: 0,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 3,
                                                    maxLengthText: ' ',
                                                    bind: {
                                                        fieldLabel: '{limit_count}'
                                                    },
                                                    listeners: {
                                                        focus: 'onTextfieldFocus3',
                                                        blur: 'onTextfieldBlur4',
                                                        errorchange: 'onTextfieldErrorChange6'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value !== true){
                                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                            if(Number(value) < 0 || Number(value) > 20){ return ValidLimit(0,20); }
                                                        }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        20,
                                                        null)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'antispam_rec_pro',
                                                    margin: '0 0 0 5',
                                                    width: 210,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">{[__zen("min")]}</div>'
                                                    ],
                                                    labelSeparator: ' ',
                                                    value: 5,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 2,
                                                    maxLengthText: ' ',
                                                    bind: {
                                                        fieldLabel: '{cum_time}'
                                                    },
                                                    listeners: {
                                                        focus: 'onTextfieldFocus4',
                                                        blur: 'onTextfieldBlur5',
                                                        errorchange: 'onTextfieldErrorChange7'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value !== true){
                                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                            if(Number(value) < 0 || Number(value) > 30){ return ValidLimit(0,30); }
                                                        }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        30,
                                                        null)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'antispam_rec_int',
                                                    margin: '0 0 0 5',
                                                    width: 210,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">{[__zen("min")]}</div>'
                                                    ],
                                                    labelSeparator: ' ',
                                                    value: 5,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 2,
                                                    maxLengthText: ' ',
                                                    bind: {
                                                        fieldLabel: '{prohibit_time}'
                                                    },
                                                    listeners: {
                                                        focus: 'onTextfieldFocus5',
                                                        blur: 'onTextfieldBlur6',
                                                        errorchange: 'onTextfieldErrorChange8'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            listeners: {
                                render: 'onFieldsetRender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    cls: 'zen_tab',
                    id: 'antispam_tab',
                    margin: '-10 -10 10 -10',
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            cls: 'zen_tab_body',
                            bind: {
                                title: '{rbl_cont}'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '5 0 8 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    cls: 'btn_b',
                                                    id: 'win_btn_rbl_add',
                                                    iconCls: 'icb_add',
                                                    bind: {
                                                        text: '{add}'
                                                    },
                                                    listeners: {
                                                        click: 'onWin_btn_rbl_addClick',
                                                        blur: 'onWin_btn_rbl_addBlur'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    cls: 'btn_b',
                                                    componentCls: 'btn_auth',
                                                    hidden: true,
                                                    id: 'win_btn_rbl_del',
                                                    margin: '0 0 0 5',
                                                    iconCls: 'icb_del',
                                                    text: '삭제',
                                                    listeners: {
                                                        click: 'onWin_btn_rbl_delClick'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'gridpanel',
                                            cls: 'in_grid',
                                            id: 'grid_rbl',
                                            margin: '0 0 10 0 ',
                                            maxHeight: 120,
                                            scrollable: {
                                                x: false,
                                                y: true
                                            },
                                            header: false,
                                            title: 'My Grid Panel',
                                            allowDeselect: true,
                                            columnLines: false,
                                            disableSelection: true,
                                            rowLines: false,
                                            store: 'store_antispam_rbl',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.tdCls = 'cell_text';

                                                        return value;
                                                    },
                                                    dataIndex: 'url',
                                                    flex: 1,
                                                    bind: {
                                                        text: '{url}'
                                                    },
                                                    editor: {
                                                        xtype: 'textfield',
                                                        baseCls: 'cell_text',
                                                        enableKeyEvents: true,
                                                        enforceMaxLength: true,
                                                        maxLength: 100,
                                                        listeners: {
                                                            blur: 'onTextfieldBlur',
                                                            keydown: 'onTextfieldKeydown3'
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'actioncolumn',
                                                    width: 45,
                                                    align: 'center',
                                                    items: [
                                                        {
                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                var store = Ext.data.StoreManager.lookup('store_antispam_rbl');
                                                                store.removeAt(rowIndex,1);

                                                                Ext.getCmp('grid_rbl').getPlugin('rbl_plug').completeEdit();
                                                            },
                                                            iconCls: 'icr_del'
                                                        }
                                                    ]
                                                }
                                            ],
                                            viewConfig: {
                                                markDirty: false
                                            },
                                            listeners: {
                                                celldblclick: 'onGridpanelCellDblClick'
                                            },
                                            plugins: [
                                                {
                                                    ptype: 'cellediting',
                                                    pluginId: 'rbl_plug',
                                                    clicksToEdit: 1
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
                            bind: {
                                title: '{deny_rule}'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '5 0 8 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    cls: 'btn_b',
                                                    id: 'win_btn_spam_add',
                                                    iconCls: 'icb_add',
                                                    bind: {
                                                        text: '{add}'
                                                    },
                                                    listeners: {
                                                        click: 'onWin_btn_spam_addClick',
                                                        blur: 'onWin_btn_spam_addBlur'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    cls: 'btn_b',
                                                    componentCls: 'btn_auth',
                                                    id: 'win_btn_spam_del',
                                                    margin: '0 0 0 5',
                                                    iconCls: 'icb_del',
                                                    bind: {
                                                        text: '{del}'
                                                    },
                                                    listeners: {
                                                        click: 'onWin_btn_spam_delClick',
                                                        blur: 'onWin_btn_spam_delBlur'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'gridpanel',
                                            cls: 'in_grid',
                                            id: 'grid_spam',
                                            margin: '0 0 10 0',
                                            maxHeight: 120,
                                            scrollable: {
                                                x: false,
                                                y: true
                                            },
                                            header: false,
                                            title: 'My Grid Panel',
                                            columnLines: true,
                                            sortableColumns: false,
                                            store: 'store_antispam_spam',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 60,
                                                    align: 'center',
                                                    dataIndex: '@num',
                                                    menuDisabled: true,
                                                    bind: {
                                                        text: '{rank}'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if(value === "sender"){ return __zen('sender'); }
                                                        else if(value === "receiver"){ return __zen('receiver'); }
                                                        else if(value === "title"){ return __zen('title2'); }
                                                        else if(value === "content"){ return __zen('contents'); }
                                                    },
                                                    dataIndex: 'type',
                                                    menuDisabled: true,
                                                    flex: 0.2,
                                                    bind: {
                                                        text: '{type}'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'filter',
                                                    menuDisabled: true,
                                                    flex: 0.4,
                                                    bind: {
                                                        text: '{contents}'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if(value === "0"){ return __zen('deny'); }
                                                        else if(value === "1"){ return __zen('detect'); }
                                                        else if(value === "2"){ return __zen('allow'); }
                                                    },
                                                    dataIndex: 'action',
                                                    menuDisabled: true,
                                                    flex: 0.2,
                                                    bind: {
                                                        text: '{action}'
                                                    }
                                                },
                                                {
                                                    xtype: 'actioncolumn',
                                                    hidden: true,
                                                    width: 45,
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    items: [
                                                        {
                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                var store = Ext.data.StoreManager.lookup('store_antispam_spam');
                                                                store.removeAt(rowIndex,1);

                                                            },
                                                            iconCls: 'icr_del'
                                                        }
                                                    ]
                                                }
                                            ],
                                            viewConfig: {
                                                markDirty: false
                                            },
                                            listeners: {
                                                celldblclick: 'onGrid_spamCellDblClick'
                                            },
                                            selModel: {
                                                selType: 'checkboxmodel'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            cls: 'zen_tab_body',
                            bind: {
                                title: '{mail_filter}'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '5 0 8 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    cls: 'btn_b',
                                                    id: 'win_btn_spam_add1',
                                                    iconCls: 'icb_add',
                                                    bind: {
                                                        text: '{add}'
                                                    },
                                                    listeners: {
                                                        click: 'onWin_btn_spam_addClick1',
                                                        blur: 'onWin_btn_spam_addBlur1'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    cls: 'btn_b',
                                                    componentCls: 'btn_auth',
                                                    id: 'win_btn_spam_del1',
                                                    margin: '0 0 0 5',
                                                    iconCls: 'icb_del',
                                                    bind: {
                                                        text: '{del}'
                                                    },
                                                    listeners: {
                                                        click: 'onWin_btn_spam_delClick1',
                                                        blur: 'onWin_btn_spam_del1Blur'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'gridpanel',
                                            id: 'grid_mailfilter',
                                            margin: '0 0 10 0',
                                            maxHeight: 120,
                                            scrollable: {
                                                x: false,
                                                y: true
                                            },
                                            header: false,
                                            title: 'My Grid Panel',
                                            columnLines: true,
                                            sortableColumns: false,
                                            store: 'store_antispam_mailfilter',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 60,
                                                    dataIndex: 'num',
                                                    menuDisabled: true,
                                                    bind: {
                                                        text: '{rank}'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'address',
                                                    menuDisabled: true,
                                                    flex: 1,
                                                    bind: {
                                                        text: '{mail_address}'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if(value === "sender"){ return __zen('receiver'); }
                                                        else if(value === "receiver"){ return __zen('sender'); }
                                                        else{ return __zen('two_way'); }
                                                    },
                                                    dataIndex: 'type',
                                                    menuDisabled: true,
                                                    flex: 0.3,
                                                    bind: {
                                                        text: '{mail_sen_rec}'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if(value === "0"){ return __zen('deny'); }
                                                        else if(value === "1"){ return __zen('search2'); }
                                                        else{ return __zen('unsearch'); }
                                                    },
                                                    dataIndex: 'action',
                                                    menuDisabled: true,
                                                    flex: 0.3,
                                                    bind: {
                                                        text: '{search_not}'
                                                    }
                                                },
                                                {
                                                    xtype: 'actioncolumn',
                                                    hidden: true,
                                                    width: 45,
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    items: [
                                                        {
                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                var store = Ext.data.StoreManager.lookup('store_antispam_mailfilter');
                                                                store.removeAt(rowIndex,1);

                                                            },
                                                            iconCls: 'icr_del'
                                                        }
                                                    ]
                                                }
                                            ],
                                            selModel: {
                                                selType: 'checkboxmodel'
                                            },
                                            listeners: {
                                                celldblclick: 'onGrid_mailfilterCellDblClick'
                                            }
                                        }
                                    ],
                                    listeners: {
                                        expand: 'onFieldsetExpand'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            cls: 'zen_tab_body',
                            bind: {
                                title: '{ip_filter}'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '5 0 8 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    cls: 'btn_b',
                                                    id: 'win_btn_spam_add2',
                                                    iconCls: 'icb_add',
                                                    bind: {
                                                        text: '{add}'
                                                    },
                                                    listeners: {
                                                        click: 'onWin_btn_spam_addClick11',
                                                        blur: 'onWin_btn_spam_addBlur11'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    cls: 'btn_b',
                                                    componentCls: 'btn_auth',
                                                    id: 'win_btn_spam_del2',
                                                    margin: '0 0 0 5',
                                                    iconCls: 'icb_del',
                                                    bind: {
                                                        text: '{del}'
                                                    },
                                                    listeners: {
                                                        click: 'onWin_btn_spam_delClick11',
                                                        blur: 'onWin_btn_spam_del2Blur'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'gridpanel',
                                            id: 'grid_ipfilter',
                                            margin: '0 0 10 0',
                                            header: false,
                                            title: 'My Grid Panel',
                                            columnLines: true,
                                            sortableColumns: false,
                                            store: 'store_antispam_ipfilter',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 60,
                                                    dataIndex: 'num',
                                                    menuDisabled: true,
                                                    bind: {
                                                        text: '{rank}'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'address',
                                                    menuDisabled: true,
                                                    flex: 1,
                                                    bind: {
                                                        text: '{ip}'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if(value === "0"){ return __zen('deny'); }
                                                        else if(value === "1"){ return __zen('search2'); }
                                                        else{ return __zen('unsearch'); }
                                                    },
                                                    dataIndex: 'action',
                                                    menuDisabled: true,
                                                    flex: 0.3,
                                                    bind: {
                                                        text: '{search_not}'
                                                    }
                                                },
                                                {
                                                    xtype: 'actioncolumn',
                                                    hidden: true,
                                                    width: 45,
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    items: [
                                                        {
                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                var store = Ext.data.StoreManager.lookup('store_antispam_ipfilter');
                                                                store.removeAt(rowIndex,1);

                                                            },
                                                            iconCls: 'icr_del'
                                                        }
                                                    ]
                                                }
                                            ],
                                            selModel: {
                                                selType: 'checkboxmodel'
                                            },
                                            listeners: {
                                                celldblclick: 'onGrid_ipfilterCellDblClick'
                                            }
                                        }
                                    ],
                                    listeners: {
                                        expand: 'onFieldsetExpand1'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: 'onFmAfterRender'
            }
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
                    id: 'win_btn_ok',
                    width: 100,
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onWin_btn_okClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    id: 'win_btn_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onWin_btn_cancelClick'
                    }
                }
            ]
        }
    ],

    onWin_profile_nameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);

    },

    onWin_profile_nameBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('win_profile_name').validateValue(true);
    },

    onWin_profile_nameKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_profile_nameFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onLabelRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('profile_chk_1').getValue()){ Ext.getCmp('profile_chk_1').setValue(false); }
            else{ Ext.getCmp('profile_chk_1').setValue(true); }
        }, component);
    },

    onProfile_chk_2Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('antispam_point_con').setDisabled(false);
        }
        else{
            Ext.getCmp('antispam_point_con').setDisabled(true);
        }
    },

    onLabelRender1: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('profile_chk_2').getValue()){ Ext.getCmp('profile_chk_2').setValue(false); }
            else{ Ext.getCmp('profile_chk_2').setValue(true); }
        }, component);
    },

    onTextfieldErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onWin_spam_pointBlur: function(component, event, eOpts) {
        Ext.getCmp('win_spam_point').validateValue(true);
        setTipBlur(this,component);
    },

    onWin_spam_pointFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onProfile_radio_2Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('profile_radio_1').setValue(false);
            Ext.getCmp('antispam_find').setDisabled(false);
            Ext.getCmp('antispam_rec_mail').disable(true);
        }
    },

    onLabelRender2: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('profile_radio_2').getValue()){ Ext.getCmp('profile_radio_2').setValue(true); }
        }, component);
    },

    onAntispam_findErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);

    },

    onAntispam_findBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('antispam_find').validateValue(true);
    },

    onAntispam_findKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onAntispam_findFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onProfile_radio_1Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('profile_radio_2').setValue(false);
            Ext.getCmp('antispam_find').setDisabled(true);
            Ext.getCmp('antispam_rec_mail').enable(true);
        }
    },

    onLabelRender3: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('profile_radio_1').getValue()){ Ext.getCmp('profile_radio_1').setValue(true); }
        }, component);
    },

    onAntispam_rec_mailKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onSmtp_al_radio1Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){
        }
        else{
            if(Ext.getCmp('smtp_al_radio2').getValue() === false){
                Ext.getCmp('smtp_al_radio2').setValue(true);
            }
        }
    },

    onSmtp_al_radio2Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){
        }
        else{
            if(Ext.getCmp('smtp_al_radio1').getValue() === false){
                Ext.getCmp('smtp_al_radio1').setValue(true);
            }
        }
    },

    onAntispam_al_mailErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onAntispam_al_mailBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onAntispam_al_mailKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onTextfieldErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldKeydown1: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onWin_mail_sizeBlur: function(component, event, eOpts) {
        Ext.getCmp('win_mail_size').validateValue(true);
        setTipBlur(this,component);
    },

    onWin_mail_sizeFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onTextfieldErrorChange2: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldKeydown2: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onWin_user_numBlur: function(component, event, eOpts) {
        Ext.getCmp('win_user_num').validateValue(true);
        if(Ext.getCmp('win_user_num').getValue() === ""){ Ext.getCmp('win_user_num').setValue("0"); }
        setTipBlur(this,component);
    },

    onWin_user_numFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(Ext.getCmp('win_user_num').getValue() === "0"){ Ext.getCmp('win_user_num').setValue(""); }
    },

    onTextfieldFocus2: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onTextfieldBlur3: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onTextfieldErrorChange3: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onTextfieldBlur1: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onTextfieldErrorChange4: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldFocus1: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onTextfieldBlur2: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onTextfieldErrorChange5: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldFocus3: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onTextfieldBlur4: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onTextfieldErrorChange6: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldFocus4: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onTextfieldBlur5: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onTextfieldErrorChange7: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldFocus5: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onTextfieldBlur6: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onTextfieldErrorChange8: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFieldsetRender: function(component, eOpts) {
        component.setTitle(__zen('smtp'));
    },

    onWin_btn_rbl_addClick: function(button, e, eOpts) {
        var me = this;

        var store = Ext.data.StoreManager.lookup('store_antispam_rbl');

        if(store.getCount() > 4){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(5));
            //     Ext.Msg.show({
            //         title: 'WeGuardia™ DMC',
            //         msg: ValidMaxCnt(5),
            //         width: 300,
            //         buttons: Ext.Msg.OK,
            //         icon: Ext.window.MessageBox.INFO
            //     });

            return false;
        }
        else{
            var record = {
                'url' : ''
            };

            store.add(record);
            //     var win = Ext.create('NFW2.view.win_antispam_rbl',{
            //         modal : true
            //     });

            //     win.show();
        }


    },

    onWin_btn_rbl_addBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onWin_btn_rbl_delClick: function(button, e, eOpts) {
        var tbl = Ext.getCmp("grid_rbl");
        var tbl_sel = tbl.getSelectionModel().getSelection();

        var store = Ext.data.StoreManager.lookup('store_antispam_rbl');

        var records = [];

        if(tbl_sel.length === 0){
            Ext.Msg.alert("",get_msg("sel_del"));
            return false;
        }else{
            for(var i in store.data.items){
                chk = false;
                for(var j in tbl_sel){
                    if(store.data.items[i].data['@num'] === tbl_sel[j].data['@num']){
                        chk = true;
                    }
                }
                if(chk === false){records.push(store.data.items[i]);}
            }

            for(var i in records){
                records[i].data['@num'] = Number(i)+1;
            }
        }

        store.loadData(records);

    },

    onTextfieldBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldKeydown3: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onGridpanelCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        // if(cellIndex === 0){ return false; }

        // var win = Ext.create('NFW2.view.win_antispam_rbl',{
        //     edit : "edit",
        //     num : record.data['@num'],
        //     modal : true
        // });

        // win.show();
    },

    onWin_btn_spam_addClick: function(button, e, eOpts) {
        var me = this;

        var store = Ext.data.StoreManager.lookup('store_antispam_spam');

        if(store.getCount() > 29){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(30));
        //     Ext.Msg.show({
        //         title: 'WeGuardia™ DMC',
        //         msg: ValidMaxCnt(30),
        //         width: 300,
        //         buttons: Ext.Msg.OK,
        //         icon: Ext.window.MessageBox.INFO
        //     });

            return false;
        }
        else{
        //     if(store.getCount() !== 0){
        //     var cnt = store.data.items[store.data.items.length-1].data['@num'];

        //     if(cnt !== store.data.items.length){
        //         for(var i in store.data.items){
        //             if(Number(i)+1 !== store.data.items[i].data['@num']){
        //                 cnt = i;
        //                 break;
        //             }
        //         }
        //     }
        //     }
        //     else{
        //         cnt = 0;
        //     }

        //     var record = {
        //         '@num' : Number(cnt)+1,
        //         'type' : 'sender',
        //         'filter' : '',
        //         'action' : '0'
        //     };

        //     store.add(record);
        //     store.sort('@num', 'ASC');
            var win = Ext.create('NFW2.view.win_antispam_spam',{
                modal : true
            });

            win.show();
        }
    },

    onWin_btn_spam_addBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onWin_btn_spam_delClick: function(button, e, eOpts) {
        var tbl = Ext.getCmp("grid_spam");
        var tbl_sel = tbl.getSelectionModel().getSelection();

        var store = Ext.data.StoreManager.lookup('store_antispam_spam');

        var records = [];
        var chk = false;

        if(tbl_sel.length === 0){
            Ext.Msg.alert("",get_msg("sel_del"));
            return false;

        }else{
            for(var i in store.data.items){
                if(store.data.items[i].data['@num'] === 30){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update('기본 설정 내용은 삭제 할 수 없습니다.');
                    return false;
                }

                chk = false;
                for(var j in tbl_sel){
                    if(store.data.items[i].data['@num'] === tbl_sel[j].data['@num']){
                        chk = true;
                    }
                }
                if(chk === false){records.push(store.data.items[i]);}
            }

            for(var i in records){
                records[i].data['@num'] = Number(i)+1;
            }
        }
        store.loadData(records);

        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onWin_btn_spam_delBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onGrid_spamCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0){ return false; }

        var win = Ext.create('NFW2.view.win_antispam_spam',{
            edit : "edit",
            num : record.data['@num'],
            modal : true
        });

        win.show();
    },

    onWin_btn_spam_addClick1: function(button, e, eOpts) {
        var me = this;

        var store = Ext.data.StoreManager.lookup('store_antispam_mailfilter');

        if(store.getCount() > 29){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(30));
            //     Ext.Msg.show({
            //         title: 'WeGuardia™ DMC',
            //         msg: ValidMaxCnt(30),
            //         width: 300,
            //         buttons: Ext.Msg.OK,
            //         icon: Ext.window.MessageBox.INFO
            //     });

            return false;
        }
        else{
            //     if(store.getCount() !== 0){
            //     var cnt = store.data.items[store.data.items.length-1].data['@num'];

            //     if(cnt !== store.data.items.length){
            //         for(var i in store.data.items){
            //             if(Number(i)+1 !== store.data.items[i].data['@num']){
            //                 cnt = i;
            //                 break;
            //             }
            //         }
            //     }
            //     }
            //     else{
            //         cnt = 0;
            //     }

            //     var record = {
            //         '@num' : Number(cnt)+1,
            //         'type' : 'sender',
            //         'filter' : '',
            //         'action' : '0'
            //     };

            //     store.add(record);
            //     store.sort('@num', 'ASC');
            var win = Ext.create('NFW2.view.win_antispam_mailfilter',{
                modal : true
            });

            win.show();
        }
    },

    onWin_btn_spam_addBlur1: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onWin_btn_spam_delClick1: function(button, e, eOpts) {
        var tbl = Ext.getCmp("grid_mailfilter");
        var tbl_sel = tbl.getSelectionModel().getSelection();

        var store = Ext.data.StoreManager.lookup('store_antispam_mailfilter');

        var records = [];
        var chk = false;

        if(tbl_sel.length === 0){
            Ext.Msg.alert("",get_msg("sel_del"));
            return false;

        }else{
            for(var i in store.data.items){
                chk = false;
                for(var j in tbl_sel){
                    if(tbl_sel[j].data.num === 30){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update('기본 설정 내용은 삭제 할 수 없습니다.');
                        return false;
                    }
                    if(store.data.items[i].data.num === tbl_sel[j].data.num){
                        chk = true;
                    }
                }
                if(chk === false){records.push(store.data.items[i]);}
            }

            for(var i in records){
                if(records[i].data.num !== 30){
                    records[i].data.num = Number(i)+1;
                }
            }
        }
        store.loadData(records);

        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onWin_btn_spam_del1Blur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onGrid_mailfilterCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0){ return false; }

        var win = Ext.create('NFW2.view.win_antispam_mailfilter',{
            edit : "edit",
            num : record.data.num,
            record : record,
            modal : true
        });

        win.show();
    },

    onFieldsetExpand: function() {
        this.body.dom.scrollTop = 400;
    },

    onWin_btn_spam_addClick11: function(button, e, eOpts) {
        var me = this;

        var store = Ext.data.StoreManager.lookup('store_antispam_ipfilter');

        if(store.getCount() > 29){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(30));
        //     Ext.Msg.show({
        //         title: 'WeGuardia™ DMC',
        //         msg: ValidMaxCnt(30),
        //         width: 300,
        //         buttons: Ext.Msg.OK,
        //         icon: Ext.window.MessageBox.INFO
        //     });

            return false;
        }
        else{
        //     if(store.getCount() !== 0){
        //     var cnt = store.data.items[store.data.items.length-1].data['@num'];

        //     if(cnt !== store.data.items.length){
        //         for(var i in store.data.items){
        //             if(Number(i)+1 !== store.data.items[i].data['@num']){
        //                 cnt = i;
        //                 break;
        //             }
        //         }
        //     }
        //     }
        //     else{
        //         cnt = 0;
        //     }

        //     var record = {
        //         '@num' : Number(cnt)+1,
        //         'type' : 'sender',
        //         'filter' : '',
        //         'action' : '0'
        //     };

        //     store.add(record);
        //     store.sort('@num', 'ASC');
            var win = Ext.create('NFW2.view.win_antispam_ipfilter',{
                modal : true
            });

            win.show();
        }
    },

    onWin_btn_spam_addBlur11: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onWin_btn_spam_delClick11: function(button, e, eOpts) {
        var tbl = Ext.getCmp("grid_ipfilter");
        var tbl_sel = tbl.getSelectionModel().getSelection();

        var store = Ext.data.StoreManager.lookup('store_antispam_ipfilter');

        var records = [];
        var chk = false;

        if(tbl_sel.length === 0){
            Ext.Msg.alert("",get_msg("sel_del"));
            return false;

        }else{
            for(var i in store.data.items){
                chk = false;

                for(var j in tbl_sel){
                    if(tbl_sel[j].data.num === 30){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update('기본 설정 내용은 삭제 할 수 없습니다.');
                        return false;
                    }
                    if(store.data.items[i].data.num === tbl_sel[j].data.num){
                        chk = true;
                    }
                }
                if(chk === false){records.push(store.data.items[i]);}
            }

            for(var i in records){
                if(records[i].data.num !== 30){
                    records[i].data.num = Number(i)+1;
                }
            }
        }
        store.loadData(records);

        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onWin_btn_spam_del2Blur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onGrid_ipfilterCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0){ return false; }

        var win = Ext.create('NFW2.view.win_antispam_ipfilter',{
            edit : "edit",
            num : record.data.num,
            record : record,
            modal : true
        });

        win.show();
    },

    onFieldsetExpand1: function() {
        this.body.dom.scrollTop = 400;
    },

    onFmAfterRender: function(component, eOpts) {
        var me = this;
        me.set_btn = false;
        this.fieldInfo = makeZenTip();
        chk_zenauth(null);
        var rbl_store = Ext.data.StoreManager.lookup('store_antispam_rbl');
        var spam_store = Ext.data.StoreManager.lookup('store_antispam_spam');
        var ip_store = Ext.data.StoreManager.lookup('store_antispam_ipfilter');
        var mail_store = Ext.data.StoreManager.lookup('store_antispam_mailfilter');

        spam_store.sort('sort_num', 'ASC');
        ip_store.sort('sort_num', 'ASC');
        mail_store.sort('sort_num', 'ASC');

        rbl_store.removeAll();
        spam_store.removeAll();
        ip_store.removeAll();
        mail_store.removeAll();

        if(this.edit === "edit"){

            me.setTitle(__zen('edit_antispam'));
            console.log(me.record);
            Ext.getCmp('win_profile_name').setValue(me.record.data.name);
            Ext.getCmp('win_spam_point').setValue(me.record.data.BaysianScore);
            Ext.getCmp('antispam_find').setValue(me.record.data.addtitle);
            Ext.getCmp('win_mail_size').setValue(me.record.data.maxmailsize);
            Ext.getCmp('win_user_num').setValue(me.record.data.maxreceivercount);
            Ext.getCmp('antispam_al_mail').setValue(me.record.data.AlarmReceiver);

            if(me.record.data.useRBL === "on"){ Ext.getCmp('profile_chk_1').setValue(true); }
            else if(me.record.data.useRBL === "off"){ Ext.getCmp('profile_chk_1').setValue(false); }
            if(me.record.data.useBaysian === "on"){ Ext.getCmp('profile_chk_2').setValue(true); }
            else if(me.record.data.useBaysian === "off"){ Ext.getCmp('profile_chk_2').setValue(false); }
            if(me.record.data.action === "0"){
                Ext.getCmp('profile_radio_1').setValue(true);
                Ext.getCmp('antispam_rec_mail').setValue(me.record.data.ChangedReceiver);
            }
            else if(me.record.data.action === "1"){
                Ext.getCmp('profile_radio_2').setValue(true);
                Ext.getCmp('antispam_find').setValue(me.record.data.addtitle);
            }
            if(me.record.data.AlarmEvent === "0"){ Ext.getCmp('smtp_al_radio1').setValue(true); Ext.getCmp('smtp_al_radio2').setValue(false); }
            else if(me.record.data.AlarmEvent === "1"){ Ext.getCmp('smtp_al_radio1').setValue(false); Ext.getCmp('smtp_al_radio2').setValue(true); }
            else if(me.record.data.AlarmEvent === "2"){ Ext.getCmp('smtp_al_radio1').setValue(true); Ext.getCmp('smtp_al_radio2').setValue(true); }

            var records = [];
            var records2 = [];
            var ip_records = [];
            var mail_records = [];

            for(var j in me.record.data.RBL){
                records.push({
                    '@num' : Number(j)+1,
                    'url' : me.record.data.RBL[j]
                });
            }

            for(var j in me.record.data.spamfilter){
                records2.push({
                    '@num' : me.record.data.spamfilter[j].num,
                    'action' : me.record.data.spamfilter[j].action,
                    'filter' : me.record.data.spamfilter[j].filter,
                    'type' : me.record.data.spamfilter[j].type
                });
            }

            for(var k in me.record.data.IP){
                ip_records.push({
                    'num' : me.record.data.IP[k].num,
                    'action' : me.record.data.IP[k].action,
                    'address' : me.record.data.IP[k].address
                });
            }

            for(var l in me.record.data.MailAddress){
                mail_records.push({
                    'num' : me.record.data.MailAddress[l].num,
                    'action' : me.record.data.MailAddress[l].action,
                    'address' : me.record.data.MailAddress[l].address,
                    'type' : me.record.data.MailAddress[l].type
                });
            }

            rbl_store.loadData(records);
            spam_store.loadData(records2);
            ip_store.loadData(ip_records);
            mail_store.loadData(mail_records);
        }
        else{
            me.setTitle(__zen('add_antispam'));
            var rbl_record = [];
            rbl_record.push({
                'url' : 'dnsbl.sorbs.net'
            });

            var ip_record = [];
            ip_record.push({
                'num' : 30,
                'action' : '1',
                'address' : 'Any'
            });

            var mail_record = [];
            mail_record.push({
                'num' : 30,
                'action' : '1',
                'type' : 'sender',
                'address' : '*'
            });

            rbl_store.add(rbl_record);
            ip_store.add(ip_record);
            mail_store.add(mail_record);

            var _params = {

                basename: Ext.encode('mgtable_users')
            };

            request_helper.xmlrpc_call_JsonP(

                'ftuctrl',
                'getObjects',
                _params,

                function(response){
                    Ext.getCmp('antispam_al_mail').setValue(response.list[0].email);
                    Ext.getCmp('antispam_rec_mail').setValue(response.list[0].email);

                }
            );
        }


    },

    onWin_btn_okClick: function(button, e, eOpts) {
        var me = this;
        var obj = {};
        var use_rbl;
        var use_bay;
        var action;
        var alarm_chk;
        var store_spam = Ext.data.StoreManager.lookup('store_antispam_spam');
        var store_rbl = Ext.data.StoreManager.lookup('store_antispam_rbl');
        var store_mail = Ext.data.StoreManager.lookup('store_antispam_mailfilter');
        var store_ip = Ext.data.StoreManager.lookup('store_antispam_ipfilter');
        var store = Ext.data.StoreManager.lookup('store_antispam_list');
        var rbl = [];
        var spam = [];
        var ip_rec = [];
        var mail_rec = [];
        var chk;

        if(Ext.getCmp('win_profile_name').isValid() === false){ Ext.getCmp('win_profile_name').focus(); return false; }
        if(Ext.getCmp('win_spam_point').isValid() === false){ Ext.getCmp('win_spam_point').focus(); return false; }
        if(Ext.getCmp('antispam_find').isValid() === false){ Ext.getCmp('antispam_find').focus(); return false; }
        if(Ext.getCmp('antispam_al_mail').isValid() === false){ Ext.getCmp('antispam_al_mail').focus(); return false; }
        if(Ext.getCmp('win_mail_size').isValid() === false){ Ext.getCmp('win_mail_size').focus(); return false; }
        if(Ext.getCmp('win_user_num').isValid() === false){ Ext.getCmp('win_user_num').focus(); return false; }

        for(var i in store_rbl.data.items){
            if(me.validation_rbl(store_rbl.data.items[i].data.url) !== true){
                Ext.getCmp('antispam_tab').setActiveTab(0);
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                err_fl.addCls('ic_msg_err');
                err_fl.update(me.validation_rbl(store_rbl.data.items[i].data.url));

                Ext.getCmp('grid_rbl').getPlugin('rbl_plug').startEdit(Number(i), 0);
                return false;
            }

            rbl.push(store_rbl.data.items[i].data.url);
        }
        for(var i in store_spam.data.items){

            if(me.validation_spam(store_spam.data.items[i].data.filter) !== true){
                Ext.getCmp('antispam_tab').setActiveTab(1);
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                err_fl.addCls('ic_msg_err');
                err_fl.update(me.validation_spam(store_spam.data.items[i].data.filter));

                Ext.getCmp('grid_spam').getPlugin('spam_plug').startEdit(Number(i), 1);
                return false;
            }

            spam.push({
                'num' : Number(store_spam.data.items[i].data['@num']),
                'type' : store_spam.data.items[i].data.type,
                'action' : store_spam.data.items[i].data.action,
                'filter' : store_spam.data.items[i].data.filter
            });
        }

        if(me.edit === "edit"){
            var chk_num = 0;
            for(var i in store.data.items){
                if(store.data.items[i].data.name === Ext.getCmp('win_profile_name').getValue()){

                    if(Number(i) !== Number(me.edit_index)){ chk_num++; }
                }
            }
            if(chk_num > 0){ chk = true; }
        }
        else{
            for(var i in store.data.items){
                if(store.data.items[i].data.name === Ext.getCmp('win_profile_name').getValue()){ chk = true; }
            }
        }

        if(chk){
            me.set_btn = true;
            Ext.getCmp('win_profile_name').isValid();
            return false;
        }

        for(var i in store_mail.data.items){
            mail_rec.push({
                'num' : Number(store_mail.data.items[i].data.num),
                'type' : store_mail.data.items[i].data.type,
                'action' : store_mail.data.items[i].data.action,
                'address' : store_mail.data.items[i].data.address
            });
        }

        for(var j in store_ip.data.items){
            ip_rec.push({
                'num' : Number(store_ip.data.items[j].data.num),
                'action' : store_ip.data.items[j].data.action,
                'address' : store_ip.data.items[j].data.address
            });
        }

        if(Ext.getCmp('profile_chk_1').getValue()){ use_rbl = "on"; }
        else if(Ext.getCmp('profile_chk_1').getValue() === false){ use_rbl = "off"; }
        if(Ext.getCmp('profile_chk_2').getValue()){ use_bay = "on"; }
        else if(Ext.getCmp('profile_chk_2').getValue() === false){ use_bay = "off"; }
        if(Ext.getCmp('profile_radio_1').getValue()){ action = "0"; }
        else if(Ext.getCmp('profile_radio_2').getValue()){ action = "1"; }
        // if(Ext.getCmp('smtp_al_radio1').getValue() && Ext.getCmp('smtp_al_radio2').getValue()){ alarm_chk = "2"; }
        // // else if(Ext.getCmp('smtp_al_radio1').getValue()){ alarm_chk = "0"; }
        // // else if(Ext.getCmp('smtp_al_radio2').getValue()){ alarm_chk = "1"; }

        obj = {
            'name' : Ext.getCmp('win_profile_name').getValue(),
            'useRBL' : use_rbl,
            'useBaysian' : use_bay,
            'BaysianScore' : Ext.getCmp('win_spam_point').getValue(),
            'action' : action,
            'addtitle' : Ext.getCmp('antispam_find').getValue(),
            'maxreceivercount' : Ext.getCmp('win_user_num').getValue(),
            'maxmailsize' : Ext.getCmp('win_mail_size').getValue(),
            'ChangedReceiver' : Ext.getCmp('antispam_rec_mail').getValue(),
            //     'AlarmReceiver' : Ext.getCmp('antispam_al_mail').getValue(),
            //     'AlarmEvent' : alarm_chk,
            'RBL' : rbl,
            'spamfilter' : spam,
            'IP' : ip_rec,
            'MailAddress' : mail_rec,
            'AllowSendingCount' : Ext.getCmp('antispam_send_cnt').getValue(),
            'SendingProhibitTime' : Ext.getCmp('antispam_send_pro').getValue(),
            'SendingIntegralTime' : Ext.getCmp('antispam_send_int').getValue(),
            'AllowReceivingCount' : Ext.getCmp('antispam_rec_cnt').getValue(),
            'ReceivingProhibitTime' : Ext.getCmp('antispam_rec_pro').getValue(),
            'ReceivingIntegralTime' : Ext.getCmp('antispam_rec_int').getValue(),
        };

        if(me.edit === "edit"){
            obj['@cid'] = me.cid;
        }

        var update = (me.edit==="edit")?true:false;

        showLoadMask();
        var _params = {
            basename : Ext.encode('anti_spam'),
            obj : Ext.encode(obj),
            id_info : Ext.encode({'fieldname':'@cid'}),
            num_info : Ext.encode({'fieldname':'@num'}),
            update : Ext.encode(update)
        };

        if(me.edit === "edit"){
            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'setObjectWithCid',
                _params,
                function(response){
                    hideLoadMask();
                    store.load();
                    Ext.Msg.show({
                        title: __weguardia,
                        msg: get_msg("msg_ok_edit"),
                        width: 300,
                        buttons: Ext.Msg.OK,
                        fn: setWinClose,
                        icon: Ext.window.MessageBox.INFO
                    });
                }
            );
        }
        else{
            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'setObjectWithCid',
                _params,
                function(response){
                    hideLoadMask();
                    store.load();
                    Ext.Msg.show({
                        title: __weguardia,
                        msg: get_msg("msg_ok_add"),
                        width: 300,
                        buttons: Ext.Msg.YESNO,
                        buttonText:{
                            yes: __zen('add_plus'),
                            no: __zen('close')
                        },
                        fn: me.set_window,
                        icon: Ext.window.MessageBox.INFO
                    });
                }
            );

        }
    },

    onWin_btn_cancelClick: function(button, e, eOpts) {
        this.close();
    },

    set_window: function(btn) {
        if(btn==="no"){
            var win = Ext.WindowManager.getActive();
            if (win) {
                win.close();
            }
        }else{
            Ext.getCmp("fm_antispam").getForm().reset();
            Ext.getCmp('antispam_tab').setActiveTab(0);
            var record_mail = {
                'num' : 30,
                'address' : '*',
                'type' : 'bidirection',
                'action' : '1'
            };
            var record_ip = {
                'num' : 30,
                'address' : 'Any',
                'action' : '1'
            };
            Ext.data.StoreManager.lookup('store_antispam_rbl').load();
            Ext.data.StoreManager.lookup('store_antispam_spam').load();
            Ext.data.StoreManager.lookup('store_antispam_mailfilter').removeAll();
            Ext.data.StoreManager.lookup('store_antispam_mailfilter').add(record_mail);
            Ext.data.StoreManager.lookup('store_antispam_ipfilter').removeAll();
            Ext.data.StoreManager.lookup('store_antispam_ipfilter').add(record_ip);
            //     Ext.ComponentQuery.query('label[cls="errorBox"]').forEach(function(cls){ cls.hide(); });
        }
    },

    validation_rbl: function(value) {
        if(value !== true){
            if(!CheckNotNull(value)){ return get_msg('err_null'); }
            if(!ValidURL(value)){ return get_msg('err_form'); }
        }

        return true;
    },

    validation_spam: function(value) {
        if(!CheckNotNull(value)){ return get_msg('err_null'); }

        return true;
    }

});