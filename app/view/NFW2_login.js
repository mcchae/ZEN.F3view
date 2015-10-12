
Ext.define('NFW2.view.NFW2_login', {
    extend: 'Ext.window.Window',
    alias: 'widget.nfw2_login',

    requires: [
        'NFW2.view.NFW2_loginViewModel',
        'Ext.panel.Panel',
        'Ext.form.field.Display',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.form.field.TextArea'
    ],

    config: {
        exAuth: {
            
        },
        _https_timeout: 600,
        is_superAdmin: 0
    },

    viewModel: {
        type: 'nfw2_login'
    },
    height: '100%',
    id: 'NFW2_login',
    resizable: false,
    width: '100%',
    anchorSize: 100,
    bodyCls: 'login_bg',
    header: false,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    items: [
        {
            xtype: 'panel',
            height: 500,
            width: 316,
            bodyCls: 'login_pnl_bg',
            items: [
                {
                    xtype: 'container',
                    cls: 'login_logo',
                    height: 35,
                    margin: '0 0 10 0'
                },
                {
                    xtype: 'textfield',
                    cls: 'inp_login',
                    id: 'ft_id',
                    enableKeyEvents: true,
                    selectOnFocus: true,
                    listeners: {
                        keydown: 'onFt_idKeydown',
                        render: 'onFt_idRender'
                    }
                },
                {
                    xtype: 'textfield',
                    cls: 'inp_login',
                    id: 'ft_password',
                    inputType: 'password',
                    enableKeyEvents: true,
                    listeners: {
                        keydown: 'onFt_idKeydown1',
                        render: 'onFt_passwordRender'
                    }
                },
                {
                    xtype: 'textfield',
                    cls: 'inp_login',
                    id: 'ft_otp',
                    enableKeyEvents: true,
                    listeners: {
                        keydown: 'onFt_otpKeydown',
                        render: 'onFt_otpRender'
                    }
                },
                {
                    xtype: 'displayfield',
                    cls: 'login_auth',
                    id: 'fd_auth',
                    labelSeparator: ' ',
                    value: 'Local',
                    bind: {
                        fieldLabel: '{login_auth}'
                    }
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            cls: 'inp_login',
                            id: 'cb_language',
                            margin: '0 10 0 0',
                            width: 110,
                            value: 'ko',
                            editable: false,
                            displayField: 'name',
                            store: 'store_language',
                            valueField: 'value',
                            listeners: {
                                change: 'onCb_languageChange'
                            }
                        },
                        {
                            xtype: 'button',
                            focusCls: 'btn_f',
                            cls: 'btn_login',
                            height: 59,
                            width: 126,
                            listeners: {
                                click: 'onButtonClick1'
                            }
                        }
                    ]
                },
                {
                    xtype: 'textareafield',
                    cls: 'login_banner',
                    height: 125,
                    id: 'fta_bannerText',
                    margin: '10 0 0 0',
                    readOnly: true
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onNFW2_loginAfterRender'
    },

    onFt_idKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 13){

            Ext.getCmp('ft_password').focus();


        }
    },

    onFt_idRender: function(component, eOpts) {
        component.emptyText = __zen('id');
        component.applyEmptyText();
    },

    onFt_idKeydown1: function(textfield, e, eOpts) {
        var me = this;

        var code = e.browserEvent.keyCode;

        if(code === 13){

            Ext.getCmp('NFW2_login').login(false,0,me.is_superAdmin);

        }
    },

    onFt_passwordRender: function(component, eOpts) {
        component.emptyText = __zen('pwd');
        component.applyEmptyText();
    },

    onFt_otpKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

                        if(ValidNumKeydown(code)===false){
                            e.stopEvent();
                        }
    },

    onFt_otpRender: function(component, eOpts) {
        component.emptyText = __zen('login_otp');
        component.applyEmptyText();
    },

    onCb_languageChange: function(field, newValue, oldValue, eOpts) {
        var _lang = newValue;


        Ext.getCmp('ft_id').emptyText = __zen_str.id[_lang];
        Ext.getCmp('ft_id').applyEmptyText();
        Ext.getCmp('ft_password').emptyText = __zen_str.pwd[_lang];
        Ext.getCmp('ft_password').applyEmptyText();
        Ext.getCmp('ft_otp').emptyText = __zen_str.login_otp[_lang];
        Ext.getCmp('ft_otp').applyEmptyText();

        Ext.getCmp('fd_auth').setFieldLabel(__zen_str.login_auth[_lang]);


    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        Ext.getCmp('NFW2_login').login(false,0,me.is_superAdmin);
    },

    onNFW2_loginAfterRender: function(component, eOpts) {
        var me = this;

        me.is_superAdmin = 0;

        var _params = {
            basename: Ext.encode('system_external_access')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){

                console.log('========',response);

                if(response === null){

                    Ext.getCmp('fd_auth').setValue("Local");

                    me.exAuth.type = "Local";

                }else{

                    if(response.nac.access !== undefined && response.nac.access === "ldap"){

                        if(response.nac.ldap["@chk_use"] !== undefined && response.nac.ldap["@chk_use"] == "on"){


                            Ext.getCmp('fd_auth').setValue("LDAP");

                            me.exAuth.type = "LDAP";

                            var _params = {
                                type: Ext.encode('ldap_check')
                            };

                            request_helper.xmlrpc_call_JsonP(
                                'ftuctrl',
                                'getExternalServerStatus',
                                _params,
                                function(response){

                                    if(response){

                                        Ext.getCmp('fd_auth').setValue(Ext.getCmp('fd_auth').getValue() + " - "+__zen('login_accept'));

                                        me.exAuth.state = "on";


                                    }else{

                                        Ext.getCmp('fd_auth').setValue(Ext.getCmp('fd_auth').getValue() + " - "+__zen('login_deny'));

                                        Ext.Msg.alert(__weguardia, get_msg('err_auth_ldap'));

                                        Ext.getCmp('fd_auth').setValue("Local");

                                        me.exAuth.state = "off";

                                        me.is_superAdmin = 1;

                                    }

                                }

                            );

                        }else{

                            Ext.getCmp('fd_auth').setValue("Local");

                            me.exAuth.type = "Local";

                        }

                    }else if(response.nac.access !== undefined && response.nac.access === "radius"){

                        if(response.nac.radius["@chk_use"] !== undefined && response.nac.radius["@chk_use"] == "on"){


                            Ext.getCmp('fd_auth').setValue("RADIUS");

                            me.exAuth.type = "RADIUS";

                            var _params = {
                                type: Ext.encode('radius_check')
                            };

                            request_helper.xmlrpc_call_JsonP(
                                'ftuctrl',
                                'getExternalServerStatus',
                                _params,
                                function(response){

                                    if(response){

                                        Ext.getCmp('fd_auth').setValue(Ext.getCmp('fd_auth').getValue() + " - "+__zen('login_accept'));

                                        me.exAuth.state = "on";


                                    }else{

                                        Ext.getCmp('fd_auth').setValue(Ext.getCmp('fd_auth').getValue() + " - "+__zen('login_deny'));

                                        Ext.Msg.alert(__weguardia, get_msg('err_auth_radius'));

                                        Ext.getCmp('fd_auth').setValue("Local");

                                        me.exAuth.state = "off";

                                        me.is_superAdmin = 1;

                                    }

                                }

                            );

                        }else{

                            Ext.getCmp('fd_auth').setValue("Local");

                            me.exAuth.type = "Local";
                        }

                    }else if(response.nac.access !== undefined && response.nac.access === "tacacs"){

                        if(response.nac.tacacs["@chk_use"] !== undefined && response.nac.tacacs["@chk_use"] === "on"){

                            Ext.getCmp('fd_auth').setValue("TACACS+");

                            me.exAuth.type = "TACACS";

                            var _params = {
                                type: Ext.encode('tacacs_check')
                            };

                            request_helper.xmlrpc_call_JsonP(
                                'ftuctrl',
                                'getExternalServerStatus',
                                _params,
                                function(response){

                                    if(response){

                                        Ext.getCmp('fd_auth').setValue(Ext.getCmp('fd_auth').getValue() + " - "+__zen('login_accept'));

                                        me.exAuth.state = "on";


                                    }else{

                                        Ext.getCmp('fd_auth').setValue(Ext.getCmp('fd_auth').getValue() + " - "+__zen('login_deny'));

                                        Ext.Msg.alert(__weguardia, get_msg('err_auth_tacacs'));

                                        Ext.getCmp('fd_auth').setValue("Local");

                                        me.exAuth.state = "off";

                                        me.is_superAdmin = 1;

                                    }

                                }

                            );

                        }else{

                            Ext.getCmp('fd_auth').setValue("Local");

                            me.exAuth.type = "Local";
                        }

                    }else{

                        Ext.getCmp('fd_auth').setValue("Local");

                        me.exAuth.type = "Local";
                    }

                }

            }

        );

        //로그인 전 system_basic 컬렉션에서 HTTPS 접속 타임아웃 값을 얻어옴

        var me = this;

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_system_basic',
            {},
            function(response){

                if(response !== null){

                    if(response.https_timeout !== null || response.https_timeout !== undefined){

                        me._https_timeout = response.https_timeout;
                    }
                }

            }
        );

        var _params = {
            basename: Ext.encode('system_basic')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){

                Ext.getCmp('fta_bannerText').setValue(response.system_basic.banner);
            }

        );

        var _lang_param = {
            func_name : Ext.encode('mod_language_get'),
            args : Ext.encode({})
        };


        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'execKctrlFunc',
            _lang_param,
            function(response){

                console.log("get lang",response);


                var _lang = response.toLowerCase();
                _lang = (_lang==="kr")?"ko":_lang;

                Ext.getCmp('cb_language').setValue(_lang);

                var _me = Ext.getCmp('NFW2_client');
                _me.lang = _lang;

            }
        );
    },

    login: function(is_session_quit, is_authorization_quit, is_superAdmin) {
        var me = Ext.getCmp('NFW2_login');
        var _me = Ext.getCmp('NFW2_client');

        var get_lang = Ext.getCmp('cb_language').getValue();
        __zen_locale = get_lang;

        if(_me.lang !== get_lang){

            var _lang_param = {
                func_name : Ext.encode('mod_language_set'),
                args : Ext.encode(get_lang)
            };


            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'execKctrlFunc',
                _lang_param,
                function(response){

                    console.log("change_lang",response);

                    _me.lang = get_lang;

                }
            );

        }


        var _type = 1;

        if(me.exAuth.type === "LDAP"){

            _type = 2;

            if(me.exAuth.state === "off") _type = 1;


            console.log('_type==',_type);

        }else if(me.exAuth.type === "RADIUS"){

            _type = 3;

            if(me.exAuth.state === "off") _type = 1;

        }else if(me.exAuth.type === "TACACS"){

            _type = 4;

            if(me.exAuth.state === "off") _type = 1;

        }else{

            _type = 1;
        }

        var _params = {

            userid : Ext.encode(Ext.getCmp('ft_id').getValue()),
            credential: Ext.encode(Ext.getCmp('ft_password').getValue()),
            credentail_type : Ext.encode(_type),
            timeout : Ext.encode(me._https_timeout),
            access_ip : Ext.encode(Ext.getCmp('NFW2_client').clientInfo.clientIp),
            dest_ip : Ext.encode(Ext.getCmp('NFW2_client').clientInfo.hostIp),
            otp : Ext.encode(Ext.getCmp('ft_otp').getValue()),
            is_session_quit : Ext.encode(is_session_quit),
            is_authorization_quit : Ext.encode(is_authorization_quit),
            is_superAdmin : Ext.encode(is_superAdmin)

        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'logIn',
            _params,
            function(response){

                Ext.Ajax.request({
                    url : '/event/session/manage',
                    method : 'POST',
                    params : {
                        eventCode : Ext.encode('11111')
                    },
                    success : function(response, opts){

                        console.log('success');

                    },
                    failure: function(response, opts) {
                        console.log('failure', response, opts);
                    }
                });

                Ext.getCmp(me.parentId).clientInfo.sessionInfo = response;
                Ext.getCmp(me.parentId).clientInfo.licalizationInfo = Ext.getCmp('cb_language').getValue();

                Ext.getCmp(me.parentId).clientInfo.userId = Ext.getCmp('ft_id').getValue();

                Ext.getCmp('lb_userID').setText(__zen('id')+":"+Ext.getCmp('ft_id').getValue());

                var _params2 = {
                    basename : Ext.encode('mgtable_users'),
                    cond : Ext.encode({'userid' : Ext.getCmp('ft_id').getValue()})
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'getObjects',
                    _params2,
                    function(response){

                        if(response.list[0] === undefined){

                            Ext.getCmp(me.parentId).clientInfo.perspectiveInfo = 7;

                            Ext.getCmp('lb_userauthorization').setText(__zen('set')+','+__zen('log')+','+__zen('monitor'));

                        }else{

                            Ext.getCmp(me.parentId).clientInfo.perspectiveInfo = response.list[0].authorization;

                            if(Ext.getCmp(me.parentId).clientInfo.perspectiveInfo === 7){

                                Ext.getCmp('lb_userauthorization').setText(__zen('set')+','+__zen('log')+','+__zen('monitor'));

                            }else if(Ext.getCmp(me.parentId).clientInfo.perspectiveInfo === 5){

                                Ext.getCmp('lb_userauthorization').setText(__zen('set')+','+__zen('monitor'));

                            }else if(Ext.getCmp(me.parentId).clientInfo.perspectiveInfo === 3){

                                Ext.getCmp('lb_userauthorization').setText(__zen('log')+','+__zen('monitor'));

                            }else if(Ext.getCmp(me.parentId).clientInfo.perspectiveInfo === 1){

                                Ext.getCmp('lb_userauthorization').setText(__zen('monitor'));

                            }else if(Ext.getCmp(me.parentId).clientInfo.perspectiveInfo === 2){

                                Ext.getCmp('lb_userauthorization').setText(__zen('log'));
                            }

                        }

                        if(is_authorization_quit === 2){

                            Ext.getCmp(me.parentId).clientInfo.perspectiveInfo = 3;

                            Ext.getCmp('lb_userauthorization').setText(__zen('log')+','+__zen('monitor'));
                        }

                        Ext.getCmp('pnl_menu').show();
                        Ext.getCmp('pnl_main').show();

                        Ext.getCmp('pnl_menu').collapse();
                        Ext.getCmp('pnl_navi').hide();
                        Ext.getCmp('sel_zen_license').hide();
                        Ext.getCmp('pnl_cont').removeAll();



                        Ext.WindowManager.each(function(cmp) {   if (cmp.parentId !== 'NFW2_client') cmp.close(); });


                        var _alarm_param = {
                            func_name: Ext.encode('system_manager_alarm'),
                            args: Ext.encode({})
                        };

                        request_helper.xmlrpc_call_JsonP(
                            'ftuctrl',
                            'execKctrlFunc',
                            _alarm_param,
                            function(response){
                                var _alarm_param = {
                                    func_name: Ext.encode('get_alarm_count'),
                                    args: Ext.encode({})
                                };

                                request_helper.xmlrpc_call_JsonP(
                                    'ftuctrl',
                                    'execKctrlFunc',
                                    _alarm_param,
                                    function(response){
                                        if(response !== 0){
                                            Ext.getCmp('btn_admin_alarm').setBadgeText(String(response));
                                        }
                                        else{ Ext.getCmp('btn_admin_alarm').setBadgeText(''); }
                                        Ext.getCmp('btn_admin_alarm').interval = setInterval(adminAlarmRefresh, 60000);
                                        Ext.getCmp('pnl_cont').add(Ext.create("NFW2.view.NFW2_dboard"));
					var params = {
			                    basename : Ext.encode('system_admin_alarm')                    
			                };
		
			                request_helper.xmlrpc_call_JsonP(
			                    'ftuctrl',
			                    'getObject',
			                    params,
			                    function(response){
						if(response === null){
							var win = Ext.create('NFW2.view.win_system_alarm',{          
		                                               modal : true                                         
		                                       });                                                          
		                                       win.show();
						}
						else{
				                        if(response.alarm_set === false){
								var win = Ext.create('NFW2.view.win_system_alarm',{
	        		                                        modal : true                                        
			                                        });                                                    
		                                        	win.show();  
							}
						}
			                    }
			                );
                                    }
                                );
                            }
                        );

                        _me.set_GlobalConfig();


                    }
                );

                clearInterval(me.timer);







                me.destroy();


            }
        );
    }

});