
Ext.define('NFW2.view.NFW2_policy_change', {
    extend: 'Ext.window.Window',
    alias: 'widget.nfw2_policy_change',

    requires: [
        'NFW2.view.NFW2_policy_changeViewModel',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'nfw2_policy_change'
    },
    autoScroll: true,
    cls: 'zen_win',
    height: 600,
    id: 'NFW2_policy_change',
    width: 950,
    layout: 'anchor',
    bodyPadding: 20,
    maximizable: true,
    modal: true,
    defaultListenerScope: true,

    bind: {
        title: '{tit_diff}'
    },
    items: [
        {
            xtype: 'gridpanel',
            id: 'grid_policy_change',
            store: 'store_policy_change',
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'when',
                    flex: 1,
                    bind: {
                        text: '{time}'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'where',
                    text: 'IP',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'who',
                    flex: 0.5,
                    bind: {
                        text: '{user}'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'what',
                    flex: 1,
                    bind: {
                        text: '{menu_name}'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'how',
                    flex: 1,
                    bind: {
                        text: '{tit_diff}'
                    }
                },
                {
                    xtype: 'actioncolumn',
                    getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                        return "icr_detail";
                    },
                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                        var win = Ext.create('NFW2.view.NFW2_policyDiff',{

                            newData : record.data.newData,
                            oldData : record.data.oldData

                        });

                        win.show();
                    },
                    width: 80,
                    align: 'center',
                    dataIndex: 'jump',
                    bind: {
                        text: '{detail}'
                    }
                }
            ],
            viewConfig: {
                emptyText: '변경된 내용이 없습니다.'
            }
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
                    flex: 1
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onButtonClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    disabled: true,
                    width: 100,
                    bind: {
                        text: '{cancel}'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onNFW2_policy_changeAfterRender'
    },

    onButtonClick: function(button, e, eOpts) {
          var me = this;

                me.close();
    },

    onNFW2_policy_changeAfterRender: function(component, eOpts) {

        var me = this;

        Ext.getCmp('NFW2_policy_change').mask("Loading Data ..");

        var _params = {

        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getChangedFromLastCommit',
            {},
            function(response){

                var records = [];

                var store = Ext.data.StoreManager.lookup('store_policy_change');

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'getInserted',
                    {},
                    function(response){

                        for(var i in response){

                            for(var j in response[i]){

                                var _last_ts = response[i][j]['obj']._last_ts;

                                if(_last_ts === undefined){

                                    _last_ts = "";

                                }else{

                                    _last_ts = unixTimeConvert(_last_ts,'','');
                                }

                                records.push({

                                    jump : i,
                                    who : response[i][j]['obj']._last_who,
                                    when : _last_ts,
                                    where : response[i][j]['obj']._last_where,
                                    what : i,//response[i][j]['obj']._kind,
                                    how : __zen('add'),
                                    newData : response[i][j]['user_obj']

                                });

                            }
                        }

                        store.loadData(records);

                    }

                );

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'getUpdated',
                    {},
                    function(response){


                             Ext.getCmp('NFW2_policy_change').unmask();


                        for(var i in response){

                            for(var j in response[i]){

                                var date = new Date(response[i][j]['new_obj']._last_ts*1000);

                                date = date.toGMTString();

                                date = new Date(date*1000);

                                var year = date.getUTCFullYear();

                                var _last_ts = response[i][j]['new_obj']._last_ts;

                                if(_last_ts === undefined){

                                    _last_ts = "";

                                }else{

                                    _last_ts = unixTimeConvert(_last_ts,'','');
                                }

                                records.push({

                                    jump : i,
                                    who : response[i][j]['new_obj']._last_who,
                                    when : _last_ts,
                                    where : response[i][j]['new_obj']._last_where,
                                    what : i,//response[i][j]._kind,
                                    how : __zen('edit'),
                                    newData : response[i][j]['new_user_obj'],
                                    oldData : response[i][j]['old_user_obj']


                                });

                            }



                            store.loadData(records);
                        }


                    }

                );

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'getDeleted',
                    {},
                    function(response){

                        for(var i in response){

                            for(var j in response[i]){

                                var _last_ts = response[i][j]['obj']._last_ts;

                                if(_last_ts === undefined){

                                    _last_ts = "";

                                }else{

                                    _last_ts = unixTimeConvert(_last_ts,'','');
                                }

                                records.push({

                                    jump : i,
                                    who : response[i][j]['obj']._last_who,
                                    when : _last_ts,
                                    where : response[i][j]['obj']._last_where,
                                    what : i,//response[i][j]['obj']._kind,
                                    how : __zen('del'),
                                    oldData : response[i][j]['user_obj']

                                });

                            }
                        }



                        store.loadData(records);

                    }

                );

            }
        );


        me.getViewModel().setData({
                tit_diff: __zen('tit_diff'),
                time: __zen('time'),
                user: __zen('user'),
                detail: __zen('detail'),
                menu_name: __zen('menu_name'),
                confirm: __zen('confirm'),
                cancel: __zen('cancel_diff')
            });

    }

});