
Ext.define('NFW2.view.win_object_ipAddress_ipv6Header', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_object_ipaddress_ipv6header',

    requires: [
        'NFW2.view.win_object_ipAddress_ipv6HeaderViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.XTemplate',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_object_ipaddress_ipv6header'
    },
    cls: 'zen_win',
    id: 'win_object_ipAddress_ipv6Header',
    scrollable: true,
    bodyPadding: 20,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'fm_ipv6_header',
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'container',
                    scrollable: true,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            margin: '5 0 0 0',
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var main = Ext.getCmp('win_object_ipAddress_ipv6Header');
                                        var store = Ext.data.StoreManager.lookup('store_object_ipv6header_list');

                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        if(main.set_btn === true){
                                            if(main.edit === "edit"){
                                                var chk_num = 0;
                                                for(var i in store.data.items){
                                                    if(store.data.items[i].data.name === Ext.getCmp('win_name').getValue()){

                                                        if(Number(i) !== Number(main.edit_index)){ chk_num++; }
                                                    }
                                                }
                                                if(chk_num > 0){ return get_msg('err_objname'); }
                                            }
                                            else{
                                                for(var i in store.data.items){
                                                    if(store.data.items[i].data.name === Ext.getCmp('win_name').getValue()){ return get_msg('err_objname'); }
                                                }
                                            }
                                            main.set_btn = false;
                                        }

                                        return true;
                                    },
                                    cls: 'lb_req',
                                    id: 'win_name',
                                    width: 450,
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    enforceMaxLength: true,
                                    maxLength: 31,
                                    bind: {
                                        fieldLabel: '{obj_name}'
                                    },
                                    listeners: {
                                        errorchange: 'onWin_nameErrorChange',
                                        blur: 'onWin_nameBlur'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'win_desc',
                                    width: 450,
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    enforceMaxLength: true,
                                    maxLength: 127,
                                    bind: {
                                        fieldLabel: '{desc}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '0 0 10 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    width: 135,
                                    bind: {
                                        text: '{header_content}'
                                    }
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
                                            flex: 1,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
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
                                                            xtype: 'checkboxfield',
                                                            id: 'chk_1',
                                                            listeners: {
                                                                change: 'onChk_1Change'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '3 0 0 5',
                                                            width: 200,
                                                            bind: {
                                                                text: '{header_hop}'
                                                            },
                                                            listeners: {
                                                                render: 'onLabelRender'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'chk_2',
                                                            listeners: {
                                                                change: 'onChk_2Change'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '3 0 0 5',
                                                            width: 165,
                                                            bind: {
                                                                text: '{header_dest}'
                                                            },
                                                            listeners: {
                                                                render: 'onLabelRender1'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'chk_3',
                                                            listeners: {
                                                                change: 'onChk_3Change'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '3 0 0 5',
                                                            width: 130,
                                                            bind: {
                                                                text: '{header_frag}'
                                                            },
                                                            listeners: {
                                                                render: 'onLabelRender2'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            disabled: true,
                                                            id: 'win_packet_con',
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

                                                                            if(!LengthCheck(_value, 0, 1500)){ return ValidLimit(0, addComma(1500)); }
                                                                        }

                                                                        return true;
                                                                    },
                                                                    fieldInfo: {
                                                                        txt: msg_tip_length(0,
                                                                        1500,
                                                                        null)
                                                                    },
                                                                    cls: 'inp_unit',
                                                                    id: 'packet_size',
                                                                    width: 260,
                                                                    afterBodyEl: [
                                                                        '<div class="inp_after">{[__zen("bytes")]}</div>'
                                                                    ],
                                                                    labelSeparator: ' ',
                                                                    labelWidth: 150,
                                                                    msgTarget: 'none',
                                                                    value: '0',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maskRe: /[0-9]/,
                                                                    maxLength: 5,
                                                                    maxLengthText: ' ',
                                                                    bind: {
                                                                        fieldLabel: '{min_packet}'
                                                                    },
                                                                    listeners: {
                                                                        errorchange: 'onPacket_sizeErrorChange',
                                                                        keydown: 'onPacket_sizeKeydown',
                                                                        blur: 'onPacket_sizeBlur',
                                                                        change: 'onPacket_sizeChange',
                                                                        focus: 'onPacket_sizeFocus'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    margin: '5 0 5 0',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'chk_4',
                                                            listeners: {
                                                                change: 'onChk_4Change'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '3 0 0 5',
                                                            width: 200,
                                                            bind: {
                                                                text: '{header_auth}'
                                                            },
                                                            listeners: {
                                                                render: 'onLabelRender3'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'chk_5',
                                                            listeners: {
                                                                change: 'onChk_5Change'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '3 0 0 5',
                                                            width: 165,
                                                            bind: {
                                                                text: '{header_esp}'
                                                            },
                                                            listeners: {
                                                                render: 'onLabelRender4'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'chk_6',
                                                            listeners: {
                                                                change: 'onChk_6Change'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '3 0 0 5',
                                                            width: 130,
                                                            bind: {
                                                                text: '{header_route}'
                                                            },
                                                            listeners: {
                                                                render: 'onLabelRender5'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            disabled: true,
                                                            id: 'win_router_con',
                                                            items: [
                                                                {
                                                                    xtype: 'combobox',
                                                                    validator: function(value) {
                                                                        if(value !== true){
                                                                            if(!CheckNotNull(value)){
                                                                                return ValidSelect(__zen('header_route'), 1);
                                                                            }
                                                                            else if(Ext.getCmp('router_header').getValue() === "menu"){
                                                                                return get_msg('err_form');
                                                                            }
                                                                        }

                                                                        return true;
                                                                    },
                                                                    id: 'router_header',
                                                                    margin: '0 10 0 0',
                                                                    width: 250,
                                                                    labelSeparator: ' ',
                                                                    msgTarget: 'none',
                                                                    editable: false,
                                                                    emptyText: 'Select',
                                                                    displayField: 'name',
                                                                    queryMode: 'local',
                                                                    store: 'store_ipv6_object_list',
                                                                    valueField: '@cid',
                                                                    listeners: {
                                                                        afterrender: 'onRouter_headerAfterRender',
                                                                        errorchange: 'onRouter_headerErrorChange',
                                                                        blur: 'onRouter_headerBlur',
                                                                        select: 'onRouter_headerSelect'
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
                afterrender: 'onFormAfterRender'
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

    onWin_nameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_nameBlur: function(component, event, eOpts) {
        Ext.getCmp('win_name').validateValue(true);
    },

    onChk_1Change: function(field, newValue, oldValue, eOpts) {
        var cnt = 0;

        for(var i=1;i<7;i++){
            if(Ext.getCmp('chk_'+i).getValue() === false){ cnt++; }
        }

        if(cnt === 6){
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].update(get_msg('err_select'));
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].addCls('ic_msg_err');
        }
        else{
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].update('');
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].removeCls('ic_msg_err');
        }

        return true;
    },

    onLabelRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('chk_1').getValue()){ Ext.getCmp('chk_1').setValue(false); }
            else{ Ext.getCmp('chk_1').setValue(true); }
        }, component);
    },

    onChk_2Change: function(field, newValue, oldValue, eOpts) {
        var cnt = 0;

        for(var i=1;i<7;i++){
            if(Ext.getCmp('chk_'+i).getValue() === false){ cnt++; }
        }

        if(cnt === 6){
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].update(get_msg('err_select'));
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].addCls('ic_msg_err');
        }
        else{
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].update('');
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].removeCls('ic_msg_err');
        }

        return true;
    },

    onLabelRender1: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('chk_2').getValue()){ Ext.getCmp('chk_2').setValue(false); }
            else{ Ext.getCmp('chk_2').setValue(true); }
        }, component);
    },

    onChk_3Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('win_packet_con').setDisabled(false);
        }
        else{
            Ext.getCmp('win_packet_con').setDisabled(true);
        }

        var cnt = 0;

        for(var i=1;i<7;i++){
            if(Ext.getCmp('chk_'+i).getValue() === false){ cnt++; }
        }

        if(cnt === 6){
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].update(get_msg('err_select'));
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].addCls('ic_msg_err');
        }
        else{
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].update('');
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].removeCls('ic_msg_err');
        }

        return true;
    },

    onLabelRender2: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('chk_3').getValue()){ Ext.getCmp('chk_3').setValue(false); }
            else{ Ext.getCmp('chk_3').setValue(true); }
        }, component);
    },

    onPacket_sizeErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onPacket_sizeKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onPacket_sizeBlur: function(component, event, eOpts) {
        Ext.getCmp('packet_size').validateValue(true);
        setTipBlur(this,component);
        if(Ext.getCmp('packet_size').getValue() === ""){ Ext.getCmp('packet_size').setValue("0"); }
    },

    onPacket_sizeChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onPacket_sizeFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(Ext.getCmp('packet_size').getValue() === "0"){ Ext.getCmp('packet_size').setValue(""); }
    },

    onChk_4Change: function(field, newValue, oldValue, eOpts) {
        var cnt = 0;

        for(var i=1;i<7;i++){
            if(Ext.getCmp('chk_'+i).getValue() === false){ cnt++; }
        }

        if(cnt === 6){
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].update(get_msg('err_select'));
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].addCls('ic_msg_err');
        }
        else{
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].update('');
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].removeCls('ic_msg_err');
        }

        return true;
    },

    onLabelRender3: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('chk_4').getValue()){ Ext.getCmp('chk_4').setValue(false); }
            else{ Ext.getCmp('chk_4').setValue(true); }
        }, component);
    },

    onChk_5Change: function(field, newValue, oldValue, eOpts) {
        var cnt = 0;

        for(var i=1;i<7;i++){
            if(Ext.getCmp('chk_'+i).getValue() === false){ cnt++; }
        }

        if(cnt === 6){
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].update(get_msg('err_select'));
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].addCls('ic_msg_err');
        }
        else{
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].update('');
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].removeCls('ic_msg_err');
        }

        return true;
    },

    onLabelRender4: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('chk_5').getValue()){ Ext.getCmp('chk_5').setValue(false); }
            else{ Ext.getCmp('chk_5').setValue(true); }
        }, component);
    },

    onChk_6Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('win_router_con').setDisabled(false);
        }
        else{
            Ext.getCmp('win_router_con').setDisabled(true);
            Ext.getCmp('router_header').reset();
            var inter = Ext.getCmp('router_header').getStore().data;

            if(inter.length > 0){
                Ext.getCmp("router_header").setValue(inter.items[0].data['@cid']);
            }
        }

        var cnt = 0;

        for(var i=1;i<7;i++){
            if(Ext.getCmp('chk_'+i).getValue() === false){ cnt++; }
        }

        if(cnt === 6){
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].update(get_msg('err_select'));
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].addCls('ic_msg_err');
        }
        else{
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].update('');
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].removeCls('ic_msg_err');
        }

        return true;
    },

    onLabelRender5: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('chk_6').getValue()){ Ext.getCmp('chk_6').setValue(false); }
            else{ Ext.getCmp('chk_6').setValue(true); }
        }, component);
    },

    onRouter_headerAfterRender: function(component, eOpts) {
        // var inter = Ext.getCmp('router_header').getStore().data;

        // if(inter.length > 0){
        //     Ext.getCmp("router_header").setValue(inter.items[0].data['@cid']);
        // }
    },

    onRouter_headerErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onRouter_headerBlur: function(component, event, eOpts) {
        Ext.getCmp('router_header').validateValue(true);
    },

    onRouter_headerSelect: function(combo, record, eOpts) {
        if(combo.value === "menu"){ combo.reset(); }
    },

    onFormAfterRender: function(component, eOpts) {
        var me = this;
        me.set_btn = false;
        chk_zenauth(null);
        this.fieldInfo = makeZenTip();

        if(this.edit === "edit"){

            me.setTitle(__zen('edit_v6_header'));
            showLoadMask();
            var _params = {
                basename : Ext.encode('object_ipv6_header')
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getObjectList',
                _params,
                function(response){
                    hideLoadMask();

                    for(var i in response.list){
                        if(response.list[i]['@cid'] === me.cid){
                            Ext.getCmp('win_name').setValue(response.list[i].name);
                            Ext.getCmp('win_desc').setValue(response.list[i].desc);
                            for(var j in response.list[i].header){
                                if(response.list[i].header[j]['@type'] === "hopbyhop"){ Ext.getCmp('chk_1').setValue(true); }
                                else if(response.list[i].header[j]['@type'] === "dest"){ Ext.getCmp('chk_2').setValue(true); }
                                else if(response.list[i].header[j]['@type'] === "fragment"){
                                    Ext.getCmp('chk_3').setValue(true);
                                    Ext.getCmp('packet_size').setValue(response.list[i].header[j]['#text']);
                                }
                                else if(response.list[i].header[j]['@type'] === "auth"){ Ext.getCmp('chk_4').setValue(true); }
                                else if(response.list[i].header[j]['@type'] === "esp"){ Ext.getCmp('chk_5').setValue(true); }
                                else if(response.list[i].header[j]['@type'] === "route"){
                                    Ext.getCmp('chk_6').setValue(true);
                                    Ext.getCmp('router_header').setValue(response.list[i].header[j]['@cid']);
                                }
                            }
                        }
                    }
                }
            );
        }
        else{ me.setTitle(__zen('add_v6_header')); }
    },

    onWin_btn_okClick: function(button, e, eOpts) {
        var main = Ext.getCmp('win_object_ipAddress_ipv6Header');
        var me = this;
        var chk = false;
        var header = [];
        var store = Ext.data.StoreManager.lookup('store_object_ipv6header_list');

        if(Ext.getCmp('win_name').isValid() === false){ Ext.getCmp('win_name').focus(); return false; }
        var cnt = 0;

        for(var i=1;i<7;i++){
            if(Ext.getCmp('chk_'+i).getValue() === false){ cnt++; }
        }


        if(main.edit === "edit"){
            var chk_num = 0;
            for(var i in store.data.items){
                if(store.data.items[i].data.name === Ext.getCmp('win_name').getValue()){

                    if(Number(i) !== Number(main.edit_index)){ chk_num++; }
                }
            }
            if(chk_num > 0){ chk = true; }
        }
        else{
            for(var i in store.data.items){
                if(store.data.items[i].data.name === Ext.getCmp('win_name').getValue()){ chk = true; }
            }
        }

        if(chk){
            main.set_btn = true;
            Ext.getCmp('win_name').isValid();

            return false;
        }

        if(cnt === 6){
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].update(get_msg('err_select'));
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].addCls('ic_msg_err');
            return false;
        }

        if(chk === false){
            if(Ext.getCmp('chk_3').getValue()){ if(Ext.getCmp('packet_size').isValid() === false){ Ext.getCmp('packet_size').focus(); return false; } }
            if(Ext.getCmp('chk_6').getValue()){
                if(Ext.getCmp('router_header').getValue() === null || Ext.getCmp('router_header').getValue() === "menu"){
                    Ext.getCmp('router_header').focus();
                    Ext.getCmp('router_header').isValid(false);
                    return false;
                }
            }

            if(Ext.getCmp('chk_1').getValue()){
                header.push({
                    '#text' : null,
                    '@type' : "hopbyhop",
                    '@cid' : null
                });
            }
            if(Ext.getCmp('chk_2').getValue()){
                header.push({
                    '#text' : null,
                    '@type' : "dest",
                    '@cid' : null
                });
            }
            if(Ext.getCmp('chk_3').getValue()){
                header.push({
                    '#text' : Ext.getCmp('packet_size').getValue(),
                    '@type' : "fragment",
                    '@cid' : null
                });
            }
            if(Ext.getCmp('chk_4').getValue()){
                header.push({
                    '#text' : null,
                    '@type' : "auth",
                    '@cid' : null
                });
            }
            if(Ext.getCmp('chk_5').getValue()){
                header.push({
                    '#text' : null,
                    '@type' : "esp",
                    '@cid' : null
                });
            }
            if(Ext.getCmp('chk_6').getValue()){
                header.push({
                    '#text' : null,
                    '@type' : "route",
                    '@cid' : Ext.getCmp('router_header').getValue()
                });
            }

            var obj = {};

            obj = {
                'name' : Ext.getCmp('win_name').getValue(),
                'desc' : Ext.getCmp('win_desc').getValue(),
                'header' : header
            };

            if(main.edit === "edit"){
                obj['@cid'] = main.cid;
            }

            var update = (main.edit==="edit")?true:false;
            showLoadMask();
            var _params = {
                basename : Ext.encode('object_ipv6_header'),
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
                    hideLoadMask();
                    var store = Ext.data.StoreManager.lookup('store_object_ipv6header_list');
                    if(me.edit === "edit"){
                        store.load(function(response){
                            //                     Ext.getCmp('st_fw_ipv6_header_obj_cnt').setValue(store.totalCount +"/" + me.max);
                        });
                        Ext.Msg.show({
                            title: __weguardia,
                            msg: get_msg("msg_ok_edit"),
                            width: 300,
                            buttons: Ext.Msg.OK,
                            fn: setWinClose,
                            icon: Ext.window.MessageBox.INFO
                        });
                    }
                    else{
                        //                 me.close();
                        store.getProxy().setExtraParam('search_info',Ext.encode({}));
                        Ext.getCmp('ipv6_header_search').reset();
                        store.load(function(response){
                            Ext.getCmp('st_fw_ipv6_header_obj_cnt').setValue(store.totalCount +"/" + me.max);
                        });
                        Ext.getCmp('btn_res').hide();
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
                }
            );
        }
    },

    onWin_btn_cancelClick: function(button, e, eOpts) {
        this.close();
    },

    set_btn: function(btn) {
        if(btn === "yes"){
            var main = Ext.getCmp('win_object_ipAddress_ipv6Header');
            var header = [];
            var store = Ext.data.StoreManager.lookup('store_object_ipv6header_list');

            if(Ext.getCmp('win_name').isValid() === false){ Ext.getCmp('win_name').focus(); return false; }
            var cnt = 0;

            for(var i=1;i<7;i++){
                if(Ext.getCmp('chk_'+i).getValue() === false){ cnt++; }
            }

            if(cnt === 6){
                Ext.getCmp('win_errorbox').setText(get_msg('err_select'));
                Ext.getCmp('win_errorbox').show();
                return false;
            }
            if(Ext.getCmp('chk_3').getValue()){ if(Ext.getCmp('packet_size').isValid() === false){ Ext.getCmp('packet_size').focus(); return false; } }
            if(Ext.getCmp('chk_6').getValue()){
                if(Ext.getCmp('router_header').getValue() === "null" || Ext.getCmp('router_header').getValue() === "menu"){
                    Ext.getCmp('router_header').focus();
                    Ext.getCmp('router_header').isValid(false);
                    return false;
                }
            }

            if(Ext.getCmp('chk_1').getValue()){
                header.push({
                    '#text' : null,
                    '@type' : "hopbyhop",
                    '@cid' : null
                });
            }
            if(Ext.getCmp('chk_2').getValue()){
                header.push({
                    '#text' : null,
                    '@type' : "dest",
                    '@cid' : null
                });
            }
            if(Ext.getCmp('chk_3').getValue()){
                header.push({
                    '#text' : Ext.getCmp('packet_size').getValue(),
                    '@type' : "fragment",
                    '@cid' : null
                });
            }
            if(Ext.getCmp('chk_4').getValue()){
                header.push({
                    '#text' : null,
                    '@type' : "auth",
                    '@cid' : null
                });
            }
            if(Ext.getCmp('chk_5').getValue()){
                header.push({
                    '#text' : null,
                    '@type' : "esp",
                    '@cid' : null
                });
            }
            if(Ext.getCmp('chk_6').getValue()){
                header.push({
                    '#text' : null,
                    '@type' : "route",
                    '@cid' : Ext.getCmp('router_header').getValue()
                });
            }

            var obj = {};

            obj = {
                'name' : Ext.getCmp('win_name').getValue(),
                'desc' : Ext.getCmp('win_desc').getValue(),
                'header' : header
            };

            if(main.edit === "edit"){
                obj['@cid'] = main.cid;
            }

            var update = (main.edit==="edit")?true:false;

            var _params = {
                basename : Ext.encode('object_ipv6_header'),
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
                    var main = Ext.getCmp('win_object_ipAddress_ipv6Header');
                    if(main.edit === "edit"){
                        Ext.Msg.show({
                            title: __weguardia,
                            msg: get_msg("msg_ok_edit"),
                            width: 300,
                            buttons: Ext.Msg.OK,
                            fn: setWinClose,
                            icon: Ext.window.MessageBox.INFO
                        });
                    }
                    else{
                        main.close();
                        Ext.Msg.show({
                            title: __weguardia,
                            msg: get_msg("msg_ok_add"),
                            width: 300,
                            buttons: Ext.Msg.YESNO,
                            buttonText:{
                                yes: __zen('add_plus'),
                                no: __zen('close')
                            },
                            fn: main.set_win,
                            icon: Ext.window.MessageBox.INFO
                        });
                    }
                    var store = Ext.data.StoreManager.lookup('store_object_ipv6header_list');

                    store.load();
                }
            );
        }
        else{ return false; }
    },

    set_win: function(btn) {
        if(btn === "yes"){
            Ext.getCmp('win_name').reset();
            Ext.getCmp('win_desc').reset();
            Ext.getCmp('chk_1').setValue(false);
            Ext.getCmp('chk_2').setValue(false);
            Ext.getCmp('chk_3').setValue(false);
            Ext.getCmp('chk_4').setValue(false);
            Ext.getCmp('chk_5').setValue(false);
            Ext.getCmp('chk_6').setValue(false);
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].update('');
            Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0].removeCls('ic_msg_err');
            Ext.getCmp('packet_size').reset();
            Ext.getCmp('router_header').reset();
        }
        else{
            Ext.getCmp('win_object_ipAddress_ipv6Header').close();
        }
    }

});