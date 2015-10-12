
Ext.define('NFW2.view.win_ipsecsa', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.Panel',
        'Ext.XTemplate',
        'Ext.form.Label',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.ComboBox',
        'Ext.Img',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.button.Button'
    ],

    id: 'win_ipsecsa',
    minHeight: 300,
    width: 730,
    autoScroll: true,
    title: 'IPSec SA 추가',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    id: 'fm_ipsecsa',
                    autoScroll: true,
                    layout: 'auto',
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'container',
                            width: 670,
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        if(!ValidNotKor(value)){ return get_msg('err_name'); }

                                        return true;
                                    },
                                    id: 'ips_name',
                                    width: 400,
                                    afterLabelTextTpl: [
                                        '{[required()]}'
                                    ],
                                    fieldLabel: '이름',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    labelWidth: 170,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 31,
                                    minLength: 1,
                                    listeners: {
                                        errorchange: {
                                            fn: me.onTextfieldErrorChange,
                                            scope: me
                                        },
                                        keydown: {
                                            fn: me.onTextfieldKeydown,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'errorBox',
                                    hidden: true,
                                    id: 'err_name',
                                    text: ''
                                }
                            ]
                        },
                        {
                            xtype: 'radiogroup',
                            id: 'ips_mode',
                            width: 400,
                            fieldLabel: '모드',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 170,
                            items: [
                                {
                                    xtype: 'radiofield',
                                    id: 'ips_tunnel',
                                    name: 'ips_mode',
                                    boxLabel: 'Tunnel',
                                    boxLabelCls: 'lb_box',
                                    checked: true,
                                    inputValue: 'tunnel'
                                },
                                {
                                    xtype: 'radiofield',
                                    id: 'ips_transport',
                                    name: 'ips_mode',
                                    boxLabel: 'Transport',
                                    boxLabelCls: 'lb_box',
                                    inputValue: 'transport'
                                }
                            ]
                        },
                        {
                            xtype: 'radiogroup',
                            id: 'ips_protocol',
                            width: 400,
                            fieldLabel: '암호 프로토콜',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 170,
                            items: [
                                {
                                    xtype: 'radiofield',
                                    id: 'ips_esp',
                                    name: 'ips_protocol',
                                    boxLabel: 'ESP',
                                    boxLabelCls: 'lb_box',
                                    checked: true,
                                    inputValue: 'esp'
                                },
                                {
                                    xtype: 'radiofield',
                                    id: 'ips_ah',
                                    name: 'ips_protocol',
                                    boxLabel: 'AH',
                                    boxLabelCls: 'lb_box',
                                    inputValue: 'ah'
                                }
                            ],
                            listeners: {
                                change: {
                                    fn: me.onIps_protocolChange,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            id: 'con_ips_enau',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'ips_encpt',
                                    afterLabelTextTpl: [
                                        '{[required()]}'
                                    ],
                                    fieldLabel: '알고리즘',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    labelWidth: 170,
                                    value: 'aes128',
                                    editable: false,
                                    displayField: 'name',
                                    forceSelection: true,
                                    queryMode: 'local',
                                    store: 'store_ipsec_encpt',
                                    valueField: 'val',
                                    listeners: {
                                        change: {
                                            fn: me.onIps_encptChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'ips_encpt_text',
                                    padding: '0 0 0 5',
                                    listeners: {
                                        afterrender: {
                                            fn: me.onIps_encpt_textAfterRender,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    margin: '3 5 0 5',
                                    text: '-'
                                },
                                {
                                    xtype: 'combobox',
                                    id: 'ips_auth',
                                    width: 145,
                                    value: 'sha1',
                                    editable: false,
                                    displayField: 'name',
                                    forceSelection: true,
                                    queryMode: 'local',
                                    store: 'store_ipsec_auth',
                                    valueField: 'val'
                                },
                                {
                                    xtype: 'image',
                                    margin: '-4 0 0 0',
                                    src: '../images/b_insert.gif',
                                    listeners: {
                                        render: {
                                            fn: me.onImageRender4,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            hidden: true,
                            id: 'con_ips_enau_obj',
                            margin: '0 0 5 175',
                            width: 400,
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_ips_enau',
                                    width: 310,
                                    hideHeaders: true,
                                    store: 'store_enau_obj',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'name',
                                            text: 'String',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            width: 50,
                                            align: 'center',
                                            items: [
                                                {
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                        Ext.getCmp("grid_ips_enau").getStore().removeAt(rowIndex);

                                                        if(Ext.getCmp("grid_ips_enau").getStore().data.length === 0){
                                                            Ext.getCmp("con_ips_enau_obj").hide();
                                                        }
                                                    },
                                                    icon: '../images/b_close.gif'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'combobox',
                            hidden: true,
                            id: 'ips_encpt_cc',
                            fieldLabel: '암호 알고리즘',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 170,
                            value: '3des',
                            editable: false,
                            displayField: 'name',
                            forceSelection: true,
                            queryMode: 'local',
                            store: 'store_ipsec_encpt',
                            valueField: 'val'
                        },
                        {
                            xtype: 'combobox',
                            hidden: true,
                            id: 'ips_auth_cc',
                            fieldLabel: '인증 알고리즘',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 170,
                            value: 'sha1',
                            editable: false,
                            displayField: 'name',
                            forceSelection: true,
                            queryMode: 'local',
                            store: 'store_ipsec_auth',
                            valueField: 'val'
                        },
                        {
                            xtype: 'combobox',
                            id: 'ips_lifetime',
                            fieldLabel: '유효시간',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 170,
                            value: '8',
                            editable: false,
                            displayField: 'val',
                            store: 'store_ipsec_lifetime',
                            valueField: 'val'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'ips_pfs',
                            fieldLabel: 'Perfect Forward Security',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 170,
                            boxLabel: '',
                            listeners: {
                                change: {
                                    fn: me.onIps_pfsChange,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            disabled: true,
                            id: 'ips_pfsgroup',
                            fieldLabel: '키 교환 그룹',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 170,
                            value: 'modp1024',
                            editable: false,
                            displayField: 'name',
                            forceSelection: true,
                            queryMode: 'local',
                            store: 'store_ipsec_pfs',
                            valueField: 'val'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'reply_prot',
                            fieldLabel: 'Reply Protection',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 170,
                            boxLabel: ''
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'ips_others',
                            fieldLabel: '타사 연동',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 170,
                            boxLabel: '',
                            listeners: {
                                change: {
                                    fn: me.onIps_othersChange,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            height: 60,
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_unother',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            id: 'ips_sechost',
                                            width: 400,
                                            afterLabelTextTpl: [
                                                '{[required()]}'
                                            ],
                                            fieldLabel: '로컬 보안 호스트',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            labelWidth: 170,
                                            emptyText: 'Select',
                                            editable: false,
                                            displayField: 'name',
                                            queryMode: 'local',
                                            store: 'store_ipsec_sechost',
                                            valueField: 'cid',
                                            listeners: {
                                                change: {
                                                    fn: me.onIps_sechostChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            id: 'hub_net',
                                            width: 400,
                                            afterLabelTextTpl: [
                                                '{[required()]}'
                                            ],
                                            fieldLabel: '원격 보안 호스트',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            labelWidth: 170,
                                            emptyText: 'Select',
                                            editable: false,
                                            displayField: 'name',
                                            queryMode: 'local',
                                            store: 'store_ipsec_sechost',
                                            valueField: 'cid',
                                            listeners: {
                                                change: {
                                                    fn: me.onHub_netChange,
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
                            height: 20,
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'errorBox',
                                    hidden: true,
                                    id: 'err_null',
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
                                            fn: me.onIps_addClick,
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
                                            fn: me.onButtonClick,
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
                    fn: me.onWindowAfterRender,
                    scope: me
                },
                close: {
                    fn: me.onWindowClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onTextfieldErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "err_name");
    },

    onTextfieldKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(code === 32){
            e.stopEvent();
        }
    },

    onIps_protocolChange: function(field, newValue, oldValue, eOpts) {
        var val = Ext.getCmp("ips_protocol").getValue();
        var encpt = Ext.getCmp("ips_encpt");
        var _store = Ext.data.StoreManager.lookup("store_ipsec_auth");

        if(val.ips_protocol === "ah"){
            encpt.setDisabled(true);

            _store.add(
                { 'name':'AES128GMAC', 'val':'aes128gmac' },
                { 'name':'AES192GMAC', 'val':'aes192gmac' },
                { 'name':'AES256GMAC', 'val':'aes256gmac' }
            );
        }else{
            encpt.setDisabled(false);

            _store.removeAt(7,3);
        }
    },

    onIps_encptChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === null){ return false; }

        if(newValue === "text"){
            Ext.getCmp("ips_encpt_text").show();
        }else{
            Ext.getCmp("ips_encpt_text").hide();
        }
    },

    onIps_encpt_textAfterRender: function(component, eOpts) {
        component.hide();
    },

    onImageRender4: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var encpt = Ext.getCmp("ips_encpt").getValue();
            var auth = Ext.getCmp("ips_auth").getValue();

            var grid_enau = Ext.getCmp("grid_ips_enau").getStore().data;

            if(grid_enau.length >= 4){
                Ext.Msg.alert("",ValidMaxCnt('4'));
                return false;
            }

            if(encpt === "text"){

                var text = Ext.getCmp("ips_encpt_text");
                if(text.getValue() === ""){
                    prt_errMsg(get_msg('err_null'),'err_null');
                    text.focus();
                    return false;
                }

                var a_text = ['neat','nes'];
                var n = 0;

                for(var l=0; l<a_text.length; l++){
                    if(a_text[l] === text.getValue().toLowerCase()){
                        n = 1;
                        break;
                    }
                }
                if(n === 0){
                    prt_errMsg(get_msg('err_algorism'),'err_null');
                    text.focus();
                    return false;
                }
                encpt = text.getValue();
            }

            Ext.getCmp("con_ips_enau_obj").show();

            for(var i=0; i<grid_enau.length; i++){

                var val = grid_enau.items[i].data.val.split("-");
                if(val[0] === encpt && val[1] === auth){
                    return false;
                }
            }

            var obj = {
                'name': encpt.toUpperCase()+'-'+auth.toUpperCase(),
                'val': encpt+'-'+auth
            };

            var _store = Ext.data.StoreManager.lookup("store_enau_obj");
            _store.add(obj);

        }, component);
    },

    onIps_pfsChange: function(field, newValue, oldValue, eOpts) {
        var pfsgroup = Ext.getCmp("ips_pfsgroup");

        if(newValue === true){
            pfsgroup.setDisabled(false);
        }else{
            pfsgroup.setDisabled(true);
        }
    },

    onIps_othersChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        var ips_sechost = Ext.getCmp("ips_sechost");
        var hub_net = Ext.getCmp("hub_net");
    },

    onIps_sechostChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === ""){
            field.setValue(oldValue);
        }else if(newValue === "select"){
            field.reset();
        }
    },

    onHub_netChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === ""){
            field.setValue(oldValue);
        }else if(newValue === "select"){
            field.reset();
        }
    },

    onIps_addClick: function(button, e, eOpts) {
        var me = this;

        var name = Ext.getCmp("ips_name");
        var mode = Ext.getCmp("ips_mode");
        var protocol = Ext.getCmp("ips_protocol");
        var encpt = (me.cc===true)?Ext.getCmp("ips_encpt_cc"):Ext.getCmp("ips_encpt");
        var auth = (me.cc===true)?Ext.getCmp("ips_auth_cc"):Ext.getCmp("ips_auth");
        var lifetime = Ext.getCmp("ips_lifetime");
        var pfs = Ext.getCmp("ips_pfs");
        var pfsgroup = Ext.getCmp("ips_pfsgroup");
        var others = Ext.getCmp("ips_others");
        var sechost = Ext.getCmp("ips_sechost");
        var reply_prot = Ext.getCmp("reply_prot");
        var hub_net = Ext.getCmp("hub_net");

        if(name.validateValue()===false){ name.focus(); return false; }

        var mem_cid = Ext.getCmp("NFW2_ipsec_security_securityConf").mem_cid;

        var sec_cid = sechost.getValue();
        if(sec_cid === null || sec_cid === ""){
            prt_errMsg(get_msg('err_null'), "err_null"); sechost.focus(); return false;
        }
        var hub_cid = hub_net.getValue();
        if(hub_cid === null || hub_cid === ""){
            prt_errMsg(get_msg('err_null'), "err_null"); hub_net.focus(); return false;
        }

        Ext.getCmp("err_null").hide();

        var obj = {};

        obj.name = name.getValue();
        obj.mode = mode.getValue().ips_mode;
        obj.protocol = protocol.getValue().ips_protocol;
        obj.lifetime = lifetime.getValue();
        obj.reply_prot = (reply_prot.getValue())?"on":"off";
        obj.pfs = (pfs.getValue())?"yes":"no";
        if(pfs.getValue()){

            obj.pfsgroup = pfsgroup.getValue();
        }
        obj.others = (others.getValue())?"yes":"no";

        obj.sechost = sechost.getValue();

        if(sechost.getValue()!==null){
            obj.sechost_kind = mem_cid[sechost.getValue()].kind;
        }
        obj.hub_net = hub_net.getValue();

        if(me.cc === true){
            obj.encpt = encpt.getValue();
            obj.auth = auth.getValue();
        }else{

            var grid_enau = Ext.getCmp("grid_ips_enau").getStore().data;

            if(grid_enau.length === 0){
                prt_errMsg(get_msg('err_null'),'err_null');
                encpt.focus();
                return false;
            }else{
                var ar_enau = [];

                for(var i=0; i<grid_enau.length; i++){
                    ar_enau.push(grid_enau.items[i].data.val);
                }
                obj.algorithm = ar_enau;
            }
        }

        if(me.edit === "edit"){
            obj['@cid'] = me.cid;
        }

        me.obj = obj;


        me.set_ipsec_security();
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;

        var NFW2 = Ext.getCmp("NFW2_ipsec_security_securityConf");
        me.cc = NFW2.cc;
        var _store = Ext.data.StoreManager.lookup("store_ipsec_auth");

        _store.loadData(NFW2.auth);

        if(me.cc === true){
            Ext.getCmp("ips_ah").hide();
            _store.removeAt(0,2);

            Ext.getCmp("con_ips_enau").hide();
            Ext.getCmp("ips_encpt_cc").show();
            Ext.getCmp("ips_auth_cc").show();

            Ext.getCmp("ips_encpt_cc").setValue('seed');
            Ext.getCmp("ips_auth_cc").setValue('sha256');
            Ext.getCmp("ips_pfsgroup").setValue('modp2048');
        }else{
            Ext.getCmp("ips_auth").setValue('sha1');
        }

        if(me.edit === "edit"){
            me.init_ipsec_security();
        }
    },

    onWindowClose: function(panel, eOpts) {
        Ext.data.StoreManager.lookup("store_ipsec_auth").removeAll();
        Ext.data.StoreManager.lookup("store_enau_obj").removeAll();
    },

    set_ipsec_security: function() {
        var me = this;

        var obj = me.obj;

        var update = (me.edit==="edit")?true:false;

        var _params = {
            basename : Ext.encode("vpn_ipsecsa"),
            obj : Ext.encode(obj),
            id_info : Ext.encode({'fieldname':'@cid'}),
            num_info : Ext.encode({'fieldname':'@num'}),
            update : Ext.encode(update)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObjectWithCid',
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

                var win = Ext.getCmp("NFW2_ipsec_security_securityConf");
                win.get_securityConf();
            }
        );

        function setWinState(btn){
            if(btn==="no"){
                var win = Ext.WindowManager.getActive();
                if (win) {
                    win.close();
                }
            }else{
                Ext.getCmp("fm_ipsecsa").getForm().reset();
                if(me.cc === true){
                    Ext.getCmp("ips_encpt_cc").setValue('seed');
                    Ext.getCmp("ips_auth_cc").setValue('sha256');
                    Ext.getCmp("ips_pfsgroup").setValue('modp2048');
                }
                Ext.ComponentQuery.query('label[cls="errorBox"]').forEach(function(cls){ cls.hide(); });
                Ext.data.StoreManager.lookup("store_enau_obj").removeAll();
                Ext.getCmp("con_ips_enau_obj").hide();
            }
        }
    },

    init_ipsec_security: function() {
        var me = this;

        me.setTitle("IPSec SA 수정 - "+me.num);

        var _params = {
            basename : Ext.encode("with_cid"),
            key : Ext.encode({'@cid':me.cid})
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(data){
                Ext.getCmp("ips_name").setValue(data.name);
                if(data.mode === "tunnel"){
                    Ext.getCmp("ips_tunnel").setValue(true);
                }else{
                    Ext.getCmp("ips_transport").setValue(true);
                }

                if(data.protocol === "esp"){
                    Ext.getCmp("ips_esp").setValue(true);
                }else{
                    Ext.getCmp("ips_ah").setValue(true);
                }

                if(me.cc === true){
                    Ext.getCmp("ips_encpt_cc").setValue(data.encpt);
                    Ext.getCmp("ips_auth_cc").setValue(data.auth);
                }else{
                    var _store_enau = Ext.data.StoreManager.lookup("store_enau_obj");
                    Ext.getCmp("con_ips_enau_obj").show();

                    for(var i=0; i<data.algorithm.length; i++){
                        var obj = {
                            'name': data.algorithm[i].toUpperCase(),
                            'val': data.algorithm[i]
                        };
                        _store_enau.add(obj);
                    }
                }
                Ext.getCmp("ips_lifetime").setValue(data.lifetime);

                if(data.reply_prot === "on"){
                    Ext.getCmp("reply_prot").setValue(true);
                }

                if(data.pfs === "yes"){
                    Ext.getCmp("ips_pfs").setValue(true);
                    Ext.getCmp("ips_pfsgroup").setValue(data.pfsgroup);
                }

                if(data.others === "yes"){
                    Ext.getCmp("ips_others").setValue(true);
                    Ext.getCmp("ips_sechost").setFieldLabel("로컬 보안 호스트");
                    Ext.getCmp("hub_net").setFieldLabel("원격 보안 호스트");
                }
                Ext.getCmp("ips_sechost").setValue(data.sechost);
                Ext.getCmp("hub_net").setValue(data.hub_net);

            }
        );
    }

});