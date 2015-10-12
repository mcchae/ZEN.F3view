
Ext.define('NFW2.view.win_etc_xauth', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_etc_xauth',

    requires: [
        'NFW2.view.win_etc_xauthViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_etc_xauth'
    },
    cls: 'zen_win',
    scrollable: true,
    width: 400,
    title: 'XAuth 사용자 추가',
    modal: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'fm_xauth',
            scrollable: true,
            bodyPadding: 20,
            title: '',
            items: [
                {
                    xtype: 'container',
                    minWidth: 300,
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
                                    id: 'user_id',
                                    labelSeparator: ' ',
                                    labelWidth: 130,
                                    msgTarget: 'none',
                                    bind: {
                                        fieldLabel: '{user_id}'
                                    },
                                    listeners: {
                                        errorchange: 'onTunnel_ipErrorChange',
                                        blur: 'onUser_idBlur'
                                    }
                                }
                            ]
                        },
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
                                    id: 'pw',
                                    labelSeparator: ' ',
                                    labelWidth: 130,
                                    msgTarget: 'none',
                                    inputType: 'password',
                                    bind: {
                                        fieldLabel: '{pw}'
                                    },
                                    listeners: {
                                        errorchange: 'onTunnel_ipErrorChange1',
                                        blur: 'onPwBlur'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value === true){ return true; }
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        if(Ext.getCmp("pw").getValue() !== value){ return get_msg('err_pwCompare'); }

                                        return true;
                                    },
                                    cls: 'lb_req',
                                    id: 're_pw',
                                    labelSeparator: ' ',
                                    labelWidth: 130,
                                    inputType: 'password',
                                    bind: {
                                        fieldLabel: '{pw_confirm}'
                                    },
                                    listeners: {
                                        errorchange: 'onDr_timeoutErrorChange',
                                        blur: 'onRe_pwBlur'
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
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onButtonClick3'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick2'
                    }
                }
            ]
        }
    ],

    onTunnel_ipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg2");
    },

    onUser_idBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onTunnel_ipErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg2");
    },

    onPwBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onDr_timeoutErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg2");
    },

    onRe_pwBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;

        if(me.edit === "edit"){

            me.setTitle(__zen('xauth_user_edit')+" - "+me.record.num);

            Ext.getCmp("user_id").setValue(me.record.id);
            Ext.getCmp("pw").setValue(me.record.pw);
            Ext.getCmp("re_pw").setValue(me.record.pw);
        }else{

            me.setTitle(__zen('xauth_user_add'));
        }
    },

    onButtonClick3: function(button, e, eOpts) {
        var me = this;

        var id = Ext.getCmp("user_id");
        var pw = Ext.getCmp("pw");
        var re_pw = Ext.getCmp("pw");

        var _store = Ext.data.StoreManager.lookup("store_etc_xauth_list");

        if(id.isValid()===false){ id.focus(); return false; }
        if(pw.isValid()===false){ pw.focus(); return false; }
        if(re_pw.isValid()===false){ re_pw.focus(); return false; }

        for(var i=0; i<_store.data.length; i++){

            if(me.edit === "edit"){
                if(i !== Number(me.num)-1){
                    if(_store.data.items[i].data.id === id.getValue()){
                        prt_errMsg(get_msg('err_id_userdob'),"err_xauth");
                        id.focus();
                        return false;
                    }
                }
            }else{
                if(_store.data.items[i].data.id === id.getValue()){
                    prt_errMsg(get_msg('err_id_userdob'),"err_xauth");
                    id.focus();
                    return false;
                }
            }
        }

        _store.sorters.clear();

        var obj = {
            'num': (me.edit==="edit")?me.record.num:_store.data.length+1,
            'id': id.getValue(),
            'pw': pw.getValue()
        };

        if(me.edit === "edit"){

            var n = Number(me.num)-1;
            _store.removeAt(n);
            _store.insert(n,obj);
        }else{

            _store.add(obj);
        }

        this.close();
    },

    onButtonClick2: function(button, e, eOpts) {
        this.close();
    }

});