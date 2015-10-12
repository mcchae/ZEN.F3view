
Ext.define('NFW2.view.win_alarm_setting', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_alarm_setting',

    requires: [
        'NFW2.view.win_alarm_settingViewModel',
        'Ext.form.Panel',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.form.field.ComboBox',
        'Ext.view.Table',
        'Ext.grid.plugin.CellEditing',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_alarm_setting'
    },
    cls: 'zen_win',
    height: 465,
    scrollable: true,
    width: 600,
    modal: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            bodyPadding: 20,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'grid_alarm_set',
                            maxHeight: 330,
                            columnLines: true,
                            store: 'store_daships_alarm_set',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if(value===0){ return "IDS_MODE"; }

                                        return value;
                                    },
                                    width: 80,
                                    dataIndex: '@uid',
                                    bind: {
                                        text: '{rule_id}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.tdCls = 'cell_combo';

                                        var val = (value)?Number(value):1;
                                        return (val===1)?"Critical":(val===2)?"High":(val===3)?"Normal":"Low";
                                    },
                                    minWidth: 130,
                                    dataIndex: 'priority',
                                    flex: 1,
                                    bind: {
                                        text: '{hazard}'
                                    },
                                    editor: {
                                        xtype: 'combobox',
                                        baseCls: 'cell_combo',
                                        value: 1,
                                        editable: false,
                                        displayField: 'name',
                                        queryMode: 'local',
                                        valueField: 'val',
                                        listeners: {
                                            beforerender: 'onComboboxBeforeRender',
                                            focus: 'onComboboxFocus'
                                        }
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.tdCls = 'cell_text';

                                        return (ValidNum(Number(value)))?commify(Number(value)):value;
                                    },
                                    dataIndex: 'detect_count',
                                    flex: 1,
                                    bind: {
                                        text: '{detect_count}'
                                    },
                                    editor: {
                                        xtype: 'textfield',
                                        baseCls: 'cell_text',
                                        maskRe: /[0-9]/
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.tdCls = 'cell_text';

                                        return (ValidNum(Number(value)))?commify(Number(value)):value;
                                    },
                                    dataIndex: 'block_count',
                                    flex: 1,
                                    bind: {
                                        text: '{block_count}'
                                    },
                                    editor: {
                                        xtype: 'textfield',
                                        baseCls: 'cell_text',
                                        maskRe: /[0-9]/
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.tdCls = 'cell_text';

                                        return (ValidNum(Number(value)))?byteConvert(Number(value)):value;
                                    },
                                    dataIndex: 'detect_bytes',
                                    flex: 1,
                                    bind: {
                                        text: '{detect_byte}'
                                    },
                                    editor: {
                                        xtype: 'textfield',
                                        baseCls: 'cell_text',
                                        maskRe: /[0-9]/
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.tdCls = 'cell_text';

                                        return (ValidNum(Number(value)))?byteConvert(Number(value)):value;
                                    },
                                    dataIndex: 'block_bytes',
                                    flex: 1,
                                    bind: {
                                        text: '{block_bytes}'
                                    },
                                    editor: {
                                        xtype: 'textfield',
                                        baseCls: 'cell_text',
                                        maskRe: /[0-9]/
                                    }
                                }
                            ],
                            viewConfig: {
                                markDirty: false
                            },
                            plugins: [
                                {
                                    ptype: 'cellediting',
                                    pluginId: 'split_alarm',
                                    clicksToEdit: 1
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender',
        close: 'onWindowClose'
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
                    itemId: 'fld_alarm',
                    margin: '10 0 0 0'
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{reset}'
                    },
                    listeners: {
                        click: 'onButtonClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{apply}'
                    },
                    listeners: {
                        click: 'onButtonClick1'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick2'
                    }
                }
            ]
        }
    ],

    onComboboxBeforeRender: function(component, eOpts) {
        var record = Ext.create('Ext.data.Store',{
            data: [{'name':'Critical','val':1},
                   {'name':'High','val':2},
                   {'name':'Normal','val':3},
                   {'name':'Low','val':4}],
            fields: ['name','val']
        });

        component.bindStore(record);
    },

    onComboboxFocus: function(component, event, eOpts) {
        component.expand();
    },

    onWindowAfterRender: function(component, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_daships_alarm_set");
        _store.getProxy().setExtraParam('mode',Ext.encode('alarm'));
        _store.load();

        //var record = [{'@uid':3,'priority':'1','detect_count':3,'block_count':2,'block_bytes':4,'detect_bytes':7}];

        //_store.loadData(record);

        this.setTitle(__zen('alarm_setting'));
    },

    onWindowClose: function(panel, eOpts) {
        Ext.getCmp("grid_alarm_set").removeAll();
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;
        var _store_policy = Ext.data.StoreManager.lookup("store_daships_alarm_set");

        var obj = [];

        for(var i=0; i<_store_policy.data.items.length; i++){
            var data = _store_policy.data.items[i].data;
            var priority = Ext.getCmp("com_priority_"+i);

            obj.push({
                '@uid':Number(data['@uid']),
                'priority': 1,
                'detect_count': 0,
                'block_count': 0,
                'detect_bytes': 0,
                'block_bytes': 0
            });
        }

        var update = { 'update_all': obj };

        var _params = {
            'mode': Ext.encode('alarm'),
            'obj': Ext.encode(update)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setIPSDashboardConf',
            _params,
            function(response){

                me.close();
            }
        );
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;
        var _store_policy = Ext.data.StoreManager.lookup("store_daships_alarm_set");

        var obj = [];

        for(var i=0; i<_store_policy.data.items.length; i++){
            var data = _store_policy.data.items[i].data;

            if(!ValidNum(data.detect_count)){ prt_errMsg(get_msg('err_form'),'fld_alarm');
                                            Ext.getCmp('grid_alarm_set').getPlugin('split_alarm').startEdit(i,2); return false; }
            if(!ValidNum(data.block_count)){ prt_errMsg(get_msg('err_form'),'fld_alarm');
                                            Ext.getCmp('grid_alarm_set').getPlugin('split_alarm').startEdit(i,3); return false; }
            if(!ValidNum(data.detect_bytes)){ prt_errMsg(get_msg('err_form'),'fld_alarm');
                                            Ext.getCmp('grid_alarm_set').getPlugin('split_alarm').startEdit(i,4); return false; }
            if(!ValidNum(data.block_bytes)){ prt_errMsg(get_msg('err_form'),'fld_alarm');
                                            Ext.getCmp('grid_alarm_set').getPlugin('split_alarm').startEdit(i,5); return false; }

        }

        for(var i=0; i<_store_policy.data.items.length; i++){
            var data = _store_policy.data.items[i].data;

            obj.push({
                '@uid':Number(data['@uid']),
                'priority': Number(data.priority),
                'detect_count': Number(data.detect_count),
                'block_count': Number(data.block_count),
                'detect_bytes': Number(data.detect_bytes),
                'block_bytes': Number(data.block_bytes)
            });
        }

        var update = { 'update_all': obj };
        console.log(update);

        var _params = {
            'mode': Ext.encode('alarm'),
            'obj': Ext.encode(update)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setIPSDashboardConf',
            _params,
            function(response){

                me.close();
            }
        );
    },

    onButtonClick2: function(button, e, eOpts) {
        this.close();
    }

});