
Ext.define('NFW2.view.win_syslog', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_syslog',

    requires: [
        'NFW2.view.win_syslogViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_syslog'
    },
    cls: 'zen_win',
    id: 'win_syslog',
    scrollable: true,
    width: 500,
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            flex: 1,
            itemId: 'fm',
            scrollable: true,
            layout: 'auto',
            bodyPadding: 20,
            title: '',
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value === true){ return true; }
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        if(!ValidIPAddress(value)){ return get_msg('err_ip'); }

                                        return true;
                                    },
                                    cls: 'lb_req',
                                    id: 's_ip',
                                    labelSeparator: ' ',
                                    labelWidth: 80,
                                    msgTarget: 'none',
                                    bind: {
                                        fieldLabel: '{ip}'
                                    },
                                    listeners: {
                                        errorchange: 'onS_ipErrorChange',
                                        focus: 'onS_ipFocus',
                                        blur: 'onS_ipBlur'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value === true){ return true; }
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        if(!ValidNum(value)){ return get_msg('err_form'); }
                                        if(!LengthCheck(value, 1, 65535)){ return ValidLimit(1, 65535); }

                                        return true;
                                    },
                                    fieldInfo: '',
                                    cls: 'lb_req',
                                    id: 's_port',
                                    width: 200,
                                    labelSeparator: ' ',
                                    labelWidth: 80,
                                    msgTarget: 'none',
                                    value: '514',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9.]/,
                                    maxLength: 5,
                                    bind: {
                                        fieldLabel: '{port}'
                                    },
                                    listeners: {
                                        errorchange: 'onS_portErrorChange',
                                        keydown: 'onS_portKeydown',
                                        focus: 'onS_portFocus',
                                        blur: 'onS_portBlur'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    id: 'logserver_log',
                                    labelSeparator: ' ',
                                    labelWidth: 80,
                                    msgTarget: 'none',
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    valueField: 'val',
                                    bind: {
                                        fieldLabel: '{log}'
                                    }
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: 's_chk_enc',
                                    style: 'color:#666',
                                    fieldLabel: '',
                                    boxLabelAlign: 'before',
                                    listeners: {
                                        beforerender: 'onS_chk_encBeforeRender'
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
        afterrender: 'onWindowAfterRender'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
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

    onS_ipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg2");
    },

    onS_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onS_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onS_portErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg2");
    },

    onS_portKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onS_portFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1 ~ 65535';
        setTipFocus(this,component);
    },

    onS_portBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onS_chk_encBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('use_encryption');
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        me.fieldInfo = makeZenTip();
        var NFW2 = Ext.getCmp("NFW2_log_config_logServer");

        chk_zenauth(null);

        var _store = Ext.create('Ext.data.Store',{
            data: [{'name':'SYSLOG(1)','val':1},
                   {'name':'SYSLOG(2)','val':2},
                   {'name':'SYSLOG(3)','val':3},
                   {'name':'SYSLOG(4)','val':4},
                   {'name':'SYSLOG(5)','val':5}],
            fields: ['name']
        });

        Ext.getCmp("logserver_log").bindStore(_store);
        Ext.getCmp("logserver_log").setValue(1);

        if(me.edit === "edit"){
            me.init_syslog();
        }else{
            me.setTitle(__zen('syslog_server_add'));
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = Ext.getCmp('win_syslog');

        var port = Ext.getCmp("s_port");
        var ip = Ext.getCmp("s_ip");
        var log = Ext.getCmp("logserver_log");
        var chk_enc = Ext.getCmp("s_chk_enc");

        if(port.isValid()===false){ port.focus(); return false; }
        if(ip.isValid()===false){ ip.focus(); return false; }

        var syslog = me.syslog;

        var obj = {
            '_kind': 'syslog',
            'format': 'standard',
            'port': port.getValue(),
            'ip': ip.getValue(),
            'log':Number(log.getValue()),
            'chk_enc': (chk_enc.getValue())?"on":"off"
        };

        var update = (me.edit==="edit")?true:false;

        if(update===true){
            obj._id = me.record._id;
        }

        var _params = {
            basename: Ext.encode("syslog_setting"),
            obj: Ext.encode(obj),
            update: Ext.encode(update)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setListTypeObj',
            _params,
            function(response){

                var _store = Ext.data.StoreManager.lookup("store_logserver_syslist");
                _store.load();

                if(_store.getTotalCount() >= 4){
                    Ext.Msg.show({
                        title: __weguardia,
                        msg: get_msg("msg_ok_add"),
                        width: 300,
                        buttons: Ext.Msg.NO,
                        buttonText:{
                            no: __zen('close')
                        },
                        fn: setWinState,
                        icon: Ext.window.MessageBox.INFO
                    });
                }else{

                    if(update === true){

                        Ext.Msg.show({
                            title: __weguardia,
                            msg: get_msg("msg_ok_edit"),
                            width: 300,
                            buttons: Ext.Msg.OK,
                            fn: setWinClose,
                            icon: Ext.window.MessageBox.INFO
                        });
                    }else{

                        Ext.Msg.show({
                            title: __weguardia,
                            msg: get_msg("msg_ok_add"),
                            width: 300,
                            buttons: Ext.Msg.YESNO,
                            buttonText:{
                                yes: __zen('add_plus'),
                                no: __zen('close')
                            },
                            fn: setWinState,
                            icon: Ext.window.MessageBox.INFO
                        });
                    }
                }

            }
        );

        function setWinState(btn){
            if(btn==="no"){
                var win = Ext.WindowManager.getActive();
                if (win) {
                    win.close();
                }
            }else{
                Ext.ComponentQuery.query('container[itemId="fm"]').forEach(function(fm){ fm.getForm().reset(); });
                Ext.ComponentQuery.query('container[cls="fld_msg"]').forEach(function(cls){ cls.removeCls('ic_msg_err'); cls.update(''); });
            }
        }

    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    init_syslog: function() {
        var me = this;
        var record = me.record;

        me.setTitle(__zen('syslog_server_edit')+" - "+me.num);

        Ext.getCmp("s_port").setValue(record.port);
        Ext.getCmp("s_ip").setValue(record.ip);
        Ext.getCmp("logserver_log").setValue(record.log);
        if(record.chk_enc === "on"){
            Ext.getCmp("s_chk_enc").setValue(true);
        }

        if(record.send_type === "select"){

            Ext.getCmp("send_select").setValue(true);
        }
    }

});