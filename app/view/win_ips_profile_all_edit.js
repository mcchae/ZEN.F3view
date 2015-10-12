
Ext.define('NFW2.view.win_ips_profile_all_edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ips_profile_all_edit',

    requires: [
        'NFW2.view.win_ips_profile_all_editViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_ips_profile_all_edit'
    },
    cls: 'zen_win',
    resizable: false,
    width: 400,
    defaultListenerScope: true,

    bind: {
        title: '{edit2}'
    },
    items: [
        {
            xtype: 'form',
            id: 'fm_all',
            bodyPadding: 10,
            titleCollapse: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            listeners: {
                afterrender: {
                    fn: 'onFm_allAfterRender',
                    single: false
                }
            },
            items: [
                {
                    xtype: 'checkboxfield',
                    id: 'all_select',
                    margin: '8 0 8 0',
                    labelSeparator: ' ',
                    labelWidth: 125,
                    uncheckedValue: 'off',
                    bind: {
                        fieldLabel: '{all}'
                    }
                },
                {
                    xtype: 'combobox',
                    id: 'action',
                    maxWidth: 300,
                    labelSeparator: ' ',
                    labelWidth: 120,
                    editable: false,
                    store: 'store_action',
                    valueField: 'value',
                    bind: {
                        fieldLabel: '{action}'
                    }
                },
                {
                    xtype: 'combobox',
                    hidden: true,
                    id: 'audit',
                    maxWidth: 300,
                    labelSeparator: ' ',
                    labelWidth: 120,
                    editable: false,
                    store: 'store_use',
                    valueField: 'value',
                    bind: {
                        fieldLabel: '{audit}'
                    },
                    listeners: {
                        afterrender: 'onAuditAfterRender'
                    }
                },
                {
                    xtype: 'combobox',
                    id: 'use',
                    margin: '0 0 10 0',
                    maxWidth: 300,
                    labelSeparator: ' ',
                    labelWidth: 120,
                    editable: false,
                    store: 'store_use',
                    valueField: 'value',
                    bind: {
                        fieldLabel: '{use_unuse}'
                    }
                }
            ]
        }
    ],
    listeners: {
        close: 'onFm_allClose'
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
                    id: 'btn_group2',
                    itemId: 'fld_msg2'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    id: 'btn_submit1',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: {
                            fn: 'onBtn_submit1Click',
                            single: false
                        },
                        blur: 'onBtn_submit1Blur'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    id: 'btn_reset1',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: {
                            fn: 'onBtn_reset1Click',
                            single: false
                        }
                    }
                }
            ]
        }
    ],

    onFm_allAfterRender: function(component, eOpts) {
        var me = this;
        chk_zenauth(null);
        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'isCC',
            {},
            function(response){
                if(response === true){
                    me.isCC = true;
                }
                else{
                    me.isCC = false;
                }
            }
        );

        Ext.getCmp('action').setValue('alert');
        if(me.isCC){
            Ext.getCmp('audit').hide();
        }
        else{
            Ext.getCmp('audit').show();
        }

        Ext.getCmp('use').setValue('on');
    },

    onAuditAfterRender: function(component, eOpts) {
        var combo = Ext.getCmp('audit').getStore().data;

        if(combo.length > 0){
            Ext.getCmp('audit').setValue(combo.items[1].data['value']);
        }
    },

    onFm_allClose: function(panel, eOpts) {
        Ext.getCmp('ips_signature_list').getView().refresh();
    },

    onBtn_submit1Click: function(button, e, eOpts) {
        var me = this;
        var store;
        var use_signatures = [];

        if(me.edit === "edit"){
            store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');

            var tbl = Ext.getCmp("ips_signature_list");
            var tbl_sel = tbl.getSelectionModel().getSelection();

            if(tbl_sel.length === 0 && Ext.getCmp("all_select").checked === false){

                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg2"]')[0];

                err_fl.addCls('ic_msg_err');
                err_fl.update(get_msg("sel_ips"));

                return false;

            }else{

                var records = [];
                var records_in = [];
                records = store.data.items;

                for(var i in records){
                    records_in.push(records[i].data);
                }

                if(Ext.getCmp("all_select").checked === true){
                    showLoadMask();
                    var _params = {
                        basename : Ext.encode('ips_profile'),
                        cond : Ext.encode({'profile_id':me.p_id})
                    };

                    request_helper.xmlrpc_call_Ajax_Post(

                        'ftuctrl',
                        'getObjects',
                        _params,

                        function(response){

                            for(var i in response.list[0].use_signatures){
                                if(me.isCC){
                                    use_signatures.push({
                                        "@fsid" : response.list[0].use_signatures[i]['@fsid'],
                                        "action" : Ext.getCmp('action').getValue(),
                                        //                             "audit" : Ext.getCmp('audit').getValue(),
                                        "use" : Ext.getCmp('use').getValue()
                                    });
                                }
                                else{
                                    use_signatures.push({
                                        "@fsid" : response.list[0].use_signatures[i]['@fsid'],
                                        "action" : Ext.getCmp('action').getValue(),
                                        "audit" : Ext.getCmp('audit').getValue(),
                                        "use" : Ext.getCmp('use').getValue()
                                    });
                                }
                            }

                            obj = {
                                '@cid' : me.cid,
                                'name' : me.p_name,
                                'profile_disc' : me.p_disc,
                                'profile_id' : me.p_id,
                                'use_signatures' : use_signatures
                            };

                            Ext.getCmp('win_add_ips_profile').edit_fsid = use_signatures;

                            var _params = {

                                basename : Ext.encode('ips_profile'),
                                obj : Ext.encode(obj),
                                update : Ext.encode(true)
                            };

                            request_helper.xmlrpc_call_Ajax_Post(

                                'ftuctrl',
                                'setListTypeObj',
                                _params,

                                function(response){
                                    hideLoadMask();
                                    Ext.Msg.show({
                                        title: __weguardia,
                                        msg: get_msg("msg_ok_edit"),
                                        width: 300,
                                        buttons: Ext.Msg.OK,
                                        fn: setWinClose,
                                        icon: Ext.window.MessageBox.INFO
                                    });

                                }
                            );
                        }
                    );

                    /*for(var i in records){
                        records_in[i].ips_profile.action = Ext.getCmp('action').getValue();
                        records_in[i].ips_profile.audit = Ext.getCmp('audit').getValue();
                        records_in[i].ips_profile.use = Ext.getCmp('use').getValue();
                    }
                    console.log(records_in);*/
                }
                else{
                    for(var i in records){
                        for(var j in tbl_sel){
                            if(records[i].data['@fsid'] === tbl_sel[j].data['@fsid']){
                                if(me.isCC){
                                    records[i].data.ips_profile.action = Ext.getCmp('action').getValue();
                                    //                         records[i].data.ips_profile.audit = Ext.getCmp('audit').getValue();
                                    records[i].data.ips_profile.use = Ext.getCmp('use').getValue();
                                }
                                else{
                                    records[i].data.ips_profile.action = Ext.getCmp('action').getValue();
                                    records[i].data.ips_profile.audit = Ext.getCmp('audit').getValue();
                                    records[i].data.ips_profile.use = Ext.getCmp('use').getValue();
                                }
                            }
                        }
                    }



                    for(var i in records){
                        if(me.isCC){
                            use_signatures.push({
                                "@fsid" : records[i].data['@fsid'],
                                "action" : records[i].data.ips_profile.action,
                                //                     "audit" : records[i].data.ips_profile.audit,
                                "use" : records[i].data.ips_profile.use
                            });
                        }
                        else{
                            use_signatures.push({
                                "@fsid" : records[i].data['@fsid'],
                                "action" : records[i].data.ips_profile.action,
                                "audit" : records[i].data.ips_profile.audit,
                                "use" : records[i].data.ips_profile.use
                            });
                        }
                    }

                    obj = {
                        '@cid' : me.cid,
                        'name' : me.p_name,
                        'profile_disc' : me.p_disc,
                        'profile_id' : me.p_id,
                        'use_signatures' : use_signatures
                    };
                    showLoadMask();
                    var _params = {

                        basename : Ext.encode('ips_profile'),
                        obj : Ext.encode(obj),
                        update : Ext.encode(true)
                    };

                    request_helper.xmlrpc_call_Ajax_Post(

                        'ftuctrl',
                        'setListTypeObj',
                        _params,

                        function(response){
                            Ext.getCmp('win_add_ips_profile').edit_fsid = use_signatures;
                            hideLoadMask();
                            Ext.getCmp('ips_signature_list').getView().refresh();
                            Ext.Msg.show({
                                title: __weguardia,
                                msg: get_msg("msg_ok_edit"),
                                width: 300,
                                buttons: Ext.Msg.OK,
                                fn: setWinClose,
                                icon: Ext.window.MessageBox.INFO
                            });

                        }
                    );
                }
            }
        }
        else{
            store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');

            var tbl = Ext.getCmp("ips_signature_list");
            var tbl_sel = tbl.getSelectionModel().getSelection();

            if(tbl_sel.length === 0 && Ext.getCmp("all_select").checked === false && me.tbl_fsid.length === 0){
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg2"]')[0];

                err_fl.addCls('ic_msg_err');
                err_fl.update(get_msg("sel_ips"));

                return false;

            }else{
                if(Ext.getCmp("all_select").checked === true){
                    Ext.getCmp('win_add_ips_profile').all_chk = [];
                    if(me.isCC){
                        Ext.getCmp('win_add_ips_profile').all_chk.push({
                            "chk" : true,
                            "action" : Ext.getCmp('action').getValue(),
                            //                 "audit" : Ext.getCmp('audit').getValue(),
                            "use" : Ext.getCmp('use').getValue()
                        });
                    }
                    else{
                        Ext.getCmp('win_add_ips_profile').all_chk.push({
                            "chk" : true,
                            "action" : Ext.getCmp('action').getValue(),
                            "audit" : Ext.getCmp('audit').getValue(),
                            "use" : Ext.getCmp('use').getValue()
                        });
                    }

                    for(var i in store.data.items){
                        if(me.isCC){
                            use_signatures.push({
                                "@fsid" : store.data.items[i].data['@fsid'],
                                "action" : Ext.getCmp('action').getValue(),
                                //                     "audit" : Ext.getCmp('audit').getValue(),
                                "use" : Ext.getCmp('use').getValue()
                            });
                        }
                        else{
                            use_signatures.push({
                                "@fsid" : store.data.items[i].data['@fsid'],
                                "action" : Ext.getCmp('action').getValue(),
                                "audit" : Ext.getCmp('audit').getValue(),
                                "use" : Ext.getCmp('use').getValue()
                            });
                        }
                    }
                }
                else{
                    for(var i in me.tbl_fsid){
                        if(me.isCC){
                            use_signatures.push({
                                "@fsid" : me.tbl_fsid[i]['@fsid'],
                                "action" : Ext.getCmp('action').getValue(),
                                //                     "audit" : Ext.getCmp('audit').getValue(),
                                "use" : Ext.getCmp('use').getValue()
                            });
                        }
                        else{
                            use_signatures.push({
                                "@fsid" : me.tbl_fsid[i]['@fsid'],
                                "action" : Ext.getCmp('action').getValue(),
                                "audit" : Ext.getCmp('audit').getValue(),
                                "use" : Ext.getCmp('use').getValue()
                            });
                        }
                    }
                }

                if(Ext.getCmp('win_add_ips_profile').edit_fsid.length > 0){
                    if(Ext.getCmp("all_select").checked === true){
                        Ext.getCmp('win_add_ips_profile').edit_fsid = use_signatures;
                    }
                    else{
                        for(var j in Ext.getCmp('win_add_ips_profile').edit_fsid){
                            for(var k in use_signatures){
                                if(Ext.getCmp('win_add_ips_profile').edit_fsid[j]['@fsid'] === use_signatures[k]['@fsid']){
                                    if(me.isCC){
                                        Ext.getCmp('win_add_ips_profile').edit_fsid[j].action = use_signatures[k].action;
                                        //                             Ext.getCmp('win_add_ips_profile').edit_fsid[j].audit = use_signatures[k].audit;
                                        Ext.getCmp('win_add_ips_profile').edit_fsid[j].use = use_signatures[k].use;
                                    }
                                    else{
                                        Ext.getCmp('win_add_ips_profile').edit_fsid[j].action = use_signatures[k].action;
                                        Ext.getCmp('win_add_ips_profile').edit_fsid[j].audit = use_signatures[k].audit;
                                        Ext.getCmp('win_add_ips_profile').edit_fsid[j].use = use_signatures[k].use;
                                    }
                                }
                            }
                        }
                    }
                }
                else{
                    Ext.getCmp('win_add_ips_profile').edit_fsid = use_signatures;
                }

                //console.log(Ext.getCmp('win_add_ips_profile').edit_fsid);
                /*var records = [];
                var records_in = [];
                records = store.data.items;

                for(var i in records){
                    records_in.push(records[i].data);
                }

                if(Ext.getCmp("all_select").checked === true){
                    for(var i in records){
                        records_in[i].action = Ext.getCmp('action').getValue();
                        records_in[i].audit = Ext.getCmp('audit').getValue();
                        records_in[i].use = Ext.getCmp('use').getValue();
                    }
                }
                else{
                    for(var i in records){
                        for(var j in tbl_sel){
                            if(records[i].data['@fsid'] === tbl_sel[j].data['@fsid']){
                                records[i].data.action = Ext.getCmp('action').getValue();
                                records[i].data.audit = Ext.getCmp('audit').getValue();
                                records[i].data.use = Ext.getCmp('use').getValue();
                            }
                        }
                    }
                    store.loadData(records);

                }*/

                /*console.log(records);
                obj = {
                    '@cid' : me.cid,
                    'name' : me.p_name,
                    'profile_disc' : me.p_disc,
                    'profile_id' : me.p_id,
                    'use_signatures' : use_signatures
                };

                var _params = {

                    basename : Ext.encode('ips_profile'),
                    obj : Ext.encode(obj),
                    update : Ext.encode(true)
                };

                request_helper.xmlrpc_call_Ajax_Post(

                    'ftuctrl',
                    'setListTypeObj',
                    _params,

                    function(response){*/
                Ext.Msg.show({
                    title: __weguardia,
                    msg: get_msg("msg_ok_edit"),
                    width: 300,
                    buttons: Ext.Msg.OK,
                    fn: setWinClose,
                    icon: Ext.window.MessageBox.INFO
                });

                //}
                //);
            }
        }
    },

    onBtn_submit1Blur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg2"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onBtn_reset1Click: function(button, e, eOpts) {
        this.close();
    },

    set_WinState: function() {
        if(btn === "no"){

            var win = Ext.WindowManager.getActive();
            if(win){ win.close(); }

        }else{

            Ext.getCmp("fm_all").getForm().reset();

            var _store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');
            _store.load();
        }
    }

});