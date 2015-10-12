
Ext.define('NFW2.view.NFW2_ssl_basic', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_ssl_basic',

    requires: [
        'NFW2.view.NFW2_ssl_basicViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Checkbox',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.column.Action',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.XTemplate',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_ssl_basic'
    },
    cls: 'zen_body',
    id: 'NFW2_basic',
    width: 900,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            flex: 1,
            id: 'fm_ssl',
            bodyPadding: 10,
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(!ValidNum(value)){ return get_msg('err_form'); }
                                if(!LengthCheck(value, 1024, 65530)){ return ValidLimit('1024', '65530'); }

                                return true;
                            },
                            fieldInfo: '',
                            cls: 'lb_req',
                            id: 'ssl_port',
                            width: 380,
                            labelSeparator: ' ',
                            labelWidth: 200,
                            msgTarget: 'none',
                            value: '4886',
                            enforceMaxLength: true,
                            maskRe: /[0-9.]/,
                            maxLength: 5,
                            bind: {
                                fieldLabel: '{ssl_tunnel_port}'
                            },
                            listeners: {
                                errorchange: 'onSsl_portErrorChange',
                                keydown: 'onSsl_portKeydown',
                                focus: 'onSsl_portFocus',
                                blur: 'onSsl_portBlur'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            width: 215,
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chk_ssl',
                                    style: 'color:#666',
                                    fieldLabel: '',
                                    labelSeparator: ' ',
                                    boxLabelAlign: 'before',
                                    listeners: {
                                        change: 'onCheckboxfieldChange1',
                                        beforerender: 'onChk_sslBeforeRender'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            padding: '5 0 0 0',
                            items: [
                                {
                                    xtype: 'container',
                                    disabled: true,
                                    id: 'con_split',
                                    items: [
                                        {
                                            xtype: 'container',
                                            items: [
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
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '5 0 0 0 ',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    cls: 'in_grid',
                                                    id: 'grid_list',
                                                    maxHeight: 168,
                                                    width: 300,
                                                    title: '',
                                                    columnLines: true,
                                                    disableSelection: true,
                                                    enableColumnHide: false,
                                                    enableColumnMove: false,
                                                    enableColumnResize: false,
                                                    store: 'store_sslplus_split',
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.tdCls = 'cell_text';
                                                                return value;
                                                            },
                                                            dataIndex: 'ip',
                                                            text: 'IP/Prefix',
                                                            flex: 1,
                                                            editor: {
                                                                xtype: 'textfield',
                                                                baseCls: 'cell_text',
                                                                listeners: {
                                                                    focus: 'onTextfieldFocus',
                                                                    blur: 'onTextfieldBlur'
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.tdCls = 'cell_text';
                                                                return value;
                                                            },
                                                            dataIndex: 'gateway',
                                                            flex: 1,
                                                            bind: {
                                                                text: '{gateway}'
                                                            },
                                                            editor: {
                                                                xtype: 'textfield',
                                                                baseCls: 'cell_text',
                                                                listeners: {
                                                                    focus: 'onTextfieldFocus2',
                                                                    blur: 'onTextfieldBlur2'
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'actioncolumn',
                                                            width: 30,
                                                            align: 'center',
                                                            items: [
                                                                {
                                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                        Ext.getCmp("grid_list").getStore().removeAt(rowIndex);
                                                                    },
                                                                    getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                                        return "icr_del";
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    viewConfig: {
                                                        markDirty: false
                                                    },
                                                    plugins: [
                                                        {
                                                            ptype: 'cellediting',
                                                            pluginId: 'cell_split',
                                                            clicksToEdit: 1
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
                },
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            width: 215,
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'x-field x-form-item-label x-form-item-label-default',
                                    bind: {
                                        text: '{rent_ip_range}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'label',
                                    margin: '5 0 0 0',
                                    text: '192.168.100.2-192.168.100.254'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    id: 'auth',
                    margin: '5 0 0 0 ',
                    width: 450,
                    labelSeparator: ' ',
                    labelWidth: 200,
                    value: '0',
                    editable: false,
                    displayField: 'name',
                    queryMode: 'local',
                    store: 'store_sslplus_auth',
                    valueField: 'val',
                    bind: {
                        fieldLabel: '{device_auth}'
                    }
                },
                {
                    xtype: 'container',
                    id: 'con_block',
                    margin: '5 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            width: 215,
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'x-field x-form-item-label x-form-item-label-default',
                                    bind: {
                                        text: '{dl_ip_range}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            iconCls: 'icb_add',
                                            bind: {
                                                text: '{add}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick4'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            bind: {
                                                text: '{import_split_routing}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick5'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '5 0 0 0 ',
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            cls: 'in_grid',
                                            id: 'grid_block',
                                            maxHeight: 168,
                                            width: 300,
                                            title: '',
                                            columnLines: true,
                                            disableSelection: true,
                                            enableColumnHide: false,
                                            enableColumnMove: false,
                                            enableColumnResize: false,
                                            store: 'store_sslplus_block',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.tdCls = "cell_text";
                                                        return value;
                                                    },
                                                    dataIndex: 'ip',
                                                    text: 'IP/Prefix',
                                                    flex: 1,
                                                    editor: {
                                                        xtype: 'textfield',
                                                        baseCls: 'cell_text',
                                                        listeners: {
                                                            focus: 'onTextfieldFocus1',
                                                            blur: 'onTextfieldBlur1'
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'actioncolumn',
                                                    width: 30,
                                                    align: 'center',
                                                    items: [
                                                        {
                                                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                                return "icr_del";
                                                            },
                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                Ext.getCmp("grid_block").getStore().removeAt(rowIndex);
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            viewConfig: {
                                                markDirty: false
                                            },
                                            plugins: [
                                                {
                                                    ptype: 'cellediting',
                                                    pluginId: 'cell_block',
                                                    clicksToEdit: 1
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    id: 'encrypt',
                    margin: '5 0 0 0',
                    width: 380,
                    labelSeparator: ' ',
                    labelWidth: 200,
                    editable: false,
                    displayField: 'name',
                    queryMode: 'local',
                    store: 'store_sslplus_encry',
                    valueField: 'name',
                    bind: {
                        fieldLabel: '{symmetrickey_algo}'
                    }
                },
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var me = Ext.getCmp("NFW2_basic");

                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(!LengthCheck(removeComma(value), 60, 3600)){ return ValidLimit(60, '3,600'); }

                                return true;
                            },
                            cls: [
                                'inp_unit',
                                'lb_req'
                            ],
                            id: 'c_timeout',
                            width: 350,
                            afterBodyEl: [
                                '<div class="inp_after">{[__zen(\'sec\')]}</div>'
                            ],
                            labelSeparator: ' ',
                            labelWidth: 200,
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9.]/,
                            maxLength: 5,
                            bind: {
                                fieldLabel: '{client_timeout}'
                            },
                            listeners: {
                                errorchange: 'onC_timeoutErrorChange',
                                keydown: 'onC_timeoutKeydown',
                                focus: 'onC_timeoutFocus',
                                blur: 'onC_timeoutBlur',
                                change: 'onC_timeoutChange'
                            }
                        },
                        {
                            xtype: 'label',
                            margin: '0 0 0 15',
                            bind: {
                                text: '{ssl_info1}'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender'
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
    ],

    onSsl_portErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onSsl_portKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onSsl_portFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1024 ~ 65530';
        setTipFocus(this,component);
    },

    onSsl_portBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onCheckboxfieldChange1: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp("con_split").enable();
        }else{
            Ext.getCmp("con_split").disable();
        }
    },

    onChk_sslBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('split_routing');
    },

    onButtonClick: function(button, e, eOpts) {
        var store = Ext.data.StoreManager.lookup("store_sslplus_split");

        if(store.data.length >= 32){
            Ext.MessageBox.alert(__weguardia,ValidMaxCnt(32));
            return false;
        }
        store.add({'ip':'','gateway':''});
    },

    onTextfieldFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s2p');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onTextfieldBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
    },

    onTextfieldFocus2: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onTextfieldBlur2: function(component, event, eOpts) {
        setTipBlur(this,component);
    },

    onButtonClick4: function(button, e, eOpts) {
        var store = Ext.data.StoreManager.lookup("store_sslplus_block");

        if(store.data.length >= 32){
            Ext.MessageBox.alert(__weguardia,ValidMaxCnt(32));
            return false;
        }
        store.add({'ip':''});
    },

    onButtonClick5: function(button, e, eOpts) {
        var s_store = Ext.data.StoreManager.lookup("store_sslplus_split");
        var b_store = Ext.data.StoreManager.lookup("store_sslplus_block");

        var block = [];

        for(var l=0; l<b_store.data.length; l++){
            if(b_store.data.items[l].data.ip === ''){ continue; }
            block.push({
                'ip': b_store.data.items[l].data.ip
            });
        }
        var _n = 0;
        for(var i=0; i<s_store.data.length; i++){
            if(s_store.data.items[i].data.ip === ''){ continue; }
            block.push({
                'ip': s_store.data.items[i].data.ip
            });
            _n++;
        }

        if(_n === 0){ Ext.Msg.alert(__weguardia,get_msg('err_split_routing')); }

        if(block.length > 32){
            Ext.MessageBox.alert(__weguardia,ValidMaxCnt(32));
            return false;
        }

        b_store.loadData(block);
    },

    onTextfieldFocus1: function(component, event, eOpts) {
        var str = disp_help_ip('4s2p');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onTextfieldBlur1: function(component, event, eOpts) {
        setTipBlur(this,component);
    },

    onC_timeoutErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onC_timeoutKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onC_timeoutFocus: function(component, event, eOpts) {
        var me = Ext.getCmp("NFW2_basic");
        var max = (me.cc)?600:3600;

        component.fieldInfo = __zen('input_range')+"60 ~ "+max;
        setTipFocus(this,component);
    },

    onC_timeoutBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onC_timeoutChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);
        field.setValue(addComma(value));
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        me.fieldInfo = makeZenTip();

        var store = Ext.data.StoreManager.lookup("store_sslplus_encry");
        var _store_auth = Ext.data.StoreManager.lookup("store_sslplus_auth");

        var record = [
            {
                name: __zen('unused'),
                val: '0'
            },
            {
                name: __zen('device_auth_user'),
                val: '1'
            }
        ];
        _store_auth.loadData(record);

        var _record = [
            {
                name: 'AES-128-CBC'
            },
            {
                name: 'AES-192-CBC'
            },
            {
                name: 'AES-256-CBC'
            },
            {
                name: 'SEED'
            },
            {
                name: 'ARIA128'
            },
            {
                name: 'ARIA192'
            },
            {
                name: 'ARIA256'
            }
        ];
        store.loadData(_record);

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'isCC',
            {},
            function(response){

                me.cc = response;

                if(response === true){
                    store.removeAt(0,3);
                    _store_auth.removeAt(0,1);
                }

                me.get_sslplus_basic();
            }
        );
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;

        var port = Ext.getCmp("ssl_port");
        var chk_ssl = Ext.getCmp("chk_ssl");

        var grid_list = Ext.getCmp("grid_list");

        var auth = Ext.getCmp("auth");
        var timeout = Ext.getCmp("c_timeout");

        if(port.isValid()===false){ port.focus(); return false; }
        if(timeout.isValid()===false){ timeout.focus(); return false; }

        var obj = {};

        obj.service_port = Number(port.getValue());
        obj.split_route_use = (chk_ssl.getValue())?1:0;

        if(chk_ssl.getValue()){
            var split = [];

            if(grid_list.getStore().data.length > 0){

                var s_split = grid_list.getStore();
                for(var i in s_split.data.items){
                    if(!CheckNotNull(s_split.data.items[i].data.ip)){
                        prt_errMsg(get_msg('err_null'), null);
                        grid_list.getPlugin('cell_split').startEdit(Number(i),0);
                        return false;
                    }
                    var str = s_split.data.items[i].data.ip.split("/");
                    if(!ValidIPAddress(str[0]) || !str[1] || !LengthCheck(str[1],1,32)){
                        prt_errMsg("Prefix "+get_msg('err_form'),null);
                        grid_list.getPlugin("cell_split").startEdit(Number(i),0);
                        return false;
                    }
                    if(s_split.data.items[i].data.gateway !== ""){
                        if(!ValidIPAddress(s_split.data.items[i].data.gateway)){
                            prt_errMsg(get_msg('err_form'),null);
                            grid_list.getPlugin("cell_split").startEdit(Number(i),1);
                            return false;
                        }
                    }

                    split.push({
                        'ip': str[0],
                        'cidr': str[1],
                        'gateway': s_split.data.items[i].data.gateway
                    });
                }
            }
            obj.route_list = split;
        }

        var b_store = Ext.data.StoreManager.lookup("store_sslplus_block");

        var block = [];
        for(var i=0; i<b_store.data.length; i++){

            var item = b_store.data.items[i].data;
            if(!CheckNotNull(item.ip)){
                prt_errMsg(get_msg('err_null'), null);
                Ext.getCmp("grid_block").getPlugin('cell_block').startEdit(Number(i),0);
                return false;
            }
            var str = item.ip.split("/");
            if(!ValidIPAddress(str[0]) || !str[1] || !LengthCheck(str[1],1,32)){
                prt_errMsg("Prefix "+get_msg('err_form'),null);
                Ext.getCmp("grid_block").getPlugin("cell_block").startEdit(Number(i),0);
                return false;
            }
            block.push({
                'ip': str[0],
                'cidr': str[1]
            });
        }
        obj.deny_ip_list = block;

        obj.lease_ip = [
            {
                'start_ip': '192.168.100.2',
                'end_ip': '192.168.100.254'
            }
        ];

        obj.client_auth = Number(auth.getValue());
        obj.protocol = "TCP";
        obj.auth_method = "1";
        obj.encryptions = Ext.getCmp("encrypt").getValue();
        obj.internal_ip = "";
        obj.idle_time_out = Number(removeComma(timeout.getValue()));

        prt_errMsg(null, null);

        var _params = {
            basename: Ext.encode('sslplus_default_config'),
            obj: Ext.encode(obj)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params,
            function(response){

                me.get_sslplus_basic();
                Ext.Msg.alert(__weguardia,get_msg("msg_ok_add"));

                var _param = {
                    func_name: Ext.encode('mod_ssl_auth_set_config')
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'execKctrlFunc',
                    _param,
                    function(response){

                    }
                );
            }
        );
    },

    onButtonClick3: function(button, e, eOpts) {
        prt_errMsg(null, null);
        this.get_sslplus_basic();
    },

    get_sslplus_basic: function() {
        var me = this;

        var _params = {
            basename: Ext.encode('sslplus_default_config')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){

                hideLoadMask();

                if(response !== null){

                    Ext.getCmp("ssl_port").setValue(response.service_port);
                    if(response.split_route_use === 1){
                        Ext.getCmp("chk_ssl").setValue(true);
                    }

                    if(response.route_list){
                        var split = response.route_list;
                        var s_record = [];
                        for(var i=0; i<split.length; i++){
                            s_record.push({
                                'ip':split[i].ip+'/'+split[i].cidr,
                                'gateway':split[i].gateway
                            });
                        }
                        Ext.StoreManager.lookup("store_sslplus_split").loadData(s_record);
                    }else{
                        Ext.StoreManager.lookup("store_sslplus_split").removeAll();
                    }

                    Ext.getCmp("auth").setValue(String(response.client_auth));

                    if(response.deny_ip_list){
                        var block = response.deny_ip_list;
                        var b_record = [];
                        for(var i=0; i<block.length; i++){
                            b_record.push({
                                'ip':block[i].ip+'/'+block[i].cidr
                            });
                        }
                        Ext.StoreManager.lookup("store_sslplus_block").loadData(b_record);
                    }else{
                        Ext.StoreManager.lookup("store_sslplus_block").removeAll();
                    }

                    Ext.getCmp("encrypt").setValue(response.encryptions);
                    Ext.getCmp("c_timeout").setValue(addComma(response.idle_time_out));
                }else{

                    Ext.getCmp("fm_ssl").getForm().reset();
                    Ext.getCmp("c_timeout").setValue("3,600");
                    Ext.getCmp("encrypt").setValue("AES-128-CBC");

                    Ext.StoreManager.lookup("store_sslplus_split").removeAll();
                }
            }
        );
    }

});