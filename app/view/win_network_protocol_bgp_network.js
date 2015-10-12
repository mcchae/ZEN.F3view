
Ext.define('NFW2.view.win_network_protocol_bgp_network', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_network_protocol_bgp_network',

    requires: [
        'NFW2.view.win_network_protocol_bgp_networkViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_network_protocol_bgp_network'
    },
    cls: 'zen_win',
    id: 'win_network_protocol_bgp_network',
    title: 'BGP 네트워크 추가',
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
                            id: 'bgp_network_ipv4_con',
                            margin: '8 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    width: 115,
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
                                                if(!ValidIPAddress(chk_ip[0])){ return get_msg('err_ip'); }
                                                else if(!ValidIPAddress(chk_ip[1])){ return get_msg('err_form'); }
                                            }
                                        }

                                        return true;
                                    },
                                    id: 'bgp_network_ipv4',
                                    width: 250,
                                    msgTarget: 'none',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9.\/]/,
                                    maxLength: 31,
                                    listeners: {
                                        errorchange: 'onBgp_network_ipv4ErrorChange',
                                        focus: 'onBgp_network_ipv4Focus',
                                        blur: 'onBgp_network_ipv4Blur'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'bgp_network_ipv6_con',
                            margin: '8 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    width: 115,
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
                                    id: 'bgp_network_ipv6',
                                    width: 335,
                                    msgTarget: 'none',
                                    maskRe: /[0-9a-fA-F:\/]/,
                                    listeners: {
                                        errorchange: 'onBgp_network_ipv6ErrorChange',
                                        focus: 'onBgp_network_ipv6Focus',
                                        blur: 'onBgp_network_ipv6Blur'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '8 10 0 0',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'bgp_desc',
                                    width: 450,
                                    labelSeparator: ' ',
                                    labelWidth: 110,
                                    bind: {
                                        fieldLabel: '{desc}'
                                    }
                                }
                            ]
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
        afterrender: 'onWin_network_protocol_bgp_networkAfterRender',
        close: 'onWin_network_protocol_bgp_networkClose'
    },

    onBgp_network_ipv4ErrorChange: function(labelable, error, eOpts) {
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

    onBgp_network_ipv4Focus: function(component, event, eOpts) {
        var str = disp_help_ip('4s2m');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onBgp_network_ipv4Blur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onBgp_network_ipv6ErrorChange: function(labelable, error, eOpts) {
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

    onBgp_network_ipv6Focus: function(component, event, eOpts) {
        var str = disp_help_ip('4s2p');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onBgp_network_ipv6Blur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        if(me.version === 4){
            var store = Ext.getCmp('st_nw_protocol_bgp_network_grid').getStore();
            if(Ext.getCmp('bgp_network_ipv4').isValid() === false){ Ext.getCmp('bgp_network_ipv4').focus(); return false; }
        }
        else{
            var store = Ext.getCmp('st_nw_protocol_bgp_network_grid_v6').getStore();
            if(Ext.getCmp('bgp_network_ipv6').isValid() === false){ Ext.getCmp('bgp_network_ipv6').focus(); return false; }
        }

        var record = [];

        var ipmask;
        if(me.version === 4){ ipmask = Ext.getCmp('bgp_network_ipv4').getValue().split('/'); }
        else{ ipmask = Ext.getCmp('bgp_network_ipv6').getValue().split('/'); }
        record.push({
            'net' : ipmask[0],
            'netmask' : ipmask[1],
            'desc' : Ext.getCmp('bgp_desc').getValue()
        });

        if(me.edit !== "edit"){
            store.add(record);

            this.close();
        }
        else{
            store.removeAt(me.index);
            store.insert(me.index,record);

            this.close();
        }
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    onWin_network_protocol_bgp_networkAfterRender: function(component, eOpts) {
        var me = this;
        this.fieldInfo = makeZenTip();
        chk_zenauth(null);
        if(me.version === 4){
            Ext.getCmp('bgp_network_ipv4_con').show();
            Ext.getCmp('bgp_network_ipv6_con').hide();
        }
        else{
            Ext.getCmp('bgp_network_ipv4_con').hide();
            Ext.getCmp('bgp_network_ipv6_con').show();
        }
        me.setTitle(__zen('add_bgp_network'));
        if(me.edit === "edit"){
            me.setTitle(__zen('edit_bgp_network'));

            if(me.version === 4){
                Ext.getCmp('bgp_network_ipv4').setValue(me.record.data.net+"/"+me.record.data.netmask);
            }
            else{
                Ext.getCmp('bgp_network_ipv6').setValue(me.record.data.net+"/"+me.record.data.netmask);
            }

            Ext.getCmp('bgp_desc').setValue(me.record.data.desc);
        }
    },

    onWin_network_protocol_bgp_networkClose: function(panel, eOpts) {
        this.fieldInfo.hide();
    }

});