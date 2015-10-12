
Ext.define('NFW2.view.win_antispam_mailfilter', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_antispam_mailfilter',

    requires: [
        'NFW2.view.win_antispam_spamViewModel1',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.Img',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_antispam_mailfilter'
    },
    cls: 'zen_win',
    id: 'win_antispam_mailfilter',
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
                                var store = Ext.data.StoreManager.lookup('store_antispam_mailfilter');
                                var me = Ext.getCmp('win_antispam_mailfilter');

                                if(me.edit === "edit"){
                                    if(store.data.items.length < value){ return get_msg('err_form'); }
                                }
                                else{
                                    if(store.data.items.length < value){ return get_msg('err_form'); }
                                }
                                if(!LengthCheck(value, 1, 29)){ return ValidLimit(1, 29); }

                                return true;
                            },
                            id: 'win_mail_num',
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
                                keydown: 'onWin_mail_numKeydown',
                                focus: 'onWin_mail_numFocus'
                            }
                        },
                        {
                            xtype: 'container',
                            height: 22,
                            hidden: true,
                            id: 'default_con1',
                            margin: '8 0 0 20',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    bind: {
                                        text: '{rank}'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: '30'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 22,
                            hidden: true,
                            id: 'default_con2',
                            margin: '8 0 0 20',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    bind: {
                                        text: '{mail_address}'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: '*'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'win_mail_text_con',
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
                                        if(value !== true){
                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                            if(!ValidEmail(value)){ return get_msg('err_email'); }
                                        }

                                        return true;
                                    },
                                    id: 'win_mail_text',
                                    margin: '0 0 0 -8',
                                    width: 400,
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 100,
                                    bind: {
                                        fieldLabel: '{mail_address}'
                                    },
                                    listeners: {
                                        errorchange: 'onTextfieldErrorChange1',
                                        blur: 'onWin_spam_textBlur',
                                        keydown: 'onWin_mail_textKeydown'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'combobox',
                            id: 'win_mail_combo1',
                            margin: '8 0 0 10',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: {
                                data: [
                                    {
                                        type: 'sender',
                                        name: '수신자'
                                    },
                                    {
                                        type: 'receiver',
                                        name: '송신자'
                                    },
                                    {
                                        type: 'bidirection',
                                        name: '양방향'
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
                                fieldLabel: '{mail_sen_rec}'
                            },
                            listeners: {
                                afterrender: 'onComboboxAfterRender'
                            }
                        },
                        {
                            xtype: 'combobox',
                            id: 'win_mail_combo2',
                            margin: '8 0 0 10',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: {
                                data: [
                                    {
                                        type: '0',
                                        name: '차단'
                                    },
                                    {
                                        type: '1',
                                        name: '검사'
                                    },
                                    {
                                        type: '2',
                                        name: '미 검사'
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
                                fieldLabel: '{search_not}'
                            },
                            listeners: {
                                afterrender: 'onComboboxAfterRender1'
                            }
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
                    itemId: 'fld_msg3'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    id: 'win_btn_spam_ok1',
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
                    id: 'win_btn_spam_cancel1',
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
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

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
        Ext.getCmp('win_mail_num').validateValue(true);
    },

    onWin_mail_numKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_mail_numFocus: function(component, event, eOpts) {
        var me = Ext.getCmp('win_antispam_mailfilter');

        var store = Ext.getCmp('grid_mailfilter').getStore();

        component.fieldInfo = {txt: msg_tip_length(1,store.data.items.length,null)};

        setTipFocus(this,component);
    },

    onTextfieldErrorChange1: function(labelable, error, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

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
        Ext.getCmp('win_mail_text').validateValue(true);
    },

    onWin_mail_textKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onComboboxAfterRender: function(component, eOpts) {
        var combo = Ext.getCmp('win_mail_combo1').getStore().data;

        if(combo.length > 0){
            Ext.getCmp('win_mail_combo1').setValue(combo.items[0].data['type']);
        }
    },

    onComboboxAfterRender1: function(component, eOpts) {
        var combo = Ext.getCmp('win_mail_combo2').getStore().data;

        if(combo.length > 0){
            Ext.getCmp('win_mail_combo2').setValue(combo.items[0].data['type']);
        }
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        this.fieldInfo = makeZenTip();
        chk_zenauth(null);
        if(this.edit === "edit"){

            me.setTitle(__zen('edit_mailfilter'));
            var store = Ext.data.StoreManager.lookup('store_antispam_mailfilter');

            if(me.num !== 30){
                Ext.getCmp('win_mail_num').show();
                Ext.getCmp('win_mail_text_con').show();
                Ext.getCmp('default_con1').hide();
                Ext.getCmp('default_con2').hide();
                for(var i in store.data.items){
                    if(store.data.items[i].data.num === me.num){
                        Ext.getCmp('win_mail_num').setValue(store.data.items[i].data.num);
                        Ext.getCmp('win_mail_combo1').setValue(store.data.items[i].data.type);
                        Ext.getCmp('win_mail_combo2').setValue(store.data.items[i].data.action);
                        Ext.getCmp('win_mail_text').setValue(store.data.items[i].data.address);
                    }
                }
            }
            else{
                me.cnt = "trd";
                Ext.getCmp('win_mail_num').hide();
                Ext.getCmp('win_mail_text_con').hide();
                Ext.getCmp('default_con1').show();
                Ext.getCmp('default_con2').show();
                console.log(me.record.data);
                Ext.getCmp('win_mail_combo1').setValue(me.record.data.type);
                Ext.getCmp('win_mail_combo2').setValue(me.record.data.action);
            }
        }
        else{ me.setTitle(__zen('add_mailfilter')); }
    },

    onWin_btn_spam_okClick: function(button, e, eOpts) {
        var me = this;
        var store = Ext.data.StoreManager.lookup('store_antispam_mailfilter');

        var records = [];

        if(me.cnt !== "trd"){
            if(Ext.getCmp('win_mail_num').isValid() === false){ /*Ext.getCmp('win_mail_num').isValid();*/ Ext.getCmp('win_mail_num').focus(); return false; }
            if(Ext.getCmp('win_mail_text').isValid() === false){ /*Ext.getCmp('win_mail_text').isValid();*/ Ext.getCmp('win_mail_text').focus(); return false; }
        }

        var z_record = [];
        var last_record = [];
        for(var z in store.data.items){
            if(store.data.items[z].data.num !== 30){
                z_record.push(store.data.items[z].data);
            }
            else{ last_record.push(store.data.items[z].data); }
        }

        store.loadData(z_record);


        if(me.cnt === "trd"){
            var trd_record = z_record;
            trd_record.push({
                'num':last_record[0].num,
                'type':Ext.getCmp('win_mail_combo1').getValue(),
                'action':Ext.getCmp('win_mail_combo2').getValue(),
                'address' : last_record[0].address
            });

            store.loadData(trd_record);
            this.close();
        }
        else{
            if(me.edit === "edit"){
                var num = 1;
                if(store.data.items.length === Number(Ext.getCmp('win_mail_num').getValue())){
                    for(var i=0;i < Number(store.data.items.length);i++){
                        if(store.data.items[i].data.num !== me.num){
                            records.push({
                                'num' : num,
                                'type' : store.data.items[i].data.type,
                                'action' : store.data.items[i].data.action,
                                'address' : store.data.items[i].data.address
                            });
                            num++;
                        }
                    }
                    records.push({
                        'num' : num,
                        'type':Ext.getCmp('win_mail_combo1').getValue(),
                        'action':Ext.getCmp('win_mail_combo2').getValue(),
                        'address' : Ext.getCmp('win_mail_text').getValue()
                    });
                }
                else if(Ext.getCmp('win_mail_num').getValue() === ""){
                    for(var i=0;i < Number(store.data.items.length);i++){
                        if(store.data.items[i].data.num !== me.num){
                            records.push({
                                'num' : num,
                                'type' : store.data.items[i].data.type,
                                'action' : store.data.items[i].data.action,
                                'address' : store.data.items[i].data.address
                            });
                            num++;
                        }
                    }
                    records.push({
                        'num' : num,
                        'type':Ext.getCmp('win_mail_combo1').getValue(),
                        'action':Ext.getCmp('win_mail_combo2').getValue(),
                        'address' : Ext.getCmp('win_mail_text').getValue()
                    });
                }
                else if(me.num < Number(Ext.getCmp('win_mail_num').getValue())){
                    for(var i=0;i < Number(Ext.getCmp('win_mail_num').getValue());i++){
                        if(store.data.items[i].data.num !== me.num){
                            records.push({
                                'num' : num,
                                'type' : store.data.items[i].data.type,
                                'action' : store.data.items[i].data.action,
                                'address' : store.data.items[i].data.address
                            });
                            num++;
                        }
                    }
                    records.push({
                        'num' : num,
                        'type':Ext.getCmp('win_mail_combo1').getValue(),
                        'action':Ext.getCmp('win_mail_combo2').getValue(),
                        'address' : Ext.getCmp('win_mail_text').getValue()
                    });
                    num++;
                    for(var j = Number(Ext.getCmp('win_mail_num').getValue());j < store.data.items.length;j++){
                        records.push({
                            'num' : num,
                            'type' : store.data.items[j].data.type,
                            'action' : store.data.items[j].data.action,
                            'address' : store.data.items[j].data.address
                        });
                        num++;
                    }
                }
                else if(me.num >= Number(Ext.getCmp('win_mail_num').getValue())){
                    for(var i=0;i < Number(Ext.getCmp('win_mail_num').getValue())-1;i++){
                        records.push({
                            'num' : num,
                            'type' : store.data.items[i].data.type,
                            'action' : store.data.items[i].data.action,
                            'address' : store.data.items[i].data.address
                        });
                        num++;
                    }
                    records.push({
                        'num' : num,
                        'type':Ext.getCmp('win_mail_combo1').getValue(),
                        'action':Ext.getCmp('win_mail_combo2').getValue(),
                        'address' : Ext.getCmp('win_mail_text').getValue()
                    });
                    num++;

                    for(var j = Number(Ext.getCmp('win_mail_num').getValue()-1);j < store.data.items.length;j++){
                        if(store.data.items[j].data.num !== me.num){
                            records.push({
                                'num' : num,
                                'type' : store.data.items[j].data.type,
                                'action' : store.data.items[j].data.action,
                                'address' : store.data.items[j].data.address
                            });
                            num++;
                        }
                    }
                }
                records.push({
                    'num':last_record[0].num,
                    'type':last_record[0].type,
                    'action':last_record[0].action,
                    'address' : last_record[0].address
                });
                console.log(records);
                store.loadData(records);
                this.close();
            }
            else{
                if(store.data.items.length === 0){
                    records.push({
                        'num' : 1,
                        'type':Ext.getCmp('win_mail_combo1').getValue(),
                        'action':Ext.getCmp('win_mail_combo2').getValue(),
                        'address' : Ext.getCmp('win_mail_text').getValue()
                    });
                }
                else if(Number(store.data.items.length+1) === Number(Ext.getCmp('win_mail_num').getValue())){
                    for(var i in store.data.items){

                        records.push({
                            'num' : store.data.items[i].data.num,
                            'type' : store.data.items[i].data.type,
                            'action' : store.data.items[i].data.action,
                            'address' : store.data.items[i].data.address
                        });
                    }

                    records.push({
                        'num' : Ext.getCmp('win_mail_num').getValue(),
                        'type':Ext.getCmp('win_mail_combo1').getValue(),
                        'action':Ext.getCmp('win_mail_combo2').getValue(),
                        'address' : Ext.getCmp('win_mail_text').getValue()
                    });
                }
                else if(Ext.getCmp('win_mail_num').getValue() === ""){

                    for(var i in store.data.items){
                        records.push({
                            'num' : store.data.items[i].data.num,
                            'type' : store.data.items[i].data.type,
                            'action' : store.data.items[i].data.action,
                            'address' : store.data.items[i].data.address
                        });

                        var num = Number(i)+1;

                    }

                    records.push({
                        'num' : Number(num)+1,
                        'type':Ext.getCmp('win_mail_combo1').getValue(),
                        'action':Ext.getCmp('win_mail_combo2').getValue(),
                        'address' : Ext.getCmp('win_mail_text').getValue()
                    });
                }
                else{
                    for(var i = 1;i < Number(Ext.getCmp('win_mail_num').getValue());i++){
                        records.push({
                            'num' : store.data.items[i-1].data.num,
                            'type' : store.data.items[i-1].data.type,
                            'action' : store.data.items[i-1].data.action,
                            'address' : store.data.items[i-1].data.address
                        });
                    }
                    records.push({
                        'num' : Ext.getCmp('win_mail_num').getValue(),
                        'type':Ext.getCmp('win_mail_combo1').getValue(),
                        'action':Ext.getCmp('win_mail_combo2').getValue(),
                        'address' : Ext.getCmp('win_mail_text').getValue()
                    });

                    for(var i = Number(Ext.getCmp('win_mail_num').getValue())+1;i < Number(store.data.items.length+2);i++){
                        records.push({
                            'num' : Number(store.data.items[Number(i)-2].data.num)+1,
                            'type' : store.data.items[Number(i)-2].data.type,
                            'action' : store.data.items[Number(i)-2].data.action,
                            'address' : store.data.items[Number(i)-2].data.address
                        });
                    }
                }
                records.push({
                    'num':last_record[0].num,
                    'type':last_record[0].type,
                    'action':last_record[0].action,
                    'address' : last_record[0].address
                });

                store.loadData(records);
                this.close();
            }
        }
    },

    onWin_btn_spam_cancelClick: function(button, e, eOpts) {
        this.close();
    }

});