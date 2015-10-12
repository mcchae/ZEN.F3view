
Ext.define('NFW2.view.NFW2_ips_profile', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_ips_profile',

    requires: [
        'NFW2.view.NFW2_ips_profileViewModel',
        'Ext.form.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel'
    ],

    viewModel: {
        type: 'nfw2_ips_profile'
    },
    cls: 'zen_body',
    id: 'NFW2_ips_profile',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onPanelAfterRender'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        flex: 1,
                        id: 'fm_list',
                        items: [
                            {
                                xtype: 'container',
                                id: 'btn_group',
                                items: [
                                    {
                                        xtype: 'toolbar',
                                        cls: 'zen_toolbar',
                                        items: [
                                            {
                                                xtype: 'button',
                                                id: 'btn_add',
                                                iconCls: 'ic_add',
                                                bind: {
                                                    text: '{add}'
                                                },
                                                listeners: {
                                                    click: 'onBtn_addClick'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                id: 'btn_del',
                                                iconCls: 'ic_del',
                                                bind: {
                                                    text: '{del}'
                                                },
                                                listeners: {
                                                    click: 'onBtn_delClick'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                componentCls: 'btn_auth',
                                                id: 'btn_copy',
                                                bind: {
                                                    text: '{copy}'
                                                },
                                                listeners: {
                                                    click: 'onBtn_copyClick'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'gridpanel',
                                cls: 'in_grid',
                                id: 'ips_profile_list',
                                margin: '5 0 0 0',
                                titleCollapse: true,
                                columnLines: true,
                                store: 'store_ips_profile_list',
                                columns: [
                                    {
                                        xtype: 'rownumberer',
                                        width: 60,
                                        align: 'center',
                                        text: 'N'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'name',
                                        flex: 0.3,
                                        bind: {
                                            text: '{profile_name}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var result = value.join(', ');

                                            return result;
                                        },
                                        dataIndex: 'policy',
                                        flex: 0.5,
                                        bind: {
                                            text: '{fw_policy_id}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'profile_disc',
                                        flex: 0.7,
                                        bind: {
                                            text: '{desc}'
                                        }
                                    }
                                ],
                                selModel: Ext.create('Ext.selection.CheckboxModel', {
                                    selType: 'checkboxmodel',
                                    mode: 'SIMPLE'
                                }),
                                listeners: {
                                    celldblclick: 'onIps_profile_listCellDblClick'
                                }
                            }
                        ]
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    onBtn_addClick: function(button, e, eOpts) {
        var me = this;

        showLoadMask();
        var _params = {

            filename: Ext.encode('/proc/ferret/datasheet/ips_profile')
        };

        request_helper.xmlrpc_call_JsonP(

            'ftuctrl',
            'getFileContent',
            _params,

            function(response){
                hideLoadMask();
                var _store2 = Ext.data.StoreManager.lookup('store_ips_profile_list');

                var Maxcnt = (_store2.getCount() >= response[0])? false:true;

                if(Maxcnt === false){

                    Ext.Msg.alert("",ValidMaxCnt(response[0]));
                    return false;

                }else{

                    var win = Ext.create('NFW2.view.win_add_ips_profile',{
                        modal : true
                    });


                    win.show();
                }

            }
        );

    },

    onBtn_delClick: function(button, e, eOpts) {
        var tbl = Ext.getCmp("ips_profile_list");
        var tbl_sel = tbl.getSelectionModel().getSelection();

        if(tbl_sel.length === 0){

            Ext.Msg.alert("",get_msg("sel_del"));
            return false;

        }else{

            Ext.MessageBox.confirm("",get_msg("conf_del"),function(btn){

                if(btn === "yes"){

                    var _delList = [];

                    for(var i=0; i<tbl_sel.length; i++){

                        _delList.push(tbl_sel[i].data['profile_id']);
                    }

                    showLoadMask();

                    var _params = {

                        basename : Ext.encode('ips_profile'),
                        ids : Ext.encode(_delList)
                    };

                    request_helper.xmlrpc_call_JsonP(

                        'ftuctrl',
                        'delListTypeObj',
                        _params,

                        function(response){
                            hideLoadMask();
                            var store = Ext.data.StoreManager.lookup('store_ips_profile_list');

                            if(response.fail_total > 0){
                                var ar_use = [];
                                for(var i in response.fail_list){
                                    if(response.fail_list[i].reason === "in_use")
                                        for(var j in store.data.items){
                                            if(store.data.items[j].data.profile_id === response.fail_list[i].profile_id){ar_use.push(store.data.items[j].data.name);}
                                        }

                                }
                                var in_use = ar_use.join(" </br> ");
                                Ext.Msg.alert("",get_msg('err_prodel')+in_use);
                            }
                            else{
                                Ext.Msg.show({
                                    title: __weguardia,
                                    width: 300,
                                    msg: get_msg('msg_ok_del'),
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.window.MessageBox.INFO
                                });
                            }
        //                     Ext.data.StoreManager.lookup('store_ips_profile_list').load();
                            Ext.getCmp('NFW2_ips_profile').get_profile();
                            //Ext.data.StoreManager.lookup('store_ips_porfile_signature_list').load();

                        }

                    );

                }

            });

        }
    },

    onBtn_copyClick: function(button, e, eOpts) {
        var me = this;

        var tbl = Ext.getCmp("ips_profile_list");
        var tbl_sel = tbl.getSelectionModel().getSelection();

        var _store = Ext.data.StoreManager.lookup('store_ips_profile_list');

        if(tbl_sel.length === 0){

            Ext.Msg.alert("",get_msg("sel_copy"));
            return false;

        }else{

            Ext.MessageBox.confirm("",get_msg("conf_copy"),function(btn){

                if(btn === "yes"){

                    showLoadMask();

                    var _params = {

                        filename: Ext.encode('/proc/ferret/datasheet/ips_profile')
                    };

                    request_helper.xmlrpc_call_JsonP(

                        'ftuctrl',
                        'getFileContent',
                        _params,

                        function(response){

                            var cnt = _store.getCount();

                            var Maxcnt = (cnt+tbl_sel.length > response[0])? false:true;

                            if(Maxcnt === false){
                                hideLoadMask();
                                Ext.Msg.alert("",ValidMaxCnt(response[0]));
                                return false;

                            }else{

                                var _copyList = [];

                                for(var i=0; i<tbl_sel.length; i++){

                                    //console.log(tbl_sel[i].data);

                                    _copyList.push(tbl_sel[i].data['profile_id']);
                                }

                                var _params2 = {

                                    basename : Ext.encode('ips_profile'),
                                    id_info : Ext.encode({'fieldname':'profile_id','values':_copyList}),
                                    cpname_suffix : Ext.encode('_사본')
                                };

                                request_helper.xmlrpc_call_JsonP(

                                    'ftuctrl',
                                    'copyListTypeObj',
                                    _params2,

                                    function(response){
                                        hideLoadMask();
                                        me.get_profile();
                                    }
                                );

                            }

                        }
                    );
                }
            });
        }
    },

    onIps_profile_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var rec = tableview.getStore().getAt(rowIndex);

        //console.log(record);

        var num = 0;
        for(var i in tableview.getStore().data.items){
            if(tableview.getStore().data.items[i].data['@cid'] === rec.get("@cid")){ num = i; }
        }
        var win = Ext.create('NFW2.view.win_add_ips_profile',{
            edit : "edit",
            cid : rec.get("@cid"),
            num : Number(num)+1,
            p_id : rec.get("profile_id"),
            p_name : rec.get("name"),
            p_disc : rec.get("profile_disc"),
            edit_index : rowIndex,
            modal : true
        });

        // 그룹 store
        /*var _store2 = Ext.data.StoreManager.lookup('store_ips_group');
            _store2.load();*/

        // 시그너처 리스트
        var _store = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');
            _store.getProxy().setExtraParam('basename',Ext.encode("signature_list"));
            _store.getProxy().setExtraParam('join_info',Ext.encode({'ex_basename':'ips_profile', 'name':rec.get("name")}));
            //_store.load();

        win.show();

    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'isCC',
            {},
            function(response){
                if(response === true){
                    me.isCC = true;
                }
                else{
                    me.isCC = false;
                }
            }
        );

        me.get_profile();
    },

    get_profile: function() {
        var me = this;
        var _params = {
            basename : Ext.encode('ips_profile')
        };

        var records = [];

        request_helper.xmlrpc_call_JsonP(

            'ftuctrl',
            'getIPSProfile',
            _params,
            function(response){
                hideLoadMask();
                setTimeout(function(){ me.setWidth('100%'); },100);
                for(var i in response.list){
                    var policy = [];
                    for(var k in response.list[i].uid_list){
                        var temp = response.list[i].uid_list[k].basename.split('_');

                        if(temp[2] === "ipv4"){ policy.push(response.list[i].uid_list[k]['@uid']); }
                    }

                    for(var m in response.list[i].uid_list){
                        var temp2 = response.list[i].uid_list[m].basename.split('_');

                        if(temp2[2] === "ipv6"){ policy.push(response.list[i].uid_list[m]['@uid']); }
                    }

                    records.push({
                        '@cid' : response.list[i]['@cid'],
                        'profile_id' : response.list[i].profile_id,
                        'name' : response.list[i].name,
                        'profile_disc' : response.list[i].profile_disc,
                        'policy' : policy
                    });
                }
                var store = Ext.data.StoreManager.lookup('store_ips_profile_list');
                store.loadData(records);
            }
        );

        // var store2 = Ext.data.StoreManager.lookup('store_ips_profile_signature_list');
        // store2.load();
    }

});