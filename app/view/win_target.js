
Ext.define('NFW2.view.win_target', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.Panel',
        'Ext.XTemplate',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.button.Button'
    ],

    height: 310,
    width: 460,
    autoScroll: true,
    title: '대상 설정 추가',
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    flex: 1,
                    id: 'fm',
                    autoScroll: true,
                    layout: 'auto',
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(!ValidNotKor(value)){ return get_msg('err_name'); }

                                return true;
                            },
                            id: 'tar_name',
                            width: 400,
                            afterLabelTextTpl: [
                                '{[required()]}'
                            ],
                            fieldLabel: '이름',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 31,
                            minLength: 1,
                            listeners: {
                                errorchange: {
                                    fn: me.onTar_nameErrorChange,
                                    scope: me
                                },
                                keydown: {
                                    fn: me.onTar_nameKeydown,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === ""){ return true; }

                                if(!Validhexa16(value)){ return get_msg('err_hexa16'); }
                                if(value.length < 32){ return ValidFixLength(32); }

                                return true;
                            },
                            id: 'tar_uid',
                            width: 400,
                            fieldLabel: 'UID',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 32,
                            minLength: 1,
                            listeners: {
                                errorchange: {
                                    fn: me.onTar_uidErrorChange,
                                    scope: me
                                },
                                keydown: {
                                    fn: me.onTar_uidKeydown,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                return true;
                            },
                            id: 'tar_target_ip',
                            width: 400,
                            afterLabelTextTpl: [
                                '{[required()]}'
                            ],
                            fieldLabel: 'IP 주소/도메인',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            enforceMaxLength: true,
                            maxLength: 255,
                            minLength: 1,
                            listeners: {
                                errorchange: {
                                    fn: me.onTar_target_ipErrorChange,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            id: 'tar_isakmp',
                            afterLabelTextTpl: [
                                '{[required()]}'
                            ],
                            fieldLabel: 'ISAKMP SA',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            emptyText: 'Select',
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: 'store_isakmpsa_list',
                            valueField: '@cid',
                            listeners: {
                                afterrender: {
                                    fn: me.onTar_isakmpAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            id: 'tar_iface',
                            afterLabelTextTpl: [
                                '{[required()]}'
                            ],
                            fieldLabel: '인터페이스',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            emptyText: 'Select',
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: 'store_interface',
                            valueField: 'name'
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === ""){ return true; }

                                if(!ValidNum(value)){ return get_msg('err_form'); }
                                if(!LengthCheck(value, 0, 255)){ return ValidLimit(0, 255); }

                                return true;
                            },
                            id: 'tar_group',
                            fieldLabel: '그룹 ID',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            value: 0,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9.]/,
                            maxLength: 3,
                            minLength: 1,
                            listeners: {
                                errorchange: {
                                    fn: me.onTar_groupErrorChange,
                                    scope: me
                                },
                                keydown: {
                                    fn: me.onTar_groupKeydown,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            height: 30,
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'errorBox',
                                    hidden: true,
                                    id: 'tar_err_null',
                                    text: 'My Label'
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
                                            fn: me.onButtonClick1,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    margins: '0 0 0 5',
                                    width: 100,
                                    text: '취소',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    listeners: {
                        afterrender: {
                            fn: me.onFormAfterRender,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    onTar_nameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "tar_err_null");
    },

    onTar_nameKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(code === 32){
            e.stopEvent();
        }
    },

    onTar_uidErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "tar_err_null");
    },

    onTar_uidKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(code === 32){
            e.stopEvent();
        }
    },

    onTar_target_ipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "tar_err_null");
    },

    onTar_isakmpAfterRender: function(component, eOpts) {
        var isakmp = Ext.getCmp('tar_isakmp').getStore().data;

        if(isakmp.length > 0){
            Ext.getCmp("tar_isakmp").setValue(isakmp.items[0].data['@cid']);
        }
    },

    onTar_groupErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "tar_err_null");
    },

    onTar_groupKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var name = Ext.getCmp("tar_name");
        var uid = Ext.getCmp("tar_uid");
        var target_ip = Ext.getCmp("tar_target_ip");
        var isakmp = Ext.getCmp("tar_isakmp");
        var iface = Ext.getCmp("tar_iface");
        var group = Ext.getCmp("tar_group");

        if(name.validateValue()===false){ name.focus(); return false; }
        if(uid.validateValue()===false){ uid.focus(); return false; }
        if(target_ip.validateValue()===false){ target_ip.focus(); return false; }
        if(isakmp.getValue()===null){ prt_errMsg(get_msg('err_null'), "tar_err_null"); isakmp.focus(); return false; }
        if(iface.getValue()===null){ prt_errMsg(get_msg('err_null'), "tar_err_null"); iface.focus(); return false; }
        if(group.validateValue()===false){ group.focus(); return false; }

        Ext.getCmp("tar_err_null").hide();

        var obj = {};

        obj.name = name.getValue();
        obj.target_ip = target_ip.getValue();
        obj.uid = uid.getValue();
        obj.isakmp_sa = isakmp.getValue();
        obj.iface = iface.getValue();
        obj.group_id = (group.getValue()==="")?"0":group.getValue();

        obj.chk_use = (me.edit==="edit")?me.chk_use:"on";

        if(me.edit === "edit"){
            obj['_id'] = me.cid;
        }

        me.obj = obj;

        me.set_target_security();
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    onFormAfterRender: function(component, eOpts) {
        if(this.edit === "edit"){
            this.init_target_security();
        }
    },

    set_target_security: function() {
        var me = this;

        var obj = me.obj;

        var update = (me.edit==="edit")?true:false;

        var _params = {
            basename : Ext.encode("ipsec_conf"),
            obj : Ext.encode(obj),
            update: Ext.encode(update)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setListTypeObj',
            _params,
            function(response){

                if(update === true){

                    Ext.Msg.show({
                        title: 'System Message - SUCCESS',
                        msg: get_msg("msg_ok_edit"),
                        width: 300,
                        buttons: Ext.Msg.OK,
                        fn: setWinClose,
                        icon: Ext.window.MessageBox.INFO
                    });
                }else{

                    Ext.Msg.show({
                        title: 'System Message - SUCCESS',
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

                var win = Ext.getCmp("NFW2_ipsec_security_targetConf");
                win.get_targetConf();

            }
        );

        function setWinState(btn){
            if(btn==="no"){
                var win = Ext.WindowManager.getActive();
                if (win) {
                    win.close();
                }
            }else{
                Ext.getCmp("fm").getForm().reset();
                Ext.ComponentQuery.query('label[cls="errorBox"]').forEach(function(cls){ cls.hide(); });
                var isakmp = Ext.getCmp('tar_isakmp').getStore().data.items[0].data['@cid'];
                Ext.getCmp("tar_isakmp").setValue(isakmp);
            }
        }
    },

    init_target_security: function() {
        var me = this;

        me.setTitle("대상 설정 수정 - "+me.num);

        var _params = {
            basename : Ext.encode("ipsec_conf"),
            key : Ext.encode({'_num':me.num})
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(data){

                Ext.getCmp("tar_name").setValue(data.name);
                Ext.getCmp("tar_uid").setValue(data.uid);
                Ext.getCmp("tar_target_ip").setValue(data.target_ip);
                Ext.getCmp("tar_isakmp").setValue(data.isakmp_sa);
                Ext.getCmp("tar_iface").setValue(data.iface);
                Ext.getCmp("tar_group").setValue(data.group_id);
            }
        );
    }

});