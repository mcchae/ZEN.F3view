
Ext.define('NFW2.view.win_ipSpoofing', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ipspoofing',

    requires: [
        'NFW2.view.win_ipSpoofingViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_ipspoofing'
    },
    cls: 'zen_win',
    id: 'win_ipSpoofing',
    scrollable: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            flex: 1,
            id: 'win_form',
            scrollable: true,
            layout: 'auto',
            bodyPadding: 10,
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'container',
                    id: 'win_data_con',
                    width: 470,
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'win_interface_add',
                            margin: '8 0 8 10',
                            labelSeparator: ' ',
                            labelWidth: 142,
                            msgTarget: 'none',
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: 'store_interface',
                            valueField: 'name',
                            bind: {
                                fieldLabel: '{inter}'
                            },
                            listeners: {
                                afterrender: 'afterrender'
                            }
                        },
                        {
                            xtype: 'container',
                            id: 'win_interface_edit_con',
                            margin: '8 0 8 10',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    margin: '0 0 0 10',
                                    width: 145,
                                    bind: {
                                        text: '{inter}'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    getText: function() {
                                        return this.text || Ext.util.Format.htmlDecode(this.html);
                                    },
                                    id: 'win_interface_edit',
                                    margin: '5 0 0 5'
                                }
                            ]
                        },
                        {
                            xtype: 'combobox',
                            validator: function(value) {
                                var ipv4 = Ext.getCmp('win_ipv4');
                                var ipv6 = Ext.getCmp('win_ipv6');

                                if(value === true){ return true; }
                                if(ipv4.getValue() === 'null' && ipv6.getValue() === 'null'){
                                    return ValidSelect(ipv4.fieldLabel + ", " + ipv6.fieldLabel, 2);
                                }
                                else if(ipv4.getValue() === 'menu'){
                                    return get_msg('err_form');
                                }

                                return true;
                            },
                            id: 'win_ipv4',
                            maxWidth: 400,
                            minWidth: 400,
                            labelCls: 'lb_req',
                            labelSeparator: ' ',
                            msgTarget: 'none',
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: 'store_ipv4_object_list',
                            valueField: '@cid',
                            bind: {
                                fieldLabel: '{ipv4_local}'
                            },
                            listeners: {
                                errorchange: 'onWin_ipv4ErrorChange',
                                afterrender: 'onWin_ipv4AfterRender'
                            }
                        },
                        {
                            xtype: 'combobox',
                            validator: function(value) {
                                var ipv4 = Ext.getCmp('win_ipv4');
                                var ipv6 = Ext.getCmp('win_ipv6');

                                if(ipv6.getValue() === 'menu'){
                                    return get_msg('err_form');
                                }

                                return true;
                            },
                            id: 'win_ipv6',
                            margin: '0 0 10 0',
                            maxWidth: 400,
                            minWidth: 400,
                            labelCls: 'lb_req',
                            labelSeparator: ' ',
                            msgTarget: 'none',
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: 'store_ipv6_object_list',
                            valueField: '@cid',
                            bind: {
                                fieldLabel: '{ipv6_local}'
                            },
                            listeners: {
                                errorchange: 'onWin_ipv6ErrorChange',
                                afterrender: 'onWin_ipv6AfterRender',
                                change: 'onWin_ipv6Change'
                            }
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: 'onWin_IPspoofingAfterRender'
            }
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'bottom',
            ui: 'footer',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'fld_msg',
                    id: 'win_errorbox_con',
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
                        click: 'onBtn_win_ok'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onBtn_win_cancel'
                    }
                }
            ]
        }
    ],

    afterrender: function(component, eOpts) {
        var inter = Ext.getCmp('win_interface_add').getStore().data;

        if(inter.length > 0){
            Ext.getCmp("win_interface_add").setValue(inter.items[inter.length-1].data['name']);
        }
    },

    onWin_ipv4ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_ipv4AfterRender: function(component, eOpts) {
        var inter = Ext.getCmp('win_ipv4').getStore().data;

        if(inter.length > 0){
            Ext.getCmp("win_ipv4").setValue(inter.items[0].data['@cid']);
        }
    },

    onWin_ipv6ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_ipv6AfterRender: function(component, eOpts) {
        var inter = Ext.getCmp('win_ipv6').getStore().data;

        if(inter.length > 0){
            Ext.getCmp("win_ipv6").setValue(inter.items[0].data['@cid']);
        }
    },

    onWin_ipv6Change: function(field, newValue, oldValue, eOpts) {
        var ipv4 = Ext.getCmp('win_ipv4');
        var ipv6 = Ext.getCmp('win_ipv6');

        if(Ext.getCmp('win_ipv6').changed){
            if(ipv4.getValue() === 'null' && ipv6.getValue() === 'null'){
                Ext.getCmp('win_ipv6').isValid(false);
            }
            Ext.getCmp('win_ipv4').isValid(true);
        }
    },

    onWin_IPspoofingAfterRender: function(component, eOpts) {
        var spoofing = Ext.getCmp("NFW2_ips_ipSpoofing");
        var d_ip = spoofing.d_ip;
        var d_ipv6 = spoofing.d_ipv6;
        var me = this;
        chk_zenauth(null);
        Ext.getCmp('win_ipv6').changed = "change";

        if(this.edit === "edit"){
            me.setTitle(__zen('edit_ipspoofing'));

            Ext.getCmp('win_interface_add').hide();
            Ext.getCmp('win_interface_edit_con').show();

            showLoadMask();

            var _params = {
                basename : Ext.encode("network_spoofing"),
                key : Ext.encode({'_num' : me.num})
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getObject',
                _params,

                function(data){
                    hideLoadMask();
                    Ext.getCmp('win_interface_edit').setText(data.interface);
                    if(data.net[0]['@cid'] !== ""){ Ext.getCmp('win_ipv4').setValue(data.net[0]['@cid']); }
                    if(data.net[1]['@cid'] !== ""){ Ext.getCmp('win_ipv6').setValue(data.net[1]['@cid']); }
                    me.cid = data._id;
                }
            );

        }
        else{
            me.setTitle(__zen('add_ipspoofing'));
            Ext.getCmp('win_interface_add').show();
            Ext.getCmp('win_interface_edit_con').hide();
        }
    },

    onBtn_win_ok: function(button, e, eOpts) {
        var spoofing = Ext.getCmp("NFW2_ips_ipSpoofing");
        var d_ip = spoofing.d_ip;
        var d_ipv6 = spoofing.d_ipv6;

        var me = this;

        var ipv4 = Ext.getCmp("win_ipv4");
        var ipv6 = Ext.getCmp("win_ipv6");
        var ipv4_cid;
        var ipv6_cid;
        var ipv4_otype;
        var ipv6_otype;

        if(ipv4.isValid() === false){ ipv4.focus(); return false; }
        if(ipv6.isValid() === false){ ipv6.focus(); return false; }
        if(ipv4.getValue() === "menu"){ ipv4.focus(); return false; }
        if(ipv6.getValue() === "menu"){ ipv6.focus(); return false; }

        if(ipv4.getValue() === 'null'){ ipv4_cid = ""; }
        else{ ipv4_cid = ipv4.getValue(); }

        if(ipv6.getValue() === 'null'){ ipv6_cid = ""; }
        else{ ipv6_cid = ipv6.getValue(); }

        if(ipv4_cid !== ""){
            if(d_ip[ipv4_cid].kind === "ip_object"){ ipv4_otype = "ip"; }
            else if(d_ip[ipv4_cid].kind === "ip_group"){ ipv4_otype = "group"; }
            else{ ipv4_otype = ""; }
        }
        else{ ipv4_otype = ""; }

        if(ipv6_cid !== ""){
            if(d_ipv6[ipv6_cid].kind === "ip_object"){ ipv6_otype = "ip"; }
            else if(d_ipv6[ipv6_cid].kind === "ip_group"){ ipv6_otype = "group"; }
            else{ ipv6_otype = ""; }
        }
        else{ ipv6_otype = ""; }

        var inter;

        if(me.edit !== "edit"){
            inter = Ext.getCmp('win_interface_add').getValue();
        }
        else{
            inter = Ext.getCmp('win_interface_edit').getText();
        }

        var obj = {};

        obj = {
            'interface' : inter,
            'net' : [{'@version' : "v4",'@cid' : ipv4_cid, '@otype' : ipv4_otype }, {'@version' : "v6",'@cid' : ipv6_cid, '@otype' : ipv6_otype }],
            'chk_use' : "on"
        };

        if(me.edit === "edit"){
            obj['_id'] = me.cid;
        }

        var update = (me.edit==="edit")?true:false;

        var _params = {
            basename : Ext.encode('network_spoofing'),
            obj : Ext.encode(obj),
            update : Ext.encode(update)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setListTypeObj',
            _params,
            function(response){
                var _store = Ext.data.StoreManager.lookup('store_network_ipspoofing_list');
                _store.load();
                spoofing.chk_interface();

                if(me.edit !== "edit"){
                    //                 me.close();
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
                else{
                    Ext.Msg.show({
                        title: __weguardia,
                        width: 300,
                        msg: get_msg('msg_ok_edit'),
                        buttons: Ext.Msg.OK,
                        fn:setWinClose,
                        icon: Ext.window.MessageBox.INFO
                    });
                }
            }
        );
    },

    onBtn_win_cancel: function(button, e, eOpts) {
        this.close();
    },

    set_win: function(btn) {
        if(btn === "yes"){
            var win = Ext.create('NFW2.view.win_ipSpoofing',{
                modal : true
            });

            win.show();
        }
        else{
            Ext.getCmp('win_ipSpoofing').close();
        }
    }

});