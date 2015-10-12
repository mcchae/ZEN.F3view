
Ext.define('NFW2.view.win_network_protocol_ospf_area', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_network_protocol_ospf_area',

    requires: [
        'NFW2.view.win_network_protocol_ospf_areaViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_network_protocol_ospf_area'
    },
    cls: 'zen_win',
    id: 'win_network_protocol_ospf_area',
    title: 'OSPF Area 추가',
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
                                    width: 125,
                                    bind: {
                                        text: '{area}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            if(Ext.getCmp('ospf_type').getValue() === "address"){
                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
                                            }
                                            else{
                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                if(!ValidNum(value)){ return get_msg('err_form'); }
                                                if(!LengthCheck(value,1,4294967296)){ return ValidLimit(1,4294967296); }
                                            }
                                        }

                                        return true;
                                    },
                                    id: 'ospf_area',
                                    width: 250,
                                    msgTarget: 'none',
                                    maskRe: /[0-9.]/,
                                    listeners: {
                                        blur: 'onOspf_areaBlur',
                                        focus: 'onOspf_areaFocus',
                                        errorchange: 'onOspf_areaErrorChange'
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
                                        text: '{type4}'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    id: 'ospf_type',
                                    width: 100,
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: {
                                        data: [
                                            {
                                                name: 'A.B.C.D',
                                                value: 'address'
                                            },
                                            {
                                                name: 'Number',
                                                value: 'number'
                                            }
                                        ],
                                        fields: [
                                            {
                                                name: 'name'
                                            },
                                            {
                                                name: 'value'
                                            }
                                        ]
                                    },
                                    valueField: 'value'
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
                                            if(value !== ""){
                                                var chk_ip = value.split(',');
                                                for(var i in chk_ip){
                                                    if(!ValidIPAddress(chk_ip[i])){ return get_msg('err_ip'); }
                                                }
                                                //         if(!ValidIPAddress(chk_ip[0])){ return get_msg('err_ip'); }
                                                //         if(chk_ip[1] === undefined){ return get_msg('err_form'); }
                                                //         else{
                                                //             if(!ValidIPAddress(chk_ip[0])){ return get_msg('err_ip'); }
                                                //             else if(!ValidIPAddress(chk_ip[1])){ return get_msg('err_ip'); }
                                                //         }
                                            }
                                        }

                                        return true;
                                    },
                                    id: 'ospf_ip',
                                    width: 450,
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    maskRe: /[0-9.,]/,
                                    bind: {
                                        fieldLabel: '{peer_ip}'
                                    },
                                    listeners: {
                                        blur: 'onOspf_ipBlur',
                                        focus: 'onOspf_ipFocus',
                                        errorchange: 'onOspf_ipErrorChange'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '0 10 0 0',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'ospf_desc',
                                    width: 450,
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    bind: {
                                        fieldLabel: '{desc}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            cls: 'fld_info',
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_info',
                                    text: 'Peer IP : 여러개의 IP를 ","로 구분하여 입력할수 있습니다. ex)1.1.1.1,10.2.0.1'
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
        afterrender: 'onWin_network_protocol_ospf_areaAfterRender',
        close: 'onWin_network_protocol_ospf_areaClose'
    },

    onOspf_areaBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onOspf_areaFocus: function(component, event, eOpts) {
        if(Ext.getCmp('ospf_type').getValue() === "address"){
            var str = disp_help_ip('4s');
            component.fieldInfo = str;
        }
        else{
            component.fieldInfo = msg_tip_length(1,4294967295,null);
        }
        setTipFocus(this,component);
    },

    onOspf_areaErrorChange: function(labelable, error, eOpts) {
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

    onOspf_ipBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onOspf_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onOspf_ipErrorChange: function(labelable, error, eOpts) {
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
        var store = Ext.getCmp('st_nw_protocol_ospf_area_grid').getStore();

        if(Ext.getCmp('ospf_area').isValid() === false){ Ext.getCmp('ospf_area').focus(); return false; }
        if(Ext.getCmp('ospf_ip').isValid() === false){ Ext.getCmp('ospf_ip').focus(); return false; }

        var record = [];

        record.push({
            'area_id' : Ext.getCmp('ospf_area').getValue(),
            'networks' : "",
            'type' : Ext.getCmp('ospf_type').getValue(),
            'peer_ip' : Ext.getCmp('ospf_ip').getValue(),
            'desc' : Ext.getCmp('ospf_desc').getValue()
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

    onWin_network_protocol_ospf_areaAfterRender: function(component, eOpts) {
        var me = this;
        chk_zenauth(null);
        this.fieldInfo = makeZenTip();
        me.setTitle(__zen('add_ospf_area'));
        if(me.edit === "edit"){
            me.setTitle(__zen('edit_ospf_area'));

            Ext.getCmp('ospf_type').setValue(me.record.data.type);
            Ext.getCmp('ospf_area').setValue(me.record.data.area_id);
            Ext.getCmp('ospf_ip').setValue(me.record.data.peer_ip);
            Ext.getCmp('ospf_desc').setValue(me.record.data.desc);
        }
        else{
            Ext.getCmp('ospf_type').setValue(Ext.getCmp('ospf_type').getStore().data.items[0].data.value);
        }
    },

    onWin_network_protocol_ospf_areaClose: function(panel, eOpts) {
        this.fieldInfo.hide();
    }

});