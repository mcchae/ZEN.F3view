
Ext.define('NFW2.view.NFW2_ips_portScan', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_ips_portscan',

    requires: [
        'NFW2.view.NFW2_ips_portScanViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.XTemplate',
        'Ext.form.CheckboxGroup',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Tag',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'nfw2_ips_portscan'
    },
    cls: 'zen_body',
    id: 'portscan',
    width: 900,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'fm',
            margin: '5 0 0 0',
            items: [
                {
                    xtype: 'container',
                    margin: '0 0 0 10',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'label',
                            width: 125,
                            bind: {
                                text: '{port_scan}'
                            }
                        },
                        {
                            xtype: 'container',
                            html: '<div id="portscan_chk"/>',
                            listeners: {
                                render: 'onContainerRender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    disabled: true,
                    id: 'con_port',
                    items: [
                        {
                            xtype: 'container',
                            margin: '8 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'action',
                                    width: 350,
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    value: 1,
                                    editable: false,
                                    displayField: 'name',
                                    store: 'store_portscan_action',
                                    valueField: 'val',
                                    bind: {
                                        fieldLabel: '{action}'
                                    },
                                    listeners: {
                                        change: 'onActionChange'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    disabled: true,
                                    id: 'con_block',
                                    margin: '0 0 0 30',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'lb_req',
                                            width: 125,
                                            bind: {
                                                text: '{detect_time}'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value !== true){
                                                    var _value = removeComma(value);

                                                    if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                    if(!ValidNum(_value)){ return get_msg('err_form'); }
                                                    if(!LengthCheck(_value, 1, 2592000)){ return ValidLimit(1, '2,592,000'); }
                                                }
                                                return true;
                                            },
                                            fieldInfo: '',
                                            cls: 'inp_unit',
                                            id: 'blocktime',
                                            padding: '0 0 0 30',
                                            width: 140,
                                            afterBodyEl: [
                                                '<div class="inp_after">{[__zen(\'sec\')]}</div>'
                                            ],
                                            labelSeparator: ' ',
                                            msgTarget: 'none',
                                            value: '30',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maskRe: /[0-9.]/,
                                            maxLength: 9,
                                            maxLengthText: ' ',
                                            listeners: {
                                                errorchange: 'onBlocktimeErrorChange',
                                                keydown: 'onBlocktimeKeydown',
                                                focus: 'onBlocktimeFocus',
                                                blur: 'onBlocktimeBlur',
                                                change: 'onBlocktimeChange'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '8 0 0 10',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'checkboxgroup',
                                    id: 'chk_protocol',
                                    width: 115,
                                    labelSeparator: ' ',
                                    labelWidth: 110,
                                    bind: {
                                        fieldLabel: '{protocol}'
                                    }
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chk_all',
                                    checked: true,
                                    listeners: {
                                        change: 'onChk_allChange',
                                        beforerender: 'onChk_allBeforeRender'
                                    }
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chk_tcp',
                                    boxLabel: 'TCP',
                                    checked: true,
                                    listeners: {
                                        change: 'onChk_tcpChange'
                                    }
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chk_udp',
                                    fieldLabel: '',
                                    boxLabel: 'UDP',
                                    checked: true,
                                    listeners: {
                                        change: 'onChk_udpChange'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '10 0 0 0',
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'sense',
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    value: 'low',
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'store_portscan_sense',
                                    valueField: 'val',
                                    bind: {
                                        fieldLabel: '{sensitivity}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '8 0 0 10',
                            items: [
                                {
                                    xtype: 'label',
                                    bind: {
                                        text: '{expect_ip_set}'
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
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '0 0 8 10',
                                            bind: {
                                                text: '{src}'
                                            }
                                        },
                                        {
                                            xtype: 'tagfield',
                                            flex: 1,
                                            id: 'tag_src',
                                            scrollable: {
                                                x: false,
                                                y: true
                                            },
                                            width: 300,
                                            labelAlign: 'top',
                                            labelSeparator: ' ',
                                            editable: false,
                                            displayField: 'name',
                                            queryMode: 'local',
                                            store: 'store_portscan_obj',
                                            valueField: 'cid',
                                            stacked: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 30',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '0 0 8 10',
                                            bind: {
                                                text: '{dest}'
                                            }
                                        },
                                        {
                                            xtype: 'tagfield',
                                            flex: 1,
                                            id: 'tag_dst',
                                            scrollable: {
                                                x: false,
                                                y: true
                                            },
                                            width: 300,
                                            labelAlign: 'top',
                                            labelSeparator: ' ',
                                            editable: false,
                                            displayField: 'name',
                                            queryMode: 'local',
                                            store: 'store_portscan_obj',
                                            valueField: 'cid',
                                            stacked: true
                                        }
                                    ]
                                }
                            ],
                            listeners: {
                                afterrender: 'onTag_srcAfterRender'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender'
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
                        click: 'onButtonClick2'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick3'
                    }
                }
            ]
        }
    ],

    onContainerRender: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'chk_portscan',
            renderTo:'portscan_chk',
            style:'margin-left:0px',
            resizeHandle: false,
            state: false,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    var con_port = Ext.getCmp("con_port");

                    if(newValue === true){

                        con_port.enable();
                    }else{

                        con_port.disable();
                    }
                }
            }
        });
    },

    onActionChange: function(field, newValue, oldValue, eOpts) {
        var con_block = Ext.getCmp("con_block");

        if(newValue === 1 || newValue === 6){

            con_block.setDisabled(true);
        }else{

            con_block.setDisabled(false);
        }
    },

    onBlocktimeErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onBlocktimeKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onBlocktimeFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1 ~ 2,592,000';
        setTipFocus(this,component);
    },

    onBlocktimeBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onBlocktimeChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onChk_allChange: function(field, newValue, oldValue, eOpts) {
        this.chk_protocol('all',newValue);
    },

    onChk_allBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('all');
    },

    onChk_tcpChange: function(field, newValue, oldValue, eOpts) {
        this.chk_protocol('tcp',newValue);
    },

    onChk_udpChange: function(field, newValue, oldValue, eOpts) {
        this.chk_protocol('udp',newValue);
    },

    onTag_srcAfterRender: function(component, eOpts) {
        Ext.get('tag_src-itemList').setMaxHeight(130);
        Ext.get('tag_dst-itemList').setMaxHeight(130);

        Ext.get('tag_src-listWrapper').setWidth(266);
        Ext.get('tag_dst-listWrapper').setWidth(266);
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        this.fieldInfo = makeZenTip();
        var obj = {
            'name': "None",
            'cid': ""
        };

        Ext.data.StoreManager.lookup("store_portscan_src").add(obj);
        Ext.data.StoreManager.lookup("store_portscan_dest").add(obj);

        var store = Ext.data.StoreManager.lookup("store_portscan_obj");

        store.load(function(response){

            var records = [];

            for(var i=0; i<store.getCount(); i++){

                var cid = store.data.items[i].data.cid.split(":");

                records[cid[1]] = {
                    'cid': store.data.items[i].data.cid,
                    'name': store.data.items[i].data.name,
                    'otype': (cid[0]==="v4"||cid[0]==="v6")?"ip":"group"
                };
            }

            me.obj = records;

            me.init_ips_portscan();
        });
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;

        var chk_portscan = Ext.getCmp("chk_portscan");
        var action = Ext.getCmp("action");
        var blocktime = Ext.getCmp("blocktime");

        var chk_all = Ext.getCmp("chk_all");
        var chk_tcp = Ext.getCmp("chk_tcp");
        var chk_udp = Ext.getCmp("chk_udp");
        var tag_src = Ext.getCmp('tag_src');
        var tag_dst = Ext.getCmp('tag_dst');
        var sense = Ext.getCmp("sense");

        if(action.getValue() === null){ prt_errMsg(get_msg('err_null'), null); action.focus(); return false; }
        if(sense.getValue() === null){ prt_errMsg(get_msg('err_null'), null); sense.focus(); return false; }

        var _store_src = Ext.data.StoreManager.lookup("store_portscan_src");
        var _store_dest = Ext.data.StoreManager.lookup("store_portscan_dest");

        var portscan = {
            '@use': (chk_portscan.getValue())?"on":"off"
        };

        var setting = {};

        if(chk_portscan.getValue()){

            setting = {
                'action_type': Number(action.getValue())
            };

            if(action.getValue() !== 1 && action.getValue() !== 6){

                if(blocktime.isValid()===false){
                    blocktime.focus();
                    return false;
                }

                setting.block_time = blocktime.getValue();
            }

            setting.sense_level = sense.getValue();

            if(chk_all.getValue()){

                setting.protocol = "all";
            }else{

                var ar_protocol = [];
                if(chk_tcp.getValue()){ ar_protocol.push('tcp'); }
                if(chk_udp.getValue()){ ar_protocol.push('udp'); }

                if(ar_protocol.length === 0){
                    setting.protocol = "all";
                }else{

                    setting.protocol = ar_protocol.join(" ");
                }
            }

            portscan.setting = setting;

            if(tag_src.value.length === 1 && tag_src.value[0] === ""){

            }else{

                var scanner = [];

                for(var i=0; i<tag_src.value.length; i++){

                    var cid = tag_src.value[i].split(":");

                    scanner.push({
                        'obj_cid': cid[1],
                        'otype': (cid[0]==="v4"||cid[0]==="v6")?"ip":"group"
                    });
                }

                portscan.ignore_scanner = scanner;
            }

            if(tag_dst.value.length === 1 && tag_dst.value === ""){

            }else{

                var scanned = [];

                for(var l=0; l<tag_dst.value.length; l++){

                    var cid = tag_dst.value[l].split(":");
                    scanned.push({
                        'obj_cid': cid[1],
                        'otype': (cid[0]==="v4"||cid[0]==="v6")?"ip":"group"
                    });
                }

                portscan.ignore_scanned = scanned;
            }
        }

        var obj = {
            'portscan_anomaly': {portscan: portscan}
        };

        var _params = {
            basename: Ext.encode("ips_portscan"),
            obj: Ext.encode(obj)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params,
            function(response){
                me.init_ips_portscan();
                Ext.Msg.alert(__weguardia,get_msg("msg_ok_add"));
            }
        );
    },

    onButtonClick3: function(button, e, eOpts) {
        this.init_ips_portscan();
    },

    chk_protocol: function(type, val) {
        var all = Ext.getCmp("chk_all");
        var tcp = Ext.getCmp("chk_tcp");
        var udp = Ext.getCmp("chk_udp");

        if(type === 'all'){

            if(val === true){

                tcp.setValue(true);
                udp.setValue(true);
            }else{

                tcp.setValue(false);
                udp.setValue(false);
            }
        }else{

            var tcp_v = tcp.getValue();
            var udp_v = udp.getValue();

            if(val === false){

                all.setValue(false);
                tcp.setValue(tcp_v);
                udp.setValue(udp_v);
            }else{

                if(tcp_v && udp_v){
                    all.setValue(true);
                }
            }
        }
    },

    init_ips_portscan: function() {
        var me = Ext.getCmp("portscan");

        var _store_src = Ext.data.StoreManager.lookup("store_portscan_src");
        var _store_dest = Ext.data.StoreManager.lookup("store_portscan_dest");

        var _params = {
            basename: Ext.encode("ips_portscan")
        };

        var obj = me.obj;

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){

                hideLoadMask();

                if(!response){
                    Ext.getCmp("chk_portscan").state = false;
                    Ext.getCmp("chk_portscan").moveHandle(false);
                    var con_port = Ext.getCmp("con_port");
                    con_port.setDisabled(true);
                    Ext.getCmp('fm').getForm().reset();

                    _store_src.loadData([{
                        'name': 'None',
                        'cid': '',
                        'otype': ''
                    }]);

                    _store_dest.loadData([{
                        'name': 'None',
                        'cid': '',
                        'otype': ''
                    }]);

                    return false;
                }

                var port = response.portscan_anomaly.portscan;

                if(port['@use'] === "on"){
                    Ext.getCmp("chk_portscan").state = true;
                    Ext.getCmp("chk_portscan").moveHandle(true);
                    var con_port = Ext.getCmp("con_port");
                    con_port.setDisabled(false);
                    Ext.getCmp("action").setValue(port.setting.action_type);

                    if(port.setting.block_time){
                        Ext.getCmp("blocktime").setValue(port.setting.block_time);
                    }else{
                        Ext.getCmp("blocktime").reset();
                    }

                    if(port.setting.protocol === "all"){

                        Ext.getCmp("chk_all").setValue(true);
                    }else{

                        Ext.getCmp("chk_all").setValue(false);
                        var ar_chk = port.setting.protocol.split(" ");

                        for(var i=0; i<ar_chk.length; i++){
                            eval("Ext.getCmp('chk_"+ar_chk[i]+"').setValue(true);");
                        }
                    }

                    Ext.getCmp("sense").setValue(port.setting.sense_level);

                    var scanner = port.ignore_scanner;

                    if(scanner && scanner.length > 0){
                        var ar_src = [];
                        var src_value = [];

                        for(var j=0; j<scanner.length; j++){
                            src_value[j] = me.obj[scanner[j].obj_cid].cid;
                            ar_src.push(me.obj[scanner[j].obj_cid]);
                        }
                        Ext.getCmp('tag_src').setValue(src_value);
                        _store_src.loadData(ar_src);
                    }else{
                        _store_src.loadData([{
                            'name': 'None',
                            'cid': '',
                            'otype': ''
                        }]);
                    }

                    var scanned = port.ignore_scanned;

                    if(scanned && scanned.length > 0){
                        var ar_dest = [];
                        var dst_value = [];

                        for(var l=0; l<scanned.length; l++){
                            dst_value[l] = me.obj[scanned[l].obj_cid].cid;
                            ar_dest.push(me.obj[scanned[l].obj_cid]);
                        }

                        Ext.getCmp('tag_dst').setValue(dst_value);
                        _store_dest.loadData(ar_dest);
                    }else{
                        _store_dest.loadData([{
                            'name': 'None',
                            'cid': '',
                            'otype': ''
                        }]);
                    }
                }else{
                    Ext.getCmp("chk_portscan").state = false;
                    Ext.getCmp("chk_portscan").moveHandle(false);
                    var con_port = Ext.getCmp("con_port");
                    con_port.setDisabled(true);
                    Ext.getCmp('fm').getForm().reset();

                    _store_src.loadData([{
                        'name': 'None',
                        'cid': '',
                        'otype': ''
                    }]);

                    _store_dest.loadData([{
                        'name': 'None',
                        'cid': '',
                        'otype': ''
                    }]);

                }
            }
        );
    }

});