
Ext.define('NFW2.view.NFW2_network_ha_l2', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_ha_l2',

    requires: [
        'NFW2.view.NFW2_network_ha_l2ViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_network_ha_l2'
    },
    cls: 'zen_body',
    id: 'NFW2_network_ha_l2',
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
                        click: 'onButtonClick2'
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
                                xtype: 'container',
                                margin: '5 0 0 0',
                                items: [
                                    {
                                        xtype: 'combobox',
                                        id: 'compose',
                                        width: 300,
                                        labelSeparator: ' ',
                                        labelWidth: 120,
                                        value: 'Active-Active',
                                        editable: false,
                                        displayField: 'val',
                                        store: 'store_l2_compose',
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
                                        width: 300,
                                        labelSeparator: ' ',
                                        labelWidth: 120,
                                        value: 'Active(Main)',
                                        editable: false,
                                        displayField: 'val',
                                        store: 'store_l2_config_a',
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
                                        hidden: true,
                                        id: 'way',
                                        width: 300,
                                        labelSeparator: ' ',
                                        labelWidth: 120,
                                        value: 'Proxy',
                                        editable: false,
                                        displayField: 'val',
                                        store: 'store_l2_way_s',
                                        valueField: 'val',
                                        bind: {
                                            fieldLabel: '{method}'
                                        },
                                        listeners: {
                                            change: 'onWayChange'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        id: 'chk_router_con',
                                        margin: '0 0 8 10',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                width: 125,
                                                bind: {
                                                    text: '{router_backup}'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                html: '<div id="router"',
                                                listeners: {
                                                    render: 'onContainerRender'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        hidden: true,
                                        id: 'chk_router1',
                                        labelCls: 'lb_sq',
                                        labelSeparator: ' ',
                                        labelWidth: 120,
                                        boxLabelCls: 'l_chk',
                                        bind: {
                                            fieldLabel: '{router_backup}'
                                        },
                                        listeners: {
                                            change: 'onCheckboxfieldChange',
                                            beforerender: 'onChk_router1BeforeRender'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        hidden: true,
                                        id: 'c_group_n',
                                        margin: '0 0 8 0',
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
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!ValidNum(value)){ return get_msg('err_form'); }
                                                        if(Number(value) <= 0 || Number(value) > 255){ return ValidLimit(1, 255); }
                                                    }
                                                    return true;
                                                },
                                                id: 'group_num',
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
                                                    errorchange: 'onGroup_numErrorChange',
                                                    keydown: 'onGroup_numKeydown',
                                                    focus: 'onGroup_numFocus',
                                                    blur: 'onGroup_numBlur'
                                                }
                                            }
                                        ]
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
                                    click: 'onButtonClick3'
                                }
                            },
                            {
                                xtype: 'gridpanel',
                                id: 'grid_list',
                                margin: '5 0 0 0',
                                title: '',
                                columnLines: true,
                                store: 'store_ha_branch_list',
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
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            if(value === "none"){
                                                return __zen('general');
                                            }else if(value === "linelb"){
                                                return __zen('monitoring_route');
                                            }else if(value === "standby"){
                                                return __zen('line_backup');
                                            }else{
                                                var config = Ext.getCmp("config");

                                                if(config.getValue() === "Active(Main)"){
                                                    if(value === "proxy"){
                                                        return __zen('router_backup');
                                                    }else if(value === "report_serial_status"){
                                                        return __zen('monitoring_sub_device');
                                                    }
                                                }else{
                                                    if(value === "proxy"){
                                                        return __zen('main_device_backup');
                                                    }else if(value === "proxy2"){
                                                        return __zen('router_backup');
                                                    }
                                                }
                                            }
                                        },
                                        id: 'col_checker',
                                        dataIndex: 'type',
                                        flex: 1,
                                        bind: {
                                            text: '{checker_type}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'col_target_ip',
                                        dataIndex: 'target_ip',
                                        flex: 1,
                                        bind: {
                                            text: '{target_ip}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'col_virtual_ip',
                                        dataIndex: 'virtual_ip',
                                        flex: 1,
                                        bind: {
                                            text: '{virtual_ip}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'col_priority',
                                        dataIndex: 'priority',
                                        flex: 1,
                                        bind: {
                                            text: '{priority_level}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'col_chk_period',
                                        dataIndex: 'period',
                                        flex: 1,
                                        bind: {
                                            text: '{check_period}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'col_timeout',
                                        dataIndex: 'timeout',
                                        flex: 1,
                                        bind: {
                                            text: '{timeout}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'col_mac',
                                        dataIndex: 'mac',
                                        flex: 1,
                                        bind: {
                                            text: '{backup_mac}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'col_boost',
                                        dataIndex: 'boostup',
                                        text: 'Boost up',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'col_gnum',
                                        dataIndex: 'group_num',
                                        flex: 1,
                                        bind: {
                                            text: '{group_num}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'col_period',
                                        dataIndex: 'period',
                                        flex: 1,
                                        bind: {
                                            text: '{trans_cycle}'
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
        var me = this;

        var grid = Ext.getCmp("grid_list").getStore();


        var compose = Ext.getCmp("compose");
        var config = Ext.getCmp("config");
        var way = Ext.getCmp("way");
        var chk_router = Ext.getCmp("chk_router");
        var group_num = Ext.getCmp("c_group_n");

        var config_a = Ext.data.StoreManager.lookup("store_l2_config_a");
        var config_s = Ext.data.StoreManager.lookup("store_l2_config_s");

        var way_s = Ext.data.StoreManager.lookup("store_l2_way_s");

        if(newValue === "Active-Active"){

            config.bindStore(config_a);
            config.setValue("Active(Main)");
            way.hide();
            chk_router.show();
            group_num.hide();
        }else{

            config.bindStore(config_s);
            way.bindStore(way_s);
            config.setValue("Active(Main)");

            if(me.way === "VRRP"){
                way.show();
            }else{
                way.setValue("Proxy").show();
            }
        }

        me.chk_l2();

        if(me.compose !== newValue){

            if(grid.data.length > 0){

                Ext.MessageBox.confirm(__weguardia,get_msg('conf_ha_compose'),function(btn){

                    if(btn === "yes"){

                        var obj = {
                            'branch_mode': {
                                'compose': Ext.getCmp("compose").getValue(),
                                'config': Ext.getCmp('config').getValue(),
                                'way': (way.hidden)?null:Ext.getCmp("way").getValue(),
                                'use_router_backup': (Ext.getCmp("chk_router").getValue())?"on":"off",
                                'group_num': (Ext.getCmp("c_group_n").hidden)?null:Ext.getCmp("group_num").getValue()
                            }
                        };

                        var _params = {
                            'ha_branch_script': Ext.encode(obj)
                        };

                        console.log(_params);

                        request_helper.xmlrpc_call_JsonP('ftuctrl','set_ha_branch_mode',_params,function(response){
                            me.get_ha_branch_list();
                        });

                    }else{
                        compose.setValue(oldValue);
                        me.get_ha_branch_list();
                    }
                });

            }
        }
    },

    onConfigChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        var grid = Ext.getCmp("grid_list").getStore();

        var compose = Ext.getCmp("compose");
        var config = Ext.getCmp("config");
        var way = Ext.getCmp("way");

        me.chk_l2();

        if(compose.getValue() === "Active-Standby" && way.getValue() === "VRRP"){

            if(me.config !== newValue){

                if(grid.data.length > 0){

                    Ext.MessageBox.confirm(__weguardia,get_msg('conf_ha_set'),function(btn){

                        if(btn === "yes"){

                            var obj = {
                                'branch_mode': {
                                    'compose': Ext.getCmp("compose").getValue(),
                                    'config': Ext.getCmp('config').getValue(),
                                    'way': (way.hidden)?null:Ext.getCmp("way").getValue(),
                                    'use_router_backup': (Ext.getCmp("chk_router").getValue())?"on":"off",
                                    'group_num': (Ext.getCmp("c_group_n").hidden)?null:Ext.getCmp("group_num").getValue()
                                }
                            };

                            var _params = {
                                'ha_branch_script': Ext.encode(obj)
                            };

                            request_helper.xmlrpc_call_JsonP('ftuctrl','set_ha_branch_mode',_params,function(response){

                                me.get_ha_branch_list();
                            });

                        }else{
                            config.setValue(oldValue);
                            me.get_ha_branch_list();
                        }
                    });
                }

            }
        }
    },

    onWayChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        var grid = Ext.getCmp("grid_list").getStore();

        var way = Ext.getCmp("way");

        var chk_router = Ext.getCmp("chk_router_con");
        var c_group_n = Ext.getCmp("c_group_n");

        var checker = Ext.getCmp('col_checker');
        var target_ip = Ext.getCmp("col_target_ip");
        var priority = Ext.getCmp("col_priority");
        var chk_period = Ext.getCmp("col_chk_period");
        var timeout = Ext.getCmp("col_timeout");
        var mac = Ext.getCmp("col_mac");
        var gnum = Ext.getCmp("col_gnum");
        var period = Ext.getCmp("period");

        if(newValue === "Proxy"){
            chk_router.show();
            c_group_n.hide();
        }else{
            chk_router.hide();
            c_group_n.show();
        }

        me.chk_l2();

        if(me.way !== newValue){

            if(grid.data.length > 0){

                Ext.MessageBox.confirm(__weguardia,get_msg('conf_ha_way'),function(btn){
                    if(btn === "yes"){

                        var obj = {
                            'branch_mode': {
                                'compose': Ext.getCmp("compose").getValue(),
                                'config': Ext.getCmp('config').getValue(),
                                'way': (way.hidden)?null:Ext.getCmp("way").getValue(),
                                'use_router_backup': (Ext.getCmp("chk_router").getValue())?"on":"off",
                                'group_num': (Ext.getCmp("c_group_n").hidden)?null:Ext.getCmp("group_num").getValue()
                            }
                        };

                        var _params = {
                            'ha_branch_script': Ext.encode(obj)
                        };

                        request_helper.xmlrpc_call_JsonP('ftuctrl','set_ha_branch_mode',_params,function(response){

                            me.get_ha_branch_list();
                        });

                    }else{
                        way.setValue(oldValue);
                        me.get_ha_branch_list();
                    }
                });
            }

        }

    },

    onContainerRender: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'chk_router',
            renderTo: 'router',
            style:'margin-left:0px',
            resizeHandle: false,
            state: false,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    var me = this;

                    /*if(!newValue){
                    Ext.MessageBox.confirm("경고","라우터 백업을 사용하지 않을 경우, 기존 라우터 백업 목록이 사라지게 됩니다.<br>계속하시겠습니까?",function(btn){
                        if(btn === "yes"){

                            request_router();

                        }
                    });
                }else{
                    request_router();
                }

                function request_router(){
                    var obj = {
                        'branch_mode': {
                            'use_router_backup': (Ext.getCmp("chk_router").getValue())?"on":"off",
                            'group_num': Ext.getCmp("group_num").getValue()
                        }
                    };

                    var _params = {
                        'update_type': Ext.encode('use_router_backup'),
                        'ha_branch_script': Ext.encode(obj)
                    };

                    request_helper.xmlrpc_call_JsonP('ftuctrl','set_ha_branch_list',_params,function(response){
                        me.get_ha_branch_list();
                    });
                }*/
                }
            }
        });
    },

    onCheckboxfieldChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        /*if(!newValue){
            Ext.MessageBox.confirm("경고","라우터 백업을 사용하지 않을 경우, 기존 라우터 백업 목록이 사라지게 됩니다.<br>계속하시겠습니까?",function(btn){
                if(btn === "yes"){

                    request_router();

                }
            });
        }else{
            request_router();
        }

        function request_router(){
            var obj = {
                'branch_mode': {
                    'use_router_backup': (Ext.getCmp("chk_router").getValue())?"on":"off",
                    'group_num': Ext.getCmp("group_num").getValue()
                }
            };

            var _params = {
                'update_type': Ext.encode('use_router_backup'),
                'ha_branch_script': Ext.encode(obj)
            };

            request_helper.xmlrpc_call_JsonP('ftuctrl','set_ha_branch_list',_params,function(response){
                me.get_ha_branch_list();
            });
        }*/
    },

    onChk_router1BeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('use');
    },

    onGroup_numErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onGroup_numKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onGroup_numFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1 ~ 255';
        setTipFocus(this,component);
    },

    onGroup_numBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('group_num').validateValue(true);
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var chk_branch = me.chk_ha_branch();

        if(chk_branch === true){
            var win = Ext.create('NFW2.view.win_ha_l2');
            win.show();
        }else{

            Ext.MessageBox.confirm(__weguardia,get_msg('conf_ha_setting'),function(btn){

                if(btn === "yes"){
                    me.set_ha_branch_mode('add');
                }else{
                    return false;
                }
            });
        }


    },

    onButtonClick3: function(button, e, eOpts) {
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
                var config = Ext.getCmp("config");
                var way = Ext.getCmp("way");

                for(var i=0; i<grid_chk.length; i++){
                    obj = {
                        'interface': grid_chk[i].data.inter,
                        'type': grid_chk[i].data.type
                    };
                    del.push(obj);
                }

                obj = {
                    'branch_mode' : {
                        'compose': compose.getValue(),
                        'config': config.getValue(),
                        'way': way.getValue()
                    },
                    'checkers' : del
                };

                var _params = {
                    ha_branch_script : Ext.encode(obj)
                };

                request_helper.xmlrpc_call_JsonP('ftuctrl','del_ha_branch_script',_params,function(response){

                    me.get_ha_branch_list();
                });
            }

        });
    },

    onGrid_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('NFW2.view.win_ha_l2',{
            edit: "edit"
        });
        win.show();
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        this.fieldInfo = makeZenTip();
        var _params = {};

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_ha_head_list',
            _params,
            function(response){

                hideLoadMask();

                if(response.checkers.total > 0){
                    prt_errMsg(get_msg('err_ha'),null);
                }
            }
        );

        me.get_ha_branch_list();

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

        if(me.chk_ha_branch() === false){
            me.set_ha_branch_mode();
        }else{
            Ext.Msg.show({
                title: __weguardia,
                msg: get_msg("msg_ok_add"),
                width: 300,
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO
            });
        }
    },

    onButtonClick2: function(button, e, eOpts) {
        this.get_ha_branch_list();
    },

    set_ha_branch_mode: function(add) {
        var me = this;

        var compose = Ext.getCmp("compose");
        var config = Ext.getCmp("config");
        var way = Ext.getCmp("way");
        var chk_router = Ext.getCmp("chk_router");
        var group_num = Ext.getCmp("group_num");
        var err_null = Ext.getCmp("err_null");

        if(group_num.isValid()===false){ group_num.focus(); return false; }

        var obj = new Object();

        var grid = Ext.getCmp("grid_list").getStore().data;

        var a_checker = new Array();

        var router = (chk_router.getValue())?"on":"off";

        obj = {
            'branch_mode' : {
                'compose' : compose.getValue(),
                'config' : config.getValue(),
                'way' : (way.hidden)?null:way.getValue(),
                'use_router_backup' : router,
                'group_num' : (Ext.getCmp("c_group_n").hidden)?null:group_num.getValue()
            }
        };

        var _params = {
            ha_branch_script : Ext.encode(obj),
            update_flag : false
        };

        if(grid.length !== 0){

            if(me.compose === compose.getValue() && me.config === config.getValue() && me.way === way.getValue() && me.group_num !== group_num.getValue()){
                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'set_ha_branch_mode',
                    _params,
                    function(response){
                        set_branch();
                    }
                );
            }else{

                Ext.MessageBox.confirm(__weguardia,get_msg('conf_ha_set'),function(btn){
                    if(btn === "yes"){

                        request_helper.xmlrpc_call_JsonP(
                            'ftuctrl',
                            'set_ha_branch_mode',
                            _params,
                            function(response){
                                set_branch();
                            }
                        );
                    }
                });
            }
        }else{

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'set_ha_branch_mode',
                _params,
                function(response){
                    set_branch();
                }
            );
        }

        function set_branch(){
            adminAlarmRefresh();
            me.get_ha_branch_list();
            if(add){
                var win = Ext.create('NFW2.view.win_ha_l2');
                win.show();
            }else{

                Ext.Msg.show({
                    title: __weguardia,
                    msg: get_msg("msg_ok_add"),
                    width: 300,
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });
            }

        }
    },

    chk_l2: function() {
        var compose = Ext.getCmp("compose");
        var config = Ext.getCmp("config");
        var way = Ext.getCmp("way");

        var checker = Ext.getCmp('col_checker');
        var target_ip = Ext.getCmp("col_target_ip");
        var virtual_ip = Ext.getCmp("col_virtual_ip");
        var priority = Ext.getCmp("col_priority");
        var chk_period = Ext.getCmp("col_chk_period");
        var timeout = Ext.getCmp("col_timeout");
        var boost = Ext.getCmp("col_boost");
        var mac = Ext.getCmp("col_mac");
        var group_num = Ext.getCmp("col_gnum");
        var period = Ext.getCmp("col_period");

        if(compose.getValue() === "Active-Standby" && way.getValue() === "VRRP"){

            checker.hide();
            target_ip.hide();
            mac.hide();
            timeout.hide();
            chk_period.hide();

            virtual_ip.show();
            priority.show();
            group_num.show();
            period.show();

            if(config.getValue() === "Standby(Sub)"){
                boost.show();
            }else{
                boost.hide();
            }

        }else{

            checker.show();
            target_ip.show();
            mac.show();
            timeout.show();
            chk_period.show();

            virtual_ip.hide();
            priority.hide();
            group_num.hide();
            period.hide();
            boost.hide();

        }
    },

    get_ha_branch_list: function() {
        var me = this;

        var _params = '';

        var _store = Ext.data.StoreManager.lookup("store_ha_branch_list");

        _store.removeAll();

        request_helper.xmlrpc_call_JsonP('ftuctrl','get_ha_branch_list',_params,function(response){

            me.compose = response.branch_mode.compose;
            me.way = (response.branch_mode.way)?response.branch_mode.way:"Proxy";
            me.config = response.branch_mode.config;
            me.router = response.branch_mode.use_router_backup;
            me.group_num = response.branch_mode.group_num;

            Ext.getCmp("compose").setValue(response.branch_mode.compose);
            Ext.getCmp("config").setValue(response.branch_mode.config);

            if(response.branch_mode.compose === "Active-Standby"){
                Ext.getCmp("way").setValue(response.branch_mode.way);
                if(response.branch_mode.way === "VRRP"){
                    Ext.getCmp("group_num").setValue(response.branch_mode.group_num);
                }else{
                    if(response.branch_mode.use_router_backup === "on"){
                        Ext.getCmp("chk_router").state = true;
                        Ext.getCmp("chk_router").moveHandle(true);
                    }else{
                        Ext.getCmp("chk_router").state = false;
                        Ext.getCmp("chk_router").moveHandle(false);
                    }
                }
            }else{
                if(response.branch_mode.use_router_backup === "on"){
                    Ext.getCmp("chk_router").state = true;
                    Ext.getCmp("chk_router").moveHandle(true);
                }else{
                    Ext.getCmp("chk_router").state = false;
                    Ext.getCmp("chk_router").moveHandle(false);
                }
            }

            me.chk_l2();

            var _store = Ext.data.StoreManager.lookup("store_ha_branch_list");

            var checkers = response.checkers;

            var ar_c = new Array();

            for(var i=0; i<checkers.list.length; i++){
                var obj = {
                    'inter': checkers.list[i]['interface'],
                    'type': checkers.list[i].type,
                    'target_ip': checkers.list[i].target_ip,
                    'timeout': checkers.list[i].timeout,
                    'period': checkers.list[i].period,
                    'mac': checkers.list[i].mac,
                    'virtual_ip': checkers.list[i].virtual_ip,
                    'priority': checkers.list[i].priority,
                    'boostup': checkers.list[i].boost_up,
                    'group_num': checkers.list[i].group_num,
                    'cid': checkers.list[i].cid
                };
                ar_c.push(obj);
            }

            var data = ar_c;
            _store.add(data);
        });
    },

    chk_ha_branch: function() {
        var me = this;

        var compose = Ext.getCmp("compose");
        var config = Ext.getCmp("config");
        var way = Ext.getCmp("way");
        var router = Ext.getCmp("chk_router");
        var group_num = Ext.getCmp("group_num");

        if(compose.getValue() === "Active-Active"){

            router = (router.getValue())?"on":"off";
            if(me.compose !== compose.getValue() || me.config !== config.getValue() || me.router !== router){
                return false;
            }
        }else{

            if(way.getValue() === "Proxy"){

                router = (router.getValue())?"on":"off";
                if(me.compose !== compose.getValue() || me.config !== config.getValue() || me.way !== way.getValue() || me.router !== router){
                    return false;
                }
            }else{

                if(me.compose !== compose.getValue() || me.config !== config.getValue() || me.way !== way.getValue() || me.group_num !== group_num.getValue()){
                    return false;
                }
            }
        }

        return true;
    }

});