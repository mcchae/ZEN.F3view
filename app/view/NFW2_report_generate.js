
Ext.define('NFW2.view.NFW2_report_generate', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_report_generate',

    requires: [
        'NFW2.view.NFW2_report_generateViewModel',
        'Ext.form.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.Img',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.RowExpander',
        'Ext.XTemplate'
    ],

    viewModel: {
        type: 'nfw2_report_generate'
    },
    cls: 'zen_body',
    id: 'NFW2_report_generate',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onNFW2_report_generateAfterRender'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        itemId: 'fm',
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
                                                id: 'report_generate_add_btn',
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
                                                id: 'report_generate_del_btn',
                                                iconCls: 'ic_del',
                                                bind: {
                                                    text: '{del}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick3'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                id: 'report_generate_inter_btn',
                                                bind: {
                                                    text: '{add_intgrate_report}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick2'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                id: 'report_generate_con',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        margin: '5 0 0 0',
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                height: 28,
                                                style: 'background:url(../images/blbox_bg.gif); color:#fff;',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'image',
                                                        height: 28,
                                                        id: 'day_report_img',
                                                        margin: '0 0 0 5',
                                                        width: 20,
                                                        src: '../images/blbox_close.gif'
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        margin: '6 0 0 5',
                                                        style: 'color:black',
                                                        bind: {
                                                            text: '{report_daily}'
                                                        }
                                                    }
                                                ],
                                                listeners: {
                                                    render: 'onContainerRender'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                hidden: true,
                                                id: 'day_report_grid_con',
                                                items: [
                                                    {
                                                        xtype: 'gridpanel',
                                                        id: 'day_report_grid',
                                                        header: false,
                                                        title: 'My Grid Panel',
                                                        columnLines: true,
                                                        store: 'store_atoz_report_day_list',
                                                        columns: [
                                                            {
                                                                xtype: 'rownumberer',
                                                                width: 60,
                                                                align: 'center',
                                                                dataIndex: '@num',
                                                                text: 'N'
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                align: 'center',
                                                                dataIndex: 'name',
                                                                flex: 0.3,
                                                                bind: {
                                                                    text: '{report_name}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                align: 'center',
                                                                dataIndex: 'desc',
                                                                flex: 0.4,
                                                                bind: {
                                                                    text: '{desc}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return __zen('generate_time') + " : " + value[0].time + __zen('hour');
                                                                },
                                                                align: 'center',
                                                                dataIndex: 'setting',
                                                                flex: 0.3,
                                                                bind: {
                                                                    text: '{set}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                align: 'center',
                                                                dataIndex: 'report_cnt',
                                                                flex: 0.3,
                                                                bind: {
                                                                    text: '{generate_count}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'actioncolumn',
                                                                width: 75,
                                                                align: 'center',
                                                                items: [
                                                                    {
                                                                        getTip: function(v, metadatam, r) {
                                                                            return (r.get('use') === 'on')? "ON":"OFF";
                                                                        },
                                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                            var use = (record.data.use ==="on")?"off":"on";

                                                                            var obj = {
                                                                                '_id': record.data.id,
                                                                                'use': use
                                                                            };

                                                                            var _params = {
                                                                                basename: Ext.encode("atoz_report"),
                                                                                obj : Ext.encode(obj),
                                                                                update : Ext.encode(true)
                                                                            };

                                                                            request_helper.xmlrpc_call_JsonP(
                                                                            'ftuctrl',
                                                                            'setListTypeObj',
                                                                            _params,
                                                                            function(response){
                                                                                Ext.getCmp('NFW2_report_generate').get_report();
                                                                            }
                                                                            );
                                                                        },
                                                                        getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                                            return (r.get('use') === 'on')? "b_sq_on":"b_sq_off";
                                                                        },
                                                                        iconCls: 'atoz_use'
                                                                    },
                                                                    {
                                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                            var in_report = [];
                                                                            in_report = record.data.report;
                                                                            var store = Ext.data.StoreManager.lookup('store_atoz_report_day_list');
                                                                            var rep_cnt = record.data.report_cnt;
                                                                            var month = new Date().getMonth()+1;
                                                                            var day = new Date().getFullYear() + "-" + month + "-" + new Date().getDate();
                                                                            var grid = Ext.getCmp('day_report_grid');
                                                                            var store = grid.getStore();
                                                                            var expander = grid.getPlugin('expander_day');

                                                                            var record = store.getAt(rowIndex);
                                                                            if(!expander.recordsExpanded[record.internalId]){
                                                                                expander.toggleRow(rowIndex, record);
                                                                            }

                                                                            if(record.data.report_cnt !== 0){
                                                                                var exp_store = Ext.getCmp('_grid'+store.data.items[rowIndex].data.id).getStore();

                                                                                for(var l in exp_store.data.items){
                                                                                    var temp = exp_store.data.items[l].data.create_day.split(' ');
                                                                                    if(temp[2] === day){
                                                                                        Ext.Msg.show({
                                                                                            title: 'WeGuardia™ ZEN',
                                                                                            width: 300,
                                                                                            msg: get_msg('err_atoz_dob'),
                                                                                            buttons: Ext.Msg.OK,
                                                                                            fn: setWinClose,
                                                                                            icon: Ext.window.MessageBox.INFO
                                                                                        });
                                                                                        return false;
                                                                                    }
                                                                                }
                                                                            }

                                                                            in_report.push({
                                                                                'date':day,
                                                                                'id':record.data.id+'_'+rep_cnt
                                                                            });

                                                                            for(var i in in_report){
                                                                                in_report[i].id = record.data.id+'_'+i;
                                                                            }

                                                                            for(var j in store.data.items){
                                                                                if(Ext.getCmp('_grid'+store.data.items[j].data.id) !== undefined){
                                                                                    Ext.getCmp('_grid'+store.data.items[j].data.id).destroy();
                                                                                }
                                                                            }
                                                                            rep_cnt++;

                                                                            var obj = {
                                                                                '_id': record.data.id,
                                                                                'report': in_report,
                                                                                'report_cnt' : in_report.length
                                                                            };

                                                                            var _params = {
                                                                                basename: Ext.encode("atoz_report"),
                                                                                obj : Ext.encode(obj),
                                                                                update : Ext.encode(true)
                                                                            };

                                                                            request_helper.xmlrpc_call_JsonP(
                                                                            'ftuctrl',
                                                                            'setListTypeObj',
                                                                            _params,
                                                                            function(response){
                                                                                var _params2 = {
                                                                                    id: Ext.encode(record.data.id)
                                                                                };
                                                                                //         showLoadMask();
                                                                                Ext.getCmp('day_report_grid').mask("Loading...");
                                                                                request_helper.xmlrpc_call_JsonP(
                                                                                'ftsctrl',
                                                                                'instanceCreationAtoZReport',
                                                                                _params2,
                                                                                function(response){
                                                                                    Ext.getCmp('day_report_grid').unmask();
                                                                                    var date_cre = record.data.report[in_report.length-1].date;
                                                                                    var set_date = date_cre.split('-');
                                                                                    var set_d1 = set_date[0];
                                                                                    var set_d2 = set_date[1];
                                                                                    var set_d3 = set_date[2];

                                                                                    if(set_d2.length === 1){ set_d2 = "0"+set_d2; }
                                                                                    if(set_d3.length === 1){ set_d3 = "0"+set_d3; }

                                                                                    var write_time = set_d1+set_d2+set_d3;

                                                                                    var _params = {
                                                                                        id: Ext.encode(record.data.id),
                                                                                        name : Ext.encode(record.data.name),
                                                                                        cycle : Ext.encode(record.data.setting[0].form.cycle),
                                                                                        date : Ext.encode(write_time)
                                                                                    };

                                                                                    request_helper.xmlrpc_call_JsonP(
                                                                                    'ftsctrl',
                                                                                    'writeAtoZReportInfo',
                                                                                    _params,
                                                                                    function(response){
                                                                                        var pdf_param = {
                                                                                            name : Ext.encode('atoz_report'),
                                                                                            pdf_name : Ext.encode(record.data.name+"_"+write_time)
                                                                                        };

                                                                                        Ext.Ajax.request({
                                                                                            url : '/createPDF',
                                                                                            method : 'GET',
                                                                                            params : pdf_param,
                                                                                            success : function(response, opts){
                                                                                                hideLoadMask();

                                                                                            },
                                                                                            failure : function(req,err){
                                                                                                console.log(req);
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                    );
                                                                                }
                                                                                );
                                                                                Ext.getCmp('NFW2_report_generate').get_report();
                                                                            }
                                                                            );
                                                                        },
                                                                        iconCls: 'atoz_create'
                                                                    },
                                                                    {
                                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                            var win = Ext.create('NFW2.view.win_report_generate',{
                                                                                modal : true,
                                                                                record : record.data,
                                                                                edit : "edit"
                                                                            });

                                                                            win.show();

                                                                        },
                                                                        iconCls: 'atoz_edit'
                                                                    }
                                                                ]
                                                            }
                                                        ],
                                                        viewConfig: {
                                                            getRowClass: function(record, rowIndex, rowParams, store) {
                                                                if(record.get("use") === "off"){

                                                                    Ext.Function.defer(function(){
                                                                        this.removeRowCls(rowIndex, 'x-grid-row-alt');
                                                                    },100, this);

                                                                    return "stOff";
                                                                }
                                                            },
                                                            listeners: {
                                                                beforecellmousedown: 'onTableBeforeCellMouseDown',
                                                                collapsebody: 'onTableCollapsebody1'
                                                            }
                                                        },
                                                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                                                            selType: 'checkboxmodel',
                                                            mode: 'SIMPLE',
                                                            checkOnly: true,
                                                            listeners: {
                                                                select: 'onCheckboxModelSelect',
                                                                deselect: 'onCheckboxModelDeselect'
                                                            }
                                                        }),
                                                        listeners: {
                                                            afterrender: 'onDay_report_gridAfterRender',
                                                            celldblclick: 'onDay_report_gridCellDblClick'
                                                        },
                                                        plugins: [
                                                            {
                                                                ptype: 'rowexpander',
                                                                pluginId: 'expander_day',
                                                                expandOnDblClick: false,
                                                                expandOnEnter: false,
                                                                rowBodyTpl: [
                                                                    '<div id="daygrid_{id}" ></div>'
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        margin: '5 0 0 0',
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                height: 28,
                                                style: 'background:url(../images/blbox_bg.gif); color:#fff;',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'image',
                                                        height: 28,
                                                        id: 'week_report_img',
                                                        margin: '0 0 0 5',
                                                        width: 20,
                                                        src: '../images/blbox_close.gif'
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        margin: '6 0 0 5',
                                                        style: 'color:black',
                                                        bind: {
                                                            text: '{report_weekly}'
                                                        }
                                                    }
                                                ],
                                                listeners: {
                                                    render: 'onContainerRender1'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                hidden: true,
                                                id: 'week_report_grid_con',
                                                items: [
                                                    {
                                                        xtype: 'gridpanel',
                                                        id: 'week_report_grid',
                                                        header: false,
                                                        title: 'My Grid Panel',
                                                        columnLines: true,
                                                        store: 'store_atoz_report_week_list',
                                                        columns: [
                                                            {
                                                                xtype: 'rownumberer',
                                                                width: 60,
                                                                align: 'center',
                                                                dataIndex: '@num',
                                                                text: 'N'
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                align: 'center',
                                                                dataIndex: 'name',
                                                                flex: 0.3,
                                                                bind: {
                                                                    text: '{report_name}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                align: 'center',
                                                                dataIndex: 'desc',
                                                                flex: 0.4,
                                                                bind: {
                                                                    text: '{desc}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return __zen('generate_time') + " : " + value[0].time + __zen('hour');
                                                                },
                                                                align: 'center',
                                                                dataIndex: 'setting',
                                                                flex: 0.3,
                                                                bind: {
                                                                    text: '{set}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                align: 'center',
                                                                dataIndex: 'report_cnt',
                                                                flex: 0.3,
                                                                bind: {
                                                                    text: '{generate_count}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'actioncolumn',
                                                                width: 75,
                                                                align: 'center',
                                                                items: [
                                                                    {
                                                                        getTip: function(v, metadatam, r) {
                                                                            return (r.get('use') === 'on')? "ON":"OFF";
                                                                        },
                                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {

                                                                            var use = (record.data.use ==="on")?"off":"on";

                                                                            var obj = {
                                                                                '_id': record.data.id,
                                                                                'use': use
                                                                            };

                                                                            var _params = {
                                                                                basename: Ext.encode("atoz_report"),
                                                                                obj : Ext.encode(obj),
                                                                                update : Ext.encode(true)
                                                                            };

                                                                            request_helper.xmlrpc_call_JsonP(
                                                                            'ftuctrl',
                                                                            'setListTypeObj',
                                                                            _params,
                                                                            function(response){
                                                                                Ext.getCmp('NFW2_report_generate').get_report();
                                                                            }
                                                                            );
                                                                        },
                                                                        getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                                            return (r.get('use') === 'on')? "b_sq_on":"b_sq_off";
                                                                        },
                                                                        iconCls: 'atoz_use'
                                                                    },
                                                                    {
                                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {

                                                                            var in_report = [];
                                                                            in_report = record.data.report;
                                                                            var rep_cnt = record.data.report_cnt;
                                                                            var store = Ext.data.StoreManager.lookup('store_atoz_report_week_list');
                                                                            var month = new Date().getMonth()+1;
                                                                            var day = new Date().getFullYear() + "-" + month + "-" + new Date().getDate();
                                                                            var grid = Ext.getCmp('week_report_grid');
                                                                            var store = grid.getStore();
                                                                            var expander = grid.getPlugin('expander_week');

                                                                            var record = store.getAt(rowIndex);
                                                                            if(!expander.recordsExpanded[record.internalId]){
                                                                                expander.toggleRow(rowIndex, record);
                                                                            }

                                                                            if(record.data.report_cnt !== 0){
                                                                                var exp_store = Ext.getCmp('_grid'+store.data.items[rowIndex].data.id).getStore();

                                                                                for(var l in exp_store.data.items){
                                                                                    var temp = exp_store.data.items[l].data.create_day.split(' ');
                                                                                    if(temp[2] === day){
                                                                                        Ext.Msg.show({
                                                                                            title: 'WeGuardia™ ZEN',
                                                                                            width: 300,
                                                                                            msg: get_msg('err_atoz_dob'),
                                                                                            buttons: Ext.Msg.OK,
                                                                                            fn: setWinClose,
                                                                                            icon: Ext.window.MessageBox.INFO
                                                                                        });
                                                                                        return false;
                                                                                    }
                                                                                }
                                                                            }

                                                                            in_report.push({
                                                                                'date':day,
                                                                                'id':record.data.id+'_'+rep_cnt
                                                                            });

                                                                            for(var i in in_report){
                                                                                in_report[i].id = record.data.id+'_'+i;
                                                                            }
                                                                            rep_cnt++;

                                                                            for(var j in store.data.items){
                                                                                if(Ext.getCmp('_grid'+store.data.items[j].data.id) !== undefined){
                                                                                    Ext.getCmp('_grid'+store.data.items[j].data.id).destroy();
                                                                                }
                                                                            }

                                                                            var obj = {
                                                                                '_id': record.data.id,
                                                                                'report': in_report,
                                                                                'report_cnt' : in_report.length
                                                                            };

                                                                            var _params = {
                                                                                basename: Ext.encode("atoz_report"),
                                                                                obj : Ext.encode(obj),
                                                                                update : Ext.encode(true)
                                                                            };

                                                                            request_helper.xmlrpc_call_JsonP(
                                                                            'ftuctrl',
                                                                            'setListTypeObj',
                                                                            _params,
                                                                            function(response){
                                                                                var _params2 = {
                                                                                    id: Ext.encode(record.data.id)
                                                                                };

                                                                                Ext.getCmp('week_report_grid').mask("Loading...");
                                                                                request_helper.xmlrpc_call_JsonP(
                                                                                'ftsctrl',
                                                                                'instanceCreationAtoZReport',
                                                                                _params2,
                                                                                function(response){
                                                                                    Ext.getCmp('week_report_grid').unmask();
                                                                                }
                                                                                );
                                                                                Ext.getCmp('NFW2_report_generate').get_report();
                                                                            }
                                                                            );
                                                                        },
                                                                        iconCls: 'atoz_create'
                                                                    },
                                                                    {
                                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {

                                                                            var win = Ext.create('NFW2.view.win_report_generate',{
                                                                                modal : true,
                                                                                record : record.data,
                                                                                edit : "edit"
                                                                            });

                                                                            win.show();
                                                                        },
                                                                        iconCls: 'atoz_edit'
                                                                    }
                                                                ]
                                                            }
                                                        ],
                                                        viewConfig: {
                                                            getRowClass: function(record, rowIndex, rowParams, store) {
                                                                if(record.get("use") === "off"){

                                                                    Ext.Function.defer(function(){
                                                                        this.removeRowCls(rowIndex, 'x-grid-row-alt');
                                                                    },100, this);

                                                                    return "stOff";
                                                                }
                                                            },
                                                            listeners: {
                                                                beforecellmousedown: 'onTableBeforeCellMouseDown1',
                                                                collapsebody: 'onTableCollapsebody2'
                                                            }
                                                        },
                                                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                                                            selType: 'checkboxmodel',
                                                            mode: 'SIMPLE',
                                                            checkOnly: true,
                                                            listeners: {
                                                                select: 'onCheckboxModelSelect1',
                                                                deselect: 'onCheckboxModelDeselect1'
                                                            }
                                                        }),
                                                        listeners: {
                                                            afterrender: 'onWeek_report_gridAfterRender',
                                                            celldblclick: 'onWeek_report_gridCellDblClick'
                                                        },
                                                        plugins: [
                                                            {
                                                                ptype: 'rowexpander',
                                                                pluginId: 'expander_week',
                                                                expandOnDblClick: false,
                                                                expandOnEnter: false,
                                                                rowBodyTpl: [
                                                                    '<div id="weekgrid_{id}" ></div>'
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        margin: '5 0 0 0',
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                height: 28,
                                                style: 'background:url(../images/blbox_bg.gif); color:#fff;',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'image',
                                                        height: 28,
                                                        id: 'month_report_img',
                                                        margin: '0 0 0 5',
                                                        width: 20,
                                                        src: '../images/blbox_close.gif'
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        margin: '6 0 0 5',
                                                        style: 'color:black',
                                                        bind: {
                                                            text: '{report_monthly}'
                                                        }
                                                    }
                                                ],
                                                listeners: {
                                                    render: 'onContainerRender2'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                hidden: true,
                                                id: 'month_report_grid_con',
                                                items: [
                                                    {
                                                        xtype: 'gridpanel',
                                                        id: 'month_report_grid',
                                                        header: false,
                                                        title: 'My Grid Panel',
                                                        columnLines: true,
                                                        store: 'store_atoz_report_month_list',
                                                        columns: [
                                                            {
                                                                xtype: 'rownumberer',
                                                                width: 60,
                                                                align: 'center',
                                                                dataIndex: '@num',
                                                                text: 'N'
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                align: 'center',
                                                                dataIndex: 'name',
                                                                flex: 0.3,
                                                                bind: {
                                                                    text: '{report_name}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                align: 'center',
                                                                dataIndex: 'desc',
                                                                flex: 0.4,
                                                                bind: {
                                                                    text: '{desc}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return __zen('generate_time') + " : " + value[0].time + __zen('hour');
                                                                },
                                                                align: 'center',
                                                                dataIndex: 'setting',
                                                                flex: 0.3,
                                                                bind: {
                                                                    text: '{set}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                align: 'center',
                                                                dataIndex: 'report_cnt',
                                                                flex: 0.3,
                                                                bind: {
                                                                    text: '{generate_count}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'actioncolumn',
                                                                width: 75,
                                                                align: 'center',
                                                                items: [
                                                                    {
                                                                        getTip: function(v, metadatam, r) {
                                                                            return (r.get('use') === 'on')? "ON":"OFF";
                                                                        },
                                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {

                                                                            var use = (record.data.use ==="on")?"off":"on";

                                                                            var obj = {
                                                                                '_id': record.data.id,
                                                                                'use': use
                                                                            };

                                                                            var _params = {
                                                                                basename: Ext.encode("atoz_report"),
                                                                                obj : Ext.encode(obj),
                                                                                update : Ext.encode(true)
                                                                            };

                                                                            request_helper.xmlrpc_call_JsonP(
                                                                            'ftuctrl',
                                                                            'setListTypeObj',
                                                                            _params,
                                                                            function(response){
                                                                                Ext.getCmp('NFW2_report_generate').get_report();
                                                                            }
                                                                            );
                                                                        },
                                                                        getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                                            return (r.get('use') === 'on')? "b_sq_on":"b_sq_off";
                                                                        },
                                                                        iconCls: 'atoz_use'
                                                                    },
                                                                    {
                                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {

                                                                            var in_report = [];
                                                                            in_report = record.data.report;
                                                                            var rep_cnt = record.data.report_cnt;
                                                                            var store = Ext.data.StoreManager.lookup('store_atoz_report_month_list');
                                                                            var month = new Date().getMonth()+1;
                                                                            var day = new Date().getFullYear() + "-" + month + "-" + new Date().getDate();
                                                                            var grid = Ext.getCmp('month_report_grid');
                                                                            var store = grid.getStore();
                                                                            var expander = grid.getPlugin('expander_month');

                                                                            var record = store.getAt(rowIndex);
                                                                            if(!expander.recordsExpanded[record.internalId]){
                                                                                expander.toggleRow(rowIndex, record);
                                                                            }

                                                                            if(record.data.report_cnt !== 0){
                                                                                var exp_store = Ext.getCmp('_grid'+store.data.items[rowIndex].data.id).getStore();

                                                                                for(var l in exp_store.data.items){
                                                                                    var temp = exp_store.data.items[l].data.create_day.split(' ');
                                                                                    if(temp[2] === day){
                                                                                        Ext.Msg.show({
                                                                                            title: 'WeGuardia™ ZEN',
                                                                                            width: 300,
                                                                                            msg: get_msg('err_atoz_dob'),
                                                                                            buttons: Ext.Msg.OK,
                                                                                            fn: setWinClose,
                                                                                            icon: Ext.window.MessageBox.INFO
                                                                                        });
                                                                                        return false;
                                                                                    }
                                                                                }
                                                                            }

                                                                            in_report.push({
                                                                                'date':day,
                                                                                'id':record.data.id+'_'+rep_cnt
                                                                            });

                                                                            for(var i in in_report){
                                                                                in_report[i].id = record.data.id+'_'+i;
                                                                            }
                                                                            rep_cnt++;
                                                                            for(var j in store.data.items){
                                                                                if(Ext.getCmp('_grid'+store.data.items[j].data.id) !== undefined){
                                                                                    Ext.getCmp('_grid'+store.data.items[j].data.id).destroy();
                                                                                }
                                                                            }

                                                                            var obj = {
                                                                                '_id': record.data.id,
                                                                                'report': in_report,
                                                                                'report_cnt' : in_report.length
                                                                            };

                                                                            var _params = {
                                                                                basename: Ext.encode("atoz_report"),
                                                                                obj : Ext.encode(obj),
                                                                                update : Ext.encode(true)
                                                                            };

                                                                            request_helper.xmlrpc_call_JsonP(
                                                                            'ftuctrl',
                                                                            'setListTypeObj',
                                                                            _params,
                                                                            function(response){
                                                                                var _params2 = {
                                                                                    id: Ext.encode(record.data.id)
                                                                                };
                                                                                Ext.getCmp('month_report_grid').mask("Loading...");
                                                                                request_helper.xmlrpc_call_JsonP(
                                                                                'ftsctrl',
                                                                                'instanceCreationAtoZReport',
                                                                                _params2,
                                                                                function(response){
                                                                                    Ext.getCmp('month_report_grid').unmask();
                                                                                }
                                                                                );
                                                                                Ext.getCmp('NFW2_report_generate').get_report();
                                                                            }
                                                                            );
                                                                        },
                                                                        iconCls: 'atoz_create'
                                                                    },
                                                                    {
                                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {

                                                                            var win = Ext.create('NFW2.view.win_report_generate',{
                                                                                modal : true,
                                                                                record : record.data,
                                                                                edit : "edit"
                                                                            });

                                                                            win.show();
                                                                        },
                                                                        iconCls: 'atoz_edit'
                                                                    }
                                                                ]
                                                            }
                                                        ],
                                                        viewConfig: {
                                                            getRowClass: function(record, rowIndex, rowParams, store) {
                                                                if(record.get("use") === "off"){

                                                                    Ext.Function.defer(function(){
                                                                        this.removeRowCls(rowIndex, 'x-grid-row-alt');
                                                                    },100, this);

                                                                    return "stOff";
                                                                }
                                                            },
                                                            listeners: {
                                                                beforecellmousedown: 'onTableBeforeCellMouseDown2',
                                                                collapsebody: 'onTableCollapsebody'
                                                            }
                                                        },
                                                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                                                            selType: 'checkboxmodel',
                                                            mode: 'SIMPLE',
                                                            checkOnly: true,
                                                            listeners: {
                                                                select: 'onCheckboxModelSelect2',
                                                                deselect: 'onCheckboxModelDeselect2'
                                                            }
                                                        }),
                                                        listeners: {
                                                            afterrender: 'onMonth_report_gridAfterRender',
                                                            celldblclick: 'onMonth_report_gridCellDblClick'
                                                        },
                                                        plugins: [
                                                            {
                                                                ptype: 'rowexpander',
                                                                pluginId: 'expander_month',
                                                                expandOnDblClick: false,
                                                                expandOnEnter: false,
                                                                rowBodyTpl: [
                                                                    '<div id="monthgrid_{id}" ></div>'
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        margin: '5 0 0 0',
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                height: 28,
                                                style: 'background:url(../images/blbox_bg.gif); color:#fff;',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'image',
                                                        height: 28,
                                                        id: 'spe_report_img',
                                                        margin: '0 0 0 5',
                                                        width: 20,
                                                        src: '../images/blbox_close.gif'
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        margin: '6 0 0 5',
                                                        style: 'color:black',
                                                        bind: {
                                                            text: '{report_specific}'
                                                        }
                                                    }
                                                ],
                                                listeners: {
                                                    render: 'onContainerRender3'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                hidden: true,
                                                id: 'spe_report_grid_con',
                                                items: [
                                                    {
                                                        xtype: 'gridpanel',
                                                        id: 'spe_report_grid',
                                                        header: false,
                                                        title: 'My Grid Panel',
                                                        columnLines: true,
                                                        store: 'store_atoz_report_userset_list',
                                                        columns: [
                                                            {
                                                                xtype: 'rownumberer',
                                                                width: 60,
                                                                align: 'center',
                                                                dataIndex: '@num',
                                                                text: 'N'
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                align: 'center',
                                                                dataIndex: 'name',
                                                                flex: 0.3,
                                                                bind: {
                                                                    text: '{report_name}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                align: 'center',
                                                                dataIndex: 'desc',
                                                                flex: 0.4,
                                                                bind: {
                                                                    text: '{desc}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    return __zen('generate_time') + " : " + value[0].time + __zen('hour');
                                                                },
                                                                align: 'center',
                                                                dataIndex: 'setting',
                                                                flex: 0.3,
                                                                bind: {
                                                                    text: '{set}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                align: 'center',
                                                                dataIndex: 'report_cnt',
                                                                flex: 0.3,
                                                                bind: {
                                                                    text: '{generate_count}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'actioncolumn',
                                                                width: 75,
                                                                align: 'center',
                                                                items: [
                                                                    {
                                                                        getTip: function(v, metadatam, r) {
                                                                            return (r.get('use') === 'on')? "ON":"OFF";
                                                                        },
                                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {

                                                                            var use = (record.data.use ==="on")?"off":"on";

                                                                            var obj = {
                                                                                '_id': record.data.id,
                                                                                'use': use
                                                                            };

                                                                            var _params = {
                                                                                basename: Ext.encode("atoz_report"),
                                                                                obj : Ext.encode(obj),
                                                                                update : Ext.encode(true)
                                                                            };

                                                                            request_helper.xmlrpc_call_JsonP(
                                                                            'ftuctrl',
                                                                            'setListTypeObj',
                                                                            _params,
                                                                            function(response){
                                                                                Ext.getCmp('NFW2_report_generate').get_report();
                                                                            }
                                                                            );
                                                                        },
                                                                        getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                                            return (r.get('use') === 'on')? "b_sq_on":"b_sq_off";
                                                                        },
                                                                        iconCls: 'atoz_use'
                                                                    },
                                                                    {
                                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {

                                                                            var in_report = [];
                                                                            in_report = record.data.report;
                                                                            var rep_cnt = record.data.report_cnt;
                                                                            var store = Ext.data.StoreManager.lookup('store_atoz_report_userset_list');
                                                                            var month = new Date().getMonth()+1;
                                                                            var day = new Date().getFullYear() + "-" + month + "-" + new Date().getDate();
                                                                            var grid = Ext.getCmp('spe_report_grid');
                                                                            var store = grid.getStore();
                                                                            var expander = grid.getPlugin('expander_spe');

                                                                            var record = store.getAt(rowIndex);
                                                                            if(!expander.recordsExpanded[record.internalId]){
                                                                                expander.toggleRow(rowIndex, record);
                                                                            }

                                                                            if(record.data.report_cnt !== 0){
                                                                                var exp_store = Ext.getCmp('_grid'+store.data.items[rowIndex].data.id).getStore();

                                                                                for(var l in exp_store.data.items){
                                                                                    var temp = exp_store.data.items[l].data.create_day.split(' ');
                                                                                    if(temp[2] === day){
                                                                                        Ext.Msg.show({
                                                                                            title: 'WeGuardia™ ZEN',
                                                                                            width: 300,
                                                                                            msg: get_msg('err_atoz_dob'),
                                                                                            buttons: Ext.Msg.OK,
                                                                                            fn: setWinClose,
                                                                                            icon: Ext.window.MessageBox.INFO
                                                                                        });
                                                                                        return false;
                                                                                    }
                                                                                }
                                                                            }

                                                                            in_report.push({
                                                                                'date':day,
                                                                                'id':record.data.id+'_'+rep_cnt
                                                                            });

                                                                            for(var i in in_report){
                                                                                in_report[i].id = record.data.id+'_'+i;
                                                                            }
                                                                            rep_cnt++;
                                                                            for(var j in store.data.items){
                                                                                if(Ext.getCmp('_grid'+store.data.items[j].data.id) !== undefined){
                                                                                    Ext.getCmp('_grid'+store.data.items[j].data.id).destroy();
                                                                                }
                                                                            }

                                                                            var obj = {
                                                                                '_id': record.data.id,
                                                                                'report': in_report,
                                                                                'report_cnt' : in_report.length
                                                                            };

                                                                            var _params = {
                                                                                basename: Ext.encode("atoz_report"),
                                                                                obj : Ext.encode(obj),
                                                                                update : Ext.encode(true)
                                                                            };

                                                                            request_helper.xmlrpc_call_JsonP(
                                                                            'ftuctrl',
                                                                            'setListTypeObj',
                                                                            _params,
                                                                            function(response){
                                                                                var _params2 = {
                                                                                    id: Ext.encode(record.data.id)
                                                                                };
                                                                                Ext.getCmp('spe_report_grid').mask("Loading...");
                                                                                request_helper.xmlrpc_call_JsonP(
                                                                                'ftsctrl',
                                                                                'instanceCreationAtoZReport',
                                                                                _params2,
                                                                                function(response){
                                                                                    Ext.getCmp('spe_report_grid').unmask();
                                                                                }
                                                                                );
                                                                                Ext.getCmp('NFW2_report_generate').get_report();
                                                                            }
                                                                            );
                                                                        },
                                                                        iconCls: 'atoz_create'
                                                                    },
                                                                    {
                                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {

                                                                            var win = Ext.create('NFW2.view.win_report_generate',{
                                                                                modal : true,
                                                                                record : record.data,
                                                                                edit : "edit"
                                                                            });

                                                                            win.show();
                                                                        },
                                                                        iconCls: 'atoz_edit'
                                                                    }
                                                                ]
                                                            }
                                                        ],
                                                        viewConfig: {
                                                            getRowClass: function(record, rowIndex, rowParams, store) {
                                                                if(record.get("use") === "off"){

                                                                    Ext.Function.defer(function(){
                                                                        this.removeRowCls(rowIndex, 'x-grid-row-alt');
                                                                    },100, this);

                                                                    return "stOff";
                                                                }
                                                            },
                                                            listeners: {
                                                                beforecellmousedown: 'onTableBeforeCellMouseDown3',
                                                                collapsebody: 'onTableCollapsebody3'
                                                            }
                                                        },
                                                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                                                            selType: 'checkboxmodel',
                                                            mode: 'SIMPLE',
                                                            checkOnly: true,
                                                            listeners: {
                                                                select: 'onCheckboxModelSelect3',
                                                                deselect: 'onCheckboxModelDeselect3'
                                                            }
                                                        }),
                                                        listeners: {
                                                            afterrender: 'onSpe_report_gridAfterRender',
                                                            celldblclick: 'onSpe_report_gridCellDblClick'
                                                        },
                                                        plugins: [
                                                            {
                                                                ptype: 'rowexpander',
                                                                pluginId: 'expander_spe',
                                                                expandOnDblClick: false,
                                                                expandOnEnter: false,
                                                                rowBodyTpl: [
                                                                    '<div id="spegrid_{id}" ></div>'
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        margin: '5 0 0 0',
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                height: 28,
                                                style: 'background:url(../images/blbox_bg.gif); color:#fff;',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'image',
                                                        height: 28,
                                                        id: 'inter_report_img',
                                                        margin: '0 0 0 5',
                                                        width: 20,
                                                        src: '../images/blbox_close.gif'
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        margin: '6 0 0 5',
                                                        style: 'color:black',
                                                        bind: {
                                                            text: '{report_intgrate}'
                                                        }
                                                    }
                                                ],
                                                listeners: {
                                                    render: 'onContainerRender4'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                hidden: true,
                                                id: 'inter_report_grid_con',
                                                items: [
                                                    {
                                                        xtype: 'gridpanel',
                                                        id: 'inter_report_grid',
                                                        header: false,
                                                        title: 'My Grid Panel',
                                                        store: 'store_atoz_report_inter_list',
                                                        columns: [
                                                            {
                                                                xtype: 'rownumberer',
                                                                width: 60,
                                                                align: 'center',
                                                                dataIndex: 'name',
                                                                text: 'N'
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                align: 'center',
                                                                dataIndex: 'name',
                                                                flex: 0.3,
                                                                bind: {
                                                                    text: '{report_name}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'gridcolumn',
                                                                align: 'center',
                                                                dataIndex: 'desc',
                                                                flex: 0.4,
                                                                bind: {
                                                                    text: '{desc}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'actioncolumn',
                                                                align: 'center',
                                                                flex: 0.3,
                                                                items: [
                                                                    {
                                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                            var _params = {
                                                                                'id' : Ext.encode(record.data.id)
                                                                            };

                                                                            request_helper.xmlrpc_call_JsonP(
                                                                            'ftsctrl',
                                                                            'writeAtoZReportInterInfo',
                                                                            _params,
                                                                            function(response){
                                                                                var pdf_param = {
                                                                                    name : Ext.encode('atoz_report_inter'),
                                                                                    pdf_param : Ext.encode(record.data.name)
                                                                                };

                                                                                Ext.Ajax.request({
                                                                                    url : '/createPDF',
                                                                                    method : 'GET',
                                                                                    params : pdf_param,
                                                                                    success : function(response, opts){
                                                                                        hideLoadMask();
                                                                                        window.open (record.data.name+".pdf","mywindow","menubar=1,resizable=1,scrollbars=1,width=1000,height=650");
                                                                                    }
                                                                                });
                                                                            }
                                                                            );
                                                                        },
                                                                        iconCls: 'b_pdf'
                                                                    },
                                                                    {
                                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                            var _params = {
                                                                                'id' : Ext.encode(record.data.id)
                                                                            };

                                                                            request_helper.xmlrpc_call_JsonP(
                                                                            'ftsctrl',
                                                                            'writeAtoZReportInterInfo',
                                                                            _params,
                                                                            function(response){
                                                                                window.open ("atoz_report_inter.html","mywindow","menubar=1,resizable=1,scrollbars=1,width=1000,height=650");
                                                                            }
                                                                            );
                                                                        },
                                                                        iconCls: 'b_html'
                                                                    }
                                                                ]
                                                            }
                                                        ],
                                                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                                                            selType: 'checkboxmodel',
                                                            mode: 'SIMPLE',
                                                            checkOnly: true
                                                        }),
                                                        listeners: {
                                                            celldblclick: 'onInter_report_gridCellDblClick'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        margin: '5 0 0 0 ',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch',
                                            pack: 'end'
                                        }
                                    }
                                ]
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

    onButtonClick: function(button, e, eOpts) {
        var win = Ext.create('NFW2.view.win_report_generate',{
            modal : true
        });

        win.show();
    },

    onButtonClick3: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_report_generate');
        var day_grid = Ext.getCmp('day_report_grid');
        var day_sel = day_grid.getSelectionModel().getSelection();
        var week_grid = Ext.getCmp('week_report_grid');
        var week_sel = week_grid.getSelectionModel().getSelection();
        var month_grid = Ext.getCmp('month_report_grid');
        var month_sel = month_grid.getSelectionModel().getSelection();
        var spe_grid = Ext.getCmp('spe_report_grid');
        var spe_sel = spe_grid.getSelectionModel().getSelection();
        var inter_grid = Ext.getCmp('inter_report_grid');
        var inter_sel = inter_grid.getSelectionModel().getSelection();
        var record = [];

        if(day_sel.length === 0 || week_sel.length === 0 || month_sel.length === 0 || spe_sel.length === 0 || inter_sel.length === 0){
            var result_day = me.chk_select(day_grid.getStore(), 'day');
            var result_week = me.chk_select(week_grid.getStore(), 'week');
            var result_mon = me.chk_select(month_grid.getStore(), 'month');
            var result_spe = me.chk_select(spe_grid.getStore(), 'userset');
            console.log(result_day[0]);

            //         if(!result_day[0] && !result_week[0] && !result_mon[0] && !result_spe[0]){ Ext.Msg.alert("",get_msg("sel_del")); }
            //         else{
            Ext.MessageBox.confirm("", get_msg("conf_del"),function(btn){
                if(btn === "yes"){
                    if(result_day[0]){ me.create_report(day_grid.getStore(), result_day[1], result_day[2]); }
                    if(result_week[0]){ me.create_report(week_grid.getStore(), result_week[1], result_week[2]); }
                    if(result_mon[0]){ me.create_report(month_grid.getStore(), result_mon[1], result_mon[2]); }
                    if(result_spe[0]){ me.create_report(spe_grid.getStore(), result_spe[1], result_spe[2]); }

                    var obj = [];

                    if(result_day[0]){
                        for(var zz in result_day[3]){
                            var day_date = [];
                            for(var z in result_day[3][zz].sel){
                                var day_temp1 = result_day[3][zz].sel[z].data.create_day.split(' ');
                                var day_temp2 = day_temp1[2].split('-');
                                var day_leng = day_temp2[1];
                                var day_leng2 = day_temp2[2];
                                if(String(day_leng).length === 1){ day_leng = "0" + day_leng; }
                                if(String(day_leng2).length === 1){ day_leng2 = "0" + day_leng2; }
                                var day_tran = day_temp2[0] + day_leng + day_leng2;

                                day_date.push(day_tran);
                            }
                            var day_id = result_day[3][zz].sel[0].data.id.split("_");
                            obj.push({
                                'id' : day_id[0],
                                'date' : day_date,
                                //                             'name' : result_day[3][zz].sel[0].data.name,
                                'period' : result_day[3][zz].sel[0].data.period,
                            });
                        }
                    }
                    if(result_week[0]){
                        for(var yy in result_week[3]){
                            var week_date = [];
                            for(var y in result_week[3][yy].sel){
                                var week_temp1 = result_week[3][yy].sel[y].data.create_day.split(' ');
                                var week_temp2 = week_temp1[2].split('-');
                                var week_leng = week_temp2[1];
                                var week_leng2 = week_temp2[2];
                                if(String(week_leng).length === 1){ week_leng = "0" + week_leng; }
                                if(String(week_leng2).length === 1){ week_leng2 = "0" + week_leng2; }
                                var week_tran = week_temp2[0] + week_leng + week_leng2;

                                week_date.push(week_tran);
                            }
                            var week_id = result_week[3][yy].sel[0].data.id.split("_");
                            obj.push({
                                'id' : week_id[0],
                                'date' : week_date,
                                //                             'name' : result_spe[3][yy].sel[y].data.name,
                                'period' : result_week[3][yy].sel[0].data.period
                            });
                        }
                    }
                    if(result_mon[0]){
                        for(var xx in result_mon[3]){
                            var mon_date = [];
                            for(var x in result_mon[3][xx].sel){
                                var mon_temp1 = result_mon[3][xx].sel[x].data.create_day.split(' ');
                                var mon_temp2 = mon_temp1[2].split('-');
                                var mon_leng = mon_temp2[1];
                                var mon_leng2 = mon_temp2[2];
                                if(String(mon_leng).length === 1){ mon_leng = "0" + mon_leng; }
                                if(String(mon_leng2).length === 1){ mon_leng2 = "0" + mon_leng2; }
                                var mon_tran = mon_temp2[0] + mon_leng + mon_temp2[2];

                                mon_date.push(mon_tran);
                            }
                            var mon_id = result_mon[3][xx].sel[0].data.id.split("_");
                            obj.push({
                                'id' : mon_id,
                                'date' : mon_date,
                                //                             'name' : result_spe[3][xx].sel[x].data.name,
                                'period' : result_mon[3][xx].sel[0].data.period
                            });
                        }
                    }
                    if(result_spe[0]){
                        for(var ww in result_spe[3]){
                            var spe_date = [];
                            for(var w in result_spe[3][ww].sel){
                                var spe_temp1 = result_mon[3][ww].sel[w].data.create_day.split(' ');
                                var spe_temp2 = spe_temp1[2].split('-');
                                var spe_leng = spe_temp2[1];
                                var spe_leng2 = spe_temp2[2];
                                if(String(spe_leng).length === 1){ spe_leng = "0" + spe_leng; }
                                if(String(spe_leng2).length === 1){ spe_leng2 = "0" + spe_leng2; }
                                var spe_tran = spe_temp2[0] + spe_leng + spe_temp2[2];

                                spe_date.push(spe_tran);
                            }
                            var spe_id = result_spe[3][ww].sel[0].data.id.split("_");
                            obj.push({
                                'id' : spe_id,
                                'date' : spe_date,
                                //                             'name' : result_spe[3][ww].sel[w].data.name,
                                'period' : result_spe[3][ww].sel[0].data.period
                            });
                        }
                    }
                    if(obj.length !== 0){
                        var _params = {
                            param_obj: Ext.encode(obj)
                        };

                        request_helper.xmlrpc_call_JsonP(
                            'ftsctrl',
                            'delAtoZReportData',
                            _params,
                            function(response){

                            }
                        );
                    }
                    var obj = [];
                    //                             var result_day = me.chk_select(day_grid.getStore(), 'day');
                    //                             var result_week = me.chk_select(week_grid.getStore(), 'week');
                    //                             var result_mon = me.chk_select(month_grid.getStore(), 'month');
                    //                             var result_spe = me.chk_select(spe_grid.getStore(), 'userset');

                    if(!result_day[0] && !result_week[0] && !result_mon[0] && !result_spe[0]){}
                    else{
                        if(result_day[0]){ me.create_report(day_grid.getStore(), result_day[1], result_day[2]); }
                        if(result_week[0]){ me.create_report(week_grid.getStore(), result_week[1], result_week[2]); }
                        if(result_mon[0]){ me.create_report(month_grid.getStore(), result_mon[1], result_mon[2]); }
                        if(result_spe[0]){ me.create_report(spe_grid.getStore(), result_spe[1], result_spe[2]); }
                    }

                    var del = new Array();
                    var del_inter = new Array();
                    for(var i=0; i<day_sel.length; i++){
                        del.push(day_sel[i].data.id);
                        if(day_sel[i].data.report.length > 0){
                            var day_date_obj = [];
                            for(var j in day_sel[i].data.report){
                                var day_date = day_sel[i].data.report[j].date.split('-');
                                if(String(day_date[1]).length === 1){ day_date[1] = "0"+day_date[1]; }
                                if(String(day_date[2]).length === 1){ day_date[2] = "0"+day_date[2]; }

                                day_date_obj.push(day_date.join(''));
                            }

                            obj.push({
                                'id' : day_sel[i].data.id,
                                //'date' : day_date_obj,
                                'period' : day_sel[i].data.setting[0].form.cycle
                            });
                        }
                    }
                    for(i=0; i<week_sel.length; i++){
                        del.push(week_sel[i].data.id);
                        if(week_sel[i].data.report.length > 0){
                            var week_date_obj = [];
                            for(var j in week_sel[i].data.report){
                                var week_date = week_sel[i].data.report[j].date.split('-');
                                if(String(week_date[1]).length === 1){ week_date[1] = "0"+week_date[1]; }
                                if(String(week_date[2]).length === 1){ week_date[2] = "0"+week_date[2]; }

                                week_date_obj.push(week_date.join(''));
                            }

                            obj.push({
                                'id' : week_sel[i].data.id,
                                //'date' : week_date_obj,
                                'period' : week_sel[i].data.setting[0].form.cycle
                            });
                        }
                    }
                    for(i=0; i<month_sel.length; i++){
                        del.push(month_sel[i].data.id);
                        if(month_sel[i].data.report.length > 0){
                            var month_date_obj = [];
                            for(var j in month_sel[i].data.report){
                                var month_date = month_sel[i].data.report[j].date.split('-');
                                if(String(month_date[1]).length === 1){ month_date[1] = "0"+month_date[1]; }
                                if(String(month_date[2]).length === 1){ month_date[2] = "0"+month_date[2]; }

                                month_date_obj.push(month_date.join(''));
                            }

                            obj.push({
                                'id' : month_sel[i].data.id,
                                //'date' : month_date_obj,
                                'period' : month_sel[i].data.setting[0].form.cycle
                            });
                        }
                    }
                    for(i=0; i<spe_sel.length; i++){
                        del.push(spe_sel[i].data.id);
                        if(spe_sel[i].data.report.length > 0){
                            var spe_date_obj = [];
                            for(var j in spe_sel[i].data.report){
                                var spe_date = spe_sel[i].data.report[j].date.split('-');
                                if(String(spe_date[1]).length === 1){ spe_date[1] = "0"+spe_date[1]; }
                                if(String(spe_date[2]).length === 1){ spe_date[2] = "0"+spe_date[2]; }

                                spe_date_obj.push(spe_date.join(''));
                            }

                            obj.push({
                                'id' : spe_sel[i].data.id,
                                //'date' : spe_date_obj,
                                'period' : spe_sel[i].data.setting[0].form.cycle
                            });
                        }
                    }
                    for(i=0; i<inter_sel.length; i++){
                        del_inter.push(inter_sel[i].data.id);
                    }
                    if(Ext.getCmp('_grid'+record.id) !== undefined){
                        console.log(record.id);
                        Ext.getCmp('_grid'+record.id).destroy();
                    }

                    if(obj.length > 0){
                        var _params = {
                            param_obj: Ext.encode(obj)
                        };

                        request_helper.xmlrpc_call_JsonP(
                            'ftsctrl',
                            'delAtoZReportData',
                            _params,
                            function(response){
                                //                         Ext.getCmp('pnl_cont').removeAll();
                                //                         Ext.getCmp('pnl_cont').add(Ext.create("NFW2.view.NFW2_report_generate"));
                                Ext.getCmp('NFW2_report_generate').get_report();
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

                    var _params = {
                        basename : Ext.encode('atoz_report'),
                        ids : Ext.encode(del)
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'delListTypeObj',
                        _params,

                        function(response){
                            var _params = {
                                basename : Ext.encode('atoz_report_inter'),
                                ids : Ext.encode(del_inter)
                            };

                            request_helper.xmlrpc_call_JsonP(
                                'ftuctrl',
                                'delListTypeObj',
                                _params,

                                function(response){
                                    //                 Ext.getCmp('pnl_cont').removeAll();
                                    //                 Ext.getCmp('pnl_cont').add(Ext.create("NFW2.view.NFW2_report_generate"));
                                    Ext.getCmp('NFW2_report_generate').get_report();
                                    Ext.Msg.show({
                                        title: __weguardia,
                                        width: 300,
                                        msg: get_msg('msg_ok_del'),
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.window.MessageBox.INFO
                                    });
                                }
                            );
                            //                 Ext.getCmp('pnl_cont').removeAll();
                            //                 Ext.getCmp('pnl_cont').add(Ext.create("NFW2.view.NFW2_report_generate"));
                            //                 Ext.getCmp('NFW2_report_generate').get_report();
                            //                 Ext.Msg.show({
                            //                     title: 'WeGuardia™ DMC',
                            //                     width: 300,
                            //                     msg: get_msg('msg_ok_del'),
                            //                     buttons: Ext.Msg.OK,
                            //                     icon: Ext.window.MessageBox.INFO
                            //                 });
                        }
                    );
                    //                         Ext.getCmp('pnl_cont').removeAll();
                    //                         Ext.getCmp('pnl_cont').add(Ext.create("NFW2.view.NFW2_report_generate"));
                    Ext.getCmp('NFW2_report_generate').get_report();
                    Ext.Msg.show({
                        title: __weguardia,
                        width: 300,
                        msg: get_msg('msg_ok_del'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.window.MessageBox.INFO
                    });
                }
            });
            //         }
            //     return false;
        }
        else{
            Ext.Msg.alert("",get_msg("sel_del"));
        }

        // Ext.MessageBox.confirm("", get_msg("conf_del"),function(btn){

        //     if(btn === "yes"){

        //     }
        // });
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_report_generate');
        var day_grid = Ext.getCmp('day_report_grid');
        var week_grid = Ext.getCmp('week_report_grid');
        var month_grid = Ext.getCmp('month_report_grid');
        var spe_grid = Ext.getCmp('spe_report_grid');
        var sel_data = [];
        var records = [];
        var inter_data = [];
        var chk_num = 0;
        var day_sum = 0;
        var week_sum = 0;
        var month_sum = 0;
        var spe_sum = 0;

        var result_day = me.chk_select(day_grid.getStore(), 'day');
        var result_week = me.chk_select(week_grid.getStore(), 'week');
        var result_mon = me.chk_select(month_grid.getStore(), 'month');
        var result_spe = me.chk_select(spe_grid.getStore(), 'userset');

        if(result_day[0]){
            chk_num++;
            sel_data = result_day[3];
            for(var i in sel_data){
                if(sel_data[i].sel.length !== 0){
                    inter_data.push({
                        'report' : day_grid.getStore().data.items[sel_data[i].record_index].data.name,
                        'date' : sel_data[i].sel
                    });
                }
            }
        }
        if(result_week[0]){
            chk_num++;
            sel_data = result_week[3];
            for(var i in sel_data){
                if(sel_data[i].sel.length !== 0){
                    inter_data.push({
                        'report' : week_grid.getStore().data.items[sel_data[i].record_index].data.name,
                        'date' : sel_data[i].sel
                    });
                }
            }
        }
        if(result_mon[0]){
            chk_num++;
            sel_data = result_mon[3];
            for(var i in sel_data){
                if(sel_data[i].sel.length !== 0){
                    inter_data.push({
                        'report' : month_grid.getStore().data.items[sel_data[i].record_index].data.name,
                        'date' : sel_data[i].sel
                    });
                }
            }
        }
        if(result_spe[0]){
            chk_num++;
            sel_data = result_spe[3];
            for(var i in sel_data){
                if(sel_data[i].sel.length !== 0){
                    inter_data.push({
                        'report' : spe_grid.getStore().data.items[sel_data[i].record_index].data.name,
                        'date' : sel_data[i].sel
                    });
                }
            }
        }

        if(chk_num < 1){
            Ext.Msg.show({
                title: __weguardia,
                width: 300,
                msg: get_msg('err_select2'),
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO
            });

            return false;
        }
        else if(chk_num > 1){
            Ext.Msg.show({
                title: __weguardia,
                width: 300,
                msg: get_msg('err_difreport'),
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO
            });

            return false;
        }

        if(result_day[0]){
            var chk_length = [];

            for(var k in result_day[3]){
                chk_length.push(result_day[3][k].sel.length);
            }

            var cnt_chk = 0;

            for(var l in chk_length){
                if(chk_length[l] > 0){ cnt_chk++; }
            }

            if(cnt_chk > 1){
                Ext.Msg.show({
                    title: __weguardia,
                    width: 300,
                    msg: get_msg('err_difreport'),
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });

                return false;
            }

            for(var i in result_day[2]){ day_sum = day_sum + result_day[2][i]; }
            if(day_sum < 2){
                Ext.Msg.show({
                    title: __weguardia,
                    width: 300,
                    msg: get_msg('err_select2'),
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });
                return false;
            }
        }

        if(result_week[0]){
            var chk_length = [];

            for(var k in result_week[3]){
                chk_length.push(result_week[3][k].sel.length);
            }

            var cnt_chk = 0;

            for(var l in chk_length){
                if(chk_length[l] > 0){ cnt_chk++; }
            }

            if(cnt_chk > 1){
                Ext.Msg.show({
                    title: __weguardia,
                    width: 300,
                    msg: get_msg('err_difreport'),
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });

                return false;
            }

            for(var i in result_week[2]){ week_sum = week_sum + result_week[2][i]; }
            if(week_sum < 2){
                Ext.Msg.show({
                    title: __weguardia,
                    width: 300,
                    msg: get_msg('err_select2'),
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });
                return false;
            }
        }

        if(result_mon[0]){
            var chk_length = [];

            for(var k in result_mon[3]){
                chk_length.push(result_mon[3][k].sel.length);
            }

            var cnt_chk = 0;

            for(var l in chk_length){
                if(chk_length[l] > 0){ cnt_chk++; }
            }

            if(cnt_chk > 1){
                Ext.Msg.show({
                    title: __weguardia,
                    width: 300,
                    msg: get_msg('err_difreport'),
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });

                return false;
            }

            for(var i in result_mon[2]){ month_sum = month_sum + result_mon[2][i]; }
            if(month_sum < 2){
                Ext.Msg.show({
                    title: __weguardia,
                    width: 300,
                    msg: get_msg('err_select2'),
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });
                return false;
            }
        }

        if(result_spe[0]){
            var chk_length = [];

            for(var k in result_spe[3]){
                chk_length.push(result_spe[3][k].sel.length);
            }

            var cnt_chk = 0;

            for(var l in chk_length){
                if(chk_length[l] > 0){ cnt_chk++; }
            }

            if(cnt_chk > 1){
                Ext.Msg.show({
                    title: __weguardia,
                    width: 300,
                    msg: get_msg('err_difreport'),
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });

                return false;
            }

            for(var i in result_spe[2]){ spe_sum = spe_sum + result_spe[2][i]; }
            if(spe_sum < 2){
                Ext.Msg.show({
                    title: __weguardia,
                    width: 300,
                    msg: get_msg('err_select2'),
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });
                return false;
            }
        }

        var win = Ext.create('NFW2.view.win_inter_report',{
            modal : true,
            inter_data : inter_data
        });

        win.show();
    },

    onContainerRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('day_report_grid_con').hidden === true){
                Ext.getCmp('day_report_grid_con').show();
                Ext.getCmp('day_report_img').setSrc('../images/blbox_open.gif');
            }
            else{
                Ext.getCmp('day_report_grid_con').hide();
                Ext.getCmp('day_report_img').setSrc('../images/blbox_close.gif');
            }

        }, component);
    },

    onTableBeforeCellMouseDown: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = Ext.getCmp('day_report_grid');
        me.get_date = [];
        var _params = {
            basename: Ext.encode("atoz_report_history")
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _params,
            function(response){
                for(var i in response.list){
                    if(record.data.id === response.list[i]['@uid']){
                        for(var k in response.list[i].date){
                            var date_temp = Number(k.substr(0,4)) + "-" + Number(k.substr(4,2)) + "-" + Number(k.substr(6,2));
                            me.get_date.push(date_temp);
                        }
                    }
                }
            }
        );
    },

    onTableCollapsebody1: function(rowNode, record, expandRow, eOpts) {
        var grid = Ext.getCmp('day_report_grid');
        delete grid.exp_obj[record.data['id']];
    },

    onCheckboxModelSelect: function(rowmodel, record, index, eOpts) {
        if(record.data.report_cnt > 0){
            var grid = Ext.getCmp('day_report_grid');
            var store = grid.getStore();
            var expander = grid.getPlugin('expander_day');

            var record = store.getAt(index);
            if(!expander.recordsExpanded[record.internalId]){
                expander.toggleRow(index, record);
            }
        }

        if(Ext.getCmp('_grid'+record.data.id)){
            Ext.getCmp('_grid'+record.data.id).getSelectionModel().selectAll();
        }
    },

    onCheckboxModelDeselect: function(rowmodel, record, index, eOpts) {
        var me = Ext.getCmp('NFW2_report_generate');

        if(Ext.getCmp('_grid'+record.data.id)){
            if(!me.expand_desel){ Ext.getCmp('_grid'+record.data.id).getSelectionModel().deselectAll(); }
        }
    },

    onDay_report_gridAfterRender: function(component, eOpts) {
        var me = Ext.getCmp('day_report_grid');
        me.exp_obj = {};

        me.getView().on('expandbody', function (rowNode, record, expandbody) {
            var in_data = [];
            var grid = Ext.getCmp('day_report_grid');
            grid.exp_obj[record.data['@uid']] = true;
            for(var j in me.get_date){
                var date = me.get_date[j].split('-');
                var in_date = date[1] + "/" + date[2] + "/" + date[0];
                var cal_date = new Date(in_date);
                var temp = cal_date.getDate();
                cal_date.setDate(temp + record.data.setting[0].storage);
                // cal_date.setMonth(cal_date.getMonth()+1);
                var month;
                if(cal_date.getMonth() === 11){ month = 12; }
                else if(cal_date.getMonth() === 0){ month = 1; }
                else{ month = cal_date.getMonth()+1; }
                var del_day = cal_date.getFullYear() + "-" + month + "-" + cal_date.getDate();

                var arrDate2 = del_day.split("-");
                var getDate2 = new Date(parseInt(arrDate2[0]),parseInt(arrDate2[1])-1,parseInt(arrDate2[2]));

                var getDiffTime = new Date().getTime() - getDate2.getTime();

                var result_date = Math.floor(getDiffTime / (1000 * 60 * 60 * 24));

                result_date = -(result_date);

                in_data.push({
                    'create_day' : "생성일 : " + me.get_date[j],
                    'delete_day' : "폐기일 : " + del_day+", "+ result_date+"일 남음",
                    'id' : record.data.id+"_"+j,
                    'chk_id' : record.data.id,
                    'name' :record.data.name,
                    'period' :record.data.setting[0].form.cycle
                });
            }

            var store = {
                data: in_data,
                fields: [
                    {
                        name: 'create_day'
                    },
                    {
                        name: 'delete_day'
                    }
                ]
            };

            if(record.data.report_cnt !== 0){
                if(document.getElementById('daygrid_'+record.get('id')).getElementsByTagName('table').length === 0){
                    var rec_index = 0;
                    for(var i in Ext.data.StoreManager.lookup('store_atoz_report_day_list').data.items){
                        if(record.data.name === Ext.data.StoreManager.lookup('store_atoz_report_day_list').data.items[i].data.name){ rec_index = i; }
                    }
                    delete notesGrid;

                    var notesGrid = Ext.create('Ext.grid.Panel', {
                        id: "_grid"+record.id,
                        header: false,
                        hideHeaders: true,
                        rowLines:true,
                        columnLines:true,
                        margin:'0 -10 0 13',
                        rec_index:rec_index,
                        renderTo: "daygrid_"+record.get('id'),
                        store: store,
                        columns: [
                            {
                                text: 'create',
                                dataIndex: 'create_day',
                                flex:1
                            },
                            {
                                text: 'delete',
                                dataIndex: 'delete_day',
                                flex:1
                            },
                            {
                                xtype: 'actioncolumn',
                                align: 'center',
                                width: 250,
                                items: [
                                    {
                                        iconCls: 'b_pdf',
                                        handler: function(view, rowIndex, colIndex, item, e, records, row){
                                            showLoadMask();
                                            var date_cre = record.data.report[rowIndex].date;
                                            var set_date = date_cre.split('-');
                                            var set_d1 = set_date[0];
                                            var set_d2 = set_date[1];
                                            var set_d3 = set_date[2];

                                            if(set_d2.length === 1){ set_d2 = "0"+set_d2; }
                                            if(set_d3.length === 1){ set_d3 = "0"+set_d3; }

                                            var write_time = set_d1+set_d2+set_d3;

                                            var _params = {
                                                id: Ext.encode(record.data.id),
                                                name : Ext.encode(record.data.name),
                                                cycle : Ext.encode(record.data.setting[0].form.cycle),
                                                date : Ext.encode(write_time)
                                            };

                                            request_helper.xmlrpc_call_JsonP(
                                                'ftsctrl',
                                                'writeAtoZReportInfo',
                                                _params,
                                                function(response){
                                                    var pdf_param = {
                                                        name : Ext.encode('atoz_report'),
                                                        pdf_name : Ext.encode(record.data.name+"_"+write_time)
                                                    };

                                                    Ext.Ajax.request({
                                                        url : '/createPDF',
                                                        method : 'GET',
                                                        params : pdf_param,
                                                        success : function(response, opts){
                                                            hideLoadMask();
                                                            window.open("atoz_report.pdf","mywindow","menubar=1,resizable=1,scrollbars=1,width=1000,height=650");
                                                            //                                                     window.open(record.data.name+"_"+write_time+".pdf","mywindow","menubar=1,resizable=1,scrollbars=1,width=1000,height=650");
                                                        },
                                                        failure : function(req,err){
                                                            console.log(req);
                                                        }
                                                    });
                                                }
                                            );

                                        }
                                    },
                                    {
                                        iconCls: 'b_html',
                                        handler: function(view, rowIndex, colIndex, item, e, records, row){
                                            var date_cre = record.data.report[rowIndex].date;
                                            var set_date = date_cre.split('-');
                                            var set_d1 = set_date[0];
                                            var set_d2 = set_date[1];
                                            var set_d3 = set_date[2];

                                            if(set_d2.length === 1){ set_d2 = "0"+set_d2; }
                                            if(set_d3.length === 1){ set_d3 = "0"+set_d3; }

                                            var write_time = set_d1+set_d2+set_d3;

                                            var _params = {
                                                id: Ext.encode(record.data.id),
                                                name : Ext.encode(record.data.name),
                                                cycle : Ext.encode(record.data.setting[0].form.cycle),
                                                date : Ext.encode(write_time)
                                            };

                                            request_helper.xmlrpc_call_JsonP(
                                                'ftsctrl',
                                                'writeAtoZReportInfo',
                                                _params,
                                                function(response){
                                                    window.open ("atoz_report.html","mywindow","menubar=1,resizable=1,scrollbars=1,width=1000,height=650");
                                                }
                                            );
                                            //                                 var wid = Ext.getBody().getSize().width;
                                            //                                 var hei = Ext.getBody().getSize().height;


                                        }
                                    }
                                ]
                            }
                        ],
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                            selType: 'checkboxmodel',
                            mode: 'SIMPLE',
                            listeners: {
                                deselect: {
                                    fn: function(rowmodel, record, index, eOpts){
                                        var me = Ext.getCmp('NFW2_report_generate');

                                        me.expand_desel = true;
                                        Ext.getCmp('day_report_grid').getSelectionModel().deselect(Number(notesGrid.rec_index));
                                        me.expand_desel = false;
                                    }
                                },
                                scope: me
                            }
                        })
                    });

                    rowNode.grid = notesGrid;
                    notesGrid.getEl().swallowEvent(['mouseover', 'mousedown', 'click', 'dblclick', 'onRowFocus']);
                    notesGrid.fireEvent("bind", notesGrid, { id: "daygrid_"+record.get('id') });
                    Ext.getCmp("_grid"+record.id).getView().refresh();

                }

            }
        });

        me.getView().on('refresh', function(){
            var grid = Ext.getCmp('day_report_grid');
            var store = grid.getStore();
            var expander = grid.getPlugin('expander_day');
            var exp_obj = grid.exp_obj;

            for(var i = 0; i < store.getCount(); i++) {
                var record = store.getAt(i);

                var _id = store.find('id',record.data['id']);

                if(exp_obj[record.data['id']]){
                    expander.toggleRow(_id,record);
                }
            }
        });
    },

    onDay_report_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {

            if(cellIndex !== 0 && cellIndex !== 1 && cellIndex !== 7){
                var win = Ext.create('NFW2.view.win_report_generate',{
                    modal : true,
                    record : record.data,
                    edit : "edit"
                });

                win.show();
            }

    },

    onContainerRender1: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('week_report_grid_con').hidden === true){
                Ext.getCmp('week_report_grid_con').show();
                Ext.getCmp('week_report_img').setSrc('../images/blbox_open.gif');
            }
            else{
                Ext.getCmp('week_report_grid_con').hide();
                Ext.getCmp('week_report_img').setSrc('../images/blbox_close.gif');
            }

        }, component);
    },

    onTableBeforeCellMouseDown1: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = Ext.getCmp('week_report_grid');
        me.get_date = [];
        var _params = {
            basename: Ext.encode("atoz_report_history")
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _params,
            function(response){
                for(var i in response.list){
                    if(record.data.id === response.list[i]['@uid']){
                        for(var k in response.list[i].date){
                            var date_temp = Number(k.substr(0,4)) + "-" + Number(k.substr(4,2)) + "-" + Number(k.substr(6,2));
                            me.get_date.push(date_temp);
                        }
                    }
                }
            }
        );
    },

    onTableCollapsebody2: function(rowNode, record, expandRow, eOpts) {
        var grid = Ext.getCmp('week_report_grid');
        delete grid.exp_obj[record.data['id']];
    },

    onCheckboxModelSelect1: function(rowmodel, record, index, eOpts) {
        if(record.data.report_cnt > 0){
            var grid = Ext.getCmp('week_report_grid');
            var store = grid.getStore();
            var expander = grid.getPlugin('expander_week');

            var record = store.getAt(index);
            if(!expander.recordsExpanded[record.internalId]){
                expander.toggleRow(index, record);
            }
        }

        if(Ext.getCmp('_grid'+record.data.id)){
            Ext.getCmp('_grid'+record.data.id).getSelectionModel().selectAll();
        }
    },

    onCheckboxModelDeselect1: function(rowmodel, record, index, eOpts) {
        var me = Ext.getCmp('NFW2_report_generate');

        if(Ext.getCmp('_grid'+record.data.id)){
            if(!me.expand_desel){ Ext.getCmp('_grid'+record.data.id).getSelectionModel().deselectAll(); }
        }
    },

    onWeek_report_gridAfterRender: function(component, eOpts) {
        var me = Ext.getCmp('week_report_grid');
        me.exp_obj = {};

        me.getView().on('expandbody', function (rowNode, record, expandbody) {
            var in_data = [];
            var grid = Ext.getCmp('week_report_grid');
            grid.exp_obj[record.data['@uid']] = true;
            for(var j in me.get_date){
                var date = me.get_date[j].split('-');
                var in_date = date[1] + "/" + date[2] + "/" + date[0];
                var cal_date = new Date(in_date);
                var temp = cal_date.getDate();
                cal_date.setDate(temp + record.data.setting[0].storage);
                // cal_date.setMonth(cal_date.getMonth()+1);
                var month;
                if(cal_date.getMonth() === 11){ month = 12; }
                else if(cal_date.getMonth() === 0){ month = 1; }
                else{ month = cal_date.getMonth()+1; }
                var del_day = cal_date.getFullYear() + "-" + month + "-" + cal_date.getDate();

                var arrDate2 = del_day.split("-");
                var getDate2 = new Date(parseInt(arrDate2[0]),parseInt(arrDate2[1])-1,parseInt(arrDate2[2]));

                var getDiffTime = new Date().getTime() - getDate2.getTime();

                var result_date = Math.floor(getDiffTime / (1000 * 60 * 60 * 24));

                result_date = -(result_date);

                in_data.push({
                    'create_day' : "생성일 : " + me.get_date[j],
                    'delete_day' : "폐기일 : " + del_day+", "+ result_date+"일 남음",
                    'id' : record.data.id+"_"+j,
                    'chk_id' : record.data.id,
                    'name' :record.data.name,
                    'period' :record.data.setting[0].form.cycle
                });
            }

            var store = {
                data: in_data,
                fields: [
                    {
                        name: 'create_day'
                    },
                    {
                        name: 'delete_day'
                    }
                ]
            };

            if(record.data.report_cnt !== 0){
                if(document.getElementById('weekgrid_'+record.get('id')).getElementsByTagName('table').length === 0){
                    if(Ext.getCmp('_grid'+record.id) !== undefined){ Ext.getCmp('_grid'+record.id).destroy(); }
                    var rec_index = 0;
                    for(var i in Ext.data.StoreManager.lookup('store_atoz_report_week_list').data.items){
                        if(record.data.name === Ext.data.StoreManager.lookup('store_atoz_report_week_list').data.items[i].data.name){ rec_index = i; }
                    }
                var notesGrid = Ext.create('Ext.grid.Panel', {
                    id: "_grid"+record.id,
                    header: false,
                    hideHeaders: true,
                    rowLines:true,
                    columnLines:true,
                    rec_index:rec_index,
                    margin : '0 -10 0 14',
                    renderTo: "weekgrid_"+record.get('id'),
                    store: store,
                    columns: [
                        { text: 'create', dataIndex: 'create_day', flex:1},
                        { text: 'delete', dataIndex: 'delete_day', flex:1},
                        {
                            xtype: 'actioncolumn',
                            align: 'center',
                            width: 250,
                            items: [
                                {
                                        iconCls: 'b_pdf',
                                        handler: function(view, rowIndex, colIndex, item, e, records, row){
                                            showLoadMask();
                                            var date_cre = record.data.report[rowIndex].date;
                                            var set_date = date_cre.split('-');
                                            var set_d1 = set_date[0];
                                            var set_d2 = set_date[1];
                                            var set_d3 = set_date[2];

                                            if(set_d2.length === 1){ set_d2 = "0"+set_d2; }
                                            if(set_d3.length === 1){ set_d3 = "0"+set_d3; }

                                            var write_time = set_d1+set_d2+set_d3;

                                            var _params = {
                                                id: Ext.encode(record.data.id),
                                                name : Ext.encode(record.data.name),
                                                cycle : Ext.encode(record.data.setting[0].form.cycle),
                                                date : Ext.encode(write_time)
                                            };

                                            request_helper.xmlrpc_call_JsonP(
                                                'ftsctrl',
                                                'writeAtoZReportInfo',
                                                _params,
                                                function(response){
                                                    var pdf_param = {
                                                        name : Ext.encode('atoz_report_week'),
                                                        pdf_name : Ext.encode(record.data.name+"_"+write_time)
                                                    };

                                                    Ext.Ajax.request({
                                                        url : '/createPDF',
                                                        method : 'GET',
                                                        params : pdf_param,
                                                        success : function(response, opts){
                                                            hideLoadMask();
                                                            window.open("atoz_report_week.pdf","mywindow","menubar=1,resizable=1,scrollbars=1,width=1000,height=650");
        //                                                     window.open (record.data.name+"_"+write_time+".pdf","mywindow","menubar=1,resizable=1,scrollbars=1,width=1000,height=650");

                                                },
                                                failure : function(req,err){
                                                    console.log(req);
                                                }
                                            });
                                                }
                                            );

                                        }
                                    },
                                {
                                    iconCls: 'b_html',
                                    handler: function(view, rowIndex, colIndex, item, e, records, row){
                                        var date_cre = record.data.report[rowIndex].date;
                                            var set_date = date_cre.split('-');
                                            var set_d1 = set_date[0];
                                            var set_d2 = set_date[1];
                                            var set_d3 = set_date[2];

                                            if(set_d2.length === 1){ set_d2 = "0"+set_d2; }
                                            if(set_d3.length === 1){ set_d3 = "0"+set_d3; }

                                            var write_time = set_d1+set_d2+set_d3;

                                            var _params = {
                                                id: Ext.encode(record.data.id),
                                                name : Ext.encode(record.data.name),
                                                cycle : Ext.encode(record.data.setting[0].form.cycle),
                                                date : Ext.encode(write_time)
                                            };

                                            request_helper.xmlrpc_call_JsonP(
                                                'ftsctrl',
                                                'writeAtoZReportInfo',
                                                _params,
                                                function(response){
                                                    window.open ("atoz_report_week.html","mywindow","menubar=1,resizable=1,scrollbars=1,width=1000,height=650");
                                                }
                                            );
                                            //                                 var wid = Ext.getBody().getSize().width;
                                            //                                 var hei = Ext.getBody().getSize().height;


                                    }
                                }
                            ]
                        }
                    ],
                    selModel: Ext.create('Ext.selection.CheckboxModel', {
                        checkOnly: true,
                        mode: 'SIMPLE',
                        listeners: {
                            deselect: {
                                fn: function(rowmodel, record, index, eOpts){
                                    var me = Ext.getCmp('NFW2_report_generate');

                                    me.expand_desel = true;
                                    Ext.getCmp('week_report_grid').getSelectionModel().deselect(Number(notesGrid.rec_index));
                                    me.expand_desel = false;
                                }
                            },
                            scope: me
                        }
                    })
                });

                rowNode.grid = notesGrid;
                notesGrid.getEl().swallowEvent(['mouseover', 'mousedown', 'click', 'dblclick', 'onRowFocus']);
                notesGrid.fireEvent("bind", notesGrid, { id: "weekgrid_"+record.get('id') });
                }
                Ext.getCmp("_grid"+record.id).getView().refresh();
            }

        });

        me.getView().on('refresh', function(){
            var grid = Ext.getCmp('week_report_grid');
            var store = grid.getStore();
            var expander = grid.getPlugin('expander_week');
            var exp_obj = grid.exp_obj;

            for(var i = 0; i < store.getCount(); i++) {
                var record = store.getAt(i);
        //         if(expander.recordsExpanded[record.internalId]){
        //             expander.toggleRow(i, record);
        //         }
                var _id = store.find('id',record.data['id']);

                    if(exp_obj[record.data['id']]){
                        expander.toggleRow(_id,record);
                    }
            }
        });
    },

    onWeek_report_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {

        if(cellIndex !== 0 && cellIndex !== 1 && cellIndex !== 7){
            var win = Ext.create('NFW2.view.win_report_generate',{
                modal : true,
                record : record.data,
                edit : "edit"
            });

            win.show();
        }
    },

    onContainerRender2: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('month_report_grid_con').hidden === true){
                Ext.getCmp('month_report_grid_con').show();
                Ext.getCmp('month_report_img').setSrc('../images/blbox_open.gif');
            }
            else{
                Ext.getCmp('month_report_grid_con').hide();
                Ext.getCmp('month_report_img').setSrc('../images/blbox_close.gif');
            }

        }, component);
    },

    onTableBeforeCellMouseDown2: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = Ext.getCmp('month_report_grid');
        me.get_date = [];
        var _params = {
            basename: Ext.encode("atoz_report_history")
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _params,
            function(response){
                for(var i in response.list){
                    if(record.data.id === response.list[i]['@uid']){
                        for(var k in response.list[i].date){
                            var date_temp = Number(k.substr(0,4)) + "-" + Number(k.substr(4,2)) + "-" + Number(k.substr(6,2));
                            me.get_date.push(date_temp);
                        }
                    }
                }
            }
        );
    },

    onTableCollapsebody: function(rowNode, record, expandRow, eOpts) {
        var grid = Ext.getCmp('month_report_grid');
        delete grid.exp_obj[record.data['id']];
    },

    onCheckboxModelSelect2: function(rowmodel, record, index, eOpts) {
        if(record.data.report_cnt > 0){
            var grid = Ext.getCmp('month_report_grid');
            var store = grid.getStore();
            var expander = grid.getPlugin('expander_month');

            var record = store.getAt(index);
            if(!expander.recordsExpanded[record.internalId]){
                expander.toggleRow(index, record);
            }
        }

        if(Ext.getCmp('_grid'+record.data.id)){
            Ext.getCmp('_grid'+record.data.id).getSelectionModel().selectAll();
        }
    },

    onCheckboxModelDeselect2: function(rowmodel, record, index, eOpts) {
        var me = Ext.getCmp('NFW2_report_generate');

        if(Ext.getCmp('_grid'+record.data.id)){
            if(!me.expand_desel){ Ext.getCmp('_grid'+record.data.id).getSelectionModel().deselectAll(); }
        }
    },

    onMonth_report_gridAfterRender: function(component, eOpts) {
        var me = Ext.getCmp('month_report_grid');
        me.exp_obj = {};

        me.getView().on('expandbody', function (rowNode, record, expandbody) {
            var grid = Ext.getCmp('month_report_grid');
            grid.exp_obj[record.data['@uid']] = true;
            var in_data = [];
            for(var j in me.get_date){
                var date = me.get_date[j].split('-');
                var in_date = date[1] + "/" + date[2] + "/" + date[0];
                var cal_date = new Date(in_date);
                var temp = cal_date.getDate();
                cal_date.setDate(temp + record.data.setting[0].storage);
                // cal_date.setMonth(cal_date.getMonth()+1);
                var month;
                if(cal_date.getMonth() === 11){ month = 12; }
                else if(cal_date.getMonth() === 0){ month = 1; }
                else{ month = cal_date.getMonth()+1; }
                var del_day = cal_date.getFullYear() + "-" + month + "-" + cal_date.getDate();

                var arrDate2 = del_day.split("-");
                var getDate2 = new Date(parseInt(arrDate2[0]),parseInt(arrDate2[1])-1,parseInt(arrDate2[2]));

                var getDiffTime = new Date().getTime() - getDate2.getTime();

                var result_date = Math.floor(getDiffTime / (1000 * 60 * 60 * 24));

                result_date = -(result_date);

                in_data.push({
                    'create_day' : "생성일 : " + me.get_date[j],
                    'delete_day' : "폐기일 : " + del_day+", "+ result_date+"일 남음",
                    'id' : record.data.id+"_"+j,
                    'chk_id' : record.data.id,
                    'name' :record.data.name,
                    'period' :record.data.setting[0].form.cycle
                });
            }

            var store = {
                data: in_data,
                fields: [
                    {
                        name: 'create_day'
                    },
                    {
                        name: 'delete_day'
                    }
                ]
            };

            if(record.data.report_cnt !== 0){
                if(document.getElementById('monthgrid_'+record.get('id')).getElementsByTagName('table').length === 0){
                    if(Ext.getCmp('_grid'+record.id) !== undefined){ Ext.getCmp('_grid'+record.id).destroy(); }
                    var rec_index = 0;
                    for(var i in Ext.data.StoreManager.lookup('store_atoz_report_month_list').data.items){
                        if(record.data.name === Ext.data.StoreManager.lookup('store_atoz_report_month_list').data.items[i].data.name){ rec_index = i; }
                    }
                    var notesGrid = Ext.create('Ext.grid.Panel', {
                        id: "_grid"+record.id,
                        header: false,
                        hideHeaders: true,
                        rowLines:true,
                        columnLines:true,
                        rec_index:rec_index,
                        margin : '0 -10 0 14',
                        renderTo: "monthgrid_"+record.get('id'),
                        store: store,
                        columns: [
                            { text: 'create', dataIndex: 'create_day', flex:1},
                            { text: 'delete', dataIndex: 'delete_day', flex:1},
                            {
                                xtype: 'actioncolumn',
                                align: 'center',
                                width: 250,
                                items: [
                                    {
                                        iconCls: 'b_pdf',
                                        handler: function(view, rowIndex, colIndex, item, e, records, row){
                                            showLoadMask();
                                            var date_cre = record.data.report[rowIndex].date;
                                            var set_date = date_cre.split('-');
                                            var set_d1 = set_date[0];
                                            var set_d2 = set_date[1];
                                            var set_d3 = set_date[2];

                                            if(set_d2.length === 1){ set_d2 = "0"+set_d2; }
                                            if(set_d3.length === 1){ set_d3 = "0"+set_d3; }

                                            var write_time = set_d1+set_d2+set_d3;

                                            var _params = {
                                                id: Ext.encode(record.data.id),
                                                name : Ext.encode(record.data.name),
                                                cycle : Ext.encode(record.data.setting[0].form.cycle),
                                                date : Ext.encode(write_time)
                                            };

                                            request_helper.xmlrpc_call_JsonP(
                                                'ftsctrl',
                                                'writeAtoZReportInfo',
                                                _params,
                                                function(response){
                                                    var pdf_param = {
                                                        name : Ext.encode('atoz_report_month'),
        //                                                 pdf_name : Ext.encode(record.data.name+"_"+write_time)
                                                    };

                                                    Ext.Ajax.request({
                                                        url : '/createPDF',
                                                        method : 'GET',
                                                        params : pdf_name,
                                                        success : function(response, opts){
                                                            hideLoadMask();
                                                            window.open("atoz_report_month.pdf","mywindow","menubar=1,resizable=1,scrollbars=1,width=1000,height=650");
        //                                                     window.open (record.data.name+"_"+write_time+".pdf","mywindow","menubar=1,resizable=1,scrollbars=1,width=1000,height=650");

                                                },
                                                failure : function(req,err){
                                                    console.log(req);
                                                }
                                            });
                                                }
                                            );

                                        }
                                    },
                                    {
                                        iconCls: 'b_html',
                                        handler: function(view, rowIndex, colIndex, item, e, records, row){
                                            var date_cre = record.data.report[rowIndex].date;
                                            var set_date = date_cre.split('-');
                                            var set_d1 = set_date[0];
                                            var set_d2 = set_date[1];
                                            var set_d3 = set_date[2];

                                            if(set_d2.length === 1){ set_d2 = "0"+set_d2; }
                                            if(set_d3.length === 1){ set_d3 = "0"+set_d3; }

                                            var write_time = set_d1+set_d2+set_d3;

                                            var _params = {
                                                id: Ext.encode(record.data.id),
                                                name : Ext.encode(record.data.name),
                                                cycle : Ext.encode(record.data.setting[0].form.cycle),
                                                date : Ext.encode(write_time)
                                            };

                                            request_helper.xmlrpc_call_JsonP(
                                                'ftsctrl',
                                                'writeAtoZReportInfo',
                                                _params,
                                                function(response){
                                                    window.open ("atoz_report_month.html","mywindow","menubar=1,resizable=1,scrollbars=1,width=1000,height=650");
                                                }
                                            );
                                            //                                 var wid = Ext.getBody().getSize().width;
                                            //                                 var hei = Ext.getBody().getSize().height;


                                        }
                                    }
                                ]
                            }
                        ],
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                            checkOnly: true,
                            mode: 'SIMPLE',
                            listeners: {
                                deselect: {
                                    fn: function(rowmodel, record, index, eOpts){
                                        var me = Ext.getCmp('NFW2_report_generate');

                                        me.expand_desel = true;
                                        Ext.getCmp('month_report_grid').getSelectionModel().deselect(Number(notesGrid.rec_index));
                                        me.expand_desel = false;
                                    }
                                },
                                scope: me
                            }
                        })
                    });

                    rowNode.grid = notesGrid;
                    notesGrid.getEl().swallowEvent(['mouseover', 'mousedown', 'click', 'dblclick', 'onRowFocus']);
                    notesGrid.fireEvent("bind", notesGrid, { id: "monthgrid_"+record.get('id') });
                }
                Ext.getCmp("_grid"+record.id).getView().refresh();
            }

        });

        me.getView().on('refresh', function(){
            var grid = Ext.getCmp('month_report_grid');
            var store = grid.getStore();
            var expander = grid.getPlugin('expander_month');
            var exp_obj = grid.exp_obj;

            for(var i = 0; i < store.getCount(); i++) {
                var record = store.getAt(i);
        //         if(expander.recordsExpanded[record.internalId]){
        //             expander.toggleRow(i, record);
        //         }
                var _id = store.find('id',record.data['id']);

                    if(exp_obj[record.data['id']]){
                        expander.toggleRow(_id,record);
                    }
            }
        });
    },

    onMonth_report_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {

        if(cellIndex !== 0 && cellIndex !== 1 && cellIndex !== 7){
            var win = Ext.create('NFW2.view.win_report_generate',{
                modal : true,
                record : record.data,
                edit : "edit"
            });

            win.show();
        }
    },

    onContainerRender3: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('spe_report_grid_con').hidden === true){
                Ext.getCmp('spe_report_grid_con').show();
                Ext.getCmp('spe_report_img').setSrc('../images/blbox_open.gif');
            }
            else{
                Ext.getCmp('spe_report_grid_con').hide();
                Ext.getCmp('spe_report_img').setSrc('../images/blbox_close.gif');
            }

        }, component);
    },

    onTableBeforeCellMouseDown3: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = Ext.getCmp('spe_report_grid');
        me.get_date = [];
        var _params = {
            basename: Ext.encode("atoz_report_history")
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _params,
            function(response){
                for(var i in response.list){
                    if(record.data.id === response.list[i]['@uid']){
                        for(var k in response.list[i].date){
                            var date_temp = Number(k.substr(0,4)) + "-" + Number(k.substr(4,2)) + "-" + Number(k.substr(6,2));
                            me.get_date.push(date_temp);
                        }
                    }
                }
            }
        );
    },

    onTableCollapsebody3: function(rowNode, record, expandRow, eOpts) {
        var grid = Ext.getCmp('spe_report_grid');
        delete grid.exp_obj[record.data['id']];
    },

    onCheckboxModelSelect3: function(rowmodel, record, index, eOpts) {
        if(record.data.report_cnt > 0){
            var grid = Ext.getCmp('spe_report_grid');
            var store = grid.getStore();
            var expander = grid.getPlugin('expander_spe');

            var record = store.getAt(index);
            if(!expander.recordsExpanded[record.internalId]){
                expander.toggleRow(index, record);
            }
        }

        if(Ext.getCmp('_grid'+record.data.id)){
            Ext.getCmp('_grid'+record.data.id).getSelectionModel().selectAll();
        }
    },

    onCheckboxModelDeselect3: function(rowmodel, record, index, eOpts) {
        var me = Ext.getCmp('NFW2_report_generate');

        if(Ext.getCmp('_grid'+record.data.id)){
            if(!me.expand_desel){ Ext.getCmp('_grid'+record.data.id).getSelectionModel().deselectAll(); }
        }
    },

    onSpe_report_gridAfterRender: function(component, eOpts) {
        var me = Ext.getCmp('spe_report_grid');
        me.exp_obj = {};

        me.getView().on('expandbody', function (rowNode, record, expandbody) {
            var in_data = [];
            var grid = Ext.getCmp('spe_report_grid');
            grid.exp_obj[record.data['@uid']] = true;
            for(var j in me.get_date){
                var date = me.get_date[j].split('-');
                var in_date = date[1] + "/" + date[2] + "/" + date[0];
                var cal_date = new Date(in_date);
                var temp = cal_date.getDate();
                cal_date.setDate(temp + record.data.setting[0].storage);
                // cal_date.setMonth(cal_date.getMonth()+1);
                var month;
                if(cal_date.getMonth() === 11){ month = 12; }
                else if(cal_date.getMonth() === 0){ month = 1; }
                else{ month = cal_date.getMonth()+1; }
                var del_day = cal_date.getFullYear() + "-" + month + "-" + cal_date.getDate();

                var arrDate2 = del_day.split("-");
                var getDate2 = new Date(parseInt(arrDate2[0]),parseInt(arrDate2[1])-1,parseInt(arrDate2[2]));

                var getDiffTime = new Date().getTime() - getDate2.getTime();

                var result_date = Math.floor(getDiffTime / (1000 * 60 * 60 * 24));

                result_date = -(result_date);

                in_data.push({
                    'create_day' : "생성일 : " + me.get_date[j],
                    'delete_day' : "폐기일 : " + del_day+", "+ result_date+"일 남음",
                    'id' : record.data.id+"_"+j,
                    'chk_id' : record.data.id,
                    'name' :record.data.name,
                    'period' :record.data.setting[0].form.cycle
                });
            }

            var store = {
                data: in_data,
                fields: [
                    {
                        name: 'create_day'
                    },
                    {
                        name: 'delete_day'
                    }
                ]
            };

            if(record.data.report_cnt !== 0){
                if(document.getElementById('spegrid_'+record.get('id')).getElementsByTagName('table').length === 0){
                    if(Ext.getCmp('_grid'+record.id) !== undefined){ Ext.getCmp('_grid'+record.id).destroy(); }
                    var rec_index = 0;
                    for(var i in Ext.data.StoreManager.lookup('store_atoz_report_userset_list').data.items){
                        if(record.data.name === Ext.data.StoreManager.lookup('store_atoz_report_userset_list').data.items[i].data.name){ rec_index = i; }
                    }

                    var notesGrid = Ext.create('Ext.grid.Panel', {
                        id: "_grid"+record.id,
                        header: false,
                        hideHeaders: true,
                        rowLines:true,
                        columnLines:true,
                        rec_index:rec_index,
                        margin : '0 -10 0 14',
                        renderTo: "spegrid_"+record.get('id'),
                        store: store,
                        columns: [
                            { text: 'create', dataIndex: 'create_day', flex:1},
                            { text: 'delete', dataIndex: 'delete_day', flex:1},
                            {
                                xtype: 'actioncolumn',
                                align: 'center',
                                width: 250,
                                items: [
                                    {
                                        iconCls: 'b_pdf',
                                        handler: function(view, rowIndex, colIndex, item, e, records, row){
                                            showLoadMask();
                                            var date_cre = record.data.report[rowIndex].date;
                                            var set_date = date_cre.split('-');
                                            var set_d1 = set_date[0];
                                            var set_d2 = set_date[1];
                                            var set_d3 = set_date[2];

                                            if(set_d2.length === 1){ set_d2 = "0"+set_d2; }
                                            if(set_d3.length === 1){ set_d3 = "0"+set_d3; }

                                            var write_time = set_d1+set_d2+set_d3;

                                            var _params = {
                                                id: Ext.encode(record.data.id),
                                                name : Ext.encode(record.data.name),
                                                cycle : Ext.encode(record.data.setting[0].form.cycle),
                                                date : Ext.encode(write_time)
                                            };

                                            request_helper.xmlrpc_call_JsonP(
                                                'ftsctrl',
                                                'writeAtoZReportInfo',
                                                _params,
                                                function(response){
                                                    var pdf_param = {
                                                        name : Ext.encode('atoz_report_month'),
        //                                                 pdf_name : Ext.encode(record.data.name+"_"+write_time)
                                                    };

                                                    Ext.Ajax.request({
                                                url : '/createPDF',
                                                method : 'GET',
                                                params : pdf_param,
                                                success : function(response, opts){
                                                    hideLoadMask();
        window.open("atoz_report_month.pdf","mywindow","menubar=1,resizable=1,scrollbars=1,width=1000,height=650");
        //                                                     window.open (record.data.name+"_"+write_time+".pdf","mywindow","menubar=1,resizable=1,scrollbars=1,width=1000,height=650");

                                                },
                                                failure : function(req,err){
                                                    console.log(req);
                                                }
                                            });
                                                }
                                            );

                                        }
                                    },
                                    {
                                        iconCls: 'b_html',
                                        handler: function(view, rowIndex, colIndex, item, e, records, row){
                                            var date_cre = record.data.report[rowIndex].date;
                                            var set_date = date_cre.split('-');
                                            var set_d1 = set_date[0];
                                            var set_d2 = set_date[1];
                                            var set_d3 = set_date[2];

                                            if(set_d2.length === 1){ set_d2 = "0"+set_d2; }
                                            if(set_d3.length === 1){ set_d3 = "0"+set_d3; }

                                            var write_time = set_d1+set_d2+set_d3;

                                            var _params = {
                                                id: Ext.encode(record.data.id),
                                                name : Ext.encode(record.data.name),
                                                cycle : Ext.encode(record.data.setting[0].form.cycle),
                                                date : Ext.encode(write_time)
                                            };

                                            request_helper.xmlrpc_call_JsonP(
                                                'ftsctrl',
                                                'writeAtoZReportInfo',
                                                _params,
                                                function(response){
                                                    window.open ("atoz_report_month.html","mywindow","menubar=1,resizable=1,scrollbars=1,width=1000,height=650");
                                                }
                                            );
                                            //var wid = Ext.getBody().getSize().width;
                                            //var hei = Ext.getBody().getSize().height;


                                        }
                                    }
                                ]
                            }
                        ],
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                            checkOnly: true,
                            mode: 'SIMPLE',
                            listeners: {
                                deselect: {
                                    fn: function(rowmodel, record, index, eOpts){
                                        var me = Ext.getCmp('NFW2_report_generate');

                                        me.expand_desel = true;
                                        Ext.getCmp('spe_report_grid').getSelectionModel().deselect(Number(notesGrid.rec_index));
                                        me.expand_desel = false;
                                    }
                                },
                                scope: me
                            }
                        })
                    });

                    rowNode.grid = notesGrid;
                    notesGrid.getEl().swallowEvent(['mouseover', 'mousedown', 'click', 'dblclick', 'onRowFocus']);
                    notesGrid.fireEvent("bind", notesGrid, { id: "spegrid_"+record.get('id') });
                }
                Ext.getCmp("_grid"+record.id).getView().refresh();
            }

        });

        me.getView().on('refresh', function(){
            var grid = Ext.getCmp('spe_report_grid');
            var store = grid.getStore();
            var expander = grid.getPlugin('expander_spe');
            var exp_obj = grid.exp_obj;

            for(var i = 0; i < store.getCount(); i++) {
                var record = store.getAt(i);
                //         if(expander.recordsExpanded[record.internalId]){
                //             expander.toggleRow(i, record);
                //         }
                var _id = store.find('id',record.data['id']);

                if(exp_obj[record.data['id']]){
                    expander.toggleRow(_id,record);
                }
            }
        });
    },

    onSpe_report_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {

        if(cellIndex !== 0 && cellIndex !== 1 && cellIndex !== 7){
            var win = Ext.create('NFW2.view.win_report_generate',{
                modal : true,
                record : record.data,
                edit : "edit"
            });

            win.show();
        }
    },

    onContainerRender4: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            if(Ext.getCmp('inter_report_grid_con').hidden === true){
                Ext.getCmp('inter_report_grid_con').show();
                Ext.getCmp('inter_report_img').setSrc('../images/blbox_open.gif');
            }
            else{
                Ext.getCmp('inter_report_grid_con').hide();
                Ext.getCmp('inter_report_img').setSrc('../images/blbox_close.gif');
            }

        }, component);
    },

    onInter_report_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex !== 0 && cellIndex !== 4){
            var win = Ext.create('NFW2.view.win_inter_report',{
                modal : true,
                edit : "edit",
                record : record
            });

            win.show();
        }
    },

    onNFW2_report_generateAfterRender: function(component, eOpts) {
        var me = this;

        me.expand_desel = false;
        Ext.data.StoreManager.lookup('store_country_item').load();
        me.get_report();
    },

    get_report: function() {
        var records_day = [];
        var records_week = [];
        var records_month = [];
        var records_spe = [];
        var records_inter = [];
        var me = this;

        var _params = {
            basename : Ext.encode("atoz_report"),
            cond : Ext.encode({'type' : 'report'})
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _params,

            function(response){
                hideLoadMask();
                setTimeout(function(){ me.setWidth('100%'); },100);
                var _params = {
                    basename: Ext.encode("atoz_report_history")
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'getObjects',
                    _params,
                    function(response2){
                        for(var i in response.list){
                            var chk_report = [];
                            var chk_date_num = 0;
                            for(var j in response2.list){
                                if(response.list[i]._id === response2.list[j]['@uid']){
                                    for(var l in response2.list[j].date){
                                        var date_temp = Number(l.substr(0,4)) + "-" + Number(l.substr(4,2)) + "-" + Number(l.substr(6,2));
                                        chk_report.push({
                                            'date' : date_temp,
                                            'id' : response2.list[j]['@uid']+"_"+chk_date_num
                                        });
                                        chk_date_num++;
                                    }
                                }
                            }

                            if(response.list !== null){

                                if(response.list[i].setting[0].form.cycle === "daily"){
                                    records_day.push({
                                        'name' : response.list[i].name,
                                        'desc' : response.list[i].desc,
                                        'email' : response.list[i].email,
                                        'setting' : response.list[i].setting,
                                        'system' : response.list[i].system,
                                        'tracker' : response.list[i].tracker,
                                        'use' : response.list[i].use,
                                        'id' : response.list[i]._id,
                                        'report_cnt' : chk_date_num,
                                        'report' : chk_report
                                    });
                                }
                                else if(response.list[i].setting[0].form.cycle === "weekly"){
                                    records_week.push({
                                        'name' : response.list[i].name,
                                        'desc' : response.list[i].desc,
                                        'email' : response.list[i].email,
                                        'setting' : response.list[i].setting,
                                        'system' : response.list[i].system,
                                        'tracker' : response.list[i].tracker,
                                        'use' : response.list[i].use,
                                        'id' : response.list[i]._id,
                                        'report_cnt' : chk_date_num,
                                        'report' : chk_report
                                    });
                                }
                                else if(response.list[i].setting[0].form.cycle === "monthly"){
                                    records_month.push({
                                        'name' : response.list[i].name,
                                        'desc' : response.list[i].desc,
                                        'email' : response.list[i].email,
                                        'setting' : response.list[i].setting,
                                        'system' : response.list[i].system,
                                        'tracker' : response.list[i].tracker,
                                        'use' : response.list[i].use,
                                        'id' : response.list[i]._id,
                                        'report_cnt' : chk_date_num,
                                        'report' : chk_report
                                    });
                                }
                                else if(response.list[i].setting[0].form.cycle === "specially"){
                                    records_spe.push({
                                        'name' : response.list[i].name,
                                        'desc' : response.list[i].desc,
                                        'email' : response.list[i].email,
                                        'setting' : response.list[i].setting,
                                        'system' : response.list[i].system,
                                        'tracker' : response.list[i].tracker,
                                        'use' : response.list[i].use,
                                        'id' : response.list[i]._id,
                                        'report_cnt' : chk_date_num,
                                        'report' : chk_report
                                    });
                                }
                            }
                        }

                        if(records_day.length > 0){
                            Ext.getCmp('day_report_grid_con').show();
                            Ext.getCmp('day_report_img').setSrc('../images/blbox_open.gif');
                        }
                        else{
                            Ext.getCmp('day_report_grid_con').hide();
                            Ext.getCmp('day_report_img').setSrc('../images/blbox_close.gif');
                        }
                        if(records_week.length > 0){
                            Ext.getCmp('week_report_grid_con').show();
                            Ext.getCmp('week_report_img').setSrc('../images/blbox_open.gif');
                        }
                        else{
                            Ext.getCmp('week_report_grid_con').hide();
                            Ext.getCmp('week_report_img').setSrc('../images/blbox_close.gif');
                        }
                        if(records_month.length > 0){
                            Ext.getCmp('month_report_grid_con').show();
                            Ext.getCmp('month_report_img').setSrc('../images/blbox_open.gif');
                        }
                        else{
                            Ext.getCmp('month_report_grid_con').hide();
                            Ext.getCmp('month_report_img').setSrc('../images/blbox_close.gif');
                        }
                        if(records_spe.length > 0){
                            Ext.getCmp('spe_report_grid_con').show();
                            Ext.getCmp('spe_report_img').setSrc('../images/blbox_open.gif');
                        }
                        else{
                            Ext.getCmp('spe_report_grid_con').hide();
                            Ext.getCmp('spe_report_img').setSrc('../images/blbox_close.gif');
                        }
                        Ext.data.StoreManager.lookup('store_atoz_report_day_list').loadData(records_day);
                        Ext.data.StoreManager.lookup('store_atoz_report_week_list').loadData(records_week);
                        Ext.data.StoreManager.lookup('store_atoz_report_month_list').loadData(records_month);
                        Ext.data.StoreManager.lookup('store_atoz_report_userset_list').loadData(records_spe);
                    }
                );


        var _params = {
            basename : Ext.encode("atoz_report_inter")
        };

        showLoadMask();
        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _params,

            function(response){
                hideLoadMask();
                console.log(response);
                for(var i in response.list){
                    if(response.list !== null){
                        records_inter.push({
                            'name' : response.list[i].name,
                            'desc' : response.list[i].desc,
                            'create' : response.list[i].create,
                            'report_data' : response.list[i].report_data,
                            'id' : response.list[i]._id
                        });
                    }
                }
                if(records_inter.length > 0){
                    Ext.getCmp('inter_report_grid_con').show();
                    Ext.getCmp('inter_report_img').setSrc('../images/blbox_open.gif');
                }
                else{
                    Ext.getCmp('inter_report_grid_con').hide();
                    Ext.getCmp('inter_report_img').setSrc('../images/blbox_close.gif');
                }
                Ext.data.StoreManager.lookup('store_atoz_report_inter_list').loadData(records_inter);
            }
        );
                    }
        );
    },

    create_report: function(in_store, record, cnt_num) {
        for(var i in in_store.data.items){
            var input_report = [];
            for(var k in record[i].report){
                if(record[i].report[k] !== ""){ input_report.push(record[i].report[k]); }
            }
            var obj = {
                '_id': in_store.data.items[i].data.id,
                'report': input_report,
                'report_cnt' : input_report.length
            };

            if(Ext.getCmp('_grid'+in_store.data.items[i].data.id) !== undefined){
                Ext.getCmp('_grid'+in_store.data.items[i].data.id).destroy();
            }

            var _params = {
                basename: Ext.encode("atoz_report"),
                obj : Ext.encode(obj),
                update : Ext.encode(true)
            };

            if(input_report.length !== in_store.data.items[i].data.report.length){
                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'setListTypeObj',
                    _params,
                    function(response){
                        Ext.getCmp('NFW2_report_generate').get_report();
                    }
                );
            }
        }
    },

    chk_select: function(in_store, param) {
        var record = [];
        var cnt_num = [];
        var chk = false;

        for(var i in in_store.data.items){
            var temp_record = [];
            for(var j in in_store.data.items[i].data.report){
                temp_record.push(in_store.data.items[i].data.report[j]);
            }
            cnt_num[i] = 0;
            record.push({
                'report' : temp_record
            });

        }

        var temp = [];
        for(var i in in_store.data.items){
            if(Ext.getCmp('_grid'+in_store.data.items[i].data.id)){
                temp.push({
                    'sel' : Ext.getCmp('_grid'+in_store.data.items[i].data.id).getSelectionModel().getSelection(),
                    'record_index' : i
                });
            }
        }

        for(var l in temp){
            for(var i in record){
                if(temp[l].record_index === i){
                    for(var j=0;j < temp[l].sel.length;j++){
                        for(var z in record[i].report){
                            if(temp[l].sel[j].data.id === record[i].report[z].id){
                                record[i].report[z] = ''; chk = true;
                            }
                        }
                    }

                    for(var k=0;k < record[i].report.length;k++){
                        if(record[i].report[k] === ""){ cnt_num[i]++;}
                    }
                }
            }
        }

        return [chk, record, cnt_num, temp];
    }

});