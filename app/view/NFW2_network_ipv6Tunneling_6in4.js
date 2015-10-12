
Ext.define('NFW2.view.NFW2_network_ipv6Tunneling_6in4', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_ipv6tunneling_6in4',

    requires: [
        'NFW2.view.NFW2_network_ipv6Tunneling_6in4ViewModel',
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
        type: 'nfw2_network_ipv6tunneling_6in4'
    },
    id: 'NFW2_network_ipv6Tunneling_6in4',
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
                            id: 'chker_set_tunnel_use',
                            listeners: {
                                change: 'onChker_set_tunnel_useChange',
                                afterrender: 'onChker_set_tunnel_useAfterRender'
                            }
                        },
                        {
                            xtype: 'container',
                            disabled: true,
                            id: 'tunnel_set_con',
                            margin: '8 0 0 0',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            id: 'tunnel_set_inter',
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
                                    id: 'ipv6tunnel_set_grid',
                                    margin: '8 0 10 0',
                                    header: false,
                                    title: 'My Grid Panel',
                                    allowDeselect: true,
                                    disableSelection: true,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    store: 'store_tunnel_set_list',
                                    columns: [
                                        {
                                            xtype: 'rownumberer',
                                            width: 60,
                                            align: 'center',
                                            dataIndex: 'string',
                                            text: 'N'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.tdCls = "cell_text";

                                                return value;
                                            },
                                            width: 210,
                                            dataIndex: 'v6',
                                            menuDisabled: true,
                                            bind: {
                                                text: '{ipv6_dest}'
                                            },
                                            editor: {
                                                xtype: 'textfield',
                                                baseCls: 'cell_text',
                                                maskRe: /[0-9a-fA-F:\/]/,
                                                listeners: {
                                                    blur: 'onTextfieldBlur',
                                                    focus: 'onTextfieldFocus'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            minWidth: 290,
                                            menuDisabled: true,
                                            bind: {
                                                text: '{tunnel_inter}'
                                            },
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.tdCls = "cell_combo";

                                                        return value;
                                                    },
                                                    height: 0,
                                                    id: 'tunnel_set_name_col',
                                                    style: 'border:none',
                                                    width: 80,
                                                    dataIndex: 'sit_name',
                                                    text: 'MyColumn4',
                                                    editor: {
                                                        xtype: 'combobox',
                                                        baseCls: 'cell_combo',
                                                        editable: false,
                                                        displayField: 'name',
                                                        queryMode: 'local',
                                                        valueField: 'name',
                                                        listeners: {
                                                            focus: 'onComboboxFocus',
                                                            collapse: 'onComboboxCollapse',
                                                            blur: 'onComboboxBlur'
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.tdCls = "cell_text";

                                                        return value;
                                                    },
                                                    height: 0,
                                                    style: 'border:none',
                                                    width: 210,
                                                    dataIndex: 'sit_v6',
                                                    text: 'MyColumn5',
                                                    editor: {
                                                        xtype: 'textfield',
                                                        baseCls: 'cell_text',
                                                        maskRe: /[0-9a-fA-F:\/]/,
                                                        listeners: {
                                                            blur: 'onTextfieldBlur1',
                                                            focus: 'onTextfieldFocus1'
                                                        }
                                                    }
                                                }
                                            ]
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
                                                maskRe: /[0-9.]/,
                                                listeners: {
                                                    blur: 'onTextfieldBlur2',
                                                    focus: 'onTextfieldFocus2'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.tdCls = "cell_text";

                                                return value;
                                            },
                                            dataIndex: 'ttl',
                                            flex: 0.5,
                                            bind: {
                                                text: '{ttl}'
                                            },
                                            editor: {
                                                xtype: 'textfield',
                                                fieldInfo: {
                                                    txt: msg_tip_length(0,
                                                    255,
                                                    null)
                                                },
                                                baseCls: 'cell_text',
                                                enforceMaxLength: true,
                                                maskRe: /[0-9]/,
                                                maxLength: 3,
                                                maxLengthText: ' ',
                                                listeners: {
                                                    blur: 'onTextfieldBlur3',
                                                    focus: 'onTextfieldFocus3'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            id: 'set_actioncol',
                                            width: 50,
                                            align: 'center',
                                            menuDisabled: true,
                                            items: [
                                                {
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                        var grid =Ext.getCmp('ipv6tunnel_set_grid');
                                                        grid.getPlugin('tunnel_set_plug').completeEdit();

                                                        var store_isatap = Ext.data.StoreManager.lookup('store_tunnel_set_list');

                                                        store_isatap.removeAt(rowIndex);

                                                        if(store_isatap.data.items.length < 2){ Ext.getCmp('set_actioncol').items[0].disabled = true; }
                                                        else{ Ext.getCmp('set_actioncol').items[0].disabled = false; }
                                                        Ext.getCmp('ipv6tunnel_set_grid').getView().refresh();
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
                                            pluginId: 'tunnel_set_plug',
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

    onChker_set_tunnel_useChange: function(button) {
        if(button.state){
            Ext.getCmp('tunnel_set_con').enable();
        }
        else{
            Ext.getCmp('tunnel_set_con').disable();
        }
    },

    onChker_set_tunnel_useAfterRender: function(component, eOpts) {
        component.onText = __zen('use');
        component.offText = __zen('unused');
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_network_ipv6Tunneling_6in4');
        var grid =Ext.getCmp('ipv6tunnel_set_grid');
        grid.getPlugin('tunnel_set_plug').completeEdit();

        var store_set = Ext.data.StoreManager.lookup('store_tunnel_set_list');

        if(me.max_cnt <= store_set.getCount()){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(me.max_cnt));

            return false;
        }

        var record_set = [];

        record_set.push({
            'ipv6' : '',
            'ipv4' : '',
            'tunnel_inter' : '',
            'ttl' : '128'
        });

        store_set.add(record_set);

        if(store_set.data.items.length < 2){ Ext.getCmp('set_actioncol').items[0].disabled = true; }
        else{ Ext.getCmp('set_actioncol').items[0].disabled = false; }
        Ext.getCmp('ipv6tunnel_set_grid').getView().refresh();
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

    onComboboxFocus: function(component, event, eOpts) {
        var me = Ext.getCmp('NFW2_network_ipv6Tunneling_6in4');
        var store = component.getStore();
        var grid_store = Ext.getCmp('ipv6tunnel_set_grid').getStore();
        var records = [];

        var set_name_record = [];

        for(var i = 0;i <me.max_cnt;i++){
            set_name_record.push({ 'name' : 'sit'+i });
        }

        store.loadData(set_name_record);

        for(var i in store.data.items){
            var chk = false;
            for(var j in grid_store.data.items){
                if(store.data.items[i].data.name === grid_store.data.items[j].data.sit_name){
                    if(grid_store.data.items[j].data.sit_name !== component.getValue()){
                        chk = true;
                    }
                }
            }
            if(chk === false){
                records.push({'name':store.data.items[i].data.name});
            }
        }

        store.loadData(records);
        component.setValue(component.getValue());
        component.expand();
    },

    onComboboxCollapse: function(field, eOpts) {
        field.blur();
    },

    onComboboxBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldBlur1: function(component, event, eOpts) {
        setTipBlur(this, component);
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldFocus1: function(component, event, eOpts) {
        var str = disp_help_ip('4s2p');
        component.fieldInfo = str;
        setTipFocus(this, component);
    },

    onTextfieldBlur2: function(component, event, eOpts) {
        setTipBlur(this,component);
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldFocus2: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this, component);
    },

    onTextfieldBlur3: function(component, event, eOpts) {
        setTipBlur(this,component);
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldFocus3: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_network_ipv6Tunneling_6in4');

        var store_set = Ext.data.StoreManager.lookup('store_tunnel_set_list');
        var obj_set = {};
        var record_set = [];


        if(Ext.getCmp('chker_set_tunnel_use').state === true){
            for(var i in store_set.data.items){
                if(!CheckNotNull(store_set.data.items[i].data.v6)){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_null'));

                    Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 1);
                    return false;
                }

                var temp;

                if(store_set.data.items[i].data.v6 !== undefined){ temp = store_set.data.items[i].data.v6.split('/'); }
                else{
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_null'));

                    Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 1);
                    return false;
                }

                if(temp[1] === undefined){
                    if(!ValidIPv6(temp[0])){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_ip'));

                        Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 1);
                        return false;
                    }
                }
                else{
                    if(!ValidIPv6(temp[0])){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_ip'));

                        Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 1);
                        return false;
                    }
                    if(temp[1] === ""){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_form'));

                        Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 1);
                        return false;
                    }
                    if(Number(temp[1]) < 3 || Number(temp[1]) > 128){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(ValidLimit(3,128));

                        Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 1);
                        return false;
                    }
                    if(isNaN(Number(temp[1]))){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(ValidLimit(3,128));

                        Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 1);
                        return false;
                    }
                }

                if(store_set.data.items[i].data.sit_name === "" || store_set.data.items[i].data.sit_name === undefined){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_null'));

                    Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 2);
                    return false;
                }

                var temp_sit;

                if(store_set.data.items[i].data.sit_v6 !== undefined){ temp_sit = store_set.data.items[i].data.sit_v6.split('/'); }
                else{
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_null'));

                    Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 3);
                    return false;
                }

                if(temp_sit[1] === undefined){
                    if(!ValidIPv6(temp_sit[0])){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_ip'));

                        Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 3);
                        return false;
                    }
                    else{
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_form'));

                        Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 3);
                        return false;
                    }
                }
                else{
                    if(!ValidIPv6(temp_sit[0])){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_ip'));

                        Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 3);
                        return false;
                    }
                    if(temp_sit[1] === ""){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_form'));

                        Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 3);
                        return false;
                    }
                    if(Number(temp_sit[1]) < 3 || Number(temp_sit[1]) > 128){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(ValidLimit(3,128));

                        Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 3);
                        return false;
                    }
                    if(isNaN(Number(temp_sit[1]))){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(ValidLimit(3,128));

                        Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 3);
                        return false;
                    }
                }

                if(store_set.data.items[i].data.v4 === undefined){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_null'));

                    Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 4);
                    return false;
                }
                if(!ValidIPAddress(store_set.data.items[i].data.v4)){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_ip'));

                    Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 4);
                    return false;
                }

                if(Number(store_set.data.items[i].data.ttl) < 0 || Number(store_set.data.items[i].data.ttl) > 255){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(ValidLimit(0,255));

                    Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 5);
                    return false;
                }

                record_set.push({
                    'v6' : store_set.data.items[i].data.v6,
                    'sit_name' : store_set.data.items[i].data.sit_name,
                    'v4' : store_set.data.items[i].data.v4,
                    'sit_v6' : store_set.data.items[i].data.sit_v6,
                    'ttl' : Number(store_set.data.items[i].data.ttl)
                });
            }

            obj_set.use = "on";
            obj_set.interface = Ext.getCmp('tunnel_set_inter').getValue();
            obj_set.ip = record_set;
        }
        else{
            for(var i in store_set.data.items){
                record_set.push({
                    'v6' : store_set.data.items[i].data.v6,
                    'sit_name' : store_set.data.items[i].data.sit_name,
                    'v4' : store_set.data.items[i].data.v4,
                    'sit_v6' : store_set.data.items[i].data.sit_v6,
                    'ttl' : Number(store_set.data.items[i].data.ttl)
                });
            }
            obj_set.use = "off";
            obj_set.interface = Ext.getCmp('tunnel_set_inter').getValue();
            obj_set.ip = record_set;

        }


        var _params_set = {
            basename : Ext.encode('network_tunneling_6in4'),
            obj : Ext.encode(obj_set)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params_set,
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
        var me = Ext.getCmp('NFW2_network_ipv6Tunneling_6in4');

        var store_set = Ext.data.StoreManager.lookup('store_tunnel_set_list');
        var record_set = [];

        record_set.push({
            'ipv6' : '',
            'ipv4' : '',
            'sit_name' : '',
            'sit_v6' : '',
            'ttl' : '128'
        });

        store_set.loadData(record_set);

        if(store_set.data.items.length < 2){ Ext.getCmp('set_actioncol').items[0].disabled = true; }

        Ext.getCmp('ipv6tunnel_set_grid').getView().refresh();


        me.get_6in4();
    },

    onNFW2_network_ipv6Tunneling_6in4AfterRender: function(component, eOpts) {
        var me = this;
        this.fieldInfo = makeZenTip();

        var store_set = Ext.data.StoreManager.lookup('store_tunnel_set_list');
        var record_set = [];

        record_set.push({
            'ipv6' : '',
            'ipv4' : '',
            'sit_name' : '',
            'sit_v6' : '',
            'ttl' : '128'
        });

        store_set.loadData(record_set);

        if(store_set.data.items.length < 2){ Ext.getCmp('set_actioncol').items[0].disabled = true; }

        Ext.getCmp('ipv6tunnel_set_grid').getView().refresh();

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
                        var record_isatap = [];

                        for(var j in response_int.network.ethernet){
                            if(response_int.network.ethernet[j].default.ipv4 !== null){ record_isatap.push({ 'name' : j }); }
                        }

                        if(response.retcode){
                            for(var i in response.retval){
                                records.push({
                                    'name': response.retval[i].name
                                });
                            }
                            var _store = Ext.data.StoreManager.lookup('store_interface');
                            _store.loadData(records);
        console.log(Ext.getCmp('tunnel_set_inter'));
                            Ext.getCmp('tunnel_set_inter').setValue(response.retval[0].name);
                        }
                        me.get_6in4();
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
                var set_name_record = [];

                for(var i = 0;i <me.max_cnt;i++){
                    set_name_record.push({ 'name' : 'sit'+i });
                }

                var set_name_store = {
                    data: set_name_record,
                    fields:[
                        { name : 'name' }
                    ]
                };

                Ext.getCmp('tunnel_set_name_col').getEditor().bindStore(set_name_store);
            }
        );
    },

    get_6in4: function() {
        var store_set = Ext.data.StoreManager.lookup('store_tunnel_set_list');

        var _params_set = {
            basename : Ext.encode('network_tunneling_6in4')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params_set,
            function(response_set){

                if(response_set.use === "on"){
                    Ext.getCmp('chker_set_tunnel_use').state = true;
                    Ext.getCmp('chker_set_tunnel_use').moveHandle(true);
                    Ext.getCmp('tunnel_set_con').enable();
                }
                else{
                    Ext.getCmp('chker_set_tunnel_use').state = false;
                    Ext.getCmp('chker_set_tunnel_use').moveHandle(false);
                    Ext.getCmp('tunnel_set_con').disable();
                }

                if(response_set.interface !== ""){ Ext.getCmp('tunnel_set_inter').setValue(response_set.interface); }

                if(response_set.ip.length !== 0){ store_set.loadData(response_set.ip); }

                if(store_set.data.items.length < 2){ Ext.getCmp('set_actioncol').items[0].disabled = true; }
                else{ Ext.getCmp('set_actioncol').items[0].disabled = false; }
                Ext.getCmp('ipv6tunnel_set_grid').getView().refresh();

            }
        );
    }

});