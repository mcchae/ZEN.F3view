
Ext.define('NFW2.view.win_firewall_order', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_firewall_order',

    requires: [
        'NFW2.view.win_firewall_orderViewModel',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging',
        'Ext.form.Label'
    ],

    viewModel: {
        type: 'win_firewall_order'
    },
    cls: 'zen_win',
    height: 500,
    id: 'win_order',
    scrollable: true,
    width: 800,
    modal: true,
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onWindowAfterRender'
    },
    items: [
        {
            xtype: 'tabpanel',
            cls: 'zen_tab',
            id: 'order_tab',
            activeTab: 0,
            items: [
                {
                    xtype: 'panel',
                    id: 'tab_set',
                    bodyPadding: 20,
                    bind: {
                        title: '{select_secure_policy}'
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 's_chk',
                                    width: 100,
                                    value: 'all',
                                    editable: false,
                                    displayField: 'name',
                                    valueField: 'val'
                                },
                                {
                                    xtype: 'combobox',
                                    id: 's_type',
                                    width: 120,
                                    labelSeparator: ' ',
                                    labelWidth: 40,
                                    value: 'all',
                                    editable: false,
                                    displayField: 'name',
                                    valueField: 'val',
                                    bind: {
                                        fieldLabel: '{type4}'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'btn_b',
                                    margin: '0 0 0 10',
                                    iconCls: 'icb_ser',
                                    listeners: {
                                        click: 'onButtonClick2'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'btn_b',
                                    hidden: true,
                                    id: 'btn_reset',
                                    margin: '0 0 0 5',
                                    iconCls: 'icb_reset',
                                    listeners: {
                                        click: 'onButtonClick3'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 300,
                            margin: '10 0 0 0',
                            scrollable: true,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_order',
                                    maxHeight: 300,
                                    scrollable: true,
                                    allowDeselect: true,
                                    bufferedRenderer: false,
                                    columnLines: true,
                                    store: 'store_daships_policy_set',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(value===0){ return "IDS_MODE"; }

                                                return value;
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: 's_uid',
                                                    width: 88,
                                                    fieldLabel: '',
                                                    maskRe: /[0-9]/,
                                                    margin: '0 0 0 -9'
                                                }
                                            ],
                                            width: 80,
                                            dataIndex: '@uid',
                                            bind: {
                                                text: '{rule_id}'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(record.data['@uid']===0){ return ''; }

                                                return value;
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    flex: 1,
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: 's_sip',
                                                            flex: 1,
                                                            fieldLabel: '',
                                                            margin: '0 0 0 -9'
                                                        }
                                                    ]
                                                }
                                            ],
                                            dataIndex: 'src',
                                            flex: 2,
                                            bind: {
                                                text: '{src}'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(record.data['@uid']===0){ return ''; }

                                                return value;
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    flex: 1,
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: 's_dip',
                                                            flex: 1,
                                                            fieldLabel: '',
                                                            margin: '0 0 0 -9'
                                                        }
                                                    ]
                                                }
                                            ],
                                            dataIndex: 'dest',
                                            flex: 2,
                                            bind: {
                                                text: '{dest}'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(record.data['@uid']===0){ return ''; }

                                                return value;
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    flex: 1,
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: 's_service',
                                                            flex: 1,
                                                            fieldLabel: '',
                                                            margin: '0 0 0 -9'
                                                        }
                                                    ]
                                                }
                                            ],
                                            dataIndex: 'service',
                                            flex: 2,
                                            bind: {
                                                text: '{service}'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(record.data['@uid']===0){ return ''; }
                                                return value['#text'];
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    flex: 1,
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 's_profile',
                                                            flex: 1,
                                                            multiSelect: true,
                                                            fieldLabel: '',
                                                            editable: false,
                                                            displayField: 'name',
                                                            valueField: 'val',
                                                            value: 'all',
                                                            margin: '0 0 0 -9',
                                                            listeners: {
                                                                change: function(field, newValue, oldValue){
                                                                                    var _all = newValue.indexOf('all');
                                                                                    var _prev = oldValue.indexOf('all');
                                                            
                                                                                    if((_prev === -1 && _all !== -1) || newValue.length === 0){
                                                                                        field.setValue(['all']);
                                                                                    }else{
                                                                                        var _new = [];
                                                                                        for(var i=0; i<newValue.length; i++){
                                                                                            if(newValue[i] !== 'all'){ _new.push(newValue[i]); }
                                                                                        }
                                                                                        field.setValue(_new);
                                                                                    }
                                                            
                                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            dataIndex: 'ips',
                                            flex: 2,
                                            bind: {
                                                text: '{profile}'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'desc',
                                            bind: {
                                                text: '{memo}'
                                            }
                                        }
                                    ],
                                    viewConfig: {
                                        loadMask: false
                                    },
                                    listeners: {
                                        cellclick: 'onGridpanelCellClick1'
                                    },
                                    selModel: {
                                        selType: 'checkboxmodel',
                                        mode: 'SIMPLE',
                                        listeners: {
                                            select: 'onCheckboxModelSelect',
                                            deselect: 'onCheckboxModelDeselect',
                                            selectionchange: 'onCheckboxModelSelectionChange'
                                        }
                                    },
                                    dockedItems: [
                                        {
                                            xtype: 'pagingtoolbar',
                                            dock: 'bottom',
                                            width: 360,
                                            displayInfo: true,
                                            store: 'store_daships_policy_set',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    id: 'label_fo',
                                                    listeners: {
                                                        beforerender: 'onLabel_foBeforeRender'
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
                        activate: 'onPanelActivate1'
                    }
                },
                {
                    xtype: 'panel',
                    id: 'tab_num',
                    bodyPadding: 20,
                    bind: {
                        title: '{priority_level}'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'grid_order_sel',
                            margin: '5 0 0 0',
                            maxHeight: 300,
                            scrollable: true,
                            columnLines: true,
                            store: 'store_daships_policy_set',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    width: 80,
                                    dataIndex: '@num',
                                    bind: {
                                        text: '{rank}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return (value===0)?"IDS_MODE":value;
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
                                        if(record.data['@uid']===0){ return ''; }

                                        return value;
                                    },
                                    dataIndex: 'src',
                                    flex: 2,
                                    bind: {
                                        text: '{src}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if(record.data['@uid']===0){ return ''; }

                                        return value;
                                    },
                                    dataIndex: 'dest',
                                    flex: 2,
                                    bind: {
                                        text: '{dest}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if(record.data['@uid']===0){ return ''; }

                                        return value;
                                    },
                                    dataIndex: 'service',
                                    flex: 2,
                                    bind: {
                                        text: '{service}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if(record.data['@uid']===0){ return ''; }
                                        return value['#text'];
                                    },
                                    dataIndex: 'ips',
                                    flex: 2,
                                    bind: {
                                        text: '{profile}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    id: '',
                                    dataIndex: 'desc',
                                    bind: {
                                        text: '{memo}'
                                    }
                                }
                            ],
                            listeners: {
                                cellclick: 'onGrid_order_selCellClick',
                                celldblclick: 'onGrid_order_selCellDblClick'
                            }
                        }
                    ],
                    listeners: {
                        activate: 'onPanelActivate'
                    }
                }
            ]
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
                    flex: 1,
                    cls: 'fld_msg',
                    itemId: 'fld_msg3'
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
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick1'
                    }
                }
            ]
        }
    ],

    onWindowAfterRender: function(component, eOpts) {
        var me = this;

        me.sel_ips = {};
        me.setTitle(__zen('policy_prio_set'));
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;
        var sel_ips = me.sel_ips;

        var _use = Ext.getCmp("s_chk").getValue();
        var _type = Ext.getCmp("s_type").getValue();

        var uid = Ext.getCmp("s_uid").getValue();
        var sip = Ext.getCmp("s_sip").getValue();
        var dip = Ext.getCmp("s_dip").getValue();
        var service = Ext.getCmp("s_service").getValue();
        var profile = Ext.getCmp("s_profile").getValue();
        var _pro = [];
        for(var i=0; i<profile.length; i++){
            _pro.push(profile[i]);
        }
        _profile = '('+_pro.join('|')+')';

        var _search_cond = {
            '@uid':(uid!=="")?Number(uid):'',
            'src':(sip!=="")?{'$elemMatch':{'#text':{'$regex':'.*'+sip+'.*', '$options':'imxs'}}}:'',
            'dest':(dip!=="")?{'$elemMatch':{'#text':{'$regex':'.*'+dip+'.*', '$options':'imxs'}}}:'',
            'service':(service!=="")?{'$elemMatch':{'#text':{'$regex':'.*'+service+'.*', '$options':'imxs'}}}:'',
            'profile.ips.#text': (profile[0]!=="all")?{'$regex':'.*'+_profile+'.*', '$options':'i'}:''
        };

        var _store_policy = Ext.data.StoreManager.lookup("store_daships_policy_set");
        _store_policy.getProxy().setExtraParam('mode',Ext.encode('policy'));
        _store_policy.getProxy().setExtraParam('menu_type',Ext.encode('dashboard'));
        _store_policy.getProxy().setExtraParam('search_check',Ext.encode(_use));
        _store_policy.getProxy().setExtraParam('search_type',Ext.encode(_type));
        _store_policy.getProxy().setExtraParam('search_cond',Ext.encode(_search_cond));
        _store_policy.currentPage = 1;
        _store_policy.load({callback: function(records, options, success){
            if(success){

                var _record = [];
                for(var i=0; i<records.length; i++){
                    if(records[i].data['@use'] === 'on'){
                        sel_ips[records[i].data['@uid']] = records[i];
                        _record.push(records[i]);
                    }
                }

                me.sel_ips = sel_ips;
                var grid_sel = Ext.getCmp("grid_order").getSelectionModel();
                grid_sel.select(_record,true,true);
            }
        }});

        Ext.getCmp("btn_reset").show();
    },

    onButtonClick3: function(button, e, eOpts) {
        var me = this;
        var sel_ips = me.sel_ips;
        Ext.getCmp("s_chk").reset();
        Ext.getCmp("s_type").reset();

        Ext.getCmp("s_uid").reset();
        Ext.getCmp("s_sip").reset();
        Ext.getCmp("s_dip").reset();
        Ext.getCmp("s_service").reset();
        Ext.getCmp("s_profile").reset();
        button.hide();

        var _store_policy = Ext.data.StoreManager.lookup("store_daships_policy_set");
        _store_policy.getProxy().setExtraParam('mode',Ext.encode('policy'));
        _store_policy.getProxy().setExtraParam('menu_type',Ext.encode('dashboard'));
        _store_policy.getProxy().setExtraParam('search_check',Ext.encode('all'));
        _store_policy.getProxy().setExtraParam('search_type',Ext.encode('all'));
        _store_policy.getProxy().setExtraParam('search_cond',Ext.encode({}));
        _store_policy.currentPage = 1;
        _store_policy.load({callback: function(records, options, success){
            if(success){

                var _record = [];
                for(var i=0; i<records.length; i++){
                    if(records[i].data['@use'] === 'on'){
                        sel_ips[records[i].data['@uid']] = records[i];
                        _record.push(records[i]);
                    }
                }

                me.sel_ips = sel_ips;
                var grid_sel = Ext.getCmp("grid_order").getSelectionModel();
                grid_sel.select(_record,true,true);
            }
        }});
    },

    onPanelActivate1: function(component, eOpts) {
        var me = this;
        var sel_ips = me.sel_ips;

        var _store_policy = Ext.data.StoreManager.lookup("store_daships_policy_set");
        _store_policy.getProxy().setExtraParam('mode',Ext.encode('policy'));
        _store_policy.getProxy().setExtraParam('menu_type',Ext.encode('dashboard'));
        _store_policy.getProxy().setExtraParam('search_check',Ext.encode('all'));
        _store_policy.getProxy().setExtraParam('search_type',Ext.encode('all'));
        _store_policy.getProxy().setExtraParam('search_cond',Ext.encode({}));
        _store_policy.currentPage = 1;
        _store_policy.load({callback: function(records, options, success){
            if(success){

                var _record = [];
                for(var i=0; i<records.length; i++){
                    if(records[i].data['@use'] === 'on'){
                        sel_ips[records[i].data['@uid']] = records[i];
                        _record.push(records[i]);
                    }
                }

                me.sel_ips = sel_ips;
                var grid_sel = Ext.getCmp("grid_order").getSelectionModel();
                grid_sel.select(_record,true,true);

                if(_record.length > 0)
                    Ext.getCmp("label_fo").setText(msg_dashboard(0,_record.length)+'('+__zen('dashboard_msg1')+')');
            }
        }});

        //var re = [{"src":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"port","#text":"인터넷"},{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"},{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"},{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"},{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"},{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"@uid":130,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"},{"@cid":"0a374741-50ed-451a-8612-ab9ce8d57da3","@otype":"port","#text":"ICMP"}],"dest":[{"@cid":"829fc74a-2789-46fb-b7b8-448ee82f194b","@otype":"v4_group","#text":"지점"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"eb5e6193-0de8-4f3b-8de2-997a97f18cce","#text":"branch_device"},"@num":1,"desc":""},{"src":[{"@cid":"76b03b93-b35a-4e75-89c1-b2ec3b5530fc","@otype":"v4","#text":"CTO PC"}],"@uid":2,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":2,"desc":""},{"src":[{"@cid":"d1aa3b09-98f7-4629-a093-ee44a90d87ab","@otype":"v4","#text":"CTO VM"}],"@uid":3,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":3,"desc":""},{"src":[{"@cid":"bafb9efe-fb1b-4930-b2f2-5db1637e148c","@otype":"v4","#text":"CTO 노트북"}],"@uid":4,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":4,"desc":""},{"src":[{"@cid":"16d16f63-53c4-4f82-ac92-c0fc4df266f8","@otype":"v4","#text":"제2연구소 PC"}],"@uid":5,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":5,"desc":""},{"src":[{"@cid":"9c434f1f-30e3-4a89-8b1c-06909298ac2f","@otype":"v4","#text":"제2연구소 VM"}],"@uid":6,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":6,"desc":""},{"src":[{"@cid":"5381f7e1-beaa-4b50-b4df-0fd61e222368","@otype":"v4","#text":"제2연구소 노트북"}],"@uid":7,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":7,"desc":""},{"src":[{"@cid":"8a80e425-d6eb-4d5b-bd2a-a56d50d88620","@otype":"v4","#text":"제3연구소 PC"}],"@uid":11,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":8,"desc":""},{"src":[{"@cid":"e55eef89-6577-4a9a-9951-2428130f9fd2","@otype":"v4","#text":"제3연구소 VM"}],"@uid":12,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":9,"desc":""},{"src":[{"@cid":"9b27444c-1b5a-43aa-85c3-9fadfb2f8fd0","@otype":"v4","#text":"제3연구소 노트북"}],"@uid":13,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":10,"desc":""},{"src":[{"@cid":"b1e0eec7-48a0-4202-a6ec-a68dd80735ac","@otype":"v4","#text":"VPN PC"}],"@uid":14,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":11,"desc":""},{"src":[{"@cid":"272e1dbe-b998-4514-b89a-59f13502d307","@otype":"v4","#text":"VPN VM"}],"@uid":15,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":12,"desc":""},{"src":[{"@cid":"89225e8d-2a0c-495e-9337-4447d11e3bc7","@otype":"v4","#text":"VPN 노트북"}],"@uid":16,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":13,"desc":""},{"src":[{"@cid":"c85f4547-ee01-4c97-8a26-a76296097047","@otype":"v4","#text":"EMS PC"}],"@uid":17,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":14,"desc":""},{"src":[{"@cid":"d8bfb59f-ea03-48e5-a471-05f760c660b8","@otype":"v4","#text":"EMS VM"}],"@uid":18,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":15,"desc":""},{"src":[{"@cid":"d806b130-61ee-486b-95e2-1b554078a26c","@otype":"v4","#text":"EMS 노트북"}],"@uid":19,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":16,"desc":""},{"src":[{"@cid":"e22223ef-5ea3-45c5-a8ed-f8e4cd0747c1","@otype":"v4","#text":"WEB PC"}],"@uid":20,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":17,"desc":""},{"src":[{"@cid":"7f566c9c-9028-46a0-a63b-67cd10b3adab","@otype":"v4","#text":"WEB VM"}],"@uid":21,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":18,"desc":""},{"src":[{"@cid":"35733417-aadd-4ded-8564-2262d9785af4","@otype":"v4","#text":"WEB 노트북"}],"@uid":22,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":19,"desc":""},{"src":[{"@cid":"d41c8428-b82e-41ad-b710-ad2f91262cc3","@otype":"v4","#text":"제품기획 PC"}],"@uid":23,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"f126f1e3-7ad3-43c8-a0d4-5fd811a0735b","#text":"important_pc"},"@num":20,"desc":""},{"src":[{"@cid":"75898f0d-9c65-4c5c-9fe6-4549cb01eed3","@otype":"v4","#text":"제품기획 VM"}],"@uid":24,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"f126f1e3-7ad3-43c8-a0d4-5fd811a0735b","#text":"important_pc"},"@num":21,"desc":""},{"src":[{"@cid":"861b672d-9c71-49d7-96f6-e00a111460db","@otype":"v4","#text":"제품기획 노트북"}],"@uid":25,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"f126f1e3-7ad3-43c8-a0d4-5fd811a0735b","#text":"important_pc"},"@num":22,"desc":""},{"src":[{"@cid":"253a3caa-9ad3-435b-b48b-25b813587bfa","@otype":"v4","#text":"IPS PC"}],"@uid":35,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":23,"desc":""},{"src":[{"@cid":"b4fa522d-2ad9-4126-96f3-2a1ff6dd3f94","@otype":"v4","#text":"IPS VM"}],"@uid":36,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":24,"desc":""},{"src":[{"@cid":"9715bc85-9e16-4254-b183-e4c1460bf605","@otype":"v4","#text":"IPS 노트북"}],"@uid":37,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":25,"desc":""},{"src":[{"@cid":"9f901c5e-8046-47a1-b7c3-6c8d4b0d1a33","@otype":"v4","#text":"분석 PC"}],"@uid":38,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":26,"desc":""},{"src":[{"@cid":"3d922ffd-26da-494e-a274-a2da6cbb314d","@otype":"v4","#text":"분석 VM"}],"@uid":39,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":27,"desc":""},{"src":[{"@cid":"70e3cfad-62f5-4557-bdb0-496b846a61dd","@otype":"v4","#text":"분석 노트북"}],"@uid":40,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":28,"desc":""},{"src":[{"@cid":"6e5d102c-baa6-4e47-b38c-bc0770a708e2","@otype":"v4","#text":"인증지원 PC"}],"@uid":41,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"f126f1e3-7ad3-43c8-a0d4-5fd811a0735b","#text":"important_pc"},"@num":29,"desc":""},{"src":[{"@cid":"b074e825-0b48-46bc-8e9d-e20630c85904","@otype":"v4","#text":"인증지원 VM"}],"@uid":42,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"f126f1e3-7ad3-43c8-a0d4-5fd811a0735b","#text":"important_pc"},"@num":30,"desc":""},{"src":[{"@cid":"e358de7d-69d7-4ed4-8cf1-5649ab523190","@otype":"v4","#text":"인증지원 노트북"}],"@uid":43,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"f126f1e3-7ad3-43c8-a0d4-5fd811a0735b","#text":"important_pc"},"@num":31,"desc":""},{"src":[{"@cid":"5db301ea-4bf5-4df1-addd-d33c95b30c02","@otype":"v4","#text":"FW1 PC"},{"@cid":"685f54b3-050b-4324-8df0-91577dc37904","@otype":"v4","#text":"FW2 PC"}],"@uid":44,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":32,"desc":""},{"src":[{"@cid":"a2bb8975-7b86-458b-a506-fae872d490ea","@otype":"v4","#text":"FW1 VM"},{"@cid":"dfdc7101-fd6f-4e4f-b8c2-80ddeb575923","@otype":"v4","#text":"FW2 VM"}],"@uid":45,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":33,"desc":""},{"src":[{"@cid":"822d5138-335d-474c-8af6-d10779a69704","@otype":"v4","#text":"FW1 노트북"},{"@cid":"c57f2ec2-56cc-4fb9-8f41-50eb0ecb4011","@otype":"v4","#text":"FW2 노트북"}],"@uid":46,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":34,"desc":""},{"src":[{"@cid":"2ff2d292-39ec-4e9a-a069-bdc65890a31d","@otype":"v4","#text":"HW PC"}],"@uid":47,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":35,"desc":""},{"src":[{"@cid":"5cd85be0-6765-4bb3-9b32-0b478a441746","@otype":"v4","#text":"HW VM"}],"@uid":48,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":36,"desc":""},{"src":[{"@cid":"f2d46e1f-29ed-4270-9534-4e25aa90688d","@otype":"v4","#text":"HW 노트북"}],"@uid":49,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":37,"desc":""},{"src":[{"@cid":"ed51b5a1-580e-46cc-87a8-b5f3919bc85f","@otype":"v4","#text":"WS PC"}],"@uid":50,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":38,"desc":""},{"src":[{"@cid":"f6d13753-57bc-4395-83a1-bde8237a910c","@otype":"v4","#text":"WS VM"}],"@uid":51,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":39,"desc":""},{"src":[{"@cid":"836a1968-4812-458f-8a69-5eec86746d0e","@otype":"v4","#text":"WS 노트북"}],"@uid":52,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":40,"desc":""},{"src":[{"@cid":"5fee8847-89fc-41b5-9c79-5ea67fc6ba98","@otype":"v4","#text":"시스템 PC"}],"@uid":53,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":41,"desc":""},{"src":[{"@cid":"33183813-b38e-4448-98ba-a37f796f9358","@otype":"v4","#text":"시스템 VM"}],"@uid":54,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":42,"desc":""},{"src":[{"@cid":"16d6b632-57ba-4477-baac-9e877855e8b2","@otype":"v4","#text":"시스템 노트북"}],"@uid":55,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":43,"desc":""},{"src":[{"@cid":"48779845-a7b5-482b-8e9e-114f254f2689","@otype":"v4","#text":"APP PC"}],"@uid":136,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":44,"desc":""},{"src":[{"@cid":"e5bc9a7c-f3f6-4d21-af06-71deceeec378","@otype":"v4","#text":"APP VM"}],"@uid":137,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":45,"desc":""},{"src":[{"@cid":"08f3ec7e-d4b8-4836-8963-fe7217a3b51c","@otype":"v4","#text":"APP 노트북"}],"@uid":135,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":46,"desc":""},{"src":[{"@cid":"a0cebff3-7669-49d0-b210-5304ec568691","@otype":"v4","#text":"DHCP(21)"}],"@uid":56,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":47,"desc":""},{"src":[{"@cid":"7afe82ec-d2ff-4ca7-90f8-f9d8cd3078f5","@otype":"v4","#text":"DHCP(31)"}],"@uid":57,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":48,"desc":""},{"src":[{"@cid":"daf990a2-dcf5-4fb4-8133-cc3b365e9d91","@otype":"v4","#text":"DHCP(41)"}],"@uid":58,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":49,"desc":""},{"src":[{"@cid":"29ddfe96-9f9f-4176-9f37-bc93ae85acd9","@otype":"v4","#text":"DHCP(51)"}],"@uid":59,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":50,"desc":""},{"src":[{"@cid":"daf9c90b-ec3a-4313-a96d-71d0b2a79c56","@otype":"v4","#text":"DHCP(71)"}],"@uid":60,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":51,"desc":""},{"src":[{"@cid":"35a81dd9-4f8a-4f32-89f0-c6c9df5fc939","@otype":"v4_group","#text":"테스트룸 -> 인터넷 허용 객체"}],"@uid":61,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"},{"@cid":"0a374741-50ed-451a-8612-ab9ce8d57da3","@otype":"port","#text":"ICMP"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":52,"desc":""},{"src":[{"@cid":"76b03b93-b35a-4e75-89c1-b2ec3b5530fc","@otype":"v4","#text":"CTO PC"}],"@uid":68,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":53,"desc":""},{"src":[{"@cid":"d1aa3b09-98f7-4629-a093-ee44a90d87ab","@otype":"v4","#text":"CTO VM"}],"@uid":69,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":54,"desc":""},{"src":[{"@cid":"bafb9efe-fb1b-4930-b2f2-5db1637e148c","@otype":"v4","#text":"CTO 노트북"}],"@uid":70,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":55,"desc":""},{"src":[{"@cid":"16d16f63-53c4-4f82-ac92-c0fc4df266f8","@otype":"v4","#text":"제2연구소 PC"}],"@uid":71,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":56,"desc":""},{"src":[{"@cid":"9c434f1f-30e3-4a89-8b1c-06909298ac2f","@otype":"v4","#text":"제2연구소 VM"}],"@uid":72,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":57,"desc":""},{"src":[{"@cid":"5381f7e1-beaa-4b50-b4df-0fd61e222368","@otype":"v4","#text":"제2연구소 노트북"}],"@uid":73,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":58,"desc":""},{"src":[{"@cid":"8a80e425-d6eb-4d5b-bd2a-a56d50d88620","@otype":"v4","#text":"제3연구소 PC"}],"@uid":77,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":59,"desc":""},{"src":[{"@cid":"e55eef89-6577-4a9a-9951-2428130f9fd2","@otype":"v4","#text":"제3연구소 VM"}],"@uid":78,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":60,"desc":""},{"src":[{"@cid":"9b27444c-1b5a-43aa-85c3-9fadfb2f8fd0","@otype":"v4","#text":"제3연구소 노트북"}],"@uid":79,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":61,"desc":""},{"src":[{"@cid":"b1e0eec7-48a0-4202-a6ec-a68dd80735ac","@otype":"v4","#text":"VPN PC"}],"@uid":80,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":62,"desc":""},{"src":[{"@cid":"272e1dbe-b998-4514-b89a-59f13502d307","@otype":"v4","#text":"VPN VM"}],"@uid":81,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":63,"desc":""},{"src":[{"@cid":"89225e8d-2a0c-495e-9337-4447d11e3bc7","@otype":"v4","#text":"VPN 노트북"}],"@uid":82,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":64,"desc":""},{"src":[{"@cid":"c85f4547-ee01-4c97-8a26-a76296097047","@otype":"v4","#text":"EMS PC"}],"@uid":83,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":65,"desc":""},{"src":[{"@cid":"d8bfb59f-ea03-48e5-a471-05f760c660b8","@otype":"v4","#text":"EMS VM"}],"@uid":84,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":66,"desc":""},{"src":[{"@cid":"d806b130-61ee-486b-95e2-1b554078a26c","@otype":"v4","#text":"EMS 노트북"}],"@uid":85,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":67,"desc":""},{"src":[{"@cid":"e22223ef-5ea3-45c5-a8ed-f8e4cd0747c1","@otype":"v4","#text":"WEB PC"}],"@uid":86,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":68,"desc":""},{"src":[{"@cid":"7f566c9c-9028-46a0-a63b-67cd10b3adab","@otype":"v4","#text":"WEB VM"}],"@uid":87,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":69,"desc":""},{"src":[{"@cid":"35733417-aadd-4ded-8564-2262d9785af4","@otype":"v4","#text":"WEB 노트북"}],"@uid":88,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":70,"desc":""},{"src":[{"@cid":"253a3caa-9ad3-435b-b48b-25b813587bfa","@otype":"v4","#text":"IPS PC"}],"@uid":101,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":71,"desc":""},{"src":[{"@cid":"b4fa522d-2ad9-4126-96f3-2a1ff6dd3f94","@otype":"v4","#text":"IPS VM"}],"@uid":102,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":72,"desc":""},{"src":[{"@cid":"9715bc85-9e16-4254-b183-e4c1460bf605","@otype":"v4","#text":"IPS 노트북"}],"@uid":103,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":73,"desc":""},{"src":[{"@cid":"9f901c5e-8046-47a1-b7c3-6c8d4b0d1a33","@otype":"v4","#text":"분석 PC"}],"@uid":104,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":74,"desc":""},{"src":[{"@cid":"3d922ffd-26da-494e-a274-a2da6cbb314d","@otype":"v4","#text":"분석 VM"}],"@uid":105,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":75,"desc":""},{"src":[{"@cid":"70e3cfad-62f5-4557-bdb0-496b846a61dd","@otype":"v4","#text":"분석 노트북"}],"@uid":106,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":76,"desc":""},{"src":[{"@cid":"6e5d102c-baa6-4e47-b38c-bc0770a708e2","@otype":"v4","#text":"인증지원 PC"}],"@uid":107,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"f126f1e3-7ad3-43c8-a0d4-5fd811a0735b","#text":"important_pc"},"@num":77,"desc":""},{"src":[{"@cid":"b074e825-0b48-46bc-8e9d-e20630c85904","@otype":"v4","#text":"인증지원 VM"}],"@uid":108,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"f126f1e3-7ad3-43c8-a0d4-5fd811a0735b","#text":"important_pc"},"@num":78,"desc":""},{"src":[{"@cid":"e358de7d-69d7-4ed4-8cf1-5649ab523190","@otype":"v4","#text":"인증지원 노트북"}],"@uid":109,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"f126f1e3-7ad3-43c8-a0d4-5fd811a0735b","#text":"important_pc"},"@num":79,"desc":""},{"src":[{"@cid":"5db301ea-4bf5-4df1-addd-d33c95b30c02","@otype":"v4","#text":"FW1 PC"},{"@cid":"685f54b3-050b-4324-8df0-91577dc37904","@otype":"v4","#text":"FW2 PC"}],"@uid":110,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":80,"desc":""},{"src":[{"@cid":"a2bb8975-7b86-458b-a506-fae872d490ea","@otype":"v4","#text":"FW1 VM"},{"@cid":"dfdc7101-fd6f-4e4f-b8c2-80ddeb575923","@otype":"v4","#text":"FW2 VM"}],"@uid":111,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":81,"desc":""},{"src":[{"@cid":"822d5138-335d-474c-8af6-d10779a69704","@otype":"v4","#text":"FW1 노트북"},{"@cid":"c57f2ec2-56cc-4fb9-8f41-50eb0ecb4011","@otype":"v4","#text":"FW2 노트북"}],"@uid":112,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":82,"desc":""},{"src":[{"@cid":"2ff2d292-39ec-4e9a-a069-bdc65890a31d","@otype":"v4","#text":"HW PC"}],"@uid":113,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":83,"desc":""},{"src":[{"@cid":"5cd85be0-6765-4bb3-9b32-0b478a441746","@otype":"v4","#text":"HW VM"}],"@uid":114,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":84,"desc":""},{"src":[{"@cid":"f2d46e1f-29ed-4270-9534-4e25aa90688d","@otype":"v4","#text":"HW 노트북"}],"@uid":115,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":85,"desc":""},{"src":[{"@cid":"ed51b5a1-580e-46cc-87a8-b5f3919bc85f","@otype":"v4","#text":"WS PC"}],"@uid":116,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":86,"desc":""},{"src":[{"@cid":"f6d13753-57bc-4395-83a1-bde8237a910c","@otype":"v4","#text":"WS VM"}],"@uid":117,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":87,"desc":""},{"src":[{"@cid":"836a1968-4812-458f-8a69-5eec86746d0e","@otype":"v4","#text":"WS 노트북"}],"@uid":118,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":88,"desc":""},{"src":[{"@cid":"5fee8847-89fc-41b5-9c79-5ea67fc6ba98","@otype":"v4","#text":"시스템 PC"}],"@uid":119,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":89,"desc":""},{"src":[{"@cid":"33183813-b38e-4448-98ba-a37f796f9358","@otype":"v4","#text":"시스템 VM"}],"@uid":120,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":90,"desc":""},{"src":[{"@cid":"16d6b632-57ba-4477-baac-9e877855e8b2","@otype":"v4","#text":"시스템 노트북"}],"@uid":121,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":91,"desc":""},{"src":[{"@cid":"48779845-a7b5-482b-8e9e-114f254f2689","@otype":"v4","#text":"APP PC"}],"@uid":139,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":92,"desc":""},{"src":[{"@cid":"e5bc9a7c-f3f6-4d21-af06-71deceeec378","@otype":"v4","#text":"APP VM"}],"@uid":140,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":93,"desc":""},{"src":[{"@cid":"08f3ec7e-d4b8-4836-8963-fe7217a3b51c","@otype":"v4","#text":"APP 노트북"}],"@uid":138,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":94,"desc":""},{"src":[{"@cid":"a0cebff3-7669-49d0-b210-5304ec568691","@otype":"v4","#text":"DHCP(21)"}],"@uid":122,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":95,"desc":""},{"src":[{"@cid":"7afe82ec-d2ff-4ca7-90f8-f9d8cd3078f5","@otype":"v4","#text":"DHCP(31)"}],"@uid":123,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":96,"desc":""},{"src":[{"@cid":"daf990a2-dcf5-4fb4-8133-cc3b365e9d91","@otype":"v4","#text":"DHCP(41)"}],"@uid":124,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":97,"desc":""},{"src":[{"@cid":"29ddfe96-9f9f-4176-9f37-bc93ae85acd9","@otype":"v4","#text":"DHCP(51)"}],"@uid":125,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":98,"desc":""},{"src":[{"@cid":"daf9c90b-ec3a-4313-a96d-71d0b2a79c56","@otype":"v4","#text":"DHCP(71)"}],"@uid":126,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":99,"desc":""}];

        //_store_policy.loadData(re);

        var record = Ext.create('Ext.data.Store',{
            data: [{'name':__zen('all'),'val':'all'},{'name':'IPv4','val':'ipv4'},{'name':'IPv6','val':'ipv6'}],
            fields: ['name','val']
        });

        Ext.getCmp("s_type").bindStore(record);

        var record = Ext.create('Ext.data.Store',{
            data: [{'name':__zen('all'),'val':'all'},{'name':__zen('use'),'val':'on'},{'name':__zen('unuse'),'val':'off'}],
            fields: ['name','val']
        });

        Ext.getCmp("s_chk").bindStore(record);

        var _params = {
            basename: Ext.encode('ips_profile'),
            start: Ext.encode(0),
            limit: Ext.encode(null)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getIPSProfile',
            _params,
            function(response){

                var pro_list = [{'name':__zen('all'),'val':'all'}];
                for(var i=0; i<response.list.length; i++){
                    if(response.list[i].uid_list.length !== 0){
                        pro_list.push({
                            'name':response.list[i].name,
                            'val':response.list[i].name
                        });
                    }
                }

                var record = Ext.create('Ext.data.Store',{
                    data: pro_list,
                    fields: ['name','val']
                });

                Ext.getCmp("s_profile").bindStore(record);
            }
        );
    },

    onGridpanelCellClick1: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = Ext.getCmp("win_order");
        var grid = Ext.getCmp("grid_order");
        var store = grid.getStore();
        var sel_ips = me.sel_ips;

        if(cellIndex !== 2 && cellIndex !== 3 && cellIndex !== 4){ return false; }
        var smode = "";
        smode = (cellIndex === 2)?"src":(cellIndex===3)?"dest":"service";

        if(record.data[smode]==='<ul class="disp_obj"><li class="Any">Any</li></ul>'){return false;}

        var tmptd = Ext.get(td).query("ul")[0];


        if(Ext.get(tmptd).query(".inlist_s").length > 0){

            var disp = '<ul class="disp_obj">';
            var len = Ext.get(tmptd).query(".inG").length;
            var tmp_len = (len > 5)?5:len;

            for(var k=0; k<tmp_len; k++){
                disp += Ext.get(tmptd).query(".inG")[k].outerHTML;
            }

            if(len > 5){ disp += '<li class="more"></li>';}

            var _sel = '';
            var grid_chk = grid.getSelectionModel().getSelection();
            var grid_sel = Ext.getCmp("grid_order").getSelectionModel();
            for(var i=0; i<grid_chk.length; i++){
                if(grid_chk[i].data['@uid'] === record.data['@uid']){
                    _sel = 'on';
                }
            }

            store.data.items[rowIndex].data[smode] = disp + '</ul>';
            var tmpx = store.data.items[rowIndex];

            store.removeAt(rowIndex);
            store.insert(rowIndex,tmpx);

            if(_sel === 'on'){
                grid_sel.select(record,true,true);

                eval('sel_ips['+record.data['@uid']+'] = record.data;');
                me.sel_ips = sel_ips;
            }
            me.onCheckboxModelSelectionChange();
            return false;

        }

        var _params = {
            basename : Ext.encode(record.data.basename),
            key_info : Ext.encode({'@uid':record.data['@uid'], 'item':smode})
        };

        var disp = '<ul class="disp_obj">';

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getPolicyItems',
            _params,
            function(response){

                for(var i in response.list){

                    var otype = response.list[i]["@otype"];

                    disp += '<li class="inG '+otype+'">'+ response.list[i]["#text"] + '</li>';

                    if(otype === "v4"){

                        for(var j in response.list[i].detail){
                            disp += '<li class="inlist_s">'+response.list[i].detail[j]["#text"] + '</li>';
                        }
                    }else if(otype == "v4_group"){

                        for(var j in response.list[i].detail){
                            disp += '<li class="inlist">'+response.list[i].detail[j].name + '</li>';
                            for(var k in response.list[i].detail[j].ip){
                                disp += '<li class="inlist_s">'+response.list[i].detail[j].ip[k]["#text"] + '</li>';
                            }
                        }

                    }

                }

                var _sel = '';
                var grid_chk = grid.getSelectionModel().getSelection();
                var grid_sel = Ext.getCmp("grid_order").getSelectionModel();
                for(var i=0; i<grid_chk.length; i++){
                    if(grid_chk[i].data['@uid'] === record.data['@uid']){
                        _sel = 'on';
                    }
                }

                store.data.items[rowIndex].data[smode] = disp + '</ul>';
                var tmpx = store.data.items[rowIndex];

                store.removeAt(rowIndex);
                store.insert(rowIndex,tmpx);

                if(_sel === 'on'){
                    grid_sel.select(record,true,true);

                    eval('sel_ips['+record.data['@uid']+'] = record.data;');
                    me.sel_ips = sel_ips;
                }
                me.onCheckboxModelSelectionChange();
            }
        );
    },

    onCheckboxModelSelect: function(rowmodel, record, index, eOpts) {
        var me = Ext.getCmp("win_order");
        var sel_ips = me.sel_ips;

        if(rowmodel.selected.length > 60){
            var grid_sel = Ext.getCmp("grid_order").getSelectionModel();
            grid_sel.deselect(record,true,true);
            return false;
        }

        eval('sel_ips['+record.data['@uid']+'] = record.data;');

        me.sel_ips = sel_ips;
    },

    onCheckboxModelDeselect: function(rowmodel, record, index, eOpts) {
        var me = Ext.getCmp("win_order");
        var sel_ips = me.sel_ips;

        eval('delete sel_ips['+record.data['@uid']+'];');

        me.sel_ips = sel_ips;
    },

    onCheckboxModelSelectionChange: function(model, selected, eOpts) {
        var me = Ext.getCmp("win_order");
        var sel_ips = me.sel_ips;

        var _n = 0;
        for(var i in sel_ips){
            _n++;
        }

        if(_n === 0){
            Ext.getCmp("label_fo").setText('('+__zen('dashboard_msg1')+')');
        }else{
            Ext.getCmp("label_fo").setText(msg_dashboard(0,_n)+'('+__zen('dashboard_msg1')+')');
        }
    },

    onLabel_foBeforeRender: function(component, eOpts) {
        component.text = '('+__zen('dashboard_msg1')+')';
    },

    onGrid_order_selCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var grid = Ext.getCmp("grid_order");
        var store = grid.getStore();

        if(cellIndex !== 2 && cellIndex !== 3 && cellIndex !== 4){ return false; }

        var smode = "";
        smode = (cellIndex === 2)?"src":(cellIndex===3)?"dest":"service";

        if(record.data[smode]==='<ul class="disp_obj"><li class="Any">Any</li></ul>'){return false;}

        var tmptd = Ext.get(td).query("ul")[0];

        if(Ext.get(tmptd).query(".inlist_s").length > 0){

            var disp = '<ul class="disp_obj">';
            var len = Ext.get(tmptd).query(".inG").length;
            var tmp_len = (len > 5)?5:len;

            for(var k=0; k<tmp_len; k++){
                disp += Ext.get(tmptd).query(".inG")[k].outerHTML;
            }

            if(len > 5){ disp += '<li class="more"></li>';}

            store.data.items[rowIndex].data[smode] = disp + '</ul>';
            var tmpx = store.data.items[rowIndex];

            store.removeAt(rowIndex);
            store.insert(rowIndex,tmpx);

            return false;

        }

        var _params = {
            basename : Ext.encode(record.data.basename),
            key_info : Ext.encode({'@uid':record.data['@uid'], 'item':smode})
        };

        var disp = '<ul class="disp_obj">';

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getPolicyItems',
            _params,
            function(response){

                for(var i in response.list){

                    var otype = response.list[i]["@otype"];

                    disp += '<li class="inG '+otype+'">'+ response.list[i]["#text"] + '</li>';

                    if(otype === "v4"){

                        for(var j in response.list[i].detail){
                            disp += '<li class="inlist_s">'+response.list[i].detail[j]["#text"] + '</li>';
                        }
                    }else if(otype == "v4_group"){

                        for(var j in response.list[i].detail){
                            disp += '<li class="inlist">'+response.list[i].detail[j].name + '</li>';
                            for(var k in response.list[i].detail[j].ip){
                                disp += '<li class="inlist_s">'+response.list[i].detail[j].ip[k]["#text"] + '</li>';
                            }
                        }

                    }

                }

                store.data.items[rowIndex].data[smode] = disp + '</ul>';
                var tmpx = store.data.items[rowIndex];

                store.removeAt(rowIndex);
                store.insert(rowIndex,tmpx);
            }
        );

    },

    onGrid_order_selCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('NFW2.view.win_firewall_order_move',{
            _record: record.data
        });
        win.show();
    },

    onPanelActivate: function(component, eOpts) {
        var me = Ext.getCmp("win_order");

        var _store_policy = Ext.data.StoreManager.lookup("store_daships_policy_set");
        _store_policy.getProxy().setExtraParam('mode',Ext.encode('policy'));
        _store_policy.getProxy().setExtraParam('menu_type',Ext.encode('dashboard'));
        _store_policy.getProxy().setExtraParam('search_check',Ext.encode('on'));
        _store_policy.getProxy().setExtraParam('search_type',Ext.encode('all'));
        _store_policy.getProxy().setExtraParam('search_cond',Ext.encode({}));
        _store_policy.load();

        response = [{"src":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"@uid":130,"@use":"off","service":[{"@cid":"6283e07c-4b8c-4112-b484-c2a78031cee5","@otype":"port","#text":"ALL(TCP)"},{"@cid":"f686dace-abb2-4761-9aad-5ddbdddd9da6","@otype":"port","#text":"ALL(UDP)"},{"@cid":"0a374741-50ed-451a-8612-ab9ce8d57da3","@otype":"port","#text":"ICMP"}],"dest":[{"@cid":"829fc74a-2789-46fb-b7b8-448ee82f194b","@otype":"v4_group","#text":"지점"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"eb5e6193-0de8-4f3b-8de2-997a97f18cce","#text":"branch_device"},"@num":1,"desc":""},{"src":[{"@cid":"76b03b93-b35a-4e75-89c1-b2ec3b5530fc","@otype":"v4","#text":"CTO PC"}],"@uid":2,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":2,"desc":""},{"src":[{"@cid":"d1aa3b09-98f7-4629-a093-ee44a90d87ab","@otype":"v4","#text":"CTO VM"}],"@uid":3,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":3,"desc":""},{"src":[{"@cid":"8a80e425-d6eb-4d5b-bd2a-a56d50d88620","@otype":"v4","#text":"제3연구소 PC"}],"@uid":11,"@use":"off","service":[{"@cid":"67c231cc-7e63-40b2-ae57-25c7db10d562","@otype":"group","#text":"웹 접속 포트"}],"dest":[{"@cid":"a99d61b1-e016-473a-b178-f6817b2d02c0","@otype":"v4","#text":"인터넷"}],"basename":"firewall_filter_ipv4","ips":{"@cid":"53afce82-d6de-4d91-8a03-d919e0c0754d","#text":"ips_profile"},"@num":8,"desc":""}];

        //_store_policy.loadData(response);
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;
        var _store_policy = Ext.data.StoreManager.lookup("store_daships_policy_set");
        var sel_ips = me.sel_ips;

        if(Ext.getCmp("order_tab").activeTab.id === 'tab_num'){

            var obj = [];
            for(var i=0; i<_store_policy.data.items.length; i++){
                var data = _store_policy.data.items[i].data;

                obj.push({ '@uid':Number(data['@uid']), '@num':Number(data['@num']), 'basename':data.basename });
            }
        }else{

            var p_uid = {};
            var obj = [];
            var _on = 0;
            for(var i=0; i<_store_policy.data.items.length; i++){
                var data = _store_policy.data.items[i].data;

                eval('var _sel = sel_ips['+data['@uid']+'];');
                var _use = (_sel)?'on':'off';
                if(_use === 'on'){ _on++; eval('p_uid.uid_'+data['@uid']+' = true;'); }
                obj.push({ '@uid':Number(data['@uid']), 'basename':data.basename, '@use':_use });
            }

            if(_on === 0){
                prt_errMsg(ValidSelect(__zen('rule_id'),1),'fld_msg3');
                return false;
            }
        }
        prt_errMsg(null,'fld_msg3');

        var update = { 'update_all': obj };

        var _params = {
            'mode': Ext.encode('policy'),
            'obj': Ext.encode(update),
            'menu_type': Ext.encode('dashboard')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setIPSDashboardConf',
            _params,
            function(response){

                if(Ext.getCmp("order_tab").activeTab.id === 'tab_set'){
                    Ext.getCmp("NFW2_ips").p_uid = p_uid;
                }

                var _param = {
                    'basename': Ext.encode('mgt_ips_dashboard_policy')
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'getObjects',
                    _param,
                    function(response){

                        var p_uid = {};
                        for(var i=0; i<response.list.length; i++){
                            if(response.list[i]['@use'] === 'on'){
                                eval('p_uid.uid_'+response.list[i]['@uid']+' = true;');
                            }
                        }

                        Ext.getCmp("NFW2_ips").p_uid = p_uid;
                    }
                );

                if(Ext.getCmp("b_chk_btn").state === true){
                    clearInterval(Ext.getCmp("NFW2_ips").c_intr);
                    delete Ext.getCmp("NFW2_ips").c_intr;
                    var time = Ext.getCmp('update_time').text.split(' ');
                    clearInterval(Ext.getCmp("timeout").interval);
                    Ext.getCmp('timeout').setHtml(Number(time[0]));

                    Ext.getCmp("NFW2_ips").onButtonChange(Ext.getCmp("b_chk_btn"));
                }
                me.close();
            }
        );
    },

    onButtonClick1: function(button, e, eOpts) {
        this.close();
    }

});