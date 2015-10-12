
Ext.define('NFW2.view.win_network_alg_telnet', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_network_alg_telnet',

    requires: [
        'NFW2.view.win_network_alg_telnetViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.XTemplate',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_network_alg_telnet'
    },
    defaultListenerScope: true,
    cls: 'zen_win',
    id: 'win_network_alg_telnet',
    width: 510,
    modal: true,

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
                    id: 'win_btn_ok',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onWin_btn_okClick',
                        blur: 'onWin_btn_okBlur'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    id: 'win_btn_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onWin_btn_cancelClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onFormAfterRender'
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
                                            var me = Ext.getCmp('win_publicServer');

                                            if(value !== true){
                                                if(value !== ""){
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
                                                }
                                                else{
                                                    if(!CheckNotNull(value)){ return get_msg('err_null');}
                                                }
                                            }

                                            return true;
                                        },
                                        id: 'win_publicServer',
                                        margin: '11 0 0 0',
                                        width: 350,
                                        fieldLabel: 'Public Telnet Server IP',
                                        labelCls: 'lb_req',
                                        labelSeparator: ' ',
                                        labelWidth: 150,
                                        msgTarget: 'none',
                                        enableKeyEvents: true,
                                        maskRe: /[0-9.\/]/,
                                        listeners: {
                                            focus: 'onWin_publicServerFocus',
                                            blur: 'onWin_publicSeverBlur',
                                            keydown: 'onWin_pulbicServerKeydown',
                                            errorchange: 'onWin_publicServerErrorChange'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        validator: function(value) {
                                            var me = Ext.getCmp('win_publicServer');

                                            if(value !== true){
                                                if(value !== ""){
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
                                                }
                                                else{
                                                    if(!CheckNotNull(value)){ return get_msg('err_null');}
                                                }
                                            }

                                            return true;
                                        },
                                        id: 'win_realServer',
                                        margin: '8 0 0 0',
                                        width: 350,
                                        fieldLabel: 'Real Telnet Server IP',
                                        labelCls: 'lb_req',
                                        labelSeparator: ' ',
                                        labelWidth: 150,
                                        msgTarget: 'none',
                                        enableKeyEvents: true,
                                        maskRe: /[0-9.\/]/,
                                        listeners: {
                                            focus: 'onWin_realServerFocus',
                                            blur: 'onWin_realSeverBlur',
                                            keydown: 'onWin_realServerKeydown',
                                            errorchange: 'onWin_realServerErrorChange'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        validator: function(value) {
                                            var me = Ext.getCmp('win_portNum');

                                            if(value !== true){
                                                if(value !== ""){
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    if(!ValidNum(value)){ return get_msg('err_form'); }
                                                    if(!LengthCheck(value, 1, 65535)){ return ValidLimit(1, 65535);}
                                                }else{
                                                    if(!CheckNotNull(value)){ return get_msg('err_null');}
                                                }
                                            }

                                            return true;
                                        },
                                        fieldInfo: {
                                            txt: msg_tip_length_port(1,
                                            65535,
                                            null)
                                        },
                                        id: 'win_portNum',
                                        margin: '8 0 0 0',
                                        width: 350,
                                        labelCls: 'lb_req',
                                        labelSeparator: ' ',
                                        labelWidth: 150,
                                        msgTarget: 'none',
                                        value: '23',
                                        enableKeyEvents: true,
                                        enforceMaxLength: true,
                                        maskRe: /[0-9.]/,
                                        maxLength: 5,
                                        bind: {
                                            fieldLabel: '{port_num}'
                                        },
                                        listeners: {
                                            focus: 'onWin_portNumFocus',
                                            blur: 'onWin_portNumBlur',
                                            keydown: 'onWin_portNumKeydown',
                                            errorchange: 'onWin_portNumErrorChange'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        validator: function(value) {
                                            var me = Ext.getCmp('win_timeOver');

                                            if(value !== true){
                                                var _value = removeComma(value);

                                                if(value !== ""){
                                                    if(!CheckNotNull(_value)){ return get_msg('err_null');}
                                                    if(!ValidNum(_value)){ return get_msg('err_form');}
                                                    if(!LengthCheck(_value, 600, 86400)){ return ValidLimit(600, 86400);}
                                                }
                                                else{
                                                    if(!CheckNotNull(value)){ return get_msg('err_null');}
                                                }
                                            }

                                            return true;
                                        },
                                        fieldInfo: {
                                            txt: msg_tip_length(600,
                                            86400,
                                            null)
                                        },
                                        cls: 'inp_unit',
                                        id: 'win_timeOver',
                                        margin: '8 0 0 0',
                                        width: 350,
                                        afterBodyEl: [
                                            '<div class="inp_after">{[__zen("sec")]}</div>'
                                        ],
                                        labelCls: 'lb_req',
                                        labelSeparator: ' ',
                                        labelWidth: 150,
                                        msgTarget: 'none',
                                        value: '600',
                                        enableKeyEvents: true,
                                        enforceMaxLength: true,
                                        maskRe: /[0-9,\/]/,
                                        maxLength: 6,
                                        bind: {
                                            fieldLabel: '{time_over}'
                                        },
                                        listeners: {
                                            focus: 'onWin_timeoverFocus',
                                            blur: 'onWin_timeOverBlur',
                                            keydown: 'onWin_timeOverKeydown',
                                            errorchange: 'onWin_timeOverErrorChange',
                                            change: 'onWin_timeOverChange'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        validator: function(value) {
                                            var me = Ext.getCmp('win_maxConnect');

                                            if(value !== true){
                                                if(value !== ""){
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    if(!ValidNum(value)){ return get_msg('err_form'); }
                                                    if(!LengthCheck(value, 0, 10)){ return ValidLimit(0, 10);}
                                                }
                                                else{
                                                    if(!CheckNotNull(value)){ return get_msg('err_null');}
                                                }
                                            }

                                            return true;
                                        },
                                        fieldInfo: {
                                            txt: msg_tip_length(0,
                                            10,
                                            null)
                                        },
                                        id: 'win_maxConnect',
                                        margin: '8 0 0 0',
                                        width: 350,
                                        labelCls: 'lb_req',
                                        labelSeparator: ' ',
                                        labelWidth: 150,
                                        msgTarget: 'none',
                                        value: '10',
                                        enableKeyEvents: true,
                                        enforceMaxLength: true,
                                        maskRe: /[0-9\/]/,
                                        maxLength: 2,
                                        maxLengthText: '2',
                                        bind: {
                                            fieldLabel: '{max_connect}'
                                        },
                                        listeners: {
                                            focus: 'onWin_maxConnectFocus',
                                            blur: 'onWin_maxConnectBlur',
                                            keydown: 'onWin_maxConnectKeydown',
                                            errorchange: 'onWin_maxConnectErrorChange'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        margin: '10 0 0 18',
                                        items: [
                                            {
                                                xtype: 'radiogroup',
                                                width: 420,
                                                labelSeparator: ' ',
                                                labelWidth: 143,
                                                bind: {
                                                    fieldLabel: '{upload}'
                                                },
                                                items: [
                                                    me.processUpload_accept({
                                                        xtype: 'radiofield',
                                                        id: 'upload_accept',
                                                        name: 'upload',
                                                        checked: true,
                                                        bind: {
                                                            boxLabel: '{accept}'
                                                        }
                                                    }),
                                                    me.processUpload_deny({
                                                        xtype: 'radiofield',
                                                        id: 'upload_deny',
                                                        name: 'upload',
                                                        bind: {
                                                            boxLabel: '{deny}'
                                                        }
                                                    })
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        items: [
                                            {
                                                xtype: 'radiogroup',
                                                id: 'win_download',
                                                margin: '0 0 0 18',
                                                width: 420,
                                                labelSeparator: ' ',
                                                labelWidth: 143,
                                                bind: {
                                                    fieldLabel: '{download}'
                                                },
                                                items: [
                                                    me.processDownload_accept({
                                                        xtype: 'radiofield',
                                                        id: 'download_accept',
                                                        name: 'download',
                                                        checked: true,
                                                        bind: {
                                                            boxLabel: '{accept}'
                                                        }
                                                    }),
                                                    me.processDownload_deny({
                                                        xtype: 'radiofield',
                                                        id: 'download_deny',
                                                        name: 'download',
                                                        bind: {
                                                            boxLabel: '{deny}'
                                                        }
                                                    })
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        margin: '8 0 10 18',
                                        items: [
                                            {
                                                xtype: 'radiogroup',
                                                id: 'win_operatingMethod',
                                                margin: '',
                                                width: 420,
                                                labelSeparator: ' ',
                                                labelWidth: 143,
                                                bind: {
                                                    fieldLabel: '{operating_method}'
                                                },
                                                items: [
                                                    me.processOperatingMethod_nomal({
                                                        xtype: 'radiofield',
                                                        id: 'operatingMethod_nomal',
                                                        name: 'action',
                                                        checked: true,
                                                        bind: {
                                                            boxLabel: '{nomal_gate}'
                                                        }
                                                    }),
                                                    me.processOperatingMethod_blank({
                                                        xtype: 'radiofield',
                                                        id: 'operatingMethod_blank',
                                                        name: 'action',
                                                        bind: {
                                                            boxLabel: '{blank_gate}'
                                                        }
                                                    })
                                                ]
                                            }
                                        ]
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

    processUpload_accept: function(config) {
        config.boxLabel = true;

        return config;
    },

    processUpload_deny: function(config) {
        config.boxLabel = true;

        return config;
    },

    processDownload_accept: function(config) {
        config.boxLabel = true;

        return config;
    },

    processDownload_deny: function(config) {
        config.boxLabel = true;

        return config;
    },

    processOperatingMethod_nomal: function(config) {
        config.boxLabel = true;

        return config;
    },

    processOperatingMethod_blank: function(config) {
        config.boxLabel =true;
        return config;
    },

    onWin_publicServerFocus: function(component, event, eOpts) {
        var me = this;

        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onWin_publicSeverBlur: function(component, event, eOpts) {
        var me = this;

        setTipBlur(this,component);
        Ext.getCmp('win_publicServer').validateValue(true);
    },

    onWin_pulbicServerKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_publicServerErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_realServerFocus: function(component, event, eOpts) {
        var me = this;

        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onWin_realSeverBlur: function(component, event, eOpts) {
        var me = this;

        setTipBlur(this,component);
        Ext.getCmp('win_realServer').validateValue(true);
    },

    onWin_realServerKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_realServerErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_portNumFocus: function(component, event, eOpts) {
        var me = this;

        if(me.edit === 'edit'){}
        else{
            if(Ext.getCmp('win_portNum').getValue()==="23"){
                Ext.getCmp('win_portNum').setValue("");
                Ext.getCmp('win_portNum').validateValue(true);
            }
        }

        setTipFocus(this,component);
    },

    onWin_portNumBlur: function(component, event, eOpts) {
        var me = this;

        if(me.edit === 'edit'){}
        else{
            if(Ext.getCmp('win_portNum').getValue() === ""){
                Ext.getCmp('win_portNum').setValue("23");
            }
        }

        setTipBlur(this,component);
        Ext.getCmp('win_portNum').validateValue(true);
    },

    onWin_portNumKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_portNumErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_timeoverFocus: function(component, event, eOpts) {
        var me = this;

        if(me.edit === 'edit'){}
        else{
            if(Ext.getCmp('win_timeOver').getValue()==="600"){
                Ext.getCmp('win_timeOver').setValue("");
                Ext.getCmp('win_timeOver').validateValue(true);
            }
        }

        setTipFocus(this,component);
    },

    onWin_timeOverBlur: function(component, event, eOpts) {
        var me = this;

        if(me.edit === 'edit'){}
        else{
            if(Ext.getCmp('win_timeOver').getValue() === ""){
                Ext.getCmp('win_timeOver').setValue("600");
            }
        }

        setTipBlur(this,component);
        Ext.getCmp('win_timeOver').validateValue(true);
    },

    onWin_timeOverKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_timeOverErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_timeOverChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onWin_maxConnectFocus: function(component, event, eOpts) {
        var me = this;

        if(me.edit === 'edit'){}
        else{
            if(Ext.getCmp('win_maxConnect').getValue()==="10"){
                Ext.getCmp('win_maxConnect').setValue("");
                Ext.getCmp('win_maxConnect').validateValue(true);
            }
        }

        setTipFocus(this,component);
    },

    onWin_maxConnectBlur: function(component, event, eOpts) {
        var me = this;

        if(me.edit === 'edit'){}
        else{
            if(Ext.getCmp('win_maxConnect').getValue() === ""){
                Ext.getCmp('win_maxConnect').setValue("10");
            }
        }

        setTipBlur(this,component);
        Ext.getCmp('win_maxConnect').validateValue(true);
    },

    onWin_maxConnectKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_maxConnectErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_btn_okClick: function(button, e, eOpts) {
        var me = this;
        var store = Ext.data.StoreManager.lookup('store_alg_telnet_proxy');
        var main = Ext.getCmp('NFW2_network_alg_telnet');

        if(Ext.getCmp('win_publicServer').isValid() === false){ Ext.getCmp('win_publicServer').focus(); return false; }
        if(Ext.getCmp('win_realServer').isValid() === false){ Ext.getCmp('win_realServer').focus(); return false; }
        if(Ext.getCmp('win_portNum').isValid() === false){ Ext.getCmp('win_portNum').focus(); return false; }
        if(Ext.getCmp('win_timeOver').isValid() === false){ Ext.getCmp('win_timeOver').focus(); return false; }
        if(Ext.getCmp('win_maxConnect').isValid() === false){ Ext.getCmp('win_maxConnect').focus(); return false; }

        var obj = {};
        var _time = removeComma(Ext.getCmp('win_timeOver').getValue());

        obj = {
            'public_server_ip' : Ext.getCmp('win_publicServer').getValue(),
            'real_server_ip' : Ext.getCmp('win_realServer').getValue(),
            'port_num' : Ext.getCmp('win_portNum').getValue(),
            'time_out' : _time,
            'max_sessions' : Ext.getCmp('win_maxConnect').getValue(),
            'upload' : '',
            'download' : '',
            'action' : '',
            'enable' : 'on'
        };

        if(Ext.getCmp('upload_accept').getValue()===true){
            obj['upload'] = 'accept';
        }else{
            obj['upload'] = 'deny';
        }
        if(Ext.getCmp('download_accept').getValue()===true){
            obj['download'] = 'accept';
        }else{
            obj['download'] = 'deny';
        }
        if(Ext.getCmp('operatingMethod_nomal').getValue()===true){
            obj['action'] = '0';
        }else{
            obj['action'] = '1';
        }

        if(me.edit !== "edit"){
            for(var i in store.data.items){
                var store_publicServer = store.data.items[i].data.public_server_ip;
                var store_portNum = store.data.items[i].data.port_num;
                var store_action = store.data.items[i].data.action;
                if(store_publicServer===obj.public_server_ip&&store_portNum===obj.port_num){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_telnet'));
                    me.set_btn = true;
                    return false;
                }
                if(Ext.getCmp('operatingMethod_nomal').getValue()===false){
                    if(store_action==='1'){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_blank_gate'));
                        me.set_btn = true;
                        return false;
                    }
                }
            }
        }else{
            for(var i in store.data.items){
                var store_publicServer = store.data.items[i].data.public_server_ip;
                var store_portNum = store.data.items[i].data.port_num;
                var store_action = store.data.items[i].data.action;
                if(store.data.items[i].data.id !== me.record.data.id){
                    if(store_publicServer===obj.public_server_ip&&store_portNum===obj.port_num){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_telnet'));
                        me.set_btn = true;
                        return false;
                    }
                    if(Ext.getCmp('operatingMethod_nomal').getValue()===false){
                        if(store_action==='1'){
                            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                            err_fl.addCls('ic_msg_err');
                            err_fl.update(get_msg('err_blank_gate'));
                            me.set_btn = true;
                            return false;
                        }
                    }
                }
            }
        }

        if(me.edit === "edit"){
            obj['_id'] = me.cid;
        }

        var update = (me.edit==="edit")?true:false;

        showLoadMask();

        var _params = {
            basename : Ext.encode('alg_telnet_proxy'),
            obj : Ext.encode(obj),
            update : Ext.encode(update)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setListTypeObj',
            _params,
            function(response){
                hideLoadMask();
                var _store = Ext.data.StoreManager.lookup('store_alg_telnet_proxy');
                //         main.chk_interface("");
                main.get_store();
            }
        );

        if(me.edit !== "edit"){
            Ext.Msg.show({
                title: __weguardia,
                msg: get_msg("msg_ok_add"),
                width: 300,
                buttons: Ext.Msg.YESNO,
                buttonText:{
                    yes: __zen('add_plus'),
                    no: __zen('close')
                },
                fn: me.set_win,
                icon: Ext.window.MessageBox.INFO
            });

        }
        else{
            Ext.Msg.show({
                title: __weguardia,
                width: 300,
                msg: get_msg('msg_ok_edit'),
                buttons: Ext.Msg.OK,
                fn: setWinClose,
                icon: Ext.window.MessageBox.INFO
            });
        }
    },

    onWin_btn_okBlur: function(component, event, eOpts) {
        var me = this;
        if(me.set_btn === true){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
            me.set_btn = false;
        }
    },

    onWin_btn_cancelClick: function(button, e, eOpts) {
        this.close();
    },

    onFormAfterRender: function(component, eOpts) {
        var main = Ext.getCmp('NFW2_network_alg_telnet');
        var tbl = Ext.getCmp("telnet_grid");
        var tbl_sel = tbl.getSelectionModel().getSelection();
        this.fieldInfo = makeZenTip();
        this.set_btn = false;
        var me = this;
        chk_zenauth(null);

        if(this.edit === "edit"){
            me.edit_fir = true;
            me.setTitle(__zen('edit_alg_telnet') + " - " + me.index);

            showLoadMask();

            var me = this;


            var _params = {
                basename : Ext.encode("alg_telnet_proxy"),
                key : Ext.encode({'_id' : me.record.data._id})
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getObject',
                _params,

                function(data){
                    hideLoadMask();
                    Ext.getCmp('win_publicServer').setValue(data.public_server_ip);
                    Ext.getCmp('win_realServer').setValue(data.real_server_ip);
                    Ext.getCmp('win_portNum').setValue(data.port_num);
                    Ext.getCmp('win_timeOver').setValue(data.time_out);
                    Ext.getCmp('win_maxConnect').setValue(data.max_sessions);
                    me.cid = data._id;
                    if(data.upload==='accept'){
                        Ext.getCmp('upload_accept').setValue(true);
                    }else{
                        Ext.getCmp('upload_deny').setValue(true);
                    }
                    if(data.download==='accept'){
                        Ext.getCmp('download_accept').setValue(true);
                    }else{
                        Ext.getCmp('download_deny').setValue(true);
                    }
                    if(data.action==='0'){
                        Ext.getCmp('operatingMethod_nomal').setValue(true);
                    }else{
                        Ext.getCmp('operatingMethod_blank').setValue(true);
                    }
                }
            );

        }else{
            me.setTitle(__zen('add_alg_telnet'));
        }
    },

    set_win: function(btn) {
        if(btn === "yes"){
            Ext.getCmp('win_publicServer').setValue('');
            Ext.getCmp('win_publicServer').validateValue(true);
            Ext.getCmp('win_realServer').setValue('');
            Ext.getCmp('win_realServer').validateValue(true);
            Ext.getCmp('win_portNum').setValue('23');
            Ext.getCmp('win_timeOver').setValue('600');
            Ext.getCmp('win_maxConnect').setValue('10');
            Ext.getCmp('upload_accept').setValue(true);
            Ext.getCmp('download_accept').setValue(true);
            Ext.getCmp('operatingMethod_nomal').setValue(true);
        }
        else{
            Ext.getCmp('win_network_alg_telnet').close();
        }
    }

});