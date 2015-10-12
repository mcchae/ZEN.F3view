
Ext.define('NFW2.view.win_antivirus_filefilter', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_antivirus_filefilter',

    requires: [
        'NFW2.view.win_antivirus_filefilterViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.Img',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_antivirus_filefilter'
    },
    cls: 'zen_win',
    id: 'win_antivirus_filefilter',
    scrollable: true,
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
                    width: 500,
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var me = Ext.getCmp('win_antivirus_filefilter');

                                if(me.mode  === "smtp"){ var store = Ext.data.StoreManager.lookup('store_antivirus_smtp_filter'); }
                                else{ var store = Ext.data.StoreManager.lookup('store_antivirus_ftp_filter'); }

                                if(me.edit === "edit"){
                                    if(store.data.items.length < value){ return get_msg('err_form'); }
                                }
                                else{
                                    if(store.data.items.length < value){ return get_msg('err_form'); }
                                }
                                if(!LengthCheck(value, 1, 29)){ return ValidLimit(1, 29); }

                                return true;
                            },
                            id: 'win_filter_num',
                            margin: '8 0 8 10',
                            width: 180,
                            labelSeparator: ' ',
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
                                blur: 'onWin_filter_numBlur',
                                keydown: 'onWin_filter_numKeydown',
                                focus: 'onWin_filter_numFocus'
                            }
                        },
                        {
                            xtype: 'container',
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
                                    width: 110,
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
                            id: 'filter_con',
                            margin: '8 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'image',
                                    margin: '3 2 0 10',
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
                                    id: 'win_filter_file',
                                    margin: '0 0 0 -10',
                                    width: 480,
                                    labelSeparator: ' ',
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9a-zA-Z-_!@\#$%^&*()<>\/`~+,.:;\'\"?]/,
                                    maxLength: 100,
                                    bind: {
                                        fieldLabel: '{file}'
                                    },
                                    listeners: {
                                        errorchange: 'onTextfieldErrorChange1',
                                        blur: 'onWin_filter_fileBlur',
                                        keydown: 'onWin_filter_fileKeydown'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
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
                                    width: 110,
                                    bind: {
                                        text: '{file}'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: '*'
                                }
                            ]
                        },
                        {
                            xtype: 'combobox',
                            id: 'win_filefilter_combo',
                            margin: '8 0 10 10',
                            labelSeparator: ' ',
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: 'store_antivirus_behav',
                            valueField: 'type',
                            bind: {
                                fieldLabel: '{action}'
                            },
                            listeners: {
                                afterrender: 'onComboboxAfterRender'
                            }
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
                    itemId: 'fld_msg1'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    id: 'win_file_btn_add',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onWin_file_btn_addClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    id: 'win_file_btn_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onWin_file_btn_cancelClick'
                    }
                }
            ]
        }
    ],

    onTextfieldErrorChange: function(labelable, error, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

        if(error){
            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onWin_filter_numBlur: function(component, event, eOpts) {
        Ext.getCmp('win_filter_num').validateValue(true);
    },

    onWin_filter_numKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onWin_filter_numFocus: function(component, event, eOpts) {
        var me = Ext.getCmp('win_antivirus_filefilter');

        if(me.mode === "ftp"){
            var store_ftp = Ext.getCmp('grid_ftp_filefilter').getStore();

            component.fieldInfo = {txt: msg_tip_length(1,store_ftp.data.items.length,null)};
        }
        else{
            var store_smtp = Ext.getCmp('grid_smtp_filefilter').getStore();

            component.fieldInfo = {txt: msg_tip_length(1,store_smtp.data.items.length,null)};
        }

        setTipFocus(this,component);
    },

    onTextfieldErrorChange1: function(labelable, error, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

        if(error){
            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onWin_filter_fileBlur: function(component, event, eOpts) {
        Ext.getCmp('win_filter_file').validateValue(true);
    },

    onWin_filter_fileKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onComboboxAfterRender: function(component, eOpts) {
        var combo = Ext.getCmp('win_filefilter_combo').getStore().data;

        if(combo.length > 0){
            Ext.getCmp('win_filefilter_combo').setValue(combo.items[0].data['type']);
        }
    },

    onFormAfterRender: function(component, eOpts) {
        var me = this;
        this.fieldInfo = makeZenTip();
        chk_zenauth(null);
        if(this.edit === "edit"){

            me.setTitle(__zen('edit_filefilter'));
            if(me.mode === "smtp"){ var store = Ext.data.StoreManager.lookup('store_antivirus_smtp_filter'); }
            else{ var store = Ext.data.StoreManager.lookup('store_antivirus_ftp_filter'); }

            if(me.num !== 30){
                Ext.getCmp('win_filter_num').show();
                Ext.getCmp('filter_con').show();
                Ext.getCmp('default_con1').hide();
                Ext.getCmp('default_con2').hide();
                for(var i in store.data.items){
                    if(store.data.items[i].data['@num'] === me.num){
                        Ext.getCmp('win_filter_num').setValue(store.data.items[i].data['@num']);
                        Ext.getCmp('win_filter_file').setValue(store.data.items[i].data.item);
                        Ext.getCmp('win_filefilter_combo').setValue(store.data.items[i].data.chk);
                    }
                }
            }
            else{
                me.cnt = "trd";
                Ext.getCmp('win_filter_num').hide();
                Ext.getCmp('filter_con').hide();
                Ext.getCmp('default_con1').show();
                Ext.getCmp('default_con2').show();
            }
        }
        else{ me.setTitle(__zen('add_filefilter')); }
    },

    onWin_file_btn_addClick: function(button, e, eOpts) {
        var me = this;
        if(me.mode === "smtp"){ var store = Ext.data.StoreManager.lookup('store_antivirus_smtp_filter'); }
        else{ var store = Ext.data.StoreManager.lookup('store_antivirus_ftp_filter'); }

        var records = [];

        if(me.cnt !== "trd"){
            if(Ext.getCmp('win_filter_num').isValid() === false){ Ext.getCmp('win_filter_num').isValid(); Ext.getCmp('win_filter_num').focus(); return false; }
            if(Ext.getCmp('win_filter_file').isValid() === false){ Ext.getCmp('win_filter_file').isValid(); Ext.getCmp('win_filter_file').focus(); return false; }
        }

        var z_record = [];
        var last_record = [];
        for(var z in store.data.items){
            if(store.data.items[z].data['@num'] !== 30){
                z_record.push(store.data.items[z].data);
            }
            else{ last_record.push(store.data.items[z].data); }
        }

        store.loadData(z_record);


        if(me.cnt === "trd"){
            var trd_record = z_record;
            trd_record.push({
                '@num':last_record[0]['@num'],
                'chk':Ext.getCmp('win_filefilter_combo').getValue(),
                'item':last_record[0].item
            });

            store.loadData(trd_record);
            this.close();
        }
        else{
        if(me.edit === "edit"){
            var num = 1;
            if(store.data.items.length === Number(Ext.getCmp('win_filter_num').getValue())){
                for(var i=0;i < Number(store.data.items.length);i++){
                    if(store.data.items[i].data['@num'] !== me.num){
                        records.push({
                            '@num' : num,
                            'chk' : store.data.items[i].data['chk'],
                            'item' : store.data.items[i].data['item']
                        });
                        num++;
                    }
                }
                records.push({
                    '@num' : num,
                    'chk' : Ext.getCmp('win_filefilter_combo').getValue(),
                    'item' : Ext.getCmp('win_filter_file').getValue()
                });
            }
            else if(Ext.getCmp('win_filter_num').getValue() === ""){
                for(var i=0;i < Number(store.data.items.length);i++){
                    if(store.data.items[i].data['@num'] !== me.num){
                        records.push({
                            '@num' : num,
                            'chk' : store.data.items[i].data['chk'],
                            'item' : store.data.items[i].data['item']
                        });
                        num++;
                    }
                }
                records.push({
                    '@num' : num,
                    'chk' : Ext.getCmp('win_filefilter_combo').getValue(),
                    'item' : Ext.getCmp('win_filter_file').getValue()
                });
            }
            else if(me.num < Number(Ext.getCmp('win_filter_num').getValue())){
                for(var i=0;i < Number(Ext.getCmp('win_filter_num').getValue());i++){
                    if(store.data.items[i].data['@num'] !== me.num){
                        records.push({
                            '@num' : num,
                            'chk' : store.data.items[i].data['chk'],
                            'item' : store.data.items[i].data['item']
                        });
                        num++;
                    }
                }
                records.push({
                    '@num' : num,
                    'chk' : Ext.getCmp('win_filefilter_combo').getValue(),
                    'item' : Ext.getCmp('win_filter_file').getValue()
                });
                num++;
                for(var j = Number(Ext.getCmp('win_filter_num').getValue());j < store.data.items.length;j++){
                    records.push({
                        '@num' : num,
                        'chk' : store.data.items[i].data['chk'],
                        'item' : store.data.items[i].data['item']
                    });
                    num++;
                }
            }
            else if(me.num >= Number(Ext.getCmp('win_filter_num').getValue())){
                for(var i=0;i < Number(Ext.getCmp('win_filter_num').getValue())-1;i++){
                    records.push({
                        '@num' : num,
                        'chk' : store.data.items[i].data['chk'],
                        'item' : store.data.items[i].data['item']
                    });
                    num++;
                }
                records.push({
                    '@num' : num,
                    'chk' : Ext.getCmp('win_filefilter_combo').getValue(),
                    'item' : Ext.getCmp('win_filter_file').getValue()
                });
                num++;
                for(var j = Number(Ext.getCmp('win_filter_num').getValue())-1;j < store.data.items.length;j++){
                    if(store.data.items[j].data['@num'] !== me.num){
                        records.push({
                            '@num' : num,
                            'chk' : store.data.items[j].data['chk'],
                            'item' : store.data.items[j].data['item']
                        });
                        num++;
                    }
                }
            }
            records.push({
                '@num':last_record[0]['@num'],
                'chk':last_record[0].chk,
                'item':last_record[0].item
            });

            store.loadData(records);
            this.close();
        }
        else{
            if(store.data.items.length === 0){
                records.push({
                    '@num' : 1,
                    'chk' : Ext.getCmp('win_filefilter_combo').getValue(),
                    'item' : Ext.getCmp('win_filter_file').getValue()
                });
            }
            else if(Number(store.data.items.length+1) === Number(Ext.getCmp('win_filter_num').getValue())){
                for(var i in store.data.items){

                    records.push({
                        '@num' : store.data.items[i].data['@num'],
                        'chk' : store.data.items[i].data['chk'],
                        'item' : store.data.items[i].data['item']
                    });
                }

                records.push({
                    '@num' : Ext.getCmp('win_filter_num').getValue(),
                    'chk' : Ext.getCmp('win_filefilter_combo').getValue(),
                    'item' : Ext.getCmp('win_filter_file').getValue()
                });
            }
            else if(Ext.getCmp('win_filter_num').getValue() === ""){

                for(var i in store.data.items){
                    records.push({
                        '@num' : store.data.items[i].data['@num'],
                        'chk' : store.data.items[i].data['chk'],
                        'item' : store.data.items[i].data['item']
                    });

                    var num = Number(i)+1;

                }

                records.push({
                    '@num' : Number(num)+1,
                    'chk' : Ext.getCmp('win_filefilter_combo').getValue(),
                    'item' : Ext.getCmp('win_filter_file').getValue()
                });
            }
            else{
                for(var i = 1;i < Number(Ext.getCmp('win_filter_num').getValue());i++){
                    records.push({
                        '@num' : store.data.items[i-1].data['@num'],
                        'chk' : store.data.items[i-1].data['chk'],
                        'item' : store.data.items[i-1].data['item']
                    });
                }
                records.push({
                    '@num' : Ext.getCmp('win_filter_num').getValue(),
                    'chk' : Ext.getCmp('win_filefilter_combo').getValue(),
                    'item' : Ext.getCmp('win_filter_file').getValue()
                });

                for(var i = Number(Ext.getCmp('win_filter_num').getValue())+1;i < Number(store.data.items.length+2);i++){
                    records.push({
                        '@num' : Number(store.data.items[Number(i)-2].data['@num'])+1,
                        'chk' : store.data.items[Number(i)-2].data['chk'],
                        'item' : store.data.items[Number(i)-2].data['item']
                    });
                }
            }
            records.push({
                '@num':last_record[0]['@num'],
                'chk':last_record[0].chk,
                'item':last_record[0].item
            });
            store.loadData(records);
            this.close();
        }
        }
    },

    onWin_file_btn_cancelClick: function(button, e, eOpts) {
        this.close();
    }

});