
Ext.define('NFW2.view.win_monitor_ips_uid_details', {
    extend: 'Ext.container.Container',
    alias: 'widget.win_monitor_ips_uid_details',

    requires: [
        'NFW2.view.win_monitor_ips_uid_detailsViewModel',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.view.Table',
        'Ext.grid.plugin.RowExpander',
        'Ext.XTemplate',
        'Ext.toolbar.Toolbar',
        'Ext.Img'
    ],

    viewModel: {
        type: 'win_monitor_ips_uid_details'
    },
    id: 'win_monitor_ips_uid_details',
    padding: 0,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            cls: 'zen_win',
            id: 'ips_uid_detail_form',
            scrollable: true,
            closable: true,
            header: false,
            items: [
                {
                    xtype: 'container',
                    hidden: true,
                    items: [
                        {
                            xtype: 'button',
                            cls: 'btn_b',
                            id: 'ips_uid_detail_btn1',
                            bind: {
                                text: '{default_screen}'
                            },
                            listeners: {
                                click: 'onButtonClick'
                            }
                        },
                        {
                            xtype: 'button',
                            cls: 'btn_b',
                            hidden: true,
                            id: 'ips_uid_detail_btn2',
                            bind: {
                                text: '{top_n_screen}'
                            },
                            listeners: {
                                click: 'onIps_uid_detail_btn2Click'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '-5 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        padding: 10
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'container',
                                    padding: 5,
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'x-title-text',
                                            id: 'ips_uid_detail_lb1'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    set_expand1: function(rowNode, record) {
                                        var store_record = [];

                                        for(var i in record.data.details){
                                            store_record.push({
                                                'num' : i,
                                                'priority' : record.data.details[i].priority,
                                                'name' : record.data.details[i].name,
                                                'detect' : record.data.details[i].detect,
                                                'block' : record.data.details[i].block,
                                                'perc' : record.data.details[i].perc
                                            });
                                        }

                                        var store = {
                                            data: store_record,
                                            fields: [
                                            {
                                                name: 'num'
                                            },
                                            {
                                                name: 'priority'
                                            },
                                            {
                                                name: 'name'
                                            },
                                            {
                                                name: 'detect'
                                            },
                                            {
                                                name: 'block'
                                            },
                                            {
                                                name: 'perc'
                                            }
                                            ]
                                        };

                                        if(document.getElementById('grid1_'+record.get('id')).getElementsByTagName('table').length === 0){

                                            var notesGrid = Ext.create('Ext.grid.Panel', {
                                                id: "_grid1"+record.id,
                                                header: false,
                                                hideHeaders: true,
                                                rowLines:true,
                                                columnLines:true,
                                                margin : '0 -10 0 -10',
                                                renderTo: "grid1_"+record.get('id'),
                                                store: store,
                                                columns: [
                                                { width: 30, dataIndex: 'num', align: 'center',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        var temp = Number(value)+1;
                                                        return String.fromCharCode(96+Number(temp));
                                                    }
                                                },
                                                {
                                                    text: 'test', dataIndex: 'name', flex:0.5,
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if(record.data.priority === 1){ return '<img src="../images/level_critical.png" border="0" height="14"/><span style="margin-left:5px;">'+value+'</span>'; }
                                                        if(record.data.priority === 2){ return '<img src="../images/level_high.png" border="0" height="14"/><span style="margin-left:5px;">'+value+'</span>'; }
                                                        if(record.data.priority === 3){ return '<img src="../images/level_normal.png" border="0" height="14"/><span style="margin-left:5px;">'+value+'</span>'; }
                                                        else{ return '<img src="../images/level_low.png" border="0" height="14"/><span style="margin-left:5px;">'+value+'</span>'; }
                                                    }
                                                },
                                                { text: 'test', dataIndex: 'detect', flex:0.1, align: 'center'},
                                                { text: 'test', dataIndex: 'block', flex:0.1, align: 'center'},
                                                {
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        return '<div class="graph" style="height:15;border-left:1px solid #bdbdbe;margin-top:-2;"><strong class="bar_g" style="font-size:11;height:15;width:'+value+'%;border:none;text-align:center">'+value+"%"+'</strong></div>';
                                                        //                     var width = Ext.getCmp(notesGrid.id).columns[colIndex].el.dom.clientWidth;
                                                        //                     var wid;
                                                        //                     if(width < 15){ wid = width/2; }
                                                        //                     else{ wid = width - 15; }

                                                        //                     var {
                                                        //                         xtype: 'container',
                                                        //                         height: 20,
                                                        //                         padding: 2,
                                                        //                         html: '<div class="graph" style="height:15;border-left:1px solid #bdbdbe;margin-top:-2;"><strong class="bar_g" style="font-size:11;height:15;width:'+value+'%;border:none;text-align:center">'+value+"%"+'</strong></div>',
                                                        //                         layout: {
                                                        //                             type: 'hbox',
                                                        //                             align: 'stretch',
                                                        //                             pack: 'center'
                                                        //                         }
                                                        //                     };
                                                    },
                                                    dataIndex: 'perc',
                                                    flex: 0.2
                                                }
                                                ]
                                            });

                                            rowNode.grid = notesGrid;
                                            notesGrid.getEl().swallowEvent(['mouseover', 'mousedown', 'click', 'dblclick', 'onRowFocus']);
                                            notesGrid.fireEvent("bind", notesGrid, { id: "grid1_"+record.get('id') });

                                            var store = Ext.data.StoreManager.lookup('store_monitor_ips_uid_detail_list1');
                                            for(var i in store.data.items){
                                                if(Ext.getCmp('_grid1'+store.data.items[i].id)){
                                                    Ext.getCmp("_grid1"+store.data.items[i].id).getView().refresh();
                                                }
                                            }

                                            //     Ext.getCmp("_grid1"+record.id).getView().refresh();
                                            Ext.getCmp("_grid1"+record.id).getView().on('refresh', function (view, eOpts) {
                                                if(Ext.getCmp('monitor_ips_uid_detail_grid1')){
                                                    Ext.getCmp('monitor_ips_uid_detail_grid1').height_get = Ext.getCmp('win_monitor_ips_uid_details').getSize().height;
                                                }
                                            });
                                        }
                                    },
                                    height: 200,
                                    id: 'monitor_ips_uid_detail_grid1',
                                    scrollable: {
                                        x: false,
                                        y: true
                                    },
                                    header: false,
                                    title: 'My Grid Panel',
                                    columnLines: true,
                                    store: 'store_monitor_ips_uid_detail_list1',
                                    columns: [
                                        {
                                            xtype: 'rownumberer',
                                            width: 30,
                                            align: 'center',
                                            dataIndex: 'number',
                                            text: 'N'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var who = '<button class="dbtn who" onclick="show_whois(\''+value+'\')"></button>';
                                                var tra = '<button class="dbtn tra" onclick="show_trace(\''+value+'\')"></button>';

                                                return who + tra + '<span>'+value+'</span>';
                                            },
                                            dataIndex: 'ip',
                                            flex: 0.3,
                                            bind: {
                                                text: '{dest}'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return value.toUpperCase();
                                            },
                                            align: 'center',
                                            dataIndex: 'protocol',
                                            flex: 0.2,
                                            bind: {
                                                text: '{protocol}'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            align: 'center',
                                            dataIndex: 'detect',
                                            flex: 0.1,
                                            bind: {
                                                text: '{detect}'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            align: 'center',
                                            dataIndex: 'block',
                                            flex: 0.1,
                                            bind: {
                                                text: '{deny}'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return '<div class="graph" style="height:15;border-left:1px solid #bdbdbe;margin-top:-2;"><strong class="bar_g" style="font-size:11;height:15;width:'+value+'%;border:none">'+value+"%"+'</strong></div>';
                                            },
                                            align: 'center',
                                            dataIndex: 'percent',
                                            flex: 0.2,
                                            bind: {
                                                text: '{ratio}'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            disabled: true,
                                            hidden: true,
                                            width: 0,
                                            text: 'MyColumn24'
                                        }
                                    ],
                                    viewConfig: {
                                        listeners: {
                                            expandbody: 'onTableExpandbody',
                                            collapsebody: 'onTableCollapsebody1',
                                            refresh: 'onTableRefresh'
                                        }
                                    },
                                    listeners: {
                                        afterrender: 'onMonitor_ips_uid_detail_grid1AfterRender'
                                    },
                                    plugins: [
                                        {
                                            ptype: 'rowexpander',
                                            pluginId: 'expander_grid1',
                                            rowBodyTpl: [
                                                '<div id="grid1_{id}" ></div>'
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 5',
                            items: [
                                {
                                    xtype: 'container',
                                    padding: 5,
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'x-title-text',
                                            id: 'ips_uid_detail_lb2'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    set_expand2: function(rowNode, record) {
                                        var store_record = [];

                                        for(var i in record.data.details){
                                            store_record.push({
                                                'num' : i,
                                                'priority' : record.data.details[i].priority,
                                                'name' : record.data.details[i].name,
                                                'detect' : record.data.details[i].detect,
                                                'block' : record.data.details[i].block,
                                                'perc' : record.data.details[i].perc
                                            });
                                        }

                                        var store = {
                                            data: store_record,
                                            fields: [
                                            {
                                                name: 'num'
                                            },
                                            {
                                                name: 'priority'
                                            },
                                            {
                                                name: 'name'
                                            },
                                            {
                                                name: 'detect'
                                            },
                                            {
                                                name: 'block'
                                            },
                                            {
                                                name: 'perc'
                                            }
                                            ]
                                        };

                                        if(document.getElementById('grid2_'+record.get('id')).getElementsByTagName('table').length === 0){
                                            var notesGrid = Ext.create('Ext.grid.Panel', {
                                                id: "_grid2"+record.id,
                                                header: false,
                                                hideHeaders: true,
                                                rowLines:true,
                                                columnLines:true,
                                                scroll:'vertical',
                                                margin : '0 -10 0 -10',
                                                renderTo: "grid2_"+record.get('id'),
                                                store: store,
                                                columns: [
                                                { width: 30, dataIndex: 'num', align: 'center',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        var temp = Number(value)+1;
                                                        return String.fromCharCode(96+Number(temp));
                                                    }
                                                },
                                                {
                                                    text: 'test', dataIndex: 'name', flex:0.5,
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if(record.data.priority === 1){ return '<img src="../images/level_critical.png" border="0" height="14"/><span style="margin-left:5px;">'+value+'</span>'; }
                                                        if(record.data.priority === 2){ return '<img src="../images/level_high.png" border="0" height="14"/><span style="margin-left:5px;">'+value+'</span>'; }
                                                        if(record.data.priority === 3){ return '<img src="../images/level_normal.png" border="0" height="14"/><span style="margin-left:5px;">'+value+'</span>'; }
                                                        else{ return '<img src="../images/level_low.png" border="0" height="14"/><span style="margin-left:5px;">'+value+'</span>'; }
                                                    }
                                                },
                                                { text: 'test', dataIndex: 'detect', flex:0.1, align: 'center'},
                                                { text: 'test', dataIndex: 'block', flex:0.1, align: 'center'},
                                                {
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        return '<div class="graph" style="height:15;border-left:1px solid #bdbdbe;margin-top:-2;"><strong class="bar_g" style="font-size:11;height:15;width:'+value+'%;border:none;text-align:center">'+value+"%"+'</strong></div>';
                                                    },
                                                    dataIndex: 'perc',
                                                    flex: 0.2
                                                }
                                                ]
                                            });

                                            rowNode.grid = notesGrid;
                                            notesGrid.getEl().swallowEvent(['mouseover', 'mousedown', 'click', 'dblclick', 'onRowFocus']);
                                            notesGrid.fireEvent("bind", notesGrid, { id: "grid2_"+record.get('id') });
                                        }

                                        var store = Ext.data.StoreManager.lookup('store_monitor_ips_uid_detail_list2');
                                        for(var i in store.data.items){
                                            if(Ext.getCmp('_grid2'+store.data.items[i].id)){
                                                Ext.getCmp("_grid2"+store.data.items[i].id).getView().refresh();
                                            }
                                        }

                                        // Ext.getCmp("_grid2"+record.id).getView().refresh();
                                        Ext.getCmp("_grid2"+record.id).getView().on('refresh', function (view, eOpts) {
                                            if(Ext.getCmp('monitor_ips_uid_detail_grid2')){
                                                Ext.getCmp('monitor_ips_uid_detail_grid2').height_get = Ext.getCmp('win_monitor_ips_uid_details').getSize().height;
                                            }
                                        });
                                    },
                                    height: 200,
                                    id: 'monitor_ips_uid_detail_grid2',
                                    scrollable: {
                                        x: false,
                                        y: true
                                    },
                                    header: false,
                                    title: 'My Grid Panel',
                                    columnLines: true,
                                    store: 'store_monitor_ips_uid_detail_list2',
                                    columns: [
                                        {
                                            xtype: 'rownumberer',
                                            width: 30,
                                            align: 'center',
                                            dataIndex: 'number',
                                            text: 'N'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var who = '<button class="dbtn who" onclick="show_whois(\''+value+'\')"></button>';
                                                var tra = '<button class="dbtn tra" onclick="show_trace(\''+value+'\')"></button>';

                                                return who + tra + '<span>'+value+'</span>';
                                            },
                                            dataIndex: 'ip',
                                            flex: 0.3,
                                            bind: {
                                                text: '{attacker}'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return value.toUpperCase();
                                            },
                                            align: 'center',
                                            dataIndex: 'protocol',
                                            flex: 0.2,
                                            bind: {
                                                text: '{protocol}'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            align: 'center',
                                            dataIndex: 'detect',
                                            flex: 0.1,
                                            bind: {
                                                text: '{detect}'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            align: 'center',
                                            dataIndex: 'block',
                                            flex: 0.1,
                                            bind: {
                                                text: '{deny}'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return '<div class="graph" style="height:15;border-left:1px solid #bdbdbe;margin-top:-2;"><strong class="bar_g" style="font-size:11;height:15;width:'+value+'%;border:none">'+value+"%"+'</strong></div>';
                                            },
                                            align: 'center',
                                            dataIndex: 'percent',
                                            flex: 0.2,
                                            bind: {
                                                text: '{ratio}'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            disabled: true,
                                            hidden: true,
                                            width: 0,
                                            text: 'MyColumn25'
                                        }
                                    ],
                                    viewConfig: {
                                        listeners: {
                                            expandbody: 'onTableExpandbody1',
                                            refresh: 'onTableRefresh1',
                                            collapsebody: 'onTableCollapsebody2'
                                        }
                                    },
                                    listeners: {
                                        afterrender: 'onMonitor_ips_uid_detail_grid2AfterRender',
                                        render: 'onMonitor_ips_uid_detail_grid2Render'
                                    },
                                    plugins: [
                                        {
                                            ptype: 'rowexpander',
                                            pluginId: 'expander_grid2',
                                            rowBodyTpl: [
                                                '<div id="grid2_{id}" ></div>'
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 5',
                            items: [
                                {
                                    xtype: 'container',
                                    padding: 5,
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'x-title-text',
                                            id: 'ips_uid_detail_lb3'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    set_expand3: function(rowNode, record) {
                                        var store_record = [];

                                        for(var i in record.data.details){
                                            store_record.push({
                                                'num' : i,
                                                'priority' : record.data.details[i].priority,
                                                'name' : record.data.details[i].name,
                                                'perc' : record.data.details[i].perc
                                            });
                                        }

                                        var store = {
                                            data: store_record,
                                            fields: [
                                            {
                                                name: 'num'
                                            },
                                            {
                                                name: 'priority'
                                            },
                                            {
                                                name: 'name'
                                            },
                                            {
                                                name: 'perc'
                                            }
                                            ]
                                        };


                                        if(document.getElementById('grid3_'+record.get('id')).getElementsByTagName('table').length === 0){
                                            var notesGrid = Ext.create('Ext.grid.Panel', {
                                                id: "_grid3"+record.id,
                                                header: false,
                                                hideHeaders: true,
                                                rowLines:true,
                                                columnLines:true,
                                                margin : '0 -10 0 -10',
                                                renderTo: "grid3_"+record.get('id'),
                                                store: store,
                                                columns: [
                                                { width: 30, dataIndex: 'num', align: 'center',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        var temp = Number(value)+1;
                                                        return String.fromCharCode(96+Number(temp));
                                                    }
                                                },
                                                {
                                                    text: 'test', dataIndex: 'name', flex:0.7,
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        console.log(record.data);
                                                        if(record.data.priority === 1){ return '<img src="../images/level_critical.png" border="0" height="14"/><span style="margin-left:5px;">'+value+'</span>'; }
                                                        if(record.data.priority === 2){ return '<img src="../images/level_high.png" border="0" height="14"/><span style="margin-left:5px;">'+value+'</span>'; }
                                                        if(record.data.priority === 3){ return '<img src="../images/level_normal.png" border="0" height="14"/><span style="margin-left:5px;">'+value+'</span>'; }
                                                        else{ return '<img src="../images/level_low.png" border="0" height="14"/><span style="margin-left:5px;">'+value+'</span>'; }
                                                    }
                                                },
                                                {
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        return '<div class="graph" style="height:15;border-left:1px solid #bdbdbe;margin-top:-2;"><strong class="bar_g" style="font-size:11;height:15;width:'+value+'%;border:none;text-align:center">'+value+"%"+'</strong></div>';
                                                        //                     var width = Ext.getCmp(notesGrid.id).columns[colIndex].el.dom.clientWidth;
                                                        //                     var wid;
                                                        //                     if(width < 15){ wid = width/2; }
                                                        //                     else{ wid = width - 15; }

                                                        //                     return {
                                                        //                         xtype: 'container',
                                                        //                         height: 20,
                                                        //                         padding: 2,
                                                        //                         html: '<div class="graph" style="height:15;border-left:1px solid #bdbdbe;margin-top:-2;"><strong class="bar_g" style="font-size:11;height:15;width:'+value+'%;border:none;text-align:center">'+value+"%"+'</strong></div>',
                                                        //                         layout: {
                                                        //                             type: 'hbox',
                                                        //                             align: 'stretch',
                                                        //                             pack: 'center'
                                                        //                         }
                                                        //                     };
                                                    },
                                                    dataIndex: 'perc',
                                                    flex: 0.3
                                                }
                                                ]
                                            });

                                            rowNode.grid = notesGrid;
                                            notesGrid.getEl().swallowEvent(['mouseover', 'mousedown', 'click', 'dblclick', 'onRowFocus']);
                                            notesGrid.fireEvent("bind", notesGrid, { id: "grid3_"+record.get('id') });
                                        }

                                        var store = Ext.data.StoreManager.lookup('store_monitor_ips_uid_detail_list3');
                                        for(var i in store.data.items){
                                            if(Ext.getCmp('_grid3'+store.data.items[i].id)){
                                                Ext.getCmp("_grid3"+store.data.items[i].id).getView().refresh();
                                            }
                                        }

                                        Ext.getCmp("_grid3"+record.id).getView().refresh();
                                        Ext.getCmp("_grid3"+record.id).getView().on('refresh', function (view, eOpts) {
                                            if(Ext.getCmp('monitor_ips_uid_detail_grid3')){
                                                Ext.getCmp('monitor_ips_uid_detail_grid3').height_get = Ext.getCmp('win_monitor_ips_uid_details').getSize().height;
                                            }
                                        });
                                    },
                                    height: 200,
                                    id: 'monitor_ips_uid_detail_grid3',
                                    scrollable: {
                                        x: false,
                                        y: true
                                    },
                                    header: false,
                                    title: 'My Grid Panel',
                                    columnLines: true,
                                    store: 'store_monitor_ips_uid_detail_list3',
                                    columns: [
                                        {
                                            xtype: 'rownumberer',
                                            width: 30,
                                            align: 'center',
                                            dataIndex: 'number',
                                            text: 'N'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(record.data.priority === 1){ return '<img src="../images/level_critical.png" border="0" height="14"/>'; }
                                                if(record.data.priority === 2){ return '<img src="../images/level_high.png" border="0" height="14"/>'; }
                                                if(record.data.priority === 3){ return '<img src="../images/level_normal.png" border="0" height="14"/>'; }
                                                else{ return '<img src="../images/level_low.png" border="0" height="14"/>'; }
                                            },
                                            align: 'center',
                                            dataIndex: 'priority',
                                            flex: 0.7,
                                            bind: {
                                                text: '{hazard}'
                                            }
                                        },
                                        {
                                            xtype: 'componentcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return '<div class="graph" style="height:15;border-left:1px solid #bdbdbe;margin-top:-2;"><strong class="bar_g" style="font-size:11;height:15;width:'+value+'%;border:none">'+value+"%"+'</strong></div>';
                                            },
                                            align: 'center',
                                            dataIndex: 'percent',
                                            flex: 0.3,
                                            bind: {
                                                text: '{ratio}'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            disabled: true,
                                            hidden: true,
                                            width: 0,
                                            text: 'MyColumn26'
                                        }
                                    ],
                                    viewConfig: {
                                        listeners: {
                                            expandbody: 'onTableExpandbody2',
                                            refresh: 'onTableRefresh2',
                                            collapsebody: 'onTableCollapsebody'
                                        }
                                    },
                                    listeners: {
                                        afterrender: 'onMonitor_ips_uid_detail_grid3AfterRender'
                                    },
                                    plugins: [
                                        {
                                            ptype: 'rowexpander',
                                            pluginId: 'expander_grid3',
                                            rowBodyTpl: [
                                                '<div id="grid3_{id}" ></div>'
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
                afterrender: 'onWin_monitor_ips_uid_detailAfterRender',
                beforedestroy: 'onIps_uid_detail_formBeforeDestroy'
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    cls: 'zen_toolbar',
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 2,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            cls: 'x-title-text',
                                            text: '정책 별 탐지/차단 상세 정보'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'image',
                                            maxHeight: 16,
                                            overCls: 'over_mouse',
                                            width: 16,
                                            imgCls: 'b_win_close',
                                            listeners: {
                                                render: 'onImageRender'
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
    ],

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        if(me.mode === "monitor"){
            Ext.getCmp('monitor_ips_uid_grid').setHeight(document.body.clientHeight-188);
            me.me.close();
        }
    },

    onIps_uid_detail_btn2Click: function(button, e, eOpts) {
        Ext.getCmp('con_top').remove(Ext.getCmp('con_top').items.items[Ext.getCmp('con_top').items.items.length-1]);
        Ext.getCmp('con_top_grid').show();
    },

    onTableExpandbody: function(rowNode, record, expandRow, eOpts) {
        var grid = Ext.getCmp("monitor_ips_uid_detail_grid1");
        grid.exp_obj[record.data.id] = true;

        var _len = record.data.details.length;
        if(_len === 0 || !record.data.details){ return false; }

        var theTd = Ext.fly(expandRow).down('td');
        theTd.mask('Loading...');

        var ar_time = [];
        for(var i=0; i<_len; i++){
            var data = record.data.details[i];
            var up_data = record.data;
            var cnt = i+1;
            console.log(data);
            list = '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;min-heigth:24;max-width:10px;width:30px;">'+cnt+'</td>';
            var pri = data.priority;
            var img = (pri===1)?'critical':(pri===2)?'high':(pri===3)?'normal':'low';
            list += '<td role="gridcell" class="x-grid-cell x-grid-td" style="min-heigth:24;max-width:10px;"><img src="../images/level_'+img+'.png" border="0" height="14" /> '+data.name+'</td>';
            list += '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;min-heigth:24;max-width:10px;width:40px;">'+data.detect+'</td>';
            list += '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;min-heigth:24;max-width:10px;width:40px;">'+data.block+'</td>';
            list += '<td role="gridcell" class="x-grid-cell x-grid-td" style="min-heigth:24;max-width:10px;width:80px;"><div class="graph" style="height:15;border-left:1px solid #bdbdbe;margin-top:-2;"><strong class="bar_g" style="font-size:11;height:15;width:'+data.perc+'%;border:none;text-align:center">'+data.perc+"%"+'</strong></div></td>';
            ar_time.push('<tr role="row" class="x-grid-row  x-grid-data-row x-grid-tpl-tracker">'+list+'</tr>');
        }
        var t_list = '<tr role="row" class="x-grid-row  x-grid-data-row x-grid-tpl-tracker">'+
            '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;background:#f5f5f5;min-heigth:24;width:30px;">N</td>'+
            '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;background:#f5f5f5;min-heigth:24;">시그너처 이름</td>'+
            '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;background:#f5f5f5;min-heigth:24;width:40px;">탐지</td>'+
            '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;background:#f5f5f5;min-heigth:24;width:40px;">차단</td>'+
            '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;background:#f5f5f5;min-heigth:24;width:80px;">비율</td>'+
            '</tr>';
        var _tpl = new Ext.XTemplate('<table cellpadding="5" cellspacing="0" style="width:100%;border-collapse:collapse;" class="x-grid-item x_grid_template">'+t_list+ar_time.join('')+'</table>');

        theTd.update(_tpl.apply({
            sip: '',
            dip: ''
        }));
    },

    onTableCollapsebody1: function(rowNode, record, expandRow, eOpts) {
        var grid = Ext.getCmp("monitor_ips_uid_detail_grid1");
        delete grid.exp_obj[record.data['id']];
    },

    onTableRefresh: function(dataview, eOpts) {
        var grid = Ext.getCmp('monitor_ips_uid_detail_grid1');
        var store = grid.getStore();
        var expander = grid.getPlugin('expander_grid1');
        var exp_obj = grid.exp_obj;

        var expand = [];
        var cnt = 0;
        for(var j in expander.recordsExpanded){
            if(expander.recordsExpanded[j]){ expand.push(cnt); }
            cnt++;
        }

        for(var i = 0; i < store.getCount(); i++){
            var record = store.getAt(i);

            var _id = store.find('id',record.data['id']);

            if(exp_obj[record.data['id']]){
                expander.toggleRow(_id,record);
            }
        }
    },

    onMonitor_ips_uid_detail_grid1AfterRender: function(component, eOpts) {
        var me = Ext.getCmp('monitor_ips_uid_detail_grid1');
        me.exp_obj = {};

        // if(me){
        // me.getView().on('refresh', function (view, eOpts) {
        //     var grid = Ext.getCmp('monitor_ips_uid_detail_grid1');
        //     var store = grid.getStore();
        //     var expander = grid.getPlugin('expander_grid1');

        //     for(var i = 0; i < store.getCount(); i++) {
        //         var record = store.getAt(i);
        //         if(expander.recordsExpanded[record.internalId]){
        //             Ext.getCmp('monitor_ips_uid_detail_grid1').set_expand1(Ext.getCmp('monitor_ips_uid_detail_grid1').getView().getNode(i),record);
        //         }
        //     }

        //     Ext.getCmp('win_monitor_ips_uid_details').setHeight(me.height_get);
        // });

        // me.getView().on('expandbody', function (rowNode, record, expandbody) {
        //     Ext.getCmp('monitor_ips_uid_detail_grid1').set_expand1(rowNode, record);
        //     me.height_get = Ext.getCmp('ips_uid_detail_form').getSize().height;
        // });

        // me.getView().on('collapsebody', function (rowNode, record, expandbody) {
        //     var store = Ext.data.StoreManager.lookup('store_monitor_ips_uid_detail_list1');
        //     for(var i in store.data.items){
        //         if(Ext.getCmp('_grid1'+store.data.items[i].id)){
        //             Ext.getCmp("_grid1"+store.data.items[i].id).getView().refresh();
        //         }
        //     }
        // });
        // }
    },

    onTableExpandbody1: function(rowNode, record, expandRow, eOpts) {
        var grid = Ext.getCmp("monitor_ips_uid_detail_grid2");
        grid.exp_obj[record.data.id] = true;

        var _len = record.data.details.length;
        if(_len === 0 || !record.data.details){ return false; }

        var theTd = Ext.fly(expandRow).down('td');
        theTd.mask('Loading...');

        var ar_time = [];
        for(var i=0; i<_len; i++){
            var data = record.data.details[i];
            var up_data = record.data;
            var cnt = i+1;
            console.log(data);
            list = '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;min-heigth:24;max-width:10px;width:30px;">'+cnt+'</td>';
            var pri = data.priority;
            var img = (pri===1)?'critical':(pri===2)?'high':(pri===3)?'normal':'low';
            list += '<td role="gridcell" class="x-grid-cell x-grid-td" style="min-heigth:24;max-width:10px;"><img src="../images/level_'+img+'.png" border="0" height="14" /> '+data.name+'</td>';
            list += '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;min-heigth:24;max-width:10px;width:40px;">'+data.detect+'</td>';
            list += '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;min-heigth:24;max-width:10px;width:40px;">'+data.block+'</td>';
            list += '<td role="gridcell" class="x-grid-cell x-grid-td" style="min-heigth:24;max-width:10px;width:80px;"><div class="graph" style="height:15;border-left:1px solid #bdbdbe;margin-top:-2;"><strong class="bar_g" style="font-size:11;height:15;width:'+data.perc+'%;border:none;text-align:center">'+data.perc+"%"+'</strong></div></td>';
            ar_time.push('<tr role="row" class="x-grid-row  x-grid-data-row x-grid-tpl-tracker">'+list+'</tr>');
        }
        var t_list = '<tr role="row" class="x-grid-row  x-grid-data-row x-grid-tpl-tracker">'+
            '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;background:#f5f5f5;min-heigth:24;width:30px;">N</td>'+
            '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;background:#f5f5f5;min-heigth:24;">시그너처 이름</td>'+
            '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;background:#f5f5f5;min-heigth:24;width:40px;">탐지</td>'+
            '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;background:#f5f5f5;min-heigth:24;width:40px;">차단</td>'+
            '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;background:#f5f5f5;min-heigth:24;width:80px;">비율</td>'+
            '</tr>';
        var _tpl = new Ext.XTemplate('<table cellpadding="5" cellspacing="0" style="width:100%;border-collapse:collapse;" class="x-grid-item x_grid_template">'+t_list+ar_time.join('')+'</table>');

        theTd.update(_tpl.apply({
            sip: '',
            dip: ''
        }));
    },

    onTableRefresh1: function(dataview, eOpts) {
        var grid = Ext.getCmp('monitor_ips_uid_detail_grid2');
        var store = grid.getStore();
        var expander = grid.getPlugin('expander_grid2');
        var exp_obj = grid.exp_obj;

        var expand = [];
        var cnt = 0;
        for(var j in expander.recordsExpanded){
            if(expander.recordsExpanded[j]){ expand.push(cnt); }
            cnt++;
        }

        for(var i = 0; i < store.getCount(); i++){
            var record = store.getAt(i);

            var _id = store.find('id',record.data['id']);

            if(exp_obj[record.data['id']]){
                expander.toggleRow(_id,record);
            }
        }
    },

    onTableCollapsebody2: function(rowNode, record, expandRow, eOpts) {
        var grid = Ext.getCmp("monitor_ips_uid_detail_grid2");
        delete grid.exp_obj[record.data['id']];
    },

    onMonitor_ips_uid_detail_grid2AfterRender: function(component, eOpts) {
        var me = Ext.getCmp('monitor_ips_uid_detail_grid2');
        me.exp_obj = {};

        // if(me){
        // me.getView().on('refresh', function (view, eOpts) {
        //     var grid = Ext.getCmp('monitor_ips_uid_detail_grid2');
        //     var store = grid.getStore();
        //     var expander = grid.getPlugin('expander_grid2');

        //     for(var i = 0; i < store.getCount(); i++) {
        //         var record = store.getAt(i);
        //         if(expander.recordsExpanded[record.internalId]){
        //             Ext.getCmp('monitor_ips_uid_detail_grid2').set_expand2(Ext.getCmp('monitor_ips_uid_detail_grid2').getView().getNode(i),record);
        //         }
        //     }

        //     Ext.getCmp('win_monitor_ips_uid_details').setHeight(me.height_get);
        // });

        // me.getView().on('expandbody', function (rowNode, record, expandbody) {
        //     Ext.getCmp('monitor_ips_uid_detail_grid2').set_expand2(rowNode, record);
        //     me.height_get = Ext.getCmp('ips_uid_detail_form').getSize().height;
        // });

        // me.getView().on('collapsebody', function (rowNode, record, expandbody) {
        //     var store = Ext.data.StoreManager.lookup('store_monitor_ips_uid_detail_list2');
        //     for(var i in store.data.items){
        //         if(Ext.getCmp('_grid2'+store.data.items[i].id)){
        //             Ext.getCmp("_grid2"+store.data.items[i].id).getView().refresh();
        //         }
        //     }
        // });
        // }
    },

    onMonitor_ips_uid_detail_grid2Render: function(component, eOpts) {

    },

    onTableExpandbody2: function(rowNode, record, expandRow, eOpts) {
        var grid = Ext.getCmp("monitor_ips_uid_detail_grid3");
        grid.exp_obj[record.data.id] = true;

        var _len = record.data.details.length;
        if(_len === 0 || !record.data.details){ return false; }

        var theTd = Ext.fly(expandRow).down('td');
        theTd.mask('Loading...');

        var ar_time = [];
        for(var i=0; i<_len; i++){
            var data = record.data.details[i];
            var up_data = record.data;
            var cnt = i+1;

            list = '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;min-heigth:24;max-width:10px;width:30px;">'+cnt+'</td>';
            var pri = data.priority;
            var img = (pri===1)?'critical':(pri===2)?'high':(pri===3)?'normal':'low';
            list += '<td role="gridcell" class="x-grid-cell x-grid-td" style="min-heigth:24;max-width:10px;"><img src="../images/level_'+img+'.png" border="0" height="14" /> '+data.name+'</td>';
            list += '<td role="gridcell" class="x-grid-cell x-grid-td" style="min-heigth:24;max-width:10px;width:80px;"><div class="graph" style="height:15;border-left:1px solid #bdbdbe;margin-top:-2;"><strong class="bar_g" style="font-size:11;height:15;width:'+data.perc+'%;border:none;text-align:center">'+data.perc+"%"+'</strong></div></td>';
            ar_time.push('<tr role="row" class="x-grid-row  x-grid-data-row x-grid-tpl-tracker">'+list+'</tr>');
        }
        var t_list = '<tr role="row" class="x-grid-row  x-grid-data-row x-grid-tpl-tracker">'+
            '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;background:#f5f5f5;min-heigth:24;width:30px;">N</td>'+
            '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;background:#f5f5f5;min-heigth:24;">시그너처 이름</td>'+
            '<td role="gridcell" class="x-grid-cell x-grid-td" style="text-align:center;background:#f5f5f5;min-heigth:24;width:80px;">비율</td>'+
            '</tr>';
        var _tpl = new Ext.XTemplate('<table cellpadding="5" cellspacing="0" style="width:100%;border-collapse:collapse;" class="x-grid-item x_grid_template">'+t_list+ar_time.join('')+'</table>');

        theTd.update(_tpl.apply({
            sip: '',
            dip: ''
        }));
    },

    onTableRefresh2: function(dataview, eOpts) {
        var grid = Ext.getCmp('monitor_ips_uid_detail_grid3');
        var store = grid.getStore();
        var expander = grid.getPlugin('expander_grid3');
        var exp_obj = grid.exp_obj;

        var expand = [];
        var cnt = 0;
        for(var j in expander.recordsExpanded){
            if(expander.recordsExpanded[j]){ expand.push(cnt); }
            cnt++;
        }

        for(var i = 0; i < store.getCount(); i++){
            var record = store.getAt(i);

            var _id = store.find('id',record.data['id']);

            if(exp_obj[record.data['id']]){
                expander.toggleRow(_id,record);
            }
        }
    },

    onTableCollapsebody: function(rowNode, record, expandRow, eOpts) {
        var grid = Ext.getCmp("monitor_ips_uid_detail_grid3");
        delete grid.exp_obj[record.data['id']];
    },

    onMonitor_ips_uid_detail_grid3AfterRender: function(component, eOpts) {
        var me = Ext.getCmp('monitor_ips_uid_detail_grid3');
        me.exp_obj = {};
        // if(me){
        // me.getView().on('refresh', function (view, eOpts) {
        //     var grid = Ext.getCmp('monitor_ips_uid_detail_grid3');
        //     var store = grid.getStore();
        //     var expander = grid.getPlugin('expander_grid3');

        //     for(var i = 0; i < store.getCount(); i++) {
        //         var record = store.getAt(i);
        //         if(expander.recordsExpanded[record.internalId]){
        //             Ext.getCmp('monitor_ips_uid_detail_grid3').set_expand3(Ext.getCmp('monitor_ips_uid_detail_grid3').getView().getNode(i),record);
        //         }
        //     }

        //     Ext.getCmp('win_monitor_ips_uid_details').setHeight(me.height_get);
        // });

        // me.getView().on('expandbody', function (rowNode, record, expandbody) {
        //     Ext.getCmp('monitor_ips_uid_detail_grid3').set_expand3(rowNode, record);
        //     me.height_get = Ext.getCmp('ips_uid_detail_form').getSize().height;
        // });

        // me.getView().on('collapsebody', function (rowNode, record, expandbody) {
        //     var store = Ext.data.StoreManager.lookup('store_monitor_ips_uid_detail_list3');
        //     for(var i in store.data.items){
        //         if(Ext.getCmp('_grid3'+store.data.items[i].id)){
        //             Ext.getCmp("_grid3"+store.data.items[i].id).getView().refresh();
        //         }
        //     }
        // });
        // }
    },

    onWin_monitor_ips_uid_detailAfterRender: function(component, eOpts) {
        var me = this;
        Ext.getCmp('NFW2_monitor_ips_uid').get_detail = true;
        Ext.getCmp('NFW2_monitor_ips_uid').get_detail_data = [me.record.data.policy, me.record.data.sip, me.record.data.dip];

        if(me.mode === "board"){
            Ext.getCmp('ips_uid_detail_btn1').hide();
            Ext.getCmp('ips_uid_detail_btn2').show();
            Ext.getCmp('monitor_ips_uid_detail_grid1').setHeight(115);
            Ext.getCmp('monitor_ips_uid_detail_grid2').setHeight(115);
            Ext.getCmp('monitor_ips_uid_detail_grid3').setHeight(115);
        }
        else{
            //     Ext.getCmp('ips_uid_detail_btn1').show();
            Ext.getCmp('ips_uid_detail_btn2').hide();
        }

        Ext.getCmp('ips_uid_detail_lb1').setText(__zen('attacker')+' : '+ me.record.data.sip + ', '+__zen('rule_id')+' : ' + me.record.data.policy);
        Ext.getCmp('ips_uid_detail_lb2').setText(__zen('dest')+' : '+ me.record.data.dip + ', '+__zen('rule_id')+' : ' + me.record.data.policy);
        Ext.getCmp('ips_uid_detail_lb3').setText(__zen('hazard')+'('+__zen('dest')+' : '+ me.record.data.dip + ', '+__zen('rule_id')+' : ' + me.record.data.policy + ")");

        var time_mins = Number(Ext.getCmp('start_time').getValue());
        var time = Ext.getCmp('update_time2').text.split(' ');
        var update_secs = Number(time[0]);

        if(me.mode === "board"){
            var _params = {
                mode : Ext.encode('policy_combine'),
                time_info : Ext.encode({'time_mins':time_mins, 'update_secs':Ext.getCmp('NFW2_monitor_ips_uid').update_board, 'start_ts':Ext.getCmp('NFW2_monitor_ips_uid').start_ts,'period':update_secs}),
                menu_type : Ext.encode('dashboard'),
                topn_param : Ext.encode({'spd_id':me.record.data.policy,'sip':me.record.data.sip,'dip':me.record.data.dip})
            };
        }
        else{
            var _params = {
                mode : Ext.encode('policy_combine'),
                time_info : Ext.encode({'time_mins':time_mins, 'update_secs':Ext.getCmp('NFW2_monitor_ips_uid').update_sec, 'start_ts':Ext.getCmp('NFW2_monitor_ips_uid').start_ts,'period':update_secs}),
                menu_type : Ext.encode('monitor'),
                topn_param : Ext.encode({'spd_id':me.record.data.policy,'sip':me.record.data.sip,'dip':me.record.data.dip})
            };
        }

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getIPSDashboardMon',
            _params,

            function(response){
                var record_detail1 = [];
                var record_detail2 = [];
                var record_detail3 = [];

                for(var i in response._topn.topn_src){
                    var detail1 = [];
                    for(var l in response._topn.topn_src[i].details){
                        detail1.push(response._topn.topn_src[i].details[l]);
                    }

                    record_detail1.push({
                        'id' : i,
                        'ip' : response._topn.topn_src[i].ip,
                        'protocol' : response._topn.topn_src[i].protocol,
                        'detect' : response._topn.topn_src[i].detect,
                        'block' : response._topn.topn_src[i].block,
                        'percent' : response._topn.topn_src[i].perc,
                        'details' : detail1

                    });
                }

                for(var j in response._topn.topn_dest){
                    var detail2 = [];
                    for(var m in response._topn.topn_dest[j].details){
                        detail2.push(response._topn.topn_dest[j].details[m]);
                    }
                    record_detail2.push({
                        'id' : j,
                        'ip' : response._topn.topn_dest[j].ip,
                        'protocol' : response._topn.topn_dest[j].protocol,
                        'detect' : response._topn.topn_dest[j].detect,
                        'block' : response._topn.topn_dest[j].block,
                        'percent' : response._topn.topn_dest[j].perc,
                        'details' : detail2
                    });
                }

                for(var k in response._topn.topn_priority){
                    var detail3 = [];
                    for(var n in response._topn.topn_priority[k].details){
                        detail3.push(response._topn.topn_priority[k].details[n]);
                    }
                    record_detail3.push({
                        'id' : k,
                        'priority' : response._topn.topn_priority[k].priority,
                        'percent' : response._topn.topn_priority[k].perc,
                        'details' : detail3
                    });
                }

                Ext.getCmp('monitor_ips_uid_detail_grid1').getStore().loadData(record_detail1);
                Ext.getCmp('monitor_ips_uid_detail_grid2').getStore().loadData(record_detail2);
                Ext.getCmp('monitor_ips_uid_detail_grid3').getStore().loadData(record_detail3);
            }
        );
    },

    onIps_uid_detail_formBeforeDestroy: function(component, eOpts) {
        Ext.data.StoreManager.lookup('store_monitor_ips_uid_detail_list1').removeAll();
        Ext.data.StoreManager.lookup('store_monitor_ips_uid_detail_list2').removeAll();
        Ext.data.StoreManager.lookup('store_monitor_ips_uid_detail_list3').removeAll();
    },

    onImageRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {
            var me = Ext.getCmp('win_monitor_ips_uid_details');

            if(me.mode === "monitor"){
                Ext.getCmp('monitor_ips_uid_grid').setHeight(document.body.clientHeight-188);
                me.me.close();
            }
            else{
                Ext.getCmp('con_top').remove(Ext.getCmp('con_top').items.items[Ext.getCmp('con_top').items.items.length-1]);
                Ext.getCmp('con_top_grid').show();
            }
        }, component);
    }

});