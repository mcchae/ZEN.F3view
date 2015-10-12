
Ext.define('NFW2.view.win_ips_etc_static', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ips_etc_static',

    requires: [
        'NFW2.view.win_ips_etc_staticViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.Img',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.column.Action',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_ips_etc_static'
    },
    cls: 'zen_win',
    id: 'win_ips_etc_static',
    width: 400,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
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
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            validator: function(value) {
                                var me = Ext.getCmp('NFW2_ips_etc');

                                if(value !== true){
                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                    if(value === Ext.getCmp('ips_etc_static_com3').getValue()){ return get_msg('err_interdob'); }

                                    for(var i in me.policy_inter){
                                        for(var j in me.policy_inter[i].inter){
                                            if(value === me.policy_inter[i].inter[j].inter){
                                                return msg_ips_etc(me.policy_inter[i].uid);
                                            }
                                        }
                                    }
                                }

                                return true;
                            },
                            id: 'ips_etc_static_com1',
                            margin: '8 0 0 0',
                            labelCls: 'lb_req',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            editable: false,
                            emptyText: 'Select',
                            displayField: 'inter',
                            queryMode: 'local',
                            store: {
                                fields: [
                                    {
                                        name: 'inter'
                                    }
                                ]
                            },
                            valueField: 'inter',
                            bind: {
                                fieldLabel: '{inter1}'
                            },
                            listeners: {
                                errorchange: 'onIps_etc_static_com1ErrorChange',
                                blur: 'onIps_etc_static_com1Blur'
                            }
                        },
                        {
                            xtype: 'combobox',
                            validator: function(value) {
                                var me = Ext.getCmp('NFW2_ips_etc');

                                if(value !== true){
                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                    if(value === Ext.getCmp('ips_etc_static_com1').getValue()){ return get_msg('err_interdob'); }
                                    for(var i in me.policy_inter){
                                        for(var j in me.policy_inter[i].inter){
                                            if(value === me.policy_inter[i].inter[j].inter){
                                                return msg_ips_etc(me.policy_inter[i].uid);
                                            }
                                        }
                                    }
                                }
                                return true;
                            },
                            id: 'ips_etc_static_com3',
                            margin: '8 0 0 0',
                            width: 350,
                            labelCls: 'lb_req',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            editable: false,
                            emptyText: 'Select',
                            displayField: 'inter',
                            queryMode: 'local',
                            store: {
                                fields: [
                                    {
                                        name: 'inter'
                                    }
                                ]
                            },
                            valueField: 'inter',
                            bind: {
                                fieldLabel: '{inter2}'
                            },
                            listeners: {
                                errorchange: 'onIps_etc_static_com1ErrorChange1',
                                blur: 'onIps_etc_static_com3Blur'
                            }
                        },
                        {
                            xtype: 'combobox',
                            validator: function(value) {
                                if(value !== true){
                                    if(Ext.getCmp('ips_etc_static_com2').getStore().getCount() === 0){ return get_msg('err_ipsetcprof'); }
                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                }

                                return true;
                            },
                            id: 'ips_etc_static_com2',
                            margin: '8 0 10 0',
                            labelCls: 'lb_req',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            editable: false,
                            emptyText: 'Select',
                            displayField: 'name',
                            queryMode: 'local',
                            store: 'store_ips_etc_profile_list',
                            valueField: '@num',
                            bind: {
                                fieldLabel: '{profile_name}'
                            },
                            listeners: {
                                errorchange: 'onIps_etc_static_com2ErrorChange',
                                blur: 'onIps_etc_static_com2Blur',
                                focus: 'onIps_etc_static_com2Focus'
                            }
                        },
                        {
                            xtype: 'image',
                            height: 20,
                            hidden: true,
                            margin: '3 0 3 5',
                            width: 24,
                            src: '../images/b_insert.gif',
                            listeners: {
                                render: 'onImageRender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    hidden: true,
                    id: 'win_ips_etc_static_grid_con',
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'win_ips_etc_static_grid',
                            header: false,
                            title: 'My Grid Panel',
                            hideHeaders: true,
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'inter',
                                    flex: 1
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 45,
                                    align: 'right',
                                    items: [
                                        {
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                var store = Ext.getCmp('win_ips_etc_static_grid').getStore();
                                                Ext.getCmp('ips_etc_static_error').hide();

                                                var inter_store = Ext.getCmp('ips_etc_static_com1').getStore();

                                                var inter_record = [];

                                                for(var i in inter_store.data.items){
                                                    inter_record.push({
                                                        'inter' : inter_store.data.items[i].data.inter
                                                    });
                                                }

                                                inter_record.push({
                                                    'inter' : store.data.items[rowIndex].data.inter
                                                });
                                                inter_record.sort(function(a, b){
                                                    if(a.inter > b.inter){ return 1; }
                                                    if(a.inter < b.inter){ return -1; }

                                                    return 0;
                                                });
                                                inter_store.loadData(inter_record);

                                                store.removeAt(rowIndex, 1);

                                                if(store.data.items.length > 0){ Ext.getCmp('win_ips_etc_static_grid_con').show(); }
                                                else{ Ext.getCmp('win_ips_etc_static_grid_con').hide(); }
                                            },
                                            icon: '../images/b_close.gif'
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
    listeners: {
        render: 'onWin_ips_etc_staticRender',
        afterrender: 'onWin_ips_etc_staticAfterRender'
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
                    itemId: 'fld_msg2'
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

    onIps_etc_static_com1ErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg2"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg2"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onIps_etc_static_com1Blur: function(component, event, eOpts) {
        Ext.getCmp('ips_etc_static_com1').validateValue(true);
    },

    onIps_etc_static_com1ErrorChange1: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg2"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg2"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onIps_etc_static_com3Blur: function(component, event, eOpts) {
        Ext.getCmp('ips_etc_static_com3').validateValue(true);
    },

    onIps_etc_static_com2ErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg2"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg2"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onIps_etc_static_com2Blur: function(component, event, eOpts) {
        Ext.getCmp('ips_etc_static_com2').validateValue(true);
    },

    onIps_etc_static_com2Focus: function(component, event, eOpts) {
        if(component.getStore().getCount() === 0){
            component.isValid();
        }
    },

    onImageRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            var store = Ext.getCmp('win_ips_etc_static_grid').getStore();

            if(Ext.getCmp('ips_etc_static_com1').validateValue() === false){ Ext.getCmp('ips_etc_static_com1').focus(); return false; }
            if(store.getCount() > 1){
                Ext.getCmp('ips_etc_static_error').setText(get_msg('err_intercnt_2'));
                Ext.getCmp('ips_etc_static_error').show();

                return false;
            }

            var record = [];

            record.push({
                'inter' : Ext.getCmp('ips_etc_static_com1').getValue()
            });

            store.add(record);

            if(store.data.items.length > 0){ Ext.getCmp('win_ips_etc_static_grid_con').show(); }
            else{ Ext.getCmp('win_ips_etc_static_grid_con').hide(); }

            var inter_store = Ext.getCmp('ips_etc_static_com1').getStore();

            var inter_record = [];

            for(var i in inter_store.data.items){
                if(inter_store.data.items[i].data.inter !== record[0].inter){
                    inter_record.push({
                        'inter' : inter_store.data.items[i].data.inter
                    });
                }
            }

            inter_store.loadData(inter_record);

            Ext.getCmp('ips_etc_static_com1').reset();
        }, component);
    },

    onWin_ips_etc_staticRender: function(component, eOpts) {
        var store = {
            fields:[
                {
                    name : 'inter'
                }
            ]
        };

        Ext.getCmp('win_ips_etc_static_grid').reconfigure(store);
    },

    onWin_ips_etc_staticAfterRender: function(component, eOpts) {
        var me = this;
        chk_zenauth(null);
        var _params = {

            option : Ext.encode('all')

        };

        Ext.data.JsonP.request({

            url : "/api/ftuctrl/get_pname_list",
            params : _params,
            success : function(response2){
                var _params = {
                    basename : Ext.encode('network_interface')
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'getObjects',
                    _params,
                    function(response){
                        hideLoadMask();

                        var records = [];

                        for(var k in response2.retval){
                            var chk = false;

                            for(var i in response.list[0].network.bridge){
                                for(var j in response.list[0].network.bridge[i]['default'].member){
                                    if(response2.retval[k].name === response.list[0].network.bridge[i]['default'].member[j]){
                                        chk = true;
                                    }
                                    if(me.edit === "edit"){
                                        if(me.record.data.inter1 === response2.retval[k].name){ chk = true; }
                                        if(me.record.data.inter2 === response2.retval[k].name){ chk = true; }
                                    }
                                }
                            }
                            for(var l in Ext.getCmp('ips_etc_static_bridge_grid').getStore().data.items){
                                if(  Ext.getCmp('ips_etc_static_bridge_grid').getStore().data.items[l].data.inter1 === response2.retval[k].name){ chk = true; }
                                if(  Ext.getCmp('ips_etc_static_bridge_grid').getStore().data.items[l].data.inter2 === response2.retval[k].name){ chk = true; }
                            }
                            if(Ext.getCmp('ids_chk').getValue()){
                                if(response2.retval[k].name === Ext.getCmp('win_ips_etc_static').inter_set){
                                    chk = true;
                                }
                            }

                            if(chk === false){
                                records.push({
                                    'inter' : response2.retval[k].name
                                });
                            }
                        }

                        if(me.edit === "edit"){
                            Ext.getCmp('win_ips_etc_static').setTitle(__zen('edit_bridge_mode'));
                            Ext.getCmp('ips_etc_static_com1').setValue(me.record.data.inter1);
                            Ext.getCmp('ips_etc_static_com3').setValue(me.record.data.inter2);

                            Ext.getCmp('ips_etc_static_com2').setValue(me.record.data.profile);
                        }
                        else{
                            Ext.getCmp('win_ips_etc_static').setTitle(__zen('add_bridge_mode'));
                        }

                        Ext.getCmp('ips_etc_static_com1').getStore().loadData(records);
                        Ext.getCmp('ips_etc_static_com3').getStore().loadData(records);
                    }
                );
            },
            failure : function(response2){
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

    onButtonClick1: function(button, e, eOpts) {
        var me = Ext.getCmp('win_ips_etc_static');
        // var store = Ext.getCmp('win_ips_etc_static_grid').getStore();

        // if(store.getCount() !== 2){
        //     Ext.getCmp('ips_etc_static_error').setText(get_msg('err_intercnt_2'));
        //     Ext.getCmp('ips_etc_static_error').show();
        //     Ext.getCmp('ips_etc_static_com1').focus();
        //     return false;
        // }
        if(Ext.getCmp('ips_etc_static_com1').isValid() === false){ Ext.getCmp('ips_etc_static_com1').focus(); return false; }
        if(Ext.getCmp('ips_etc_static_com3').isValid() === false){ Ext.getCmp('ips_etc_static_com3').focus(); return false; }
        if(Ext.getCmp('ips_etc_static_com2').isValid() === false){ Ext.getCmp('ips_etc_static_com2').focus(); return false; }

        var record = [];

        record.push({
            'inter1' : Ext.getCmp('ips_etc_static_com1').getValue(),
            'inter2' : Ext.getCmp('ips_etc_static_com3').getValue(),
            'profile' : Ext.getCmp('ips_etc_static_com2').getValue()
        });

        if(me.edit === "edit"){
            Ext.getCmp('ips_etc_static_bridge_grid').getStore().removeAt(me.index, 1);
            Ext.getCmp('ips_etc_static_bridge_grid').getStore().insert(me.index, record);
        }
        else{
            Ext.getCmp('ips_etc_static_bridge_grid').getStore().add(record);
        }

        var inter_record = [];
        for(var i in Ext.getCmp('ips_etc_inter').getStore().data.items){
            var chk = false;
            for(var j in Ext.getCmp('ips_etc_static_bridge_grid').getStore().data.items){
                if(Ext.getCmp('ips_etc_inter').getStore().data.items[i].data.name === Ext.getCmp('ips_etc_static_bridge_grid').getStore().data.items[j].data.inter1){ chk = true; }
                if(Ext.getCmp('ips_etc_inter').getStore().data.items[i].data.name === Ext.getCmp('ips_etc_static_bridge_grid').getStore().data.items[j].data.inter2){ chk = true; }
            }
            if(chk === false){
                inter_record.push({
                    'name' : Ext.getCmp('ips_etc_inter').getStore().data.items[i].data.name
                });
            }
        }

        Ext.getCmp('ips_etc_inter').getStore().loadData(inter_record);
        Ext.getCmp('ips_etc_inter').reset();

        this.close();
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    }

});