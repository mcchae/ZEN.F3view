
Ext.define('NFW2.view.win_monitor_ips_uid_filter', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_monitor_ips_uid_filter',

    requires: [
        'NFW2.view.win_monitor_ips_uid_filterViewModel',
        'Ext.form.Panel',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.form.field.Radio',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'win_monitor_ips_uid_filter'
    },
    cls: 'zen_win',
    id: 'win_monitor_ips_uid_filter',
    scrollable: true,
    width: 450,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            scrollable: true,
            bodyPadding: 10,
            header: false,
            title: 'My Form',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    style: {
                        border: '1px solid rgba(0, 0, 0, 0.1)'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            height: 100,
                            id: 'monitor_ips_filter_grid',
                            scrollable: true,
                            width: 400,
                            header: false,
                            title: 'My Grid Panel',
                            hideHeaders: true,
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'filter',
                                    text: 'String',
                                    flex: 1
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
                            xtype: 'radiofield',
                            id: 'monitor_ips_radio1',
                            width: 75,
                            boxLabel: 'AND',
                            checked: true,
                            listeners: {
                                change: 'onMonitor_ips_radio1Change'
                            }
                        },
                        {
                            xtype: 'radiofield',
                            id: 'monitor_ips_radio2',
                            width: 75,
                            boxLabel: 'OR',
                            listeners: {
                                change: 'onMonitor_ips_radio2Change'
                            }
                        },
                        {
                            xtype: 'combobox',
                            id: 'monitor_ips_filter_com1',
                            width: 175,
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: {
                                data: [
                                    {
                                        name: __zen('rule_id'),
                                        value: 1
                                    },
                                    {
                                        name: __zen('sig_name'),
                                        value: 2
                                    },
                                    {
                                        name: __zen('src'),
                                        value: 3
                                    },
                                    {
                                        name: __zen('src_port'),
                                        value: 4
                                    },
                                    {
                                        name: __zen('dest'),
                                        value: 5
                                    },
                                    {
                                        name: __zen('dest_port'),
                                        value: 6
                                    },
                                    {
                                        name: __zen('action'),
                                        value: 7
                                    },
                                    {
                                        name: __zen('hazard'),
                                        value: 8
                                    }
                                ],
                                fields: [
                                    {
                                        name: 'name'
                                    },
                                    {
                                        name: 'value'
                                    }
                                ]
                            },
                            valueField: 'value',
                            listeners: {
                                afterrender: 'onComboboxAfterRender',
                                change: 'onMonitor_ips_filter_com1Change'
                            }
                        },
                        {
                            xtype: 'combobox',
                            validator: function(value) {
                                if(value !== true){
                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                }

                                return true;
                            },
                            id: 'monitor_ips_filter_com2',
                            margin: '0 0 0 5',
                            width: 100,
                            msgTarget: 'none',
                            editable: false,
                            emptyText: 'select',
                            displayField: 'name',
                            valueField: 'value',
                            listeners: {
                                errorchange: 'onMonitor_ips_filter_com2ErrorChange',
                                blur: 'onMonitor_ips_filter_com2Blur'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'monitor_ips_filter_con1',
                    margin: '5 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value !== true){
                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                }
                                return true;
                            },
                            flex: 1,
                            id: 'monitor_ips_filter_text1',
                            msgTarget: 'none',
                            enforceMaxLength: true,
                            maskRe: /[a-zA-Z0-9./\#/!@$%^&*()-=?_']/,
                            maxLength: 31,
                            listeners: {
                                errorchange: 'onMonitor_ips_filter_text1ErrorChange',
                                blur: 'onMonitor_ips_filter_text1Blur'
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
                            flex: 1,
                            hidden: true,
                            id: 'monitor_ips_filter_text2',
                            msgTarget: 'none',
                            enforceMaxLength: true,
                            maskRe: /[0-9.]/,
                            maxLength: 15,
                            listeners: {
                                errorchange: 'onMonitor_ips_filter_text2ErrorChange',
                                blur: 'onMonitor_ips_filter_text2Blur'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value !== true){
                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                    if(!LengthCheck(value, 0, 65535)){ return ValidLimit(0, 65535); }
                                }
                                return true;
                            },
                            flex: 1,
                            hidden: true,
                            id: 'monitor_ips_filter_text3',
                            msgTarget: 'none',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 5,
                            listeners: {
                                errorchange: 'onMonitor_ips_filter_text3ErrorChange',
                                blur: 'onMonitor_ips_filter_text3Blur'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
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
                        },
                        {
                            xtype: 'button',
                            cls: 'btn_b',
                            margin: '0 0 0 5',
                            iconCls: 'icb_del',
                            bind: {
                                text: '{del}'
                            },
                            listeners: {
                                click: 'onButtonClick1'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    height: 25,
                    hidden: true,
                    items: [
                        {
                            xtype: 'label',
                            cls: 'errorBox',
                            hidden: true,
                            id: 'monitor_ips_filter_error'
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        render: 'onWin_monitor_ips_uid_filterRender',
        afterrender: 'onWin_monitor_ips_uid_filterAfterRender'
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
                    cls: 'ft_cancel',
                    bind: {
                        text: '{reset}'
                    },
                    listeners: {
                        click: 'onButtonClick3'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{apply}'
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
                        click: 'onButtonClick2'
                    }
                }
            ]
        }
    ],

    onMonitor_ips_radio1Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){ Ext.getCmp('monitor_ips_radio2').setValue(false); }
        else{ Ext.getCmp('monitor_ips_radio2').setValue(true); }
    },

    onMonitor_ips_radio2Change: function(field, newValue, oldValue, eOpts) {
        if(newValue){ Ext.getCmp('monitor_ips_radio1').setValue(false); }
        else{ Ext.getCmp('monitor_ips_radio1').setValue(true); }
    },

    onComboboxAfterRender: function(component, eOpts) {
        var inter = Ext.getCmp('monitor_ips_filter_com1').getStore().data;

        if(inter.length > 0){
            Ext.getCmp("monitor_ips_filter_com1").setValue(inter.items[0].data['value']);
        }
    },

    onMonitor_ips_filter_com1Change: function(field, newValue, oldValue, eOpts) {
        Ext.getCmp('monitor_ips_filter_com2').reset();
        Ext.getCmp('monitor_ips_filter_text1').reset();
        Ext.getCmp('monitor_ips_filter_text2').reset();
        Ext.getCmp('monitor_ips_filter_text3').reset();

        if(newValue === 1){
            Ext.getCmp('monitor_ips_filter_con1').disable(true);
            Ext.getCmp('monitor_ips_filter_com2').enable(true);
            var search_check = "all";

            if(Ext.getCmp('win_monitor_ips_uid_filter').mode === "board"){ search_check = "on"; }
            else{ search_check = "all"; }

            var _params = {
                mode : Ext.encode('policy'),
                menu_type : Ext.encode('dashboard'),
                search_check : Ext.encode(search_check),
                search_type : Ext.encode('all')
                //         start : Ext.encode(0),
                //         limit : Ext.encode(60)
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getIPSDashboardConf',
                _params,

                function(response){
                    var record = [];
                    for(var i in response.list){
                        if(response.list[i]['@uid'] === 0){
                            record.push({
                                'name' : __zen('ids_mode'),
                                'value' : 0
                            });
                        }
                        else{
                            record.push({
                                'name' : response.list[i]['@uid'],
                                'value' : response.list[i]['@uid']
                            });
                        }
                    }
                    record.sort(function(a,b){
                        if(a.value > b.value){ return 1; }
                        if(a.value < b.value){ return -1; }

                        return 0;
                    });
                    var att_top = {
                        data: record,
                        fields:[
                            {
                                name: 'value'
                            },
                            {
                                name : 'name'
                            }
                        ]
                    };
                    Ext.getCmp('monitor_ips_filter_com2').bindStore(att_top);
                }
            );
        }
        else if(newValue === 2){
            Ext.getCmp('monitor_ips_filter_text1').show();
            Ext.getCmp('monitor_ips_filter_text2').hide();
            Ext.getCmp('monitor_ips_filter_text3').hide();
            Ext.getCmp('monitor_ips_filter_con1').enable(true);
            Ext.getCmp('monitor_ips_filter_com2').disable(true);
        }
        else if(newValue === 3){
            Ext.getCmp('monitor_ips_filter_text2').show();
            Ext.getCmp('monitor_ips_filter_text1').hide();
            Ext.getCmp('monitor_ips_filter_text3').hide();
            Ext.getCmp('monitor_ips_filter_text2').reset();
            Ext.getCmp('monitor_ips_filter_con1').enable(true);
            Ext.getCmp('monitor_ips_filter_com2').disable(true);
        }
        else if(newValue === 4){
            Ext.getCmp('monitor_ips_filter_text3').show();
            Ext.getCmp('monitor_ips_filter_text2').hide();
            Ext.getCmp('monitor_ips_filter_text1').hide();
            Ext.getCmp('monitor_ips_filter_text3').reset();
            Ext.getCmp('monitor_ips_filter_con1').enable(true);
            Ext.getCmp('monitor_ips_filter_com2').disable(true);
        }
        else if(newValue === 5){
            Ext.getCmp('monitor_ips_filter_text2').show();
            Ext.getCmp('monitor_ips_filter_text1').hide();
            Ext.getCmp('monitor_ips_filter_text3').hide();
            Ext.getCmp('monitor_ips_filter_text2').reset();
            Ext.getCmp('monitor_ips_filter_con1').enable(true);
            Ext.getCmp('monitor_ips_filter_com2').disable(true);
        }
        else if(newValue === 6){
            Ext.getCmp('monitor_ips_filter_text3').show();
            Ext.getCmp('monitor_ips_filter_text2').hide();
            Ext.getCmp('monitor_ips_filter_text1').hide();
            Ext.getCmp('monitor_ips_filter_text3').reset();
            Ext.getCmp('monitor_ips_filter_con1').enable(true);
            Ext.getCmp('monitor_ips_filter_com2').disable(true);
        }
        else{
            Ext.getCmp('monitor_ips_filter_con1').disable(true);
            Ext.getCmp('monitor_ips_filter_com2').enable(true);
            Ext.getCmp('monitor_ips_filter_com2').reset();

            if(newValue === 7){
                var att_top = {
                    data:[
                        {
                            'name' : __zen('detect'),
                            'value' : 1
                        },
                        {
                            'name' : __zen('deny'),
                            'value' : 2
                        }
                    ],
                    fields:[
                        {
                            name: 'name'
                        },
                        {
                            name: 'value'
                        }
                    ]
                };
            }
            else{
                var att_top = {
                    data:[
                        {
                            'name' : 'Critical',
                            'value' : 1
                        },
                        {
                            'name' : 'High',
                            'value' : 2
                        },
                        {
                            'name' : 'Normal',
                            'value' : 3
                        },
                        {
                            'name' : 'Low',
                            'value' : 4
                        }
                    ],
                    fields:[
                        {
                            name: 'name'
                        },
                        {
                            name: 'value'
                        }
                    ]
                };
            }

            Ext.getCmp('monitor_ips_filter_com2').bindStore(att_top);
        }
    },

    onMonitor_ips_filter_com2ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onMonitor_ips_filter_com2Blur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onMonitor_ips_filter_text1ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onMonitor_ips_filter_text1Blur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onMonitor_ips_filter_text2ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onMonitor_ips_filter_text2Blur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onMonitor_ips_filter_text3ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onMonitor_ips_filter_text3Blur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onButtonClick: function(button, e, eOpts) {
        var store = Ext.getCmp('monitor_ips_filter_grid').getStore();
        var rec1;
        var rec2;
        var rec3;
        var rec4;

        for(var i in Ext.getCmp('monitor_ips_filter_com1').getStore().data.items){
            if(Ext.getCmp('monitor_ips_filter_com1').getValue() === Ext.getCmp('monitor_ips_filter_com1').getStore().data.items[i].data.value){ rec2 = Ext.getCmp('monitor_ips_filter_com1').getStore().data.items[i].data.name; }
        }

        if(Ext.getCmp('monitor_ips_filter_com1').getValue() === 1){
            if(Ext.getCmp('monitor_ips_filter_com2').isValid() === false){
                Ext.getCmp('monitor_ips_filter_error').setText(Ext.getCmp('monitor_ips_filter_com2').validator(Ext.getCmp('monitor_ips_filter_com2').getValue()));
                Ext.getCmp('monitor_ips_filter_com2').focus();
                return false;
            }
            if(Ext.getCmp('monitor_ips_filter_com2').getValue() === 0){ rec3 = "IDS모드"; }
            else{ rec3 = Ext.getCmp('monitor_ips_filter_com2').getValue(); }
        //     rec4 = Ext.getCmp('monitor_ips_filter_com2').getValue();
        }
        else if(Ext.getCmp('monitor_ips_filter_com1').getValue() === 2){
            if(Ext.getCmp('monitor_ips_filter_text1').isValid() === false){
                Ext.getCmp('monitor_ips_filter_error').setText(Ext.getCmp('monitor_ips_filter_text1').validator(Ext.getCmp('monitor_ips_filter_text1').getValue()));
                Ext.getCmp('monitor_ips_filter_text1').focus();
                return false;
            }
            rec3 = Ext.getCmp('monitor_ips_filter_text1').getValue();
        //     rec4 = rec3;
        }
        else if(Ext.getCmp('monitor_ips_filter_com1').getValue() === 3){
            if(Ext.getCmp('monitor_ips_filter_text2').isValid() === false){
                Ext.getCmp('monitor_ips_filter_error').setText(Ext.getCmp('monitor_ips_filter_text2').validator(Ext.getCmp('monitor_ips_filter_text2').getValue()));
                Ext.getCmp('monitor_ips_filter_text2').focus();
                return false;
            }
            rec3 = Ext.getCmp('monitor_ips_filter_text2').getValue();
        //     rec4 = rec3;
        }
        else if(Ext.getCmp('monitor_ips_filter_com1').getValue() === 4){
            if(Ext.getCmp('monitor_ips_filter_text3').isValid() === false){
                Ext.getCmp('monitor_ips_filter_error').setText(Ext.getCmp('monitor_ips_filter_text3').validator(Ext.getCmp('monitor_ips_filter_text3').getValue()));
                Ext.getCmp('monitor_ips_filter_text3').focus();
                return false;
            }
            rec3 = Ext.getCmp('monitor_ips_filter_text3').getValue();
        //     rec4 = rec3;
        }
        else if(Ext.getCmp('monitor_ips_filter_com1').getValue() === 5){
            if(Ext.getCmp('monitor_ips_filter_text2').isValid() === false){
                Ext.getCmp('monitor_ips_filter_error').setText(Ext.getCmp('monitor_ips_filter_text2').validator(Ext.getCmp('monitor_ips_filter_text2').getValue()));
                Ext.getCmp('monitor_ips_filter_text2').focus();
                return false;
            }
            rec3 = Ext.getCmp('monitor_ips_filter_text2').getValue();
        //     rec4 = rec3;
        }
        else if(Ext.getCmp('monitor_ips_filter_com1').getValue() === 6){
            if(Ext.getCmp('monitor_ips_filter_text3').isValid() === false){
                Ext.getCmp('monitor_ips_filter_error').setText(Ext.getCmp('monitor_ips_filter_text3').validator(Ext.getCmp('monitor_ips_filter_text3').getValue()));
                Ext.getCmp('monitor_ips_filter_text3').focus();
                return false;
            }
            rec3 = Ext.getCmp('monitor_ips_filter_text3').getValue();
        //     rec4 = rec3;
        }
        else if(Ext.getCmp('monitor_ips_filter_com1').getValue() === 7){
            if(Ext.getCmp('monitor_ips_filter_com2').isValid() === false){
                Ext.getCmp('monitor_ips_filter_error').setText(Ext.getCmp('monitor_ips_filter_com2').validator(Ext.getCmp('monitor_ips_filter_com2').getValue()));
                Ext.getCmp('monitor_ips_filter_com2').focus();
                return false;
            }
            if(Ext.getCmp('monitor_ips_filter_com2').getValue() === 1){ rec3 = "탐지"; }
            else{ rec3 = "차단"; }
        //     rec4 = Ext.getCmp('monitor_ips_filter_com2').getValue();
        }
        else{
            if(Ext.getCmp('monitor_ips_filter_com2').isValid() === false){
                Ext.getCmp('monitor_ips_filter_error').setText(Ext.getCmp('monitor_ips_filter_com2').validator(Ext.getCmp('monitor_ips_filter_com2').getValue()));
                Ext.getCmp('monitor_ips_filter_com2').focus();
                return false;
            }
            else if(Ext.getCmp('monitor_ips_filter_com2').getValue() === 1){ rec3 = "critical"; }
            else if(Ext.getCmp('monitor_ips_filter_com2').getValue() === 2){ rec3 = "high"; }
            else if(Ext.getCmp('monitor_ips_filter_com2').getValue() === 3){ rec3 = "normal"; }
            else{ rec3 = "low"; }
        //     rec4 = Ext.getCmp('monitor_ips_filter_com2').getValue();
        }

        if(Ext.getCmp('monitor_ips_radio1').getValue()){ rec1 = "AND"; }
        else{ rec1 = "OR"; }

        var record = [];

        record.push({
            'filter' : rec1 + " " + rec2 + " " + rec3
        });

        store.add(record);
    },

    onButtonClick1: function(button, e, eOpts) {
        var grid = Ext.getCmp('monitor_ips_filter_grid');
        var store = Ext.getCmp('monitor_ips_filter_grid').getStore();

        if(grid.getSelectionModel().getSelection().length !== 0){
            store.remove(grid.getSelectionModel().getSelection()[0]);
            Ext.getCmp('monitor_ips_filter_error').hide();
        }
        else{
            Ext.getCmp('monitor_ips_filter_error').show();
            Ext.getCmp('monitor_ips_filter_error').setText(get_msg('err_del'));
        }
    },

    onWin_monitor_ips_uid_filterRender: function(component, eOpts) {
        var att_top = {
            fields:[
                {
                    name: 'filter'
                },
                {
                    name: 'content_num'
                }
            ]
        };

        Ext.getCmp('monitor_ips_filter_grid').reconfigure(att_top);
    },

    onWin_monitor_ips_uid_filterAfterRender: function(component, eOpts) {
        component.setTitle(__zen('filter_set'));

        if(Ext.getCmp('NFW2_monitor_ips_uid').filter_set){
            var record = [];

            for(var i in Ext.getCmp('NFW2_monitor_ips_uid').filter_grid){
                record.push({
                    'filter' : Ext.getCmp('NFW2_monitor_ips_uid').filter_grid[i].data.filter
                });
            }

            Ext.getCmp('monitor_ips_filter_grid').getStore().loadData(record);
        }
        else if(Ext.getCmp('win_monitor_ips_uid_filter').get_filter){
            var filter_record = [];

            for(var j in Ext.getCmp('win_monitor_ips_uid_filter').get_filter){
                filter_record.push({
                    'filter' : Ext.getCmp('win_monitor_ips_uid_filter').get_filter[j]
                });
            }

            Ext.getCmp('monitor_ips_filter_grid').getStore().loadData(filter_record);
        }
    },

    onButtonClick3: function(button, e, eOpts) {
        Ext.getCmp('monitor_ips_filter_grid').getStore().removeAll();
    },

    onButtonClick4: function(button, e, eOpts) {
        var me = this;

        if(Ext.getCmp('monitor_ips_filter_grid').getStore().getCount() === 0){
            Ext.getCmp('monitor_ips_filter_label').setText(__zen('filter_unused'));
            Ext.getCmp('monitor_ips_filter_label1').setText(__zen('filter_unused'));
        }
        else{
            Ext.getCmp('monitor_ips_filter_label').setText(__zen('filter_used'));
            Ext.getCmp('monitor_ips_filter_label1').setText(__zen('filter_used'));
        }

        var store = Ext.getCmp('monitor_ips_filter_grid').getStore();
        var com_store = Ext.getCmp('monitor_ips_filter_com1').getStore();
        var filter = [];
        var filter_up = [];

        for(var i in store.data.items){
            filter_up.push(store.data.items[i].data.filter);
            var temp = store.data.items[i].data.filter.split(' ');
            for(var j in com_store.data.items){
                if(temp[1] === com_store.data.items[j].data.name){ temp[1] = com_store.data.items[j].data.value; }
            }

            filter.push({
                'calculator' : temp[0],
                'setting' : temp[1]
                //         'content' : store.data.items[i].data.content_num
            });
        }

        Ext.getCmp('NFW2_monitor_ips_uid').filter_grid = store.data.items;
        Ext.getCmp('NFW2_monitor_ips_uid').filter = filter;

        var _params = {};
        Ext.getCmp('NFW2_monitor_ips_uid').filter_set = true;

        if(me.mode === "board"){
            if(filter.length === 0){
                _params = {
                    mode : Ext.encode('filtering'),
                    obj : Ext.encode({'update_all':[]}),
                    menu_type : Ext.encode('dashboard')
                };

            }
            else{
                _params = {
                    mode : Ext.encode('filtering'),
                    obj : Ext.encode({'update_all':filter_up}),
                    menu_type : Ext.encode('dashboard')
                };
            }
        }
        else{
            if(filter.length === 0){
                _params = {
                    mode : Ext.encode('filtering'),
                    obj : Ext.encode({'update_all':[]}),
                    menu_type : Ext.encode('monitor')
                };

            }
            else{
                _params = {
                    mode : Ext.encode('filtering'),
                    obj : Ext.encode({'update_all':filter_up}),
                    menu_type : Ext.encode('monitor')
                };
            }
        }

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setIPSDashboardConf',
            _params,

            function(response){
            }
        );

        this.close();
    },

    onButtonClick2: function(button, e, eOpts) {
        this.close();
    }

});