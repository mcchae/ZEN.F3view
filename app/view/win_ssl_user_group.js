
Ext.define('NFW2.view.win_ssl_user_group', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.grid.plugin.DragDrop',
        'Ext.selection.CheckboxModel',
        'Ext.form.Label',
        'Ext.button.Button'
    ],

    height: 410,
    width: 739,
    autoScroll: true,
    title: '사용자 그룹 추가',
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    flex: 1,
                    id: 'fm',
                    autoScroll: true,
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                        return (/^\s*([ㄱ-ㅎㅏ-ㅣ가-힣|a-zA-Z]+)\s*$/).test(value)?true:get_msg('err_alphakor');
                                    },
                                    id: 'name',
                                    width: 400,
                                    fieldLabel: '이름',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    msgTarget: 'none',
                                    enforceMaxLength: true,
                                    maxLength: 32,
                                    listeners: {
                                        errorchange: {
                                            fn: me.onNameErrorChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'desc',
                                    width: 400,
                                    fieldLabel: '설명',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    enforceMaxLength: true,
                                    maxLength: 256
                                },
                                {
                                    xtype: 'container',
                                    height: 1,
                                    margin: '5 0 5 0',
                                    style: 'background-color:#c2c2c2',
                                    layout: 'border'
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    height: 200,
                                                    id: 'grid_user',
                                                    style: 'border:1px solid #c2c2c2',
                                                    title: '',
                                                    columnLines: true,
                                                    store: 'store_sslplus_user_group_user',
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            dataIndex: 'id',
                                                            text: '사용자 계정',
                                                            flex: 1
                                                        }
                                                    ],
                                                    viewConfig: {
                                                        plugins: [
                                                            Ext.create('Ext.grid.plugin.DragDrop', {
                                                                dragGroup: 'group2',
                                                                dropGroup: 'group1'
                                                            })
                                                        ],
                                                        listeners: {
                                                            drop: {
                                                                fn: me.onViewDrop,
                                                                scope: me
                                                            }
                                                        }
                                                    },
                                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                                    }),
                                                    listeners: {
                                                        celldblclick: {
                                                            fn: me.onGrid_userCellDblClick,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            width: 30
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    height: 200,
                                                    id: 'grid_user_mem',
                                                    style: 'border:1px solid #c2c2c2',
                                                    title: '',
                                                    columnLines: true,
                                                    store: 'store_sslplus_user_group_member',
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            dataIndex: 'id',
                                                            text: '사용자 계정',
                                                            flex: 1
                                                        }
                                                    ],
                                                    viewConfig: {
                                                        plugins: [
                                                            Ext.create('Ext.grid.plugin.DragDrop', {
                                                                dragGroup: 'group1',
                                                                dropGroup: 'group2'
                                                            })
                                                        ],
                                                        listeners: {
                                                            drop: {
                                                                fn: me.onViewDrop1,
                                                                scope: me
                                                            }
                                                        }
                                                    },
                                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                                    }),
                                                    listeners: {
                                                        celldblclick: {
                                                            fn: me.onGrid_user_memCellDblClick,
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
                                    height: 25,
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'errorBox',
                                            hidden: true,
                                            id: 'errorBox',
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
                                                    fn: me.onButtonClick1,
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

    onNameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "errorBox");
    },

    onViewDrop: function(node, data, overModel, dropPosition, eOpts) {
        var me = this;

        var g_name = me.g_name;

        for(var i=0; i<data.records.length; i++){
            delete g_name[data.records[i].data._id];
        }

        me.record = Ext.data.StoreManager.lookup("store_sslplus_user_group_member").data.items;
    },

    onGrid_userCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0){ return false; }

        var me = this;

        var user = Ext.data.StoreManager.lookup("store_sslplus_user_group_user");

        var group = Ext.data.StoreManager.lookup("store_sslplus_user_group_member");

        var d = Ext.getCmp("grid_user").getStore().data.items[rowIndex].data;

        group.add(d);

        var record = me.g_name;
        record[d.cid] = d.name;

        user.removeAt(rowIndex);

        me.record = user.data.items;
    },

    onViewDrop1: function(node, data, overModel, dropPosition, eOpts) {
        var me = this;

        var g_name = me.g_name;

        for(var i=0; i<data.records.length; i++){
            g_name[data.records[i].data._id] = data.records[i].data.id;
        }

        me.record = Ext.data.StoreManager.lookup("store_sslplus_user_group_member").data.items;
    },

    onGrid_user_memCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0){ return false; }

        var me = this;

        var user = Ext.data.StoreManager.lookup("store_sslplus_user_group_user");

        var group = Ext.data.StoreManager.lookup("store_sslplus_user_group_member");

        var d = Ext.getCmp("grid_user_mem").getStore().data.items[rowIndex].data;

        user.add(d);

        var record = me.g_name;
        delete record[d.cid];

        group.removeAt(rowIndex);

        me.record = user.data.items;
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var name = Ext.getCmp("name");
        var desc = Ext.getCmp("desc");
        var obj = {};

        if(name.validateValue()===false){ name.focus(); return false; }

        var grid = Ext.data.StoreManager.lookup("store_sslplus_user_group_member");

        if(grid.data.length === 0){
            prt_errMsg("맴버객체를 선택하여 주세요.", "errorBox");
            return false;
        }else{

            var member = [];
            var m_id = [];
            for(var i=0; i<grid.data.length; i++){
                member.push({
                    '_id': grid.data.items[i].data._id,
                    'id': grid.data.items[i].data.id
                });
                m_id.push(grid.data.items[i].data.id);
            }
        }
        Ext.getCmp("errorBox").hide();

        obj.name = name.getValue();
        obj.desc = desc.getValue();
        obj.member_list = m_id.join(", ");
        obj.member_info = member;

        var update = (me.edit==="edit")?true:false;

        if(update){
            obj._id = me.data._id;
        }

        var _params = {
            basename: Ext.encode('sslplus_user_group'),
            obj: Ext.encode(obj),
            update: Ext.encode(update)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setListTypeObj',
            _params,
            function(response){

                var store = Ext.data.StoreManager.lookup("store_sslplus_user_group_list");
                store.load();

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
            }
        );
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;

        if(me.edit === "edit"){

            var data = me.data;

            me.setTitle("사용자 그룹 수정 - "+data._num);
            Ext.getCmp("name").setValue(data.name);
            Ext.getCmp("desc").setValue(data.desc);

            var record = [];
            var g_name = [];

            for(var i in data.member_info){
                record.push({
                    '_id' : data.member_info[i]._id,
                    'id' : data.member_info[i].id
                });
                g_name[data.member_info[i]._id] = data.member_info[i].id;

            }

            me.g_name = g_name;

            var _store = Ext.data.StoreManager.lookup("store_sslplus_user_group_member");
            _store.loadData(record);
        }else{

            var g_name = [];
            me.g_name = g_name;
        }

        me.init_sslplus_user();
    },

    onWindowClose: function(panel, eOpts) {
        var me = this;

        var group = Ext.data.StoreManager.lookup("store_sslplus_user_group_member");
        group.removeAll();
    },

    init_sslplus_user: function() {
        var me = this;

        var _params = {
            basename: Ext.encode('sslplus_user')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _params,
            function(response){

                if(!response){ return false; }

                var record = [];
                var g_name = me.g_name;

                for(var i in response.list){

                    if(!g_name[response.list[i]._id]){
                        record.push({
                            'id': response.list[i].id,
                            '_id': response.list[i]._id
                        });
                    }
                }

                var _store = Ext.data.StoreManager.lookup("store_sslplus_user_group_user");
                _store.loadData(record);
                me.record = _store.data.items;
            }
        );
    }

});