
Ext.define('NFW2.view.win_ha_l3', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ha_l3',

    requires: [
        'NFW2.view.win_ha_l3ViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.XTemplate',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_ha_l3'
    },
    cls: 'zen_win',
    scrollable: true,
    width: 520,
    modal: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            itemId: 'fm',
            scrollable: true,
            bodyPadding: 20,
            title: '',
            items: [
                {
                    xtype: 'container',
                    margin: '8 0 10 0',
                    minWidth: 470,
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'inter',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            value: 'eth0',
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: 'store_interface',
                            valueField: 'name',
                            bind: {
                                fieldLabel: '{inter}'
                            }
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    id: 'vr_a_ip_lb',
                                    width: 125,
                                    listeners: {
                                        beforerender: 'onVr_a_ip_lbBeforeRender'
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
                                    id: 'virtual_a_ip',
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    listeners: {
                                        errorchange: 'onVirtual_a_ipErrorChange',
                                        focus: 'onVirtual_a_ipFocus',
                                        blur: 'onVirtual_a_ipBlur'
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
                                    id: 'mac_ip_lb',
                                    width: 125,
                                    listeners: {
                                        beforerender: 'onMac_ip_lbBeforeRender'
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
                                    id: 'machine_ip',
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    listeners: {
                                        errorchange: 'onMachine_ipErrorChange',
                                        focus: 'onMachine_ipFocus',
                                        blur: 'onMachine_ipBlur'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'con_backup',
                            margin: '8 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    id: 'vr_b_ip_lb',
                                    width: 125,
                                    listeners: {
                                        beforerender: 'onVr_b_ip_lbBeforeRender'
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
                                    id: 'virtual_b_ip',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    listeners: {
                                        errorchange: 'onVirtual_b_ipErrorChange',
                                        focus: 'onVirtual_b_ipFocus',
                                        blur: 'onVirtual_b_ipBlur'
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
                                    id: 'ms_b_ip_lb',
                                    width: 125,
                                    listeners: {
                                        beforerender: 'onMs_b_ip_lbBeforeRender'
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
                                    id: 'master_b_ip',
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    listeners: {
                                        errorchange: 'onMaser_b_ipErrorChange',
                                        focus: 'onMaster_b_ipFocus',
                                        blur: 'onMaster_b_ipBlur'
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
                                    listeners: {
                                        beforerender: 'onLabelBeforeRender'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                            if(!ValidNum(value)){ return get_msg('err_form'); }
                                            if(!LengthCheck(value, 1, 20)){ return ValidLimit(1, 20); }
                                        }
                                        return true;
                                    },
                                    fieldInfo: '',
                                    cls: 'inp_unit',
                                    id: 'period',
                                    width: 120,
                                    afterBodyEl: [
                                        '<div class="inp_after">{[__zen(\'sec\')]}</div>'
                                    ],
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    value: '1',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 2,
                                    minLength: 1,
                                    listeners: {
                                        errorchange: 'onPeriodErrorChange',
                                        keydown: 'onPeriodKeydown',
                                        focus: 'onPeriodFocus',
                                        blur: 'onPeriodBlur'
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
                                    listeners: {
                                        beforerender: 'onLabelBeforeRender1'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                            if(!ValidNum(value)){ return get_msg('err_form'); }
                                            if(!LengthCheck(value, 1, 50)){ return ValidLimit(1, 50); }
                                        }
                                        return true;
                                    },
                                    fieldInfo: '',
                                    cls: 'inp_unit',
                                    id: 'timeout',
                                    width: 120,
                                    afterBodyEl: [
                                        '<div class="inp_after">{[__zen(\'times\')]}</div>'
                                    ],
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    value: '3',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 2,
                                    minLength: 1,
                                    listeners: {
                                        errorchange: 'onTimeoutErrorChange',
                                        keydown: 'onTimeoutKeydown',
                                        focus: 'onTimeoutFocus',
                                        blur: 'onTimeoutBlur'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'mt_info',
                                    bind: {
                                        text: '{ha_info1}'
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

    onVr_a_ip_lbBeforeRender: function(component, eOpts) {
        component.setText(__zen('active_virtual_ip'));
    },

    onVirtual_a_ipErrorChange: function(labelable, error, eOpts) {
        if(error){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(labelable.activeErrors[0]);
                }
                else{
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                        err_fl.removeCls('ic_msg_err');
                        err_fl.update('');
                }
    },

    onVirtual_a_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onVirtual_a_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('virtual_a_ip').validateValue(true);
    },

    onMac_ip_lbBeforeRender: function(component, eOpts) {
        component.setText(__zen('l3_device_ip'));
    },

    onMachine_ipErrorChange: function(labelable, error, eOpts) {
        if(error){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(labelable.activeErrors[0]);
                }
                else{
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                        err_fl.removeCls('ic_msg_err');
                        err_fl.update('');
                }
    },

    onMachine_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onMachine_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('machine_ip').validateValue(true);
    },

    onVr_b_ip_lbBeforeRender: function(component, eOpts) {
        component.setText(__zen('backup_virtual_ip'));
    },

    onVirtual_b_ipErrorChange: function(labelable, error, eOpts) {
        if(error){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(labelable.activeErrors[0]);
                }
                else{
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                        err_fl.removeCls('ic_msg_err');
                        err_fl.update('');
                }
    },

    onVirtual_b_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onVirtual_b_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('virtual_b_ip').validateValue(true);
    },

    onMs_b_ip_lbBeforeRender: function(component, eOpts) {
        component.setText(__zen('backup_device_ip'));
    },

    onMaser_b_ipErrorChange: function(labelable, error, eOpts) {
        if(error){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(labelable.activeErrors[0]);
                }
                else{
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                        err_fl.removeCls('ic_msg_err');
                        err_fl.update('');
                }
    },

    onMaster_b_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onMaster_b_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('master_b_ip').validateValue(true);
    },

    onLabelBeforeRender: function(component, eOpts) {
        component.setText(__zen('check_period'));
    },

    onPeriodErrorChange: function(labelable, error, eOpts) {
        if(error){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(labelable.activeErrors[0]);
                }
                else{
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                        err_fl.removeCls('ic_msg_err');
                        err_fl.update('');
                }
    },

    onPeriodKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onPeriodFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1 ~ 20';
        setTipFocus(this,component);
    },

    onPeriodBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('period').validateValue(true);
    },

    onLabelBeforeRender1: function(component, eOpts) {
        component.setText(__zen('timeout'));
    },

    onTimeoutErrorChange: function(labelable, error, eOpts) {
        if(error){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(labelable.activeErrors[0]);
                }
                else{
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                        err_fl.removeCls('ic_msg_err');
                        err_fl.update('');
                }
    },

    onTimeoutKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onTimeoutFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1 ~ 50';
        setTipFocus(this,component);
    },

    onTimeoutBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('timeout').validateValue(true);
    },

    onWindowAfterRender: function(component, eOpts) {
        this.fieldInfo = makeZenTip();
        if(this.edit === "edit"){

            this.init_ha_l3();
        }else{
            this.setTitle(__zen('l3_add'));
        }

        var compose = Ext.getCmp("compose");
        var config = Ext.getCmp("config");

        if(compose.getValue() === "Active-Standby"){
            Ext.getCmp("con_backup").hide();
        }

        if(config.getValue() === "Active(Master)"){
            Ext.getCmp("ms_b_ip_lb").setText(__zen('backup_device_ip'));
            Ext.getCmp("vr_a_ip_lb").setText(__zen('active_virtual_ip'));
        }else{
            Ext.getCmp("ms_b_ip_lb").setText(__zen('master_device_ip'));

            if(compose.getValue() === "Active-Standby"){
                Ext.getCmp("vr_a_ip_lb").setText(__zen('backup_virtual_ip'));
            }
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var compose = Ext.getCmp("compose");
        var config = Ext.getCmp("config");
        var way = Ext.getCmp("way");
        var group_n = Ext.getCmp("group_n");

        var inter = Ext.getCmp("inter");
        var virtual_a_ip = Ext.getCmp("virtual_a_ip");
        var machine_ip = Ext.getCmp("machine_ip");
        var virtual_b_ip = Ext.getCmp("virtual_b_ip");
        var master_b_ip = Ext.getCmp("master_b_ip");
        var period = Ext.getCmp("period");
        var timeout = Ext.getCmp("timeout");

        var obj = new Object();

        if(virtual_a_ip.isValid()===false){ virtual_a_ip.focus(); return false; }
        if(machine_ip.isValid()===false){ machine_ip.focus(); return false; }
        if(compose.getValue() === "Active-Active"){
            if(virtual_b_ip.isValid()===false){ virtual_b_ip.focus(); return false; }
        }
        if(master_b_ip.isValid()===false){ master_b_ip.focus(); return false; }
        if(period.isValid()===false){ period.focus(); return false; }
        if(timeout.isValid()===false){ timeout.focus(); return false; }

        var period = String(Number(period.getValue()));
        var timeout = String(Number(timeout.getValue()));

        if(compose.getValue() === "Active-Active"){

            var ao = {
                'interface': inter.getValue(),
                'virtual_active_ip': virtual_a_ip.getValue(),
                'machine_ip': machine_ip.getValue(),
                'virtual_backup_ip': virtual_b_ip.getValue(),
                'master_backup_ip': master_b_ip.getValue(),
                'period': period,
                'timeout': timeout,
                'cid': me.cid
            };

        }else{

            var ao = {
                'interface': inter.getValue(),
                'virtual_ip': virtual_a_ip.getValue(),
                'machine_ip': machine_ip.getValue(),
                'master_backup_ip': master_b_ip.getValue(),
                'period': period,
                'timeout': timeout,
                'cid': me.cid
            };

        }

        obj = {
            'head_mode' : {
                'compose' : compose.getValue(),
                'config' : config.getValue(),
                'way' : way.getValue(),
                'group_num' : group_n.getValue()
            },
            'checker' : ao
        };

        var update = (me.edit==="edit")?true:false;

        var _params = {
            ha_head_script : Ext.encode(obj),
            update_flag : Ext.encode(update)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'set_ha_head_checker',
            _params,
            function(response){

                adminAlarmRefresh();
                Ext.getCmp("NFW2_network_ha_l3").get_ha_head_list();

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
                        fn: setWinState,
                        icon: Ext.window.MessageBox.INFO
                    });

                }

            }
        );
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    init_ha_l3: function() {
        var me = this;

        var tbl = Ext.getCmp("grid_list");
        var grid_chk = tbl.getSelectionModel().getSelection();

        this.setTitle(__zen('l3_edit')+" - "+grid_chk[0].data.inter);

        var compose = Ext.getCmp("compose");

        var obj = {
            'head_mode': {
                'compose': compose.getValue()
            },
            'checker': {
                'interface': grid_chk[0].data.inter
            }
        };

        var _params = {
            'ha_head_script' : Ext.encode(obj)
        };

        request_helper.xmlrpc_call_JsonP('ftuctrl','get_ha_head_script',_params, function(response){

            var inter = Ext.getCmp("inter");
            var virtual_a_ip = Ext.getCmp("virtual_a_ip");
            var machine_ip = Ext.getCmp("machine_ip");
            var virtual_b_ip = Ext.getCmp("virtual_b_ip");
            var master_b_ip = Ext.getCmp("master_b_ip");
            var period = Ext.getCmp("period");
            var timeout = Ext.getCmp("timeout");

            inter.setValue(response['interface']);

            if(compose.getValue() === "Active-Active"){
                virtual_a_ip.setValue(response.virtual_active_ip);
                master_b_ip.setValue(response.master_backup_ip);
                virtual_b_ip.setValue(response.virtual_backup_ip);
            }else{
                virtual_a_ip.setValue(response.virtual_ip);
                master_b_ip.setValue(response.master_backup_ip);
            }
            machine_ip.setValue(response.machine_ip);

            period.setValue(response.period);
            timeout.setValue(response.timeout);

            me.cid = response.cid;

        });
    }

});