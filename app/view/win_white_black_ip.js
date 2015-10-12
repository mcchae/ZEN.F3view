
Ext.define('NFW2.view.win_white_black_ip', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_white_black_ip',

    requires: [
        'NFW2.view.win_white_black_ipViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_white_black_ip'
    },
    cls: 'zen_win',
    id: 'win',
    minHeight: 200,
    scrollable: true,
    width: 450,
    title: 'My Window',
    modal: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            itemId: 'fm',
            scrollable: true,
            bodyPadding: 20,
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var me = Ext.getCmp("win");
                                if(value === true){ return true; }

                                if(me.type === "IPv4"){

                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                    if(value.indexOf("/") !== -1){

                                        var ip = value.split("/");
                                        if(ValidIPAddress(ip[0])===false){ return get_msg('err_ip'); }
                                        if(ip[1].indexOf(".") !== -1){ return ValidIP("Prefix"); }
                                        if(ip[1] < 8 || ip[1] > 32){ return ValidIP("Prefix"); }

                                    }else if(value.indexOf("-") !== -1){

                                        if(ValidRange(value)===false){return ValidIP("Range"); }
                                    }else{

                                        if(ValidIPAddress(value)===false){return get_msg('err_ip'); }
                                    }

                                }else{

                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                    if(value.indexOf("/") !== -1){

                                        var ip = value.split("/");

                                        if(!ValidIPv6(ip[0])){ return ValidIP("IPv6"); }
                                        if(ip[1] < 64 || ip[1] > 128){
                                            return ValidIP("Prefix");
                                        }

                                    }else{

                                        if(!ValidIPv6(value)){ return ValidIP("IPv6"); }
                                    }

                                }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 'ip',
                            width: 400,
                            labelSeparator: ' ',
                            msgTarget: 'none',
                            listeners: {
                                errorchange: 'onIpErrorChange',
                                blur: 'onIpBlur',
                                focus: 'onIpFocus'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: 'desc',
                            width: 400,
                            labelSeparator: ' ',
                            enforceMaxLength: true,
                            maxLength: 63,
                            bind: {
                                fieldLabel: '{desc}'
                            }
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
                        click: 'onButtonClick'
                    }
                }
            ]
        }
    ],

    onIpErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onIpBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onIpFocus: function(component, event, eOpts) {
        var me = this;

        if(me.type === "IPv4"){
            var str = disp_help_ip('4s');
            str += ', '+disp_help_ip('4r');
            str += ', '+disp_help_ip('4s2p');
        }else{
            var str = disp_help_ip('4sp');
        }
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        me.fieldInfo = makeZenTip();

        chk_zenauth(null);

        Ext.getCmp("ip").setFieldLabel(me.type);

        if(me.edit === "edit"){

            if(me.type_wb==="White"){
                me.setTitle(__zen('white_edit')+" - "+me.record.num);
            }else{
                me.setTitle(__zen('black_edit')+" - "+me.record.num);
            }

            Ext.getCmp("ip").setValue(me.record.ip);
            Ext.getCmp("desc").setValue(me.record.desc);
        }else{

            if(me.type_wb==="White"){
                me.setTitle(__zen('white_add'));
            }else{
                me.setTitle(__zen('black_add'));
            }
        }

    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var wb = Ext.getCmp("white_black_ip");

        var ip = Ext.getCmp("ip");
        var desc = Ext.getCmp("desc");

        if(ip.isValid() === false){ ip.focus(); return false; }

        var obj = {
            ip: ip.getValue(),
            ip_ver: me.type.toLowerCase(),
            type: me.type_wb.toLowerCase(),
            desc: desc.getValue()
        };

        if(me.edit==="edit"){
            obj['_id'] = me.record._id;
        }

        var update = (me.edit==="edit")?true:false;

        var _params = {
            basename: Ext.encode("network_white_black_ip"),
            obj: Ext.encode(obj),
            update: Ext.encode(update)
        };

        Ext.data.JsonP.request({
            url: '/api/ftuctrl/setListTypeObj',
            params: _params,
            success: function(response){

                if(response.retcode){

                    Ext.data.StoreManager.lookup("store_white_black_ip_list").load(function(records,options,success){

                        if(!me.edit){
                            var tot = options.getProxy().getReader().rawData.retval;
                            wb.chk_total_count(tot.max_count);
                        }else{
                            wb.chk_total_count();
                        }
                    });

                    if(wb.total_count+1 >= wb.count){
                        me.close();
                        return false;
                    }

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

                    if(response.errcode === 922746884 || response.errcode === 922747033){
                        prt_errMsg(get_msg('err_duplication'),'fld_msg');
                        ip.focus();
                    }
                }
            },
            failure: function(response){
                console.log("fail");
            }
        });
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    }

});