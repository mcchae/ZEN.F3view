
Ext.define('NFW2.view.NFW2_network_ha_l3', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_ha_l3',

    requires: [
        'NFW2.view.NFW2_network_ha_l3ViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_network_ha_l3'
    },
    cls: 'zen_body',
    id: 'NFW2_network_ha_l3',
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
                    id: 'btn_ok',
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
                        click: 'onButtonClick4'
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
                        layout: 'auto',
                        items: [
                            {
                                xtype: 'combobox',
                                id: 'compose',
                                margin: '5 0 0 0',
                                width: 300,
                                labelSeparator: ' ',
                                labelWidth: 120,
                                value: 'Active-Active',
                                editable: false,
                                displayField: 'val',
                                store: 'store_l3_compose',
                                valueField: 'val',
                                bind: {
                                    fieldLabel: '{config}'
                                },
                                listeners: {
                                    change: 'onComposeChange'
                                }
                            },
                            {
                                xtype: 'combobox',
                                id: 'config',
                                margin: '5 0 0 0',
                                width: 300,
                                labelSeparator: ' ',
                                labelWidth: 120,
                                value: 'Active(Master)',
                                editable: false,
                                displayField: 'val',
                                store: 'store_l3_config_a',
                                valueField: 'val',
                                bind: {
                                    fieldLabel: '{set}'
                                },
                                listeners: {
                                    change: 'onConfigChange'
                                }
                            },
                            {
                                xtype: 'combobox',
                                id: 'way',
                                margin: '5 0 0 0',
                                width: 300,
                                labelSeparator: ' ',
                                labelWidth: 120,
                                value: 'Keep Synchronous',
                                editable: false,
                                displayField: 'name',
                                store: 'store_l3_way_a',
                                valueField: 'val',
                                bind: {
                                    fieldLabel: '{method}'
                                }
                            },
                            {
                                xtype: 'container',
                                margin: '5 0 8 0',
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
                                            text: '{basic_group_num}'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        validator: function(value) {
                                            if(value !== true){
                                                if(!CheckNotNull(value)){ return get_error_msg('err_required'); }
                                                if(!ValidNum(value)){ return get_error_msg('err_form'); }
                                                if(!LengthCheck(value, 1, 254)){ return ValidLimit(1, 254); }
                                            }
                                            return true;
                                        },
                                        fieldInfo: '',
                                        id: 'group_n',
                                        width: 80,
                                        labelSeparator: ' ',
                                        labelWidth: 120,
                                        msgTarget: 'none',
                                        value: 100,
                                        enforceMaxLength: true,
                                        maskRe: /[0-9]/,
                                        maxLength: 3,
                                        minLength: 1,
                                        listeners: {
                                            errorchange: 'onGroup_nErrorChange',
                                            keydown: 'onGroup_nKeydown',
                                            focus: 'onGroup_nFocus',
                                            blur: 'onGroup_nBlur'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'button',
                                cls: 'btn_b',
                                componentCls: 'btn_auth',
                                id: 'btn_add',
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
                                store: 'store_ha_head_list',
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'inter',
                                        flex: 1,
                                        bind: {
                                            text: '{inter}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'col_vir_back',
                                        dataIndex: 'virtual_a_ip',
                                        flex: 1,
                                        bind: {
                                            text: '{active_virtual_ip}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'machine_ip',
                                        flex: 1,
                                        bind: {
                                            text: '{l3_device_ip}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'col_back',
                                        dataIndex: 'virtual_b_ip',
                                        flex: 1,
                                        bind: {
                                            text: '{backup_virtual_ip}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'col_bm',
                                        dataIndex: 'master_b_ip',
                                        flex: 1,
                                        bind: {
                                            text: '{backup_device_ip}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'period',
                                        flex: 1,
                                        bind: {
                                            text: '{check_period}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'timeout',
                                        flex: 1,
                                        bind: {
                                            text: '{timeout}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'group_num',
                                        flex: 1,
                                        bind: {
                                            text: '{group_num}'
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

    onComposeChange: function(field, newValue, oldValue, eOpts) {
        var grid = Ext.getCmp("grid_list").getStore();
        var me = this;

        var compose = Ext.getCmp("compose");
        var config = Ext.getCmp("config");
        var way = Ext.getCmp("way");
        var group_n = Ext.getCmp("group_n");

        var config_a = Ext.data.StoreManager.lookup("store_l3_config_a");
        var config_s = Ext.data.StoreManager.lookup("store_l3_config_s");

        var way_a = Ext.data.StoreManager.lookup("store_l3_way_a");
        var way_s = Ext.data.StoreManager.lookup("store_l3_way_s");


        if(newValue === "Active-Active"){

            config.bindStore(config_a);
            way.bindStore(way_a);
            config.setValue("Active(Master)");
            way.setValue("Keep Synchronous");
            Ext.getCmp("col_back").show();
        }else{

            config.bindStore(config_s);
            way.bindStore(way_s);
            config.setValue("Active(Master)");
            way.setValue("Keep Setting");
            Ext.getCmp("col_back").hide();
        }

        var obj = {
            'head_mode' : {
                'compose' : compose.getValue(),
                'config' : config.getValue(),
                'way': way.getValue(),
                'group_num': group_n.getValue()
            }
        };

        var _params = {
            ha_head_script : Ext.encode(obj)
        };

        if(me.compose !== newValue){

            if(grid.data.length > 0){
                Ext.Msg.confirm(__weguardia,get_msg('conf_ha_compose'),function(btn){
                    if(btn === "yes"){

                        request_helper.xmlrpc_call_JsonP('ftuctrl','set_ha_head_mode',_params,function(response){
                            me.get_ha_head_list();
                        });
                    }else{

                        Ext.getCmp("compose").setValue(oldValue);
                    }
                });
            }

        }
    },

    onConfigChange: function(field, newValue, oldValue, eOpts) {
        var compose = Ext.getCmp("compose");

        var col_bm = Ext.getCmp("col_bm");
        var col_back = Ext.getCmp("col_back");
        var col_vir_back = Ext.getCmp("col_vir_back");

        if(newValue === "Active(Master)"){
            col_bm.setText(__zen('backup_device_ip'));
            col_vir_back.setText(__zen('active_virtual_ip'));
        }else{
            col_bm.setText(__zen('master_device_ip'));

            if(compose.getValue() === "Active-Standby"){
                col_vir_back.setText(__zen('backup_virtual_ip'));
            }
        }
    },

    onGroup_nErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onGroup_nKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onGroup_nFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1 ~ 254';
        setTipFocus(this,component);
    },

    onGroup_nBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('group_n').validateValue(true);
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var compose = Ext.getCmp("compose");
        var config = Ext.getCmp("config");
        var way = Ext.getCmp("way");
        var group_n = Ext.getCmp("group_n");

        var win = Ext.create("NFW2.view.win_ha_l3");

        if(me.compose === compose.getValue() && me.config === config.getValue() && me.way === way.getValue() && me.group_num === group_n.getValue()){

            win.show();
        }else{

            Ext.MessageBox.confirm(__weguardia,get_msg('conf_ha_setting'),function(btn){

                if(btn === "yes"){
                    me.set_ha_head_mode('add');
                }else{
                    return false;
                }
            });
        }
    },

    onButtonClick2: function(button, e, eOpts) {
        var tbl = Ext.getCmp("grid_list");
        var grid_chk = tbl.getSelectionModel().getSelection();

        var me = this;

        if(grid_chk.length === 0){
            Ext.Msg.alert(__weguardia,get_msg("sel_del"));
            return false;
        }

        Ext.MessageBox.confirm(__weguardia,get_msg("conf_del"),function(btn){
            if(btn === "yes"){

                var obj = new Object();

                var del = new Array();

                var compose = Ext.getCmp("compose");

                for(var i=0; i<grid_chk.length; i++){
                    obj = {
                        'interface': grid_chk[i].data.inter
                    };
                    del.push(obj);
                }

                obj = {
                    'head_mode' : {
                        'compose': compose.getValue()
                    },
                    'checkers' : del
                };

                var _params = {
                    ha_head_script : Ext.encode(obj)
                };

                request_helper.xmlrpc_call_JsonP('ftuctrl','del_ha_head_script',_params,function(response){

                    me.get_ha_head_list();

                });
            }

        });
    },

    onGrid_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create("NFW2.view.win_ha_l3",{
            edit : "edit",
            cid : record.data.cid
        });

        win.show();
    },

    onPanelAfterRender: function(component, eOpts) {
        var _params = {};
        this.fieldInfo = makeZenTip();

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_ha_branch_list',
            _params,
            function(response){

                if(response.checkers.total > 0){
                    prt_errMsg(get_msg('err_ha'),null);
                }
            }
        );

        this.get_ha_head_list();

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
        var me = this;
        var grid = Ext.getCmp("grid_list").getStore();

        var compose = Ext.getCmp("compose");
        var config = Ext.getCmp("config");
        var way = Ext.getCmp("way");
        var group_n = Ext.getCmp("group_n");

        if(group_n.isValid()===false){ group_n.focus(); return false; }

        Ext.Msg.alert(__weguardia,get_msg("msg_ok_add"));
        if(me.compose === compose.getValue() && me.config === config.getValue() && me.way === way.getValue() && me.group_num === group_n.getValue()){
            return false;
        }

        var obj = {
            'head_mode' : {
                'compose' : compose.getValue(),
                'config' : config.getValue(),
                'way': way.getValue(),
                'group_num': group_n.getValue()
            }
        };

        var _params = {
            ha_head_script : Ext.encode(obj)
        };

        if(grid.data.length !== 0){

            request_helper.xmlrpc_call_JsonP('ftuctrl','set_ha_head_mode',_params,function(response){
                Ext.Msg.alert(__weguardia,get_msg("msg_ok_add"));
                adminAlarmRefresh();
                me.get_ha_head_list();
            });

        }else{

            request_helper.xmlrpc_call_JsonP('ftuctrl','set_ha_head_mode',_params,function(response){
                Ext.Msg.alert(__weguardia,get_msg("msg_ok_add"));
                adminAlarmRefresh();
                me.get_ha_head_list();
            });
        }

    },

    onButtonClick4: function(button, e, eOpts) {
        this.get_ha_head_list();
    },

    set_ha_head_mode: function(add) {
        var me = this;
        var grid = Ext.getCmp("grid_list").getStore();

        var compose = Ext.getCmp("compose");
        var config = Ext.getCmp("config");
        var way = Ext.getCmp("way");
        var group_n = Ext.getCmp("group_n");

        if(group_n.isValid()===false){ group_n.focus(); return false; }

        if(me.compose === compose.getValue() && me.config === config.getValue() && me.way === way.getValue() && me.group_num === group_n.getValue()){
            return false;
        }

        var obj = {
            'head_mode' : {
                'compose' : compose.getValue(),
                'config' : config.getValue(),
                'way': way.getValue(),
                'group_num': group_n.getValue()
            }
        };

        var _params = {
            ha_head_script : Ext.encode(obj)
        };

        if(grid.data.length !== 0){

            request_helper.xmlrpc_call_JsonP('ftuctrl','set_ha_head_mode',_params,function(response){
                me.get_ha_head_list();
                if(add){
                    var win = Ext.create("NFW2.view.win_ha_l3");
                    win.show();
                }
            });

        }else{

            request_helper.xmlrpc_call_JsonP('ftuctrl','set_ha_head_mode',_params,function(response){
                me.get_ha_head_list();
                if(add){
                    var win = Ext.create("NFW2.view.win_ha_l3");
                    win.show();
                }
            });
        }

    },

    get_ha_head_list: function(type) {
        var me = this;

        var _store = Ext.data.StoreManager.lookup("store_ha_head_list");

        _store.removeAll();

        var _params = '';

        var config = Ext.getCmp("config");
        var way = Ext.getCmp("way");

        var config_a = Ext.data.StoreManager.lookup("store_l3_config_a");
        var config_s = Ext.data.StoreManager.lookup("store_l3_config_s");

        var way_a = Ext.data.StoreManager.lookup("store_l3_way_a");
        var way_s = Ext.data.StoreManager.lookup("store_l3_way_s");

        var _params = {};

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_ha_head_list',
            _params,
            function(response){

                hideLoadMask();

                var mode = response.head_mode;
                var checkers = response.checkers;

                me.compose = mode.compose;
                me.config = mode.config;
                me.way = mode.way;
                me.group_num = mode.group_num;

                Ext.getCmp("compose").setValue(mode.compose);
                Ext.getCmp("config").setValue(mode.config);
                Ext.getCmp("way").setValue(mode.way);

                Ext.getCmp("group_n").setValue(mode.group_num);

                if(mode.compose === "Active-Active"){
                    Ext.getCmp("col_back").show();
                }else{
                    Ext.getCmp("col_back").hide();
                    Ext.getCmp("col_bm").show();
                }

                var ar_c = new Array();

                for(var i=0; i<checkers.list.length; i++){

                    if(mode.compose === "Active-Active"){
                        var virtual_ip = checkers.list[i].virtual_active_ip;
                    }else{
                        var virtual_ip = checkers.list[i].virtual_ip;
                    }

                    var obj = {
                        "inter" : checkers.list[i]['interface'],
                        "virtual_a_ip" : virtual_ip,
                        "machine_ip" : checkers.list[i].machine_ip,
                        "virtual_b_ip" : checkers.list[i].virtual_backup_ip,
                        "master_b_ip" : checkers.list[i].master_backup_ip,
                        "period" : checkers.list[i].period,
                        "timeout" : checkers.list[i].timeout,
                        "group_num" : checkers.list[i].group_num,
                        "cid" : checkers.list[i].cid
                    };
                    ar_c.push(obj);
                }

                var data = ar_c;

                _store.add(data);
            }
        );
    }

});