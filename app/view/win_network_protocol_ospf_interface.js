
Ext.define('NFW2.view.win_network_protocol_ospf_interface', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_network_protocol_ospf_interface',

    requires: [
        'NFW2.view.win_network_protocol_ospf_interfaceViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.form.FieldSet',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_network_protocol_ospf_interface'
    },
    cls: 'zen_win',
    id: 'win_network_protocol_ospf_interface',
    title: 'OSPF 인터페이스 추가',
    defaultListenerScope: true,

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
        afterrender: 'onWin_network_protocol_ospf_interfaceAfterRender',
        close: 'onWin_network_protocol_ospf_interfaceClose'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
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
                                                xtype: 'combobox',
                                                id: 'ospf_interface',
                                                labelSeparator: ' ',
                                                labelWidth: 110,
                                                editable: false,
                                                displayField: 'name',
                                                queryMode: 'local',
                                                store: {
                                                    fields: [
                                                        {
                                                            name: 'name'
                                                        }
                                                    ]
                                                },
                                                valueField: 'name',
                                                bind: {
                                                    fieldLabel: '{inter}'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        hidden: true,
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
                                                    text: '{type4}'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value !== true){
                                                        var temp = removeComma(value);

                                                        if(!CheckNotNull(temp)){ return get_msg('err_null'); }
                                                        if(!ValidNum(temp)){ return get_msg('err_form'); }
                                                        if(!LengthCheck(temp,1,10000000)){ return ValidLimit(1,10000000); }
                                                    }

                                                    return true;
                                                },
                                                fieldInfo: {
                                                    txt: msg_tip_length(1,
                                                    10000000,
                                                    null)
                                                },
                                                id: 'ospf_inter_type',
                                                msgTarget: 'none',
                                                enforceMaxLength: true,
                                                maskRe: /[0-9]/,
                                                maxLength: 10,
                                                listeners: {
                                                    errorchange: 'onOspf_inter_typeErrorChange',
                                                    blur: 'onOspf_inter_typeBlur',
                                                    focus: 'onOspf_inter_typeFocus',
                                                    change: 'onOspf_inter_typeChange'
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
                                                width: 115,
                                                bind: {
                                                    text: '{cost}'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value !== true){
                                                        var value = removeComma(value);

                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!ValidNum(value)){ return get_msg('err_form'); }
                                                        if(!LengthCheck(value,1,65535)){ return ValidLimit(1,65535); }
                                                    }

                                                    return true;
                                                },
                                                fieldInfo: {
                                                    txt: msg_tip_length(1,
                                                    65535,
                                                    null)
                                                },
                                                id: 'ospf_inter_cost',
                                                msgTarget: 'none',
                                                enforceMaxLength: true,
                                                maskRe: /[0-9]/,
                                                maxLength: 6,
                                                listeners: {
                                                    errorchange: 'onOspf_inter_costErrorChange',
                                                    blur: 'onOspf_inter_costBlur',
                                                    focus: 'onOspf_inter_costFocus',
                                                    change: 'onOspf_inter_costChange'
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
                                                width: 115,
                                                bind: {
                                                    text: '{priority_level}'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value !== true){
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!ValidNum(value)){ return get_msg('err_form'); }
                                                        if(!LengthCheck(value,0,255)){ return ValidLimit(0,255); }
                                                    }

                                                    return true;
                                                },
                                                fieldInfo: {
                                                    txt: msg_tip_length(0,
                                                    255,
                                                    null)
                                                },
                                                id: 'ospf_inter_prio',
                                                msgTarget: 'none',
                                                value: 1,
                                                enforceMaxLength: true,
                                                maskRe: /[0-9]/,
                                                maxLength: 3,
                                                listeners: {
                                                    errorchange: 'onOspf_inter_costErrorChange1',
                                                    blur: 'onOspf_inter_costBlur1',
                                                    focus: 'onOspf_inter_costFocus1'
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
                                                    text: '{header_o_auth}'
                                                }
                                            },
                                            me.processOspf_inter_toggle({
                                                xtype: 'toggleslide',
                                                state: false,
                                                resizeHandle: false,
                                                id: 'ospf_inter_toggle',
                                                listeners: {
                                                    change: 'onOspf_inter_toggleChange'
                                                }
                                            }),
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value !== true){
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    }

                                                    return true;
                                                },
                                                disabled: true,
                                                id: 'ospf_inter_auth',
                                                msgTarget: 'none',
                                                inputType: 'password',
                                                listeners: {
                                                    errorchange: 'onOspf_inter_authErrorChange',
                                                    blur: 'onOspf_inter_authBlur'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        margin: '8 0 10 0',
                                        title: 'MD5 인증',
                                        listeners: {
                                            render: 'onFieldsetRender'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                disabled: true,
                                                id: 'ospf_inter_md5_con',
                                                margin: '8 0 0 0',
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            if(value !== true){
                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                if(Number(value) < 1 || Number(value) > 255){ return ValidLimit(1,255); }
                                                            }

                                                            return true;
                                                        },
                                                        fieldInfo: {
                                                            txt: msg_tip_length(1,
                                                            255,
                                                            null)
                                                        },
                                                        id: 'ospf_inter_keyid',
                                                        fieldLabel: 'Key ID',
                                                        labelCls: 'lb_req',
                                                        labelSeparator: ' ',
                                                        labelWidth: 90,
                                                        msgTarget: 'none',
                                                        enforceMaxLength: true,
                                                        maskRe: /[0-9]/,
                                                        maxLength: 3,
                                                        listeners: {
                                                            errorchange: 'onOspf_inter_authErrorChange11',
                                                            _blur0: 'onOspf_inter_md5Blur1',
                                                            _blur1: 'onOspf_inter_keyidBlur',
                                                            blur: function() {
                                                                var me = this,
                                                                    args = Ext.toArray(arguments, 0, -1);
                                                                args.unshift('_blur0');
                                                                me.fireEvent.apply(me, args);
                                                                args[0] = '_blur1';
                                                                me.fireEvent.apply(me, args);
                                                            },
                                                            focus: 'onOspf_inter_keyidFocus'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            if(value !== true){
                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                            }

                                                            return true;
                                                        },
                                                        id: 'ospf_inter_md5',
                                                        fieldLabel: 'Key',
                                                        labelCls: 'lb_req',
                                                        labelSeparator: ' ',
                                                        labelWidth: 90,
                                                        msgTarget: 'none',
                                                        inputType: 'password',
                                                        listeners: {
                                                            errorchange: 'onOspf_inter_authErrorChange1',
                                                            blur: 'onOspf_inter_md5Blur'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processOspf_inter_toggle: function(config) {
        config.onText = __zen('use');
        config.offText = __zen('unused');

        return config;
    },

    onOspf_inter_typeErrorChange: function(labelable, error, eOpts) {
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

    onOspf_inter_typeBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onOspf_inter_typeFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onOspf_inter_typeChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onOspf_inter_costErrorChange: function(labelable, error, eOpts) {
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

    onOspf_inter_costBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onOspf_inter_costFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onOspf_inter_costChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onOspf_inter_costErrorChange1: function(labelable, error, eOpts) {
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

    onOspf_inter_costBlur1: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onOspf_inter_costFocus1: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onOspf_inter_toggleChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('ospf_inter_auth').enable(true);
            Ext.getCmp('ospf_inter_toggle_md5').state = false;
            Ext.getCmp('ospf_inter_toggle_md5').moveHandle(false);
            Ext.getCmp('ospf_inter_md5_con').disable(true);
        }
        else{
            Ext.getCmp('ospf_inter_auth').disable(true);
        //     Ext.getCmp('ospf_inter_toggle_md5').state = true;
        //     Ext.getCmp('ospf_inter_toggle_md5').moveHandle(true);
        //     Ext.getCmp('ospf_inter_md5_con').enable(true);
        }
    },

    onOspf_inter_authErrorChange: function(labelable, error, eOpts) {
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

    onOspf_inter_authBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onFieldsetRender: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'ospf_inter_toggle_md5',
            style:'margin-left:110px',
            resizeHandle: false,
            state: false,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    if(newValue){
                        Ext.getCmp('ospf_inter_md5_con').enable(true);
                        Ext.getCmp('ospf_inter_toggle').state = false;
                        Ext.getCmp('ospf_inter_toggle').moveHandle(false);
                        Ext.getCmp('ospf_inter_auth').disable(true);
                    }
                    else{
                        Ext.getCmp('ospf_inter_md5_con').disable(true);
        //                 Ext.getCmp('ospf_inter_toggle').state = true;
        //                 Ext.getCmp('ospf_inter_toggle').moveHandle(true);
        //                 Ext.getCmp('ospf_inter_auth').enable(true);
                    }
                }
            }
        });

        component.legend.add(tbutton);
    },

    onOspf_inter_authErrorChange11: function(labelable, error, eOpts) {
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

    onOspf_inter_md5Blur1: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onOspf_inter_keyidFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onOspf_inter_keyidBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onOspf_inter_authErrorChange1: function(labelable, error, eOpts) {
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

    onOspf_inter_md5Blur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;
        var store = Ext.getCmp('st_nw_protocol_ospf_interface_grid').getStore();

        // if(Ext.getCmp('ospf_inter_type').isValid() === false){ Ext.getCmp('ospf_inter_type').focus(); return false; }
        if(Ext.getCmp('ospf_inter_cost').isValid() === false){ Ext.getCmp('ospf_inter_cost').focus(); return false; }
        if(Ext.getCmp('ospf_inter_prio').isValid() === false){ Ext.getCmp('ospf_inter_prio').focus(); return false; }
        if(Ext.getCmp('ospf_inter_toggle').state === true){
            if(Ext.getCmp('ospf_inter_auth').isValid() === false){ Ext.getCmp('ospf_inter_auth').focus(); return false; }
        }
        if(Ext.getCmp('ospf_inter_toggle_md5').state === true){
            if(Ext.getCmp('ospf_inter_keyid').isValid() === false){ Ext.getCmp('ospf_inter_keyid').focus(); return false; }
            if(Ext.getCmp('ospf_inter_md5').isValid() === false){ Ext.getCmp('ospf_inter_md5').focus(); return false; }
        }

        var state = "";
        var state_md5 = "";

        if(Ext.getCmp('ospf_inter_toggle').state === true){ state = "yes"; }
        else{ state = "no"; }

        if(Ext.getCmp('ospf_inter_toggle_md5').state === true){ state_md5 = "yes"; }
        else{ state_md5 = "no"; }

        var authen = {
            'state' : state,
            'password' : Ext.getCmp('ospf_inter_auth').getValue()
        };

        var md5 = {
            'state' : state_md5,
            'keyid' : Ext.getCmp('ospf_inter_keyid').getValue(),
            'key' : Ext.getCmp('ospf_inter_md5').getValue()
        };

        var record = [];

        record.push({
            'intf' : Ext.getCmp('ospf_interface').getValue(),
        //     'type' : removeComma(Ext.getCmp('ospf_inter_type').getValue()),
            'cost' : removeComma(Ext.getCmp('ospf_inter_cost').getValue()),
            'priority' : Ext.getCmp('ospf_inter_prio').getValue(),
            'interval' : "",
            'authen' : authen,
            'key_md5' : md5
        });
        // console.log(record);
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

    onWin_network_protocol_ospf_interfaceAfterRender: function(component, eOpts) {
        var me = this;
        this.fieldInfo = makeZenTip();
        chk_zenauth(null);

        me.setTitle(__zen('add_ospf_inter'));
        var _params = {

            option : Ext.encode('all')

        };

        Ext.data.JsonP.request({

            url : "/api/ftuctrl/get_pname_list",
            params : _params,
            success : function(response){
                var lname_params = {
                    if_type : Ext.encode('bonding'),
                    data_type : Ext.encode('name'),
                    option : Ext.encode('used')
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'get_lname_list',
                    lname_params,
                    function(response_lname){
                        var record = [];

                        for(var i in response.retval){
                            record.push({
                                'name' : response.retval[i].name
                            });
                        }

                        for(var k in response_lname){
                            record.push({'name':response_lname[k].name});
                        }

                        Ext.getCmp('ospf_interface').getStore().loadData(record);
                        Ext.getCmp('ospf_interface').setValue(record[0].name);
                    }
                );
            }
        });

        if(me.edit === "edit"){
            me.setTitle(__zen('edit_ospf_inter'));

            Ext.getCmp('ospf_interface').setValue(me.record.data.intf);
        //     Ext.getCmp('ospf_inter_type').setValue(me.record.data.type);
            Ext.getCmp('ospf_inter_cost').setValue(me.record.data.cost);
            Ext.getCmp('ospf_inter_prio').setValue(me.record.data.priority);
            Ext.getCmp('ospf_inter_auth').setValue(me.record.data.authen.password);
            Ext.getCmp('ospf_inter_keyid').setValue(me.record.data.key_md5.keyid);
            Ext.getCmp('ospf_inter_md5').setValue(me.record.data.key_md5.key);

            if(me.record.data.authen.state === "yes"){
                Ext.getCmp('ospf_inter_toggle').state = true;
                Ext.getCmp('ospf_inter_toggle').moveHandle(true);
                Ext.getCmp('ospf_inter_auth').enable(true);
            }
            else{
                Ext.getCmp('ospf_inter_toggle').state = false;
                Ext.getCmp('ospf_inter_toggle').moveHandle(false);
                Ext.getCmp('ospf_inter_auth').disable(false);
            }
            if(me.record.data.key_md5.state === "yes"){
                Ext.getCmp('ospf_inter_toggle_md5').state = true;
                Ext.getCmp('ospf_inter_md5_con').enable(true);
            }
            else{
                Ext.getCmp('ospf_inter_toggle_md5').state = false;
                Ext.getCmp('ospf_inter_md5_con').disable(false);
            }
        }
    },

    onWin_network_protocol_ospf_interfaceClose: function(panel, eOpts) {
        this.fieldInfo.hide();
    }

});