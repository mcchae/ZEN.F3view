
Ext.define('NFW2.view.NFW2_network_portscanAnomaly', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.form.CheckboxGroup',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel'
    ],

    id: 'portscan',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    id: 'fm',
                    bodyPadding: 10,
                    title: 'Portscan 탐지',
                    items: [
                        {
                            xtype: 'checkboxfield',
                            anchor: '100%',
                            id: 'chk_portscan',
                            fieldLabel: '',
                            boxLabel: '사용',
                            boxLabelCls: 'l_chk',
                            listeners: {
                                change: {
                                    fn: me.onChk_portscanChange,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            disabled: true,
                            id: 'con_port',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'action',
                                    width: 300,
                                    fieldLabel: '행위',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    value: 1,
                                    editable: false,
                                    displayField: 'name',
                                    store: 'store_portscan_action',
                                    valueField: 'val',
                                    listeners: {
                                        change: {
                                            fn: me.onActionChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        if(!ValidNum(value)){ return get_msg('err_form'); }
                                        if(!LengthCheck(value, 1, 2592000)){ return ValidLimit(1, 2592000); }

                                        return true;
                                    },
                                    disabled: true,
                                    id: 'blocktime',
                                    padding: '0 0 0 30',
                                    fieldLabel: '차단 시간',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    msgTarget: 'none',
                                    value: '30',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 7,
                                    listeners: {
                                        errorchange: {
                                            fn: me.onBlocktimeErrorChange,
                                            scope: me
                                        },
                                        keydown: {
                                            fn: me.onBlocktimeKeydown,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'mt_info',
                                    text: '초'
                                },
                                {
                                    xtype: 'label',
                                    cls: 'errorBox',
                                    hidden: true,
                                    id: 'errorBox'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            cls: 'hr',
                            height: 1,
                            layout: 'border'
                        },
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'checkboxgroup',
                                    width: 400,
                                    fieldLabel: '프로토콜',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            id: 'chk_all',
                                            boxLabel: 'All',
                                            checked: true,
                                            listeners: {
                                                change: {
                                                    fn: me.onChk_allChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            id: 'chk_tcp',
                                            boxLabel: 'TCP',
                                            checked: true,
                                            listeners: {
                                                change: {
                                                    fn: me.onChk_tcpChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            id: 'chk_udp',
                                            fieldLabel: '',
                                            boxLabel: 'UDP',
                                            checked: true,
                                            listeners: {
                                                change: {
                                                    fn: me.onChk_udpChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            id: 'chk_ip',
                                            fieldLabel: '',
                                            boxLabel: 'IP',
                                            checked: true,
                                            listeners: {
                                                change: {
                                                    fn: me.onChk_ipChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            id: 'chk_icmp',
                                            fieldLabel: '',
                                            boxLabel: 'ICMP',
                                            checked: true,
                                            listeners: {
                                                change: {
                                                    fn: me.onChk_icmpChange,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'sense',
                                    fieldLabel: '민감도',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    value: 'low',
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'store_portscan_sense',
                                    valueField: 'val'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_sq',
                                    text: '예외 IP 설정'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '0 0 0 100',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'container',
                                    items: [
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
                                                    width: 100,
                                                    text: '추가',
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
                                                    text: '삭제',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onButtonClick4,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'gridpanel',
                                            height: 200,
                                            id: 'grid_src',
                                            margin: '5 0 0 0',
                                            width: 300,
                                            autoScroll: true,
                                            title: '',
                                            columnLines: true,
                                            enableColumnHide: false,
                                            enableColumnResize: false,
                                            sortableColumns: false,
                                            store: 'store_portscan_src',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    sortable: false,
                                                    dataIndex: 'name',
                                                    text: '출발지',
                                                    flex: 1
                                                }
                                            ],
                                            selModel: Ext.create('Ext.selection.CheckboxModel', {

                                            })
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 30',
                                    items: [
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
                                                    width: 100,
                                                    text: '추가',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onButtonClick1,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    margin: '0 0 0 5',
                                                    width: 100,
                                                    text: '삭제',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onButtonClick5,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'gridpanel',
                                            height: 200,
                                            id: 'grid_dest',
                                            margin: '5 0 0 0',
                                            width: 300,
                                            autoScroll: true,
                                            title: '',
                                            columnLines: true,
                                            enableColumnHide: false,
                                            enableColumnResize: false,
                                            sortableColumns: false,
                                            store: 'store_portscan_dest',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    sortable: false,
                                                    dataIndex: 'name',
                                                    text: '목적지',
                                                    flex: 1
                                                }
                                            ],
                                            selModel: Ext.create('Ext.selection.CheckboxModel', {

                                            })
                                        }
                                    ]
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
                                    width: 100,
                                    text: '확인',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick2,
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
                                            fn: me.onButtonClick3,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPanelAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onChk_portscanChange: function(field, newValue, oldValue, eOpts) {
        var con_port = Ext.getCmp("con_port");

        if(newValue === true){

            con_port.setDisabled(false);
        }else{

            con_port.setDisabled(true);
        }
    },

    onActionChange: function(field, newValue, oldValue, eOpts) {
        var blocktime = Ext.getCmp("blocktime");

        if(newValue === 1 || newValue === 6){

            blocktime.setDisabled(true);
        }else{

            blocktime.setDisabled(false);
        }
    },

    onBlocktimeErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "errorBox");
    },

    onBlocktimeKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onChk_allChange: function(field, newValue, oldValue, eOpts) {
        this.chk_protocol('all',newValue);

        /*var tcp = Ext.getCmp("chk_tcp");
        var udp = Ext.getCmp("chk_udp");
        var ip = Ext.getCmp("chk_ip");
        var icmp = Ext.getCmp("chk_icmp");

        if(newValue === true){

            tcp.setValue(true);
            udp.setValue(true);
            ip.setValue(true);
            icmp.setValue(true);
        }else{

            tcp.setValue(false);
            udp.setValue(false);
            ip.setValue(false);
            icmp.setValue(false);
        }*/
    },

    onChk_tcpChange: function(field, newValue, oldValue, eOpts) {
        this.chk_protocol('tcp',newValue);
    },

    onChk_udpChange: function(field, newValue, oldValue, eOpts) {
        this.chk_protocol('udp',newValue);
    },

    onChk_ipChange: function(field, newValue, oldValue, eOpts) {
        this.chk_protocol('ip',newValue);
    },

    onChk_icmpChange: function(field, newValue, oldValue, eOpts) {
        this.chk_protocol('icmp',newValue);
    },

    onButtonClick: function(button, e, eOpts) {
        var grid = Ext.getCmp("grid_src");

        if(grid.getStore().getCount() >= 40){

            Ext.Msg.alert("",ValidMaxCnt(40));
            return false;
        }

        var records = [];

        var _store = Ext.data.StoreManager.lookup("store_portscan_src");

        for(var i=0; i<_store.getCount(); i++){

            if(_store.data.items[i].data.cid !== ""){
                records[_store.data.items[i].data.cid] = _store.data.items[i].data.name;
            }
        }

        var win = Ext.create("NFW2.view.win_portscan_src",{
            src : records
        });
        win.show();
    },

    onButtonClick4: function(button, e, eOpts) {
        var grid = Ext.getCmp("grid_src");
        var grid_chk = grid.getSelectionModel().getSelection();

        var me = this;

        if(grid_chk.length === 0){
            Ext.Msg.alert("",get_msg("sel_del"));
            return false;
        }else{

            if(grid_chk.length === 1 && grid_chk[0].data.cid === ""){ return false; }

            Ext.MessageBox.confirm("",get_msg("conf_del"),function(btn){
                if(btn === "yes"){

                    var _store = Ext.data.StoreManager.lookup("store_portscan_src");

                    for(var i=0; i<grid_chk.length; i++){
                        if(grid_chk[i].data.cid)
                            _store.remove(grid_chk[i]);
                    }

                    if(_store.getCount() === 0){
                        _store.add({
                            'name': 'None',
                            'cid': ''
                        });
                    }
                }
            });
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var grid = Ext.getCmp("grid_dest");

        if(grid.getStore().getCount() >= 40){

            Ext.Msg.alert("",ValidMaxCnt(40));
            return false;
        }

        var records = [];

        var _store = Ext.data.StoreManager.lookup("store_portscan_dest");

        for(var i=0; i<_store.getCount(); i++){

            if(_store.data.items[i].data.cid !== ""){
                records[_store.data.items[i].data.cid] = _store.data.items[i].data.name;
            }
        }

        var win = Ext.create("NFW2.view.win_portscan_dest",{
            dest : records
        });
        win.show();
    },

    onButtonClick5: function(button, e, eOpts) {
        var grid = Ext.getCmp("grid_dest");
        var grid_chk = grid.getSelectionModel().getSelection();

        var me = this;

        if(grid_chk.length === 0){
            Ext.Msg.alert("",get_msg("sel_del"));
            return false;
        }else{

            if(grid_chk.length === 1 && grid_chk[0].data.cid === ""){ return false; }

            Ext.MessageBox.confirm("",get_msg("conf_del"),function(btn){
                if(btn === "yes"){

                    var _store = Ext.data.StoreManager.lookup("store_portscan_dest");

                    for(var i=0; i<grid_chk.length; i++){
                        if(grid_chk[i].data.cid)
                            _store.remove(grid_chk[i]);
                    }

                    if(_store.getCount() === 0){
                        _store.add({
                            'name': 'None',
                            'cid': ''
                        });
                    }

                }
            });
        }
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;

        var chk_portscan = Ext.getCmp("chk_portscan");
        var action = Ext.getCmp("action");
        var blocktime = Ext.getCmp("blocktime");

        var chk_all = Ext.getCmp("chk_all");
        var chk_tcp = Ext.getCmp("chk_tcp");
        var chk_udp = Ext.getCmp("chk_udp");
        var chk_ip = Ext.getCmp("chk_ip");
        var chk_icmp = Ext.getCmp("chk_icmp");

        var sense = Ext.getCmp("sense");

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

                if(blocktime.validateValue()===false){
                    blocktime.focus();
                    return false;
                }

                setting.block_time = blocktime.getValue();
            }

        }

        setting.sense_level = sense.getValue();

        if(chk_all.getValue()){

            setting.protocol = "all";
        }else{

            var ar_protocol = [];
            if(chk_tcp.getValue()){ ar_protocol.push('tcp'); }
            if(chk_udp.getValue()){ ar_protocol.push('udp'); }
            if(chk_ip.getValue()){ ar_protocol.push('ip'); }
            if(chk_icmp.getValue()){ ar_protocol.push('icmp'); }

            setting.protocol = ar_protocol.join(" ");
        }

        portscan.setting = setting;

        if(_store_src.getCount() === 1 && _store_src.data.items[0].data.cid === ""){

        }else{

            var scanner = [];

            for(var i=0; i<_store_src.getCount(); i++){

                var cid = _store_src.data.items[i].data.cid.split(":");
                scanner.push({
                    'obj_cid': cid[1]
                });
            }

            portscan.ignore_scanner = scanner;
        }

        if(_store_dest.getCount() === 1 && _store_dest.data.items[0].data.cid === ""){

        }else{

            var scanned = [];

            for(var l=0; l<_store_dest.getCount(); l++){

                var cid = _store_dest.data.items[l].data.cid.split(":");
                scanned.push({
                    'obj_cid': cid[1]
                });
            }

            portscan.ignore_scanned = scanned;
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
                Ext.Msg.alert("System Message - SUCESS",get_msg("msg_ok_add"));
            }
        );
    },

    onButtonClick3: function(button, e, eOpts) {
        this.init_ips_portscan();
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

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
                    'name': store.data.items[i].data.name
                };
            }

            me.obj = records;

            me.init_ips_portscan();
        });
    },

    chk_protocol: function(type, val) {
        var all = Ext.getCmp("chk_all");
        var tcp = Ext.getCmp("chk_tcp");
        var udp = Ext.getCmp("chk_udp");
        var ip = Ext.getCmp("chk_ip");
        var icmp = Ext.getCmp("chk_icmp");

        if(type === 'all'){

            if(val === true){

                tcp.setValue(true);
                udp.setValue(true);
                ip.setValue(true);
                icmp.setValue(true);
            }else{

                tcp.setValue(false);
                udp.setValue(false);
                ip.setValue(false);
                icmp.setValue(false);
            }
        }else{

            var tcp_v = tcp.getValue();
            var udp_v = udp.getValue();
            var ip_v = ip.getValue();
            var icmp_v = icmp.getValue();

            if(val === false){

                all.setValue(false);
                tcp.setValue(tcp_v);
                udp.setValue(udp_v);
                ip.setValue(ip_v);
                icmp.setValue(icmp_v);
            }else{

                if(tcp_v && udp_v && ip_v && icmp_v){
                    all.setValue(true);
                }
            }
        }
    },

    init_ips_portscan: function() {
        var me = this;

        var _store_src = Ext.data.StoreManager.lookup("store_portscan_src");
        var _store_dest = Ext.data.StoreManager.lookup("store_portscan_dest");

        var _params = {
            basename: Ext.encode("ips_portscan")
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){

                if(!response){
                    Ext.getCmp('fm').getForm().reset();

                    _store_src.loadData([{
                        'name': 'None',
                        'cid': ''
                    }]);

                    _store_dest.loadData([{
                        'name': 'None',
                        'cid': ''
                    }]);

                    return false;
                }

                var port = response.portscan_anomaly.portscan;

                if(port['@use'] === "on"){
                    Ext.getCmp("chk_portscan").setValue(true);
                    Ext.getCmp("action").setValue(port.setting.action_type);

                    if(port.setting.block_time){
                        Ext.getCmp("blocktime").setValue(port.setting.block_time);
                    }else{
                        Ext.getCmp("blocktime").reset();
                    }
                }else{
                    Ext.getCmp("action").reset();
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
                if(scanner){
                    var ar_src = [];

                    for(var j=0; j<scanner.length; j++){

                        ar_src.push(me.obj[scanner[j].obj_cid]);
                    }
                    _store_src.loadData(ar_src);
                }else{
                    _store_src.loadData([{
                        'name': 'None',
                        'cid': ''
                    }]);
                }

                var scanned = port.ignore_scanned;

                if(scanned){
                    var ar_dest = [];

                    for(var l=0; l<scanned.length; l++){

                        ar_dest.push(me.obj[scanned[l].obj_cid]);
                    }
                    _store_dest.loadData(ar_dest);
                }else{
                    _store_dest.loadData([{
                        'name': 'None',
                        'cid': ''
                    }]);
                }
            }
        );
    }

});