
Ext.define('NFW2.view.NFW2_log_config_logServer', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_log_config_logserver',

    requires: [
        'NFW2.view.NFW2_log_config_logServerViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Separator',
        'Ext.grid.column.Action',
        'Ext.XTemplate'
    ],

    viewModel: {
        type: 'nfw2_log_config_logserver'
    },
    cls: 'zen_body',
    id: 'NFW2_log_config_logServer',
    width: 900,
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        bodyPadding: 10,
                        bind: {
                            title: '{weguardia_log_server}'
                        },
                        items: [
                            {
                                xtype: 'combobox',
                                id: 'xtm_smc_use',
                                padding: '0 0 0 -10',
                                fieldLabel: '',
                                value: 'off',
                                editable: false,
                                displayField: 'name',
                                store: 'store_logserver_xtm',
                                valueField: 'val',
                                listeners: {
                                    change: 'onXtm_smc_useChange'
                                }
                            },
                            {
                                xtype: 'textfield',
                                validator: function(value) {
                                    if(value === true){ return true; }
                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                    if(!ValidIPAddress(value)){ return get_msg('err_ip'); }

                                    return true;
                                },
                                cls: 'lb_req',
                                id: 'xtm_ip',
                                labelSeparator: ' ',
                                msgTarget: 'none',
                                bind: {
                                    fieldLabel: '{ip}'
                                },
                                listeners: {
                                    errorchange: 'onXtm_ipErrorChange',
                                    focus: 'onXtm_ipFocus',
                                    blur: 'onXtm_ipBlur'
                                }
                            },
                            {
                                xtype: 'textfield',
                                validator: function(value) {
                                    if(value === true){ return true; }
                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                    if(!ValidNum(value)){ return get_msg('err_form'); }
                                    if(!LengthCheck(value, 1, 65535)){ return ValidLimit(1, 65535); }

                                    return true;
                                },
                                fieldInfo: '',
                                cls: 'lb_req',
                                id: 'xtm_port',
                                labelSeparator: ' ',
                                msgTarget: 'none',
                                value: '514',
                                enableKeyEvents: true,
                                enforceMaxLength: true,
                                maskRe: /[0-9.]/,
                                maxLength: 5,
                                bind: {
                                    fieldLabel: '{port}'
                                },
                                listeners: {
                                    errorchange: 'onXtm_portErrorChange',
                                    keydown: 'onXtm_portKeydown',
                                    focus: 'onXtm_portFocus',
                                    blur: 'onXtm_portBlur'
                                }
                            },
                            {
                                xtype: 'checkboxfield',
                                id: 'xtm_chk_ipsec',
                                labelSeparator: ' ',
                                bind: {
                                    fieldLabel: '{use_encryption}'
                                }
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
                                        itemId: 'fld_msg3'
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'ft_confirm',
                                        iconCls: 'ft_confirm_icl',
                                        bind: {
                                            text: '{confirm}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick2'
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
                        ]
                    },
                    {
                        xtype: 'form',
                        id: 'fm_log',
                        bind: {
                            title: '{syslog_server}'
                        },
                        dockedItems: [
                            {
                                xtype: 'toolbar',
                                dock: 'top',
                                cls: 'zen_toolbar',
                                items: [
                                    {
                                        xtype: 'button',
                                        iconCls: 'ic_add',
                                        bind: {
                                            text: '{add}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'ic_del',
                                        bind: {
                                            text: '{del}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick1'
                                        }
                                    }
                                ]
                            }
                        ],
                        items: [
                            {
                                xtype: 'gridpanel',
                                id: 'grid_list',
                                margin: '5 0 0 0',
                                columnLines: true,
                                store: 'store_logserver_syslist',
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        width: 60,
                                        align: 'center',
                                        dataIndex: '_num',
                                        text: 'N'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'ip',
                                        flex: 0.5,
                                        bind: {
                                            text: '{ip}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'port',
                                        flex: 0.5,
                                        bind: {
                                            text: '{port}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return "SYSLOG("+value+")";
                                        },
                                        dataIndex: 'log',
                                        flex: 0.5,
                                        bind: {
                                            text: '{log}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return '<input type="button" class="b_sq_'+value+'" style="border:none" />';
                                        },
                                        id: 'c_ipsec',
                                        width: 100,
                                        align: 'center',
                                        dataIndex: 'chk_enc',
                                        bind: {
                                            text: '{encryption}'
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
                    },
                    {
                        xtype: 'form',
                        bind: {
                            title: '{snmp}'
                        },
                        dockedItems: [
                            {
                                xtype: 'toolbar',
                                dock: 'top',
                                cls: 'zen_toolbar',
                                items: [
                                    {
                                        xtype: 'button',
                                        iconCls: 'ic_add',
                                        bind: {
                                            text: '{add}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick4'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'ic_del',
                                        bind: {
                                            text: '{del}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick5'
                                        }
                                    },
                                    {
                                        xtype: 'tbseparator'
                                    },
                                    {
                                        xtype: 'button',
                                        bind: {
                                            text: '{mib_list}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick6'
                                        }
                                    }
                                ]
                            }
                        ],
                        items: [
                            {
                                xtype: 'gridpanel',
                                cls: 'tbl_fw',
                                id: 'system_snmp_list',
                                margin: '5 0 0 0',
                                columnLines: true,
                                store: 'store_system_snmp_list',
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        width: 60,
                                        align: 'center',
                                        dataIndex: 'num',
                                        text: 'N'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        minWidth: 100,
                                        dataIndex: 'ip_type',
                                        flex: 0.5,
                                        bind: {
                                            text: '{ip_type}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var rec = view.getStore().getAt(rowIndex);

                                            if(rec.get('snmp_type') === 'snmpv3'){
                                                return rec.get('user_name');
                                            }else{
                                                return rec.get('community');
                                            }
                                        },
                                        minWidth: 150,
                                        dataIndex: 'community',
                                        flex: 1,
                                        bind: {
                                            text: '{user_name_comm}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var rec = view.getStore().getAt(rowIndex);
                                            return (rec.get('trap_ip') === '')? "-":rec.get('trap_ip');
                                        },
                                        minWidth: 150,
                                        dataIndex: 'trap_ip',
                                        flex: 1,
                                        bind: {
                                            text: '{trap_address}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var rec = view.getStore().getAt(rowIndex);

                                            return (rec.get('snmp_type') === 'snmpv2')? "-":rec.get('auth_algo');
                                        },
                                        minWidth: 150,
                                        dataIndex: 'auth_algo',
                                        flex: 1,
                                        bind: {
                                            text: '{auth_algorithm}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var rec = view.getStore().getAt(rowIndex);

                                            return (rec.get('snmp_type') === 'snmpv2')? "-":rec.get('privacy_algo');
                                        },
                                        dataIndex: 'privacy_algo',
                                        flex: 1,
                                        bind: {
                                            text: '{pwd_algorithm}'
                                        }
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        id: 'action',
                                        width: 100,
                                        align: 'center',
                                        renderTpl: [
                                            '<div id="{id}-titleEl" data-ref="titleEl" {tipMarkup}class="',
                                            'x-',
                                            'column-header-inner<tpl if="!$comp.isContainer"> ',
                                            'x-',
                                            'leaf-column-header</tpl>',
                                            '<tpl if="empty"> ',
                                            'x-',
                                            'column-header-inner-empty</tpl>">',
                                            '<span class="',
                                            'x-',
                                            'column-header-text-container">',
                                            '<span class="',
                                            'x-',
                                            'column-header-text-wrapper">',
                                            '<span id="{id}-textEl" data-ref="textEl" class="',
                                            'x-',
                                            'column-header-text',
                                            '{childElCls}">',
                                            '{[__zen(\'operating\')]}',
                                            '</span>',
                                            '</span>',
                                            '</span>',
                                            '<tpl if="!menuDisabled">',
                                            '<div id="{id}-triggerEl" data-ref="triggerEl" role="presentation" class="',
                                            'x-',
                                            'column-header-trigger',
                                            '{childElCls}" style="{triggerStyle}"></div>',
                                            '</tpl>',
                                            '</div>',
                                            '{%this.renderContainer(out,values)%}'
                                        ],
                                        items: [
                                            {
                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                    return (r.get('snmp_type') === 'snmpv3')? "b_v3":"b_v3_off";
                                                }
                                            },
                                            {
                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                    return (r.get('snmp_use') === 'on')? "b_sq_on":"b_sq_off";
                                                },
                                                handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                    var rec = view.getStore().getAt(rowIndex);
                                                    snmp_use = rec.get("snmp_use");

                                                    snmp_use = (snmp_use === "on")? "off":"on";

                                                    if(get_zenauth() === true){
                                                        return false;
                                                    }

                                                    var _param = {

                                                        sid : Ext.encode(rec.get("sid")),
                                                        value : Ext.encode(snmp_use)
                                                    };

                                                    request_helper.xmlrpc_call_JsonP(
                                                    'ftuctrl',
                                                    'set_system_snmp_use',
                                                    _param,
                                                    function(response){

                                                        Ext.data.StoreManager.lookup('store_system_snmp_list').load();
                                                    }
                                                    );
                                                }
                                            }
                                        ]
                                    }
                                ],
                                viewConfig: {
                                    getRowClass: function(record, rowIndex, rowParams, store) {
                                        if(record.get("snmp_use") === "off"){

                                            Ext.Function.defer(function(){
                                                this.removeRowCls(rowIndex, 'x-grid-row-alt');
                                            },100, this);

                                            return "stOff";
                                        }
                                    }
                                },
                                selModel: {
                                    selType: 'checkboxmodel'
                                },
                                listeners: {
                                    celldblclick: 'onSystem_snmp_listCellDblClick'
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

    onXtm_smc_useChange: function(field, newValue, oldValue, eOpts) {
        var ip = Ext.getCmp("xtm_ip");

        if(newValue === "on"){

            ip.disable();
        }else{

            ip.enable();
        }
    },

    onXtm_ipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg3");
    },

    onXtm_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onXtm_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onXtm_portErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg3");
    },

    onXtm_portKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onXtm_portFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1 ~ 65535';
        setTipFocus(this,component);
    },

    onXtm_portBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;

        var smc_use = Ext.getCmp("xtm_smc_use");
        var port = Ext.getCmp("xtm_port");
        var ip = Ext.getCmp("xtm_ip");
        var chk_ipsec = Ext.getCmp("xtm_chk_ipsec");

        if(port.isValid()===false){ port.focus(); return false; }
        if(smc_use.getValue() === "off"){
            if(ip.isValid()===false){ ip.focus(); return false; }
        }

        var obj = {
            '_kind': 'weguardia',
            'chk_ipsec': (chk_ipsec.getValue())?"on":"off",
            'ip': (smc_use.getValue()==="off")?ip.getValue():"",
            'port': port.getValue(),
            'smc_use': smc_use.getValue()
        };

        if(me._id){
            obj._id = me._id;
        }

        var update = (me._id)?true:false;

        var _params = {

            basename: Ext.encode("syslog_setting"),
            obj: Ext.encode(obj),
            update: Ext.encode(update)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setListTypeObj',
            _params,
            function(response){

                Ext.Msg.alert("WeGuardia™ ZEN",get_msg("msg_ok_add"));
                Ext.data.StoreManager.lookup("store_logserver_syslist").load();
                me.init_logserver();
            }
        );
    },

    onButtonClick3: function(button, e, eOpts) {
        this.init_logserver();
    },

    onButtonClick: function(button, e, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_logserver_syslist");

        if(_store.getTotalCount() >= 5){

            Ext.Msg.alert("WeGuardia™ ZEN",ValidMaxCnt(5));
        }else{

            var win = Ext.create('NFW2.view.win_syslog');
            win.show();

        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var grid = Ext.getCmp("grid_list");
        var grid_chk = grid.getSelectionModel().getSelection();

        if(grid_chk.length === 0){
            Ext.Msg.alert("WeGuardia™ ZEN",get_msg("sel_del"));
            return false;
        }

        Ext.MessageBox.confirm("WeGuardia™ ZEN",get_msg("conf_del"),function(btn){
            if(btn === "yes"){
                var del = new Array();
                for(var i=0; i<grid_chk.length; i++){

                    del.push(grid_chk[i].data._id);

                }

                var _params = {

                    basename : Ext.encode("syslog_setting"),
                    ids : Ext.encode(del),
                    renum_info : Ext.encode({'fieldname':'_num'})
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'delListTypeObj',
                    _params,
                    function(reesponse){

                        Ext.data.StoreManager.lookup("store_logserver_syslist").load();
                    }
                );
            }
        });
    },

    onGrid_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('NFW2.view.win_syslog',{
            edit: "edit",
            record: record.data,
            num: rowIndex+1
        });
        win.show();
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        me.fieldInfo = makeZenTip();

        me.init_logserver();

        Ext.data.StoreManager.lookup("store_logserver_syslist").load();
        Ext.data.StoreManager.lookup('store_system_snmp_list').load();
    },

    onButtonClick4: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_snmp',{
            modal : true
        });

        var store = Ext.getCmp('system_snmp_list').getStore();
        var totalv2 = 0;
        var totalv3 = 0;

        store.each(function(r){
            if(r.data.snmp_type === 'snmpv2') {
                totalv2++;
            }

            if(r.data.snmp_type === 'snmpv3') {
                totalv3++;
            }
        });

        if(totalv2 >= 5 && totalv3 >= 1){

            Ext.Msg.show({
                title: 'WeGuardia™ ZEN',
                msg: get_msg("err_snmpcnt"),
                width: 300,
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO
            });

        }else{
            win.show();
        }
    },

    onButtonClick5: function(button, e, eOpts) {
        var tbl = Ext.getCmp("system_snmp_list");
        var tbl_sel = tbl.getSelectionModel().getSelection();

        if(tbl_sel.length === 0){

            Ext.Msg.alert("WeGuardia™ ZEN",get_msg("sel_del"));
            return false;

        }else{

            Ext.MessageBox.confirm("WeGuardia™ ZEN",get_msg("conf_del"),function(btn){

                if(btn === "yes"){

                    var del = [];

                    for(var i=0; i<tbl_sel.length; i++){
                        del.push(tbl_sel[i].data.sid);
                    }

                    var sid_list = del;

                    var _param = {
                        sid_list : Ext.encode(sid_list)
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'del_system_snmp',
                        _param,
                        function(response){
                            Ext.data.StoreManager.lookup('store_system_snmp_list').load();
                        }
                    );
                }
            });

        }
    },

    onButtonClick6: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_oid',{
            modal : true
        });
        win.show();

    },

    onSystem_snmp_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var rec = tableview.getStore().getAt(rowIndex);

        var win = Ext.create('NFW2.view.win_snmp',{
            edit : "edit",
            record: record.data,
            modal : true
        });

        win.show();

    },

    init_logserver: function() {
        var me = this;

        var _params = {
            basename: Ext.encode("syslog_setting"),
            key: Ext.encode({'_kind':'weguardia'})
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){

                hideLoadMask();

                if(response){
                    Ext.getCmp("xtm_ip").reset();
                    me._id = response._id;

                    Ext.getCmp("xtm_smc_use").setValue(response.smc_use);
                    Ext.getCmp("xtm_port").setValue(response.port);
                    if(response.smc_use === "off"){
                        Ext.getCmp("xtm_ip").setValue(response.ip);
                    }
                    if(response.chk_ipsec === "on"){
                        Ext.getCmp("xtm_chk_ipsec").setValue(true);
                    }
                }else{
                    Ext.getCmp("fm_log").getForm().reset();
                }
            }
        );
    }

});