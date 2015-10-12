
Ext.define('NFW2.view.win_packet_dump', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_packet_dump',

    requires: [
        'NFW2.view.win_packet_dumpViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.FieldSet',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_packet_dump'
    },
    cls: 'zen_win',
    id: 'win_packet_dump',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'win_packet_form',
            bodyPadding: 10,
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'container',
                    margin: '8 0 0 0',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value !== true){
                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 'packet_name',
                            labelSeparator: ' ',
                            labelWidth: 160,
                            msgTarget: 'none',
                            enforceMaxLength: true,
                            maxLength: 16,
                            maxLengthText: ' ',
                            bind: {
                                fieldLabel: '{name}'
                            },
                            listeners: {
                                errorchange: 'onPacket_nameErrorChange',
                                blur: 'onPacket_nameBlur'
                            }
                        },
                        {
                            xtype: 'combobox',
                            id: 'packet_inter',
                            labelSeparator: ' ',
                            labelWidth: 160,
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: {
                                fields: [
                                    {
                                        name: 'name'
                                    },
                                    {
                                        name: 'value'
                                    }
                                ]
                            },
                            valueField: 'value',
                            bind: {
                                fieldLabel: '{inter}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value !== true){
                                    if(!CheckNotNull(removeComma(value))){ return get_msg('err_null'); }
                                    if(!LengthCheck(removeComma(value), 1, 10000)){ return ValidLimit(1, 10000); }
                                }

                                return true;
                            },
                            fieldInfo: {
                                txt: msg_tip_length(1,
                                10000,
                                null)
                            },
                            cls: 'lb_req',
                            id: 'packet_count',
                            labelSeparator: ' ',
                            labelWidth: 160,
                            msgTarget: 'none',
                            value: '5,000',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 6,
                            maxLengthText: ' ',
                            bind: {
                                fieldLabel: '{max_packet_dump}'
                            },
                            listeners: {
                                errorchange: 'onPacket_countErrorChange',
                                focus: 'onPacket_countFocus',
                                blur: 'onPacket_countBlur',
                                change: 'onPacket_countChange'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'fieldset',
                            bind: {
                                title: '{filter}'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            id: 'packet_direc',
                                            width: 200,
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            editable: false,
                                            displayField: 'value',
                                            queryMode: 'local',
                                            store: {
                                                data: [
                                                    {
                                                        value: '->'
                                                    },
                                                    {
                                                        value: '<>'
                                                    }
                                                ],
                                                fields: [
                                                    {
                                                        name: 'value'
                                                    }
                                                ]
                                            },
                                            valueField: 'value',
                                            bind: {
                                                fieldLabel: '{direction}'
                                            },
                                            listeners: {
                                                afterrender: 'onComboboxAfterRender'
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            id: 'packet_protocol',
                                            margin: '0 0 0 90',
                                            width: 200,
                                            labelSeparator: ' ',
                                            editable: false,
                                            displayField: 'name',
                                            queryMode: 'local',
                                            store: {
                                                data: [
                                                    {
                                                        name: 'Any',
                                                        value: 'any'
                                                    },
                                                    {
                                                        name: 'IP',
                                                        value: 'ip'
                                                    },
                                                    {
                                                        name: 'ARP',
                                                        value: 'arp'
                                                    },
                                                    {
                                                        name: 'RARP',
                                                        value: 'rarp'
                                                    },
                                                    {
                                                        name: 'ICMP',
                                                        value: 'icmp'
                                                    },
                                                    {
                                                        name: 'IGMP',
                                                        value: 'igmp'
                                                    },
                                                    {
                                                        name: 'IGRP',
                                                        value: 'igrp'
                                                    },
                                                    {
                                                        name: 'PIM',
                                                        value: 'pim'
                                                    },
                                                    {
                                                        name: 'AH',
                                                        value: 'ah'
                                                    },
                                                    {
                                                        name: 'ESP',
                                                        value: 'esp'
                                                    },
                                                    {
                                                        name: 'VRRP',
                                                        value: 'vrrp'
                                                    },
                                                    {
                                                        name: 'UDP',
                                                        value: 'udp'
                                                    },
                                                    {
                                                        name: 'TCP',
                                                        value: 'tcp'
                                                    }
                                                ],
                                                fields: [
                                                    {
                                                        name: 'name'
                                                    },
                                                    {
                                                        name: 'value'
                                                    }
                                                ]
                                            },
                                            valueField: 'value',
                                            bind: {
                                                fieldLabel: '{protocol}'
                                            },
                                            listeners: {
                                                afterrender: 'onComboboxAfterRender1',
                                                change: 'onComboboxChange'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '8 0 0 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                var ip_mask = [];

                                                if(value !== true){
                                                    if(!CheckNotNull(value)){ return true; }
                                                    ip_mask = value.split('/');
                                                    if(ip_mask[1] === undefined){ if(!ValidIPAddress(ip_mask[0])){ return get_msg('err_ip'); } }
                                                    else{
                                                        var temp = ip_mask[1].split('.');

                                                        if(temp[0] === ""){ return get_msg('err_form'); }
                                                        if(temp[1] === undefined){ if(Number(temp[0]) > 24 || Number(temp[0]) < 0){ return ValidLimit(0,24); } }
                                                        else{ if(!ValidIPAddress(ip_mask[1])){ return get_msg('err_form'); } }
                                                    }
                                                }

                                                return true;
                                            },
                                            id: 'packet_sip',
                                            width: 285,
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            maskRe: /[0-9.\/]/,
                                            bind: {
                                                fieldLabel: '{src_ip}'
                                            },
                                            listeners: {
                                                focus: 'onPacket_sipFocus',
                                                blur: 'onPacket_sipBlur',
                                                errorchange: 'onPacket_sipFocus1'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value !== true){
                                                    if(!CheckNotNull(value)){ return true; }
                                                    if(!LengthCheck(value, 0, 65535)){ return ValidLimit(0, 65535); }
                                                }

                                                return true;
                                            },
                                            fieldInfo: {
                                                txt: msg_tip_length_port(0,
                                                65535,
                                                null)
                                            },
                                            id: 'packet_sport',
                                            margin: '0 0 0 5',
                                            width: 200,
                                            labelSeparator: ' ',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 5,
                                            maxLengthText: ' ',
                                            bind: {
                                                fieldLabel: '{src_port}'
                                            },
                                            listeners: {
                                                focus: 'onPacket_sportFocus',
                                                blur: 'onPacket_sportBlur',
                                                errorchange: 'onPacket_sportErrorChange'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '8 0 10 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                var ip_mask = [];

                                                if(value !== true){
                                                    if(!CheckNotNull(value)){ return true; }
                                                    ip_mask = value.split('/');
                                                    if(ip_mask[1] === undefined){ if(!ValidIPAddress(ip_mask[0])){ return get_msg('err_ip'); } }
                                                    else{
                                                        var temp = ip_mask[1].split('.');

                                                        if(temp[0] === ""){ return get_msg('err_form'); }
                                                        if(temp[1] === undefined){ if(Number(temp[0]) > 24 || Number(temp[0]) <= 0){ return ValidLimit(0,24); } }
                                                        else{ if(!ValidIPAddress(ip_mask[1])){ return get_msg('err_form'); } }
                                                    }
                                                }

                                                return true;
                                            },
                                            id: 'packet_dip',
                                            width: 285,
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            maskRe: /[0-9.\/]/,
                                            bind: {
                                                fieldLabel: '{dest_ip}'
                                            },
                                            listeners: {
                                                errorchange: 'onPacket_dipErrorChange',
                                                focus: 'onPacket_dipFocus',
                                                blur: 'onPacket_dipBlur'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value !== true){
                                                    if(!CheckNotNull(value)){ return true; }
                                                    if(!LengthCheck(value, 1, 65535)){ return ValidLimit(1, 65535); }
                                                }

                                                return true;
                                            },
                                            fieldInfo: {
                                                txt: msg_tip_length_port(0,
                                                65535,
                                                null)
                                            },
                                            id: 'packet_dport',
                                            margin: '0 0 0 5',
                                            width: 200,
                                            labelSeparator: ' ',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 5,
                                            maxLengthText: ' ',
                                            bind: {
                                                fieldLabel: '{dest_port}'
                                            },
                                            listeners: {
                                                focus: 'onPacket_dportFocus',
                                                blur: 'onPacket_dportBlur',
                                                errorchange: 'onPacket_dportErrorChange'
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
                        click: 'onButtonClick1',
                        blur: 'onButtonBlur'
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
    listeners: {
        render: 'onWindowRender',
        afterrender: 'onWindowAfterRender'
    },

    onPacket_nameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onPacket_nameBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onPacket_countErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onPacket_countFocus: function(component, event, eOpts) {
        setTipFocus(this, component);
    },

    onPacket_countBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onPacket_countChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onComboboxAfterRender: function(component, eOpts) {
        var inter = component.getStore().data;

        if(inter.length > 0){
            component.setValue(inter.items[0].data.value);
        }
    },

    onComboboxAfterRender1: function(component, eOpts) {
        var inter = component.getStore().data;

        if(inter.length > 0){
            component.setValue(inter.items[0].data.value);
        }
    },

    onComboboxChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === "any" || newValue === "ip" || newValue === "udp" || newValue === "tcp"){
            Ext.getCmp('packet_sip').enable();
            Ext.getCmp('packet_sport').enable();
            Ext.getCmp('packet_dip').enable();
            Ext.getCmp('packet_dport').enable();
        }
        else{
            Ext.getCmp('packet_sip').disable();
            Ext.getCmp('packet_sip').reset();
            Ext.getCmp('packet_sport').disable();
            Ext.getCmp('packet_sport').reset();
            Ext.getCmp('packet_dip').disable();
            Ext.getCmp('packet_dip').reset();
            Ext.getCmp('packet_dport').disable();
            Ext.getCmp('packet_dport').reset();
        }
    },

    onPacket_sipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4smp');
        component.fieldInfo = str;
        setTipFocus(this, component);
    },

    onPacket_sipBlur: function(component, event, eOpts) {
        setTipBlur(this, component);
    },

    onPacket_sipFocus1: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onPacket_sportFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onPacket_sportBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onPacket_sportErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onPacket_dipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onPacket_dipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4smp');
        component.fieldInfo = str;
        setTipFocus(this, component);
    },

    onPacket_dipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
    },

    onPacket_dportFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onPacket_dportBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onPacket_dportErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;
        var store = Ext.data.StoreManager.lookup('store_monitor_packet_list');
        var chk;

        if(Ext.getCmp('packet_name').isValid() === false){ Ext.getCmp('packet_name').focus(); return false; }
        if(Ext.getCmp('packet_count').isValid() === false){ Ext.getCmp('packet_count').focus(); return false; }
        if(Ext.getCmp('packet_sip').isValid() === false){ Ext.getCmp('packet_sip').focus(); return false; }
        if(Ext.getCmp('packet_sport').isValid() === false){ Ext.getCmp('packet_sport').focus(); return false; }
        if(Ext.getCmp('packet_dip').isValid() === false){ Ext.getCmp('packet_dip').focus(); return false; }
        if(Ext.getCmp('packet_dport').isValid() === false){ Ext.getCmp('packet_dport').focus(); return false; }
        // for(var i in store.data.items){
        //     if(store.data.items[i].data.name === Ext.getCmp('packet_name').getValue()){
        //         var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        //         err_fl.addCls('ic_msg_err');
        //         err_fl.update(get_msg('err_configdob'));
        //         me.set_btn = true;
        //         return false;
        //     }
        // }

        if(me.edit === "edit"){
            var chk_num = 0;
            for(var i in store.data.items){
                if(store.data.items[i].data.name === Ext.getCmp('packet_name').getValue()){
                    if(Number(i) !== Number(me.edit_index)){ chk_num++; }
                }
            }
            if(chk_num > 0){ chk = true; }
        }
        else{
            for(var i in store.data.items){
                if(store.data.items[i].data.name === Ext.getCmp('packet_name').getValue()){ chk = true; }
            }
        }

        if(chk){
            me.set_btn = true;
            Ext.getCmp('packet_name').focus();
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(get_msg('err_configdob'));
            return false;
        }

        var filter = {};
        var sip, sport, dip, dport;
        var protocol = Ext.getCmp('packet_protocol').getValue();

        if(protocol === "any" || protocol === "ip" || protocol === "tcp" || protocol === "udp"){
            if(Ext.getCmp('packet_sip').getValue() === ""){ sip = "any"; }
            else{ sip = Ext.getCmp('packet_sip').getValue(); }
            if(Ext.getCmp('packet_sport').getValue() === ""){ sport = "any"; }
            else{ sport = Ext.getCmp('packet_sport').getValue(); }
            if(Ext.getCmp('packet_dip').getValue() === ""){ dip = "any"; }
            else{ dip = Ext.getCmp('packet_dip').getValue(); }
            if(Ext.getCmp('packet_dport').getValue() === ""){ dport = "any"; }
            else{ dport = Ext.getCmp('packet_dport').getValue(); }
            filter.protocol = protocol;
            filter.direction = Ext.getCmp('packet_direc').getValue();
            filter.src_addr = sip;
            filter.src_port = sport;
            filter.dst_addr = dip;
            filter.dst_port = dport;
        }
        else{
            filter.protocol = protocol;
            filter.direction = Ext.getCmp('packet_direc').getValue();
            filter.src_addr = '';
            filter.src_port = '';
            filter.dst_addr = '';
            filter.dst_port = '';
        }

        var obj = {
            'name' : Ext.getCmp('packet_name').getValue(),
            'iface' : Ext.getCmp('packet_inter').getValue(),
            'start_time' : '',
            'packet_count' : removeComma(Ext.getCmp('packet_count').getValue()),
            'filter' : filter
        };

        var update = (me.edit==="edit")?true:false;
        if(me.edit === "edit"){ obj._id = me.record.data.id; }

        var _params = {
            basename : Ext.encode('packet_dump'),
            obj : Ext.encode(obj),
            update : Ext.encode(update)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setListTypeObj',
            _params,
            function(response){
                Ext.getCmp('NFW2_monitor_network_packetDump').get_packet_dump();
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
            }
        );
    },

    onButtonBlur: function(component, event, eOpts) {
        var me = this;
        if(me.set_btn === true){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
            me.set_btn = false;
        }
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    onWindowRender: function(component, eOpts) {
        var _params = {

            option : Ext.encode('all')

        };

        Ext.data.JsonP.request({

            url : "/api/ftuctrl/get_pname_list",
            params : _params,
            success : function(response){
                var record = [];
                record.push({
                    'name' : 'Any',
                    'value' : 'any'
                });

                for(var i in response.retval){
                    record.push({
                        'name' : response.retval[i].name,
                        'value' : response.retval[i].name
                    });
                }

                Ext.getCmp('packet_inter').getStore().loadData(record);

                var inter = Ext.getCmp('packet_inter').getStore().data;

                if(inter.length > 0){
                    Ext.getCmp('packet_inter').setValue(inter.items[0].data.value);
                }
            }
        });
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = Ext.getCmp('win_packet_dump');
        me.set_btn = false;
        chk_zenauth(null);
        this.fieldInfo = makeZenTip();

        if(me.edit === "edit"){
            var sip;
            var sport;
            var dip;
            var dport;
            me.setTitle(__zen('edit_packetdump'));

            if(me.record.data.filter.src_addr === 'any'){ sip = ''; }
            else{ sip = me.record.data.filter.src_addr; }
            if(me.record.data.filter.src_port === 'any'){ sport = ''; }
            else{ sport = me.record.data.filter.src_port; }
            if(me.record.data.filter.dst_addr === 'any'){ dip = ''; }
            else{ dip = me.record.data.filter.dst_addr; }
            if(me.record.data.filter.dst_port === 'any'){ dport = ''; }
            else{ dport = me.record.data.filter.dst_port; }

            Ext.getCmp('packet_name').setValue(me.record.data.name);
            Ext.getCmp('packet_inter').setValue(me.record.data.iface);
            Ext.getCmp('packet_count').setValue(me.record.data.packet_count);
            Ext.getCmp('packet_direc').setValue(me.record.data.filter.direction);
            Ext.getCmp('packet_protocol').setValue(me.record.data.filter.protocol);
            Ext.getCmp('packet_sip').setValue(sip);
            Ext.getCmp('packet_sport').setValue(sport);
            Ext.getCmp('packet_dip').setValue(dip);
            Ext.getCmp('packet_dport').setValue(dport);
        }
        else{ me.setTitle(__zen('add_packetdump')); }
    },

    set_win: function(btn) {
        if(btn === "yes"){
            if(Ext.getCmp('monitor_packet_grid').getStore().getCount()>9){
                Ext.Msg.show({
                    title: __weguardia,
                    width: 300,
                    msg: ValidMaxCnt(10),
                    buttons: Ext.Msg.OK,
                    fn: setWinClose,
                    icon: Ext.window.MessageBox.INFO
                });
                Ext.getCmp('win_packet_dump').close();
            }
            else{
                Ext.getCmp('packet_name').reset();
                Ext.getCmp('packet_inter').setValue('any');
                Ext.getCmp('packet_count').setValue('5000');
                Ext.getCmp('packet_direc').setValue('->');
                Ext.getCmp('packet_protocol').setValue('any');
                Ext.getCmp('packet_sip').reset();
                Ext.getCmp('packet_sport').reset();
                Ext.getCmp('packet_dip').reset();
                Ext.getCmp('packet_dport').reset();
            }
        }
        else{
            Ext.getCmp('win_packet_dump').close();
        }
    }

});