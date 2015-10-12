
Ext.define('NFW2.view.NFW2_ipsec_etc', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_ipsec_etc',

    requires: [
        'NFW2.view.NFW2_ipsec_etcViewModel',
        'Ext.form.Panel',
        'Ext.XTemplate',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel'
    ],

    viewModel: {
        type: 'nfw2_ipsec_etc'
    },
    cls: 'zen_body',
    id: 'NFW2_etc',
    width: 900,
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender',
        beforerender: 'onPanelBeforeRender'
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
                    itemId: 'fld_msg',
                    margin: '5 0 0 0'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onButtonClick4'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick5'
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
                        bodyPadding: 10,
                        items: [
                            {
                                xtype: 'container',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        validator: function(value) {
                                            if(value === true){ return true; }
                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                            if(!LengthCheck(removeComma(value), 0, 3600)){ return ValidLimit(0, '3,600'); }

                                            return true;
                                        },
                                        cls: [
                                            'inp_unit',
                                            'lb_req'
                                        ],
                                        id: 'timeout',
                                        afterBodyEl: [
                                            '<div class="inp_after">{[__zen("sec")]}</div>'
                                        ],
                                        labelSeparator: ' ',
                                        labelWidth: 150,
                                        msgTarget: 'none',
                                        value: '30',
                                        enableKeyEvents: true,
                                        enforceMaxLength: true,
                                        maskRe: /[0-9]/,
                                        maxLength: 5,
                                        bind: {
                                            fieldLabel: '{tunnel_timeout}'
                                        },
                                        listeners: {
                                            errorchange: 'onTextfieldErrorChange',
                                            focus: 'onTextfieldFocus',
                                            blur: 'onTextfieldBlur',
                                            keydown: 'onTimeoutKeydown',
                                            change: 'onTimeoutChange'
                                        }
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        id: 'chk_relay',
                                        labelSeparator: ' ',
                                        labelWidth: 150,
                                        bind: {
                                            fieldLabel: '{hub_spoke}'
                                        },
                                        listeners: {
                                            change: 'onCheckboxfieldChange1'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        disabled: true,
                                        id: 'con_relay',
                                        items: [
                                            {
                                                xtype: 'combobox',
                                                id: 'interface',
                                                labelSeparator: ' ',
                                                labelWidth: 150,
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
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value === true){ return true; }
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    if(!ValidMAC(value)){ return ValidIP("목적지 MAC"); }

                                                    return true;
                                                },
                                                cls: 'lb_req',
                                                id: 'relay_mac',
                                                labelSeparator: ' ',
                                                labelWidth: 150,
                                                msgTarget: 'none',
                                                bind: {
                                                    fieldLabel: '{dmac}'
                                                },
                                                listeners: {
                                                    errorchange: 'onRelay_macErrorChange',
                                                    blur: 'onRelay_macBlur'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        layout: 'table',
                                        items: [
                                            {
                                                xtype: 'checkboxfield',
                                                id: 'ike',
                                                labelSeparator: ' ',
                                                labelWidth: 150,
                                                bind: {
                                                    fieldLabel: '{ike_virtual_ip}'
                                                },
                                                listeners: {
                                                    change: 'onIkeChange'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value === true){ return true; }
                                                    if(Ext.getCmp("ike").getValue()){
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    }
                                                    if(!ValidIPAddress(value) && !ValidIPv6(value)){ return get_msg('err_form'); }

                                                    return true;
                                                },
                                                cls: 'lb_req',
                                                disabled: true,
                                                id: 'ike_ip',
                                                fieldLabel: '&nbsp;',
                                                labelSeparator: ' ',
                                                labelWidth: 0,
                                                listeners: {
                                                    errorchange: 'onIke_ipErrorChange',
                                                    focus: 'onIke_ipFocus',
                                                    blur: 'onIke_ipBlur'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        bind: {
                                            title: '{dr_auto}'
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
                                                id: 'grid_dr_list',
                                                margin: '5 0 0 0',
                                                title: '',
                                                columnLines: true,
                                                store: 'store_etc_dr_list',
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var tunnel_ip = [];

                                                            for(var i=0; i<record.data.count; i++){
                                                                var l = i+1;
                                                                eval('var _ip = record.data.tunnel_ip'+l+';');
                                                                tunnel_ip.push('<div style="padding:5px 10px 4px 10px">'+_ip+'</div>');
                                                            }

                                                            if(record.data.count === 1){
                                                                return record.data.tunnel_ip1;
                                                            }else{
                                                                metaData.style = 'padding:0;margin:0;';
                                                                return tunnel_ip.join('<div style="height:1px;width:100%;background:#ededed;">&nbsp;</div>');
                                                            }
                                                        },
                                                        dataIndex: 'tunnel_ip',
                                                        flex: 1,
                                                        bind: {
                                                            text: '{tunnel_ip}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var dr_tunnel_ip = [];

                                                            for(var i=0; i<record.data.count; i++){
                                                                var l = i+1;
                                                                eval('var _ip = record.data.dr_tunnel_ip'+l+';');
                                                                dr_tunnel_ip.push('<div style="padding:5px 10px 4px 10px">'+_ip+'</div>');
                                                            }

                                                            if(record.data.count === 1){
                                                                return record.data.dr_tunnel_ip1;
                                                            }else{
                                                                metaData.style = 'padding:0;margin:0;';
                                                                return dr_tunnel_ip.join('<div style="height:1px;width:100%;background:#ededed;">&nbsp;</div>');
                                                            }
                                                        },
                                                        dataIndex: 'dr_tunnel_ip',
                                                        flex: 1,
                                                        bind: {
                                                            text: '{dr_tunnel_ip}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return addComma(value);
                                                        },
                                                        dataIndex: 'dr_timeout',
                                                        flex: 0.5,
                                                        bind: {
                                                            text: '{dr_con_timeout}'
                                                        }
                                                    }
                                                ],
                                                selModel: Ext.create('Ext.selection.CheckboxModel', {
                                                    selType: 'checkboxmodel'
                                                }),
                                                listeners: {
                                                    celldblclick: 'onGrid_dr_listCellDblClick'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        bind: {
                                            title: '{tunnel_routing}'
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
                                                            click: 'onButtonClick2'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        iconCls: 'ic_del',
                                                        bind: {
                                                            text: '{del}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick3'
                                                        }
                                                    }
                                                ]
                                            }
                                        ],
                                        items: [
                                            {
                                                xtype: 'gridpanel',
                                                id: 'grid_tunnel_list',
                                                margin: '5 0 0 0',
                                                maxHeight: 283,
                                                scrollable: true,
                                                title: '',
                                                columnLines: true,
                                                store: 'store_etc_tunnel_list',
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if(value === "ip"){
                                                                value = record.data.src;
                                                            }else{
                                                                value = value.substring(0,1).toUpperCase()+value.substring(1);
                                                            }

                                                            return value;
                                                        },
                                                        dataIndex: 'src_type',
                                                        flex: 1,
                                                        bind: {
                                                            text: '{src}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if(value === "ip"){
                                                                value = record.data.dest;
                                                            }else{
                                                                value = value.substring(0,1).toUpperCase()+value.substring(1);
                                                            }

                                                            return value;
                                                        },
                                                        dataIndex: 'dest_type',
                                                        flex: 1,
                                                        bind: {
                                                            text: '{dest}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'tunnel_ip',
                                                        flex: 1,
                                                        bind: {
                                                            text: '{tunnel_ip}'
                                                        }
                                                    }
                                                ],
                                                selModel: Ext.create('Ext.selection.CheckboxModel', {
                                                    selType: 'checkboxmodel'
                                                }),
                                                listeners: {
                                                    celldblclick: 'onGrid_tunnel_listCellDblClick'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        bind: {
                                            title: '{xauth_user}'
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
                                                            click: 'onButtonClick21'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        iconCls: 'ic_del',
                                                        bind: {
                                                            text: '{del}'
                                                        },
                                                        listeners: {
                                                            click: 'onButtonClick31'
                                                        }
                                                    }
                                                ]
                                            }
                                        ],
                                        items: [
                                            {
                                                xtype: 'gridpanel',
                                                id: 'grid_xauth_list',
                                                margin: '5 0 0 0',
                                                title: '',
                                                columnLines: true,
                                                store: 'store_etc_xauth_list',
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
                                                        dataIndex: 'id',
                                                        flex: 1,
                                                        bind: {
                                                            text: '{user_id}'
                                                        }
                                                    }
                                                ],
                                                selModel: Ext.create('Ext.selection.CheckboxModel', {
                                                    selType: 'checkboxmodel'
                                                }),
                                                listeners: {
                                                    celldblclick: 'onGrid_tunnel_listCellDblClick1'
                                                }
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

    onTextfieldErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'0 ~ 3,600';
        setTipFocus(this,component);
    },

    onTextfieldBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onTimeoutKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onTimeoutChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);
        field.setValue(addComma(value));
    },

    onCheckboxfieldChange1: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp("con_relay").enable();
        }else{
            Ext.getCmp("con_relay").disable();
        }
    },

    onRelay_macErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onRelay_macBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onIkeChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp("ike_ip").enable();
        }else{
            Ext.getCmp("ike_ip").disable();
        }
    },

    onIke_ipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onIke_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onIke_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onButtonClick: function(button, e, eOpts) {
        var store = Ext.data.StoreManager.lookup("store_etc_dr_list");

        if(store.data.length >= 4){
            Ext.Msg.alert(__weguardia,ValidMaxCnt(4));
            return false;
        }

        var win = Ext.create('NFW2.view.win_etc_dr_automation');
        win.show();
    },

    onButtonClick1: function(button, e, eOpts) {
        var grid = Ext.getCmp("grid_dr_list");
        var grid_chk = grid.getSelectionModel().getSelection();

        if(grid_chk.length === 0){
            Ext.Msg.alert(__weguardia,get_msg("sel_del"));
            return false;
        }else{

            Ext.MessageBox.confirm(__weguardia,get_msg("conf_del"), function(btn){
                if(btn === "yes"){

                    var store = Ext.data.StoreManager.lookup("store_etc_dr_list");

                    for(var i=0; i<grid_chk.length; i++){
                        store.remove(grid_chk[i]);
                    }

                    var data = store.data.items;
                    var l = 1;
                    for(var i=0; i<data.length; i++){
                        data[i].data.num = l;
                        l++;
                    }
                    store.loadData(data);
                }
            });
        }
    },

    onGrid_dr_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('NFW2.view.win_etc_dr_automation',{
            edit: "edit",
            record: record.data,
            num: rowIndex+1
        });
        win.show();
    },

    onButtonClick2: function(button, e, eOpts) {
        var store = Ext.data.StoreManager.lookup("store_etc_tunnel_list");

        if(store.data.length >= 128){
            Ext.Msg.alert(__weguardia,ValidMaxCnt(128));
            return false;
        }

        var win = Ext.create('NFW2.view.win_etc_tunnel_routing');
        win.show();
    },

    onButtonClick3: function(button, e, eOpts) {
        var grid = Ext.getCmp("grid_tunnel_list");
        var grid_chk = grid.getSelectionModel().getSelection();

        if(grid_chk.length === 0){
            Ext.Msg.alert(__weguardia,get_msg("sel_del"));
            return false;
        }else{

            Ext.MessageBox.confirm(__weguardia,get_msg("conf_del"), function(btn){
                if(btn === "yes"){

                    var store = Ext.data.StoreManager.lookup("store_etc_tunnel_list");

                    for(var i=0; i<grid_chk.length; i++){
                        store.remove(grid_chk[i]);
                    }

                    var data = store.data.items;
                    var l = 1;
                    for(var i=0; i<data.length; i++){
                        data[i].data.num = l;
                        l++;
                    }
                    store.loadData(data);
                }
            });
        }
    },

    onGrid_tunnel_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('NFW2.view.win_etc_tunnel_routing',{
            edit: "edit",
            record: record.data,
            num: rowIndex+1
        });
        win.show();
    },

    onButtonClick21: function(button, e, eOpts) {
        var store = Ext.data.StoreManager.lookup("store_etc_xauth_list");

        if(store.data.length >= 16){
            Ext.Msg.alert(__weguardia,ValidMaxCnt(16));
            return false;
        }

        var win = Ext.create('NFW2.view.win_etc_xauth');
        win.show();
    },

    onButtonClick31: function(button, e, eOpts) {
        var grid = Ext.getCmp("grid_xauth_list");
        var grid_chk = grid.getSelectionModel().getSelection();

        if(grid_chk.length === 0){
            Ext.Msg.alert(__weguardia,get_msg("sel_del"));
            return false;
        }else{

            Ext.MessageBox.confirm(__weguardia,get_msg("conf_del"), function(btn){
                if(btn === "yes"){

                    var store = Ext.data.StoreManager.lookup("store_etc_xauth_list");

                    for(var i=0; i<grid_chk.length; i++){
                        store.remove(grid_chk[i]);
                    }

                    var data = store.data.items;
                    var l = 1;
                    for(var i=0; i<data.length; i++){
                        data[i].data.num = l;
                        l++;
                    }
                    store.loadData(data);
                }
            });
        }
    },

    onGrid_tunnel_listCellDblClick1: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('NFW2.view.win_etc_xauth',{
            edit: "edit",
            record: record.data,
            num: rowIndex+1
        });
        win.show();
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        me.fieldInfo = makeZenTip();
        me.init_vpn_etc();

        var records = [];

        var _params = {
            option : Ext.encode('all')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_pname_list',
            _params,
            function(response){
                hideLoadMask();

                for(var i in response){
                    records.push({
                        'name': response[i].name
                    });
                }

                Ext.data.StoreManager.lookup("store_interface").loadData(records);
                Ext.getCmp("interface").setValue(response[0].name);
            }
        );
    },

    onButtonClick4: function(button, e, eOpts) {
        var me = Ext.getCmp("NFW2_etc");

        var chk_relay = Ext.getCmp("chk_relay");
        var inter = Ext.getCmp("interface");
        var mac = Ext.getCmp("relay_mac");
        var ike = Ext.getCmp("ike");
        var ike_ip = Ext.getCmp("ike_ip");
        var timeout = Ext.getCmp("timeout");

        var store_dr = Ext.data.StoreManager.lookup("store_etc_dr_list");
        var store_tunnel = Ext.data.StoreManager.lookup("store_etc_tunnel_list");
        var store_xauth = Ext.data.StoreManager.lookup("store_etc_xauth_list");

        if(timeout.isValid()===false){ timeout.focus(); return false; }

        if(chk_relay.getValue()){
            if(mac.isValid()===false){ mac.focus(); return false; }
        }
        if(ike_ip.isValid()===false){ ike_ip.focus(); return false;}

        var obj = {};

        obj.ipsec_reset = me.ipsec_reset;

        obj.hs_relay = (chk_relay.getValue())?"on":"off";
        if(chk_relay.getValue()){
            obj.hs_interface = inter.getValue();
            obj.dst_mac = mac.getValue();
        }
        obj.vip_enable = (ike.getValue())?"on":"off";
        obj.ike_vip = (ike.getValue())?ike_ip.getValue():'';
        obj.timeout = removeComma(timeout.getValue());

        var dr = [];

        for(var i=0; i<store_dr.data.length; i++){

            var data = store_dr.data.items[i].data;
            dr.push(data);
        }

        obj.dr = {
            'total': store_dr.data.length,
            'list': dr
        };

        var tr = [];

        for(var l=0; l<store_tunnel.data.length; l++){

            var data = store_tunnel.data.items[l].data;
            tr.push({
                'num': data.num,
                'src_type': data.src_type,
                'src': data.src,
                'dst_type': data.dest_type,
                'dst': data.dest,
                'tunnel_ip': data.tunnel_ip
            });
        }

        obj.tunnel_routing = tr;

        var xauth = [];

        for(var j=0; j<store_xauth.data.length; j++){

            var data = store_xauth.data.items[j].data;
            xauth.push({
                'num': data.num,
                'user_id': data.id,
                'password': data.pw
            });
        }

        obj.xauth = xauth;

        var _params = {
            basename: Ext.encode('vpn_etc'),
            obj: Ext.encode(obj)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params,
            function(response){

                Ext.Msg.show({
                    title: __weguardia,
                    msg: get_msg("msg_ok_add"),
                    width: 300,
                    buttons: Ext.Msg.YES,
                    icon: Ext.window.MessageBox.INFO
                });
            }
        );
    },

    onButtonClick5: function(button, e, eOpts) {
        Ext.data.StoreManager.lookup("store_etc_dr_list").removeAll();
        Ext.data.StoreManager.lookup("store_etc_tunnel_list").removeAll();

        this.init_vpn_etc();
    },

    onPanelBeforeRender: function(component, eOpts) {
        Ext.define('Ext.overrides.form.field.ComboBox', {
            override: 'Ext.form.field.ComboBox',


            // OVERRIDE (Bug in ExtJS 5.1.0)
            checkChangeEvents : Ext.isIE ?
            ['change', 'propertychange', 'keyup'] : ['change', 'input', 'textInput', 'keyup', 'dragdrop']
        });
    },

    init_vpn_etc: function() {
        var me = Ext.getCmp("NFW2_etc");

        var store_interface = Ext.data.StoreManager.lookup("store_interface");
        var store_dr = Ext.data.StoreManager.lookup("store_etc_dr_list");
        var store_tunnel = Ext.data.StoreManager.lookup("store_etc_tunnel_list");
        var store_xauth = Ext.data.StoreManager.lookup("store_etc_xauth_list");

        store_dr.removeAll();
        store_tunnel.removeAll();
        store_xauth.removeAll();

        var _params = {
            basename: Ext.encode("vpn_etc")
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(data){

                hideLoadMask();

                if(data){

                    me.ipsec_etc = (data.ipsec_reset)?data.ipsec_reset:0;
                    if(data.timeout){
                        Ext.getCmp("timeout").setValue(addComma(data.timeout));
                    }
                    if(data.hs_relay === "on"){
                        Ext.getCmp("chk_relay").setValue(true);
                        Ext.getCmp("interface").setValue(data.hs_interface);
                        Ext.getCmp("relay_mac").setValue(data.dst_mac);
                    }else{
                        Ext.getCmp("chk_relay").setValue(false);
                        Ext.getCmp("interface").setValue("eth0");
                        Ext.getCmp("relay_mac").reset();
                    }

                    if(data.vip_enable === "on"){
                        Ext.getCmp("ike").setValue(true);
                        Ext.getCmp("ike_ip").setValue(data.ike_vip);
                    }else{
                        Ext.getCmp("ike").setValue(false);
                    }

                    var dr = data.dr.list;
                    var d_record = [];
                    for(var i=0; i<dr.length; i++){
                        d_record.push({
                            'num': dr[i].num,
                            'count':dr[i].count,
                            'tunnel_ip1': dr[i].tunnel_ip1,
                            'dr_tunnel_ip1': dr[i].dr_tunnel_ip1,
                            'tunnel_ip2': dr[i].tunnel_ip2,
                            'dr_tunnel_ip2': dr[i].dr_tunnel_ip2,
                            'tunnel_ip3': dr[i].tunnel_ip3,
                            'dr_tunnel_ip3': dr[i].dr_tunnel_ip3,
                            'tunnel_ip4': dr[i].tunnel_ip4,
                            'dr_tunnel_ip4': dr[i].dr_tunnel_ip4,
                            'dr_timeout': dr[i].dr_timeout
                        });
                    }
                    d_record.sort(function(a,b){return a.num-b.num;});
                    store_dr.loadData(d_record);

                    var tr = data.tunnel_routing;
                    var t_record = [];
                    for(var l=0; l<tr.length; l++){
                        t_record.push({
                            'num': tr[l].num,
                            'src_type': tr[l].src_type,
                            'src': tr[l].src,
                            'dest_type': tr[l].dst_type,
                            'dest': tr[l].dst,
                            'tunnel_ip': tr[l].tunnel_ip
                        });
                    }
                    t_record.sort(function(a, b){return a.num-b.num;});
                    store_tunnel.loadData(t_record);

                    var xauth = data.xauth;
                    var x_record = [];
                    for(var j=0; j<xauth.length; j++){
                        x_record.push({
                            'num': xauth[j].num,
                            'id': xauth[j].user_id,
                            'pw': xauth[j].password
                        });
                    }
                    x_record.sort(function(a, b){return a.num-b.num;});
                    store_xauth.loadData(x_record);
                }

            }
        );
    }

});