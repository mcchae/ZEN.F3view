
Ext.define('NFW2.view.win_inter_report', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_inter_report',

    requires: [
        'NFW2.view.win_inter_reportViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_inter_report'
    },
    cls: 'zen_win',
    id: 'win_inter_report',
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
                    margin: '8 0 0 0',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    margin: '0 0 0 10',
                                    width: 220,
                                    bind: {
                                        text: '{intgrate_name}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                        return true;
                                    },
                                    id: 'report_add_name',
                                    width: 300,
                                    labelSeparator: ' ',
                                    labelWidth: 150,
                                    msgTarget: 'none',
                                    enforceMaxLength: true,
                                    maxLength: 63,
                                    listeners: {
                                        errorchange: 'onTextfieldErrorChange',
                                        blur: 'onTextfieldBlur'
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
                                    margin: '0 0 0 20',
                                    width: 210,
                                    bind: {
                                        text: '{intgrate_desc}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'report_add_desc',
                                    width: 450,
                                    labelSeparator: ' ',
                                    labelWidth: 150,
                                    enforceMaxLength: true,
                                    maxLength: 63
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '8 0 0 0',
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'report_add_type',
                                    margin: '0 0 0 10',
                                    width: 420,
                                    labelSeparator: ' ',
                                    labelWidth: 215,
                                    value: '0',
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: {
                                        data: [
                                            {
                                                name: '개별',
                                                value: '0'
                                            },
                                            {
                                                name: '통합',
                                                value: '1'
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
                                    bind: {
                                        fieldLabel: '{report_method}'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWin_inter_reportAfterRender'
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

    onTextfieldErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldBlur: function(component, event, eOpts) {
        Ext.getCmp('report_add_name').validateValue(true);
    },

    onWin_inter_reportAfterRender: function(component, eOpts) {
        var me = this;
        chk_zenauth(null);
        if(me.edit === "edit"){
            Ext.getCmp('win_inter_report').setTitle(__zen("edit_intgrate_report"));
            Ext.getCmp('report_add_name').setValue(me.record.data.name);
            Ext.getCmp('report_add_desc').setValue(me.record.data.desc);
            Ext.getCmp('report_add_type').setValue(me.record.data.create);
        }
        else{ Ext.getCmp('win_inter_report').setTitle(__zen("add_intgrate_report")); }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;
        var update = false;
        var obj = [];
        var report_data = [];

        for(var i in me.inter_data){
            var date = [];
            for(var j in me.inter_data[i].date){
                var temp = me.inter_data[i].date[j].data.create_day.split(' ');
                date.push(temp[2]);
            }

            var inter_id = me.inter_data[i].date[0].data.id.split('_');

            report_data.push({
                'name' : me.inter_data[i].report,
                'date' : date,
                'period' : me.inter_data[i].date[0].data.period,
                'id' : inter_id[0]
            });
        }

        if(Ext.getCmp('report_add_name').isValid() === false){ Ext.getCmp('report_add_name').focus(); return false; }

        if(me.edit === "edit"){
            update = true;
            obj = {
                'type' : "inter",
                'name' : Ext.getCmp('report_add_name').getValue(),
                'desc' : Ext.getCmp('report_add_desc').getValue(),
                'create' : Ext.getCmp('report_add_type').getValue(),
                'report_data' : me.record.data.report_data
            };
            obj['_id'] = me.record.data.id;
        }
        else{
            obj = {
                'type' : "inter",
                'name' : Ext.getCmp('report_add_name').getValue(),
                'desc' : Ext.getCmp('report_add_desc').getValue(),
                'create' : Ext.getCmp('report_add_type').getValue(),
                'report_data' : report_data
            };
        }

        var day_grid = Ext.getCmp('day_report_grid');
        var week_grid = Ext.getCmp('week_report_grid');
        var month_grid = Ext.getCmp('month_report_grid');
        var spe_grid = Ext.getCmp('spe_report_grid');

        for(var i in day_grid.getStore().data.items){
            if(Ext.getCmp('_gridExt.data.Store.ImplicitModel-store_atoz_report_day_list-'+day_grid.getStore().data.items[i].data.id)){
                Ext.getCmp('_gridExt.data.Store.ImplicitModel-store_atoz_report_day_list-'+day_grid.getStore().data.items[i].data.id).getSelectionModel().deselectAll();
            }
        }
        for(var i in week_grid.getStore().data.items){
            if(Ext.getCmp('_gridExt.data.Store.ImplicitModel-store_atoz_report_week_list-'+week_grid.getStore().data.items[i].data.id)){
                Ext.getCmp('_gridExt.data.Store.ImplicitModel-store_atoz_report_week_list-'+week_grid.getStore().data.items[i].data.id).getSelectionModel().deselectAll();
            }
        }
        for(var i in month_grid.getStore().data.items){
            if(Ext.getCmp('_gridExt.data.Store.ImplicitModel-store_atoz_report_month_list-'+month_grid.getStore().data.items[i].data.id)){
                Ext.getCmp('_gridExt.data.Store.ImplicitModel-store_atoz_report_month_list-'+month_grid.getStore().data.items[i].data.id).getSelectionModel().deselectAll();
            }
        }
        for(var i in spe_grid.getStore().data.items){
            if(Ext.getCmp('_gridExt.data.Store.ImplicitModel-store_atoz_report_spe_list-'+spe_grid.getStore().data.items[i].data.id)){
                Ext.getCmp('_gridExt.data.Store.ImplicitModel-store_atoz_report_spe_list-'+spe_grid.getStore().data.items[i].data.id).getSelectionModel().deselectAll();
            }
        }

        day_grid.getSelectionModel().deselectAll();
        week_grid.getSelectionModel().deselectAll();
        month_grid.getSelectionModel().deselectAll();
        spe_grid.getSelectionModel().deselectAll();

        var _params = {
            basename : Ext.encode('atoz_report_inter'),
            obj : Ext.encode(obj),
            update : Ext.encode(update)
        };
        showLoadMask();
        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setListTypeObj',
            _params,
            function(response){
                        Ext.getCmp('NFW2_report_generate').get_report();
                        hideLoadMask();
                        if(me.edit === "edit"){
                            Ext.Msg.show({
                                title: __weguardia,
                                width: 300,
                                msg: get_msg('msg_ok_edit'),
                                buttons: Ext.Msg.OK,
                                fn: setWinClose,
                                icon: Ext.window.MessageBox.INFO
                            });
                        }
                        else{
                            Ext.Msg.show({
                                title: __weguardia,
                                width: 300,
                                msg: get_msg('msg_ok_add'),
                                buttons: Ext.Msg.OK,
                                fn: setWinClose,
                                icon: Ext.window.MessageBox.INFO
                            });
                        }
            }
        );
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    }

});