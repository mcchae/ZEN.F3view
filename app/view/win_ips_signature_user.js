
Ext.define('NFW2.view.win_ips_signature_user', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ips_signature_user',

    requires: [
        'NFW2.view.win_ips_signature_userViewModel',
        'Ext.form.Panel',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.field.Checkbox',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.XTemplate',
        'Ext.form.field.TextArea',
        'Ext.form.field.File',
        'Ext.form.field.FileButton',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'win_ips_signature_user'
    },
    cls: 'zen_win',
    id: 'win_ips_signature_user',
    scrollable: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            border: false,
            id: 'fm_signature',
            scrollable: true,
            width: 710,
            bodyPadding: 10,
            titleCollapse: true,
            items: [
                {
                    xtype: 'tabpanel',
                    cls: 'zen_tab',
                    componentCls: 'line_bottom',
                    id: 'tabgroup',
                    bodyBorder: false,
                    bodyStyle: 'background-color:transparent !important;',
                    activeTab: 0,
                    plain: true,
                    items: [
                        {
                            xtype: 'panel',
                            id: 'user_signature',
                            layout: 'anchor',
                            bodyPadding: 10,
                            bind: {
                                title: '{user_sig}'
                            },
                            tabConfig: {
                                xtype: 'tab',
                                id: 'TabConfig'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        if(!ValidNotKor(value)){ return get_msg('err_notkor'); }

                                        return true;
                                    },
                                    id: 'signature_name',
                                    margin: '0 0 10 0',
                                    width: 300,
                                    labelCls: 'lb_req',
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    enforceMaxLength: true,
                                    maxLength: 31,
                                    minLength: 1,
                                    bind: {
                                        fieldLabel: '{sig_name}'
                                    },
                                    listeners: {
                                        errorchange: 'onSignature_nameErrorChange',
                                        blur: 'onSignature_nameBlur'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    id: 'contentG',
                                    margin: '0 0 10 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(!ValidNotKor(value)){ return get_msg('err_notkor'); }

                                                return true;
                                            },
                                            id: 'content',
                                            margin: '0 0 0 10',
                                            width: 380,
                                            labelSeparator: ' ',
                                            labelWidth: 130,
                                            msgTarget: 'none',
                                            enforceMaxLength: true,
                                            maxLength: 1023,
                                            bind: {
                                                fieldLabel: '{contents_string}'
                                            },
                                            listeners: {
                                                errorchange: 'onContentErrorChange'
                                            }
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            id: 'nocase',
                                            margin: '0 0 0 5',
                                            hideLabel: true,
                                            inputValue: '1',
                                            uncheckedValue: '0'
                                        },
                                        {
                                            xtype: 'label',
                                            margin: '3 0 0 5',
                                            bind: {
                                                text: '{nocase}'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 5 0',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            id: 'protocol',
                                            width: 300,
                                            labelCls: 'lb_req',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            value: 'TCP',
                                            editable: false,
                                            displayField: 'value',
                                            store: 'store_ips_protocol',
                                            valueField: 'value',
                                            bind: {
                                                fieldLabel: '{protocol}'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 10 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretchmax'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value !== true){
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    var chk_src = [true,""];

                                                    var temp = String(value).split('!');
                                                    if(temp[1] !== undefined){ value = temp[1]; }

                                                    var src_ip = String(value).split('/');
                                                    if(src_ip[1] === undefined){
                                                        if(!ValidIPAddress(value)){
                                                            if(value === "Any"){ return true; }
                                                            chk_src[0] = false; chk_src[1] = get_msg('err_ip');
                                                        }
                                                    }
                                                    else{
                                                        if(!ValidIPAddress(src_ip[0])){ chk_src[0] = false; chk_src[1] = get_msg('err_ip'); }
                                                        if(!ValidIPAddress(src_ip[1])){
                                                            if(src_ip[1] === ""){ chk_src[0] = false; chk_src[1] = get_msg('err_form'); }
                                                            else if(!LengthCheck(src_ip[1], 0, 32)){ chk_src[0] = false; chk_src[1] = ValidLimit(0,32);  }
                                                            else{ chk_src[0] = false; chk_src[1] = get_msg('err_form'); }
                                                        }
                                                    }

                                                    if(chk_src[0] !== true){
                                                        return chk_src[1];
                                                    }
                                                }
                                                return true;
                                            },
                                            id: 'src_addr',
                                            width: 300,
                                            labelCls: 'lb_req',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            value: 'Any',
                                            bind: {
                                                fieldLabel: '{src}'
                                            },
                                            listeners: {
                                                errorchange: 'onSrc_addrErrorChange',
                                                blur: 'onContentBlur',
                                                focus: 'onSrc_addrFocus'
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            id: 'direction',
                                            margin: '0 0 0 47',
                                            width: 250,
                                            labelSeparator: ' ',
                                            labelWidth: 105,
                                            value: '->',
                                            editable: false,
                                            store: 'store_direction',
                                            valueField: 'value',
                                            bind: {
                                                fieldLabel: '{direction}'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    id: 'hG1',
                                    margin: '0 0 10 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretchmax'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                //if(!ValidNum(value)){ return get_msg(err_form); }
                                                if(value !== true){
                                                    var temp = String(value).split(':');
                                                    var chk_port = [true,""];

                                                    if(temp[1] === undefined){
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!LengthCheck(value, 1, 65535)){
                                                            chk_port[0] = false; chk_port[1] = ValidLimit(1, 65535);
                                                        }
                                                        else{
                                                            if(!ValidNum(value)){
                                                                if(value !== "Any"){ chk_port[0] = false; chk_port[1] = get_msg('err_form'); }
                                                            }
                                                        }

                                                        if(chk_port[0] !== true){
                                                            return chk_port[1];
                                                        }
                                                    }
                                                    else{
                                                        if(!LengthCheck(temp[0], 1, 65535)){
                                                            return ValidLimit(1, 65535);
                                                        }
                                                        if(temp[1] === ""){ return get_msg('err_form'); }
                                                        if(!LengthCheck(temp[1], 1, 65535)){
                                                            return ValidLimit(1, 65535);
                                                        }
                                                        if(Number(temp[0]) > Number(temp[1])){ return get_msg('err_than'); }
                                                    }
                                                }

                                                return true;

                                            },
                                            fieldInfo: {
                                                txt: msg_tip_length_port(1,
                                                65535,
                                                0)
                                            },
                                            id: 'src_port',
                                            width: 300,
                                            labelCls: 'lb_req',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            value: 'Any',
                                            bind: {
                                                fieldLabel: '{src_port}'
                                            },
                                            listeners: {
                                                errorchange: 'onSrc_portErrorChange',
                                                blur: 'onSrc_portBlur',
                                                focus: 'onSrc_portFocus'
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            id: 'action',
                                            margin: '0 0 0 47',
                                            width: 250,
                                            labelSeparator: ' ',
                                            labelWidth: 105,
                                            editable: false,
                                            store: 'store_action',
                                            valueField: 'value',
                                            bind: {
                                                fieldLabel: '{action}'
                                            },
                                            listeners: {
                                                afterrender: 'onActionAfterRender'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    id: 'hG2',
                                    margin: '0 0 10 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretchmax'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value !== true){
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    var chk_src = [true,""];

                                                    var temp = String(value).split('!');
                                                    if(temp[1] !== undefined){ value = temp[1]; }

                                                    var src_ip = String(value).split('/');
                                                    if(src_ip[1] === undefined){
                                                        if(!ValidIPAddress(value)){
                                                            if(value === "Any"){ return true; }
                                                            chk_src[0] = false; chk_src[1] = get_msg('err_ip');
                                                        }
                                                    }
                                                    else{
                                                        if(!ValidIPAddress(src_ip[0])){ chk_src[0] = false; chk_src[1] = get_msg('err_ip'); }
                                                        if(!ValidIPAddress(src_ip[1])){
                                                            if(src_ip[1] === ""){ chk_src[0] = false; chk_src[1] = get_msg('err_form'); }
                                                            else if(!LengthCheck(src_ip[1], 0, 32)){ chk_src[0] = false; chk_src[1] = ValidLimit(0,32);  }
                                                            else{ chk_src[0] = false; chk_src[1] = get_msg('err_form'); }
                                                        }
                                                    }

                                                    if(chk_src[0] !== true){
                                                        return chk_src[1];
                                                    }
                                                }
                                                return true;
                                            },
                                            id: 'dest_addr',
                                            width: 300,
                                            labelCls: 'lb_req',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            value: 'Any',
                                            bind: {
                                                fieldLabel: '{dest}'
                                            },
                                            listeners: {
                                                errorchange: 'onDest_addrErrorChange',
                                                blur: 'onDest_addrBlur',
                                                focus: 'onDest_addrFocus'
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            id: 'numG',
                                            margin: '0 0 0 37',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value !== true){
                                                            var _value = removeComma(value);
                                                            if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                            if(!LengthCheck(_value, 1, 1000000)){ return ValidLimit(1, addComma(1000000)); }
                                                        }
                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(1,
                                                        1000000,
                                                        null)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'detection_num',
                                                    width: 250,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">{[__zen("times")]}</div>'
                                                    ],
                                                    labelCls: 'lb_req',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    value: '1',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9.]/,
                                                    maxLength: 9,
                                                    maxLengthText: ' ',
                                                    minLength: 1,
                                                    bind: {
                                                        fieldLabel: '{detect_count}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onDetection_numErrorChange',
                                                        blur: 'onDetection_numBlur',
                                                        change: 'onDetection_numChange',
                                                        focus: 'onDetection_numFocus',
                                                        keydown: 'onDetection_numKeydown'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    id: 'hG3',
                                    margin: '0 0 10 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretchmax'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                //if(!ValidNum(value)){ return get_msg(err_form); }
                                                if(value !== true){
                                                    var temp = String(value).split(':');
                                                    var chk_port = [true,""];

                                                    if(temp[1] === undefined){
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!LengthCheck(value, 1, 65535)){
                                                            chk_port[0] = false; chk_port[1] = ValidLimit(1, 65535);
                                                        }
                                                        else{
                                                            if(!ValidNum(value)){
                                                                if(value !== "Any"){ chk_port[0] = false; chk_port[1] = get_msg('err_form'); }
                                                            }
                                                        }

                                                        if(chk_port[0] !== true){
                                                            return chk_port[1];
                                                        }
                                                    }
                                                    else{
                                                        if(!LengthCheck(temp[0], 1, 65535)){
                                                            return ValidLimit(1, 65535);
                                                        }
                                                        if(temp[1] === ""){ return get_msg('err_form'); }
                                                        if(!LengthCheck(temp[1], 1, 65535)){
                                                            return ValidLimit(1, 65535);
                                                        }
                                                        if(Number(temp[0]) > Number(temp[1])){ return get_msg('err_than'); }
                                                    }
                                                }

                                                return true;
                                            },
                                            fieldInfo: {
                                                txt: msg_tip_length_port(1,
                                                65535,
                                                0)
                                            },
                                            id: 'dest_port',
                                            width: 300,
                                            labelCls: 'lb_req',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            value: 'Any',
                                            bind: {
                                                fieldLabel: '{dest_port}'
                                            },
                                            listeners: {
                                                errorchange: 'onDest_portErrorChange',
                                                blur: 'onDest_portBlur',
                                                focus: 'onDest_portFocus'
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            id: 'timeG',
                                            margin: '0 0 0 37',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value !== true){
                                                            var _value = removeComma(value);
                                                            if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                            if(!LengthCheck(_value, 1, 86400)){ return ValidLimit(1, addComma(86400)); }
                                                        }
                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(1,
                                                        86400,
                                                        null)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'detection_time',
                                                    width: 250,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">{[__zen("sec")]}</div>'
                                                    ],
                                                    labelCls: 'lb_req',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    value: '1',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9.]/,
                                                    maxLength: 6,
                                                    maxLengthText: ' ',
                                                    minLength: 1,
                                                    bind: {
                                                        fieldLabel: '{detected_time}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onDetection_timeErrorChange',
                                                        blur: 'onDetection_timeBlur',
                                                        focus: 'onDetection_timeFocus',
                                                        change: 'onDetection_timeBlur1',
                                                        keydown: 'onDetection_timeKeydown'
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
                            id: 'snort_signature',
                            bodyPadding: 10,
                            bind: {
                                title: '{snort_sig}'
                            },
                            tabConfig: {
                                xtype: 'tab',
                                id: 'TabConfig1'
                            },
                            items: [
                                {
                                    xtype: 'textareafield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                        if(Ext.getCmp('snort').val === 'false'){
                                            Ext.getCmp('errorBox5').hide();
                                            Ext.getCmp('snort').val = 'true';
                                        }

                                        return true;
                                    },
                                    height: 211,
                                    id: 'snort',
                                    width: 657,
                                    hideLabel: true,
                                    msgTarget: 'none',
                                    value: '',
                                    listeners: {
                                        errorchange: 'onSnortErrorChange',
                                        afterrender: 'onSnortAfterRender',
                                        change: 'onSnortChange',
                                        blur: 'onSnortBlur'
                                    }
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'label',
                                    dock: 'bottom',
                                    cls: 'errorBox',
                                    hidden: true,
                                    id: 'errorBox5'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: 'file_signature',
                            bodyPadding: 10,
                            bind: {
                                title: '{file_add}'
                            },
                            tabConfig: {
                                xtype: 'tab',
                                id: 'TabConfig2'
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
                                            xtype: 'form',
                                            id: 'upform',
                                            margin: 0,
                                            width: 440,
                                            header: false,
                                            title: 'My Form',
                                            items: [
                                                {
                                                    xtype: 'filefield',
                                                    validator: function(value) {
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                        return true;
                                                    },
                                                    id: 'signature_upload',
                                                    width: 400,
                                                    msgTarget: 'none',
                                                    name: 'uploadFile',
                                                    buttonText: '파일 찾기',
                                                    listeners: {
                                                        errorchange: 'onSignature_uploadErrorChange'
                                                    },
                                                    buttonConfig: {
                                                        xtype: 'filebutton',
                                                        cls: 'btn_b',
                                                        margin: '1 0 0 5',
                                                        bind: {
                                                            text: '{file_find}'
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'label',
                                            cls: 'errorBox',
                                            hidden: true,
                                            id: 'errorBox6'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'commonG',
                    padding: 10,
                    style: 'border-top:2px solid rgba(0, 0, 0, 0.5)',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            width: 320,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'signature_group',
                                    margin: '0 0 0 10',
                                    width: 320,
                                    labelSeparator: ' ',
                                    labelWidth: 170,
                                    editable: false,
                                    displayField: 'group_name',
                                    queryMode: 'local',
                                    store: 'store_ips_group_add',
                                    valueField: 'id',
                                    bind: {
                                        fieldLabel: '{sel_sig_group}'
                                    },
                                    listeners: {
                                        afterrender: 'onComboboxAfterRender'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    id: 'hazard',
                                    margin: '8 0 0 10',
                                    maxWidth: 270,
                                    width: 270,
                                    labelSeparator: ' ',
                                    labelWidth: 170,
                                    editable: false,
                                    store: 'store_hazard',
                                    valueField: 'value',
                                    bind: {
                                        fieldLabel: '{hazard}'
                                    },
                                    listeners: {
                                        afterrender: 'onHazardAfterRender'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'optionG',
                            margin: '0 0 0 15',
                            layout: 'anchor',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'btimeG',
                                    margin: '0 0 10 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value !== true){
                                                    var _value = removeComma(value);
                                                    if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                    if(!LengthCheck(_value, 1, 2592000)){ return ValidLimit(1, addComma(2592000)); }
                                                }
                                                return true;
                                            },
                                            fieldInfo: {
                                                txt: msg_tip_length(1,
                                                2592000,
                                                null)
                                            },
                                            cls: 'inp_unit',
                                            id: 'block_time',
                                            width: 250,
                                            afterBodyEl: [
                                                '<div class="inp_after">{[__zen("sec")]}</div>'
                                            ],
                                            labelCls: 'lb_req',
                                            labelSeparator: ' ',
                                            msgTarget: 'none',
                                            value: 30,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maskRe: /[0-9.]/,
                                            maxLength: 9,
                                            maxLengthText: ' ',
                                            minLength: 1,
                                            bind: {
                                                fieldLabel: '{deny_remain_time}'
                                            },
                                            listeners: {
                                                errorchange: 'onBlock_timeErrorChange',
                                                blur: 'onBlock_timeBlur',
                                                focus: 'onBlock_timeFocus',
                                                change: 'onBlock_timeChange',
                                                keydown: 'onBlock_timeKeydown'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'combobox',
                                    id: 'block_type',
                                    margin: '0 0 10 10',
                                    width: 270,
                                    labelSeparator: ' ',
                                    labelWidth: 105,
                                    value: '1:N',
                                    editable: false,
                                    store: 'store_block_type',
                                    valueField: 'value',
                                    bind: {
                                        fieldLabel: '{deny_type}'
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
                    id: 'btn_Group',
                    itemId: 'fld_msg'
                },
                {
                    xtype: 'button',
                    hidden: true,
                    id: 'btn_pop_prev',
                    width: 30,
                    text: '<'
                },
                {
                    xtype: 'button',
                    hidden: true,
                    id: 'btn_pop_next',
                    margin: '0 5 0 5',
                    width: 30,
                    text: '>'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    id: 'btn_submit2',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onBtn_submit2Click',
                        blur: 'onBtn_submit2Blur'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    id: 'btn_reset2',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onBtn_reset2Click'
                    }
                }
            ]
        }
    ],

    onSignature_nameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onSignature_nameBlur: function(component, event, eOpts) {
        Ext.getCmp('signature_name').validateValue(true);
    },

    onContentErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onSrc_addrErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onContentBlur: function(component, event, eOpts) {
        Ext.getCmp('src_addr').validateValue(true);
        setTipBlur(this,component);
    },

    onSrc_addrFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4smp');
        component.fieldInfo = str + ", Any, !";
        setTipFocus(this,component);
    },

    onSrc_portErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onSrc_portBlur: function(component, event, eOpts) {
        Ext.getCmp('src_port').validateValue(true);
        setTipBlur(this,component);
    },

    onSrc_portFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onActionAfterRender: function(component, eOpts) {
        var combo = Ext.getCmp('action').getStore().data;

        if(combo.length > 0){
            Ext.getCmp('action').setValue(combo.items[0].data['value']);
        }
    },

    onDest_addrErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onDest_addrBlur: function(component, event, eOpts) {
        Ext.getCmp('dest_addr').validateValue(true);
        setTipBlur(this,component);
    },

    onDest_addrFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4smp');
        component.fieldInfo = str + ", Any, !";
        setTipFocus(this,component);
    },

    onDetection_numErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onDetection_numBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('detection_num').validateValue(true);
    },

    onDetection_numChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onDetection_numFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onDetection_numKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onDest_portErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onDest_portBlur: function(component, event, eOpts) {
        Ext.getCmp('dest_port').validateValue(true);
        setTipBlur(this,component);
    },

    onDest_portFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onDetection_timeErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onDetection_timeBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('detection_time').validateValue(true);
    },

    onDetection_timeFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onDetection_timeBlur1: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onDetection_timeKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onSnortErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onSnortAfterRender: function(component, eOpts) {
        var snort2 = document.getElementById('snort');
        snort2.setAttribute('spellcheck', 'false');
    },

    onSnortChange: function(field, newValue, oldValue, eOpts) {
        Ext.getCmp('snort').validateValue(true);
    },

    onSnortBlur: function(component, event, eOpts) {
        Ext.getCmp('snort').validateValue(true);
    },

    onSignature_uploadErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onComboboxAfterRender: function(component, eOpts) {
        var combo = Ext.getCmp('signature_group').getStore().data;

        if(combo.length > 0){
            Ext.getCmp('signature_group').setValue(combo.items[0].data['id']);
        }
    },

    onHazardAfterRender: function(component, eOpts) {
        var que = Ext.getCmp('hazard').getStore().data;

        if(que.length > 0){
            Ext.getCmp("hazard").setValue(que.items[0].data['value']);
        }
    },

    onBlock_timeErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onBlock_timeBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('block_time').validateValue(true);
    },

    onBlock_timeFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onBlock_timeChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onBlock_timeKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onFmAfterRender: function(component, eOpts) {
        var me = this;
        this.fieldInfo = makeZenTip();
        chk_zenauth(null);
        me.btn_set = true;
        var activeTab = Ext.getCmp('tabgroup').getActiveTab();
        var activeTabIndex = Ext.getCmp('tabgroup').items.findIndex('id', activeTab.id);

        var _store = Ext.data.StoreManager.lookup('store_ips_group');
        var cnt = _store.getCount();

        if(me.edit === "edit"){
            Ext.getCmp('TabConfig2').hide();
            showLoadMask();

            var _params = {

                basename : Ext.encode('signature_list'),
                cond : Ext.encode({'@fsid':me.fsid})
            };

            me.setTitle(__zen('edit_sig')+" - " + me.fsid);

            request_helper.xmlrpc_call_JsonP(

                'ftuctrl',
                'getObjects',
                _params,

                function(response){
                    hideLoadMask();
                    //console.log(response.list);

                    if(response.retval !== null){

                        var ncase = (response.list[0].nocase === 1)? true:false;
                        var rb = response.list[0].group_id;

                        Ext.getCmp('tabgroup').setActiveTab(0);
                        Ext.getCmp('TabConfig1').disable();
                        Ext.getCmp('TabConfig').enable();
                        Ext.getCmp('signature_name').setValue(response.list[0].signature_name);
                        Ext.getCmp('content').setValue(response.list[0].content);
                        Ext.getCmp('nocase').setValue(ncase);
                        Ext.getCmp('src_addr').setValue(response.list[0].src_addr);
                        Ext.getCmp('src_port').setValue(response.list[0].src_port);
                        Ext.getCmp('dest_addr').setValue(response.list[0].dest_addr);
                        Ext.getCmp('dest_port').setValue(response.list[0].dest_port);
                        Ext.getCmp('protocol').setValue(response.list[0].protocol);
                        Ext.getCmp('direction').setValue(response.list[0].direction);
                        Ext.getCmp('action').setValue(response.list[0].action);
                        Ext.getCmp('detection_num').setValue(response.list[0].detection_num);
                        Ext.getCmp('detection_time').setValue(response.list[0].detection_time);
                        Ext.getCmp('signature_group').setValue(response.list[0].group_id);

                        if(response.list[0]['@type'] === 'snort'){
                            Ext.getCmp('TabConfig').disable();
                            Ext.getCmp('TabConfig1').enable();
                            Ext.getCmp('tabgroup').setActiveTab(1);
                            Ext.getCmp('snort').setRawValue(response.list[0].snort);

                        }

                        Ext.getCmp('block_time').setValue(response.list[0].block_time);
                        Ext.getCmp('block_type').setValue(response.list[0].block_type);
                        Ext.getCmp('hazard').setValue(response.list[0].hazard);
                    }
                }
            );
        }
        else{ me.setTitle(__zen('user_sig')); }
    },

    onBtn_submit2Click: function(button, e, eOpts) {
        var me = this;

        var activeTab = Ext.getCmp('tabgroup').getActiveTab();
        var activeTabIndex = Ext.getCmp('tabgroup').items.findIndex('id', activeTab.id);
        var str = [];

        if(activeTabIndex === 0){
            str = ['signature_name','content','src_addr','src_port','dest_addr','dest_port','detection_num','detection_time','block_time'];

        }else if(activeTabIndex === 1){
            str = ['snort','block_time'];
        }
        else if(activeTabIndex === 2){
            str = ['block_time'];
        }

        var valid_id = new Array(str.length);

        for(var i=0; i<str.length; i++){

            valid_id[i] = Ext.getCmp(str[i]);

            if(valid_id[i].isValid() === false){ if(str[i] === "block_time"){me.btn_set = true;} valid_id[i].focus(); return false; }
        }

        var update = (me.edit === "edit")? true:false;

        var obj = {};

        if(update){ obj['@fsid'] = me.fsid; }
        //obj['@fsid'] = (update)? me.fsid:(me.last_fsid+1);

        obj['group_id'] = parseInt(Ext.getCmp('signature_group').getValue());
        obj['block_time'] = parseInt(removeComma(Ext.getCmp('block_time').getValue()));
        obj['block_type'] = parseInt(Ext.getCmp('block_type').getValue());
        obj['hazard'] = Ext.getCmp('hazard').getValue();

        if(activeTabIndex === 0){
            obj['@type'] = 'user';
            obj['signature_name'] = htmlspecialchars(Ext.getCmp('signature_name').getValue());
            obj['content'] = Ext.getCmp('content').getValue();
            obj['nocase'] = parseInt((Ext.getCmp('nocase').checked === true)? 1:0);
            obj['protocol'] = Ext.getCmp('protocol').getValue();
            obj['src_addr'] = Ext.getCmp('src_addr').getValue();
            obj['src_port'] = Ext.getCmp('src_port').getValue();
            obj['dest_addr'] = Ext.getCmp('dest_addr').getValue();
            obj['dest_port'] = Ext.getCmp('dest_port').getValue();
            obj['direction'] = Ext.getCmp('direction').getValue();
            obj['action'] = Ext.getCmp('action').getValue();
            obj['detection_num'] = parseInt(removeComma(Ext.getCmp('detection_num').getValue()));
            obj['detection_time'] = parseInt(removeComma(Ext.getCmp('detection_time').getValue()));

            showLoadMask();

            var _params2 = {

                basename : Ext.encode('signature_list'),
                obj : Ext.encode(obj),
                update : Ext.encode(update)
            };

            request_helper.xmlrpc_call_JsonP(

                'ftuctrl',
                'setListTypeObj',
                _params2,

                function(responses2){
                    hideLoadMask();
                    //console.log(_params);
                    Ext.getCmp('tbl_chk').setText("0 "+ __zen('check_count'));
                    Ext.data.StoreManager.lookup('store_ips_signature_list').currentPage = Ext.getCmp('NFW2_ips_signature').now_page;
                    Ext.data.StoreManager.lookup('store_ips_signature_list').getProxy().setExtraParam('start',Ext.encode(0));
                    Ext.data.StoreManager.lookup('store_ips_signature_list').load();
                    Ext.getCmp('tab_con1').destroy();
                    Ext.getCmp('tab_con2').destroy();

                    Ext.getCmp('NFW2_ips_signature').make_group_filter();
                    Ext.getCmp('NFW2_ips_signature').init_ips_group();

                    if(me.edit === "edit"){

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
                            fn: me.set_WinState,
                            icon: Ext.window.MessageBox.INFO
                        });

                    }

                }
            );

            Ext.getCmp('NFW2_ips_signature').btn_click();

        }
        else if(activeTabIndex === 1){
            var _params = {
                func_name : Ext.encode('check_snort_validation'),
                args : Ext.encode({'rule':Ext.getCmp('snort').getValue()})
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'execKctrlFunc',
                _params,

                function(response){

                    if(response[0] === false){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(response[1]);

                        me.btn_set = false;
                        //                 Ext.getCmp('errorBox5').setText(response[1]);
                        //                 Ext.getCmp('errorBox5').show();
                        //                 Ext.getCmp('snort').focus();
                        //                 Ext.getCmp('snort').val = 'false';

                        return false;
                    }
                    else{
                        Ext.getCmp('errorBox5').hide();
                    }

                    var _store = Ext.data.StoreManager.lookup('store_ips_signature_list');
                    _store.getProxy().setExtraParam('cond',Ext.encode({}));
                    //_store.pageSize = parseInt(_store.totalCount,10);
                    /*_store.load(function(response){
            var num = 0;
            for(var i in response){
                if(response[i].data['@fsid'] < 10000000 && response[i].data['@fsid'] > 9000000){ num = i; }
            }

            if(me.searcher === true){
                if(me.edit !== "edit"){ me.last_fsid = (response.length === 0 || response[num].data['@fsid'] < 9000000)? 9000000:response[num].data['@fsid']; }
            }
            else{
                if(me.edit !== "edit"){ me.last_fsid = (response.length === 0 || _store.data.items[num].data['@fsid'] < 9000000 || num === 0)? 9000000:_store.data.items[num].data['@fsid']; }
            }
            //_store.last().data['@fsid']*/
                    var snort_data = [];
                    var metadata = Ext.getCmp('snort').getValue();
                    var option_data = [];
                    var option;
                    var name_data = [];
                    var dex = [];
                    var threshold = [];
                    var cnt = [];
                    var second = [];
                    var chker = 0;

                    snort_data = metadata.split(' ');

                    obj['@type'] = 'snort';

                    var snort_data_temp = [];
                    for(var z in snort_data){
                        if(snort_data[z] !== ""){ snort_data_temp.push(snort_data[z]); }
                    }

                    obj['action'] = snort_data_temp[0];
                    if(snort_data_temp[1] === "tcp"){ obj['protocol'] = "TCP"; }
                    else if(snort_data_temp[1] === "udp"){ obj['protocol'] = "UDP"; }
                    else if(snort_data_temp[1] === "ip"){ obj['protocol'] = "IP"; }
                    else if(snort_data_temp[1]  === "icmp"){ obj['protocol'] = "ICMP"; }
                    if(snort_data_temp[2] === "any"){ obj['src_addr'] = "Any"; }
                    else{ obj['src_addr'] = snort_data_temp[2]; }
                    if(snort_data_temp[3] === "any"){ obj['src_port'] = "Any"; }
                    else{ obj['src_port'] = snort_data_temp[3]; }
                    obj['direction'] = snort_data_temp[4];
                    if(snort_data_temp[5] === "any"){ obj['dest_addr'] = "Any"; }
                    else{ obj['dest_addr'] = snort_data_temp[5]; }
                    if(snort_data_temp[6] === "any"){ obj['dest_port'] = "Any"; }
                    else{ obj['dest_port'] = snort_data_temp[6]; }
                    var snort_string = "";
                    for(var x in snort_data_temp){
                        if(x === snort_data_temp.length){ snort_string += snort_data_temp[x]; }
                        else{ snort_string += snort_data_temp[x] + " "; }
                    }
                    obj['snort'] = snort_string;
                    for(var i=7;i<snort_data_temp.length;i++){
                        option_data.push(snort_data_temp[i]);
                    }

                    option = option_data.join(' ');
                    name_data = option.split('"');

                    dex = name_data[0].split('(');
                    dex = dex[1].split(':');

                    if(dex[0] === "threshold" || dex[0] === " threshold" || dex[0] === "threshold " || dex[0] === " threshold "){
                        threshold = dex[1].split(',');
                        cnt = threshold[2].split(' ');
                        second = threshold[3].split(' ');
                    }
                    dex = dex[0].split(' ');

                    for(var i in dex){
                        if(dex[i] === "msg"){ obj['signature_name'] = name_data[1]; }
                        else if(dex[i] === "threshold"){
                            chker = 1;
                            var temp = [];
                            for(var q=0;q<cnt.length;q++){
                                if(cnt[q] === "count"){ obj['detection_num'] = cnt[q+1]; }
                            }
                            for(var q=0;q<second.length;q++){
                                if(second[q] === "seconds"){
                                    temp = second[q+1].split(';');
                                    obj['detection_time'] = temp[0];
                                }
                            }
                        }
                    }
                    for(var k = 2;k<name_data.length;k++){
                        dex = name_data[k].split(';');
                        if(dex[1]){ dex = dex[1].split(':'); }
                        if(dex[0] === "threshold" || dex[0] === " threshold" || dex[0] === "threshold " || dex[0] === " threshold "){
                            threshold = dex[1].split(',');
                            cnt = threshold[2].split(' ');
                            second = threshold[3].split(' ');
                        }
                        if(dex[0]){ dex = dex[0].split(' '); }

                        for(var j in dex){
                            if(dex[j] === "msg"){ obj['signature_name'] = name_data[k+1]; }
                            else if(dex[j] === "threshold"){
                                chker = 1;
                                var temp = [];
                                for(var q=0;q<cnt.length;q++){
                                    if(cnt[q] === "count"){ obj['detection_num'] = cnt[q+1]; }
                                }
                                for(var q=0;q<second.length;q++){
                                    if(second[q] === "seconds"){
                                        temp = second[q+1].split(';');
                                        obj['detection_time'] = temp[0];
                                    }
                                }
                            };
                        }
                        k++;
                    }

                    if(chker === 0){
                        obj['detection_num'] = "1";
                        obj['detection_time'] = "1";
                    }


                    showLoadMask();

                    var _params2 = {

                        basename : Ext.encode('signature_list'),
                        obj : Ext.encode(obj),
                        update : Ext.encode(update)
                    };

                    request_helper.xmlrpc_call_JsonP(

                        'ftuctrl',
                        'setListTypeObj',
                        _params2,

                        function(responses2){
                            hideLoadMask();
                            Ext.getCmp('tbl_chk').setText("0 "+ __zen('check_count'));
                            Ext.data.StoreManager.lookup('store_ips_signature_list').currentPage = Ext.getCmp('NFW2_ips_signature').now_page;
                            Ext.data.StoreManager.lookup('store_ips_signature_list').load();
                            Ext.getCmp('tab_con1').destroy();
                            Ext.getCmp('tab_con2').destroy();

                            Ext.getCmp('NFW2_ips_signature').make_group_filter();

                            if(me.edit === "edit"){

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
                                    fn: me.set_WinState,
                                    icon: Ext.window.MessageBox.INFO
                                });

                            }

                        }
                    );
                    Ext.getCmp('NFW2_ips_signature').btn_click();
                }
            );
        }
        else{
            var form = Ext.getCmp('upform').getForm();

            if(Ext.getCmp('signature_upload').isValid() === false){
                me.btn_set = false;
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                err_fl.addCls('ic_msg_err');
                err_fl.update(get_msg('err_null'));
                Ext.get('signature_upload-inputEl').setStyle('border-color','red');
                return false;
            }
            var path = '/ferret/ips/';

            if(form.isValid()){

                showCompLoadMask(Ext.getCmp('win_ips_signature_user'));

                form.submit({
                    url: '/fileUploadCommon',
                    params: {
                        filePath: Ext.encode(path),
                        delFlag: Ext.encode('true')
                    },
                    //         waitMsg: 'Uploading...',
                    success: function(fp, o) {
                        var etc = {};
                        etc.group_id = obj.group_id;
                        etc.block_time = obj.block_time;
                        etc.block_type = obj.block_type;
                        etc.hazard = obj.hazard;
                        var _data = JSON.parse(o.response.responseText);

                        var _params = {
                            basename : Ext.encode('signature_list'),
                            filename : Ext.encode(path+_data.data[0]),
                            etc : Ext.encode(etc)
                        };

                        request_helper.xmlrpc_call_JsonP(
                            'ftuctrl',
                            'importIPSSigList',
                            _params,
                            function(response){
                                hideCompLoadMask(Ext.getCmp('win_ips_signature_user'));
                                Ext.getCmp('tab_con1').destroy();
                                Ext.getCmp('tab_con2').destroy();

                                Ext.getCmp('NFW2_ips_signature').make_group_filter();

                                if(response.fail_reason.line.length === 0){
                                    Ext.getCmp('tbl_chk').setText("0 "+ __zen('check_count'));
                                    Ext.data.StoreManager.lookup('store_ips_signature_list').currentPage = Ext.getCmp('NFW2_ips_signature').now_page;
                                    Ext.data.StoreManager.lookup('store_ips_signature_list').load();
                                    Ext.Msg.show({
                                        title: __weguardia,
                                        msg: get_msg("msg_ok_add"),
                                        width: 300,
                                        buttons: Ext.Msg.YESNO,
                                        buttonText:{
                                            yes: __zen('add_plus'),
                                            no: __zen('close')
                                        },
                                        fn: me.set_WinState,
                                        icon: Ext.window.MessageBox.INFO
                                    });
                                    Ext.getCmp('NFW2_ips_signature').btn_click();
                                }
                                else{
                                    Ext.create('Ext.window.Window', {
                                        title: __weguardia,
                                        id:'file_error_win',
                                        width: 450,
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [{
                                            xtype: 'container',
                                            id:'file_error_con',
                                            autoScroll: true,
                                            maxHeight:250,
                                            flex: 1,
                                            padding: 10,
                                            layout: {
                                                type: 'vbox'
                                            },
                                            items: [
                                            ]
                                        },{
                                            xtype: 'container',
                                            style: 'background-color:#dfeaf2;',
                                            height: 36,
                                            padding: 6,
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch',
                                                pack: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    width: 100,
                                                    text: 'OK',
                                                    listeners: {
                                                        click: {
                                                            fn: function(){ Ext.getCmp('file_error_win').close(); },
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        }]
                                    }).show();

                                    for(var i in response.fail_reason.line){
                                        var msg = "";
                                        msg += response.fail_reason.detail[i];
                                        msg += " (line ";
                                        msg += response.fail_reason.line[i];
                                        msg += ")";

                                        var lab = {
                                            xtype: 'label',
                                            text: msg
                                        };

                                        Ext.getCmp('file_error_con').insert(lab);
                                    }

                                    //                             Ext.Msg.show({
                                    //                                 title: 'WeGuardia™ DMC',
                                    //                                 msg: msg,
                                    //                                 width: 450,
                                    //                                 buttons: Ext.Msg.OK,
                                    //                                 icon: Ext.window.MessageBox.INFO
                                    //                             });
                                }
                            }
                        );

                    },
                    failure : function(fb, o) {
                        hideCompLoadMask(Ext.getCmp('win_ips_signature_user'));
                        Ext.Msg.alert('', get_msg('msg_file_fail'));
                    }
                });
            }
        }
        //});
    },

    onBtn_submit2Blur: function(component, event, eOpts) {
        var me = this;
        var activeTab = Ext.getCmp('tabgroup').getActiveTab();
        var activeTabIndex = Ext.getCmp('tabgroup').items.findIndex('id', activeTab.id);


        if(activeTabIndex === 2){
            if(!me.btn_set){
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                err_fl.removeCls('ic_msg_err');
                err_fl.update('');
                Ext.get('signature_upload-inputEl').setStyle('border-color','');
            }
            else{ me.btn_set = true; }
        }
        else if(activeTabIndex === 1){
            if(!me.btn_set){
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                err_fl.removeCls('ic_msg_err');
                err_fl.update('');
            }
            else{ me.btn_set = true; }
        }
    },

    onBtn_reset2Click: function(button, e, eOpts) {
        this.close();
    },

    set_WinState: function(btn) {
        var me = this;

        var activeTab = Ext.getCmp('tabgroup').getActiveTab();
        var activeTabIndex = Ext.getCmp('tabgroup').items.findIndex('id', activeTab.id);
        var win = Ext.WindowManager.getActive();

        if(btn === "no"){

            if(win){ win.close(); }

        }else{

            var _params = {

                filename: Ext.encode('/proc/ferret/datasheet/ips_signature_num')
            };

            request_helper.xmlrpc_call_JsonP(

                'ftuctrl',
                'getFileContent',
                _params,

                function(response){

                    var _store = Ext.data.StoreManager.lookup('store_ips_signature_list');

                    var Maxcnt = (_store.getTotalCount() >= response[0])? false:true;

                    //console.log(response[0] +', '+ _store.getCount() +', '+ Maxcnt);

                    if(Maxcnt === false){

                        Ext.Msg.alert("",ValidMaxCnt(response[0]));
                        win.close();
                        return false;

                    }else{

                        Ext.getCmp("fm_signature").getForm().reset();
                        Ext.ComponentQuery.query('label[cls="errorBox"]').forEach(function(cls){ cls.hide(); });

                        Ext.getCmp('src_addr').setValue('Any');
                        Ext.getCmp('src_port').setValue('Any');
                        Ext.getCmp('dest_addr').setValue('Any');
                        Ext.getCmp('dest_port').setValue('Any');
                        Ext.getCmp('protocol').setValue('TCP');
                        Ext.getCmp('direction').setValue('->');
                        Ext.getCmp('action').setValue('alert');

                        Ext.getCmp('snort').setRawValue('');

                        Ext.getCmp('detection_num').setValue(1);
                        Ext.getCmp('detection_time').setValue(1);
                        Ext.getCmp('block_time').setValue(30);
                        Ext.getCmp('block_type').setValue(1);
                        Ext.getCmp('hazard').setValue('critical');
                        Ext.getCmp('signature_group').setValue(1);

                        me.last_fsid = (_store.getCount() === 0)? 9000000:_store.last().data['@fsid'];

                    }

                }
            );
        }
    }

});