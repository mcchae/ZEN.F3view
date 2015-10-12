
Ext.define('NFW2.view.NFW2_network_ipv6Tunneling_6to4', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_ipv6tunneling_6to4',

    requires: [
        'NFW2.view.NFW2_network_ipv6Tunneling_6to4ViewModel',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.view.Table',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_network_ipv6tunneling_6to4'
    },
    id: 'NFW2_network_ipv6Tunneling_6to4',
    width: 900,
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
                            xtype: 'toggleslide',
                            resizeHandle: false,
                            state: false,
                            id: 'chker_6to4_tunnel_use',
                            listeners: {
                                change: 'onChker_6to4_tunnel_useChange',
                                afterrender: 'onChker_6to4_tunnel_useAfterRender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    disabled: true,
                    id: 'tunnel_6to4_con',
                    margin: '8 0 0 0',
                    items: [
                        {
                            xtype: 'container',
                            margin: '0 0 0 10',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'tunnel_6to4_inter',
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'store_interface',
                                    valueField: 'name',
                                    bind: {
                                        fieldLabel: '{ipv4_inter}'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'lb_info',
                                    margin: '5 0 0 5',
                                    bind: {
                                        text: '{inter_for_packet}'
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
                                    width: 135,
                                    bind: {
                                        text: '{ttl}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                            if(!LengthCheck(value, 0, 255)){ return ValidLimit(0, 255); }
                                        }

                                        return true;
                                    },
                                    fieldInfo: {
                                        txt: msg_tip_length(0,
                                        255,
                                        null)
                                    },
                                    id: 'tunnel_ttl',
                                    width: 80,
                                    labelSeparator: ' ',
                                    value: 128,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 3,
                                    maxLengthText: ' ',
                                    listeners: {
                                        focus: 'onTunnel_ttlFocus',
                                        blur: 'onTunnel_ttlBlur',
                                        errorchange: 'onTunnel_ttlErrorChange'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            cls: 'btn_b',
                            margin: '8 0 0 0',
                            iconCls: 'icb_add',
                            bind: {
                                text: '{add}'
                            },
                            listeners: {
                                click: 'onButtonClick2',
                                blur: 'onButtonBlur'
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'ipv6tunnel_6to4_grid',
                            margin: '8 0 10 0',
                            header: false,
                            title: 'My Grid Panel',
                            allowDeselect: true,
                            disableSelection: true,
                            enableColumnMove: false,
                            sortableColumns: false,
                            store: 'store_tunnel_6to4_list',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    width: 60,
                                    align: 'center',
                                    text: 'N'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.tdCls = "cell_text";
                                        return value;
                                    },
                                    dataIndex: 'v6',
                                    menuDisabled: true,
                                    flex: 1,
                                    bind: {
                                        text: '{ipv6_dest}'
                                    },
                                    editor: {
                                        xtype: 'textfield',
                                        baseCls: 'cell_text',
                                        enableKeyEvents: true,
                                        maskRe: /[0-9a-fA-F:\/]/,
                                        listeners: {
                                            blur: 'onTextfieldBlur',
                                            focus: 'onTextfieldFocus'
                                        }
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.tdCls = "cell_text";
                                        return value;
                                    },
                                    dataIndex: 'v4',
                                    menuDisabled: true,
                                    flex: 1,
                                    bind: {
                                        text: '{remote_ipv4}'
                                    },
                                    editor: {
                                        xtype: 'textfield',
                                        baseCls: 'cell_text',
                                        listeners: {
                                            blur: 'onTextfieldBlur1',
                                            focus: 'onTextfieldFocus1'
                                        }
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    id: 't_6to4_actioncol',
                                    width: 50,
                                    align: 'center',
                                    menuDisabled: true,
                                    items: [
                                        {
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                var grid =Ext.getCmp('ipv6tunnel_6to4_grid');
                                                grid.getPlugin('tunnel_6to4_plug').completeEdit();

                                                var store_6to4 = Ext.data.StoreManager.lookup('store_tunnel_6to4_list');

                                                store_6to4.removeAt(rowIndex);

                                                if(store_6to4.data.items.length < 2){ Ext.getCmp('t_6to4_actioncol').items[0].disabled = true; }
                                                else{ Ext.getCmp('t_6to4_actioncol').items[0].disabled = false; }
                                                Ext.getCmp('ipv6tunnel_6to4_grid').getView().refresh();
                                            },
                                            iconCls: 'icr_del'
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
                                    pluginId: 'tunnel_6to4_plug',
                                    clicksToEdit: 1
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
            padding: 0,
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
                        click: 'onButtonClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onNFW2_network_ipv6Tunneling_6in4AfterRender',
        render: 'onNFW2_network_ipv6Tunneling_6in4Render'
    },

    onChker_6to4_tunnel_useChange: function(button) {
        if(button.state){
            Ext.getCmp('tunnel_6to4_con').enable();
        }
        else{
            Ext.getCmp('tunnel_6to4_con').disable();
        }
    },

    onChker_6to4_tunnel_useAfterRender: function(component, eOpts) {
        component.onText = __zen('use');
        component.offText = __zen('unused');
    },

    onTunnel_ttlFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onTunnel_ttlBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onTunnel_ttlErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_network_ipv6Tunneling_6to4');
        var grid =Ext.getCmp('ipv6tunnel_6to4_grid');
        grid.getPlugin('tunnel_6to4_plug').completeEdit();

        var store_6to4 = Ext.data.StoreManager.lookup('store_tunnel_6to4_list');

        if(me.max_cnt <= store_6to4.getCount()){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(me.max_cnt));

            return false;
        }

        var record_6to4 = [];

        record_6to4.push({
            'ipv6' : '',
            'ipv4' : ''
        });

        store_6to4.add(record_6to4);

        if(store_6to4.data.items.length < 2){ Ext.getCmp('t_6to4_actioncol').items[0].disabled = true; }
        else{ Ext.getCmp('t_6to4_actioncol').items[0].disabled = false; }
        Ext.getCmp('ipv6tunnel_6to4_grid').getView().refresh();
    },

    onButtonBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldBlur: function(component, event, eOpts) {
        setTipBlur(this, component);
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4ss2p');
        component.fieldInfo = str;
        setTipFocus(this, component);
    },

    onTextfieldBlur1: function(component, event, eOpts) {
        setTipBlur(this, component);
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldFocus1: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this, component);
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_network_ipv6Tunneling');

        var store_6to4 = Ext.data.StoreManager.lookup('store_tunnel_6to4_list');
        var obj_6to4 = {};
        var record_6to4 = [];


        if(Ext.getCmp('chker_6to4_tunnel_use').state === true){
            if(Ext.getCmp('tunnel_ttl').isValid() === false){ Ext.getCmp('tunneling_tab').setActiveTab(0); Ext.getCmp('tunnel_ttl').focus(); return false; }

            for(var i in store_6to4.data.items){
                if(!CheckNotNull(store_6to4.data.items[i].data.v6)){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_null'));

                    Ext.getCmp('ipv6tunnel_6to4_grid').getPlugin('tunnel_6to4_plug').startEdit(Number(i), 1);
                    return false;
                }

                var temp;

                if(store_6to4.data.items[i].data.v6 !== undefined){ temp = store_6to4.data.items[i].data.v6.split('/'); }
                else{
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_null'));

                    Ext.getCmp('ipv6tunnel_6to4_grid').getPlugin('tunnel_6to4_plug').startEdit(Number(i), 1);
                    return false;
                }

                if(temp[1] === undefined){
                    if(!ValidIPv6(temp[0])){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_ip'));

                        Ext.getCmp('ipv6tunnel_6to4_grid').getPlugin('tunnel_6to4_plug').startEdit(Number(i), 1);
                        return false;
                    }
                }
                else{
                    if(!ValidIPv6(temp[0])){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_ip'));

                        Ext.getCmp('ipv6tunnel_6to4_grid').getPlugin('tunnel_6to4_plug').startEdit(Number(i), 1);
                        return false;
                    }
                    if(temp[1] === ""){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_form'));

                        Ext.getCmp('ipv6tunnel_6to4_grid').getPlugin('tunnel_6to4_plug').startEdit(Number(i), 1);
                        return false;
                    }

                    if(Number(temp[1]) < 3 || Number(temp[1]) > 128){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(ValidLimit(3,128));

                        Ext.getCmp('ipv6tunnel_6to4_grid').getPlugin('tunnel_6to4_plug').startEdit(Number(i), 1);
                        return false;
                    }
                    if(isNaN(Number(temp[1]))){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(ValidLimit(3,128));

                        Ext.getCmp('ipv6tunnel_6to4_grid').getPlugin('tunnel_6to4_plug').startEdit(Number(i), 1);
                        return false;
                    }
                }

                if(!CheckNotNull(store_6to4.data.items[i].data.v4)){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_null'));

                    Ext.getCmp('ipv6tunnel_6to4_grid').getPlugin('tunnel_6to4_plug').startEdit(Number(i), 2);
                    return false;
                }
                if(!ValidIPAddress(store_6to4.data.items[i].data.v4)){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_ip'));

                    Ext.getCmp('ipv6tunnel_6to4_grid').getPlugin('tunnel_6to4_plug').startEdit(Number(i), 2);
                    return false;
                }

                record_6to4.push({
                    'v6' : store_6to4.data.items[i].data.v6,
                    'v4' : store_6to4.data.items[i].data.v4
                });
            }

            obj_6to4.use = "on";
            obj_6to4.ttl = Number(Ext.getCmp('tunnel_ttl').getValue());
            obj_6to4.interface = Ext.getCmp('tunnel_6to4_inter').getValue();
            obj_6to4.ip = record_6to4;
        }
        else{
            for(var i in store_6to4.data.items){
                record_6to4.push({
                    'v6' : store_6to4.data.items[i].data.v6,
                    'v4' : store_6to4.data.items[i].data.v4
                });
            }
            obj_6to4.use = "off";
            obj_6to4.ttl = Number(Ext.getCmp('tunnel_ttl').getValue());
            obj_6to4.interface = Ext.getCmp('tunnel_6to4_inter').getValue();
            obj_6to4.ip = record_6to4;
        }

        var _params_6to4 = {
            basename : Ext.encode('network_tunneling_6to4'),
            obj : Ext.encode(obj_6to4)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params_6to4,
            function(response){
                Ext.Msg.show({
                    title: __weguardia,
                    msg: get_msg("msg_ok_add"),
                    width: 300,
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });
            }
        );
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_network_ipv6Tunneling_6to4');

        var store_6to4 = Ext.data.StoreManager.lookup('store_tunnel_6to4_list');
        var record_6to4 = [];

        record_6to4.push({
            'ipv6' : '',
            'ipv4' : ''
        });

        store_6to4.loadData(record_6to4);

        if(store_6to4.data.items.length < 2){ Ext.getCmp('t_6to4_actioncol').items[0].disabled = true; }
        Ext.getCmp('ipv6tunnel_6to4_grid').getView().refresh();

        me.get_6to4();
    },

    onNFW2_network_ipv6Tunneling_6in4AfterRender: function(component, eOpts) {
        var me = this;
        this.fieldInfo = makeZenTip();

        var store_6to4 = Ext.data.StoreManager.lookup('store_tunnel_6to4_list');
        var record_6to4 = [];

        record_6to4.push({
            'ipv6' : '',
            'ipv4' : ''
        });

        store_6to4.loadData(record_6to4);

        if(store_6to4.data.items.length < 2){ Ext.getCmp('t_6to4_actioncol').items[0].disabled = true; }
        Ext.getCmp('ipv6tunnel_6to4_grid').getView().refresh();
        var records = [];
        var _params = {
            option : Ext.encode('all')
        };

        Ext.data.JsonP.request({
            url : "/api/ftuctrl/get_pname_list",
            params : _params,
            success : function(response){
                hideLoadMask();
                var _params = {
                    basename : Ext.encode('network_interface')
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'getObject',
                    _params,
                    function(response_int){
                        if(response.retcode){
                            for(var i in response.retval){
                                records.push({
                                    'name': response.retval[i].name
                                });
                            }
                            var _store = Ext.data.StoreManager.lookup('store_interface');
                            _store.loadData(records);

                            Ext.getCmp('tunnel_6to4_inter').setValue(response.retval[0].name);
                        }
                        me.get_6to4();
                    }
                );
            },
            failure : function(response){
                hideLoadMask();
                Ext.Msg.show({
                    title : 'Error message',
                    msg : 'Error Message',
                    width : 300,
                    buttons : Ext.Msg.OK,
                    icon:Ext.window.MessageBox.INFO
                });
            }
        });
    },

    onNFW2_network_ipv6Tunneling_6in4Render: function(component, eOpts) {
        var me = this;

        var _params = {

            filename: Ext.encode('/proc/ferret/datasheet/ipv6_tunneling')
        };

        request_helper.xmlrpc_call_JsonP(

            'ftuctrl',
            'getFileContent',
            _params,

            function(response){
                me.max_cnt = Number(response[0]);
            }
        );

    },

    get_6to4: function() {
        var store_6to4 = Ext.data.StoreManager.lookup('store_tunnel_6to4_list');

        var _params_6to4 = {
            basename : Ext.encode('network_tunneling_6to4')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params_6to4,
            function(response_6to4){
                if(response_6to4.use === "on"){
                    Ext.getCmp('chker_6to4_tunnel_use').state = true;
                    Ext.getCmp('chker_6to4_tunnel_use').moveHandle(true);
                    Ext.getCmp('tunnel_6to4_con').enable();
                }
                else{
                    Ext.getCmp('chker_6to4_tunnel_use').state = false;
                    Ext.getCmp('chker_6to4_tunnel_use').moveHandle(false);
                    Ext.getCmp('tunnel_6to4_con').disable();
                }

                if(response_6to4.interface !== ""){ Ext.getCmp('tunnel_6to4_inter').setValue(response_6to4.interface); }
                if(response_6to4.ttl !== ""){ Ext.getCmp('tunnel_ttl').setValue(response_6to4.ttl); }

                if(response_6to4.ip.length !== 0){ store_6to4.loadData(response_6to4.ip); }

                if(store_6to4.data.items.length < 2){ Ext.getCmp('t_6to4_actioncol').items[0].disabled = true; }
                else{ Ext.getCmp('t_6to4_actioncol').items[0].disabled = false; }
                Ext.getCmp('ipv6tunnel_6to4_grid').getView().refresh();
            }
        );
    }

});