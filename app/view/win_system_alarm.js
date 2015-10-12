
Ext.define('NFW2.view.win_system_alarm', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_system_alarm',

    requires: [
        'NFW2.view.win_system_alarmViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Radio',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_system_alarm'
    },
    autoShow: true,
    cls: 'zen_win',
    height: 471,
    id: 'win_system_alarm',
    maxHeight: 471,
    minHeight: 150,
    minWidth: 700,
    scrollable: {
        x: false,
        y: true
    },
    width: 700,
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
                    hidden: true,
                    items: [
                        {
                            xtype: 'container',
                            hidden: true,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'radiofield',
                                    id: 'system_alarm_rd1',
                                    width: 150,
                                    boxLabel: '새로운 알림 보기',
                                    checked: true,
                                    listeners: {
                                        change: 'onRadiofieldChange1'
                                    }
                                },
                                {
                                    xtype: 'radiofield',
                                    id: 'system_alarm_rd2',
                                    width: 150,
                                    boxLabel: '알림 전체 보기',
                                    listeners: {
                                        change: 'onRadiofieldChange'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    id: 'system_alarm_con',
                    margin: 10,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWin_system_alarmAfterRender',
        resize: 'onWin_system_alarmResize'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            cls: 'zen_toolbar',
            ui: 'footer',
            items: [
                {
                    xtype: 'container',
                    flex: 1
                },
                {
                    xtype: 'container',
                    margin: '0 10 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'checkboxfield',
                            id: 'system_alarm_chk',
                            boxLabel: '팝업 다시 보지 않기'
                        }
                    ]
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
                }
            ]
        }
    ],

    onRadiofieldChange1: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('system_alarm_rd1').setValue(true);
            Ext.getCmp('system_alarm_rd2').setValue(false);
        }
    },

    onRadiofieldChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('system_alarm_rd2').setValue(true);
            Ext.getCmp('system_alarm_rd1').setValue(false);
        }
    },

    onWin_system_alarmAfterRender: function(component, eOpts) {
        var me = this;
        me.setTitle('관리자 알림');

        var params = {
            func_name : Ext.encode('system_manager_alarm'),
            args : Ext.encode({})
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'execKctrlFunc',
            params,
            function(response){
                var params = {
                    func_name : Ext.encode('get_total_alarm_list'),
                    args : Ext.encode({})
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'execKctrlFunc',
                    params,
                    function(response){
                        if(response[0] === 0){
                            var add_con = {
                                xtype: 'container',
                                id: 'alarm_con1',
                                cls: 'd_frame',
                                margin: '8 0 0 0',
                                padding: 10,
                                style: 'border-top:2px solid #aaa;',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype:'container',
                                        flex: 1,
                                        width: '100%',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items:[
                                            {
                                                xtype: 'label',
                                                text: __zen('nodata')
                                            }
                                        ]
                                    }
                                ]
                            };

                            Ext.getCmp('system_alarm_con').add(add_con);
                        }
                        else{
                            for(var i in response[1]){
                                var content = me.get_content(response[1][i]);
                                var expire_time = "";
                                var style = "";
                                var cls = "";
                                var alarm_set = false;
                                var alarm_close = true;

                                //if(Number(unix_conv[3]) !== 0){ expire_time += unix_conv[3]+__zen('sec'); }

                                if(response[1][i].expire_status === 1){
                                    style = 'border-top:2px solid crimson;';
                                    cls = 'r_frame';
                                    expire_time = unixTimeConvert(response[1][0].expire_time,'YMDHMS','GMT');
                                }
                                else{
                                    style = 'border-top:2px solid #aaa;';
                                    cls = 'd_frame';
                                }

                                var type = response[1][i].category;
                                var expire = response[1][i].expire_status;
                                var sub_val = response[1][i].sub_category;

                                if(type === 3){
                                    if(response[1][i].sub_category.v4 !== undefined){
                                        sub_val = response[1][i].sub_category.v4;
                                    }
                                    else{
                                        sub_val = response[1][i].sub_category.v6;
                                    }
                                }
                                else if(type === 7){
                                    alarm_set = true;
                                    alarm_close = false;
                                    expire_time = unixTimeConvert(response[1][0].expire_time);
                                }
                                else if(type === 8){
                                    alarm_close = false;
                                    expire_time = unixTimeConvert(response[1][0].expire_time);
                                }
                                else if(type === 9){
                                    if(sub_val !== "RAID"){
                                        alarm_set = true;
                                        alarm_close = false;
                                    }
                                    expire_time = unixTimeConvert(response[1][0].expire_time);
                                }

                                var add_con = {
                                    xtype: 'container',
                                    id: 'alarm_con'+i,
                                    cls: cls,
                                    margin: '8 0 0 0',
                                    padding: 10,
                                    style: style,
                                    alarm_id: response[1][i]._id,
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype:'container',
                                            flex: 1,
                                            width: '100%',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items:[
                                                {
                                                    xtype: 'label',
                                                    text: msg_system_alarm(sub_val,type,expire,unixTimeRemain(response[1][i].expire_time,expire))
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'image',
                                            height: 16,
                                            width: 16,
                                            hidden: alarm_set,
                                            cls: 'b_alarm_gear',
                                            alarm_type: type,
                                            overCls: 'over_mouse',
                                            listeners: {
                                                render: function(component, eOpts){
                                                    component.getEl().on('click', function(eOpts) {
                                                        if(this.alarm_type === 1){
                                                            Ext.getCmp('win_system_alarm').close();
                                                            Ext.getCmp('pnl_menu').collapse();
                                                            Ext.getCmp('pnl_navi').hide();
                                                            Ext.getCmp('sel_zen_license').hide();
                                                            Ext.getCmp('pnl_cont').removeAll();
                                                            Ext.getCmp('pnl_cont').add(Ext.create("NFW2.view.NFW2_dboard"));
                                                        }
                                                        else if(this.alarm_type === 2){
                                                            Ext.getCmp('win_system_alarm').close();
                                                            make_navi_map('NFW2_system_admin_adminConfig');
                                                        }
                                                        else if(this.alarm_type === 3){
                                                            Ext.getCmp('win_system_alarm').close();
                                                            make_navi_map('NFW2_firewall_policy_filtering');
                                                        }
                                                        else if(this.alarm_type === 4){
                                                            Ext.getCmp('win_system_alarm').close();
                                                            make_navi_map('NFW2_system_systemState');
                                                        }
                                                        else if(this.alarm_type === 5){
                                                            Ext.getCmp('win_system_alarm').close();
                                                            make_navi_map('NFW2_system_certificate');
                                                        }
                                                        else if(this.alarm_type === 6){
                                                            Ext.getCmp('win_system_alarm').close();
                                                            var win = Ext.create('NFW2.view.NFW2_send_reserv_policy');
                                                            win.show();
                                                        }
                                                        else if(this.alarm_type === 8){
                                                            request_helper.xmlrpc_call_JsonP(
                                                                'ftuctrl',
                                                                'is_ha_l2orl3_mode',
                                                                {},

                                                                function(response){
                                                                    if(response.mode === "l2"){
                                                                        Ext.getCmp('win_system_alarm').close();
                                                                        make_navi_map('NFW2_network_ha_l2');
                                                                    }
                                                                    else if(response.mode === "l3"){
                                                                        Ext.getCmp('win_system_alarm').close();
                                                                        make_navi_map('NFW2_network_ha_l3');
                                                                    }
                                                                }
                                                            );
                                                        }
                                                        else if(this.alarm_type === 9){
                                                            Ext.getCmp('win_system_alarm').close();
                                                            make_navi_map('NFW2_system_basic_raid');
                                                        }
                                                    }, component);
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'image',
                                            height: 16,
                                            width: 16,
                                            hidden: alarm_close,
                                            cls: 'b_win_close',
                                            alarm_type: type,
                                            margin: '0 0 0 5',
                                            overCls: 'over_mouse',
                                            listeners: {
                                                render: function(component, eOpts){
                                                    component.getEl().on('click', function(eOpts) {
                                                        console.log(component);
                                                        console.log(Ext.getCmp(component.container.component.id));
                                                        var params = {
                                                            func_name : Ext.encode('del_alarm_status'),
                                                            args : Ext.encode(Ext.getCmp(component.container.component.id).alarm_id)
                                                        };
                                                        //                                                 console.log(params);
                                                        request_helper.xmlrpc_call_JsonP(
                                                            'ftuctrl',
                                                            'execKctrlFunc',
                                                            params,
                                                            function(response){
                                                                Ext.getCmp(component.container.component.id).destroy();
                                                                adminAlarmRefresh();
                                                            }
                                                        );
                                                    }, component);
                                                }
                                            }
                                        }
                                    ]
                                };

                                Ext.getCmp('system_alarm_con').add(add_con);
                            }
                        }

                        var params = {
                            basename : Ext.encode('system_admin_alarm')
                        };

                        request_helper.xmlrpc_call_JsonP(
                            'ftuctrl',
                            'getObject',
                            params,
                            function(response){
                                if(response === null){
                                    Ext.getCmp('system_alarm_chk').setValue(false);
                                }
                                else{
                                    if(response.alarm_set === true){ Ext.getCmp('system_alarm_chk').setValue(true); }
                                    else{ Ext.getCmp('system_alarm_chk').setValue(false); }
                                }
                            }
                        );
                    }
                );
            }
        );
    },

    onButtonClick: function(button, e, eOpts) {
        var obj = {
            'alarm_set' : Ext.getCmp('system_alarm_chk').getValue()
        };

        var params = {
            basename : Ext.encode('system_admin_alarm'),
            obj : Ext.encode(obj)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            params,
            function(response){
            }
        );

        Ext.getCmp('win_system_alarm').close();
    },

    onWin_system_alarmResize: function(window, width, height, eOpts) {
        window.doLayout();
    },

    get_content: function(value) {
        var alarm_title = "";
        var type = value.category;
        var expire = value.expire_status;
        var sub_val = value.sub_category;

        if(value.category === 1){
        }
        else if(value.category === 2){
            sub_val = value.sub_category;
        }
        else if(value.category === 3){
            sub_val = value.sub_category;
        }
        else if(value.category === 4){
            sub_val = value.sub_categor;
        }
        else if(value.category === 5){
            sub_val = value.sub_category;
        }
        else if(value.category === 6){
            sub_val = value.sub_category;
        }
        else if(value.category === 7){
            sub_val = value.sub_category;
        }
        else if(value.category === 8){
            sub_val = value.sub_category;
        }
        else if(value.category === 9){
            sub_val = value.sub_category;
        }

        return [alarm_title,sub_val,type,expire];
    }

});