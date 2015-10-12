
Ext.define('NFW2.view.win_object_qos', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_object_qos',

    requires: [
        'NFW2.view.win_object_qosViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.XTemplate',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_object_qos'
    },
    cls: 'zen_win',
    id: 'win_qos',
    scrollable: true,
    width: 680,
    bodyPadding: 20,
    modal: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'container',
                    id: 'win_qos_con',
                    width: 650,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            id: 'win_nml_con',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var me = Ext.getCmp('win_qos');
                                        var store = Ext.data.StoreManager.lookup('store_firewall_object_qos');

                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        if(me.set_btn === true){
                                            if(me.edit === "edit"){
                                                var chk_num = 0;
                                                for(var i in store.data.items){
                                                    if(store.data.items[i].data.name === Ext.getCmp('win_object').getValue()){
                                                        if(Number(i) !== Number(me.edit_index)){ chk_num++; }
                                                    }
                                                }
                                                if(chk_num > 0){ return get_msg('err_objname'); }
                                            }
                                            else{
                                                for(var i in store.data.items){
                                                    if(store.data.items[i].data.name === Ext.getCmp('win_object').getValue()){ return get_msg('err_objname'); }
                                                }
                                            }
                                            me.set_btn = false;
                                        }

                                        return true;
                                    },
                                    cls: 'lb_req',
                                    id: 'win_object',
                                    maxWidth: 430,
                                    width: 430,
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 31,
                                    minLength: 1,
                                    bind: {
                                        fieldLabel: '{obj_name}'
                                    },
                                    listeners: {
                                        errorchange: 'onWin_objectErrorChange',
                                        blur: 'onWin_objectBlur'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'win_desc',
                                    maxWidth: 430,
                                    width: 430,
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 127,
                                    minLength: 1,
                                    bind: {
                                        fieldLabel: '{desc}'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: [
                                                'lb_req',
                                                'x-field x-form-item-label x-form-item-label-default'
                                            ],
                                            width: 125,
                                            bind: {
                                                text: '{guarant_band}'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value !== true){
                                                    var _value = removeComma(value);

                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                    if(_value !== true){
                                                        var num = [];
                                                        num = _value.split('.');

                                                        var chk = [];
                                                        for(var i in _value){
                                                            chk[i] = _value.substr(i,1);
                                                        }

                                                        if(num[0] === "0" && num[1] === undefined){ return ValidLimit(0.1, addComma(10000)); }
                                                        if(num[1] === undefined){ num[1] = 0; }

                                                        if(num.length > 2){ return get_msg('err_form'); }
                                                        if(num[1].length > 1){ return get_msg('err_form'); }
                                                        if(chk[chk.length-1] === "." || chk[0] === "."){ return get_msg('err_form'); }
                                                        if(!LengthCheck(_value, 0.1, 10000)){ return ValidLimit(0.1, addComma(10000)); }
                                                        if(num[0] === "0" && num[1] === "0"){ return ValidLimit(0.1, addComma(10000)); }
                                                        if(Ext.getCmp('win_band_max').getValue() !== ""){
                                                            if(Number(Ext.getCmp('win_band_max').getValue()) < Number(Ext.getCmp('win_band_min').getValue())){
                                                                return get_msg('err_thanband');
                                                            }
                                                        }
                                                    }
                                                }
                                                return true;
                                            },
                                            fieldInfo: {
                                                txt: msg_tip_length(0.1,
                                                10000,
                                                null)
                                            },
                                            cls: 'inp_unit',
                                            id: 'win_band_min',
                                            maxWidth: 175,
                                            width: 175,
                                            afterBodyEl: [
                                                '<div class="inp_after">{[__zen("mbps")]}</div>'
                                            ],
                                            fieldLabel: '',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maskRe: /[0-9.]/,
                                            maxLength: 7,
                                            maxLengthText: ' ',
                                            listeners: {
                                                errorchange: 'onWin_band_minErrorChange',
                                                blur: 'onWin_band_minBlur',
                                                focus: 'onWin_band_minFocus',
                                                change: 'onWin_band_minChange',
                                                keydown: 'onWin_band_minKeydown'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    margin: '5 0 0 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: [
                                                'lb_req',
                                                'x-field x-form-item-label x-form-item-label-default'
                                            ],
                                            width: 125,
                                            bind: {
                                                text: '{limit_band}'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value !== true){
                                                    var _value = removeComma(value);

                                                    if(!CheckNotNull(_value)){ return get_msg('err_null'); }

                                                    if(_value !== true){
                                                        var num = [];
                                                        num = _value.split('.');

                                                        var chk = [];
                                                        for(var i in _value){
                                                            chk[i] = _value.substr(i,1);
                                                        }

                                                        if(num[0] === "0" && num[1] === undefined){ return ValidLimit(0.1, addComma(10000)); }
                                                        if(num[1] === undefined){ num[1] = 0; }

                                                        if(num.length > 2){ return get_msg('err_form'); }
                                                        if(num[1].length > 1){ return get_msg('err_form'); }
                                                        if(chk[chk.length-1] === "." || chk[0] === "."){ return get_msg('err_form'); }
                                                        if(!LengthCheck(_value, 0.1, 10000)){ return ValidLimit(0.1, addComma(10000)); }
                                                        if(num[0] === "0" && num[1] === "0"){ return ValidLimit(0.1, addComma(10000)); }
                                                        if(Ext.getCmp('win_band_min').getValue() !== ""){
                                                            if(Number(removeComma(Ext.getCmp('win_band_max').getValue())) < Number(removeComma(Ext.getCmp('win_band_min').getValue()))){
                                                                return get_msg('err_thanband');
                                                            }
                                                        }
                                                        if(Ext.getCmp('win_opt_que').getValue() === 'tbf'){
                                                            if(Number(removeComma(Ext.getCmp('win_band_max').getValue())) < Number(removeComma(Ext.getCmp('win_que_leng1').getValue()))){
                                                                return get_msg('err_thantbf');
                                                            }
                                                        }
                                                        if(Ext.getCmp('win_opt_high').getValue() === 'tbf'){
                                                            if(Number(removeComma(Ext.getCmp('win_band_max').getValue())) < Number(removeComma(Ext.getCmp('opt_high_text1').getValue()))){
                                                                return get_msg('err_thantbf');
                                                            }
                                                        }
                                                        if(Ext.getCmp('win_opt_mid').getValue() === 'tbf'){
                                                            if(Number(removeComma(Ext.getCmp('win_band_max').getValue())) < Number(removeComma(Ext.getCmp('opt_mid_text1').getValue()))){
                                                                return get_msg('err_thantbf');
                                                            }
                                                        }
                                                        if(Ext.getCmp('win_opt_low').getValue() === 'tbf'){
                                                            if(Number(removeComma(Ext.getCmp('win_band_max').getValue())) < Number(removeComma(Ext.getCmp('opt_low_text1').getValue()))){
                                                                return get_msg('err_thantbf');
                                                            }
                                                        }
                                                    }
                                                }
                                                return true;
                                            },
                                            fieldInfo: {
                                                txt: msg_tip_length(0.1,
                                                10000,
                                                null)
                                            },
                                            cls: 'inp_unit',
                                            id: 'win_band_max',
                                            maxWidth: 175,
                                            width: 175,
                                            afterBodyEl: [
                                                '<div class="inp_after">{[__zen("mbps")]}</div>'
                                            ],
                                            fieldLabel: '',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maskRe: /[0-9.]/,
                                            maxLength: 7,
                                            maxLengthText: ' ',
                                            listeners: {
                                                errorchange: 'onWin_band_maxErrorChange',
                                                blur: 'onWin_band_maxBlur',
                                                focus: 'onWin_band_maxFocus',
                                                change: 'onWin_band_maxChange',
                                                keydown: 'onWin_band_maxKeydown'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'win_opt_con',
                            margin: '5 0 10 0',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'win_opt_fst',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            id: 'win_opt_que',
                                            width: 300,
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            editable: false,
                                            displayField: 'name',
                                            queryMode: 'local',
                                            store: {
                                                data: [
                                                    {
                                                        type: 'fifo',
                                                        name: 'FIFO'
                                                    },
                                                    {
                                                        type: 'sfq',
                                                        name: 'SFQ'
                                                    },
                                                    {
                                                        type: 'tbf',
                                                        name: 'TBF'
                                                    },
                                                    {
                                                        type: 'prio',
                                                        name: 'PRIO'
                                                    }
                                                ],
                                                fields: [
                                                    {
                                                        name: 'type'
                                                    },
                                                    {
                                                        name: 'name'
                                                    }
                                                ]
                                            },
                                            valueField: 'type',
                                            bind: {
                                                fieldLabel: '{queue_method}'
                                            },
                                            listeners: {
                                                afterrender: 'onWin_opt_queAfterRender',
                                                change: 'onWin_opt_queChange'
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            id: 'win_opt_fst_con',
                                            margin: '0 0 0 5',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: 'lb_req',
                                                    width: 120,
                                                    bind: {
                                                        text: '{queue_length}'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value !== true){
                                                            var _value = removeComma(value);

                                                            if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                            if(!LengthCheck(_value, 1, 65535)){ return ValidLimit(1, addComma(65535)); }
                                                        }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(1,
                                                        65635,
                                                        null)
                                                    },
                                                    id: 'win_que_leng',
                                                    margin: '0 0 0 5',
                                                    width: 180,
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    value: '5,000',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 6,
                                                    maxLengthText: ' ',
                                                    listeners: {
                                                        errorchange: 'onWin_que_lengErrorChange',
                                                        blur: 'onWin_que_lengBlur',
                                                        focus: 'onWin_que_lengFocus',
                                                        change: 'onWin_que_lengChange',
                                                        keydown: 'onWin_que_lengKeydown'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            hidden: true,
                                            id: 'win_opt_fst_con1',
                                            margin: '0 0 0 5',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    flex: 1,
                                                    cls: 'lb_req',
                                                    width: 120,
                                                    bind: {
                                                        text: '{speed}'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value !== true){
                                                            var _value = removeComma(value);
                                                            var chk = [];
                                                            for(var i in _value){
                                                                chk[i] = _value.substr(i,1);
                                                            }

                                                            if(Ext.getCmp('win_opt_que').getValue() === "tbf"){
                                                                if(!CheckNotNull(_value)){ return get_msg('err_null'); }

                                                                if(value !== true){
                                                                    var num = [];
                                                                    num = _value.split('.');

                                                                    if(num[0] === "0" && num[1] === undefined){ return ValidLimit(0.1, addComma(10000)); }
                                                                    if(num[1] === undefined){ num[1] = 0; }

                                                                    if(num.length > 2){ return get_msg('err_form'); }
                                                                    if(num[1].length > 1){ return get_msg('err_form'); }
                                                                    if(chk[chk.length-1] === "." || chk[0] === "."){ return get_msg('err_form'); }
                                                                    if(!LengthCheck(_value, 0.1, 10000)){ return ValidLimit(0.1, addComma(10000)); }
                                                                    if(num[0] === "0" && num[1] === "0"){ return ValidLimit(0.1, addComma(10000)); }

                                                                    if(Ext.getCmp('win_opt_que').getValue() === 'tbf'){
                                                                        if(Number(removeComma(Ext.getCmp('win_band_max').getValue()) < Number(removeComma(Ext.getCmp('win_que_leng1').getValue())))){
                                                                            return get_msg('err_thantbf');
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            else{
                                                                if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                                if(!LengthCheck(_value, 1, 65536)){ return ValidLimit(1, addComma(65536)); }
                                                                for(var i in chk){
                                                                    if(chk[i] === "."){ return get_msg('err_form'); }
                                                                }
                                                            }
                                                        }
                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0.1,
                                                        10000,
                                                        null)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'win_que_leng1',
                                                    margin: '0 0 0 5',
                                                    width: 180,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">{[__zen("mbps")]}</div>'
                                                    ],
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9.]/,
                                                    maxLength: 8,
                                                    maxLengthText: ' ',
                                                    listeners: {
                                                        errorchange: 'onWin_que_lengErrorChange1',
                                                        blur: 'onWin_que_lengBlur1',
                                                        focus: 'onWin_que_leng1Focus',
                                                        change: 'onWin_que_leng1Change',
                                                        keydown: 'onWin_que_leng1Keydown'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    id: 'win_opt_snd',
                                    margin: '5 0 0 0',
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
                                                    xtype: 'combobox',
                                                    id: 'win_opt_high',
                                                    width: 300,
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    editable: false,
                                                    displayField: 'name',
                                                    queryMode: 'local',
                                                    store: {
                                                        data: [
                                                            {
                                                                type: 'fifo',
                                                                name: 'FIFO'
                                                            },
                                                            {
                                                                type: 'sfq',
                                                                name: 'SFQ'
                                                            },
                                                            {
                                                                type: 'tbf',
                                                                name: 'TBF'
                                                            }
                                                        ],
                                                        fields: [
                                                            {
                                                                name: 'type'
                                                            },
                                                            {
                                                                name: 'name'
                                                            }
                                                        ]
                                                    },
                                                    valueField: 'type',
                                                    bind: {
                                                        fieldLabel: '{high}'
                                                    },
                                                    listeners: {
                                                        afterrender: 'onWin_opt_highAfterRender',
                                                        change: 'onWin_opt_highChange'
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    id: 'win_opt_high_con',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            cls: 'lb_req',
                                                            margin: '0 0 0 5',
                                                            width: 120,
                                                            bind: {
                                                                text: '{queue_length}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(value !== true){
                                                                    var _value = removeComma(value);
                                                                    if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                                    if(!LengthCheck(_value, 1, 65535)){ return ValidLimit(1, addComma(65535)); }
                                                                }

                                                                return true;
                                                            },
                                                            fieldInfo: {
                                                                txt: msg_tip_length(1,
                                                                65535,
                                                                null)
                                                            },
                                                            id: 'opt_high_text',
                                                            margin: '0 0 0 5',
                                                            width: 175,
                                                            labelSeparator: ' ',
                                                            labelWidth: 120,
                                                            msgTarget: 'none',
                                                            value: '5,000',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9]/,
                                                            maxLength: 6,
                                                            maxLengthText: ' ',
                                                            listeners: {
                                                                errorchange: 'onOpt_high_textErrorChange',
                                                                blur: 'onOpt_high_textBlur',
                                                                focus: 'onOpt_high_textFocus',
                                                                change: 'onOpt_high_textChange',
                                                                keydown: 'onOpt_high_textKeydown'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    id: 'win_opt_high_con1',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            cls: 'lb_req',
                                                            margin: '0 0 0 5',
                                                            width: 120,
                                                            bind: {
                                                                text: '{speed}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(value !== true){
                                                                    var _value = removeComma(value);
                                                                    var chk = [];
                                                                    for(var i in _value){
                                                                        chk[i] = _value.substr(i,1);
                                                                    }

                                                                    if(Ext.getCmp('win_opt_high').getValue() === "tbf"){
                                                                        if(!CheckNotNull(_value)){ return get_msg('err_null'); }

                                                                        if(value !== true){
                                                                            var num = [];
                                                                            num = _value.split('.');

                                                                            if(num[0] === "0" && num[1] === undefined){ return ValidLimit(0.1, addComma(10000)); }
                                                                            if(num[1] === undefined){ num[1] = 0; }

                                                                            if(num.length > 2){ return get_msg('err_form'); }
                                                                            if(num[1].length > 1){ return get_msg('err_form'); }
                                                                            if(chk[chk.length-1] === "." || chk[0] === "."){ return get_msg('err_form'); }
                                                                            if(!LengthCheck(_value, 0.1, 10000)){ return ValidLimit(0.1, addComma(10000)); }
                                                                            if(num[0] === "0" && num[1] === "0"){ return ValidLimit(0.1, addComma(10000)); }

                                                                            if(Ext.getCmp('win_opt_high').getValue() === 'tbf'){
                                                                                if(Number(removeComma(Ext.getCmp('win_band_max').getValue())) < Number(removeComma(Ext.getCmp('opt_high_text1').getValue()))){
                                                                                    return get_msg('err_thantbf');
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                    else{
                                                                        if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                                        if(!LengthCheck(_value, 1, 65536)){ return ValidLimit(1, addComma(65536)); }
                                                                        for(var i in chk){
                                                                            if(chk[i] === "."){ return get_msg('err_form'); }
                                                                        }
                                                                    }
                                                                }
                                                                return true;
                                                            },
                                                            fieldInfo: {
                                                                txt: msg_tip_length(0.1,
                                                                10000,
                                                                null)
                                                            },
                                                            cls: 'inp_unit',
                                                            id: 'opt_high_text1',
                                                            margin: '0 0 0 5',
                                                            width: 175,
                                                            afterBodyEl: [
                                                                '<div class="inp_after">{[__zen("mbps")]}</div>'
                                                            ],
                                                            labelSeparator: ' ',
                                                            labelWidth: 120,
                                                            msgTarget: 'none',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9.]/,
                                                            maxLength: 8,
                                                            maxLengthText: ' ',
                                                            listeners: {
                                                                errorchange: 'onOpt_high_textErrorChange1',
                                                                blur: 'onOpt_high_textBlur1',
                                                                focus: 'onOpt_high_textFocus1',
                                                                change: 'onOpt_high_text1Change',
                                                                keydown: 'onOpt_high_text1Keydown'
                                                            }
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
                                                    xtype: 'combobox',
                                                    id: 'win_opt_mid',
                                                    width: 300,
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    editable: false,
                                                    displayField: 'name',
                                                    queryMode: 'local',
                                                    store: {
                                                        data: [
                                                            {
                                                                type: 'fifo',
                                                                name: 'FIFO'
                                                            },
                                                            {
                                                                type: 'sfq',
                                                                name: 'SFQ'
                                                            },
                                                            {
                                                                type: 'tbf',
                                                                name: 'TBF'
                                                            }
                                                        ],
                                                        fields: [
                                                            {
                                                                name: 'type'
                                                            },
                                                            {
                                                                name: 'name'
                                                            }
                                                        ]
                                                    },
                                                    valueField: 'type',
                                                    bind: {
                                                        fieldLabel: '{middle}'
                                                    },
                                                    listeners: {
                                                        afterrender: 'onWin_opt_midAfterRender',
                                                        change: 'onWin_opt_midChange'
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    id: 'win_opt_mid_con',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            cls: 'lb_req',
                                                            margin: '0 0 0 5',
                                                            width: 120,
                                                            bind: {
                                                                text: '{queue_length}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(value !== true){
                                                                    var _value = removeComma(value);
                                                                    if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                                    if(!LengthCheck(_value, 1, 65535)){ return ValidLimit(1, addComma(65535)); }
                                                                }

                                                                return true;
                                                            },
                                                            fieldInfo: {
                                                                txt: msg_tip_length(1,
                                                                65535,
                                                                null)
                                                            },
                                                            id: 'opt_mid_text',
                                                            margin: '0 0 0 5',
                                                            width: 175,
                                                            labelSeparator: ' ',
                                                            labelWidth: 120,
                                                            msgTarget: 'none',
                                                            value: '5,000',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9]/,
                                                            maxLength: 6,
                                                            maxLengthText: ' ',
                                                            listeners: {
                                                                errorchange: 'onOpt_mid_textErrorChange',
                                                                blur: 'onOpt_mid_textBlur',
                                                                focus: 'onOpt_mid_textFocus',
                                                                change: 'onOpt_mid_textChange',
                                                                keydown: 'onOpt_mid_textKeydown'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    id: 'win_opt_mid_con1',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            cls: 'lb_req',
                                                            margin: '0 0 0 5',
                                                            width: 120,
                                                            bind: {
                                                                text: '{speed}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(value !== true){
                                                                    var _value = removeComma(value);
                                                                    var chk = [];
                                                                    for(var i in _value){
                                                                        chk[i] = _value.substr(i,1);
                                                                    }

                                                                    if(Ext.getCmp('win_opt_mid').getValue() === "tbf"){
                                                                        if(!CheckNotNull(_value)){ return get_msg('err_null'); }

                                                                        if(value !== true){
                                                                            var num = [];
                                                                            num = _value.split('.');

                                                                            if(num[0] === "0" && num[1] === undefined){ return ValidLimit(0.1, addComma(10000)); }
                                                                            if(num[1] === undefined){ num[1] = 0; }

                                                                            if(num.length > 2){ return get_msg('err_form'); }
                                                                            if(num[1].length > 1){ return get_msg('err_form'); }
                                                                            if(chk[chk.length-1] === "." || chk[0] === "."){ return get_msg('err_form'); }
                                                                            if(!LengthCheck(_value, 0.1, 10000)){ return ValidLimit(0.1, addComma(10000)); }
                                                                            if(num[0] === "0" && num[1] === "0"){ return ValidLimit(0.1, addComma(10000)); }

                                                                            if(Ext.getCmp('win_opt_mid').getValue() === 'tbf'){
                                                                                if(Number(removeComma(Ext.getCmp('win_band_max').getValue())) < Number(removeComma(Ext.getCmp('opt_mid_text1').getValue()))){
                                                                                    return get_msg('err_thantbf');
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                    else{
                                                                        if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                                        if(!LengthCheck(_value, 1, 65536)){ return ValidLimit(1, addComma(65536)); }
                                                                        for(var i in chk){
                                                                            if(chk[i] === "."){ return get_msg('err_form'); }
                                                                        }
                                                                    }
                                                                }
                                                                return true;
                                                            },
                                                            fieldInfo: {
                                                                txt: msg_tip_length(0.1,
                                                                10000,
                                                                null)
                                                            },
                                                            cls: 'inp_unit',
                                                            id: 'opt_mid_text1',
                                                            margin: '0 0 0 5',
                                                            width: 175,
                                                            afterBodyEl: [
                                                                '<div class="inp_after">{[__zen("mbps")]}</div>'
                                                            ],
                                                            labelSeparator: ' ',
                                                            labelWidth: 120,
                                                            msgTarget: 'none',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9.]/,
                                                            maxLength: 8,
                                                            maxLengthText: ' ',
                                                            listeners: {
                                                                errorchange: 'onOpt_mid_textErrorChange1',
                                                                blur: 'onOpt_mid_textBlur1',
                                                                focus: 'onOpt_mid_textFocus1',
                                                                change: 'onOpt_mid_text1Change',
                                                                keydown: 'onOpt_mid_text1Keydown'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            margin: '5 0 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    id: 'win_opt_low',
                                                    width: 300,
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    editable: false,
                                                    displayField: 'name',
                                                    queryMode: 'local',
                                                    store: {
                                                        data: [
                                                            {
                                                                type: 'fifo',
                                                                name: 'FIFO'
                                                            },
                                                            {
                                                                type: 'sfq',
                                                                name: 'SFQ'
                                                            },
                                                            {
                                                                type: 'tbf',
                                                                name: 'TBF'
                                                            }
                                                        ],
                                                        fields: [
                                                            {
                                                                name: 'type'
                                                            },
                                                            {
                                                                name: 'name'
                                                            }
                                                        ]
                                                    },
                                                    valueField: 'type',
                                                    bind: {
                                                        fieldLabel: '{low}'
                                                    },
                                                    listeners: {
                                                        afterrender: 'onWin_opt_lowAfterRender',
                                                        change: 'onWin_opt_lowChange'
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    id: 'win_opt_low_con',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            cls: 'lb_req',
                                                            margin: '0 0 0 5',
                                                            width: 120,
                                                            bind: {
                                                                text: '{queue_length}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(value !== true){
                                                                    var _value = removeComma(value);
                                                                    var chk = [];
                                                                    for(var i in _value){
                                                                        chk[i] = _value.substr(i,1);
                                                                    }

                                                                    if(Ext.getCmp('win_opt_low').getValue() === "tbf"){
                                                                        if(!CheckNotNull(_value)){ return get_msg('err_null'); }

                                                                        if(value !== true){
                                                                            var num = [];
                                                                            num = _value.split('.');

                                                                            if(num[0] === "0" && num[1] === undefined){ return ValidLimit(0.1, addComma(10000)); }
                                                                            if(num[1] === undefined){ num[1] = 0; }

                                                                            if(num.length > 2){ return get_msg('err_form'); }
                                                                            if(num[1].length > 1){ return get_msg('err_form'); }
                                                                            if(chk[chk.length-1] === "." || chk[0] === "."){ return get_msg('err_form'); }
                                                                            if(!LengthCheck(_value, 0.1, 10000)){ return ValidLimit(0.1, addComma(10000)); }
                                                                            if(num[0] === "0" && num[1] === "0"){ return ValidLimit(0.1, addComma(10000)); }

                                                                            if(Ext.getCmp('win_opt_low').getValue() === 'tbf'){
                                                                                if(Number(Ext.getCmp('win_band_max').getValue()) < Number(Ext.getCmp('opt_low_text').getValue())){
                                                                                    return get_msg('err_thantbf');
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                    else{
                                                                        if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                                        if(!LengthCheck(_value, 1, 65535)){ return ValidLimit(1, addComma(65535)); }
                                                                        for(var i in chk){
                                                                            if(chk[i] === "."){ return get_msg('err_form'); }
                                                                        }
                                                                    }
                                                                }
                                                                return true;
                                                            },
                                                            fieldInfo: {
                                                                txt: msg_tip_length(1,
                                                                65535,
                                                                null)
                                                            },
                                                            id: 'opt_low_text',
                                                            margin: '0 0 0 5',
                                                            width: 175,
                                                            labelSeparator: ' ',
                                                            labelWidth: 120,
                                                            msgTarget: 'none',
                                                            value: '5,000',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9.]/,
                                                            maxLength: 6,
                                                            maxLengthText: ' ',
                                                            listeners: {
                                                                errorchange: 'onOpt_low_textErrorChange',
                                                                blur: 'onOpt_low_textBlur',
                                                                focus: 'onOpt_low_textFocus',
                                                                change: 'onOpt_low_textChange',
                                                                keydown: 'onOpt_low_textKeydown'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    id: 'win_opt_low_con1',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            cls: 'lb_req',
                                                            margin: '0 0 0 5',
                                                            width: 120,
                                                            bind: {
                                                                text: '{speed}'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(value !== true){
                                                                    var _value = removeComma(value);
                                                                    var chk = [];
                                                                    for(var i in _value){
                                                                        chk[i] = _value.substr(i,1);
                                                                    }

                                                                    if(Ext.getCmp('win_opt_low').getValue() === "tbf"){
                                                                        if(!CheckNotNull(_value)){ return get_msg('err_null'); }

                                                                        if(value !== true){
                                                                            var num = [];
                                                                            num = _value.split('.');

                                                                            if(num[0] === "0" && num[1] === undefined){ return ValidLimit(0.1, addComma(10000)); }
                                                                            if(num[1] === undefined){ num[1] = 0; }

                                                                            if(num.length > 2){ return get_msg('err_form'); }
                                                                            if(num[1].length > 1){ return get_msg('err_form'); }
                                                                            if(chk[chk.length-1] === "." || chk[0] === "."){ return get_msg('err_form'); }
                                                                            if(!LengthCheck(_value, 0.1, 10000)){ return ValidLimit(0.1, addComma(10000)); }
                                                                            if(num[0] === "0" && num[1] === "0"){ return ValidLimit(0.1, addComma(10000)); }

                                                                            if(Ext.getCmp('win_opt_low').getValue() === 'tbf'){
                                                                                if(Number(Ext.getCmp('win_band_max').getValue()) < Number(Ext.getCmp('opt_low_text1').getValue())){
                                                                                    return get_msg('err_thantbf');
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                    else{
                                                                        if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                                        if(!LengthCheck(_value, 1, 65536)){ return ValidLimit(1, addComma(65536)); }
                                                                        for(var i in chk){
                                                                            if(chk[i] === "."){ return get_msg('err_form'); }
                                                                        }
                                                                    }
                                                                }
                                                                return true;
                                                            },
                                                            fieldInfo: {
                                                                txt: msg_tip_length(0.1,
                                                                10000,
                                                                null)
                                                            },
                                                            cls: 'inp_unit',
                                                            id: 'opt_low_text1',
                                                            margin: '0 0 0 5',
                                                            width: 175,
                                                            afterBodyEl: [
                                                                '<div class="inp_after">{[__zen("mbps")]}</div>'
                                                            ],
                                                            labelSeparator: ' ',
                                                            labelWidth: 120,
                                                            msgTarget: 'none',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9.]/,
                                                            maxLength: 7,
                                                            maxLengthText: ' ',
                                                            listeners: {
                                                                errorchange: 'onOpt_low_textErrorChange1',
                                                                blur: 'onOpt_low_textBlur1',
                                                                focus: 'onOpt_low_textFocus1',
                                                                change: 'onOpt_low_text1Change',
                                                                keydown: 'onOpt_low_text1Keydown'
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
                    id: 'win_btn_ok',
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
                    id: 'win_btn_cancel',
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

    onWin_objectErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_objectBlur: function(component, event, eOpts) {
        Ext.getCmp('win_object').validateValue(true);
    },

    onWin_band_minErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_band_minBlur: function(component, event, eOpts) {
        Ext.getCmp('win_band_min').validateValue(true);
        setTipBlur(this, component);
    },

    onWin_band_minFocus: function(component, event, eOpts) {
        setTipFocus(this, component);
    },

    onWin_band_minChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onWin_band_minKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_band_maxErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_band_maxBlur: function(component, event, eOpts) {
        Ext.getCmp('win_band_max').validateValue(true);
        setTipBlur(this, component);
    },

    onWin_band_maxFocus: function(component, event, eOpts) {
        setTipFocus(this, component);
    },

    onWin_band_maxChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onWin_band_maxKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_opt_queAfterRender: function(component, eOpts) {
        var que = Ext.getCmp('win_opt_que').getStore().data;

        if(que.length > 0){
            Ext.getCmp("win_opt_que").setValue(que.items[0].data['type']);
        }
    },

    onWin_opt_queChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === 'prio'){
            Ext.getCmp('win_opt_snd').show();
            Ext.getCmp('win_opt_fst_con').hide();
            Ext.getCmp('win_opt_fst_con1').hide();
        }
        else if(newValue === 'tbf'){
            Ext.getCmp('win_opt_fst_con1').show();
            Ext.getCmp('win_opt_fst_con').hide();
            Ext.getCmp('win_opt_snd').hide();
        //     Ext.getCmp('win_que_leng').show();
        //     Ext.getCmp('win_que_leng').setFieldLabel("속도");
        //     Ext.getCmp('win_que_leng').setValue("");
        //     Ext.getCmp('win_que_leng').validateValue(true);
        //     Ext.getCmp('que_label').show();
        }
        else{
            Ext.getCmp('win_opt_fst_con').show();
            Ext.getCmp('win_opt_fst_con1').hide();
            Ext.getCmp('win_opt_snd').hide();
        //     Ext.getCmp('win_que_leng').show();
        //     Ext.getCmp('win_que_leng').setFieldLabel("큐 길이");
        //     Ext.getCmp('win_que_leng').setValue("5000");
        //     Ext.getCmp('que_label').hide();
        }
    },

    onWin_que_lengErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_que_lengBlur: function(component, event, eOpts) {
        Ext.getCmp('win_que_leng').validateValue(true);
        setTipBlur(this, component);
    },

    onWin_que_lengFocus: function(component, event, eOpts) {
        setTipFocus(this, component);
    },

    onWin_que_lengChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onWin_que_lengKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_que_lengErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_que_lengBlur1: function(component, event, eOpts) {
        Ext.getCmp('win_que_leng1').validateValue(true);
        setTipBlur(this, component);
    },

    onWin_que_leng1Focus: function(component, event, eOpts) {
        setTipFocus(this, component);
    },

    onWin_que_leng1Change: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onWin_que_leng1Keydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_opt_highAfterRender: function(component, eOpts) {
        var que = Ext.getCmp('win_opt_high').getStore().data;

        if(que.length > 0){
            Ext.getCmp("win_opt_high").setValue(que.items[0].data['type']);
        }
    },

    onWin_opt_highChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === 'tbf'){
            Ext.getCmp('win_opt_high_con').hide();
            Ext.getCmp('win_opt_high_con1').show();
        //     Ext.getCmp('opt_high_text').setFieldLabel("속도");
        //     Ext.getCmp('opt_high_text').setValue("");
        //     Ext.getCmp('opt_high_text').validateValue(true);
        //     Ext.getCmp('high_label').show();
        }
        else{
            Ext.getCmp('win_opt_high_con1').hide();
            Ext.getCmp('win_opt_high_con').show();
        //     Ext.getCmp('opt_high_text').setFieldLabel("큐 길이");
        //     Ext.getCmp('opt_high_text').setValue("5000");
        //     Ext.getCmp('high_label').hide();
        }
    },

    onOpt_high_textErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onOpt_high_textBlur: function(component, event, eOpts) {
        Ext.getCmp('opt_high_text').validateValue(true);
        setTipBlur(this, component);
    },

    onOpt_high_textFocus: function(component, event, eOpts) {
        setTipFocus(this, component);
    },

    onOpt_high_textChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onOpt_high_textKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onOpt_high_textErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onOpt_high_textBlur1: function(component, event, eOpts) {
        Ext.getCmp('opt_high_text1').validateValue(true);
        setTipBlur(this, component);
    },

    onOpt_high_textFocus1: function(component, event, eOpts) {
        setTipFocus(this, component);
    },

    onOpt_high_text1Change: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onOpt_high_text1Keydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_opt_midAfterRender: function(component, eOpts) {
        var que = Ext.getCmp('win_opt_mid').getStore().data;

        if(que.length > 0){
            Ext.getCmp("win_opt_mid").setValue(que.items[0].data['type']);
        }
    },

    onWin_opt_midChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === 'tbf'){
            Ext.getCmp('win_opt_mid_con1').show();
            Ext.getCmp('win_opt_mid_con').hide();
        //     Ext.getCmp('opt_mid_text').setFieldLabel("속도");
        //     Ext.getCmp('opt_mid_text').setValue("");
        //     Ext.getCmp('opt_mid_text').validateValue(true);
        //     Ext.getCmp('mid_label').show();
        }
        else{
            Ext.getCmp('win_opt_mid_con1').hide();
            Ext.getCmp('win_opt_mid_con').show();
        //     Ext.getCmp('opt_mid_text').setFieldLabel("큐 길이");
        //     Ext.getCmp('opt_mid_text').setValue("5000");
        //     Ext.getCmp('mid_label').hide();
        }
    },

    onOpt_mid_textErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);


    },

    onOpt_mid_textBlur: function(component, event, eOpts) {
        Ext.getCmp('opt_mid_text').validateValue(true);
        setTipBlur(this, component);
    },

    onOpt_mid_textFocus: function(component, event, eOpts) {
        setTipFocus(this, component);
    },

    onOpt_mid_textChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onOpt_mid_textKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onOpt_mid_textErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onOpt_mid_textBlur1: function(component, event, eOpts) {
        Ext.getCmp('opt_mid_text1').validateValue(true);
        setTipBlur(this, component);
    },

    onOpt_mid_textFocus1: function(component, event, eOpts) {
        setTipFocus(this, component);
    },

    onOpt_mid_text1Change: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onOpt_mid_text1Keydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_opt_lowAfterRender: function(component, eOpts) {
        var que = Ext.getCmp('win_opt_low').getStore().data;

        if(que.length > 0){
            Ext.getCmp("win_opt_low").setValue(que.items[0].data['type']);
        }
    },

    onWin_opt_lowChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === 'tbf'){
            Ext.getCmp('win_opt_low_con1').show();
            Ext.getCmp('win_opt_low_con').hide();
        //     Ext.getCmp('opt_low_text').setFieldLabel("속도");
        //     Ext.getCmp('opt_low_text').setValue("");
        //     Ext.getCmp('opt_low_text').validateValue(true);
        //     Ext.getCmp('low_label').show();
        }
        else{
            Ext.getCmp('win_opt_low_con1').hide();
            Ext.getCmp('win_opt_low_con').show();
        //     Ext.getCmp('opt_low_text').setFieldLabel("큐 길이");
        //     Ext.getCmp('opt_low_text').setValue("5000");
        //     Ext.getCmp('low_label').hide();
        }
    },

    onOpt_low_textErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onOpt_low_textBlur: function(component, event, eOpts) {
        Ext.getCmp('opt_low_text').validateValue(true);
        setTipBlur(this, component);
    },

    onOpt_low_textFocus: function(component, event, eOpts) {
        setTipFocus(this, component);
    },

    onOpt_low_textChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onOpt_low_textKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onOpt_low_textErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onOpt_low_textBlur1: function(component, event, eOpts) {
        Ext.getCmp('opt_low_text1').validateValue(true);
        setTipBlur(this, component);
    },

    onOpt_low_textFocus1: function(component, event, eOpts) {
        setTipFocus(this, component);
    },

    onOpt_low_text1Change: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onOpt_low_text1Keydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        me.fieldInfo = makeZenTip();
        me.set_btn = false;
        chk_zenauth(null);
        if(this.edit === "edit"){

            me.setTitle(__zen('edit_qos'));

            showLoadMask();

            var _params = {
                basename : Ext.encode("object_qos")
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getObjectList',
                _params,

                function(data){
                    hideLoadMask();
                    for(var i in data.list){
                        if(data.list[i]['@cid'] === me.record.data['@cid']){
                            Ext.getCmp('win_object').setValue(data.list[i].name);
                            Ext.getCmp('win_desc').setValue(data.list[i].desc);
                            Ext.getCmp('win_band_min').setValue(data.list[i].bandwidth.min);
                            Ext.getCmp('win_band_max').setValue(data.list[i].bandwidth.max);
                            if(data.list[i].option.type === "prio"){
                                Ext.getCmp('win_opt_que').setValue(data.list[i].option.type);
                                Ext.getCmp('win_opt_high').setValue(data.list[i].option.max.type);
                                if(data.list[i].option.max.type === "tbf"){ Ext.getCmp('opt_high_text1').setValue(data.list[i].option.max.val); }
                                else{ Ext.getCmp('opt_high_text').setValue(data.list[i].option.max.val); }
                                Ext.getCmp('win_opt_mid').setValue(data.list[i].option.mid.type);
                                if(data.list[i].option.mid.type === "tbf"){ Ext.getCmp('opt_mid_text1').setValue(data.list[i].option.mid.val); }
                                else{ Ext.getCmp('opt_mid_text').setValue(data.list[i].option.mid.val); }
                                Ext.getCmp('win_opt_low').setValue(data.list[i].option.min.type);
                                if(data.list[i].option.min.type === "tbf"){ Ext.getCmp('opt_low_text1').setValue(data.list[i].option.min.val); }
                                else{ Ext.getCmp('opt_low_text').setValue(data.list[i].option.min.val); }
                            }
                            else if(data.list[i].option.type === "tbf"){
                                Ext.getCmp('win_opt_que').setValue(data.list[i].option.type);
                                Ext.getCmp('win_que_leng1').setValue(data.list[i].option.val);
                            }
                            else{
                                Ext.getCmp('win_opt_que').setValue(data.list[i].option.type);
                                Ext.getCmp('win_que_leng').setValue(data.list[i].option.val);
                            }
                        }
                    }
                }
            );
        }
        else{ me.setTitle(__zen('add_qos')); }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;
        var qos = Ext.getCmp('NFW2_firewall_object_qos');
        var store = Ext.data.StoreManager.lookup('store_firewall_object_qos');
        var qdiscid;
        var chk;

        if(Ext.getCmp('win_object').isValid() === false){ Ext.getCmp('win_object').focus(); return false; }
        if(me.edit === "edit"){
            var chk_num = 0;
            for(var i in store.data.items){
                if(store.data.items[i].data.name === Ext.getCmp('win_object').getValue()){
                    if(Number(i) !== Number(me.edit_index)){ chk_num++; }
                }
            }
            if(chk_num > 0){ chk = true; }
        }
        else{
            for(var i in store.data.items){
                if(store.data.items[i].data.name === Ext.getCmp('win_object').getValue()){ chk = true; }
            }
        }

        if(chk){
            me.set_btn = true;
            Ext.getCmp('win_object').isValid();
            return false;
        }

        if(Ext.getCmp('win_band_min').isValid() === false){ Ext.getCmp('win_band_min').focus(); return false; }
        if(Ext.getCmp('win_band_max').isValid() === false){ Ext.getCmp('win_band_max').focus(); return false; }

        if(Ext.getCmp('win_opt_que').getValue() !== "prio"){
            if(Ext.getCmp('win_opt_que').getValue() !== "tbf"){
                if(Ext.getCmp('win_que_leng').isValid() === false){ Ext.getCmp('win_que_leng').focus(); return false; }
            }
            else{
                if(Ext.getCmp('win_que_leng1').isValid() === false){ Ext.getCmp('win_que_leng1').focus(); return false; }
            }
        }
        else{
            if(Ext.getCmp('win_opt_high').getValue() !== "tbf"){
                if(Ext.getCmp('opt_high_text').isValid() === false){ Ext.getCmp('opt_high_text').focus(); return false; }
            }
            else{
                if(Ext.getCmp('opt_high_text1').isValid() === false){ Ext.getCmp('opt_high_text1').focus(); return false; }
            }

            if(Ext.getCmp('win_opt_mid').getValue() !== "tbf"){
                if(Ext.getCmp('opt_mid_text').isValid() === false){ Ext.getCmp('opt_mid_text').focus(); return false; }
            }
            else{
                if(Ext.getCmp('opt_mid_text1').isValid() === false){ Ext.getCmp('opt_mid_text1').focus(); return false; }
            }

            if(Ext.getCmp('win_opt_low').getValue() !== "tbf"){
                if(Ext.getCmp('opt_low_text').isValid() === false){ Ext.getCmp('opt_low_text').focus(); return false; }
            }
            else{
                if(Ext.getCmp('opt_low_text1').isValid() === false){ Ext.getCmp('opt_low_text1').focus(); return false; }
            }
        }
        if(me.edit === "edit"){
            qdiscid = me.record.data.qdiscid;
        }
        else{
            var store = Ext.data.StoreManager.lookup('store_firewall_object_qos').data;
            store.sort('qdiscid', 'ASC');
            if(store.length === 0){ qdiscid = 10; }
            else{
                qdiscid = store.length+10;
                if(store.length+9 === store.items[store.length-1].data['qdiscid']){ qdiscid = store.length+10;}
                else{
                    for(var i in store.items){
                        var num = Number(i)+10;
                        if(store.items[i].data['qdiscid'] !== num){
                            if(num < qdiscid){ qdiscid = num; }
                        }
                    }
                }
            }

        }
        var obj = {};
        var band_min = Number(removeComma(Ext.getCmp('win_band_min').getValue()));
        var band_max = Number(removeComma(Ext.getCmp('win_band_max').getValue()));

        obj = {
            '@cid' : me.cid,
            'name' : Ext.getCmp('win_object').getValue(),
            'desc' : Ext.getCmp('win_desc').getValue(),
            'qdiscid' : qdiscid,
            'bandwidth' : {
                'min' : String(band_min),
                'max' : String(band_max)
            },
            '_kind' : 'object_qos'
        };

        if(Ext.getCmp('win_opt_que').getValue() === "tbf"){
            obj.option = {
                'type' : Ext.getCmp('win_opt_que').getValue(),
                'val' : removeComma(Ext.getCmp('win_que_leng1').getValue())
            };
        }
        else if(Ext.getCmp('win_opt_que').getValue() === "prio"){
            var min_val;
            var mid_val;
            var max_val;

            if(Ext.getCmp('win_opt_high').getValue() !== "tbf"){ max_val = removeComma(Ext.getCmp('opt_high_text').getValue()); }
            else{ max_val = removeComma(Ext.getCmp('opt_high_text1').getValue()); }
            if(Ext.getCmp('win_opt_mid').getValue() !== "tbf"){ mid_val = removeComma(Ext.getCmp('opt_mid_text').getValue()); }
            else{ mid_val = removeComma(Ext.getCmp('opt_mid_text1').getValue()); }
            if(Ext.getCmp('win_opt_low').getValue() !== "tbf"){ min_val = removeComma(Ext.getCmp('opt_low_text').getValue()); }
            else{ min_val = removeComma(Ext.getCmp('opt_low_text1').getValue()); }

            obj.option = {
                'type' : Ext.getCmp('win_opt_que').getValue(),
                'min' : {
                    'type' : Ext.getCmp('win_opt_low').getValue(),
                    'val' : min_val
                },
                'mid' : {
                    'type' : Ext.getCmp('win_opt_mid').getValue(),
                    'val' : mid_val
                },
                'max' : {
                    'type' : Ext.getCmp('win_opt_high').getValue(),
                    'val' : max_val
                }
            };
        }
        else{
            obj.option = {
                'type' : Ext.getCmp('win_opt_que').getValue(),
                'val' : removeComma(Ext.getCmp('win_que_leng').getValue())
            };
        }

        if(me.edit === "edit"){
            obj['@cid'] = me.record.data['@cid'];
        }

        var update = (me.edit==="edit")?true:false;

        var _params = {
            basename : Ext.encode('object_qos'),
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
                var store = Ext.data.StoreManager.lookup('store_firewall_object_qos');
                store.sorters.clear();
                store.getProxy().setExtraParam('sort_list', Ext.encode([['name',1]]));
                if(me.edit !== "edit"){
                    store.getProxy().setExtraParam('search_info',Ext.encode({}));
                    Ext.getCmp('qos_search_text').reset();
                    Ext.getCmp('qos_btn_res').hide();
                    store.load(function(response){
                        Ext.getCmp('st_fw_qos_obj_cnt').setValue(store.totalCount +"/" + me.max);
                    });
                    Ext.Msg.show({
                        title: __weguardia,
                        msg: get_msg("msg_ok_add"),
                        width: 300,
                        buttons: Ext.Msg.YESNO,
                        buttonText:{
                            yes: __zen('add_plus'),
                            no: __zen('close')
                        },
                        fn: me.set_win,
                        icon: Ext.window.MessageBox.INFO
                    });
                }
                else{
                    store.load(function(response){
                        //                 Ext.getCmp('st_fw_qos_obj_cnt').setValue(store.totalCount +"/" + me.max);
                    });
                    Ext.Msg.show({
                        title: __weguardia,
                        msg: get_msg("msg_ok_edit"),
                        width: 300,
                        buttons: Ext.Msg.OK,
                        icon: Ext.window.MessageBox.INFO,
                        fn: me.set_win
                    });
                }

            }
        );
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    set_win: function(btn) {
        if(btn === "yes"){
            Ext.getCmp('win_object').reset();
            Ext.getCmp('win_desc').reset();
            Ext.getCmp('win_band_min').reset();
            Ext.getCmp('win_band_max').reset();
            Ext.getCmp("win_opt_que").setValue(Ext.getCmp("win_opt_que").getStore().data.items[0].data['type']);
            Ext.getCmp('win_que_leng').reset();
            Ext.getCmp('win_que_leng1').reset();
            Ext.getCmp("win_opt_high").setValue(Ext.getCmp("win_opt_high").getStore().data.items[0].data['type']);
            Ext.getCmp('opt_high_text').reset();
            Ext.getCmp('opt_high_text1').reset();
            Ext.getCmp("win_opt_mid").setValue(Ext.getCmp("win_opt_mid").getStore().data.items[0].data['type']);
            Ext.getCmp('opt_mid_text').reset();
            Ext.getCmp('opt_mid_text1').reset();
            Ext.getCmp("win_opt_low").setValue(Ext.getCmp("win_opt_low").getStore().data.items[0].data['type']);
            Ext.getCmp('opt_low_text').reset();
            Ext.getCmp('opt_low_text1').reset();
        }
        else{
            Ext.getCmp('win_qos').close();
        }
    }

});