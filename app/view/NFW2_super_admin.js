
Ext.define('NFW2.view.NFW2_super_admin', {
    extend: 'Ext.window.Window',
    alias: 'widget.nfw2_super_admin',

    requires: [
        'NFW2.view.NFW2_super_adminViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.form.Label',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'nfw2_super_admin'
    },
    cls: 'zen_win',
    height: 282,
    id: 'NFW2_super_admin',
    width: 650,
    bodyPadding: 20,
    title: 'SUPER 관리자 설정',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'form_super_admin',
            items: [
                {
                    xtype: 'textfield',
                    validator: function(value) {
                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                        if(!idCheck(value)){ return get_msg('err_id');}

                        return true;
                    },
                    cls: 'lb_req',
                    id: 'ft_super_id',
                    fieldLabel: '아이디',
                    labelSeparator: ' ',
                    listeners: {
                        errorchange: 'onFt_super_idErrorChange'
                    }
                },
                {
                    xtype: 'textfield',
                    validator: function(value) {
                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                        if(!passwordCheck(value)){ return get_msg('err_pw');}

                        return true;
                    },
                    cls: 'lb_req',
                    id: 'ft_super_pw1',
                    fieldLabel: '비밀번호',
                    labelSeparator: ' ',
                    inputType: 'password',
                    listeners: {
                        errorchange: 'onFt_super_idErrorChange1'
                    }
                },
                {
                    xtype: 'textfield',
                    validator: function(value) {
                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                        if(!passwordCheck(value)){ return get_msg('err_pw');}

                        return true;
                    },
                    cls: 'lb_req',
                    id: 'ft_super_pw2',
                    fieldLabel: '비밀번호 확인',
                    labelSeparator: ' ',
                    inputType: 'password',
                    listeners: {
                        errorchange: 'onFt_super_idErrorChange11'
                    }
                },
                {
                    xtype: 'container',
                    margin: '0 0 5 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(!CheckNotNull(value)){
                                    if(!Ext.getCmp('chk_super_email_check').disabled){ Ext.getCmp('chk_super_email_check').disable(); }
                                    return get_msg('err_null');
                                }

                                if(!ValidEmail(value)){
                                    if(!Ext.getCmp('chk_super_email_check').disabled){ Ext.getCmp('chk_super_email_check').disable(); }
                                    return get_msg('err_email');
                                }

                                if(Ext.getCmp('chk_super_email_check').disabled){ Ext.getCmp('chk_super_email_check').enable(); }

                                return true;

                            },
                            cls: 'lb_req',
                            id: 'ft_super_email',
                            fieldLabel: '받는 E-Mail',
                            labelSeparator: ' ',
                            listeners: {
                                errorchange: 'onFt_super_idErrorChange1111'
                            }
                        },
                        {
                            xtype: 'checkboxfield',
                            disabled: true,
                            id: 'chk_super_email_check',
                            labelSeparator: ' ',
                            boxLabel: '로그 알림 메일 수신'
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    validator: function(value) {
                        var me = this;

                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                        var _value = value.split(/, | |,/);

                        if(me.limitCount === 5){

                            if(_value.length  > 5) return get_msg('err_ipCount');

                        }else{

                            if(_value.length  > 2) return get_msg('err_ipCount_2');
                        }


                        if(!ValidTotalIp(_value)){ return get_msg('err_ip');}

                        return true;



                    },
                    cls: 'lb_req',
                    id: 'ft_super_host',
                    width: 500,
                    fieldLabel: 'Trusted Host',
                    labelSeparator: ' ',
                    listeners: {
                        errorchange: 'onFt_super_idErrorChange111'
                    }
                },
                {
                    xtype: 'label',
                    cls: 'mt_info',
                    id: 'lb_super_limitMsg',
                    margin: '0 0 0 130',
                    text: '* Trusted Host는 \',\' 로 구분하여 5개까지 지정할수 있습니다.'
                }
            ]
        }
    ],
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
                    text: '확인',
                    listeners: {
                        click: 'onButtonClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onNFW2_super_adminAfterRender'
    },

    onFt_super_idErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_super_idErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_super_idErrorChange11: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_super_idErrorChange1111: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_super_idErrorChange111: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var _host;

        console.log(Ext.getCmp('ft_super_host').getValue().split(/, | |,/));

        _host = Ext.getCmp('ft_super_host').getValue().split(/, | |,/);

        console.log(_host);

        if(Ext.getCmp('form_super_admin').getForm().isValid()){

            var _pw1 = Ext.getCmp('ft_super_pw1').getValue();

            var _pw2 = Ext.getCmp('ft_super_pw2').getValue();

            if(_pw1 !== _pw2){

                prt_errMsg(err_pwCompare, null);
                return false;

            }

            var _email = Ext.getCmp('ft_super_email').getValue();

            var _email_check = false;

            if(Ext.getCmp('chk_super_email_check').hidden){

                _email_check = true;
            }
            else if(!Ext.getCmp('chk_super_email_check').disabled){

                _email_check = Ext.getCmp('chk_super_email_check').getValue();
            }

            if(Ext.getCmp('ft_super_host').getValue() !== ""){

                var _params = {

                    userid : Ext.encode(Ext.getCmp('ft_super_id').getValue()),
                    passwd: Ext.encode(_pw1),
                    trusted_hosts : Ext.encode(_host),
                    email : Ext.encode(_email),
                    email_check : Ext.encode(_email_check)

                };

            }else{

                var _params = {

                    userid : Ext.encode(Ext.getCmp('ft_super_id').getValue()),
                    passwd: Ext.encode(_pw1),
                    email : Ext.encode(_email),
                    email_check : Ext.encode(_email_check)

                };
            }



            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'first_set_super_user',
                _params,
                function(response){

                    if(Ext.getCmp('NFW2_client').isCC){

                        Ext.getCmp('NFW2_client').clientInfo.perspectiveInfo = 7;

                        console.log('_host=',_host);

                        var _trustedhost = {};

                        _trustedhost.trusted_hosts = _host;

                        request_helper.xmlrpc_call_JsonP(
                            'ftuctrl',
                            'setObject',
                            {
                                basename : Ext.encode('system_trustedhost'),
                                obj : Ext.encode(_trustedhost)
                            },
                            function(response){

                                var _params = {

                                    userid : Ext.encode(Ext.getCmp('ft_super_id').getValue()),
                                    credential: Ext.encode(Ext.getCmp('ft_super_pw1').getValue()),
                                    timeout : Ext.encode(me._https_timeout),
                                    access_ip : Ext.encode(Ext.getCmp('NFW2_client').clientInfo.clientIp),
                                    dest_ip : Ext.encode(Ext.getCmp('NFW2_client').clientInfo.hostIp)

                                };

                                request_helper.xmlrpc_call_JsonP(
                                    'ftuctrl',
                                    'logIn',
                                    _params,
                                    function(response){

                                        Ext.getCmp('NFW2_client').clientInfo.sessionInfo = response;
                                        Ext.getCmp('NFW2_client').clientInfo.licalizationInfo = 'NFW2_lang_kor';//Ext.getCmp('cb_language').getValue();
                                        Ext.getCmp('NFW2_client').clientInfo.userId = Ext.getCmp('ft_super_id').getValue();

                                        Ext.getCmp('lb_userID').setText("ID:"+Ext.getCmp('ft_super_id').getValue());

                                        var _params2 = {
                                            basename : Ext.encode('mgtable_users'),
                                            cond : Ext.encode({'userid' : Ext.getCmp('ft_super_id').getValue()})
                                        };

                                        request_helper.xmlrpc_call_JsonP(
                                            'ftuctrl',
                                            'getObjects',
                                            _params2,
                                            function(response){

                                                if(response.list[0] === undefined){

                                                    Ext.getCmp('NFW2_client').clientInfo.perspectiveInfo = 7;

                                                    Ext.getCmp('lb_userauthorization').setText('설정,로그,모니터');

                                                }else{

                                                    Ext.getCmp('NFW2_client').clientInfo.perspectiveInfo = response.list[0].authorization;

                                                    if(Ext.getCmp('NFW2_client').clientInfo.perspectiveInfo === 7){

                                                        Ext.getCmp('lb_userauthorization').setText('설정,로그,모니터');

                                                    }else if(Ext.getCmp('NFW2_client').clientInfo.perspectiveInfo === 5){

                                                        Ext.getCmp('lb_userauthorization').setText('설정,모니터');

                                                    }else if(Ext.getCmp('NFW2_client').clientInfo.perspectiveInfo === 3){

                                                        Ext.getCmp('lb_userauthorization').setText('로그,모니터');

                                                    }else if(Ext.getCmp('NFW2_client').clientInfo.perspectiveInfo === 1){

                                                        Ext.getCmp('lb_userauthorization').setText('모니터');

                                                    }else if(Ext.getCmp('NFW2_client').clientInfo.perspectiveInfo === 2){

                                                        Ext.getCmp('lb_userauthorization').setText('로그');
                                                    }

                                                }

                                            }
                                        );

                                        Ext.getCmp('pnl_menu').show();
                Ext.getCmp('pnl_main').show();

        /*
                                        if(Ext.getCmp('pnl_config').hidden === true){

                                            Ext.getCmp('pnl_dashboard').show();

                                            Ext.getCmp('pnl_config').hide();

                                        }else{

                                            Ext.getCmp('pnl_dashboard').hide();

                                            Ext.getCmp('pnl_config').show();
                                        }

                                        Ext.getCmp('pnl_loginBack').hide();

                                        Ext.getCmp('log_button').setText('로그아웃');
                                        */

                                        me.close();

                                    }
                                );

                            }

                        );

                    }else{

                        var _params = {

                            userid : Ext.encode(Ext.getCmp('ft_super_id').getValue()),
                            credential: Ext.encode(Ext.getCmp('ft_super_pw1').getValue()),
                            timeout : Ext.encode(me._https_timeout),
                            access_ip : Ext.encode(Ext.getCmp('NFW2_client').clientInfo.clientIp),
                            dest_ip : Ext.encode(Ext.getCmp('NFW2_client').clientInfo.hostIp)

                        };

                        request_helper.xmlrpc_call_JsonP(
                            'ftuctrl',
                            'logIn',
                            _params,
                            function(response){

                                Ext.getCmp('NFW2_client').clientInfo.sessionInfo = response;
                                Ext.getCmp('NFW2_client').clientInfo.licalizationInfo = 'NFW2_lang_kor';//Ext.getCmp('cb_language').getValue();
                                Ext.getCmp('NFW2_client').clientInfo.userId = Ext.getCmp('ft_super_id').getValue();

                                Ext.getCmp('lb_userID').setText("ID:"+Ext.getCmp('ft_super_id').getValue());

                                var _params2 = {
                                    basename : Ext.encode('mgtable_users'),
                                    cond : Ext.encode({'userid' : Ext.getCmp('ft_super_id').getValue()})
                                };

                                request_helper.xmlrpc_call_JsonP(
                                    'ftuctrl',
                                    'getObjects',
                                    _params2,
                                    function(response){

                                        if(response.list[0] === undefined){

                                            Ext.getCmp('NFW2_client').clientInfo.perspectiveInfo = 7;

                                            Ext.getCmp('lb_userauthorization').setText('설정,로그,모니터');

                                        }else{

                                            Ext.getCmp('NFW2_client').clientInfo.perspectiveInfo = response.list[0].authorization;

                                            if(Ext.getCmp('NFW2_client').clientInfo.perspectiveInfo === 7){

                                                Ext.getCmp('lb_userauthorization').setText('설정,로그,모니터');

                                            }else if(Ext.getCmp('NFW2_client').clientInfo.perspectiveInfo === 5){

                                                Ext.getCmp('lb_userauthorization').setText('설정,모니터');

                                            }else if(Ext.getCmp('NFW2_client').clientInfo.perspectiveInfo === 3){

                                                Ext.getCmp('lb_userauthorization').setText('로그,모니터');

                                            }else if(Ext.getCmp('NFW2_client').clientInfo.perspectiveInfo === 1){

                                                Ext.getCmp('lb_userauthorization').setText('모니터');

                                            }else if(Ext.getCmp('NFW2_client').clientInfo.perspectiveInfo === 2){

                                                Ext.getCmp('lb_userauthorization').setText('로그');
                                            }

                                        }

                                    }
                                );

                                Ext.getCmp('pnl_menu').show();
                Ext.getCmp('pnl_main').show();
        /*

                                if(Ext.getCmp('pnl_config').hidden === true){

                                    Ext.getCmp('pnl_dashboard').show();

                                    Ext.getCmp('pnl_config').hide();

                                }else{

                                    Ext.getCmp('pnl_dashboard').hide();

                                    Ext.getCmp('pnl_config').show();
                                }

                                Ext.getCmp('pnl_loginBack').hide();

                                Ext.getCmp('log_button').setText('로그아웃');
        */
                                me.close();

                            }
                        );
                    }
                }

            );

        }



    },

    onNFW2_super_adminAfterRender: function(component, eOpts) {
        var me = this;

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'isCC',
            {},
            function(response){

                if(response){

                    Ext.getCmp('lb_super_limitMsg').setText("',' 로 구분하여 2개까지 지정할수 있습니다.");

                    me.limitCount = 2;

                    Ext.getCmp('chk_super_email_check').hide();


                }else{

                    Ext.getCmp('lb_super_limitMsg').setText("',' 로 구분하여 5개까지 지정할수 있습니다.");

                    me.limitCount = 5;

                    Ext.getCmp('chk_super_email_check').show();

                }
            }

        );

        //로그인 전 system_basic 컬렉션에서 HTTPS 접속 타임아웃 값을 얻어옴

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
    }

});