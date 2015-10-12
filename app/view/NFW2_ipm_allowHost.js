
Ext.define('NFW2.view.NFW2_ipm_allowHost', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_ipm_allowhost',

    requires: [
        'NFW2.view.NFW2_ipm_allowHostViewModel',
        'Ext.form.Panel',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.grid.column.Action',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'nfw2_ipm_allowhost'
    },
    cls: 'zen_body',
    id: 'NFW2_ipm_allowHost',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'ipm_host_grid',
                            header: false,
                            title: 'My Grid Panel',
                            columnLines: true,
                            store: 'store_ipm_host_list',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    width: 60,
                                    align: 'center',
                                    dataIndex: 'string',
                                    text: 'N'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'interface',
                                    flex: 1,
                                    bind: {
                                        text: '{inter}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var result = [];

                                        for(var i in value){
                                            if(value[i] !== null){ result.push(value[i]); }
                                        }

                                        if(result.length === 1){
                                            return result[0];
                                        }
                                        else{
                                            console.log(1);
                                            return result.join('</br>');
                                        }
                                    },
                                    dataIndex: 'ip',
                                    flex: 1,
                                    bind: {
                                        text: '{ip}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var result = [];

                                        for(var i in value){
                                            if(value[i] !== null){ result.push(value[i]); }
                                        }

                                        if(result.length === 1){
                                            return result[0];
                                        }
                                        else{
                                            return result.join('</br>');
                                        }
                                    },
                                    dataIndex: 'mac',
                                    flex: 1,
                                    bind: {
                                        text: '{mac}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if(value.length !== 0){
                                            var s_unix = unixTimeConvert(value.s_date,"YMDHM","GMT");
                                            var d_unix = unixTimeConvert(value.e_date,"YMDHM","GMT");
                                            var s_time = s_unix.split(':');
                                            var d_time = d_unix.split(':');

                                            return s_time[0] + "시 " +"- "+ d_time[0] + "시";
                                        }
                                        else{
                                            return "";
                                        }
                                    },
                                    width: 230,
                                    dataIndex: 'schedule',
                                    bind: {
                                        text: '{term_use}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    hidden: true,
                                    flex: 1.5,
                                    bind: {
                                        text: '{schedule}'
                                    },
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(value !== undefined){
                                                    var period = value.period.join('<br>');

                                                    return period;
                                                }
                                                else{
                                                    return "";
                                                }
                                            },
                                            width: 170,
                                            dataIndex: 'schedule',
                                            text: '기간'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(value !== undefined){
                                                    var result = [];

                                                    var month = value.month.join(', ');

                                                    if(month !== ""){ result.push('월 : '+month); }

                                                    return result;
                                                }
                                                else{
                                                    return "";
                                                }
                                            },
                                            width: 110,
                                            dataIndex: 'schedule',
                                            text: '매년'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(value !== undefined){
                                                    var result = [];

                                                    var day = value.day.join(', ');

                                                    if(day !== ""){ result.push('일 : '+day); }

                                                    return result;
                                                }
                                                else{
                                                    return "";
                                                }
                                            },
                                            width: 110,
                                            dataIndex: 'schedule',
                                            text: '매월'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(value !== undefined){
                                                    var result = [];
                                                    var week_temp = [];
                                                    if(value.week_list[0].chk_sun === "on"){ week_temp.push("일"); }
                                                    if(value.week_list[0].chk_mon === "on"){ week_temp.push("월"); }
                                                    if(value.week_list[0].chk_tue === "on"){ week_temp.push("화"); }
                                                    if(value.week_list[0].chk_wed === "on"){ week_temp.push("수"); }
                                                    if(value.week_list[0].chk_thu === "on"){ week_temp.push("목"); }
                                                    if(value.week_list[0].chk_fri === "on"){ week_temp.push("금"); }
                                                    if(value.week_list[0].chk_sat === "on"){ week_temp.push("토"); }

                                                    var week = week_temp.join(', ');

                                                    if(week !== ""){ result.push('요일 : '+week); }

                                                    return result;
                                                }
                                                else{
                                                    return "";
                                                }
                                            },
                                            width: 110,
                                            dataIndex: 'schedule',
                                            text: '매주'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'desc',
                                    flex: 3,
                                    bind: {
                                        text: '{desc}'
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 45,
                                    align: 'center',
                                    dataIndex: '@chk_use',
                                    bind: {
                                        text: '{use}'
                                    },
                                    items: [
                                        {
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                var me = Ext.getCmp('NFW2_ipm_allowHost');
                                                var use = (record.data['@chk_use'] ==="on")?"off":"on";

                                                var obj = {
                                                    '_id': record.data._id,
                                                    '@chk_use': use
                                                };

                                                var _params = {
                                                    basename: Ext.encode("network_ipm_host"),
                                                    obj : Ext.encode(obj),
                                                    update : Ext.encode(true)
                                                };

                                                request_helper.xmlrpc_call_JsonP(
                                                'ftuctrl',
                                                'setListTypeObj',
                                                _params,
                                                function(response){
                                                    me.get_ipm_host();
                                                }
                                                );
                                            },
                                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                return (r.get('@chk_use') === 'on')? "b_sq_on":"b_sq_off";
                                            },
                                            getTip: function(v, metadatam, r) {
                                                return (r.get('@chk_use') === 'on')? "ON":"OFF";
                                            }
                                        }
                                    ]
                                }
                            ],
                            selModel: {
                                selType: 'checkboxmodel',
                                mode: 'SIMPLE'
                            },
                            listeners: {
                                celldblclick: 'onIpm_host_gridCellDblClick'
                            }
                        }
                    ]
                }
            ]
        }
    ],
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
        afterrender: 'onPanelAfterRender'
    },

    onIpm_host_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0 || cellIndex === 11){ return false; }

        var win = Ext.create('NFW2.view.win_ipm_allowHost',{
            edit : "edit",
            modal : true,
            record : record,
            _id : record.data._id
        });

        win.show();
    },

    onButtonClick: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_ipm_allowHost',{
            modal : true
        });
        win.show();
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var tbl = Ext.getCmp("ipm_host_grid");
        var tbl_sel = tbl.getSelectionModel().getSelection();

        if(tbl_sel.length === 0){
            Ext.Msg.alert("", get_msg("sel_del"));
            return false;
        }
        else{
            Ext.MessageBox.confirm("", get_msg("conf_del"),function(btn){

                if(btn === "yes"){

                    var del = new Array();
                    for(var i=0; i<tbl_sel.length; i++){
                        del.push(tbl_sel[i].data._id);
                    }

                    showLoadMask();

                    var _params = {
                        basename : Ext.encode('network_ipm_host'),
                        ids : Ext.encode(del)
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'delListTypeObj',
                        _params,

                        function(response){
                            hideLoadMask();
                            Ext.Msg.show({
                                title: __weguardia,
                                width: 300,
                                msg: get_msg('msg_ok_del'),
                                buttons: Ext.Msg.OK,
                                icon: Ext.window.MessageBox.INFO
                            });
                            //                     me.chk_interface("");
                            me.get_ipm_host();
                        }
                    );
                }
            });
        }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        me.get_ipm_host();
    },

    get_ipm_host: function() {
        var me = this;

        var _params = {
            basename : Ext.encode("network_ipm_host")
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _params,

            function(data){
                hideLoadMask();
                setTimeout(function(){ me.setWidth('100%'); },100);
                var record = [];
                for(var i in data.list){
                    var ip_list = [];
                    var mac_list = [];

                    for(var j in data.list[i]){
                        if(j.match('ip')){ ip_list.push(data.list[i][j]); }
                        if(j.match('mac')){ mac_list.push(data.list[i][j]); }
                    }

                    record.push({
                        '@chk_use' : data.list[i]['@chk_use'],
                        'interface' : data.list[i].interface,
                        'ip' : ip_list,
                        'mac' : mac_list,
                        'schedule' : data.list[i].schedule,
                        'desc' : data.list[i].desc,
                        '_id' : data.list[i]._id,
                        'name' : data.list[i].name,
                        'network_manager' : data.list[i].network_manager,
                        'action' : data.list[i].action
                    });
                }
                Ext.data.StoreManager.lookup('store_ipm_host_list').loadData(record);

                var _params = {
                    basename : Ext.encode("network_ipm_manager")
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'getObjects',
                    _params,

                    function(data){
                        hideLoadMask();
                        var record = [];
                        for(var i in data.list){
                            record.push({
                                'name' : data.list[i].name,
                                'interface' : data.list[i].interface,
                                'ip' : data.list[i].ip,
                                'action' : data.list[i].action
                            });
                        }
                        Ext.data.StoreManager.lookup('store_ipm_host_manager_list').loadData(record);
                    }
                );
            }
        );
    }

});