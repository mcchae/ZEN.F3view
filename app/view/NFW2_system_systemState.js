
Ext.define('NFW2.view.NFW2_system_systemState', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_system_systemstate',

    requires: [
        'NFW2.view.NFW2_system_systemStateViewModel',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.panel.Tool',
        'Ext.form.Label',
        'Ext.form.field.Date',
        'Ext.form.field.Time',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_system_systemstate'
    },
    cls: 'zen_body',
    width: 600,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            flex: 1,
            id: 'fm_sys_state',
            layout: 'auto',
            items: [
                {
                    xtype: 'container',
                    padding: 5,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 10 0',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'button',
                                    cls: 'btn_b',
                                    componentCls: 'btn_auth',
                                    id: 'service_stop',
                                    width: 120,
                                    bind: {
                                        text: '{stop_service}'
                                    },
                                    listeners: {
                                        click: 'onButtonClick3'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 10 0',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'button',
                                    cls: 'btn_b',
                                    componentCls: 'btn_auth',
                                    id: 'service_start',
                                    width: 120,
                                    bind: {
                                        text: '{restart_service}'
                                    },
                                    listeners: {
                                        click: 'onButtonClick4'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 10 0',
                            items: [
                                {
                                    xtype: 'button',
                                    cls: 'btn_b',
                                    componentCls: 'btn_auth',
                                    id: 'system_end',
                                    width: 120,
                                    bind: {
                                        text: '{shutdown_system}'
                                    },
                                    listeners: {
                                        click: 'onButtonClick5'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 10 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    cls: 'btn_b',
                                    componentCls: 'btn_auth',
                                    id: 'system_reboot',
                                    width: 120,
                                    allowDepress: false,
                                    bind: {
                                        text: '{restart_system}'
                                    },
                                    listeners: {
                                        click: 'onSystem_rebootClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            bind: {
                                title: '{restart_reserved}'
                            },
                            tools: [
                                {
                                    xtype: 'toggleslide',
                                    resizeHandle: false,
                                    state: true,
                                    id: 'state_toggle',
                                    listeners: {
                                        change: 'onToolChange',
                                        beforerender: 'onToolBeforeRender',
                                        afterrender: 'onToolAfterRender'
                                    }
                                }
                            ],
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_reboot',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            margin: '5 0 10 0',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: 'mt_noti',
                                                    bind: {
                                                        text: '{system_info4}'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            id: 'con_date',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: 'x-field x-form-item-label x-form-item-label-default',
                                                    margin: 0,
                                                    width: 100,
                                                    bind: {
                                                        text: '{date_entry}'
                                                    }
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    id: 'reser_date',
                                                    width: 200,
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    editable: false,
                                                    enforceMaxLength: true,
                                                    format: 'Y-m-d',
                                                    submitFormat: 'Y-m-d'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            id: 'con_time',
                                            margin: '10 0 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: 'x-field x-form-item-label x-form-item-label-default',
                                                    id: 'l_time',
                                                    margin: 0,
                                                    width: 100,
                                                    bind: {
                                                        text: '{time_entry}'
                                                    }
                                                },
                                                {
                                                    xtype: 'timefield',
                                                    id: 'reser_hour',
                                                    width: 60,
                                                    labelSeparator: ' ',
                                                    value: '00',
                                                    editable: false,
                                                    format: 'H',
                                                    increment: 60
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    bind: {
                                                        text: '{hour}'
                                                    }
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    id: 'reser_min',
                                                    padding: '0 0 0 6',
                                                    width: 60,
                                                    labelSeparator: ' ',
                                                    value: '00',
                                                    editable: false,
                                                    displayField: 'val',
                                                    queryMode: 'local',
                                                    store: 'store_system_state_min',
                                                    valueField: 'val'
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    bind: {
                                                        text: '{min}'
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch',
                                                        pack: 'end'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            cls: 'btn_b',
                                                            componentCls: 'btn_auth',
                                                            margin: '0 0 0 10',
                                                            bind: {
                                                                text: '{reset}'
                                                            },
                                                            listeners: {
                                                                click: 'onButtonClick2'
                                                            }
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
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onViewportAfterRender'
    },

    onButtonClick3: function(button, e, eOpts) {
        Ext.MessageBox.confirm(__weguardia,get_msg('conf_service_end'), function(btn){
            if(btn === 'yes'){

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'exec_service_stop',
                    {},
                    function(response){

                        Ext.Msg.show({
                            title: __weguardia,
                            msg: get_msg('msg_service_end'),
                            width: 300,
                            buttons: Ext.Msg.YES,
                            buttonText:{
                                yes: __zen('close')
                            }
                        });
                    }
                );

            }else{
                return false;
            }
        });
    },

    onButtonClick4: function(button, e, eOpts) {
        Ext.MessageBox.confirm(__weguardia,get_msg('conf_service_restart'), function(btn){
            if(btn === 'yes'){

                showLoadMask();

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'exec_service_start',
                    {},
                    function(response){

                        hideLoadMask();

                        Ext.Msg.show({
                            title: __weguardia,
                            msg: get_msg('msg_service_restart'),
                            width: 300,
                            buttons: Ext.Msg.YES,
                            buttonText:{
                                yes: __zen('close')
                            }
                        });
                    }
                );

            }else{
                return false;
            }
        });
    },

    onButtonClick5: function(button, e, eOpts) {
        Ext.MessageBox.confirm(__weguardia,get_msg('conf_system_end'), function(btn){
            if(btn === 'yes'){

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'exec_system_end',
                    {},
                    function(response){

                        Ext.Msg.show({
                            title: __weguardia,
                            msg: get_msg('msg_system_end'),
                            width: 300,
                            buttons: Ext.Msg.YES,
                            buttonText:{
                                yes: __zen('close')
                            }
                        });
                    }
                );

            }else{
                return false;
            }
        });
    },

    onSystem_rebootClick: function(button, e, eOpts) {
        Ext.MessageBox.confirm(__weguardia,get_msg('conf_system_restart'), function(btn){
            if(btn === 'yes'){

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'exec_system_reboot_now',
                    {},
                    function(response){

                        Ext.Msg.show({
                            title: __weguardia,
                            msg: get_msg('msg_system_restart'),
                            width: 300,
                            buttons: Ext.Msg.YES,
                            buttonText:{
                                yes: __zen('close')
                            }
                        });
                    }
                );

            }else{
                return false;
            }
        });
    },

    onToolChange: function(tool, state) {
        var _panel = tool.up('panel');

        /*if(state === false){
            var me = this;

            var _params = {
                basename: Ext.encode('system_reboot'),
                exist_skip: Ext.encode(false)
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'initCollection',
                _params,
                function(response){

                    Ext.getCmp("fm_sys_state").getForm().reset();
                });

        }*/
        var _state = (state===true)?false:true;

        Ext.getCmp("con_reboot").setDisabled(_state);
    },

    onToolBeforeRender: function(component, eOpts) {
        component.offText = __zen('toggle_off');
        component.onText = __zen('toggle_on');
    },

    onToolAfterRender: function(component, eOpts) {
        var _auth = get_zenauth();

        if(_auth === true){
            component.disable();
        }else{
            component.enable();
        }
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;

        Ext.MessageBox.confirm(__weguardia, get_msg('conf_reset'), function(btn){
            if(btn === "yes"){
                var _params = {
                    basename: Ext.encode('system_reboot'),
                    exist_skip: Ext.encode(false)
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'initCollection',
                    _params,
                    function(response){

                    Ext.getCmp("fm_sys_state").getForm().reset();
                    me.onViewportAfterRender();
                });
            }
        });
    },

    onButtonClick: function(button, e, eOpts) {
        var b_reboot = Ext.getCmp("b_reboot");

        var reser_date = Ext.getCmp("reser_date");
        var reser_hour = Ext.getCmp("reser_hour");
        var reser_min = Ext.getCmp("reser_min");

        if(Ext.getCmp("state_toggle").state){

            if(!CheckNotNull(reser_date.getRawValue())){ prt_errMsg(get_msg('err_null'),null); reser_date.focus(); return false; }
            if(reser_date.isValid()===false){ reser_date.focus(); return false; }
            if(this.checkRqDate() === false){ return false; }

            prt_errMsg(null,null);

            Ext.MessageBox.confirm(__weguardia,get_msg('conf_system_reserve'), function(btn){
                if(btn === 'yes'){
                    var _params = {
                        date : Ext.encode(reser_date.getRawValue()),
                        hour : Ext.encode(reser_hour.getRawValue()),
                        min : Ext.encode(reser_min.getValue())
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'set_system_reboot',
                        _params,
                        function(response){

                            Ext.Msg.show({
                                title: __weguardia,
                                msg: get_msg("msg_ok_add"),
                                width: 300,
                                buttons: Ext.Msg.YES,
                                buttonText:{
                                    yes: __zen('close')
                                }
                            });
                            adminAlarmRefresh();
                        }
                    );

                }else{
                    return false;
                }
            });
        }else{
            var _params = {
                basename: Ext.encode('system_reboot'),
                exist_skip: Ext.encode(false)
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'initCollection',
                _params,
                function(response){

                    Ext.getCmp("fm_sys_state").getForm().reset();
                }
            );
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        Ext.getCmp("fm_sys_state").getForm().reset();

        this.onViewportAfterRender();
    },

    onViewportAfterRender: function(component, eOpts) {
        var me = this;

        var _params = {};

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_system_reboot',
            _params,
            function(response){

                hideLoadMask();

                if(response.system === "reservation"){
                    Ext.getCmp("reser_date").setValue(response.day);
                    Ext.getCmp("reser_hour").setValue(response.hour);
                    Ext.getCmp("reser_min").setValue(response.minute);

                    Ext.getCmp("state_toggle").state = true;
                    Ext.getCmp("state_toggle").moveHandle(true);
                    Ext.getCmp("con_reboot").enable();
                }
            }
        );
    },

    chk_system: function(val) {
        var con_reboot = Ext.getCmp("con_reboot");

        if(val === "reboot"){
            con_reboot.show();
        }else{
            con_reboot.hide();
        }
    },

    chk_reboot: function(val) {
        var reser_date = Ext.getCmp("reser_date");
        var reser_hour = Ext.getCmp("reser_hour");
        var reser_min = Ext.getCmp("reser_min");

        var con_date = Ext.getCmp("con_date");
        var con_time = Ext.getCmp("con_time");

        if(val==="reboot"){
            reser_date.setDisabled(true);
            reser_hour.setDisabled(true);
            reser_min.setDisabled(true);
        }else{
            reser_date.setDisabled(false);
            reser_hour.setDisabled(false);
            reser_min.setDisabled(false);
        }
    },

    checkRqDate: function() {
        var reser_date = Ext.getCmp("reser_date").getRawValue().split("-");
        reser_date = reser_date.join("");
        var reser_hour = Ext.getCmp("reser_hour").getRawValue();
        var reser_min = Ext.getCmp("reser_min").getValue();

        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth();
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();

        var monthtext = (month+1>=10)?month+1:"0"+(month+1);
        var daytext = (date>=10)?date:"0"+date;

        var today = year + "" + monthtext + "" + daytext;

        if(reser_date < today && reser_date !== null){
            Ext.Msg.alert(__weguardia,get_msg('err_date_now'));
            return false;
        }

        if(reser_date === today){
            if(reser_hour < hour || Number(reser_hour) === Number(hour) && Number(reser_min) < Number(minute)){
                Ext.Msg.alert(__weguardia,get_msg('err_time_now'));
                return false;
            }
        }
    }

});