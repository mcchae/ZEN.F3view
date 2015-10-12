
Ext.define('NFW2.view.win_antispam_ipfilter', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_antispam_ipfilter',

    requires: [
        'NFW2.view.win_antispam_spamViewModel2',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.Img',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_antispam_ipfilter'
    },
    cls: 'zen_win',
    id: 'win_antispam_ipfilter',
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
                                var store = Ext.data.StoreManager.lookup('store_antispam_ipfilter');
                                var me = Ext.getCmp('win_antispam_ipfilter');

                                if(me.edit === "edit"){
                                    if(store.data.items.length < value){ return get_msg('err_form'); }
                                }
                                else{
                                    if(store.data.items.length < value){ return get_msg('err_form'); }
                                }
                                if(!LengthCheck(value, 1, 29)){ return ValidLimit(1, 29); }

                                return true;
                            },
                            id: 'win_ip_num',
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
                                keydown: 'onWin_ip_numKeydown',
                                focus: 'onWin_ip_numFocus'
                            }
                        },
                        {
                            xtype: 'container',
                            height: 22,
                            hidden: true,
                            id: 'default_con3',
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
                            id: 'default_con4',
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
                                        text: '{ip}'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'Any'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'win_ip_text_con',
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
                                            ip_mask = value.split('/');

                                            if(ip_mask[1] === "" || ip_mask[1] === undefined){
                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
                                            }
                                            else{
                                                if(!ValidIPAddress(ip_mask[0])){ return get_msg('err_ip'); }
                                                if(!ValidIPAddress(ip_mask[1])){ return get_msg('err_form'); }
                                            }
                                        }

                                        return true;
                                    },
                                    id: 'win_ip_text',
                                    margin: '0 0 0 -8',
                                    width: 400,
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9.\/]/,
                                    maxLength: 100,
                                    bind: {
                                        fieldLabel: '{ip}'
                                    },
                                    listeners: {
                                        errorchange: 'onTextfieldErrorChange1',
                                        blur: 'onWin_spam_textBlur',
                                        focus: 'onWin_ip_textFocus',
                                        keydown: 'onWin_ip_textKeydown'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'combobox',
                            id: 'win_ip_combo',
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
                                afterrender: 'onComboboxAfterRender'
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
                    itemId: 'fld_msg4'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    id: 'win_btn_spam_ok2',
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
                    id: 'win_btn_spam_cancel2',
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
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg4"]')[0];

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
        Ext.getCmp('win_ip_num').validateValue(true);
    },

    onWin_ip_numKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_ip_numFocus: function(component, event, eOpts) {
        var me = Ext.getCmp('win_antivirus_ipfilter');

        var store = Ext.getCmp('grid_ipfilter').getStore();

        component.fieldInfo = {txt: msg_tip_length(1,store.data.items.length,null)};

        setTipFocus(this,component);
    },

    onTextfieldErrorChange1: function(labelable, error, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg4"]')[0];

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
        Ext.getCmp('win_ip_text').validateValue(true);
    },

    onWin_ip_textFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4sm');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onWin_ip_textKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onComboboxAfterRender: function(component, eOpts) {
        var combo = Ext.getCmp('win_ip_combo').getStore().data;

        if(combo.length > 0){
            Ext.getCmp('win_ip_combo').setValue(combo.items[0].data['type']);
        }
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        this.fieldInfo = makeZenTip();
        chk_zenauth(null);
        if(this.edit === "edit"){

            me.setTitle(__zen('edit_ipfilter'));
            var store = Ext.data.StoreManager.lookup('store_antispam_ipfilter');

            if(me.num !== 30){
                Ext.getCmp('win_ip_num').show();
                Ext.getCmp('win_ip_text_con').show();
                Ext.getCmp('default_con3').hide();
                Ext.getCmp('default_con4').hide();
                for(var i in store.data.items){
                    if(store.data.items[i].data.num === me.num){
                        Ext.getCmp('win_ip_num').setValue(store.data.items[i].data.num);
                        Ext.getCmp('win_ip_combo').setValue(store.data.items[i].data.action);
                        Ext.getCmp('win_ip_text').setValue(store.data.items[i].data.address);
                    }
                }
            }
            else{
                me.cnt = "trd";
                Ext.getCmp('win_ip_num').hide();
                Ext.getCmp('win_ip_text_con').hide();
                Ext.getCmp('default_con3').show();
                Ext.getCmp('default_con4').show();

                Ext.getCmp('win_ip_combo').setValue(me.record.data.action);
            }
        }
        else{ me.setTitle(__zen('add_ipfilter')); }
    },

    onWin_btn_spam_okClick: function(button, e, eOpts) {
        var me = this;
        var store = Ext.data.StoreManager.lookup('store_antispam_ipfilter');

        var records = [];

        if(me.cnt !== "trd"){
            if(Ext.getCmp('win_ip_num').isValid() === false){ /*Ext.getCmp('win_ip_num').isValid();*/ Ext.getCmp('win_ip_num').focus(); return false; }
            if(Ext.getCmp('win_ip_text').isValid() === false){ /*Ext.getCmp('win_ip_file').isValid();*/ Ext.getCmp('win_ip_text').focus(); return false; }
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
                'action':Ext.getCmp('win_ip_combo').getValue(),
                'address' : last_record[0].address
            });

            store.loadData(trd_record);
            this.close();
        }
        else{
        if(me.edit === "edit"){
            var num = 1;
            if(store.data.items.length === Number(Ext.getCmp('win_ip_num').getValue())){
                for(var i=0;i < Number(store.data.items.length);i++){
                    if(store.data.items[i].data.num !== me.num){
                        records.push({
                            'num' : num,
                            'action' : store.data.items[i].data.action,
                            'address' : store.data.items[i].data.address
                        });
                        num++;
                    }
                }
                records.push({
                    'num' : num,
                    'action':Ext.getCmp('win_ip_combo').getValue(),
                    'address' : Ext.getCmp('win_ip_text').getValue()
                });
            }
            else if(Ext.getCmp('win_ip_num').getValue() === ""){
                for(var i=0;i < Number(store.data.items.length);i++){
                    if(store.data.items[i].data.num !== me.num){
                        records.push({
                            'num' : num,
                            'action' : store.data.items[i].data.action,
                            'address' : store.data.items[i].data.address
                        });
                        num++;
                    }
                }

                records.push({
                    'num' : num,
                    'action':Ext.getCmp('win_ip_combo').getValue(),
                    'address' : Ext.getCmp('win_ip_text').getValue()
                });
            }
            else if(me.num < Number(Ext.getCmp('win_ip_num').getValue())){
                for(var i=0;i < Number(Ext.getCmp('win_ip_num').getValue());i++){
                    if(store.data.items[i].data.num !== me.num){
                        records.push({
                            'num' : num,
                            'action' : store.data.items[i].data.action,
                            'address' : store.data.items[i].data.address
                        });
                        num++;
                    }
                }
                records.push({
                    'num' : num,
                    'action':Ext.getCmp('win_ip_combo').getValue(),
                    'address' : Ext.getCmp('win_ip_text').getValue()
                });
                num++;
                for(var j = Number(Ext.getCmp('win_ip_num').getValue());j < store.data.items.length;j++){
                    records.push({
                        'num' : num,
                        'action' : store.data.items[i].data.action,
                        'address' : store.data.items[i].data.address
                    });
                    num++;
                }
            }
            else if(me.num >= Number(Ext.getCmp('win_ip_num').getValue())){
                for(var i=0;i < Number(Ext.getCmp('win_ip_num').getValue())-1;i++){
                    records.push({
                        'num' : num,
                        'action' : store.data.items[i].data.action,
                        'address' : store.data.items[i].data.address
                    });
                    num++;
                }
                records.push({
                    'num' : num,
                    'action':Ext.getCmp('win_ip_combo').getValue(),
                    'address' : Ext.getCmp('win_ip_text').getValue()
                });
                num++;
                for(var j = Number(Ext.getCmp('win_ip_num').getValue())-1;j < store.data.items.length;j++){
                    if(store.data.items[j].data.num !== me.num){
                        records.push({
                            'num' : num,
                            'action' : store.data.items[i].data.action,
                            'address' : store.data.items[i].data.address
                        });
                        num++;
                    }
                }
            }
            records.push({
                'num':last_record[0].num,
                'action':last_record[0].action,
                'address' : last_record[0].address
            });

            store.loadData(records);
            this.close();
        }
        else{
            if(store.data.items.length === 0){
                records.push({
                    'num' : 1,
                    'action':Ext.getCmp('win_ip_combo').getValue(),
                    'address' : Ext.getCmp('win_ip_text').getValue()
                });
            }
            else if(Number(store.data.items.length+1) === Number(Ext.getCmp('win_ip_num').getValue())){
                for(var i in store.data.items){

                    records.push({
                        'num' : store.data.items[i].data.num,
                        'action' : store.data.items[i].data.action,
                        'address' : store.data.items[i].data.address
                    });
                }

                records.push({
                    'num' : Ext.getCmp('win_ip_num').getValue(),
                    'action':Ext.getCmp('win_ip_combo').getValue(),
                    'address' : Ext.getCmp('win_ip_text').getValue()
                });
            }
            else if(Ext.getCmp('win_ip_num').getValue() === ""){

                for(var i in store.data.items){
                    records.push({
                        'num' : store.data.items[i].data.num,
                        'action' : store.data.items[i].data.action,
                        'address' : store.data.items[i].data.address
                    });

                    var num = Number(i)+1;

                }

                records.push({
                    'num' : Number(num)+1,
                    'action':Ext.getCmp('win_ip_combo').getValue(),
                    'address' : Ext.getCmp('win_ip_text').getValue()
                });
            }
            else{
                for(var i = 1;i < Number(Ext.getCmp('win_ip_num').getValue());i++){
                    records.push({
                        'num' : store.data.items[i-1].data.num,
                        'action' : store.data.items[i-1].data.action,
                        'address' : store.data.items[i-1].data.address
                    });
                }
                records.push({
                    'num' : Ext.getCmp('win_ip_num').getValue(),
                    'action':Ext.getCmp('win_ip_combo').getValue(),
                    'address' : Ext.getCmp('win_ip_text').getValue()
                });

                for(var i = Number(Ext.getCmp('win_ip_num').getValue())+1;i < Number(store.data.items.length+2);i++){
                    records.push({
                        'num' : Number(store.data.items[Number(i)-2].data.num)+1,
                        'action' : store.data.items[Number(i)-2].data.action,
                        'address' : store.data.items[Number(i)-2].data.address
                    });
                }
            }
            records.push({
                'num':last_record[0].num,
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