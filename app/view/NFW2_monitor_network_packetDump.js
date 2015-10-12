
Ext.define('NFW2.view.NFW2_monitor_network_packetDump', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_monitor_network_packetdump',

    requires: [
        'NFW2.view.NFW2_monitor_network_packetDumpViewModel',
        'Ext.form.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.grid.column.Action'
    ],

    viewModel: {
        type: 'nfw2_monitor_network_packetdump'
    },
    cls: 'zen_body',
    id: 'NFW2_monitor_network_packetDump',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'container',
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
                    ]
                },
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'monitor_packet_grid',
                            header: false,
                            title: 'My Grid Panel',
                            store: 'store_monitor_packet_list',
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
                                    flex: 1,
                                    bind: {
                                        text: '{name}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'start_time',
                                    flex: 1,
                                    bind: {
                                        text: '{hours}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if(value === 'any'){ return 'Any'; }
                                        return value;
                                    },
                                    dataIndex: 'iface',
                                    flex: 0.7,
                                    bind: {
                                        text: '{inter}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    flex: 2,
                                    bind: {
                                        text: '{filter}'
                                    },
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(value.protocol === 'any'){ return 'Any'; }
                                                return value.protocol;
                                            },
                                            dataIndex: 'filter',
                                            bind: {
                                                text: '{protocol}'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(value.src_addr === 'any'){ return 'Any'; }
                                                return value.src_addr;
                                            },
                                            dataIndex: 'filter',
                                            bind: {
                                                text: '{src}'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(value.src_port === 'any'){ return 'Any'; }
                                                return value.src_port;
                                            },
                                            dataIndex: 'filter',
                                            bind: {
                                                text: '{src_port}'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(value.direction === '->'){ return '<img src="../images/arrow_01.png">'; }
                                                else{ return '<img src="../images/arrow_02.png">'; }
                                            },
                                            width: 40,
                                            align: 'center',
                                            dataIndex: 'filter'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(value.dst_addr === 'any'){ return 'Any'; }
                                                return value.dst_addr;
                                            },
                                            dataIndex: 'filter',
                                            bind: {
                                                text: '{dest}'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(value.dst_port === 'any'){ return 'Any'; }
                                                return value.dst_port;
                                            },
                                            dataIndex: 'filter',
                                            bind: {
                                                text: '{dest_port}'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return addComma(value);
                                    },
                                    dataIndex: 'packet_count',
                                    flex: 1,
                                    bind: {
                                        text: '{max_packet_dump}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var wid = Ext.getCmp('packet_status_col').getWidth();
                                        var progress_num;

                                        if(record.data.use === "stop"){
                                            if(value.last_captured === 0){
                                                progress_num = 0;
                                            }
                                            else{
                                                var size = byteConvert(value.last_size);
                                                progress_num = (value.last_captured/record.data.packet_count)*100;
                                                return '<div class="graph" style="width:'+(wid-125)+'px;border-left:1px solid #bdbdbe;margin-right:5px;"><strong class="bar_g" style="width:'+progress_num+'%;border:none;"></strong></div><div style="width:100px;">'+addComma(value.last_captured)+"("+size+')</div>';
                                            }

                                            return '<div class="graph" style="width:'+(wid-125)+'px;border-left:1px solid #bdbdbe;margin-right:5px;"><strong class="bar_g" style="width:'+progress_num+'%;border:none;"></strong></div><div style="width:100px;">'+addComma(value.last_captured)+"/"+addComma(record.data.packet_count)+'</div>';
                                        }
                                        else{
                                            if(value.last_captured === 0){ progress_num = 0;}
                                            else{ progress_num = (value.last_captured/record.data.packet_count)*100; }

                                            return '<div class="graph" style="width:'+(wid-125)+'px;border-left:1px solid #bdbdbe;margin-right:5px;"><strong class="bar_g" style="width:'+progress_num+'%;border:none;"></strong></div><div style="width:100px;">'+addComma(value.last_captured)+"/"+addComma(record.data.packet_count)+'</div>';
                                        }
                                    },
                                    id: 'packet_status_col',
                                    dataIndex: 'progress',
                                    flex: 1.5,
                                    bind: {
                                        text: '{progress}'
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    defaultRenderer: function(v, cellValues, record, rowIdx, colIdx, store, view) {
                                        var me = this,
                                            prefix = Ext.baseCSSPrefix,
                                            scope = me.origScope || me,
                                            items = me.items,
                                            len = items.length,
                                            i = 0,
                                            item, ret, disabled, tooltip;

                                        ret = Ext.isFunction(me.origRenderer) ? me.origRenderer.apply(scope, arguments) || '' : '';

                                        cellValues.tdCls += ' ' + Ext.baseCSSPrefix + 'action-col-cell';
                                        for (; i < len; i++) {
                                            item = items[i];

                                            disabled = item.disabled || (item.isDisabled ? item.isDisabled.call(item.scope || scope, view, rowIdx, colIdx, item, record) : false);
                                            tooltip = disabled ? null : (item.tooltip || (item.getTip ? item.getTip.apply(item.scope || scope, arguments) : null));

                                            if (!item.hasActionConfiguration) {
                                                item.stopSelection = me.stopSelection;
                                                item.disable = Ext.Function.bind(me.disableAction, me, [i], 0);
                                                item.enable = Ext.Function.bind(me.enableAction, me, [i], 0);
                                                item.hasActionConfiguration = true;
                                            }

                                            ret += '<img role="button" alt="' + (item.altText || me.altText) + '" src="' + (item.icon || Ext.BLANK_IMAGE_URL) +
                                            '" class="' + me.actionIconCls + ' ' + prefix + 'action-col-' + String(i) + ' ' + (disabled ? prefix + 'item-disabled ' : ' ') +
                                            (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope || scope, arguments) : (item.iconCls || me.iconCls || '')) + '"' +
                                            (tooltip ? ' data-qtip="' + tooltip + '"' : '') + ' />';
                                        }
                                        return ret;
                                    },
                                    id: 'packet_action_col',
                                    width: 75,
                                    align: 'center',
                                    items: [
                                        {
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                var me = Ext.getCmp('NFW2_monitor_network_packetDump');
                                                var store = Ext.data.StoreManager.lookup('store_monitor_packet_list');

                                                if(me.start_id.length > 2){
                                                    Ext.Msg.alert("", get_msg("err_packet_cnt"));
                                                    return false;
                                                }

                                                if(record.data.progress.last_captured !== 0){
                                                    Ext.Msg.show({
                                                        title: __weguardia,
                                                        msg: get_msg("msg_packet_reset"),
                                                        width: 420,
                                                        buttons: Ext.Msg.YESNO,
                                                        buttonText:{
                                                            yes: __zen('confirm'),
                                                            no: __zen('cancel')
                                                        },
                                                        fn: function(btn){
                                                            if(btn === "yes"){
                                                                var filter = {
                                                                    'proto' : record.data.filter.protocol,
                                                                    'direction' : record.data.filter.direction,
                                                                    'src_addr' : record.data.filter.src_addr,
                                                                    'src_port' : record.data.filter.src_port,
                                                                    'dst_addr' : record.data.filter.dst_addr,
                                                                    'dst_port' : record.data.filter.dst_port
                                                                };

                                                                var args = {
                                                                    '_id' : record.data.id,
                                                                    'iface' : record.data.iface,
                                                                    'packet_count' : record.data.packet_count,
                                                                    'filter' : filter
                                                                };

                                                                var _params = {
                                                                    exec_type : Ext.encode('start'),
                                                                    args : Ext.encode(args)
                                                                };

                                                                request_helper.xmlrpc_call_JsonP(
                                                                'ftuctrl',
                                                                'execPacketDump',
                                                                _params,
                                                                function(response){
                                                                    var chk = false;
                                                                    for(var i in me.start_id){
                                                                        if(me.start_id[i] === record.data.id){ chk = true; }
                                                                    }
                                                                    if(chk === false){
                                                                        me.start_id.push(record.data.id);
                                                                    }

                                                                    var src_record = [];
                                                                    for(var j in store.data.items){
                                                                        src_record.push(store.data.items[j].data);
                                                                        if(record.data.id === store.data.items[j].data.id){ src_record[j].use = "start"; }
                                                                    }
                                                                    store.loadData(src_record);
                                                                    Ext.getCmp('monitor_packet_grid').getView().refresh();
                                                                }
                                                                );
                                                            }
                                                        },
                                                        icon: Ext.window.MessageBox.INFO
                                                    });
                                                }
                                                else{
                                                    var filter = {
                                                        'proto' : record.data.filter.protocol,
                                                        'direction' : record.data.filter.direction,
                                                        'src_addr' : record.data.filter.src_addr,
                                                        'src_port' : record.data.filter.src_port,
                                                        'dst_addr' : record.data.filter.dst_addr,
                                                        'dst_port' : record.data.filter.dst_port
                                                    };

                                                    var args = {
                                                        '_id' : record.data.id,
                                                        'iface' : record.data.iface,
                                                        'packet_count' : record.data.packet_count,
                                                        'filter' : filter
                                                    };

                                                    var _params = {
                                                        exec_type : Ext.encode('start'),
                                                        args : Ext.encode(args)
                                                    };

                                                    request_helper.xmlrpc_call_JsonP(
                                                    'ftuctrl',
                                                    'execPacketDump',
                                                    _params,
                                                    function(response){

                                                        var chk = false;
                                                        for(var i in me.start_id){
                                                            if(me.start_id[i] === record.data.id){ chk = true; }
                                                        }
                                                        if(chk === false){
                                                            me.start_id.push(record.data.id);
                                                        }

                                                        var src_record = [];
                                                        for(var j in store.data.items){
                                                            src_record.push(store.data.items[j].data);
                                                            if(record.data.id === store.data.items[j].data.id){ src_record[j].use = "start"; }
                                                        }

                                                        store.loadData(src_record);
                                                        Ext.getCmp('monitor_packet_grid').getView().refresh();
                                                    }
                                                    );
                                                }

                                            },
                                            isDisabled: function(view, rowIndex, colIndex, item, record) {
                                                return record.get('use') !== 'stop';
                                            },
                                            iconCls: 'dump_start'
                                        },
                                        {
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                var me = Ext.getCmp('NFW2_monitor_network_packetDump');
                                                var store = Ext.data.StoreManager.lookup('store_monitor_packet_list');

                                                var _params = {
                                                    exec_type : Ext.encode('stop'),
                                                    args : Ext.encode({'_id':record.data.id})
                                                };

                                                request_helper.xmlrpc_call_JsonP(
                                                'ftuctrl',
                                                'execPacketDump',
                                                _params,
                                                function(response){
                                                    var chk = false;
                                                    for(var i in me.start_id){
                                                        if(me.start_id[i] === record.data.id){ me.start_id.splice(i,1); }
                                                    }

                                                    var src_record = [];
                                                    for(var j in store.data.items){
                                                        src_record.push(store.data.items[j].data);
                                                        if(record.data.id === store.data.items[j].data.id){ src_record[j].use = "stop"; }
                                                    }
                                                    store.loadData(src_record);
                                                    Ext.getCmp('monitor_packet_grid').getView().refresh();
                                                }
                                                );
                                            },
                                            isDisabled: function(view, rowIndex, colIndex, item, record) {
                                                return record.get('use') !== 'start';
                                            },
                                            iconCls: 'dump_stop'
                                        },
                                        {
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                var fileName = record.data.id+".pcap";
                                                var path = '/ferret/network/packet_dump/dump/';

                                                document.location.href = '/fileDownloadCommon?filePath='+ Ext.encode(path)+"&fileName="+Ext.encode(fileName)+"&filePathFlag="+Ext.encode('true');
                                            },
                                            isDisabled: function(view, rowIndex, colIndex, item, record) {
                                                return record.data.progress.last_captured === 0 || record.get('use') === 'start';
                                            },
                                            iconCls: 'dump_export'
                                        }
                                    ]
                                }
                            ],
                            selModel: {
                                selType: 'checkboxmodel',
                                mode: 'SIMPLE',
                                checkOnly: true
                            },
                            listeners: {
                                celldblclick: 'onMonitor_packet_gridCellDblClick'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onNFW2_monitor_network_packetDumpAfterRender',
        beforedestroy: 'onNFW2_monitor_network_packetDumpBeforeDestroy'
    },

    onButtonClick: function(button, e, eOpts) {
        var store = Ext.data.StoreManager.lookup('store_monitor_packet_list');

        if(store.getCount() > 9){
            Ext.Msg.show({
                title: __weguardia,
                width: 300,
                msg: ValidMaxCnt(10),
                buttons: Ext.Msg.OK,
                fn: setWinClose,
                icon: Ext.window.MessageBox.INFO
            });
        }
        else{
            var win = Ext.create('NFW2.view.win_packet_dump',{
                modal : true
            });

            win.show();
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var tbl = Ext.getCmp("monitor_packet_grid");
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
                        del.push(tbl_sel[i].data.id);
                        for(var j in me.start_id){
                            if(me.start_id[j] === tbl_sel[i].data.id){ me.start_id.splice(j,1); }
                        }
                    }

                    var _params = {
                        basename : Ext.encode('packet_dump'),
                        ids : Ext.encode(del)
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'delListTypeObj',
                        _params,
                        function(response){
                            me.get_packet_dump();
                            Ext.Msg.show({
                                title: __weguardia,
                                width: 300,
                                msg: get_msg('msg_ok_del'),
                                buttons: Ext.Msg.OK,
                                icon: Ext.window.MessageBox.INFO
                            });
                        }
                    );

                }
            });
        }
    },

    onMonitor_packet_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0 || cellIndex === 13){ return false; }

        var win = Ext.create('NFW2.view.win_packet_dump',{
            edit : "edit",
            edit_index : rowIndex,
            modal : true,
            record : record
        });

        win.show();
    },

    onNFW2_monitor_network_packetDumpAfterRender: function(component, eOpts) {
        var me = this;
        me.start_id = [];
        var _params = {
            basename : Ext.encode('packet_dump')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _params,
            function(response){
                hideLoadMask();
                setTimeout(function(){ me.setWidth('100%'); },100);
                var record = [];
                if(response.list !== null){
                    for(var i in response.list){
                        var status;
                        var progress={};

                        if(response.list[i].status === undefined){ status = 0; }
                        else{ status = response.list[i].status; }
                        if(response.list[i].progress === undefined){ progress = {'last_captured':0}; }
                        else{ progress = response.list[i].progress; }

                        record.push({
                            'name' : response.list[i].name,
                            'iface' : response.list[i].iface,
                            'start_time' : response.list[i].start_time,
                            'packet_count' : response.list[i].packet_count,
                            'filter' : response.list[i].filter,
                            'id' : response.list[i]._id,
                            'status' : status,
                            'use' : 'stop',
                            'progress' : progress
                        });

                        if(response.list[i].start_time !== ""){ me.start_id.push(response.list[i]._id); }
                    }

                    Ext.data.StoreManager.lookup('store_monitor_packet_list').loadData(record);
                    if(me.start_id.length > 0){
                        var _params = {
                            exec_type : Ext.encode('update_status'),
                            args : Ext.encode({'_ids':me.start_id})
                        };

                        request_helper.xmlrpc_call_JsonP(
                            'ftuctrl',
                            'execPacketDump',
                            _params,

                            function(response){
                                for(var i in response){
                                    var chk = false;
                                    var chk_use = false;

                                    if(response[i].is_running === false){ chk = true; }

                                    if(chk === true){
                                        for(var j in me.start_id){
                                            if(me.start_id[j] === i){ me.start_id.splice(j,1); chk_use = true; }
                                        }
                                    }
                                }
                                me.get_packet_dump();
                            }
                        );
                    }
                }
            }
        );

        me.interval = setInterval(me.get_packet_dump, 2000);
    },

    onNFW2_monitor_network_packetDumpBeforeDestroy: function(component, eOpts) {
        var me = this;

        clearInterval(me.interval);
    },

    get_packet_dump: function() {
        var me = Ext.getCmp('NFW2_monitor_network_packetDump');

        var _params = {
            basename : Ext.encode('packet_dump')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _params,
            function(response){
                var record = [];
                if(response.list !== null){
                    var store = Ext.data.StoreManager.lookup('store_monitor_packet_list');
                    var record_change = [];

                    for(var i in response.list){
                        var status;
                        var progress = {};
                        var use_chk;

                        for(var j in store.data.items){
                            if(store.data.items[j].data.id === response.list[i]._id){ use_chk = store.data.items[j].data.use; }
                        }

                        if(response.list[i].status === undefined){ status = 0; }
                        else{ status = response.list[i].status; }
                        if(response.list[i].progress === undefined){ progress = {'last_captured':0}; use_chk = "stop"; }
                        else{
                            progress = response.list[i].progress;
                            if(response.list[i].progress.is_running === true){ use_chk = "start"; }
                            else{ use_chk = "stop"; }
                        }

                        record.push({
                            'name' : response.list[i].name,
                            'iface' : response.list[i].iface,
                            'start_time' : response.list[i].start_time,
                            'packet_count' : response.list[i].packet_count,
                            'filter' : response.list[i].filter,
                            'id' : response.list[i]._id,
                            'status' : status,
                            'use' : use_chk,
                            'progress' : progress
                        });
                    }

                    store.loadData(record);

                    me.get_packet_status();
                }
            }
        );
    },

    get_packet_status: function() {
        var me = Ext.getCmp('NFW2_monitor_network_packetDump');
        var store = Ext.data.StoreManager.lookup('store_monitor_packet_list');

        if(me.start_id.length > 0){
            var _params = {
                exec_type : Ext.encode('update_status'),
                args : Ext.encode({'_ids':me.start_id})
            };

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'execPacketDump',
                _params,

                function(response){
                    for(var i in response){
                        var chk = false;
                        var chk_use = false;

                        if(response[i].is_running === false){ chk = true; }

                        if(chk === true){
                            for(var j in me.start_id){
                                if(me.start_id[j] === i){ me.start_id.splice(j,1); chk_use = true; }
                            }
                        }
                    }
                }
            );
        }
    }

});