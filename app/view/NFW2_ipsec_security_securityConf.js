
Ext.define('NFW2.view.NFW2_ipsec_security_securityConf', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_ipsec_security_securityconf',

    requires: [
        'NFW2.view.NFW2_ipsec_security_securityConfViewModel',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging'
    ],

    config: {
        obj_d: {
            data: ''
        }
    },

    viewModel: {
        type: 'nfw2_ipsec_security_securityconf'
    },
    cls: 'zen_body',
    id: 'NFW2_ipsec_security_securityConf',
    defaultListenerScope: true,

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            cls: 'zen_toolbar',
            items: [
                {
                    xtype: 'button',
                    iconCls: 'ic_add',
                    bind: {
                        text: '{add}'
                    },
                    listeners: {
                        click: 'onButtonClick'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'ic_del',
                    bind: {
                        text: '{del}'
                    },
                    listeners: {
                        click: 'onButtonClick2'
                    }
                },
                {
                    xtype: 'button',
                    bind: {
                        text: '{copy}'
                    },
                    listeners: {
                        click: 'onButtonClick21'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'gridpanel',
                        id: 'grid_ipsec',
                        margin: '5 0 0 0',
                        title: '',
                        columnLines: true,
                        store: 'store_security_ipsecsa_list',
                        columns: [
                            {
                                xtype: 'gridcolumn',
                                width: 60,
                                align: 'center',
                                dataIndex: '_num',
                                text: 'N'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'name',
                                flex: 1,
                                bind: {
                                    text: '{name}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var me = Ext.getCmp("NFW2_ipsec_security_securityConf");

                                    var data = [];

                                    var ver = (value==='ikev1')?'IKEv1':"IKEv2";
                                    if(value === 'ikev1'){
                                        var mode = (record.data.isa_mode==='main')?'Main':'Aggressive';
                                        ver += '('+mode+')';
                                    }
                                    data.push(ver);

                                    var action = (record.data.action==='initiator')?'Initiator':'Responder';
                                    data.push(action);

                                    var authby = (record.data.authby==='psk')?'Preshared Key':'Certificate';
                                    if(record.data.authby !== 'psk'){
                                        authby += '('+record.data.cert_name+')';
                                    }
                                    data.push(authby);

                                    var ips_mode = (record.data.ips_mode==='tunnel')?'Tunnel':'Transport';
                                    data.push(ips_mode);
                                    data.push(record.data.protocol.toUpperCase());

                                    return data.join(" / ");
                                },
                                dataIndex: 'ver',
                                flex: 2,
                                bind: {
                                    text: '{set}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var me = this;

                                    var mem_cid = Ext.getCmp("NFW2_ipsec_security_securityConf").mem_cid;

                                    var data = [];

                                    if(value==='on'){
                                        data.push("ForceEncaps");
                                    }

                                    if(record.data.reply_prot==='on'){
                                        data.push("Reply protection");
                                    }

                                    if(record.data.Xauth_serv!=='unused'){
                                        data.push('XAuth('+record.data.Xauth_serv.substring(0,1).toUpperCase()+record.data.Xauth_serv.substring(1)+')');
                                    }

                                    return data.join(" / ");
                                },
                                dataIndex: 'force_natt',
                                flex: 1,
                                bind: {
                                    text: '{etc}'
                                }
                            }
                        ],
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                            selType: 'checkboxmodel'
                        }),
                        dockedItems: [
                            {
                                xtype: 'pagingtoolbar',
                                dock: 'bottom',
                                width: 360,
                                displayInfo: true,
                                store: 'store_security_ipsecsa_list'
                            }
                        ],
                        listeners: {
                            celldblclick: 'onGrid_ipsecCellDblClick'
                        }
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    onButtonClick: function(button, e, eOpts) {
        var grid = Ext.getCmp("grid_ipsec");

        if(grid.getStore().data.length >= 128){
            Ext.Msg.alert(__weguardia,Valid_max_cnt(128));
            return false;
        }

        var win = Ext.create('NFW2.view.win_ipsec');
        win.show();
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;

        var grid = Ext.getCmp("grid_ipsec");
        var grid_chk = grid.getSelectionModel().getSelection();

        var use_ipsecsa = me.use_ipsecsa;

        if(grid_chk.length === 0){
            Ext.Msg.alert(__weguardia,get_msg("sel_del"));
            return false;
        }

        Ext.MessageBox.confirm(__weguardia,get_msg("conf_del"),function(btn){
            if(btn === "yes"){
                var del = [];
                for(var i=0; i<grid_chk.length; i++){

                    del.push(grid_chk[i].data['_id']);
                }

                var _params = {

                    basename : Ext.encode("vpn_ipsecsa"),
                    ids : Ext.encode(del),
                    renum_info : Ext.encode({'fieldname':'_num'})
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'delListTypeObj',
                    _params,
                    function(response){

                        if(response.fail_total > 0){
                            console.log(response);
                            var ar_use = [];
                            for(var i in response.fail_list){
                                if(response.fail_list[i].reason === "in_use")
                                    ar_use.push(response.fail_list[i].name);
                            }
                            var in_use = ar_use.join(" , ");
                            Ext.Msg.alert(__weguardia,get_msg('err_objdel')+in_use);
                        }

                        me.get_securityConf();
                    }
                );
            }
        });
    },

    onButtonClick21: function(button, e, eOpts) {
        var me = this;

        var grid = Ext.getCmp("grid_ipsec");
        var grid_chk = grid.getSelectionModel().getSelection();

        var use_ipsecsa = me.use_ipsecsa;

        if(grid_chk.length === 0){
            Ext.Msg.alert(__weguardia,get_msg("sel_copy"));
            return false;
        }

        Ext.MessageBox.confirm(__weguardia,get_msg("conf_copy"),function(btn){
            if(btn === "yes"){
                var copy = [];
                for(var i=0; i<grid_chk.length; i++){

                    copy.push(grid_chk[i].data['_num']);
                }

                var _params = {

                    basename : Ext.encode("vpn_ipsecsa"),
                    id_info : Ext.encode({'fieldname':'_num', 'values':copy}),
                    num_info : Ext.encode({'fieldname':'_num'}),
                    cpname_suffix: Ext.encode('-Copy')
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'copyListTypeObj',
                    _params,
                    function(response){

                        me.get_securityConf();
                    }
                );
            }
        });
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        Ext.data.StoreManager.lookup("store_isakmp_cert").load();

        var records = [];

        var _params = {
            basename: Ext.encode('object_ip_address'),
            limit: Ext.encode(null)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjectList',
            _params,
            function(response){
                var records_v4 = [];

                records.push({
                    'name': '--------------IPv4--------------'
                });

                records_v4.push({
                    'name': '--------------IPv4--------------'
                });

                var mem_name = [];
                var mem_cid = [];

                if(response){

                    for(var i in response.list){

                        var ip = response.list[i].ip;
                        var cnt = ip.split(",");

                        records.push({
                            'cid': response.list[i]['@cid'],
                            'name': response.list[i].name,
                            'cnt' : cnt.length
                        });

                        records_v4.push({
                            'cid': response.list[i]['@cid'],
                            'name': response.list[i].name,
                            'cnt' : cnt.length
                        });

                        mem_name[response.list[i].name] = cnt.length;
                        mem_cid[response.list[i]['@cid']] = {
                            'cnt': cnt.length,
                            'name': response.list[i].name,
                            'kind': 'object_ip_address'
                        };
                    }
                }
                me.mem_name = mem_name;

                records.push({
                    'name': '----------IPv4 Group----------'
                });

                records_v4.push({
                    'name': '----------IPv4 Group----------'
                });

                var _params = {
                    basename: Ext.encode('object_ip_group'),
                    limit: Ext.encode(null)
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'getObjectList',
                    _params,
                    function(response){

                        if(response){
                            for(var i in response.list){

                                var mem = response.list[i].member_name;
                                var ar_mem = mem.split(",");
                                var m_cnt = 0;
                                var mem_name = me.mem_name;

                                for(var l in ar_mem){

                                    m_cnt = m_cnt + Number(mem_name[ar_mem[l]]);
                                }

                                records.push({
                                    'cid': response.list[i]['@cid'],
                                    'name': response.list[i].name,
                                    'cnt': m_cnt
                                });

                                records_v4.push({
                                    'cid': response.list[i]['@cid'],
                                    'name': response.list[i].name,
                                    'cnt': m_cnt
                                });

                                mem_cid[response.list[i]['@cid']] = {
                                    'cnt': m_cnt,
                                    'name': response.list[i].name,
                                    'kind': 'object_ip_group'
                                };
                            }
                        }

                        me.mem_cid = mem_cid;
                        me.mem_v4 = records_v4;
                        var records_v6 = [];

                        records.push({
                            'name': '--------------IPv6--------------'
                        });

                        records_v6.push({
                            'name': '--------------IPv6--------------'
                        });

                        var _params = {
                            basename: Ext.encode('object_ipv6_address'),
                            limit: Ext.encode(null)
                        };

                        request_helper.xmlrpc_call_JsonP(
                            'ftuctrl',
                            'getObjectList',
                            _params,
                            function(response){
                                if(response){
                                    for(var i in response.list){

                                        var ip = response.list[i].ip;
                                        var cnt = ip.split(",");

                                        records.push({
                                            'cid': response.list[i]['@cid'],
                                            'name': response.list[i].name,
                                            'cnt' : cnt.length
                                        });

                                        records_v6.push({
                                            'cid': response.list[i]['@cid'],
                                            'name': response.list[i].name,
                                            'cnt' : cnt.length
                                        });

                                        mem_cid[response.list[i]['@cid']] = {
                                            'cnt': cnt.length,
                                            'name': response.list[i].name,
                                            'kind': 'object_ipv6_address'
                                        };
                                    }
                                }
                                me.mem_cid = mem_cid;

                                records.push({
                                    'name': '----------IPv6 Group----------'
                                });

                                records_v6.push({
                                    'name': '----------IPv6 Group----------'
                                });

                                var _params = {
                                    basename: Ext.encode('object_ipv6_group'),
                                    limit: Ext.encode(null)
                                };

                                request_helper.xmlrpc_call_JsonP(
                                    'ftuctrl',
                                    'getObjectList',
                                    _params,
                                    function(response){

                                        if(response){
                                            for(var i in response.list){

                                                records.push({
                                                    'cid': response.list[i]['@cid'],
                                                    'name': response.list[i].name,
                                                });

                                                records_v6.push({
                                                    'cid': response.list[i]['@cid'],
                                                    'name': response.list[i].name,
                                                });

                                                mem_cid[response.list[i]['@cid']] = {
                                                    'name': response.list[i].name,
                                                    'kind': 'object_ipv6_group'
                                                };
                                            }
                                        }
                                        me.mem_cid = mem_cid;
                                        me.mem_v6 = records_v6;

                                        var _store = Ext.data.StoreManager.lookup("store_ipsec_sechost");
                                        _store.loadData(records);
                                        me.get_securityConf();
                                    });

                            }
                        );
                    }
                );
            }
        );

        var record = [];

        var _param = {
            option: Ext.encode('all')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_pname_list',
            _param,
            function(response){

                if(response){
                    for(var i in response){
                        record.push({
                            name: response[i].name
                        });
                    }
                }
                var _params = {
                    if_type : Ext.encode('bridge'),
                    data_type : Ext.encode('name'),
                    option : Ext.encode('used')
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'get_lname_list',
                    _params,
                    function(response){
                        if(response){
                            for(var l in response){
                                record.push({
                                    name: response[l].name
                                });
                            }
                        }
                        var _params = {
                            if_type : Ext.encode('bonding'),
                            data_type : Ext.encode('name'),
                            option : Ext.encode('used')
                        };

                        request_helper.xmlrpc_call_JsonP(
                            'ftuctrl',
                            'get_lname_list',
                            _params,
                            function(response){
                                if(response){
                                    for(var j in response){
                                        record.push({
                                            name: response[j].name
                                        });
                                    }
                                }

                                Ext.data.StoreManager.lookup('store_interface').loadData(record);
                            }
                        );
                    }
                );
            }
        );
    },

    onGrid_ipsecCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('NFW2.view.win_ipsec',{
            edit : "edit",
            record: record.data
        });
        win.show();
    },

    get_securityConf: function() {
        var me = this;

        var _store_ips = Ext.data.StoreManager.lookup('store_security_ipsecsa_list');
        _store_ips.getProxy().setExtraParam('basename',Ext.encode("vpn_ipsecsa"));
        _store_ips.getProxy().setExtraParam('sort_list',Ext.encode([['@num',1]]));
        _store_ips.currentPage = 1;
        _store_ips.load(function(){
            hideLoadMask();
            setTimeout(function(){ me.setWidth('100%'); },100);
        });
    }

});