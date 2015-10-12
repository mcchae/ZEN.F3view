
Ext.define('NFW2.view.NFW2_system_admin_adminConfig', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_system_admin_adminconfig',

    requires: [
        'NFW2.view.NFW2_system_admin_adminConfigViewModel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.selection.CheckboxModel'
    ],

    config: {
        obj_d: {
            root: '',
            sub: ''
        },
        limitCount: 5
    },

    viewModel: {
        type: 'nfw2_system_admin_adminconfig'
    },
    cls: 'zen_body',
    id: 'NFW2_system_admin_adminConfig',
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
                        click: 'onButtonClick1'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onViewportAfterRender'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'gridpanel',
                        id: 'grid_users',
                        margin: '5 0 0 0',
                        columnLines: true,
                        store: 'store_usersList',
                        columns: [
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    return rowIndex+1;
                                },
                                width: 60,
                                align: 'center',
                                text: 'N'
                            },
                            {
                                xtype: 'gridcolumn',
                                hidden: true,
                                dataIndex: 'role',
                                bind: {
                                    text: '{section}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style += 'height:26px;';

                                    var de = (record.data.is_denied)?'<img src="../../images/user_lock.jpg"/> ':'';

                                    if(record.data.role === 'Super'){
                                        return de+value+'<img src="../../images/dot_super.gif"/>';
                                    }else{
                                        return de+value;
                                    }
                                },
                                dataIndex: 'id',
                                flex: 1,
                                bind: {
                                    text: '{id}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'email',
                                flex: 1,
                                bind: {
                                    text: '{e_mail}'
                                }
                            },
                            {
                                xtype: 'actioncolumn',
                                id: 'grid_column_mail',
                                align: 'center',
                                dataIndex: 'email_check',
                                flex: 0.9,
                                bind: {
                                    text: '{receiving_log_alarm_mail}'
                                },
                                items: [
                                    {
                                        getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                            return (r.get('email_check') === 'on')? "b_on":"b_off";
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'gridcolumn',
                                bind: {
                                    text: '{access_authority}'
                                },
                                columns: [
                                    {
                                        xtype: 'actioncolumn',
                                        align: 'center',
                                        dataIndex: 'config',
                                        flex: 1,
                                        bind: {
                                            text: '{set}'
                                        },
                                        items: [
                                            {
                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                    return (r.get('config') === 'on')? "b_on":"b_off";
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        align: 'center',
                                        dataIndex: 'log',
                                        flex: 1,
                                        bind: {
                                            text: '{log}'
                                        },
                                        items: [
                                            {
                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                    return (r.get('log') === 'on')? "b_on":"b_off";
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        align: 'center',
                                        dataIndex: 'monitor',
                                        flex: 1,
                                        bind: {
                                            text: '{monitor}'
                                        },
                                        items: [
                                            {
                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                    return (r.get('monitor') === 'on')? "b_on":"b_off";
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'tel',
                                flex: 1,
                                bind: {
                                    text: '{contact_num}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: '_pass_limit_days_ts',
                                flex: 1,
                                bind: {
                                    text: '{pwd_period}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                id: 'grid_column_host',
                                dataIndex: 'host',
                                flex: 3,
                                bind: {
                                    text: '{trusted_network}'
                                }
                            },
                            {
                                xtype: 'actioncolumn',
                                align: 'center',
                                dataIndex: 'otp',
                                text: 'OTP',
                                items: [
                                    {
                                        getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                            return (r.get('otp') === 'true')? "b_on":"b_off";
                                        }
                                    }
                                ]
                            }
                        ],
                        listeners: {
                            celldblclick: 'onGrid_usersCellDblClick'
                        },
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                            selType: 'checkboxmodel'
                        })
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    onButtonClick: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_admin_config');
        win.show();
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var grid_chk = Ext.getCmp('grid_users').getSelectionModel().getSelection();

        Ext.MessageBox.confirm(__weguardia,get_msg('conf_del'),function(btn){

            if(btn === "yes"){

                for(var i in grid_chk){
                    if(grid_chk[i].data.role === 'Super'){
                        Ext.MessageBox.alert(__weguardia, get_msg('err_super_admin'));
                        continue;
                    }else{

                        var _params = {
                            userid : Ext.encode(grid_chk[i].data.id)
                        };

                        request_helper.xmlrpc_call_JsonP(
                            'ftuctrl',
                            'delUser',
                            _params,
                            function(response){
                                me.getUsersList();
                            }
                        );
                    }
                }
            }else{
                return false;
            }
        });
    },

    onGrid_usersCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;

        var win = Ext.create('NFW2.view.win_admin_config',{
            edit : "edit",
            num: rowIndex+1
        });

        win.obj_d.data = record.data;

        win.show();
    },

    onViewportAfterRender: function(component, eOpts) {
        var me = this;

        me.getUsersList();

        Ext.suspendLayouts();

        me.limitCount = 5;

        Ext.resumeLayouts(true);


    },

    getUsersList: function() {
        var me = this;

        var _params = {
            basename : Ext.encode('mgtable_users'),
            cond: Ext.encode({"del_check":{$ne:true}})
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _params,
            function(response){

                hideLoadMask();
                me.obj_d.root = response;

                var records = [];

                for(var i in response.list){

                    var _config = "off";

                    var _log = "off";

                    var _monitor = "off";

                    var _trusted_hosts = "";

                    var _id = response.list[i].userid;

                    var _role = "";

                    var _email_check = "off";

                    if(response.list[i].role === 1){

                        _role = "Super";

                    }else{

                        _role = "Admin";
                    }


                    var _authorization = response.list[i].authorization;

                    if(_authorization === 7){

                        _config = "on";

                        _log = "on";

                        _monitor = "on";

                    }else if(_authorization === 5){

                        _config = "on";

                        _monitor = "on";

                    }else if(_authorization === 3){

                        _log = "on";

                        _monitor = "on";
                    }else if(_authorization === 2){

                        _log = "on";

                    }else if(_authorization === 1){

                        _monitor = "on";

                    }

                    if(response.list[i].email_check === undefined || response.list[i].email_check === false){

                        _email_check = "off";

                    }else{

                        _email_check = "on";
                    }

                    var _otp = "";

                    if(response.list[i].otp_check === undefined || response.list[i].otp_check === false){

                        _otp = "false";


                    }else{

                        _otp = "true";

                    }

                    if(response.list[i].trusted_hosts.length > 0){

                        for(var k = 0; k < response.list[i].trusted_hosts.length; k++){


                            if(parseInt(k) === parseInt(response.list[i].trusted_hosts.length)-parseInt(1)){

                                _trusted_hosts = _trusted_hosts + response.list[i].trusted_hosts[k];

                            }else{

                                _trusted_hosts = _trusted_hosts + response.list[i].trusted_hosts[k] + ",";

                            }


                        }
                    }

                    records.push({

                        id : _id,
                        pwExpiryDate : response.list[i].pass_days,
                        tel : response.list[i].phone,
                        email : response.list[i].email,
                        email_check : _email_check,
                        config : _config,
                        log : _log,
                        monitor : _monitor,
                        host : _trusted_hosts,
                        role : _role,
                        otp : _otp,
                        md_passwd : response.list[i].md_passwd,
                        is_denied : response.list[i].is_denied,
                        //pass_days: response.list[i].pass_days
                        _pass_limit_days_ts : (response.list[i]._pass_limit_days_ts)?unixTimeConvert(response.list[i]._pass_limit_days_ts,'YMD',''):''

                    });

                }

                var store = Ext.data.StoreManager.lookup('store_usersList');

                store.loadData(records);
            }
        );
    }

});