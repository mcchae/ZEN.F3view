
Ext.define('NFW2.view.win_user_group_import', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_user_group_import',

    requires: [
        'NFW2.view.win_user_group_importViewModel',
        'Ext.form.Panel',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.grid.plugin.RowExpander',
        'Ext.XTemplate',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_user_group_import'
    },
    cls: 'zen_win',
    width: 800,
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
            bodyPadding: 20,
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'grid_import',
                            maxHeight: 323,
                            columnLines: true,
                            store: 'store_usergroup_import',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'gid',
                                    flex: 1,
                                    bind: {
                                        text: '{group_id}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'string',
                                    flex: 1,
                                    bind: {
                                        text: '{user_id}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'string',
                                    flex: 1,
                                    bind: {
                                        text: '{user_name}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'string',
                                    flex: 1,
                                    bind: {
                                        text: '{user_depart}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'string',
                                    flex: 1,
                                    bind: {
                                        text: '{auth_server}'
                                    }
                                }
                            ],
                            viewConfig: {
                                listeners: {
                                    expandbody: 'onTableExpandbody'
                                }
                            },
                            plugins: [
                                {
                                    ptype: 'rowexpander',
                                    rowBodyTpl: [
                                        '<div></div>'
                                    ]
                                }
                            ],
                            selModel: {
                                selType: 'checkboxmodel',
                                mode: 'SIMPLE',
                                listeners: {
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
                                    store: 'store_usergroup_import',
                                    listeners: {
                                        change: 'onPagingtoolbarChange',
                                        beforechange: 'onPagingtoolbarBeforeChange'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'bottom',
            ui: 'footer',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'fld_msg',
                    itemId: 'fld_msg2'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
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
                        click: 'onButtonClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender'
    },

    onTableExpandbody: function(rowNode, record, expandRow, eOpts) {

        var me = Ext.getCmp("NFW2_usergroup");
        var theTd = Ext.fly(expandRow).down('td');

        var member = record.data.mmbr;

        var list = [];
        for(var i=0; i<member.length; i++){

            var mmbr = member[i];
            var str = '<tr role="row" class="x-grid-row x-grid-data-row" style="border-top:1px solid #ededed">'+
                '<td role="gridcell" class="x-grid-cell x-grid-td" width="25" style="border-right:none;"></td>'+
                '<td role="gridcell" class="x-grid-cell x-grid-td" style="border-right:none;"></td>'+
                '<td role="gridcell" class="x-grid-cell x-grid-td" style="border-right:none;"></td>'+
                '<td role="gridcell" class="x-grid-cell x-grid-td" style="border-right:none;"><div class="x-grid-cell-inner">'+mmbr.id+'</div></td>'+
                '<td role="gridcell" class="x-grid-cell x-grid-td" style="border-right:none;"><div class="x-grid-cell-inner">'+mmbr.name+'</div></td>'+
                '<td role="gridcell" class="x-grid-cell x-grid-td" style="border-right:none;"><div class="x-grid-cell-inner">'+mmbr.dep+'</div></td>'+
                '<td role="gridcell" class="x-grid-cell x-grid-td" style=""><div class="x-grid-cell-inner">'+mmbr.srv+'</div></td>'+
                '</tr>';
            list.push(str);
        }

        var _tpl = new Ext.XTemplate('<table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;" class="x-grid-item">'+list.join('')+'</table>');

        theTd.update(_tpl.apply({
            time: ''
        }));
    },

    onCheckboxModelDeselect: function(rowmodel, record, index, eOpts) {
        var me = this;

        delete me._sel_obj[record.data._id];
    },

    onCheckboxModelSelectionChange: function(model, selected, eOpts) {
        var me = this;
        var sel_obj = {};

        var select = selected;
        for(var i=0; i<select.length; i++){
            sel_obj[select[i].data._id] = select[i];
        }
        me.sel_obj = sel_obj;
    },

    onPagingtoolbarChange: function(pagingtoolbar, pageData, eOpts) {
        var me = this;
        var sel_obj = me.sel_obj;
        var _store = Ext.getCmp("grid_import").getStore();
        var grid_sel = Ext.getCmp("grid_import").getSelectionModel();

        var _n = 0;
        var record = [];
        for(var i in me._sel_obj){
            if(me._sel_obj[i] === undefined){ continue; }
            var idx = _store.find('_id',me._sel_obj[i].data._id);
            if(idx === -1){ continue; }
            _n++;
            var _re = _store.getAt(idx);
            record.push(_re);
        }

        if(_n > 0){

            grid_sel.select(record);
        }
    },

    onPagingtoolbarBeforeChange: function(pagingtoolbar, page, eOpts) {
        var me = this;
        var _sel_obj = me._sel_obj;

        var grid_chk = Ext.getCmp("grid_import").getSelectionModel().getSelection();

        for(var i=0; i<grid_chk.length; i++){
            _sel_obj[grid_chk[i].data._id] = grid_chk[i];
        }

        me._sel_obj = _sel_obj;
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;
        var count = Ext.getCmp("NFW2_usergroup").count;
        var sel_obj = me._sel_obj;

        var grid = Ext.getCmp("grid_import");
        var grid_chk = grid.getSelectionModel().getSelection();

        for(var l=0; l<grid_chk.length; l++){
            sel_obj[grid_chk[l].data._id] = grid_chk[l];
        }

        var list = [];
        for(var i in sel_obj){
            list.push(sel_obj[i].data);
        }

        if(Ext.getCmp("grid_list").getStore().getTotalCount()+list.length > count){
            var _cnt = count - Ext.getCmp("grid_list").getStore().getTotalCount();
            prt_errMsg(sel_max_count(_cnt), 'fld_msg2');
            return false;
        }

        if(list.length === 0){
            prt_errMsg(ValidSelect(__zen('user_group_import'),1), 'fld_msg2');
            return false;
        }else{
            prt_errMsg(null,'fld_msg2');

            var _params = {
                basename: Ext.encode('object_user_group'),
                args: Ext.encode(list)
            };
            me.mask("Loading...");

            request_helper.xmlrpc_call_Ajax_Post(
                'ftuctrl',
                'importObjectList',
                _params,
                function(response){

                    if(response.fail_cnt > 0){
                        var _id = [];
                        for(var i=0; i<response.fail_list.length; i++){
                            _id.push(response.fail_list[i].name);
                        }
                        Ext.MessageBox.alert(__weguardia,get_msg('err_imuserg')+_id.join(", "));
                    }

                    Ext.getCmp("NFW2_usergroup").list_load();
                    me.close();
                }
            );
        }
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        me.sel_obj = {};
        me._sel_obj = {};

        chk_zenauth(null);

        me.setTitle(__zen('user_group_import'));

        var _store = Ext.getCmp("grid_import").getStore();
        _store.currentPage = 1;
        _store.load();
    }

});