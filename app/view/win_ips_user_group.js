
Ext.define('NFW2.view.win_ips_user_group', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ips_user_group',

    requires: [
        'NFW2.view.win_ips_user_groupViewModel',
        'Ext.form.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel'
    ],

    viewModel: {
        type: 'win_ips_user_group'
    },
    cls: 'zen_win',
    id: 'win_ips_user_group',
    resizable: false,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'fm_user_group',
            bodyPadding: 10,
            titleCollapse: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    id: 'btn_add',
                    items: [
                        {
                            xtype: 'toolbar',
                            cls: 'zen_toolbar',
                            items: [
                                {
                                    xtype: 'button',
                                    iconCls: 'ic_add',
                                    bind: {
                                        text: '{add}'
                                    },
                                    listeners: {
                                        click: 'onButtonClick',
                                        blur: 'onButtonBlur1'
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
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    hidden: true,
                    margin: '8 0 0 0',
                    items: [
                        {
                            xtype: 'button',
                            cls: 'btn_b',
                            iconCls: 'icb_add',
                            text: '그룹 추가',
                            listeners: {
                                click: 'onButtonClick2',
                                blur: 'onButtonBlur'
                            }
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    id: 'ips_user_group_list',
                    margin: '5 0 10 0',
                    width: 370,
                    titleCollapse: true,
                    columnLines: true,
                    store: 'store_ips_user_group',
                    columns: [
                        {
                            xtype: 'numbercolumn',
                            width: 40,
                            align: 'center',
                            dataIndex: '@id',
                            format: '0',
                            bind: {
                                text: '{id2}'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 295,
                            dataIndex: 'group_name',
                            bind: {
                                text: '{group_name}'
                            }
                        }
                    ],
                    viewConfig: {
                        markDirty: false
                    },
                    listeners: {
                        celldblclick: 'onIps_user_group_listCellDblClick'
                    },
                    selModel: {
                        selType: 'checkboxmodel'
                    }
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
                        click: 'onButtonClick3'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick4'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender'
    },

    onButtonClick: function(button, e, eOpts) {
        var cnt = Ext.data.StoreManager.lookup("store_ips_user_group").getCount();

        var win = Ext.create('NFW2.view.win_ips_group',{
            modal : true
        });

        var _params = {

            filename: Ext.encode('/proc/ferret/datasheet/ips_group_num')
        };

        request_helper.xmlrpc_call_JsonP(

            'ftuctrl',
            'getFileContent',
            _params,

            function(response){

                // 시그너처 전체 그룹 최대 개수(16개), 사용자 정의 그룹 최대 개수(8개)라서 -8을 했음
                var Maxcnt = (cnt >= (response[0]-8))? false:true;

                if(Maxcnt === false){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(ValidMaxCnt((response[0]-8)));
        //             Ext.Msg.alert("",ValidMaxCnt((response[0]-8)));
                    return false;

                }else{

                    win.show();
                }

            }
        );

    },

    onButtonBlur1: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update("");
    },

    onButtonClick1: function(button, e, eOpts) {
        var tbl = Ext.getCmp("ips_user_group_list");
        var tbl_sel = tbl.getSelectionModel().getSelection();

        if(tbl_sel.length === 0){

            Ext.Msg.alert("",get_msg("sel_del"));
            return false;

        }else{

            Ext.MessageBox.confirm("",get_msg("conf_del"),function(btn){

                if(btn === "yes"){

                    var _delList = [];

                    for(var i=0; i<tbl_sel.length; i++){

                        _delList.push(tbl_sel[i].data['@id']);
                    }
                    showLoadMask();
                    var _params = {

                        basename : Ext.encode('ips_group'),
                        ids : Ext.encode(_delList)
                    };

                    //console.log(_params);

                    request_helper.xmlrpc_call_JsonP(

                        'ftuctrl',
                        'delIPSGroup',
                        _params,

                        function(response){
                            hideLoadMask();
                            if(response.fail_total > 0){
                                var store = Ext.data.StoreManager.lookup('store_ips_group');
                                var ar_use = [];
                                for(var i in response.fail_list){
                                    if(response.fail_list[i].reason === "fsid_use")
                                        for(var j in store.data.items){
                                            if(response.fail_list[i]['@id'] === store.data.items[j].data['id']){
                                                ar_use.push(store.data.items[j].data.group_name);
                                            }
                                        }
                                }
                                var in_use = ar_use.join(" </br> ");
                                if(ar_use.length !== 0){
                                    Ext.Msg.alert("",get_msg('err_groupdel')+in_use);
                                }
                                else{
                                    var main2 = Ext.getCmp('NFW2_ips_signature');
                                    main2.init_ips_group();

                                    var _params2 = {
                                        basename : Ext.encode('ips_group')
                                    };

                                    request_helper.xmlrpc_call_JsonP(

                                        'ftuctrl',
                                        'getIPSGroup',
                                        _params2,

                                        function(response){
                                            var records = [];
                                            for(var i = 8;i<response.list.length;i++){
                                                records.push({
                                                    "@id" : response.list[i]['@id'],
                                                    "group_name" : response.list[i].group_name
                                                });
                                            }

                                            var _store = Ext.data.StoreManager.lookup('store_ips_user_group');
                                            _store.loadData(records);

                                        }
                                    );
                                }
                            }
                            else{
                            var main = Ext.getCmp('NFW2_ips_signature');
                            main.init_ips_group();

                            var _params = {
                                basename : Ext.encode('ips_group')
                            };

                            request_helper.xmlrpc_call_JsonP(

                                'ftuctrl',
                                'getIPSGroup',
                                _params,

                                function(response){
                                    var records = [];
                                    for(var i = 8;i<response.list.length;i++){
                                        records.push({
                                            "@id" : response.list[i]['@id'],
                                            "group_name" : response.list[i].group_name
                                        });
                                    }

                                    var _store = Ext.data.StoreManager.lookup('store_ips_user_group');
                                    _store.loadData(records);

                                }
                            );

                            }
                            Ext.getCmp('tbl_chk').setText("0 "+ __zen('check_count'));
                            Ext.getCmp('tab_con1').destroy();
                            Ext.getCmp('tab_con2').destroy();

                            Ext.getCmp('NFW2_ips_signature').make_group_filter();
                        }
                    );
                }
            });
        }
    },

    onButtonClick2: function(button, e, eOpts) {
        var _params = {

            filename: Ext.encode('/proc/ferret/datasheet/ips_group_num')
        };

        request_helper.xmlrpc_call_JsonP(

            'ftuctrl',
            'getFileContent',
            _params,

            function(response){
                var store = Ext.data.StoreManager.lookup('store_ips_user_group');
                var store_cnt = store.data.items.length;
                // 시그너처 전체 그룹 최대 개수(16개), 사용자 정의 그룹 최대 개수(8개)라서 -8을 했음
                var Maxcnt = (store_cnt >= (response[0]-8))? false:true;

                if(Maxcnt === false){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(ValidMaxCnt((response[0]-8)));
                    return false;

                }else{
                    var cnt = store.data.items[store.data.items.length-1].data['@id'];
                    var record = {
                        '@id' : cnt+1,
                        'group_name' : ''
                    };

                    store.add(record);
                    this.store_cnt++;
                }

            }
        );
    },

    onButtonBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onIps_user_group_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var rec = tableview.getStore().getAt(rowIndex);

        var win = Ext.create('NFW2.view.win_ips_group',{
            edit : "edit",
            obj_id : rec.get("@id"),
            modal : true
        });

        win.show();
    },

    onButtonClick3: function(button, e, eOpts) {
        this.close();
    },

    onButtonClick4: function(button, e, eOpts) {
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        chk_zenauth(null);
        component.setTitle(__zen('manage_user_group'));
    },

    name_validation: function(value) {
        if(!CheckNotNull(value)){ return get_msg(err_null); }

        return true;
    }

});