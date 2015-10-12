
Ext.define('NFW2.view.NFW2_ddos_profile', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging'
    ],

    title: '프로파일',

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
                    border: false,
                    id: 'frm_list',
                    bodyPadding: 10,
                    titleCollapse: true,
                    items: [
                        {
                            xtype: 'container',
                            id: 'btnGroup1',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'btn_add',
                                    width: 100,
                                    text: '추가',
                                    listeners: {
                                        click: {
                                            fn: me.onBtn_addClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'btn_del',
                                    margin: '0 0 0 5',
                                    width: 100,
                                    text: '삭제',
                                    listeners: {
                                        click: {
                                            fn: me.onBtn_delClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'btn_copy',
                                    margin: '0 0 0 5',
                                    width: 100,
                                    text: '복사',
                                    listeners: {
                                        click: {
                                            fn: me.onBtn_copyClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'ddos_profile_list',
                            margin: '5 0 0 0',
                            autoScroll: true,
                            titleCollapse: true,
                            store: 'store_ddos_profile_list',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    width: 50,
                                    defaultWidth: 50,
                                    align: 'center',
                                    dataIndex: '@num',
                                    text: 'N'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    minWidth: 200,
                                    defaultWidth: 200,
                                    dataIndex: 'name',
                                    tdCls: 'mousepointer',
                                    text: '프로파일 이름',
                                    flex: 0.3
                                },
                                {
                                    xtype: 'gridcolumn',
                                    minWidth: 200,
                                    defaultWidth: 200,
                                    dataIndex: 'profile_info',
                                    text: '설명',
                                    flex: 0.3
                                },
                                {
                                    xtype: 'gridcolumn',
                                    minWidth: 100,
                                    dataIndex: 'detectiondelicacy',
                                    text: '탐지 민감도',
                                    flex: 0.15
                                },
                                {
                                    xtype: 'gridcolumn',
                                    minWidth: 100,
                                    dataIndex: 'detection_info',
                                    text: '탐지/차단',
                                    flex: 0.15
                                }
                            ],
                            selModel: Ext.create('Ext.selection.CheckboxModel', {

                            }),
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    hidden: true,
                                    width: 360,
                                    displayInfo: true,
                                    store: 'store_ddos_profile_list'
                                }
                            ],
                            listeners: {
                                celldblclick: {
                                    fn: me.onDdos_profile_listCellDblClick,
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

    onBtn_addClick: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_ddos',{
            modal : true
        });

        var _params = {

            filename: Ext.encode('/proc/ferret/datasheet/ddos_profile')
        };

        request_helper.xmlrpc_call_JsonP(

            'ftuctrl',
            'getFileContent',
            _params,

            function(response){

                var cnt = Ext.data.StoreManager.lookup('store_ddos_profile_list').getTotalCount();

                var Maxcnt = (cnt >= response[0])? false:true;

                //console.log(cnt +', '+ response[0] +', '+ Maxcnt);

                if(Maxcnt === false){

                    Ext.Msg.alert("",ValidMaxCnt(response[0]));
                    return false;

                }else{

                    win.show();
                }

            }

        );

    },

    onBtn_delClick: function(button, e, eOpts) {
        var tbl = Ext.getCmp("ddos_profile_list");
        var tbl_sel = tbl.getSelectionModel().getSelection();

        if(tbl_sel.length === 0){

            Ext.Msg.alert("",get_msg("sel_del"));
            return false;

        }else{

            Ext.MessageBox.confirm("",get_msg("conf_del"),function(btn){

                if(btn === "yes"){

                    var del = new Array();

                    for(var i=0; i<tbl_sel.length; i++){

                        del[i] = tbl_sel[i].data.name;
                    }

                    var name_list = del;

                    var _param = {

                        name_list : Ext.encode(name_list)
                    };

                    //console.log(_param);

                    Ext.data.JsonP.request({
                        url : "/api/ftuctrl/del_ddos_profile",

                        params : _param,

                        success : function(response){

                            if(response.retcode === true){

                                Ext.getCmp("frm_list").getForm().reset();

                                var _store = Ext.data.StoreManager.lookup('store_ddos_profile_list');
                                _store.load();

                            }else{

                                console.log(response.errmsg +"(error):"+ response.errcode);
                            }
                        },
                        failure : function(response){

                            console.log(response.errmsg +"(fail):"+ response.errcode);
                        }
                    });
                }
            });

        }
    },

    onBtn_copyClick: function(button, e, eOpts) {
        var tbl = Ext.getCmp("ddos_profile_list");
        var tbl_sel = tbl.getSelectionModel().getSelection();

        if(tbl_sel.length === 0){

            Ext.Msg.alert("",get_msg("sel_copy"));
            return false;

        }else{

            Ext.MessageBox.confirm("",get_msg("conf_copy"),function(btn){

                if(btn === "yes"){

                    var copy = new Array();

                    for(var i=0; i<tbl_sel.length; i++){

                        copy[i] = tbl_sel[i].data.name;
                    }

                    var name_list = copy;

                    var _param = {

                        name_list : Ext.encode(name_list)
                    };

                    //console.log(_param);

                    Ext.data.JsonP.request({
                        url : "/api/ftuctrl/copy_ddos_profile",

                        params : _param,

                        success : function(response){

                            if(response.retcode === true){

                                Ext.getCmp("frm_list").getForm().reset();

                                var _store = Ext.data.StoreManager.lookup('store_ddos_profile_list');
                                _store.load();

                            }else{

                                if(response.errcode === 51102){

                                    var _params2 = {

                                        filename: Ext.encode('/proc/ferret/datasheet/ddos_profile')
                                    };

                                    request_helper.xmlrpc_call_JsonP(

                                        'ftuctrl',
                                        'getFileContent',
                                        _params2,

                                        function(response){

                                            Ext.Msg.alert("",ValidMaxCnt(response[0]));
                                            return false;

                                        }
                                    );
                                }

                                console.log(response.errmsg +"(error):"+ response.errcode);
                            }
                        },
                        failure : function(response){

                            console.log(response.errmsg +"(fail):"+ response.errcode);
                        }
                    });
                }
            });
        }
    },

    onDdos_profile_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var rec = tableview.getStore().getAt(rowIndex);

        var win = Ext.create('NFW2.view.win_ddos',{
            edit : "edit",
            cid : rec.get("@cid"),
            num : rec.get("@num"),
            name : rec.get("name"),
            modal : true
        });

        win.show();

    },

    onPanelAfterRender: function(component, eOpts) {
        var _store = Ext.data.StoreManager.lookup('store_ddos_profile_list');
            _store.load();
    }

});