
Ext.define('NFW2.view.win_antispam_spam', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_antispam_spam',

    requires: [
        'NFW2.view.win_antispam_spamViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.Img',
        'Ext.form.Label',
        'Ext.form.field.Radio',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_antispam_spam'
    },
    cls: 'zen_win',
    id: 'win_antispam_spam',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            header: false,
            title: 'My Form',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    margin: '8 0 0 0',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var store = Ext.data.StoreManager.lookup('store_antispam_spam');
                                var me = Ext.getCmp('win_antispam_spam');

                                if(me.edit === "edit"){
                                    if(store.data.items.length < value){ return get_msg('err_form'); }
                                }
                                else{
                                    if(store.data.items.length+1 < value){ return get_msg('err_form'); }
                                }
                                if(!LengthCheck(value, 1, 30)){ return ValidLimit(1, 30); }

                                return true;
                            },
                            id: 'win_spam_num',
                            margin: '0 0 0 10',
                            width: 200,
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 2,
                            bind: {
                                fieldLabel: '{rank}'
                            },
                            listeners: {
                                errorchange: 'onTextfieldErrorChange',
                                blur: 'onWin_spam_numBlur',
                                keydown: 'onWin_spam_numKeydown',
                                focus: 'onWin_spam_numFocus'
                            }
                        },
                        {
                            xtype: 'combobox',
                            id: 'win_spam_combo',
                            margin: '8 0 0 10',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: 'store_antispam_rec',
                            valueField: 'type',
                            bind: {
                                fieldLabel: '{type}'
                            },
                            listeners: {
                                afterrender: 'onComboboxAfterRender'
                            }
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
                                    xtype: 'image',
                                    margin: '3 0 0 10',
                                    maxHeight: 6,
                                    width: 8,
                                    src: '../images/bul_req.png'
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                        return true;
                                    },
                                    fieldInfo: {
                                        txt: __zen('character_tip_100')
                                    },
                                    id: 'win_spam_text',
                                    margin: '0 0 0 -8',
                                    width: 500,
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9a-zA-Z-_!@\#$%^&*()<>\/`~+,.:;\'\"?]/,
                                    maxLength: 100,
                                    bind: {
                                        fieldLabel: '{contents}'
                                    },
                                    listeners: {
                                        errorchange: 'onTextfieldErrorChange1',
                                        blur: 'onWin_spam_textBlur',
                                        keydown: 'onWin_spam_textKeydown',
                                        focus: 'onWin_spam_textFocus'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '5 0 10 20',
                            width: 500,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 120,
                                    bind: {
                                        text: '{action}'
                                    }
                                },
                                {
                                    xtype: 'radiofield',
                                    id: 'spam_radio_1',
                                    checked: true,
                                    listeners: {
                                        change: 'onSpam_radio_1Change'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    margin: '3 0 0 5',
                                    width: 100,
                                    bind: {
                                        text: '{deny}'
                                    },
                                    listeners: {
                                        render: 'onLabelRender'
                                    }
                                },
                                {
                                    xtype: 'radiofield',
                                    id: 'spam_radio_2',
                                    listeners: {
                                        change: 'onSpam_radio_2Change'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    margin: '3 0 0 5',
                                    width: 100,
                                    bind: {
                                        text: '{detect}'
                                    },
                                    listeners: {
                                        render: 'onLabelRender1'
                                    }
                                },
                                {
                                    xtype: 'radiofield',
                                    id: 'spam_radio_3',
                                    listeners: {
                                        change: 'onSpam_radio_3Change'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    margin: '3 0 0 5',
                                    bind: {
                                        text: '{allow}'
                                    },
                                    listeners: {
                                        render: 'onLabelRender2'
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
                    itemId: 'fld_msg2'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    id: 'win_btn_spam_ok',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onWin_btn_spam_okClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    id: 'win_btn_spam_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onWin_btn_spam_cancelClick'
                    }
                }
            ]
        }
    ],

    onTextfieldErrorChange: function(labelable, error, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg2"]')[0];

        if(error){
            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }

    },

    onWin_spam_numBlur: function(component, event, eOpts) {
        Ext.getCmp('win_spam_num').validateValue(true);
    },

    onWin_spam_numKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_spam_numFocus: function(component, event, eOpts) {
        var me = Ext.getCmp('win_antivirus_spam');

        var store = Ext.getCmp('grid_spam').getStore();

        component.fieldInfo = {txt: msg_tip_length(1,store.data.items.length+1,null)};

        setTipFocus(this,component);
    },

    onComboboxAfterRender: function(component, eOpts) {
        var combo = Ext.getCmp('win_spam_combo').getStore().data;

        if(combo.length > 0){
            Ext.getCmp('win_spam_combo').setValue(combo.items[0].data['type']);
        }
    },

    onTextfieldErrorChange1: function(labelable, error, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg2"]')[0];

        if(error){
            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }

    },

    onWin_spam_textBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('win_spam_text').validateValue(true);
    },

    onWin_spam_textKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_spam_textFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onSpam_radio_1Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('spam_radio_2').setValue(false);
            Ext.getCmp('spam_radio_3').setValue(false);
        }
    },

    onLabelRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('spam_radio_1').getValue()){ Ext.getCmp('spam_radio_1').setValue(true); }
        }, component);
    },

    onSpam_radio_2Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('spam_radio_1').setValue(false);
            Ext.getCmp('spam_radio_3').setValue(false);
        }
    },

    onLabelRender1: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('spam_radio_2').getValue()){ Ext.getCmp('spam_radio_2').setValue(true); }
        }, component);
    },

    onSpam_radio_3Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('spam_radio_2').setValue(false);
            Ext.getCmp('spam_radio_1').setValue(false);
        }
    },

    onLabelRender2: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(!Ext.getCmp('spam_radio_3').getValue()){ Ext.getCmp('spam_radio_3').setValue(true); }
        }, component);
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        this.fieldInfo = makeZenTip();
        chk_zenauth(null);
        if(this.edit === "edit"){

            me.setTitle(__zen('edit_denyrule'));
            var store = Ext.data.StoreManager.lookup('store_antispam_spam');
            for(var i in store.data.items){
                if(store.data.items[i].data['@num'] === me.num){
                    Ext.getCmp('win_spam_num').setValue(store.data.items[i].data['@num']);
                    Ext.getCmp('win_spam_combo').setValue(store.data.items[i].data['type']);
                    Ext.getCmp('win_spam_text').setValue(store.data.items[i].data['filter']);

                    if(store.data.items[i].data['action'] === "0"){ Ext.getCmp('spam_radio_1').setValue(true); }
                    if(store.data.items[i].data['action'] === "1"){ Ext.getCmp('spam_radio_2').setValue(true); }
                    if(store.data.items[i].data['action'] === "2"){ Ext.getCmp('spam_radio_3').setValue(true); }
                }
            }
        }
        else{ me.setTitle(__zen('add_denyrule')); }
    },

    onWin_btn_spam_okClick: function(button, e, eOpts) {
        var me = this;
        var store = Ext.data.StoreManager.lookup('store_antispam_spam');

        var records = [];

        if(Ext.getCmp('win_spam_num').isValid() === false){ Ext.getCmp('win_spam_num').focus(); return false; }
        if(Ext.getCmp('win_spam_text').isValid() === false){ Ext.getCmp('win_spam_text').focus(); return false; }

        var action;
        if(Ext.getCmp('spam_radio_1').getValue()){ action = "0"; }
        else if(Ext.getCmp('spam_radio_2').getValue()){ action = "1"; }
        else if(Ext.getCmp('spam_radio_3').getValue()){ action = "2"; }

        if(me.edit === "edit"){
            var num = 1;

            if(store.data.items.length === Number(Ext.getCmp('win_spam_num').getValue())){
                for(var i=0;i < Number(store.data.items.length);i++){
                    if(store.data.items[i].data['@num'] !== me.num){
                        records.push({
                            '@num' : num,
                            'type' : store.data.items[i].data['type'],
                            'filter' : store.data.items[i].data['filter'],
                            'action' : store.data.items[i].data['action']
                        });
                        num++;
                    }
                }
                records.push({
                    '@num' : num,
                    'type' : Ext.getCmp('win_spam_combo').getValue(),
                    'filter' : Ext.getCmp('win_spam_text').getValue(),
                    'action' : action
                });
            }
            else if(Ext.getCmp('win_spam_num').getValue() === ""){
                for(var i=0;i < Number(store.data.items.length);i++){
                    if(store.data.items[i].data['@num'] !== me.num){
                        records.push({
                            '@num' : num,
                            'type' : store.data.items[i].data['type'],
                            'filter' : store.data.items[i].data['filter'],
                            'action' : store.data.items[i].data['action']
                        });
                        num++;
                    }
                }
                records.push({
                    '@num' : num,
                    'type' : Ext.getCmp('win_spam_combo').getValue(),
                    'filter' : Ext.getCmp('win_spam_text').getValue(),
                    'action' : action
                });
            }
            else if(me.num < Number(Ext.getCmp('win_spam_num').getValue())){
                for(var i=0;i < Number(Ext.getCmp('win_spam_num').getValue());i++){
                    if(store.data.items[i].data['@num'] !== me.num){
                        records.push({
                            '@num' : num,
                            'type' : store.data.items[i].data['type'],
                            'filter' : store.data.items[i].data['filter'],
                            'action' : store.data.items[i].data['action']
                        });
                        num++;
                    }
                }
                records.push({
                    '@num' : num,
                    'type' : Ext.getCmp('win_spam_combo').getValue(),
                    'filter' : Ext.getCmp('win_spam_text').getValue(),
                    'action' : action
                });
                num++;
                for(var j = Number(Ext.getCmp('win_spam_num').getValue());j < store.data.items.length;j++){
                    records.push({
                        '@num' : num,
                        'type' : store.data.items[j].data['type'],
                        'filter' : store.data.items[j].data['filter'],
                        'action' : store.data.items[j].data['action']
                    });
                    num++;
                }
            }
            else if(me.num >= Number(Ext.getCmp('win_spam_num').getValue())){
                for(var i=0;i < Number(Ext.getCmp('win_spam_num').getValue())-1;i++){
                    records.push({
                        '@num' : num,
                        'type' : store.data.items[i].data['type'],
                        'filter' : store.data.items[i].data['filter'],
                        'action' : store.data.items[i].data['action']
                    });
                    num++;
                }
                records.push({
                    '@num' : num,
                    'type' : Ext.getCmp('win_spam_combo').getValue(),
                    'filter' : Ext.getCmp('win_spam_text').getValue(),
                    'action' : action
                });
                num++;
                for(var j = Number(Ext.getCmp('win_spam_num').getValue())-1;j < store.data.items.length;j++){
                    if(store.data.items[j].data['@num'] !== me.num){
                        records.push({
                            '@num' : num,
                            'type' : store.data.items[j].data['type'],
                            'filter' : store.data.items[j].data['filter'],
                            'action' : store.data.items[j].data['action']
                        });
                        num++;
                    }
                }
            }
            store.loadData(records);
            this.close();
            //     Ext.Msg.show({
            //         title: 'System Message - SUCCESS',
            //         msg: get_msg("msg_ok_edit"),
            //         width: 300,
            //         buttons: Ext.Msg.OK,
            //         fn: setWinClose,
            //         icon: Ext.window.MessageBox.INFO
            //     });
        }
        else{
            if(store.data.items.length === 0){
                records.push({
                    '@num' : 1,
                    'type' : Ext.getCmp('win_spam_combo').getValue(),
                    'filter' : Ext.getCmp('win_spam_text').getValue(),
                    'action' : action
                });
            }
            else if(Number(store.data.items.length+1) === Number(Ext.getCmp('win_spam_num').getValue())){
                for(var i in store.data.items){
                    records.push({
                        '@num' : store.data.items[i].data['@num'],
                        'type' : store.data.items[i].data['type'],
                        'filter' : store.data.items[i].data['filter'],
                        'action' : store.data.items[i].data['action']
                    });
                }
                records.push({
                    '@num' : Ext.getCmp('win_spam_num').getValue(),
                    'type' : Ext.getCmp('win_spam_combo').getValue(),
                    'filter' : Ext.getCmp('win_spam_text').getValue(),
                    'action' : action
                });
            }
            else if(Ext.getCmp('win_spam_num').getValue() === ""){
                for(var i in store.data.items){
                    records.push({
                        '@num' : store.data.items[i].data['@num'],
                        'type' : store.data.items[i].data['type'],
                        'filter' : store.data.items[i].data['filter'],
                        'action' : store.data.items[i].data['action']
                    });
                }
                records.push({
                    '@num' : Number(i)+2,
                    'type' : Ext.getCmp('win_spam_combo').getValue(),
                    'filter' : Ext.getCmp('win_spam_text').getValue(),
                    'action' : action
                });
            }
            else{
                for(var i = 1;i < Number(Ext.getCmp('win_spam_num').getValue());i++){
                    records.push({
                        '@num' : store.data.items[Number(i)-1].data['@num'],
                        'type' : store.data.items[Number(i)-1].data['type'],
                        'filter' : store.data.items[Number(i)-1].data['filter'],
                        'action' : store.data.items[Number(i)-1].data['action']
                    });
                }
                records.push({
                    '@num' : Ext.getCmp('win_spam_num').getValue(),
                    'type' : Ext.getCmp('win_spam_combo').getValue(),
                    'filter' : Ext.getCmp('win_spam_text').getValue(),
                    'action' : action
                });
                for(var i = Number(Ext.getCmp('win_spam_num').getValue())+1;i < Number(store.data.items.length+2);i++){
                    records.push({
                        '@num' : Number(store.data.items[Number(i)-2].data['@num'])+1,
                        'type' : store.data.items[Number(i)-2].data['type'],
                        'filter' : store.data.items[Number(i)-2].data['filter'],
                        'action' : store.data.items[Number(i)-2].data['action']
                    });
                }
            }
            store.loadData(records);
            this.close();
            //     Ext.Msg.show({
            //         title: 'System Message - SUCCESS',
            //         msg: get_msg("msg_ok_add"),
            //         width: 300,
            //         buttons: Ext.Msg.OK,
            //         fn: setWinClose,
            //         icon: Ext.window.MessageBox.INFO
            //     });
        }
    },

    onWin_btn_spam_cancelClick: function(button, e, eOpts) {
        this.close();
    }

});