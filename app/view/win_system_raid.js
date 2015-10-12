
Ext.define('NFW2.view.win_system_raid', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_system_raid',

    requires: [
        'NFW2.view.win_system_raidViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.column.Action',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'win_system_raid'
    },
    cls: 'zen_win',
    scrollable: true,
    width: 500,
    title: 'S/W RAID 추가',
    modal: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            itemId: 'fm',
            scrollable: true,
            bodyPadding: 20,
            title: '',
            items: [
                {
                    xtype: 'container',
                    minWidth: 350,
                    items: [
                        {
                            xtype: 'textfield',
                            cls: 'lb_req',
                            id: 'name',
                            fieldLabel: 'RAID 이름',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            readOnly: true
                        },
                        {
                            xtype: 'combobox',
                            id: 'mode',
                            fieldLabel: '동작 모드',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            value: 'raid0',
                            editable: false,
                            displayField: 'mode',
                            queryMode: 'local',
                            store: 'store_raid_mode',
                            valueField: 'val'
                        },
                        {
                            xtype: 'container',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'combobox',
                                    cls: 'lb_req',
                                    id: 'raid',
                                    fieldLabel: 'RAID 구성',
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    editable: false,
                                    emptyText: 'Select',
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'store_raid_compose',
                                    valueField: 'val'
                                },
                                {
                                    xtype: 'button',
                                    cls: 'btn_b',
                                    margin: '-3 0 0 5',
                                    iconCls: 'icb_add',
                                    listeners: {
                                        click: 'onButtonClick2'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'con_raid',
                            margin: '0 0 0 135',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_raid',
                                    width: 170,
                                    hideHeaders: true,
                                    store: 'store_raid_compose_list',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'name',
                                            text: 'String',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            width: 30,
                                            items: [
                                                {
                                                    getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                        return "icr_del";
                                                    },
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                        var store = Ext.data.StoreManager.lookup("store_raid_compose_list");
                                                        var _store = Ext.data.StoreManager.lookup("store_raid_compose");

                                                        store.removeAt(rowIndex);

                                                        if(store.data.items[0]){
                                                            var name = store.data.items[0].data.name;

                                                            if(name.indexOf("-") === -1){
                                                                store.data.items[0].data.name = name+" - Primary";
                                                                var item = store.data.items[0];

                                                                store.removeAt(0);
                                                                store.insert(0,item);
                                                            }
                                                        }

                                                        var data = [];

                                                        data.push(record.data.val);


                                                        for(var i=0; i<_store.data.length; i++){

                                                            data.push(_store.data.items[i].data.name);
                                                        }

                                                        data.sort();

                                                        var s_data = [];
                                                        for(var l=0; l<data.length; l++){
                                                            s_data.push({
                                                                'name': data[l]
                                                            });
                                                        }

                                                        _store.loadData(s_data);
                                                        if(_store.data.length > 0){
                                                            Ext.getCmp("raid").setValue(s_data[0].name);
                                                        }


                                                        if(store.getCount() === 0){
                                                            Ext.getCmp("con_raid").hide();
                                                        }
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
            ]
        }
    ],
    listeners: {
        close: 'onWindowClose',
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
                    text: '확인',
                    listeners: {
                        click: 'onButtonClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    text: '취소',
                    listeners: {
                        click: 'onButtonClick1'
                    }
                }
            ]
        }
    ],

    onButtonClick2: function(button, e, eOpts) {
        var raid = Ext.getCmp("raid");
        var store = Ext.data.StoreManager.lookup("store_raid_compose_list");

        if(raid.getValue() === "" || raid.getValue() === null){ return false; }

        store.add({
            'name': raid.getValue(),
            'val': raid.getValue()
        });

        var _store = Ext.data.StoreManager.lookup("store_raid_compose");
        for(var i=0; i<_store.data.length; i++){

            if(raid.getValue() === _store.data.items[i].data.name){
                _store.removeAt(i);

                if(_store.data.length > 0){
                    raid.setValue(_store.data.items[0].data.name);
                }else{
                    raid.setValue("");
                }
            }
        }

        if(store.data.items[0]){
            var name = store.data.items[0].data.name;
            if(name === null){ return false; }

            if(name.indexOf("-") === -1){
                store.data.items[0].data.name = name+" - Primary";
                var item = store.data.items[0];

                store.removeAt(0);
                store.insert(0,item);
            }
        }

        Ext.getCmp("con_raid").show();
    },

    onWindowClose: function(panel, eOpts) {
        Ext.getCmp("grid_raid").getStore().removeAll();
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;

        var store_compose = Ext.data.StoreManager.lookup("store_raid_compose");

        store_compose.loadData(me.hd_list);

        if(store_compose.data.items[0]){
            Ext.getCmp("raid").setValue(store_compose.data.items[0].data.name);
        }

        if(this.edit === "edit"){

            me.setTitle("S/W RAID 수정 - "+me.record._num);

            var name = me.record.name.split("md");

            Ext.getCmp("name").setValue(me.record.name);
            Ext.getCmp("mode").setValue(me.record.mode);

            var _store = Ext.data.StoreManager.lookup("store_raid_compose_list");

            _store.add({
                'name': me.record.prim+' - Primary',
                'val': me.record.prim
            });

            var slave = me.record.slave.split(" ");
            for(var i=0; i<slave.length; i++){

                _store.add({
                    'name': slave[i],
                    'val': slave[i]
                });
            }

            Ext.getCmp("con_raid").show();

        }else{

            var store = Ext.data.StoreManager.lookup("store_raid_list");
            Ext.getCmp("name").setValue("md"+store.data.length);
        }

    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var sw_raid = Ext.getCmp("basic_raid").sw_raid;

        var name = Ext.getCmp("name");
        var mode = Ext.getCmp("mode");
        var store_compose = Ext.data.StoreManager.lookup("store_raid_compose_list");

        if(store_compose.getCount() < 2){
            prt_errMsg(get_msg('err_raid_ps_cnt'),null);
            return false;
        }
        prt_errMsg(null,null);

        var compose = [];

        for(var i=1; i<store_compose.getCount(); i++){
            compose.push(store_compose.data.items[i].data.val);
        }

        var name = name.getValue().substring(2);

        sw_raid.sw_raid[name].mode = mode.getValue();
        sw_raid.sw_raid[name].prim = store_compose.data.items[0].data.val;
        sw_raid.sw_raid[name].slave = compose.join(" ");
        sw_raid.sw_raid[name].disk_nr = store_compose.getCount();

        var _params = {
            basename: Ext.encode("system_raid"),
            obj: Ext.encode(sw_raid)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params,
            function(response){

                var store = Ext.data.StoreManager.lookup("store_raid_list");
                Ext.getCmp("basic_raid").get_system_raid();

                if(store.data.length >= 1){
                    me.close();
                    return false;
                }

                if(me.edit === "edit"){

                    Ext.Msg.show({
                        title: 'WeGuardia™ ZEN',
                        msg: get_msg("msg_ok_edit"),
                        width: 300,
                        buttons: Ext.Msg.OK,
                        fn: setWinClose,
                        icon: Ext.window.MessageBox.INFO
                    });
                }else{
                    Ext.ComponentQuery.query('form[itemId="fm"]')[0].getForm().reset();
                    Ext.Msg.show({
                        title: 'WeGuardia™ ZEN',
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
                    Ext.getCmp("con_raid").hide();
                    Ext.getCmp("name").setValue(store.data.length+1);
                }

                Ext.data.StoreManager.lookup("store_raid_compose_list").removeAll();

            }
        );
    },

    onButtonClick1: function(button, e, eOpts) {
        this.close();
    }

});