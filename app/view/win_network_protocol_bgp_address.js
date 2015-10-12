
Ext.define('NFW2.view.win_network_protocol_bgp_address', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_network_protocol_bgp_address',

    requires: [
        'NFW2.view.win_network_protocol_bgp_addressViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_network_protocol_bgp_address'
    },
    cls: 'zen_win',
    id: 'win_network_protocol_bgp_address',
    title: 'BGP 주소 추가',
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
                            margin: '8 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    width: 160,
                                    bind: {
                                        text: '{neighbor_ip}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                            if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
                                        }

                                        return true;
                                    },
                                    id: 'bgp_address',
                                    width: 300,
                                    msgTarget: 'none',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9.]/,
                                    maxLength: 15,
                                    listeners: {
                                        errorchange: 'onBgp_addressErrorChange',
                                        focus: 'onBgp_addressFocus',
                                        blur: 'onBgp_addressBlur'
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
                                    width: 160,
                                    bind: {
                                        text: '{as_remote}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            var value = removeComma(value);

                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                            if(!ValidNum(value)){ return get_msg('err_form'); }
                                            if(!LengthCheck(value,1,4294967295)){ return ValidLimit(1,4294967295); }
                                        }

                                        return true;
                                    },
                                    fieldInfo: {
                                        txt: msg_tip_length(1,
                                        4294967295,
                                        null)
                                    },
                                    id: 'bgp_as',
                                    msgTarget: 'none',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 13,
                                    listeners: {
                                        errorchange: 'onBgp_asErrorChange',
                                        change: 'onBgp_asChange',
                                        blur: 'onBgp_asBlur',
                                        focus: 'onBgp_asFocus'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '8 0 0 0',
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            if(!LengthCheck(value,1,65535)){ return ValidLimit(1,65535); }
                                        }

                                        return true;
                                    },
                                    fieldInfo: {
                                        txt: msg_tip_length_port(0,
                                        65535,
                                        null)
                                    },
                                    id: 'bgp_port',
                                    labelSeparator: ' ',
                                    labelWidth: 155,
                                    msgTarget: 'none',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 5,
                                    bind: {
                                        fieldLabel: '{port}'
                                    },
                                    listeners: {
                                        errorchange: 'onBgp_portErrorChange',
                                        focus: 'onBgp_portFocus',
                                        blur: 'onBgp_portBlur'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '0 0 0 10',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 160,
                                    bind: {
                                        text: '{default_originate}'
                                    }
                                },
                                {
                                    xtype: 'toggleslide',
                                    state: false,
                                    resizeHandle: false,
                                    id: 'bgp_originate',
                                    listeners: {
                                        beforerender: 'onBgp_originateBeforeRender'
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
        afterrender: 'onWin_network_protocol_bgp_addressAfterRender',
        close: 'onWin_network_protocol_bgp_addressClose'
    },

    onBgp_addressErrorChange: function(labelable, error, eOpts) {
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

    onBgp_addressFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onBgp_addressBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onBgp_asErrorChange: function(labelable, error, eOpts) {
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

    onBgp_asChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onBgp_asBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onBgp_asFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onBgp_portErrorChange: function(labelable, error, eOpts) {
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

    onBgp_portFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onBgp_portBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onBgp_originateBeforeRender: function(component, eOpts) {
        component.onText = __zen('use');
        component.offText = __zen('unused');
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;
        var store = Ext.getCmp('bgp_address_grid').getStore();

        if(Ext.getCmp('bgp_address').isValid() === false){ Ext.getCmp('bgp_address').focus(); return false; }
        if(Ext.getCmp('bgp_as').isValid() === false){ Ext.getCmp('bgp_as').focus(); return false; }
        if(Ext.getCmp('bgp_port').isValid() === false){ Ext.getCmp('bgp_port').focus(); return false; }

        var state = "";

        if(Ext.getCmp('bgp_originate').state){ state = "yes"; }
        else{ state = "no"; }

        var record = [];

        record.push({
            'neighbor_ip' : Ext.getCmp('bgp_address').getValue(),
            'remote_as' : removeComma(Ext.getCmp('bgp_as').getValue()),
            'port' : removeComma(Ext.getCmp('bgp_port').getValue()),
            'default_originate' : state
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

    onWin_network_protocol_bgp_addressAfterRender: function(component, eOpts) {
        var me = this;
        this.fieldInfo = makeZenTip();
        chk_zenauth(null);
        me.setTitle(__zen('add_bgp_ip'));
        if(me.edit === "edit"){
            me.setTitle(__zen('edit_bgp_ip'));

            Ext.getCmp('bgp_address').setValue(me.record.data.neighbor_ip);
            Ext.getCmp('bgp_as').setValue(me.record.data.remote_as);
            Ext.getCmp('bgp_port').setValue(me.record.data.port);

            if(me.record.data.default_originate === "yes"){
                Ext.getCmp('bgp_originate').state = true;
                Ext.getCmp('bgp_originate').moveHandle(true);
            }
        }
    },

    onWin_network_protocol_bgp_addressClose: function(panel, eOpts) {
        this.fieldInfo.hide();
    }

});