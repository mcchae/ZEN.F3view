
Ext.define('NFW2.view.win_bgp_ad_setting', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_bgp_ad_setting',

    requires: [
        'NFW2.view.win_bgp_ad_settingViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.form.field.ComboBox',
        'Ext.view.Table',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.column.Action',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'win_bgp_ad_setting'
    },
    id: 'win_bgp_ad_setting',
    title: 'My Window',
    defaultListenerScope: true,

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
                    itemId: 'fld_msg1'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onButtonClick'
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
        afterrender: 'onWin_bgp_ad_settingAfterRender',
        render: 'onWin_bgp_ad_settingRender'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        bodyPadding: 10,
                        header: false,
                        title: 'My Form',
                        items: [
                            {
                                xtype: 'container',
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
                                                xtype: 'label',
                                                width: 100,
                                                text: 'TCP 포트'
                                            },
                                            {
                                                xtype: 'label',
                                                text: '179'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        margin: '8 0 0 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                id: 'bgp_ad_distance_con',
                                                margin: '8 0 10 0',
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
                                                                if(Number(value) < 1 || Number(value) > 255){ return ValidLimit(1,255); }
                                                            }

                                                            return true;
                                                        },
                                                        fieldInfo: {
                                                            txt: msg_tip_length(1,
                                                            255,
                                                            null)
                                                        },
                                                        id: 'bgp_ad_external',
                                                        width: 200,
                                                        fieldLabel: '외부망',
                                                        labelCls: 'lb_req',
                                                        labelSeparator: ' ',
                                                        msgTarget: 'none',
                                                        value: 20,
                                                        enforceMaxLength: true,
                                                        maskRe: /[0-9]/,
                                                        maxLength: 3,
                                                        listeners: {
                                                            focus: 'onTextfieldFocus',
                                                            blur: 'onTextfieldBlur',
                                                            errorchange: 'onTextfieldErrorChange'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            if(value !== true){
                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                if(Number(value) < 1 || Number(value) > 255){ return ValidLimit(1,255); }
                                                            }

                                                            return true;
                                                        },
                                                        fieldInfo: {
                                                            txt: msg_tip_length(1,
                                                            255,
                                                            null)
                                                        },
                                                        id: 'bgp_ad_internal',
                                                        margin: '0 0 0 10',
                                                        width: 200,
                                                        fieldLabel: '내부망',
                                                        labelCls: 'lb_req',
                                                        labelSeparator: ' ',
                                                        msgTarget: 'none',
                                                        value: 200,
                                                        enforceMaxLength: true,
                                                        maskRe: /[0-9]/,
                                                        maxLength: 3,
                                                        listeners: {
                                                            focus: 'onTextfieldFocus1',
                                                            blur: 'onTextfieldBlur1',
                                                            errorchange: 'onTextfieldErrorChange1'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            if(value !== true){
                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                if(Number(value) < 1 || Number(value) > 255){ return ValidLimit(1,255); }
                                                            }

                                                            return true;
                                                        },
                                                        fieldInfo: {
                                                            txt: msg_tip_length(1,
                                                            255,
                                                            null)
                                                        },
                                                        id: 'bgp_ad_local',
                                                        margin: '0 0 0 10',
                                                        width: 200,
                                                        fieldLabel: 'Local',
                                                        labelCls: 'lb_req',
                                                        labelSeparator: ' ',
                                                        msgTarget: 'none',
                                                        value: 200,
                                                        enforceMaxLength: true,
                                                        maskRe: /[0-9]/,
                                                        maxLength: 3,
                                                        listeners: {
                                                            focus: 'onTextfieldFocus2',
                                                            blur: 'onTextfieldBlur2',
                                                            errorchange: 'onTextfieldErrorChange2'
                                                        }
                                                    }
                                                ]
                                            }
                                        ],
                                        listeners: {
                                            render: 'onFieldsetRender'
                                        }
                                    },
                                    {
                                        xtype: 'fieldset',
                                        margin: '8 0 0 0',
                                        title: 'Redistribute',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                id: 'bgp_ad_redis_con',
                                                margin: '8 0 10 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'checkboxfield',
                                                        id: 'bgp_ad_redis_chk1',
                                                        width: 100,
                                                        boxLabel: 'Static',
                                                        checked: true,
                                                        listeners: {
                                                            change: 'onBgp_ad_redis_chk1Change',
                                                            blur: 'onBgp_ad_redis_chk1Blur'
                                                        }
                                                    },
                                                    me.processBgp_ad_redis_chk2({
                                                        xtype: 'checkboxfield',
                                                        id: 'bgp_ad_redis_chk2',
                                                        width: 100,
                                                        bind: {
                                                            boxLabel: '{rip}'
                                                        },
                                                        listeners: {
                                                            change: 'onBgp_ad_redis_chk2Change',
                                                            blur: 'onBgp_ad_redis_chk2Blur'
                                                        }
                                                    }),
                                                    me.processBgp_ad_redis_chk3({
                                                        xtype: 'checkboxfield',
                                                        id: 'bgp_ad_redis_chk3',
                                                        width: 100,
                                                        bind: {
                                                            boxLabel: '{ospf}'
                                                        },
                                                        listeners: {
                                                            change: 'onBgp_ad_redis_chk3Change',
                                                            blur: 'onBgp_ad_redis_chk3Blur'
                                                        }
                                                    })
                                                ]
                                            }
                                        ],
                                        listeners: {
                                            render: 'onFieldsetRender1'
                                        }
                                    },
                                    {
                                        xtype: 'fieldset',
                                        margin: '8 0 0 0',
                                        items: [
                                            {
                                                xtype: 'container',
                                                disabled: true,
                                                id: 'bgp_ad_static_con',
                                                margin: '8 0 10 0',
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        width: 620,
                                                        layout: {
                                                            type: 'hbox',
                                                            align: 'stretch',
                                                            pack: 'end'
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'container',
                                                                flex: 1
                                                            },
                                                            {
                                                                xtype: 'button',
                                                                cls: 'btn_b',
                                                                iconCls: 'icb_add',
                                                                bind: {
                                                                    text: '{add}'
                                                                },
                                                                listeners: {
                                                                    click: 'onButtonClick21'
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'gridpanel',
                                                        id: 'bgp_ad_static_grid',
                                                        margin: '8 0 0 0',
                                                        maxHeight: 100,
                                                        scrollable: {
                                                            x: false,
                                                            y: true
                                                        },
                                                        width: 620,
                                                        header: false,
                                                        title: 'My Grid Panel',
                                                        allowDeselect: true,
                                                        disableSelection: true,
                                                        columns: [
                                                            {
                                                                xtype: 'gridcolumn',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdCls = 'cell_text';
                                                                    return value;
                                                                },
                                                                sortable: false,
                                                                dataIndex: 'ipaddr',
                                                                menuDisabled: true,
                                                                flex: 1.5,
                                                                bind: {
                                                                    text: '{ip_mask}'
                                                                },
                                                                editor: {
                                                                    xtype: 'textfield',
                                                                    baseCls: 'cell_text',
                                                                    maskRe: /[0-9.\/]/,
                                                                    listeners: {
                                                                        focus: 'onTextfieldFocus11',
                                                                        blur: 'onTextfieldBlur11'
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                sortable: false,
                                                                menuDisabled: true,
                                                                bind: {
                                                                    text: '{option}'
                                                                },
                                                                columns: [
                                                                    {
                                                                        xtype: 'gridcolumn',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = 'cell_combo';

                                                                            if(value === "A.B.C.D" || value === "null0"){
                                                                                return value;
                                                                            }
                                                                            else{
                                                                                return value.charAt(0).toUpperCase() + value.slice(1);
                                                                            }
                                                                        },
                                                                        height: 0,
                                                                        dataIndex: 'type',
                                                                        text: 'Number',
                                                                        editor: {
                                                                            xtype: 'combobox',
                                                                            baseCls: 'cell_combo',
                                                                            editable: false,
                                                                            displayField: 'name',
                                                                            queryMode: 'local',
                                                                            store: {
                                                                                data: [
                                                                                    {
                                                                                        name: 'null0',
                                                                                        value: 'null0'
                                                                                    },
                                                                                    {
                                                                                        name: 'Blackhole',
                                                                                        value: 'blackhole'
                                                                                    },
                                                                                    {
                                                                                        name: 'Reject',
                                                                                        value: 'reject'
                                                                                    },
                                                                                    {
                                                                                        name: 'A.B.C.D',
                                                                                        value: 'A.B.C.D'
                                                                                    },
                                                                                    {
                                                                                        name: 'Interface',
                                                                                        value: 'interface'
                                                                                    },
                                                                                    
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
                                                                                focus: 'onComboboxFocus1',
                                                                                collapse: 'onComboboxCollapse1'
                                                                            }
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'gridcolumn',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            if(record.data.type === "A.B.C.D"){
                                                                                metaData.tdCls = 'cell_text';
                                                                                return value;
                                                                            }else if(record.data.type === "interface"){
                                                                                metaData.tdCls = 'cell_combo';
                                                                                return value;
                                                                            }
                                                                            else if(record.data.type === "null0"){
                                                                                return record.data.type;
                                                                            }
                                                                            else{
                                                                                return record.data.type.charAt(0).toUpperCase() + record.data.type.slice(1);
                                                                            }
                                                                        },
                                                                        getEditor: function(record) {
                                                                            if(record.data.type === 'A.B.C.D'){
                                                                                return Ext.create('Ext.grid.CellEditor', {
                                                                                    field: Ext.create( 'Ext.form.field.Text', {
                                                                                        baseCls:'cell_text',
                                                                                        maskRe:/[0-9.]/,
                                                                                        listeners:{
                                                                                            focus: function(component, event, eOpts){
                                                                                                var str = disp_help_ip('4s');
                                                                                                component.fieldInfo = str;

                                                                                                setTipFocus(Ext.getCmp('win_bgp_ad_setting'), component);
                                                                                            },
                                                                                            blur: function(component, event, eOpts){
                                                                                                setTipBlur(Ext.getCmp('win_bgp_ad_setting'), component);
                                                                                                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                                                                                                err_fl.removeCls('ic_msg_err');
                                                                                                err_fl.update('');
                                                                                            }
                                                                                        }
                                                                                    })
                                                                                });
                                                                            }
                                                                            else if(record.data.type === 'interface'){
                                                                                return Ext.create('Ext.grid.CellEditor', {
                                                                                    field: Ext.create( 'Ext.form.field.ComboBox', {
                                                                                        editable: false,
                                                                                        displayField: 'name',
                                                                                        valueField: 'name',
                                                                                        queryMode: 'local',
                                                                                        baseCls:'cell_combo',
                                                                                        store:'store_nw_protocol_inter',
                                                                                        listeners: {
                                                                                            focus: function(component){ component.expand(); }
                                                                                        }
                                                                                    })
                                                                                });
                                                                            }

                                                                            return "";
                                                                        },
                                                                        height: 0,
                                                                        dataIndex: 'opt',
                                                                        text: 'Date'
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdCls = 'cell_text';
                                                                    return value;
                                                                },
                                                                sortable: false,
                                                                dataIndex: 'sub_opt',
                                                                menuDisabled: true,
                                                                text: '보조 옵션',
                                                                flex: 1,
                                                                editor: {
                                                                    xtype: 'textfield',
                                                                    baseCls: 'cell_text'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'actioncolumn',
                                                                width: 45,
                                                                align: 'center',
                                                                menuDisabled: true,
                                                                items: [
                                                                    {
                                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                            var store = Ext.getCmp('bgp_ad_static_grid').getStore();

                                                                            store.removeAt(rowIndex,1);
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
                                                                pluginId: 'bgp_ad_static_plug',
                                                                clicksToEdit: 1
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ],
                                        listeners: {
                                            render: 'onFieldsetRender41'
                                        }
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

    processBgp_ad_redis_chk2: function(config) {
        config.boxLabel = true;

        return config;
    },

    processBgp_ad_redis_chk3: function(config) {
        config.boxLabel = true;

        return config;
    },

    onTextfieldFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onTextfieldBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onTextfieldErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onTextfieldFocus1: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onTextfieldBlur1: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onTextfieldErrorChange1: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onTextfieldFocus2: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onTextfieldBlur2: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onTextfieldErrorChange2: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onFieldsetRender: function(component, eOpts) {
        component.setTitle(__zen('distance'));

        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'bgp_ad_chk1',
            style:'margin-left:95px',
            resizeHandle: false,
            state: true,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    if(newValue){
                        Ext.getCmp('bgp_ad_distance_con').enable(true);
                    }
                    else{
                        Ext.getCmp('bgp_ad_distance_con').disable(true);
                    }
                }
            }
        });

        component.legend.add(tbutton);
    },

    onBgp_ad_redis_chk1Change: function(field, newValue, oldValue, eOpts) {
        var chk = false;
        if(Ext.getCmp('bgp_ad_redis_chk1').getValue()){ chk = true; }
        if(Ext.getCmp('bgp_ad_redis_chk2').getValue()){ chk = true; }
        if(Ext.getCmp('bgp_ad_redis_chk3').getValue()){ chk = true; }

        if(chk === false){
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].update(get_msg('err_select'));
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].addCls('ic_msg_err');
        }
        else{
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].update('');
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].removeCls('ic_msg_err');
        }
    },

    onBgp_ad_redis_chk1Blur: function(component, event, eOpts) {
        Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].update('');
        Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].removeCls('ic_msg_err');
    },

    onBgp_ad_redis_chk2Change: function(field, newValue, oldValue, eOpts) {
        var chk = false;
        if(Ext.getCmp('bgp_ad_redis_chk1').getValue()){ chk = true; }
        if(Ext.getCmp('bgp_ad_redis_chk2').getValue()){ chk = true; }
        if(Ext.getCmp('bgp_ad_redis_chk3').getValue()){ chk = true; }

        if(chk === false){
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].update(get_msg('err_select'));
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].addCls('ic_msg_err');
        }
        else{
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].update('');
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].removeCls('ic_msg_err');
        }
    },

    onBgp_ad_redis_chk2Blur: function(component, event, eOpts) {
        Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].update('');
        Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].removeCls('ic_msg_err');
    },

    onBgp_ad_redis_chk3Change: function(field, newValue, oldValue, eOpts) {
        var chk = false;
        if(Ext.getCmp('bgp_ad_redis_chk1').getValue()){ chk = true; }
        if(Ext.getCmp('bgp_ad_redis_chk2').getValue()){ chk = true; }
        if(Ext.getCmp('bgp_ad_redis_chk3').getValue()){ chk = true; }

        if(chk === false){
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].update(get_msg('err_select'));
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].addCls('ic_msg_err');
        }
        else{
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].update('');
            Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].removeCls('ic_msg_err');
        }
    },

    onBgp_ad_redis_chk3Blur: function(component, event, eOpts) {
        Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].update('');
        Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].removeCls('ic_msg_err');
    },

    onFieldsetRender1: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'bgp_ad_chk2',
            style:'margin-left:95px',
            resizeHandle: false,
            state: true,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    if(newValue){
                        Ext.getCmp('bgp_ad_redis_con').enable(true);
                    }
                    else{
                        Ext.getCmp('bgp_ad_redis_con').disable(true);
                    }
                }
            }
        });

        component.legend.add(tbutton);
    },

    onButtonClick21: function(button, e, eOpts) {
        var record = [];

        record.push({
            'ipaddr':'',
            'type':'null0',
            'opt':'',
            'sub-opt':''
        });

        Ext.getCmp('bgp_ad_static_grid').getStore().add(record);
    },

    onTextfieldFocus11: function(component, event, eOpts) {
        var str = disp_help_ip('4s2m');
        component.fieldInfo = str;

        setTipFocus(Ext.getCmp('win_bgp_ad_setting'),component);
    },

    onTextfieldBlur11: function(component, event, eOpts) {
        setTipBlur(Ext.getCmp('win_bgp_ad_setting'),component);

        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onComboboxFocus1: function(component, event, eOpts) {
        component.expand();
    },

    onComboboxCollapse1: function(field, eOpts) {
        field.blur();
    },

    onFieldsetRender41: function(component, eOpts) {
        component.setTitle('Static Routes');

        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'bgp_ad_chk3',
            style:'margin-left:95px',
            resizeHandle: false,
            state: false,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    if(newValue){
                        Ext.getCmp('bgp_ad_static_con').enable(true);
                    }
                    else{
                        Ext.getCmp('bgp_ad_static_con').disable(true);
                    }
                }
            }
        });

        component.legend.add(tbutton);
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp('win_bgp_ad_setting');
        var store = Ext.getCmp('bgp_ad_static_grid').getStore();
        var routes = [];

        if(Ext.getCmp('bgp_ad_chk1').state === true){
            if(Ext.getCmp('bgp_ad_external').isValid() === false){ Ext.getCmp('bgp_ad_external').focus(); return false; }
            if(Ext.getCmp('bgp_ad_internal').isValid() === false){ Ext.getCmp('bgp_ad_internal').focus(); return false; }
            if(Ext.getCmp('bgp_ad_local').isValid() === false){ Ext.getCmp('bgp_ad_local').focus(); return false; }
        }

        if(Ext.getCmp('bgp_ad_chk2').state === true){
            var chk = false;
            if(Ext.getCmp('bgp_ad_redis_chk1').getValue()){ chk = true; }
            if(Ext.getCmp('bgp_ad_redis_chk2').getValue()){ chk = true; }
            if(Ext.getCmp('bgp_ad_redis_chk2').getValue()){ chk = true; }

            if(chk === false){
                Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].update(get_msg('err_select'));
                Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0].addCls('ic_msg_err');
                Ext.getCmp('bgp_ad_redis_chk1').focus();
                return false;
            }
        }

        if(Ext.getCmp('bgp_ad_chk3').state === true){
            for(var j = 0;j < store.data.items.length;j++){
                if(me.ip_validation(store.data.items[j].data.ipaddr) !== true){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(me.ip_validation(store.data.items[j].data.ipaddr));

                    Ext.getCmp('bgp_ad_static_grid').getPlugin('bgp_ad_static_plug').startEdit(Number(j), 0);
                    return false;
                }
                if(store.data.items[j].data.type === "A.B.C.D"){
                    if(me.opt_validation(store.data.items[j].data.opt) !== true){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(me.opt_validation(store.data.items[j].data.opt));

                        Ext.getCmp('bgp_ad_static_grid').getPlugin('bgp_ad_static_plug').startEdit(Number(j), 2);
                        return false;
                    }
                }
                if(store.data.items[j].data.type === "interface"){
                    if(store.data.items[j].data.opt === ""){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_null'));

                        Ext.getCmp('bgp_ad_static_grid').getPlugin('bgp_ad_static_plug').startEdit(Number(j), 2);
                        return false;
                    }
                }

                if(store.data.items[j].data.type !== "A.B.C.D" && store.data.items[j].data.type !== "interface"){
                    store.data.items[j].data.opt = store.data.items[j].data.type;
                }

                var temp = store.data.items[j].data.ipaddr.split('/');

                var sub_opt = "";

                if(store.data.items[j].data.sub_opt !== undefined){
                    sub_opt = store.data.items[j].data.sub_opt;
                }

                routes.push({
                    'ipaddr': temp[0],
                    'net': temp[1],
                    'opt': store.data.items[j].data.opt,
                    'type': store.data.items[j].data.type,
                    'sub_opt': sub_opt
                });
            }
        }

        var bgp_info = Ext.getCmp('NFW2_network_protocol').bgp_info;

        if(Ext.getCmp('bgp_ad_chk1').state === true){
            bgp_info.distance.state = "yes";
            bgp_info.distance.external = String(Ext.getCmp('bgp_ad_external').getValue());
            bgp_info.distance.internal = String(Ext.getCmp('bgp_ad_internal').getValue());
            bgp_info.distance.local = String(Ext.getCmp('bgp_ad_local').getValue());
        }
        else{
            bgp_info.distance.state = "no";
            bgp_info.distance.external = "";
            bgp_info.distance.internal = "";
            bgp_info.distance.local = "";
        }

        if(Ext.getCmp('bgp_ad_chk2').state === true){
            bgp_info.redistribute.state = "yes";
            if(Ext.getCmp('bgp_ad_redis_chk1').getValue()){ bgp_info.redistribute.static = "yes"; }
            else{ bgp_info.redistribute.static = "no"; }
            if(Ext.getCmp('bgp_ad_redis_chk2').getValue()){ bgp_info.redistribute.rip = "yes"; }
            else{ bgp_info.redistribute.rip = "no"; }
            if(Ext.getCmp('bgp_ad_redis_chk3').getValue()){ bgp_info.redistribute.ospf = "yes"; }
            else{ bgp_info.redistribute.ospf = "no"; }
        }
        else{
            bgp_info.redistribute.state = "no";
            bgp_info.redistribute.static = "";
            bgp_info.redistribute.rip = "";
            bgp_info.redistribute.ospf = "";
        }

        if(Ext.getCmp('bgp_ad_chk3').state === true){
            bgp_info.static_route.state = "yes";
            bgp_info.static_route.routes = routes;
        }
        else{
            bgp_info.static_route.state = "no";
            bgp_info.static_route.routes = [];
        }

        Ext.getCmp('NFW2_network_protocol').bgp_info = bgp_info;

        this.close();
    },

    onButtonClick1: function(button, e, eOpts) {
        this.close();
    },

    onWin_bgp_ad_settingAfterRender: function(component, eOpts) {
        this.fieldInfo = makeZenTip();
        var me = this;

        var eth = [];

        request_helper.xmlrpc_call_JsonP('ftuctrl','get_pname_list',{option : Ext.encode('all')},function(response){
            request_helper.xmlrpc_call_JsonP('ftuctrl','get_lname_list',{if_type : Ext.encode('bonding'),data_type : Ext.encode('name'),option : Ext.encode('used')},function(response_bond){
                request_helper.xmlrpc_call_JsonP('ftuctrl','get_lname_list',{if_type : Ext.encode('bridge'),data_type : Ext.encode('name'),option : Ext.encode('used')},function(response_bridge){
                    request_helper.xmlrpc_call_JsonP('ftuctrl','get_lname_list',{if_type : Ext.encode('vlan'),data_type : Ext.encode('name'),option : Ext.encode('used')},function(response_vlan){
                        for(var i in response){
                            eth.push({
                                name: response[i].name
                            });
                        }
                        for(var j in response_bond){
                            eth.push({
                                name: response_bond[j].name
                            });
                        }
                        for(var j in response_bridge){
                            eth.push({
                                name: response_bridge[j].name
                            });
                        }
                        for(var j in response_vlan){
                            eth.push({
                                name: response_vlan[j].name
                            });
                        }

                        var _store = Ext.data.StoreManager.lookup('store_nw_protocol_inter');
                        _store.loadData(eth);
                    });
                });
            });
        });


        component.setTitle(__zen('bgp')+" "+__zen('advance_setting'));

        if(me.bgp_info.redistribute.static === "yes"){ Ext.getCmp('bgp_ad_redis_chk1').setValue(true); }
        else{ Ext.getCmp('bgp_ad_redis_chk1').setValue(false); }
        if(me.bgp_info.redistribute.rip === "yes"){ Ext.getCmp('bgp_ad_redis_chk2').setValue(true); }
        else{ Ext.getCmp('bgp_ad_redis_chk2').setValue(false); }
        if(me.bgp_info.redistribute.ospf === "yes"){ Ext.getCmp('bgp_ad_redis_chk3').setValue(true); }
        else{ Ext.getCmp('bgp_ad_redis_chk3').setValue(false); }

        if(me.bgp_info.distance.state === "yes"){
            Ext.getCmp('bgp_ad_chk1').state = true;
            Ext.getCmp('bgp_ad_distance_con').enable(true);
        }
        else{
            Ext.getCmp('bgp_ad_chk1').state = false;
            Ext.getCmp('bgp_ad_distance_con').disable(true);
        }

        if(me.bgp_info.distance.external !== ""){ Ext.getCmp('bgp_ad_external').setValue(me.bgp_info.distance.external); }
        if(me.bgp_info.distance.internal !== ""){ Ext.getCmp('bgp_ad_internal').setValue(me.bgp_info.distance.internal); }
        if(me.bgp_info.distance.local !== ""){ Ext.getCmp('bgp_ad_local').setValue(me.bgp_info.distance.local); }

        if(me.bgp_info.redistribute.state === "yes"){
            Ext.getCmp('bgp_ad_chk2').state = true;
            Ext.getCmp('bgp_ad_redis_con').enable(true);

        }
        else{
            Ext.getCmp('bgp_ad_chk2').state = false;
            Ext.getCmp('bgp_ad_redis_con').disable(true);
            Ext.getCmp('bgp_ad_redis_chk1').setValue(true);
        }

        if(me.bgp_info.static_route.state === "yes"){
            Ext.getCmp('bgp_ad_chk3').state = true;
            if(me.bgp_info.static_route.routes.length !== 0){
                Ext.getCmp('bgp_ad_static_con').enable();

                for(var i in me.bgp_info.static_route.routes){
                    var temp = me.bgp_info.static_route.routes[i].ipaddr + "/" + me.bgp_info.static_route.routes[i].net;
                    me.bgp_info.static_route.routes[i].ipaddr = temp;
                }

                Ext.getCmp('bgp_ad_static_grid').getStore().loadData(me.bgp_info.static_route.routes);
            }
        }
        else{
            Ext.getCmp('bgp_ad_chk3').state = false;
        }
    },

    onWin_bgp_ad_settingRender: function(component, eOpts) {
        var store = {
            fields:[
                {name:'ipaddr'},
                {name:'type'},
                {name:'opt'},
                {name:'sub_opt'},
            ]
        };

        Ext.getCmp('bgp_ad_static_grid').reconfigure(store);
    },

    ip_validation: function(value) {
        if(value !== true){
            if(!CheckNotNull(value)){ return get_msg('err_null'); }

            var chk_ip = value.split('/');
            if(!ValidIPAddress(chk_ip[0])){ return get_msg('err_ip'); }
            if(chk_ip[1] === undefined){ return get_msg('err_form'); }
            else{
                var chk_ip2 = chk_ip[1].split('.');
                if(chk_ip2[1] !== undefined){ return get_msg('err_form'); }
                if(!ValidIPAddress(chk_ip[0])){ return get_msg('err_ip'); }
                if(chk_ip[0] !== "0.0.0.0" && chk_ip[1] === 0){ return ValidLimit(1,32); }
                else if(chk_ip[1] === ""){ return get_msg('err_form'); }
                else if(chk_ip[1] < 1 || chk_ip[1] > 32){ return ValidLimit(1,32); }
            }
        }

        return true;
    },

    opt_validation: function(value) {
        if(value !== true){
            if(!CheckNotNull(value)){ return get_msg('err_null'); }
            if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
        }

        return true;
    }

});