
Ext.define('NFW2.view.NFW2_user_login', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_user_login',

    requires: [
        'NFW2.view.NFW2_user_loginViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'nfw2_user_login'
    },
    defaultListenerScope: true,
    height: '100%',
    id: 'NFW2_user_login',
    width: '100%',
    anchorSize: 100,
    bodyCls: 'login_bg',
    header: false,

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    items: [
        {
            xtype: 'form',
            height: 200,
            width: 250,
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
                        keydown: 'onFt_passwordKeydown',
                        render: 'onFt_passwordRender'
                    }
                },
                {
                    xtype: 'container',
                    cls: 'fld_msg',
                    height: 18,
                    itemId: 'fld_msg'
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'button',
                            focusCls: 'btn_f',
                            cls: 'btn_login',
                            height: 59,
                            width: 126,
                            listeners: {
                                click: 'onButtonClick'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onNFW2_user_loginAfterRender'
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

    onFt_passwordKeydown: function(textfield, e, eOpts) {
        var me = this;
        var code = e.browserEvent.keyCode;

        if(code === 13){
            Ext.getCmp('NFW2_user_login').user_login(false,0,me.is_superAdmin);
        }
    },

    onFt_passwordRender: function(component, eOpts) {
        component.emptyText = __zen('pwd');
        component.applyEmptyText();
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var id = Ext.getCmp("ft_id");
        var pw = Ext.getCmp("ft_password");

        if(!CheckNotNull(id.getValue())){ prt_errMsg("Enter User ID", null); id.focus(); return false; }
        if(!CheckNotNull(pw.getValue())){ prt_errMsg("Enter Password", null); pw.focus(); return false; }

        prt_errMsg(null,null);

        me.user_login();
    },

    onNFW2_user_loginAfterRender: function(component, eOpts) {
        var me = this;
        var _body = $("html")[0].clientHeight;

        if($(".x-ie10")){
            $(".x-ie10").height(_body);
        }

        Ext.Ajax.request({
            url : '/getRemoteAddress',
            method : 'POST',
            success : function(response, opts){

                me.clientIp = Ext.decode(response.responseText).remoteAddress;
                Ext.getCmp("ft_id").focus();
            }
        });
    },

    user_login: function() {
        var me = Ext.getCmp("NFW2_user_login");

        var id = Ext.getCmp("ft_id").getValue();
        var pw = Ext.getCmp("ft_password").getValue();
        var login_ip = me.clientIp;

        var _param = {
            'func_name': Ext.encode('mod_fw_ua_auth_policy_login'),
            'args': Ext.encode({'login_id':id,'login_pw':pw,'login_ip':login_ip})
        };

        Ext.Ajax.request({
            url : '/api/ftuctrl/execKctrlFunc',
            method : 'POST',
            params: _param,
            success : function(response, opts){

                response = Ext.decode(response.responseText);
                response = response.retval;

                if(response[0] === true){

                    Ext.Msg.show({
                        title: __weguardia,
                        msg: get_msg("msg_auth_suc"),
                        width: 300,
                        buttons: Ext.Msg.YES,
                        buttonText:{
                            yes: __zen('confirm')
                        },
                        fn: function(btn){
                            if(btn === "yes"){
                                Ext.Ajax.request({
                                    url : '/getURL',
                                    method : 'POST',
                                    success : function(response, opts){
                                        var url = Ext.decode(response.responseText).url;
                                        if(url !== undefined && url !== ""){
                                            location.replace(url);
                                            location.replace(url);
                                        }
                                    }
                                });
                            }
                        },
                        icon: Ext.window.MessageBox.INFO
                    });
                }else{
                    if(response[1] === "Fail (Already Login)\n"){
                        msg = get_msg('err_auth_login');
                    }else if(response[1] === "Fail (Invalid ID/PW)\n"){
                        msg = get_msg('err_auth_idpw');
                    }else if(response[1] === "Fail (Invalid Shared Secret)\n"){
                        msg = get_msg('err_auth_secret');
                    }else if(response[1] === "Fail (Restricted User)\n"){
                        msg = get_msg('err_auth_re');
                    }else if(response[1] === "Fail (Exceeded User Limit)\n"){
                        msg = get_msg('err_auth_limit');
                    }else if(response[1] === "Fail (Server Error)\n"){
                        msg = get_msg('err_auth_server');
                    }else if(response[1] === "Fail (Server Not Found)\n"){
                        msg = get_msg('err_auth_host');
                    }else if(response[1] === "Fail (Unknown Error)\n"){
                        msg = get_msg('err_auth_unknow');
                    }
                    Ext.MessageBox.alert(__weguardia,msg);
                }
            }
        });
    }

});