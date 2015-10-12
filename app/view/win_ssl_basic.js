
Ext.define('NFW2.view.win_ssl_basic', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.XTemplate',
        'Ext.form.Label',
        'Ext.button.Button'
    ],

    width: 400,
    autoScroll: true,
    title: '스플릿 라우팅 추가',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    id: 'fm',
                    autoScroll: true,
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'container',
                            minWidth: 370,
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        if(!ValidIPAddress(value)){ return get_msg('err_ip'); }

                                        return true;
                                    },
                                    id: 'ip',
                                    width: 300,
                                    afterLabelTextTpl: [
                                        '{[required()]}'
                                    ],
                                    fieldLabel: 'IP',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    msgTarget: 'none',
                                    listeners: {
                                        errorchange: {
                                            fn: me.onIpErrorChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        if(!ValidNum(value)){ return get_msg('err_form'); }
                                        if(!LengthCheck(value, 1, 32)){ return ValidLimit(1, 32); }

                                        return true;
                                    },
                                    id: 'cidr',
                                    width: 300,
                                    afterLabelTextTpl: [
                                        '{[required()]}'
                                    ],
                                    fieldLabel: 'Prefix',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    msgTarget: 'none',
                                    value: '32',
                                    maskRe: /[0-9.]/,
                                    listeners: {
                                        errorchange: {
                                            fn: me.onCidrErrorChange,
                                            scope: me
                                        },
                                        keydown: {
                                            fn: me.onCidrKeydown,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){ return true; }
                                        if(!ValidIPAddress(value)){ return get_msg('err_ip'); }

                                        return true;
                                    },
                                    id: 'gateway',
                                    width: 300,
                                    fieldLabel: '게이트웨이',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    msgTarget: 'none',
                                    listeners: {
                                        errorchange: {
                                            fn: me.onGatewayErrorChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    height: 25,
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'errorBox',
                                            hidden: true,
                                            id: 'err_win',
                                            text: ''
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            width: 100,
                                            text: '확인',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            margin: '0 0 0 5',
                                            width: 100,
                                            text: '취소',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick1,
                                                    scope: me
                                                }
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
                afterrender: {
                    fn: me.onWindowAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onIpErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "err_win");
    },

    onCidrErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "err_win");
    },

    onCidrKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onGatewayErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "err_win");
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var store = Ext.data.StoreManager.lookup("store_sslplus_split");
        var b_store = Ext.data.StoreManager.lookup("store_sslplus_block");

        var ip = Ext.getCmp("ip");
        var cidr = Ext.getCmp("cidr");
        var gateway = Ext.getCmp("gateway");

        if(ip.validateValue()===false){ ip.focus(); return false; }
        if(cidr.validateValue()===false){ cidr.focus(); return false; }

        if(me.type === "split"){
            if(gateway.validateValue()===false){ gateway.focus(); return false; }
        }

        if(me.type === "split"){

            if(me.edit === "edit"){

                store.removeAt(me.row);
                store.insert(me.row,{
                    'ip': ip.getValue(),
                    'cidr': cidr.getValue(),
                    'gateway': gateway.getValue()
                });
            }else{

                store.add({
                    'ip': ip.getValue(),
                    'cidr': cidr.getValue(),
                    'gateway': gateway.getValue()
                });
            }
        }else{

            if(me.edit === "edit"){

                b_store.removeAt(me.row);
                b_store.insert(me.row,{
                    'ip': ip.getValue(),
                    'cidr': cidr.getValue()
                });
            }else{

                b_store.add({
                    'ip': ip.getValue(),
                    'cidr': cidr.getValue()
                });
            }
        }

        me.close();
    },

    onButtonClick1: function(button, e, eOpts) {
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;

        if(me.type === "block"){
            Ext.getCmp("gateway").hide();
        }else{
            Ext.getCmp("gateway").show();
        }

        if(me.edit === "edit"){

            if(me.type === "block"){
                me.setTitle("차단/내부 IP 대역 수정 - "+(me.row+1));
            }else{
                me.setTitle("스플릿 라우팅 수정 - "+(me.row+1));
            }
            Ext.getCmp("ip").setValue(me.record.ip);
            Ext.getCmp("cidr").setValue(me.record.cidr);

            if(me.type === "split"){
                Ext.getCmp("gateway").setValue(me.record.gateway);
            }
        }else{

            if(me.type === "block"){
                me.setTitle("차단/내부 IP 대역 추가");
            }else{
                me.setTitle("스플릿 라우팅 추가");
            }
        }
    }

});