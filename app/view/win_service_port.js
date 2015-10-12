
Ext.define('NFW2.view.win_service_port', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_service_port',

    requires: [
        'NFW2.view.win_service_portViewModel',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'win_service_port'
    },
    cls: 'zen_win',
    height: 400,
    id: 'win_service_port',
    scrollable: true,
    width: 1000,
    title: '서비스 포트 추가',
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
            items: [
                {
                    xtype: 'container',
                    minWidth: 840,
                    items: [
                        {
                            xtype: 'container',
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
                                    id: 'name',
                                    width: 500,
                                    labelSeparator: ' ',
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 31,
                                    minLength: 1,
                                    bind: {
                                        fieldLabel: '{obj_name}'
                                    },
                                    listeners: {
                                        errorchange: 'onTextfieldErrorChange',
                                        blur: 'onNameBlur'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            maxHeight: 27,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: 'desc',
                                            width: 500,
                                            labelSeparator: ' ',
                                            msgTarget: 'none',
                                            enforceMaxLength: true,
                                            maxLength: 127,
                                            minLength: 1,
                                            bind: {
                                                fieldLabel: '{desc}'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            iconCls: 'icb_add',
                                            bind: {
                                                text: '{add}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '5 0 0 0',
                            scrollable: true,
                            style: 'border:1px solid #ccc',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    autoScroll: true,
                                    flex: 1,
                                    height: 200,
                                    id: 'c_pro_list',
                                    padding: 5,
                                    scrollable: true,
                                    items: [
                                        {
                                            xtype: 'container',
                                            height: 27,
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    id: 'protocol_1',
                                                    itemId: 'protocol',
                                                    width: 150,
                                                    labelSeparator: ' ',
                                                    labelWidth: 70,
                                                    value: 'tcp',
                                                    editable: false,
                                                    displayField: 'name',
                                                    store: 'store_port_protocol',
                                                    valueField: 'val',
                                                    bind: {
                                                        fieldLabel: '{protocol}'
                                                    },
                                                    listeners: {
                                                        afterrender: 'onComboboxAfterRender',
                                                        change: 'onProtocolChange'
                                                    }
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    hidden: true,
                                                    id: 'sel_icmp_1',
                                                    itemId: 'sel_icmp',
                                                    width: 200,
                                                    fieldLabel: '',
                                                    value: 'Any',
                                                    editable: false,
                                                    displayField: 'val',
                                                    store: 'store_port_icmp',
                                                    valueField: 'val'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    hidden: true,
                                                    id: 'sel_icmpv6_1',
                                                    itemId: 'sel_icmpv6',
                                                    width: 200,
                                                    fieldLabel: '',
                                                    value: 'Any',
                                                    editable: false,
                                                    displayField: 'val',
                                                    store: 'store_port_icmpv6',
                                                    valueField: 'val'
                                                },
                                                {
                                                    xtype: 'container',
                                                    itemId: 'c_tu',
                                                    layout: 'table',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(value === true){ return true; }
                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                if(!ValidNum(value)){ return get_msg('err_form'); }
                                                                if(!LengthCheck(value, 0, 65535)){ return ValidLimit(0, 65535); }

                                                                return true;
                                                            },
                                                            fieldInfo: '',
                                                            cls: 'lb_req',
                                                            id: 's_start_1',
                                                            itemId: 's_start',
                                                            width: 150,
                                                            labelSeparator: ' ',
                                                            labelWidth: 80,
                                                            msgTarget: 'none',
                                                            value: '1024',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9.]/,
                                                            maxLength: 5,
                                                            minLength: 1,
                                                            bind: {
                                                                fieldLabel: '{src_port}'
                                                            },
                                                            listeners: {
                                                                errorchange: 'onS_startErrorChange',
                                                                keydown: 'onS_startKeydown',
                                                                focus: 'onS_start_1Focus',
                                                                blur: 'onS_start_1Blur'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(value === true){ return true; }
                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                if(!ValidNum(value)){ return get_msg('err_form'); }
                                                                if(!LengthCheck(value, 0, 65535)){ return ValidLimit(0, 65535); }

                                                                return true;
                                                            },
                                                            fieldInfo: '',
                                                            id: 's_end_1',
                                                            itemId: 's_end',
                                                            style: 'margin-left:3px',
                                                            width: 80,
                                                            fieldLabel: '~',
                                                            labelSeparator: ' ',
                                                            labelWidth: 10,
                                                            msgTarget: 'none',
                                                            value: '65535',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9.]/,
                                                            maxLength: 5,
                                                            minLength: 1,
                                                            listeners: {
                                                                errorchange: 'onS_endErrorChange',
                                                                keydown: 'onS_endKeydown',
                                                                focus: 'onS_end_1Focus',
                                                                blur: 'onS_end_1Blur'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(value === true){ return true; }
                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                if(!ValidNum(value)){ return get_msg('err_form'); }
                                                                if(!LengthCheck(value, 0, 65535)){ return ValidLimit(0, 65535); }

                                                                return true;
                                                            },
                                                            fieldInfo: '',
                                                            cls: 'lb_req',
                                                            id: 'd_start_1',
                                                            itemId: 'd_start',
                                                            style: 'margin-left:10px;',
                                                            width: 170,
                                                            labelSeparator: ' ',
                                                            msgTarget: 'none',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9.]/,
                                                            maxLength: 5,
                                                            minLength: 1,
                                                            bind: {
                                                                fieldLabel: '{dest_port}'
                                                            },
                                                            listeners: {
                                                                errorchange: 'onD_startErrorChange',
                                                                keydown: 'onD_startKeydown',
                                                                focus: 'onD_start_1Focus',
                                                                blur: 'onD_start_1Blur'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(value === true){ return true; }
                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                if(!ValidNum(value)){ return get_msg('err_form'); }
                                                                if(!LengthCheck(value, 0, 65535)){ return ValidLimit(0, 65535); }

                                                                return true;
                                                            },
                                                            fieldInfo: '',
                                                            id: 'd_end_1',
                                                            itemId: 'd_end',
                                                            style: 'margin-left:3px;',
                                                            width: 80,
                                                            fieldLabel: '~',
                                                            labelSeparator: ' ',
                                                            labelWidth: 10,
                                                            msgTarget: 'none',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9.]/,
                                                            maxLength: 5,
                                                            minLength: 1,
                                                            listeners: {
                                                                errorchange: 'onD_endErrorChange',
                                                                keydown: 'onD_endKeydown',
                                                                focus: 'onD_end_1Focus',
                                                                blur: 'onD_end_1Blur'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    cls: 'lb_req',
                                                    id: 'chk_timeout_1',
                                                    itemId: 'chk_timeout',
                                                    margin: '0 0 0 10',
                                                    labelSeparator: ' ',
                                                    labelWidth: 80,
                                                    bind: {
                                                        fieldLabel: '{timeout}'
                                                    },
                                                    listeners: {
                                                        change: 'onChk_timeoutChange'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        var _value = removeComma(value);
                                                        if(!ValidNum(_value)){ return get_msg('err_form'); }
                                                        if(!LengthCheck(Number(_value), 1, 86400)){ return ValidLimit(1, '86,400'); }

                                                        return true;
                                                    },
                                                    fieldInfo: '',
                                                    disabled: true,
                                                    id: 'timeout_1',
                                                    itemId: 'timeout',
                                                    width: 90,
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: '600',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 6,
                                                    minLength: 1,
                                                    listeners: {
                                                        errorchange: 'onD_endErrorChange1',
                                                        keydown: 'onD_endKeydown1',
                                                        focus: 'onTimeout_1Focus',
                                                        blur: 'onTimeout_1Blur',
                                                        change: 'onTimeout_1Change'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'chk_ftp_1',
                                                    itemId: 'chk_ftp',
                                                    fieldLabel: '',
                                                    listeners: {
                                                        beforerender: 'onChk_ftp_1BeforeRender'
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    margin: '5 0 0 0',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch',
                                                        pack: 'end'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            cls: 'btn_s',
                                                            disabled: true,
                                                            id: 'btn_del_1',
                                                            itemId: 'btn_del',
                                                            maxHeight: 17,
                                                            iconCls: 'ics_del',
                                                            listeners: {
                                                                click: 'onButtonClick3'
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
                        click: 'onButtonClick2'
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
        afterrender: 'onWin_service_portAfterRender',
        close: 'onWin_service_portClose'
    },

    onTextfieldErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onNameBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        if(me.a_id.length >me.m_count){
            prt_errMsg(ValidMaxCnt(me.m_count),null);
            return false;
        }
        me.add_service_port(1);
    },

    onComboboxAfterRender: function(component, eOpts) {
        var sel_icmp = component.up('container').getComponent('sel_icmp');
        var sel_icmpv6 = component.up('container').getComponent('sel_icmpv6');

        sel_icmp.hide();
        sel_icmpv6.hide();
    },

    onProtocolChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === null){ return false; }
        newValue = newValue.toUpperCase();

        var c_tu = field.up('container').getComponent('c_tu');
        var chk_ftp = field.up('container').getComponent('chk_ftp');
        var sel_icmp = field.up('container').getComponent('sel_icmp');
        var sel_icmpv6 = field.up('container').getComponent('sel_icmpv6');
        var chk_timeout = field.up('container').getComponent('chk_timeout');
        var timeout = field.up('container').getComponent('timeout');

        c_tu.hide();
        chk_ftp.hide();
        sel_icmp.hide();
        sel_icmpv6.hide();
        chk_timeout.setValue(true);
        timeout.setValue('600');

        if(newValue === "TCP"){
            c_tu.show();
            chk_ftp.show();
            chk_timeout.setValue(false);
        }else if(newValue === "UDP"){
            c_tu.show();
        }else if(newValue === "ICMP"){
            sel_icmp.show();
            timeout.setValue('10');
        }else if(newValue === "ICMPV6"){
            sel_icmpv6.show();
        }
    },

    onS_startErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onS_startKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onS_start_1Focus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'0 ~ 65535';
        setTipFocus(this,component);
    },

    onS_start_1Blur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onS_endErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onS_endKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onS_end_1Focus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'0 ~ 65535';
        setTipFocus(this,component);
    },

    onS_end_1Blur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onD_startErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onD_startKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onD_start_1Focus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'0 ~ 65535';
        setTipFocus(this,component);
    },

    onD_start_1Blur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onD_endErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onD_endKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onD_end_1Focus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'0 ~ 65535';
        setTipFocus(this,component);
        if(component.getValue() === ""){
            component.setValue(component.up('container').getComponent('d_start').getValue());
        }
    },

    onD_end_1Blur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onChk_timeoutChange: function(field, newValue, oldValue, eOpts) {
        var timeout = field.up('container').getComponent('timeout');

        if(newValue){
            timeout.enable();
        }else{
            timeout.disable();
        }
    },

    onD_endErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onD_endKeydown1: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onTimeout_1Focus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1 ~ 86,400';
        setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onTimeout_1Blur: function(component, event, eOpts) {
        setTipBlur(this,component);
    },

    onTimeout_1Change: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);
        field.setValue(addComma(value));
    },

    onChk_ftp_1BeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('ftp');
    },

    onButtonClick3: function(button, e, eOpts) {
        var me = Ext.getCmp("win_service_port");

        var a_id = me.a_id;

        var id = button.id.split("_");

        var s = a_id.indexOf(Number(id[2]));

        a_id.splice(s,1);

        me.a_id = a_id;

        button.up('container').up('container').destroy();
        if(a_id.length === 1){ Ext.getCmp("btn_del_"+a_id[0]).disable(); }
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;

        var count = (me.loadmode===undefined)?Ext.getCmp("servicePort").count:null;

        var name = Ext.getCmp("name");
        var desc = Ext.getCmp("desc");

        var obj = [];

        if(name.isValid()===false){ name.focus(); return false; }

        var protocol = Ext.ComponentQuery.query('combobox[itemId="protocol"]');
        var icmp = Ext.ComponentQuery.query('combobox[itemId="sel_icmp"]');
        var icmpv6 = Ext.ComponentQuery.query('combobox[itemId="sel_icmpv6"]');

        var s_start = Ext.ComponentQuery.query('textfield[itemId="s_start"]');
        var s_end = Ext.ComponentQuery.query('textfield[itemId="s_end"]');
        var d_start = Ext.ComponentQuery.query('textfield[itemId="d_start"]');
        var d_end = Ext.ComponentQuery.query('textfield[itemId="d_end"]');

        var timeout = Ext.ComponentQuery.query('textfield[itemId="timeout"]');
        var chk_ftp = Ext.ComponentQuery.query('checkbox[itemId="chk_ftp"]');

        if(protocol.length === 0){
            prt_errMsg(get_msg('err_protocol_sel'),null);
            return false;
        }

        var ar = [];
        var a_obj = [];

        var cid = me.cid;

        if(protocol.length > me.m_count){
            prt_errMsg(ValidMaxCnt(me.m_count),null);
            return false;
        }

        for(var i=0; i<protocol.length; i++){

            var n = protocol[i].id.split("_");
            n = n[1];

            var p_val = Ext.getCmp("protocol_"+n).getValue();
            if(p_val === null){ prt_errMsg(get_msg('err_null'),null); Ext.getCmp("protocol_"+n).focus(); return false; }

            if(p_val === "tcp" || p_val === "udp"){

                if(Ext.getCmp("s_start_"+n).isValid()===false){ Ext.getCmp("s_start_"+n).focus(); return false; }
                if(Ext.getCmp("s_end_"+n).isValid()===false){ Ext.getCmp("s_end_"+n).focus(); return false; }
                if(Number(Ext.getCmp("s_start_"+n).getValue()) > Number(Ext.getCmp("s_end_"+n).getValue())){
                    prt_errMsg(get_msg('err_than'),null);
                    Ext.getCmp("s_start_"+n).focus();
                    return false;
                }
                if(Ext.getCmp("d_start_"+n).isValid()===false){ Ext.getCmp("d_start_"+n).focus(); return false; }
                if(Ext.getCmp("d_end_"+n).isValid()===false){ Ext.getCmp("d_end_"+n).focus(); return false; }
                if(Number(Ext.getCmp("d_start_"+n).getValue()) > Number(Ext.getCmp("d_end_"+n).getValue())){
                    prt_errMsg(get_msg('err_than'),null);
                    Ext.getCmp("d_start_"+n).focus();
                    return false;
                }
            }

            if(Ext.getCmp("chk_timeout_"+n).getValue()){
                if(Ext.getCmp("timeout_"+n).isValid()===false){ Ext.getCmp("timeout_"+n).focus(); return false; }
                var obj_p = [];
                var time_out = (Ext.getCmp("timeout_"+n).getValue()==="0")?false:Number(removeComma(Ext.getCmp("timeout_"+n).getValue()));
            }else{
                var time_out = false;
            }


            if(p_val === "tcp"){

                obj_p = {
                    '@type': p_val,
                    'timeout': time_out,
                    'ftp': Ext.getCmp("chk_ftp_"+n).getValue(),
                    'source': {
                        'start': Number(Ext.getCmp("s_start_"+n).getValue()),
                        'end': Number(Ext.getCmp("s_end_"+n).getValue())
                    },
                    'dest': {
                        'start': Number(Ext.getCmp("d_start_"+n).getValue()),
                        'end': Number(Ext.getCmp("d_end_"+n).getValue())
                    }
                };
            }else if(p_val === "udp"){

                obj_p = {
                    '@type': p_val,
                    'timeout': time_out,
                    'source': {
                        'start': Number(Ext.getCmp("s_start_"+n).getValue()),
                        'end': Number(Ext.getCmp("s_end_"+n).getValue())
                    },
                    'dest': {
                        'start': Number(Ext.getCmp("d_start_"+n).getValue()),
                        'end': Number(Ext.getCmp("d_end_"+n).getValue())
                    }
                };
            }else if(p_val === "icmp"){

                obj_p = {
                    '@type': p_val,
                    'timeout': time_out,
                    'kind': Ext.getCmp("sel_icmp_"+n).getValue()
                };
            }else if(p_val === "icmpv6"){

                obj_p = {
                    '@type': p_val,
                    'timeout': time_out,
                    'kind': Ext.getCmp("sel_icmpv6_"+n).getValue()
                };
            }else{

                obj_p = {
                    '@type': p_val,
                    'chk_timeout': Ext.getCmp("chk_timeout_"+n).getValue(),
                    'timeout': time_out
                };
            }

            ar[n] = obj_p;
        }

        for(var l=0; l<ar.length; l++){
            if(ar[l]){
                a_obj.push(ar[l]);
            }
        }

        var update = (this.edit==="edit")?true:false;
        var return_cid = (this.edit==="edit")?false:true;

        obj = {
            'name' : name.getValue(),
            'desc' : desc.getValue(),
            'protocol' : a_obj,
            '@cid' : me.cid
        };

        var _params = {
            object_service_port : Ext.encode(obj),
            update_flag : Ext.encode(update),
            return_cid : Ext.encode(return_cid)
        };

        var key = {
            name: name.getValue(),
            _kind: 'object_service_port'
        };

        if(update){
            key['@cid'] = {
                '$ne': me.cid
            };
        }

        var _param = {
            basename: Ext.encode('with_cid'),
            key: Ext.encode(key)
        };

        if(me.name !== name.getValue()){

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getObject',
                _param,
                function(response){

                    if(response !== null){
                        prt_errMsg(get_msg('err_objname'), null); name.focus(); return false;
                    }else{
                        fn_set();
                    }
                }
            );
        }else{
            fn_set();
        }

        function fn_set(){

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'set_object_service_port',
                _params,
                function(response){

                    if(me.loadmode === undefined){
                        var _store = Ext.data.StoreManager.lookup("store_object_service_port_list");
                    }else{

                        if(me.target !== undefined){
                            var __cid = (update)?me.cid:response;
                            addFWItem(me.target, update, name.getValue(), "port", __cid, protocol.length);
                        }

                        var _store = Ext.data.StoreManager.lookup(me.loadmode);
                    }

                    _store.load(function(records,options,success){
                        if(me.loadmode === undefined && !me.edit){
                            var tot = options.getProxy().getReader().rawData.retval;
                            Ext.getCmp("disp_service_total").setValue(tot.total+'/'+tot.max_count);
                        }
                    });

                    if(me.loadmode===undefined && _store.getTotalCount()+1 >= count){
                        me.close();
                        return false;
                    }

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
                            fn: setWinState,
                            icon: Ext.window.MessageBox.INFO
                        });
                    }

                    var button = Ext.ComponentQuery.query('button[itemId="btn_del"]');

                    for(var i=1; i<button.length; i++){
                        button[i].up('container').up('container').destroy();
                    }
                }
            );
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        this.close();
    },

    onWin_service_portAfterRender: function(component, eOpts) {
        var me = this;
        me.fieldInfo = makeZenTip();

        chk_zenauth(null);

        me.a_id = [1];

        var _params = {
            filename: Ext.encode('/proc/ferret/datasheet/service_obj_member')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getFileContent',
            _params,
            function(response){
                me.m_count = response[0];
            }
        );

        if(me.edit === "edit"){
            me.init_service_port();
        }else{
            me.setTitle(__zen('service_port_add'));
            //Ext.getCmp("edit_prev").hide();
            //Ext.getCmp("edit_next").hide();
        }
    },

    onWin_service_portClose: function(panel, eOpts) {
        var button = Ext.ComponentQuery.query('button[itemId="btn_del"]');
        Ext.suspendLayouts();
        for(var i=0; i<button.length; i++){
            button[i].up('container').up('container').destroy();
        }
        Ext.resumeLayouts(true);
    },

    add_service_port: function(n) {
        var me = Ext.getCmp("win_service_port");

        var max = Math.max.apply(Math,me.a_id);

        for(var i=0; i<max; i++){
            if(Ext.getCmp("protocol_"+n)){
                n++;
            }
        }

        me.a_id.push(n);
        if(me.a_id.length > 1){ Ext.getCmp("btn_del_"+me.a_id[0]).enable(); }

        Ext.suspendLayouts();
        var con = {
            xtype: 'container',
            height: 27,
            margin: '1 0 0 0',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'combobox',
                    id: 'protocol_'+n,
                    itemId: 'protocol',
                    width: 150,
                    fieldLabel: __zen('protocol'),
                    labelSeparator: ' ',
                    labelWidth: 70,
                    value: 'tcp',
                    editable: false,
                    displayField: 'name',
                    store: 'store_port_protocol',
                    valueField: 'val',
                    listeners: {
                        afterrender: 'onComboboxAfterRender',
                        change: 'onProtocolChange'
                    }
                },
                {
                    xtype: 'combobox',
                    hidden: true,
                    id: 'sel_icmp_'+n,
                    itemId: 'sel_icmp',
                    width: 200,
                    fieldLabel: '',
                    value: 'Any',
                    editable: false,
                    displayField: 'val',
                    store: 'store_port_icmp',
                    valueField: 'val'
                },
                {
                    xtype: 'combobox',
                    hidden: true,
                    id: 'sel_icmpv6_'+n,
                    itemId: 'sel_icmpv6',
                    width: 200,
                    fieldLabel: '',
                    value: 'Any',
                    editable: false,
                    displayField: 'val',
                    store: 'store_port_icmpv6',
                    valueField: 'val'
                },
                {
                    xtype: 'container',
                    itemId: 'c_tu',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(!LengthCheck(value, 0, 65535)){ return ValidLimit(0, 65535); }

                                return true;
                            },
                            fieldInfo: __zen('input_range')+'0 ~ 65535',
                            cls: 'lb_req',
                            id: 's_start_'+n,
                            itemId: 's_start',
                            width: 150,
                            fieldLabel: __zen('src_port'),
                            labelSeparator: ' ',
                            labelWidth: 80,
                            msgTarget: 'none',
                            value: '1024',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 5,
                            minLength: 1,
                            listeners: {
                                errorchange: 'onS_startErrorChange',
                                keydown: 'onS_startKeydown',
                                focus: 'onS_start_1Focus',
                                blur: 'onS_start_1Blur'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(!LengthCheck(value, 0, 65535)){ return ValidLimit(0, 65535); }

                                return true;
                            },
                            fieldInfo: __zen('input_range')+'0 ~ 65535',
                            id: 's_end_'+n,
                            itemId: 's_end',
                            style: 'margin-left:3px;',
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
                            minLength: 1,
                            listeners: {
                                errorchange: 'onS_endErrorChange',
                                keydown: 'onS_endKeydown',
                                focus: 'onS_end_1Focus',
                                blur: 'onS_end_1Blur'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(!LengthCheck(value, 0, 65535)){ return ValidLimit(0, 65535); }

                                return true;
                            },
                            fieldInfo: __zen('input_range')+'0 ~ 65535',
                            cls: 'lb_req',
                            id: 'd_start_'+n,
                            itemId: 'd_start',
                            style: 'margin-left:10px;',
                            width: 170,
                            fieldLabel: __zen('dest_port'),
                            labelSeparator: ' ',
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 5,
                            minLength: 1,
                            listeners: {
                                errorchange: 'onD_startErrorChange',
                                keydown: 'onD_startKeydown',
                                focus: 'onD_start_1Focus',
                                blur: 'onD_start_1Blur'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(!LengthCheck(value, 0, 65535)){ return ValidLimit(0, 65535); }

                                return true;
                            },
                            fieldInfo: __zen('input_range')+'0 ~ 65535',
                            id: 'd_end_'+n,
                            itemId: 'd_end',
                            style: 'margin-left:3px;',
                            width: 80,
                            fieldLabel: '~',
                            labelSeparator: ' ',
                            labelWidth: 10,
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 5,
                            minLength: 1,
                            listeners: {
                                errorchange: 'onD_endErrorChange',
                                keydown: 'onD_endKeydown',
                                focus: 'onD_end_1Focus',
                                blur: 'onD_end_1Blur'
                            }
                        }
                    ]
                },
                {
                    xtype: 'checkboxfield',
                    cls: 'lb_req',
                    id: 'chk_timeout_'+n,
                    itemId: 'chk_timeout',
                    margin: '0 0 0 10',
                    fieldLabel: __zen('timeout'),
                    labelSeparator: ' ',
                    labelWidth: 80,
                    listeners: {
                        change: 'onChk_timeoutChange'
                    }
                },
                {
                    xtype: 'textfield',
                    validator: function(value) {
                        if(!CheckNotNull(value) || value === true){ return true; }
                        var _value = removeComma(value);
                        if(!ValidNum(_value)){ return get_msg('err_form'); }
                        if(!LengthCheck(_value, 1, 86400)){ return ValidLimit(1, '86,400'); }

                        return true;
                    },
                    fieldInfo: __zen('input_range')+'1 ~ 86,400',
                    disabled: true,
                    id: 'timeout_'+n,
                    itemId: 'timeout',
                    value: '600',
                    width: 90,
                    labelSeparator: ' ',
                    msgTarget: 'none',
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 6,
                    minLength: 1,
                    listeners: {
                        errorchange: 'onD_endErrorChange1',
                        keydown: 'onD_endKeydown1',
                        focus: 'onTimeout_1Focus',
                        blur: 'onTimeout_1Blur',
                        change: 'onTimeout_1Change'
                    }
                },
                {
                    xtype: 'checkboxfield',
                    id: 'chk_ftp_'+n,
                    itemId: 'chk_ftp',
                    fieldLabel: '',
                    boxLabel: __zen('ftp')
                },
                {
                    xtype: 'container',
                    flex: 1,
                    margin: '5 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            cls: 'btn_s',
                            id: 'btn_del_'+n,
                            itemId: 'btn_del',
                            maxHeight: 17,
                            iconCls: 'ics_del',
                            listeners: {
                                click: 'onButtonClick3'
                            }
                        }
                    ]
                }
            ]
        };

        Ext.getCmp("c_pro_list").add(con);
        Ext.resumeLayouts(true);
    },

    init_service_port: function() {
        var me = this;

        /*var e_p = Ext.getCmp("edit_prev");
        var e_n = Ext.getCmp("edit_next");

        e_p.hide();
        e_n.hide();

        if(len > 1){
            if(me.num !== 1){
                e_p.show();
                if(me.num !== len){
                    e_n.show();
                }
            }else{
                e_n.show();
            }
        }*/

        me.setTitle(__zen('service_port_edit')+' - '+me.num);

        var _params = {
            basename: Ext.encode('object_service_port'),
            key: Ext.encode({'@cid': me.cid})
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){

                Ext.getCmp("name").setValue(response.name);
                Ext.getCmp("desc").setValue(response.desc);

                var pro = response.protocol;

                for(var i=1; i<pro.length; i++){
                    me.add_service_port(i+1);
                }

                for(var i=0; i<pro.length; i++){

                    var type = pro[i]['@type'].toLowerCase();
                    var n = i+1;

                    Ext.getCmp("protocol_"+n).setValue(type);
                    var time_out = (pro[i]['timeout']===false)?"0":pro[i]['timeout'];

                    if(pro[i]['timeout']!==false){
                        Ext.getCmp("chk_timeout_"+n).setValue(true);
                    }else{
                        Ext.getCmp("chk_timeout_"+n).setValue(false);
                    }
                    Ext.getCmp("timeout_"+n).setValue(addComma(time_out));

                    if(type === 'tcp'){
                        Ext.getCmp("chk_ftp_"+n).setValue(pro[i]['ftp']);
                        Ext.getCmp("s_start_"+n).setValue(pro[i]['source'].start);
                        Ext.getCmp("s_end_"+n).setValue(pro[i]['source'].end);
                        Ext.getCmp("d_start_"+n).setValue(pro[i]['dest'].start);
                        Ext.getCmp("d_end_"+n).setValue(pro[i]['dest'].end);
                    }else if(type === 'udp'){
                        Ext.getCmp("s_start_"+n).setValue(pro[i]['source'].start);
                        Ext.getCmp("s_end_"+n).setValue(pro[i]['source'].end);
                        Ext.getCmp("d_start_"+n).setValue(pro[i]['dest'].start);
                        Ext.getCmp("d_end_"+n).setValue(pro[i]['dest'].end);
                    }else if(type === 'icmp'){
                        Ext.getCmp("sel_icmp_"+n).setValue(pro[i]['kind']);
                    }else if(type === 'icmpv6'){
                        Ext.getCmp("sel_icmpv6_"+n).setValue(pro[i]['kind']);
                    }

                }
            }
        );
    }

});