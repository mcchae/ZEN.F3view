
Ext.define('NFW2.view.win_etc_tunnel_routing', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_etc_tunnel_routing',

    requires: [
        'NFW2.view.win_etc_tunnel_routingViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_etc_tunnel_routing'
    },
    cls: 'zen_win',
    id: 'win_etc',
    scrollable: true,
    width: 525,
    modal: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'fm_tunnel',
            scrollable: true,
            bodyPadding: 20,
            title: '',
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === '' || value === true){ return true; }
                                if(!ValidNum(value)){ return get_msg('err_form'); }
                                if(!LengthCheck(value, 1, 128)){ return ValidLimit(1, 128); }

                                return true;
                            },
                            id: 't_num',
                            labelSeparator: ' ',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9.]/,
                            maxLength: 3,
                            bind: {
                                fieldLabel: '{rank}'
                            },
                            listeners: {
                                errorchange: 'onT_numErrorChange',
                                keydown: 'onT_numKeydown',
                                focus: 'onT_numFocus',
                                blur: 'onT_numBlur'
                            }
                        },
                        {
                            xtype: 'container',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'tc_src',
                                    labelSeparator: ' ',
                                    editable: false,
                                    displayField: 'name',
                                    store: 'store_etc_tunnel_sd',
                                    valueField: 'val',
                                    bind: {
                                        fieldLabel: '{src}'
                                    },
                                    listeners: {
                                        change: 'onTc_srcChange'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value === true){ return true; }
                                        var src = Ext.getCmp("tc_src");

                                        if(src.getValue() === "ip"){
                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                            if(value.indexOf("/") !== -1){
                                                var val = value.split("/");
                                                if(!ValidIPAddress(val[1])){ return get_msg('err_form'); }
                                            }
                                            if(!validIPForm(value)){ return get_msg('err_form'); }
                                        }

                                        return true;
                                    },
                                    id: 't_src',
                                    padding: '0 0 0 5',
                                    fieldLabel: '',
                                    msgTarget: 'none',
                                    listeners: {
                                        errorchange: 'onT_srcErrorChange',
                                        focus: 'onT_srcFocus',
                                        blur: 'onT_srcBlur'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'tc_dest',
                                    labelSeparator: ' ',
                                    editable: false,
                                    displayField: 'name',
                                    store: 'store_etc_tunnel_sd',
                                    valueField: 'val',
                                    bind: {
                                        fieldLabel: '{dest}'
                                    },
                                    listeners: {
                                        change: 'onTc_destChange'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value === true){ return true; }
                                        var src = Ext.getCmp("tc_dest");

                                        if(src.getValue() === "ip"){
                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                            if(value.indexOf("/") !== -1){
                                                var val = value.split("/");
                                                if(!ValidIPAddress(val[1])){ return get_msg('err_form'); }
                                            }
                                            if(!validIPForm(value)){ return get_msg('err_form'); }
                                        }

                                        return true;
                                    },
                                    id: 't_dest',
                                    padding: '0 0 0 5',
                                    fieldLabel: '',
                                    msgTarget: 'none',
                                    listeners: {
                                        errorchange: 'onT_destErrorChange',
                                        focus: 'onT_destFocus',
                                        blur: 'onT_destBlur'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(value.indexOf("/") !== -1){
                                    var val = value.split("/");
                                    if(!ValidIPAddress(val[1])){ return get_msg('err_form'); }
                                }
                                if(!validIPForm(value)){ return get_msg('err_form'); }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 't_tunnel_ip',
                            labelSeparator: ' ',
                            bind: {
                                fieldLabel: '{tunnel_ip}'
                            },
                            listeners: {
                                errorchange: 'onT_tunnel_ipErrorChange',
                                focus: 'onT_tunnel_ipFocus',
                                blur: 'onT_tunnel_ipBlur'
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

    onT_numErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg2");
    },

    onT_numKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onT_numFocus: function(component, event, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_etc_tunnel_list");
        var n = (Ext.getCmp("win_etc").edit === "edit")?_store.data.length:_store.data.length+1;
        component.fieldInfo = __zen('input_range')+"1 ~ "+n;

        setTipFocus(this,component);
    },

    onT_numBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onTc_srcChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === "ip"){
            Ext.getCmp("t_src").show();
            Ext.getCmp("tc_src").addCls("lb_req");
        }else{
            Ext.getCmp("t_src").hide();
            Ext.getCmp("tc_src").removeCls("lb_req");
        }
    },

    onT_srcErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg2");
    },

    onT_srcFocus: function(component, event, eOpts) {
        var src = Ext.getCmp("tc_src");

        if(src.getValue() === "ip"){
            var str = disp_help_ip('4s');
            str += ', '+disp_help_ip('4r');
            str += ', '+disp_help_ip('4s2m');
            component.fieldInfo = str;
            setTipFocus(this,component);
        }
    },

    onT_srcBlur: function(component, event, eOpts) {
        var src = Ext.getCmp("tc_src");

        if(src.getValue() === "ip"){
            setTipBlur(this,component);
            component.validateValue(true);
        }
    },

    onTc_destChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === "ip"){
            Ext.getCmp("t_dest").show();
            Ext.getCmp("tc_dest").addCls("lb_req");
        }else{
            Ext.getCmp("t_dest").hide();
            Ext.getCmp("tc_dest").removeCls("lb_req");
        }
    },

    onT_destErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg2");
    },

    onT_destFocus: function(component, event, eOpts) {
        var src = Ext.getCmp("tc_dest");

        if(src.getValue() === "ip"){
            var str = disp_help_ip('4s');
            str += ', '+disp_help_ip('4r');
            str += ', '+disp_help_ip('4s2m');
            component.fieldInfo = str;
            setTipFocus(this,component);
        }
    },

    onT_destBlur: function(component, event, eOpts) {
        var src = Ext.getCmp("tc_dest");

        if(src.getValue() === "ip"){
            setTipBlur(this,component);
            component.validateValue(true);
        }
    },

    onT_tunnel_ipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg2");
    },

    onT_tunnel_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        str += ', '+disp_help_ip('4r');
        str += ', '+disp_help_ip('4s2m');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onT_tunnel_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        me.fieldInfo = makeZenTip();

        if(me.edit === "edit"){

            me.setTitle(__zen('tunnel_routing_edit')+" - "+me.record.num);
            Ext.getCmp("t_num").setValue(me.record.num);

            var record = me.record;

            Ext.getCmp("tc_src").setValue(record.src_type);
            if(record.src_type === "ip"){
                Ext.getCmp("t_src").setValue(record.src);
            }
            Ext.getCmp("tc_dest").setValue(record.dest_type);
            if(record.dest_type === "ip"){
                Ext.getCmp("t_dest").setValue(record.dest);
            }
            Ext.getCmp("t_tunnel_ip").setValue(record.tunnel_ip);
        }else{
            me.setTitle(__zen('tunnel_routing_add'));
            var _tunnel = Ext.getCmp("grid_tunnel_list").getStore().data.items.length;
            Ext.getCmp("t_num").setValue(_tunnel+1);
            Ext.getCmp("tc_src").setValue("any");
            Ext.getCmp("tc_dest").setValue("any");
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var num = Ext.getCmp("t_num");
        var tc_src = Ext.getCmp("tc_src");
        var t_src = Ext.getCmp("t_src");
        var tc_dest = Ext.getCmp("tc_dest");
        var t_dest = Ext.getCmp("t_dest");
        var tunnel_ip = Ext.getCmp("t_tunnel_ip");

        var _store = Ext.data.StoreManager.lookup("store_etc_tunnel_list");

        if(num.getValue() !== ""){
            var n = (me.edit==="edit")?_store.data.length:_store.data.length+1;
            if(num.getValue() > n){
                prt_errMsg(ValidLimit(1,n),"fld_msg2");
                num.focus();
                return false;
            }
        }

        if(tc_src.getValue()==="ip"){
            if(t_src.isValid()===false){ t_src.focus(); return false; }
        }
        if(tc_dest.getValue()==="ip"){
            if(t_dest.isValid()===false){ t_dest.focus(); return false; }
        }
        if(tunnel_ip.isValid()===false){ tunnel_ip.focus(); return false; }
        prt_errMsg(null,'fld_msg2');

        var obj = {
            'num': (me.edit==="edit")?me.record.num:_store.data.length+1,
            'src_type': tc_src.getValue(),
            'src': t_src.getValue(),
            'dest_type': tc_dest.getValue(),
            'dest': t_dest.getValue(),
            'tunnel_ip': tunnel_ip.getValue()
        };

        _store.sorters.clear();

        if(me.edit === "edit"){

            var n = Number(num.getValue())-1;
            _store.removeAt(Number(me.record.num)-1);
            _store.insert(n,obj);
        }else{

            if(num.getValue() === ""){
                _store.add(obj);
            }else{
                var n = Number(num.getValue())-1;
                obj.num = num.getValue();
                _store.insert(n,obj);
            }
        }

        var data = [];

        for(var i=0; i<_store.data.length; i++){
            data.push({
                'num': i+1,
                'src_type': _store.data.items[i].data.src_type,
                'src': _store.data.items[i].data.src,
                'dest_type': _store.data.items[i].data.dest_type,
                'dest': _store.data.items[i].data.dest,
                'tunnel_ip': _store.data.items[i].data.tunnel_ip
            });
        }

        _store.loadData(data);

        me.close();
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    }

});