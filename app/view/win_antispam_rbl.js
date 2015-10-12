
Ext.define('NFW2.view.win_antispam_rbl', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_antispam_rbl',

    requires: [
        'NFW2.view.win_antispam_rblViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_antispam_rbl'
    },
    cls: 'zen_win',
    title: 'RBL 추가',
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
                    xtype: 'textfield',
                    validator: function(value) {
                        if(value !== true){
                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                            if(!ValidURL(value)){ return get_msg('err_form'); }
                        }

                        return true;
                    },
                    id: 'win_spam_rbl',
                    margin: '8 0 10 0',
                    maxWidth: 400,
                    minWidth: 400,
                    fieldLabel: 'URL',
                    labelCls: 'lb_req',
                    labelSeparator: ' ',
                    msgTarget: 'none',
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maskRe: /^[a-zA-Z0-9\s\.\/-_!*();:@&-=+$,?]/,
                    maxLength: 100,
                    listeners: {
                        errorchange: 'onTextfieldErrorChange',
                        blur: 'onWin_spam_rblBlur',
                        keydown: 'onWin_spam_rblKeydown'
                    }
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
                    itemId: 'fld_msg1'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    id: 'win_btn_rbl_ok',
                    iconCls: 'ft_confirm_icl',
                    text: '확인',
                    listeners: {
                        click: 'onWin_btn_rbl_okClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    id: 'win_btn_rbl_cancel',
                    text: '취소',
                    listeners: {
                        click: 'onWin_btn_rbl_cancelClick'
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

    onWin_spam_rblBlur: function(component, event, eOpts) {
        Ext.getCmp('win_spam_rbl').validateValue(true);
    },

    onWin_spam_rblKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;

        if(this.edit === "edit"){

            me.setTitle("RBL 수정");
            var store = Ext.data.StoreManager.lookup('store_antispam_rbl');
            for(var i in store.data.items){
                if(store.data.items[i].data['@num'] === me.num){
                    Ext.getCmp('win_spam_rbl').setValue(store.data.items[i].data['url']);
                }
            }
        }
    },

    onWin_btn_rbl_okClick: function(button, e, eOpts) {
        var me = this;
        var store = Ext.data.StoreManager.lookup('store_antispam_rbl');

        var records = [];


        if(Ext.getCmp('win_spam_rbl').isValid() === false){ Ext.getCmp('win_spam_rbl').focus(); return false; }
        var num = 1;

        if(me.edit === "edit"){
            for(var i=0;i < me.num-1;i++){
                records.push({
                    '@num' : store.data.items[i].data['@num'],
                    'url' : store.data.items[i].data['url']
                });
            }
            records.push({
                '@num' : store.data.items[me.num-1].data['@num'],
                'url' : Ext.getCmp('win_spam_rbl').getValue()
            });
            for(var i=me.num;i < store.data.items.length;i++){
                records.push({
                    '@num' : store.data.items[i].data['@num'],
                    'url' : store.data.items[i].data['url']
                });
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
            for(var i in store.data.items){
                records.push({
                    '@num' : store.data.items[i].data['@num'],
                    'url' : store.data.items[i].data['url']
                });
                num++;
            }
            records.push({
                '@num' : num,
                'url' : Ext.getCmp('win_spam_rbl').getValue()
            });

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

    onWin_btn_rbl_cancelClick: function(button, e, eOpts) {
        this.close();
    }

});