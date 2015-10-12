
Ext.define('NFW2.view.win_applist', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_applist',

    requires: [
        'NFW2.view.win_applistViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.TextArea',
        'Ext.button.Button',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'win_applist'
    },
    cls: 'zen_win',
    id: 'win_applist',
    scrollable: true,
    width: 560,
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
            id: 'fm_applist',
            scrollable: true,
            bodyPadding: 20,
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                if(Ext.getCmp("b_name").getValue() !== '' && Ext.getCmp("b_signature").getValue() !== ''){
                                    Ext.getCmp("b_submit").enable();
                                }else{
                                    Ext.getCmp("b_submit").disable();
                                }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 'b_name',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 110,
                            msgTarget: 'none',
                            enforceMaxLength: true,
                            maxLength: 255,
                            bind: {
                                fieldLabel: '{name}'
                            },
                            listeners: {
                                errorchange: 'onB_nameErrorChange',
                                blur: 'onB_nameBlur'
                            }
                        },
                        {
                            xtype: 'combobox',
                            id: 'b_category',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 110,
                            value: 'User Defined',
                            editable: false,
                            displayField: 'val',
                            queryMode: 'local',
                            store: 'store_profile_category',
                            valueField: 'val',
                            bind: {
                                fieldLabel: '{categorys}'
                            }
                        },
                        {
                            xtype: 'tagfield',
                            id: 'b_purpose',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 110,
                            value: [
                                'Other'
                            ],
                            editable: false,
                            displayField: 'val',
                            queryMode: 'local',
                            store: 'store_profile_purpose',
                            transform: 'Ext.form.field.Tag',
                            valueField: 'val',
                            bind: {
                                fieldLabel: '{purpose}'
                            },
                            listeners: {
                                blur: 'onB_purposeBlur'
                            }
                        },
                        {
                            xtype: 'combobox',
                            id: 'b_technology',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 110,
                            value: 'Other',
                            editable: false,
                            displayField: 'val',
                            queryMode: 'local',
                            store: 'store_profile_technology',
                            valueField: 'val',
                            bind: {
                                fieldLabel: '{technology}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            id: 'b_popularity',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 110,
                            value: '1',
                            editable: false,
                            displayField: 'val',
                            queryMode: 'local',
                            store: 'store_profile_popularity',
                            valueField: 'val',
                            bind: {
                                fieldLabel: '{awareness}'
                            }
                        },
                        {
                            xtype: 'tagfield',
                            id: 'b_content',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 110,
                            value: [
                                'Any'
                            ],
                            editable: false,
                            displayField: 'val',
                            queryMode: 'local',
                            store: 'store_profile_content',
                            valueField: 'val',
                            bind: {
                                fieldLabel: '{content_type}'
                            },
                            listeners: {
                                blur: 'onB_contentBlur'
                            }
                        },
                        {
                            xtype: 'datefield',
                            id: 'b_released',
                            labelSeparator: ' ',
                            labelWidth: 110,
                            editable: false,
                            format: 'Y-m-d',
                            submitFormat: 'Y-m-d',
                            bind: {
                                fieldLabel: '{renewal_date}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            id: 'b_vendor',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 110,
                            value: 'Other',
                            editable: false,
                            displayField: 'val',
                            queryMode: 'local',
                            store: 'store_profile_vendor',
                            valueField: 'val',
                            bind: {
                                fieldLabel: '{company}'
                            }
                        },
                        {
                            xtype: 'tagfield',
                            id: 'b_protocol',
                            width: 400,
                            labelSeparator: ' ',
                            labelWidth: 110,
                            value: [
                                'Other'
                            ],
                            editable: false,
                            displayField: 'val',
                            queryMode: 'local',
                            store: 'store_profile_protocol',
                            valueField: 'val',
                            bind: {
                                fieldLabel: '{protocol}'
                            },
                            listeners: {
                                blur: 'onB_protocolBlur'
                            }
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textareafield',
                                    validator: function(value) {
                                        if(value === true){ return true; }
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        if(!ValidNotKor(value)){ return get_msg('err_notkor'); }

                                        if(Ext.getCmp("b_name").getValue() !== '' && value !== ''){
                                            Ext.getCmp("b_submit").enable();
                                        }else{
                                            Ext.getCmp("b_submit").disable();
                                        }

                                        return true;
                                    },
                                    flex: 1,
                                    cls: 'lb_req',
                                    height: 100,
                                    id: 'b_signature',
                                    labelSeparator: ' ',
                                    labelWidth: 110,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 10000,
                                    bind: {
                                        fieldLabel: '{signature}'
                                    },
                                    listeners: {
                                        errorchange: 'onB_signatureErrorChange',
                                        blur: 'onB_signatureBlur'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    cls: 'btn_b',
                                    disabled: true,
                                    id: 'b_submit',
                                    iconCls: 'ft_confirm_icl',
                                    bind: {
                                        text: '{register_request}'
                                    },
                                    listeners: {
                                        click: 'onButtonClick'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'button',
                                            height: 14,
                                            margin: '7 0 0 10',
                                            style: 'background:url(../images/b_help.png) no-repeat;border:none',
                                            width: 14,
                                            listeners: {
                                                render: 'onButtonRender'
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
        afterrender: 'onWindowAfterRender',
        close: 'onWindowClose'
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

    onB_nameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error,null);
    },

    onB_nameBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onB_purposeBlur: function(component, event, eOpts) {
        if(component.value.length === 0){
            component.setValue("Other");
        }
    },

    onB_contentBlur: function(component, event, eOpts) {
        if(component.value.length === 0){
            component.setValue("Any");
        }
    },

    onB_protocolBlur: function(component, event, eOpts) {
        if(component.value.length === 0){
            component.setValue("Other");
        }
    },

    onB_signatureErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error,null);
    },

    onB_signatureBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onButtonClick: function(button, e, eOpts) {
        var name = Ext.getCmp("b_name");
        var category = Ext.getCmp("b_category");
        var purpose = Ext.getCmp("b_purpose");
        var technology = Ext.getCmp("b_technology");
        var popularity = Ext.getCmp("b_popularity");
        var content = Ext.getCmp("b_content");
        var released = Ext.getCmp("b_released");
        var vendor = Ext.getCmp("b_vendor");
        var protocol = Ext.getCmp("b_protocol");
        var signature = Ext.getCmp("b_signature");

        if(name.isValid()===false){ name.focus(); return false; }
        if(signature.isValid()===false){ signature.focus(); return false; }

        var sig = signature.getValue();
        var a_sig = sig.split("\n");

        var n = 0;
        var m = 0;

        for(var i=0; i<a_sig.length; i++){

            var _param = {
                func_name: Ext.encode('check_snort_validation'),
                args: Ext.encode({'rule':a_sig[i]})
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'execKctrlFunc',
                _param,
                function(response){
                    m++;
                    if(response[0]===true){
                        n++;
                    }

                    if(a_sig.length === n){
                        app_submit();
                    }else{
                        if(i === m)
                            Ext.MessageBox.alert(__weguardia,ValidIP(__zen('signature')));
                    }
                }
            );
        }

        function app_submit(){
            var id = Ext.getCmp("NFW2_client").clientInfo.userId;

            var _params = {
                basename : Ext.encode('mgtable_users'),
                key: Ext.encode({'userid':id})
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getObject',
                _params,
                function(response){

                    var email = (response.email)?response.email:null;

                    var obj = {
                        'name': name.getValue(),
                        'cat': category.getValue(),
                        'pur': purpose.getValue(),
                        'tech': technology.getValue(),
                        'pop': Number(popularity.getValue()),
                        'type': content.getValue(),
                        'date': released.getSubmitValue(),
                        'org': vendor.getValue(),
                        'proto': protocol.getValue(),
                        'sig': signature.getValue(),
                        'sender': email
                    };

                    var _params = {
                        'func_name': Ext.encode('mod_fw_app_user_application_submit'),
                        'args': Ext.encode(obj)
                    };

                    Ext.getCmp("win_applist").mask('Loading...');

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'execKctrlFunc',
                        _params,
                        function(response){

                            Ext.getCmp("win_applist").unmask();

                            if(response[0] === true){
                                Ext.MessageBox.alert(__weguardia,get_msg('msg_sig_suc'));
                            }else{
                                Ext.MessageBox.alert(__weguardia,get_msg('msg_sig_fail')+"("+response[1]+")");
                            }
                        }
                    );
                }
            );
        }
    },

    onButtonRender: function(component, eOpts) {
        component.tooltip = Ext.create('Ext.tip.ToolTip', {
            target: component.getEl(),
            autoHide: false,
            anchor:'left',
            cls : 'left_light_box',
            shadow: false,
            border : 0,
            items : [
                {
                    xtype : 'container',
                    width : 400,
                    cls:'tip_box',
                    html : __zen('sig_info1')
                }
            ]
        });
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;

        chk_zenauth(null);

        var category = ["category","technology","purpose","popularity","content","released","vendor","protocol"];

        for(var i=0; i<category.length; i++){
            var _store = Ext.data.StoreManager.lookup("store_profile_"+category[i]);
            _store.removeAt(0);
        }

        if(me.edit === "edit"){
            var record = me.record;

            me.setTitle(__zen('user_application_edit')+" - "+me.name);

            Ext.getCmp("b_name").setValue(record.name);
            Ext.getCmp("b_category").setValue(record.category);
            Ext.getCmp("b_purpose").setValue(record.purpose);
            Ext.getCmp("b_technology").setValue(record.technology);
            Ext.getCmp("b_popularity").setValue(record.popularity);
            Ext.getCmp("b_content").setValue(record.content_type);
            Ext.getCmp("b_released").setValue(record.released_date);
            Ext.getCmp("b_vendor").setValue(record.vendor);
            Ext.getCmp("b_protocol").setValue(record.protocols);
            Ext.getCmp("b_signature").setValue(me.sig).disable();
        }else{
            me.setTitle(__zen('user_application_add'));
            Ext.getCmp("b_released").setValue(new Date());
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var name = Ext.getCmp("b_name");
        var category = Ext.getCmp("b_category");
        var purpose = Ext.getCmp("b_purpose");
        var technology = Ext.getCmp("b_technology");
        var popularity = Ext.getCmp("b_popularity");
        var content = Ext.getCmp("b_content");
        var relased = Ext.getCmp("b_released");
        var vendor = Ext.getCmp("b_vendor");
        var protocol = Ext.getCmp("b_protocol");
        var signature = Ext.getCmp("b_signature");

        if(name.isValid()===false){ name.focus(); return false; }
        if(signature.isValid()===false){ signature.focus(); return false; }

        var obj = {
            'category': category.getValue(),
            'vendor': vendor.getValue(),
            'released_date': relased.getSubmitValue(),
            'purpose': purpose.getValue(),
            'popularity': Number(popularity.getValue()),
            'references': [ 'N/A' ],
            'descriptions': [],
            'content_type': content.getValue(),
            'revision': '',
            'technology': technology.getValue(),
            'protocols': protocol.getValue(),
            'name': name.getValue(),
            'sig': signature.getValue()
        };

        var update = (me.edit==="edit")?true:false;

        if(update){
            obj.rid = me.record.rid;
        }

        if(me.name !== name.getValue()){

            var key = {
                'name': name.getValue()
            };

            if(update){
                key.rid = { '$ne': me.record.rid };
            }

            var _param = {
                basename: Ext.encode('app_user_ref_list'),
                key: Ext.encode(key)
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getObject',
                _param,
                function(response){
                    if(response !== null){
                        prt_errMsg(get_msg('err_proname'), null); name.focus(); return false;
                    }else{
                        fn_set();
                    }
                }
            );

        }else{
            fn_set();
        }

        function fn_set(){

            var _params = {
                basename: Ext.encode('app_user_ref_list'),
                obj: Ext.encode(obj),
                update: Ext.encode(update)
            };

            Ext.data.JsonP.request({
                url : "/api/ftuctrl/setListTypeObj",
                params : _params,
                success : function(response){

                    if(response.retcode === true){

                        var _store = Ext.data.StoreManager.lookup("store_profile_ref_list");
                        _store.load();
                        Ext.getCmp("NFW2_applist").update_cnt();

                        //사용자 정의 갯수제한 체크

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


                    }else{

                        if(response.errcode === 922746882){
                            prt_errMsg(get_msg("err_form"),"fld_msg");
                            signature.focus();
                            return false;
                        }
                    }
                },
                failure: function(response){
                    console.log("fail");
                }
            });
        }

        function setWinState(btn){
            if(btn==="no"){
                var win = Ext.WindowManager.getActive();
                if (win) {
                    win.close();
                }
            }else{
                Ext.getCmp("fm_applist").getForm().reset();
                prt_errMsg(null,null);
                Ext.getCmp("b_released").setValue(new Date());
            }
        }
    },

    onButtonClick2: function(button, e, eOpts) {
        this.close();
    },

    onWindowClose: function(panel, eOpts) {
        var category = ["category","technology","purpose","popularity","content","released","vendor","protocol"];

        for(var i=0; i<category.length; i++){
            var _store = Ext.data.StoreManager.lookup("store_profile_"+category[i]);
            _store.insert(0,{"val":"All"});
        }
    }

});