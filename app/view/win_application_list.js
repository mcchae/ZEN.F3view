
Ext.define('NFW2.view.win_application_list', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_application_list',

    requires: [
        'NFW2.view.win_application_listViewModel',
        'Ext.form.Panel',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table'
    ],

    viewModel: {
        type: 'win_application_list'
    },
    cls: 'zen_win',
    height: 250,
    scrollable: true,
    width: 550,
    title: '어플리케이션 리스트',
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            flex: 1,
            scrollable: true,
            layout: 'auto',
            bodyPadding: 10,
            title: '',
            items: [
                {
                    xtype: 'container',
                    minWidth: 500,
                    layout: 'anchor',
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'grid_application_list',
                            title: '',
                            columnLines: true,
                            hideHeaders: true,
                            store: 'store_profile_application_info_list',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    width: 100,
                                    dataIndex: 'rid',
                                    text: 'rid'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'name',
                                    text: 'name',
                                    flex: 1
                                }
                            ],
                            listeners: {
                                cellclick: 'onGrid_application_listCellClick'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender'
    },

    onGrid_application_listCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0){

            var win = Ext.create('NFW2.view.win_application_more',{
                num: record.data.rid,
                name: record.data.name
            });

            win.show();
        }
    },

    onWindowAfterRender: function(component, eOpts) {
        this.setTitle("어플리케이션 리스트 - "+this.num);

        var app = this.applications;

        var record = [];

        for(var i=0; i<app.length; i++){

            record.push({
                rid: i+1,
                name: app[i].name
            });
        }

        Ext.data.StoreManager.lookup("store_profile_application_info_list").loadData(record);
    }

});