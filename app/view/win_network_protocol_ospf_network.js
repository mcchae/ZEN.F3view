
Ext.define('NFW2.view.win_network_protocol_ospf_network', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_network_protocol_ospf_network',

    requires: [
        'NFW2.view.win_network_protocol_ospf_networkViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_network_protocol_ospf_network'
    },
    cls: 'zen_win',
    id: 'win_network_protocol_ospf_network',
    title: 'OSPF 네트워크 추가',
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
                            id: 'ospf_network_ipv4_con',
                            margin: '8 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    width: 125,
                                    bind: {
                                        text: '{network}'
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
                                                else if(chk_ip[1] === ""){ return get_msg('err_form'); }
                                                else if(chk_ip[1] < 0 || chk_ip[1] > 32){ return ValidLimit(0,32); }
                                            }
                                        }

                                        return true;
                                    },
                                    id: 'ospf_network_ipv4',
                                    width: 325,
                                    msgTarget: 'none',
                                    maskRe: /[0-9.\/]/,
                                    listeners: {
                                        errorchange: 'onOspf_networkErrorChange',
                                        focus: 'onOspf_networkFocus',
                                        blur: 'onOspf_networkBlur'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            hidden: true,
                            id: 'ospf_network_ipv6_con',
                            margin: '8 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    width: 125,
                                    bind: {
                                        text: '{network}'
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
                                                else if(chk_ip[1] === ""){ return get_msg('err_form'); }
                                                else if(!validMask(value,"v6")){ return ValidLimit(0,128); }
                                            }
                                        }

                                        return true;
                                    },
                                    id: 'ospf_network_ipv6',
                                    width: 325,
                                    msgTarget: 'none',
                                    maskRe: /[0-9:\/]/,
                                    listeners: {
                                        errorchange: 'onOspf_networkErrorChange1',
                                        focus: 'onOspf_networkFocus1',
                                        blur: 'onOspf_networkBlur1'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '8 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    width: 125,
                                    bind: {
                                        text: '{area}'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    validator: function(value) {
                                        if(Ext.getCmp('ospf_area_type').getStore().getCount() === 0){
                                            return get_msg('err_ospf_area');
                                        }
                                        else{
                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        }

                                        return true;
                                    },
                                    id: 'ospf_area_type',
                                    msgTarget: 'none',
                                    editable: false,
                                    emptyText: 'Select',
                                    displayField: 'value',
                                    queryMode: 'local',
                                    store: {
                                        fields: [
                                            {
                                                name: 'value'
                                            }
                                        ]
                                    },
                                    valueField: 'value',
                                    listeners: {
                                        blur: 'onOspf_area_typeBlur',
                                        errorchange: 'onOspf_area_typeErrorChange'
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
                                    id: 'ospf_network_desc',
                                    width: 450,
                                    labelSeparator: ' ',
                                    labelWidth: 120,
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
        afterrender: 'onWin_network_protocol_ospf_networkAfterRender',
        close: 'onWin_network_protocol_ospf_networkClose'
    },

    onOspf_networkErrorChange: function(labelable, error, eOpts) {
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

    onOspf_networkFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s2m');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onOspf_networkBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onOspf_networkErrorChange1: function(labelable, error, eOpts) {
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

    onOspf_networkFocus1: function(component, event, eOpts) {
        var str = disp_help_ip('4s2p');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onOspf_networkBlur1: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onOspf_area_typeBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onOspf_area_typeErrorChange: function(labelable, error, eOpts) {
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

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        if(me.version === 4){
            var store = Ext.getCmp('st_nw_protocol_ospf_network_grid').getStore();
            if(Ext.getCmp('ospf_network_ipv4').isValid() === false){ Ext.getCmp('ospf_network_ipv4').focus(); return false; }
        }
        else{
            var store = Ext.getCmp('st_nw_protocol_ospf_network_grid_v6').getStore();
            if(Ext.getCmp('ospf_network_ipv6').isValid() === false){ Ext.getCmp('ospf_network_ipv6').focus(); return false; }
        }

        if(Ext.getCmp('ospf_area_type').isValid() === false){ Ext.getCmp('ospf_area_type').focus(); return false; }

        var record = [];

        var ipmask = "";
        if(me.version === 4){ ipmask = Ext.getCmp('ospf_network_ipv4').getValue(); }
        else{ ipmask = Ext.getCmp('ospf_network_ipv6').getValue(); }
        record.push({
            'net' : ipmask,
            'area_id' : Ext.getCmp('ospf_area_type').getValue(),
            'desc' : Ext.getCmp('ospf_network_desc').getValue()
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

    onWin_network_protocol_ospf_networkAfterRender: function(component, eOpts) {
        var me = this;

        this.fieldInfo = makeZenTip();
        chk_zenauth(null);
        me.setTitle(__zen('add_ospf_network'));
        if(me.version === 4){
            Ext.getCmp('ospf_network_ipv4_con').show();
            Ext.getCmp('ospf_network_ipv6_con').hide();
        }
        else{
            Ext.getCmp('ospf_network_ipv4_con').hide();
            Ext.getCmp('ospf_network_ipv6_con').show();
        }


        var store = Ext.getCmp('st_nw_protocol_ospf_area_grid').getStore();

        var record = [];
        for(var i in store.data.items){
            record.push({
                'value' : store.data.items[i].data.area_id
            });
        }

        Ext.getCmp('ospf_area_type').getStore().loadData(record);

        if(me.edit === "edit"){
            me.setTitle(__zen('edit_ospf_network'));

            if(me.version === 4){
                Ext.getCmp('ospf_network_ipv4').setValue(me.record.data.net);
            }
            else{
                Ext.getCmp('ospf_network_ipv6').setValue(me.record.data.net);
            }

            Ext.getCmp('ospf_area_type').setValue(me.record.data.area_id);
            Ext.getCmp('ospf_network_desc').setValue(me.record.data.desc);
        }
        else{

        }
    },

    onWin_network_protocol_ospf_networkClose: function(panel, eOpts) {
        this.fieldInfo.hide();
    }

});