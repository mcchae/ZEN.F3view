
Ext.define('NFW2.view.NFW2_ssl_userGroup', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel'
    ],

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    title: '사용자 그룹',
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
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
                                                    fn: me.onButtonClick1,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'grid_list',
                            margin: '5 0 0 0 ',
                            title: '',
                            columnLines: true,
                            store: 'store_sslplus_user_group_list',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    width: 50,
                                    align: 'center',
                                    dataIndex: '_num',
                                    text: 'N'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'name',
                                    text: '그룹 이름',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'member_list',
                                    text: '그룹 멤버',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'desc',
                                    text: '설명',
                                    flex: 1
                                }
                            ],
                            selModel: Ext.create('Ext.selection.CheckboxModel', {

                            }),
                            listeners: {
                                celldblclick: {
                                    fn: me.onGrid_listCellDblClick,
                                    scope: me
                                }
                            }
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

    onButtonClick: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_ssl_user_group');
        win.show();
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var grid = Ext.getCmp("grid_list");
        var grid_chk = grid.getSelectionModel().getSelection();

        if(grid_chk.length === 0){
            Ext.Msg.alert("",get_msg("sel_del"));
            return false;
        }

        Ext.MessageBox.confirm("",get_msg("conf_del"),function(btn){
            if(btn === "yes"){
                var del = [];
                for(var i=0; i<grid_chk.length; i++){

                    del.push(grid_chk[i].data._id);

                }

                var _params = {

                    basename : Ext.encode("sslplus_user_group"),
                    ids : Ext.encode(del),
                    renum_info : Ext.encode({'fieldname':'_num'})
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'delListTypeObj',
                    _params,
                    function(reesponse){

                        Ext.data.StoreManager.lookup("store_sslplus_user_group_list").load();
                    }
                );
            }
        });
    },

    onGrid_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('NFW2.view.win_ssl_user_group',{
            edit: "edit",
            data: record.data
        });
        win.show();
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        var store = Ext.data.StoreManager.lookup("store_sslplus_user_group_list");
        store.load();
    }

});