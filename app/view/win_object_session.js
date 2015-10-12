
Ext.define('NFW2.view.win_object_session', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_object_session',

    requires: [
        'NFW2.view.win_object_sessionViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.Label',
        'Ext.form.field.Radio',
        'Ext.form.FieldSet',
        'Ext.XTemplate',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_object_session'
    },
    cls: 'zen_win',
    id: 'win_object_session',
    scrollable: true,
    bodyPadding: 20,
    title: '세션 추가',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            itemId: 'fm',
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'container',
                    margin: '0 0 0 -10',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var me = Ext.getCmp('win_object_session');
                                var store = Ext.data.StoreManager.lookup('store_object_session_list');

                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(me.set_btn === true){
                                    if(me.edit === "edit"){
                                        var chk_num = 0;
                                        for(var i in store.data.items){
                                            if(store.data.items[i].data.name === Ext.getCmp('win_name').getValue()){

                                                if(Number(i) !== Number(me.edit_index)){ chk_num++; }
                                            }
                                        }
                                        if(chk_num > 0){ return get_msg('err_objname'); }
                                    }
                                    else{
                                        for(var i in store.data.items){
                                            if(store.data.items[i].data.name === Ext.getCmp('win_name').getValue()){ return get_msg('err_objname'); }
                                        }
                                    }
                                    me.set_btn = false;
                                }

                                return true;
                            },
                            id: 'win_name',
                            maxWidth: 420,
                            minWidth: 420,
                            labelCls: 'lb_req',
                            labelSeparator: ' ',
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
                        },
                        {
                            xtype: 'textfield',
                            id: 'win_desc',
                            margin: '0 0 0 10',
                            width: 410,
                            labelSeparator: ' ',
                            labelWidth: 150,
                            enforceMaxLength: true,
                            maxLength: 63,
                            bind: {
                                fieldLabel: '{desc}'
                            }
                        },
                        {
                            xtype: 'container',
                            margin: '8 0 10 20',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 150,
                                    bind: {
                                        text: '{operate_mode}'
                                    }
                                },
                                {
                                    xtype: 'radiofield',
                                    id: 'r_1',
                                    checked: true,
                                    listeners: {
                                        change: 'onRadiofieldChange'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    margin: '3 0 0 5',
                                    width: 160,
                                    bind: {
                                        text: '{session_new}'
                                    },
                                    listeners: {
                                        render: 'onLabelRender'
                                    }
                                },
                                {
                                    xtype: 'radiofield',
                                    id: 'r_2',
                                    listeners: {
                                        change: 'onRadiofieldChange1'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    margin: '3 0 0 5',
                                    width: 160,
                                    bind: {
                                        text: '{session_user}'
                                    },
                                    listeners: {
                                        render: 'onLabelRender1'
                                    }
                                },
                                {
                                    xtype: 'radiofield',
                                    id: 'r_3',
                                    listeners: {
                                        change: 'onRadiofieldChange2'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    margin: '3 0 0 5',
                                    bind: {
                                        text: '{session_limit}'
                                    },
                                    listeners: {
                                        render: 'onLabelRender2'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'win_session_limit_con',
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

                                            if(!CheckNotNull(_value)){ return get_msg(err_null); }
                                            if(!LengthCheck(_value, 10, 10000)){ return ValidLimit(10, addComma(10000)); }
                                        }

                                        return true;
                                    },
                                    fieldInfo: {
                                        txt: msg_tip_length(10,
                                        10000,
                                        null)
                                    },
                                    id: 'win_session_limit',
                                    labelCls: 'lb_req',
                                    labelSeparator: ' ',
                                    labelWidth: 150,
                                    msgTarget: 'none',
                                    value: 10,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 6,
                                    maxLengthText: ' ',
                                    bind: {
                                        fieldLabel: '{session_access}'
                                    },
                                    listeners: {
                                        errorchange: 'onWin_session_limitErrorChange',
                                        blur: 'onWin_session_limitBlur',
                                        focus: 'onWin_session_limitFocus',
                                        change: 'onWin_session_limitChange',
                                        keydown: 'onWin_session_limitKeydown'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            hidden: true,
                            id: 'win_size_limit_con',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    margin: '0 0 0 10',
                                    width: 165,
                                    bind: {
                                        text: '{limit_size}'
                                    }
                                },
                                {
                                    xtype: 'fieldset',
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '5 0 0 0',
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

                                                            if(!LengthCheck(_value, 0, 420000)){ return ValidLimit(0, addComma(420000)); }
                                                        }
                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        420000)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'win_size_tran',
                                                    afterBodyEl: [
                                                        '<div class="inp_after">Kbyte</div>'
                                                    ],
                                                    fieldLabel: 'TX',
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 7,
                                                    maxLengthText: ' ',
                                                    listeners: {
                                                        errorchange: 'onWin_size_tranErrorChange',
                                                        blur: 'onWin_size_tranBlur',
                                                        focus: 'onWin_size_tranFocus',
                                                        change: 'onWin_size_tranChange',
                                                        keydown: 'onWin_size_tranKeydown'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '5 0 5 0',
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

                                                            if(!LengthCheck(_value, 0, 420000)){ return ValidLimit(0, addComma(420000)); }
                                                        }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(0,
                                                        420000)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'win_size_reci',
                                                    afterBodyEl: [
                                                        '<div class="inp_after">{[__zen("kbyte")]}</div>'
                                                    ],
                                                    fieldLabel: 'RX',
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 7,
                                                    maxLengthText: ' ',
                                                    listeners: {
                                                        errorchange: 'onWin_size_reciErrorChange',
                                                        blur: 'onWin_size_reciBlur',
                                                        focus: 'onWin_size_reciFocus',
                                                        change: 'onWin_size_reciChange',
                                                        keydown: 'onWin_size_reciKeydown'
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

    onWin_nameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_nameBlur: function(component, event, eOpts) {
        Ext.getCmp('win_name').validateValue(true);
    },

    onRadiofieldChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('r_2').setValue(false);
            Ext.getCmp('r_3').setValue(false);
            Ext.getCmp('win_session_limit_con').show();
            Ext.getCmp('win_size_limit_con').hide();
            Ext.getCmp('win_size_tran').reset();
            Ext.getCmp('win_size_reci').reset();
        }
    },

    onLabelRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('r_1').getValue()){ Ext.getCmp('r_1').setValue(true); }
        }, component);
    },

    onRadiofieldChange1: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('r_1').setValue(false);
            Ext.getCmp('r_3').setValue(false);
            Ext.getCmp('win_session_limit_con').show();
            Ext.getCmp('win_size_limit_con').hide();
            Ext.getCmp('win_size_tran').reset();
            Ext.getCmp('win_size_reci').reset();
        }
    },

    onLabelRender1: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('r_2').getValue()){ Ext.getCmp('r_2').setValue(true); }
        }, component);
    },

    onRadiofieldChange2: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('r_2').setValue(false);
            Ext.getCmp('r_1').setValue(false);
            Ext.getCmp('win_session_limit_con').hide();
            Ext.getCmp('win_size_limit_con').show();
            Ext.getCmp('win_session_limit').reset();
        }
    },

    onLabelRender2: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('r_3').getValue()){ Ext.getCmp('r_3').setValue(true); }
        }, component);
    },

    onWin_session_limitErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_session_limitBlur: function(component, event, eOpts) {
        Ext.getCmp('win_session_limit').validateValue(true);
        setTipBlur(this,component);
    },

    onWin_session_limitFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onWin_session_limitChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onWin_session_limitKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onWin_size_tranErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_size_tranBlur: function(component, event, eOpts) {
        Ext.getCmp('win_size_tran').validateValue(true);
        setTipBlur(this,component);
        if(Ext.getCmp('win_size_tran').getValue() === ""){ Ext.getCmp('win_size_tran').setValue("0"); }
    },

    onWin_size_tranFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(Ext.getCmp('win_size_tran').getValue() === "0"){ Ext.getCmp('win_size_tran').setValue(""); }
    },

    onWin_size_tranChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onWin_size_tranKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onWin_size_reciErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_size_reciBlur: function(component, event, eOpts) {
        Ext.getCmp('win_size_reci').validateValue(true);
        setTipBlur(this,component);
        if(Ext.getCmp('win_size_reci').getValue() === ""){ Ext.getCmp('win_size_reci').setValue("0"); }
    },

    onWin_size_reciFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
        if(Ext.getCmp('win_size_reci').getValue() === "0"){ Ext.getCmp('win_size_reci').setValue(""); }
    },

    onWin_size_reciChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onWin_size_reciKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onFormAfterRender: function(component, eOpts) {
        var me = this;
        this.fieldInfo = makeZenTip();
        chk_zenauth(null);
        me.set_btn = false;
        if(this.edit === "edit"){

            me.setTitle(__zen('edit_session'));

            showLoadMask();

            var _params = {
                basename : Ext.encode("object_session")
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getObjectList',
                _params,

                function(data){
                    hideLoadMask();
                    for(var i in data.list){
                        if(data.list[i]['@cid'] === me.cid){
                            Ext.getCmp('win_name').setValue(data.list[i].name);
                            Ext.getCmp('win_desc').setValue(data.list[i].desc);
                            Ext.getCmp('win_session_limit').setValue(data.list[i].threshold);
                            Ext.getCmp('win_size_tran').setValue(data.list[i].tx);
                            Ext.getCmp('win_size_reci').setValue(data.list[i].rx);

                            if(data.list[i].limit_type === "create_per_second"){ Ext.getCmp('r_1').setValue(true); }
                            else if(data.list[i].limit_type === "concurrent_per_user"){ Ext.getCmp('r_2').setValue(true); }
                            else if(data.list[i].limit_type === "usage_per_session"){ Ext.getCmp('r_3').setValue(true); }
                        }
                    }
                }
            );

        }
        else{ me.setTitle(__zen('add_session')); }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;
        var type;
        var chk;
        var store = Ext.data.StoreManager.lookup('store_object_session_list');

        if(Ext.getCmp('win_name').isValid() === false){ Ext.getCmp('win_name').focus(); return false; }
        if(me.edit === "edit"){
            var chk_num = 0;
            for(var i in store.data.items){
                if(store.data.items[i].data.name === Ext.getCmp('win_name').getValue()){

                    if(Number(i) !== Number(me.edit_index)){ chk_num++; }
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
            me.set_btn = true;
            Ext.getCmp('win_name').isValid();
            return false;
        }

        if(Ext.getCmp('win_session_limit').isValid() === false){ Ext.getCmp('win_session_limit').focus(); return false; }
        if(Ext.getCmp('win_size_tran').isValid() === false){ Ext.getCmp('win_size_tran').focus(); return false; }
        if(Ext.getCmp('win_size_reci').isValid() === false){ Ext.getCmp('win_size_reci').focus(); return false; }

        if(Ext.getCmp('r_1').getValue()){ type = "create_per_second"; }
        else if(Ext.getCmp('r_2').getValue()){ type = "concurrent_per_user"; }
        else if(Ext.getCmp('r_3').getValue()){ type = "usage_per_session"; }

        var obj = {};

        obj = {
            'name' : Ext.getCmp('win_name').getValue(),
            'desc' : Ext.getCmp('win_desc').getValue(),
            'threshold' : removeComma(Ext.getCmp('win_session_limit').getValue()),
            'tx' : removeComma(Ext.getCmp('win_size_tran').getValue()),
            'limit_type' : type,
            'rx' : removeComma(Ext.getCmp('win_size_reci').getValue())
        };

        if(me.edit === "edit"){
            obj['@cid'] = me.cid;
        }

        var update = (me.edit==="edit")?true:false;
        showLoadMask();
        var _params = {
            basename : Ext.encode('object_session'),
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
                var store = Ext.data.StoreManager.lookup('store_object_session_list');
                if(me.edit === "edit"){
                    store.load(function(response){
                        //                 Ext.getCmp('st_fw_session_obj_cnt').setValue(store.totalCount + "/" + me.max);
                    });
                    var msg = Ext.Msg.show({
                        title: __weguardia,
                        msg: get_msg("msg_ok_edit"),
                        width: 300,
                        buttons: Ext.Msg.OK,
                        fn: setWinClose,
                        icon: Ext.window.MessageBox.INFO
                    });
                }
                else{
                    store.getProxy().setExtraParam('search_info',Ext.encode({}));
                    Ext.getCmp('session_search_text').reset();
                    Ext.getCmp('btn_reset').hide();
                    store.load(function(response){
                        Ext.getCmp('st_fw_session_obj_cnt').setValue(store.totalCount + "/" + me.max);
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
                        fn: setWinState,
                        icon: Ext.window.MessageBox.INFO
                    });
                }
                //         me.get_store();
            }
        );
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    get_store: function() {
        var me = this;
        var store = Ext.data.StoreManager.lookup('store_object_session_list');

    }

});