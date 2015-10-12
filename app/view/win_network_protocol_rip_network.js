
Ext.define('NFW2.view.win_network_protocol_rip_network', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_network_protocol_rip_network',

    requires: [
        'NFW2.view.win_network_protocol_rip_networkViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_network_protocol_rip_network'
    },
    cls: 'zen_win',
    title: 'RIP 네트워크 추가',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'container',
                            id: 'rip_network_ipv4_con',
                            margin: '8 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    width: 120,
                                    bind: {
                                        text: '{ip_mask}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                            var chk_ip = value.split('/');
                                            if(!ValidIPAddress(chk_ip[0])){ return get_msg('err_ip'); }
                                            if(chk_ip[1] === undefined){ return get_msg('err_form'); }
                                            else{
                                                var chk_ip2 = chk_ip[1].split('.');
                                                if(chk_ip2[1] !== undefined){ return get_msg('err_form'); }
                                                if(!ValidIPAddress(chk_ip[0])){ return get_msg('err_ip'); }
                                                if(chk_ip[0] !== "0.0.0.0" && chk_ip[1] === 0){ return ValidLimit(1,32); }
                                                else if(chk_ip[1] < 0 || chk_ip[1] > 32){ return ValidLimit(0,32); }
                                            }
                                        }

                                        return true;
                                    },
                                    id: 'rip_ipmaskv4',
                                    width: 250,
                                    msgTarget: 'none',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9.\/]/,
                                    maxLength: 18,
                                    listeners: {
                                        errorchange: 'onRip_ipmaskv4ErrorChange',
                                        blur: 'onRip_ipmaskv4Blur',
                                        focus: 'onRip_ipmaskv4Focus'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'rip_network_ipv6_con',
                            margin: '8 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    width: 120,
                                    bind: {
                                        text: '{ip_prefix}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                            var chk_ip = value.split('/');
                                            if(!ValidIPv6(chk_ip[0])){ return get_msg('err_ip'); }
                                            if(chk_ip[1] === undefined){ return get_msg('err_form'); }
                                            else{
                                                if(!ValidIPv6(chk_ip[0])){ return get_msg('err_ip'); }
                                                else if(!validMask(value,"v6")){ return ValidLimit(0,128); }
                                            }
                                        }

                                        return true;
                                    },
                                    id: 'rip_ipmaskv6',
                                    width: 350,
                                    msgTarget: 'none',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9a-fA-F:\/]/,
                                    maxLength: 43,
                                    listeners: {
                                        errorchange: 'onRip_ipmaskv6ErrorChange',
                                        blur: 'onRip_ipmaskv6Blur',
                                        focus: 'onRip_ipmaskv6Focus'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '8 0 10 10',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 110,
                                    bind: {
                                        text: '{name}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'rip_name',
                                    width: 350,
                                    msgTarget: 'none'
                                }
                            ]
                        },
                        {
                            xtype: 'container'
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            padding: 0,
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
    listeners: {
        afterrender: 'onWindowAfterRender',
        close: 'onWindowClose'
    },

    onRip_ipmaskv4ErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update("");
        }
    },

    onRip_ipmaskv4Blur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onRip_ipmaskv4Focus: function(component, event, eOpts) {
        var str = disp_help_ip('4s2m');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onRip_ipmaskv6ErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update("");
        }
    },

    onRip_ipmaskv6Blur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onRip_ipmaskv6Focus: function(component, event, eOpts) {
        var str = disp_help_ip('4s2p');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        if(me.version === 4){
            var store = Ext.getCmp('st_nw_protocol_rip_network_grid').getStore();
            if(Ext.getCmp('rip_ipmaskv4').isValid() === false){ Ext.getCmp('rip_ipmaskv4').focus(); return false; }
        }
        else{
            var store = Ext.getCmp('st_nw_protocol_rip_network_grid_v6').getStore();
            if(Ext.getCmp('rip_ipmaskv6').isValid() === false){ Ext.getCmp('rip_ipmaskv6').focus(); return false; }
        }

        var record = [];

        var ipmask;
        if(me.version === 4){ ipmask = Ext.getCmp('rip_ipmaskv4').getValue().split('/'); }
        else{ ipmask = Ext.getCmp('rip_ipmaskv6').getValue().split('/'); }
        record.push({
            'net' : ipmask[0],
            'netmask' : ipmask[1],
            'desc' : Ext.getCmp('rip_name').getValue()
        });

        if(me.edit !== "edit"){
            store.add(record);

            this.close();
        }
        else{
            store.removeAt(me.index);
            store.insert(me.index, record);

            this.close();
        }
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        this.fieldInfo = makeZenTip();
        chk_zenauth(null);
        me.setTitle(__zen('add_rip_network'));
        if(me.version === 4){
            Ext.getCmp('rip_network_ipv4_con').show();
            Ext.getCmp('rip_network_ipv6_con').hide();
        }
        else{
            Ext.getCmp('rip_network_ipv4_con').hide();
            Ext.getCmp('rip_network_ipv6_con').show();
        }

        if(me.edit === "edit"){
            me.setTitle(__zen('edit_rip_network'));

            if(me.version === 4){
                Ext.getCmp('rip_ipmaskv4').setValue(me.record.data.net+"/"+me.record.data.netmask);
            }
            else{
                Ext.getCmp('rip_ipmaskv6').setValue(me.record.data.net+"/"+me.record.data.netmask);
            }

            Ext.getCmp('rip_name').setValue(me.record.data.desc);
        }
    },

    onWindowClose: function(panel, eOpts) {
        this.fieldInfo.hide();
    }

});