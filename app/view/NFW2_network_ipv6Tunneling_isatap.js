
Ext.define('NFW2.view.NFW2_network_ipv6Tunneling_isatap', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_ipv6tunneling_isatap',

    requires: [
        'NFW2.view.NFW2_network_ipv6Tunneling_isatapViewModel',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.form.field.ComboBox',
        'Ext.view.Table',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_network_ipv6tunneling_isatap'
    },
    id: 'NFW2_network_ipv6Tunneling_isatap',
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
                            id: 'chker_isatap_tunnel_use',
                            listeners: {
                                change: 'onButtonChange',
                                afterrender: 'onChker_isatap_tunnel_useAfterRender'
                            }
                        },
                        {
                            xtype: 'container',
                            disabled: true,
                            id: 'tunnel_isatap_con',
                            items: [
                                {
                                    xtype: 'button',
                                    cls: 'btn_b',
                                    margin: '8 0 0 0',
                                    iconCls: 'icb_add',
                                    bind: {
                                        text: '{add}'
                                    },
                                    listeners: {
                                        click: 'onButtonClick',
                                        blur: 'onButtonBlur'
                                    }
                                },
                                {
                                    xtype: 'gridpanel',
                                    id: 'ipv6tunnel_isatap_grid',
                                    margin: '8 0 0 0',
                                    header: false,
                                    title: 'My Grid Panel',
                                    allowDeselect: true,
                                    disableSelection: true,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    store: 'store_tunnel_isatap_list',
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
                                            width: 265,
                                            menuDisabled: true,
                                            flex: 1.2,
                                            bind: {
                                                text: '{ipv6_prefix}'
                                            },
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.tdCls = "cell_text";

                                                        return value;
                                                    },
                                                    height: 0,
                                                    style: 'border:none',
                                                    width: 220,
                                                    dataIndex: 'prefix',
                                                    text: 'MyColumn3',
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
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        return "/64";
                                                    },
                                                    height: 0,
                                                    style: 'border:none',
                                                    width: 45,
                                                    text: 'MyColumn4'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.tdCls = "cell_combo";

                                                return value;
                                            },
                                            id: 'tunnel_isatap_name_col',
                                            dataIndex: 'name',
                                            menuDisabled: true,
                                            flex: 0.5,
                                            bind: {
                                                text: '{name}'
                                            },
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
                                                metaData.tdCls = "cell_combo";

                                                return value;
                                            },
                                            dataIndex: 'interface',
                                            menuDisabled: true,
                                            flex: 1,
                                            bind: {
                                                text: '{inter}'
                                            },
                                            editor: {
                                                xtype: 'combobox',
                                                baseCls: 'cell_combo',
                                                editable: false,
                                                displayField: 'name',
                                                queryMode: 'local',
                                                store: 'store_interface_isatap',
                                                valueField: 'name',
                                                listeners: {
                                                    focus: 'onComboboxFocus1',
                                                    collapse: 'onComboboxCollapse1',
                                                    blur: 'onComboboxBlur1'
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
                                            menuDisabled: true,
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
                                                    blur: 'onTextfieldBlur1',
                                                    focus: 'onTextfieldFocus1'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            id: 'isatap_actioncol',
                                            width: 50,
                                            align: 'center',
                                            menuDisabled: true,
                                            items: [
                                                {
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                        var grid =Ext.getCmp('ipv6tunnel_isatap_grid');
                                                        grid.getPlugin('tunnel_isatap_plug').completeEdit();

                                                        var store_isatap = Ext.data.StoreManager.lookup('store_tunnel_isatap_list');

                                                        store_isatap.removeAt(rowIndex);

                                                        if(store_isatap.data.items.length < 2){ Ext.getCmp('isatap_actioncol').items[0].disabled = true; }
                                                        else{ Ext.getCmp('isatap_actioncol').items[0].disabled = false; }
                                                        Ext.getCmp('ipv6tunnel_isatap_grid').getView().refresh();
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
                                            pluginId: 'tunnel_isatap_plug',
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
                        click: 'onButtonClick1'
                    }
                }
            ]
        }
    ],
    listeners: {
        render: 'onNFW2_network_ipv6Tunneling_isatapRender',
        afterrender: 'onNFW2_network_ipv6Tunneling_isatapAfterRender'
    },

    onButtonChange: function(button) {
        if(button.state){
            Ext.getCmp('tunnel_isatap_con').enable();
        }
        else{
            Ext.getCmp('tunnel_isatap_con').disable();
        }
    },

    onChker_isatap_tunnel_useAfterRender: function(component, eOpts) {
        component.onText = __zen('use');
        component.offText = __zen('unused');
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_network_ipv6Tunneling_isatap');
        var grid =Ext.getCmp('ipv6tunnel_isatap_grid');
        grid.getPlugin('tunnel_isatap_plug').completeEdit();

        var store_isatap = Ext.data.StoreManager.lookup('store_tunnel_isatap_list');

        if(me.max_cnt <= store_isatap.getCount()){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(me.max_cnt));

            return false;
        }

        var record_isatap = [];

        record_isatap.push({
            'ipv6' : '',
            'name' : '',
            'interface' : '',
            'ttl' : '128'
        });

        store_isatap.add(record_isatap);

        if(store_isatap.data.items.length < 2){ Ext.getCmp('isatap_actioncol').items[0].disabled = true; }
        else{ Ext.getCmp('isatap_actioncol').items[0].disabled = false; }
        Ext.getCmp('ipv6tunnel_isatap_grid').getView().refresh();
    },

    onButtonBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldFocus: function(component, event, eOpts) {
        var str = disp_help_ip('isatap');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onComboboxFocus: function(component, event, eOpts) {
        var me = Ext.getCmp('NFW2_network_ipv6Tunneling_isatap');
        var store = component.getStore();
        var grid_store = Ext.getCmp('ipv6tunnel_isatap_grid').getStore();
        var records = [];

        var isatap_name_record = [];

        for(var i = 0;i <me.max_cnt;i++){
            isatap_name_record.push({ 'name' : 'is'+i });
        }

        store.loadData(isatap_name_record);

        for(var i in store.data.items){
            var chk = false;
            for(var j in grid_store.data.items){
                if(store.data.items[i].data.name === grid_store.data.items[j].data.name){
                    if(grid_store.data.items[j].data.name !== component.getValue()){
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

    onComboboxFocus1: function(component, event, eOpts) {

        var me = Ext.getCmp('NFW2_network_ipv6Tunneling_isatap');
        var store = component.getStore();
        var grid_store = Ext.getCmp('ipv6tunnel_isatap_grid').getStore();
        var records = [];

        store.loadData(me.get_inter);
        console.log(me.get_inter);
        for(var i in store.data.items){
            var chk = false;
            for(var j in grid_store.data.items){
                if(store.data.items[i].data.name === grid_store.data.items[j].data.interface){
                    if(grid_store.data.items[j].data.interface !== component.getValue()){
                        chk = true;
                    }
                }
            }
            if(chk === false){
                records.push({'name':store.data.items[i].data.name});
            }
        }

        if(records.length === 0){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(get_msg('err_isatap_inter'));
        }

        store.loadData(records);
        component.setValue(component.getValue());
        component.expand();

    },

    onComboboxCollapse1: function(field, eOpts) {
        field.blur();
    },

    onComboboxBlur1: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldBlur1: function(component, event, eOpts) {
        setTipBlur(this,component);
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldFocus1: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_network_ipv6Tunneling_isatap');

        var store_isatap = Ext.data.StoreManager.lookup('store_tunnel_isatap_list');
        var obj_isatap = {};
        var record_isatap = [];

        if(Ext.getCmp('chker_isatap_tunnel_use').state === true){
            for(var i in store_isatap.data.items){
                if(!CheckNotNull(store_isatap.data.items[i].data.prefix)){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_null'));

                    Ext.getCmp('ipv6tunnel_isatap_grid').getPlugin('tunnel_isatap_plug').startEdit(Number(i), 1);
                    return false;
                }
                if(!ValidIPv6ISATAP(store_isatap.data.items[i].data.prefix)){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_isatap'));

                    Ext.getCmp('ipv6tunnel_isatap_grid').getPlugin('tunnel_isatap_plug').startEdit(Number(i), 1);
                    return false;
                }

                if(store_isatap.data.items[i].data.name === "" || store_isatap.data.items[i].data.name === undefined){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_null'));

                    Ext.getCmp('ipv6tunnel_isatap_grid').getPlugin('tunnel_isatap_plug').startEdit(Number(i),3);
                    return false;
                }

                if(store_isatap.data.items[i].data.interface === "" || store_isatap.data.items[i].data.interface === undefined){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_null'));

                    Ext.getCmp('ipv6tunnel_isatap_grid').getPlugin('tunnel_isatap_plug').startEdit(Number(i), 4);
                    return false;
                }

                if(Number(store_isatap.data.items[i].data.ttl) < 0 || Number(store_isatap.data.items[i].data.ttl) > 255){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(ValidLimit(0,255));

                    Ext.getCmp('ipv6tunnel_isatap_grid').getPlugin('tunnel_isatap_plug').startEdit(Number(i), 5);
                    return false;
                }

                record_isatap.push({
                    'prefix' : store_isatap.data.items[i].data.prefix,
                    'name' : store_isatap.data.items[i].data.name,
                    'interface' : store_isatap.data.items[i].data.interface,
                    'ttl' : Number(store_isatap.data.items[i].data.ttl)
                });
            }
            obj_isatap.use = "on";
            obj_isatap.entry_list = record_isatap;
        }
        else{
            for(var i in store_isatap.data.items){
                record_isatap.push({
                    'prefix' : store_isatap.data.items[i].data.prefix,
                    'name' : store_isatap.data.items[i].data.name,
                    'interface' : store_isatap.data.items[i].data.interface,
                    'ttl' : Number(store_isatap.data.items[i].data.ttl)
                });
            }
            obj_isatap.use = "off";
            obj_isatap.entry_list = record_isatap;
        }


        var _params_isatap = {
            basename : Ext.encode('network_tunneling_isatap'),
            obj : Ext.encode(obj_isatap)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params_isatap,
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

    onButtonClick1: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_network_ipv6Tunneling_isatap');

        var store_isatap = Ext.data.StoreManager.lookup('store_tunnel_isatap_list');

        var record_isatap = [];

        record_isatap.push({
            'ipv6' : '',
            'name' : '',
            'interface' : '',
            'ttl' : '128'
        });
        store_isatap.loadData(record_isatap);

        if(store_isatap.data.items.length < 2){ Ext.getCmp('isatap_actioncol').items[0].disabled = true; }
        Ext.getCmp('ipv6tunnel_isatap_grid').getView().refresh();

        me.get_isatap();
    },

    onNFW2_network_ipv6Tunneling_isatapRender: function(component, eOpts) {
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
                var isatap_name_record = [];

                for(var i = 0;i <me.max_cnt;i++){
                    isatap_name_record.push({ 'name' : 'is'+i });
                }

                var isatap_name_store = {
                    data: isatap_name_record,
                    fields:[
                        { name : 'name' }
                    ]
                };

                Ext.getCmp('tunnel_isatap_name_col').getEditor().bindStore(isatap_name_store);
            }
        );
    },

    onNFW2_network_ipv6Tunneling_isatapAfterRender: function(component, eOpts) {
        var me = this;
        me.get_inter = [];
        this.fieldInfo = makeZenTip();

        var store_isatap = Ext.data.StoreManager.lookup('store_tunnel_isatap_list');
        var record_isatap = [];

        record_isatap.push({
            'ipv6' : '',
            'name' : '',
            'interface' : '',
            'ttl' : '128'
        });
        store_isatap.loadData(record_isatap);

        if(store_isatap.data.items.length < 2){ Ext.getCmp('isatap_actioncol').items[0].disabled = true; }
        Ext.getCmp('ipv6tunnel_isatap_grid').getView().refresh();
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
                            me.get_inter = record_isatap;
                            _store.loadData(records);
                            var _store_isatap = Ext.data.StoreManager.lookup('store_interface_isatap');
                            _store_isatap.loadData(record_isatap);
                        }
                        me.get_isatap();
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

    get_isatap: function() {
        var store_isatap = Ext.data.StoreManager.lookup('store_tunnel_isatap_list');

        var _params_isatap = {
            basename : Ext.encode('network_tunneling_isatap')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params_isatap,
            function(response_isatap){
                if(response_isatap.use === "on"){
                    Ext.getCmp('chker_isatap_tunnel_use').state = true;
                    Ext.getCmp('chker_isatap_tunnel_use').moveHandle(true);
                    Ext.getCmp('tunnel_isatap_con').enable();
                }
                else{
                    Ext.getCmp('chker_isatap_tunnel_use').state = false;
                    Ext.getCmp('chker_isatap_tunnel_use').moveHandle(false);
                    Ext.getCmp('tunnel_isatap_con').disable();
                }

                if(response_isatap.entry_list.length !== 0){ store_isatap.loadData(response_isatap.entry_list); }

                if(store_isatap.data.items.length < 2){ Ext.getCmp('isatap_actioncol').items[0].disabled = true; }
                else{ Ext.getCmp('isatap_actioncol').items[0].disabled = false; }
                Ext.getCmp('ipv6tunnel_isatap_grid').getView().refresh();
            }
        );

    }

});