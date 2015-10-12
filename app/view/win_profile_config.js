
Ext.define('NFW2.view.win_profile_config', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_profile_config',

    requires: [
        'NFW2.view.win_profile_configViewModel',
        'Ext.form.field.Text',
        'Ext.form.Label',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_profile_config'
    },
    cls: 'zen_win',
    width: 400,
    bodyPadding: 20,
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onWindowAfterRender'
    },
    items: [
        {
            xtype: 'container',
            flex: 1,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'textfield',
                    validator: function(value) {
                        if(value === true){ return true; }
                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                        if(byteCheck(value) > 64){ return ValidByte(64); }

                        return true;
                    },
                    flex: 1,
                    cls: 'lb_req',
                    id: 'h_url',
                    labelSeparator: ' ',
                    bind: {
                        fieldLabel: '{url}'
                    },
                    listeners: {
                        errorchange: 'onTextfieldErrorChange',
                        blur: 'onTextfieldBlur'
                    }
                },
                {
                    xtype: 'textfield',
                    flex: 1,
                    id: 'h_desc',
                    labelSeparator: ' ',
                    bind: {
                        fieldLabel: '{desc}'
                    }
                },
                {
                    xtype: 'label',
                    flex: 1,
                    cls: 'mt_info',
                    bind: {
                        text: '{web_filter_info1}'
                    }
                }
            ]
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
                    itemId: 'fld_msg_pop'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onB_addClick1'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick3'
                    }
                }
            ]
        }
    ],

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        var _record = me._record;

        if(me.mode === 1){
            if(me.edit==="edit"){
                me.setTitle(__zen('deny_exp_edit'));
            }else{
                me.setTitle(__zen('deny_exp_add'));
            }
        }else{
            if(me.edit==="edit"){
                me.setTitle(__zen('deny_url_edit'));
            }else{
                me.setTitle(__zen('deny_url_add'));
            }
        }

        if(me.edit==="edit"){
            Ext.getCmp("h_url").setValue(_record.data.url);
            Ext.getCmp("h_desc").setValue(_record.data.desc);
        }
    },

    onTextfieldErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, 'fld_msg_pop');
    },

    onTextfieldBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onB_addClick1: function(button, e, eOpts) {
        var me = this;
        var _me = Ext.getCmp("win_profile_http");

        var url = Ext.getCmp("h_url");
        var desc = Ext.getCmp("h_desc");

        var _tab = (me.mode === 1)?Ext.getCmp("tab_0"):Ext.getCmp("tab_1");

        if(url.isValid()===false){ _tab.show(); url.focus(); return false; }

        prt_errMsg(null,'fld_msg_pop');

        var _grid = (me.mode === 1)?Ext.getCmp("grid_acc"):Ext.getCmp("grid_deny");
        var _store = _grid.getStore();
        var _record = (me.mode === 1)?_me.a_record:_me.d_record;
        var _obj = (me.mode === 1)?_me.a_obj:_me.d_obj;

        if(me.edit === "edit"){
            if(me._record.data.url !== url.getValue()){
                if(_obj[url.getValue()]){ Ext.Msg.alert(__weguardia,err_dup('URL',1)); return false; }
                delete _obj[url.getValue()];
            }
            _record[me._index] = {'url':url.getValue(),'desc':desc.getValue()};
            _obj[url.getValue()] = {'url':url.getValue(),'desc':desc.getValue()};
        }else{

            if(_obj[url.getValue()]){ Ext.Msg.alert(__weguardia,err_dup('URL',1)); return false; }
            _record.unshift({'url':url.getValue(),'desc':desc.getValue()});
            _obj[url.getValue()] = {'url':url.getValue(),'desc':desc.getValue()};
        }

        _store.loadData(_record);

        if(me.mode === 1){
            _me.a_record = _record;
            _me.a_obj = _obj;
        }else{
            _me.d_record = _record;
            _me.d_obj = _obj;
        }

        var _label = (me.mode === 1)?Ext.getCmp("acc_total"):Ext.getCmp("deny_total");

        _label.update(__zen('total')+' : '+_store.data.items.length);


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
                fn: _setWinState,
                icon: Ext.window.MessageBox.INFO
            });
        }

        function _setWinState(btn){
            if(btn === "yes"){
                url.reset();
                desc.reset();
            }else{
                me.close();
            }
        }
    },

    onButtonClick3: function(button, e, eOpts) {
        this.close();
    }

});