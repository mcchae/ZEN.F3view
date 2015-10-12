
Ext.define('NFW2.view.NFW2_network_ha_lb', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_ha_lb',

    requires: [
        'NFW2.view.NFW2_network_ha_lbViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.XTemplate',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_network_ha_lb'
    },
    cls: 'zen_body',
    id: 'NFW2_network_ha_lb',
    width: 900,
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            margin: '10 0 0 0',
            ui: 'footer',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'fld_msg',
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
                        click: 'onButtonClick3'
                    }
                }
            ]
        }
    ],

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        id: 'fm_lb',
                        layout: 'auto',
                        items: [
                            {
                                xtype: 'container',
                                id: 'con_l2',
                                margin: '5 0 0 0',
                                items: [
                                    {
                                        xtype: 'container',
                                        hidden: true,
                                        id: 'con_err',
                                        items: [
                                            {
                                                xtype: 'label',
                                                cls: 'errorBox',
                                                bind: {
                                                    text: '{ha_msg2}'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'combobox',
                                        id: 'inter',
                                        labelSeparator: ' ',
                                        labelWidth: 120,
                                        editable: false,
                                        displayField: 'name',
                                        queryMode: 'local',
                                        store: 'store_interface',
                                        valueField: 'name',
                                        bind: {
                                            fieldLabel: '{inter}'
                                        },
                                        listeners: {
                                            afterrender: 'onInterAfterRender'
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
                                                width: 125,
                                                bind: {
                                                    text: '{target_ip}'
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
                                                id: 'target_ip',
                                                labelSeparator: ' ',
                                                msgTarget: 'none',
                                                listeners: {
                                                    errorchange: 'onTarget_ipErrorChange',
                                                    focus: 'onTarget_ipFocus',
                                                    blur: 'onTarget_ipBlur'
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
                                                    text: '{target_mac}'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value !== true){
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!ValidMAC(value)){ return ValidIP('MAC'); }
                                                    }
                                                    return true;
                                                },
                                                id: 'target_mac',
                                                labelSeparator: ' ',
                                                msgTarget: 'none',
                                                listeners: {
                                                    errorchange: 'onTarget_macErrorChange',
                                                    blur: 'onTarget_macBlur'
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
                                                    text: '{check_period}'
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
                                                fieldInfo: '입력범위 : 1 ~ 20',
                                                cls: 'inp_unit',
                                                id: 'period',
                                                width: 120,
                                                afterBodyEl: [
                                                    '<div class="inp_after">{[__zen(\'sec\')]}</div>'
                                                ],
                                                labelSeparator: ' ',
                                                msgTarget: 'none',
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
                                        margin: '8 0 8 0',
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
                                                    text: '{timeout}'
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
                                                msgTarget: 'none',
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
                            },
                            {
                                xtype: 'button',
                                cls: 'btn_b',
                                iconCls: 'icb_add',
                                bind: {
                                    text: '{add}'
                                },
                                listeners: {
                                    click: 'onButtonClick'
                                }
                            },
                            {
                                xtype: 'button',
                                cls: 'btn_b',
                                componentCls: 'btn_auth',
                                margin: '0 0 0 5',
                                iconCls: 'icb_del',
                                bind: {
                                    text: '{del}'
                                },
                                listeners: {
                                    click: 'onButtonClick2'
                                }
                            },
                            {
                                xtype: 'gridpanel',
                                id: 'grid_list',
                                margin: '5 0 0 0',
                                title: '',
                                columnLines: true,
                                store: 'store_ha_lb_list',
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        width: 60,
                                        align: 'center',
                                        dataIndex: 'num',
                                        bind: {
                                            text: '{rank}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            if(value === "Single" || value === "Range" || value === "Netmask"){
                                                return record.data.source;
                                            }else{
                                                return value;
                                            }
                                        },
                                        dataIndex: 's_type',
                                        flex: 1,
                                        bind: {
                                            text: '{src}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            if(value === "Single" || value === "Range" || value === "Netmask"){
                                                return record.data.dest;
                                            }else{
                                                return value;
                                            }
                                        },
                                        dataIndex: 'd_type',
                                        flex: 1,
                                        bind: {
                                            text: '{dest}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'action',
                                        flex: 0.5,
                                        bind: {
                                            text: '{action}'
                                        }
                                    }
                                ],
                                selModel: Ext.create('Ext.selection.CheckboxModel', {
                                    selType: 'checkboxmodel'
                                }),
                                listeners: {
                                    celldblclick: 'onGrid_listCellDblClick'
                                }
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

    onInterAfterRender: function(component, eOpts) {
        Ext.getCmp("inter").setValue("eth0");
    },

    onTarget_ipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTarget_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onTarget_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('target_ip').validateValue(true);
    },

    onTarget_macErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTarget_macBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('target_mac').validateValue(true);
    },

    onPeriodErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
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

    onTimeoutErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
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

    onButtonClick: function(button, e, eOpts) {
        if(this.disable == true){ return false; }

        var grid = Ext.getCmp("grid_list");

        if(grid.getStore().data.length >= 128){
            Ext.Msg.alert("WeGuardia™ ZEN","최대 128개까지 입력 가능합니다.");
        }else{

            var win = Ext.create("NFW2.view.win_ha_lb");

            win.show();

        }
    },

    onButtonClick2: function(button, e, eOpts) {
        if(this.disable == true){ return false; }

        var tbl = Ext.getCmp("grid_list");
        var grid_chk = tbl.getSelectionModel().getSelection();

        var me = this;

        if(grid_chk.length === 0){
            Ext.Msg.alert("WeGuardia™ ZEN",get_msg("sel_del"));
            return false;
        }

        Ext.MessageBox.confirm("WeGuardia™ ZEN",get_msg("conf_del"),function(btn){
            if(btn === "yes"){

                var obj = new Object();

                var del = new Array();

                for(var i=0; i<grid_chk.length; i++){
                    obj = {
                        'cid': grid_chk[i].data.cid
                    };
                    del.push(obj);
                }

                obj = {
                    'packet_relay' : del
                };

                var _params = {
                    ha_lb_script : Ext.encode(obj)
                };

                request_helper.xmlrpc_call_JsonP('ftuctrl','del_ha_lb_script',_params,function(response){

                    me.get_ha_lb_list();
                });
            }

        });
    },

    onGrid_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create("NFW2.view.win_ha_lb",{
            modal : true,
            edit : "edit"
        });

        win.show();
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        this.fieldInfo = makeZenTip();
        var _params = '';

        request_helper.xmlrpc_call_JsonP('ftuctrl','is_ha_l2orl3_mode',_params,function(response){
            if(response.is_l2orl3 === true){

                if(response.mode === "l2"){
                    Ext.getCmp("con_l2").hide();
                }
            }else{
                prt_errMsg(get_msg('err_lb'),null);
            }
        });

        me.get_ha_lb_list();

        var records = [];

        var _params = {
            option : Ext.encode('all')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_pname_list',
            _params,
            function(response){

                if(response){
                    for(var i in response){
                        records.push({
                            name: response[i].name
                        });
                    }
                }

                var _params = {
                    if_type : Ext.encode('bridge'),
                    data_type : Ext.encode('name'),
                    option : Ext.encode('used')
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'get_lname_list',
                    _params,
                    function(response){

                        if(response){
                            for(var i in response){
                                records.push({
                                    name: response[i].name
                                });
                            }
                        }

                        var _params = {
                            if_type : Ext.encode('bonding'),
                            data_type : Ext.encode('name'),
                            option : Ext.encode('used')
                        };

                        request_helper.xmlrpc_call_JsonP(
                            'ftuctrl',
                            'get_lname_list',
                            _params,
                            function(response){

                                if(response){
                                    for(var i in response){
                                        records.push({
                                            name: response[i].name
                                        });
                                    }
                                }

                                Ext.data.StoreManager.lookup('store_interface').loadData(records);
                            }
                        );
                    }
                );
            }
        );
    },

    onButtonClick1: function(button, e, eOpts) {
        this.set_ha_lb_checker_sub();
    },

    onButtonClick3: function(button, e, eOpts) {
        if(this.disable == true){ return false; }

        this.get_ha_lb_list();
    },

    set_ha_lb_checker_sub: function() {
        var me = this;

        var inter = Ext.getCmp("inter");
        var target_ip = Ext.getCmp("target_ip");
        var target_mac = Ext.getCmp('target_mac');
        var period = Ext.getCmp('period');
        var timeout = Ext.getCmp('timeout');

        var num = Ext.getCmp("num");
        var s_type = Ext.getCmp("com_source");
        var source = Ext.getCmp("source");
        var d_type = Ext.getCmp("com_dest");
        var dest = Ext.getCmp("dest");
        var action = Ext.getCmp("com_action");

        var obj = new Object();

        var con_l2 = Ext.getCmp("con_l2");

        if(con_l2.hidden === false){
        if(target_ip.isValid()===false){ target_ip.focus(); return false; }
        if(target_mac.isValid()===false){ target_mac.focus(); return false; }
        if(period.isValid()===false){ period.focus(); return false; }
        if(timeout.isValid()===false){ timeout.focus(); return false; }
        }

        obj = {
            'checker_sub':{
                'interface': inter.getValue(),
                'target_ip': target_ip.getValue(),
                'target_mac': target_mac.getValue(),
                'period': period.getValue(),
                'timeout': timeout.getValue()
            }
        };

        var _params = {
            ha_lb_script : Ext.encode(obj)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'set_ha_lb_checker_sub',
            _params,
            function(resposne){
                Ext.Msg.show({
                    title: __weguardia,
                    msg: get_msg("msg_ok_add"),
                    width: 300,
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });
                me.get_ha_lb_list();
            }
        );
    },

    get_ha_lb_list: function() {
        var me = this;

        var _store = Ext.data.StoreManager.lookup("store_ha_lb_list");

        _store.removeAll();
        Ext.getCmp("fm_lb").getForm().reset();

        var _params = '';

        request_helper.xmlrpc_call_JsonP('ftuctrl','get_ha_lb_list',_params,function(response){

            hideLoadMask();

            if(response){

                Ext.getCmp("inter").setValue(response.checker_sub['interface']);
                if(response.checker_sub.target_ip){
                    Ext.getCmp("target_ip").setValue(response.checker_sub.target_ip);
                }
                if(response.checker_sub.target_mac){
                    Ext.getCmp("target_mac").setValue(response.checker_sub.target_mac);
                }
                Ext.getCmp("period").setValue(response.checker_sub.period);
                Ext.getCmp("timeout").setValue(response.checker_sub.timeout);

                var ar_c = [];

                var packet = response.packet_relay;

                for(var i=0; i<packet.list.length; i++){
                    var obj = {
                        'cid': packet.list[i].cid,
                        'num': packet.list[i].num,
                        'action': packet.list[i].action,
                        's_type': packet.list[i].source.type,
                        'source': packet.list[i].source.ip,
                        'd_type': packet.list[i].destination.type,
                        'dest': packet.list[i].destination.ip

                    };

                    ar_c.push(obj);
                }

                var data = ar_c;
                _store.add(data);
            }

        });
    }

});