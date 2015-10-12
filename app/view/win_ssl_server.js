
Ext.define('NFW2.view.win_ssl_server', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ssl_server',

    requires: [
        'NFW2.view.win_ssl_serverViewModel',
        'Ext.form.Panel',
        'Ext.form.field.TextArea',
        'Ext.form.Label',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_ssl_server'
    },
    cls: 'zen_win',
    scrollable: true,
    width: 650,
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
            bodyPadding: 20,
            title: '',
            items: [
                {
                    xtype: 'container',
                    minWidth: 530,
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 'name',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 150,
                            msgTarget: 'none',
                            enforceMaxLength: true,
                            maxLength: 64,
                            bind: {
                                fieldLabel: '{name}'
                            },
                            listeners: {
                                errorchange: 'onNameErrorChange',
                                blur: 'onNameBlur',
                                focus: 'onNameFocus'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: 'charge',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 150,
                            enforceMaxLength: true,
                            maxLength: 32,
                            bind: {
                                fieldLabel: '{person_charge}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: 'tel',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 150,
                            enforceMaxLength: true,
                            maxLength: 32,
                            bind: {
                                fieldLabel: '{inquiry_number}'
                            }
                        },
                        {
                            xtype: 'textareafield',
                            validator: function(value) {
                                if(!CheckNotNull(value) || value === true){ return true; }
                                if(byteCheck(value) > 256){ return ValidByte(256); }

                                return true;
                            },
                            height: 70,
                            id: 'desc',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 150,
                            msgTarget: 'none',
                            enforceMaxLength: false,
                            bind: {
                                fieldLabel: '{desc}'
                            },
                            listeners: {
                                errorchange: 'onDescErrorChange',
                                blur: 'onDescBlur'
                            }
                        },
                        {
                            xtype: 'textareafield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                var val = value.split("\n");
                                for(var i=0; i<val.length; i++){

                                    if(byteCheck(val[i]) > 64){ return get_msg('err_ssl_ip'); }
                                }

                                if(val.length > 256){ return get_msg('err_ssl_line'); }

                                return true;
                            },
                            cls: 'lb_req',
                            height: 90,
                            id: 'list',
                            scrollable: {
                                x: true,
                                y: true
                            },
                            style: 'ime-mode:disabled; overflow:auto;',
                            width: 600,
                            labelSeparator: ' ',
                            labelWidth: 150,
                            msgTarget: 'none',
                            fieldStyle: 'ime-mode:disabled; overflow:auto;',
                            bind: {
                                fieldLabel: '{ip_end_point_list}'
                            },
                            listeners: {
                                errorchange: 'onListErrorChange',
                                blur: 'onListBlur'
                            }
                        },
                        {
                            xtype: 'container',
                            cls: 'fld_info',
                            margin: '0 0 0 160',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'mt_info',
                                    text: 'ex) 1.1.1.1/32 tcp 10-20 tcp 30-65535 udp 1-65535'
                                },
                                {
                                    xtype: 'label',
                                    cls: 'mt_info',
                                    margin: '0 0 0 27',
                                    text: '2.2.2.2/32 tcp 10-20 tcp 30-65535 udp 1-65535'
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
    ],

    onNameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onNameBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onNameFocus: function(component, event, eOpts) {
        component.fieldInfo = '1~64'+__zen('charact');
        setTipFocus(this,component);
    },

    onDescErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onDescBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onListErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onListBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        me.fieldInfo = makeZenTip();

        chk_zenauth(null);

        if(me.edit === "edit"){

            var record = me.record;

            me.setTitle(__zen('access_server_edit')+" - "+record._num);
            Ext.getCmp("name").setValue(record.rname);
            Ext.getCmp("charge").setValue(record.manager);
            Ext.getCmp("tel").setValue(record.tel);
            Ext.getCmp("desc").setValue(record.desc);
            Ext.getCmp("list").setValue(record.ip_list.join("\r\n"));
        }else{
            me.setTitle(__zen('access_server_add'));
        }
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var name = Ext.getCmp("name");
        var charge = Ext.getCmp("charge");
        var tel = Ext.getCmp("tel");
        var desc = Ext.getCmp("desc");
        var list = Ext.getCmp("list");

        if(name.isValid()===false){ name.focus(); return false; }
        if(desc.isValid()===false){ desc.focus(); return false; }
        if(list.isValid()===false){ list.focus(); return false; }

        var obj = {};

        obj.rname = name.getValue();
        obj.manager = charge.getValue();
        obj.tel = tel.getValue();
        obj.desc = desc.getValue();

        var a_list = list.getValue().split("\n");
        var list = [];
        for(var i=0; i<a_list.length; i++){
            if(a_list[i] === ""){ continue; }
            var str = a_list[i].split(" ");

            var ic = str[0].split("/");
            if(ValidIPAddress(ic[0])===false){ prt_errMsg((i+1)+"번 째 라인의 "+get_msg('err_ip'),null); return false; }
            if(LengthCheck(ic[1], 1, 32)===false){ prt_errMsg((i+1)+"번 째 라인의 "+ValidLimit(1, 32),null); return false; }

            if(chk_port(str,i)===false){ return false; }
            list.push(a_list[i]);
        }

        function chk_port(str,i){

            for(var l=1; l<str.length; l=l+2){

                if(str[l] !== "tcp" && str[l] !== "udp"){ prt_errMsg((i+1)+"번 째 라인의 "+ValidIP('프로토콜'),null); list.focus(); return false; }
                if(str[l+1].indexOf("-") === -1){

                    if(LengthCheck(str[l+1], 1, 65535)===false){ prt_errMsg((i+1)+"번 째 라인의 "+ValidLimit(1, 65535),null); list.focus(); return false; }
                }else{

                    var port = str[l+1].split("-");
                    if(port.length > 2){ prt_errMsg((i+1)+"번 째 라인의 "+ValidIP('포트'),null); return false; }
                    if(LengthCheck(port[0], 1, 65535)===false){ prt_errMsg((i+1)+"번 째 라인의 "+ValidLimit(1, 65535),null); list.focus(); return false; }
                    if(LengthCheck(port[1], 1, 65535)===false){ prt_errMsg((i+1)+"번 째 라인의 "+ValidLimit(1, 65535),null); list.focus(); return false; }
                    if(port[0] > port[1]){ prt_errMsg((i+1)+"번 째 라인의 포트의 "+get_msg('err_than'),null); list.focus(); return false; }
                }
            }
            return true;
        }

        prt_errMsg(null,null);

        obj.ip_list = list;

        var update = (me.edit==="edit")?true:false;

        if(update){
            obj._id = me.record._id;
            obj.update = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
        }

        var key = {
            rname: name.getValue()
        };

        var _params = {
            basename: Ext.encode('server_access_config'),
            obj: Ext.encode(obj),
            update: Ext.encode(update)
        };

        var _param = {
            basename: Ext.encode("server_access_config"),
            key: Ext.encode(key)
        };

        if(me.name !== name.getValue()){

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getObject',
                _param,
                function(response){

                    if(response !== null){
                        prt_errMsg(get_msg('err_objname'),null); name.focus(); return false;
                    }else{
                        fn_set();
                    }
                }
            );
        }else{
            fn_set();
        }

        function fn_set(){

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'setListTypeObj',
                _params,
                function(response){
                    var store = Ext.data.StoreManager.lookup("store_sslplus_server_list");
                    store.load();

                    if(store.getTotalCount()+1 >= 256){
                        me.close();
                        return false;
                    }

                    if(update === true){
                        Ext.Msg.show({
                            title: 'WeGuardia™ ZEN',
                            msg: get_msg("msg_ok_edit"),
                            width: 300,
                            buttons: Ext.Msg.OK,
                            fn: setWinClose,
                            icon: Ext.window.MessageBox.INFO
                        });
                    }else{
                        Ext.Msg.show({
                            title: 'WeGuardia™ ZEN',
                            msg: get_msg("msg_ok_add"),
                            width: 300,
                            buttons: Ext.Msg.YESNO,
                            buttonText:{
                                yes: "계속 추가",
                                no: "닫기"
                            },
                            fn: setWinState,
                            icon: Ext.window.MessageBox.INFO
                        });
                    }

                }
            );
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        this.close();
    }

});